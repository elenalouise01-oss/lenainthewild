import Footer from '@/components/Footer';
import { FreePracticeStrip, WaitlistCta } from '@/components/HomeCtas';
import JsonLd from '@/components/JsonLd';
import { SAME_AS, SITE_NAME, absoluteUrl } from '@/lib/seo';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import Newsletter from '@/components/sections/Newsletter';
import Section1 from '@/components/sections/Section1';
import Section2 from '@/components/sections/Section2';
import LeadMagnet from '@/components/sections/LeadMagnet';
import Section3, { ComeSayHi } from '@/components/sections/Section3';

// Who the site is about, for search engines. Only facts stated on the site.
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    // Other ways people write the brand (matches the @lenainthewild handle),
    // so it isn't confused with similarly named brands.
    alternateName: ['LenaInTheWild', 'lenainthewild', '@lenainthewild'],
    url: absoluteUrl('/'),
    inLanguage: 'en-AU',
    publisher: { '@id': `${absoluteUrl('/')}#lena` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${absoluteUrl('/')}#lena`,
    name: 'Lena',
    // Matches the name on Lena's Instagram. Her surname is deliberately left off.
    alternateName: ['Elena Louise', SITE_NAME],
    url: absoluteUrl('/'),
    image: absoluteUrl('/images/hero.jpg'),
    description:
      'Lena is the person behind Lena in the Wild: a former Bondi personal trainer who left Sydney for Bali at 36, sharing the real story of starting over and building a life on her own terms.',
    sameAs: SAME_AS,
    knowsAbout: [
      'Reconnecting with yourself',
      'Self-trust and intuition',
      'Emotional triggers',
      'People-pleasing',
      'Recurring emotional patterns',
      'Inner child work',
      'Feeling stuck in life',
      'Life reinvention',
      'Starting over in your 30s',
      'Burnout recovery',
      'Nervous system regulation',
      'Slow living',
      'Moving to Bali',
      'Embodiment',
      'Reiki',
    ],
    // The qualifications listed in "My credentials" on the home page.
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Reiki Master (Reiki Level I, II and Master)', recognizedBy: { '@type': 'Organization', name: 'Wildfire Healing' } },
      { '@type': 'EducationalOccupationalCredential', name: 'Embodiment Coaching Certification', recognizedBy: { '@type': 'Organization', name: 'Dharma Coaching Institute' } },
      { '@type': 'EducationalOccupationalCredential', name: 'Certificate III and Certificate IV in Fitness' },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <Hero />
      <FreePracticeStrip />
      <Section1 />
      <Section2 />
      <LeadMagnet />
      <Section3 />
      <WaitlistCta />
      <Faq />
      <Newsletter />
      <ComeSayHi />
      <Footer />
    </main>
  );
}
