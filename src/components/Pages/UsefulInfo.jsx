import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ConsultModal from './../modals/consulte.jsx';
import blog_1 from '../../assets/blog_1.jpeg'
import blog_2 from '../../assets/blog_2.jpg'
import blog_3 from '../../assets/blog_3.jpg'
import blog_4 from '../../assets/blog_4.jpg'
import blog_5 from '../../assets/blog_5.jpg'
import blog_6 from '../../assets/blog_6.jpg'
import blog_7 from '../../assets/blog_7.webp'
import blog_8 from '../../assets/blog_8.jpeg'
import blog_9 from '../../assets/blog_9.jpg'
import blog_10 from '../../assets/blog_10.jpg'
import heroImage from './../../assets/123.png'; // Using the same hero image as Consultations

// Placeholder images
const placeholders = [
  blog_1,
  blog_2,
  blog_3,
  blog_4,
  blog_5,
  blog_6,
  blog_7,
  blog_8,
  blog_9,
  blog_10
];

const UsefulInfo = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const pageRef = useRef(null);
  
  // Force animation to play each time the component is loaded/focused
  useEffect(() => {
    // First set to false to ensure animation plays
    setIsInView(false);
    
    // Then use a small timeout to trigger the animation
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 50); // Small delay to ensure state changes are separated
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Open consultation modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Get text length class based on title length
  const getTitleLengthClass = (title) => {
    if (!title) return 'text-xl';
    
    if (title.length > 60) return 'text-sm sm:text-base md:text-lg';
    if (title.length > 45) return 'text-base sm:text-lg md:text-xl';
    if (title.length > 30) return 'text-lg sm:text-xl md:text-2xl';
    return 'text-xl sm:text-2xl md:text-3xl';
  };

  return (
    <div 
      ref={pageRef}
      className={`relative min-h-screen bg-slate-50 transition-opacity text-start duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Hero Section with consistent styling */}
      <section className="relative w-full min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] overflow-hidden bg-teal-800 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed', // Better mobile performance
          }}
        ></div>
        
        {/* Dark overlay with gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"
          style={{ zIndex: 1 }}
        ></div>
        
        {/* Overlay pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:30px_30px] md:[background-size:40px_40px]" style={{ zIndex: 2 }}></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
          <div className="container max-w-[95vw] sm:max-w-[90vw] px-3 sm:px-4 md:px-6 relative z-10 text-center">
            <div className="inline-block mb-4 sm:mb-6 bg-teal-600/30 backdrop-blur-sm px-3 sm:px-6 py-1 sm:py-2 rounded-full text-white/90 text-xs sm:text-sm md:text-base">
              {t("usefullInfo.title")}
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t("usefullInfo.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-6xl mx-auto mb-6 sm:mb-8">
              {t("usefullInfo.subtitle")}
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">              
              <button 
                onClick={openModal}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg bg-white text-teal-700 hover:bg-teal-50 transition-colors rounded-full font-semibold shadow-lg hover:shadow-xl duration-300"
              >
                {t("hero.bookConsultation")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid Section with Hardcoded Layout */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="w-full max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Blog 1 - Extra Large */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <div className="overflow-hidden">
              <Link to="/usefullInfo/1" className="group">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg lg:shadow-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative h-56 sm:h-64 md:h-72 lg:h-96 overflow-hidden">
                    <img 
                      src={placeholders[0]} 
                      alt={t("usefullInfo.blog_1.title")}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient - improved for small screens */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-700/30 to-transparent opacity-70 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="mb-2 sm:mb-4 flex items-center flex-wrap gap-2">
                      <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-teal-600 text-white rounded-full">
                        {t("usefullInfo.blog_1.category")}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_1.read_time")}
                      </span>
                    </div>
                    <h2 className={`${getTitleLengthClass(t("usefullInfo.blog_1.title"))} font-bold text-slate-800 mb-2 sm:mb-4 lg:mb-6 group-hover:text-teal-700 transition-colors duration-300`}>
                      {t("usefullInfo.blog_1.title")}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 lg:mb-6 line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
                      {t("usefullInfo.blog_1.intro")}
                    </p>
                    <div className="text-teal-600 font-medium flex items-center text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300">
                      {t("usefullInfo.readMore")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Blogs 2 and 3 - Medium and Image */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {/* Blog 2 - Left Column (Medium with text and image) */}
            <div className="md:col-span-6">
              <Link 
                to="/usefullInfo/2"
                className="group block bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-5">
                  <div className="sm:col-span-2 h-48 sm:h-full overflow-hidden">
                    <img 
                      src={placeholders[1]} 
                      alt={t("usefullInfo.blog_2.title")}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="sm:col-span-3 p-4 sm:p-5 md:p-6">
                    <div className="mb-2 flex items-center flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                        {t("usefullInfo.blog_2.category")}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_2.read_time")}
                      </span>
                    </div>
                    <h3 className={`${getTitleLengthClass(t("usefullInfo.blog_2.title"))} font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors duration-300`}>
                      {t("usefullInfo.blog_2.title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                      {t("usefullInfo.blog_2.intro")}
                    </p>
                    <div className="text-teal-600 text-xs sm:text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                      {t("usefullInfo.readMore")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Blog 3 - Right Column (Image with overlay) */}
            <div className="md:col-span-6 mt-4 md:mt-0">
              <Link 
                to="/usefullInfo/3"
                className="group block bg-gradient-to-tr from-slate-50 to-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={placeholders[2]} 
                    alt={t("usefullInfo.blog_3.title")}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    <div className="mb-2 flex items-center flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                        {t("usefullInfo.blog_3.category")}
                      </span>
                      <span className="text-xs text-white/90 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_3.read_time")}
                      </span>
                    </div>
                    <h3 className={`${getTitleLengthClass(t("usefullInfo.blog_3.title"))} font-bold text-white mb-2 group-hover:text-teal-200 transition-colors duration-300`}>
                      {t("usefullInfo.blog_3.title")}
                    </h3>
                    <div className="text-teal-300 text-xs sm:text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                      {t("usefullInfo.readMore")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Blogs 4 and 5 - Mirrored Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {/* Blog 4 - Left Column (Image with overlay) */}
            <div className="md:col-span-6">
              <Link 
                to="/usefullInfo/4"
                className="group block bg-gradient-to-tr from-slate-50 to-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={placeholders[3]} 
                    alt={t("usefullInfo.blog_4.title")}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    <div className="mb-2 flex items-center flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                        {t("usefullInfo.blog_4.category")}
                      </span>
                      <span className="text-xs text-white/90 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_4.read_time")}
                      </span>
                    </div>
                    <h3 className={`${getTitleLengthClass(t("usefullInfo.blog_4.title"))} font-bold text-white mb-2 group-hover:text-teal-200 transition-colors duration-300`}>
                      {t("usefullInfo.blog_4.title")}
                    </h3>
                    <div className="text-teal-300 text-xs sm:text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                      {t("usefullInfo.readMore")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Blog 5 - Right Column (Medium with text and image) */}
            <div className="md:col-span-6 mt-4 md:mt-0">
              <Link 
                to="/usefullInfo/5"
                className="group block bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                <div className="grid grid-cols-1 sm:grid-cols-5">
                    <div className="sm:col-span-3 p-4 sm:p-5 md:p-6 order-2 sm:order-1">
                    <div className="mb-2 flex items-center flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                        {t("usefullInfo.blog_5.category")}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_5.read_time")}
                        </span>
                    </div>
                    <h3 className={`${getTitleLengthClass(t("usefullInfo.blog_5.title"))} font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors duration-300`}>
                        {t("usefullInfo.blog_5.title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                        {t("usefullInfo.blog_5.intro")}
                    </p>
                    <div className="text-teal-600 text-xs sm:text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                        {t("usefullInfo.readMore")}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    </div>
                    <div className="sm:col-span-2 h-48 sm:h-full overflow-hidden order-1 sm:order-2">
                    <img 
                        src={placeholders[4]} 
                        alt={t("usefullInfo.blog_5.title")}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    </div>
                </div>
                </Link>
            </div>
          </div>

            {/* Blog 6 - Large Layout like Blog 1 but with image on right */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
            <div className="overflow-hidden">
                <Link to="/usefullInfo/6" className="group">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg lg:shadow-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl">
                    <div className="relative h-56 sm:h-64 md:h-72 lg:h-96 overflow-hidden md:order-2">
                    <img 
                        src={placeholders[5]} 
                        alt={t("usefullInfo.blog_6.title")}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient - improved for small screens */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-700/30 to-transparent opacity-70 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="mb-2 sm:mb-4 flex items-center flex-wrap gap-2">
                        <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-teal-600 text-white rounded-full">
                        {t("usefullInfo.blog_6.category")}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_6.read_time")}
                        </span>
                    </div>
                    <h2 className={`${getTitleLengthClass(t("usefullInfo.blog_6.title"))} font-bold text-slate-800 mb-2 sm:mb-4 lg:mb-6 group-hover:text-teal-700 transition-colors duration-300`}>
                        {t("usefullInfo.blog_6.title")}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 lg:mb-6 line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
                        {t("usefullInfo.blog_6.intro")}
                    </p>
                    <div className="text-teal-600 font-medium flex items-center text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300">
                        {t("usefullInfo.readMore")}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    </div>
                </div>
                </Link>
            </div>
            </div>

          {/* Remaining blogs in chess pattern (7-10) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="md:col-span-6 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Blog 7 - Medium with text and image */}
              <Link 
                to="/usefullInfo/7" 
                className="group block bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-5">
                  <div className="sm:col-span-2 h-48 sm:h-full overflow-hidden">
                    <img 
                      src={placeholders[6]} 
                      alt={t("usefullInfo.blog_7.title")}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="sm:col-span-3 p-4 sm:p-5 md:p-6">
                    <div className="mb-2 flex items-center flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                        {t("usefullInfo.blog_7.category")}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_7.read_time")}
                      </span>
                    </div>
                    <h3 className={`${getTitleLengthClass(t("usefullInfo.blog_7.title"))} font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors duration-300`}>
                      {t("usefullInfo.blog_7.title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                      {t("usefullInfo.blog_7.intro")}
                    </p>
                    <div className="text-teal-600 text-xs sm:text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                      {t("usefullInfo.readMore")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Blog 10 - Image with overlay */}
              <Link 
                to="/usefullInfo/10"
                className="group block bg-gradient-to-tr from-slate-50 to-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={placeholders[9]} 
                    alt={t("usefullInfo.blog_10.title")}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    <div className="mb-2 flex items-center flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                        {t("usefullInfo.blog_10.category")}
                      </span>
                      <span className="text-xs text-white/90 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_10.read_time")}
                      </span>
                    </div>
                    <h3 className={`${getTitleLengthClass(t("usefullInfo.blog_10.title"))} font-bold text-white mb-2 group-hover:text-teal-200 transition-colors duration-300`}>
                      {t("usefullInfo.blog_10.title")}
                    </h3>
                    <div className="text-teal-300 text-xs sm:text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                      {t("usefullInfo.readMore")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Right Column */}
            <div className="md:col-span-6 space-y-4 sm:space-y-6 lg:space-y-8 mt-4 md:mt-0">
                
              {/* Blog 8 - Image with overlay */}
              <Link 
                to="/usefullInfo/8"
                className="group block bg-gradient-to-tr from-slate-50 to-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={placeholders[7]} 
                    alt={t("usefullInfo.blog_8.title")}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    <div className="mb-2 flex items-center flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                        {t("usefullInfo.blog_8.category")}
                      </span>
                      <span className="text-xs text-white/90 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_8.read_time")}
                      </span>
                    </div>
                    <h3 className={`${getTitleLengthClass(t("usefullInfo.blog_8.title"))} font-bold text-white mb-2 group-hover:text-teal-200 transition-colors duration-300`}>
                      {t("usefullInfo.blog_8.title")}
                    </h3>
                    <div className="text-teal-300 text-xs sm:text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                      {t("usefullInfo.readMore")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Blog 9 - Medium with text and image (mirrored) */}
                <Link 
                to="/usefullInfo/9" 
                className="group block bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                <div className="grid grid-cols-1 sm:grid-cols-5">
                    <div className="sm:col-span-3 p-4 sm:p-5 md:p-6 order-2 sm:order-1">
                    <div className="mb-2 flex items-center flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                        {t("usefullInfo.blog_9.category")}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {t("usefullInfo.blog_9.read_time")}
                        </span>
                    </div>
                    <h3 className={`${getTitleLengthClass(t("usefullInfo.blog_9.title"))} font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors duration-300`}>
                        {t("usefullInfo.blog_9.title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                        {t("usefullInfo.blog_9.intro")}
                    </p>
                    <div className="text-teal-600 text-xs sm:text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                        {t("usefullInfo.readMore")}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    </div>
                    <div className="sm:col-span-2 h-48 sm:h-full overflow-hidden order-1 sm:order-2">
                    <img 
                        src={placeholders[8]} 
                        alt={t("usefullInfo.blog_9.title")}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    </div>
                </div>
                </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-teal-600 to-emerald-700 text-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
              {t('my-approach.finalCTA.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              {t('my-approach.finalCTA.description')}
            </p>
            <button
              onClick={openModal}
              className="bg-white text-teal-600 hover:bg-gray-100 font-medium px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto text-sm sm:text-base"
            >
              {t("hero.bookConsultation")}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 sm:h-5 sm:w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <ConsultModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default UsefulInfo;