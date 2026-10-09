import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteName } from "@/lib/site";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <>
      <title>{`${t("heading")} | ${siteName}`}</title>
      <Header />
      <main className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-start justify-center gap-5 px-6 pt-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          {t("heading")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("body")}</p>
        <Button asChild size="lg">
          <Link href="/">{t("home")}</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
