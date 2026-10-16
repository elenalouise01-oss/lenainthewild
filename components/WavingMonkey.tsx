'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/lib/useReducedMotion';

// Lena's little monkey butterfly, swaying and bouncing like it's waving
// people over to the menu beside it. Still for anyone who prefers less motion.
export default function WavingMonkey({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`relative block ${className}`}
      style={{ transformOrigin: '50% 90%' }}
      animate={reduced ? undefined : { rotate: [0, -12, 10, -12, 10, 0, 0], y: [0, -4, 0, -4, 0, 0, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.12, 0.24, 0.36, 0.48, 0.6, 1] }}
    >
      <Image src="/images/monkey-wave.webp" alt="" width={514} height={520} sizes="96px" className="h-auto w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]" priority />
    </motion.span>
  );
}
