'use client';

import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type JournalArticle } from '@/content/journal';

const PAGE = 9;

type Card = Pick<JournalArticle, 'slug' | 'title' | 'description' | 'date' | 'category' | 'image'>;

// Each card is pinned to the page a little differently, like a real scrapbook.
const TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-[1.5deg]'];
const FASTENERS = ['tape', 'pin', 'clip', 'tape', 'clip', 'pin'] as const;
const STICKERS: Record<number, { src: string; w: number; h: number; className: string }> = {
  1: { src: '/images/bow.png', w: 202, h: 226, className: '-right-1 -top-6 w-14 rotate-12' },
  4: { src: '/images/sticker-star.png', w: 169, h: 161, className: '-left-5 -top-5 w-12 -rotate-12' },
  7: { src: '/images/sticker-flower.png', w: 241, h: 231, className: '-left-6 -top-6 w-16 -rotate-6' },
  10: { src: '/images/sticker-star-scribble.png', w: 186, h: 167, className: '-right-5 -top-5 w-12 rotate-12' },
  14: { src: '/images/bow.png', w: 202, h: 226, className: '-left-5 -top-6 w-14 -rotate-12' },
};
// Sticky-note colours for the category tabs
const TABS = ['bg-zing-yellow', 'bg-sage/70', 'bg-zing-babypink', 'bg-zing-green', 'bg-cream'];

const num = (n: number) => `(${String(n).padStart(2, '0')})`;

function Fastener({ kind }: { kind: (typeof FASTENERS)[number] }) {
  if (kind === 'tape')
    return <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 bg-[#e9dcc6]/85 shadow-sm" />;
  if (kind === 'pin')
    return (
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff9b9b,#c73c3c_60%,#8e2424)] shadow-[1px_2px_2px_rgba(0,0,0,0.35)]"
      />
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 24 60" className="absolute -top-5 right-6 z-10 h-14 w-6 drop-shadow-sm" fill="none" stroke="#9a9a9a" strokeWidth="2.2" strokeLinecap="round">
      <path d="M8 40 V10 a4 4 0 0 1 8 0 V46 a6 6 0 0 1 -12 0 V16" />
    </svg>
  );
}

// One loop of a gold twin-wire binding, as on a notebook: two wires wrap
// round the left edge of the page and go into a slot punched just inside it.
function GoldWire() {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 22" className="h-[22px] w-16 overflow-visible">
      <defs>
        <linearGradient id={`wire-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a5a1e" />
          <stop offset="0.45" stopColor="#fbe9b4" />
          <stop offset="1" stopColor="#8f6a26" />
        </linearGradient>
        <filter id={`shade-${id}`} x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      {/* the slot punched in the page */}
      <rect x="44" y="4" width="12" height="14" rx="2.5" fill="#3a352d" />
      <rect x="44" y="4" width="12" height="3.5" rx="1.5" fill="#1f1b16" />
      {/* soft shadow under the wires */}
      <path d="M2 14 H 49 M2 19 H 49" stroke="#3b2d0e" strokeOpacity="0.25" strokeWidth="3" filter={`url(#shade-${id})`} />
      {/* the two wires, rounding over the page edge on the left */}
      {[7, 13].map((y) => (
        <g key={y}>
          <path d={`M50 ${y + 1} H 6 C 1 ${y + 1}, 1 ${y - 4}, 6 ${y - 4}`} fill="none" stroke={`url(#wire-${id})`} strokeWidth="3.2" strokeLinecap="round" />
          <path d={`M47 ${y} H 8`} stroke="#fffaf0" strokeOpacity="0.8" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

// Turning a page: going forward, the current page lifts from the binding on
// the left and swings over like a page in a book, revealing the next one
// underneath; going back, the previous page swings back over the top.
const EASE = [0.645, 0.045, 0.355, 1] as const;
const pageTurn: Variants = {
  enter: (dir: number) => (dir > 0 ? { rotateY: 0, opacity: 1, zIndex: 0 } : { rotateY: -120, opacity: 0, zIndex: 2 }),
  center: { rotateY: 0, opacity: 1, zIndex: 1, transition: { duration: 1.1, ease: EASE } },
  exit: (dir: number) =>
    dir > 0
      ? { rotateY: -120, opacity: 0, zIndex: 2, transition: { duration: 1.1, ease: EASE, opacity: { duration: 0.4, delay: 0.7 } } }
      : { opacity: 0, zIndex: 0, transition: { duration: 0.2, delay: 0.9 } },
};
const noTurn: Variants = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0, transition: { duration: 0 } } };

// The journal as a wire-bound scrapbook: lined paper, taped and pinned
// polaroids, a typewriter note, handwritten headings and stickers.
export default function JournalScrapbook({ articles, heading, intro }: { articles: Card[]; heading: string; intro: string }) {
  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const reduced = useReducedMotion();
  const pagesRef = useRef<HTMLDivElement>(null);
  const list = category === 'All' ? articles : articles.filter((a) => a.category === category);
  const [featured, ...rest] = list;
  const pageCount = Math.max(1, Math.ceil(rest.length / PAGE));
  const onPage = rest.slice(page * PAGE, (page + 1) * PAGE);

  // Scroll back up to the top of the page first, then turn it, so the turn
  // is in view.
  const turn = (step: number) => {
    const top = pagesRef.current?.getBoundingClientRect().top ?? 0;
    const needsScroll = Math.abs(top - 120) > 40;
    window.scrollTo({ top: window.scrollY + top - 120, behavior: reduced ? 'auto' : 'smooth' });
    window.setTimeout(
      () => {
        setDir(step);
        setPage((p) => p + step);
      },
      reduced || !needsScroll ? 0 : 650,
    );
  };
  const number = (slug: string) => num(articles.findIndex((a) => a.slug === slug) + 1);

  return (
    <div className="relative ml-5 max-w-6xl rounded-sm bg-white sm:mx-auto bg-[linear-gradient(transparent_31px,#e4e4e4_31px)] bg-[size:100%_32px] pb-16 pl-[5.25rem] pr-8 pt-12 shadow-[0_20px_50px_rgba(59,45,14,0.18)] sm:pl-24 sm:pr-12 sm:pt-16">
      {/* The back page peeking out on the left, with the kraft cover edge
          showing where it folds */}
      <div aria-hidden="true" className="absolute -left-5 bottom-0 top-0 w-5 rounded-l-sm bg-[#f5f1e9] shadow-[-4px_8px_16px_rgba(59,45,14,0.12)]" />
      <div aria-hidden="true" className="absolute -left-1.5 bottom-0 top-0 w-1.5 bg-[#b88b5c]" />

      {/* Gold twin-wire binding down the left edge, evenly spaced */}
      <div aria-hidden="true" className="absolute -left-6 bottom-5 top-5 flex flex-col gap-6 overflow-hidden">
        {Array.from({ length: 160 }).map((_, i) => (
          <GoldWire key={i} />
        ))}
      </div>

      {/* Heading: handwritten, with a typewriter note taped on */}
      <header className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="font-type text-sm text-umber">no. 01 — {new Date().getFullYear()}</p>
          <h1 className="mt-2 font-hand text-6xl leading-[0.95] text-bark sm:text-8xl">{heading}</h1>
        </div>
        <div className="relative rotate-1 bg-cream px-6 py-6 shadow-md lg:mb-3">
          <span aria-hidden="true" className="absolute -top-3 left-8 h-6 w-20 -rotate-6 bg-zing-babypink/80 shadow-sm" />
          <p className="font-type text-sm leading-relaxed text-bark sm:text-base">{intro}</p>
        </div>
        <Image src="/images/sticker-star.png" alt="" width={169} height={161} aria-hidden="true" className="absolute -right-2 -top-10 hidden h-auto w-14 rotate-12 sm:block" />
      </header>

      {/* Category tabs, like sticky notes */}
      <div className="mt-12 flex flex-wrap gap-3" role="group" aria-label="Filter by category">
        {categories.map((c, i) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c);
              setDir(1);
              setPage(0);
            }}
            aria-pressed={category === c}
            className={`${TABS[i % TABS.length]} ${i % 2 ? 'rotate-1' : '-rotate-1'} px-4 py-2 font-type text-sm text-bark shadow-sm transition-transform hover:-translate-y-0.5 ${
              category === c ? 'outline outline-2 outline-offset-2 outline-bark' : ''
            }`}
          >
            {c.toLowerCase()}
          </button>
        ))}
      </div>

      {/* The pages: each is its own sheet of lined paper (reaching back to
          the binding) so it can turn like a page in a book */}
      <div ref={pagesRef} className="relative mt-14 [perspective:2600px]">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={`${category}-${page}`}
            custom={dir}
            variants={reduced ? noTurn : pageTurn}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
            className="-ml-[5.25rem] -mr-8 bg-white bg-[linear-gradient(transparent_31px,#e4e4e4_31px)] bg-[size:100%_32px] pb-4 pl-[5.25rem] pr-8 pt-6 shadow-[0_0_30px_rgba(59,45,14,0.08)] sm:-ml-24 sm:-mr-12 sm:pl-24 sm:pr-12"
          >
            {/* Latest entry: a big pinned polaroid with its note beside it */}
            {page === 0 && featured && (
              <Link href={`/journal/${featured.slug}`} className="group relative mb-20 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
                <div className="relative -rotate-2 bg-white p-3 pb-14 shadow-xl">
                  <Fastener kind="clip" />
                  {featured.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={featured.image.src} alt={featured.image.alt} fill sizes="(min-width: 1024px) 34rem, 90vw" className="object-cover" style={{ objectPosition: featured.image.pos }} />
                    </div>
                  )}
                  <p className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-bark">latest entry ♡</p>
                  <Image src="/images/sticker-flower.png" alt="" width={241} height={231} aria-hidden="true" className="absolute -bottom-8 -right-6 h-auto w-20 rotate-12" />
                </div>
                <div>
                  <p className="font-type text-sm text-umber">
                    {number(featured.slug)} · {featured.category.toLowerCase()} · {formatDate(featured.date)}
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-bark sm:text-4xl">{featured.title}</h2>
                  <p className="mt-4 font-body text-base leading-relaxed text-umber">{featured.description}</p>
                  <p className="mt-6 inline-flex items-center gap-2 font-hand text-2xl text-bark">
                    read this entry
                    <svg viewBox="0 0 60 24" className="h-6 w-14 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M2 14 C 18 4, 34 22, 54 11" />
                      <path d="M46 6 L55 11 L47 17" />
                    </svg>
                  </p>
                </div>
              </Link>
            )}

            {/* The rest: polaroids pinned at slightly different angles */}
            <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {onPage.map((a, i) => {
                const sticker = STICKERS[i];
                return (
                  <article key={a.slug} className={`${TILTS[i % TILTS.length]} transition-transform duration-300 hover:rotate-0`}>
                    <Link href={`/journal/${a.slug}`} className="group block">
                      <div className="relative bg-white p-2.5 pb-10 shadow-lg">
                        <Fastener kind={FASTENERS[i % FASTENERS.length]} />
                        {a.image && (
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image src={a.image.src} alt={a.image.alt} fill sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw" className="object-cover" style={{ objectPosition: a.image.pos }} />
                          </div>
                        )}
                        <p className="absolute bottom-2.5 left-3 font-type text-xs text-umber">{number(a.slug)}</p>
                        <p className="absolute bottom-2 right-3 font-hand text-base text-bark">{a.category.toLowerCase()}</p>
                        {sticker && (
                          <Image src={sticker.src} alt="" width={sticker.w} height={sticker.h} aria-hidden="true" className={`absolute z-10 h-auto drop-shadow-md ${sticker.className}`} />
                        )}
                      </div>
                      <h2 className="mt-5 font-display text-xl leading-snug text-bark decoration-sage decoration-2 underline-offset-4 group-hover:underline">{a.title}</h2>
                      <p className="mt-2 font-type text-xs text-umber">{formatDate(a.date)}</p>
                    </Link>
                  </article>
                );
              })}
            </div>

            {/* Page turning */}
            {pageCount > 1 && (
              <div className="mt-16 flex items-center justify-between gap-4">
                {page > 0 ? (
                  <button type="button" onClick={() => turn(-1)} className="group inline-flex items-center gap-2 font-hand text-2xl text-bark sm:text-3xl">
                    <svg viewBox="0 0 60 24" className="h-6 w-14 -scale-x-100 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M2 14 C 18 4, 34 22, 54 11" />
                      <path d="M46 6 L55 11 L47 17" />
                    </svg>
                    back a page
                  </button>
                ) : (
                  <span />
                )}
                <p className="font-type text-sm text-umber">
                  page {page + 1} of {pageCount}
                </p>
                {page < pageCount - 1 ? (
                  <button type="button" onClick={() => turn(1)} className="group inline-flex items-center gap-2 font-hand text-2xl text-bark sm:text-3xl">
                    turn the page
                    <svg viewBox="0 0 60 24" className="h-6 w-14 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M2 14 C 18 4, 34 22, 54 11" />
                      <path d="M46 6 L55 11 L47 17" />
                    </svg>
                  </button>
                ) : (
                  <span />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
