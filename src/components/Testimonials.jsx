import { useState, useEffect, useRef, createRef } from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialsPreview = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials', { returnObjects: true });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const testimonialRefs = useRef([]);
  const autoplayTimerRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize refs array based on testimonials length
  useEffect(() => {
    testimonialRefs.current = Array(testimonials.length)
      .fill()
      .map((_, i) => testimonialRefs.current[i] || createRef());
  }, [testimonials.length]);

  // Auto-update height when window resizes or active testimonial changes
  useEffect(() => {
    const updateHeight = () => {
      if (testimonialRefs.current[activeIndex]?.current) {
        const height = testimonialRefs.current[activeIndex].current.offsetHeight;
        setContentHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [activeIndex, testimonials]);

  // Setup autoplay
  useEffect(() => {
    goToNext();
    startAutoplayTimer();
    return () => clearTimeout(autoplayTimerRef.current);
  }, []);

  const startAutoplayTimer = () => {
    clearTimeout(autoplayTimerRef.current);
    autoplayTimerRef.current = setTimeout(goToNext, 3000);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((idx) => (idx + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((idx) =>
      idx === 0 ? testimonials.length - 1 : idx - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleMouseEnter = () => {
    clearTimeout(autoplayTimerRef.current);
  };
  
  const handleMouseLeave = () => {
    startAutoplayTimer();
  };

  // Detect if device is touch-based (for mobile optimization)
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Handle touch swipe for mobile
  const touchStartX = useRef(null);
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    clearTimeout(autoplayTimerRef.current);
  };
  
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    touchStartX.current = null;
    startAutoplayTimer();
  };

  return (
    <div className="bg-white p-2 flex flex-col items-center w-full py-8 md:py-12">
      <div className="w-full max-w-[95vw] md:max-w-[90vw] mb-6 md:mb-12">
        <h2 className="text-2xl md:text-3xl text-slate-800 text-center font-normal mb-3">
          {t('testimonialsText.testimonials', 'Testimonials')}
        </h2>
        <div className="w-full h-px bg-slate-300" />
      </div>

      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto w-full px-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="relative overflow-hidden w-full transition-height duration-300 ease-in-out"
          style={{ minHeight: `${contentHeight + 40}px` }}
        >
          {/* Navigation arrows - hidden on mobile/touch devices */}
          {!isTouchDevice && (
            <>
              <button
                onClick={goToPrev}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 text-slate-400 hover:text-slate-600 transition-colors duration-300 focus:outline-none z-20 hidden md:block"
              >
                {/* left arrow svg */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 text-slate-400 hover:text-slate-600 transition-colors duration-300 focus:outline-none z-20 hidden md:block"
                aria-label={t('testimonialsText.nextTestimonial', 'Next testimonial')}
              >
                {/* right arrow svg */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
          
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              ref={testimonialRefs.current[idx]}
              className={`absolute w-full transition-all duration-500 ease-in-out flex justify-center ${
                idx === activeIndex
                  ? 'opacity-100 translate-x-0 z-10'
                  : idx < activeIndex
                    ? 'opacity-0 -translate-x-full z-0'
                    : 'opacity-0 translate-x-full z-0'
              }`}
            >
              <blockquote className="text-center px-2 max-w-5xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] font-normal text-slate-700 mb-4 md:mb-8 leading-relaxed">
                  "{item.quote}"
                </p>
                <footer className="mt-4 md:mt-8">
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    — {item.author}
                    {item.location ? `, ${item.location}` : ''}
                  </p>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Indicator dots - slightly larger on mobile for easier tapping */}
        <div className="flex justify-center mt-4 md:mt-0 space-x-3 md:space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${
                idx === activeIndex
                  ? 'bg-slate-800'
                  : 'bg-slate-200 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPreview;