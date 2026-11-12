import { NextResponse } from 'next/server';
import { instagramPublicReplies, pickOne } from '@/content/instagramDms';
import { apiFromEnv, commentsFromPayload, matchKeyword, replyToComment, sendPrivateReply, validSignature } from '@/lib/instagram/instagram';

export const runtime = 'nodejs';

// Instagram + Facebook webhook: comment a keyword, get a DM. Env vars in Vercel:
//   INSTAGRAM_VERIFY_TOKEN, INSTAGRAM_APP_SECRET (the Meta app secret), and
//   META_PAGE_ACCESS_TOKEN (Page route, preferred) or INSTAGRAM_ACCESS_TOKEN.
// See docs/instagram-dms.md.

// Meta calls this once when you save the webhook, to check the address is yours.
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const token = process.env.INSTAGRAM_VERIFY_TOKEN;
  if (token && q.get('hub.mode') === 'subscribe' && q.get('hub.verify_token') === token) {
    return new Response(q.get('hub.challenge') ?? '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

// Meta calls this for every new comment.
export async function POST(req: Request) {
  const secret = process.env.INSTAGRAM_APP_SECRET;
  const api = apiFromEnv();
  if (!secret || !api) return NextResponse.json({ error: 'Not set up' }, { status: 503 });

  const raw = await req.text();
  if (!validSignature(raw, req.headers.get('x-hub-signature-256'), secret)) {
    return NextResponse.json({ error: 'Bad signature' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Bad JSON' }, { status: 400 });
  }

  // Short log lines (no names, comments or keys) so it's easy to see in
  // Vercel's logs what happened to each comment. Whatever goes wrong below, we
  // still answer 200: if we returned an error Meta would resend the whole batch.
  try {
    const comments = commentsFromPayload(payload);
    console.log(`Meta webhook: ${comments.length} comment(s) received`);
    for (const c of comments) {
      // Our own public reply fires this webhook again: never answer ourselves.
      if (c.fromId === c.ownerId || instagramPublicReplies.includes(c.text.trim())) {
        console.log(`${c.source} comment skipped: written by the account itself`);
        continue;
      }
      const hit = matchKeyword(c.text);
      if (!hit) {
        console.log(`${c.source} comment skipped: no keyword matched`);
        continue;
      }
      // One private reply per comment, ever, so a send is never retried.
      const dm = pickOne(hit.dms);
      if (!dm) continue;
      const sent = await sendPrivateReply(api, c, dm);
      console.log(`${c.source} DM for ${hit.keyword}: ${sent ? 'sent' : 'FAILED (see error above)'}`);
      const publicReply = pickOne(instagramPublicReplies);
      if (sent && publicReply) {
        const replied = await replyToComment(api, c, publicReply);
        console.log(`${c.source} public reply: ${replied ? 'sent' : 'FAILED (see error above)'}`);
      }
    }
  } catch (err) {
    console.error('Meta webhook handler failed', String(err));
  }

  // Always answer 200 quickly so Meta doesn't keep retrying.
  return NextResponse.json({ ok: true });
}
