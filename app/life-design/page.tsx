import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import Newsletter from '@/components/sections/Newsletter';
import { findArticle } from '@/content/journal';
import { lifeDesignPage as page } from '@/content/site';
import { absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'Feeling Stuck? How to Figure Out What You Want From Life';
const description =
  'Feeling stuck, unfulfilled or unsure what to do with your life or career? Honest perspective on finding direction, life design and starting over.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/life-design' },
  openGraph: {
    url: '/life-design',
    title,
    description,
    images: [{ url: '/images/road/road-6.jpg', alt: 'A lone tree by a still lake with hills behind' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/road/road-6.jpg'] },
};

const lena = { '@id': `${absoluteUrl('/')}#lena` };

// Describes the page plainly: what it's about and who wrote it. No FAQ or
// review markup (none would be accurate or eligible).
const structuredData = [
  breadcrumbs('Not sure what you want from life?', '/life-design'),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    headline: page.title,
    url: absoluteUrl('/life-design'),
    description,
    inLanguage: 'en-AU',
    author: lena,
    about: [
      { '@type': 'Thing', name: 'Feeling stuck in life' },
      { '@type': 'Thing', name: 'Finding direction in life' },
      { '@type': 'Thing', name: 'Career uncertainty' },
      { '@type': 'Thing', name: 'Life design' },
      { '@type': 'Thing', name: 'Personal reinvention' },
      { '@type': 'Thing', name: 'Self-discovery' },
    ],
  },
];

const sectionHeading = 'font-display text-3xl leading-tight text-bark sm:text-5xl';
const body = 'font-body text-base leading-relaxed text-umber sm:text-lg';
const textLink =
  'inline-block py-2 font-body text-xs font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark';

// For people constantly trying to figure out their life: recognise the
// feeling, why it's hard, what to explore, Lena's own story, and the real
// resources on the site. All text is in the HTML, readable by crawlers.
export default function LifeDesignPage() {
  const articles = page.articles.map(findArticle).filter((a) => a !== undefined);

  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader active="How I Help" />
      <main>
        {/* Headline and intro — shown straight away (no fade-in) so it paints fast */}
        <section className="bg-sand px-6 py-20 sm:py-28">
          <div className="container-editorial grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70">{page.eyebrow}</p>
              <h1 className="mt-5 font-display text-5xl leading-[1.05] text-bark sm:text-7xl">{page.title}</h1>
              <p className="mt-6 max-w-xl font-display text-2xl italic leading-snug text-bark/85 sm:text-3xl">{page.lead}</p>
              <p className="mt-6 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-stone">{page.byline}</p>
            </div>
            <div className="mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] -rotate-2 overflow-hidden shadow-2xl">
                <Image
                  src="/images/road/road-6.jpg"
                  alt="A lone tree by a still lake with hills behind"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="container-editorial mt-14">
            <div className="max-w-2xl space-y-5">
              {page.intro.map((p) => (
                <p key={p.slice(0, 24)} className={body}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Help visitors recognise themselves */}
        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className={`${sectionHeading} italic`}>{page.recogniseHeading}</h2>
            </ScrollReveal>
            <div className="mt-12 space-y-14">
              {page.recognise.map((item) => (
                <ScrollReveal key={item.heading}>
                  <h3 className="font-display text-2xl leading-snug text-bark sm:text-3xl">{item.heading}</h3>
                  <p className={`mt-4 ${body}`}>{item.body}</p>
                  <ul className="mt-4 space-y-1 border-l-2 border-sage pl-5">
                    {item.asks.map((q) => (
                      <li key={q} className="font-display text-lg italic text-bark/80">
                        “{q}”
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why it's hard */}
        <section className="bg-sand px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className={sectionHeading}>{page.hardHeading}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 space-y-6">
                {page.hard.map((p) => (
                  <p key={p.slice(0, 24)} className={body}>
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-12 border-l-4 border-zing-pink pl-6 font-display text-2xl leading-snug text-bark sm:text-3xl">{page.hardQuote}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* What you can explore */}
        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className={`${sectionHeading} italic`}>{page.exploreHeading}</h2>
              <p className={`mt-6 max-w-2xl ${body}`}>{page.exploreIntro}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ol className="mt-12 space-y-10">
                {page.explore.map((item, i) => (
                  <li key={item.heading} className="grid gap-2 sm:grid-cols-[4rem_1fr]">
                    <span aria-hidden="true" className="font-display text-3xl italic text-bark/40">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl leading-snug text-bark">{item.heading}</h3>
                      <p className="mt-2 font-body text-base leading-relaxed text-umber">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
            <ScrollReveal>
              <div className="mt-16 bg-sage/40 px-8 py-10 sm:px-12">
                <h3 className="font-body text-xs font-semibold uppercase tracking-widest2 text-bark">{page.promptsHeading}</h3>
                <ul className="mt-6 space-y-3">
                  {page.prompts.map((q) => (
                    <li key={q} className="font-display text-xl italic leading-snug text-bark sm:text-2xl">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Lena's own story */}
        <section className="bg-sand px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <div className="relative mx-auto mb-14 aspect-[4/3] w-full rotate-1 overflow-hidden bg-cream p-2 shadow-xl">
                <div className="relative h-full w-full overflow-hidden">
                  <Image src="/images/lena-sunrise.jpg" alt="Lena at sunrise above the clouds" fill sizes="(min-width: 640px) 42rem, 90vw" className="object-cover" style={{ objectPosition: '65% 45%' }} />
                </div>
              </div>
              <h2 className={sectionHeading}>{page.storyHeading}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 space-y-6">
                {page.story.map((p) => (
                  <p key={p.slice(0, 24)} className={body}>
                    {p}
                  </p>
                ))}
              </div>
              <Link href="/my-story" className={`mt-10 ${textLink}`}>
                {page.storyLink} →
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* What's actually available */}
        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className={`${sectionHeading} italic`}>{page.helpHeading}</h2>
              <p className={`mt-6 ${body}`}>{page.helpIntro}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 border-t border-bark/15">
                {page.help.map((item) => (
                  <div key={item.heading} className="border-b border-bark/15 py-8">
                    <h3 className="font-display text-2xl leading-snug text-bark sm:text-3xl">{item.heading}</h3>
                    <p className="mt-3 font-body text-base leading-relaxed text-umber">{item.body}</p>
                    <Link href={item.href} className={`mt-3 ${textLink}`}>
                      {item.cta} →
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h3 className="mt-16 font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{page.articlesHeading}</h3>
              <ul className="mt-4 space-y-1">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/journal/${a.slug}`} className="inline-block py-1.5 font-display text-xl text-bark underline decoration-sage/60 underline-offset-4 hover:decoration-bark">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-12 font-body text-sm italic text-stone">{page.note}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* A natural next step */}
        <section className="bg-bark px-6 py-24 text-center sm:py-32">
          <ScrollReveal className="mx-auto max-w-2xl">
            <h2 className="font-body text-xs font-semibold uppercase tracking-widest2 text-zing-pink">{page.nextHeading}</h2>
            <p className="mt-6 font-display text-3xl italic leading-tight text-cream sm:text-5xl">{page.next}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/5-day-reconnect"
                className="inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-transform hover:scale-105"
              >
                Start with The 5 Day Reconnect →
              </Link>
              <Link href="/journal" className="py-2 font-body text-xs font-semibold uppercase tracking-widest2 text-cream underline decoration-cream/40 decoration-2 underline-offset-8 hover:decoration-cream">
                Or read the journal
              </Link>
            </div>
          </ScrollReveal>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
