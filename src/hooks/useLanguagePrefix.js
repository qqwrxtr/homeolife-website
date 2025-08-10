import { useTranslation } from 'react-i18next';

export const useLanguagePrefix = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ua';
  
  const getLocalizedPath = (path) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Return with language prefix
    return `/${currentLang}${cleanPath ? '/' + cleanPath : ''}`;
  };
  
  return { currentLang, getLocalizedPath };
};
