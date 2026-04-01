import type { MetadataRoute } from 'next';
import { locales, type Locale, slugMap, getLocalizedPath } from '@/lib/i18n';

const BASE = 'https://vdhenterprises.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const [page] of Object.entries(slugMap)) {
    for (const locale of locales) {
      const path = getLocalizedPath(page, locale);
      const url = `${BASE}${path}`;

      // Build languages map for hreflang x-default and all locales
      const languages: Record<string, string> = {
        'x-default': `${BASE}${getLocalizedPath(page, 'en')}`,
      };
      for (const l of locales) {
        languages[l] = `${BASE}${getLocalizedPath(page, l)}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === 'home' ? 'weekly' : 'monthly',
        priority: page === 'home' ? 1.0 : page === 'advisory' || page === 'contact' ? 0.9 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
