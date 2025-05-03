import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const TermsConditions = () => {
  const { t } = useTranslation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90vw]">
        <div className="mx-auto text-start">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            {t('terms.title')}
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-8">
              {t('terms.lastUpdated')} {t('terms.updateDate')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.introduction.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.introduction.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.servicesDescription.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.servicesDescription.text')}
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>{t('terms.servicesDescription.items.consultations')}</li>
              <li>{t('terms.servicesDescription.items.prescriptions')}</li>
              <li>{t('terms.servicesDescription.items.followUp')}</li>
              <li>{t('terms.servicesDescription.items.education')}</li>
            </ul>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.userResponsibilities.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.userResponsibilities.text')}
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>{t('terms.userResponsibilities.items.accurate')}</li>
              <li>{t('terms.userResponsibilities.items.timely')}</li>
              <li>{t('terms.userResponsibilities.items.compliance')}</li>
              <li>{t('terms.userResponsibilities.items.respectful')}</li>
              <li>{t('terms.userResponsibilities.items.payment')}</li>
            </ul>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.appointments.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.appointments.text')}
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>{t('terms.appointments.items.scheduling')}</li>
              <li>{t('terms.appointments.items.cancellation')}</li>
              <li>{t('terms.appointments.items.lateness')}</li>
              <li>{t('terms.appointments.items.noShow')}</li>
            </ul>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.paymentTerms.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.paymentTerms.text')}
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>{t('terms.paymentTerms.items.fees')}</li>
              <li>{t('terms.paymentTerms.items.methods')}</li>
              <li>{t('terms.paymentTerms.items.timing')}</li>
              <li>{t('terms.paymentTerms.items.insurance')}</li>
            </ul>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.medicalDisclaimer.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.medicalDisclaimer.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.confidentiality.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.confidentiality.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.intellectualProperty.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.intellectualProperty.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.limitations.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.limitations.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.changes.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.changes.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.governingLaw.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.governingLaw.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('terms.contact.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('terms.contact.text')}
            </p>
            <ul className="list-none pl-0 mb-6 text-slate-600 space-y-2">
              <li>
                <strong>{t('terms.contact.email')}:</strong>{' '}
                <a 
                  href="mailto:korkachanna88@gmail.com" 
                  className="text-teal-600 hover:text-teal-700 transition-colors duration-300"
                >
                  korkachanna88@gmail.com
                </a>
              </li>
              <li>
                <strong>{t('terms.contact.phone')}:</strong>{' '}
                <a 
                  href="tel:+380996668866" 
                  className="text-teal-600 hover:text-teal-700 transition-colors duration-300"
                >
                  +380 99 666 8866
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;