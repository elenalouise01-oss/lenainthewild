import Link from 'next/link';
import { nav, socialLinks } from '@/content/site';

// Sticky top navigation for inner pages, copied from the old site's My
// Story page: logo left, small spaced-out links, social icons and an
// outlined Subscribe button on the right.
const LINKS = [
  { label: 'About', href: '/my-story' },
  { label: 'The Freedom Seeker', href: '/#freedom-seeker' },
  { label: 'Journal', href: '/#blog' },
  { label: 'Contact', href: '/#contact' },
];

export default function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-bark/10 bg-cream/95 backdrop-blur">
      <div className="container-editorial flex h-16 items-center justify-between gap-6 px-6 sm:h-[4.5rem]">
        <Link href="/" className="whitespace-nowrap font-display text-lg italic text-bark sm:text-2xl">
          {nav.logo}
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
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

          <div className="flex items-center gap-3 text-bark/70">
            <a href={socialLinks.Instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-bark">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={socialLinks.TikTok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-colors hover:text-bark">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M16.5 3c.3 2.3 1.7 3.8 4 4v3c-1.5 0-2.8-.4-4-1.2V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 1 0 2 2.7V3h3z" />
              </svg>
            </a>
          </div>

          <Link
            href="/#subscribe"
            className="border border-bark px-4 py-2 font-body text-[0.62rem] font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream sm:px-5"
          >
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
}
