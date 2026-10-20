import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import JournalGrid from '@/components/JournalGrid';
import JsonLd from '@/components/JsonLd';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import Newsletter from '@/components/sections/Newsletter';
import { journalPage, sortedJournal } from '@/content/journal';
import { SITE_NAME, absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'Journal: Honest Stories on Old Patterns, Healing & Starting Over — Lena in the Wild';
const description =
  'Honest stories on feeling stuck, emotional triggers, people-pleasing and old patterns, and on creating a life that feels like yours after leaving Sydney at 36.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/journal' },
  openGraph: { url: '/journal', title, description, images: [{ url: '/images/hero.jpg', width: 1809, height: 930, alt: 'Lena in the Wild' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/hero.jpg'] },
};

// All journal articles, newest first, in a magazine-style grid with a
// category filter. Hidden until the first article is added.
export default function JournalPage() {
  const articles = sortedJournal();
  if (articles.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbs('Journal', '/journal'),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${SITE_NAME} Journal`,
            url: absoluteUrl('/journal'),
            description,
            inLanguage: 'en-AU',
            author: { '@id': `${absoluteUrl('/')}#lena` },
            blogPost: articles.map((a) => ({
              '@type': 'BlogPosting',
              headline: a.title,
              url: absoluteUrl(`/journal/${a.slug}`),
              datePublished: a.date,
            })),
          },
        ]}
      />
      <SiteHeader active="Journal Entries" />
      <main>
        {/* Magazine-style: brown, centred title, big photo grid */}
        <section className="bg-bark px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-[78rem]">
            <ScrollReveal className="mx-auto max-w-3xl text-center">
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-sage">{journalPage.label}</p>
              <h1 className="mt-4 font-display text-5xl leading-tight text-cream sm:text-7xl">{journalPage.heading}</h1>
              <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-cream/80 sm:text-lg">{journalPage.intro}</p>
            </ScrollReveal>
            <JournalGrid
              articles={articles.map(({ slug, title, description, date, category, image }) => ({ slug, title, description, date, category, image }))}
            />
          </div>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
