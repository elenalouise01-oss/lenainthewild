import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import AuthorityResult, { BlueprintInvitation } from '@/components/intuition/AuthorityResult';
import SiteHeader from '@/components/SiteHeader';
import { AUTHORITY_FOR, authorities, authorityBySlug, intuitionBlueprint as copy } from '@/content/intuitionBlueprint';
import type { AuthorityKey } from '@/lib/intuition/bodygraph';
import { absoluteUrl } from '@/lib/seo';

type Props = { params: Promise<{ authority: string }> };

export function generateStaticParams() {
  return Object.values(authorities).map((a) => ({ authority: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = authorityBySlug((await params).authority);
  if (!a) return {};
  const path = `/intuition-blueprint/${a.slug}`;
  const title = `${a.name} in Human Design: How You’re Designed to Decide`;
  const description = `${a.oneLine} What ${a.name} means in Human Design, how it guides decisions, journal prompts and a simple practice.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description, images: [{ url: '/images/lena-sunrise-smile.jpg', alt: 'Lena smiling at sunrise above the clouds' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/lena-sunrise-smile.jpg'] },
  };
}

// One authority's guide, to come back to (linked from the guide email).
// Shows the guide's content only: a personal result needs a calculation.
export default async function AuthorityGuidePage({ params }: Props) {
  const a = authorityBySlug((await params).authority);
  if (!a) notFound();
  const path = `/intuition-blueprint/${a.slug}`;
  // The first chart authority that uses this guide (Ego's two forms share one)
  const key = (Object.keys(AUTHORITY_FOR) as AuthorityKey[]).find((k) => authorities[AUTHORITY_FOR[k]] === a)!;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: copy.title, item: absoluteUrl('/intuition-blueprint') },
            { '@type': 'ListItem', position: 3, name: a.name, item: absoluteUrl(path) },
          ],
        }}
      />
      <SiteHeader />
      <main className="bg-cream">
        <AuthorityResult authority={key} generic lead="" eyebrow={copy.guidePage.label} />
        <p className="mx-auto max-w-3xl px-6 pb-24 pt-14 text-center font-body text-sm text-stone print:hidden">
          {copy.guidePage.notYours}{' '}
          <Link href="/intuition-blueprint" className="text-bark underline underline-offset-4 hover:opacity-60">
            {copy.guidePage.calculate}
          </Link>
        </p>
        <div className="print:hidden">
          <BlueprintInvitation />
        </div>
      </main>
      <Footer />
    </>
  );
}
