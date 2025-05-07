import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const telegramService = {
  sendMessage: async (name, phone, contactMethod, token) => {
    try {
      const botToken = token || process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
      
      const text = `
      Новое сообщение с формы контактов (краткий) :
      - Имя : ${name}
      - Телефон : ${phone}
      - Предпочтительный метод связи : ${contactMethod}
      `;
      
      const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

      const formData = {
        chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
        text: text
      };
      
      const response = await axios.post(apiUrl, formData);
      return response.data;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      throw error;
    }
  }
};

const HealthQuestionnaire = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [contactMethod, setContactMethod] = useState('Telegram');
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
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

  const handleContactMethodChange = (e) => {
    setContactMethod(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Send the message to Telegram
      await telegramService.sendMessage(
        formData.name,
        formData.phone,
        contactMethod,
        process.env.REACT_APP_TELEGRAM_BOT_TOKEN
      );
      
      // If successful
      setSubmitStatus('success');
      
      // Keep the submit button disabled until modal closes
      // The setIsSubmitting(false) will only be called after the modal disappears
      setTimeout(() => {
        onClose();
        // Reset form after closing
        setFormData({ name: '', phone: '' });
        setContactMethod('Telegram');
        setSubmitStatus(null);
        setIsSubmitting(false); // Only re-enable the button after modal is closed
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setIsSubmitting(false); // Re-enable the button only on error
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
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
          disabled={isSubmitting}
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
        <div className="text-center mb-6 mt-4">
          <div className="flex justify-center items-center mb-3">
            <span className="text-teal-600 text-3xl mr-2"></span>
            <h3 className="text-2xl font-bold text-slate-800">{t('healthModal.title')}</h3>
          </div>
          <div className="mt-2">
            <p className="text-slate-600">
              {t('healthModal.fillForm')}
            </p>
          </div>
        </div>
        
        {/* Submission Status Message */}
        {submitStatus === 'success' && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
            {t('healthModal.submitSuccess')}
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
            {t('healthModal.submitError')}
          </div>
        )}
        
        {/* Health Questionnaire Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
              {t('healthModal.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={t('healthModal.namePlaceholder')}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            {/* Phone Number */}
            <div className="mb-3">
              <label className="block text-sm text-slate-600 mb-1" htmlFor="phone">
                • {t('healthModal.phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="1234567890"
                required
                disabled={isSubmitting}
              />
            </div>
            
            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm text-slate-600 mb-1" htmlFor="contactMethod">
                • {t('healthModal.preferredContactMethod')}
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={contactMethod}
                onChange={handleContactMethodChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                required
                disabled={isSubmitting}
              >
                <option value="Telegram">Telegram</option>
                <option value="Viber">Viber</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className={`w-full hover:cursor-pointer ${isSubmitting && !submitStatus ? 'bg-teal-400' : submitStatus === 'success' ? 'bg-teal-500' : 'bg-teal-600 hover:bg-teal-700'} text-white font-medium py-3 px-4 rounded-md shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center`}
              disabled={isSubmitting}
            >
              {isSubmitting && !submitStatus ? (
                <>
                  <span>{t('healthModal.submitting')}</span>
                  <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <span>{t('healthModal.submit')}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>{t('healthModal.submit')}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthQuestionnaire;