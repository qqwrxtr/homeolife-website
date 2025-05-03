import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialsPreview = () => {
  const { t } = useTranslation();
  // Pull in the array of testimonials from your i18n JSON,
  // e.g. "testimonials": [ { quote, author, location }, … ]
  const testimonials = t('testimonials', { returnObjects: true });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayTimerRef = useRef(null);

  useEffect(() => {
    startAutoplayTimer();
    return () => {
      clearTimeout(autoplayTimerRef.current);
    };
  }, [activeIndex, testimonials.length]);

  const startAutoplayTimer = () => {
    clearTimeout(autoplayTimerRef.current);
    autoplayTimerRef.current = setTimeout(goToNext, 5000);
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

  return (
    <div className="bg-white p-2 flex flex-col items-center w-full pt-12">
      <div className="w-full max-w-[90vw] mb-12">
        <h2 className="text-3xl text-slate-800 text-center font-normal mb-3">
          {t('testimonialsText.testimonials', 'Testimonials')}
        </h2>
        <div className="w-full h-px bg-slate-300" />
      </div>

      <div
        className="relative max-w-6xl mx-auto w-full px-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative overflow-hidden min-h-[240px] w-full">
          <button
            onClick={goToPrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 text-slate-400 hover:text-slate-600 transition-colors duration-300 focus:outline-none z-20"
            aria-label={t('prevTestimonial', 'Previous testimonial')}
          >
            {/* left arrow svg */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 text-slate-400 hover:text-slate-600 transition-colors duration-300 focus:outline-none z-20"
            aria-label={t('nextTestimonial', 'Next testimonial')}
          >
            {/* right arrow svg */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`absolute w-full transition-all duration-500 ease-in-out flex justify-center ${
                idx === activeIndex
                  ? 'opacity-100 translate-x-0 z-10'
                  : idx < activeIndex
                    ? 'opacity-0 -translate-x-full z-0'
                    : 'opacity-0 translate-x-full z-0'
              }`}
            >
              <blockquote className="text-center px-2 max-w-5xl mx-6">
                <p className="text-[28px] font-normal text-slate-700 mb-8 leading-relaxed">
                  "{item.quote}"
                </p>
                <footer className="mt-8">
                  <p className="text-sm text-slate-600 font-normal">
                    — {item.author}
                    {item.location ? `, ${item.location}` : ''}
                  </p>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-0 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                idx === activeIndex
                  ? 'bg-slate-800'
                  : idx === activeIndex + 1
                    ? 'bg-slate-400'
                    : 'bg-slate-200'
              }`}
              aria-label={t('goToTestimonial', `Go to testimonial ${idx + 1}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPreview;
