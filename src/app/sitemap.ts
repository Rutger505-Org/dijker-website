import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { languageAlternates, localePath, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();
  return routing.locales.map((locale) => ({
    url: `${siteUrl}${localePath(locale)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
