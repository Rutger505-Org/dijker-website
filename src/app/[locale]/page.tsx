import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Properties } from "@/components/site/properties";
import { Technique } from "@/components/site/technique";
import { Creator } from "@/components/site/creator";
import { Investing } from "@/components/site/investing";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

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
