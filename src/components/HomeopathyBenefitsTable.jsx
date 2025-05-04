import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import bgimage from '../assets/123.png';

const HomeopathyBenefitsTable = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const bgRef = useRef(null);



  return (
    <section className='w-full flex justify-center'>
      <div className="max-w-[90vw] w-full">
        {/* Title Section - Completely separate from the parallax section */}
        <div className="mx-auto px-4 pt-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-2">
            {t('benefits.title')}
          </h2>
          <p className="text-slate-600 text-base italic mb-2">
            {t('benefits.subtitle')}
          </p>
          <div className="flex justify-center mt-6">
          <div>
              <div className="cursor-pointer transition-colors duration-300 animate-bounce">
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

        {/* Parallax Table Section - Completely separate */}
        <section
          ref={sectionRef}
          className="relative py-16 md:py-64 bg-white"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Background with parallax - Only applies to the table */}
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bgimage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              height: '1200px',
              top: '-10%',
              window: '90vw',
            }}
          />

          {/* Table Section */}
          <div className="container mx-auto px-4 relative">
            {/* white card */}
            <div className="mx-auto bg-white border border-slate-200 shadow-lg overflow-hidden px-6 py-10">
              {/* Modified grid layout - 3×2 with one larger cell */}
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Top row - 3 equal cells */}
                <div className="p-6 flex flex-col items-start md:border-t md:border-l md:border-r-0 border-t border-l border-r border-slate-400">
                  <div className="flex items-start mb-3">
                    
                    <h3 className="text-lg font-medium text-slate-800">
                      {t('benefits.individuality.title')}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm text-start">
                    {t('benefits.individuality.description')}
                  </p>
                </div>
                <div className="p-6 flex flex-col items-start md:border-t md:border-l border-t md:border-r-0 border-t border-l border-r border-slate-400">
                  <div className="flex items-start mb-3">
                    
                    <h3 className="text-lg font-medium text-slate-800">
                      {t('benefits.safety.title')}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm text-start">
                    {t('benefits.safety.description')}.{t('benefits.familySupport.description')}
                  </p>
                </div>
                <div className="p-6 flex flex-col items-start border-t border-l border-r border-slate-400">
                  <div className="flex items-start mb-3">
                    
                    <h3 className="text-lg font-medium text-slate-800">
                      {t('benefits.naturalRecovery.title')}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm text-start">
                    {t('benefits.naturalRecovery.description')}
                  </p>
                </div>

                {/* Bottom row - 2 cells: 2 regular columns and 1 larger column */}
                <div className="p-6 flex flex-col items-start border-t border-l md:border-r-0 border-r border-b border-slate-400 md:col-span-2">
                  <div className="flex items-start mb-3">
                    
                    <h3 className="text-lg font-medium text-slate-800">
                      {t('benefits.gentleAction.title')}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm text-start">
                    {t('benefits.gentleAction.description')}.{t('benefits.deepLevel.description')}
                  </p>
                </div>

                <div className="p-6 flex flex-col items-start border-x border-b border-slate-400">
                  <div className="flex items-start mb-3">
                    
                    <h3 className="text-lg font-medium text-slate-800">
                      {t('benefits.chronicConditions.title')}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm text-start">
                    {t('benefits.chronicConditions.description')}.{t('benefits.compatible.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default HomeopathyBenefitsTable;