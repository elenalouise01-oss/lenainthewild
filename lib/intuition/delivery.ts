import type { AuthorityKey, Center, HdType } from './bodygraph';
import { guideEmail } from './guideEmail';

// Sends the guide and records the sign-up through a Google Apps Script web
// app attached to a Google Sheet: the same setup as the free tapping practice.
// The script appends a row (date, email, first name, authority, marketing
// choice) and emails the guide from Lena's Gmail. The script code and setup
// steps are in docs/intuition-blueprint.md.
//
// The script's address is below (harmless on its own: the script ignores any
// request without the secret). The secret is a server-only environment
// variable in Vercel, never in this public code:
//   INTUITION_GUIDE_SCRIPT_SECRET  a long random string, also saved in the script
//   INTUITION_GUIDE_SCRIPT_URL     optional: overrides the address below
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwU5fuSCtNlA4vKIK7m9V1mBHBPNIjstXgnv3SM64AZgALGBNvC7179T-mwM4WI-AR_WQ/exec';

export type Signup = {
  email: string;
  firstName?: string;
  authority: AuthorityKey;
  chart?: { type: HdType; definedCenters: Center[] };
  marketingConsent: boolean;
  consentWording: string;
};

export type DeliveryResult = { ok: true } | { ok: false; reason: 'not-configured' | 'failed' };

export function deliveryConfigured(): boolean {
  return Boolean(process.env.INTUITION_GUIDE_SCRIPT_SECRET);
}

export async function deliverGuide(signup: Signup): Promise<DeliveryResult> {
  const url = process.env.INTUITION_GUIDE_SCRIPT_URL || SCRIPT_URL;
  const secret = process.env.INTUITION_GUIDE_SCRIPT_SECRET;
  if (!url || !secret) return { ok: false, reason: 'not-configured' };

  const email = guideEmail(signup.authority, signup.firstName, signup.chart);
  try {
    const res = await fetch(url, {
      method: 'POST',
      // Apps Script reads plain text bodies most reliably
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret,
        email: signup.email,
        firstName: signup.firstName ?? '',
        authority: signup.authority,
        marketingConsent: signup.marketingConsent,
        consentWording: signup.marketingConsent ? signup.consentWording : '',
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
      cache: 'no-store',
    });
    if (!res.ok) return { ok: false, reason: 'failed' };
    const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    // Only a clear "ok" from the script counts as sent
    return json?.ok === true ? { ok: true } : { ok: false, reason: 'failed' };
  } catch {
    return { ok: false, reason: 'failed' };
  }
}
