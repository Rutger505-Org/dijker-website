import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-black text-white"
    >
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/media/relaxen.mp4"
        poster="/media/relaxen-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="max-w-xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            {t("slogan")}
          </p>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            {t("title")}
          </h1>
          <p className="text-lg text-white/90">{t("lead")}</p>
          <p className="text-white/75">{t("sub")}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <a href="#video">{t("cta")}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#contact">{t("contactCta")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
