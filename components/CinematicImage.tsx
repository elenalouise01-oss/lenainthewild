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
  still = false,
  imgClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
  // How far (in %) the image travels while the frame crosses the screen.
  drift?: number;
  // Show the whole frame with no drift (for photos that must not be cropped)
  still?: boolean;
  // Tailwind object-position classes, for a different crop per screen size
  imgClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift / 2}%`, `${drift / 2}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-linen ${className}`}>
      <motion.div className={`absolute inset-x-0 ${still ? 'inset-y-0' : '-inset-y-[10%]'}`} style={reduced || still ? undefined : { y }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={90}
          className={`object-cover ${imgClassName ?? ''}`}
          style={imgClassName ? undefined : { objectPosition: position }}
        />
      </motion.div>
    </div>
  );
}
