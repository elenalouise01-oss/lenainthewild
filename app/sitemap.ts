import type { MetadataRoute } from 'next';
import { authorities } from '@/content/intuitionBlueprint';
import { sortedJournal } from '@/content/journal';
import { PAGES, absoluteUrl } from '@/lib/seo';

// XML sitemap of every indexable page, at /sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: MetadataRoute.Sitemap = [
    ...PAGES.map(({ path, priority }) => ({ url: absoluteUrl(path), lastModified, changeFrequency: 'monthly' as const, priority })),
    // The Intuition Blueprint's authority guides
    ...Object.values(authorities).map((a) => ({
      url: absoluteUrl(`/intuition-blueprint/${a.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
  const articles = sortedJournal();
  if (articles.length === 0) return pages;
  return [
    ...pages,
    { url: absoluteUrl('/journal'), lastModified, changeFrequency: 'weekly', priority: 0.8 },
    ...articles.map((a) => ({ url: absoluteUrl(`/journal/${a.slug}`), lastModified: new Date(a.date), changeFrequency: 'yearly' as const, priority: 0.7 })),
  ];
}
