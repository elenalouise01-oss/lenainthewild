'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { socialLinks, waitlistSheetUrl } from '@/content/site';
import { sendToInbox } from '@/lib/sendToInbox';
import { useReducedMotion } from '@/lib/useReducedMotion';

// The little burst of hearts on a thank-you (shared with the free practice pop-up)
export const HEARTS = [
  { x: -90, y: -70, colour: 'text-zing-babypink' },
  { x: -50, y: -110, colour: 'text-sage' },
  { x: 0, y: -125, colour: 'text-zing-babypink' },
  { x: 55, y: -105, colour: 'text-sage' },
  { x: 95, y: -60, colour: 'text-zing-babypink' },
  { x: -120, y: -20, colour: 'text-sage' },
  { x: 125, y: -15, colour: 'text-zing-babypink' },
];

// Waitlist sign-up for an offer that isn't open yet: name and email are
// emailed to Lena, so visitors never have to leave the site.
// `dark` is for use on the brown background: pink button, cream error text.
// `sent` is the thank-you shown once they've joined; `{name}` in its body
// becomes their first name. `subject` labels the email to Lena. Pass
// `onSent` to show your own thank-you instead (it gets their first name).
// `buttonClass` and `fieldClass` replace the button's and fields' colours.
// `sheetUrl` is the Google Sheet the sign-up is added to.
export default function WaitlistForm({
  offer,
  cta,
  sent,
  dark = false,
  subject = 'Waitlist sign-up for',
  sendingLabel = 'Joining…',
  onSent,
  buttonClass,
  sheetUrl = waitlistSheetUrl,
  fieldClass = 'border-bark/20 bg-cream text-bark placeholder:text-bark/45 focus:border-bark',
}: {
  offer: string;
  cta: string;
  sent: { heading: string; body: string };
  dark?: boolean;
  subject?: string;
  sendingLabel?: string;
  onSent?: (firstName: string) => void;
  buttonClass?: string;
  sheetUrl?: string;
  fieldClass?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [firstName, setFirstName] = useState('');
  const reduced = useReducedMotion();

  const join = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append('waitlist', offer);
    const first = String(data.get('name') ?? '').trim().split(/\s+/)[0];
    setFirstName(first);
    setStatus('sending');
    // Also add them to the Google Sheet. Google doesn't let the page
    // read its reply, so this is sent without waiting on it; the email to
    // Lena is what decides whether the sign-up went through.
    if (sheetUrl && !data.get('botcheck')) {
      const row = new URLSearchParams({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        offer,
      });
      fetch(sheetUrl, { method: 'POST', mode: 'no-cors', body: row }).catch(() => {});
    }
    const ok = await sendToInbox(data, `${subject} ${offer}: ${data.get('name')}`);
    setStatus(ok ? 'sent' : 'failed');
    if (ok) onSent?.(first);
  };

  if (status === 'sent') {
    if (onSent) return null;
    // Same feel as the free practice thank-you: "yay, name!", the heading
    // springing in on yellow, and a burst of hearts.
    return (
      <div className="relative mx-auto max-w-md rounded-sm bg-cream px-8 py-10 text-center text-bark shadow-xl" role="status">
        {!reduced &&
          HEARTS.map((h, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={`pointer-events-none absolute left-1/2 top-20 text-3xl ${h.colour}`}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x: h.x, y: h.y, scale: 1, opacity: 0 }}
              transition={{ duration: 1.6, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
            >
              ♡
            </motion.span>
          ))}
        <p className="font-hand text-2xl text-bark/70">yay, {firstName || 'you'}!</p>
        <motion.p
          className="mt-3 inline-block -rotate-2 bg-zing-yellow px-4 py-1 font-display text-4xl italic leading-tight text-bark shadow-lg sm:text-5xl"
          initial={{ scale: reduced ? 1 : 0.6, opacity: reduced ? 1 : 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 12 }}
        >
          {sent.heading}
        </motion.p>
        <p className="mt-7 font-body text-base leading-relaxed text-umber">{sent.body.replace(', {name}', '')}</p>
      </div>
    );
  }

  const field = `w-full rounded-full border px-6 py-4 font-body focus:outline-none ${fieldClass}`;

  return (
    <form onSubmit={join} className="mx-auto flex max-w-md flex-col gap-3 text-left">
      {/* Spam trap: hidden from people, bots tick it */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <label>
        <span className="sr-only">Name</span>
        <input name="name" autoComplete="name" required placeholder="Your name" className={field} />
      </label>
      <label>
        <span className="sr-only">Email</span>
        <input name="email" type="email" autoComplete="email" required placeholder="Your email" className={field} />
      </label>
      {status === 'failed' && (
        <p className={`px-2 font-body text-sm ${dark ? 'text-cream' : 'text-bark'}`} role="alert">
          Sorry, that didn’t go through. Please try again, or message me on Instagram{' '}
          <a href={socialLinks.Instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            @lenainthewild
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`mt-2 rounded-full px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 transition-transform hover:scale-[1.02] disabled:opacity-60 ${
          buttonClass ?? (dark ? 'bg-zing-babypink text-bark' : 'bg-[#141414] text-cream')
        }`}
      >
        {status === 'sending' ? sendingLabel : `${cta} →`}
      </button>
    </form>
  );
}
