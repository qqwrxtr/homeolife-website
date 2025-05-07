import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ConsultModal from './../modals/consulte.jsx';
import doctorImage from '../../assets/doctor.png';
import telegramIcon from './../../assets/telegram-svgrepo-com.svg';
import instagramIcon from './../../assets/instagram-1-svgrepo-com.svg';
import viberIcon from './../../assets/viber-svgrepo-com.svg';
import gmailIcon from './../../assets/gmail-svgrepo-com.svg';
import callIcon from './../../assets/call-medicine-rounded-svgrepo-com.svg';

const MyApproach = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Refs for component elements
  const pageRef = useRef(null);
  
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
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div 
      ref={pageRef}
      className={`relative bg-white w-full min-h-screen transition-opacity duration-1000 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-[70vh] md:min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#bcc9ab] to-teal-700 opacity-90 z-0" />
        <div className="absolute inset-0 bg-[url('../assets/pattern-bg.png')] bg-repeat opacity-10 z-0" />
        
        <div className="relative z-10 mx-auto px-4 sm:px-6 max-w-[90vw] py-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {t('my-approach.welcome.title')}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
                {t('my-approach.welcome.description')}
              </p>
              <button 
                onClick={openModal}
                className="bg-white text-teal-600 hover:bg-slate-100 font-medium text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] flex items-center mx-auto md:mx-0"
              >
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
            
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={doctorImage}
                  alt="Dr. Anna Korkach"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Homeopathy History Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="mx-auto px-4 sm:px-6 max-w-[90vw]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-800 relative pl-0 md:pl-4">
                {t('my-approach.homeopathyHistory.title')}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                {t('my-approach.homeopathyHistory.description')}
              </p>
            </div>
            
            {/* Right Visual Element */}
            <div className="lg:w-1/2 flex justify-center w-full mt-8 lg:mt-0">
              <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-600 to-teal-400 shadow-lg p-6 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">200+</div>
                  <div className="text-lg sm:text-xl md:text-2xl mt-2">{t('my-approach.homeopathyHistory.notitle')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Classical Homeopathy Section - Combined Version */}
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50">
    <div className="mx-auto px-4 sm:px-6 max-w-[90vw]">
        <div className="flex flex-col items-center">
        {/* Combined Content */}
        <div className="w-full max-w-[90vw] mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-800 relative pl-0 md:pl-4 mb-6">
                {t('my-approach.classicalHomeopathy.title')}
            </h2>
            
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
            {t('my-approach.classicalHomeopathy.description')}
            </p>
            
            <div className="w-full p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-slate-200 mt-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-start">
                <div className="flex items-center p-3 sm:p-4 bg-teal-50 rounded-lg">
                <div className="mr-3 sm:mr-4 bg-teal-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-medium text-teal-900">{t('my-approach.homeopathyHistory.gentleApproach.title')}</h3>
                    <p className="text-sm text-teal-700">{t('my-approach.homeopathyHistory.gentleApproach.description')}</p>
                </div>
                </div>
                
                <div className="flex items-center p-3 sm:p-4 bg-teal-50 rounded-lg">
                <div className="mr-3 sm:mr-4 bg-teal-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-medium text-teal-900">{t('my-approach.homeopathyHistory.holisticTreatment.title')}</h3>
                    <p className="text-sm text-teal-700">{t('my-approach.homeopathyHistory.holisticTreatment.description')}</p>
                </div>
                </div>
                
                <div className="flex items-center p-3 sm:p-4 bg-teal-50 rounded-lg">
                <div className="mr-3 sm:mr-4 bg-teal-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-medium text-teal-900">{t('my-approach.homeopathyHistory.lastingEffects.title')}</h3>
                    <p className="text-sm text-teal-700">{t('my-approach.homeopathyHistory.lastingEffects.description')}</p>
                </div>
                </div>
                
                <div className="flex items-center p-3 sm:p-4 bg-teal-50 rounded-lg">
                <div className="mr-3 sm:mr-4 bg-teal-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-medium text-teal-900">{t('my-approach.homeopathyHistory.safeForFamilies.title')}</h3>
                    <p className="text-sm text-teal-700">{t('my-approach.homeopathyHistory.safeForFamilies.description')}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
      
      {/* Homeopathic Remedies Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="mx-auto px-4 sm:px-6 max-w-[90vw]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-800 relative pl-0 md:pl-4">
                {t('my-approach.homeopathicRemedies.title')}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                {t('my-approach.homeopathicRemedies.description')}
              </p>
            </div>
            
            {/* Right Visual Element */}
            <div className="lg:w-1/2 flex justify-center w-full mt-8 lg:mt-0">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <div className="aspect-square relative rounded-full overflow-hidden border-8 border-teal-100 shadow-lg">
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-400 animate-pulse" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-3 sm:p-5">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-slate-800">{t('my-approach.safe')}</h3>
                      <p className="text-sm text-slate-600">{t('my-approach.forAll')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    {/* My Advantages Section - Improved Layout */}
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw]">

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Main Feature Card */}
        <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            {/* Header with Experience Badge */}
            <div className="bg-teal-600 p-6 flex items-center justify-center flex-col md:flex-row">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-teal-600 text-3xl font-bold md:mr-5 flex-shrink-0 shadow-md">
                10
                </div>
                <div className="text-white">
                <h3 className="text-2xl font-bold">{t('my-approach.homeopathicRemedies.experienceTitle')}</h3>
                <p className="text-teal-50 mt-1">{t('my-approach.homeopathicRemedies.experienceSubtitle')}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 md:p-8">
                <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                {t('my-approach.homeopathicRemedies.experienceDescription')}
                </p>

                {/* Advantages Grid */}
                <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-teal-50 rounded-xl p-5 transform transition-transform hover:scale-105">
                    <div className="flex items-start">
                    <div className="bg-teal-600 rounded-lg p-3 mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-teal-900 mb-2 text-start">
                        {t('my-approach.homeopathicRemedies.education.title')}
                        </h4>
                        <p className="text-teal-700 text-start">
                        {t('my-approach.homeopathicRemedies.education.description')}
                        </p>
                    </div>
                    </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-5 transform transition-transform hover:scale-105">
                    <div className="flex items-start">
                    <div className="bg-teal-600 rounded-lg p-3 mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-teal-900 mb-2 text-start">
                        {t('my-approach.homeopathicRemedies.learning.title')}
                        </h4>
                        <p className="text-teal-700 text-start">
                        {t('my-approach.homeopathicRemedies.learning.description')}
                        </p>
                    </div>
                    </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-5 transform transition-transform hover:scale-105">
                    <div className="flex items-start">
                    <div className="bg-teal-600 rounded-lg p-3 mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-teal-900 mb-2 text-start">
                        {t('my-approach.homeopathicRemedies.techniques.title')}
                        </h4>
                        <p className="text-teal-700 text-start">
                        {t('my-approach.homeopathicRemedies.techniques.description')}
                        </p>
                    </div>
                    </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-5 transform transition-transform hover:scale-105">
                    <div className="flex items-start">
                    <div className="bg-teal-600 rounded-lg p-3 mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-teal-900 mb-2 text-start">
                        {t('my-approach.homeopathicRemedies.results.title')}
                        </h4>
                        <p className="text-teal-700 text-start">
                        {t('my-approach.homeopathicRemedies.results.description')}
                        </p>
                    </div>
                    </div>
                </div>
                </div>

                {/* Individual Approach Banner */}
                <div className="mt-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-medium">{t('my-approach.homeopathicRemedies.individualApproach')}</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
      
      {/* Individual Approach Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="mx-auto px-4 sm:px-6 max-w-[90vw]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-800 relative pl-0 md:pl-4">
                {t('my-approach.individualApproach.title')}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                {t('my-approach.individualApproach.description')}
              </p>
            </div>
            
            {/* Right Visual Element */}
            <div className="lg:w-1/2 flex justify-center w-full mt-8 lg:mt-0">
              <div className="w-full sm:max-w-md lg:max-w-none">
                <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-teal-500 rounded-full opacity-20 transform translate-x-10 -translate-y-10"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-teal-500 rounded-full opacity-20 transform -translate-x-10 translate-y-10"></div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t('my-approach.individualApproach.title')}</h3>
                  <ul className="space-y-3 sm:space-y-4 relative z-10">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400 mr-2 sm:mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm sm:text-base">{t('my-approach.individualApproach.bullet1')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400 mr-2 sm:mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-sm sm:text-base">{t('my-approach.individualApproach.bullet2')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400 mr-2 sm:mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm sm:text-base">{t('my-approach.individualApproach.bullet3')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400 mr-2 sm:mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm sm:text-base">{t('my-approach.individualApproach.bullet3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-teal-600 to-emerald-700 text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full opacity-10 transform -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full opacity-10 transform translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 mx-auto px-4 sm:px-6 max-w-[90vw]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t('my-approach.finalCTA.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              {t('my-approach.finalCTA.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={openModal}
                className="bg-white text-teal-600 hover:bg-slate-100 font-medium text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] flex items-center justify-center mx-auto sm:mx-0"
              >
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
        </div>
      </section>
      
      <ConsultModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default MyApproach;