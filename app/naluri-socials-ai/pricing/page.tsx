import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SiteHeader from '@/components/SiteHeader';
import { naluriSocialsAiPricing as page } from '@/content/naluriSocialsAiPricing';

const title = 'Naluri Socials AI: Pricing';

// Not in PAGES (lib/seo.ts), so it's left out of the sitemap, and this
// page-level noindex keeps it out of search — it's meant to be shared as
// a direct link after a chat, not browsed to from the site itself.
export const metadata: Metadata = {
  title: { absolute: title },
  robots: { index: false, follow: false },
};

const body = 'font-body text-base leading-[1.85] text-umber sm:text-lg';
const h2 = 'font-display text-3xl italic leading-tight text-bark sm:text-4xl';

function Hearts({ items, tone = 'text-bark/70' }: { items: string[]; tone?: string }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className={`grid grid-cols-[1.75rem_1fr] items-baseline ${body}`}>
          <span aria-hidden="true" className={`text-lg leading-none ${tone}`}>♡</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const moduleCardTones = ['bg-cream', 'bg-rose/25', 'bg-sage/15'];

export default function NaluriSocialsAiPricingPage() {
  return (
    <>
      <SiteHeader active="The Business Owner" />
      <main className="bg-cream">
        {/* Hero / price */}
        <section className="px-6 pb-16 pt-14 text-center sm:px-12 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-2xl">
            <Link href={page.back.href} className="font-body text-xs font-semibold uppercase tracking-widest2 text-bark/50 hover:text-bark">
              ← {page.back.label}
            </Link>
            <h1 className="mt-8 font-display text-4xl leading-tight text-bark sm:text-6xl">{page.heading}</h1>
            <p className={`mx-auto mt-5 max-w-md ${body}`}>{page.intro}</p>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-sand px-6 py-16 sm:px-12 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className={`text-center ${h2}`}>{page.includedHeading}</h2>
            <div className="mt-10 space-y-8">
              {page.modules.map((m, i) => (
                <div key={m.title} className={`rounded-[1.75rem] p-8 shadow-sm sm:p-10 ${moduleCardTones[i % moduleCardTones.length]}`}>
                  <div className="flex items-start gap-5">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-bark font-hand text-xl text-cream">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display text-2xl text-bark sm:text-3xl">{m.title}</p>
                      <p className={`mt-1.5 ${body}`}>{m.tagline}</p>
                      {'note' in m && m.note && <p className={`mt-1 italic ${body}`}>{m.note}</p>}
                    </div>
                  </div>
                  <Hearts items={m.bullets} />
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-1 rounded-[2rem] bg-sage px-10 py-6 text-center shadow-xl sm:flex-row sm:gap-4 sm:px-12">
              <span className="font-display text-4xl text-bark sm:text-5xl">{page.price}</span>
              <span className="font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70">{page.priceNote}</span>
            </div>
          </div>
        </section>

        {/* Also included */}
        <section className="px-6 py-16 sm:px-12 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <h2 className={`text-center ${h2}`}>{page.alsoIncludedHeading}</h2>
            <Hearts items={page.alsoIncluded} />
          </div>
        </section>

        {/* Build & payment */}
        <section className="bg-sage px-6 py-16 sm:px-12 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className={`text-center ${h2}`}>{page.buildHeading}</h2>
            <div className="mt-10 grid gap-5">
              {page.build.map((b) => (
                <div key={b.label} className="rounded-2xl border border-bark/10 bg-cream p-6">
                  <p className="font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark/50">{b.label}</p>
                  <p className="mt-2 font-display text-xl leading-snug text-bark">{b.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional system care */}
        <section className="px-6 py-16 sm:px-12 sm:py-24">
          <div className="mx-auto max-w-2xl rounded-[1.75rem] bg-bark px-8 py-10 text-center sm:px-12 sm:py-12">
            <p className="font-display text-2xl text-cream sm:text-3xl">{page.care.heading}</p>
            <p className="mt-3 font-display text-3xl italic text-zing-yellow sm:text-4xl">
              {page.care.price} <span className="font-body text-sm not-italic text-cream/60">{page.care.priceNote}</span>
            </p>
            <p className={`mx-auto mt-4 max-w-md font-body text-base leading-[1.85] text-cream/75 sm:text-lg`}>{page.care.body}</p>
          </div>
        </section>

        {/* Good to know */}
        <section className="bg-sand px-6 py-16 sm:px-12 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <h2 className={`text-center ${h2}`}>{page.goodToKnowHeading}</h2>
            <Hearts items={page.goodToKnow} tone="text-bark/50" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
