import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { listen } from '@/content/site';

export default function Listen() {
  return (
    <section className="relative overflow-hidden border-t border-bark/10 bg-cream px-6 py-24 sm:py-32">
      <div className="container-editorial relative text-center">
        <ScrollReveal>
          <SectionLabel>{listen.eyebrow}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 font-display text-display-3 italic text-bark">{listen.headline}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-umber">{listen.body}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.3} className="mx-auto mt-10 w-full max-w-xl">
          <iframe
            title={listen.title}
            src={listen.embedSrc}
            width="100%"
            height="352"
            style={{ borderRadius: 12, border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
