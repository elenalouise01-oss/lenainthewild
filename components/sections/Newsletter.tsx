import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { newsletter } from '@/content/site';

export default function Newsletter() {
  return (
    <section id="subscribe" className="bg-porcelain px-6 py-28 sm:py-32">
      <div className="container-editorial text-center">
        <ScrollReveal>
          <SectionLabel>{newsletter.eyebrow}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 font-display text-display-3 text-bark">{newsletter.headline}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-umber">
            {newsletter.body}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Link
            href={newsletter.ctaHref}
            className="mt-10 inline-block bg-rose px-10 py-5 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-blush"
          >
            {newsletter.cta} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
