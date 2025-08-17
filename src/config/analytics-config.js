/**
 * Advanced Analytics & SEO Tracking Configuration
 * Enterprise-level tracking for HomeoLife Ukraine
 */

export const ANALYTICS_CONFIG = {
  // Google Analytics 4 Enhanced Configuration
  google_analytics: {
    measurement_id: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
    config: {
      // Enhanced measurement events
      enhanced_measurement: true,
      
      // Custom events for medical website
      custom_events: {
        consultation_request: {
          event_name: 'consultation_request',
          parameters: {
            consultation_type: 'string',
            language: 'string',
            patient_age_group: 'string'
          }
        },
        contact_form_submit: {
          event_name: 'contact_form_submit',
          parameters: {
            form_type: 'string',
            language: 'string'
          }
        },
        blog_article_read: {
          event_name: 'blog_article_read',
          parameters: {
            article_id: 'string',
            reading_time: 'number',
            language: 'string'
          }
        },
        language_switch: {
          event_name: 'language_switch',
          parameters: {
            from_language: 'string',
            to_language: 'string'
          }
        },
        phone_click: {
          event_name: 'phone_click',
          parameters: {
            phone_number: 'string',
            page_location: 'string'
          }
        }
      },
      
      // Medical website specific tracking
      medical_events: {
        symptom_search: 'symptom_search',
        treatment_info_view: 'treatment_info_view',
        doctor_profile_view: 'doctor_profile_view',
        appointment_booking_start: 'appointment_booking_start',
        appointment_booking_complete: 'appointment_booking_complete'
      },
      
      // Privacy-compliant settings
      privacy: {
        anonymize_ip: true,
        cookie_update: false,
        ads_data_redaction: true,
        consent_mode: true
      },
      
      // Performance tracking
      performance_metrics: {
        core_web_vitals: true,
        page_load_time: true,
        form_interaction_time: true,
        scroll_depth: [25, 50, 75, 90, 100]
      }
    }
  },

  // SEO Performance Tracking
  seo_tracking: {
    // Search Console integration
    search_console: {
      site_url: 'https://homeolife.com.ua',
      verify_ownership: true,
      submit_sitemaps: [
        '/sitemap-index.xml',
        '/sitemap.xml', 
        '/sitemap-images.xml',
        '/sitemap-news.xml'
      ]
    },
    
    // Ranking monitoring
    keyword_tracking: {
      primary_keywords: [
        'гомеопат київ',
        'класична гомеопатія',
        'гомеопатична консультація',
        'анна коркач гомеопат',
        'гомеопатія україна'
      ],
      secondary_keywords: [
        'дитяча гомеопатія',
        'жіноче здоров\'я гомеопатія',
        'онлайн консультація гомеопата',
        'гомеопатичне лікування'
      ],
      long_tail_keywords: [
        'як працює гомеопатія',
        'відгуки про гомеопата',
        'ціна консультації гомеопата',
        'дитячий гомеопат київ'
      ]
    },
    
    // Content performance
    content_metrics: {
      bounce_rate_target: '< 40%',
      avg_session_duration_target: '> 2:30',
      pages_per_session_target: '> 2.5',
      conversion_rate_target: '> 3%'
    }
  },

  // Advanced Conversion Tracking
  conversion_tracking: {
    // Primary conversions
    primary_goals: {
      consultation_booking: {
        goal_name: 'Consultation Booking',
        conversion_value: 1500, // UAH
        funnel_steps: [
          'consultation_page_view',
          'contact_form_view',
          'form_field_interaction',
          'form_submission',
          'thank_you_page_view'
        ]
      },
      contact_form_submission: {
        goal_name: 'Contact Form',
        conversion_value: 800,
        funnel_steps: [
          'contact_page_view',
          'form_interaction',
          'form_submission'
        ]
      },
      phone_call: {
        goal_name: 'Phone Call',
        conversion_value: 1200,
        tracking_method: 'click_to_call'
      }
    },
    
    // Micro-conversions
    micro_conversions: {
      email_signup: 'Newsletter Signup',
      social_media_follow: 'Social Media Follow',
      content_download: 'Content Download',
      video_watch: 'Video Watch Completion',
      blog_comment: 'Blog Comment'
    }
  },

  // Medical Website Compliance
  compliance_tracking: {
    // HIPAA compliance monitoring
    hipaa_compliance: {
      patient_data_encryption: true,
      secure_transmission: true,
      access_logging: true,
      data_retention_policy: '7_years'
    },
    
    // GDPR compliance
    gdpr_compliance: {
      consent_tracking: true,
      data_portability: true,
      right_to_be_forgotten: true,
      data_processing_lawfulness: 'legitimate_interest'
    },
    
    // Ukrainian medical law compliance
    ukrainian_medical_compliance: {
      medical_license_display: true,
      patient_rights_information: true,
      complaint_procedure: true,
      professional_indemnity: true
    }
  },

  // International SEO Tracking
  international_seo: {
    // Language performance
    language_metrics: {
      ukrainian: {
        traffic_percentage: 70,
        conversion_rate: 3.2,
        avg_session_duration: '2:45'
      },
      russian: {
        traffic_percentage: 30,
        conversion_rate: 2.8,
        avg_session_duration: '2:30'
      }
    },
    
    // Geographic targeting
    geographic_performance: {
      ukraine: {
        primary_cities: ['київ', 'львів', 'одеса', 'харків', 'дніпро'],
        traffic_percentage: 85
      },
      international: {
        countries: ['poland', 'germany', 'canada', 'usa'],
        traffic_percentage: 15
      }
    }
  },

  // Advanced Attribution Modeling
  attribution: {
    // Multi-touch attribution
    attribution_model: 'data_driven',
    lookback_window: 90, // days
    
    // Channel attribution
    channel_grouping: {
      'organic_search': ['google', 'bing', 'yandex', 'duckduckgo'],
      'social_media': ['instagram', 'facebook', 'telegram', 'viber'],
      'direct': ['direct', 'bookmark'],
      'referral': ['other_medical_sites', 'directories'],
      'email': ['newsletter', 'automated_emails'],
      'paid_search': ['google_ads', 'bing_ads']
    }
  },

  // Real-time Monitoring
  real_time: {
    // Active users monitoring
    active_users: {
      alert_threshold: 100,
      peak_hours: ['10:00-12:00', '14:00-17:00']
    },
    
    // Performance monitoring
    performance_alerts: {
      page_load_time: '> 3s',
      server_response_time: '> 1s',
      error_rate: '> 1%'
    },
    
    // Security monitoring
    security_alerts: {
      suspicious_traffic: true,
      bot_detection: true,
      ddos_protection: true
    }
  }
};

// Utility functions for analytics
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      ...parameters,
      timestamp: Date.now(),
      page_language: document.documentElement.lang || 'uk'
    });
  }
};

export const trackConsultationRequest = (consultationType, language) => {
  trackEvent('consultation_request', {
    consultation_type: consultationType,
    language: language,
    patient_age_group: 'adult', // Could be determined dynamically
    event_category: 'Medical Engagement',
    event_label: 'Consultation Request'
  });
};

export const trackLanguageSwitch = (fromLang, toLang) => {
  trackEvent('language_switch', {
    from_language: fromLang,
    to_language: toLang,
    event_category: 'User Experience',
    event_label: 'Language Change'
  });
};

export const trackPhoneClick = (phoneNumber, pageLocation) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
    page_location: pageLocation,
    event_category: 'Contact',
    event_label: 'Phone Call Intent'
  });
};

export default ANALYTICS_CONFIG;
