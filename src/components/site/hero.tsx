import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-28 md:grid-cols-2 md:pb-24 md:pt-36">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {t("slogan")}
          </p>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            {t("title")}
          </h1>
          <p className="max-w-md text-lg text-foreground/90">{t("lead")}</p>
          <p className="max-w-md text-muted-foreground">{t("sub")}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <a href="#video">{t("cta")}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">{t("contactCta")}</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src="/media/img007.webp"
              alt="the dijker"
              width={1200}
              height={800}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
