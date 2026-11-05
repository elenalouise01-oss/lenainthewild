import Link from 'next/link';
import { freebies } from '@/content/site';

// The free thing that fits an article, just before its "next step": the quiz
// for intuition and decisions, the tapping practice for everything else.
export default function FreebieBand({ slug }: { slug: string }) {
  const kind = freebies.quizArticles.includes(slug) ? freebies.quiz : freebies.tapping;
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
