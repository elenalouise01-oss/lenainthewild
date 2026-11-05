import Link from 'next/link';
import BodygraphIllustration from '@/components/intuition/BodygraphIllustration';
import DrawnLine from '@/components/DrawnLine';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { quizTeaser } from '@/content/site';

// The Intuition Blueprint quiz on the home page: brown, laid out like the free
// tapping practice (card on the right on a laptop, above the text on a phone,
// with a doodle line from the card to the button).
export default function QuizTeaser() {
  return (
    <section id="free-quiz" className="bg-bark px-6 py-28 sm:py-36">
      <div className="container-editorial grid items-center gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
        <ScrollReveal className="mx-auto w-full max-w-[16rem] sm:max-w-xs lg:order-last">
          {/* The same white polaroid as the tapping practice, with the chart in it */}
          <div className="relative -rotate-3 bg-cream p-3 shadow-2xl lg:rotate-3">
            <div className="bg-porcelain px-3 pb-4 pt-6">
              <BodygraphIllustration className="mx-auto h-auto w-full" />
              <p aria-hidden="true" className="mt-2 text-center font-hand text-lg text-bark">
                {quizTeaser.scribble}
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div>
            <SectionLabel className="!text-sage">{quizTeaser.label}</SectionLabel>
            <h2 className="mt-6 font-display text-display-3 italic leading-[1.1] text-cream">{quizTeaser.heading}</h2>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-cream/85 sm:text-lg">{quizTeaser.body}</p>
            <div className="relative mt-10 inline-block">
              {/* A doodle line looping in from the card side to the button
                  (laptop only, where the card sits to the right) */}
              <DrawnLine
                viewBox="0 0 300 100"
                colour="#ffffff"
                className="absolute left-full top-1/2 ml-4 hidden h-[100px] w-[300px] -translate-y-[78%] lg:block"
                d="M292 14 C 240 8, 196 22, 190 48 C 186 70, 216 76, 222 58 C 228 38, 186 34, 150 58 C 116 80, 60 86, 12 80"
                arrow="M24 72 L11 80 L23 88"
              />
              <Link
                href={quizTeaser.href}
                className="inline-block rounded-full bg-sage px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-transform hover:scale-105"
              >
                {quizTeaser.cta} →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
