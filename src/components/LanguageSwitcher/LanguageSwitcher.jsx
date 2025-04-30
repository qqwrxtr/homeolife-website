// src/components/LanguageSwitcher/LanguageSwitcher.jsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  // On mount, ensure language is set (fallback to 'ru')
  useEffect(() => {
    const storedLang = localStorage.getItem('i18nextLng') || 'ru';
    if (i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  const currentLang = i18n.language?.substring(0, 2) || 'ru';

  const changeLanguage = (lang) => {
    if (lang === currentLang) return;
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  return (
    <div 
      className="language-switcher flex items-center bg-slate-50/50 rounded-md px-1 py-0.5 border border-slate-100 transition-all duration-300 hover:shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => changeLanguage('ru')}
        className={`py-0.5 sm:py-1 px-1.5 sm:px-2 text-xs sm:text-sm font-medium rounded-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-teal-400
          ${currentLang === 'ru'
            ? 'text-slate-900 bg-white shadow-sm border-b-2 border-teal-500'
            : 'text-slate-600 hover:text-teal-700 hover:cursor-pointer'}`}
        aria-label="Русский"
      >
        RU
      </button>

      <span className="mx-0.5 sm:mx-1 text-slate-300 select-none w-1 h-full">|</span>

      <button
        onClick={() => changeLanguage('ua')}
        className={`py-0.5 sm:py-1 px-1.5 sm:px-2 text-xs sm:text-sm font-medium rounded-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-teal-400
          ${currentLang === 'ua'
            ? 'text-slate-900 bg-white shadow-sm border-b-2 border-teal-500'
            : 'text-slate-600 hover:text-teal-700 hover:cursor-pointer'}`}
        aria-label="Украинский"
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;