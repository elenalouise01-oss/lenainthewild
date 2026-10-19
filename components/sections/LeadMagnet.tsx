'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, animate, motion, useInView, useMotionValue } from 'framer-motion';
import DrawnLine from '@/components/DrawnLine';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import TapeBanner from '@/components/TapeBanner';
import WaitlistForm from '@/components/WaitlistForm';
import { leadMagnet, tutorialSheetUrl } from '@/content/site';
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
  // Draws the doodle line in the pop-up each time it opens or changes.
  const draw = useMotionValue(0);
  // The home page line draws once, all the way to its arrow, when the
  // button comes into view.
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '0px 0px -15% 0px' });
  const homeDraw = useMotionValue(0);

  useEffect(() => {
    if (!ctaInView) return;
    const controls = animate(homeDraw, 1, { duration: 1.1, delay: 0.4, ease: 'easeInOut' });
    return () => controls.stop();
  }, [ctaInView, homeDraw]);

  useEffect(() => {
    if (!open) return;
    draw.set(0);
    const controls = animate(draw, 1, { duration: 1.2, delay: 0.5, ease: 'easeInOut' });
    return () => controls.stop();
  }, [open, sent, draw]);

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
          <div ref={ctaRef} className="relative mt-10 inline-block">
            {/* From the end of "Take the first step." down to the button */}
            <DrawnLine
              progress={homeDraw}
              viewBox="0 0 120 70"
              colour="#ffffff"
              className="absolute -right-32 -top-10 hidden h-20 w-32 sm:block"
              d="M100 4 C 112 30, 96 54, 60 58 C 40 60, 26 58, 12 55"
              arrow="M24 47 L11 55 L23 63"
            />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className="rounded-full bg-sage px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-transform hover:scale-105"
          >
            {leadMagnet.cta} →
          </button>
          </div>
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
              className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto overflow-x-hidden bg-cream text-bark shadow-2xl"
              initial={{ opacity: 0, y: reduced ? 0 : 24, rotate: reduced ? 0 : -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : 24 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-2 z-20 rounded-full bg-cream px-3 py-1 font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70 transition-colors hover:text-bark"
              >
                Close ×
              </button>

              {/* Lilac tape running across the top */}
              <TapeBanner text={sent === null ? 'FREE TUTORIAL' : 'IT’S YOURS'} mark="heart" strip="bg-sage text-bark" tilt="-rotate-1" className="-mt-2 pb-8 pt-12 sm:pb-10" />

              {/* Doodle line beside the photo on a phone (on a laptop it
                  runs out from under the polaroid instead) */}
              <DrawnLine
                progress={draw}
                viewBox="0 0 70 110"
                className="absolute right-5 top-28 z-10 h-24 w-16 sm:hidden"
                d="M8 6 C 50 10, 62 40, 44 52 C 30 60, 22 44, 36 40 C 54 36, 56 80, 30 104"
                arrow="M24 94 L30 105 L40 97"
              />
              <div className={`grid items-center gap-8 px-7 pb-10 sm:grid-cols-[2fr_3fr] sm:gap-10 sm:px-10 ${sent === null ? 'sm:pb-20' : 'sm:pb-12'}`}>
                {/* Taped polaroid of Lena tapping, with a butterfly. Once
                    they've joined, the photo becomes a play button. */}
                <div className="relative mx-auto w-32 sm:w-full sm:max-w-[13rem]">
                  {/* On a laptop, a doodle line runs out from under the
                      polaroid to the sign-up button */}
                  {sent === null && (
                    <DrawnLine
                      progress={draw}
                      viewBox="0 0 160 80"
                      className="absolute left-[70%] top-full z-10 -mt-2 hidden h-16 w-36 sm:block"
                      d="M8 6 C 4 40, 30 62, 56 52 C 76 44, 70 22, 54 30 C 38 40, 60 70, 150 62"
                      arrow="M140 54 L151 62 L140 70"
                    />
                  )}
                  <div className="relative -rotate-3 bg-cream p-2 pb-9 shadow-2xl sm:p-2.5 sm:pb-10">
                    <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-2 bg-zing-yellow/85 shadow-sm" />
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
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-sage text-bark shadow-lg"
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
                    className="absolute -bottom-4 -right-8 h-auto w-12 rotate-12 drop-shadow-md sm:-right-6 sm:w-16"
                  />
                </div>

                <div className="relative text-center sm:text-left">
                  {sent === null ? (
                    <>
                      <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{leadMagnet.label}</p>
                      <p className="mt-4 font-display text-4xl italic leading-[1.05] text-bark sm:text-5xl">{leadMagnet.popup.hook}</p>
                      <p className="mt-5 font-body text-base leading-relaxed text-umber">{leadMagnet.popup.body}</p>
                      <div className="mt-8">
                        <WaitlistForm
                          offer={leadMagnet.title}
                          cta={leadMagnet.cta}
                          sent={leadMagnet.sent}
                          subject="Free tutorial sign-up:"
                          sendingLabel="Sending…"
                          onSent={setSent}
                          sheetUrl={tutorialSheetUrl}
                          buttonClass="bg-sage text-bark"
                          fieldClass="border-bark bg-bark text-cream placeholder:text-cream/60 focus:border-sage"
                        />
                      </div>
                    </>
                  ) : (
                    <div role="status" className="relative py-4">
                      {/* A little burst of hearts */}
                      {!reduced &&
                        HEARTS.map((h, i) => (
                          <motion.span
                            key={i}
                            aria-hidden="true"
                            className={`pointer-events-none absolute left-1/2 top-16 text-3xl sm:left-24 ${h.colour}`}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{ x: h.x, y: h.y, scale: 1, opacity: 0 }}
                            transition={{ duration: 1.6, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                          >
                            ♡
                          </motion.span>
                        ))}
                      <p className="font-hand text-2xl text-bark/70">yay, {sent || 'you'}!</p>
                      <motion.p
                        className="mt-3 inline-block -rotate-2 bg-zing-yellow px-4 py-1 font-display text-5xl italic leading-tight text-bark shadow-lg sm:text-6xl"
                        initial={{ scale: reduced ? 1 : 0.6, opacity: reduced ? 1 : 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 12 }}
                      >
                        {leadMagnet.sent.heading}
                      </motion.p>
                      <p className="mt-7 font-body text-base leading-relaxed text-umber">{leadMagnet.sent.body.replace(', {name}', '')}</p>
                      <a
                        href={leadMagnet.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-9 inline-flex items-center gap-3 rounded-full bg-sage px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-transform hover:scale-105"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                          <path d="M7 4l13 8-13 8z" />
                        </svg>
                        {leadMagnet.watch}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
