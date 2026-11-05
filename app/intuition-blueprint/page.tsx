import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import IntuitionBlueprint from '@/components/intuition/IntuitionBlueprint';
import SiteHeader from '@/components/SiteHeader';
import { intuitionBlueprint as copy } from '@/content/intuitionBlueprint';
import { SITE_NAME, absoluteUrl, breadcrumbs } from '@/lib/seo';

const title = 'The Intuition Blueprint: Discover Your Human Design Authority (Free)';
const description =
  'Enter your birth details to calculate your Human Design chart and find your Inner Authority: how you’re designed to make decisions. Free, with journal prompts and a practice.';
const image = '/images/lena-sunrise-smile.jpg';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/intuition-blueprint' },
  openGraph: { url: '/intuition-blueprint', title, description, images: [{ url: image, alt: 'Lena smiling at sunrise above the clouds' }] },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
};

// The Intuition Blueprint: a free interactive lead magnet. The whole guided
// flow (intro, birth details, email, result) is one client component; the
// chart is calculated on the server (app/api/intuition-blueprint).
export default function IntuitionBlueprintPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs(copy.title, '/intuition-blueprint'),
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: copy.title,
            description,
            url: absoluteUrl('/intuition-blueprint'),
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Any',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: 0, priceCurrency: 'AUD' },
            publisher: { '@type': 'Person', '@id': `${absoluteUrl('/')}#lena`, name: 'Lena' },
            provider: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
          },
        ]}
      />
      <SiteHeader />
      <main className="bg-cream">
        <IntuitionBlueprint />
      </main>
      <Footer />
    </>
  );
}
