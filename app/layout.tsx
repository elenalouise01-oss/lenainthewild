import type { Metadata } from 'next';
import { Playfair_Display, Montserrat, Gochi_Hand, Special_Elite } from 'next/font/google';
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

// Typewriter face for the scrapbook notes on the journal page
const typewriter = Special_Elite({
  subsets: ['latin'],
  variable: '--font-typewriter',
  display: 'swap',
  weight: '400',
});

const description =
  'At 36, Lena left it all behind in Sydney for her dream life in Bali. Now she guides people living misaligned lives to break free from stagnation and reinvent their lives too.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lena in the Wild — Get Unstuck, Find Yourself & Reinvent Your Life',
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
  // Pages are indexable by default; this only allows large image previews
  // (e.g. in Google Discover). The 404 page keeps Next's own noindex.
  robots: { 'max-image-preview': 'large' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_AU',
    url: '/',
    title: 'Lena in the Wild — Get Unstuck, Find Yourself & Reinvent Your Life',
    description,
    images: [{ url: '/images/share-litw.png', width: 1200, height: 630, alt: 'Lena in the Wild' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lena in the Wild — Get Unstuck, Find Yourself & Reinvent Your Life',
    description,
    images: ['/images/share-litw.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${playfair.variable} ${montserrat.variable} ${gochi.variable} ${typewriter.variable}`}>
      <body>
        {children}
        {/* On every page: appears once you've scrolled past the first screen */}
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
