'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/Button';
import Navigation from '@/components/Navigation';
import PlaceholderImage from '@/components/PlaceholderImage';
import SpinningBadge from '@/components/SpinningBadge';
import { hero, nav, welcome } from '@/content/site';
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
  { char: 'L', x: -18, y: -22, rotate: -16, echoX: 6, echoY: 5 },
  { char: 'I', x: 26, y: 18, rotate: 22, echoX: -5, echoY: 6 },
  { char: 'T', x: -30, y: 20, rotate: -10, echoX: 5, echoY: -5 },
  { char: 'W', x: 20, y: -16, rotate: 14, echoX: -6, echoY: -4 },
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
        style={{ x: echoX, y: echoY, opacity: echoOpacity, WebkitTextStroke: '1.5px rgba(59,45,14,0.8)' }}
        className="absolute inset-0 text-transparent"
      >
        {letter.char}
      </motion.span>
      <span className="relative">{letter.char}</span>
    </motion.span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.5, 0.75], [0, -40]);
  const subOpacity = useTransform(scrollYProgress, [0.38, 0.5], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.38, 0.5], [16, 0]);
  const washOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const nextOpacity = useTransform(scrollYProgress, [0.68, 0.92], [0, 1]);
  const nextY = useTransform(scrollYProgress, [0.68, 0.92], [28, 0]);

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
        <div className="absolute inset-0 bg-cream/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/45 via-cream/15 to-cream/30" />

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
              className="flex select-none font-body text-display-1 font-black uppercase leading-[0.9] tracking-tight text-bark"
            >
              <span aria-hidden="true" className="flex">
                {SCATTER.map((letter, i) => (
                  <KineticLetter key={i} letter={letter} progress={scrollYProgress} reduced={reduced} />
                ))}
              </span>
            </h1>

            <motion.div style={reduced ? undefined : { opacity: subOpacity, y: subY }}>
              <p className="mt-5 font-body text-sm font-semibold uppercase tracking-widest2 text-umber">
                {hero.headline}
              </p>
              <p className="mx-auto mt-3 max-w-md font-body text-base leading-relaxed text-bark/75">
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
            <span className="font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark/60">
              {hero.scrollLabel}
            </span>
          </motion.div>
        </motion.div>

        {!reduced && (
          <motion.div
            style={{ opacity: washOpacity }}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-bark px-6"
          >
            <motion.h2
              style={{ opacity: nextOpacity, y: nextY }}
              className="max-w-2xl text-center font-display text-display-3 italic text-cream"
            >
              {welcome.headline}
            </motion.h2>
          </motion.div>
        )}
      </div>
    </section>
  );
}
