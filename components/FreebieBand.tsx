import Link from 'next/link';
import { freebies } from '@/content/site';

// The free quiz, just before each article's "next step". (For now every
// article offers the quiz; freebies.quizArticles and freebies.tapping are kept
// in case the tapping practice goes back on some articles.)
export default function FreebieBand() {
  const kind = freebies.quiz;
  return (
    <section className="bg-sage px-6 py-14 text-center sm:py-16">
      <div className="mx-auto max-w-xl">
        <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70">Free</p>
        <p className="mt-4 font-display text-2xl italic leading-snug text-bark sm:text-3xl">{kind.line}</p>
        <Link
          href={kind.href}
          className="mt-7 inline-block rounded-full bg-bark px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-105"
        >
          {kind.cta} →
        </Link>
      </div>
    </section>
  );
}
