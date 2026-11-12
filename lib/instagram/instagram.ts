import { createHmac, timingSafeEqual } from 'node:crypto';
import { instagramKeywords, type InstagramKeyword } from '@/content/instagramDms';

// Helpers for the Instagram comment-to-DM webhook (app/api/instagram/route.ts).

const GRAPH = 'https://graph.instagram.com/v23.0';

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

export type CommentEvent = { igId: string; commentId: string; fromId: string; text: string };

/** Pulls the new comments out of a webhook payload, ignoring everything else. */
export function commentsFromPayload(payload: unknown): CommentEvent[] {
  const out: CommentEvent[] = [];
  const entries = (payload as { entry?: unknown[] } | null)?.entry;
  if (!Array.isArray(entries)) return out;
  for (const entry of entries as { id?: string; changes?: unknown[] }[]) {
    if (!Array.isArray(entry?.changes)) continue;
    for (const change of entry.changes as { field?: string; value?: { id?: string; text?: string; from?: { id?: string } } }[]) {
      if (change?.field !== 'comments') continue;
      const v = change.value;
      if (!entry.id || !v?.id || !v.from?.id || typeof v.text !== 'string') continue;
      out.push({ igId: entry.id, commentId: v.id, fromId: v.from.id, text: v.text });
    }
  }
  return out;
}

async function post(path: string, token: string, body: unknown): Promise<boolean> {
  const res = await fetch(`${GRAPH}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error('Instagram API error', path, res.status, await res.text().catch(() => ''));
  return res.ok;
}

/** Sends the private reply (a DM) to the person who commented. Instagram allows one per comment. */
export function sendPrivateReply(igId: string, commentId: string, text: string, token: string) {
  return post(`/${igId}/messages`, token, { recipient: { comment_id: commentId }, message: { text } });
}

/** Posts a short public reply under their comment. */
export function replyToComment(commentId: string, text: string, token: string) {
  return post(`/${commentId}/replies`, token, { message: text });
}
