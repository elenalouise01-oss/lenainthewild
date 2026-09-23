import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { hero, myStory } from '@/content/site';

// Mirrors the Section 2 reference: a tilted Polaroid-style photo collage
// with a sticker badge, paired with a pull-quote + bio.
export default function Section2() {
  return (
    <section id="about" className="overflow-hidden bg-sand px-6 py-28 sm:py-36">
      <div className="container-editorial grid items-center gap-16 lg:grid-cols-2">
        <ScrollReveal className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 -rotate-6 bg-cream p-3 shadow-xl">
            <div className="relative h-full w-full overflow-hidden">
              {hero.imageSrc && (
                <Image src={hero.imageSrc} alt="Lena, out in it" fill className="object-cover" />
              )}
            </div>
          </div>
          <div className="absolute inset-6 translate-x-6 translate-y-4 rotate-3 bg-cream p-3 shadow-xl">
            <div className="relative h-full w-full overflow-hidden">
              {hero.imageSrc && (
                <Image
                  src={hero.imageSrc}
                  alt="Lena, behind the scenes"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '70% 20%' }}
                />
              )}
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full border border-bark/20 bg-zing-yellow text-center font-hand text-sm text-bark shadow-md">
            in the wild
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
            <p className="mt-8 font-body text-base leading-relaxed text-umber">{myStory.body}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href={myStory.ctaHref}
              className="mt-8 inline-flex items-center gap-2 border border-bark px-7 py-3 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream"
            >
              {myStory.cta}
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
