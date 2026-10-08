'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CredentialsPopup from '@/components/CredentialsPopup';
import Envelope from '@/components/Envelope';
import JournalCarousel from '@/components/JournalCarousel';
import OffersCarousel from '@/components/OffersCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { freedomSeeker } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// A strip of pink tape that unrolls left to right as you scroll, the words
// appearing with it, with the roll itself riding along the leading edge.
function TapeHighlight({ children }: { children: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.5'] });
  const clipPath = useTransform(scrollYProgress, (v) => `inset(-4px ${(1 - v) * 100}% -4px 0)`);
  const rollLeft = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const rollOpacity = useTransform(scrollYProgress, [0, 0.03, 0.9, 1], [0, 1, 1, 0]);

  return (
    <span ref={ref} className="relative mx-1 inline-block -rotate-3 align-middle">
      <motion.span
        style={reduced ? undefined : { clipPath }}
        className="block rounded-sm bg-zing-pink px-3 py-1 font-body text-[0.6rem] font-semibold uppercase leading-tight tracking-wide text-bark shadow-sm sm:text-xs"
      >
        {children}
      </motion.span>
      {!reduced && (
        <motion.span
          aria-hidden="true"
          style={{ left: rollLeft, opacity: rollOpacity }}
          className="absolute -bottom-1 -top-1 w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#e5679a] via-[#ffc2da] to-[#e5679a] shadow-md"
        />
      )}
    </span>
  );
}

// A polaroid: thin white border with the deep white strip along the bottom.
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
    <div className={`bg-cream p-1.5 pb-7 shadow-xl sm:p-2.5 sm:pb-12 ${className}`}>
      <div className="relative h-full w-full overflow-hidden">
        <Image src={src} alt="" fill sizes={sizes} className={`object-cover ${imgClassName}`} style={{ objectPosition }} aria-hidden="true" />
      </div>
    </div>
  );
}

// Hand-drawn dashed line, like the reference: drops down, ties a small
// loop, then swings out and trails off towards the envelope.
function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg className={`pointer-events-none text-bark/40 ${className}`} viewBox="0 0 250 270" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="6 6" strokeLinecap="round" aria-hidden="true">
      <path d="M42 4 C 16 30, 2 92, 24 124 C 42 150, 96 148, 108 122 C 116 102, 92 88, 84 106 C 76 124, 100 140, 132 142 C 182 146, 246 172, 240 212 C 237 236, 224 254, 212 266" />
    </svg>
  );
}
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


// The Freedom Seeker section, one continuous section in the order of the
// "Section 3" reference: offers → note + creative work → experience →
// on the road row → snapshots → journey + envelope → big statement →
// let's talk. Everything after the offers sits on the one sand background.
export default function Section3() {
  return (
    <section id="freedom-seeker">
      {/* Offers: the album-cover carousel */}
      <OffersCarousel />

      <div className="bg-sand px-6 pb-32 pt-40 sm:pb-44 sm:pt-32">
        <div className="container-editorial">
          {/* Note to self + A life that actually feels free */}
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <ScrollReveal className="relative mx-auto w-full max-w-xs">
              <div className="absolute -inset-4 -rotate-3 rounded-sm bg-zing-green/70" />
              <div className="relative -rotate-1 bg-cream px-8 pb-10 pt-14 text-center shadow-xl">
                {/* Binder clip: silver wire handles over a black clip */}
                {/* Black binder clip: flat body with folded tabs, tall silver
                    keyhole-shaped wire handles (the back one peeking behind) */}
                <svg className="absolute -top-[4.5rem] left-1/2 z-10 h-28 w-24 -translate-x-1/2 drop-shadow-md" viewBox="0 0 100 116" aria-hidden="true">
                  <defs>
                    <linearGradient id="clip-wire" x1="0" x2="1">
                      <stop offset="0" stopColor="#7d7d7d" />
                      <stop offset="0.45" stopColor="#f2f2f2" />
                      <stop offset="1" stopColor="#8c8c8c" />
                    </linearGradient>
                    <linearGradient id="clip-body" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#3b3b3b" />
                      <stop offset="0.12" stopColor="#262626" />
                      <stop offset="1" stopColor="#0e0e0e" />
                    </linearGradient>
                  </defs>
                  {/* back handle */}
                  <path d="M38 62 L39 52 C39 45 35 40 35 33 C35 26 42 23 50 23 C58 23 65 26 65 33 C65 40 61 45 61 52 L62 62" fill="none" stroke="#c9c9c9" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                  {/* body */}
                  <rect x="9" y="54" width="82" height="48" rx="2.5" fill="url(#clip-body)" />
                  <path d="M10 58.5 H90" stroke="#4d4d4d" strokeWidth="1" />
                  {/* folded tabs and centre notch along the bottom */}
                  <rect x="7" y="99" width="23" height="9" rx="3" fill="#1c1c1c" />
                  <rect x="70" y="99" width="23" height="9" rx="3" fill="#1c1c1c" />
                  <path d="M40 102 L44 96 H56 L60 102 Z" fill="#2a2a2a" />
                  {/* front handle, running down over the body */}
                  <path d="M32 104 L36 52 C37 43 29 35 29 24 C29 13 38 8 50 8 C62 8 71 13 71 24 C71 35 63 43 64 52 L68 104" fill="none" stroke="url(#clip-wire)" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                <p className="font-display text-2xl italic text-bark">{freedomSeeker.noteCard.label}</p>
                <p className="mt-4 font-hand text-lg leading-relaxed text-umber">{freedomSeeker.noteCard.body}</p>
                <p className="mt-3 font-hand text-base text-umber/80">— {freedomSeeker.noteCard.author}</p>
              </div>
              {/* Camera with its floral strap, propped on the note's corner */}
              <div className="absolute -right-6 top-1 z-20 w-28 -rotate-[15deg] sm:-right-28 sm:-top-5 sm:w-44">
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
                {freedomSeeker.creativeWork.body.map((para, i) => (
                  <p key={i} className={`${i === 0 ? 'mt-6' : 'mt-4'} max-w-md font-body text-sm leading-relaxed text-umber`}>
                    {para}
                  </p>
                ))}
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
              <p className="mt-10 max-w-5xl font-display text-3xl leading-[1.15] text-bark sm:text-5xl">
                <span className="mb-4 block italic">{freedomSeeker.experienceSub}</span>
                {freedomSeeker.experienceLead}{' '}
                <TapeHighlight>{freedomSeeker.experienceHighlight}</TapeHighlight>{' '}
                <span className="italic">{freedomSeeker.experienceTail}</span>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 max-w-2xl font-display text-xl italic leading-snug text-umber sm:text-2xl">
                {freedomSeeker.experienceClosing}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <CredentialsPopup />
            </ScrollReveal>
          </div>

          {/* My Journal: a slow, looping row of cards */}
          <div id="on-the-road" className="mt-32 sm:mt-40">
            <ScrollReveal>
              <JournalCarousel />
            </ScrollReveal>
          </div>

          {/* Snapshots: text left, polaroids right */}
          <div className="mt-32 grid min-w-0 gap-12 sm:mt-40 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <ScrollReveal>
              <h3 className="max-w-sm font-display text-2xl leading-snug text-bark sm:text-3xl">{freedomSeeker.brandCampaigns.heading}</h3>
              <p className="mt-3 font-display text-lg italic text-umber sm:text-xl">{freedomSeeker.brandCampaigns.sub}</p>
              <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-umber">{freedomSeeker.brandCampaigns.body}</p>
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
            <Squiggle className="absolute left-[8%] top-52 hidden h-72 w-64 lg:block" />
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

            {/* Pinned photo collage, after the reference: a big main print,
                a black-and-white photo-booth strip behind it, a polaroid
                tipped over the top, a small print on torn paper with the
                "say hi!" sticker, and a safety pin through the corner. */}
            <ScrollReveal delay={0.1} className="relative mx-auto h-[28rem] w-full max-w-sm sm:h-[34rem] sm:max-w-md">
              {/* Photo-booth strip */}
              <div className="absolute left-[3%] top-[11%] z-10 flex h-[46%] w-[28%] -rotate-3 flex-col gap-1.5 bg-cream p-1.5 shadow-xl">
                {['/images/road/road-9.jpg', '/images/road/road-5.jpg'].map((src) => (
                  <div key={src} className="relative flex-1 overflow-hidden">
                    <Image src={src} alt="" fill sizes="140px" className="object-cover grayscale" aria-hidden="true" />
                  </div>
                ))}
              </div>
              {/* Polaroid tipped over the top */}
              <Polaroid className="absolute left-[23%] top-[3%] z-20 h-[40%] w-[32%] rotate-[14deg]" objectPosition="50% 60%" src="/images/road/road-6.jpg" sizes="180px" />
              {/* Main print */}
              <div className="absolute bottom-[12%] right-0 z-10 h-[72%] w-[56%] -rotate-2 bg-cream p-2 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden">
                  <Image src="/images/road/road-2.jpg" alt="" fill sizes="(min-width: 640px) 300px, 60vw" className="object-cover" style={{ objectPosition: '50% 35%' }} aria-hidden="true" />
                </div>
              </div>
              {/* Torn paper with a small print */}
              <Image
                src="/images/torn-paper.png"
                alt=""
                width={867}
                height={518}
                sizes="220px"
                className="absolute bottom-[14%] -left-[10%] z-30 h-auto w-[52%] -rotate-[84deg] drop-shadow-[0_6px_10px_rgba(59,45,14,0.18)]"
                aria-hidden="true"
              />
              <div className="absolute bottom-[2%] left-[7%] z-40 h-[27%] w-[25%] -rotate-[8deg] bg-cream p-1.5 shadow-xl">
                <div className="relative h-full w-full overflow-hidden">
                  <Image src="/images/road/road-4.jpg" alt="" fill sizes="140px" className="object-cover" style={{ objectPosition: '50% 60%' }} aria-hidden="true" />
                </div>
              </div>
              {/* Yellow "say hi!" sticker */}
              <div className="absolute bottom-[20%] left-[24%] z-50 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-zing-yellow p-3 text-center font-script text-lg leading-[0.95] text-bark shadow-md">
                say hi!
              </div>
              {/* Safety pin through the main print's corner */}
              <Image
                src="/images/safety-pin.png"
                alt=""
                width={847}
                height={445}
                sizes="(min-width: 640px) 280px, 60vw"
                className="absolute right-0 -top-[2%] z-50 h-auto w-[56%] rotate-[10deg] drop-shadow-[0_6px_8px_rgba(59,45,14,0.3)]"
                aria-hidden="true"
              />
            </ScrollReveal>
          </div>
      </div>
    </section>
  );
}
