import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationsInRussian from './language/ru.json';
import translationsInUkrainian from './language/ua.json';

const resources = {
  ua: { translation: translationsInUkrainian },
  ru: { translation: translationsInRussian },
};

// pull from localStorage or default to UA
const savedLng = localStorage.getItem('i18nextLng') || 'ua';

i18n
  .use(LanguageDetector)       // enable read/write to localStorage
  .use(initReactI18next)       // hook into React
  .init({
    resources,
    lng: savedLng,             // ← load localStorage language immediately
    fallbackLng: 'ua',         // if savedLng is invalid
    supportedLngs: ['ua','ru'],

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    debug: true,
    interpolation: { escapeValue: false },

    // turn off suspense so we don't render fallback content
    react: { useSuspense: false },
  });

export default i18n;
