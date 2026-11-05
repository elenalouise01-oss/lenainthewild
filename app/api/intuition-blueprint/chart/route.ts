import { NextResponse } from 'next/server';
import { calculateChart } from '@/lib/intuition/calculate';
import { deliveryConfigured } from '@/lib/intuition/delivery';
import { clientKey, rateLimited } from '@/lib/intuition/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Calculates a Human Design chart from birth details and returns the
// authority. Nothing is stored, and birth details are never logged.
export async function POST(req: Request) {
  if (rateLimited(clientKey(req, 'chart'), 30, 60_000)) {
    return NextResponse.json({ status: 'error', message: 'Too many attempts. Please wait a minute and try again.' }, { status: 429 });
  }
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ status: 'error', message: 'Please fill in your birth details.' }, { status: 400 });
  }
  try {
    const outcome = calculateChart({ date: body.date, time: body.time, placeId: body.placeId, offsetMinutes: body.offsetMinutes });
    return NextResponse.json(
      { ...outcome, emailEnabled: deliveryConfigured() },
      { status: outcome.status === 'invalid' ? 400 : 200, headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    // Deliberately no details in the log: they would include birth data
    console.error('Intuition Blueprint: chart calculation failed');
    return NextResponse.json({ status: 'error', message: 'Something went wrong calculating your chart. Please try again.' }, { status: 500 });
  }
}
