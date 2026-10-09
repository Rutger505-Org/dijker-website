import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Properties } from "@/components/site/properties";
import { Technique } from "@/components/site/technique";
import { Creator } from "@/components/site/creator";
import { Investing } from "@/components/site/investing";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { routing } from "@/i18n/routing";
import {
  languageAlternates,
  localeUrl,
  ogImage,
  ogLocales,
  siteName,
} from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("metadata.title");
  const description = t("metadata.description");
  const canonical = localeUrl(locale);
  const image = { ...ogImage, alt: t("technique.awardAlt") };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: canonical,
      locale: ogLocales[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="scroll-smooth">
        <Hero />
        <Properties />
        <Technique />
        <Creator />
        <Investing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
