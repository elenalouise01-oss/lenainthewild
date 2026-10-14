'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

// A white "cut out" border hugging the photo's edges, plus a soft shadow.
const CUT_EDGE =
  'drop-shadow(2.5px 0 0 #fff) drop-shadow(-2.5px 0 0 #fff) drop-shadow(0 2.5px 0 #fff) drop-shadow(0 -2.5px 0 #fff) drop-shadow(0 12px 14px rgba(59,45,14,0.22))';

// A cut-out photo that gets stuck onto the page like a sticker when it
// scrolls into view: it drops in tilted, presses down with a little bounce,
// then its round label pops on. Shown in place for anyone who prefers less
// motion.
export default function CutoutSticker({
  src,
  alt,
  width,
  height,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);

  // Our own observer: framer's whileInView can miss on fast scrolls
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStuck(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = reduced || stuck;

  return (
    <figure ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={false}
        animate={show ? { opacity: 1, scale: 1, rotate: -2, y: 0 } : { opacity: 0, scale: 1.18, rotate: 9, y: -40 }}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 14, mass: 0.9 }}
        style={{ filter: CUT_EDGE }}
      >
        <Image src={src} alt={alt} width={width} height={height} sizes="16rem" className="h-auto w-full" />
      </motion.div>
      {caption && (
        <motion.figcaption
          initial={false}
          animate={show ? { opacity: 1, scale: 1, rotate: -12 } : { opacity: 0, scale: 0.4, rotate: -40 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 12, delay: 0.45 }}
          className="absolute -left-8 top-[4%] flex h-24 w-24 items-center justify-center rounded-full bg-zing-yellow p-3 text-center font-script text-base leading-[0.95] text-bark shadow-md"
        >
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
}
