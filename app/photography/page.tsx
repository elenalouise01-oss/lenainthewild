import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import PhotoEnquiryForm from '@/components/PhotoEnquiryForm';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import { photographyPage as page } from '@/content/site';
import { absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'Portrait Photography for Your Next Chapter | Lena in the Wild';
const description =
  'Creative, editorial portrait shoots for anyone stepping into a new chapter: a new career, a new place, or simply feeling more like yourself.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/photography' },
  openGraph: { url: '/photography', title, description, images: [{ url: page.hero.src, alt: page.hero.alt }] },
  twitter: { card: 'summary_large_image', title, description, images: [page.hero.src] },
};

const label = 'font-body text-xs font-semibold uppercase tracking-widest2';

// Photography for the person you're becoming: an editorial, image-led page.
// Photos and copy come from `photographyPage` in content/site.ts.
export default function PhotographyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs('Photography', '/photography'),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: page.brand,
            serviceType: 'Portrait photography',
            description,
            url: absoluteUrl('/photography'),
            provider: { '@type': 'Person', '@id': `${absoluteUrl('/')}#lena`, name: 'Lena' },
          },
        ]}
      />
      <SiteHeader />
      <main>
        {/* Hero: the photograph first, the words over it */}
        <section className="relative h-[88dvh] min-h-[32rem] overflow-hidden bg-bark">
          <Image src={page.hero.src} alt={page.hero.alt} fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bark/85 via-bark/25 to-transparent" />
          <div className="container-editorial absolute inset-x-0 bottom-0 px-6 pb-14 text-cream sm:pb-20">
            <p className={`${label} text-cream/80`}>{page.brand}</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl italic leading-[1.02] sm:text-7xl">{page.title}</h1>
            <p className="mt-6 max-w-xl font-body text-base text-cream/85 sm:text-lg">{page.lead}</p>
            <a
              href="#enquire"
              className="mt-9 inline-block border-b border-cream/60 pb-1 font-body text-xs font-semibold uppercase tracking-widest2 transition-colors hover:border-cream"
            >
              {page.cta} →
            </a>
          </div>
        </section>

        {/* The idea behind it, in one breath */}
        <section className="bg-sand px-6 py-24 sm:py-36">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="font-display text-3xl italic leading-snug text-bark sm:text-5xl">{page.philosophy.line}</p>
            <p className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-umber sm:text-lg">{page.philosophy.body}</p>
          </ScrollReveal>
        </section>

        {/* Portfolio: tall and square tiles in loose columns */}
        <section className="bg-cream px-4 py-20 sm:px-8 sm:py-28">
          <p className={`${label} container-editorial px-2 text-stone`}>{page.galleryLabel}</p>
          <div className="container-editorial mt-10 columns-2 gap-4 sm:gap-6 lg:columns-3">
            {page.gallery.map((photo, i) => (
              <ScrollReveal key={photo.src} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid sm:mb-6">
                <div className={`relative overflow-hidden bg-linen ${photo.tall ? 'aspect-[4/5]' : 'aspect-square'}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* What makes it different */}
        <section className="bg-cream px-6 pb-24 sm:pb-32">
          <div className="container-editorial border-t border-bark/15 pt-16 sm:pt-20">
            <p className={`${label} text-stone`}>{page.differentLabel}</p>
            <div className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-10">
              {page.different.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <p className="font-display text-sm text-stone">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 font-display text-2xl text-bark sm:text-3xl">{item.title}</h2>
                  <p className="mt-3 font-body text-base leading-relaxed text-umber">{item.body}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for, then how it works */}
        <section className="bg-sand px-6 py-24 sm:py-32">
          <div className="container-editorial grid gap-16 lg:grid-cols-2 lg:gap-24">
            <ScrollReveal>
              <h2 className="font-display text-3xl italic text-bark sm:text-4xl">{page.forLabel}</h2>
              <ul className="mt-8 border-t border-bark/15">
                {page.forList.map((item) => (
                  <li key={item} className="border-b border-bark/15 py-4 font-body text-base text-umber sm:text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl italic text-bark sm:text-4xl">{page.howLabel}</h2>
              <ol className="mt-8 space-y-8">
                {page.how.map((step, i) => (
                  <li key={step.title} className="flex gap-6">
                    <span className="font-display text-3xl text-bark/30">{i + 1}</span>
                    <div>
                      <p className="font-display text-xl text-bark">{step.title}</p>
                      <p className="mt-1 font-body text-base leading-relaxed text-umber">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        {/* Enquiry */}
        <section id="enquire" className="scroll-mt-20 bg-bark px-6 py-24 sm:py-32">
          <div className="container-editorial grid gap-12 lg:grid-cols-2 lg:gap-24">
            <ScrollReveal>
              <h2 className="font-display text-4xl italic leading-tight text-cream sm:text-5xl">{page.enquiry.heading}</h2>
              <p className="mt-6 max-w-md font-body text-base leading-relaxed text-cream/80">{page.enquiry.body}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <PhotoEnquiryForm />
            </ScrollReveal>
          </div>
        </section>

        {/* A quiet nod to the wider work */}
        <section className="bg-cream px-6 py-14 text-center">
          <p className="font-display text-lg italic text-bark/80">
            {page.connection.line}{' '}
            <Link href={page.connection.href} className="not-italic underline decoration-sage decoration-2 underline-offset-4 hover:decoration-bark">
              {page.connection.label}
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
