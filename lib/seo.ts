import { socialLinks } from '@/content/site';

// The site's permanent address. Set NEXT_PUBLIC_SITE_URL in Vercel when a
// custom domain is connected (e.g. https://www.example.com) and every
// canonical URL, the sitemap, robots.txt and social previews follow it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://lenainthewild.vercel.app').replace(/\/$/, '');

export const SITE_NAME = 'Lena in the Wild';

export const SAME_AS = [socialLinks.Instagram, socialLinks.TikTok, 'https://lenainthewild.substack.com'];

// Indexable pages, for the sitemap.
export const PAGES = [
  { path: '/', priority: 1 },
  { path: '/my-story', priority: 0.9 },
  { path: '/freedom-frequency', priority: 0.8 },
  { path: '/5-day-reconnect', priority: 0.8 },
];

export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

// Breadcrumb trail for an inner page: Home › page.
export function breadcrumbs(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name, item: absoluteUrl(path) },
    ],
  };
}
