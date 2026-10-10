'use client';

import { useState } from 'react';
import { socialLinks } from '@/content/site';
import { sendToInbox } from '@/lib/sendToInbox';

// Waitlist sign-up for an offer that isn't open yet: name and email are
// emailed to Lena, so visitors never have to leave the site.
export default function WaitlistForm({ offer, cta, sent }: { offer: string; cta: string; sent: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const join = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append('waitlist', offer);
    setStatus('sending');
    const ok = await sendToInbox(data, `Waitlist sign-up for ${offer}: ${data.get('name')}`);
    setStatus(ok ? 'sent' : 'failed');
  };

  if (status === 'sent') {
    return (
      <p className="mx-auto max-w-md rounded-sm bg-cream/80 px-6 py-5 font-body text-base text-bark shadow-sm" role="status">
        {sent}
      </p>
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
        <p className="px-2 font-body text-sm text-bark" role="alert">
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
        className="mt-2 rounded-full bg-[#141414] px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === 'sending' ? 'Joining…' : `${cta} →`}
      </button>
    </form>
  );
}
