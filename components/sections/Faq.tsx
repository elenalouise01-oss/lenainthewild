import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { faq } from '@/content/site';

// The questions people ask Google and AI assistants in Lena's niche, answered
// in her voice. Each opens like an accordion; the answers are always in the
// page's HTML, so search engines and AI tools can read them.
export default function Faq() {
  return (
    <section id="faq" className="bg-sand px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <SectionLabel>{faq.label}</SectionLabel>
          <h2 className="mt-4 font-display text-4xl italic leading-tight text-bark sm:text-5xl">{faq.heading}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-10 border-t border-bark/15">
            {faq.items.map(({ q, a }) => (
              <details key={q} className="group border-b border-bark/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-xl leading-snug text-bark sm:text-2xl">{q}</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-sage/60 font-body text-lg text-bark transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 font-body text-base leading-relaxed text-umber">{a}</p>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
