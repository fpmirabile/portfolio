import type { SupportedLanguage } from "../types";
import esTranslations from "../i18n/es.json";
import enTranslations from "../i18n/en.json";
import ptTranslations from "../i18n/pt.json";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["es", "en", "pt"];

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
  pt: "🇵🇹",
};

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  es: esTranslations.menu.currentLang,
  en: enTranslations.menu.currentLang,
  pt: ptTranslations.menu.currentLang,
};

/**
 * Get current language from URL path or localStorage
 */
export function getCurrentLanguage(): SupportedLanguage {
  if (typeof window === "undefined") {
    return "es";
  }

  const pathLang = window.location.pathname.split("/")[1];
  if (SUPPORTED_LANGUAGES.includes(pathLang as SupportedLanguage)) {
    return pathLang as SupportedLanguage;
  }

  const savedLanguage = localStorage.getItem("language");
  if (
    savedLanguage &&
    SUPPORTED_LANGUAGES.includes(savedLanguage as SupportedLanguage)
  ) {
    return savedLanguage as SupportedLanguage;
  }

  return "es";
}

/**
 * Get theme text synchronously using fallback translations
 */
export function getThemeTextSync(
  isDark: boolean,
  lang: SupportedLanguage
): string {
  const fallback: Record<SupportedLanguage, { light: string; dark: string }> = {
    es: { light: "Claro", dark: "Oscuro" },
    en: { light: "Light", dark: "Dark" },
    pt: { light: "Claro", dark: "Escuro" },
  };
  return isDark ? fallback[lang].dark : fallback[lang].light;
}
