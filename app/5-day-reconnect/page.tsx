import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import { fiveDayReconnectPage as page, freedomSeeker, offerLinks } from '@/content/site';

const tier = freedomSeeker.tiers.find((t) => t.title === page.title)!;
const buy = offerLinks[page.title];

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
};

// Buying is the one step that leaves the site: The Leap takes payment and
// delivers the videos, in a new tab.
function BuyButton() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <a
        href={buy}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-full bg-[#141414] px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-105"
      >
        {page.cta} →
      </a>
      {tier.price && <span className="rounded-full bg-zing-pink px-4 py-2 font-body text-sm font-bold text-bark">{tier.price}</span>}
    </div>
  );
}

// The 5 Day Reconnect's own page, in the offer's lilac.
export default function FiveDayReconnectPage() {
  return (
    <>
      <SiteHeader active="The Freedom Seeker" />
      <main>
        {/* Cover, title, price and buy */}
        <section className="bg-sage px-6 py-20 sm:py-28">
          <div className="container-editorial grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
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
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="mx-auto w-full max-w-md">
              <div className="relative aspect-square -rotate-2 overflow-hidden shadow-2xl">
                <Image src="/images/cover-reconnect-monkey.webp" alt="The 5 Day Reconnect cover art" fill priority sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
              </div>
            </ScrollReveal>
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
                      ['bg-sage/60', 'bg-zing-yellow/80', 'bg-zing-pink/60', 'bg-zing-green/70', 'bg-cream'][i]
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
        <section className="bg-sage px-6 py-24 text-center sm:py-32">
          <ScrollReveal className="mx-auto flex max-w-2xl flex-col items-center">
            <p className="font-display text-3xl italic leading-tight text-bark sm:text-5xl">{page.closing}</p>
            <div className="mt-12">
              <BuyButton />
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
