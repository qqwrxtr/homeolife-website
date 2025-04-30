import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ConsultModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1234] flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full m-4 p-6 transform transition-all duration-300 ease-in-out animate-fadeIn">
        {/* Close button */}
        <button 
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 rounded-full p-1 hover:cursor-pointer"
          onClick={onClose}
          aria-label={t('modal.close')}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Modal Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800">{t('modal.consultation')}</h3>
          <div className="mt-2">
            <p className="text-slate-600">
              {t('modal.fillForm')}
            </p>
          </div>
        </div>
        
        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
              {t('modal.yourName')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={t('modal.yourName')}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="phone">
              {t('modal.phoneNumber')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="+380 XX XXX XX XX"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
              {t('modal.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="example@mail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="message">
              {t('modal.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={t('modal.messagePlaceholder')}
            ></textarea>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full hover:cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center"
            >
              <span>{t('modal.submit')}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultModal;