// src/components/Header.jsx
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

   // Handle smooth scrolling for section links
   const handleSectionNavigation = (sectionId, event) => {
    event.preventDefault();
    
    if (location.pathname === '/') {
      // If on home page, scroll directly
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If not on home page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Handle dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Toggle menu"]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Handle scroll state for responsive header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Close mobile menu on scroll
      if (isMenuOpen && window.scrollY > 10) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={`w-full shadow-md bg-white/95 backdrop-blur-sm sticky top-0 z-[9999] transition-all duration-300 ease-in-out
        ${isScrolled ? 'py-1 md:py-2' : 'py-1 md:py-2'}`}
    >
      {/* Logo and Main Navigation */}
      <div className="max-w-[90vw] mx-auto px-3 md:px-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border border-slate-200 rounded-md overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-md ${isScrolled ? 'scale-95' : ''}`}>
              <img 
                src={logo} 
                alt="HomeoLife Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold text-slate-700 transition-colors duration-300 group-hover:text-slate-900 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 group-hover:after:w-full ${isScrolled ? 'scale-95' : ''}`}>
              HomeoLife
            </h1>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-5 xl:space-x-8 text-sm md:text-base">
              <li>
                <Link to="/" className="text-slate-700 hover:text-slate-900 transition-colors duration-300 pb-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/consultations" className="text-slate-700 hover:text-slate-900 transition-colors duration-300 pb-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full">
                  {t('navigation.consultations')}
                </Link>
              </li>
              <li ref={dropdownRef} className="relative group">
                <a
                  className="text-slate-700 hover:text-slate-900 transition-colors duration-300 pb-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  {t('navigation.usefullInfo')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-3 w-3 md:h-4 md:w-4 ml-1 transition-transform duration-300 group-hover:rotate-180 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                
                {/* Desktop Dropdown - Shows on hover or click */}
                <div 
                  className={`absolute left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-slate-200 transition-all duration-300 z-[99] w-full 
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  <div className="py-1 rounded-md overflow-hidden">
                    <Link 
                      to="/my-approach" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-all duration-200"
                    >
                      {t('dropdown.myApproach')}
                    </Link>
                    <Link 
                      to="/what-is-homeopathy" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-all duration-200"
                    >
                      {t('dropdown.whatIsHomeopathy')}
                    </Link>
                    <Link 
                      to="/howIwork" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-all duration-200"
                    >
                      {t('dropdown.howIWork')}
                    </Link>
                    <Link
                      to="/usefullInfo"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-all duration-200"
                    >
                      {t('navigation.usefullInfo')}
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <a 
                  href="#reviews" 
                  className="text-slate-700 hover:text-slate-900 transition-colors duration-300 pb-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full"
                  onClick={(e) => handleSectionNavigation('reviews', e)}
                >
                  {t('navigation.reviews')}
                </a>
              </li>
              <li>
                <a 
                  href="#contacts" 
                  className="text-slate-700 hover:text-slate-900 transition-colors duration-300 pb-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full"
                  onClick={(e) => handleSectionNavigation('contacts', e)}
                >
                  {t('navigation.contacts')}
                </a>
              </li>
            </ul>
          </nav>

          {/* Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Mobile Menu Button - Visible only on mobile */}
            <button 
              className="lg:hidden flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
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
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-x-0 top-[calc(100%)] bg-white overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-100 shadow-lg z-[9998] ${
          isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <ul className="flex flex-col divide-y divide-slate-100">
            <li>
              <Link 
                to="/" 
                className="flex items-center py-3 text-sm text-slate-700 hover:text-teal-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {t('navigation.home')}
              </Link>
            </li>
            <li>
              <Link 
                to="/consultations" 
                className="flex items-center py-3 text-sm text-slate-700 hover:text-teal-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t('navigation.consultations')}
              </Link>
            </li>
            <li>
              <Link 
                to="/usefullInfo" 
                className="flex items-center py-3 text-sm text-slate-700 hover:text-teal-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('navigation.usefullInfo')}
              </Link>
            </li>
            <li>
              <Link 
                to="/my-approach" 
                className="flex items-center py-3 text-sm text-slate-700 hover:text-teal-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('dropdown.myApproach')}
              </Link>
            </li>
            <li>
              <Link 
                to="/what-is-homeopathy" 
                className="flex items-center py-3 text-sm text-slate-700 hover:text-teal-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('dropdown.whatIsHomeopathy')}
              </Link>
            </li>
            <li>
              <Link 
                to="/howIwork" 
                className="flex items-center py-3 text-sm text-slate-700 hover:text-teal-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('dropdown.howIWork')}
              </Link>
            </li>
            <li>
              <a 
                href="#reviews" 
                className="flex items-center py-3 text-sm text-slate-700 hover:text-teal-600 transition-all duration-200"
                onClick={(e) => handleSectionNavigation('reviews', e)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                {t('navigation.reviews')}
              </a>
            </li>
            <li>
              <a 
                href="#contacts" 
                className="flex items-center py-3 text-sm text-slate-700 hover:text-teal-600 transition-all duration-200"
                onClick={(e) => handleSectionNavigation('contacts', e)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
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