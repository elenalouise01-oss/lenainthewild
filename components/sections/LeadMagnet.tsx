'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import WaitlistForm from '@/components/WaitlistForm';
import { leadMagnet } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// The free tapping video offer on the home page. The button opens a pop-up
// sign-up; once they've joined, it shows a button straight to the video.
// The pop-up closes on ×, Esc or a click outside.
export default function LeadMagnet() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
              className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto bg-sand px-7 pb-10 pt-14 text-center shadow-2xl sm:px-10"
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : 16 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 px-2 py-1 font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70 transition-colors hover:text-bark"
              >
                Close ×
              </button>
              <p className="font-display text-4xl italic leading-tight text-bark">{leadMagnet.popup.hook}</p>
              <p className="mt-4 font-body text-base leading-relaxed text-umber">{leadMagnet.popup.body}</p>
              <div className="mt-8">
                <WaitlistForm
                  offer={leadMagnet.title}
                  cta={leadMagnet.cta}
                  sent={leadMagnet.sent}
                  subject="Free video sign-up:"
                  sendingLabel="Sending…"
                >
                  <a
                    href={leadMagnet.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block rounded-full bg-[#141414] px-8 py-4 font-body text-xs font-semibold uppercase tracking-widest2 text-cream transition-transform hover:scale-105"
                  >
                    {leadMagnet.watch} →
                  </a>
                </WaitlistForm>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
