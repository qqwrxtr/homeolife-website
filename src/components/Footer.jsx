import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import telegramIcon from '../assets/telegram-svgrepo-com.svg';
import instagramIcon from '../assets/instagram-1-svgrepo-com.svg';
import viberIcon from '../assets/viber-svgrepo-com.svg';
import gmailIcon from '../assets/gmail-svgrepo-com.svg';
import callIcon from '../assets/call-medicine-rounded-svgrepo-com.svg';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

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
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-12 pb-8 max-w-[90vw]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 border border-slate-200 rounded-md overflow-hidden">
                <img 
                  src={logo} 
                  alt="HomeoLife Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-slate-700">HomeoLife</h2>
            </div>
            <p className="text-slate-600 text-sm">
              {t('footer.about')}
            </p>
            <div className="flex items-center space-x-4 pt-2 justify-center">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/dr_anna_korkach/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <img src={instagramIcon} alt="Instagram" className="w-6 h-6 hover:scale-110 transition-all duration-300" />
              </a>

              {/* Viber */}
              <a
                href="viber://chat?number=380996668866"
                className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                aria-label="Viber"
              >
                <img src={viberIcon} alt="Viber" className="w-6 h-6 hover:scale-110 transition-all duration-300" />
              </a>

              {/* Email */}
              <a
                href="mailto:homeolifeua@gmail.com"
                className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                aria-label="Email"
              >
                <img src={gmailIcon} alt="Email" className="w-6 h-6 hover:scale-110 transition-all duration-300" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/annetta00000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                aria-label="Telegram"
              >
                <img src={telegramIcon} alt="Telegram" className="w-6 h-6 hover:scale-110 transition-all duration-300" />
              </a>

              {/* Phone */}
              <a
                href="tel:+380996668866"
                className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                aria-label="Phone"
              >
                <img src={callIcon} alt="Phone" className="w-6 h-6 hover:scale-110 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Column 2: Services / Useful Info */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">
              {t('footer.usefullInfo')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/my-approach" 
                  className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm"
                >
                  {t('dropdown.myApproach')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/what-is-homeopathy" 
                  className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm"
                >
                  {t('dropdown.whatIsHomeopathy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/howIwork" 
                  className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm"
                >
                  {t('dropdown.howIWork')}
                </Link>
              </li>
              <li>
                <a 
                  href="#reviews" 
                  className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm"
                  onClick={(e) => handleSectionNavigation('reviews', e)}
                >
                  {t('navigation.reviews')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm"
                >
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/consultations" 
                  className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm"
                >
                  {t('navigation.consultations')}
                </Link>
              </li>
              <li>
                <a 
                  href="#contacts" 
                  className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm"
                  onClick={(e) => handleSectionNavigation('contacts', e)}
                >
                  {t('navigation.contacts')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-3 ">
              <li className="flex items-start justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-600 text-sm">{t('footer.location')}</span>
              </li>
              <li className="flex items-start justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+380996668866" className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm">
                  +380 99 666 8866
                </a>
              </li>
              <li className="flex items-start justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:homeolifeua@gmail.com" className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm">
                  homeolifeua@gmail.com
                </a>
              </li>
              <li className="flex items-start justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm">
                  <p className="text-slate-600">{t('footer.workingHours')}</p>
                  <p className="text-slate-700">09:00 - 21:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright and Legal Links */}
      <div className="border-t border-slate-200 py-6">
        <div className="container mx-auto px-4 max-w-[90vw] flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-sm text-slate-500 mb-4 md:mb-0 text-center md:text-left">
            &copy; {currentYear} HomeoLife | {t('footer.copyright')}
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <Link 
              to="/privacy-policy" 
              className="text-sm text-slate-500 hover:text-teal-600 transition-colors duration-300"
            >
              {t('footer.privacyPolicy')}
            </Link>
            <Link 
              to="/terms-conditions" 
              className="text-sm text-slate-500 hover:text-teal-600 transition-colors duration-300"
            >
              {t('footer.termsConditions')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;