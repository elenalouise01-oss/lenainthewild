'use client';

import { useState } from 'react';
import { photographyPage, socialLinks } from '@/content/site';
import { sendToInbox } from '@/lib/sendToInbox';

// Photoshoot enquiry: name, email, Instagram (optional) and a few words
// about their chapter, emailed to Lena.
export default function PhotoEnquiryForm() {
  const copy = photographyPage.enquiry;
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus('sending');
    const ok = await sendToInbox(data, `Photoshoot enquiry: ${data.get('name')}`);
    setStatus(ok ? 'sent' : 'failed');
  };

  if (status === 'sent') {
    return (
      <div role="status" className="py-10">
        <p className="font-display text-4xl italic text-bark">{copy.sentHeading}</p>
        <p className="mt-4 font-body text-base text-umber">{copy.sentBody}</p>
      </div>
    );
  }

  const field =
    'w-full border-b border-bark/25 bg-transparent px-0 py-4 font-body text-base text-bark placeholder:text-stone focus:border-bark focus:outline-none';

  return (
    <form onSubmit={send} className="flex flex-col gap-5">
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
        <span className="sr-only">Instagram</span>
        <input name="instagram" placeholder="Instagram (optional)" className={field} />
      </label>
      <label>
        <span className="sr-only">Your chapter</span>
        <textarea name="message" required rows={4} placeholder={copy.chapterPlaceholder} className={`${field} resize-none`} />
      </label>
      {status === 'failed' && (
        <p role="alert" className="font-body text-sm text-bark">
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
        className="mt-6 self-start bg-bark px-10 py-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-cream transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {status === 'sending' ? copy.sending : copy.button}
      </button>
    </form>
  );
}
