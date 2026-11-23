'use client';

import { useState } from 'react';
import { naluriSocialsAi } from '@/content/naluriSocialsAi';
import { sendToInbox } from '@/lib/sendToInbox';

// "Book a free chat" for Naluri Socials AI: name, email, their business and
// what they'd love help with, emailed to Lena.
export default function NaluriChatForm() {
  const copy = naluriSocialsAi.form;
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus('sending');
    const ok = await sendToInbox(data, `Naluri Socials AI chat: ${data.get('name')}`);
    setStatus(ok ? 'sent' : 'failed');
  };

  if (status === 'sent') {
    return (
      <div role="status" className="py-6">
        <p className="font-display text-4xl italic text-cream">{copy.sentHeading}</p>
        <p className="mt-4 font-body text-base text-cream/85">{copy.sentBody}</p>
      </div>
    );
  }

  const field =
    'w-full border-b border-cream/30 bg-transparent px-0 py-4 font-body text-base text-cream placeholder:text-cream/55 focus:border-cream focus:outline-none';

  return (
    <form onSubmit={send} className="flex flex-col gap-4 text-left">
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
      <label>
        <span className="sr-only">{copy.businessPlaceholder}</span>
        <input name="business" required placeholder={copy.businessPlaceholder} className={field} />
      </label>
      <label>
        <span className="sr-only">{copy.helpPlaceholder}</span>
        <textarea name="message" rows={3} placeholder={copy.helpPlaceholder} className={`${field} resize-none`} />
      </label>
      {status === 'failed' && (
        <p role="alert" className="font-body text-sm text-cream">
          {copy.failed}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 self-center rounded-full bg-sage px-9 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-transform hover:scale-105 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : `${copy.button} →`}
      </button>
    </form>
  );
}
