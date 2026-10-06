'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { hero, welcome } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// Mirrors the S1 reference exactly: a normal (non-pinned) tall bold-color
// block — left-aligned bold statement up top, a two-column support-text
// block sitting right-of-center further down, then a light block with a
// vertical side label, a horizontal numbered chapter bar, and a giant
// letter filled with a photo (here, the real cutout hero shot). Behind
// the letter, a giant outline word drifts horizontally as you scroll —
// the reference's big ghost typography slides sideways rather than
// sitting static.
export default function Section1() {
  const reduced = useReducedMotion();
  const sandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sandRef, offset: ['start end', 'end start'] });
  // "YOUR" slides in from the right as the section scrolls into view,
  // then settles next to REINVENT.
  const yourX = useTransform(scrollYProgress, [0.05, 0.4], ['60vw', '0vw']);

  return (
    <section id="story">
      <div className="bg-bark px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <h2 className="max-w-3xl font-display text-display-2 italic leading-[1.05] text-cream">
              {welcome.headline}
            </h2>
          </ScrollReveal>

          <div className="mt-24 flex justify-end sm:mt-36">
            <div className="grid max-w-2xl gap-10 text-left sm:grid-cols-2">
              <ScrollReveal>
                <p className="font-body text-base leading-relaxed text-cream/80">{welcome.supportLeft}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="font-body text-base leading-relaxed text-cream/80">{welcome.supportRight}</p>
                <a
                  href={welcome.ctaHref}
                  className="mt-6 inline-block font-body text-xs font-semibold uppercase tracking-widest2 text-zing-yellow underline decoration-zing-yellow/40 underline-offset-8 transition-colors hover:decoration-zing-yellow"
                >
                  {welcome.cta} →
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      <div ref={sandRef} className="relative overflow-hidden bg-cream px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="relative z-10 mx-auto w-full max-w-content">
          <div className="sticky top-6 z-20 flex items-center gap-8 bg-cream/90 py-2 backdrop-blur-sm">
            <ScrollReveal>
              <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {welcome.chapters.map((chapter, i) => (
                  <a
                    key={chapter.label}
                    href={chapter.href}
                    className={`font-body text-sm font-bold uppercase tracking-wide transition-colors hover:text-bark ${
                      i === 0 ? 'text-bark underline decoration-sage decoration-2 underline-offset-4' : 'text-bark/40'
                    }`}
                  >
                    {chapter.number} {chapter.label}
                  </a>
                ))}
              </nav>
            </ScrollReveal>
          </div>

          {/* Two lines: REINVENT + a sliding YOUR, then the photo-filled LIFE */}
          <div className="mt-10" aria-label={`${welcome.bigLead} ${welcome.bigMoving} ${welcome.bigWord}`} role="heading" aria-level={2}>
            <div aria-hidden="true" className="flex select-none items-baseline gap-[2.5vw] overflow-hidden whitespace-nowrap font-body text-[9.5vw] font-black uppercase leading-none text-bark sm:text-[8vw]">
              <span>{welcome.bigLead}</span>
              <motion.span style={reduced ? undefined : { x: yourX }} className="inline-block">
                {welcome.bigMoving}
              </motion.span>
            </div>
            <div
              aria-hidden="true"
              style={{
                backgroundImage: "url('/images/hero.jpg')",
                backgroundSize: '55vw',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
              }}
              className="select-none whitespace-nowrap bg-clip-text font-body text-[38vw] font-black uppercase leading-[0.85] text-transparent sm:text-[26vw]"
            >
              {welcome.bigWord}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
