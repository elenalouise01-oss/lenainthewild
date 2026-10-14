'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { choppy, hidden, scrapbookFrames } from '@/lib/scrapbook';
import { useReducedMotion } from '@/lib/useReducedMotion';

// A soft shadow under the cut-out so it sits on the page.
const CUT_EDGE = 'drop-shadow(0 12px 14px rgba(59,45,14,0.22))';

// A cut-out photo that gets stuck onto the page when it scrolls into view,
// stop-motion "scrapbook" style, then its round label is stuck on too.
// Shown in place for anyone who prefers less motion.
export default function CutoutSticker({
  src,
  alt,
  width,
  height,
  caption,
  className = '',
  polaroid = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  // show the photo in a white polaroid frame instead of as a cut-out
  polaroid?: boolean;
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
        animate={show ? (reduced ? { opacity: 1, rotate: -2 } : scrapbookFrames(-2, 1)) : hidden}
        transition={reduced ? { duration: 0 } : { duration: 0.6, ease: choppy(1) }}
        style={polaroid ? undefined : { filter: CUT_EDGE }}
        className={polaroid ? 'bg-white p-2 pb-8 shadow-xl sm:p-2.5 sm:pb-10' : undefined}
      >
        <Image src={src} alt={alt} width={width} height={height} sizes="16rem" className="h-auto w-full" />
      </motion.div>
      {caption && (
        <motion.figcaption
          initial={false}
          animate={show ? (reduced ? { opacity: 1, rotate: -12 } : scrapbookFrames(-12, -1)) : hidden}
          transition={reduced ? { duration: 0 } : { duration: 0.45, ease: choppy(1), delay: 0.65 }}
          className="absolute -left-8 top-[4%] flex h-24 w-24 items-center justify-center rounded-full bg-zing-yellow p-3 text-center font-script text-base leading-[0.95] text-bark shadow-md"
        >
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
}
