import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import NaluriChatForm from '@/components/NaluriChatForm';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import { naluriSocialsAi as page } from '@/content/naluriSocialsAi';
import { absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'Naluri Socials AI: Spend Less Time on Social Media';
const description =
  'Custom Claude skills set up for your business, in your branding and your voice, so social media takes less of your time, while you build your dream business.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/naluri-socials-ai' },
  openGraph: { url: '/naluri-socials-ai', title, description, images: [{ url: page.photo.src, alt: page.photo.alt }] },
  twitter: { card: 'summary_large_image', title, description, images: [page.photo.src] },
};

const label = 'font-body text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-stone';
const body = 'font-body text-base leading-[1.85] text-umber sm:text-lg';
const h2 = 'font-display text-3xl italic leading-tight text-bark sm:text-5xl';

function Hearts({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className={`grid grid-cols-[1.75rem_1fr] items-baseline ${body}`}>
          <span aria-hidden="true" className="text-lg leading-none text-bark/70">♡</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Cta({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <a
      href={page.cta.href}
      className={`inline-flex items-center gap-3 rounded-full px-9 py-4 font-body text-xs font-semibold uppercase tracking-widest2 transition-transform hover:scale-105 ${
        tone === 'dark' ? 'bg-bark text-cream' : 'bg-sage text-bark'
      }`}
    >
      {page.cta.label} →
    </a>
  );
}

// Naluri Socials AI: who it's for, their problem, the fix, the next step.
// Words live in content/naluriSocialsAi.ts.
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
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: page.faq.items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
          },
        ]}
      />
      <SiteHeader />
      <main className="bg-cream">
        {/* Who it's for, the problem, the result */}
        <section className="px-6 pb-20 pt-16 sm:px-12 sm:pb-28 sm:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <ScrollReveal>
              <p className={label}>{page.label}</p>
              <p className="mt-6 font-hand text-2xl text-bark sm:text-3xl">{page.eyebrow}</p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.05] tracking-tight text-bark sm:text-6xl">{page.title}</h1>
              <p className={`mt-6 max-w-xl ${body}`}>{page.intro}</p>
              <div className="mt-10">
                <Cta />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="mx-auto w-full max-w-[18rem] sm:max-w-sm">
              <figure className="rotate-2 bg-white p-3 pb-12 shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={page.photo.src} alt={page.photo.alt} fill priority sizes="24rem" className="object-cover" style={{ objectPosition: page.photo.pos }} />
                </div>
              </figure>
            </ScrollReveal>
          </div>
        </section>

        {/* If this is you */}
        <section className="bg-sand px-6 py-20 sm:px-12 sm:py-24">
          <ScrollReveal className="mx-auto max-w-3xl">
            <h2 className={h2}>{page.pain.heading}</h2>
            <Hearts items={page.pain.items} />
          </ScrollReveal>
        </section>

        {/* What I set up */}
        <section className="px-6 py-20 sm:px-12 sm:py-24">
          <ScrollReveal className="mx-auto max-w-3xl">
            <h2 className={h2}>{page.setup.heading}</h2>
            <p className={`mt-6 ${body}`}>{page.setup.intro}</p>
            <Hearts items={page.setup.items} />
          </ScrollReveal>
        </section>

        {/* Why I made this */}
        <section className="bg-sand px-6 py-20 sm:px-12 sm:py-24">
          <ScrollReveal className="mx-auto max-w-3xl">
            <h2 className="font-hand text-4xl text-bark sm:text-5xl">{page.story.heading}</h2>
            <p className={`mt-5 ${body}`}>{page.story.body}</p>
          </ScrollReveal>
        </section>

        {/* How it works */}
        <section className="bg-sage px-6 py-20 sm:px-12 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className={`text-center ${h2}`}>{page.how.heading}</h2>
            <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {page.how.steps.map((s, i) => (
                <li key={s.title} className="text-center">
                  <span className="font-hand text-5xl text-bark">{i + 1}</span>
                  <p className="mt-3 font-display text-2xl leading-snug text-bark">{s.title}</p>
                  <p className="mx-auto mt-3 max-w-xs font-body text-base leading-relaxed text-bark/85">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Questions */}
        <section className="px-6 py-20 sm:px-12 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>{page.faq.heading}</h2>
            <dl className="mt-8 space-y-8">
              {page.faq.items.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-display text-xl leading-snug text-bark sm:text-2xl">{q}</dt>
                  <dd className={`mt-2 ${body}`}>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* The next step */}
        <section id="book-a-chat" className="scroll-mt-24 bg-bark px-6 py-24 text-center sm:py-32">
          <div className="mx-auto max-w-xl">
            <p className="font-display text-3xl italic leading-snug text-cream sm:text-5xl">{page.closing}</p>
            <p className="mt-8 font-hand text-2xl text-zing-yellow sm:text-3xl">{page.spots}</p>
            <div className="mt-10">
              <NaluriChatForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
