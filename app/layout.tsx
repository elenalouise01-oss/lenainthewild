import type { Metadata } from 'next';
import { Playfair_Display, Montserrat, Gochi_Hand } from 'next/font/google';
import Analytics from '@/components/Analytics';
import BackToTop from '@/components/BackToTop';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import './globals.css';

// Variable fonts: one file per family covers every weight, so the browser
// downloads less than one file per weight.
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const gochi = Gochi_Hand({
  subsets: ['latin'],
  variable: '--font-gochi',
  display: 'swap',
  weight: '400',
});

const description =
  'At 36, Lena left Sydney for Bali to reinvent her life. Real stories on starting over in your 30s, freedom, slow living and romanticising the everyday.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lena in the Wild — Reinventing Life in Your 30s',
    template: '%s — Lena in the Wild',
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: 'Lena', url: SITE_URL }],
  creator: 'Lena',
  alternates: { canonical: '/' },
  // Google Search Console ownership check (the code from its "HTML tag"
  // option). Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel, or paste
  // the code here.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_AU',
    url: '/',
    title: 'Lena in the Wild — Reinventing Life in Your 30s',
    description,
    images: [{ url: '/images/hero.jpg', width: 1809, height: 930, alt: 'Lena in the Wild' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lena in the Wild — Reinventing Life in Your 30s',
    description,
    images: ['/images/hero.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${gochi.variable}`}>
      <body>
        {children}
        {/* On every page: appears once you've scrolled past the first screen */}
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
