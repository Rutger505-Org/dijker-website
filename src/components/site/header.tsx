"use client";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const sections = [
  "dijker",
  "technique",
  "creator",
  "investing",
  "contact",
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-primary text-primary-foreground shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="the dijker" className="flex items-center">
          <Image
            src="/media/dijker-logo.webp"
            alt="the dijker"
            width={1375}
            height={369}
            priority
            className="h-9 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {t(s)}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-primary-foreground/20 bg-primary px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {sections.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  onClick={() => setOpen(false)}
                  className="block py-1 text-base font-medium"
                >
                  {t(s)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
