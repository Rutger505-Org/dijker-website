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
      className="flex items-center gap-1 rounded-full border border-primary/30 bg-background p-0.5 text-sm font-semibold"
      aria-busy={isPending}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          className={
            l === locale
              ? "rounded-full bg-primary px-3 py-1 text-primary-foreground shadow-sm"
              : "rounded-full px-3 py-1 text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
          }
          aria-current={l === locale ? "true" : undefined}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
