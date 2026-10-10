import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import SiteHeader from '@/components/SiteHeader';
import Newsletter from '@/components/sections/Newsletter';
import { findArticle, formatDate, journal, parseArticle, sortedJournal } from '@/content/journal';
import { offerPages } from '@/content/site';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journal.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = findArticle((await params).slug);
  if (!a) return {};
  const path = `/journal/${a.slug}`;
  const image = a.image?.src ?? '/images/hero.jpg';
  const title = a.seoTitle ?? a.title;
  return {
    title,
    description: a.description,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title, description: a.description, publishedTime: a.date, images: [{ url: image, alt: a.image?.alt ?? SITE_NAME }] },
    twitter: { card: 'summary_large_image', title, description: a.description, images: [image] },
  };
}

const OFFER_LINE: Record<string, string> = {
  'The 5 Day Reconnect': 'If this feels familiar, start here: five days of simple practices to get out of your head and back into your body.',
  'The Freedom Frequency': 'If you’re ready to go deeper, this is everything I learned going from stuck to breaking free.',
};

// One journal article: readable single column like My Story, then a gentle
// next step (one fitting offer and Lena's story) and the next article.
export default async function ArticlePage({ params }: Props) {
  const a = findArticle((await params).slug);
  if (!a) notFound();

  const path = `/journal/${a.slug}`;
  const blocks = parseArticle(a.text);
  const list = sortedJournal();
  const next = list[(list.findIndex((x) => x.slug === a.slug) + 1) % list.length];

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      dateModified: a.date,
      inLanguage: 'en-AU',
      articleSection: a.category,
      image: absoluteUrl(a.image?.src ?? '/images/hero.jpg'),
      mainEntityOfPage: absoluteUrl(path),
      keywords: a.tags.join(', '),
      author: { '@type': 'Person', '@id': `${absoluteUrl('/')}#lena`, name: 'Lena', url: absoluteUrl('/my-story') },
      publisher: { '@type': 'Person', '@id': `${absoluteUrl('/')}#lena`, name: 'Lena' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Journal', item: absoluteUrl('/journal') },
        { '@type': 'ListItem', position: 3, name: a.title, item: absoluteUrl(path) },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader active="Journal Entries" />
      <main>
        <article className="bg-cream px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
          <header className="mx-auto max-w-2xl">
            <Link href="/journal" className="inline-block py-1.5 font-body text-xs font-semibold uppercase tracking-widest2 text-stone transition-colors hover:text-bark">
              ← Journal
            </Link>
            <p className="mt-6 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-stone">
              {a.category} · <time dateTime={a.date}>{formatDate(a.date)}</time>
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-bark sm:text-6xl">{a.title}</h1>
            {a.subtitle && <p className="mt-5 font-display text-xl italic leading-snug text-bark/75 sm:text-2xl">{a.subtitle}</p>}
          </header>

          {a.image && (
            <div className="relative mx-auto mt-12 aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-sm shadow-xl">
              <Image src={a.image.src} alt={a.image.alt} fill priority sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" style={{ objectPosition: a.image.pos }} />
            </div>
          )}

          <div className="mx-auto mt-12 max-w-2xl space-y-6">
            {blocks.map((block, i) => {
              if (block.type === 'listen') return <p key={i} className="font-body text-sm italic text-stone">🎧 {block.text}</p>;
              if (block.type === 'list')
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 font-body text-base leading-relaxed text-umber marker:text-sage sm:text-lg">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              if (block.type === 'h2') return <h2 key={i} className="pt-6 font-display text-3xl leading-snug text-bark">{block.text}</h2>;
              if (block.type === 'quote')
                return (
                  <blockquote key={i} className="border-l-4 border-sage py-1 pl-6 font-display text-2xl italic leading-snug text-bark">
                    {block.text}
                  </blockquote>
                );
              return (
                <p key={i} className="whitespace-pre-line font-body text-base leading-relaxed text-umber sm:text-lg">
                  {block.text}
                </p>
              );
            })}

            {a.substackUrl && (
              <p className="pt-4 font-body text-sm italic text-stone">
                Also on{' '}
                <a href={a.substackUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-sage underline-offset-4">
                  my Substack
                </a>
                .
              </p>
            )}
          </div>
        </article>

        {/* A gentle next step */}
        <section className="bg-sand px-6 py-16 text-center sm:py-20">
          <div className="mx-auto max-w-xl">
            {a.offer && offerPages[a.offer] ? (
              <>
                <p className="font-display text-2xl italic leading-snug text-bark sm:text-3xl">{a.offerLine ?? OFFER_LINE[a.offer]}</p>
                <Link
                  href={offerPages[a.offer]}
                  className="mt-6 inline-block py-2 font-body text-xs font-semibold uppercase tracking-wider text-bark underline decoration-sage decoration-2 underline-offset-8 hover:decoration-bark sm:tracking-widest2"
                >
                  {a.offer}{' '}→
                </Link>
              </>
            ) : (
              <p className="font-display text-2xl italic text-bark sm:text-3xl">Want the whole story?</p>
            )}
            <p className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
              <Link href="/my-story" className="inline-block py-1.5 font-body text-sm text-bark/70 hover:text-bark">
                Read my story
              </Link>
              {next && next.slug !== a.slug && (
                <Link href={`/journal/${next.slug}`} className="inline-block py-1.5 font-body text-sm text-bark/70 hover:text-bark">
                  Next: {next.title} →
                </Link>
              )}
            </p>
          </div>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
