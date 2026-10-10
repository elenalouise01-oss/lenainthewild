import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { SITE_NAME, absoluteUrl, breadcrumbs } from '@/lib/seo';
import OfferNextStep from '@/components/OfferNextStep';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import { fiveDayReconnectPage as page, freedomSeeker, offerLinks } from '@/content/site';

const tier = freedomSeeker.tiers.find((t) => t.title === page.title)!;
const buy = offerLinks[page.title];

const title = 'The 5 Day Reconnect: Get Out of Your Head, Back Into Your Body';
const description =
  'Five short videos, one a day: simple practices to slow down, tune in and reconnect with yourself when you feel burnt out, overwhelmed or stuck.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/5-day-reconnect' },
  openGraph: {
    url: '/5-day-reconnect',
    title,
    description,
    images: [{ url: '/images/cover-reconnect-monkey.webp', width: 1254, height: 1254, alt: 'The 5 Day Reconnect cover art' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/cover-reconnect-monkey.webp'] },
};

const product = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: page.title,
  description,
  image: absoluteUrl('/images/cover-reconnect-monkey.webp'),
  brand: { '@type': 'Brand', name: SITE_NAME },
  offers: {
    '@type': 'Offer',
    url: absoluteUrl('/5-day-reconnect'),
    price: (tier.price ?? '').replace(/[^0-9.]/g, ''),
    priceCurrency: 'AUD',
    availability: 'https://schema.org/InStock',
  },
};

// Buying is the one step that leaves the site: The Leap takes payment and
// delivers the videos, in a new tab.
// `dark` is for the brown closing section: a lilac button instead of black.
function BuyButton({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-5 ${dark ? 'justify-center' : ''}`}>
      <a
        href={buy}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 rounded-full px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 transition-transform hover:scale-105 ${
          dark ? 'bg-sage text-bark' : 'bg-[#141414] text-cream'
        }`}
      >
        {page.cta} →
      </a>
      {tier.price && (
        <span className={`rounded-full px-4 py-2 font-body text-sm font-bold ${dark ? 'bg-cream text-bark' : 'bg-sage text-bark'}`}>{tier.price}</span>
      )}
    </div>
  );
}

// The 5 Day Reconnect's own page: sand and brown, with lilac highlights.
export default function FiveDayReconnectPage() {
  return (
    <>
      <JsonLd data={[breadcrumbs(page.title, '/5-day-reconnect'), product]} />
      <SiteHeader active="The Freedom Seeker" />
      <main>
        {/* Cover, title, price and buy — shown straight away (no fade-in) so it paints fast */}
        <section className="bg-sand px-6 py-20 sm:py-28">
          <div className="container-editorial grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70">{page.label}</p>
              <h1 className="mt-5 font-display text-5xl leading-[1] text-bark sm:text-7xl">{page.title}</h1>
              <p className="mt-6 max-w-md font-display text-2xl italic leading-snug text-bark/85 sm:text-3xl">{page.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tier.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-bark/25 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-bark">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-10">
                <BuyButton />
              </div>
            </div>
            <div className="mx-auto w-full max-w-md">
              <div className="relative aspect-square -rotate-2 overflow-hidden shadow-2xl">
                <Image src="/images/cover-reconnect-monkey.webp" alt="The 5 Day Reconnect cover art" fill priority sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="font-display text-3xl italic leading-tight text-bark sm:text-5xl">{page.forHeading}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ul className="mt-10 space-y-5">
                {page.forList.map((item) => (
                  <li key={item} className="flex gap-4 font-body text-base leading-relaxed text-umber sm:text-lg">
                    <span aria-hidden="true" className="mt-1.5 h-3 w-3 flex-none rounded-full bg-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* What's inside */}
        <section className="bg-sand px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="font-display text-3xl leading-tight text-bark sm:text-5xl">{page.insideHeading}</h2>
              <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-umber sm:text-lg">{page.inside}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
                {page.days.map((day, i) => (
                  <div
                    key={day}
                    className={`flex aspect-square flex-col items-center justify-center rounded-sm text-bark shadow-sm ${
                      i % 2 ? 'bg-sage/40' : 'bg-sage/70'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                      <path d="M7 4l13 8-13 8z" />
                    </svg>
                    <p className="mt-3 font-display text-lg italic">{day}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Why it's different */}
        <section className="bg-cream px-6 py-24 sm:py-32">
          <ScrollReveal className="mx-auto max-w-2xl">
            <p className="font-display text-2xl leading-snug text-bark sm:text-3xl">{page.notAnother}</p>
            <p className="mt-10 font-display text-2xl italic text-bark sm:text-3xl">{page.minutes}</p>
          </ScrollReveal>
        </section>

        {/* Closing buy */}
        <section className="bg-bark px-6 py-24 text-center sm:py-32">
          <ScrollReveal className="mx-auto flex max-w-2xl flex-col items-center">
            <p className="font-display text-3xl italic leading-tight text-cream sm:text-5xl">{page.closing}</p>
            <div className="mt-12">
              <BuyButton dark />
            </div>
          </ScrollReveal>
        </section>
        <OfferNextStep {...page.next} />
      </main>
      <Footer />
    </>
  );
}
