import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';
import OfferNextStep from '@/components/OfferNextStep';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import WaitlistForm from '@/components/WaitlistForm';
import { freedomFrequencyPage as page, freedomSeeker } from '@/content/site';

const tier = freedomSeeker.tiers.find((t) => t.title === page.title)!;

export const metadata: Metadata = {
  title: page.title,
  description: tier.body,
};

// Jumps down to the waitlist sign-up at the bottom of the page.
function JoinButton() {
  return (
    <a
      href="#waitlist"
      className="inline-flex items-center gap-3 rounded-full bg-[#141414] px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-105"
    >
      {page.cta} →
    </a>
  );
}

// The Freedom Frequency's own page: the whole story on Lena's site, with
// pink accents, ending with the waitlist sign-up on the brand brown.
export default function FreedomFrequencyPage() {
  return (
    <>
      <SiteHeader active="The Freedom Seeker" />
      <main>
        {/* Cover, title, price and sign-up */}
        <section className="bg-sand px-6 py-20 sm:py-28">
          <div className="container-editorial grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70">{page.label}</p>
              <h1 className="mt-5 font-display text-5xl leading-[1] text-bark sm:text-7xl">{page.title}</h1>
              <p className="mt-3 font-display text-2xl italic text-bark/80 sm:text-3xl">{page.subtitle}</p>
              <p className="mt-8 max-w-md font-body text-base leading-relaxed text-bark/85">{tier.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tier.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-bark/25 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-bark">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <JoinButton />
                {tier.price && (
                  <span className="rounded-full bg-zing-pink px-4 py-2 font-body text-sm font-bold text-bark">{tier.price}</span>
                )}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="mx-auto w-full max-w-md">
              <div className="relative aspect-square rotate-2 overflow-hidden shadow-2xl">
                <Image src="/images/cover-freedom-frequency.webp" alt="The Freedom Frequency cover art" fill priority sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
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
              <div className="mt-10 space-y-6">
                {page.forParagraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber sm:text-lg">{p}</p>
                ))}
              </div>
              <p className="my-12 border-l-4 border-zing-pink pl-6 font-display text-2xl leading-snug text-bark sm:text-3xl">{page.forPullQuote}</p>
              <div className="space-y-6">
                {page.forParagraphs2.map((p) => (
                  <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber sm:text-lg">{p}</p>
                ))}
              </div>
              <ul className="mt-10 space-y-3">
                {page.questions.map((q) => (
                  <li key={q} className="font-display text-xl italic text-bark sm:text-2xl">{q}</li>
                ))}
              </ul>
              <p className="mt-12 font-display text-3xl leading-tight text-bark sm:text-4xl">{page.knowing}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* Lena's story */}
        <section className="bg-sand px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <div className="relative mx-auto mb-14 aspect-[4/3] w-full -rotate-1 overflow-hidden bg-cream p-2 shadow-xl">
                <div className="relative h-full w-full overflow-hidden">
                  <Image src="/images/lena-sunrise.jpg" alt="Lena at sunrise above the clouds" fill sizes="(min-width: 640px) 42rem, 90vw" className="object-cover" style={{ objectPosition: '65% 45%' }} />
                </div>
              </div>
              <p className="font-display text-2xl leading-snug text-bark sm:text-3xl">{page.storyLead}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 space-y-6">
                {page.storyParagraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber sm:text-lg">{p}</p>
                ))}
              </div>
              <div className="my-12 space-y-2 border-l-4 border-sage pl-6">
                {page.turningPoint.map((line) => (
                  <p key={line} className="font-display text-xl italic text-bark sm:text-2xl">{line}</p>
                ))}
              </div>
              <p className="font-display text-2xl text-bark sm:text-3xl">{page.shifting}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* What the course is */}
        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="font-display text-3xl leading-tight text-bark sm:text-5xl">{page.courseHeading}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 space-y-6">
                {page.courseParagraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber sm:text-lg">{p}</p>
                ))}
              </div>
              <div className="my-14 grid gap-4 sm:grid-cols-3">
                {page.gives.map((g, i) => (
                  <p
                    key={g}
                    className={`rounded-sm px-5 py-6 text-center font-display text-xl italic text-bark shadow-sm ${
                      ['bg-zing-pink/60', 'bg-sage/50', 'bg-zing-yellow/80'][i % 3]
                    }`}
                  >
                    {g}
                  </p>
                ))}
              </div>
              <p className="font-display text-2xl leading-snug text-bark sm:text-3xl">{page.seen}</p>
              <div className="mt-10 space-y-6">
                {page.whyParagraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber sm:text-lg">{p}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Closing waitlist sign-up */}
        <section id="waitlist" className="scroll-mt-16 bg-bark px-6 py-24 text-center sm:py-32">
          <ScrollReveal className="mx-auto max-w-2xl">
            <p className="font-display text-3xl italic leading-tight text-cream sm:text-5xl">{page.closing}</p>
            <p className="mt-14 font-body text-xs font-semibold uppercase tracking-widest2 text-zing-pink">{page.waitlistHeading}</p>
            <p className="mx-auto mt-3 max-w-md font-body text-base leading-relaxed text-cream/80">{page.waitlistBody}</p>
            <div className="mt-8">
              <WaitlistForm offer={page.title} cta={page.cta} sent={page.waitlistSent} dark />
            </div>
          </ScrollReveal>
        </section>
        <OfferNextStep {...page.next} />
      </main>
      <Footer />
    </>
  );
}
