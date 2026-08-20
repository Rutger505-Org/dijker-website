import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-foreground">the dijker</p>
          <p className="uppercase tracking-[0.3em]">{t("tagline")}</p>
        </div>
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
