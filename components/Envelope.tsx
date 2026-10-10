'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { freedomSeeker } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// An open white envelope with photos, a card and a ribbon spilling out of
// the top, and a title printed on the front — laid out to match the
// envelope reference. Everything is positioned on an 886 × 660 grid and
// converted to percentages, so it scales as one piece down to phone width.
const W = 886;
const H = 660;
const box = (x: number, y: number, w: number, h: number) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  height: `${(h / H) * 100}%`,
});

// `drop` marks the photo that falls into the envelope as you scroll.
const PHOTOS: { src: string; pos: string; x: number; y: number; w: number; h: number; rotate: number; z: number; drop?: boolean }[] = [
  // big landscape print tucked at the back: the beach by the train tracks
  { src: '/images/road/road-3.jpg', pos: '50% 100%', x: 296, y: 28, w: 338, h: 240, rotate: 0, z: 1 },
  { src: '/images/road/road-1.jpg', pos: '40% 60%', x: 62, y: 122, w: 112, h: 112, rotate: -8, z: 3 },
  { src: '/images/road/road-5.jpg', pos: '50% 35%', x: 133, y: 142, w: 135, h: 130, rotate: 3, z: 4 },
  { src: '/images/road/road-7.jpg', pos: '50% 75%', x: 402, y: 88, w: 132, h: 180, rotate: -6, z: 5 },
  // Lena on the scooter, the hero print at the front
  { src: '/images/road/road-2.jpg', pos: '50% 35%', x: 526, y: 70, w: 190, h: 230, rotate: 3, z: 6, drop: true },
  { src: '/images/road/road-8.jpg', pos: '50% 75%', x: 700, y: 88, w: 158, h: 140, rotate: -3, z: 4 },
];

// Something sliding down into the envelope: starts high above it, tipped
// further over, and settles into place behind the front pocket as you scroll.
function useDrop(progress: MotionValue<number>, range: [number, number], rotate: number, tilt: number) {
  const y = useTransform(progress, range, ['-140%', '0%'], { clamp: true });
  const r = useTransform(progress, range, [rotate + tilt, rotate], { clamp: true });
  const opacity = useTransform(progress, [range[0], range[0] + 0.08], [0, 1], { clamp: true });
  return { y, rotate: r, opacity };
}

export default function Envelope() {
  const { envelope } = freedomSeeker;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // 0 as the envelope peeks in at the bottom of the screen, 1 when it sits
  // in the middle.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const cardDrop = useDrop(scrollYProgress, [0.05, 0.6], -5, -12);
  const photoDrop = useDrop(scrollYProgress, [0.18, 0.75], 3, -14);
  const ribbonDrop = useDrop(scrollYProgress, [0.32, 0.92], 12, 18);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-3xl"
      style={{ aspectRatio: `${W} / ${H}`, containerType: 'inline-size' }}
    >
      {/* Back of the envelope */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <path d="M0,190 Q0,172 18,172 L868,172 Q886,172 886,190 L886,640 L0,640 Z" fill="#ecebe6" />
      </svg>

      {/* What's spilling out */}
      {PHOTOS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-cream p-[1.1%] shadow-[0_6px_18px_rgba(59,45,14,0.22)]"
          style={{ ...box(p.x, p.y, p.w, p.h), rotate: p.rotate, zIndex: p.z, ...(p.drop && !reduced ? photoDrop : {}) }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image src={p.src} alt="" fill sizes="(min-width: 768px) 20rem, 40vw" className="object-cover" style={{ objectPosition: p.pos }} aria-hidden="true" />
          </div>
        </motion.div>
      ))}

      {/* Green card with the current goal: drops into the envelope first and
          sits on top of the small prints so the goal reads in full */}
      <motion.div
        className="absolute flex flex-col bg-zing-green px-[3%] py-[3.5%] text-bark shadow-[0_6px_18px_rgba(59,45,14,0.2)]"
        style={{ ...box(160, 52, 280, 238), rotate: -5, zIndex: 5, ...(reduced ? {} : cardDrop) }}
      >
        <p className="font-body font-semibold uppercase tracking-wide" style={{ fontSize: '1.45cqw' }}>
          {envelope.cardLabel}
        </p>
        <p className="mt-[4%] font-display leading-[1.05]" style={{ fontSize: '3.6cqw' }}>
          {envelope.cardText}
        </p>
      </motion.div>

      {/* Lilac ribbon: drops into the envelope as you scroll */}
      <motion.div
        className="absolute flex flex-col items-center justify-between bg-sage py-[1.2%] text-bark shadow-[0_6px_18px_rgba(59,45,14,0.2)] [writing-mode:vertical-rl]"
        style={{ ...box(712, -8, 46, 262), rotate: 12, zIndex: 6, ...(reduced ? {} : ribbonDrop) }}
      >
        <span className="font-body font-semibold uppercase tracking-widest2" style={{ fontSize: '1.2cqw' }}>
          ✦
        </span>
        <span className="font-display italic" style={{ fontSize: '2.6cqw' }}>
          {envelope.ribbon}
        </span>
        <span className="font-body font-semibold uppercase tracking-widest2" style={{ fontSize: '1.2cqw' }}>
          ✦
        </span>
      </motion.div>

      {/* Front pocket: two raised shoulders with a dip in the middle, and the
          faint fold lines of the bottom flap */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 z-10 h-full w-full drop-shadow-[0_18px_30px_rgba(59,45,14,0.18)]"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0,236 Q0,216 20,219 L318,288 Q334,305 352,305 L534,305 Q552,305 568,288 L866,219 Q886,216 886,236 L886,640 Q886,652 874,652 L12,652 Q0,652 0,640 Z"
          fill="#fbfbf8"
        />
        <path
          d="M6,648 L236,318 Q244,307 258,307 L628,307 Q642,307 650,318 L880,648"
          fill="#f7f6f2"
          stroke="rgba(59,45,14,0.08)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Paperclip over the pocket edge */}
      <svg
        aria-hidden="true"
        className="absolute z-20 text-stone"
        style={box(150, 232, 34, 104)}
        viewBox="0 0 34 104"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M10 20 V82 a9 9 0 0 0 18 0 V14 a12 12 0 0 0 -24 0 V88" />
      </svg>

      {/* Title printed on the front */}
      <div className="absolute inset-x-0 z-20 text-center text-bark" style={{ top: `${(470 / H) * 100}%` }}>
        <p className="font-display italic leading-none" style={{ fontSize: '6.4cqw' }}>
          {envelope.frontItalic}
        </p>
        <p className="mt-[1.5%] font-display uppercase leading-none tracking-tight" style={{ fontSize: '4.5cqw' }}>
          {envelope.frontTitle}
        </p>
      </div>
    </div>
  );
}
