import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ConsultModal from './../../modals/consulte.jsx';
import blog_4 from '../../../assets/blog_4.jpg';

const Blog_4 = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  
  const pageRef = useRef(null);
  const sectionRefs = useRef([]);
  
  // Open consultation modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Setup intersection observer for page entry animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (pageRef.current) {
      observer.observe(pageRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Setup scroll observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -100px 0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionNumber = parseInt(sectionId.split('-')[1]);
          setActiveSection(sectionNumber);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all section elements
    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [isInView]); // Only setup after page animation completes

  // Format date for display
    const formatDate = (dateString) => {
    // read your stored language code
    const code = localStorage.getItem('i18nextLng') || 'ru';
    const LOCALE_MAP = { ru: 'ru-RU', ua: 'uk-UA' };
    const locale = LOCALE_MAP[code] || LOCALE_MAP.ru;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(locale, options);
  };

  return (
    <div 
      ref={pageRef}
      className={`relative min-h-screen bg-slate-50 transition-opacity text-start duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Hero Section */}
      <section className="relative">
        {/* Hero Image */}
        <div className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] w-full relative">
          <img 
            src={blog_4} 
            alt={t("usefullInfo.blog_4.title")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 text-white p-4 sm:p-6 md:p-10 lg:p-16">
            <div className="w-full max-w-[90vw] mx-auto">
              <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium bg-teal-500 text-white rounded-full mb-2 sm:mb-4">
                {t("usefullInfo.blog_4.category")}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 max-w-3xl leading-tight">
                {t("usefullInfo.blog_4.title")}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/90 mb-2 sm:mb-4">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  {t("usefullInfo.blog_4.author")}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {formatDate(t("usefullInfo.blog_4.date_published"))}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {t("usefullInfo.blog_4.read_time")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-white">
        <div className="w-full max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Introduction */}
              <div className="prose prose-lg prose-teal max-w-none">
                <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed mb-6 border-l-4 border-teal-500 pl-4 italic">
                  {t("usefullInfo.blog_4.intro")}
                </p>
                
                {/* Section 1 */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-5" id="section-1">
                    {t("usefullInfo.blog_4.sections.0.title")}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-slate-700 leading-relaxed">{t("usefullInfo.blog_4.sections.0.content")}</p>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base font-medium text-slate-800">{t("usefullInfo.blog_4.sections.0.details")}</p>
                  
                  <div className="bg-slate-50 p-3 sm:p-5 rounded-lg border border-slate-200 mb-4 sm:mb-5">
                    <ul className="space-y-2 sm:space-y-3">
                      {[0, 1, 2, 3].map((index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm sm:text-base text-slate-700">{t(`usefullInfo.blog_4.sections.0.list.${index}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="italic text-sm sm:text-base text-slate-600 border-l-4 border-teal-500 pl-3 sm:pl-4 py-1 sm:py-2">{t("usefullInfo.blog_4.sections.0.conclusion")}</p>
                </div>
                
                {/* Section 2 */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-5" id="section-2">
                    {t("usefullInfo.blog_4.sections.1.title")}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-slate-700 leading-relaxed">{t("usefullInfo.blog_4.sections.1.content")}</p>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base font-medium text-slate-800">{t("usefullInfo.blog_4.sections.1.remedy_example")}</p>
                  
                  <div className="bg-yellow-50 p-3 sm:p-5 rounded-lg border border-yellow-200 mb-4 sm:mb-5">
                    <ul className="space-y-2 sm:space-y-3">
                      {[0, 1, 2].map((index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm sm:text-base text-slate-700">{t(`usefullInfo.blog_4.sections.1.list.${index}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="italic text-sm sm:text-base text-slate-600 border-l-4 border-yellow-500 pl-3 sm:pl-4 py-1 sm:py-2">{t("usefullInfo.blog_4.sections.1.conclusion")}</p>
                </div>
                
                {/* Section 3 */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-5" id="section-3">
                    {t("usefullInfo.blog_4.sections.2.title")}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-slate-700 leading-relaxed">{t("usefullInfo.blog_4.sections.2.content")}</p>
                  
                  <div className="bg-purple-50 p-4 sm:p-5 rounded-lg border border-purple-200">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <p className="text-sm sm:text-base text-slate-700 font-medium mb-0">{t("usefullInfo.blog_4.sections.2.remedy_info")}</p>
                    </div>
                  </div>
                </div>
                
                {/* Section 4 */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-5" id="section-4">
                    {t("usefullInfo.blog_4.sections.3.title")}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-slate-700 leading-relaxed">{t("usefullInfo.blog_4.sections.3.content")}</p>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base font-medium text-slate-800">{t("usefullInfo.blog_4.sections.3.symptoms")}</p>
                  
                  <div className="bg-slate-50 p-3 sm:p-5 rounded-lg border border-slate-200 mb-4 sm:mb-5">
                    <ul className="space-y-2 sm:space-y-3">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm sm:text-base text-slate-700">{t(`usefullInfo.blog_4.sections.3.list.${index}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-3 sm:p-4 rounded-r-lg">
                    <p className="text-sm sm:text-base text-slate-700 mb-0">{t("usefullInfo.blog_4.sections.3.note")}</p>
                  </div>
                </div>
                
                {/* Section 5 */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-5" id="section-5">
                    {t("usefullInfo.blog_4.sections.4.title")}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-slate-700 leading-relaxed">{t("usefullInfo.blog_4.sections.4.content")}</p>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base font-medium text-slate-800">{t("usefullInfo.blog_4.sections.4.symptoms")}</p>
                  
                  <div className="bg-slate-50 p-3 sm:p-5 rounded-lg border border-slate-200 mb-4 sm:mb-5">
                    <ul className="space-y-2 sm:space-y-3">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm sm:text-base text-slate-700">{t(`usefullInfo.blog_4.sections.4.list.${index}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-3 sm:p-4 rounded-r-lg">
                    <p className="text-sm sm:text-base text-slate-700 mb-0">{t("usefullInfo.blog_4.sections.4.note")}</p>
                  </div>
                </div>
                
                {/* Section 6 */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-5" id="section-6">
                    {t("usefullInfo.blog_4.sections.5.title")}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-slate-700 leading-relaxed">{t("usefullInfo.blog_4.sections.5.content")}</p>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base font-medium text-slate-800">{t("usefullInfo.blog_4.sections.5.recommendations")}</p>
                  
                  <div className="bg-green-50 p-3 sm:p-5 rounded-lg border border-green-200 mb-0">
                    <ul className="space-y-2 sm:space-y-3">
                      {[0, 1, 2].map((index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm sm:text-base text-slate-700">{t(`usefullInfo.blog_4.sections.5.list.${index}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Section 7 */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-5" id="section-7">
                    {t("usefullInfo.blog_4.sections.6.title")}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-slate-700 leading-relaxed">{t("usefullInfo.blog_4.sections.6.content")}</p>
                  
                  <div className="bg-teal-50 p-3 sm:p-5 rounded-lg border border-teal-200 mb-0">
                    <ul className="space-y-2 sm:space-y-3">
                      {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                        <li key={index} className="flex items-start p-2 border-b border-teal-100 last:border-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm sm:text-base text-slate-700 italic">{t(`usefullInfo.blog_4.sections.6.remedies.${index}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Section 8 */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-5" id="section-8">
                    {t("usefullInfo.blog_4.sections.7.title")}
                  </h2>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-slate-700 leading-relaxed">{t("usefullInfo.blog_4.sections.7.content")}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="bg-teal-50 p-3 sm:p-4 rounded-lg border border-teal-100 flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm sm:text-base text-slate-700">{t(`usefullInfo.blog_4.sections.7.results.${index}`)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* CTA Question */}
                <div className="bg-teal-50 border-2 border-teal-100 p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl mb-6 sm:mb-8 relative mt-12 sm:mt-16">
                  <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-center text-slate-800 mb-4 sm:mb-6 mt-2 sm:mt-4">{t("usefullInfo.blog_4.cta.question")}</p>
                  <p className="text-sm sm:text-base text-center text-slate-700 mb-4 sm:mb-6">{t("usefullInfo.blog_4.cta.content")}</p>
                  <div className="text-center">
                    <button
                      onClick={openModal}
                      className="bg-teal-600 text-white hover:bg-teal-700 font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center text-sm sm:text-base"
                    >
                      {t("usefullInfo.blog_4.cta.button_text")}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Author Card */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-lg sm:text-xl mr-3 sm:mr-4 flex-shrink-0">
                      {t("usefullInfo.blog_4.author").split(' ').map(name => name[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">{t("usefullInfo.blog_4.author")}</h3>
                      <p className="text-xs sm:text-sm text-slate-500">{t("usefullInfo.tags")}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">{t("usefullInfo.subtags")}</p>
                  <button
                    onClick={openModal}
                    className="w-full bg-teal-50 text-teal-700 hover:bg-teal-100 font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-300 text-xs sm:text-sm border border-teal-100"
                  >
                    {t("hero.bookConsultation")}
                  </button>
                </div>
                
                {/* Table of Contents */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    {t('usefullInfo.taking')}
                  </h3>
                  <nav>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                        <li key={index} className="border-b border-slate-100 pb-1 sm:pb-2 last:border-0 last:pb-0">
                          <a 
                            href={`#section-${index + 1}`} 
                            className={`flex items-center hover:text-teal-600 transition-colors duration-200 ${
                              activeSection === index + 1 ? 'text-teal-600 font-medium' : 'text-slate-700'
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById(`section-${index + 1}`);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                                setActiveSection(index + 1);
                              }
                            }}
                          >
                            <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] sm:text-xs flex items-center justify-center mr-1 sm:mr-2 flex-shrink-0 ${
                              activeSection === index + 1 ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-700'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="line-clamp-1">
                              {t(`usefullInfo.blog_4.sections.${index}.title`)}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                {/* Related Tags */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Теги
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {t("usefullInfo.blog_4.seo.keywords", { returnObjects: true }).map((keyword, index) => (
                      <span key={index} className="bg-slate-100 text-slate-700 text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200 cursor-pointer">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 text-center mt-8 sm:mt-10 md:mt-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">{t("my-approach.finalCTA.title")}</h3>
            <p className="mb-4 sm:mb-5 md:mb-6 text-white/90 text-sm sm:text-base">{t("my-approach.finalCTA.description")}</p>
            <button
              onClick={openModal}
              className="bg-white text-teal-600 hover:bg-gray-100 font-medium px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-xs sm:text-sm md:text-base inline-flex items-center"
            >
              {t("hero.bookConsultation")}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-1.5 sm:ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Back to Blog Link */}
          <div className="mt-6 sm:mt-8 md:mt-10 text-center">
            <Link to="/usefullInfo" className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm sm:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {t("usefullInfo.backToBlog")}
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Blog_4;