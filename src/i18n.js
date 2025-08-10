import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInRussian from './language/ru.json';
import translationsInUkrainian from './language/ua.json';

const resources = {
  ua: { translation: translationsInUkrainian },
  ru: { translation: translationsInRussian },
};

// Custom language detector that reads from URL path
const urlLanguageDetector = {
  name: 'urlPath',
  lookup() {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    if (langMatch && ['ua', 'ru'].includes(langMatch[1])) {
      return langMatch[1];
    }
    return null;
  },
  cacheUserLanguage() {
    // We don't need to cache since URL is the source of truth
  }
};

i18n
  .use({
    type: 'languageDetector',
    async: false,
    detect: urlLanguageDetector.lookup,
    init() {},
    cacheUserLanguage() {}
  })
  .use(initReactI18next)
  .init({
    resources,
    lng: urlLanguageDetector.lookup() || 'ua', // default to Ukrainian
    fallbackLng: 'ua',
    supportedLngs: ['ua','ru'],

    debug: false, // Set to false in production
    interpolation: { escapeValue: false },

    // turn off suspense so we don't render fallback content
    react: { useSuspense: false },
  });

export default i18n;
