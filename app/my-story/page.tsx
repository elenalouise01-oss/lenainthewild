import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs } from '@/lib/seo';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import Listen from '@/components/sections/Listen';
import Newsletter from '@/components/sections/Newsletter';
import { offerPages, storyPage } from '@/content/site';

const title = 'My Story: Starting Over at 36 and Moving to Bali — Lena in the Wild';
const description =
  'At 36 I left my PT business in Bondi, sold everything and moved to Bali. The burnout, the leap and what starting over in your 30s really looks like.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/my-story' },
  openGraph: {
    type: 'profile',
    url: '/my-story',
    title,
    description,
    images: [{ url: '/images/lena-sunrise.jpg', width: 640, height: 640, alt: 'Lena at sunrise above the clouds' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/lena-sunrise.jpg'] },
};

const outlineButton =
  'inline-flex items-center gap-2 border border-bark px-6 py-3 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream';

// Laid out like the old site's My Story page: sticky nav, full-width photo,
// a single readable column of story text, a full-width landscape break,
// then a short invitation to stay in touch.
export default function MyStoryPage() {
  return (
    <>
      <JsonLd data={breadcrumbs('My Story', '/my-story')} />
      <SiteHeader active="About" />
      <main>
        <div className="relative h-[60vh] min-h-[22rem] w-full bg-sand sm:h-[75vh]">
          <Image
            src="/images/lena-sunrise.jpg"
            alt="Lena at sunrise above the clouds"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '65% 45%' }}
          />
        </div>

        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h1 className="font-display text-4xl leading-tight text-bark sm:text-6xl">{storyPage.storyTitle}</h1>
              <div className="mt-8 space-y-6">
                {storyPage.paragraphs.map((p) =>
                  p.startsWith('## ') ? (
                    <h2 key={p} className="pt-8 font-display text-3xl leading-snug text-bark">
                      {p.slice(3)}
                    </h2>
                  ) : (
                    <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber sm:text-lg">
                      {p}
                    </p>
                  ),
                )}
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href={offerPages['The Freedom Frequency']} className={outlineButton}>
                  {storyPage.cta} →
                </Link>
                <Link
                  href="/life-design"
                  className="py-2 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark"
                >
                  See who I help →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="relative h-[45vh] min-h-[18rem] w-full bg-sand">
          <Image
            src="/images/road/road-5.jpg"
            alt="Feet up on a hillside, looking out over the sea at sunset"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '50% 30%' }}
          />
        </div>

        <section className="bg-cream px-6 py-24 sm:py-32">
          <ScrollReveal className="mx-auto max-w-2xl">
            <p className="font-body text-base leading-relaxed text-umber sm:text-lg">{storyPage.closing}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/#contact" className={outlineButton}>
                Let&apos;s Connect
              </Link>
              {/* The newsletter sits at the bottom of this page, so stay here */}
              <Link href="#subscribe" className={outlineButton}>
                Join the newsletter
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <Listen />

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
