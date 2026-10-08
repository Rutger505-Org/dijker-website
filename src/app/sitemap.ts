import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { languageAlternates, localeUrl, siteUrl } from "@/lib/site";

const images = [
  "/media/img007.webp",
  "/media/relaxen-poster.webp",
  "/media/brake_lever.webp",
  "/media/alibre.webp",
  "/media/uitvinder.webp",
].map((path) => `${siteUrl}${path}`);

// lastModified is left out on purpose: a per-request timestamp claims the page
// changes constantly, which makes Google distrust the field altogether.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();
  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
    images,
  }));
}
