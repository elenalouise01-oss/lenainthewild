import type { Metadata } from 'next';
import { Playfair_Display, Montserrat, Gochi_Hand, Bodoni_Moda } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
  weight: ['600', '700', '800', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const gochi = Gochi_Hand({
  subsets: ['latin'],
  variable: '--font-gochi',
  display: 'swap',
  weight: '400',
});

const title = 'Lena in the Wild';
const description = 'Lena in the Wild — behind-the-scenes, unfiltered, out in it.';

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s — Lena in the Wild',
  },
  description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${gochi.variable} ${bodoni.variable}`}>
      <body>{children}</body>
    </html>
  );
}
