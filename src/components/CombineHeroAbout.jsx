import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import HeroVideo from '../assets/hero.mp4';
import Doctor from '../assets/doc2.jpg';
import ConsultModal from './modals/consulte.jsx';
import telegramIcon from './../assets/telegram-svgrepo-com.svg'
import instagramIcon from './../assets/instagram-1-svgrepo-com.svg'
import viberIcon from './../assets/viber-svgrepo-com.svg'
import gmailIcon from './../assets/gmail-svgrepo-com.svg'
import callIcon from './../assets/call-medicine-rounded-svgrepo-com.svg'

const CombinedHeroAbout = () => {
  const { t } = useTranslation();
  
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  
  // Refs
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const videoRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Smooth scroll function using the ref directly - no hash/ID needed
  const scrollToAboutSection = () => {
    if (aboutSectionRef.current) {
      const yOffset = -20; // Optional offset to adjust final scroll position
      const y = aboutSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Animate hero content on load
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 300);
    
    // Observer for about section
    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          aboutObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutSectionRef.current) {
      aboutObserver.observe(aboutSectionRef.current);
    }
    
    // Handle scroll to hide video when scrolled past hero section
    const handleScroll = () => {
      if (heroSectionRef.current && videoRef.current) {
        const heroRect = heroSectionRef.current.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > 0;
        
        // When hero is not visible, hide the video
        if (videoRef.current) {
          videoRef.current.style.display = isHeroVisible ? 'block' : 'none';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      if (aboutSectionRef.current) {
        aboutObserver.unobserve(aboutSectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Hero Section - with background color for bottom half */}
      <div className="relative w-full" ref={heroSectionRef}>
        {/* Background color for bottom half */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#bcc9ab] z-0"></div>
        
        {/* Hero Section - Video only appears within this container */}
        <div className="relative flex items-center justify-center w-full h-screen max-h-[700px] min-h-[500px] 2xl:min-h-[600px] overflow-hidden z-10">
          {/* Video Container - Fixed position but with display control */}
          <div className="absolute inset-0 flex justify-center overflow-hidden">
            <div className="w-full max-w-[90vw] h-full mx-auto relative">
              <video 
                ref={videoRef}
                className="absolute inset-0 object-cover mx-auto"
                style={{ 
                  position: 'fixed',
                  height: '100%',
                  width: '100%',
                  maxWidth: '90vw'
                }}
                autoPlay 
                loop 
                muted 
                playsInline
                controls={false}
              >
                <source src={HeroVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          
          {/* Hero Content Container */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8 max-w-[90vw] mx-auto">
            {/* Content Wrapper with Animation */}
            <div className={`transition-all duration-700 transform ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
              <div className={`transition-all duration-700 delay-200 transform ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            
            {/* Smooth Scroll Arrow with onClick handler - no href */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
              <div 
                onClick={scrollToAboutSection}
                className="cursor-pointer text-white/60 hover:text-white/90 transition-colors duration-300 animate-bounce"
              >
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
      </div>
      
      {/* About Section - no ID needed */}
      <section 
        ref={aboutSectionRef}
        className="relative py-16 md:py-24 bg-[#bcc9ab] w-full z-10"
      >
        <div className="container mx-auto px-4 sm:px-6 bg-white max-w-[90vw]">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 py-6 ">
            {/* Image Column */}
            <div className="lg:w-2/5 relative">
              <div 
                className={`relative transition-all duration-1000`}
                style={{ transitionDelay: '0.2s' }}
              >
                {/* Main Image with Border */}
                <div className="relative z-10 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-[1.01]">
                  <img 
                    src={Doctor}
                    alt={`${t('about.certifiedHomeopath')}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Experience Badge */}
                <div className="absolute top-3 lg:top-8 right-2 lg:-right-8 bg-teal-600 text-white py-2 lg:py-3 px-3 md:px-6 rounded-md shadow-lg z-20">
                  <span className="text-sm md:text-base font-medium">10 {t('about.yearsExperience', 'лет опыта')}</span>
                </div>
              </div>
            </div>
            
            {/* Text Column */}
            <div 
              className={`lg:w-3/5`}
              style={{ 
                animationDelay: '0.3s', 
                transitionDuration: '1s'
              }}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-teal-600 font-medium tracking-wider">{t('about.myWay')}</h4>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Анна Коркач</h2>
                  <p className="text-xl text-slate-600 italic">{t('about.certifiedHomeopath')}</p>
                  <div className="w-20 h-0.5 bg-teal-500 mt-4 mb-6"></div>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-slate-200 mb-6">
                  <button 
                    className={`pb-2 px-4 hover:cursor-pointer font-medium transition-colors duration-300 ${activeTab === 'story' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setActiveTab('story')}
                  >
                    {t('about.myStory')}
                  </button>
                  <button 
                    className={`pb-2 px-4 hover:cursor-pointer font-medium transition-colors duration-300 ${activeTab === 'approach' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setActiveTab('approach')}
                  >
                    {t('about.myApproachTab')}
                  </button>
                  <button 
                    className={`pb-2 px-4 hover:cursor-pointer font-medium transition-colors duration-300 ${activeTab === 'today' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setActiveTab('today')}
                  >
                    {t('about.today')}
                  </button>
                </div>
                
                {/* Tab Content */}
                <div className="tab-content">
                  {/* Story Tab */}
                  {activeTab === 'story' && (
                    <div className="space-y-4 text-start">
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.story.greeting')}
                      </p>
                      
                      <h3 className="text-2xl font-bold text-slate-800 mt-6 mb-3">{t('about.story.howICame')}</h3>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.story.throughSkepticism')}
                      </p>
                      
                      <h3 className="text-2xl font-bold text-slate-800 mt-6 mb-3">{t('about.story.doctorPath')}</h3>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.story.education')}
                      </p>
                      
                      <blockquote className="italic border-l-4 border-teal-500 pl-4 my-6 py-2 bg-slate-50 rounded-r-md text-slate-700">
                        "{t('about.story.doctorsOpinion')} {t('about.story.belief')}"
                      </blockquote>
                    </div>
                  )}
                  
                  {/* Approach Tab */}
                  {activeTab === 'approach' && (
                    <div className="space-y-4 text-start">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">{t('about.approach.turningPoint')}</h3>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.approach.sonProblem')}
                      </p>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.approach.tryHomeopathy')}
                      </p>
                      <p className="text-lg text-slate-700 leading-relaxed font-semibold">
                        {t('about.approach.resultWas')}
                      </p>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.approach.healingProcess')}
                      </p>
                      
                      <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 my-4">
                        <a href='https://www.instagram.com/p/C6IjWZhMvOV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D' type='_blank' className="text-slate-700 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                          </svg>
                          {t('about.approach.readMore')}
                        </a>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-800 mt-6 mb-3">{t('about.approach.myWayTitle')}</h3>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.approach.deeperUnderstanding')}
                      </p>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.approach.decidedToStudy')}
                      </p>
                    </div>
                  )}
                  
                  {/* Today Tab */}
                  {activeTab === 'today' && (
                    <div className="space-y-4 text-start">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">{t('about.today_part.todayTitle')}</h3>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.today_part.experience')}
                      </p>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.today_part.seeResults')}
                      </p>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {t('about.today_part.belief')}
                      </p>
                      
                      <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200 text-center">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{t('about.today_part.readyForHealth')}</h3>
                        <p className="text-lg text-slate-700 mb-6">
                          {t('about.today_part.bookNow')}
                        </p>
                        <button onClick={openModal} className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-md shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center mx-auto">
                          {t('hero.bookConsultation')}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 ml-2" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Social Media Links */}
                <div className="flex sm:flex-row flex-col items-center space-x-4 mt-8 pt-4 border-t border-slate-200">
                  <span className="text-slate-600">{t('about.contactMe')}:</span>

                  <div className="socials flex items-center space-x-4">
                    {/* Instagram */}
                  <a
                    href="https://www.instagram.com/dr_anna_korkach/"
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    <img src={instagramIcon} alt="" className='w-8 h-8 hover:scale-105 transition transition-all duration-300'/>
                  </a>

                  {/* Viber */}
                  <a
                    href="viber://chat?number=380996668866"
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    <img src={viberIcon} alt="" className='w-8 h-8 hover:scale-105 transition transition-all duration-300'/>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:homeolifeua@gmail.com"
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    <img src={gmailIcon} alt="" className='w-8 h-8 hover:scale-105 transition transition-all duration-300'/>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/annetta00000"
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    <img src={telegramIcon} alt="" className='w-8 h-8 hover:scale-105 transition transition-all duration-300'/>
                  </a>

                  {/* Phone/Mobile */}
                  <a
                    href="tel:+380996668866"
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    <img src={callIcon} alt="" className='w-8 h-8 hover:scale-105 transition transition-all duration-300'/>
                  </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CombinedHeroAbout;