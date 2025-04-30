// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files directly
import translationsInRussian from './language/ru.json';
import translationsInUkrainian from './language/ua.json';

const resources = {
  ua: {
    translation: translationsInUkrainian,
  },
  ru: {
    translation: translationsInRussian,
  }
};

i18n
.use(initReactI18next)
.init({
  resources,
  fallbackLng: "ua",
  load: "languageOnly",
  supportedLngs: ['ua', 'ru'],
  debug: true,
  interpolation: { escapeValue: false },
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
  },
  load: 'languageOnly',
  fallbackLng: 'ua',

  ns: "translation",
  defaultNS: "translation",
});


export default i18n;