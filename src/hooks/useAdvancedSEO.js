/**
 * Advanced SEO Hook for React Components
 * Provides comprehensive SEO functionality with real-time optimization
 */

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const useAdvancedSEO = (options = {}) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [seoMetrics, setSeoMetrics] = useState({});
  const [isOptimized, setIsOptimized] = useState(false);

  // Default SEO configuration
  const defaultConfig = useMemo(() => ({
    titleTemplate: '%s | HomeoLife Ukraine',
    defaultTitle: 'HomeoLife - Професійна класична гомеопатія в Україні',
    description: 'Консультації досвідченого гомеопата з індивідуальним підходом',
    keywords: 'гомеопатія, класична гомеопатія, консультація гомеопата',
    image: '/logo.jpg',
    canonical: true,
    noindex: false,
    structuredData: true,
    socialMedia: true,
    performance: true
  }), []);

  const config = { ...defaultConfig, ...options };

  // SEO metrics calculation
  const calculateSEOScore = useCallback((pageData) => {
    let score = 0;
    const metrics = {};

    // Title optimization (20 points)
    if (pageData.title) {
      if (pageData.title.length >= 30 && pageData.title.length <= 60) {
        score += 20;
        metrics.title = 'optimal';
      } else {
        score += 10;
        metrics.title = 'needs-improvement';
      }
    }

    // Description optimization (20 points)
    if (pageData.description) {
      if (pageData.description.length >= 150 && pageData.description.length <= 160) {
        score += 20;
        metrics.description = 'optimal';
      } else if (pageData.description.length >= 120) {
        score += 15;
        metrics.description = 'good';
      } else {
        score += 5;
        metrics.description = 'too-short';
      }
    }

    // Keywords optimization (15 points)
    if (pageData.keywords) {
      const keywordCount = pageData.keywords.split(',').length;
      if (keywordCount >= 5 && keywordCount <= 10) {
        score += 15;
        metrics.keywords = 'optimal';
      } else {
        score += 8;
        metrics.keywords = 'needs-improvement';
      }
    }

    // Image optimization (10 points)
    if (pageData.image) {
      score += 10;
      metrics.image = 'present';
    }

    // Structured data (15 points)
    if (config.structuredData) {
      score += 15;
      metrics.structuredData = 'enabled';
    }

    // Multilingual setup (10 points)
    if (i18n.language) {
      score += 10;
      metrics.multilingual = 'enabled';
    }

    // Canonical URL (5 points)
    if (config.canonical) {
      score += 5;
      metrics.canonical = 'enabled';
    }

    // Social media tags (5 points)
    if (config.socialMedia) {
      score += 5;
      metrics.socialMedia = 'enabled';
    }

    metrics.totalScore = score;
    metrics.grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
    
    return metrics;
  }, [config, i18n.language]);

  // Generate optimized meta tags
  const generateMetaTags = useCallback((pageData) => {
    const currentLang = i18n.language || 'ua';
    const alternateUrls = {
      ua: `https://homeolife.com.ua/ua${location.pathname.replace(/^\/[a-z]{2}/, '')}`,
      ru: `https://homeolife.com.ua/ru${location.pathname.replace(/^\/[a-z]{2}/, '')}`
    };

    return {
      title: pageData.title ? `${pageData.title} | HomeoLife` : config.defaultTitle,
      description: pageData.description || config.description,
      keywords: pageData.keywords || config.keywords,
      canonical: alternateUrls[currentLang],
      alternates: alternateUrls,
      image: pageData.image || config.image,
      locale: currentLang === 'ua' ? 'uk-UA' : 'ru-RU',
      type: pageData.type || 'website'
    };
  }, [i18n.language, location.pathname, config]);

  // Generate structured data
  const generateStructuredData = useCallback((pageData, metaTags) => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: metaTags.title,
      description: metaTags.description,
      url: metaTags.canonical,
      inLanguage: metaTags.locale,
      image: metaTags.image
    };

    // Add medical business schema for relevant pages
    if (location.pathname.includes('/consultation') || location.pathname === '/') {
      baseSchema['@type'] = ['WebPage', 'MedicalWebPage'];
      baseSchema.medicalAudience = {
        '@type': 'MedicalAudience',
        audienceType: i18n.language === 'ua' ? 'Пацієнт' : 'Пациент'
      };
    }

    // Add article schema for blog posts
    if (location.pathname.includes('/usefullInfo/')) {
      baseSchema['@type'] = 'Article';
      baseSchema.author = {
        '@type': 'Person',
        name: 'Anna Korkach'
      };
      baseSchema.publisher = {
        '@type': 'Organization',
        name: 'HomeoLife Ukraine'
      };
    }

    return baseSchema;
  }, [i18n.language, location.pathname]);

  // Performance monitoring
  const monitorPerformance = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const metrics = {
        loadTime: Math.round(performance.now()),
        navigationStart: performance.timing?.navigationStart,
        domContentLoaded: performance.timing?.domContentLoadedEventEnd - performance.timing?.navigationStart,
        firstPaint: performance.getEntriesByType?.('paint').find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: performance.getEntriesByType?.('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime
      };

      setSeoMetrics(prev => ({ ...prev, performance: metrics }));
    }
  }, []);

  // Real-time SEO optimization
  const optimizePage = useCallback((pageData) => {
    const metaTags = generateMetaTags(pageData);
    const structuredData = config.structuredData ? generateStructuredData(pageData, metaTags) : null;
    const seoScore = calculateSEOScore(pageData);

    setSeoMetrics({
      ...seoScore,
      metaTags,
      structuredData,
      lastOptimized: new Date().toISOString()
    });

    setIsOptimized(seoScore.totalScore >= 80);

    return {
      metaTags,
      structuredData,
      seoScore,
      isOptimized: seoScore.totalScore >= 80
    };
  }, [generateMetaTags, generateStructuredData, calculateSEOScore, config.structuredData]);

  // Initialize performance monitoring
  useEffect(() => {
    if (config.performance) {
      // Monitor on page load
      if (document.readyState === 'complete') {
        monitorPerformance();
      } else {
        window.addEventListener('load', monitorPerformance);
      }

      return () => {
        window.removeEventListener('load', monitorPerformance);
      };
    }
  }, [config.performance, monitorPerformance]);

  // SEO recommendations
  const getSEORecommendations = useCallback((metrics) => {
    const recommendations = [];

    if (metrics.title === 'needs-improvement') {
      recommendations.push({
        type: 'title',
        message: i18n.language === 'ua' 
          ? 'Оптимізуйте довжину заголовка (30-60 символів)'
          : 'Оптимизируйте длину заголовка (30-60 символов)',
        priority: 'high'
      });
    }

    if (metrics.description === 'too-short') {
      recommendations.push({
        type: 'description',
        message: i18n.language === 'ua'
          ? 'Збільште довжину опису (мінімум 150 символів)'
          : 'Увеличьте длину описания (минимум 150 символов)',
        priority: 'high'
      });
    }

    if (metrics.keywords === 'needs-improvement') {
      recommendations.push({
        type: 'keywords',
        message: i18n.language === 'ua'
          ? 'Додайте 5-10 релевантних ключових слів'
          : 'Добавьте 5-10 релевантных ключевых слов',
        priority: 'medium'
      });
    }

    if (!metrics.image) {
      recommendations.push({
        type: 'image',
        message: i18n.language === 'ua'
          ? 'Додайте зображення для соціальних мереж'
          : 'Добавьте изображение для социальных сетей',
        priority: 'medium'
      });
    }

    return recommendations;
  }, [i18n.language]);

  return {
    optimizePage,
    seoMetrics,
    isOptimized,
    getSEORecommendations,
    generateMetaTags,
    generateStructuredData,
    calculateSEOScore,
    monitorPerformance
  };
};

export default useAdvancedSEO;
