import { useTranslations } from "next-intl";
import { Gauge, Unlock, Armchair, ShieldCheck, Smile } from "lucide-react";

const items = [
  { key: "fast", Icon: Gauge },
  { key: "free", Icon: Unlock },
  { key: "comfort", Icon: Armchair },
  { key: "protects", Icon: ShieldCheck },
  { key: "fun", Icon: Smile },
] as const;

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

        <div className="mt-10 grid gap-6 text-foreground/90 md:grid-cols-3">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
          <p>{t("body3")}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ key, Icon }) => (
            <div
              key={key}
              className="rounded-xl border border-border bg-background p-6"
            >
              <Icon className="size-6 text-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                {t(`props.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`props.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
