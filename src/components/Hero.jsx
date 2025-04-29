import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroVideo from '../assets/hero.mp4';
import ConsultModal from './modals/consulte';

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
    transform: `translateY(${scrollPosition * 0.4}px)`,
  };
  
  return (
    <>
      <div className="relative w-full h-[50rem] overflow-hidden">
        {/* Video Background with Parallax Effect */}
        <div 
          className="absolute top-0 left-0 w-full h-full z-0"
          style={parallaxStyle}
        >
          {/* Overlay with subtle gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"></div>
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
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-6xl mx-auto">
          {/* Content Wrapper with Animation */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Headline with Accent Bar */}
            <div className="relative inline-block mb-8">
              <div className="absolute left-1/2 -top-6 w-24 h-1 bg-green-400 transform -translate-x-1/2 rounded-full"></div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-wider leading-tight">
                <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200">{t('hero.healthStartsHere').split(' ')[0]}</span>
                <span className="block text-white">{t('hero.healthStartsHere').split(' ').slice(1).join(' ')}</span>
              </h1>
              <div className="absolute left-1/2 -bottom-6 w-24 h-1 bg-green-400 transform -translate-x-1/2 rounded-full"></div>
            </div>
            
            {/* Subheading with Custom Styling */}
            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              <span className="relative inline-block">
                <span className="relative z-10">{t('hero.homeopathyTreatsHuman').split('!')[0]}!</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500/40 rounded-full"></span>
              </span>
              <span className="block mt-3 text-white/80">{t('hero.homeopathyTreatsHuman').split('!')[1].trim()}!</span>
            </p>
            
            {/* Enhanced Button with Visual Effects */}
            <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button 
                className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-lg py-4 px-12 rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-green-500 hover:to-green-400 focus:outline-none"
                onClick={openModal}
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 128, 0, 0.3)'
                }}
              >
                {/* Background Effects */}
                <span className="absolute w-full h-full top-0 left-0 bg-white opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full"></span>
                <span className="absolute -inset-1 rounded-full opacity-30 bg-gradient-to-r from-green-400 to-green-300 blur-md group-hover:opacity-40 transition-opacity duration-500"></span>
                
                {/* Text with Icon */}
                <span className="relative z-10 flex items-center justify-center font-semibold tracking-wide">
                  {t('hero.bookConsultation')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          {/* Enhanced scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative group cursor-pointer">
              {/* Animated label */}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
              
              {/* Pulse ring animation */}
              <span className="absolute -inset-3 rounded-full border-2 border-white/30 opacity-40 animate-ping"></span>
              
              {/* Main scroll icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white/80 animate-bounce"
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