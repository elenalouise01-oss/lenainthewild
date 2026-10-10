'use client';

import Link from 'next/link';
import { footer, nav, offerLinks, offerPages, socialLinks } from '@/content/site';
import { scrollToTop } from '@/lib/goHome';

// Links that resolve to a real section on this page or a live offer page.
// Footer links to pages that don't exist yet are hidden until they do.
const REAL_ANCHORS: Record<string, string> = {
  Blog: '/journal',
  About: '/my-story',
  'How I Help': '/life-design',
  Substack: 'https://lenainthewild.substack.com',
  Contact: '/#contact',
  // No page of its own yet (coming soon), so it points to the offers.
  'Your Freedom Roadmap': '/#freedom-seeker',
  ...offerLinks,
  // Offers with their own page here link to it rather than to The Leap
  ...offerPages,
  ...socialLinks,
};

// Connect is shown as a row of icons rather than words.
const ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.3 1.7 3.8 4 4v3c-1.5 0-2.8-.4-4-1.2V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 1 0 2 2.7V3h3z" />
    </svg>
  ),
  Substack: (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="currentColor" aria-hidden="true">
      <path d="M22.54 8.24H1.46V5.41h21.08v2.83zM1.46 10.81V24L12 18.11 22.54 24V10.81H1.46zM22.54 0H1.46v2.84h21.08V0z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="border-t border-bark/10 bg-sand px-6 py-20">
      <div className="container-editorial grid gap-10 sm:grid-cols-4">
        {footer.columns.map((column) => (
          <div key={column.label}>
            <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">
              {column.label}
            </p>
            {column.label === 'Connect' ? (
              <>
              <ul className="mt-2 -ml-2 flex items-center gap-1">
                {column.links.filter((link) => REAL_ANCHORS[link] && ICONS[link]).map((link) => {
                  const href = REAL_ANCHORS[link];
                  const external = href.startsWith('http');
                  return (
                    <li key={link}>
                      <Link
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        aria-label={link}
                        title={link}
                        className="flex p-2 text-bark/70 transition-colors hover:text-bark"
                      >
                        {ICONS[link]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {column.links.filter((link) => REAL_ANCHORS[link] && !ICONS[link]).map((link) => (
                <Link
                  key={link}
                  href={REAL_ANCHORS[link]}
                  className="mt-3 inline-block py-1.5 font-body text-sm text-bark/80 transition-colors hover:text-bark"
                >
                  {link} →
                </Link>
              ))}
              </>
            ) : (
              <ul className="mt-2.5">
                {column.links.filter((link) => REAL_ANCHORS[link]).map((link) => {
                  const href = REAL_ANCHORS[link];
                  return (
                    <li key={link}>
                      <Link
                        href={href ?? '#'}
                        onClick={href ? undefined : (e) => e.preventDefault()}
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        aria-disabled={href ? undefined : true}
                        className={`inline-block py-1.5 font-body text-sm transition-colors ${
                          href ? 'text-bark/80 hover:text-bark' : 'cursor-default text-bark/40'
                        }`}
                      >
                        {link}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}

        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">
            {footer.currently.label}
          </p>
          <p className="mt-4 font-display italic text-bark/80">{footer.currently.body}</p>
        </div>
      </div>

      <div className="container-editorial mt-14 flex items-center justify-between gap-6 border-t border-bark/10 pt-8">
        <p className="font-body text-xs text-stone">
          © {new Date().getFullYear()} {nav.logo} by Naluri Collective. All rights reserved.
        </p>
        <a
          href="#"
          onClick={scrollToTop}
          className="shrink-0 whitespace-nowrap py-2 font-body text-xs font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
