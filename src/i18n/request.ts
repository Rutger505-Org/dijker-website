import { getRequestConfig } from "next-intl/server";
import { hasLocale, type AbstractIntlMessages } from "next-intl";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const { default: messages } = (await import(
    `../../messages/${locale}.json`
  )) as { default: AbstractIntlMessages };

  return {
    locale,
    messages,
  };
});
