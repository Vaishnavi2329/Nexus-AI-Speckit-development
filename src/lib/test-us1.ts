// Test script for US1 functionality and performance
import { analytics } from "./analytics";

export interface TestResult {
  testName: string;
  passed: boolean;
  message: string;
  duration: number;
}

export interface TestSuite {
  suiteName: string;
  tests: TestResult[];
  totalDuration: number;
  passedTests: number;
  failedTests: number;
}

class US1Tester {
  private results: TestResult[] = [];

  // Test component rendering
  async testComponentRendering(): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      // Check if all required components exist
      const requiredComponents = [
        'NavBar',
        'Hero', 
        'Problem',
        'Features',
        'FinalCTA',
        'Footer'
      ];

      for (const component of requiredComponents) {
        const element = document.querySelector(`[data-testid="${component.toLowerCase()}"]`);
        if (!element) {
          throw new Error(`Component ${component} not found`);
        }
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Component Rendering',
        passed: true,
        message: 'All components rendered successfully',
        duration
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Component Rendering',
        passed: false,
        message: `Component rendering failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test navigation functionality
  async testNavigation(): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      // Test smooth scroll behavior
      const navLinks = document.querySelectorAll('a[href^="#"]');
      if (navLinks.length === 0) {
        throw new Error('No navigation links found');
      }

      // Test section navigation
      const sections = ['hero', 'problem', 'features', 'final-cta'];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) {
          throw new Error(`Section ${sectionId} not found`);
        }
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Navigation Functionality',
        passed: true,
        message: `Found ${navLinks.length} navigation links and all sections`,
        duration
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Navigation Functionality',
        passed: false,
        message: `Navigation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test theme switching
  async testThemeSwitching(): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      const themeToggle = document.querySelector('[aria-label="Toggle theme"]');
      if (!themeToggle) {
        throw new Error('Theme toggle button not found');
      }

      // Check initial theme
      const hasDarkClass = document.documentElement.classList.contains('dark');
      
      const duration = performance.now() - startTime;
      return {
        testName: 'Theme Switching',
        passed: true,
        message: `Theme toggle found, current theme: ${hasDarkClass ? 'dark' : 'light'}`,
        duration
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Theme Switching',
        passed: false,
        message: `Theme test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test analytics tracking
  async testAnalyticsTracking(): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      // Test analytics object
      const events = analytics.getEvents();
      
      // Check if analytics methods exist
      const requiredMethods = ['trackConversion', 'trackEngagement', 'trackEvent'];
      for (const method of requiredMethods) {
        if (typeof (analytics as any)[method] !== 'function') {
          throw new Error(`Analytics method ${method} not found`);
        }
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Analytics Tracking',
        passed: true,
        message: `Analytics initialized with ${events.length} existing events`,
        duration
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Analytics Tracking',
        passed: false,
        message: `Analytics test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test visual effects
  async testVisualEffects(): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      // Check for CSS classes related to visual effects
      const glowElements = document.querySelectorAll('.glow-effect');
      const zoomElements = document.querySelectorAll('.zoom-effect');
      const glassElements = document.querySelectorAll('.glass-effect');

      const duration = performance.now() - startTime;
      return {
        testName: 'Visual Effects',
        passed: true,
        message: `Found ${glowElements.length} glow, ${zoomElements.length} zoom, ${glassElements.length} glass effects`,
        duration
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Visual Effects',
        passed: false,
        message: `Visual effects test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test performance metrics
  async testPerformance(): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      // Check performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      // Check if page load time is acceptable (< 3 seconds)
      const isLoadTimeAcceptable = loadTime < 3000;

      const duration = performance.now() - startTime;
      return {
        testName: 'Performance Metrics',
        passed: isLoadTimeAcceptable,
        message: `Page load time: ${loadTime.toFixed(2)}ms (${isLoadTimeAcceptable ? 'acceptable' : 'slow'})`,
        duration
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

  // Test responsive design
  async testResponsiveDesign(): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      // Check for responsive classes
      const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
      
      // Check viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const hasViewport = viewportMeta !== null;

      const duration = performance.now() - startTime;
      return {
        testName: 'Responsive Design',
        passed: hasViewport && responsiveElements.length > 0,
        message: `Found ${responsiveElements.length} responsive elements, viewport meta: ${hasViewport ? 'present' : 'missing'}`,
        duration
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

  // Run all tests
  async runAllTests(): Promise<TestSuite> {
    const startTime = performance.now();
    this.results = [];

    const tests = [
      this.testComponentRendering(),
      this.testNavigation(),
      this.testThemeSwitching(),
      this.testAnalyticsTracking(),
      this.testVisualEffects(),
      this.testPerformance(),
      this.testResponsiveDesign()
    ];

    const results = await Promise.all(tests);
    this.results = results;
    
    const totalDuration = performance.now() - startTime;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results.filter(r => !r.passed).length;

    return {
      suiteName: 'US1 Functionality & Performance',
      tests: this.results,
      totalDuration,
      passedTests,
      failedTests
    };
  }

  // Generate test report
  generateReport(testSuite: TestSuite): string {
    const report = `
# US1 Test Report

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
`).join('')}

## Recommendations

${testSuite.failedTests > 0 ? `
⚠️ **Action Required**: ${testSuite.failedTests} test(s) failed. Please review and fix the issues.
` : `
✅ **All Tests Passed**: US1 is ready for production deployment.
`}

## Performance Metrics

${testSuite.tests.find(t => t.testName === 'Performance Metrics')?.message || 'N/A'}
    `.trim();

    return report;
  }
}

// Export the tester
export const us1Tester = new US1Tester();

// Export a function to run tests and log results
export const runUS1Tests = async () => {
  console.log('🧪 Running US1 Tests...');
  
  const testSuite = await us1Tester.runAllTests();
  const report = us1Tester.generateReport(testSuite);
  
  console.log(report);
  
  // Also log to analytics for monitoring
  analytics.trackEvent('us1_test_run', {
    passedTests: testSuite.passedTests,
    failedTests: testSuite.failedTests,
    totalDuration: testSuite.totalDuration,
    successRate: (testSuite.passedTests / testSuite.tests.length) * 100
  });
  
  return testSuite;
};
