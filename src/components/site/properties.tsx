import { useTranslations } from "next-intl";
import Image from "next/image";

const items = ["comfort", "protection", "fast", "free", "boot"] as const;

export function Properties() {
  const t = useTranslations("dijker");

  return (
    <section id="dijker" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("intro")}</p>
        </div>

        <div className="mt-10 grid gap-6 text-foreground/90 md:grid-cols-2">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((key) => (
            <div
              key={key}
              className="overflow-hidden rounded-xl border border-border bg-background"
            >
              <Image
                src={`/media/highlights/${key}.webp`}
                alt=""
                width={1056}
                height={393}
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
              <div className="p-6 pt-4">
                <h3 className="text-lg font-semibold">
                  {t(`props.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`props.${key}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
