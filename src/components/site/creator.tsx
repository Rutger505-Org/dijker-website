import { useTranslations } from "next-intl";
import Image from "next/image";
import { FileText } from "lucide-react";

export function Creator() {
  const t = useTranslations("creator");

  return (
    <section id="creator" className="border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-20 md:grid-cols-[2fr_3fr] md:py-28">
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src="/media/uitvinder.webp"
            alt="Peter-Paul van der Ven"
            width={900}
            height={1100}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("heading")}
          </h2>
          <div>
            <p className="text-xl font-medium">{t("name")}</p>
            <p className="text-muted-foreground">{t("role")}</p>
          </div>
          <p className="text-foreground/90">{t("body1")}</p>
          <p className="text-foreground/90">{t("body2")}</p>

          <div className="pt-2">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {t("downloads")}
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <a
                href="/media/EHPVA-magazine-2020.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <FileText className="size-4" />
                {t("download1")}
              </a>
              <a
                href="/media/Ligfiets-2020.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <FileText className="size-4" />
                {t("download2")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
