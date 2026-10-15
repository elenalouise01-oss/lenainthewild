'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

// A strip of tape that unrolls behind a few words as you scroll down to them,
// the words appearing with it. It flows with the text like any other words,
// so it can wrap onto the next line without leaving a gap. With reduced
// motion the tape and words are simply there.
export default function TapeMark({ children, colour = 'rgba(203,161,212,0.8)' }: { children: string; colour?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.6'] });
  // how far along the tape (and the words) have unrolled, left to right
  const size = useTransform(scrollYProgress, (v) => `${(reduced ? 1 : v) * 100}% 100%`);
  const text = useTransform(scrollYProgress, (v) => {
    const p = (reduced ? 1 : v) * 100;
    return `linear-gradient(90deg, #3b2d0e ${p}%, transparent ${p}%)`;
  });

  return (
    <motion.span
      ref={ref}
      className="rounded-[2px] px-1 py-0.5"
      style={{ backgroundImage: `linear-gradient(${colour}, ${colour})`, backgroundRepeat: 'no-repeat', backgroundSize: size }}
    >
      <motion.span style={{ backgroundImage: text, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
        {children}
      </motion.span>
    </motion.span>
  );
}
