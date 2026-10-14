import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import SiteHeader from '@/components/SiteHeader';
import Newsletter from '@/components/sections/Newsletter';
import { findArticle } from '@/content/journal';
import { lifeDesignPage as page } from '@/content/site';
import { absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'Feeling Stuck? Find Yourself, Break Old Patterns & Find Your Direction';
const description =
  'Not sure what you want anymore, or stuck in the same old patterns? Reconnect with yourself, release what’s holding you back and create a life that feels like yours.';

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
      <SiteHeader active="Who I Help" />
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
              {page.recognise.map((item, n) => (
                <ScrollReveal key={item.heading}>
                  <h3 className="flex items-baseline gap-4 font-display text-2xl leading-snug text-bark sm:text-3xl">
                    <span aria-hidden="true" className="flex-none font-display text-xl text-bark/40">0{n + 1}</span>
                    {item.heading}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {item.body.map((p) => (
                      <p key={p.slice(0, 24)} className={body}>
                        {p}
                      </p>
                    ))}
                  </div>
                  <p className="mt-5 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-stone">You might be wondering:</p>
                  <ul className="mt-3 space-y-1 border-l-2 border-sage pl-5">
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

        {/* The stagnation loop */}
        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className={`${sectionHeading} italic`}>{page.loopHeading}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 space-y-6">
                {page.loop.map((p) =>
                  // The short lines carry the rhythm of the loop, so they stand out.
                  p.length < 80 ? (
                    <p key={p.slice(0, 24)} className="font-display text-2xl italic leading-snug text-bark">
                      {p}
                    </p>
                  ) : (
                    <p key={p.slice(0, 24)} className={body}>
                      {p}
                    </p>
                  ),
                )}
              </div>
              <p className="mt-12 border-l-4 border-zing-pink pl-6 font-display text-2xl leading-snug text-bark sm:text-3xl">{page.loopQuote}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* The three pillars */}
        <section className="bg-sand px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <SectionLabel>{page.pillarsLabel}</SectionLabel>
              <h2 className={`mt-4 ${sectionHeading} italic`}>{page.pillarsHeading}</h2>
              <p className={`mt-6 max-w-2xl ${body}`}>{page.pillarsIntro}</p>
            </ScrollReveal>
            <div className="mt-14 space-y-16">
              {page.pillars.map((pillar, g) => (
                <ScrollReveal key={pillar.heading}>
                  <h3 className="flex items-baseline gap-4 font-display text-2xl italic leading-snug text-bark sm:text-3xl">
                    <span aria-hidden="true" className="flex-none font-display text-xl text-bark/40">0{g + 1}</span>
                    {pillar.heading}
                  </h3>
                  <div className="mt-5 border-l border-bark/15 pl-6 sm:ml-9">
                    <p className="font-display text-xl leading-snug text-bark">{pillar.tagline}</p>
                    <div className="mt-4 space-y-4">
                      {pillar.body.map((p) => (
                        <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber">
                          {p}
                        </p>
                      ))}
                    </div>
                    <p className="mt-5 font-body text-sm text-bark">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-widest2 text-stone">Explore: </span>
                      {pillar.explore}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Lena's own story */}
        <section className="bg-cream px-6 py-24 sm:py-32">
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

        {/* The next step: Lena's offers */}
        <section className="bg-sand px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className={`${sectionHeading} italic`}>{page.helpHeading}</h2>
              <div className="mt-6 space-y-4">
                {page.helpIntro.map((p) => (
                  <p key={p.slice(0, 24)} className={body}>
                    {p}
                  </p>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 border-t border-bark/15">
                {page.help.map((item) => (
                  <div key={item.heading} className="border-b border-bark/15 py-10">
                    <h3 className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-2xl leading-snug text-bark sm:text-3xl">
                      {item.heading}
                      {'badge' in item && item.badge && (
                        <span className="rounded-full bg-zing-pink/30 px-3 py-1 font-body text-[0.6rem] font-semibold uppercase tracking-widest2 text-bark">{item.badge}</span>
                      )}
                    </h3>
                    {item.tagline && <p className="mt-3 font-display text-xl italic leading-snug text-bark/85">{item.tagline}</p>}
                    <div className="mt-3 space-y-3">
                      {item.body.map((p) => (
                        <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber">
                          {p}
                        </p>
                      ))}
                    </div>
                    <Link href={item.href} className={`mt-4 ${textLink}`}>
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
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
