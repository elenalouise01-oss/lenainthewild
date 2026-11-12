import { NextResponse } from 'next/server';
import { instagramPublicReply } from '@/content/instagramDms';
import { commentsFromPayload, matchKeyword, replyToComment, sendPrivateReply, validSignature } from '@/lib/instagram/instagram';

export const runtime = 'nodejs';

// Instagram webhook: comment a keyword, get a DM. Needs three env vars in Vercel:
//   INSTAGRAM_VERIFY_TOKEN, INSTAGRAM_APP_SECRET, INSTAGRAM_ACCESS_TOKEN
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
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!secret || !accessToken) return NextResponse.json({ error: 'Not set up' }, { status: 503 });

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
  // Vercel's logs what happened to each comment.
  const comments = commentsFromPayload(payload);
  console.log(`Instagram webhook: ${comments.length} comment(s) received`);
  for (const c of comments) {
    if (c.fromId === c.igId) {
      console.log('Instagram comment skipped: it was from the account itself');
      continue; // never reply to our own comments
    }
    const hit = matchKeyword(c.text);
    if (!hit) {
      console.log('Instagram comment skipped: no keyword matched');
      continue;
    }
    const sent = await sendPrivateReply(c.igId, c.commentId, hit.dm, accessToken);
    console.log(`Instagram DM for ${hit.keyword}: ${sent ? 'sent' : 'FAILED (see error above)'}`);
    if (sent && instagramPublicReply) {
      const replied = await replyToComment(c.commentId, instagramPublicReply, accessToken);
      console.log(`Instagram public reply: ${replied ? 'sent' : 'FAILED (see error above)'}`);
    }
  }

  // Always answer 200 quickly so Meta doesn't keep retrying.
  return NextResponse.json({ ok: true });
}
