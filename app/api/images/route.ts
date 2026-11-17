import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { generateImages, parseImageRequest } from '@/lib/openai/images';
import { clientKey, rateLimited } from '@/lib/intuition/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

// Private image generation through the OpenAI Image Generation API.
// Not linked from the site. Every call costs money, so it needs the
// IMAGE_API_SECRET passed as "Authorization: Bearer <secret>".
// Setup and examples: docs/openai-images.md

function authorised(req: Request): boolean {
  const secret = process.env.IMAGE_API_SECRET;
  if (!secret) return false;
  const given = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (!process.env.IMAGE_API_SECRET) {
    return NextResponse.json({ ok: false, message: 'Image generation is not set up yet.' }, { status: 503 });
  }
  if (rateLimited(clientKey(req, 'images'), 10, 10 * 60_000)) {
    return NextResponse.json({ ok: false, message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });
  }
  if (!authorised(req)) return NextResponse.json({ ok: false, message: 'Unauthorised.' }, { status: 401 });

  const parsed = parseImageRequest(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ ok: false, message: parsed.message }, { status: 400 });

  const result = await generateImages(parsed.request);
  if (!result.ok) {
    console.error(`OpenAI images: not generated (${result.reason})`);
    const status = result.reason === 'not-configured' ? 503 : result.reason === 'rejected' ? 400 : 502;
    return NextResponse.json({ ok: false, message: result.message }, { status });
  }
  return NextResponse.json({
    ok: true,
    images: result.images.map((i) => ({ mimeType: i.mimeType, b64: i.b64 })),
  });
}
