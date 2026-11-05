import { NextResponse } from 'next/server';
import { intuitionBlueprint as copy } from '@/content/intuitionBlueprint';
import { calculateChart } from '@/lib/intuition/calculate';
import { deliverGuide } from '@/lib/intuition/delivery';
import { isValidEmail } from '@/lib/intuition/email';
import { clientKey, rateLimited } from '@/lib/intuition/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Emails the visitor their guide. The chart is calculated again here from
// the birth details, so the guide always matches a real calculation and
// can't be swapped for a different authority. Birth details are used for
// that calculation only: they are not stored, sent on or logged.
export async function POST(req: Request) {
  if (rateLimited(clientKey(req, 'guide'), 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, message: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
  }
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== 'object') return NextResponse.json({ ok: false, message: copy.email.failed }, { status: 400 });

  // Spam trap: a hidden field that only bots fill in. Pretend all is well.
  if (body.company) return NextResponse.json({ ok: true });

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!isValidEmail(email)) return NextResponse.json({ ok: false, field: 'email', message: copy.email.invalidEmail }, { status: 400 });
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim().slice(0, 60) : '';

  const birth = (body.birth ?? {}) as Record<string, unknown>;
  const outcome = calculateChart({ date: birth.date, time: birth.time, placeId: birth.placeId, offsetMinutes: birth.offsetMinutes });
  if (outcome.status !== 'ok') return NextResponse.json({ ok: false, message: copy.email.failed }, { status: 400 });

  const result = await deliverGuide({
    email,
    firstName: firstName || undefined,
    authority: outcome.chart.authority,
    chart: { type: outcome.chart.type, definedCenters: outcome.chart.centerIds },
    marketingConsent: body.marketingConsent === true,
    consentWording: copy.email.consent,
  });
  if (!result.ok) {
    console.error(`Intuition Blueprint: guide not sent (${result.reason})`);
    return NextResponse.json(
      { ok: false, reason: result.reason, message: copy.email.failed },
      { status: result.reason === 'not-configured' ? 503 : 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
