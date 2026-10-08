"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeMeta } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
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

  const current = localeMeta[locale];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-busy={isPending}
        aria-label="Change language"
        className="flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium outline-none transition-colors hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className={cn("fi rounded-[2px]", current?.flag)} />
        <ChevronDown className="size-4" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {routing.locales.map((l) => {
          const meta = localeMeta[l];
          return (
            <DropdownMenuItem
              key={l}
              onSelect={() => switchTo(l)}
              aria-current={l === locale ? "true" : undefined}
              className="cursor-pointer gap-2.5"
            >
              <span className={cn("fi rounded-[2px]", meta?.flag)} />
              <span className={cn(l === locale && "font-bold")}>
                {meta?.label}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
