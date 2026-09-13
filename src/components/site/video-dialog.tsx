"use client";

import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dialog } from "radix-ui";

const videoId = "m3ZI0HB3BCs";

export function VideoDialog() {
  const t = useTranslations("hero");

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="lg">
          <Play />
          {t("cta")}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,1100px)] -translate-x-1/2 -translate-y-1/2 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          <Dialog.Title className="sr-only">{t("videoTitle")}</Dialog.Title>
          {/* Close comes before the iframe so it gets initial focus; a focused iframe swallows Escape. */}
          <Dialog.Close
            aria-label={t("close")}
            className="absolute -top-11 right-0 rounded-full p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-6" />
          </Dialog.Close>
          <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
            {/* Mounted only while open, so autoplay starts on open and playback stops on close. */}
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={t("videoTitle")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
