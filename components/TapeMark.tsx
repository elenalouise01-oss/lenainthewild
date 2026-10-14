'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

// A strip of tape that unrolls behind a few words as you scroll down to
// them, with the roll riding along the leading edge. The words stay
// readable the whole time; with reduced motion the tape is simply there.
export default function TapeMark({ children, colour = 'bg-sage/80' }: { children: string; colour?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.6'] });
  const clipPath = useTransform(scrollYProgress, (v) => `inset(-4px ${(1 - v) * 100}% -4px 0)`);
  const rollLeft = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const rollOpacity = useTransform(scrollYProgress, [0, 0.03, 0.9, 1], [0, 1, 1, 0]);

  return (
    <span ref={ref} className="relative inline-block -rotate-1 whitespace-nowrap px-1 text-bark">
      <motion.span aria-hidden="true" style={reduced ? undefined : { clipPath }} className={`absolute inset-0 -inset-y-0.5 rounded-[2px] shadow-sm ${colour}`} />
      {!reduced && (
        <motion.span
          aria-hidden="true"
          style={{ left: rollLeft, opacity: rollOpacity }}
          className="absolute -bottom-1.5 -top-1.5 w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#a97bb5] via-[#ead6ef] to-[#a97bb5] shadow-md"
        />
      )}
      <span className="relative">{children}</span>
    </span>
  );
}
