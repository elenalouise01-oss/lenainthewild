'use client';

import Link from 'next/link';
import { footer, nav, offerLinks, socialLinks } from '@/content/site';
import { scrollToTop } from '@/lib/goHome';

// Links that resolve to a real section on this page or a live offer page.
// Footer links to pages that don't exist yet are hidden until they do.
const REAL_ANCHORS: Record<string, string> = {
  Blog: '/#on-the-road',
  About: '/my-story',
  Substack: '/#subscribe',
  ...offerLinks,
  ...socialLinks,
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
            <ul className="mt-4 space-y-3">
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
                      className={`font-body text-sm transition-colors ${
                        href ? 'text-bark/80 hover:text-bark' : 'cursor-default text-bark/40'
                      }`}
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
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
          className="font-body text-xs font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
