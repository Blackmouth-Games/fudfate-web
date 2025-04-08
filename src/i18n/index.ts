
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all language translations
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";
// When adding new languages, import them here like:
// import deTranslation from "./locales/de.json";
// import frTranslation from "./locales/fr.json";
// etc.

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  }
  // Add new languages here as needed:
  // de: {
  //   translation: deTranslation
  // },
  // fr: {
  //   translation: frTranslation
  // },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Default language is English
    lng: "en",         // Force English as the initial language
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
