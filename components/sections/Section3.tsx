'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Envelope from '@/components/Envelope';
import OffersCarousel from '@/components/OffersCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { freedomSeeker } from '@/content/site';

function Polaroid({
  className = '',
  objectPosition,
  imgClassName = '',
  src,
  sizes = '220px',
}: {
  className?: string;
  objectPosition: string;
  imgClassName?: string;
  src: string;
  sizes?: string;
}) {
  return (
    <div className={`bg-cream p-1.5 shadow-xl ${className}`}>
      <div className="relative h-full w-full overflow-hidden">
        <Image src={src} alt="" fill sizes={sizes} className={`object-cover ${imgClassName}`} style={{ objectPosition }} aria-hidden="true" />
      </div>
    </div>
  );
}

// Hand-drawn dashed loop, like the doodles in the reference.
function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg className={`pointer-events-none text-bark/35 ${className}`} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round" aria-hidden="true">
      <path d="M10 10 C 30 60, 90 30, 80 70 C 72 100, 40 90, 50 70 C 60 50, 100 80, 110 112" />
    </svg>
  );
}

// Longer dashed doodle with a loop, ending in an arrow that points down
// into the next part of the section.
function SquiggleArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`pointer-events-none text-bark/45 ${className}`} viewBox="0 0 160 300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path
        strokeDasharray="5 6"
        d="M20 6 C 40 60, 130 40, 120 100 C 112 150, 60 140, 70 110 C 80 80, 140 120, 120 180 C 104 228, 40 220, 60 280"
      />
      <path d="M48 266 L60 284 L74 268" />
    </svg>
  );
}

function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-body text-xs font-semibold uppercase tracking-widest2 text-stone ${className}`}>{children}</p>;
}

// My Journal cards: the reference's "video projects" row.
const ROAD_PHOTOS = [
  { src: '/images/road/road-2.jpg', pos: '50% 35%' },
  { src: '/images/road/road-1.jpg', pos: '40% 60%' },
  { src: '/images/road/road-6.jpg', pos: '50% 60%' },
  { src: '/images/road/road-8.jpg', pos: '50% 70%' },
];

// The Freedom Seeker section, one continuous section in the order of the
// "Section 3" reference: offers → note + creative work → experience →
// on the road row → snapshots → journey + envelope → big statement →
// let's talk. Everything after the offers sits on the one sand background.
export default function Section3() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollRoad = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    el.scrollBy({ left: ((card?.offsetWidth ?? 300) + 24) * dir, behavior: 'smooth' });
  };

  return (
    <section id="freedom-seeker">
      {/* Offers: the album-cover carousel */}
      <OffersCarousel />

      <div className="bg-sand px-6 pb-32 pt-24 sm:pb-44 sm:pt-32">
        <div className="container-editorial">
          {/* Note to self + A life that actually feels free */}
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <ScrollReveal className="relative mx-auto w-full max-w-xs">
              <div className="absolute -inset-4 -rotate-3 rounded-sm bg-zing-green/70" />
              <div className="relative -rotate-1 bg-cream px-8 pb-10 pt-14 text-center shadow-xl">
                {/* Binder clip: silver wire handles over a black clip */}
                <svg className="absolute -top-14 left-1/2 z-10 h-24 w-24 -translate-x-1/2 drop-shadow-md" viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <linearGradient id="clip-wire" x1="0" x2="1">
                      <stop offset="0" stopColor="#8a8a8a" />
                      <stop offset="0.5" stopColor="#e6e6e6" />
                      <stop offset="1" stopColor="#7a7a7a" />
                    </linearGradient>
                    <linearGradient id="clip-body" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#3a3a3a" />
                      <stop offset="1" stopColor="#111" />
                    </linearGradient>
                  </defs>
                  <path d="M33 62 L30 14 Q30 6 38 6 L62 6 Q70 6 70 14 L67 62" fill="none" stroke="url(#clip-wire)" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M38 62 L36 20 Q36 13 43 13 L57 13 Q64 13 64 20 L62 62" fill="none" stroke="url(#clip-wire)" strokeWidth="3.5" strokeLinejoin="round" />
                  <path d="M22 58 L78 58 L84 92 L16 92 Z" fill="url(#clip-body)" />
                  <path d="M24 61 L76 61" stroke="#555" strokeWidth="1.5" />
                  <circle cx="22" cy="60" r="3.5" fill="#bbb" />
                  <circle cx="78" cy="60" r="3.5" fill="#bbb" />
                </svg>
                <p className="font-display text-2xl italic text-bark">{freedomSeeker.noteCard.label}</p>
                <p className="mt-4 font-hand text-lg leading-relaxed text-umber">{freedomSeeker.noteCard.body}</p>
              </div>
              {/* Camera with its floral strap, propped on the note's corner */}
              <div className="absolute -right-6 top-6 z-20 w-28 -rotate-[15deg] sm:-right-28 sm:top-0 sm:w-44">
                <Image src="/images/camera-strap.png" alt="" width={700} height={404} sizes="(min-width: 640px) 14rem, 10rem" className="h-auto w-full drop-shadow-xl" aria-hidden="true" />
              </div>
              {/* Watercolour butterfly, recoloured to the brand lilac */}
              <div className="absolute -bottom-8 -left-7 z-20 w-16 -rotate-12 sm:-left-10 sm:w-20">
                <Image src="/images/butterfly.png" alt="" width={396} height={500} sizes="7rem" className="h-auto w-full drop-shadow-md" aria-hidden="true" />
              </div>
            </ScrollReveal>

            <div className="relative">
              <ScrollReveal>
                <p className="font-display text-4xl italic leading-none text-bark sm:text-6xl">{freedomSeeker.creativeWork.leadItalic}</p>
                <p className="mt-2 font-display text-4xl uppercase leading-none text-bark sm:text-6xl">{freedomSeeker.creativeWork.leadBold}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-umber">{freedomSeeker.creativeWork.body}</p>
                <Link
                  href={freedomSeeker.creativeWork.ctaHref}
                  className="mt-6 inline-block font-body text-xs font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark"
                >
                  {freedomSeeker.creativeWork.cta}
                </Link>
              </ScrollReveal>
              <SquiggleArrow className="mt-6 h-56 w-32 sm:ml-20 sm:h-72 sm:w-40" />
            </div>
          </div>

          {/* My Experience: big statement with a pill sticker */}
          <div className="mt-16 sm:mt-20">
            <ScrollReveal>
              <Label>{freedomSeeker.experienceLabel}</Label>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 max-w-5xl font-display text-3xl leading-[1.15] text-bark sm:text-5xl">
                {freedomSeeker.experienceLead}{' '}
                <span className="relative mx-1 inline-block -rotate-3 rounded-sm bg-zing-pink px-3 py-1 align-middle font-body text-[0.6rem] font-semibold uppercase leading-tight tracking-wide text-bark shadow-sm sm:text-xs">
                  {freedomSeeker.experienceHighlight}
                </span>{' '}
                <span className="italic">{freedomSeeker.experienceTail}</span>
              </p>
            </ScrollReveal>
          </div>

          {/* My Journal: a row of cards with previous / next */}
          <div id="on-the-road" className="mt-32 sm:mt-40">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <ScrollReveal>
                <Label>{freedomSeeker.pillarsLabel}</Label>
                <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-umber">{freedomSeeker.pillarsIntro}</p>
              </ScrollReveal>
              <div className="flex gap-5 font-body text-xs font-semibold uppercase tracking-widest2">
                <button type="button" onClick={() => scrollRoad(-1)} className="text-bark/50 transition-colors hover:text-bark">
                  Previous
                </button>
                <button type="button" onClick={() => scrollRoad(1)} className="text-bark underline decoration-sage decoration-2 underline-offset-8">
                  Next
                </button>
              </div>
            </div>

            <div ref={trackRef} className="no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6">
              {freedomSeeker.pillars.map((pillar, i) => {
                const photo = ROAD_PHOTOS[i % ROAD_PHOTOS.length];
                return (
                  <ScrollReveal key={pillar.title} delay={0.06 * i} className="w-[70%] flex-none snap-start sm:w-[calc(25%-18px)]">
                    <div data-card>
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md">
                        <Image src={photo.src} alt="" fill sizes="(min-width: 640px) 25vw, 70vw" className="object-cover" style={{ objectPosition: photo.pos }} aria-hidden="true" />
                      </div>
                      <h4 className="mt-5 font-display text-2xl text-bark">{pillar.title}</h4>
                      <p className="mt-1 font-body text-xs text-umber">{pillar.excerpt}</p>
                      <p className="mt-3 font-body text-[0.6rem] font-semibold uppercase leading-relaxed tracking-wide text-stone">{pillar.roles}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Snapshots: text left, polaroids right */}
          <div className="mt-32 grid min-w-0 gap-12 sm:mt-40 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <ScrollReveal>
              <Label>{freedomSeeker.brandCampaigns.label}</Label>
              <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-umber">{freedomSeeker.brandCampaigns.body}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative mx-auto flex h-60 max-w-lg items-center justify-center sm:h-72">
                <Polaroid className="h-36 w-28 -rotate-6 sm:h-56 sm:w-48" objectPosition="50% 60%" src="/images/road/road-3.jpg" />
                <Polaroid className="z-10 -ml-4 h-44 w-32 rotate-2 sm:-ml-6 sm:h-64 sm:w-48" objectPosition="50% 40%" src="/images/road/road-5.jpg" />
                <Polaroid className="-ml-4 h-36 w-28 rotate-6 sm:-ml-6 sm:h-56 sm:w-48" objectPosition="50% 75%" src="/images/road/road-7.jpg" />
                <svg className="absolute -bottom-2 right-6 z-20 h-12 w-12 text-zing-yellow drop-shadow" viewBox="0 0 24 24" aria-hidden="true">
                  {[0, 72, 144, 216, 288].map((r) => (
                    <ellipse key={r} cx="12" cy="6.5" rx="4" ry="5.5" fill="currentColor" transform={`rotate(${r} 12 12)`} />
                  ))}
                  <circle cx="12" cy="12" r="3" fill="#e0a43a" />
                </svg>
              </div>
            </ScrollReveal>
          </div>

          {/* My Journey: centred statement, two short columns, then the envelope */}
          <div id="experience" className="relative mt-32 text-center sm:mt-40">
            <ScrollReveal>
              <Label>{freedomSeeker.contentJourney.label}</Label>
              <p className="mx-auto mt-6 max-w-4xl font-display text-3xl leading-[1.15] text-bark sm:text-5xl">
                {freedomSeeker.contentJourney.lead} <span className="italic">{freedomSeeker.contentJourney.tail}</span>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mx-auto mt-12 grid max-w-2xl gap-8 text-left sm:grid-cols-2">
                <p className="font-body text-sm font-semibold leading-relaxed text-bark">{freedomSeeker.contentJourney.colBold}</p>
                <p className="font-body text-sm leading-relaxed text-umber">{freedomSeeker.contentJourney.colRest}</p>
              </div>
            </ScrollReveal>
            <Squiggle className="absolute -left-2 top-56 hidden h-28 w-28 lg:block" />
            <ScrollReveal delay={0.15} className="mt-20 sm:mt-24">
              <Envelope />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

// COME SAY HI + Let's Talk, its own section under the Journal.
export function ComeSayHi() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-sand px-6 py-32 sm:py-44">
      <div className="container-editorial">
          {/* Big statement */}
          <ScrollReveal>
            <h3 className="whitespace-nowrap font-display text-[13vw] uppercase leading-[0.9] tracking-tight text-bark sm:text-[10vw]">{freedomSeeker.bigStatement}</h3>
          </ScrollReveal>

          {/* Let's Talk */}
          <div id="contact" className="mt-16 grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <ScrollReveal>
                <p className="font-display text-4xl italic leading-none text-bark sm:text-5xl">{freedomSeeker.contact.kicker}</p>
                <p className="mt-2 font-display text-4xl uppercase leading-none text-bark sm:text-5xl">{freedomSeeker.contact.headline}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <p className="font-body text-sm leading-relaxed text-umber">{freedomSeeker.contact.body}</p>
                  <ol className="space-y-1.5">
                    {freedomSeeker.contact.list.map((item, i) => (
                      <li key={item} className="font-body text-sm text-bark">
                        {i + 1}) {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <Label className="mt-14 max-w-xs">{freedomSeeker.contact.listLabel}</Label>
                {submitted ? (
                  <p className="mt-4 rounded-sm border border-sage/30 bg-sage/10 px-5 py-4 font-body text-sm text-bark" role="status">
                    Thanks — that&apos;s landed with me. I&apos;ll get back to you shortly.
                  </p>
                ) : (
                  <form
                    className="mt-4 flex max-w-md flex-col gap-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    {(['name', 'email'] as const).map((field) => (
                      <label key={field} className="block">
                        <span className="sr-only">{freedomSeeker.contact.fields[field]}</span>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          required
                          placeholder={freedomSeeker.contact.fields[field]}
                          className="w-full border-0 border-b border-bark/25 bg-transparent py-3 font-body text-bark placeholder:text-bark/40 focus:border-bark focus:outline-none"
                        />
                      </label>
                    ))}
                    <label className="block">
                      <span className="sr-only">{freedomSeeker.contact.fields.message}</span>
                      <textarea
                        rows={3}
                        required
                        placeholder={freedomSeeker.contact.fields.message}
                        className="w-full resize-none border-0 border-b border-bark/25 bg-transparent py-3 font-body text-bark placeholder:text-bark/40 focus:border-bark focus:outline-none"
                      />
                    </label>
                    <button type="submit" className="self-start font-body text-xs font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark">
                      {freedomSeeker.contact.cta} →
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Pinned photo collage */}
            <ScrollReveal delay={0.1} className="relative mx-auto h-[26rem] w-full max-w-sm sm:max-w-md">
              <svg className="absolute right-10 top-0 z-30 h-24 w-56 -rotate-12 text-stone drop-shadow-lg" viewBox="0 0 280 100" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true">
                <path d="M32 84 a13 13 0 1 1 14 -22 a9 9 0 1 1 -10 16" strokeLinecap="round" />
                <path d="M32 84 L228 24" strokeLinecap="round" />
                <path d="M228 24 a16 16 0 1 1 0 27" strokeLinecap="round" />
              </svg>
              <Polaroid className="absolute left-6 top-10 z-10 h-36 w-28 -rotate-6" objectPosition="40% 60%" src="/images/road/road-1.jpg" />
              <Polaroid className="absolute right-0 top-12 z-20 h-80 w-60 rotate-3 shadow-2xl" objectPosition="50% 35%" src="/images/road/road-2.jpg" sizes="300px" />
              <Polaroid className="absolute bottom-0 left-0 z-30 h-36 w-32 -rotate-12" objectPosition="50% 60%" src="/images/road/road-4.jpg" />
              <div className="absolute bottom-10 left-28 z-40 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-zing-yellow p-3 text-center font-script text-lg leading-[0.95] text-bark shadow-md">
                say hi!
              </div>
            </ScrollReveal>
          </div>
      </div>
    </section>
  );
}
