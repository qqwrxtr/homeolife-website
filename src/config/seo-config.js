// Advanced SEO and Performance Configuration
// This file contains cutting-edge optimization settings

const SEO_CONFIG = {
  // Core Web Vitals Optimization
  performance: {
    critical_css_inline: true,
    resource_hints: {
      preconnect: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com'
      ],
      dns_prefetch: [
        '//www.googletagmanager.com',
        '//connect.facebook.net',
        '//platform.twitter.com'
      ],
      preload: [
        '/logo.jpg',
        '/assets/hero.mp4'
      ]
    },
    lazy_loading: {
      images: true,
      iframes: true,
      threshold: '100px'
    }
  },

  // Advanced Schema.org Configuration
  structured_data: {
    organization_schema: true,
    medical_business_schema: true,
    person_schema: true,
    breadcrumb_schema: true,
    faq_schema: true,
    review_schema: true,
    service_schema: true,
    article_schema: true,
    webpage_schema: true,
    local_business_schema: true
  },

  // Multilingual SEO Settings
  hreflang: {
    default_language: 'uk-UA',
    supported_languages: ['uk-UA', 'ru-RU'],
    regional_variants: {
      'uk': 'uk-UA',
      'ru': 'ru-RU'
    },
    x_default: 'uk-UA'
  },

  // Social Media Optimization
  social_media: {
    open_graph: {
      type: 'website',
      site_name: 'HomeoLife Ukraine',
      image_dimensions: { width: 1200, height: 630 },
      locale_alternates: ['uk_UA', 'ru_RU']
    },
    twitter_card: {
      card_type: 'summary_large_image',
      site: '@HomeoLife_UA',
      creator: '@dr_anna_korkach'
    },
    facebook: {
      app_id: 'YOUR_FACEBOOK_APP_ID',
      admins: 'anna.korkach'
    }
  },

  // Technical SEO
  technical: {
    robots_meta: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    canonical_urls: true,
    ssl_redirect: true,
    www_redirect: 'non-www',
    trailing_slash: false,
    xml_sitemaps: {
      main: '/sitemap.xml',
      images: '/sitemap-images.xml',
      news: '/sitemap-news.xml',
      index: '/sitemap-index.xml'
    }
  },

  // Content Optimization
  content: {
    title_case: 'sentence',
    meta_description_length: { min: 150, max: 160 },
    keyword_density: { min: 1, max: 3 },
    reading_time_calculation: true,
    semantic_keywords: true
  },

  // Local SEO
  local_seo: {
    business_name: 'HomeoLife Ukraine',
    address: {
      country: 'UA',
      region: 'Ukraine',
      locality: 'Київ'
    },
    coordinates: {
      latitude: '50.4501',
      longitude: '30.5234'
    },
    business_hours: {
      'monday-friday': '09:00-18:00',
      'saturday': '10:00-16:00',
      'sunday': 'closed'
    }
  },

  // Medical SEO Specific
  medical_seo: {
    medical_specialty: 'Classical Homeopathy',
    certification_display: true,
    patient_testimonials: true,
    medical_disclaimers: true,
    privacy_compliance: ['HIPAA', 'GDPR', 'Ukrainian Medical Law']
  },

  // Analytics and Tracking
  analytics: {
    google_analytics_4: true,
    google_tag_manager: true,
    facebook_pixel: false,
    privacy_compliant: true,
    anonymize_ip: true
  },

  // Security Headers for SEO
  security: {
    csp_enabled: true,
    hsts_enabled: true,
    referrer_policy: 'strict-origin-when-cross-origin',
    x_frame_options: 'SAMEORIGIN'
  }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEO_CONFIG;
}

// Validation function
function validateSEOConfig() {
  const requiredFields = ['performance', 'structured_data', 'hreflang', 'technical'];
  
  for (const field of requiredFields) {
    if (!SEO_CONFIG[field]) {
      console.error(`Missing required SEO configuration: ${field}`);
      return false;
    }
  }
  
  console.log('✅ SEO Configuration validated successfully');
  return true;
}

// Auto-validation in development
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  validateSEOConfig();
}
