'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { freedomSeeker } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

// The "credentials" line under My Experience: a button that opens a small
// window listing credentials. Closes on ×, Esc or a click outside.
export default function CredentialsPopup() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { credentials } = freedomSeeker;

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
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="mt-6 block max-w-xl text-left font-body text-sm leading-relaxed text-umber underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark sm:text-base"
      >
        {freedomSeeker.experienceCredentials} →
      </button>

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
            aria-label={credentials.title}
          >
            <motion.div
              className="relative max-h-[85dvh] w-full max-w-md overflow-y-auto bg-cream p-8 shadow-2xl sm:p-10"
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
                className="absolute right-5 top-5 font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70 transition-colors hover:text-bark"
              >
                Close ×
              </button>
              <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">
                {freedomSeeker.experienceLabel}
              </p>
              <h3 className="mt-3 font-display text-3xl italic leading-tight text-bark">{credentials.title}</h3>
              <p className="mt-2 font-body text-xs font-semibold uppercase tracking-widest2 text-bark/60">
                {credentials.subtitle}
              </p>
              <ul className="mt-8 space-y-6">
                {credentials.items.map((item) => (
                  <li key={item.title} className="border-t border-bark/15 pt-4">
                    <p className="font-display text-xl text-bark">{item.title}</p>
                    {item.details.map((d) => {
                      const { text, italic } = typeof d === 'string' ? { text: d, italic: false } : d;
                      return (
                        <p
                          key={text}
                          className={`mt-1 font-body text-sm leading-relaxed text-umber${italic ? ' italic' : ''}`}
                        >
                          {text}
                        </p>
                      );
                    })}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
