// src/components/Header.jsx
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.jpg';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full font-sans shadow-md bg-white sticky top-0 z-[999] transition-all duration-300 ease-in-out">
      {/* Logo and Main Navigation */}
      <div className="xl:container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-16 h-16 border border-green-700 rounded-md overflow-hidden transition-all duration-300 group-hover:shadow-md">
              <img 
                src={logo} 
                alt="HomeoLife Logo" 
                className="w-full h-full object-cover bg-green-100"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-green-700">
              HomeoLife
            </h1>
          </a>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:block">
            <ul className="flex md:space-x-6">
              <li>
                <a href="/" className="text-gray-700 hover:text-green-600 transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-green-600">
                  {t('navigation.home')}
                </a>
              </li>
              <li>
                <a href="/consultations" className="text-gray-700 hover:text-green-600 transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-green-600">
                  {t('navigation.consultations')}
                </a>
              </li>
              <li ref={dropdownRef} className="relative group">
                <button 
                  className="text-gray-700 hover:text-green-600 transition-colors duration-300 pb-1 border-b-2 border-transparent group-hover:border-green-600 flex items-center cursor-pointer"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onClick={toggleDropdown}
                >
                  {t('navigation.usefulInfo')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Desktop Dropdown - Shows on hover */}
                <div 
                  className={`absolute left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 z-[999] w-full  ${
                    isDropdownOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto'
                  }`}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="py-1">
                    <a 
                      href="/my-approach" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      {t('dropdown.myApproach')}
                    </a>
                    <a 
                      href="/what-is-homeopathy" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      {t('dropdown.whatIsHomeopathy')}
                    </a>
                    <a 
                      href="/how-i-work" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      {t('dropdown.howIWork')}
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a href="/reviews" className="text-gray-700 hover:text-green-600 transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-green-600">
                  {t('navigation.reviews')}
                </a>
              </li>
              <li>
                <a href="/contacts" className="text-gray-700 hover:text-green-600 transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-green-600">
                  {t('navigation.contacts')}
                </a>
              </li>
            </ul>
          </nav>

          {/* Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Mobile Menu Button - Visible only on mobile */}
            <button 
              className="md:hidden flex items-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-300"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Expandable on mobile */}
      <div 
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out absolute z-[999] w-full ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="flex flex-col space-y-1">
            <li>
              <a 
                href="/" 
                className="block py-2 px-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.home')}
              </a>
            </li>
            <li>
              <a 
                href="/consultations" 
                className="block py-2 px-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.consultations')}
              </a>
            </li>
            <li>
              <div className="py-2 px-3 text-gray-700 font-medium">
                {t('navigation.usefulInfo')}
              </div>
              <a 
                href="/my-approach" 
                className="block py-2 px-6 text-gray-600 hover:bg-green-100 hover:text-green-700 text-sm border-l-2 border-green-100 ml-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('dropdown.myApproach')}
              </a>
              <a 
                href="/what-is-homeopathy" 
                className="block py-2 px-6 text-gray-600 hover:bg-green-100 hover:text-green-700 text-sm border-l-2 border-green-100 ml-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('dropdown.whatIsHomeopathy')}
              </a>
              <a 
                href="/how-i-work" 
                className="block py-2 px-6 text-gray-600 hover:bg-green-100 hover:text-green-700 text-sm border-l-2 border-green-100 ml-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('dropdown.howIWork')}
              </a>
            </li>
            <li>
              <a 
                href="/reviews" 
                className="block py-2 px-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.reviews')}
              </a>
            </li>
            <li>
              <a 
                href="/contacts" 
                className="block py-2 px-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.contacts')}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;