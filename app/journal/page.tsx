import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import Newsletter from '@/components/sections/Newsletter';
import { formatDate, journalPage, sortedJournal } from '@/content/journal';
import { breadcrumbs } from '@/lib/seo';

const title = 'Journal: Honest Stories on Starting Over in Your 30s — Lena in the Wild';
const description =
  'Real stories from leaving Sydney for Bali at 36: feeling stuck, burnout, fear, healing, freedom and the everyday moments of building a life on your own terms.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/journal' },
  openGraph: { url: '/journal', title, description, images: [{ url: '/images/hero.jpg', width: 1809, height: 930, alt: 'Lena in the Wild' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/hero.jpg'] },
};

// All journal articles, newest first, as cards in the same style as the home
// page's journal row. Hidden until the first article is added.
export default function JournalPage() {
  const articles = sortedJournal();
  if (articles.length === 0) notFound();

  return (
    <>
      <JsonLd data={breadcrumbs('Journal', '/journal')} />
      <SiteHeader active="Journal" />
      <main>
        <section className="bg-cream px-6 py-20 sm:py-28">
          <div className="container-editorial">
            <ScrollReveal>
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{journalPage.label}</p>
              <h1 className="mt-4 font-display text-5xl leading-tight text-bark sm:text-7xl">{journalPage.heading}</h1>
              <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-umber sm:text-lg">{journalPage.intro}</p>
            </ScrollReveal>

            <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <article key={a.slug}>
                  <Link href={`/journal/${a.slug}`} className="group block">
                    {a.image && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-md">
                        <Image
                          src={a.image.src}
                          alt={a.image.alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: a.image.pos }}
                        />
                      </div>
                    )}
                    <p className="mt-5 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-stone">
                      {a.category} · {formatDate(a.date)}
                    </p>
                    <h2 className="mt-2 font-display text-2xl leading-snug text-bark group-hover:underline group-hover:decoration-sage group-hover:underline-offset-4">
                      {a.title}
                    </h2>
                    <p className="mt-2 font-body text-sm leading-relaxed text-umber">{a.description}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
