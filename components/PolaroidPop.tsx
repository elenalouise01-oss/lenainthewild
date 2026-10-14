'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { choppy, hidden, scrapbookFrames } from '@/lib/scrapbook';
import { useReducedMotion } from '@/lib/useReducedMotion';

type Shot = { image: string; alt: string; pos?: string };

const TILTS = [-6, 3, -3, 5];

// A little row of polaroids placed into the page like a stop-motion
// scrapbook (Canva's "Scrapbook" animation), one after another, when they
// scroll well into view. Shown in place for
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
          // stop-motion "scrapbook" placement: choppy frames with a little wobble
          animate={show ? (reduced ? { opacity: 1, rotate: TILTS[i % TILTS.length] } : scrapbookFrames(TILTS[i % TILTS.length], i % 2 ? 1 : -1)) : hidden}
          transition={reduced ? { duration: 0 } : { duration: 0.55, ease: choppy(1), delay: 0.1 + i * 0.45 }}
          className={`relative w-[38%] max-w-[13rem] bg-white p-2 pb-8 shadow-xl sm:p-2.5 sm:pb-10 ${i > 0 ? '-ml-[6%] sm:-ml-6' : ''}`}
          style={{ zIndex: i === 1 ? 3 : 1 }}
        >
          <div className="relative aspect-square overflow-hidden">
            <Image src={shot.image} alt={shot.alt} fill sizes="13rem" className="object-cover" style={{ objectPosition: shot.pos ?? '50% 50%' }} />
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
