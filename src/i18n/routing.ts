import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "always",
  // The middleware's Link header used "/" as x-default while the HTML and
  // sitemap use "/nl"; conflicting hreflang signals get ignored by Google.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
