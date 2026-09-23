import Link from 'next/link';
import { footer, nav } from '@/content/site';

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
              {column.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="font-body text-sm text-bark/80 transition-colors hover:text-bark">
                    {link}
                  </Link>
                </li>
              ))}
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
