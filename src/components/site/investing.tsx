import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Investing() {
  const t = useTranslations("investing");

  return (
    <section id="investing" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          {t("body")}
        </p>
        <Button asChild size="lg" className="mt-8">
          <a href="#contact">{t("cta")}</a>
        </Button>
      </div>
    </section>
  );
}
