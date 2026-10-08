import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { myStory } from '@/content/site';

// Mirrors the Section 2 reference: a tilted Polaroid-style photo collage
// with a sticker badge, paired with a pull-quote + bio.
export default function Section2() {
  return (
    <section id="about" className="overflow-hidden bg-cream px-6 pb-48 pt-32 sm:pb-72 sm:pt-44">
      <div className="container-editorial grid items-center gap-16 lg:grid-cols-2">
        <ScrollReveal className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 -rotate-6 bg-cream p-3 shadow-xl">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/lena-sunrise.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
                style={{ objectPosition: '30% 50%' }}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="absolute inset-6 translate-x-6 translate-y-4 rotate-3 bg-cream p-3 shadow-xl">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/lena-sunrise.jpg"
                alt="Lena at sunrise above the clouds"
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
                style={{ objectPosition: '70% 50%' }}
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 flex h-24 w-24 -rotate-12 items-center justify-center rounded-full bg-zing-pink p-3 text-center font-script text-lg leading-[0.95] text-bark shadow-md">
            the unknown
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal>
            <SectionLabel>{myStory.label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 font-display text-display-4 italic leading-tight text-bark">
              “{myStory.quote}”
            </p>
          </ScrollReveal>
          <div className="mt-8 h-px w-16 bg-bark/20" />
          <ScrollReveal delay={0.2}>
            <div className="mt-8 space-y-4">
              {myStory.body.split('\n\n').map((para, i) => (
                <p key={i} className="font-body text-base leading-relaxed text-umber">{para}</p>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href={myStory.ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-bark px-7 py-3 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream"
            >
              {myStory.cta}
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
