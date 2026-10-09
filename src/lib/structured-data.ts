import { getTranslations } from "next-intl/server";
import { localeUrl, siteName, siteUrl } from "@/lib/site";

const organizationId = `${siteUrl}/#organization`;
const inventorId = `${siteUrl}/#inventor`;

export async function structuredData(locale: string) {
  const t = await getTranslations({ locale });
  const pageUrl = localeUrl(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/media/dijker-logo.webp`,
        image: `${siteUrl}/media/img007.webp`,
        description: t("metadata.description"),
        slogan: "move yourself",
        founder: { "@id": inventorId },
        award: t("technique.award"),
        sameAs: ["https://www.youtube.com/@PeterPaulvanderVen"],
      },
      {
        "@type": "Person",
        "@id": inventorId,
        name: t("creator.name"),
        jobTitle: t("creator.role"),
        image: `${siteUrl}/media/uitvinder.webp`,
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        inLanguage: ["nl", "en"],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: t("metadata.title"),
        description: t("metadata.description"),
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": organizationId },
        primaryImageOfPage: `${siteUrl}/media/img007.webp`,
      },
      {
        "@type": "VideoObject",
        name: "Dijker animation",
        description: t("technique.videoAnimation"),
        thumbnailUrl: "https://i.ytimg.com/vi/ZofyjBrF9A8/hqdefault.jpg",
        uploadDate: "2024-01-25T12:31:57-08:00",
        duration: "PT2M45S",
        embedUrl: "https://www.youtube-nocookie.com/embed/ZofyjBrF9A8",
        contentUrl: "https://www.youtube.com/watch?v=ZofyjBrF9A8",
        author: { "@id": inventorId },
      },
    ],
  };
}
