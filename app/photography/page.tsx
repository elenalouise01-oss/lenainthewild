import type { Metadata } from 'next';
import Link from 'next/link';
import CinematicImage from '@/components/CinematicImage';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import PhotoEnquiryForm from '@/components/PhotoEnquiryForm';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import { photographyPage as page, socialLinks } from '@/content/site';
import { absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'Let Me Reintroduce Myself: An Immersive Photography Experience';
const description =
  'An immersive photography experience to celebrate the person you’ve become after a big life transition. Bright, editorial portraits by Naluri Photography.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/photography' },
  openGraph: { url: '/photography', title, description, images: [{ url: page.hero.src, alt: page.hero.alt }] },
  twitter: { card: 'summary_large_image', title, description, images: [page.hero.src] },
};

// Tiny spaced capitals for labels, and the reading measure for body copy.
const label = 'font-body text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-stone';
const body = 'font-body text-base leading-[1.9] text-umber sm:text-[1.05rem]';

// The "Let Me Reintroduce Myself" photoshoot: bright, editorial and
// cinematic. Words and photos live in `photographyPage` (content/site.ts).
export default function PhotographyPage() {
  const [whoLead, ...whoRest] = page.who.body;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbs('Photography', '/photography'),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Let Me Reintroduce Myself photoshoot',
            serviceType: 'Portrait photography',
            description,
            url: absoluteUrl('/photography'),
            provider: { '@type': 'Person', '@id': `${absoluteUrl('/')}#lena`, name: 'Lena' },
          },
        ]}
      />
      <SiteHeader active="Photography" />
      <main className="bg-cream">
        {/* Opening: the title as a magazine cover line beside a tall portrait */}
        <section className="px-6 pb-28 pt-16 sm:px-12 sm:pb-44 sm:pt-28">
          <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <ScrollReveal className="lg:pb-10">
              <p className={label}>{page.brand}</p>
              <h1 className="mt-8 font-display text-[3.4rem] leading-[0.95] tracking-tight text-bark sm:text-8xl lg:text-[7.5rem]">
                Let me
                <br />
                <em>reintroduce</em>
                <br />
                myself.
              </h1>
              <p className="mt-10 max-w-sm font-body text-base leading-relaxed text-umber">{page.lead}</p>
              <a
                href="#enquire"
                className="mt-10 inline-block border-b border-bark pb-1.5 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-bark transition-opacity hover:opacity-60"
              >
                {page.cta}
              </a>
            </ScrollReveal>
            <div>
              <CinematicImage
                src={page.hero.src}
                alt={page.hero.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5]"
                position="50% 40%"
                priority
                drift={8}
              />
            </div>
          </div>
        </section>

        {/* Who it's for: label in the margin, words in a narrow column */}
        <section className="px-6 py-28 sm:px-12 sm:py-48">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_2fr]">
            <ScrollReveal>
              <p className={label}>{page.who.label}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="max-w-2xl">
              <p className="font-display text-2xl leading-snug text-bark sm:text-[2rem]">{whoLead}</p>
              {whoRest.map((p, i) => (
                <p
                  key={p.slice(0, 24)}
                  className={i === whoRest.length - 1 ? 'mt-10 font-display text-2xl italic leading-snug text-bark sm:text-3xl' : `mt-7 ${body}`}
                >
                  {p}
                </p>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* The cheerleader line: big and bold, right after "is this me?" */}
        <section className="px-6 pb-28 sm:px-12 sm:pb-44">
          <ScrollReveal className="mx-auto max-w-4xl text-center">
            <p className="font-display text-4xl italic leading-[1.15] text-bark [text-wrap:balance] sm:text-6xl">{page.era}</p>
          </ScrollReveal>
        </section>

        {/* A wide, letterboxed frame, like a film still */}
        <section className="px-6 py-10 sm:px-10 sm:py-20">
          <CinematicImage
            src={page.still.src}
            alt={page.still.alt}
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="mx-auto aspect-[4/5] max-w-md sm:aspect-[16/9] sm:max-w-5xl"
            position="50% 45%"
            drift={12}
          />
        </section>

        {/* What this experience gives you: four feelings, in two columns */}
        <section className="px-6 py-28 sm:px-12 sm:py-44">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <p className={label}>{page.gives.label}</p>
            </ScrollReveal>
            <div className="mt-14 grid gap-x-20 gap-y-14 sm:grid-cols-2">
              {page.gives.items.map((item, i) => (
                <ScrollReveal key={item.title} delay={(i % 2) * 0.1} className="border-t border-bark/15 pt-8">
                  <h2 className="font-display text-3xl italic text-bark sm:text-4xl">{item.title}</h2>
                  <p className={`mt-4 max-w-sm ${body}`}>{item.body}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* A celebration of self */}
        <section className="px-6 py-28 sm:px-12 sm:py-48">
          <div className="mx-auto grid max-w-5xl items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-32">
            <CinematicImage
              src={page.celebrationPhoto.src}
              alt={page.celebrationPhoto.alt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mx-auto aspect-[3/4] w-full max-w-sm"
              position="50% 30%"
            />
            <ScrollReveal>
              <p className={label}>{page.why.label}</p>
              {page.why.body.map((p, i) => (
                <p key={p.slice(0, 24)} className={i === 0 ? 'mt-8 font-display text-2xl leading-snug text-bark sm:text-3xl' : `mt-7 ${body}`}>
                  {p}
                </p>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* The line to remember, given the whole width */}
        <section className="px-6 py-32 sm:py-56">
          <ScrollReveal className="mx-auto max-w-4xl text-center">
            <p className="font-display text-4xl italic leading-[1.15] text-bark sm:text-6xl">{page.why.quote}</p>
          </ScrollReveal>
        </section>

        {/* Portfolio: an even, airy grid */}
        <section className="px-6 py-28 sm:px-12 sm:py-44">
          <div className="mx-auto max-w-6xl">
            <p className={label}>{page.galleryLabel}</p>
            <div className="mt-16 grid grid-cols-3 gap-2 sm:gap-10">
              {page.gallery.map((photo, i) => (
                <ScrollReveal key={photo.src} delay={(i % 3) * 0.08}>
                  <CinematicImage
                    src={photo.src}
                    alt={photo.alt}
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className={photo.tall ? 'aspect-[4/5]' : 'aspect-square'}
                    drift={6}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* The practical side: what the experience actually is */}
        <section className="px-6 pb-28 sm:px-12 sm:pb-44">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className={label}>{page.experience.label}</p>
            <p className="mt-8 font-display text-2xl leading-snug text-bark sm:text-[2rem]">{page.experience.body}</p>
            <p className="mt-8 font-display text-2xl italic leading-snug text-bark/80 sm:text-3xl">{page.experience.hype}</p>
            <p className="mt-10 font-body text-sm text-stone">{page.experience.note}</p>
          </ScrollReveal>
        </section>

        {/* Why I do this: Lena's story beside her portrait */}
        <section className="bg-sand px-6 py-28 sm:px-12 sm:py-48">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <ScrollReveal className="max-w-xl">
              <p className={label}>{page.story.label}</p>
              {page.story.body.map((p, i) => (
                <p
                  key={p.slice(0, 24)}
                  className={
                    i === page.story.body.length - 1
                      ? 'mt-10 font-display text-3xl italic text-bark'
                      : `${i === 0 ? 'mt-8' : 'mt-6'} ${body}`
                  }
                >
                  {p}
                </p>
              ))}
            </ScrollReveal>
            <CinematicImage
              src={page.story.photo.src}
              alt={page.story.photo.alt}
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="aspect-[4/5] w-full lg:mt-16"
              position="62% 50%"
            />
          </div>
        </section>

        {/* Enquiry: bright and quiet */}
        <section id="enquire" className="scroll-mt-20 px-6 py-28 sm:px-12 sm:py-48">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
            <ScrollReveal>
              <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-bark sm:text-7xl">{page.enquiry.heading}</h2>
              <p className={`mt-8 max-w-sm ${body}`}>{page.enquiry.body}</p>
              <a
                href={socialLinks.Instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block border-b border-bark/40 pb-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-bark transition-opacity hover:opacity-60"
              >
                {page.enquiry.dm}
              </a>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <PhotoEnquiryForm />
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-bark/10 px-6 py-12 text-center">
          <p className="font-body text-sm text-stone">
            {page.connection.line}{' '}
            <Link href={page.connection.href} className="text-bark underline underline-offset-4 hover:opacity-60">
              {page.connection.label}
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
