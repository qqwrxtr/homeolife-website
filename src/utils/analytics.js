import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics configuration
// TODO: Replace with your actual GA4 Measurement ID when ready to track
const GA_MEASUREMENT_ID = ''; // Currently disabled - add your GA4 ID here

// Google Analytics functions
export const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (path, title) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
};

// Track events
export const trackEvent = (action, category = 'engagement', label, value) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom hook to track page views automatically
export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);
};

// Component to add GA script to head
export const GoogleAnalyticsScript = () => {
  useEffect(() => {
    // Add Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize GA
    initGA();

    return () => {
      // Cleanup if needed
      const scripts = document.querySelectorAll(`script[src*="googletagmanager"]`);
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return null;
};
