import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import Listen from '@/components/sections/Listen';
import Newsletter from '@/components/sections/Newsletter';
import { offerLinks, storyPage } from '@/content/site';

export const metadata: Metadata = {
  title: 'My Story',
  description: storyPage.paragraphs[0],
};

const outlineButton =
  'inline-flex items-center gap-2 border border-bark px-6 py-3 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream';

// Laid out like the old site's My Story page: sticky nav, full-width photo,
// a single readable column of story text, a full-width landscape break,
// then a short invitation to stay in touch.
export default function MyStoryPage() {
  return (
    <>
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
                {storyPage.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
              <a
                href={offerLinks['The Freedom Frequency']}
                target="_blank"
                rel="noopener noreferrer"
                className={`${outlineButton} mt-12`}
              >
                {storyPage.cta} →
              </a>
            </ScrollReveal>
          </div>
        </section>

        <div className="relative h-[45vh] min-h-[18rem] w-full bg-sand">
          <Image
            src="/images/road/road-5.jpg"
            alt="Sunset over the coast"
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
