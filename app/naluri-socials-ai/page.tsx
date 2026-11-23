import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import { naluriSocialsAi as page } from '@/content/naluriSocialsAi';
import { absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'Naluri Socials AI: Your Social Media Workflow, Powered by AI';
const description =
  'A personalised AI social media system built around your business, brand and voice, with custom Claude skills, so content takes less of your time.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/naluri-socials-ai' },
  openGraph: { url: '/naluri-socials-ai', title, description, images: [{ url: page.photo.src, alt: page.photo.alt }] },
  twitter: { card: 'summary_large_image', title, description, images: [page.photo.src] },
};

const label = 'font-body text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-stone';
const body = 'font-body text-base leading-[1.85] text-umber sm:text-lg';
const button =
  'inline-flex items-center gap-3 rounded-full bg-bark px-9 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-105';

// Naluri Socials AI: short and simple, in Lena's words (content/naluriSocialsAi.ts).
export default function NaluriSocialsAiPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs('Naluri Socials AI', '/naluri-socials-ai'),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Naluri Socials AI',
            serviceType: 'AI social media system setup',
            description,
            url: absoluteUrl('/naluri-socials-ai'),
            provider: { '@type': 'Person', '@id': `${absoluteUrl('/')}#lena`, name: 'Lena' },
          },
        ]}
      />
      <SiteHeader />
      <main className="bg-cream">
        {/* Opening */}
        <section className="px-6 pb-20 pt-16 sm:px-12 sm:pb-28 sm:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <ScrollReveal>
              <p className={label}>{page.label}</p>
              <h1 className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-tight text-bark sm:text-6xl">{page.title}</h1>
              <p className="mt-8 font-display text-2xl italic leading-snug text-bark sm:text-3xl">{page.lead}</p>
              <p className={`mt-5 max-w-xl ${body}`}>{page.intro}</p>
              <a href={page.cta.href} target="_blank" rel="noopener noreferrer" className={`mt-10 ${button}`}>
                {page.cta.label} →
              </a>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="mx-auto w-full max-w-[18rem] sm:max-w-sm">
              <figure className="rotate-2 bg-white p-3 pb-12 shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={page.photo.src} alt={page.photo.alt} fill priority sizes="24rem" className="object-cover" />
                </div>
              </figure>
            </ScrollReveal>
          </div>
        </section>

        {/* Lena's story */}
        <section className="bg-sand px-6 py-20 sm:px-12 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="font-hand text-4xl text-bark sm:text-5xl">{page.story.heading}</h2>
              <p className={`mt-5 ${body}`}>{page.story.body}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* The system */}
        <section className="px-6 py-20 sm:px-12 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="font-display text-4xl italic leading-tight text-bark sm:text-5xl">{page.system.heading}</h2>
              <p className={`mt-6 ${body}`}>{page.system.body}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05} className="mt-14">
              <h3 className={label}>{page.skills.heading}</h3>
              <ul className="mt-6 space-y-3">
                {page.skills.items.map((item) => (
                  <li key={item} className={`grid grid-cols-[1.75rem_1fr] items-baseline ${body}`}>
                    <span aria-hidden="true" className="text-lg leading-none text-bark/70">♡</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-sage px-6 py-20 sm:px-12 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-4xl italic text-bark sm:text-5xl">{page.how.heading}</h2>
            <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {page.how.steps.map((s, i) => (
                <li key={s.title} className="text-center">
                  <span className="font-hand text-5xl text-bark">{i + 1}</span>
                  <p className="mt-3 font-display text-2xl leading-snug text-bark">{s.title}</p>
                  <p className="mx-auto mt-2 max-w-xs font-body text-base leading-relaxed text-bark/80">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Close */}
        <section className="bg-bark px-6 py-24 text-center sm:py-32">
          <div className="mx-auto max-w-2xl">
            <p className="font-display text-3xl italic leading-snug text-cream sm:text-5xl">{page.closing}</p>
            <a
              href={page.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-sage px-9 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-transform hover:scale-105"
            >
              {page.cta.label} →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
