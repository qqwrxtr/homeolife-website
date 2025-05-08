import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ConsultModal from './../modals/consulte.jsx';
import hanemannPortrait from './../../assets/hanemannPortrait.png';
import heroImage from './../../assets/homeopathy.webp';
import remediesImage from "./../../assets/remediesImage.jpg";

const WhatIsHomeopathy = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('what-is-homeopathy');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [readMore, setReadMore] = useState({});
  const [activeTab, setActiveTab] = useState('principle1');
  const [isMobile, setIsMobile] = useState(false);
  
  // Parallax effect state
  const [offset, setOffset] = useState(0);
  
  // References for sections
  const sectionRefs = {
    'what-is-homeopathy': useRef(null),
    'homeopathy-history': useRef(null),
    'principles': useRef(null),
    'homeopathic-remedies': useRef(null),
    'conclusion': useRef(null)
  };

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


  // Toggle read more sections
  const toggleReadMore = (section) => {
    setReadMore(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Intersection Observer to detect which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", 
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          if (window.scrollY > 100) {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.keys(sectionRefs).forEach(sectionId => {
      if (sectionRefs[sectionId].current) {
        sectionObserver.observe(sectionRefs[sectionId].current);
      }
    });

    return () => {
      Object.keys(sectionRefs).forEach(sectionId => {
        if (sectionRefs[sectionId].current) {
          sectionObserver.unobserve(sectionRefs[sectionId].current);
        }
      });
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = sectionRefs[sectionId].current;
    if (section) {
      const offset = 100;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section with Fixed Background */}
      <section className="relative w-full min-h-[70vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-teal-800 text-white">
        {/* Fixed Background */}
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
              {t('homeopathy-experience.title')}
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 lg:mb-8 tracking-tight drop-shadow-md">
              <span className="block">{t('what-is-homeopathy.title')}</span>
              <span className="relative">
                <span className="block h-1 sm:h-1.5 bg-teal-400 absolute bottom-0 left-0 right-0 transform translate-y-2"></span>
                <span className="relative text-teal-300 italic">{t('homeopathy-experience.gentleApproach.title')}</span>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 drop-shadow-sm">
              {t('what-is-homeopathy.description')}
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">              
              <button 
                onClick={() => scrollToSection('conclusion')}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg bg-white text-teal-700 hover:bg-teal-50 transition-colors rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
              >
                {t('final-cta.title')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-[95vw] sm:max-w-[90vw]">
        {/* What is Homeopathy */}
        <section 
          id="what-is-homeopathy" 
          ref={sectionRefs['what-is-homeopathy']}
          className="my-12 sm:my-16 md:my-20 lg:my-24"
        >
          <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left text column */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-teal-100 text-teal-700 rounded-full mb-4 sm:mb-6 self-center sm:self-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 sm:w-5 sm:h-5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 0 0-18Z" />
                    <path d="M12 2c3 2 4.5 4.5 4.5 7.5S15 15 12 17c-3-2-4.5-4.5-4.5-7.5S9 4 12 2Z" />
                  </svg>
                  <span className="font-semibold text-xs sm:text-sm">{t('what-is-homeopathy.title')}</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                  {t('what-is-homeopathy.principlesTitle')}
                </h2>
                
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-6 sm:mb-8">
                  {t('what-is-homeopathy.description')}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">
                  {t('what-is-homeopathy.principles', { returnObjects: true }).map((principle, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl border border-slate-100 hover:border-teal-200 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
                          {index + 1}
                        </div>
                        
                        <h3 className="font-medium text-sm sm:text-base md:text-lg text-slate-800 mb-4 sm:mb-6 md:mb-8">{principle}</h3>
                        
                        <button 
                          onClick={() => setActiveTab(`principle${index + 1}`)}
                          className="text-xs sm:text-sm md:text-base text-teal-600 hover:text-teal-800 flex items-center group"
                        >
                          <span>{t('more')}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right interactive column */}
              <div className="bg-teal-900 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full">
                  <div className="flex flex-wrap space-x-1 sm:space-x-2 mb-4 sm:mb-6 border-b border-white/20 pb-3 sm:pb-4">
                    <button 
                      onClick={() => setActiveTab('principle1')}
                      className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        activeTab === 'principle1' ? 'bg-teal-600 text-white' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {t('first-principle.subtitle')}
                    </button>
                    <button 
                      onClick={() => setActiveTab('principle2')}
                      className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        activeTab === 'principle2' ? 'bg-teal-600 text-white' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {t('second-principle.subtitle')}
                    </button>
                    <button 
                      onClick={() => setActiveTab('principle3')}
                      className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        activeTab === 'principle3' ? 'bg-teal-600 text-white' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {t('third-principle.subtitle')}
                    </button>
                  </div>
                  
                  {/* Tab content */}
                  <div className="h-full overflow-auto pr-2 scrollbar-thin">
                    {activeTab === 'principle1' && (
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">{t('first-principle.title')}</h3>
                        <p className="text-sm sm:text-base mb-3 sm:mb-4 text-white/80">{t('first-principle.description')}</p>
                        <blockquote className="border-l-4 border-teal-500 pl-3 sm:pl-4 py-1 sm:py-2 my-3 sm:my-4 bg-white/5 rounded-r-md text-sm sm:text-base">
                          {t('first-principle.experiment')}
                        </blockquote>
                        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-teal-800 rounded-lg">
                          <div className="flex items-center mb-2 sm:mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-teal-300 sm:w-5 sm:h-5">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                            <h4 className="font-semibold text-teal-200 text-sm sm:text-base">{t('key')}</h4>
                          </div>
                          <p className="text-white/90 text-xs sm:text-sm md:text-base">{t('keyText')}</p>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'principle2' && (
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">{t('second-principle.title')}</h3>
                        <p className="text-sm sm:text-base mb-3 sm:mb-4 text-white/80">{t('second-principle.description')}</p>
                        <blockquote className="border-l-4 border-teal-500 pl-3 sm:pl-4 py-1 sm:py-2 my-3 sm:my-4 bg-white/5 rounded-r-md text-sm sm:text-base">
                          {t('second-principle.quote')}
                        </blockquote>
                        <p className="text-sm sm:text-base mb-3 sm:mb-4 text-white/80">{t('second-principle.explanation')}</p>
                        <div className="flex items-center justify-center my-4 sm:my-6 py-3 sm:py-4 border-y border-white/20">
                          <span className="text-lg sm:text-xl md:text-2xl font-serif text-teal-300 italic">
                            {t('second-principle.latinPhrase')}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'principle3' && (
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">{t('third-principle.title')}</h3>
                        <p className="text-sm sm:text-base mb-3 sm:mb-4 text-white/80">{t('third-principle.description')}</p>
                        <p className="text-sm sm:text-base mb-3 sm:mb-4 text-white/80">{t('third-principle.approach')}</p>
                        
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6">
                          {t('third-principle.factors', { returnObjects: true }).slice(0, 4).map((factor, index) => (
                            <div key={index} className="bg-white/5 p-2 sm:p-3 rounded-md sm:rounded-lg flex items-center">
                              <div className="bg-teal-700 h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center mr-2">
                                <span className="text-xs">{index + 1}</span>
                              </div>
                              <span className="text-xs sm:text-sm">{factor}</span>
                            </div>
                          ))}
                        </div>
                        
                        <p className="mt-4 sm:mt-6 font-medium text-teal-300 text-xs sm:text-sm md:text-base">
                          {t('third-principle.individualityNote')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* History Section */}
        <section 
          id="homeopathy-history" 
          ref={sectionRefs['homeopathy-history']}
          className="my-12 sm:my-16 md:my-20 lg:my-24"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image column */}
              <div className="relative h-[250px] sm:h-[300px] md:h-auto order-1 md:order-none">
                <img 
                  src={hanemannPortrait} 
                  alt="Samuel Hahnemann" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Самуэль Ганеман</h3>
                  <p className="text-white/80 text-sm sm:text-base">1755-1843</p>
                  <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2">{t('mainGeo')}</p>
                </div>
              </div>
              
              {/* Text column */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-amber-100 text-amber-700 rounded-full mb-4 sm:mb-6 self-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 sm:w-5 sm:h-5">
                    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                    <path d="m12 7 1.5 2.5h2.5l.5 2-1.5 2-1.5-2L12 7Z" />
                    <path d="M5.5 12h3" />
                    <path d="M15.5 12h3" />
                    <path d="M12 16v3" />
                  </svg>
                  <span className="font-semibold text-xs sm:text-sm">{t('homeopathy-history.title')}</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
                  {t('homeopathy-experience.title')}
                </h2>
                
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-3 sm:mb-4">
                  {t('homeopathy-history.description')}
                </p>
                
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-4 sm:mb-6">
                  {t('homeopathy-history.additionalInfo')}
                </p>
                
                <div className={`transition-all duration-500 overflow-hidden ${readMore.history ? 'max-h-[1000px]' : 'max-h-0'}`}>
                  <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-3 sm:mb-4">
                    {t('homeopathy-history.hanemannBio')}
                  </p>
                  
                  <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-4 sm:mb-6">
                    {t('homeopathy-history.discovery')}
                  </p>
                  
                  <div className="flex items-center bg-amber-50 p-3 sm:p-4 rounded-lg border-l-4 border-amber-400">
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 sm:w-6 sm:h-6">
                        <path d="M15 7h1a2 2 0 0 1 2 2v1" />
                        <path d="M9 12h4.5" />
                        <path d="M9 16h4.5" />
                        <path d="M19.5 14.5v1a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V8.5c0-1.58.93-3 2.5-3.5" />
                        <path d="M3 8h3.5A1.5 1.5 0 0 0 8 6.5v0A1.5 1.5 0 0 0 6.5 5H5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-800 text-sm sm:text-base">{t('funFact')}</h4>
                      <p className="text-amber-700 text-xs sm:text-sm">{t('funFactText')}</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => toggleReadMore('history')}
                  className="mt-4 sm:mt-6 text-amber-600 hover:text-amber-800 flex items-center font-medium self-start group text-sm sm:text-base"
                >
                  <span>{readMore.history ? t('ReadNoMore') : t('ReadMore')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`ml-1 transition-transform duration-300 ${readMore.history ? 'rotate-180' : ''} sm:w-5 sm:h-5`}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                
                <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  <div className="bg-amber-50 p-3 sm:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-2xl font-bold text-amber-700 mb-1">1755</div>
                    <div className="text-amber-800 text-xs sm:text-sm">{t('Year')}</div>
                  </div>
                  <div className="bg-amber-50 p-3 sm:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-2xl font-bold text-amber-700 mb-1">1790</div>
                    <div className="text-amber-800 text-xs sm:text-sm">{t('FirstExperiment')}</div>
                  </div>
                  <div className="bg-amber-50 p-3 sm:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-2xl font-bold text-amber-700 mb-1">1810</div>
                    <div className="text-amber-800 text-xs sm:text-sm">{t('Organ')}</div>
                  </div>
                  <div className="bg-amber-50 p-3 sm:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-2xl font-bold text-amber-700 mb-1">1843</div>
                    <div className="text-amber-800 text-xs sm:text-sm">{t('Died')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Principles in Practice */}
        <section 
          id="principles" 
          ref={sectionRefs['principles']}
          className="my-12 sm:my-16 md:my-20 lg:my-24"
        >
          <div className="bg-gradient-to-br from-slate-900 to-teal-900 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden text-white">
            <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
              <div className="flex flex-col justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-12">
                <div>
                  <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-full mb-3 sm:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 sm:w-5 sm:h-5">
                      <path d="M12 3c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1s-1-.4-1-1V4c0-.6.4-1 1-1Z" />
                      <circle cx="12" cy="12" r="8" />
                      <path d="m12 17 5-5" />
                      <path d="M12 12h5" />
                    </svg>
                    <span className="font-semibold text-xs sm:text-sm">{t('what-is-homeopathy.principlesDescription')}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">{t('what-is-homeopathy.whatIsHomeopathyDescription')}</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {/* Card 1 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300 sm:w-6 sm:h-6">
                      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
                      <path d="M12 7v5" />
                      <path d="M9 9h6" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-teal-300">{t('homeopathy-experience.gentleApproach.title')}</h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base text-center">{t('homeopathy-experience.gentleApproach.description')}</p>
                </div>
                
                {/* Card 2 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300 sm:w-6 sm:h-6">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 0 0-18Z" />
                      <path d="M12 2c3 2 4.5 4.5 4.5 7.5S15 15 12 17c-3-2-4.5-4.5-4.5-7.5S9 4 12 2Z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-teal-300">{t('homeopathy-experience.holisticTreatment.title')}</h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base text-center">{t('homeopathy-experience.holisticTreatment.description')}</p>
                </div>
                
                {/* Card 3 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300 sm:w-6 sm:h-6">
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-teal-300">{t('homeopathy-experience.safeForFamilies.title')}</h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base text-center">{t('homeopathy-experience.safeForFamilies.description')}</p>
                </div>
              </div>
              
              <div className="relative mt-8 sm:mt-12 md:mt-16 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-teal-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-blue-500/10 rounded-full blur-xl"></div>
                
                <div className="relative z-10 flex flex-col md:items-center md:justify-between">
                  <div className="md:pr-6 lg:pr-10 mb-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">{t('my-approach.finalCTA.title')}</h3>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base">
                      {t('my-approach.finalCTA.description')}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button 
                      onClick={openModal}
                      className="w-full md:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base bg-teal-600 hover:bg-teal-500 transition-colors rounded-lg sm:rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform duration-300"
                    >
                      {t('hero.bookConsultation')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Homeopathic Remedies */}
        <section 
          id="homeopathic-remedies" 
          ref={sectionRefs['homeopathic-remedies']}
          className="my-12 sm:my-16 md:my-20 lg:my-24"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Text column */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center order-2 md:order-1">
                <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-teal-100 text-teal-700 rounded-full mb-4 sm:mb-6 self-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 sm:w-5 sm:h-5">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5" />
                    <path d="M12 13v8" />
                    <path d="M8 17h8" />
                  </svg>
                  <span className="font-semibold text-xs sm:text-sm">{t('homeopathic-remedies.heading')}</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
                  {t('homeopathic-remedies.heading')}
                </h2>
                
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-4 sm:mb-6">
                  {t('homeopathic-remedies.description')}
                </p>
                
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-6 sm:mb-8">
                  {t('homeopathic-remedies.safetyInfo')}
                </p>
                
                <div className="bg-teal-50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-teal-100 mb-6 sm:mb-8">
                  <h3 className="flex items-center text-base sm:text-lg md:text-xl font-semibold text-teal-800 mb-2 sm:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-teal-600 sm:w-6 sm:h-6">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {t('homeopathic-remedies.forWhom')}
                  </h3>
                  <p className="text-teal-700 text-xs sm:text-sm md:text-base">
                    {t('homeopathic-remedies.usageNote')}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-slate-100 text-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-2 sm:mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 md:w-6 md:h-6">
                        <path d="M9 12h.01" />
                        <path d="M15 12h.01" />
                        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-slate-800 mb-1 text-xs sm:text-sm md:text-base">{t('homeopathic-remedies.children')}</h4>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-slate-100 text-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-2 sm:mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 md:w-6 md:h-6">
                        <path d="M5 9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
                        <path d="M12 19v-4" />
                        <path d="M9 15h6" />
                        <path d="m12 9-3-4.5a6 6 0 0 1 0-1V2" />
                        <path d="M12 9v4" />
                        <path d="M12 9 9 4.5" />
                        <path d="M15 4.5a6 6 0 0 1 0 1L12 9" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-slate-800 mb-1 text-xs sm:text-sm md:text-base">{t('homeopathic-remedies.pregnant')}</h4>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-slate-100 text-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-2 sm:mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 md:w-6 md:h-6">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        <path d="M8 15h8" />
                        <path d="M8 18h3" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-slate-800 mb-1 text-xs sm:text-sm md:text-base">{t('homeopathic-remedies.elderly')}</h4>
                  </div>
                </div>
              </div>
              
              {/* Image column */}
              <div className="relative order-1 md:order-2 h-[250px] sm:h-[300px] md:h-auto overflow-hidden">
                <img 
                  src={remediesImage} 
                  alt={t('homeopathic-remedies.imageAlt')} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-teal-900/40 to-black/60 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('homeopathic-remedies.preparation.title')}</h3>
                  <p className="text-white/80 mb-4 sm:mb-6 max-w-xs sm:max-w-sm text-xs sm:text-sm md:text-base">
                    {t('homeopathic-remedies.preparation.description')}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg">
                    <div className="bg-white/10 backdrop-blur-sm rounded-md sm:rounded-lg p-2 sm:p-3 border border-white/20">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">01</div>
                      <div className="text-white/80 text-xs sm:text-sm">{t('homeopathic-remedies.preparation.step1')}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-md sm:rounded-lg p-2 sm:p-3 border border-white/20">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">02</div>
                      <div className="text-white/80 text-xs sm:text-sm">{t('homeopathic-remedies.preparation.step2')}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-md sm:rounded-lg p-2 sm:p-3 border border-white/20">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">03</div>
                      <div className="text-white/80 text-xs sm:text-sm">{t('homeopathic-remedies.preparation.step3')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section 
          id="conclusion" 
          ref={sectionRefs['conclusion']}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <div className="bg-teal-600 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden text-white">
            <div className="relative px-4 py-10 sm:px-6 sm:py-12 md:p-16">
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-teal-500/30 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-teal-500/20 rounded-full"></div>
              </div>
              
              {/* Content container */}
              <div className="relative z-10 max-w-5xl mx-auto">
                {/* Section label */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 bg-teal-700/40 backdrop-blur-sm text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 sm:w-5 sm:h-5">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                    </svg>
                    <span className="font-medium text-xs sm:text-sm">{t('conclusion.title')}</span>
                  </div>
                </div>
                
                {/* Main heading */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center leading-tight max-w-4xl mx-auto">
                  {t('conclusion.description')}
                </h2>
                
                {/* Benefits cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
                  {/* Card 1: Experience */}
                  <div className="bg-teal-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-teal-500/30 hover:bg-teal-700/40 transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-teal-500/20 mb-3 sm:mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6 md:w-7 md:h-7">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{t('conclusion.benefits.experience.title')}</h3>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base">
                      {t('conclusion.benefits.experience.description')}
                    </p>
                  </div>
                  
                  {/* Card 2: Care */}
                  <div className="bg-teal-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-teal-500/30 hover:bg-teal-700/40 transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-teal-500/20 mb-3 sm:mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6 md:w-7 md:h-7">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{t('conclusion.benefits.care.title')}</h3>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base">
                      {t('conclusion.benefits.care.description')}
                    </p>
                  </div>
                  
                  {/* Card 3: Support */}
                  <div className="bg-teal-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-teal-500/30 hover:bg-teal-700/40 transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-teal-500/20 mb-3 sm:mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6 md:w-7 md:h-7">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                        <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{t('conclusion.benefits.support.title')}</h3>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base">
                      {t('conclusion.benefits.support.description')}
                    </p>
                  </div>
                </div>
                
                {/* CTA container */}
                <div className="bg-teal-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-teal-500/30 p-4 sm:p-6 md:p-8 mx-auto max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center">
                    {t('final-cta.title')}
                  </h3>
                  <p className="text-white/90 mb-6 sm:mb-8 text-center max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
                    {t('final-cta.description')}
                  </p>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={openModal}
                      className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base bg-white text-teal-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-teal-50 transform hover:-translate-y-1"
                    >
                      {t('conclusion.callToAction')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
    <ConsultModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default WhatIsHomeopathy;