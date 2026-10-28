'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

// A photo that drifts slowly as the page scrolls past it, like a camera
// move in a film. The frame stays put; the image inside moves.
export default function CinematicImage({
  src,
  alt,
  sizes,
  className = '',
  position = '50% 50%',
  priority = false,
  drift = 12,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
  // How far (in %) the image travels while the frame crosses the screen.
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift / 2}%`, `${drift / 2}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-linen ${className}`}>
      <motion.div className="absolute -inset-y-[10%] inset-x-0" style={reduced ? undefined : { y }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </div>
  );
}
