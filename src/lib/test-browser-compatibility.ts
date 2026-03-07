// Cross-browser compatibility testing suite
import { analytics } from "./analytics";

export interface BrowserTestResult {
  testName: string;
  passed: boolean;
  score: number;
  message: string;
  duration: number;
  details?: any;
}

export interface BrowserTestSuite {
  suiteName: string;
  tests: BrowserTestResult[];
  totalDuration: number;
  passedTests: number;
  failedTests: number;
  overallScore: number;
}

class BrowserCompatibilityTester {
  private results: BrowserTestResult[] = [];

  // Test browser feature support
  async testBrowserFeatureSupport(): Promise<BrowserTestResult> {
    const startTime = performance.now();
    
    try {
      // Check for modern JavaScript features
      const features = {
        asyncAwait: typeof Promise !== 'undefined' && typeof window !== 'undefined',
        arrowFunctions: (() => {}).toString().includes('=>'),
        templateLiterals: `\`test\` === 'test'`,
        destructuring: (() => { const [a] = [1]; return a === 1; })(),
        spreadOperator: [...[1, 2, 3]].length === 3,
        optionalChaining: typeof window !== 'undefined' && window?.navigator !== undefined,
        nullishCoalescing: null ?? 'test' === 'test',
        modules: typeof module !== 'undefined' || typeof window !== 'undefined',
        classes: class Test {} !== undefined,
        generators: function* gen() { yield 1; }.constructor.name === 'GeneratorFunction'
      };
      
      const supportedFeatures = Object.values(features).filter(Boolean).length;
      const totalFeatures = Object.keys(features).length;
      const featureScore = (supportedFeatures / totalFeatures) * 100;
      
      // Check for CSS feature support
      const cssFeatures = {
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('color', 'var(--test)'),
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
        transform3d: CSS.supports('transform', 'translate3d(0,0,0)'),
        animations: CSS.supports('animation', 'test 1s'),
        transitions: CSS.supports('transition', 'all 1s'),
        objectFit: CSS.supports('object-fit', 'cover'),
        positionSticky: CSS.supports('position', 'sticky'),
        aspectRatio: CSS.supports('aspect-ratio', '16/9')
      };
      
      const supportedCSSFeatures = Object.values(cssFeatures).filter(Boolean).length;
      const totalCSSFeatures = Object.keys(cssFeatures).length;
      const cssScore = (supportedCSSFeatures / totalCSSFeatures) * 100;
      
      // Check for Web API support
      const webAPIs = {
        intersectionObserver: 'IntersectionObserver' in window,
        mutationObserver: 'MutationObserver' in window,
        resizeObserver: 'ResizeObserver' in window,
        fetch: 'fetch' in window,
        localStorage: 'localStorage' in window,
        sessionStorage: 'sessionStorage' in window,
        webWorkers: 'Worker' in window,
        serviceWorkers: 'serviceWorker' in navigator,
        geolocation: 'geolocation' in navigator,
        camera: 'mediaDevices' in navigator,
        webGL: (() => {
          try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
          } catch (e) {
            return false;
          }
        })()
      };
      
      const supportedWebAPIs = Object.values(webAPIs).filter(Boolean).length;
      const totalWebAPIs = Object.keys(webAPIs).length;
      const webAPIScore = (supportedWebAPIs / totalWebAPIs) * 100;
      
      const overallScore = Math.round((featureScore + cssScore + webAPIScore) / 3);
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Browser Feature Support',
        passed: overallScore >= 90,
        score: overallScore,
        message: `JS Features: ${supportedFeatures}/${totalFeatures}, CSS: ${supportedCSSFeatures}/${totalCSSFeatures}, Web APIs: ${supportedWebAPIs}/${totalWebAPIs}`,
        duration,
        details: {
          features,
          supportedFeatures,
          totalFeatures,
          featureScore: featureScore.toFixed(1),
          cssFeatures,
          supportedCSSFeatures,
          totalCSSFeatures,
          cssScore: cssScore.toFixed(1),
          webAPIs,
          supportedWebAPIs,
          totalWebAPIs,
          webAPIScore: webAPIScore.toFixed(1)
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Browser Feature Support',
        passed: false,
        score: 0,
        message: `Browser feature test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test rendering consistency
  async testRenderingConsistency(): Promise<BrowserTestResult> {
    const startTime = performance.now();
    
    try {
      // Check for consistent rendering
      const testElement = document.createElement('div');
      testElement.style.cssText = 'width: 100px; height: 100px; background: red; position: absolute; top: -1000px; left: -1000px;';
      document.body.appendChild(testElement);
      
      const rect = testElement.getBoundingClientRect();
      const hasCorrectDimensions = Math.abs(rect.width - 100) < 1 && Math.abs(rect.height - 100) < 1;
      
      // Check for box model consistency
      const boxTest = document.createElement('div');
      boxTest.style.cssText = 'width: 50px; height: 50px; padding: 10px; border: 2px solid black; margin: 5px; position: absolute; top: -1000px; left: -1000px;';
      document.body.appendChild(boxTest);
      
      const boxRect = boxTest.getBoundingClientRect();
      const expectedBoxSize = 50 + 10 + 10 + 2 + 2 + 5 + 5; // width + padding*2 + border*2 + margin*2
      const hasCorrectBoxModel = Math.abs(boxRect.width - expectedBoxSize) < 1;
      
      // Check for font rendering
      const fontTest = document.createElement('div');
      fontTest.style.cssText = 'font-size: 16px; font-family: Arial; position: absolute; top: -1000px; left: -1000px;';
      fontTest.textContent = 'Test';
      document.body.appendChild(fontTest);
      
      const fontRect = fontTest.getBoundingClientRect();
      const hasFontRendering = fontRect.height > 10 && fontRect.width > 10;
      
      // Clean up
      document.body.removeChild(testElement);
      document.body.removeChild(boxTest);
      document.body.removeChild(fontTest);
      
      const consistencyScore = (hasCorrectDimensions ? 33.3 : 0) + (hasCorrectBoxModel ? 33.3 : 0) + (hasFontRendering ? 33.4 : 0);
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Rendering Consistency',
        passed: consistencyScore >= 90,
        score: Math.round(consistencyScore),
        message: `Dimensions: ${hasCorrectDimensions ? 'Yes' : 'No'}, Box model: ${hasCorrectBoxModel ? 'Yes' : 'No'}, Font: ${hasFontRendering ? 'Yes' : 'No'}`,
        duration,
        details: {
          hasCorrectDimensions,
          hasCorrectBoxModel,
          hasFontRendering,
          consistencyScore: consistencyScore.toFixed(1)
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Rendering Consistency',
        passed: false,
        score: 0,
        message: `Rendering test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test responsive design compatibility
  async testResponsiveDesignCompatibility(): Promise<BrowserTestResult> {
    const startTime = performance.now();
    
    try {
      // Check viewport support
      const hasViewport = !!document.querySelector('meta[name="viewport"]');
      
      // Check media query support
      const mediaQuerySupport = window.matchMedia && window.matchMedia('(min-width: 768px)').matches !== undefined;
      
      // Check CSS Grid support
      const gridSupport = CSS.supports('display', 'grid');
      
      // Check Flexbox support
      const flexboxSupport = CSS.supports('display', 'flex');
      
      // Check responsive images support
      const responsiveImageSupport = 'srcset' in document.createElement('img') && 'sizes' in document.createElement('img');
      
      // Check picture element support
      const pictureSupport = 'HTMLPictureElement' in window;
      
      // Check viewport units support
      const viewportUnitsSupport = CSS.supports('width', '1vw') && CSS.supports('height', '1vh');
      
      // Check container queries support
      const containerQueriesSupport = CSS.supports('container-type', 'inline-size');
      
      const compatibilityScore = (
        (hasViewport ? 14.3 : 0) +
        (mediaQuerySupport ? 14.3 : 0) +
        (gridSupport ? 14.3 : 0) +
        (flexboxSupport ? 14.3 : 0) +
        (responsiveImageSupport ? 14.3 : 0) +
        (pictureSupport ? 14.3 : 0) +
        (viewportUnitsSupport ? 14.3 : 0) +
        (containerQueriesSupport ? 14.2 : 0)
      );
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Responsive Design Compatibility',
        passed: compatibilityScore >= 85,
        score: Math.round(compatibilityScore),
        message: `Viewport: ${hasViewport ? 'Yes' : 'No'}, Media queries: ${mediaQuerySupport ? 'Yes' : 'No'}, Grid: ${gridSupport ? 'Yes' : 'No'}, Flexbox: ${flexboxSupport ? 'Yes' : 'No'}`,
        duration,
        details: {
          hasViewport,
          mediaQuerySupport,
          gridSupport,
          flexboxSupport,
          responsiveImageSupport,
          pictureSupport,
          viewportUnitsSupport,
          containerQueriesSupport,
          compatibilityScore: compatibilityScore.toFixed(1)
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Responsive Design Compatibility',
        passed: false,
        score: 0,
        message: `Responsive design test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test animation compatibility
  async testAnimationCompatibility(): Promise<BrowserTestResult> {
    const startTime = performance.now();
    
    try {
      // Check CSS animations support
      const cssAnimations = CSS.supports('animation', 'test 1s');
      
      // Check CSS transitions support
      const cssTransitions = CSS.supports('transition', 'all 1s');
      
      // Check transform support
      const transforms = CSS.supports('transform', 'translateX(10px)');
      
      // Check 3D transforms support
      const transforms3D = CSS.supports('transform', 'translate3d(10px, 10px, 10px)');
      
      // Check Web Animations API support
      const webAnimationsAPI = 'animate' in document.createElement('div');
      
      // Check requestAnimationFrame support
      const requestAnimationFrameSupport = 'requestAnimationFrame' in window;
      
      // Check CSS custom properties support
      const customProperties = CSS.supports('color', 'var(--test)');
      
      // Check backdrop filter support
      const backdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');
      
      const compatibilityScore = (
        (cssAnimations ? 12.5 : 0) +
        (cssTransitions ? 12.5 : 0) +
        (transforms ? 12.5 : 0) +
        (transforms3D ? 12.5 : 0) +
        (webAnimationsAPI ? 12.5 : 0) +
        (requestAnimationFrameSupport ? 12.5 : 0) +
        (customProperties ? 12.5 : 0) +
        (backdropFilter ? 12.5 : 0)
      );
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Animation Compatibility',
        passed: compatibilityScore >= 87.5,
        score: Math.round(compatibilityScore),
        message: `CSS Animations: ${cssAnimations ? 'Yes' : 'No'}, Transitions: ${cssTransitions ? 'Yes' : 'No'}, Transforms: ${transforms ? 'Yes' : 'No'}, 3D: ${transforms3D ? 'Yes' : 'No'}`,
        duration,
        details: {
          cssAnimations,
          cssTransitions,
          transforms,
          transforms3D,
          webAnimationsAPI,
          requestAnimationFrameSupport,
          customProperties,
          backdropFilter,
          compatibilityScore: compatibilityScore.toFixed(1)
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Animation Compatibility',
        passed: false,
        score: 0,
        message: `Animation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test form compatibility
  async testFormCompatibility(): Promise<BrowserTestResult> {
    const startTime = performance.now();
    
    try {
      // Check form validation support
      const formValidation = 'validity' in document.createElement('input');
      
      // Check input types support
      const inputTypes = {
        email: 'email' in document.createElement('input'),
        tel: 'tel' in document.createElement('input'),
        url: 'url' in document.createElement('input'),
        number: 'number' in document.createElement('input'),
        date: 'date' in document.createElement('input'),
        time: 'time' in document.createElement('input'),
        month: 'month' in document.createElement('input'),
        week: 'week' in document.createElement('input'),
        range: 'range' in document.createElement('input'),
        color: 'color' in document.createElement('input'),
        search: 'search' in document.createElement('input')
      };
      
      const supportedInputTypes = Object.values(inputTypes).filter(Boolean).length;
      const totalInputTypes = Object.keys(inputTypes).length;
      const inputTypeScore = (supportedInputTypes / totalInputTypes) * 100;
      
      // Check FormData support
      const formDataSupport = 'FormData' in window;
      
      // Check File API support
      const fileAPISupport = 'File' in window && 'FileReader' in window;
      
      // Check fetch API support
      const fetchSupport = 'fetch' in window;
      
      // Check progress events support
      const progressEvents = 'ProgressEvent' in window;
      
      const compatibilityScore = (inputTypeScore + (formDataSupport ? 20 : 0) + (fileAPISupport ? 20 : 0) + (fetchSupport ? 20 : 0) + (progressEvents ? 20 : 0)) / 5;
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Form Compatibility',
        passed: compatibilityScore >= 80,
        score: Math.round(compatibilityScore),
        message: `Input types: ${supportedInputTypes}/${totalInputTypes}, FormData: ${formDataSupport ? 'Yes' : 'No'}, File API: ${fileAPISupport ? 'Yes' : 'No'}`,
        duration,
        details: {
          formValidation,
          inputTypes,
          supportedInputTypes,
          totalInputTypes,
          inputTypeScore: inputTypeScore.toFixed(1),
          formDataSupport,
          fileAPISupport,
          fetchSupport,
          progressEvents,
          compatibilityScore: compatibilityScore.toFixed(1)
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Form Compatibility',
        passed: false,
        score: 0,
        message: `Form compatibility test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Detect browser information
  detectBrowserInfo() {
    const userAgent = navigator.userAgent;
    const vendor = navigator.vendor || '';
    
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let os = 'Unknown';
    
    // Detect browser
    if (userAgent.includes('Chrome')) {
      browserName = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browserName = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Edge')) {
      browserName = 'Edge';
      const match = userAgent.match(/Edge\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    }
    
    // Detect OS
    if (userAgent.includes('Windows')) {
      os = 'Windows';
    } else if (userAgent.includes('Mac')) {
      os = 'macOS';
    } else if (userAgent.includes('Linux')) {
      os = 'Linux';
    } else if (userAgent.includes('Android')) {
      os = 'Android';
    } else if (userAgent.includes('iOS')) {
      os = 'iOS';
    }
    
    return {
      browserName,
      browserVersion,
      os,
      userAgent,
      vendor,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as any).deviceMemory || 0,
      maxTouchPoints: navigator.maxTouchPoints || 0
    };
  }

  // Run all browser compatibility tests
  async runAllBrowserTests(): Promise<BrowserTestSuite> {
    const startTime = performance.now();
    this.results = [];

    const tests = [
      this.testBrowserFeatureSupport(),
      this.testRenderingConsistency(),
      this.testResponsiveDesignCompatibility(),
      this.testAnimationCompatibility(),
      this.testFormCompatibility()
    ];

    const results = await Promise.all(tests);
    this.results = results;
    
    const totalDuration = performance.now() - startTime;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results.filter(r => !r.passed).length;
    const overallScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);

    return {
      suiteName: 'Cross-Browser Compatibility',
      tests: this.results,
      totalDuration,
      passedTests,
      failedTests,
      overallScore
    };
  }

  // Generate browser compatibility report
  generateBrowserReport(testSuite: BrowserTestSuite): string {
    const browserInfo = this.detectBrowserInfo();
    
    const report = `
# Cross-Browser Compatibility Report

## Browser Information
- **Browser**: ${browserInfo.browserName} ${browserInfo.browserVersion}
- **Operating System**: ${browserInfo.os}
- **Platform**: ${browserInfo.platform}
- **Language**: ${browserInfo.language}
- **User Agent**: ${browserInfo.userAgent}

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

## Compatibility Analysis

${testSuite.tests.find(t => t.testName === 'Browser Feature Support')?.details ? `
**JavaScript Features**:
${Object.entries(testSuite.tests.find(t => t.testName === 'Browser Feature Support')?.details?.features || {})
  .filter(([key, value]) => value)
  .map(([key]) => `- ${key}`)
  .join('\n')}

**CSS Features**:
${Object.entries(testSuite.tests.find(t => t.testName === 'Browser Feature Support')?.details?.cssFeatures || {})
  .filter(([key, value]) => value)
  .map(([key]) => `- ${key}`)
  .join('\n')}

**Web APIs**:
${Object.entries(testSuite.tests.find(t => t.testName === 'Browser Feature Support')?.details?.webAPIs || {})
  .filter(([key, value]) => value)
  .map(([key]) => `- ${key}`)
  .join('\n')}
` : ''}

## Recommendations

${testSuite.failedTests > 0 ? `
⚠️ **Compatibility Issues Detected**: ${testSuite.failedTests} test(s) failed.

**Issues to Address**:
${testSuite.tests.filter(t => !t.passed).map(test => `- ${test.testName}: ${test.message}`).join('\n')}

**Polyfills May Be Needed**:
${testSuite.tests.filter(t => !t.passed).map(test => {
  const missingFeatures = [];
  if (test.testName === 'Browser Feature Support') {
    const details = test.details;
    if (!details?.features?.asyncAwait) missingFeatures.push('Async/Await');
    if (!details?.cssFeatures?.grid) missingFeatures.push('CSS Grid');
    if (!details?.webAPIs?.intersectionObserver) missingFeatures.push('Intersection Observer');
  }
  return missingFeatures.length > 0 ? `- ${test.testName}: ${missingFeatures.join(', ')}` : '';
}).filter(Boolean).join('\n')}
` : `
✅ **Excellent Compatibility**: All tests passed. The application should work well across modern browsers.
`}

## Browser-Specific Recommendations

${browserInfo.browserName === 'Internet Explorer' ? `
❌ **Internet Explorer Not Supported**: This browser is outdated and lacks many modern features. Please upgrade to a modern browser.
` : ''}

${browserInfo.browserName === 'Safari' && parseInt(browserInfo.browserVersion) < 12 ? `
⚠️ **Safari Version**: Consider upgrading to Safari 12+ for better feature support, particularly for CSS Grid and modern JavaScript features.
` : ''}

${browserInfo.browserName === 'Firefox' && parseInt(browserInfo.browserVersion) < 60 ? `
⚠️ **Firefox Version**: Consider upgrading to Firefox 60+ for better performance and feature support.
` : ''}

${browserInfo.browserName === 'Chrome' && parseInt(browserInfo.browserVersion) < 80 ? `
⚠️ **Chrome Version**: Consider upgrading to Chrome 80+ for the latest features and security updates.
` : ''}

## Performance Impact

- **Hardware Concurrency**: ${browserInfo.hardwareConcurrency} cores
- **Device Memory**: ${browserInfo.deviceMemory}GB
- **Max Touch Points**: ${browserInfo.maxTouchPoints}
- **Cookie Enabled**: ${browserInfo.cookieEnabled ? 'Yes' : 'No'}
- **Online Status**: ${browserInfo.onLine ? 'Yes' : 'No'}

## Next Steps

1. **For Failed Tests**: Implement polyfills or provide fallbacks
2. **For Edge Cases**: Test on actual target browsers
3. **Performance**: Optimize for lower-end devices if needed
4. **Testing**: Set up automated cross-browser testing
5. **Monitoring**: Track real-world browser usage and issues
    `.trim();

    return report;
  }
}

// Export the browser compatibility tester
export const browserCompatibilityTester = new BrowserCompatibilityTester();

// Export a function to run browser tests and log results
export const runBrowserTests = async () => {
  console.log('🌐 Running Cross-Browser Compatibility Tests...');
  
  const testSuite = await browserCompatibilityTester.runAllBrowserTests();
  const report = browserCompatibilityTester.generateBrowserReport(testSuite);
  
  console.log(report);
  
  // Also log to analytics for monitoring
  analytics.trackEvent('browser_compatibility_test_run', {
    overallScore: testSuite.overallScore,
    passedTests: testSuite.passedTests,
    failedTests: testSuite.failedTests,
    totalDuration: testSuite.totalDuration,
    successRate: (testSuite.passedTests / testSuite.tests.length) * 100,
    browser: browserCompatibilityTester.detectBrowserInfo().browserName,
    browserVersion: browserCompatibilityTester.detectBrowserInfo().browserVersion,
    os: browserCompatibilityTester.detectBrowserInfo().os
  });
  
  return testSuite;
};
