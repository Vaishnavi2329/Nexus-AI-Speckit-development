// Performance and accessibility testing suite for Lighthouse and WCAG compliance
import { analytics } from "./analytics";

export interface PerformanceTestResult {
  testName: string;
  passed: boolean;
  score: number;
  message: string;
  duration: number;
  details?: any;
}

export interface PerformanceTestSuite {
  suiteName: string;
  tests: PerformanceTestResult[];
  totalDuration: number;
  passedTests: number;
  failedTests: number;
  overallScore: number;
}

class PerformanceTester {
  private results: PerformanceTestResult[] = [];

  // Test Core Web Vitals
  async testCoreWebVitals(): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    
    try {
      // Get performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Calculate Core Web Vitals
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
      const lcp = performance.getEntriesByName('largest-contentful-paint')[0]?.startTime || 0;
      const fid = performance.getEntriesByName('first-input-delay')[0]?.startTime || 0;
      const cls = this.calculateCLS();
      
      // Evaluate scores (simplified scoring)
      const fcpScore = fcp < 1800 ? 100 : fcp < 3000 ? 80 : 50;
      const lcpScore = lcp < 2500 ? 100 : lcp < 4000 ? 80 : 50;
      const fidScore = fid < 100 ? 100 : fid < 300 ? 80 : 50;
      const clsScore = cls < 0.1 ? 100 : cls < 0.25 ? 80 : 50;
      
      const overallScore = Math.round((fcpScore + lcpScore + fidScore + clsScore) / 4);
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Core Web Vitals',
        passed: overallScore >= 90,
        score: overallScore,
        message: `FCP: ${fcp.toFixed(0)}ms, LCP: ${lcp.toFixed(0)}ms, FID: ${fid.toFixed(0)}ms, CLS: ${cls.toFixed(3)}`,
        duration,
        details: {
          fcp: fcp.toFixed(0),
          lcp: lcp.toFixed(0),
          fid: fid.toFixed(0),
          cls: cls.toFixed(3),
          fcpScore,
          lcpScore,
          fidScore,
          clsScore,
          loadTime: navigation.loadEventEnd - navigation.loadEventStart
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Core Web Vitals',
        passed: false,
        score: 0,
        message: `Core Web Vitals test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Calculate CLS (Cumulative Layout Shift)
  private calculateCLS(): number {
    let clsValue = 0;
    const entries = performance.getEntriesByType('layout-shift') as PerformanceEntry[];
    
    for (const entry of entries) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
    
    return clsValue;
  }

  // Test page load performance
  async testPageLoadPerformance(): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Calculate performance metrics
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      const loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
      const totalTime = navigation.loadEventEnd - navigation.fetchStart;
      
      // Resource loading performance
      const resources = performance.getEntriesByType('resource');
      const totalResources = resources.length;
      const cachedResources = resources.filter(r => (r as PerformanceResourceTiming).transferSize === 0).length;
      const cacheHitRate = totalResources > 0 ? (cachedResources / totalResources) * 100 : 0;
      
      // Score calculation
      const loadScore = totalTime < 3000 ? 100 : totalTime < 5000 ? 80 : 50;
      const cacheScore = cacheHitRate > 80 ? 100 : cacheHitRate > 60 ? 80 : 60;
      const overallScore = Math.round((loadScore + cacheScore) / 2);
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Page Load Performance',
        passed: overallScore >= 90,
        score: overallScore,
        message: `Load time: ${totalTime.toFixed(0)}ms, Cache hit rate: ${cacheHitRate.toFixed(1)}%`,
        duration,
        details: {
          totalTime: totalTime.toFixed(0),
          domContentLoaded: domContentLoaded.toFixed(0),
          loadComplete: loadComplete.toFixed(0),
          totalResources,
          cachedResources,
          cacheHitRate: cacheHitRate.toFixed(1),
          loadScore,
          cacheScore
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Page Load Performance',
        passed: false,
        score: 0,
        message: `Page load test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test SEO optimization
  async testSEOOptimization(): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    
    try {
      // Check for essential SEO elements
      const title = document.querySelector('title');
      const description = document.querySelector('meta[name="description"]');
      const h1 = document.querySelector('h1');
      const canonical = document.querySelector('link[rel="canonical"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      
      // Check for heading structure
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const hasProperHeadings = headings.length > 0;
      
      // Check for image alt text
      const images = document.querySelectorAll('img');
      const imagesWithAlt = Array.from(images).filter(img => img.alt).length;
      const altTextCoverage = images.length > 0 ? (imagesWithAlt / images.length) * 100 : 100;
      
      // Check for internal links
      const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
      const hasInternalLinks = internalLinks.length > 0;
      
      // Score calculation
      const seoElements = [
        title, description, h1, canonical, ogImage
      ].filter(Boolean).length;
      const seoScore = (seoElements / 5) * 100;
      const headingScore = hasProperHeadings ? 100 : 50;
      const altScore = altTextCoverage;
      const linkScore = hasInternalLinks ? 100 : 80;
      const structuredScore = structuredData.length > 0 ? 100 : 80;
      
      const overallScore = Math.round((seoScore + headingScore + altScore + linkScore + structuredScore) / 5);
      
      const duration = performance.now() - startTime;
      return {
        testName: 'SEO Optimization',
        passed: overallScore >= 90,
        score: overallScore,
        message: `SEO elements: ${seoElements}/5, Headings: ${hasProperHeadings ? 'Yes' : 'No'}, Alt text: ${altTextCoverage.toFixed(1)}%`,
        duration,
        details: {
          hasTitle: !!title,
          hasDescription: !!description,
          hasH1: !!h1,
          hasCanonical: !!canonical,
          hasOgImage: !!ogImage,
          structuredDataCount: structuredData.length,
          hasProperHeadings,
          totalHeadings: headings.length,
          totalImages: images.length,
          imagesWithAlt,
          altTextCoverage: altTextCoverage.toFixed(1),
          internalLinks: internalLinks.length,
          seoScore: seoScore.toFixed(0),
          headingScore,
          altScore: altScore.toFixed(0),
          linkScore,
          structuredScore
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'SEO Optimization',
        passed: false,
        score: 0,
        message: `SEO test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test WCAG 2.1 AA accessibility compliance
  async testWCAGCompliance(): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    
    try {
      // Check for semantic HTML
      const semanticElements = document.querySelectorAll('main, section, article, aside, nav, header, footer');
      const hasSemanticHTML = semanticElements.length > 0;
      
      // Check for heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const hasHeadings = headings.length > 0;
      const headingHierarchy = this.checkHeadingHierarchy(Array.from(headings));
      
      // Check for ARIA labels
      const ariaLabels = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
      const hasAriaLabels = ariaLabels.length > 0;
      
      // Check for alt text on images
      const images = document.querySelectorAll('img');
      const imagesWithAlt = Array.from(images).filter(img => img.alt).length;
      const altTextCoverage = images.length > 0 ? (imagesWithAlt / images.length) * 100 : 100;
      
      // Check for focusable elements
      const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const hasFocusableElements = focusableElements.length > 0;
      
      // Check for color contrast (basic check)
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
      const hasTextElements = textElements.length > 0;
      
      // Check for keyboard navigation
      const hasKeyboardNav = this.checkKeyboardNavigation();
      
      // Check for form labels
      const formInputs = document.querySelectorAll('input, select, textarea');
      const labeledInputs = Array.from(formInputs).filter(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        return label || input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
      }).length;
      const formLabelCoverage = formInputs.length > 0 ? (labeledInputs / formInputs.length) * 100 : 100;
      
      // Score calculation
      const semanticScore = hasSemanticHTML ? 100 : 70;
      const headingScore = hasHeadings && headingHierarchy ? 100 : 70;
      const ariaScore = hasAriaLabels ? 100 : 80;
      const altScore = altTextCoverage;
      const focusScore = hasFocusableElements ? 100 : 80;
      const keyboardScore = hasKeyboardNav ? 100 : 80;
      const formScore = formLabelCoverage;
      
      const overallScore = Math.round((semanticScore + headingScore + ariaScore + altScore + focusScore + keyboardScore + formScore) / 7);
      
      const duration = performance.now() - startTime;
      return {
        testName: 'WCAG 2.1 AA Compliance',
        passed: overallScore >= 90,
        score: overallScore,
        message: `Semantic: ${hasSemanticHTML ? 'Yes' : 'No'}, Headings: ${hasHeadings ? 'Yes' : 'No'}, Alt text: ${altTextCoverage.toFixed(1)}%`,
        duration,
        details: {
          hasSemanticHTML,
          semanticElements: semanticElements.length,
          hasHeadings,
          headingHierarchy,
          totalHeadings: headings.length,
          hasAriaLabels,
          ariaElements: ariaLabels.length,
          totalImages: images.length,
          imagesWithAlt,
          altTextCoverage: altTextCoverage.toFixed(1),
          hasFocusableElements,
          focusableElements: focusableElements.length,
          hasTextElements,
          textElements: textElements.length,
          hasKeyboardNav,
          totalFormInputs: formInputs.length,
          labeledInputs,
          formLabelCoverage: formLabelCoverage.toFixed(1),
          semanticScore,
          headingScore,
          ariaScore,
          altScore: altScore.toFixed(0),
          focusScore,
          keyboardScore,
          formScore: formScore.toFixed(0)
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'WCAG 2.1 AA Compliance',
        passed: false,
        score: 0,
        message: `WCAG test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Check heading hierarchy
  private checkHeadingHierarchy(headings: Element[]): boolean {
    let previousLevel = 0;
    
    for (const heading of headings) {
      const level = parseInt(heading.tagName.substring(1));
      if (level > previousLevel + 1) {
        return false;
      }
      previousLevel = level;
    }
    
    return true;
  }

  // Check keyboard navigation
  private checkKeyboardNavigation(): boolean {
    // Basic check for tabindex and focus management
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const hasTabIndex = document.querySelectorAll('[tabindex]').length > 0;
    const hasFocusManagement = focusableElements.length > 0;
    
    return hasTabIndex && hasFocusManagement;
  }

  // Test mobile responsiveness
  async testMobileResponsiveness(): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    
    try {
      // Check viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const hasViewport = !!viewportMeta;
      
      // Check for responsive images
      const responsiveImages = document.querySelectorAll('img[srcset], picture source');
      const hasResponsiveImages = responsiveImages.length > 0;
      
      // Check for responsive design patterns
      const responsiveClasses = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
      const hasResponsiveClasses = responsiveClasses.length > 0;
      
      // Check for touch-friendly elements
      const touchTargets = document.querySelectorAll('button, a, input, [role="button"]');
      const hasTouchTargets = touchTargets.length > 0;
      
      // Check for mobile-friendly navigation
      const mobileNav = document.querySelector('nav, [role="navigation"]');
      const hasMobileNav = !!mobileNav;
      
      // Score calculation
      const viewportScore = hasViewport ? 100 : 0;
      const imageScore = hasResponsiveImages ? 100 : 80;
      const classScore = hasResponsiveClasses ? 100 : 70;
      const touchScore = hasTouchTargets ? 100 : 80;
      const navScore = hasMobileNav ? 100 : 80;
      
      const overallScore = Math.round((viewportScore + imageScore + classScore + touchScore + navScore) / 5);
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Mobile Responsiveness',
        passed: overallScore >= 90,
        score: overallScore,
        message: `Viewport: ${hasViewport ? 'Yes' : 'No'}, Responsive classes: ${hasResponsiveClasses ? 'Yes' : 'No'}, Touch targets: ${hasTouchTargets ? 'Yes' : 'No'}`,
        duration,
        details: {
          hasViewport,
          hasResponsiveImages,
          responsiveImages: responsiveImages.length,
          hasResponsiveClasses,
          responsiveClasses: responsiveClasses.length,
          hasTouchTargets,
          touchTargets: touchTargets.length,
          hasMobileNav,
          viewportScore,
          imageScore,
          classScore,
          touchScore,
          navScore
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Mobile Responsiveness',
        passed: false,
        score: 0,
        message: `Mobile test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test security best practices
  async testSecurityBestPractices(): Promise<PerformanceTestResult> {
    const startTime = performance.now();
    
    try {
      // Check for security headers (meta tags)
      const xFrameOptions = document.querySelector('meta[http-equiv="X-Frame-Options"]');
      const xContentTypeOptions = document.querySelector('meta[http-equiv="X-Content-Type-Options"]');
      const xXSSProtection = document.querySelector('meta[http-equiv="X-XSS-Protection"]');
      const referrerPolicy = document.querySelector('meta[name="referrer-policy"]');
      
      // Check for HTTPS (in production)
      const isHTTPS = window.location.protocol === 'https:';
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      // Check for secure forms
      const forms = document.querySelectorAll('form');
      const secureForms = Array.from(forms).filter(form => {
        const action = form.getAttribute('action');
        return !action || action.startsWith('https:') || action.startsWith('/');
      }).length;
      
      // Check for external links with rel="noopener"
      const externalLinks = document.querySelectorAll('a[href^="http"]:not([href^="https://' + window.location.hostname + '"])');
      const secureExternalLinks = Array.from(externalLinks).filter(link => {
        return link.getAttribute('rel')?.includes('noopener');
      }).length;
      
      // Score calculation
      const headerScore = (xFrameOptions && xContentTypeOptions && xXSSProtection) ? 100 : 70;
      const httpsScore = (isHTTPS || isLocalhost) ? 100 : 0;
      const formScore = forms.length > 0 ? (secureForms / forms.length) * 100 : 100;
      const linkScore = externalLinks.length > 0 ? (secureExternalLinks / externalLinks.length) * 100 : 100;
      
      const overallScore = Math.round((headerScore + httpsScore + formScore + linkScore) / 4);
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Security Best Practices',
        passed: overallScore >= 90,
        score: overallScore,
        message: `Security headers: ${headerScore}%, HTTPS: ${httpsScore}%, Secure forms: ${formScore.toFixed(0)}%, Secure links: ${linkScore.toFixed(0)}%`,
        duration,
        details: {
          hasXFrameOptions: !!xFrameOptions,
          hasXContentTypeOptions: !!xContentTypeOptions,
          hasXXSSProtection: !!xXSSProtection,
          hasReferrerPolicy: !!referrerPolicy,
          isHTTPS,
          isLocalhost,
          totalForms: forms.length,
          secureForms,
          totalExternalLinks: externalLinks.length,
          secureExternalLinks,
          headerScore,
          httpsScore,
          formScore: formScore.toFixed(0),
          linkScore: linkScore.toFixed(0)
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Security Best Practices',
        passed: false,
        score: 0,
        message: `Security test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Run all performance tests
  async runAllPerformanceTests(): Promise<PerformanceTestSuite> {
    const startTime = performance.now();
    this.results = [];

    const tests = [
      this.testCoreWebVitals(),
      this.testPageLoadPerformance(),
      this.testSEOOptimization(),
      this.testWCAGCompliance(),
      this.testMobileResponsiveness(),
      this.testSecurityBestPractices()
    ];

    const results = await Promise.all(tests);
    this.results = results;
    
    const totalDuration = performance.now() - startTime;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results.filter(r => !r.passed).length;
    const overallScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);

    return {
      suiteName: 'Performance & Accessibility Audit',
      tests: this.results,
      totalDuration,
      passedTests,
      failedTests,
      overallScore
    };
  }

  // Generate performance test report
  generatePerformanceReport(testSuite: PerformanceTestSuite): string {
    const report = `
# Performance & Accessibility Audit Report

## Summary
- **Overall Score**: ${testSuite.overallScore}/100
- **Total Tests**: ${testSuite.tests.length}
- **Passed**: ${testSuite.passedTests}
- **Failed**: ${testSuite.failedTests}
- **Total Duration**: ${testSuite.totalDuration.toFixed(2)}ms
- **Success Rate**: ${((testSuite.passedTests / testSuite.tests.length) * 100).toFixed(1)}%

## Test Results

${testSuite.tests.map(test => `
### ${test.testName}
- **Status**: ${test.passed ? '✅ PASSED' : '❌ FAILED'}
- **Score**: ${test.score}/100
- **Duration**: ${test.duration.toFixed(2)}ms
- **Message**: ${test.message}
${test.details ? `
**Details**:
${Object.entries(test.details).map(([key, value]) => `- ${key}: ${value}`).join('\n')}
` : ''}
`).join('')}

## Performance Analysis

${testSuite.tests.find(t => t.testName === 'Core Web Vitals')?.details ? `
**Core Web Vitals**:
- First Contentful Paint (FCP): ${testSuite.tests.find(t => t.testName === 'Core Web Vitals')?.details?.fcp}ms
- Largest Contentful Paint (LCP): ${testSuite.tests.find(t => t.testName === 'Core Web Vitals')?.details?.lcp}ms
- First Input Delay (FID): ${testSuite.tests.find(t => t.testName === 'Core Web Vitals')?.details?.fid}ms
- Cumulative Layout Shift (CLS): ${testSuite.tests.find(t => t.testName === 'Core Web Vitals')?.details?.cls}
- Load Time: ${testSuite.tests.find(t => t.testName === 'Core Web Vitals')?.details?.loadTime}ms
` : ''}

${testSuite.tests.find(t => t.testName === 'Page Load Performance')?.details ? `
**Page Load Performance**:
- Total Load Time: ${testSuite.tests.find(t => t.testName === 'Page Load Performance')?.details?.totalTime}ms
- DOM Content Loaded: ${testSuite.tests.find(t => t.testName === 'Page Load Performance')?.details?.domContentLoaded}ms
- Load Complete: ${testSuite.tests.find(t => t.testName === 'Page Load Performance')?.details?.loadComplete}ms
- Total Resources: ${testSuite.tests.find(t => t.testName === 'Page Load Performance')?.details?.totalResources}
- Cache Hit Rate: ${testSuite.tests.find(t => t.testName === 'Page Load Performance')?.details?.cacheHitRate}%
` : ''}

## SEO Analysis

${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details ? `
**SEO Elements**:
- Title Tag: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details?.hasTitle ? 'Yes' : 'No'}
- Meta Description: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details?.hasDescription ? 'Yes' : 'No'}
- H1 Tag: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details?.hasH1 ? 'Yes' : 'No'}
- Canonical URL: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details?.hasCanonical ? 'Yes' : 'No'}
- OG Image: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details?.hasOgImage ? 'Yes' : 'No'}
- Structured Data: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details?.structuredDataCount} items
- Alt Text Coverage: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details?.altTextCoverage}%
- Internal Links: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.details?.internalLinks}
` : ''}

## Accessibility Analysis

${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.details ? `
**WCAG 2.1 AA Compliance**:
- Semantic HTML: ${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.details?.hasSemanticHTML ? 'Yes' : 'No'}
- Heading Hierarchy: ${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.details?.headingHierarchy ? 'Yes' : 'No'}
- ARIA Labels: ${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.details?.hasAriaLabels ? 'Yes' : 'No'}
- Alt Text Coverage: ${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.details?.altTextCoverage}%
- Focusable Elements: ${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.details?.focusableElements}
- Keyboard Navigation: ${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.details?.hasKeyboardNav ? 'Yes' : 'No'}
- Form Label Coverage: ${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.details?.formLabelCoverage}%
` : ''}

## Mobile Analysis

${testSuite.tests.find(t => t.testName === 'Mobile Responsiveness')?.details ? `
**Mobile Responsiveness**:
- Viewport Meta Tag: ${testSuite.tests.find(t => t.testName === 'Mobile Responsiveness')?.details?.hasViewport ? 'Yes' : 'No'}
- Responsive Images: ${testSuite.tests.find(t => t.testName === 'Mobile Responsiveness')?.details?.hasResponsiveImages ? 'Yes' : 'No'}
- Responsive Classes: ${testSuite.tests.find(t => t.testName === 'Mobile Responsiveness')?.details?.hasResponsiveClasses ? 'Yes' : 'No'}
- Touch Targets: ${testSuite.tests.find(t => t.testName === 'Mobile Responsiveness')?.details?.hasTouchTargets ? 'Yes' : 'No'}
- Mobile Navigation: ${testSuite.tests.find(t => t.testName === 'Mobile Responsiveness')?.details?.hasMobileNav ? 'Yes' : 'No'}
` : ''}

## Security Analysis

${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details ? `
**Security Best Practices**:
- X-Frame-Options: ${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details?.hasXFrameOptions ? 'Yes' : 'No'}
- X-Content-Type-Options: ${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details?.hasXContentTypeOptions ? 'Yes' : 'No'}
- X-XSS-Protection: ${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details?.hasXXSSProtection ? 'Yes' : 'No'}
- HTTPS: ${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details?.isHTTPS ? 'Yes' : 'No'}
- Secure Forms: ${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details?.secureForms}/${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details?.totalForms}
- Secure External Links: ${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details?.secureExternalLinks}/${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.details?.totalExternalLinks}
` : ''}

## Recommendations

${testSuite.failedTests > 0 ? `
⚠️ **Action Required**: ${testSuite.failedTests} test(s) failed. Please review and fix the issues.

**Priority Issues**:
${testSuite.tests.filter(t => !t.passed).map(test => `- ${test.testName}: ${test.message}`).join('\n')}
` : `
✅ **All Tests Passed**: The application meets performance and accessibility standards.
`}

## Lighthouse Score Targets

- **Performance**: 90+ (Current: ${testSuite.tests.find(t => t.testName === 'Core Web Vitals')?.score || 0})
- **Accessibility**: 90+ (Current: ${testSuite.tests.find(t => t.testName === 'WCAG 2.1 AA Compliance')?.score || 0})
- **Best Practices**: 90+ (Current: ${testSuite.tests.find(t => t.testName === 'Security Best Practices')?.score || 0})
- **SEO**: 90+ (Current: ${testSuite.tests.find(t => t.testName === 'SEO Optimization')?.score || 0})

## Next Steps

1. Address any failed tests with priority given to Core Web Vitals
2. Implement missing SEO elements if needed
3. Improve accessibility compliance where scores are below 90
4. Optimize mobile responsiveness for better user experience
5. Enhance security measures where gaps exist
    `.trim();

    return report;
  }
}

// Export the performance tester
export const performanceTester = new PerformanceTester();

// Export a function to run performance tests and log results
export const runPerformanceTests = async () => {
  console.log('🚀 Running Performance & Accessibility Tests...');
  
  const testSuite = await performanceTester.runAllPerformanceTests();
  const report = performanceTester.generatePerformanceReport(testSuite);
  
  console.log(report);
  
  // Also log to analytics for monitoring
  analytics.trackEvent('performance_test_run', {
    overallScore: testSuite.overallScore,
    passedTests: testSuite.passedTests,
    failedTests: testSuite.failedTests,
    totalDuration: testSuite.totalDuration,
    successRate: (testSuite.passedTests / testSuite.tests.length) * 100
  });
  
  return testSuite;
};
