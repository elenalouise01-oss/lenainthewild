'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import DrawnLine from '@/components/DrawnLine';
import { useReducedMotion } from '@/lib/useReducedMotion';

// A dashed flight path like a doodle on a map: from Sydney (bottom right) it
// draws itself up to Bali (north-west, top left) as you scroll, and the
// plane appears when it arrives. Decorative.
export default function FlightPath() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });
  const planeOpacity = useTransform(scrollYProgress, (v) => (reduced || v > 0.97 ? 1 : 0));

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto mb-2 mt-4 h-36 w-full sm:h-40">
      <DrawnLine
        viewBox="0 0 400 160"
        stretch
        progress={scrollYProgress}
        className="absolute inset-0 h-full w-full"
        d="M346 128 C 300 120, 230 104, 170 76 C 120 52, 84 40, 62 30"
      />
      {/* Sydney: where the line starts, bottom right */}
      <span className="absolute right-[12%] top-[77%] h-2.5 w-2.5 rounded-full bg-bark" />
      <span className="absolute right-[3%] top-[86%] whitespace-nowrap font-script text-lg leading-none text-bark sm:text-xl">Sydney</span>
      {/* the plane arriving in Bali, top left */}
      <motion.span style={{ opacity: planeOpacity }} className="absolute left-[10%] top-[8%] -rotate-[155deg] text-2xl leading-none text-bark">
        ✈︎
      </motion.span>
      <span className="absolute left-[2%] top-0 whitespace-nowrap font-script text-lg leading-none text-bark sm:text-xl">Bali</span>
    </div>
  );
}
