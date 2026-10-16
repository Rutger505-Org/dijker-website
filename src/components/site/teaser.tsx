import { YouTubeEmbed } from "@/components/site/youtube-embed";
import { useTranslations } from "next-intl";

export const teaserVideoId = "wBGHEWJOHyo";

export function Teaser() {
  const t = useTranslations();

  return (
    <section id="video" className="scroll-mt-24 bg-black">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="aspect-video overflow-hidden rounded-xl border border-white/15 bg-black">
          <YouTubeEmbed
            id={teaserVideoId}
            title={t("hero.teaserTitle")}
            poster="/media/teaser-poster.webp"
            playLabel={t("technique.play")}
          />
        </div>
      </div>
    </section>
  );
}
