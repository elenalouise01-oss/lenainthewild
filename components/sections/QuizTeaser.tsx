import Link from 'next/link';
import BodygraphIllustration from '@/components/intuition/BodygraphIllustration';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import { quizTeaser } from '@/content/site';

// The Intuition Blueprint quiz on the home page: brown, so it reads as its own
// thing, apart from the free tapping practice lower down.
export default function QuizTeaser() {
  return (
    <section id="free-quiz" className="bg-bark px-6 py-28 sm:py-36">
      <div className="container-editorial grid items-center gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <ScrollReveal className="mx-auto w-full max-w-[17rem] sm:max-w-[20rem]">
          <div className="relative bg-porcelain p-4 pb-12 shadow-2xl">
            <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-2 bg-zing-yellow/85 shadow-sm" />
            <BodygraphIllustration className="mx-auto h-auto w-full" />
            <p aria-hidden="true" className="absolute inset-x-0 bottom-3 text-center font-hand text-lg text-bark">
              {quizTeaser.scribble}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="text-center lg:text-left">
          <SectionLabel className="!text-sage">{quizTeaser.label}</SectionLabel>
          <h2 className="mt-6 font-display text-display-3 italic leading-[1.1] text-cream">{quizTeaser.heading}</h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-cream/85 sm:text-lg lg:mx-0">{quizTeaser.body}</p>
          <Link
            href={quizTeaser.href}
            className="mt-10 inline-block rounded-full bg-sage px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-transform hover:scale-105"
          >
            {quizTeaser.cta} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
