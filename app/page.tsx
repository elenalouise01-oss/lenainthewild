import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { SAME_AS, SITE_NAME, absoluteUrl } from '@/lib/seo';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import Newsletter from '@/components/sections/Newsletter';
import Section1 from '@/components/sections/Section1';
import Section2 from '@/components/sections/Section2';
import Section3, { ComeSayHi } from '@/components/sections/Section3';

// Who the site is about, for search engines. Only facts stated on the site.
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    inLanguage: 'en-AU',
    publisher: { '@id': `${absoluteUrl('/')}#lena` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${absoluteUrl('/')}#lena`,
    name: 'Lena',
    alternateName: SITE_NAME,
    url: absoluteUrl('/'),
    image: absoluteUrl('/images/hero.jpg'),
    description:
      'Former Bondi personal trainer who left Sydney for Bali at 36, sharing the real story of starting over and building a life on her own terms.',
    sameAs: SAME_AS,
    knowsAbout: [
      'Feeling stuck in life',
      'Starting over in your 30s',
      'Life reinvention',
      'Burnout recovery',
      'Nervous system regulation',
      'Slow living',
      'Romanticising everyday life',
      'Moving to Bali',
      'Living abroad in Southeast Asia',
    ],
  },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Faq />
      <Newsletter />
      <ComeSayHi />
      <Footer />
    </main>
  );
}
