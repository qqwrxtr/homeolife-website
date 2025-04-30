import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Doctor from '../assets/doctor.png';
import ConsultModal from './Modals/Consulte.jsx';

const AboutSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white w-full"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Image Column */}
          <div className="lg:w-2/5 relative">
            <div className="relative">
              {/* Main Image with Border */}
              <div className="relative z-10 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-[1.01]">
                <img 
                  src={Doctor}
                  alt={`${t('about.certifiedHomeopath')}`}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full bg-teal-100 opacity-30 z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-teal-200 opacity-20 z-0"></div>
              
              {/* Experience Badge */}
              <div className="absolute top-8 -right-4 md:-right-8 bg-teal-600 text-white py-3 px-6 rounded-md shadow-lg z-20">
                <span className="text-sm md:text-base font-medium">10 {t('about.yearsExperience', 'лет опыта')}</span>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="mt-8 space-y-4">
              <div className="bg-white p-5 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-teal-500">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{t('about.education')}</h3>
                <p className="text-slate-600">{t('about.universityName', 'Одесский национальный медицинский университет')}</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-teal-500">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{t('about.specialization')}</h3>
                <p className="text-slate-600">{t('about.specializationDetails', 'Сертифицированный гомеопат, интернатура в инфарктном отделении')}</p>
              </div>
            </div>
          </div>
          
          {/* Text Column */}
          <div className={`lg:w-3/5 ${isVisible ? 'animate-slideInRight' : 'opacity-0 translate-x-10'}`}
               style={{ animationDelay: '0.3s', transitionDuration: '1s' }}>
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
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {t('about.story.doctorsOpinion')}
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {t('about.story.belief')}
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
              <div className="flex items-center space-x-4 mt-8 pt-4 border-t border-slate-200">
                <span className="text-slate-600">{t('about.contactMe')}:</span>
                <a href="#" className="text-slate-600 hover:text-teal-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-600 hover:text-teal-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-600 hover:text-teal-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
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

export default AboutSection;