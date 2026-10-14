'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

type Shot = { image: string; alt: string; pos?: string };

const TILTS = [-6, 3, -3, 5];

// A little row of polaroids that pop up onto the page one after another
// when they scroll into view, each with a strip of tape. Shown in place for
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
      { threshold: 0.3 },
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
          animate={show ? { opacity: 1, y: 0, scale: 1, rotate: TILTS[i % TILTS.length] } : { opacity: 0, y: 70, scale: 0.7, rotate: 0 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 16, delay: i * 0.18 }}
          className={`relative w-[38%] max-w-[13rem] bg-white p-2 pb-8 shadow-xl sm:p-2.5 sm:pb-10 ${i > 0 ? '-ml-[6%] sm:-ml-6' : ''}`}
          style={{ zIndex: i === 1 ? 3 : 1 }}
        >
          <span aria-hidden="true" className="absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 bg-zing-yellow/80 shadow-sm" />
          <div className="relative aspect-square overflow-hidden">
            <Image src={shot.image} alt={shot.alt} fill sizes="13rem" className="object-cover" style={{ objectPosition: shot.pos ?? '50% 50%' }} />
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
