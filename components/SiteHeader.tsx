'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { nav, socialLinks } from '@/content/site';

// Sticky top navigation for inner pages, copied from the old site's My
// Story page: logo left, small spaced-out links, social icons and an
// outlined Subscribe button on the right. On phones and tablets the links
// and Subscribe fold into a Menu button that drops down a big, easy-to-tap
// list.
type NavLink = { label: string; href: string };
type NavItem = NavLink & { children?: NavLink[] };

// Kept short on purpose (Lena, 24 Nov: the old menu was too text heavy).
// Items with children open a small dropdown on laptops and are grouped in
// the phone menu.
const LINKS: NavItem[] = [
  { label: 'About', href: '/my-story' },
  { label: 'Who I Help', href: '/life-design' },
  {
    label: 'Work With Me',
    href: '/#freedom-seeker',
    children: [
      { label: 'The Freedom Seeker', href: '/#freedom-seeker' },
      { label: 'The Business Owner', href: '/naluri-socials-ai' },
      { label: 'The Wild Soul', href: '/photography' },
    ],
  },
  {
    label: 'Freebies',
    href: '/intuition-blueprint',
    children: [
      { label: 'Intuition Quiz', href: '/intuition-blueprint' },
      { label: 'Guided Tapping Practice', href: '/#free-practice' },
    ],
  },
  { label: 'Journal Entries', href: '/journal' },
  { label: 'Contact', href: '/#contact' },
];

// The page's own label can be a dropdown item (e.g. "Photography"); the
// matching top-level item is then underlined too.
const isActive = (item: NavItem, active?: string) =>
  active === item.label || !!item.children?.some((c) => c.label === active);

export default function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Close a laptop dropdown on Escape or a click anywhere else
  useEffect(() => {
    if (!dropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdown(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setDropdown(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [dropdown]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-bark/10 bg-white">
      <div className="container-editorial flex h-16 items-center justify-between gap-4 px-6 sm:h-[4.5rem]">
        <Link href="/" className="whitespace-nowrap font-display text-lg italic text-bark sm:text-2xl">
          {nav.logo}
        </Link>

        <nav className="flex items-center gap-2 sm:gap-5 lg:gap-7 xl:gap-6">
          <ul ref={menuRef} className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            {LINKS.map((link) => {
              const cls = `whitespace-nowrap font-body text-[0.65rem] font-semibold uppercase tracking-widest2 transition-colors hover:text-bark ${
                isActive(link, active) ? 'text-bark underline decoration-bark/40 underline-offset-8' : 'text-bark/60'
              }`;
              if (!link.children) {
                return (
                  <li key={link.label}>
                    <Link href={link.href} className={cls}>
                      {link.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = dropdown === link.label;
              return (
                <li key={link.label} className="relative" onMouseEnter={() => setDropdown(link.label)} onMouseLeave={() => setDropdown(null)}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setDropdown(isOpen ? null : link.label)}
                    className={`inline-flex items-center gap-1.5 ${cls}`}
                  >
                    {link.label}
                    <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
                      <ul className="min-w-[13rem] border border-bark/10 bg-white py-2 shadow-lg">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={() => setDropdown(null)}
                              className={`block whitespace-nowrap px-5 py-3 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 transition-colors hover:bg-sand hover:text-bark ${
                                active === child.label ? 'text-bark' : 'text-bark/70'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
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
            className="flex items-center gap-2 border border-bark px-3 py-2 font-body text-[0.62rem] font-semibold uppercase tracking-widest2 text-bark xl:hidden"
          >
            {open ? 'Close' : 'Menu'}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>
      </div>

      {open && (
        <div id="site-menu" className="border-t border-bark/10 bg-white px-6 pb-8 pt-4 xl:hidden">
          <ul className="container-editorial flex flex-col">
            {[{ label: 'Home', href: '/' } as NavItem, ...LINKS, { label: 'Subscribe', href: '/#subscribe' }].map((link) =>
              link.children ? (
                <li key={link.label} className="border-b border-bark/10 py-4">
                  <p className="font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-stone">{link.label}</p>
                  <ul className="mt-1">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className={`block py-2 pl-4 font-display text-2xl transition-colors hover:text-bark ${
                            active === child.label ? 'italic text-bark' : 'text-bark/80'
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
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
              ),
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
