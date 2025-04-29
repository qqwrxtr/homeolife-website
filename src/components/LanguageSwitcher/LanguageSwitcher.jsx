import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Get current language
  const currentLang = i18n.language;
  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle language change
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };
  
  return (
    <div className="language-switcher relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center space-x-1 py-1 px-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
        aria-label="Change language"
      >
        <span className="font-medium text-gray-700">
          {currentLang.toLowerCase() === 'ru' ? t('language.russian') : t('language.ukrainian')}
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg py-1 min-w-[120px] z-50 border border-gray-200">
          <button 
            className={`w-full text-left px-4 py-2 flex items-center space-x-2 ${currentLang === 'ru' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'}`}
            onClick={() => changeLanguage('ru')}
          >
            <span className="text-lg">{getFlagEmoji('ru')}</span>
            <span>{t('language.russian')}</span>
            {currentLang === 'ru' && (
              <svg className="ml-auto h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <button 
            className={`w-full text-left px-4 py-2 flex items-center space-x-2 ${currentLang === 'ua' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'}`}
            onClick={() => changeLanguage('ua')}
          >
            <span className="text-lg">{getFlagEmoji('ua')}</span>
            <span>{t('language.ukrainian')}</span>
            {currentLang === 'ua' && (
              <svg className="ml-auto h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;