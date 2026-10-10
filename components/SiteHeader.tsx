'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { nav, socialLinks } from '@/content/site';

// Sticky top navigation for inner pages, copied from the old site's My
// Story page: logo left, small spaced-out links, social icons and an
// outlined Subscribe button on the right. On phones and tablets the links
// and Subscribe fold into a Menu button that drops down a big, easy-to-tap
// list.
const LINKS = [
  { label: 'About', href: '/my-story' },
  { label: 'The Freedom Seeker', href: '/#freedom-seeker' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/#contact' },
];

export default function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-bark/10 bg-cream/95 backdrop-blur">
      <div className="container-editorial flex h-16 items-center justify-between gap-4 px-6 sm:h-[4.5rem]">
        <Link href="/" className="whitespace-nowrap font-display text-lg italic text-bark sm:text-2xl">
          {nav.logo}
        </Link>

        <nav className="flex items-center gap-2 sm:gap-5 lg:gap-7">
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`font-body text-[0.65rem] font-semibold uppercase tracking-widest2 transition-colors hover:text-bark ${
                    active === link.label
                      ? 'text-bark underline decoration-bark/40 underline-offset-8'
                      : 'text-bark/60'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center text-bark/70">
            <a href={socialLinks.Instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 transition-colors hover:text-bark">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={socialLinks.TikTok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 transition-colors hover:text-bark">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M16.5 3c.3 2.3 1.7 3.8 4 4v3c-1.5 0-2.8-.4-4-1.2V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 1 0 2 2.7V3h3z" />
              </svg>
            </a>
          </div>

          <Link
            href="/#subscribe"
            className="hidden border border-bark px-4 py-2 font-body text-[0.62rem] font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream sm:inline-block sm:px-5"
          >
            Subscribe
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex items-center gap-2 border border-bark px-3 py-2 font-body text-[0.62rem] font-semibold uppercase tracking-widest2 text-bark lg:hidden"
          >
            {open ? 'Close' : 'Menu'}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>
      </div>

      {open && (
        <div id="site-menu" className="border-t border-bark/10 bg-cream px-6 pb-8 pt-4 lg:hidden">
          <ul className="container-editorial flex flex-col">
            {[{ label: 'Home', href: '/' }, ...LINKS, { label: 'Subscribe', href: '/#subscribe' }].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-bark/10 py-4 font-display text-2xl transition-colors hover:text-bark ${
                    active === link.label ? 'italic text-bark' : 'text-bark/80'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
