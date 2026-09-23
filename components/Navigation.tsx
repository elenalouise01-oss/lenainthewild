'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { nav } from '@/content/site';
import { EASE } from '@/lib/motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

type NavigationProps = {
  className?: string;
  iconClassName?: string;
  children: React.ReactNode;
};

// Full-screen nav overlay that opens on hover/focus of the passed-in icon
// (e.g. the spinning badge) and stays open until explicitly closed, so
// moving the mouse toward a link doesn't dismiss it mid-travel.
export default function Navigation({ className = '', iconClassName = '', children }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open menu"
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        className={iconClassName}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.35, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream px-6"
            onClick={(e) => {
              if (e.target === overlayRef.current) setOpen(false);
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 font-body text-xs font-semibold uppercase tracking-widest2 text-bark/70 transition-colors hover:text-bark sm:right-10 sm:top-8"
            >
              {nav.closeLabel} ×
            </button>

            <p className="font-display text-4xl italic text-umber sm:text-5xl">{nav.menuLogo}</p>
            <div className="mt-6 h-px w-16 bg-bark/20" />

            <nav className="mt-10 flex flex-col items-center gap-7">
              {nav.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-bark transition-colors hover:text-sage sm:text-3xl"
                >
                  {link.label}
                  {link.expandable ? ' +' : ''}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className="mt-10 border border-bark px-8 py-3 font-body text-xs font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream"
            >
              {nav.subscribeLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
