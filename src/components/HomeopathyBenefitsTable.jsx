import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import bgimage from '../assets/123.png';

const HomeopathyBenefitsTable = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let frameId = 0;

    const animateParallax = () => {
      if (sectionRef.current && bgRef.current && contentRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // only animate when section is (partially) in view
        if (rect.top < windowHeight && rect.bottom > 0) {
          // you can tweak these multipliers (0.15 & 0.3) to taste
          const bgOffset      = -rect.top * 0.65;
          const contentOffset = -rect.top * 0.1;

          bgRef.current.style.transform      = `translate3d(0, ${bgOffset}px, 0)`;
          contentRef.current.style.transform = `translate3d(0, ${contentOffset}px, 0)`;
        }
      }

      frameId = requestAnimationFrame(animateParallax);
    };

    frameId = requestAnimationFrame(animateParallax);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-44 bg-white"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 mx-24"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '120%',
          top: '-10%',
          willChange: 'transform',
        }}
      />

      {/* Content layer */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 relative"
        style={{ willChange: 'transform' }}
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-slate-800 mb-2 text-center">
            {t('benefits.title')}
          </h2>
          <p className="text-slate-600 text-sm text-center italic">
            {t('benefits.subtitle')}
          </p>
          <div className="flex justify-center mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* white card */}
        <div className="mx-auto max-w-7xl bg-white border border-slate-200 shadow-lg overflow-hidden px-6 py-10">
          {/* 3×3 grid with dividing lines */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.individuality.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.individuality.description')}
              </p>
            </div>
            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.safety.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.safety.description')}
              </p>
            </div>
            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.naturalRecovery.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.naturalRecovery.description')}
              </p>
            </div>

            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.gentleAction.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.gentleAction.description')}
              </p>
            </div>

            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.compatible.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.compatible.description')}
              </p>
            </div>

            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.chronicConditions.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.chronicConditions.description')}
              </p>
            </div>

            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.deepLevel.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.deepLevel.description')}
              </p>
            </div>

            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.stableMethod.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.stableMethod.description')}
              </p>
            </div>

            <div className="p-6 flex flex-col items-start border border-black">
              <h3 className="text-lg font-medium text-slate-800 mb-2 text-start">
                {t('benefits.familySupport.title')}
              </h3>
              <p className="text-slate-600 text-sm text-start">
                {t('benefits.familySupport.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeopathyBenefitsTable;
