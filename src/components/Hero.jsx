import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroVideo from '../assets/hero.mp4';
import ConsultModal from './Modals/Consulte.jsx';

const HeroSection = () => {
  const { t } = useTranslation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Handle parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Animate content on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  // Calculate parallax effect transformation
  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.3}px)`,
  };
  
  return (
    <>
      <div className="relative w-full h-screen max-h-[800px] min-h-[500px] 2xl:min-h-[600px] overflow-hidden">
        {/* Video Background with Parallax Effect */}
        <div 
          className="absolute top-0 left-0 w-full h-full z-0"
          style={parallaxStyle}
        >
          {/* Professional overlay with subdued gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/10 via-slate-800/60 to-slate-900/25 z-10"></div>
          <video 
            className="absolute top-0 left-0 min-w-full min-h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
            controls={false}
          >
            <source src={HeroVideo} type="video/mp4" />
          </video>
        </div>
        
        {/* Hero Content Container */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Content Wrapper with Animation */}
          <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Headline with subtle separator */}
            <div className="relative mb-6 sm:mb-8">
              <div className="hidden sm:block absolute left-1/2 -top-4 w-16 h-0.5 bg-teal-400 transform -translate-x-1/2"></div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block mb-1 sm:mb-2 text-white">{t('hero.healthStartsHere').split(' ')[0]}</span>
                <span className="block text-white">{t('hero.healthStartsHere').split(' ').slice(1).join(' ')}</span>
              </h1>
              <div className="hidden sm:block absolute left-1/2 -bottom-4 w-16 h-0.5 bg-teal-400 transform -translate-x-1/2"></div>
            </div>
            
            {/* Professional subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto font-normal leading-relaxed">
              {t('hero.homeopathyTreatsHuman')}
            </p>
            
            {/* Clean, professional button with subdued colors */}
            <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button 
                className="hover:cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-medium text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-10 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                onClick={openModal}
              >
                <span className="flex items-center">
                  {t('hero.bookConsultation')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          {/* Subtle scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="cursor-pointer text-white/60 hover:text-white/90 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <ConsultModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default HeroSection;