import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ConsultModal from './../modals/consulte.jsx';
import HeroImage from './../../assets/wjhatgudsa.jpg';

const HowIWork = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCondition, setActiveCondition] = useState(null);
    const [activeSection, setActiveSection] = useState(null);
    const [isInView, setIsInView] = useState(false);
    const [conditions, setConditions] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const conditionsRef = useRef({});
    const sectionRefs = useRef({});
    
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

    // Get conditions from translation
    useEffect(() => {
        const getConditions = () => {
            try {
                const translatedConditions = t('how_i_work.conditions', { returnObjects: true });
                return Array.isArray(translatedConditions) ? translatedConditions : [];
            } catch (error) {
                console.error("Error accessing conditions:", error);
                return [];
            }
        };

        const conditionsList = getConditions();
        setConditions(conditionsList);

        // Set initial active condition
        if (conditionsList.length > 0) {
            setActiveCondition(conditionsList[0].id);
        }
    }, [t]);

    // Setup intersection observer for active section tracking
    useEffect(() => {
        if (!conditions.length) return;

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        setActiveSection(sectionId);

                        // Find and set the parent condition as active
                        const parentCondition = conditions.find(c =>
                            sectionId === c.id || sectionId.startsWith(`section-${c.id}`)
                        );

                        if (parentCondition) {
                            setActiveCondition(parentCondition.id);
                        }
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-100px 0px -200px 0px" }
        );

        // Observe all section elements
        Object.values(sectionRefs.current).forEach(ref => {
            if (ref) {
                sectionObserver.observe(ref);
            }
        });

        // Also observe the main condition elements
        Object.values(conditionsRef.current).forEach(ref => {
            if (ref) {
                sectionObserver.observe(ref);
            }
        });

        return () => sectionObserver.disconnect();
    }, [conditions]);

    const scrollToCondition = (conditionId) => {
        setActiveCondition(conditionId);

        if (conditionsRef.current[conditionId]) {
            conditionsRef.current[conditionId].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Get icon for section based on type
    const getSectionIcon = (type) => {
        const icons = {
            'reasons': (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                </svg>
            ),
            'help': (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 011-1 1.5 1.5 0 10-1.471-1.794l-1.962-.393A3.5 3.5 0 1113 13.355z" />
                </svg>
            ),
            'children': (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a5 5 0 11-5 5 5 5 0 015-5zm7 14a5 5 0 00-10 0v4h10v-4zM15.9 8a2.9 2.9 0 013 3 2.9 2.9 0 01-3 3 2.9 2.9 0 01-3-3 2.9 2.9 0 013-3zM19 21v-3a5 5 0 00-6.18-4.85 7 7 0 012.68 5.85v2h3.5zM8.1 8a2.9 2.9 0 013 3 2.9 2.9 0 01-3 3 2.9 2.9 0 01-3-3 2.9 2.9 0 013-3zM5 21v-3a5 5 0 016.18-4.85 7 7 0 00-2.68 5.85v2H5z" />
                </svg>
            ),
            'women': (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 15.934A7.501 7.501 0 0112 1a7.5 7.5 0 011 14.934V18h5v2h-5v4h-2v-4H6v-2h5v-2.066zM12 14a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" />
                </svg>
            ),
            'strengths': (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22l-3.536-3.536 1.415-1.414L12 19.172l7.071-7.071 1.415 1.414L12 22zM3 3h4v4H3V3zm14 0h4v4h-4V3zm0 14h4v4h-4v-4zM3 17h4v4H3v-4zM7 7h10v10H7V7zm2 2v6h6V9H9z" />
                </svg>
            ),
            'conditions': (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 2v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 01-.993.993H3.993A.994.994 0 013 21.007V4.993C3 4.445 3.445 4 3.993 4H7V2h10zm-4 9h-2v2H9v2h2v2h2v-2h2v-2h-2v-2zm2-7H9v2h6V4z" />
                </svg>
            ),
            'attention': (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
                </svg>
            ),
            'default': (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" />
                </svg>
            )
        };

        return icons[type] || icons.default;
    };

    // Generate a unique illustration for each condition
    const getConditionIllustration = (conditionId, index) => {
        const illustrations = [
            <div className="relative w-full h-36 sm:h-48 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg overflow-hidden">
                <div className="absolute top-4 left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-200 opacity-70"></div>
                <div className="absolute bottom-8 right-12 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-blue-200 opacity-60"></div>
                <div className="absolute top-1/2 left-1/3 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-indigo-200 opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-4 sm:top-6 right-6 sm:right-8 text-3xl sm:text-4xl text-teal-400 font-bold">{index + 1}</div>
            </div>,
            <div className="relative w-full h-36 sm:h-48 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-green-100 opacity-60"></div>
                <div className="absolute top-6 left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-300 opacity-70"></div>
                <div className="absolute bottom-8 right-8 sm:bottom-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-300 opacity-60"></div>
                <div className="absolute top-1/3 right-1/4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-200 opacity-80"></div>
                <div className="absolute top-4 sm:top-6 right-6 sm:right-8 text-3xl sm:text-4xl text-green-500 font-bold">{index + 1}</div>
            </div>,
            <div className="relative w-full h-36 sm:h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-bl-full bg-blue-200 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 rounded-tr-full bg-indigo-200 opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-violet-200 opacity-70 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-4 sm:top-6 right-6 sm:right-8 text-3xl sm:text-4xl text-blue-500 font-bold">{index + 1}</div>
            </div>,
            <div className="relative w-full h-36 sm:h-48 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-amber-200 opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-200 opacity-60"></div>
                <div className="absolute top-1/2 right-1/3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-200 opacity-70"></div>
                <div className="absolute top-4 sm:top-6 right-6 sm:right-8 text-3xl sm:text-4xl text-amber-500 font-bold">{index + 1}</div>
            </div>,
            <div className="relative w-full h-36 sm:h-48 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-12 sm:h-16 bg-pink-100 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 rounded-tl-full bg-rose-200 opacity-50"></div>
                <div className="absolute top-1/2 left-1/3 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-fuchsia-200 opacity-60"></div>
                <div className="absolute top-4 sm:top-6 right-6 sm:right-8 text-3xl sm:text-4xl text-pink-500 font-bold">{index + 1}</div>
            </div>,
            <div className="relative w-full h-36 sm:h-48 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-emerald-100 opacity-60"></div>
                <div className="absolute top-6 left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-200 opacity-60"></div>
                <div className="absolute bottom-12 right-12 sm:bottom-16 sm:right-16 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-200 opacity-70"></div>
                <div className="absolute top-4 sm:top-6 right-6 sm:right-8 text-3xl sm:text-4xl text-emerald-500 font-bold">{index + 1}</div>
            </div>
        ];

        // Use modulo to cycle through illustrations if we have more conditions than illustrations
        return illustrations[index % illustrations.length];
    };

    return (
        <div
            ref={containerRef}
            className={`min-h-screen w-full bg-white transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Rest of your component remains the same */}
            {/* Hero Section */}
            <section className="relative w-full min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] overflow-hidden bg-teal-800 text-white">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url(${HeroImage})`,
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
                            {t('how_i_work.title')}
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                            {t('how_i_work.title')}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-6xl mx-auto mb-6 sm:mb-8">
                            {t('how_i_work.description')}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">              
                            <button 
                                onClick={openModal}
                                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg bg-white text-teal-700 hover:bg-teal-50 transition-colors rounded-full font-semibold shadow-lg hover:shadow-xl duration-300"
                            >
                                {t('hero.bookConsultation')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation + Content Section */}
            <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw]">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
                    {/* Navigation Sidebar */}
                    <div className="lg:w-1/4 flex flex-col">
                        <div className="sticky top-16 sm:top-20 md:top-24 bg-white p-3 sm:p-4 rounded-xl shadow-md">
                            <h2 className="text-lg sm:text-xl font-bold text-teal-700 mb-3 sm:mb-4 border-b border-teal-100 pb-2 text-start">
                                {t('how_i_work.title')}
                            </h2>
                            <ul className="space-y-1 sm:space-y-2">
                                {conditions.map((condition, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => scrollToCondition(condition.id)}
                                            className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base ${activeCondition === condition.id
                                                ? 'bg-teal-100 text-teal-700 font-medium'
                                                : 'text-slate-700 hover:bg-slate-100'
                                                }`}
                                        >
                                            {condition.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-teal-50 rounded-lg">
                                <p className="text-xs sm:text-sm text-teal-700 font-medium">{t('how_i_work.cta')}</p>
                                <button
                                    onClick={openModal}
                                    className="mt-2 sm:mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-md shadow transition-colors duration-300 text-xs sm:text-sm"
                                >
                                    {t('hero.bookConsultation')}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="space-y-10 sm:space-y-12 md:space-y-16">
                            {conditions.map((condition, index) => (
                                <div
                                    key={index}
                                    id={condition.id}
                                    ref={(el) => {
                                        conditionsRef.current[condition.id] = el;
                                        sectionRefs.current[condition.id] = el;
                                    }}
                                    className={`scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24 ${activeSection === condition.id
                                        ? 'opacity-100 transition-opacity duration-500'
                                        : 'opacity-95'
                                        }`}
                                >
                                    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-5 md:p-6 border border-gray-100">
                                        {/* Condition number indicator */}
                                        <div className="absolute -left-2 sm:-left-4 md:-left-6 top-5 sm:top-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base shadow-md">
                                            {index + 1}
                                        </div>

                                        {/* Condition content */}
                                        <div className="pl-0 sm:pl-8 md:pl-10">
                                            <div className="mb-4 sm:mb-6 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
                                                <div className="w-full">
                                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-3 sm:mb-4 mt-8 sm:mt-0">{condition.title}</h2>
                                                    <p className="text-sm sm:text-base md:text-lg text-slate-700 mb-4 sm:mb-6 leading-relaxed">{condition.description}</p>
                                                </div>
                                            </div>

                                            {/* Render condition items if they exist */}
                                            {Array.isArray(condition.items) && condition.items.length > 0 && (
                                                <div className="mb-6 sm:mb-8 bg-gradient-to-r from-teal-50 to-teal-100 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl">
                                                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-teal-800 mb-3 sm:mb-4 flex items-center">
                                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                        </svg>
                                                        {t('how_i_work.helpsWith', 'Помогает при:')}
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                                        {condition.items.map((item, itemIndex) => (
                                                            <div
                                                                key={itemIndex}
                                                                className="flex items-start p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-sm border-l-4 border-teal-500"
                                                            >
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="text-xs sm:text-sm md:text-base text-slate-700 font-medium text-start">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Render symptoms if they exist */}
                                            {condition.symptoms && (
                                                <div className="mb-6 sm:mb-8 bg-teal-50 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl">
                                                    <div className="flex items-center mb-3 sm:mb-4 justify-center">
                                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                                                        </svg>
                                                        {condition.symptoms.title && (
                                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-teal-800">
                                                                {condition.symptoms.title}
                                                            </h3>
                                                        )}
                                                    </div>

                                                    {Array.isArray(condition.symptoms) && condition.symptoms.length > 0 && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                                            {condition.symptoms.map((item, itemIndex) => (
                                                                <div
                                                                    key={itemIndex}
                                                                    className="flex items-start p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-sm"
                                                                >
                                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                    <span className="text-xs sm:text-sm md:text-base text-teal-900 text-start">{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {Array.isArray(condition.symptoms.items) && condition.symptoms.items.length > 0 && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                                            {condition.symptoms.items.map((item, itemIndex) => (
                                                                <div
                                                                    key={itemIndex}
                                                                    className="flex items-start p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-sm"
                                                                >
                                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                    <span className="text-xs sm:text-sm md:text-base text-teal-900 text-start">{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Render reasons section if it exists */}
                                            {condition.reasons && (
                                                <div
                                                    id={`section-${condition.id}-reasons`}
                                                    ref={el => sectionRefs.current[`${condition.id}-reasons`] = el}
                                                    className="mb-6 sm:mb-8 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border-l-4 border-amber-500 shadow-md"
                                                >
                                                    <div className="flex items-center mb-3 sm:mb-4 justify-center">
                                                        {getSectionIcon('reasons')}
                                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 ml-2 sm:ml-3">
                                                            {condition.reasons.title}
                                                        </h3>
                                                    </div>

                                                    {condition.reasons.description && (
                                                        <p className="text-xs sm:text-sm md:text-base text-slate-700 mb-3 sm:mb-4 md:mb-5 pl-2 sm:pl-8 md:pl-9">{condition.reasons.description}</p>
                                                    )}

                                                    {Array.isArray(condition.reasons.items) && condition.reasons.items.length > 0 && (
                                                        <div className="bg-amber-50 rounded-lg p-3 sm:p-4 md:p-5">
                                                            <ul className="space-y-2 sm:space-y-3 pl-2 sm:pl-8 md:pl-9">
                                                                {condition.reasons.items.map((item, itemIndex) => (
                                                                    <li
                                                                        key={itemIndex}
                                                                        className="flex items-start"
                                                                    >
                                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span className="text-xs sm:text-sm md:text-base text-slate-800">{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Render help section if it exists */}
                                            {condition.help && (
                                                <div
                                                    id={`section-${condition.id}-help`}
                                                    ref={el => sectionRefs.current[`${condition.id}-help`] = el}
                                                    className="mb-6 sm:mb-8 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-teal-200 shadow-sm"
                                                >
                                                    <div className="flex items-center mb-3 sm:mb-4 justify-center">
                                                        {getSectionIcon('help')}
                                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-teal-800 ml-2 sm:ml-3">
                                                            {condition.help.title}
                                                        </h3>
                                                    </div>

                                                    {condition.help.description && (
                                                        <p className="text-xs sm:text-sm md:text-base text-teal-800 mb-3 sm:mb-4 md:mb-5 pl-2 sm:pl-8 md:pl-9">{condition.help.description}</p>
                                                    )}

                                                    {Array.isArray(condition.help.items) && condition.help.items.length > 0 && (
                                                        <div className="bg-white/60 p-3 sm:p-4 md:p-5 rounded-lg">
                                                            <ul className="space-y-2 sm:space-y-3 pl-2 sm:pl-8 md:pl-9">
                                                                {condition.help.items.map((item, itemIndex) => (
                                                                    <li
                                                                        key={itemIndex}
                                                                        className="flex items-start"
                                                                    >
                                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span className="text-xs sm:text-sm md:text-base text-teal-900 text-start">{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {condition.help.note && (
                                                        <div className="mt-3 sm:mt-4 bg-white p-2 sm:p-3 md:p-4 rounded-lg border-l-4 border-teal-500 ml-3 sm:ml-8 md:ml-9">
                                                            <p className="text-xs sm:text-sm text-teal-800 italic">{condition.help.note}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Render children section for Women's and Children's Health */}
                                            {condition.children && (
                                                <div
                                                    id={`section-${condition.id}-children`}
                                                    ref={el => sectionRefs.current[`${condition.id}-children`] = el}
                                                    className="mb-6 sm:mb-8 bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-blue-200 shadow-sm"
                                                >
                                                    <div className="flex items-center mb-3 sm:mb-4 justify-center">
                                                        {getSectionIcon('children')}
                                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-800 ml-2 sm:ml-3">
                                                            {condition.children.title}
                                                        </h3>
                                                    </div>

                                                    {condition.children.description && (
                                                        <p className="text-xs sm:text-sm md:text-base text-blue-800 mb-3 sm:mb-4 md:mb-5 pl-2 sm:pl-8 md:pl-9">{condition.children.description}</p>
                                                    )}

                                                    {Array.isArray(condition.children.items) && condition.children.items.length > 0 && (
                                                        <div className="bg-white/60 p-3 sm:p-4 md:p-5 rounded-lg">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                                                                {condition.children.items.map((item, itemIndex) => (
                                                                    <div
                                                                        key={itemIndex}
                                                                        className="flex items-start p-2 sm:p-3 bg-blue-100/50 rounded-lg"
                                                                    >
                                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span className="text-xs sm:text-sm md:text-base text-blue-900 text-start">{item}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {condition.children.note && (
                                                        <div className="mt-3 sm:mt-4 bg-white p-2 sm:p-3 md:p-4 rounded-lg border-l-4 border-blue-400 ml-6 sm:ml-8 md:ml-9">
                                                            <p className="text-xs sm:text-sm text-blue-800 italic">{condition.children.note}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {condition.women && (
                                                <div
                                                    id={`section-${condition.id}-women`}
                                                    ref={el => sectionRefs.current[`${condition.id}-women`] = el}
                                                    className="mb-6 sm:mb-8 bg-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-pink-200 shadow-sm"
                                                >
                                                    <div className="flex items-center mb-3 sm:mb-4 justify-center">
                                                        {getSectionIcon('women')}
                                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-pink-800 ml-2 sm:ml-3">
                                                            {condition.women.title}
                                                        </h3>
                                                    </div>

                                                    {condition.women.description && (
                                                        <p className="text-xs sm:text-sm md:text-base text-pink-800 mb-3 sm:mb-4 md:mb-5 pl-2 sm:pl-8 md:pl-9">{condition.women.description}</p>
                                                    )}

                                                    {condition.women.requests && (
                                                        <div className="pl-2 sm:pl-8 md:pl-9">
                                                            {condition.women.requests.title && (
                                                                <h4 className="text-sm sm:text-base md:text-lg font-medium text-pink-800 mb-2 sm:mb-3 flex items-center">
                                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                    {condition.women.requests.title}
                                                                </h4>
                                                            )}

                                                            {Array.isArray(condition.women.requests.items) && condition.women.requests.items.length > 0 && (
                                                                <div className="bg-white/60 p-2 sm:p-3 md:p-4 rounded-lg">
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                                                                        {condition.women.requests.items.map((item, itemIndex) => (
                                                                            <div
                                                                                key={itemIndex}
                                                                                className="flex items-start p-2 sm:p-3 bg-pink-100/50 rounded-lg"
                                                                            >
                                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                                </svg>
                                                                                <span className="text-xs sm:text-sm md:text-base text-pink-900 text-start">{item}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {condition.women.note && (
                                                        <div className="mt-3 sm:mt-4 bg-white p-2 sm:p-3 md:p-4 rounded-lg border-l-4 border-pink-400 ml-2 sm:ml-8 md:ml-9">
                                                            <p className="text-xs sm:text-sm text-pink-800 italic">{condition.women.note}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Render strengths section */}
                                            {condition.strengths && (
                                                <div
                                                    id={`section-${condition.id}-strengths`}
                                                    ref={el => sectionRefs.current[`${condition.id}-strengths`] = el}
                                                    className="mb-6 sm:mb-8 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-green-200 shadow-sm"
                                                >
                                                    <div className="flex items-center mb-3 sm:mb-4 justify-center">
                                                        {getSectionIcon('strengths')}
                                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-800 ml-2 sm:ml-3">
                                                            {condition.strengths.title}
                                                        </h3>
                                                    </div>

                                                    {Array.isArray(condition.strengths.items) && condition.strengths.items.length > 0 && (
                                                        <div className="bg-white/60 p-3 sm:p-4 md:p-5 rounded-lg">
                                                            <ul className="space-y-2 sm:space-y-3 pl-2 sm:pl-8 md:pl-9">
                                                                {condition.strengths.items.map((item, itemIndex) => (
                                                                    <li
                                                                        key={itemIndex}
                                                                        className="flex items-start"
                                                                    >
                                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span className="text-xs sm:text-sm md:text-base text-green-900">{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {condition.strengths.note && (
                                                        <div className="mt-3 sm:mt-4 bg-white p-2 sm:p-3 md:p-4 rounded-lg border-l-4 border-green-500 ml-2 sm:ml-8 md:ml-9">
                                                            <p className="text-xs sm:text-sm text-green-800 italic">{condition.strengths.note}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Render conditions section for recovery */}
                                            {condition.conditions && (
                                                <div
                                                    id={`section-${condition.id}-conditions`}
                                                    ref={el => sectionRefs.current[`${condition.id}-conditions`] = el}
                                                    className="mb-6 sm:mb-8 bg-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-indigo-200 shadow-sm"
                                                >
                                                    <div className="flex items-center mb-3 sm:mb-4 justify-center">
                                                        {getSectionIcon('conditions')}
                                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-indigo-800 ml-2 sm:ml-3">
                                                            {condition.conditions.title}
                                                        </h3>
                                                    </div>

                                                    {/* Surgery section */}
                                                    {condition.conditions.surgery && (
                                                        <div className="mb-4 sm:mb-5 md:mb-6 pl-2 sm:pl-8 md:pl-9">
                                                            <h4 className="text-sm sm:text-base md:text-lg font-medium text-indigo-800 mb-2 sm:mb-3 flex items-center">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                </svg>
                                                                {condition.conditions.surgery.title}
                                                            </h4>

                                                            {Array.isArray(condition.conditions.surgery.items) && condition.conditions.surgery.items.length > 0 && (
                                                                <div className="bg-white/60 p-2 sm:p-3 md:p-4 rounded-lg">
                                                                    <ul className="space-y-1 sm:space-y-2">
                                                                        {condition.conditions.surgery.items.map((item, itemIndex) => (
                                                                            <li
                                                                                key={itemIndex}
                                                                                className="flex items-start"
                                                                            >
                                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                                </svg>
                                                                                <span className="text-xs sm:text-sm md:text-base text-indigo-900">{item}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Injury section */}
                                                    {condition.conditions.injury && (
                                                        <div className="pl-2 sm:pl-8 md:pl-9">
                                                            <h4 className="text-sm sm:text-base md:text-lg font-medium text-indigo-800 mb-2 sm:mb-3 flex items-center">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                                                                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                                                                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                                                                </svg>
                                                                {condition.conditions.injury.title}
                                                            </h4>

                                                            {Array.isArray(condition.conditions.injury.items) && condition.conditions.injury.items.length > 0 && (
                                                                <div className="bg-white/60 p-2 sm:p-3 md:p-4 rounded-lg">
                                                                    <ul className="space-y-1 sm:space-y-2">
                                                                        {condition.conditions.injury.items.map((item, itemIndex) => (
                                                                            <li
                                                                                key={itemIndex}
                                                                                className="flex items-start"
                                                                            >
                                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                                </svg>
                                                                                <span className="text-xs sm:text-sm md:text-base text-indigo-900">{item}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {condition.attention && (
                                                <div
                                                    id={`section-${condition.id}-attention`}
                                                    ref={el => sectionRefs.current[`${condition.id}-attention`] = el}
                                                    className="mb-6 sm:mb-8 bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-amber-200 shadow-sm"
                                                >
                                                    <div className="flex items-center mb-3 sm:mb-4 justify-center">
                                                        {getSectionIcon('attention')}
                                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-amber-800 ml-2 sm:ml-3">
                                                            {condition.attention.title}
                                                        </h3>
                                                    </div>

                                                    {/* Metabolism section */}
                                                    {condition.attention.metabolism && (
                                                        <div className="mb-4 sm:mb-5 md:mb-6 pl-2 sm:pl-8 md:pl-9">
                                                            <h4 className="text-sm sm:text-base md:text-lg font-medium text-amber-800 mb-2 sm:mb-3 flex items-center">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                                                </svg>
                                                                {condition.attention.metabolism.title}
                                                            </h4>

                                                            {Array.isArray(condition.attention.metabolism.items) && condition.attention.metabolism.items.length > 0 && (
                                                                <div className="bg-white/60 p-2 sm:p-3 md:p-4 rounded-lg">
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                                                                        {condition.attention.metabolism.items.map((item, itemIndex) => (
                                                                            <div
                                                                                key={itemIndex}
                                                                                className="flex items-start p-2 sm:p-3 bg-amber-100/50 rounded-lg"
                                                                            >
                                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                                </svg>
                                                                                <span className="text-xs sm:text-sm md:text-base text-amber-900 text-start">{item}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Immunity section */}
                                                    {condition.attention.immunity && (
                                                        <div className="pl-2 sm:pl-8 md:pl-9">
                                                            <h4 className="text-sm sm:text-base md:text-lg font-medium text-amber-800 mb-2 sm:mb-3 flex items-center">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                                                </svg>
                                                                {condition.attention.immunity.title}
                                                            </h4>

                                                            {Array.isArray(condition.attention.immunity.items) && condition.attention.immunity.items.length > 0 && (
                                                                <div className="bg-white/60 p-2 sm:p-3 md:p-4 rounded-lg">
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                                                                        {condition.attention.immunity.items.map((item, itemIndex) => (
                                                                            <div
                                                                                key={itemIndex}
                                                                                className="flex items-start p-2 sm:p-3 bg-amber-100/50 rounded-lg"
                                                                            >
                                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                                </svg>
                                                                                <span className="text-xs sm:text-sm md:text-base text-amber-900 text-start">{item}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* CTA Banner */}
                        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 text-white shadow-lg sm:shadow-xl">
                            <div className="flex flex-col items-center justify-between">
                                <div className="mb-3 sm:mb-4">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-center">{t('my-approach.finalCTA.title')}</h3>
                                    <p className="text-sm sm:text-base text-white/90 text-center">{t('how_i_work.cta')}</p>
                                </div>
                                <button
                                    onClick={openModal}
                                    className="bg-white text-teal-700 hover:bg-teal-50 font-medium px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center text-sm sm:text-base"
                                >
                                    {t('hero.bookConsultation')}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1.5 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ConsultModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default HowIWork;