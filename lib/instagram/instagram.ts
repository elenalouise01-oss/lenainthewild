import { createHmac, timingSafeEqual } from 'node:crypto';
import { instagramKeywords, type InstagramKeyword } from '@/content/instagramDms';

// Helpers for the Instagram comment-to-DM webhook (app/api/instagram/route.ts).

const VERSION = 'v23.0';

// Two ways to talk to Meta. The Page route (a Page access token, graph.facebook.com)
// handles Instagram AND Facebook comments and is the one Meta's own docs and
// most guides use. The older Instagram-login route (graph.instagram.com) is kept
// as a fallback so nothing breaks if only INSTAGRAM_ACCESS_TOKEN is set.
export type Api = { mode: 'page' | 'instagram'; token: string; base: string };

export function apiFromEnv(env: Record<string, string | undefined> = process.env): Api | null {
  if (env.META_PAGE_ACCESS_TOKEN) return { mode: 'page', token: env.META_PAGE_ACCESS_TOKEN, base: `https://graph.facebook.com/${VERSION}` };
  if (env.INSTAGRAM_ACCESS_TOKEN) return { mode: 'instagram', token: env.INSTAGRAM_ACCESS_TOKEN, base: `https://graph.instagram.com/${VERSION}` };
  return null;
}

/** Finds the keyword in a comment: whole word, any capitalisation, ignoring emoji and punctuation. */
export function matchKeyword(text: string, list: InstagramKeyword[] = instagramKeywords): InstagramKeyword | null {
  const words = new Set(
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .split(' ')
      .filter(Boolean),
  );
  return list.find((k) => words.has(k.keyword.toLowerCase())) ?? null;
}

/** Checks Meta's X-Hub-Signature-256 header so only real Instagram messages are trusted. */
export function validSignature(rawBody: string, header: string | null, appSecret: string): boolean {
  if (!header?.startsWith('sha256=')) return false;
  const expected = createHmac('sha256', appSecret).update(rawBody).digest('hex');
  const given = header.slice('sha256='.length);
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

export type CommentEvent = {
  source: 'instagram' | 'facebook';
  /** The Instagram account id, or the Facebook Page id, that owns the post. */
  ownerId: string;
  commentId: string;
  fromId: string;
  text: string;
};

/**
 * Pulls the new top-level comments out of a webhook payload, from both
 * Instagram (`comments`) and Facebook Pages (`feed`), ignoring everything else.
 */
export function commentsFromPayload(payload: unknown): CommentEvent[] {
  const out: CommentEvent[] = [];
  const body = payload as { object?: string; entry?: unknown[] } | null;
  const entries = body?.entry;
  if (!Array.isArray(entries)) return out;
  for (const entry of entries as { id?: string; changes?: unknown[] }[]) {
    if (!entry?.id || !Array.isArray(entry.changes)) continue;
    for (const change of entry.changes as { field?: string; value?: Record<string, any> }[]) {
      const v = change?.value;
      if (!v) continue;
      if (change.field === 'comments') {
        // Instagram
        if (!v.id || !v.from?.id || typeof v.text !== 'string') continue;
        out.push({ source: 'instagram', ownerId: entry.id, commentId: v.id, fromId: v.from.id, text: v.text });
      } else if (change.field === 'feed' && v.item === 'comment' && v.verb === 'add') {
        // Facebook Page. A top-level comment's parent is the post itself, so
        // compare the two ids: anything else is a reply to another comment.
        if (!v.comment_id || !v.from?.id || typeof v.message !== 'string') continue;
        if (v.parent_id && v.post_id && v.parent_id !== v.post_id) continue;
        out.push({ source: 'facebook', ownerId: entry.id, commentId: v.comment_id, fromId: v.from.id, text: v.message });
      }
    }
  }
  return out;
}

async function post(api: Api, path: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(`${api.base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${api.token}` },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error('Meta API error', path.replace(/\/\d+/g, '/<id>'), res.status, await res.text().catch(() => ''));
    return res.ok;
  } catch (err) {
    // Never let a failed send crash the webhook: Meta would resend the whole batch.
    console.error('Meta API request failed', path.replace(/\/\d+/g, '/<id>'), String(err));
    return false;
  }
}

/** Sends the private reply (a DM) to the person who commented. Meta allows one per comment. */
export function sendPrivateReply(api: Api, c: CommentEvent, text: string) {
  const path = api.mode === 'page' ? '/me/messages' : `/${c.ownerId}/messages`;
  return post(api, path, { recipient: { comment_id: c.commentId }, message: { text } });
}

/** Posts a short public reply under their comment. */
export function replyToComment(api: Api, c: CommentEvent, text: string) {
  const path = c.source === 'facebook' ? `/${c.commentId}/comments` : `/${c.commentId}/replies`;
  return post(api, path, { message: text });
}
