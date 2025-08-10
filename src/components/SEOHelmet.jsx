import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const SEOHelmet = ({ 
  title, 
  description, 
  keywords,
  image = '/logo.jpg',
  article = false,
  publishedTime,
  modifiedTime 
}) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language || 'ua';
  
  // Get current path without language prefix
  const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, '') || '/';
  
  // Site configuration
  const siteConfig = {
    siteName: 'HomeoLife',
    baseUrl: 'https://homeolife.com.ua',
    defaultTitle: currentLang === 'ua' ? 'HomeoLife - Класична гомеопатія в Україні' : 'HomeoLife - Классическая гомеопатия в Украине',
    defaultDescription: currentLang === 'ua' 
      ? 'Професійна класична гомеопатія в Україні. Консультації досвідченого гомеопата, індивідуальний підхід, природне лікування.'
      : 'Профессиональная классическая гомеопатия в Украине. Консультации опытного гомеопата, индивидуальный подход, натуральное лечение.',
    defaultKeywords: currentLang === 'ua'
      ? 'гомеопатія, класична гомеопатія, гомеопат, консультація гомеопата, природне лікування, альтернативна медицина, Україна'
      : 'гомеопатия, классическая гомеопатия, гомеопат, консультация гомеопата, натуральное лечение, альтернативная медицина, Украина'
  };
  
  // Generate alternate language URLs
  const alternateUrls = {
    ua: `${siteConfig.baseUrl}/ua${pathWithoutLang}`,
    ru: `${siteConfig.baseUrl}/ru${pathWithoutLang}`
  };

  const currentUrl = alternateUrls[currentLang];
  const fullTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.defaultTitle;
  const metaDescription = description || siteConfig.defaultDescription;
  const metaKeywords = keywords || siteConfig.defaultKeywords;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.baseUrl}${image}`;

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "HomeoLife",
    "description": metaDescription,
    "url": siteConfig.baseUrl,
    "logo": `${siteConfig.baseUrl}/logo.jpg`,
    "image": imageUrl,
    "telephone": "+380996668866",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UA",
      "addressRegion": "Ukraine"
    },
    "medicalSpecialty": "Homeopathy",
    "serviceArea": {
      "@type": "Country",
      "name": "Ukraine"
    },
    "availableLanguage": ["uk", "ru"],
    "sameAs": [
      "https://www.instagram.com/dr_anna_korkach/",
      "https://t.me/annetta00000"
    ]
  };

  // Article schema for blog posts
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": metaDescription,
    "image": imageUrl,
    "url": currentUrl,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Person",
      "name": "HomeoLife Specialist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HomeoLife",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.baseUrl}/logo.jpg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "inLanguage": currentLang === 'ua' ? 'uk' : 'ru'
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="language" content={currentLang === 'ua' ? 'uk' : 'ru'} />
      <meta name="author" content="HomeoLife" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Alternate Language URLs */}
      <link rel="alternate" hrefLang="uk" href={alternateUrls.ua} />
      <link rel="alternate" hrefLang="ru" href={alternateUrls.ru} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.ua} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={currentLang === 'ua' ? 'uk_UA' : 'ru_RU'} />
      <meta property="og:locale:alternate" content={currentLang === 'ua' ? 'ru_RU' : 'uk_UA'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Article specific meta tags */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && (
        <meta property="article:section" content="Health" />
      )}
      
      {/* Mobile and responsive */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Favicon and app icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo.jpg" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Helmet>
  );
};
