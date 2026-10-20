'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type JournalArticle } from '@/content/journal';

const PAGE = 9;

type Card = Pick<JournalArticle, 'slug' | 'title' | 'description' | 'date' | 'category' | 'image'>;

// Each card is pinned to the page a little differently, like a real scrapbook.
const TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-[1.5deg]'];
const FASTENERS = ['tape', 'pin', 'clip', 'tape', 'clip', 'pin'] as const;
const STICKERS: Record<number, { src: string; w: number; h: number; className: string }> = {
  1: { src: '/images/bow.png', w: 202, h: 226, className: '-right-5 -top-6 w-14 rotate-12' },
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

// One planner ring in gold: it joins a punched hole in the back page strip
// to a punched hole in the journal page, like a ring binder.
function GoldRing({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 92 30" className={`h-[30px] w-[92px] ${className}`}>
      <defs>
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a6a2c" />
          <stop offset="0.3" stopColor="#f6e3a6" />
          <stop offset="0.55" stopColor="#c9a24f" />
          <stop offset="1" stopColor="#6e5222" />
        </linearGradient>
      </defs>
      {/* punched holes: one in the back strip, one in the page */}
      <circle cx="12" cy="15" r="7" fill="#9b9182" />
      <circle cx="13" cy="16" r="5.5" fill="#d8d0c2" />
      <circle cx="80" cy="15" r="7" fill="#9b9182" />
      <circle cx="81" cy="16" r="5.5" fill="#d8d0c2" />
      {/* the ring, running from hole to hole */}
      <rect x="9" y="9.5" width="74" height="11" rx="5.5" fill="none" stroke={`url(#gold-${id})`} strokeWidth="4" />
      {/* the little join in the middle of the ring */}
      <rect x="44" y="7.5" width="4" height="15" rx="1.5" fill={`url(#gold-${id})`} />
    </svg>
  );
}

// Rings come in little sets of three, like a planner.
function RingSet() {
  return (
    <div className="flex flex-col gap-4">
      {[0, 1, 2].map((k) => (
        <GoldRing key={k} />
      ))}
    </div>
  );
}

// The journal as a ring-bound scrapbook: lined paper, taped and pinned
// polaroids, a typewriter note, handwritten headings and stickers.
export default function JournalScrapbook({ articles, heading, intro }: { articles: Card[]; heading: string; intro: string }) {
  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  const [category, setCategory] = useState('All');
  const [shown, setShown] = useState(PAGE);
  const list = category === 'All' ? articles : articles.filter((a) => a.category === category);
  const [featured, ...rest] = list;
  const number = (slug: string) => num(articles.findIndex((a) => a.slug === slug) + 1);

  return (
    <div className="relative mx-auto max-w-6xl rounded-sm bg-white bg-[linear-gradient(transparent_31px,#e4e4e4_31px)] bg-[size:100%_32px] px-5 pb-16 pt-16 shadow-[0_20px_50px_rgba(59,45,14,0.18)] sm:pl-20 sm:pr-12 sm:pt-20">
      {/* Gold planner rings: along the top on a phone, down the left on wider screens */}
      <div aria-hidden="true" className="absolute -top-11 inset-x-0 h-11 rounded-t-sm border-b-[3px] border-[#d9cfbd] bg-[#f6f3ec] sm:hidden" />
      <div aria-hidden="true" className="absolute -top-2 inset-x-6 flex justify-between sm:hidden">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <span key={k} className={`relative block h-[30px] w-8 ${k === 2 ? 'mr-auto' : ''}`}>
            <GoldRing className="absolute left-1/2 top-0 -translate-x-1/2 rotate-90" />
          </span>
        ))}
      </div>
      {/* The back page of the planner peeking out on the left, with the
          gold rings joining it to this page */}
      <div aria-hidden="true" className="absolute -left-12 bottom-0 top-0 hidden w-12 rounded-l-sm border-r-[3px] border-[#d9cfbd] bg-[#f6f3ec] shadow-[-6px_10px_20px_rgba(59,45,14,0.12)] sm:block" />
      <div aria-hidden="true" className="absolute -left-[3.6rem] bottom-16 top-16 hidden flex-col justify-between sm:flex">
        {[0, 1, 2, 3, 4, 5].map((g) => (
          <RingSet key={g} />
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
              setShown(PAGE);
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

      {/* Latest entry: a big pinned polaroid with its note beside it */}
      {featured && (
        <Link href={`/journal/${featured.slug}`} className="group relative mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
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
      <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {rest.slice(0, shown).map((a, i) => {
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

      {shown < rest.length && (
        <div className="mt-16 flex justify-center">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="group inline-flex items-center gap-2 font-hand text-3xl text-bark">
            turn the page
            <svg viewBox="0 0 60 24" className="h-6 w-14 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M2 14 C 18 4, 34 22, 54 11" />
              <path d="M46 6 L55 11 L47 17" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
