'use client';

import { motion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { EASE, fadeUp } from '@/lib/motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: 'div' | 'span';
};

// Framer Motion's own whileInView occasionally never fires — observed on a
// direct scroll jump / deep link, leaving content permanently at opacity:0.
// Driving visibility from our own IntersectionObserver (plus a synchronous
// "already in view" check at mount) mirrors Hero's proven-reliable `animate`
// pattern instead of trusting whileInView's internal viewport tracking.
export default function ScrollReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
    if (alreadyVisible) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-10% 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const MotionTag = as === 'span' ? motion.span : motion.div;
  const show = variants.show;
  const appliedVariants: Variants = {
    hidden: variants.hidden,
    show: {
      ...(typeof show === 'object' ? show : {}),
      transition: {
        ...(typeof show === 'object' ? (show as any).transition : {}),
        ease: EASE,
        delay: reduced ? 0 : delay,
        ...(reduced ? { duration: 0.01 } : {}),
      },
    },
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={appliedVariants}
    >
      {children}
    </MotionTag>
  );
}
