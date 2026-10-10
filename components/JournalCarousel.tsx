'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { journal } from '@/content/journal';
import { freedomSeeker } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// My Journal cards: the reference's "video projects" row.
const ROAD_PHOTOS = [
  { src: '/images/road/road-2.jpg', pos: '50% 35%' },
  { src: '/images/road/road-1.jpg', pos: '40% 60%' },
  { src: '/images/road/road-6.jpg', pos: '50% 60%' },
  { src: '/images/road/road-8.jpg', pos: '50% 70%' },
];

// Pixels per second the row drifts left.
const SPEED = 28;
// The cards are repeated so the row can loop forever: it starts on the
// second copy and jumps back by one copy's width whenever it drifts (or is
// stepped) too far either way — the jump lands on identical cards, so it
// can't be seen.
const COPIES = 4;

export default function JournalCarousel() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const [playing, setPlaying] = useState(true);
  const moving = playing && !reduced;

  // Width of one full set of cards.
  const setWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const cards = el.querySelectorAll<HTMLElement>('[data-card]');
    const perSet = freedomSeeker.pillars.length;
    return cards.length > perSet ? cards[perSet].offsetLeft - cards[0].offsetLeft : 0;
  }, []);

  // Bring the scroll position back between `lo` and `hi` copies in.
  const wrap = useCallback(
    (lo: number, hi: number) => {
      const el = trackRef.current;
      const w = setWidth();
      if (!el || !w) return;
      if (el.scrollLeft >= hi * w) el.scrollLeft -= w;
      else if (el.scrollLeft < lo * w) el.scrollLeft += w;
      pos.current = el.scrollLeft;
    },
    [setWidth],
  );

  // Start on the second copy.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = setWidth();
    pos.current = el.scrollLeft;
  }, [setWidth]);

  // The slow drift.
  useEffect(() => {
    if (!moving) return;
    const el = trackRef.current;
    if (!el) return;
    pos.current = el.scrollLeft;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      // Pick up any scrolling done by hand since the last frame.
      if (Math.abs(el.scrollLeft - pos.current) > 2) pos.current = el.scrollLeft;
      pos.current += (SPEED * Math.min(now - last, 100)) / 1000;
      last = now;
      el.scrollLeft = pos.current;
      const w = setWidth();
      if (w && pos.current >= 2 * w) {
        pos.current -= w;
        el.scrollLeft = pos.current;
      }
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [moving, setWidth]);

  // Previous / Next: stop the drift and step one card.
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    setPlaying(false);
    wrap(1, 2);
    const card = el.querySelector<HTMLElement>('[data-card]');
    el.scrollBy({ left: ((card?.offsetWidth ?? 300) + 24) * dir, behavior: 'smooth' });
  };

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{freedomSeeker.pillarsLabel}</h2>
          <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-umber">{freedomSeeker.pillarsIntro}</p>
        </div>
        <div className="flex items-center gap-5 font-body text-xs font-semibold uppercase tracking-widest2">
          <button type="button" onClick={() => step(-1)} className="text-bark/50 transition-colors hover:text-bark">
            Previous
          </button>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause' : 'Play'}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-bark/30 text-bark transition-colors hover:bg-bark hover:text-cream"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden="true">
                  <path d="M6 3l15 9-15 9z" />
                </svg>
              )}
            </button>
          )}
          <button type="button" onClick={() => step(1)} className="text-bark underline decoration-sage decoration-2 underline-offset-8">
            Next
          </button>
        </div>
      </div>

      {/* Tap a card to stop (or restart) the drift; swiping the row by
          hand also stops it. */}
      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 mt-12 flex gap-6 overflow-x-auto px-6"
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') setPlaying(false);
        }}
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) setPlaying(false);
        }}
        onScroll={() => {
          // Only near the far ends, so a step's smooth slide isn't cut short.
          if (!moving) wrap(0.2, 2.8);
        }}
      >
        {Array.from({ length: COPIES }, (_, copy) =>
          freedomSeeker.pillars.map((pillar, i) => {
            const photo = ROAD_PHOTOS[i % ROAD_PHOTOS.length];
            // The article on this site if it's been added to the journal,
            // otherwise its Substack post.
            const onSite = journal.find((a) => a.title === pillar.title);
            const href = onSite ? `/journal/${onSite.slug}` : 'href' in pillar ? pillar.href : undefined;
            const external = !!href && href.startsWith('http');
            const hidden = copy !== 1;
            const body = (
              <>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md">
                  <Image src={photo.src} alt="" fill sizes="(min-width: 640px) 25vw, 70vw" className="object-cover" style={{ objectPosition: photo.pos }} aria-hidden="true" />
                </div>
                <h4 className="mt-5 font-display text-2xl text-bark">{pillar.title}</h4>
                <p className="mt-1 line-clamp-2 font-body text-xs text-umber">{pillar.excerpt}</p>
                <p className="mt-3 font-body text-[0.6rem] font-semibold uppercase leading-relaxed tracking-wide text-stone">{pillar.roles}</p>
                {href && (
                  <p className="mt-3 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8">
                    Read →
                  </p>
                )}
              </>
            );
            const cardClass = 'block w-[70%] flex-none text-left sm:w-[calc(40%-12px)] lg:w-[calc(23%-18px)]';
            return href ? (
              <a
                key={`${copy}-${pillar.title}`}
                data-card
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-hidden={hidden}
                tabIndex={hidden ? -1 : undefined}
                className={cardClass}
              >
                {body}
              </a>
            ) : (
              <div
                key={`${copy}-${pillar.title}`}
                data-card
                onClick={() => setPlaying((p) => !p)}
                aria-hidden={hidden}
                className={`${cardClass} cursor-pointer`}
              >
                {body}
              </div>
            );
          }),
        )}
      </div>

      {/* The full journal on this site once it has articles; Substack until then */}
      {journal.length ? (
        <Link
          href="/journal"
          className="mt-10 inline-block py-2 font-body text-xs font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark"
        >
          Read the journal →
        </Link>
      ) : (
        <a
          href={freedomSeeker.pillarsCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block py-2 font-body text-xs font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark"
        >
          {freedomSeeker.pillarsCta.label} →
        </a>
      )}
    </>
  );
}
