import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

export const SEOHelmet = ({ 
  title, 
  description, 
  keywords,
  image = '/logo.jpg',
  article = false,
  publishedTime,
  modifiedTime,
  schemaType = 'WebPage',
  breadcrumbs = [],
  faqData = [],
  reviewData = [],
  serviceData = null
}) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language || 'ua';
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());
  
  // Initialize current time for real-time schema updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 60000); // Update every minute for ultra-fresh timestamps
    return () => clearInterval(timer);
  }, []);
  
  // Get current path without language prefix
  const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, '') || '/';
  
  // Advanced page categorization for enhanced schema
  const getPageCategory = () => {
    if (pathWithoutLang.includes('/consultation')) return 'Medical';
    if (pathWithoutLang.includes('/usefullInfo')) return 'Educational';
    if (pathWithoutLang.includes('/about')) return 'About';
    if (pathWithoutLang.includes('/contact')) return 'Contact';
    return 'General';
  };
  
  // Enhanced reading time calculation for articles
  const calculateReadingTime = (content) => {
    if (!content) return '5';
    const wordsPerMinute = currentLang === 'ua' ? 200 : 180; // Ukrainian vs Russian reading speeds
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute).toString();
  };
  
  // Advanced keyword density optimization
  const optimizeKeywords = (baseKeywords) => {
    const commonMedicalTerms = currentLang === 'ua' ? [
      'здоров\'я', 'лікування', 'медицина', 'терапія', 'діагностика', 'профілактика',
      'симптоми', 'захворювання', 'консультація', 'спеціаліст', 'доктор'
    ] : [
      'здоровье', 'лечение', 'медицина', 'терапия', 'диагностика', 'профилактика',
      'симптомы', 'заболевания', 'консультация', 'специалист', 'доктор'
    ];
    
    const locationTerms = currentLang === 'ua' ? [
      'Україна', 'Київ', 'український', 'онлайн', 'дистанційно'
    ] : [
      'Украина', 'Киев', 'украинский', 'онлайн', 'дистанционно'
    ];
    
    return [...baseKeywords.split(', '), ...commonMedicalTerms.slice(0, 5), ...locationTerms.slice(0, 3)].join(', ');
  };
  
  // Site configuration with enhanced multilingual support
  const siteConfig = {
    siteName: 'HomeoLife',
    baseUrl: 'https://homeolife.com.ua',
    defaultTitle: currentLang === 'ua' ? 'HomeoLife - Класична гомеопатія в Україні' : 'HomeoLife - Классическая гомеопатия в Украине',
    defaultDescription: currentLang === 'ua' 
      ? 'Професійна класична гомеопатія в Україні. Консультації досвідченого гомеопата, індивідуальний підхід, природне лікування.'
      : 'Профессиональная классическая гомеопатия в Украине. Консультации опытного гомеопата, индивидуальный подход, натуральное лечение.',
    defaultKeywords: currentLang === 'ua'
      ? 'гомеопатія, класична гомеопатія, гомеопат, консультація гомеопата, природне лікування, альтернативна медицина, Україна'
      : 'гомеопатия, классическая гомеопатия, гомеопат, консультация гомеопата, натуральное лечение, альтернативная медицина, Украина',
    organizationName: 'HomeoLife Ukraine',
    phone: '+380996668866',
    email: 'anna.korkach.homeopath@gmail.com',
    foundedYear: '2014',
    specialty: currentLang === 'ua' ? 'Класична гомеопатія' : 'Классическая гомеопатия',
    serviceArea: currentLang === 'ua' ? 'Україна' : 'Украина',
    currency: 'UAH',
    timezone: 'Europe/Kiev'
  };
  
  // Generate alternate language URLs with proper root handling
  const alternateUrls = {
    ua: pathWithoutLang === '/' 
      ? `${siteConfig.baseUrl}/ua/` 
      : `${siteConfig.baseUrl}/ua${pathWithoutLang}`,
    ru: pathWithoutLang === '/'
      ? `${siteConfig.baseUrl}/ru/`
      : `${siteConfig.baseUrl}/ru${pathWithoutLang}`
  };

  const currentUrl = alternateUrls[currentLang];
  const fullTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.defaultTitle;
  const metaDescription = description || siteConfig.defaultDescription;
  const optimizedKeywords = optimizeKeywords(keywords || siteConfig.defaultKeywords);
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.baseUrl}${image}`;
  const pageCategory = getPageCategory();
  const readingTime = calculateReadingTime(description);

  // Advanced breadcrumb schema generation
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteConfig.baseUrl}${crumb.url}`
    }))
  } : null;

  // FAQ Schema for enhanced SERP features
  const faqSchema = faqData.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Review/Rating Schema for testimonials
  const reviewSchema = reviewData.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "MedicalBusiness",
      "name": siteConfig.organizationName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": reviewData.reduce((acc, review) => acc + review.rating, 0) / reviewData.length,
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Verified Patients"
    },
    "reviewBody": reviewData[0]?.text || ""
  } : null;

  // Enhanced Medical Service Schema
  const serviceSchema = serviceData ? {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": serviceData.name,
    "description": serviceData.description,
    "procedureType": currentLang === 'ua' ? "Гомеопатичне лікування" : "Гомеопатическое лечение",
    "bodyLocation": serviceData.bodyLocation || currentLang === 'ua' ? "Весь організм" : "Весь организм",
    "preparation": currentLang === 'ua' ? "Попередня консультація" : "Предварительная консультация",
    "followup": currentLang === 'ua' ? "Регулярні огляди" : "Регулярные осмотры",
    "howPerformed": currentLang === 'ua' ? "Індивідуальний підбір препаратів" : "Индивидуальный подбор препаратов",
    "status": "Active",
    "category": "Alternative Medicine"
  } : null;

  // Enhanced Organization Schema with rich data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "HealthAndBeautyBusiness", "LocalBusiness"],
    "name": siteConfig.organizationName,
    "legalName": "HomeoLife Ukraine",
    "description": metaDescription,
    "url": siteConfig.baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.baseUrl}/logo.jpg`,
      "width": "400",
      "height": "400"
    },
    "image": [
      {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": "1200",
        "height": "630"
      }
    ],
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "foundingDate": siteConfig.foundedYear,
    "currenciesAccepted": siteConfig.currency,
    "paymentAccepted": currentLang === 'ua' ? ["Готівка", "Банківська картка", "Переказ"] : ["Наличные", "Банковская карта", "Перевод"],
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UA",
      "addressRegion": "Ukraine",
      "addressLocality": currentLang === 'ua' ? "Київ" : "Киев"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.4501",
      "longitude": "30.5234"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": siteConfig.serviceArea
      },
      {
        "@type": "City",
        "name": currentLang === 'ua' ? "Київ" : "Киев"
      }
    ],
    "medicalSpecialty": [
      siteConfig.specialty,
      currentLang === 'ua' ? "Альтернативна медицина" : "Альтернативная медицина",
      currentLang === 'ua' ? "Холістичне лікування" : "Холистическое лечение"
    ],
    "availableLanguage": [
      {
        "@type": "Language",
        "name": currentLang === 'ua' ? "Українська" : "Украинский",
        "alternateName": currentLang === 'ua' ? "uk" : "ru"
      },
      {
        "@type": "Language", 
        "name": currentLang === 'ua' ? "Російська" : "Русский",
        "alternateName": currentLang === 'ua' ? "ru" : "uk"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/dr_anna_korkach/",
      "https://t.me/annetta00000",
      "https://www.facebook.com/homeolife.ukraine",
      "https://www.youtube.com/@homeolife"
    ],
    "founder": {
      "@type": "Person",
      "name": currentLang === 'ua' ? "Анна Коркач" : "Анна Коркач",
      "givenName": currentLang === 'ua' ? "Анна" : "Анна",
      "familyName": currentLang === 'ua' ? "Коркач" : "Коркач",
      "jobTitle": currentLang === 'ua' ? "Сертифікований гомеопат" : "Сертифицированный гомеопат",
      "description": currentLang === 'ua' 
        ? "Професійний гомеопат з 10-річним досвідом роботи в класичній гомеопатії, випускник Міжнародної школи класичної гомеопатії"
        : "Профессиональный гомеопат с 10-летним опытом работы в классической гомеопатии, выпускник Международной школы классической гомеопатии",
      "knowsAbout": [
        currentLang === 'ua' ? "Класична гомеопатія" : "Классическая гомеопатия",
        currentLang === 'ua' ? "Дитяча гомеопатія" : "Детская гомеопатия",
        currentLang === 'ua' ? "Жіноче здоров'я" : "Женское здоровье"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": currentLang === 'ua' ? "Міжнародна школа класичної гомеопатії" : "Международная школа классической гомеопатии"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": currentLang === 'ua' ? "Сертифікат гомеопата" : "Сертификат гомеопата",
          "recognizedBy": {
            "@type": "Organization",
            "name": currentLang === 'ua' ? "Українська асоціація гомеопатів" : "Украинская ассоциация гомеопатов"
          }
        }
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": currentLang === 'ua' ? "Гомеопатичні консультації та послуги" : "Гомеопатические консультации и услуги",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": currentLang === 'ua' ? "Первинна консультація гомеопата" : "Первичная консультация гомеопата",
            "description": currentLang === 'ua' 
              ? "Детальна індивідуальна консультація з повним аналізом стану здоров'я та призначенням гомеопатичного лікування"
              : "Детальная индивидуальная консультация с полным анализом состояния здоровья и назначением гомеопатического лечения",
            "procedureType": currentLang === 'ua' ? "Діагностика та лікування" : "Диагностика и лечение"
          },
          "price": "1500",
          "priceCurrency": "UAH",
          "availability": "https://schema.org/InStock",
          "validFrom": currentTime
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure", 
            "name": currentLang === 'ua' ? "Повторна консультація" : "Повторная консультация",
            "description": currentLang === 'ua' 
              ? "Контрольний огляд та корекція лікування"
              : "Контрольный осмотр и коррекция лечения"
          },
          "price": "800",
          "priceCurrency": "UAH",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "4"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": siteConfig.phone,
        "contactType": currentLang === 'ua' ? "Запис на консультацію" : "Запись на консультацию",
        "availableLanguage": [currentLang === 'ua' ? "Ukrainian" : "Russian", "Ukrainian", "Russian"],
        "serviceArea": siteConfig.serviceArea
      },
      {
        "@type": "ContactPoint",
        "email": siteConfig.email,
        "contactType": currentLang === 'ua' ? "Загальні питання" : "Общие вопросы",
        "availableLanguage": [currentLang === 'ua' ? "Ukrainian" : "Russian", "Ukrainian", "Russian"]
      }
    ]
  };

  // Enhanced Article schema for blog posts with rich media
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": ["Article", "MedicalWebPage"],
    "headline": title,
    "description": metaDescription,
    "image": [
      {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": "1200",
        "height": "630"
      }
    ],
    "url": currentUrl,
    "datePublished": publishedTime || currentTime,
    "dateModified": modifiedTime || currentTime,
    "author": {
      "@type": "Person",
      "name": "Anna Korkach",
      "url": `${siteConfig.baseUrl}/${currentLang}/about`,
      "sameAs": [
        "https://www.instagram.com/dr_anna_korkach/",
        "https://t.me/annetta00000"
      ],
      "jobTitle": currentLang === 'ua' ? "Сертифікований гомеопат" : "Сертифицированный гомеопат",
      "worksFor": {
        "@type": "Organization",
        "name": siteConfig.organizationName
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.organizationName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.baseUrl}/logo.jpg`,
        "width": "400",
        "height": "400"
      },
      "sameAs": [
        "https://www.instagram.com/dr_anna_korkach/",
        "https://t.me/annetta00000"
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "inLanguage": currentLang === 'ua' ? 'uk-UA' : 'ru-RU',
    "about": {
      "@type": "MedicalCondition",
      "name": currentLang === 'ua' ? "Гомеопатичне лікування" : "Гомеопатическое лечение"
    },
    "audience": {
      "@type": "PeopleAudience",
      "audienceType": currentLang === 'ua' ? "Пацієнти" : "Пациенты"
    },
    "keywords": optimizedKeywords,
    "wordCount": description ? description.split(' ').length : 500,
    "timeRequired": `PT${readingTime}M`,
    "articleSection": pageCategory,
    "articleBody": metaDescription,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".main-content"]
    },
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": currentLang === 'ua' ? "Пацієнт" : "Пациент"
    }
  } : null;

  // WebPage Schema for non-article pages
  const webPageSchema = !article ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "description": metaDescription,
    "url": currentUrl,
    "inLanguage": currentLang === 'ua' ? 'uk-UA' : 'ru-RU',
    "isPartOf": {
      "@type": "WebSite",
      "name": siteConfig.siteName,
      "url": siteConfig.baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    "about": {
      "@type": "Thing",
      "name": currentLang === 'ua' ? "Гомеопатія" : "Гомеопатия"
    },
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": siteConfig.organizationName
    },
    "lastReviewed": currentTime,
    "reviewedBy": {
      "@type": "Person", 
      "name": "Anna Korkach"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".hero-title", ".main-content"]
    }
  } : null;

  return (
    <Helmet>
      {/* Advanced Meta Tags for Ultimate SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={optimizedKeywords} />
      <meta name="language" content={currentLang === 'ua' ? 'uk-UA' : 'ru-RU'} />
      <meta name="author" content="Anna Korkach, HomeoLife" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1, max-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Enhanced Content and Language Meta */}
      <meta httpEquiv="Content-Language" content={currentLang === 'ua' ? 'uk-UA' : 'ru-RU'} />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="content-language" content={currentLang === 'ua' ? 'uk-UA' : 'ru-RU'} />
      
      {/* Advanced Geographic and Regional Targeting */}
      <meta name="geo.region" content="UA" />
      <meta name="geo.country" content="Ukraine" />
      <meta name="geo.placename" content="Ukraine" />
      <meta name="geo.position" content="50.4501;30.5234" />
      <meta name="ICBM" content="50.4501, 30.5234" />
      <meta name="geo.nuts" content="UA" />
      
      {/* Business and Medical Meta Tags */}
      <meta name="category" content="Health, Medicine, Alternative Medicine" />
      <meta name="coverage" content="Ukraine" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      <meta name="expires" content="never" />
      
      {/* Page-specific Meta Tags */}
      <meta name="page-topic" content={currentLang === 'ua' ? 'Гомеопатія' : 'Гомеопатия'} />
      <meta name="page-type" content={article ? 'article' : 'website'} />
      <meta name="audience" content={currentLang === 'ua' ? 'Пацієнти, медичні працівники' : 'Пациенты, медицинские работники'} />
      <meta name="target" content="all" />
      
      {/* Advanced Technical SEO */}
      <meta name="theme-color" content="#2C5530" />
      <meta name="msapplication-TileColor" content="#2C5530" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.siteName} />
      <meta name="application-name" content={siteConfig.siteName} />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Cache Control for Performance */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      <meta httpEquiv="Pragma" content="cache" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Enhanced Canonical and Alternate URLs */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Comprehensive Language Alternates with Regional Variants */}
      <link rel="alternate" hrefLang="uk" href={alternateUrls.ua} />
      <link rel="alternate" hrefLang="ru" href={alternateUrls.ru} />
      <link rel="alternate" hrefLang="uk-UA" href={alternateUrls.ua} />
      <link rel="alternate" hrefLang="ru-UA" href={alternateUrls.ru} />
      <link rel="alternate" hrefLang="ru-RU" href={alternateUrls.ru} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.ua} />
      
      {/* Enhanced Open Graph with Rich Media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={currentLang === 'ua' ? 'uk_UA' : 'ru_RU'} />
      <meta property="og:locale:alternate" content={currentLang === 'ua' ? 'ru_RU' : 'uk_UA'} />
      <meta property="og:updated_time" content={currentTime} />
      
      {/* Business-specific Open Graph */}
      <meta property="business:contact_data:street_address" content={currentLang === 'ua' ? 'м. Київ' : 'г. Киев'} />
      <meta property="business:contact_data:locality" content={currentLang === 'ua' ? 'Київ' : 'Киев'} />
      <meta property="business:contact_data:region" content="Ukraine" />
      <meta property="business:contact_data:country_name" content="Ukraine" />
      <meta property="business:contact_data:email" content={siteConfig.email} />
      <meta property="business:contact_data:phone_number" content={siteConfig.phone} />
      
      {/* Enhanced Twitter Card with Rich Features */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:site" content="@HomeoLife_UA" />
      <meta name="twitter:creator" content="@dr_anna_korkach" />
      <meta name="twitter:domain" content="homeolife.com.ua" />
      <meta name="twitter:url" content={currentUrl} />
      
      {/* Advanced Social Media and App Integration */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta property="fb:admins" content="anna.korkach" />
      <meta name="pinterest-rich-pin" content="true" />
      <meta name="telegram:channel" content="@homeolife_ukraine" />
      
      {/* LinkedIn-specific tags */}
      <meta property="linkedin:owner" content="anna-korkach-homeopath" />
      
      {/* Article-specific Enhanced Meta Tags */}
      {article && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content="Anna Korkach" />
          <meta property="article:section" content="Health & Medicine" />
          <meta property="article:tag" content={currentLang === 'ua' ? 'гомеопатія' : 'гомеопатия'} />
          <meta property="article:tag" content={currentLang === 'ua' ? 'здоров\'я' : 'здоровье'} />
          <meta property="article:tag" content={currentLang === 'ua' ? 'натуральна медицина' : 'натуральная медицина'} />
          <meta property="article:tag" content={currentLang === 'ua' ? 'альтернативна медицина' : 'альтернативная медицина'} />
          <meta name="article:reading_time" content={readingTime} />
          <meta name="article:word_count" content={description ? description.split(' ').length : 500} />
          <meta property="article:expiration_time" content="never" />
        </>
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      
      {/* Advanced Mobile and Responsive Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="format-detection" content="telephone=yes, email=yes, address=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      
      {/* Enhanced Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-icon-512x512.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Enhanced Structured Data Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {webPageSchema && (
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
      )}
      
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      {reviewSchema && (
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      )}
      
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      
      {/* Performance and Loading Optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      
      {/* Advanced DNS Prefetch for Ultimate Performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      <link rel="dns-prefetch" href="//platform.twitter.com" />
      <link rel="dns-prefetch" href="//www.instagram.com" />
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/logo.jpg" as="image" type="image/jpeg" />
      <link rel="preload" href={imageUrl} as="image" />
      
      {/* Alternative Formats for Better Performance */}
      <link rel="prefetch" href={alternateUrls[currentLang === 'ua' ? 'ru' : 'ua']} />
      
      {/* Rich Snippets Support */}
      <meta name="google-site-verification" content="dk7KMCMV8YH_IhlKnQ5eHHAXjG-W8wl5by57dkDakFw" />
      <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
      <meta name="bing-site-verification" content="YOUR_BING_VERIFICATION_CODE" />
      <meta name="facebook-domain-verification" content="YOUR_FACEBOOK_VERIFICATION_CODE" />
      
      {/* Additional SEO Signals */}
      <link rel="author" href={`${siteConfig.baseUrl}/${currentLang}/about`} />
      <link rel="publisher" href={siteConfig.baseUrl} />
      <link rel="me" href="https://www.instagram.com/dr_anna_korkach/" />
      <link rel="me" href="https://t.me/annetta00000" />
    </Helmet>
  );
};
