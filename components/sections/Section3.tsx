'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { freedomSeeker, hero } from '@/content/site';

function Polaroid({
  className = '',
  objectPosition,
  imgClassName = '',
  children,
}: {
  className?: string;
  objectPosition: string;
  imgClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`bg-cream p-1.5 shadow-xl ${className}`}>
      <div className="relative h-full w-full overflow-hidden">
        {hero.imageSrc && (
          <Image
            src={hero.imageSrc}
            alt=""
            fill
            className={`object-cover ${imgClassName}`}
            style={{ objectPosition }}
            aria-hidden="true"
          />
        )}
      </div>
      {children}
    </div>
  );
}

// Mirrors the Section 3 reference in full, broken into alternating
// light/dark bands: the offer (dark), the personal note + experience
// (light), the content/campaign carousel (dark), the journey + envelope
// (light), the modeling statement (dark), then the pinned-photo contact
// section (light).
export default function Section3() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="freedom-seeker">
      {/* Band 1 — the offer: dark, punchy */}
      <div className="bg-bark px-6 py-28 sm:py-36">
        <div className="container-editorial">
          <div className="relative">
            <div className="absolute left-0 top-0 hidden -translate-y-6 -rotate-6 bg-cream p-2 shadow-xl md:block">
              <div className="relative h-28 w-28 overflow-hidden">
                {hero.imageSrc && (
                  <Image src={hero.imageSrc} alt="" fill className="object-cover" style={{ objectPosition: '30% 10%' }} aria-hidden="true" />
                )}
              </div>
            </div>
            <ScrollReveal>
              <h2 className="mx-auto max-w-2xl text-center font-display text-display-2 italic leading-[1.05] text-cream">
                {freedomSeeker.headline}
              </h2>
            </ScrollReveal>
            <div className="absolute right-0 top-0 hidden -translate-y-6 rotate-6 bg-cream p-2 shadow-xl md:block">
              <div className="relative h-28 w-28 overflow-hidden">
                {hero.imageSrc && (
                  <Image src={hero.imageSrc} alt="" fill className="object-cover" style={{ objectPosition: '80% 60%' }} aria-hidden="true" />
                )}
              </div>
            </div>
          </div>

          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-center font-body text-base leading-relaxed text-cream/70">
              {freedomSeeker.sub}
            </p>
          </ScrollReveal>

          <div className="mt-16 space-y-6">
            {freedomSeeker.tiers.map((tier, i) => (
              <ScrollReveal key={tier.title} delay={0.1 * i}>
                <div className="border border-cream/15 p-8 sm:grid sm:grid-cols-[5fr_2fr_5fr] sm:items-start">
                  <div>
                    <h3 className="font-display text-3xl text-cream sm:text-4xl">{tier.title}</h3>
                    <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-cream/70">{tier.body}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {tier.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-cream/25 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-cream/70">
                          {tag}
                        </span>
                      ))}
                      <span className="rounded-full bg-zing-yellow px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-bark">
                        {tier.price}
                      </span>
                    </div>
                  </div>

                  <div className="col-start-3 mt-6 sm:mt-0">
                    <div className="text-right font-body text-sm text-cream/40">{tier.number}</div>
                    <div className="relative mt-3 aspect-[5/3] w-full overflow-hidden">
                      {hero.imageSrc && (
                        <Image
                          src={hero.imageSrc}
                          alt=""
                          fill
                          className="object-cover"
                          style={{ objectPosition: `${20 + i * 25}% ${10 + i * 15}%` }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-14 text-center">
              <Link
                href={freedomSeeker.ctaHref}
                className="inline-flex items-center gap-2 border border-cream px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-cream hover:text-bark"
              >
                {freedomSeeker.cta} →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Band 2 — light: the binder-clip note + "Creative Work" pitch,
          then the Marketing Experience statement. */}
      <div className="bg-porcelain px-6 py-28 sm:py-36">
        <div className="container-editorial">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <ScrollReveal className="relative mx-auto max-w-xs">
              <div className="absolute -inset-4 -rotate-2 rounded-sm bg-zing-green/60" />
              <div className="relative -rotate-1 bg-cream p-8 pt-10 shadow-xl">
                <svg className="absolute -top-5 left-1/2 h-10 w-6 -translate-x-1/2 text-bark" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="10" rx="5" />
                  <line x1="12" y1="13" x2="12" y2="34" />
                </svg>
                <p className="font-display text-xl italic text-bark">{freedomSeeker.noteCard.label}</p>
                <p className="mt-3 font-hand text-lg leading-relaxed text-umber">{freedomSeeker.noteCard.body}</p>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <p className="font-display text-3xl italic text-bark sm:text-4xl">{freedomSeeker.creativeWork.leadItalic}</p>
                <p className="font-display text-3xl font-bold uppercase text-bark sm:text-4xl">
                  {freedomSeeker.creativeWork.leadBold}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-umber">{freedomSeeker.creativeWork.body}</p>
                <Link href={freedomSeeker.creativeWork.ctaHref} className="relative mt-6 inline-block font-body text-xs font-semibold uppercase tracking-widest2 text-sage transition-colors hover:text-bark">
                  {freedomSeeker.creativeWork.cta}
                </Link>
              </ScrollReveal>
            </div>
          </div>

          <div className="mt-24 border-t border-bark/10 pt-20">
            <ScrollReveal>
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{freedomSeeker.experienceLabel}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 max-w-4xl font-display text-3xl italic leading-snug text-bark sm:text-4xl">
                {freedomSeeker.experienceLead}{' '}
                <span className="mx-1 inline-block rounded-full bg-rose px-4 py-1 align-middle font-body text-sm font-semibold not-italic uppercase tracking-wide text-bark">
                  {freedomSeeker.experienceHighlight}
                </span>{' '}
                {freedomSeeker.experienceTail}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Band 3 — dark: reel-style content carousel + brand-campaigns strip */}
      <div className="bg-bark px-6 py-28 sm:py-36">
        <div className="container-editorial">
          <div className="flex items-end justify-between">
            <div>
              <ScrollReveal>
                <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-cream/50">{freedomSeeker.pillarsLabel}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <p className="mt-2 max-w-sm font-body text-sm text-cream/70">{freedomSeeker.pillarsIntro}</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-4">
            {freedomSeeker.pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={0.08 * i}>
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-cream/10">
                  {hero.imageSrc && (
                    <Image
                      src={hero.imageSrc}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ objectPosition: `${30 + i * 15}% ${5 + i * 8}%` }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bark/85 via-bark/10 to-transparent" />
                  <span className="absolute right-2 top-2 h-6 w-6 rounded-full border border-cream/50 bg-bark/40" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-body text-[0.6rem] font-semibold uppercase tracking-widest2 text-zing-yellow">{pillar.category}</p>
                    <h4 className="mt-1.5 font-display text-lg text-cream">{pillar.title}</h4>
                    <p className="mt-1 font-body text-[0.65rem] leading-snug text-cream/70">{pillar.excerpt}</p>
                    <p className="mt-2 border-t border-cream/15 pt-2 font-body text-[0.55rem] font-semibold uppercase tracking-wide text-cream/40">
                      {pillar.roles}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-24">
            <ScrollReveal>
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-cream/50">{freedomSeeker.brandCampaigns.label}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="mt-2 max-w-sm font-body text-sm text-cream/70">{freedomSeeker.brandCampaigns.body}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative mt-14 flex h-44 items-center justify-center gap-2 sm:h-52">
                <Polaroid className="h-40 w-32 -rotate-6 sm:h-48 sm:w-36" objectPosition="15% 30%" />
                <Polaroid className="z-10 h-44 w-36 rotate-3 sm:h-52 sm:w-40" objectPosition="55% 10%" />
                <Polaroid className="h-40 w-32 rotate-12 sm:h-48 sm:w-36" objectPosition="85% 50%" />
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-2xl" aria-hidden="true">
                  🌼
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Band 4 — light: the journey statement + two-column, then the
          envelope of Polaroids spilling out. */}
      <div className="bg-blush px-6 py-28 sm:py-36">
        <div className="container-editorial">
          <ScrollReveal>
            <p className="text-center font-body text-xs font-semibold uppercase tracking-widest2 text-stone">
              {freedomSeeker.contentJourney.label}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-3xl text-center font-display text-2xl leading-snug text-bark sm:text-3xl">
              <span className="font-bold not-italic">{freedomSeeker.contentJourney.lead}</span>{' '}
              <span className="italic">{freedomSeeker.contentJourney.tail}</span>
            </p>
          </ScrollReveal>

          <div className="mx-auto mt-12 grid max-w-2xl gap-8 text-left sm:grid-cols-2">
            <ScrollReveal delay={0.15}>
              <p className="font-body text-sm font-semibold leading-relaxed text-bark">{freedomSeeker.contentJourney.colBold}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-sm leading-relaxed text-umber">{freedomSeeker.contentJourney.colRest}</p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-20 max-w-2xl text-center font-display text-2xl italic leading-snug text-bark sm:text-3xl">
              {freedomSeeker.envelope.leadBold} {freedomSeeker.envelope.leadRest}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative mx-auto mt-24 h-80 w-full max-w-2xl sm:h-96">
              {/* Hand-drawn dashed squiggle connecting the statement above
                  to the envelope, like the reference's doodle line. */}
              <svg
                className="pointer-events-none absolute -top-16 left-0 hidden h-20 w-28 text-bark/30 sm:block"
                viewBox="0 0 100 90"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 5"
                aria-hidden="true"
              >
                <path d="M8 4 C 60 4, 95 20, 60 40 C 30 57, 55 60, 55 75" strokeLinecap="round" />
              </svg>

              {/* Envelope pocket + flap as one silhouette, so it reads as an
                  actual envelope (not a plain card) even with photos poking
                  out the top of it. */}
              <svg
                viewBox="0 0 400 260"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-full w-full drop-shadow-2xl"
                aria-hidden="true"
              >
                <path
                  d="M0,100 L200,10 L400,100 L400,260 L0,260 Z"
                  className="fill-cream"
                  stroke="rgba(59,45,14,0.14)"
                  strokeWidth="2"
                />
              </svg>

              {/* Tops kept below the flap's apex so the triangular flap
                  silhouette stays visible above the photos. The sage card
                  is woven into the fan (like the reference's paperclipped
                  brand card) instead of floating apart from it, and the
                  crops use flips/tone shifts since they all share one
                  source photo. */}
              <Polaroid
                className="absolute top-[110px] left-[2%] z-10 h-28 w-24 -rotate-12 sm:h-32 sm:w-28"
                objectPosition="70% 35%"
                imgClassName="grayscale-[0.5]"
              />

              <div className="absolute top-[72px] left-[19%] z-20 flex h-32 w-28 -rotate-6 flex-col justify-center bg-sage p-3 shadow-xl sm:h-36 sm:w-32">
                <p className="font-body text-[0.55rem] font-semibold uppercase tracking-wide text-cream/80">{freedomSeeker.envelope.cardLabel}</p>
                <p className="mt-1 font-body text-[0.6rem] leading-snug text-cream">{freedomSeeker.envelope.places.join(', ')}</p>
                <svg className="absolute -left-4 -top-6 h-9 w-9 -rotate-12 text-cream/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M8 12V6a4 4 0 1 1 8 0v9a2.5 2.5 0 0 1-5 0V8" strokeLinecap="round" />
                </svg>
              </div>

              <Polaroid
                className="absolute top-[58px] left-[36%] z-10 h-40 w-32 -rotate-2 shadow-2xl sm:h-44 sm:w-40"
                objectPosition="25% 75%"
              />
              <Polaroid
                className="absolute top-[96px] left-[54%] z-10 h-28 w-24 rotate-3 sm:h-32 sm:w-28"
                objectPosition="55% 15%"
                imgClassName="-scale-x-100"
              />
              <Polaroid
                className="absolute top-[70px] left-[68%] z-10 h-32 w-28 -rotate-6 sm:h-36 sm:w-32"
                objectPosition="40% 55%"
                imgClassName="sepia-[0.25]"
              />
              <Polaroid
                className="absolute top-[110px] right-[4%] z-10 h-28 w-24 rotate-12 sm:h-32 sm:w-28"
                objectPosition="85% 10%"
                imgClassName="-scale-x-100 sepia-[0.3]"
              />

              <span className="absolute -right-2 top-4 z-20 -rotate-3 rounded-sm bg-sage px-3 py-6 font-body text-[0.6rem] font-semibold uppercase tracking-wide text-cream shadow-md [writing-mode:vertical-rl]">
                {freedomSeeker.envelope.ribbon}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Band 5 — dark: modeling-style card + giant statement */}
      <div className="bg-bark px-6 py-28 sm:py-36">
        <div className="container-editorial text-center">
          <ScrollReveal>
            <div className="mx-auto inline-block -rotate-1 bg-cream px-10 py-8 shadow-2xl">
              <p className="font-display text-xl italic text-bark">{freedomSeeker.modelingCard.label}</p>
              <p className="mt-1 font-display text-3xl font-bold text-bark">{freedomSeeker.modelingCard.headline}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h3 className="mt-10 font-display text-[14vw] font-bold uppercase leading-none text-cream sm:text-[9vw]">
              {freedomSeeker.bigStatement}
            </h3>
          </ScrollReveal>
        </div>
      </div>

      {/* Band 6 — light: contact, with a safety pin holding a scattered
          stack of photos, mirroring the reference's "Ready to Start?
          Let's Talk". */}
      <div className="bg-sand px-6 py-28 sm:py-36">
        <div className="container-editorial grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <ScrollReveal>
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{freedomSeeker.contact.kicker}</p>
              <h3 className="mt-2 font-display text-4xl italic text-bark sm:text-5xl">{freedomSeeker.contact.headline}</h3>
              <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-umber">{freedomSeeker.contact.body}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <ol className="mt-8 space-y-2">
                {freedomSeeker.contact.list.map((item, i) => (
                  <li key={item} className="font-body text-sm text-bark">
                    {i + 1}) {item}
                  </li>
                ))}
              </ol>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="mt-10 font-body text-xs font-semibold uppercase tracking-widest2 text-stone">
                {freedomSeeker.contact.listLabel}
              </p>
              {submitted ? (
                <p className="mt-4 rounded-sm border border-sage/30 bg-sage/10 px-5 py-4 font-body text-sm text-bark" role="status">
                  Thanks — that&apos;s landed with me. I&apos;ll get back to you shortly.
                </p>
              ) : (
                <form
                  className="mt-4 flex flex-col gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <label className="block">
                    <span className="sr-only">{freedomSeeker.contact.fields.name}</span>
                    <input
                      type="text"
                      required
                      placeholder={freedomSeeker.contact.fields.name}
                      className="w-full border-0 border-b border-bark/25 bg-transparent py-3 font-body text-bark placeholder:text-bark/40 focus:border-bark focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">{freedomSeeker.contact.fields.email}</span>
                    <input
                      type="email"
                      required
                      placeholder={freedomSeeker.contact.fields.email}
                      className="w-full border-0 border-b border-bark/25 bg-transparent py-3 font-body text-bark placeholder:text-bark/40 focus:border-bark focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">{freedomSeeker.contact.fields.message}</span>
                    <textarea
                      rows={3}
                      required
                      placeholder={freedomSeeker.contact.fields.message}
                      className="w-full resize-none border-0 border-b border-bark/25 bg-transparent py-3 font-body text-bark placeholder:text-bark/40 focus:border-bark focus:outline-none"
                    />
                  </label>
                  <button type="submit" className="self-start font-body text-xs font-semibold uppercase tracking-widest2 text-sage transition-colors hover:text-bark">
                    {freedomSeeker.contact.cta} →
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1} className="relative mx-auto h-96 w-full max-w-sm sm:max-w-md">
            {/* A single safety pin, larger and more diagonal, piercing a
                looser scattered stack of photos (was just 2, reference
                shows a denser 5-piece collage) — spring coil at the hinge
                end, a hooked clasp cupping the point at the other end. */}
            <svg
              className="absolute left-2 top-4 z-30 h-24 w-64 text-stone drop-shadow-lg sm:left-4 sm:top-6 sm:h-28 sm:w-72"
              viewBox="0 0 280 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              aria-hidden="true"
            >
              <path d="M32 84 a13 13 0 1 1 14 -22 a9 9 0 1 1 -10 16" strokeLinecap="round" />
              <path d="M32 84 L228 24" strokeLinecap="round" />
              <path d="M228 24 a16 16 0 1 1 0 27" strokeLinecap="round" />
            </svg>

            <Polaroid
              className="absolute left-0 top-24 z-10 h-32 w-24 -rotate-12 sm:h-36 sm:w-28"
              objectPosition="15% 55%"
              imgClassName="grayscale-[0.6]"
            />
            <Polaroid
              className="absolute left-8 top-4 z-20 h-40 w-32 -rotate-3 shadow-2xl sm:h-44 sm:w-36"
              objectPosition="55% 5%"
            />
            <Polaroid
              className="absolute right-6 top-16 z-10 h-32 w-24 rotate-6 sm:h-36 sm:w-28"
              objectPosition="75% 45%"
              imgClassName="grayscale-[0.6]"
            />
            <Polaroid
              className="absolute right-0 top-40 z-20 h-36 w-28 rotate-12 sm:h-40 sm:w-32"
              objectPosition="35% 70%"
              imgClassName="-scale-x-100"
            />
            <Polaroid
              className="absolute left-1/2 top-52 z-10 h-28 w-24 -translate-x-1/2 rotate-2 sm:top-56"
              objectPosition="60% 20%"
              imgClassName="-scale-x-100 sepia-[0.25]"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
