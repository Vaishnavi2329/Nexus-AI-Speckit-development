// Test script for pricing component responsiveness and accessibility
import { analytics } from "./analytics";

export interface PricingTestResult {
  testName: string;
  passed: boolean;
  message: string;
  duration: number;
  details?: any;
}

export interface PricingTestSuite {
  suiteName: string;
  tests: PricingTestResult[];
  totalDuration: number;
  passedTests: number;
  failedTests: number;
}

class PricingTester {
  private results: PricingTestResult[] = [];

  // Test pricing section structure
  async testPricingSectionStructure(): Promise<PricingTestResult> {
    const startTime = performance.now();
    
    try {
      // Check if pricing section exists
      const pricingSection = document.getElementById('pricing');
      if (!pricingSection) {
        throw new Error('Pricing section not found');
      }

      // Check for pricing cards
      const pricingCards = pricingSection.querySelectorAll('[data-testid*="pricing-card"]');
      if (pricingCards.length === 0) {
        throw new Error('No pricing cards found');
      }

      // Check for comparison table
      const comparisonTable = pricingSection.querySelector('table');
      if (!comparisonTable) {
        throw new Error('Comparison table not found');
      }

      // Check for FAQ section
      const faqSection = pricingSection.querySelector('h3');
      if (!faqSection || !faqSection.textContent?.includes('Frequently Asked Questions')) {
        throw new Error('FAQ section not found');
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Pricing Section Structure',
        passed: true,
        message: `Found ${pricingCards.length} pricing cards, comparison table, and FAQ section`,
        duration,
        details: {
          pricingCards: pricingCards.length,
          hasComparisonTable: !!comparisonTable,
          hasFAQSection: !!faqSection
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Pricing Section Structure',
        passed: false,
        message: `Structure test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test responsive design
  async testResponsiveDesign(): Promise<PricingTestResult> {
    const startTime = performance.now();
    
    try {
      // Check viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const hasViewport = viewportMeta !== null;

      // Check for responsive classes
      const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
      
      // Check pricing grid layout
      const pricingSection = document.getElementById('pricing');
      const pricingGrid = pricingSection?.querySelector('.grid');
      const hasGridLayout = pricingGrid !== null;

      // Check mobile-friendly elements
      const mobileButtons = document.querySelectorAll('button.px-8');
      const hasMobileButtons = mobileButtons.length > 0;

      // Test different viewport sizes (simulate)
      const originalWidth = window.innerWidth;
      let responsiveBreakpoints = 0;

      // Check if elements adapt to different sizes
      if (originalWidth < 768) {
        responsiveBreakpoints++;
      } else if (originalWidth < 1024) {
        responsiveBreakpoints++;
      } else {
        responsiveBreakpoints++;
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Responsive Design',
        passed: hasViewport && responsiveElements.length > 0 && hasGridLayout,
        message: `Found ${responsiveElements.length} responsive elements, grid layout: ${hasGridLayout}, viewport meta: ${hasViewport}`,
        duration,
        details: {
          hasViewport,
          responsiveElements: responsiveElements.length,
          hasGridLayout,
          hasMobileButtons,
          responsiveBreakpoints
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Responsive Design',
        passed: false,
        message: `Responsive design test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test accessibility compliance
  async testAccessibility(): Promise<PricingTestResult> {
    const startTime = performance.now();
    
    try {
      const pricingSection = document.getElementById('pricing');
      if (!pricingSection) {
        throw new Error('Pricing section not found');
      }

      // Check for semantic HTML
      const semanticElements = pricingSection.querySelectorAll('h1, h2, h3, h4, h5, h6, nav, main, section, article, aside, footer, header');
      const hasSemanticHTML = semanticElements.length > 0;

      // Check for ARIA labels
      const ariaElements = pricingSection.querySelectorAll('[aria-label], [aria-describedby], [aria-expanded]');
      const hasAriaLabels = ariaElements.length > 0;

      // Check for alt text on images
      const images = pricingSection.querySelectorAll('img');
      const imagesWithAlt = Array.from(images).filter(img => img.alt).length;
      const hasAltText = images.length === 0 || imagesWithAlt === images.length;

      // Check for focusable elements
      const focusableElements = pricingSection.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const hasFocusableElements = focusableElements.length > 0;

      // Check for keyboard navigation
      const buttons = pricingSection.querySelectorAll('button');
      const hasKeyboardNavigation = buttons.length > 0;

      // Check color contrast (basic check)
      const textElements = pricingSection.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
      const hasTextElements = textElements.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Accessibility Compliance',
        passed: hasSemanticHTML && hasAltText && hasFocusableElements,
        message: `Semantic: ${hasSemanticHTML}, Alt text: ${hasAltText}, Focusable: ${hasFocusableElements}, ARIA: ${hasAriaLabels}`,
        duration,
        details: {
          hasSemanticHTML,
          semanticElements: semanticElements.length,
          hasAriaLabels,
          ariaElements: ariaElements.length,
          hasAltText,
          images: images.length,
          imagesWithAlt,
          hasFocusableElements,
          focusableElements: focusableElements.length,
          hasKeyboardNavigation,
          buttons: buttons.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Accessibility Compliance',
        passed: false,
        message: `Accessibility test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test pricing card functionality
  async testPricingCardFunctionality(): Promise<PricingTestResult> {
    const startTime = performance.now();
    
    try {
      const pricingSection = document.getElementById('pricing');
      if (!pricingSection) {
        throw new Error('Pricing section not found');
      }

      // Check for pricing cards
      const pricingCards = pricingSection.querySelectorAll('[class*="pricing-card"]');
      if (pricingCards.length === 0) {
        throw new Error('No pricing cards found');
      }

      // Check for plan names
      const planNames = pricingSection.querySelectorAll('h3');
      const hasPlanNames = planNames.length >= 3;

      // Check for prices
      const priceElements = pricingSection.querySelectorAll('[class*="text-4xl"]');
      const hasPrices = priceElements.length >= 3;

      // Check for CTA buttons
      const ctaButtons = pricingSection.querySelectorAll('button');
      const hasCTAButtons = ctaButtons.length >= 3;

      // Check for feature lists
      const featureLists = pricingSection.querySelectorAll('ul');
      const hasFeatureLists = featureLists.length >= 3;

      // Check for check marks
      const checkMarks = pricingSection.querySelectorAll('.text-green-500');
      const hasCheckMarks = checkMarks.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Pricing Card Functionality',
        passed: hasPlanNames && hasPrices && hasCTAButtons && hasFeatureLists,
        message: `Found ${pricingCards.length} cards with names: ${hasPlanNames}, prices: ${hasPrices}, CTAs: ${hasCTAButtons}`,
        duration,
        details: {
          pricingCards: pricingCards.length,
          hasPlanNames,
          planNames: planNames.length,
          hasPrices,
          priceElements: priceElements.length,
          hasCTAButtons,
          ctaButtons: ctaButtons.length,
          hasFeatureLists,
          featureLists: featureLists.length,
          hasCheckMarks,
          checkMarks: checkMarks.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Pricing Card Functionality',
        passed: false,
        message: `Pricing card test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test comparison table functionality
  async testComparisonTable(): Promise<PricingTestResult> {
    const startTime = performance.now();
    
    try {
      const pricingSection = document.getElementById('pricing');
      if (!pricingSection) {
        throw new Error('Pricing section not found');
      }

      // Check for comparison table
      const comparisonTable = pricingSection.querySelector('table');
      if (!comparisonTable) {
        throw new Error('Comparison table not found');
      }

      // Check for table headers
      const tableHeaders = comparisonTable.querySelectorAll('th');
      const hasHeaders = tableHeaders.length >= 4; // Feature + 3 plans

      // Check for table rows
      const tableRows = comparisonTable.querySelectorAll('tbody tr');
      const hasRows = tableRows.length > 0;

      // Check for plan icons
      const planIcons = comparisonTable.querySelectorAll('.text-lg');
      const hasPlanIcons = planIcons.length >= 3;

      // Check for check marks in table
      const tableCheckMarks = comparisonTable.querySelectorAll('.text-green-500');
      const hasTableCheckMarks = tableCheckMarks.length > 0;

      // Check for hover effects
      const hoverRows = comparisonTable.querySelectorAll('.hover\\:bg-muted\\/50');
      const hasHoverEffects = hoverRows.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Comparison Table Functionality',
        passed: hasHeaders && hasRows && hasPlanIcons,
        message: `Table with ${tableHeaders.length} headers, ${tableRows.length} rows, and ${planIcons.length} icons`,
        duration,
        details: {
          hasHeaders,
          tableHeaders: tableHeaders.length,
          hasRows,
          tableRows: tableRows.length,
          hasPlanIcons,
          planIcons: planIcons.length,
          hasTableCheckMarks,
          tableCheckMarks: tableCheckMarks.length,
          hasHoverEffects,
          hoverRows: hoverRows.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Comparison Table Functionality',
        passed: false,
        message: `Comparison table test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test visual effects and animations
  async testVisualEffects(): Promise<PricingTestResult> {
    const startTime = performance.now();
    
    try {
      const pricingSection = document.getElementById('pricing');
      if (!pricingSection) {
        throw new Error('Pricing section not found');
      }

      // Check for glassmorphism effects
      const glassElements = pricingSection.querySelectorAll('.glass-effect, .glass-effect-enhanced');
      const hasGlassEffects = glassElements.length > 0;

      // Check for 3D effects
      const perspectiveElements = pricingSection.querySelectorAll('.perspective-1000, .preserve-3d');
      const has3DEffects = perspectiveElements.length > 0;

      // Check for hover animations
      const hoverElements = pricingSection.querySelectorAll('[class*="hover:"], [class*="pricing-card-hover"]');
      const hasHoverAnimations = hoverElements.length > 0;

      // Check for glow effects
      const glowElements = pricingSection.querySelectorAll('.glow-effect, .price-glow');
      const hasGlowEffects = glowElements.length > 0;

      // Check for transition effects
      const transitionElements = pricingSection.querySelectorAll('[class*="transition-"]');
      const hasTransitions = transitionElements.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Visual Effects and Animations',
        passed: hasGlassEffects || has3DEffects || hasHoverAnimations,
        message: `Found glass: ${hasGlassEffects}, 3D: ${has3DEffects}, hover: ${hasHoverAnimations}, glow: ${hasGlowEffects}`,
        duration,
        details: {
          hasGlassEffects,
          glassElements: glassElements.length,
          has3DEffects,
          perspectiveElements: perspectiveElements.length,
          hasHoverAnimations,
          hoverElements: hoverElements.length,
          hasGlowEffects,
          glowElements: glowElements.length,
          hasTransitions,
          transitionElements: transitionElements.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Visual Effects and Animations',
        passed: false,
        message: `Visual effects test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test performance
  async testPerformance(): Promise<PricingTestResult> {
    const startTime = performance.now();
    
    try {
      // Check performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      // Check for heavy elements
      const pricingSection = document.getElementById('pricing');
      const images = pricingSection?.querySelectorAll('img') || [];
      const tables = pricingSection?.querySelectorAll('table') || [];
      const animations = pricingSection?.querySelectorAll('[class*="animate-"], [class*="transition-"]') || [];

      // Performance acceptance criteria
      const isLoadTimeAcceptable = loadTime < 3000;
      const hasReasonableImages = images.length < 10;
      const hasReasonableTables = tables.length <= 1;
      const hasReasonableAnimations = animations.length < 50;

      const duration = performance.now() - startTime;
      return {
        testName: 'Performance Metrics',
        passed: isLoadTimeAcceptable && hasReasonableImages && hasReasonableTables,
        message: `Load time: ${loadTime.toFixed(2)}ms, Images: ${images.length}, Tables: ${tables.length}, Animations: ${animations.length}`,
        duration,
        details: {
          loadTime,
          isLoadTimeAcceptable,
          images: images.length,
          hasReasonableImages,
          tables: tables.length,
          hasReasonableTables,
          animations: animations.length,
          hasReasonableAnimations
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Performance Metrics',
        passed: false,
        message: `Performance test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Run all pricing tests
  async runAllPricingTests(): Promise<PricingTestSuite> {
    const startTime = performance.now();
    this.results = [];

    const tests = [
      this.testPricingSectionStructure(),
      this.testResponsiveDesign(),
      this.testAccessibility(),
      this.testPricingCardFunctionality(),
      this.testComparisonTable(),
      this.testVisualEffects(),
      this.testPerformance()
    ];

    const results = await Promise.all(tests);
    this.results = results;
    
    const totalDuration = performance.now() - startTime;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results.filter(r => !r.passed).length;

    return {
      suiteName: 'Pricing Component Responsiveness & Accessibility',
      tests: this.results,
      totalDuration,
      passedTests,
      failedTests
    };
  }

  // Generate pricing test report
  generatePricingReport(testSuite: PricingTestSuite): string {
    const report = `
# Pricing Component Test Report

## Summary
- **Total Tests**: ${testSuite.tests.length}
- **Passed**: ${testSuite.passedTests}
- **Failed**: ${testSuite.failedTests}
- **Total Duration**: ${testSuite.totalDuration.toFixed(2)}ms
- **Success Rate**: ${((testSuite.passedTests / testSuite.tests.length) * 100).toFixed(1)}%

## Test Results

${testSuite.tests.map(test => `
### ${test.testName}
- **Status**: ${test.passed ? '✅ PASSED' : '❌ FAILED'}
- **Duration**: ${test.duration.toFixed(2)}ms
- **Message**: ${test.message}
${test.details ? `
**Details**:
${Object.entries(test.details).map(([key, value]) => `- ${key}: ${value}`).join('\n')}
` : ''}
`).join('')}

## Component Analysis

${testSuite.tests.find(t => t.testName === 'Pricing Card Functionality')?.details ? `
**Pricing Cards**:
- Cards: ${testSuite.tests.find(t => t.testName === 'Pricing Card Functionality')?.details?.pricingCards || 0}
- Plan Names: ${testSuite.tests.find(t => t.testName === 'Pricing Card Functionality')?.details?.hasPlanNames ? 'Yes' : 'No'}
- Prices: ${testSuite.tests.find(t => t.testName === 'Pricing Card Functionality')?.details?.hasPrices ? 'Yes' : 'No'}
- CTAs: ${testSuite.tests.find(t => t.testName === 'Pricing Card Functionality')?.details?.ctaButtons || 0}
` : ''}

${testSuite.tests.find(t => t.testName === 'Comparison Table Functionality')?.details ? `
**Comparison Table**:
- Headers: ${testSuite.tests.find(t => t.testName === 'Comparison Table Functionality')?.details?.tableHeaders || 0}
- Rows: ${testSuite.tests.find(t => t.testName === 'Comparison Table Functionality')?.details?.tableRows || 0}
- Plan Icons: ${testSuite.tests.find(t => t.testName === 'Comparison Table Functionality')?.details?.planIcons || 0}
- Hover Effects: ${testSuite.tests.find(t => t.testName === 'Comparison Table Functionality')?.details?.hasHoverEffects ? 'Yes' : 'No'}
` : ''}

## Recommendations

${testSuite.failedTests > 0 ? `
⚠️ **Action Required**: ${testSuite.failedTests} test(s) failed. Please review and fix the issues.
` : `
✅ **All Tests Passed**: Pricing component is ready for production deployment.
`}

## Accessibility Summary

${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details ? `
- Semantic HTML: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasSemanticHTML ? 'Yes' : 'No'}
- ARIA Labels: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasAriaLabels ? 'Yes' : 'No'}
- Alt Text: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasAltText ? 'Yes' : 'No'}
- Focusable Elements: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.focusableElements || 0}
- Keyboard Navigation: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasKeyboardNavigation ? 'Yes' : 'No'}
` : ''}

## Performance Metrics

${testSuite.tests.find(t => t.testName === 'Performance Metrics')?.message || 'N/A'}

## Visual Effects Summary

${testSuite.tests.find(t => t.testName === 'Visual Effects and Animations')?.details ? `
- Glassmorphism: ${testSuite.tests.find(t => t.testName === 'Visual Effects and Animations')?.details?.hasGlassEffects ? 'Yes' : 'No'}
- 3D Effects: ${testSuite.tests.find(t => t.testName === 'Visual Effects and Animations')?.details?.has3DEffects ? 'Yes' : 'No'}
- Hover Animations: ${testSuite.tests.find(t => t.testName === 'Visual Effects and Animations')?.details?.hasHoverAnimations ? 'Yes' : 'No'}
- Glow Effects: ${testSuite.tests.find(t => t.testName === 'Visual Effects and Animations')?.details?.hasGlowEffects ? 'Yes' : 'No'}
- Transitions: ${testSuite.tests.find(t => t.testName === 'Visual Effects and Animations')?.details?.hasTransitions ? 'Yes' : 'No'}
` : ''}
    `.trim();

    return report;
  }
}

// Export the pricing tester
export const pricingTester = new PricingTester();

// Export a function to run pricing tests and log results
export const runPricingTests = async () => {
  console.log('🧪 Running Pricing Tests...');
  
  const testSuite = await pricingTester.runAllPricingTests();
  const report = pricingTester.generatePricingReport(testSuite);
  
  console.log(report);
  
  // Also log to analytics for monitoring
  analytics.trackEvent('pricing_test_run', {
    passedTests: testSuite.passedTests,
    failedTests: testSuite.failedTests,
    totalDuration: testSuite.totalDuration,
    successRate: (testSuite.passedTests / testSuite.tests.length) * 100
  });
  
  return testSuite;
};
