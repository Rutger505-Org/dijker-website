import { localeMeta } from "@/i18n/locales";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-foreground">the dijker</p>
          <p className="uppercase tracking-[0.3em]">{t("tagline")}</p>
        </div>
        <nav aria-label={t("language")} className="flex gap-4">
          {routing.locales.map((l) => (
            <Link
              key={l}
              href="/"
              locale={l}
              hrefLang={l}
              aria-current={l === locale ? "page" : undefined}
              className="underline-offset-4 hover:text-foreground hover:underline aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
            >
              {localeMeta[l]?.label}
            </Link>
          ))}
        </nav>
        <div className="md:text-right">
          <p>{t("trademark")}</p>
          <p>
            © {year} the dijker. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
