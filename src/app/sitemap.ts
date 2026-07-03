import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ru', 'uz', 'en'];
  return locales.map((locale) => ({
    url: `https://emc-corp.uz/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }));
}
