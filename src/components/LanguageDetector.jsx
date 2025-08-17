/**
 * Language Detection and SEO Management Component
 * Ensures proper language handling and prevents SEO conflicts
 */

import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LanguageDetector = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();

  useEffect(() => {
    const detectAndSetLanguage = () => {
      const pathname = location.pathname;
      const hasLangPrefix = /^\/[a-z]{2}\//.test(pathname);
      const supportedLanguages = ['ua', 'ru'];

      // If no language prefix in URL
      if (!hasLangPrefix) {
        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const detectedLang = browserLang.toLowerCase().includes('ru') ? 'ru' : 'ua';
        
        // Redirect to language-specific URL
        const newPath = `/${detectedLang}${pathname === '/' ? '' : pathname}`;
        navigate(newPath, { replace: true });
        return;
      }

      // If language prefix exists, validate it
      if (lang && supportedLanguages.includes(lang)) {
        // Set i18n language if different
        if (i18n.language !== lang) {
          i18n.changeLanguage(lang);
        }

        // Update document lang attribute for SEO
        document.documentElement.lang = lang === 'ua' ? 'uk' : 'ru';
        
        // Update HTML lang attribute for better accessibility
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
          htmlElement.setAttribute('lang', lang === 'ua' ? 'uk' : 'ru');
        }
      } else if (lang && !supportedLanguages.includes(lang)) {
        // Invalid language, redirect to default
        navigate('/ua/', { replace: true });
      }
    };

    detectAndSetLanguage();
  }, [location.pathname, lang, i18n, navigate]);

  // This component doesn't render anything
  return null;
};

export default LanguageDetector;
