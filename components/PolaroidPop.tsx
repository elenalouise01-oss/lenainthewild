'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

type Shot = { image: string; alt: string; pos?: string };

const TILTS = [-6, 3, -3, 5];

// A little row of polaroids placed into the page by hand, one after another,
// when they scroll well into view; then the tape presses on. Shown in place for
// anyone who prefers less motion.
export default function PolaroidPop({ shots }: { shots: Shot[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // wait until they're well into view, so the moment isn't missed
      { threshold: 0.6, rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = reduced || shown;

  return (
    <div ref={ref} className="clear-both flex justify-center py-6 sm:py-10">
      {shots.map((shot, i) => (
        <motion.figure
          key={shot.image}
          initial={false}
          // placed by hand: slides in from its side, tilted, then settles into place
          animate={
            show
              ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: TILTS[i % TILTS.length] }
              : { opacity: 0, x: i % 2 ? 160 : -160, y: -50, scale: 1.12, rotate: i % 2 ? 24 : -24 }
          }
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 15, delay: 0.15 + i * 0.35 }}
          className={`relative w-[38%] max-w-[13rem] bg-white p-2 pb-8 shadow-xl sm:p-2.5 sm:pb-10 ${i > 0 ? '-ml-[6%] sm:-ml-6' : ''}`}
          style={{ zIndex: i === 1 ? 3 : 1 }}
        >
          {i === 0 && (
            // the tape presses on once the photo has landed
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.6 }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, delay: 0.15 + (shots.length - 1) * 0.35 + 0.6 }}
              className="absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 bg-zing-yellow/80 shadow-sm"
            />
          )}
          <div className="relative aspect-square overflow-hidden">
            <Image src={shot.image} alt={shot.alt} fill sizes="13rem" className="object-cover" style={{ objectPosition: shot.pos ?? '50% 50%' }} />
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
