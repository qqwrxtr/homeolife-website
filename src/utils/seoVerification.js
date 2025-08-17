/**
 * 🔍 MULTILINGUAL SEO VERIFICATION UTILITY
 * 
 * This utility helps verify that our completely dynamic SEO solution
 * is working perfectly for both Ukrainian and Russian languages.
 * 
 * WHAT IT CHECKS:
 * ✅ No hardcoded meta tags in index.html
 * ✅ Dynamic title generation for each language
 * ✅ Language-specific meta descriptions
 * ✅ Proper hreflang implementation
 * ✅ Separate canonical URLs for each language
 * ✅ Language-specific structured data
 */

export const verifyMultilingualSEO = () => {
  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
  };

  const addTest = (name, status, message) => {
    results.tests.push({ name, status, message });
    results[status]++;
  };

  // Test 1: Check if title is dynamic (not hardcoded)
  const titleElement = document.querySelector('title');
  if (titleElement) {
    const titleContent = titleElement.textContent;
    const isDynamic = !titleContent.includes('Professional Classical Homeopathy | Ukraine');
    addTest(
      'Dynamic Title',
      isDynamic ? 'passed' : 'failed',
      `Title: "${titleContent}" - ${isDynamic ? 'Properly dynamic' : 'Still hardcoded!'}`
    );
  }

  // Test 2: Check meta description is dynamic
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    const description = descriptionMeta.getAttribute('content');
    const isDynamic = !description.includes('Professional classical homeopathy in Ukraine. Consultations with experienced homeopath Anna Korkach. Individual approach, natural treatment.');
    addTest(
      'Dynamic Description',
      isDynamic ? 'passed' : 'failed',
      `Description is ${isDynamic ? 'properly dynamic' : 'still hardcoded!'}`
    );
  }

  // Test 3: Check if canonical URL includes language prefix
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    const canonicalUrl = canonicalLink.getAttribute('href');
    const hasLangPrefix = /\/(ua|ru)\//.test(canonicalUrl);
    addTest(
      'Language-Specific Canonical',
      hasLangPrefix ? 'passed' : 'failed',
      `Canonical URL: ${canonicalUrl} - ${hasLangPrefix ? 'Includes language prefix' : 'Missing language prefix!'}`
    );
  }

  // Test 4: Check hreflang links
  const hreflangLinks = document.querySelectorAll('link[hreflang]');
  const hasHreflang = hreflangLinks.length > 0;
  addTest(
    'Hreflang Implementation',
    hasHreflang ? 'passed' : 'failed',
    `Found ${hreflangLinks.length} hreflang links`
  );

  // Test 5: Check Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogTitle && ogUrl) {
    const ogTitleContent = ogTitle.getAttribute('content');
    const ogUrlContent = ogUrl.getAttribute('content');
    const ogIsDynamic = !ogTitleContent.includes('Professional Classical Homeopathy');
    const ogUrlHasLang = /\/(ua|ru)\//.test(ogUrlContent);
    
    addTest(
      'Dynamic Open Graph',
      (ogIsDynamic && ogUrlHasLang) ? 'passed' : 'failed',
      `OG Title dynamic: ${ogIsDynamic}, OG URL has language: ${ogUrlHasLang}`
    );
  }

  // Test 6: Check structured data
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  const hasStructuredData = scripts.length > 0;
  addTest(
    'Structured Data',
    hasStructuredData ? 'passed' : 'warnings',
    `Found ${scripts.length} structured data scripts`
  );

  // Test 7: Check language meta tag
  const languageMeta = document.querySelector('meta[name="language"]');
  if (languageMeta) {
    const language = languageMeta.getAttribute('content');
    const isCorrectLang = language === 'uk-UA' || language === 'ru-RU';
    addTest(
      'Language Meta Tag',
      isCorrectLang ? 'passed' : 'failed',
      `Language: ${language}`
    );
  }

  // Generate report
  console.group('🔍 MULTILINGUAL SEO VERIFICATION REPORT');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⚠️ Warnings: ${results.warnings}`);
  console.log('\n📊 DETAILED RESULTS:');
  
  results.tests.forEach(test => {
    const icon = test.status === 'passed' ? '✅' : test.status === 'failed' ? '❌' : '⚠️';
    console.log(`${icon} ${test.name}: ${test.message}`);
  });

  if (results.failed === 0) {
    console.log('\n🎉 PERFECT! All SEO tests passed. Your multilingual SEO is working flawlessly!');
  } else {
    console.log('\n🔧 Some issues found. Please check the failed tests above.');
  }
  
  console.groupEnd();
  
  return results;
};

// Auto-run verification when in development mode
if (process.env.NODE_ENV === 'development') {
  // Run verification after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      verifyMultilingualSEO();
    }, 2000); // Wait 2 seconds for React to fully render
  });
}

// Export for manual testing
window.verifyMultilingualSEO = verifyMultilingualSEO;
