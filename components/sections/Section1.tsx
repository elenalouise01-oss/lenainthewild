import ScrollReveal from '@/components/ScrollReveal';
import { welcome } from '@/content/site';

// Mirrors the S1 reference exactly: a normal (non-pinned) tall bold-color
// block — left-aligned bold statement up top, a two-column support-text
// block sitting right-of-center further down, then a light block with a
// vertical side label, a horizontal numbered chapter bar, and a giant
// letter filled with a photo (here, the real cutout hero shot).
export default function Section1() {
  return (
    <section id="story">
      <div className="bg-bark px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <h2 className="max-w-3xl font-display text-display-2 italic leading-[1.05] text-cream">
              {welcome.headline}
            </h2>
          </ScrollReveal>

          <div className="mt-24 flex justify-end sm:mt-36">
            <div className="grid max-w-2xl gap-10 text-left sm:grid-cols-2">
              <ScrollReveal>
                <p className="font-body text-base leading-relaxed text-cream/80">{welcome.supportLeft}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="font-body text-base leading-relaxed text-cream/80">{welcome.supportRight}</p>
                <a
                  href={welcome.ctaHref}
                  className="mt-6 inline-block font-body text-xs font-semibold uppercase tracking-widest2 text-zing-yellow transition-colors hover:text-cream"
                >
                  {welcome.cta} →
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-[70vh] items-center overflow-hidden bg-sand px-6 py-20 sm:px-10 lg:px-16">
        <span className="absolute left-3 top-1/2 hidden -translate-y-1/2 -rotate-90 whitespace-nowrap font-body text-xs font-semibold uppercase tracking-widest2 text-stone sm:block">
          {welcome.chapterLabel}
        </span>

        <div className="mx-auto w-full max-w-content">
          <ScrollReveal>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {welcome.chapters.map((chapter, i) => (
                <span
                  key={chapter.label}
                  className={`font-body text-sm font-bold uppercase tracking-wide ${
                    i === 0 ? 'text-sage' : 'text-bark/40'
                  }`}
                >
                  {chapter.number} {chapter.label}
                </span>
              ))}
            </nav>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div
              className="mt-6 select-none bg-cover bg-center bg-clip-text font-body text-[38vw] font-black uppercase leading-none text-transparent sm:text-[26vw]"
              style={{ backgroundImage: "url('/images/hero.jpg')" }}
              aria-hidden="true"
            >
              {welcome.bigLetter}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
