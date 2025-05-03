import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const PrivacyPolicy = () => {
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
            {t('privacy.title')}
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-8">
              {t('privacy.lastUpdated')} {t('privacy.updateDate')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.introduction.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.introduction.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.informationCollected.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.informationCollected.text')}
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>{t('privacy.informationCollected.items.personalInfo')}</li>
              <li>{t('privacy.informationCollected.items.contactInfo')}</li>
              <li>{t('privacy.informationCollected.items.healthInfo')}</li>
              <li>{t('privacy.informationCollected.items.usage')}</li>
            </ul>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.useOfInformation.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.useOfInformation.text')}
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>{t('privacy.useOfInformation.items.provideServices')}</li>
              <li>{t('privacy.useOfInformation.items.communication')}</li>
              <li>{t('privacy.useOfInformation.items.improve')}</li>
              <li>{t('privacy.useOfInformation.items.legal')}</li>
            </ul>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.dataSharing.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.dataSharing.text')}
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>{t('privacy.dataSharing.items.serviceProviders')}</li>
              <li>{t('privacy.dataSharing.items.legalRequirements')}</li>
              <li>{t('privacy.dataSharing.items.consent')}</li>
            </ul>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.dataSecurity.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.dataSecurity.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.cookies.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.cookies.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.yourRights.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.yourRights.text')}
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>{t('privacy.yourRights.items.access')}</li>
              <li>{t('privacy.yourRights.items.correction')}</li>
              <li>{t('privacy.yourRights.items.deletion')}</li>
              <li>{t('privacy.yourRights.items.restriction')}</li>
              <li>{t('privacy.yourRights.items.objection')}</li>
              <li>{t('privacy.yourRights.items.portability')}</li>
            </ul>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.childrenPrivacy.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.childrenPrivacy.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.changes.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.changes.text')}
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mt-8 mb-4">
              {t('privacy.contact.title')}
            </h2>
            <p className="text-slate-600 mb-4">
              {t('privacy.contact.text')}
            </p>
            <ul className="list-none pl-0 mb-6 text-slate-600 space-y-2">
              <li>
                <strong>{t('privacy.contact.email')}:</strong>{' '}
                <a 
                  href="mailto:korkachanna88@gmail.com" 
                  className="text-teal-600 hover:text-teal-700 transition-colors duration-300"
                >
                  korkachanna88@gmail.com
                </a>
              </li>
              <li>
                <strong>{t('privacy.contact.phone')}:</strong>{' '}
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

export default PrivacyPolicy;