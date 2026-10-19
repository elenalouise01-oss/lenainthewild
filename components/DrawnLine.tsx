'use client';
import type React from 'react';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useId, useRef } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

const INK = { stroke: '#3b2d0e', strokeOpacity: 0.55, strokeWidth: 2.5, strokeLinecap: 'round' as const, vectorEffect: 'non-scaling-stroke' as const };

// A dashed doodle line that draws itself as you scroll down to it, so the
// eye follows it to where it's leading; its arrowhead appears at the end.
// Shown fully drawn for anyone who prefers less motion.
export default function DrawnLine({
  d,
  arrow,
  viewBox,
  className = '',
  style,
  stretch = false,
  progress,
  colour,
  bold = false,
}: {
  d: string;
  arrow?: string;
  viewBox: string;
  className?: string;
  style?: React.CSSProperties;
  // stretch the drawing to fill its box (for full-width lines)
  stretch?: boolean;
  // drive the drawing from outside (otherwise it follows its own scroll position)
  progress?: MotionValue<number>;
  // ink colour (brown by default; e.g. cream on a dark background)
  colour?: string;
  // thicker, longer dashes and a filled triangle arrowhead (pass `arrow` as
  // a closed triangle path)
  bold?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, '');
  const { scrollYProgress } = useScroll({ target: ref as unknown as React.RefObject<HTMLElement>, offset: ['start 0.9', 'end 0.55'] });
  const p = progress ?? scrollYProgress;
  const length = useTransform(p, (v) => (reduced ? 1 : Math.min(1, Math.max(0, v))));
  const ink = { ...INK, ...(colour && { stroke: colour, strokeOpacity: 0.8 }), ...(bold && { strokeWidth: 3, strokeOpacity: 0.9 }) };
  const arrowOpacity = useTransform(p, (v) => (reduced || v > 0.97 ? 1 : 0));

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio={stretch ? 'none' : undefined}
      className={`pointer-events-none ${className}`}
      style={style}
    >
      <defs>
        {/* a solid line that grows along the path; only the dashes under it show */}
        <mask id={`draw-${id}`} maskUnits="userSpaceOnUse">
          <motion.path d={d} stroke="white" strokeWidth={30} strokeLinecap="round" fill="none" style={{ pathLength: length }} />
        </mask>
      </defs>
      <path d={d} {...ink} strokeDasharray={bold ? '9 7' : '7 8'} mask={`url(#draw-${id})`} />
      {arrow && <motion.path d={arrow} {...ink} fill={bold ? ink.stroke : 'none'} fillOpacity={ink.strokeOpacity} strokeLinejoin="round" style={{ opacity: arrowOpacity }} />}
    </svg>
  );
}
