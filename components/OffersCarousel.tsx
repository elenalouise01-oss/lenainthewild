'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
import Image from 'next/image';
import { freedomSeeker, hero, offerLinks } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// Mirrors the "Offers reference" video: each offer is a square record sleeve
// in front of a big soft circle that grows out of the centre and keeps
// breathing, neighbours tilted at the edges, a round sticker and a
// "now playing" bar. Sleeves tilt in 3D as you grab or move over them.
// Brand palette only; `photo` is the crop of the shared photo, `src` an
// offer's own cover artwork when it has one.
const LOOKS: { bg: string; circle: string; sticker: string; photo: string; src?: string }[] = [
  { bg: '#CBA1D4', circle: '#fffba0', sticker: '#ff8bb8', photo: '50% 50%', src: '/images/cover-5-day-reconnect.webp' },
  { bg: '#ff8bb8', circle: '#CBA1D4', sticker: '#fffba0', photo: '50% 50%', src: '/images/cover-freedom-frequency.webp' },
  { bg: '#fffba0', circle: '#ff8bb8', sticker: '#CBA1D4', photo: '50% 50%', src: '/images/cover-aligned-circle.webp' },
];

const SWIPE_THRESHOLD = 60;
const MAX_TILT = 14;

type Tier = (typeof freedomSeeker.tiers)[number];
type Look = (typeof LOOKS)[number];

export default function OffersCarousel() {
  const reduced = useReducedMotion();
  const tiers = freedomSeeker.tiers;
  const count = tiers.length;
  const [active, setActive] = useState(0);
  const [details, setDetails] = useState<number | null>(null);

  // 3D tilt of the centre sleeve, following the pointer / drag.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 18 });
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };


  const go = (step: number) => {
    resetTilt();
    setActive((a) => (a + step + count) % count);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * MAX_TILT * 2);
    tiltX.set(-py * MAX_TILT * 2);
  };

  const onDrag = (_: unknown, info: PanInfo) => {
    tiltY.set(Math.max(-25, Math.min(25, info.offset.x / 8)));
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
    else resetTilt();
  };

  const spring = reduced ? { duration: 0 } : { type: 'spring' as const, stiffness: 140, damping: 20 };
  const look = LOOKS[active % LOOKS.length];

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden py-20">
      {/* Flat background colour, eased between offers */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={false}
        animate={{ backgroundColor: look.bg }}
        transition={{ duration: reduced ? 0 : 0.6 }}
      />

      {/* The circle: shrinks away on change, grows back out of the centre in
          the new colour, then keeps breathing, with a ring rippling out. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="absolute aspect-square w-[min(96dvh,120vw)]"
            initial={reduced ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            exit={reduced ? undefined : { scale: 0, transition: { duration: 0.35, ease: 'easeIn' } }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="h-full w-full rounded-full"
              style={{ background: `radial-gradient(circle, ${look.circle} 0, ${look.circle} 56%, transparent 71%)` }}
              animate={reduced ? undefined : { scale: [1, 1.07, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            />
            {!reduced && (
              <motion.div
                className="absolute inset-[14%] rounded-full border-2"
                style={{ borderColor: look.circle }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [0.9, 1.45], opacity: [0.7, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 1.4 }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Soft edges: fade in from My Story's sand and out into the
          sand below, so the colour arrives rather than cuts in. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sand to-transparent sm:h-32" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sand to-transparent sm:h-32" />

      <p className="relative mb-8 font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70 sm:absolute sm:left-10 sm:top-10 sm:mb-0">
        {freedomSeeker.label}
      </p>

      <motion.div
        className="relative aspect-square w-[min(60dvh,74vw)] cursor-grab touch-pan-y active:cursor-grabbing"
        drag={reduced ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        {tiers.map((tier, i) => {
          let d = (i - active + count) % count;
          if (d > count / 2) d -= count;
          const isActive = d === 0;
          const tierLook = LOOKS[i % LOOKS.length];
          const href = offerLinks[tier.title];

          return (
            <motion.div
              key={tier.title}
              className="absolute inset-0"
              initial={false}
              animate={{
                x: `${d * 88}%`,
                y: isActive ? '0%' : '6%',
                scale: isActive ? 1 : 0.58,
                rotate: isActive ? -1.5 : d * 9,
              }}
              transition={spring}
              style={{ zIndex: isActive ? 20 : 10 }}
              onClick={isActive ? undefined : () => go(d)}
              onPointerMove={isActive ? onPointerMove : undefined}
              onPointerLeave={isActive ? resetTilt : undefined}
              aria-hidden={isActive ? undefined : true}
            >
              <motion.div
                className="relative h-full w-full"
                style={isActive ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
              >
                <div className="relative h-full w-full shadow-[0_24px_50px_-18px_rgba(59,45,14,0.55)]">
                  <SleeveArt
                    tier={tier}
                    look={tierLook}
                    sizes="(min-width: 640px) 60vh, 74vw"
                    onStickerClick={isActive ? () => setDetails(i) : undefined}
                    cartHref={isActive ? href : undefined}
                    reduced={reduced}
                  />
                </div>

                {isActive && (
                  <NowPlaying
                    tier={tier}
                    reduced={reduced}
                    onPrev={() => go(-1)}
                    onNext={() => go(1)}
                    onDetails={() => setDetails(i)}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {details !== null && (
          <OfferDetails
            tier={tiers[details]}
            look={LOOKS[details % LOOKS.length]}
            href={offerLinks[tiers[details].title]}
            reduced={reduced}
            onClose={() => setDetails(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// The "now playing" bar: stretches open from a thin line, then its content
// fades in, like the reference.
function NowPlaying({
  tier,
  reduced,
  onPrev,
  onNext,
  onDetails,
}: {
  tier: Tier;
  reduced: boolean;
  onPrev: () => void;
  onNext: () => void;
  onDetails: () => void;
}) {
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <motion.div
      className="absolute inset-x-[11%] bottom-[4%] origin-center rounded-full bg-[#141414] text-cream shadow-xl"
      initial={reduced ? false : { scaleX: 0.12, scaleY: 0.35, opacity: 0 }}
      animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.45, delay: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-5 sm:py-3"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: reduced ? 0 : 0.8 }}
      >
        <button
          type="button"
          onClick={stop(onDetails)}
          aria-label={`Open ${tier.title}`}
          className="shrink-0 transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" aria-hidden="true">
            <path d="M5 3l16 9-16 9z" />
          </svg>
        </button>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate font-body text-[0.7rem] font-bold sm:text-sm">
            {tier.number.replace(/[()]/g, '')}.{tier.title}
          </p>
          <button
            type="button"
            onClick={stop(onDetails)}
            className="font-body text-[0.6rem] font-semibold uppercase tracking-widest2 text-zing-yellow underline decoration-zing-yellow/40 underline-offset-4 transition-colors hover:decoration-zing-yellow sm:text-[0.65rem]"
          >
            Learn more +
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={stop(onPrev)} aria-label="Previous offer" className="opacity-90 hover:opacity-100">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M6 5h2v14H6zM20 5v14L9 12z" />
            </svg>
          </button>
          <button type="button" onClick={stop(onNext)} aria-label="Next offer" className="opacity-90 hover:opacity-100">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// The front of a sleeve: full-bleed photo, plastic-sheen highlight and the
// round sticker. Shared by the carousel and the gatefold pop-up.
function SleeveArt({
  tier,
  look,
  sizes,
  onStickerClick,
  cartHref,
  reduced = false,
}: {
  tier: Tier;
  look: Look;
  sizes: string;
  // When set, the sticker is a button (opens the gatefold) and gently pulses
  // so it reads as clickable.
  onStickerClick?: () => void;
  // When set, a cart button links to the offer page.
  cartHref?: string;
  reduced?: boolean;
}) {
  const stickerContent = (
    <>
      <span className="font-script text-[clamp(0.85rem,3.4vw,1.6rem)] leading-[0.95]">
        {tier.title.replace(/^The /, '')}
      </span>
      <span className="mt-[6%] font-body text-[clamp(0.4rem,1.1vw,0.55rem)] font-semibold uppercase leading-tight tracking-wide text-bark/80">
        {tier.tags.join(' · ')}
      </span>
      {tier.price && (
        <span className="mt-[5%] font-body text-[clamp(0.7rem,2.2vw,1.05rem)] font-bold leading-none">{tier.price}</span>
      )}
    </>
  );
  const stickerClass =
    'absolute right-[6%] top-[6%] flex aspect-square w-[32%] flex-col items-center justify-center rounded-full px-[4%] text-center text-bark shadow-md';

  return (
    <div className="relative h-full w-full overflow-hidden">
      {(look.src ?? hero.imageSrc) && (
        <Image
          src={(look.src ?? hero.imageSrc) as string}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: look.photo }}
          aria-hidden="true"
          draggable={false}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.16) 78%, rgba(255,255,255,0) 100%)',
        }}
      />
      {onStickerClick ? (
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStickerClick();
          }}
          onPointerDownCapture={(e) => e.stopPropagation()}
          aria-label={`Learn more about ${tier.title}`}
          className={`${stickerClass} cursor-pointer`}
          style={{ backgroundColor: look.sticker, rotate: -6 }}
          animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.12, rotate: 0 }}
          whileTap={{ scale: 0.95 }}
        >
          {stickerContent}
        </motion.button>
      ) : (
        <div className={`${stickerClass} -rotate-6`} style={{ backgroundColor: look.sticker }}>
          {stickerContent}
        </div>
      )}

      {cartHref && (
        <a
          href={cartHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onPointerDownCapture={(e) => e.stopPropagation()}
          aria-label={`Buy ${tier.title} on The Leap`}
          title="Buy on The Leap"
          className="absolute left-[6%] top-[6%] flex aspect-square w-[12%] items-center justify-center rounded-full bg-[#141414] text-cream shadow-lg transition-transform hover:scale-110"
        >
          {/* Line-style shopping bag */}
          <svg
            viewBox="0 0 24 24"
            className="h-[48%] w-[48%]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 7h12l1 13H5L6 7z" />
            <path d="M9 7V6a3 3 0 0 1 6 0v1" />
          </svg>
        </a>
      )}
    </div>
  );
}

function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return narrow;
}

// "Learn more": the sleeve opens like a gatefold record. The front cover
// swings open on its hinge to reveal the inside — photo on one side, liner
// notes (description, tracklist of what's included, price) on the other —
// and the record slides out. Stacks vertically and opens upwards on phones.
function OfferDetails({
  tier,
  look,
  href,
  reduced,
  onClose,
}: {
  tier: Tier;
  look: Look;
  href?: string;
  reduced: boolean;
  onClose: () => void;
}) {
  const narrow = useIsNarrow();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const hinge = narrow
    ? { closed: { rotateX: -180, rotateY: 0 }, open: { rotateX: 0, rotateY: 0 }, origin: '50% 100%', back: 'rotateX(180deg)' }
    : { closed: { rotateX: 0, rotateY: 180 }, open: { rotateX: 0, rotateY: 0 }, origin: '100% 50%', back: 'rotateY(180deg)' };
  const ease = [0.65, 0, 0.35, 1] as const;
  const number = tier.number.replace(/[()]/g, '');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bark/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.55 } }}
      transition={{ duration: reduced ? 0 : 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={tier.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 font-body text-xs font-semibold uppercase tracking-widest2 text-cream/80 transition-colors hover:text-cream sm:right-8 sm:top-8"
      >
        Close ×
      </button>

      <div
        className="relative flex flex-col md:flex-row md:pr-[min(19vw,33dvh)]"
        style={{ perspective: 1800 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inside left (top on phones): the cover. Closed, it lies folded
            over the liner notes showing its front; it swings open to show
            the inside photo. */}
        <motion.div
          className="relative z-20 aspect-square w-[min(84vw,40dvh)] md:w-[min(36vw,62dvh)]"
          style={{ transformOrigin: hinge.origin, transformStyle: 'preserve-3d' }}
          initial={reduced ? false : hinge.closed}
          animate={hinge.open}
          exit={reduced ? undefined : { ...hinge.closed, transition: { duration: 0.6, ease } }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
        >
          {/* Inside face */}
          <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
            {/* Offers with their own artwork show it inside too; the shared
                photo is tinted in the offer's colour instead. */}
            {(look.src ?? hero.imageSrc) && (
              <Image
                src={(look.src ?? hero.imageSrc) as string}
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 84vw"
                className={`object-cover ${look.src ? '' : 'grayscale'}`}
                style={{ objectPosition: look.photo }}
                aria-hidden="true"
              />
            )}
            {!look.src && <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: look.bg }} />}
            <div
              className={`absolute inset-0 bg-gradient-to-t to-transparent ${
                look.src ? 'from-bark/85 via-bark/25' : 'from-bark/70 via-transparent'
              }`}
            />
            <span className="absolute left-[7%] top-[6%] font-body text-xs font-bold tracking-widest2 text-cream/90">
              {tier.number}
            </span>
            <p className="absolute bottom-[7%] left-[7%] right-[7%] font-display text-[clamp(1.6rem,4.2vw,3rem)] italic leading-[1] text-cream">
              {tier.title}
            </p>
          </div>
          {/* Front face (seen while closed) */}
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: hinge.back }}>
            <SleeveArt tier={tier} look={look} sizes="(min-width: 768px) 40vw, 84vw" />
          </div>
        </motion.div>

        {/* Inside right (bottom on phones): liner notes, with the record
            sliding out from behind. */}
        <div className="relative aspect-square w-[min(84vw,40dvh)] md:w-[min(36vw,62dvh)]">
          {/* The record: slides out, then spins slowly. Grooves, run-out
              band, rim and printed label turn; the light reflections stay
              put, like a real record under a lamp. */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-[4%] hidden rounded-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] md:block"
            initial={reduced ? false : { x: '0%' }}
            animate={{ x: '62%' }}
            exit={reduced ? undefined : { x: '0%', transition: { duration: 0.35 } }}
            transition={{ duration: 1.1, delay: reduced ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: [
                  // spindle hole
                  'radial-gradient(circle, #0b0b0b 0 1.3%, transparent 1.5%)',
                  // printed label with a thin edge
                  `radial-gradient(circle, ${look.sticker} 0 21.6%, rgba(0,0,0,0.35) 21.8% 22.1%, transparent 22.2%)`,
                  // smooth run-out band around the label
                  'radial-gradient(circle, transparent 0 22.2%, #181818 22.2% 27%, transparent 27%)',
                  // lighter outer rim
                  'radial-gradient(circle, transparent 0 68.6%, #2c2c2c 69% 70.7%, transparent 70.7%)',
                  // fine grooves, with a few wider gaps between "tracks"
                  'radial-gradient(circle, transparent 0 42%, rgba(255,255,255,0.05) 42.3%, transparent 42.8%, transparent 0 56%, rgba(255,255,255,0.05) 56.3%, transparent 56.8%)',
                  // faint shimmer across the grooves, so the turning reads
                  'conic-gradient(rgba(255,255,255,0.05), transparent 20%, rgba(255,255,255,0.035) 45%, transparent 62%, rgba(255,255,255,0.05) 85%, rgba(255,255,255,0.05))',
                  'repeating-radial-gradient(circle, #121212 0 1px, #1d1d1d 1px 2px)',
                ].join(', '),
              }}
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              {/* Label print: turns with the record, so the spin reads */}
              <div className="absolute inset-[35.5%] flex flex-col items-center justify-center text-center text-bark">
                <span className="font-script text-[clamp(0.6rem,1.1vw,0.95rem)] leading-none">
                  {tier.title.replace(/^The /, '')}
                </span>
                <span className="mt-[18%] font-body text-[0.4rem] font-bold uppercase tracking-widest2 opacity-70">
                  Side A · {number}
                </span>
              </div>
            </motion.div>
            {/* Static reflections, masked off the label */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 20deg, transparent 0deg, rgba(255,255,255,0.13) 25deg, transparent 55deg, transparent 180deg, rgba(255,255,255,0.1) 205deg, transparent 235deg)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 0 27%, #000 27.5% 69%, transparent 69.5%)',
                maskImage: 'radial-gradient(circle, transparent 0 27%, #000 27.5% 69%, transparent 69.5%)',
              }}
            />
          </motion.div>
          <div className="relative flex h-full w-full flex-col overflow-y-auto bg-[#FFFAEC] p-[7%] text-bark shadow-2xl">
            <div className="flex items-baseline justify-between border-b border-bark/15 pb-3">
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-widest2 text-bark/60 sm:text-xs">
                {freedomSeeker.label}
              </p>
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-widest2 text-bark/60 sm:text-xs">
                No. {number}
              </p>
            </div>

            <p className="mt-[5%] font-display text-[clamp(0.95rem,1.8vw,1.35rem)] italic leading-snug">{tier.body}</p>

            <ol className="mt-[6%] space-y-2">
              {tier.tags.map((tag, i) => (
                <li
                  key={tag}
                  className="flex items-baseline gap-3 border-b border-dashed border-bark/15 pb-2 font-body text-[0.65rem] font-semibold uppercase tracking-wide sm:text-xs"
                >
                  <span className="text-bark/45">A{i + 1}</span>
                  <span>{tag}</span>
                </li>
              ))}
            </ol>

            <div className="mt-auto flex items-center justify-between gap-3 pt-[6%]">
              {tier.price && (
                <span
                  className="rounded-full px-3 py-1 font-body text-xs font-bold text-bark"
                  style={{ backgroundColor: look.sticker }}
                >
                  {tier.price}
                </span>
              )}
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-4 py-2.5 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-105 sm:text-xs"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                    <path d="M5 3l16 9-16 9z" />
                  </svg>
                  Find out more
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
