/**
 * Language Detection and SEO Management Component
 * Ensures proper language handling and prevents SEO conflicts
 */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LanguageDetector = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const detectAndSetLanguage = () => {
      const pathname = location.pathname;
      const supportedLanguages = ['ua', 'ru'];
      
      // Check if path starts with supported language (with or without trailing slash)
      const langMatch = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
      const pathLang = langMatch ? langMatch[1] : null;
      
      // Handle duplicate language URLs (e.g., /ru/ru, /ua/ua)
      if (pathname === '/ru/ru' || pathname === '/ua/ua') {
        const lang = pathname.split('/')[1];
        navigate(`/${lang}`, { replace: true });
        return;
      }

      // If we have a valid language in the URL
      if (pathLang && supportedLanguages.includes(pathLang)) {
        // Set i18n language if different
        if (i18n.language !== pathLang) {
          i18n.changeLanguage(pathLang);
        }

        // Update document lang attribute for SEO
        document.documentElement.lang = pathLang === 'ua' ? 'uk' : 'ru';
        
        // Update HTML lang attribute for better accessibility
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
          htmlElement.setAttribute('lang', pathLang === 'ua' ? 'uk' : 'ru');
        }
      } else if (pathLang && !supportedLanguages.includes(pathLang)) {
        // Invalid language, redirect to default
        navigate('/ua', { replace: true });
      }
      // Note: We don't handle paths without language prefix here anymore
      // The index.html script handles root redirects before React loads
    };

    detectAndSetLanguage();
  }, [location.pathname, i18n, navigate]);

  // This component doesn't render anything
  return null;
};

export default LanguageDetector;
