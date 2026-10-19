'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import WaitlistForm from '@/components/WaitlistForm';
import { leadMagnet } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// Where each heart in the thank-you burst flies to, and its colour.
const HEARTS = [
  { x: -90, y: -70, colour: 'text-zing-pink' },
  { x: -50, y: -110, colour: 'text-sage' },
  { x: 0, y: -125, colour: 'text-zing-pink' },
  { x: 55, y: -105, colour: 'text-sage' },
  { x: 95, y: -60, colour: 'text-zing-pink' },
  { x: -120, y: -20, colour: 'text-sage' },
  { x: 125, y: -15, colour: 'text-zing-pink' },
];

// The free tapping video offer on the home page. The button opens a pop-up
// sign-up; once they've joined, it shows a button straight to the video.
// The pop-up closes on ×, Esc or a click outside.
export default function LeadMagnet() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Their first name once they've joined ('' if none given); null before.
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      trigger?.focus();
    };
  }, [open]);

  return (
    <section id="free-video" className="bg-bark px-6 py-28 sm:py-36">
      <div className="container-editorial grid items-center gap-14 lg:grid-cols-[2fr_3fr]">
        <ScrollReveal className="mx-auto w-full max-w-[16rem] sm:max-w-xs">
          <div className="relative aspect-[346/615] -rotate-3 bg-cream p-3 shadow-2xl">
            <div className="relative h-full w-full overflow-hidden">
              <Image src={leadMagnet.photo} alt={leadMagnet.photoAlt} fill sizes="20rem" className="object-cover" />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <SectionLabel className="!text-sage">{leadMagnet.label}</SectionLabel>
          <h2 className="mt-6 font-display text-display-3 italic leading-[1.1] text-cream">{leadMagnet.headline}</h2>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-cream/85 sm:text-lg">{leadMagnet.body}</p>
          <p className="mt-6 font-display text-2xl italic text-cream sm:text-3xl">{leadMagnet.closing}</p>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className="mt-10 rounded-full bg-sage px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-transform hover:scale-105"
          >
            {leadMagnet.cta} →
          </button>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-bark/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={leadMagnet.popup.hook}
          >
            <motion.div
              className="relative grid max-h-[92dvh] w-full max-w-3xl overflow-y-auto bg-sand shadow-2xl sm:grid-cols-[2fr_3fr]"
              initial={{ opacity: 0, y: reduced ? 0 : 24, rotate: reduced ? 0 : -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : 24 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-20 px-2 py-1 font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70 transition-colors hover:text-bark"
              >
                Close ×
              </button>

              {/* Scrapbook side: taped polaroid of Lena tapping, a butterfly
                  and a handwritten note. Once they've joined, the photo
                  becomes a play button for the video. */}
              <div className="relative flex items-center justify-center overflow-hidden bg-sage/45 px-6 pb-6 pt-10 sm:py-12">
                <div className="relative w-28 -rotate-3 bg-cream p-2 pb-9 sm:p-2.5 sm:pb-10 shadow-xl sm:w-full sm:max-w-[13rem]">
                  <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-2 bg-zing-yellow/80 shadow-sm" />
                  <div className="relative aspect-square overflow-hidden sm:aspect-[346/615]">
                    <Image src={leadMagnet.photo} alt={leadMagnet.photoAlt} fill sizes="13rem" className="object-cover object-[50%_30%]" />
                    {sent !== null && (
                      <a
                        href={leadMagnet.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={leadMagnet.watch}
                        className="absolute inset-0 flex items-center justify-center bg-bark/25 transition-colors hover:bg-bark/10"
                      >
                        <motion.span
                          initial={{ scale: reduced ? 1 : 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: reduced ? 0 : 0.3 }}
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-bark shadow-lg"
                        >
                          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
                            <path d="M7 4l13 8-13 8z" />
                          </svg>
                        </motion.span>
                      </a>
                    )}
                  </div>
                  <p aria-hidden="true" className="absolute inset-x-0 bottom-2 text-center font-hand text-base text-bark sm:text-lg">
                    {sent === null ? 'free tutorial ♡' : 'press play ♡'}
                  </p>
                </div>
                <Image
                  src="/images/butterfly.png"
                  alt=""
                  width={396}
                  height={500}
                  sizes="4rem"
                  aria-hidden="true"
                  className="absolute bottom-3 right-4 h-auto w-12 rotate-12 drop-shadow-md sm:bottom-8 sm:right-3 sm:w-16"
                />
              </div>

              <div className="relative px-7 pb-8 pt-6 text-center sm:px-10 sm:py-14 sm:text-left">
                {sent === null ? (
                  <>
                    <p className="inline-block -rotate-1 bg-cream px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark shadow-sm">
                      {leadMagnet.label}
                    </p>
                    <p className="mt-5 font-display text-4xl italic leading-tight text-bark sm:text-5xl">{leadMagnet.popup.hook}</p>
                    <p className="mt-4 font-body text-base leading-relaxed text-umber">{leadMagnet.popup.body}</p>
                    <div className="mt-8">
                      <WaitlistForm
                        offer={leadMagnet.title}
                        cta={leadMagnet.cta}
                        sent={leadMagnet.sent}
                        subject="Free tutorial sign-up:"
                        sendingLabel="Sending…"
                        onSent={setSent}
                      />
                    </div>
                  </>
                ) : (
                  <div role="status" className="relative">
                    {/* A little burst of hearts */}
                    {!reduced &&
                      HEARTS.map((h, i) => (
                        <motion.span
                          key={i}
                          aria-hidden="true"
                          className={`pointer-events-none absolute left-1/2 top-10 text-2xl sm:left-24 ${h.colour}`}
                          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                          animate={{ x: h.x, y: h.y, scale: 1, opacity: 0 }}
                          transition={{ duration: 1.4, delay: 0.1 + i * 0.04, ease: 'easeOut' }}
                        >
                          ♡
                        </motion.span>
                      ))}
                    <p className="font-hand text-2xl text-bark/80">yay, {sent || 'you'}!</p>
                    <p className="mt-2 font-display text-5xl italic leading-tight text-bark sm:text-6xl">
                      <span className="bg-[linear-gradient(transparent_55%,theme(colors.zing.yellow)_55%)] px-1">{leadMagnet.sent.heading}</span>
                    </p>
                    <p className="mt-6 font-body text-base leading-relaxed text-umber">
                      {leadMagnet.sent.body.replace(', {name}', '')}
                    </p>
                    <a
                      href={leadMagnet.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#141414] px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-105"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-sage" fill="currentColor" aria-hidden="true">
                        <path d="M7 4l13 8-13 8z" />
                      </svg>
                      {leadMagnet.watch}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
