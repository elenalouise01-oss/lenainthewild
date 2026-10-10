import type { MetadataRoute } from 'next';
import { PAGES, absoluteUrl } from '@/lib/seo';

// XML sitemap of every indexable page, at /sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
