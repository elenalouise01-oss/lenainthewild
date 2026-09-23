'use client';

import Link from 'next/link';
import { footer, nav } from '@/content/site';

// Links that resolve to a real section on this page; everything else in
// the footer points to a page that doesn't exist yet, so it's left inert
// (rather than href="#", which jumps the whole page to the top on click —
// a jarring, confusing move for someone reading down near the footer).
const REAL_ANCHORS: Record<string, string> = {
  Blog: '#blog',
  About: '#about',
};

export default function Footer() {
  return (
    <footer className="border-t border-bark/10 bg-porcelain px-6 py-16">
      <div className="container-editorial grid gap-10 sm:grid-cols-4">
        {footer.columns.map((column) => (
          <div key={column.label}>
            <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">
              {column.label}
            </p>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => {
                const href = REAL_ANCHORS[link];
                return (
                  <li key={link}>
                    <Link
                      href={href ?? '#'}
                      onClick={href ? undefined : (e) => e.preventDefault()}
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

      <div className="container-editorial mt-14 border-t border-bark/10 pt-8">
        <p className="font-body text-xs text-stone">
          © {new Date().getFullYear()} {nav.logo}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
