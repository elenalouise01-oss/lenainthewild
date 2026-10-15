'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DrawnLine from '@/components/DrawnLine';
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
    <div ref={ref} className="clear-both flex justify-center pb-6 pt-10 sm:pb-10 sm:pt-14">
      <div className="relative flex w-full justify-center">
      {/* a dashed line that comes down beside the photos, loops, and leads into them */}
      <DrawnLine viewBox="0 0 160 200" className="absolute -top-6 left-[2%] h-40 w-24 sm:-top-6 sm:left-[4%] sm:h-52 sm:w-36" d="M28 4 C 2 52, 8 102, 58 112 C 92 118, 98 86, 76 80 C 52 74, 50 106, 84 122 C 108 134, 128 140, 150 148" arrow="M140 138 L151 148 L138 156" />
      {/* and one that leaves the last photo and heads on down the page */}
      <DrawnLine viewBox="0 0 160 220" className="absolute -bottom-24 right-[2%] h-40 w-24 sm:-bottom-32 sm:right-[6%] sm:h-56 sm:w-36" d="M6 40 C 60 28, 116 44, 120 82 C 124 112, 92 120, 86 100 C 80 80, 120 76, 132 112 C 142 142, 124 178, 112 206" arrow="M102 196 L112 208 L122 196" />
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
