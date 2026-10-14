'use client';

import { useState } from 'react';
import { socialLinks } from '@/content/site';
import { sendToInbox } from '@/lib/sendToInbox';

// Waitlist sign-up for an offer that isn't open yet: name and email are
// emailed to Lena, so visitors never have to leave the site.
// `dark` is for use on the brown background: pink button, cream error text.
// `sent` is the thank-you shown once they've joined; `{name}` in its body
// becomes their first name.
export default function WaitlistForm({
  offer,
  cta,
  sent,
  dark = false,
}: {
  offer: string;
  cta: string;
  sent: { heading: string; body: string };
  dark?: boolean;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [firstName, setFirstName] = useState('');

  const join = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append('waitlist', offer);
    setFirstName(String(data.get('name') ?? '').trim().split(/\s+/)[0]);
    setStatus('sending');
    const ok = await sendToInbox(data, `Waitlist sign-up for ${offer}: ${data.get('name')}`);
    setStatus(ok ? 'sent' : 'failed');
  };

  if (status === 'sent') {
    return (
      <div className="mx-auto max-w-md rounded-sm bg-cream px-8 py-10 text-center text-bark shadow-xl" role="status">
        <span aria-hidden="true" className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage font-display text-3xl text-bark">
          ✓
        </span>
        <p className="mt-5 font-display text-3xl italic leading-tight sm:text-4xl">{sent.heading}</p>
        <p className="mt-4 font-body text-base leading-relaxed text-umber">
          {firstName ? sent.body.replace('{name}', firstName) : sent.body.replace(', {name}', '')}
        </p>
      </div>
    );
  }

  const field =
    'w-full rounded-full border border-bark/20 bg-cream px-6 py-4 font-body text-bark placeholder:text-bark/45 focus:border-bark focus:outline-none';

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
          dark ? 'bg-zing-pink text-bark' : 'bg-[#141414] text-cream'
        }`}
      >
        {status === 'sending' ? 'Joining…' : `${cta} →`}
      </button>
    </form>
  );
}
