import { routing } from "@/i18n/routing";

/**
 * Canonical production origin, used for metadataBase, canonical URLs,
 * hreflang alternates, sitemap and JSON-LD. Override with NEXT_PUBLIC_SITE_URL
 * for preview environments if desired.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dijker.rutgerpronk.com"
).replace(/\/$/, "");

export const siteName = "the dijker";

export const ogImage = "/media/img007.webp";

/**
 * Build the localized path for a locale. With next-intl `localePrefix: "always"`
 * every locale (including the default) is served under its own prefix.
 */
export function localePath(locale: string): string {
  return `/${locale}`;
}

/**
 * hreflang alternates map for a given base path (root only for this one-pager).
 */
export function languageAlternates(): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of routing.locales) {
    alternates[locale] = `${siteUrl}${localePath(locale)}`;
  }
  alternates["x-default"] = `${siteUrl}${localePath(routing.defaultLocale)}`;
  return alternates;
}
