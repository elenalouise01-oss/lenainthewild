import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { newsletter } from '@/content/site';

export default function Newsletter() {
  return (
    <section id="subscribe" className="relative overflow-hidden bg-porcelain px-6 py-28 sm:py-32">
      {/* Signature soft circle, in pink here */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(56rem,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #ff8bb8 0, #ff8bb8 45%, transparent 70%)' }}
      />
      <div className="container-editorial relative text-center">
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
            className="mt-10 inline-block rounded-full bg-[#141414] px-10 py-5 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-sage hover:text-bark"
          >
            {newsletter.cta} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
