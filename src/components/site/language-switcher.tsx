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
          {i > 0 && <span className="text-muted-foreground/40">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            className={
              l === locale
                ? "text-foreground"
                : "text-muted-foreground transition-colors hover:text-foreground"
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
