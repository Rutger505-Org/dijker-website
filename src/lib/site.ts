import { routing } from "@/i18n/routing";

// Canonical production origin, baked in at build time from BASE_DOMAIN.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dijker.eu"
).replace(/\/$/, "");

export const siteName = "the dijker";

export const ogImage = {
  url: "/media/og-image.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
};

export const ogLocales: Record<string, string> = {
  nl: "nl_NL",
  en: "en_US",
};

export function localePath(locale: string): string {
  return `/${locale}`;
}

export function localeUrl(locale: string): string {
  return `${siteUrl}${localePath(locale)}`;
}

export function languageAlternates(): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of routing.locales) {
    alternates[locale] = localeUrl(locale);
  }
  alternates["x-default"] = localeUrl(routing.defaultLocale);
  return alternates;
}
