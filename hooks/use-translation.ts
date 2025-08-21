'use client'

import { useLanguage } from "../contexts/language-context";
import { translations, type TranslationKey } from "../lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: TranslationKey): string => {
    // Fallback to 'en' if language is undefined or not in translations
    const currentLang = language && translations[language] ? language : 'en';
    return translations[currentLang]?.[key] || translations.en?.[key] || key;
  };

  return { t, language: language || 'en' };
}