import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonProps = {
  href: string;
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
};

const toneStyles: Record<'light' | 'dark', string> = {
  light: 'border-cream/70 text-cream hover:bg-cream hover:text-bark',
  dark: 'border-bark/70 text-bark hover:bg-bark hover:text-cream',
};

export default function Button({ href, children, tone = 'light', className = '' }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border px-7 py-3 font-body text-[0.7rem] font-semibold uppercase tracking-widest2 transition-colors duration-300 ease-editorial ${toneStyles[tone]} ${className}`}
    >
      {children}
    </Link>
  );
}
