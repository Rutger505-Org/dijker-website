"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      aria-busy={isPending}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-primary-foreground/40">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            className={
              l === locale
                ? "font-bold text-primary-foreground underline underline-offset-4"
                : "text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            }
            aria-current={l === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
