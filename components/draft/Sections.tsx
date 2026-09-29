import Image from 'next/image';
import Link from 'next/link';
import Envelope from '@/components/Envelope';
import ScrollReveal from '@/components/ScrollReveal';
import Marquee from '@/components/draft/Marquee';
import { freedomSeeker, myStory, welcome } from '@/content/site';

// Draft sections laid out like the Naluri Socials site: one eyebrow style,
// one strong headline per section, a consistent left-aligned grid, calm
// light sections with dark bands used sparingly for emphasis.

// "✦ —— LABEL" eyebrow used at the top of every section.
function Eyebrow({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p
      className={`flex items-center gap-3 font-body text-[0.7rem] font-semibold uppercase tracking-widest2 ${
        tone === 'light' ? 'text-zing-yellow' : 'text-stone'
      }`}
    >
      <span aria-hidden="true">✦</span>
      <span aria-hidden="true" className={`h-px w-10 ${tone === 'light' ? 'bg-zing-yellow/60' : 'bg-bark/25'}`} />
      {children}
    </p>
  );
}

const headline = 'font-body font-black uppercase leading-[0.95] tracking-tight';

// Scrolling word strip under the hero.
export function WordStrip() {
  return (
    <div className="border-y border-bark/10 bg-sand py-5">
      <Marquee
        items={['Freedom', 'Slow Living', 'Travel', 'Wellness', 'Healing', 'The Unknown']}
        separator="✦"
        textClassName={`${headline} text-3xl text-bark/80 sm:text-4xl`}
      />
    </div>
  );
}

// Welcome, in the layout of Naluri's "The Problem": big bold headline left,
// the words right.
export function Welcome() {
  return (
    <section id="story" className="bg-sand px-6 py-28 sm:py-40">
      <div className="container-editorial grid gap-12 lg:grid-cols-2 lg:gap-20">
        <ScrollReveal>
          <Eyebrow>{welcome.eyebrow}</Eyebrow>
          <h2 className={`${headline} mt-8 text-4xl text-bark sm:text-6xl`}>{welcome.headline}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="lg:pt-16">
          <p className="font-body text-lg leading-relaxed text-umber">{welcome.supportLeft}</p>
          <p className="mt-6 font-body text-lg leading-relaxed text-umber">{welcome.supportRight}</p>
          <Link
            href={welcome.ctaHref}
            className="mt-10 inline-flex rounded-full bg-zing-yellow px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream"
          >
            {welcome.cta} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// About, in the layout of Naluri's "Hi, I'm Elena".
export function About() {
  return (
    <section id="about" className="bg-sand px-6 py-28 sm:py-40">
      <div className="container-editorial grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <ScrollReveal className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden shadow-xl">
            <Image
              src="/images/lena-sunrise.jpg"
              alt="Lena at sunrise above the clouds"
              fill
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
              style={{ objectPosition: '72% 50%' }}
            />
          </div>
          <span className="absolute -bottom-5 -left-5 flex h-24 w-24 -rotate-12 items-center justify-center rounded-full bg-zing-pink p-3 text-center font-script text-lg leading-[0.95] text-bark shadow-md">
            the unknown
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Eyebrow>About Lena</Eyebrow>
          <h2 className="mt-8 font-display text-5xl text-bark sm:text-6xl">Hi, I&rsquo;m Lena.</h2>
          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-umber">{myStory.body}</p>
          <blockquote className="mt-10 max-w-lg border-l-2 border-sage pl-6 font-display text-2xl italic leading-snug text-bark sm:text-3xl">
            &ldquo;{myStory.quote}&rdquo;
          </blockquote>
          <p className="mt-10 max-w-lg font-display text-xl italic leading-snug text-bark">
            {freedomSeeker.experienceLead}{' '}
            <span className="mx-1 inline-block rounded-full bg-zing-yellow px-3 py-0.5 align-middle font-body text-xs font-semibold not-italic uppercase tracking-wide">
              {freedomSeeker.experienceHighlight}
            </span>{' '}
            {freedomSeeker.experienceTail}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// The Freedom Seeker, as a dark "big idea" band like Naluri's
// "You are the content".
export function BigIdea() {
  const words = freedomSeeker.headline.replace(/\.$/, '').split(' ');
  const split = words.length - 3;
  return (
    <section className="bg-bark px-6 py-28 sm:py-40">
      <div className="container-editorial">
        <ScrollReveal>
          <Eyebrow tone="light">{freedomSeeker.label}</Eyebrow>
          <h2 className={`${headline} mt-8 text-5xl text-cream sm:text-7xl`}>
            {words.slice(0, split).join(' ')} <span className="text-zing-yellow">{words.slice(split).join(' ')}.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-16 grid gap-8 border-t border-cream/15 pt-12 sm:grid-cols-2 sm:gap-16">
            <p className="font-body text-base leading-relaxed text-cream/75">{freedomSeeker.sub}</p>
            <p className="font-body text-base leading-relaxed text-cream/75">{freedomSeeker.creativeWork.body}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// On the Road, as a numbered list like Naluri's "Imagine instead".
export function OnTheRoadList() {
  return (
    <section id="on-the-road" className="bg-sand px-6 py-28 sm:py-40">
      <div className="container-editorial">
        <ScrollReveal>
          <Eyebrow>{freedomSeeker.pillarsLabel}</Eyebrow>
          <h2 className={`${headline} mt-8 max-w-3xl text-4xl text-bark sm:text-6xl`}>{freedomSeeker.creativeWork.leadItalic} {freedomSeeker.creativeWork.leadBold}.</h2>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-umber">{freedomSeeker.pillarsIntro}</p>
        </ScrollReveal>

        <ol className="mt-16 border-t border-bark/10">
          {freedomSeeker.pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={0.05 * i}>
              <li className="grid items-baseline gap-4 border-b border-bark/10 py-8 sm:grid-cols-[6rem_1fr_1fr] sm:gap-10">
                <span className="font-display text-4xl italic text-bark/25">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-stone">{pillar.category}</p>
                  <h3 className="mt-2 font-display text-3xl text-bark">{pillar.title}</h3>
                </div>
                <p className="font-body text-base leading-relaxed text-umber">{pillar.excerpt}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// My Journey with the envelope.
export function Journey() {
  return (
    <section id="experience" className="bg-sand px-6 pb-28 pt-12 sm:pb-40">
      <div className="container-editorial">
        <ScrollReveal>
          <Eyebrow>{freedomSeeker.contentJourney.label}</Eyebrow>
          <h2 className="mt-8 max-w-3xl font-display text-3xl leading-snug text-bark sm:text-5xl">
            {freedomSeeker.contentJourney.lead} <span className="italic">{freedomSeeker.contentJourney.tail}</span>
          </h2>
          <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-umber">
            {freedomSeeker.contentJourney.colBold} {freedomSeeker.contentJourney.colRest}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="mt-24">
          <Envelope />
        </ScrollReveal>
      </div>
    </section>
  );
}

// Dark quote band like Naluri's "The mindset shift".
export function QuoteBreak() {
  return (
    <section className="bg-bark px-6 py-28 sm:py-36">
      <ScrollReveal className="container-editorial text-center">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-zing-yellow">
          {freedomSeeker.noteCard.label}
        </p>
        <p className="mx-auto mt-8 max-w-3xl font-display text-3xl italic leading-snug text-cream sm:text-5xl">
          {freedomSeeker.noteCard.body}
        </p>
      </ScrollReveal>
    </section>
  );
}
