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
// Brand palette only; `photo` is the crop of the shared photo.
const LOOKS = [
  { bg: '#CBA1D4', circle: '#fffba0', sticker: '#ff8bb8', photo: '30% 12%' },
  { bg: '#ff8bb8', circle: '#CBA1D4', sticker: '#fffba0', photo: '60% 25%' },
  { bg: '#fffba0', circle: '#ff8bb8', sticker: '#bee5b0', photo: '80% 45%' },
];

const SWIPE_THRESHOLD = 60;
const MAX_TILT = 14;

type Tier = (typeof freedomSeeker.tiers)[number];

export default function OffersCarousel() {
  const reduced = useReducedMotion();
  const tiers = freedomSeeker.tiers;
  const count = tiers.length;
  const [active, setActive] = useState(0);
  const [details, setDetails] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);

  // 3D tilt of the centre sleeve, following the pointer / drag.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 18 });
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };
  const onPointerLeave = () => {
    setHovering(false);
    resetTilt();
  };

  const go = (step: number) => {
    resetTilt();
    setHovering(false);
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
              onPointerEnter={isActive ? () => setHovering(true) : undefined}
              onPointerMove={isActive ? onPointerMove : undefined}
              onPointerLeave={isActive ? onPointerLeave : undefined}
              aria-hidden={isActive ? undefined : true}
            >
              <motion.div
                className="relative h-full w-full"
                style={isActive ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
              >
                {/* Sleeve: full-bleed photo with a plastic-sheen highlight */}
                <div className="relative h-full w-full overflow-hidden shadow-[0_24px_50px_-18px_rgba(59,45,14,0.55)]">
                  {hero.imageSrc && (
                    <Image
                      src={hero.imageSrc}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 60vh, 74vw"
                      className="object-cover"
                      style={{ objectPosition: tierLook.photo }}
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

                  {/* Hover: a short description slides over the sleeve */}
                  {isActive && (
                    <div
                      className={`pointer-events-none absolute inset-0 flex items-start bg-gradient-to-b from-bark/85 via-bark/55 to-transparent p-[8%] pr-[40%] transition-opacity duration-500 ${
                        hovering ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <p className="font-display text-[clamp(0.95rem,2.4vw,1.35rem)] italic leading-snug text-cream">
                        {tier.body}
                      </p>
                    </div>
                  )}

                  {/* Round sticker: script title, tiny print underneath */}
                  <div
                    className="absolute right-[6%] top-[6%] flex aspect-square w-[32%] -rotate-6 flex-col items-center justify-center rounded-full px-[4%] text-center text-bark shadow-md"
                    style={{ backgroundColor: tierLook.sticker }}
                  >
                    <span className="font-script text-[clamp(0.85rem,3.4vw,1.6rem)] leading-[0.95]">
                      {tier.title.replace(/^The /, '')}
                    </span>
                    <span className="mt-[6%] font-body text-[clamp(0.4rem,1.1vw,0.55rem)] font-semibold uppercase leading-tight tracking-wide text-bark/80">
                      {tier.tags.join(' · ')}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <NowPlaying
                    tier={tier}
                    href={href}
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
            index={details}
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
  href,
  reduced,
  onPrev,
  onNext,
  onDetails,
}: {
  tier: Tier;
  href?: string;
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
      className="absolute inset-x-[11%] bottom-[4%] origin-center rounded-full bg-bark text-cream shadow-xl"
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
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${tier.title}`}
            className="shrink-0 transition-transform hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" aria-hidden="true">
              <path d="M5 3l16 9-16 9z" />
            </svg>
          </a>
        ) : (
          <span className="shrink-0" aria-label="Locked">
            <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" aria-hidden="true">
              <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1zm2 0h6V8a3 3 0 0 0-6 0v2z" />
            </svg>
          </span>
        )}
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
          {tier.price && <p className="font-body text-[0.55rem] text-cream/55 sm:text-[0.65rem]">{tier.price}</p>}
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

// Pop-up with the original dark offer card: title, description, tags,
// price, photo and a link to the offer page.
function OfferDetails({
  tier,
  index,
  href,
  reduced,
  onClose,
}: {
  tier: Tier;
  index: number;
  href?: string;
  reduced: boolean;
  onClose: () => void;
}) {
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

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bark/60 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={tier.title}
    >
      <motion.div
        className="relative max-h-full w-full max-w-4xl overflow-y-auto bg-bark p-8 sm:grid sm:grid-cols-[5fr_2fr_5fr] sm:items-start sm:p-10"
        initial={reduced ? false : { y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={reduced ? undefined : { y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream/60 transition-colors hover:text-cream"
        >
          Close ×
        </button>

        <div className="mt-6 sm:mt-0">
          <h3 className="font-display text-3xl text-cream sm:text-4xl">{tier.title}</h3>
          <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-cream/70">{tier.body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tier.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cream/25 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-cream/70"
              >
                {tag}
              </span>
            ))}
            {tier.price && (
              <span className="rounded-full bg-zing-yellow px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-bark">
                {tier.price}
              </span>
            )}
          </div>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-body text-xs font-semibold uppercase tracking-widest2 text-cream underline decoration-cream/40 underline-offset-8 transition-colors hover:decoration-cream"
            >
              Find out more →
            </a>
          )}
        </div>

        <div className="col-start-3 mt-6 sm:mt-0">
          <div className="text-right font-body text-sm text-cream/40 sm:mt-6">{tier.number}</div>
          <div className="relative mt-3 aspect-[5/3] w-full overflow-hidden">
            {hero.imageSrc && (
              <Image
                src={hero.imageSrc}
                alt=""
                fill
                sizes="(min-width: 640px) 24rem, 90vw"
                className="object-cover"
                style={{ objectPosition: `${20 + index * 25}% ${10 + index * 15}%` }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
