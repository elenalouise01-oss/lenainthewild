'use client';

import { useEffect, useRef, type RefObject } from 'react';
import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { homeCtas, offerPages } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// Opens the free practice pop-up (it lives in the LeadMagnet section).
export const OPEN_FREE_PRACTICE = 'open-free-practice';
const openFreePractice = () => window.dispatchEvent(new Event(OPEN_FREE_PRACTICE));

const button =
  'inline-flex items-center gap-3 rounded-full px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 transition-transform hover:scale-105';

// Lilac strip offering the free practice to visitors who are only just
// meeting Lena. It sits in the brown welcome section and glides down through
// it as you scroll (the text passes under it), coming to rest at the bottom
// of the brown. `track` is that section; its progress moves the strip.
export function FreePracticeStrip({ track }: { track: RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Worked out from where the brown section and the screen are each time
  // the page scrolls: 0 while the brown's top is at the top of the screen,
  // up to the full screen height (less the strip) as its bottom reaches the
  // bottom of the screen.
  // Used as the strip's sticky `top`, so once the brown scrolls away the strip
  // stays put at its bottom instead of being pushed past it.
  const y = useMotionValue(0);
  useEffect(() => {
    if (reduced) return;
    const update = () => {
      const box = track.current?.getBoundingClientRect();
      const strip = ref.current?.offsetHeight ?? 0;
      if (!box) return;
      const travel = box.height - window.innerHeight;
      const v = travel > 0 ? Math.min(1, Math.max(0, -box.top / travel)) : 0;
      y.set(v * Math.max(0, window.innerHeight - strip));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reduced, track, y]);

  return (
    <motion.section
      ref={ref}
      style={reduced ? undefined : { top: y }}
      className="sticky top-0 z-30 bg-sage px-6 py-4 shadow-md sm:py-5"
    >
      <div className="container-editorial flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
        <p className="font-display text-lg italic leading-snug text-bark sm:text-xl">{homeCtas.freeTop.line}</p>
        <button type="button" onClick={openFreePractice} aria-haspopup="dialog" className={`${button} flex-none bg-bark text-cream`}>
          {homeCtas.freeTop.button} →
        </button>
      </div>
    </motion.section>
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
        <Link href={offerPages['The Freedom Frequency']} className={`${button} mt-10 bg-zing-babypink text-bark`}>
          {homeCtas.waitlist.button} →
        </Link>
      </ScrollReveal>
    </section>
  );
}
