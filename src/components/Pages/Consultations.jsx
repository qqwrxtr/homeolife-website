import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ConsultModal from '.././modals/consulte.jsx';
import bgHero from './../../assets/123321.jpg';

const Consultations = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const consultationsRef = useRef(null);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // For section highlight animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-slate-50" id="consultations" ref={consultationsRef}>
      {/* Hero Section - Modern, Full-width with Overlay */}
      <div 
        className="relative py-20 md:py-28 lg:py-32 overflow-hidden" 
        style={{
          backgroundImage: `url(${bgHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay with gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"
          style={{ zIndex: 1 }}
        ></div>
        
        <div className="container mx-auto px-4 max-w-[90vw] relative z-10 flex flex-col items-center justify-center text-center h-[500px]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            {t('consultations.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('consultations.subtitle')}
          </p>
          <button 
            onClick={openModal}
            className="bg-teal-500 text-white hover:bg-teal-600 font-medium px-8 py-3 md:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center"
          >
            {t('hero.bookConsultation')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-[90vw] mx-auto">
        {/* My Approach Section - Two-column layout */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                {t('consultations.individualApproach.title')}
              </h2>
              <div className="w-24 h-1 bg-teal-500 mb-8"></div>
              <p className="text-xl text-slate-700 leading-relaxed max-w-4xl text-center">
                {t('consultations.individualApproach.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-teal-500 hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <span className="flex justify-center items-center w-12 h-12 rounded-full bg-teal-500 text-white mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-semibold text-slate-800">
                    {t('consultations.uniqueness.title')}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed pl-16">
                  {t('consultations.uniqueness.description')}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-teal-500 hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <span className="flex justify-center items-center w-12 h-12 rounded-full bg-teal-500 text-white mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-semibold text-slate-800">
                    {t('consultations.noStandardPrescriptions.title')}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed pl-16">
                  {t('consultations.noStandardPrescriptions.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* What I Focus On Section - Card Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                {t('consultations.attention.title')}
              </h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t('consultations.attention.items', { returnObjects: true }).map((item, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-teal-500">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                        {index === 0 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        )}
                        {index === 1 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        )}
                        {index === 2 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                        {index === 3 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {index === 4 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                        {index === 5 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-700 leading-relaxed">{item}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section - Improved Card Design */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                {t('navigation.consultations')}
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                Подробное описание всех видов консультаций, которые я предлагаю
              </p>
              <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Primary Consultation */}
              <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-600"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center text-slate-800 mb-4">
                    {t('consultations.services.primaryConsultation.title')}
                  </h3>
                  <div className="h-1 w-16 bg-teal-200 mx-auto mb-6"></div>
                  <p className="text-center text-slate-600 font-medium mb-6">
                    {t('consultations.services.primaryConsultation.description')}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {t('consultations.services.primaryConsultation.items', { returnObjects: true }).map((item, index) => (
                      <li key={index} className="flex items-start bg-slate-50 p-3 rounded-lg">
                        <svg className="h-5 w-5 text-teal-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="ml-3 text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-slate-100 text-center">
                    <button 
                      onClick={openModal}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg w-full"
                    >
                      {t('hero.bookConsultation')}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Follow Up */}
              <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-700"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center text-slate-800 mb-4">
                    {t('consultations.services.followUp.title')}
                  </h3>
                  <div className="h-1 w-16 bg-teal-200 mx-auto mb-6"></div>
                  <ul className="space-y-3 mb-8">
                    {t('consultations.services.followUp.items', { returnObjects: true }).map((item, index) => (
                      <li key={index} className="flex items-start bg-slate-50 p-3 rounded-lg">
                        <svg className="h-5 w-5 text-teal-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="ml-3 text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-slate-100 text-center mt-auto">
                    <button 
                      onClick={openModal}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg w-full"
                    >
                      {t('hero.bookConsultation')}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Emergency */}
              <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-2 bg-gradient-to-r from-teal-600 to-teal-800"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center text-slate-800 mb-4">
                    {t('consultations.services.emergency.title')}
                  </h3>
                  <div className="h-1 w-16 bg-teal-200 mx-auto mb-6"></div>
                  <ul className="space-y-3 mb-8">
                    {t('consultations.services.emergency.items', { returnObjects: true }).map((item, index) => (
                      <li key={index} className="flex items-start bg-slate-50 p-3 rounded-lg">
                        <svg className="h-5 w-5 text-teal-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="ml-3 text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-slate-100 text-center">
                    <button 
                      onClick={openModal}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg w-full"
                    >
                      {t('hero.bookConsultation')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section - Modern Timeline Design */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                {t('consultations.benefits.title')}
              </h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
            </div>
            
            <div className="relative">
              {/* Vertical line for timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-200 hidden md:block"></div>
              
              <div className="-space-y-6">
                {t('consultations.benefits.items', { returnObjects: true }).map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="md:w-1/2 relative">
                      {/* Circle marker on timeline */}
                      
                      <div className={`bg-white shadow-lg rounded-xl p-6 md:p-8 ml-0 ${index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'} relative z-10 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border-t-4 border-teal-500`}>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-4">
                            <span className="text-xl font-bold">{index + 1}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800">{item.split('.')[0]}</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed pl-16">
                          {item.split('.').slice(1).join('.').trim()}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                ))}
              </div>
              
              {/* Call to action */}
              <div className="mt-16 text-center">
                <button 
                  onClick={openModal}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform inline-flex items-center"
                >
                  {t('hero.bookConsultation')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section - Modern Card Design */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300">
              <div className="p-8 md:p-12 text-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {t('consultations.pricing.title')}
                  </h2>
                  <div className="w-24 h-1 bg-white/30 mx-auto"></div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="text-center lg:text-left">
                      <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm py-5 px-8 rounded-xl mb-8">
                        <span className="text-5xl font-bold">3500 грн</span>
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-6">
                        {t('consultations.pricing.included.title')}
                      </h3>
                      
                      <ul className="space-y-4 mb-8">
                        {t('consultations.pricing.included.items', { returnObjects: true }).map((item, index) => (
                          <li key={index} className="flex items-start bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                            <svg className="h-6 w-6 text-white mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span className="ml-3 text-white/90">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="bg-teal-900/40 text-white font-semibold text-lg p-4 rounded-lg mb-6 inline-block">
                        {t('consultations.pricing.discount')}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                      <p className="text-xl text-white/90 mb-8 leading-relaxed">
                        {t('consultations.conclusion.description')}
                      </p>
                      
                      <button
                        onClick={openModal}
                        className="w-full bg-white text-teal-700 hover:bg-teal-50 font-medium py-4 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center text-lg"
                      >
                        {t('consultations.cta.buttonText')}
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Consultation Modal */}
      <ConsultModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Add CSS for animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Consultations;