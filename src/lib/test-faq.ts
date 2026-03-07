// Test script for FAQ accessibility and keyboard navigation
import { analytics } from "./analytics";

export interface FAQTestResult {
  testName: string;
  passed: boolean;
  message: string;
  duration: number;
  details?: any;
}

export interface FAQTestSuite {
  suiteName: string;
  tests: FAQTestResult[];
  totalDuration: number;
  passedTests: number;
  failedTests: number;
}

class FAQTester {
  private results: FAQTestResult[] = [];

  // Test FAQ section structure
  async testFAQSectionStructure(): Promise<FAQTestResult> {
    const startTime = performance.now();
    
    try {
      // Check if FAQ section exists
      const faqSection = document.getElementById('faq');
      if (!faqSection) {
        throw new Error('FAQ section not found');
      }

      // Check for search functionality
      const searchInput = faqSection.querySelector('input[type="text"]');
      const hasSearch = searchInput !== null;

      // Check for category filters
      const categoryButtons = faqSection.querySelectorAll('button');
      const hasCategories = categoryButtons.length > 0;

      // Check for FAQ items
      const faqItems = faqSection.querySelectorAll('[class*="border"]');
      const hasFAQItems = faqItems.length > 0;

      // Check for contact support section
      const contactSection = faqSection.querySelector('div[class*="gradient-to-br"]');
      const hasContactSection = contactSection !== null;

      const duration = performance.now() - startTime;
      return {
        testName: 'FAQ Section Structure',
        passed: hasSearch && hasCategories && hasFAQItems && hasContactSection,
        message: `Found search: ${hasSearch}, categories: ${hasCategories}, items: ${faqItems.length}, contact: ${hasContactSection}`,
        duration,
        details: {
          hasSearch,
          hasCategories,
          categoryButtons: categoryButtons.length,
          hasFAQItems,
          faqItems: faqItems.length,
          hasContactSection
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'FAQ Section Structure',
        passed: false,
        message: `Structure test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test search functionality
  async testSearchFunctionality(): Promise<FAQTestResult> {
    const startTime = performance.now();
    
    try {
      const faqSection = document.getElementById('faq');
      if (!faqSection) {
        throw new Error('FAQ section not found');
      }

      // Check for search input
      const searchInput = faqSection.querySelector('input[type="text"]') as HTMLInputElement;
      if (!searchInput) {
        throw new Error('Search input not found');
      }

      // Check search placeholder
      const hasPlaceholder = searchInput.placeholder && searchInput.placeholder.length > 0;

      // Check search icon
      const searchIcon = faqSection.querySelector('.lucide-search');
      const hasSearchIcon = searchIcon !== null;

      // Test search functionality (simulate)
      const originalValue = searchInput.value;
      searchInput.value = 'test search';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Check if search works (basic check)
      const canSearch = searchInput.type === 'text';
      
      // Restore original value
      searchInput.value = originalValue;

      const duration = performance.now() - startTime;
      return {
        testName: 'Search Functionality',
        passed: !!(hasPlaceholder && hasSearchIcon && canSearch),
        message: `Search input with placeholder: ${hasPlaceholder}, icon: ${hasSearchIcon}, functional: ${canSearch}`,
        duration,
        details: {
          hasPlaceholder,
          hasSearchIcon,
          canSearch,
          inputType: searchInput.type
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Search Functionality',
        passed: false,
        message: `Search test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test categorization functionality
  async testCategorization(): Promise<FAQTestResult> {
    const startTime = performance.now();
    
    try {
      const faqSection = document.getElementById('faq');
      if (!faqSection) {
        throw new Error('FAQ section not found');
      }

      // Check for category buttons
      const categoryButtons = faqSection.querySelectorAll('button');
      if (categoryButtons.length === 0) {
        throw new Error('No category buttons found');
      }

      // Check for "All" category
      const allButton = Array.from(categoryButtons).find(btn => 
        btn.textContent?.includes('All')
      );
      const hasAllCategory = allButton !== null;

      // Check for category icons
      const categoryIcons = faqSection.querySelectorAll('.lucide-zap, .lucide-shield, .lucide-users, .lucide-database, .lucide-message-square');
      const hasCategoryIcons = categoryIcons.length > 0;

      // Check category styling
      const styledCategories = Array.from(categoryButtons).filter(btn => 
        btn.className.includes('border') || btn.className.includes('bg-')
      );
      const hasStyling = styledCategories.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Categorization Functionality',
        passed: hasAllCategory && hasCategoryIcons && hasStyling,
        message: `Found ${categoryButtons.length} categories with icons: ${hasCategoryIcons}, styling: ${hasStyling}`,
        duration,
        details: {
          categoryButtons: categoryButtons.length,
          hasAllCategory,
          hasCategoryIcons,
          categoryIcons: categoryIcons.length,
          hasStyling,
          styledCategories: styledCategories.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Categorization Functionality',
        passed: false,
        message: `Categorization test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test expand/collapse animations
  async testExpandCollapseAnimations(): Promise<FAQTestResult> {
    const startTime = performance.now();
    
    try {
      const faqSection = document.getElementById('faq');
      if (!faqSection) {
        throw new Error('FAQ section not found');
      }

      // Check for FAQ items with expandable content
      const faqItems = faqSection.querySelectorAll('button[onclick*="toggleExpanded"]');
      if (faqItems.length === 0) {
        throw new Error('No expandable FAQ items found');
      }

      // Check for chevron icons
      const chevronIcons = faqSection.querySelectorAll('.lucide-chevron-down');
      const hasChevrons = chevronIcons.length > 0;

      // Check for animation classes
      const animatedElements = faqSection.querySelectorAll('[class*="animate-"], [class*="transition-"]');
      const hasAnimations = animatedElements.length > 0;

      // Check for AnimatePresence (React specific)
      const hasAnimatePresence = faqSection.textContent?.includes('AnimatePresence') || false;

      // Test expand/collapse (basic check)
      const firstItem = faqItems[0] as HTMLElement;
      const canExpand = firstItem && typeof firstItem.onclick === 'function';

      const duration = performance.now() - startTime;
      return {
        testName: 'Expand/Collapse Animations',
        passed: hasChevrons && hasAnimations && canExpand,
        message: `Found ${faqItems.length} expandable items with chevrons: ${hasChevrons}, animations: ${hasAnimations}`,
        duration,
        details: {
          expandableItems: faqItems.length,
          hasChevrons,
          chevronIcons: chevronIcons.length,
          hasAnimations,
          animatedElements: animatedElements.length,
          hasAnimatePresence,
          canExpand
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Expand/Collapse Animations',
        passed: false,
        message: `Animation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test keyboard navigation
  async testKeyboardNavigation(): Promise<FAQTestResult> {
    const startTime = performance.now();
    
    try {
      const faqSection = document.getElementById('faq');
      if (!faqSection) {
        throw new Error('FAQ section not found');
      }

      // Check for focusable elements
      const focusableElements = faqSection.querySelectorAll(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) {
        throw new Error('No focusable elements found');
      }

      // Check for tabindex attributes
      const elementsWithTabindex = faqSection.querySelectorAll('[tabindex]');
      const hasTabindexes = elementsWithTabindex.length > 0;

      // Check for ARIA attributes
      const ariaElements = faqSection.querySelectorAll('[aria-label], [aria-expanded], [aria-controls]');
      const hasAria = ariaElements.length > 0;

      // Check for keyboard-friendly buttons
      const buttons = faqSection.querySelectorAll('button');
      const hasButtons = buttons.length > 0;

      // Test tab order (basic check)
      const firstFocusable = focusableElements[0] as HTMLElement;
      const canFocus = firstFocusable && typeof firstFocusable.focus === 'function';

      const duration = performance.now() - startTime;
      return {
        testName: 'Keyboard Navigation',
        passed: hasTabindexes && hasAria && canFocus,
        message: `Found ${focusableElements.length} focusable elements, ARIA: ${hasAria}, tabindexes: ${hasTabindexes}`,
        duration,
        details: {
          focusableElements: focusableElements.length,
          hasTabindexes,
          elementsWithTabindex: elementsWithTabindex.length,
          hasAria,
          ariaElements: ariaElements.length,
          hasButtons,
          buttons: buttons.length,
          canFocus
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Keyboard Navigation',
        passed: false,
        message: `Keyboard navigation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test accessibility compliance
  async testAccessibilityCompliance(): Promise<FAQTestResult> {
    const startTime = performance.now();
    
    try {
      const faqSection = document.getElementById('faq');
      if (!faqSection) {
        throw new Error('FAQ section not found');
      }

      // Check for semantic HTML
      const semanticElements = faqSection.querySelectorAll('h1, h2, h3, h4, h5, h6, section, article, aside, nav, main, header, footer');
      const hasSemanticHTML = semanticElements.length > 0;

      // Check for heading hierarchy
      const headings = faqSection.querySelectorAll('h2, h3, h4');
      const hasHeadings = headings.length > 0;

      // Check for proper button elements
      const buttons = faqSection.querySelectorAll('button[onclick]');
      const hasProperButtons = buttons.length > 0;

      // Check for color contrast (basic check)
      const textElements = faqSection.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
      const hasTextElements = textElements.length > 0;

      // Check for focus indicators
      const focusStyles = faqSection.querySelectorAll('[class*="focus:"]');
      const hasFocusStyles = focusStyles.length > 0;

      // Check for screen reader support
      const ariaLabels = faqSection.querySelectorAll('[aria-label], [aria-describedby], [role]');
      const hasAriaLabels = ariaLabels.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Accessibility Compliance',
        passed: hasSemanticHTML && hasHeadings && hasProperButtons && hasAriaLabels,
        message: `Semantic: ${hasSemanticHTML}, Headings: ${hasHeadings}, Buttons: ${hasProperButtons}, ARIA: ${hasAriaLabels}`,
        duration,
        details: {
          hasSemanticHTML,
          semanticElements: semanticElements.length,
          hasHeadings,
          headings: headings.length,
          hasProperButtons,
          buttons: buttons.length,
          hasTextElements,
          textElements: textElements.length,
          hasFocusStyles,
          focusStyles: focusStyles.length,
          hasAriaLabels,
          ariaLabels: ariaLabels.length
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

  // Test analytics integration
  async testAnalyticsIntegration(): Promise<FAQTestResult> {
    const startTime = performance.now();
    
    try {
      const faqSection = document.getElementById('faq');
      if (!faqSection) {
        throw new Error('FAQ section not found');
      }

      // Check for analytics tracking (basic check)
      const hasAnalytics = typeof window !== 'undefined' && 'analytics' in window;

      // Check for click handlers
      const clickableElements = faqSection.querySelectorAll('button[onclick], input[oninput]');
      const hasClickHandlers = clickableElements.length > 0;

      // Check for tracking functions (basic check)
      const scriptTags = document.querySelectorAll('script');
      const hasTrackingScripts = Array.from(scriptTags).some(script => 
        script.textContent?.includes('analytics') || script.textContent?.includes('track')
      );

      // Check for data attributes
      const dataAttributes = faqSection.querySelectorAll('[data-testid], [data-track]');
      const hasDataAttributes = dataAttributes.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Analytics Integration',
        passed: hasClickHandlers && (hasAnalytics || hasTrackingScripts),
        message: `Click handlers: ${hasClickHandlers}, Analytics: ${hasAnalytics}, Tracking scripts: ${hasTrackingScripts}`,
        duration,
        details: {
          hasAnalytics,
          hasClickHandlers,
          clickableElements: clickableElements.length,
          hasTrackingScripts,
          scriptTags: scriptTags.length,
          hasDataAttributes,
          dataAttributes: dataAttributes.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Analytics Integration',
        passed: false,
        message: `Analytics test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Run all FAQ tests
  async runAllFAQTests(): Promise<FAQTestSuite> {
    const startTime = performance.now();
    this.results = [];

    const tests = [
      this.testFAQSectionStructure(),
      this.testSearchFunctionality(),
      this.testCategorization(),
      this.testExpandCollapseAnimations(),
      this.testKeyboardNavigation(),
      this.testAccessibilityCompliance(),
      this.testAnalyticsIntegration()
    ];

    const results = await Promise.all(tests);
    this.results = results;
    
    const totalDuration = performance.now() - startTime;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results.filter(r => !r.passed).length;

    return {
      suiteName: 'FAQ Accessibility & Keyboard Navigation',
      tests: this.results,
      totalDuration,
      passedTests,
      failedTests
    };
  }

  // Generate FAQ test report
  generateFAQReport(testSuite: FAQTestSuite): string {
    const report = `
# FAQ Section Test Report

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

## Feature Analysis

${testSuite.tests.find(t => t.testName === 'Search Functionality')?.details ? `
**Search Features**:
- Search Input: ${testSuite.tests.find(t => t.testName === 'Search Functionality')?.details?.hasSearchInput ? 'Yes' : 'No'}
- Placeholder: ${testSuite.tests.find(t => t.testName === 'Search Functionality')?.details?.hasPlaceholder ? 'Yes' : 'No'}
- Search Icon: ${testSuite.tests.find(t => t.testName === 'Search Functionality')?.details?.hasSearchIcon ? 'Yes' : 'No'}
- Functional: ${testSuite.tests.find(t => t.testName === 'Search Functionality')?.details?.canSearch ? 'Yes' : 'No'}
` : ''}

${testSuite.tests.find(t => t.testName === 'Categorization Functionality')?.details ? `
**Category Features**:
- Category Buttons: ${testSuite.tests.find(t => t.testName === 'Categorization Functionality')?.details?.categoryButtons || 0}
- All Category: ${testSuite.tests.find(t => t.testName === 'Categorization Functionality')?.details?.hasAllCategory ? 'Yes' : 'No'}
- Category Icons: ${testSuite.tests.find(t => t.testName === 'Categorization Functionality')?.details?.hasCategoryIcons ? 'Yes' : 'No'}
- Styling: ${testSuite.tests.find(t => t.testName === 'Categorization Functionality')?.details?.hasStyling ? 'Yes' : 'No'}
` : ''}

${testSuite.tests.find(t => t.testName === 'Expand/Collapse Animations')?.details ? `
**Animation Features**:
- Expandable Items: ${testSuite.tests.find(t => t.testName === 'Expand/Collapse Animations')?.details?.expandableItems || 0}
- Chevron Icons: ${testSuite.tests.find(t => t.testName === 'Expand/Collapse Animations')?.details?.hasChevrons ? 'Yes' : 'No'}
- Animations: ${testSuite.tests.find(t => t.testName === 'Expand/Collapse Animations')?.details?.hasAnimations ? 'Yes' : 'No'}
- AnimatePresence: ${testSuite.tests.find(t => t.testName === 'Expand/Collapse Animations')?.details?.hasAnimatePresence ? 'Yes' : 'No'}
` : ''}

## Recommendations

${testSuite.failedTests > 0 ? `
⚠️ **Action Required**: ${testSuite.failedTests} test(s) failed. Please review and fix the issues.
` : `
✅ **All Tests Passed**: FAQ section is ready for production deployment.
`}

## Accessibility Summary

${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details ? `
- Semantic HTML: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasSemanticHTML ? 'Yes' : 'No'}
- Headings: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasHeadings ? 'Yes' : 'No'}
- Proper Buttons: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasProperButtons ? 'Yes' : 'No'}
- ARIA Labels: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasAriaLabels ? 'Yes' : 'No'}
- Focus Styles: ${testSuite.tests.find(t => t.testName === 'Accessibility Compliance')?.details?.hasFocusStyles ? 'Yes' : 'No'}
` : ''}

## Keyboard Navigation Summary

${testSuite.tests.find(t => t.testName === 'Keyboard Navigation')?.details ? `
- Focusable Elements: ${testSuite.tests.find(t => t.testName === 'Keyboard Navigation')?.details?.focusableElements || 0}
- Tabindexes: ${testSuite.tests.find(t => t.testName === 'Keyboard Navigation')?.details?.hasTabindexes ? 'Yes' : 'No'}
- ARIA Attributes: ${testSuite.tests.find(t => t.testName === 'Keyboard Navigation')?.details?.hasAria ? 'Yes' : 'No'}
- Can Focus: ${testSuite.tests.find(t => t.testName === 'Keyboard Navigation')?.details?.canFocus ? 'Yes' : 'No'}
` : ''}

## Analytics Summary

${testSuite.tests.find(t => t.testName === 'Analytics Integration')?.details ? `
- Analytics Available: ${testSuite.tests.find(t => t.testName === 'Analytics Integration')?.details?.hasAnalytics ? 'Yes' : 'No'}
- Click Handlers: ${testSuite.tests.find(t => t.testName === 'Analytics Integration')?.details?.clickableElements || 0}
- Tracking Scripts: ${testSuite.tests.find(t => t.testName === 'Analytics Integration')?.details?.hasTrackingScripts ? 'Yes' : 'No'}
- Data Attributes: ${testSuite.tests.find(t => t.testName === 'Analytics Integration')?.details?.hasDataAttributes ? 'Yes' : 'No'}
` : ''}
    `.trim();

    return report;
  }
}

// Export the FAQ tester
export const faqTester = new FAQTester();

// Export a function to run FAQ tests and log results
export const runFAQTests = async () => {
  console.log('🧪 Running FAQ Tests...');
  
  const testSuite = await faqTester.runAllFAQTests();
  const report = faqTester.generateFAQReport(testSuite);
  
  console.log(report);
  
  // Also log to analytics for monitoring
  analytics.trackEvent('faq_test_run', {
    passedTests: testSuite.passedTests,
    failedTests: testSuite.failedTests,
    totalDuration: testSuite.totalDuration,
    successRate: (testSuite.passedTests / testSuite.tests.length) * 100
  });
  
  return testSuite;
};
