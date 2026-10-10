import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Everything is open to search engines; points them at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
