import { useTranslations } from "next-intl";
import Image from "next/image";
import { Award } from "lucide-react";
import { DriveSystem } from "./drive-system";

export function Technique() {
  const t = useTranslations("technique");

  return (
    <section id="technique" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("heading")}
        </h2>

        <div id="video" className="mt-10 scroll-mt-24">
          <div className="aspect-video overflow-hidden rounded-xl border border-border bg-black">
            <iframe
              className="h-full w-full"
              src="https://www.youtube-nocookie.com/embed/m3ZI0HB3BCs"
              title="the dijker"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t("chassisTitle")}</h3>
              <p className="text-muted-foreground">{t("chassis")}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t("driveTitle")}</h3>
              <p className="text-muted-foreground">{t("drive")}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t("brakesTitle")}</h3>
              <p className="text-muted-foreground">{t("brakes")}</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-5">
              <Award className="mt-0.5 size-6 shrink-0" />
              <div>
                <h3 className="font-semibold">{t("awardTitle")}</h3>
                <p className="text-sm text-muted-foreground">{t("award")}</p>
                <a
                  href="https://www.spezialradmesse.de/erfinderlabor.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium underline underline-offset-4"
                >
                  {t("awardLink")}
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src="/media/brake_lever.webp"
              alt="the dijker — steering & brakes"
              width={1200}
              height={900}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-14">
          <DriveSystem />

          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-black">
            <video
              className="h-full w-full"
              controls
              playsInline
              preload="none"
              poster="/media/img007.webp"
            >
              <source src="/media/dijker_aandrijving.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
