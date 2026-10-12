import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { faq as homeFaq, type FaqItem } from '@/content/site';

type Props = {
  label?: string;
  heading?: string;
  items?: FaqItem[];
  // The link under the questions (the home page's goes to Who I Help).
  more?: { href: string; label: string } | null;
  className?: string;
};

// Questions answered in Lena's voice. Each opens like an accordion; the
// answers are always in the page's HTML, so search engines and AI tools can
// read them. The home page uses the defaults; offer pages pass their own.
export default function Faq({
  label = homeFaq.label,
  heading = homeFaq.heading,
  items = homeFaq.items,
  more = { href: '/life-design', label: 'Not sure what you want from life? Start here' },
  className = 'bg-sand',
}: Props) {
  return (
    <section id="faq" className={`${className} px-6 py-20 sm:py-24`}>
      <div className="container-editorial grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
        <ScrollReveal>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="mt-4 font-display text-3xl italic leading-tight text-bark sm:text-4xl">{heading}</h2>
          {more && (
            <Link
              href={more.href}
              className="mt-6 hidden py-2 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark lg:inline-block"
            >
              {more.label} →
            </Link>
          )}
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="border-t border-bark/15">
            {items.map(({ q, a, link }) => (
              <details key={q} className="group border-b border-bark/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg leading-snug text-bark sm:text-xl">{q}</h3>
                  <span aria-hidden="true" className="flex-none font-body text-2xl font-light leading-none text-bark/50 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="max-w-xl space-y-3 pb-5">
                  {a.map((p) => (
                    <p key={p.slice(0, 24)} className="font-body text-[0.95rem] leading-relaxed text-umber">
                      {p}
                    </p>
                  ))}
                  {link && (
                    <p className="flex flex-wrap gap-x-6">
                      {(Array.isArray(link) ? link : [link]).map((l) => (
                        <Link key={l.href} href={l.href} className="inline-block py-1 font-body text-sm text-bark underline decoration-sage decoration-2 underline-offset-4 hover:decoration-bark">
                          {l.label} →
                        </Link>
                      ))}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
          {more && (
            <Link
              href={more.href}
              className="mt-8 inline-block py-2 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark lg:hidden"
            >
              {more.label} →
            </Link>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
