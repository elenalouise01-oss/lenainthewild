'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type JournalArticle } from '@/content/journal';

const PAGE = 9;

type Card = Pick<JournalArticle, 'slug' | 'title' | 'description' | 'date' | 'category' | 'image'>;

// The journal as a magazine-style grid on brown, after the Get Lost stories
// page: big photos, large titles, small pill tags, a category filter and
// "Load more" instead of one long list.
export default function JournalGrid({ articles }: { articles: Card[] }) {
  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  const [category, setCategory] = useState('All');
  const [shown, setShown] = useState(PAGE);
  const list = category === 'All' ? articles : articles.filter((a) => a.category === category);

  return (
    <>
      <div className="mt-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c);
              setShown(PAGE);
            }}
            aria-pressed={category === c}
            className={`rounded-full border px-4 py-1.5 font-body text-xs font-semibold transition-colors ${
              category === c ? 'border-cream bg-cream text-bark' : 'border-cream/50 text-cream hover:border-cream'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-14 grid gap-x-5 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, shown).map((a) => (
          <article key={a.slug}>
            <Link href={`/journal/${a.slug}`} className="group block">
              {a.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={a.image.src}
                    alt={a.image.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: a.image.pos }}
                  />
                </div>
              )}
              <h2 className="mt-6 font-display text-2xl leading-snug text-cream decoration-sage decoration-2 underline-offset-4 group-hover:underline sm:text-[1.7rem]">
                {a.title}
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-cream/75 sm:text-base">{a.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-cream/70 px-3 py-1 font-body text-[0.65rem] font-semibold text-cream">{a.category}</span>
                <span className="rounded-full bg-sage px-3 py-1 font-body text-[0.65rem] font-semibold text-bark">{formatDate(a.date)}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {shown < list.length && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="rounded-full border-2 border-cream px-8 py-3 font-body text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-bark"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
