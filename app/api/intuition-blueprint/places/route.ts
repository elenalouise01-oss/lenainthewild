import { NextResponse } from 'next/server';
import { searchPlaces } from '@/lib/intuition/places';
import { clientKey, rateLimited } from '@/lib/intuition/rateLimit';

export const runtime = 'nodejs';

// Birthplace search for the form: /api/intuition-blueprint/places?q=sydney
export async function GET(req: Request) {
  if (rateLimited(clientKey(req, 'places'), 120, 60_000)) {
    return NextResponse.json({ error: 'Too many searches. Please wait a moment.' }, { status: 429 });
  }
  const q = (new URL(req.url).searchParams.get('q') ?? '').slice(0, 100);
  const places = searchPlaces(q).map(({ id, label }) => ({ id, label }));
  return NextResponse.json({ places }, { headers: { 'Cache-Control': 'public, max-age=86400' } });
}
