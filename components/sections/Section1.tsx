'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
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
// Brown outline drawn with layered shadows (a text-stroke shows stray
// lines inside some letters, like the R).
const OUTLINE = [
  [1.5, 0], [-1.5, 0], [0, 1.5], [0, -1.5],
  [1.1, 1.1], [-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1],
]
  .map(([x, y]) => `${x}px ${y}px 0 #3b2d0e`)
  .join(', ');

export default function Section1() {
  const reduced = useReducedMotion();
  const sandRef = useRef<HTMLDivElement>(null);
  // Timed against the headline itself: 0 when it peeks in at the bottom of
  // the screen, 1 when it reaches the top. YOUR glides across and lands
  // first, then LIFE follows letter by letter.
  const headRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headProgress } = useScroll({ target: headRef, offset: ['start end', 'start start'] });
  const yourX = useTransform(headProgress, [0.1, 0.4], ['100vw', '0vw'], { clamp: true });

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

          {/* REINVENT (solid brown) YOUR (brown outline) / LIFE (photo cut-out, sliding in one letter at a time) */}
          <div ref={headRef} className="mt-10" aria-label={`${welcome.bigLead} ${welcome.bigMoving} ${welcome.bigWord}`} role="heading" aria-level={2}>
            <div aria-hidden="true" className="flex select-none flex-wrap gap-x-[0.25em] whitespace-nowrap font-body text-[10vw] font-black uppercase leading-none text-bark sm:text-[8vw]">
              <span>{welcome.bigLead}</span>
              <motion.span
                className="inline-block text-cream"
                style={{ textShadow: OUTLINE, x: reduced ? 0 : yourX }}
              >
                {welcome.bigMoving}
              </motion.span>
            </div>
            <LifeLetters progress={headProgress} reduced={reduced} />
          </div>

        </div>
      </div>
    </section>
  );
}

// LIFE cut out of the hero photo. Each letter slides in from the right on
// its own beat as you scroll, then settles. Every letter's photo is lined
// up with its place in the word, so once they land the image reads as one.
function LifeLetters({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  const letters = welcome.bigWord.split('');
  const rowRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ width: number; lefts: number[] } | null>(null);

  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      if (!row) return;
      const spans = Array.from(row.children) as HTMLElement[];
      const last = spans[spans.length - 1];
      setLayout({ width: last.offsetLeft + last.offsetWidth, lefts: spans.map((el) => el.offsetLeft) });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div
      ref={rowRef}
      aria-hidden="true"
      className="mt-[1vw] flex select-none whitespace-nowrap font-body text-[38vw] font-black uppercase leading-[0.85] sm:text-[26vw]"
    >
      {letters.map((letter, i) => (
        <Letter key={i} index={i} progress={progress} reduced={reduced} layout={layout}>
          {letter}
        </Letter>
      ))}
    </div>
  );
}

function Letter({
  index,
  progress,
  reduced,
  layout,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
  layout: { width: number; lefts: number[] } | null;
  children: string;
}) {
  const start = 0.45 + index * 0.07;
  const x = useTransform(progress, [start, start + 0.15], ['100vw', '0vw'], { clamp: true });

  return (
    <motion.span
      style={{
        x: reduced ? 0 : x,
        backgroundImage: "url('/images/hero.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: layout ? `${layout.width}px auto` : 'cover',
        backgroundPosition: layout ? `${-layout.lefts[index]}px center` : 'center',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
