// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files directly
import translationsInRussian from './language/ru.json';
import translationsInUkrainian from './language/ua.json';

const resources = {
  ru: {
    translation: translationsInRussian,
  },
  ua: {
    translation: translationsInUkrainian,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    ns: "translation",
    defaultNS: "translation",
  });

export default i18n;