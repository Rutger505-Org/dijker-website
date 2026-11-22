import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "always",
  // "/" redirects permanently to "/nl" (next.config.ts). Detection would make
  // that redirect language-dependent, so it could only be a 307, and Google
  // then picks "/" over "/nl" as canonical.
  localeDetection: false,
  // The middleware's Link header used "/" as x-default while the HTML and
  // sitemap use "/nl"; conflicting hreflang signals get ignored by Google.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
