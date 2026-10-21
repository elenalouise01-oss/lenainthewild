import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import JournalScrapbook from '@/components/JournalScrapbook';
import JsonLd from '@/components/JsonLd';
import SiteHeader from '@/components/SiteHeader';
import Newsletter from '@/components/sections/Newsletter';
import { journalPage, sortedJournal } from '@/content/journal';
import { SITE_NAME, absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'Journal: Stories on Old Patterns, Inner Work & Starting Over — Lena in the Wild';
const description =
  'Stories on feeling stuck, emotional triggers, people-pleasing and old patterns, and on creating a life that feels like yours after leaving Sydney at 36.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/journal' },
  openGraph: { url: '/journal', title, description, images: [{ url: '/images/share-litw.png', width: 1200, height: 630, alt: 'Lena in the Wild' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/share-litw.png'] },
};

// All journal articles, newest first, as a spiral-bound scrapbook with a
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
        {/* Scrapbook-style notebook */}
        <section className="overflow-hidden bg-sand py-16 pl-1 pr-4 sm:px-8 sm:py-24">
          <JournalScrapbook
            heading={journalPage.heading}
            intro={journalPage.intro}
            articles={articles.map(({ slug, title, description, date, category, image }) => ({ slug, title, description, date, category, image }))}
          />
        </section>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
