'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { homeCtas, offerPages } from '@/content/site';

// Opens the free practice pop-up (it lives in the LeadMagnet section).
export const OPEN_FREE_PRACTICE = 'open-free-practice';
const openFreePractice = () => window.dispatchEvent(new Event(OPEN_FREE_PRACTICE));

const button =
  'inline-flex items-center gap-3 rounded-full px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 transition-transform hover:scale-105';

// Thin lilac strip straight under the hero: the free practice, for
// visitors who are only just meeting Lena.
export function FreePracticeStrip() {
  return (
    <section className="bg-sage px-6 py-6">
      <div className="container-editorial flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
        <p className="font-display text-lg italic leading-snug text-bark sm:text-xl">{homeCtas.freeTop.line}</p>
        <button type="button" onClick={openFreePractice} aria-haspopup="dialog" className={`${button} flex-none bg-bark text-cream`}>
          {homeCtas.freeTop.button} →
        </button>
      </div>
    </section>
  );
}

// The 5 Day Reconnect, straight after My Experience.
export function ReconnectCta() {
  return (
    <div className="mt-12">
      <p className="font-display text-2xl italic leading-snug text-bark sm:text-3xl">{homeCtas.reconnect.line}</p>
      <Link href={offerPages['The 5 Day Reconnect']} className={`${button} mt-6 bg-sage text-bark`}>
        {homeCtas.reconnect.button} →
      </Link>
    </div>
  );
}

// The Freedom Frequency waitlist, on brown, before the FAQ.
export function WaitlistCta() {
  return (
    <section className="bg-bark px-6 py-24 text-center sm:py-32">
      <ScrollReveal className="mx-auto flex max-w-3xl flex-col items-center">
        <p className="font-display text-3xl italic leading-tight text-cream sm:text-5xl">{homeCtas.waitlist.question}</p>
        <Link href={offerPages['The Freedom Frequency']} className={`${button} mt-10 bg-zing-pink text-bark`}>
          {homeCtas.waitlist.button} →
        </Link>
      </ScrollReveal>
    </section>
  );
}
