'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/Button';
import Navigation from '@/components/Navigation';
import PlaceholderImage from '@/components/PlaceholderImage';
import SpinningBadge from '@/components/SpinningBadge';
import { hero, nav } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

type Scatter = {
  char: string;
  x: number;
  y: number;
  rotate: number;
  echoX: number;
  echoY: number;
};

// Each letter's starting position before it "assembles" into the word —
// tuned by eye to feel scattered but still readable, echoing the reference's
// kinetic-typography intro.
const SCATTER: Scatter[] = [
  { char: 'L', x: -100, y: -30, rotate: -16, echoX: 12, echoY: 8 },
  { char: 'I', x: -17, y: 38, rotate: 18, echoX: -10, echoY: 11 },
  { char: 'T', x: 42, y: -38, rotate: -13, echoX: 10, echoY: -10 },
  { char: 'W', x: 125, y: 21, rotate: 11, echoX: -11, echoY: -8 },
];

function KineticLetter({
  letter,
  progress,
  reduced,
}: {
  letter: Scatter;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reduced: boolean;
}) {
  const x = useTransform(progress, [0, 0.4], [letter.x, 0]);
  const y = useTransform(progress, [0, 0.4], [letter.y, 0]);
  const rotate = useTransform(progress, [0, 0.4], [letter.rotate, 0]);
  const echoOpacity = useTransform(progress, [0, 0.4], [0.7, 0]);
  const echoX = useTransform(progress, [0, 0.4], [letter.echoX, 0]);
  const echoY = useTransform(progress, [0, 0.4], [letter.echoY, 0]);

  if (reduced) {
    return <span className="relative inline-block">{letter.char}</span>;
  }

  return (
    <motion.span style={{ x, y, rotate }} className="relative inline-block">
      <motion.span
        aria-hidden
        style={{ x: echoX, y: echoY, opacity: echoOpacity, WebkitTextStroke: '2px rgba(59,45,14,0.85)' }}
        className="absolute inset-0 text-transparent"
      >
        {letter.char}
      </motion.span>
      <span
        className="relative"
        style={{
          textShadow:
            '1.5px 0 0 rgba(59,45,14,0.9), -1.5px 0 0 rgba(59,45,14,0.9), 0 1.5px 0 rgba(59,45,14,0.9), 0 -1.5px 0 rgba(59,45,14,0.9), 1.5px 1.5px 0 rgba(59,45,14,0.9), -1.5px -1.5px 0 rgba(59,45,14,0.9), 1.5px -1.5px 0 rgba(59,45,14,0.9), -1.5px 1.5px 0 rgba(59,45,14,0.9)',
        }}
      >
        {letter.char}
      </span>
    </motion.span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.32, 0.42], [16, 0]);
  // Content holds fully visible from 0.42 to 0.62 (a real reading window)
  // before starting to fade for the wash transition.
  const contentOpacity = useTransform(scrollYProgress, [0.62, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.62, 0.85], [0, -40]);
  const washOpacity = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);

  return (
    <section ref={sectionRef} id="top" className={`relative ${reduced ? 'h-screen' : 'h-[250vh]'}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <PlaceholderImage
            alt="Lena, out in it — behind the scenes"
            label="Hero editorial image — full-bleed"
            tone="sand"
            className="h-full w-full"
            priority
            src={hero.imageSrc ?? undefined}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-cream/15 via-transparent to-cream/15" />

        <motion.div
          style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
          className="relative z-10 flex h-full flex-col"
        >
          <div className="container-editorial flex items-center justify-between pt-8">
            <span className="font-logo text-sm font-bold uppercase tracking-wider text-bark sm:text-base">
              {nav.logo}
            </span>
            <Navigation iconClassName="cursor-pointer">
              <SpinningBadge text={hero.badgeText} tone="dark" />
            </Navigation>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <h1
              aria-label={hero.kinetic}
              className="flex select-none font-body text-display-1 font-black uppercase leading-[0.9] tracking-tight text-cream"
            >
              <span aria-hidden="true" className="flex">
                {SCATTER.map((letter, i) => (
                  <KineticLetter key={i} letter={letter} progress={scrollYProgress} reduced={reduced} />
                ))}
              </span>
            </h1>

            <motion.div
              className="mt-3 sm:mt-4"
              style={reduced ? undefined : { opacity: subOpacity, y: subY }}
            >
              <p className="font-body text-2xl font-bold uppercase tracking-wide text-bark sm:text-3xl">
                {hero.headline}
              </p>
              <p className="mx-auto mt-3 max-w-md font-body text-base leading-relaxed text-bark/80 sm:text-lg">
                {hero.sub}
              </p>
              <div className="mt-8 flex justify-center">
                <Button href={hero.ctaHref} tone="dark">
                  {hero.ctaLabel}
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={reduced ? undefined : { opacity: scrollHintOpacity }}
            className="container-editorial flex justify-center pb-8"
          >
            <span
              className="rounded-full bg-cream/70 px-4 py-1.5 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark"
            >
              {hero.scrollLabel}
            </span>
          </motion.div>
        </motion.div>

        {/* Plain color wash only — no text here. Section1's own headline is
            the only place this copy appears; showing a preview of it here
            (centered) duplicated against Section1's real heading (left-
            aligned) as the two scrolled past each other. */}
        {!reduced && (
          <motion.div style={{ opacity: washOpacity }} className="pointer-events-none absolute inset-0 z-20 bg-bark" />
        )}
      </div>
    </section>
  );
}
