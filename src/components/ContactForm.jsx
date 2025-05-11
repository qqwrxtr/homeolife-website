import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import telegramIcon from './../assets/telegram-svgrepo-com.svg'
import instagramIcon from './../assets/instagram-1-svgrepo-com.svg'
import viberIcon from './../assets/viber-svgrepo-com.svg'
import gmailIcon from './../assets/gmail-svgrepo-com.svg'
import callIcon from './../assets/call-medicine-rounded-svgrepo-com.svg'

// Telegram service for sending messages
const telegramService = {
  sendMessage: async (firstName, lastName, phone, message) => {
    try {
      const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
      
      const text = `
      Новое сообщение с формы контактов (не краткий):
      - Имя : ${firstName}
      - Фамилия : ${lastName}
      - Телефон : ${phone}
      - Сообщение : ${message}
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

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      // Send the message to Telegram
      await telegramService.sendMessage(
        formData.firstName,
        formData.lastName,
        formData.phone,
        formData.message
      );
      
      // Mark as successful
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
      });
      
      // Keep button disabled but change to success state
      // Reset success message and re-enable button after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
      setIsSubmitting(false); // Re-enable the button on error
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    }
  };

  // Animation on scroll
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

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-white py-16 md:py-24 w-full" id='contacts'>
      <div className="container mx-auto px-4 sm:px-6 max-w-[90vw]">
        <div 
          ref={formRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-3">
              {t('contact.title')}
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
            <div className="w-20 h-0.5 bg-teal-500 mt-6 mb-6 mx-auto"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column - Contact Information */}
            <div className="lg:w-2/5">
              <div className="bg-slate-50 p-4 sm:p-8 rounded-lg border border-slate-200 h-full">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  {t('contact.infoTitle')}
                </h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="p-2 bg-teal-100 rounded-full text-teal-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-800 mb-1 text-start">
                        {t('contact.phone')}
                      </h4>
                      <p className="text-slate-600">
                        <a href="tel:+380996668866" className="hover:text-teal-600 transition-colors duration-300">
                          +380 99 666 8866
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="p-2 bg-teal-100 rounded-full text-teal-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-800 mb-1 text-start">
                        {t('contact.email')}
                      </h4>
                      <p className="text-slate-600">
                        <a href="mailto:homeolifeua@gmail.com" className="hover:text-teal-600 transition-colors duration-300">
                          homeolifeua@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                    <div className="flex items-start">
                    <div className="p-2 bg-teal-100 rounded-full text-teal-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-slate-800 mb-1 text-start">
                        {t('contact.workingHours')}
                        </h4>
                        <div className="flex items-center">
                        <div className="flex flex-row items-center gap-4">
                            <p className="text-slate-600">
                                {t('contact.everyday')}
                            </p>
                            <div className="flex items-center">
                                <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                <p className="text-slate-700 font-medium">09:00 - 21:00</p>
                            </div>
                        </div>
                        </div>
                </div>
                </div>
                  
                {/* Social Media Links */}
                <div className="flex items-center space-x-4 mt-8 pt-4 border-t border-slate-200">
                  <span className="text-slate-600">{t('about.contactMe')}:</span>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/dr_anna_korkach/"
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    <img src={instagramIcon} alt="" className='w-8 h-8 hover:scale-105 transition transition-all duration-300'/>
                  </a>

                  {/* Viber */}
                  <a
                    href="viber://chat?number=+380996668866"
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    <img src={viberIcon} alt="" className='w-8 h-8 hover:scale-105 transition transition-all duration-300'/>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/annetta00000"
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    <img src={telegramIcon} alt="" className='w-8 h-8 hover:scale-105 transition transition-all duration-300'/>
                  </a>
                </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-10 pt-6 border-t border-slate-200 text-start">
                  <p className="text-slate-700 mb-4">
                    {t('contact.cta')}
                  </p>
                  <a 
                    href="tel:+380996668866" 
                    className="inline-flex items-center w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {t('contact.callNow')}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="lg:w-3/5">
              <div className="bg-white p-4 sm:p-8 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  {t('contact.formTitle')}
                </h3>
                
                {/* Success Message */}
                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-start">{t('contact.successTitle')}</p>
                      <p className="text-sm text-start">{t('contact.successMessage')}</p>
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-start">{t('contact.errorTitle')}</p>
                      <p className="text-sm text-start">{t('contact.errorMessage')}</p>
                    </div>
                  </div>
                )}
                
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="firstName">
                        {t('contact.firstName')}
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={t('contact.firstNamePlaceholder')}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="lastName">
                        {t('contact.lastName')}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={t('contact.lastNamePlaceholder')}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  {/* Phone & Email */}
                  <div className="grid grid-cols-1  gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="phone">
                        {t('contact.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="1234567890"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="message">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder={t('contact.messagePlaceholder')}
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  
                  {/* Privacy Policy */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                      required
                      disabled={isSubmitting}
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-slate-600">
                      {t('contact.privacyPolicy')}
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full ${
                        isSubmitting && !isSuccess ? 'bg-teal-400' : 
                        isSuccess ? 'bg-teal-500' : 
                        'bg-teal-600 hover:bg-teal-700'
                      } text-white font-medium py-3 px-4 rounded-md shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting && !isSuccess ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.submitting')}
                        </>
                      ) : isSuccess ? (
                        <>
                          <span>{t('contact.submit')}</span>
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
                          <span>{t('contact.submit')}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;