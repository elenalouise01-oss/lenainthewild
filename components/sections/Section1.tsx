'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
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
  // A single pass (not 3 repeats overlapping at once) across a generous
  // vw distance over the full scroll range, so it crawls slowly enough
  // to actually read as it passes instead of whipping by.
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['170vw', '-260vw']);
  // Slides in from off-screen, holds fully in view for a readable beat
  // (so the first letter is actually visible, not clipped mid-entrance),
  // then exits left.
  const wordX = useTransform(scrollYProgress, [0, 0.18, 0.42, 0.6], ['110vw', '0vw', '0vw', '-130vw']);

  return (
    <section id="story">
      <div className="bg-bark px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
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
                  className="mt-6 inline-block font-body text-xs font-semibold uppercase tracking-widest2 text-zing-yellow transition-colors hover:text-cream"
                >
                  {welcome.cta} →
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      <div ref={sandRef} className="relative overflow-hidden bg-sand px-6 py-20 sm:px-10 lg:px-16">
        <div className="relative z-10 mx-auto w-full max-w-content">
          <div className="sticky top-6 z-20 flex items-center gap-8 bg-sand/90 py-2 backdrop-blur-sm">
            <span className="hidden shrink-0 -rotate-90 whitespace-nowrap font-body text-xs font-semibold uppercase tracking-widest2 text-stone sm:block">
              {welcome.chapterLabel}
            </span>
            <ScrollReveal>
              <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {welcome.chapters.map((chapter, i) => (
                  <span
                    key={chapter.label}
                    className={`font-body text-sm font-bold uppercase tracking-wide ${
                      i === 0 ? 'text-sage' : 'text-bark/40'
                    }`}
                  >
                    {chapter.number} {chapter.label}
                  </span>
                ))}
              </nav>
            </ScrollReveal>
          </div>

          {/* Same beat as the reference: the photo-filled word itself slides
              across the screen (not just a static letter with something
              sliding behind it), trailed by a ghost outline of the same
              phrase drifting at a different rate. */}
          <div className="relative mt-6 h-[38vw] sm:h-[26vw]">
            {!reduced && (
              <>
                {/* Two solid-fill copies (dark, slightly larger, behind a
                    sand-colored copy at 100%) instead of text-stroke —
                    -webkit-text-stroke self-intersects on compound glyphs
                    (hit this on the hero's "W", now on "G"/"E" here too),
                    producing stray triangle fragments. A pure fill-on-fill
                    halo can't produce that artifact. */}
                <motion.div
                  aria-hidden="true"
                  style={{ x: marqueeX, scale: 1.016, color: 'rgba(59,45,14,0.55)' }}
                  className="pointer-events-none absolute inset-y-0 left-0 flex select-none items-center whitespace-nowrap font-body text-[38vw] font-bold uppercase leading-none sm:text-[26vw]"
                >
                  Design
                </motion.div>
                <motion.div
                  aria-hidden="true"
                  style={{ x: marqueeX }}
                  className="pointer-events-none absolute inset-y-0 left-0 flex select-none items-center whitespace-nowrap font-body text-[38vw] font-bold uppercase leading-none text-sand sm:text-[26vw]"
                >
                  Design
                </motion.div>
              </>
            )}
            <motion.div
              style={{
                backgroundImage: "url('/images/hero.jpg')",
                backgroundSize: '55vw',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                ...(reduced ? {} : { x: wordX }),
              }}
              className="absolute inset-y-0 left-0 flex select-none items-center whitespace-nowrap bg-clip-text font-body text-[38vw] font-black uppercase leading-none text-transparent sm:text-[26vw]"
              aria-hidden="true"
            >
              {welcome.bigWord}
            </motion.div>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="relative mt-24 sm:mt-32">
              <div
                className="pointer-events-none absolute -left-10 -top-10 -z-10 h-40 w-40 rounded-full border-[14px] border-bark/10 sm:h-56 sm:w-56"
                aria-hidden="true"
              />
              <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-14">
                <div className="relative h-48 w-36 flex-shrink-0 overflow-hidden shadow-lg sm:h-64 sm:w-48">
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 -z-10 h-24 w-14 rotate-[35deg] bg-zing-pink/70 sm:h-32 sm:w-20"
                    aria-hidden="true"
                  />
                  {hero.imageSrc && (
                    <Image
                      src={hero.imageSrc}
                      alt="Lena, out in it"
                      fill
                      sizes="200px"
                      className="object-cover"
                      style={{ objectPosition: '65% 15%' }}
                    />
                  )}
                </div>
                <p className="flex-1 font-display text-2xl italic leading-snug text-bark sm:text-4xl sm:leading-tight">
                  {welcome.statBlock.text}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
