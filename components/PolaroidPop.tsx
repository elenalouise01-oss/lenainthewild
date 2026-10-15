'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { choppy, hidden, SCRAPBOOK_SECONDS, scrapbookFrames } from '@/lib/scrapbook';
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
      <div className="relative flex w-full justify-center">
      {/* a dashed line that comes down beside the photos, loops, and leads into them */}
      <svg
        aria-hidden="true"
        viewBox="0 0 160 200"
        fill="none"
        className="pointer-events-none absolute -top-16 left-[2%] h-40 w-24 sm:-top-20 sm:left-[4%] sm:h-52 sm:w-36"
      >
        <path
          d="M28 4 C 2 52, 8 102, 58 112 C 92 118, 98 86, 76 80 C 52 74, 50 106, 84 122 C 108 134, 128 140, 150 148"
          stroke="#3b2d0e"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="7 8"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M140 138 L151 148 L138 156" stroke="#3b2d0e" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {shots.map((shot, i) => (
        <motion.figure
          key={shot.image}
          initial={false}
          // stop-motion "scrapbook" placement: choppy frames with a little wobble
          animate={show ? (reduced ? { opacity: 1, rotate: TILTS[i % TILTS.length] } : scrapbookFrames(TILTS[i % TILTS.length], i % 2 ? 1 : -1)) : hidden}
          transition={reduced ? { duration: 0 } : { duration: SCRAPBOOK_SECONDS, ease: choppy(1), delay: 0.2 + i * 1.1 }}
          className={`relative w-[38%] max-w-[13rem] bg-white p-2 pb-8 shadow-xl sm:p-2.5 sm:pb-10 ${i > 0 ? '-ml-[6%] sm:-ml-6' : ''}`}
          style={{ zIndex: i === 1 ? 3 : 1 }}
        >
          <div className="relative aspect-square overflow-hidden">
            <Image src={shot.image} alt={shot.alt} fill sizes="13rem" className="object-cover" style={{ objectPosition: shot.pos ?? '50% 50%' }} />
          </div>
        </motion.figure>
      ))}
      </div>
    </div>
  );
}
