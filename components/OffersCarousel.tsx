'use client';

import { useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import Image from 'next/image';
import { freedomSeeker, hero, offerLinks } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// Mirrors the "Offers reference" video: each offer is a square record sleeve
// in the middle of a big soft circle, neighbours tilted and peeking in from
// the edges, a round sticker on the sleeve and a black "now playing" bar.
// Colours are the brand palette; `photo` is the crop of the shared photo.
const LOOKS = [
  { bg: '#CBA1D4', circle: '#fffba0', sticker: '#ff8bb8', photo: '30% 12%' },
  { bg: '#ff8bb8', circle: '#CBA1D4', sticker: '#fffba0', photo: '60% 25%' },
  { bg: '#fffba0', circle: '#ff8bb8', sticker: '#bee5b0', photo: '80% 45%' },
];

const SWIPE_THRESHOLD = 60;

export default function OffersCarousel() {
  const reduced = useReducedMotion();
  const tiers = freedomSeeker.tiers;
  const count = tiers.length;
  const [active, setActive] = useState(0);

  const go = (step: number) => setActive((a) => (a + step + count) % count);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  const spring = reduced ? { duration: 0 } : { type: 'spring' as const, stiffness: 150, damping: 22 };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden py-16">
      {/* Background: flat colour with a big soft-edged circle, one layer per
          offer, cross-faded as the active sleeve changes. */}
      {LOOKS.slice(0, count).map((look, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.6 }}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${look.circle} 0, ${look.circle} min(44dvh, 48vw), ${look.bg} min(56dvh, 62vw))`,
          }}
        />
      ))}

      <motion.div
        className="relative aspect-square w-[min(60dvh,74vw)] cursor-grab touch-pan-y active:cursor-grabbing"
        drag={reduced ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={onDragEnd}
      >
        {tiers.map((tier, i) => {
          let d = (i - active + count) % count;
          if (d > count / 2) d -= count;
          const isActive = d === 0;
          const look = LOOKS[i % LOOKS.length];
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
              onClick={isActive ? undefined : () => setActive(i)}
              aria-hidden={isActive ? undefined : true}
            >
              {/* Sleeve: full-bleed photo with a plastic-sheen highlight */}
              <div className="relative h-full w-full overflow-hidden shadow-[0_24px_50px_-18px_rgba(59,45,14,0.5)]">
                {hero.imageSrc && (
                  <Image
                    src={hero.imageSrc}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 60vh, 74vw"
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

                {/* Round sticker: script title, tiny print underneath */}
                <div
                  className="absolute right-[6%] top-[6%] flex aspect-square w-[32%] -rotate-6 flex-col items-center justify-center rounded-full px-[4%] text-center text-bark shadow-md"
                  style={{ backgroundColor: look.sticker }}
                >
                  <span className="font-script text-[clamp(0.85rem,3.4vw,1.6rem)] leading-[0.95]">
                    {tier.title.replace(/^The /, '')}
                  </span>
                  <span className="mt-[6%] font-body text-[clamp(0.4rem,1.1vw,0.55rem)] font-semibold uppercase leading-tight tracking-wide text-bark/80">
                    {tier.tags.join(' · ')}
                  </span>
                </div>
              </div>

              {/* "Now playing" bar, overlapping the bottom of the sleeve —
                  only on the centre sleeve, like the reference. */}
              {isActive && (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: reduced ? 0 : 0.15 }}
                className="absolute inset-x-[11%] bottom-[4%] flex items-center gap-3 rounded-full bg-[#141414] px-4 py-2.5 text-cream shadow-xl sm:gap-4 sm:px-5 sm:py-3">
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
                  <p className="truncate font-body text-[0.6rem] text-cream/75 sm:text-xs">{freedomSeeker.label}</p>
                  {tier.price && (
                    <p className="font-body text-[0.55rem] text-cream/55 sm:text-[0.65rem]">{tier.price}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                                        aria-label="Previous offer"
                    className="opacity-90 transition-opacity hover:opacity-100"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M6 5h2v14H6zM20 5v14L9 12z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                                        aria-label="Next offer"
                    className="opacity-90 transition-opacity hover:opacity-100"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
