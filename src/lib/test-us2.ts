// Test script for US2 functionality and performance
import { analytics } from "./analytics";

export interface US2TestResult {
  testName: string;
  passed: boolean;
  message: string;
  duration: number;
  details?: any;
}

export interface US2TestSuite {
  suiteName: string;
  tests: US2TestResult[];
  totalDuration: number;
  passedTests: number;
  failedTests: number;
}

class US2Tester {
  private results: US2TestResult[] = [];

  // Test testimonials 3D carousel functionality
  async testTestimonialsCarousel(): Promise<US2TestResult> {
    const startTime = performance.now();
    
    try {
      // Check if testimonials section exists
      const testimonialsSection = document.getElementById('testimonials');
      if (!testimonialsSection) {
        throw new Error('Testimonials section not found');
      }

      // Check for carousel elements
      const carouselElements = testimonialsSection.querySelectorAll('[data-testid="testimonial-card"]');
      if (carouselElements.length === 0) {
        throw new Error('No testimonial cards found');
      }

      // Check for navigation controls
      const navControls = testimonialsSection.querySelectorAll('button[aria-label*="testimonial"]');
      if (navControls.length < 2) {
        throw new Error('Insufficient navigation controls');
      }

      // Check for 3D perspective
      const perspectiveElements = testimonialsSection.querySelectorAll('.perspective-1000');
      if (perspectiveElements.length === 0) {
        console.warn('3D perspective elements not found');
      }

      // Check for glassmorphism effects
      const glassElements = testimonialsSection.querySelectorAll('.glass-effect');
      if (glassElements.length === 0) {
        console.warn('Glassmorphism effects not found');
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Testimonials 3D Carousel',
        passed: true,
        message: `Found ${carouselElements.length} testimonial cards with ${navControls.length} navigation controls`,
        duration,
        details: {
          cards: carouselElements.length,
          controls: navControls.length,
          hasPerspective: perspectiveElements.length > 0,
          hasGlassEffects: glassElements.length > 0
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Testimonials 3D Carousel',
        passed: false,
        message: `Testimonials carousel test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test how-it-works section
  async testHowItWorks(): Promise<US2TestResult> {
    const startTime = performance.now();
    
    try {
      // Check if how-it-works section exists
      const howItWorksSection = document.getElementById('how-it-works');
      if (!howItWorksSection) {
        throw new Error('How-it-works section not found');
      }

      // Check for step cards
      const stepCards = howItWorksSection.querySelectorAll('[data-testid="step-card"]');
      if (stepCards.length === 0) {
        throw new Error('No step cards found');
      }

      // Check for progress bar
      const progressBar = howItWorksSection.querySelector('[data-testid="progress-bar"]');
      if (!progressBar) {
        throw new Error('Progress bar not found');
      }

      // Check for interactive elements
      const interactiveElements = howItWorksSection.querySelectorAll('button[onclick*="handleStepClick"]');
      if (interactiveElements.length === 0) {
        console.warn('Interactive step elements not found');
      }

      // Check for 3D effects
      const step3DEffects = howItWorksSection.querySelectorAll('.step-card');
      if (step3DEffects.length === 0) {
        console.warn('3D step effects not found');
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'How It Works Section',
        passed: true,
        message: `Found ${stepCards.length} step cards with progress tracking`,
        duration,
        details: {
          steps: stepCards.length,
          hasProgressBar: !!progressBar,
          interactiveElements: interactiveElements.length,
          has3DEffects: step3DEffects.length > 0
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'How It Works Section',
        passed: false,
        message: `How-it-works test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test integrations section
  async testIntegrations(): Promise<US2TestResult> {
    const startTime = performance.now();
    
    try {
      // Check if integrations section exists
      const integrationsSection = document.getElementById('integrations');
      if (!integrationsSection) {
        throw new Error('Integrations section not found');
      }

      // Check for platform cards
      const platformCards = integrationsSection.querySelectorAll('[data-testid="platform-card"]');
      if (platformCards.length === 0) {
        throw new Error('No platform cards found');
      }

      // Check for search functionality
      const searchInput = integrationsSection.querySelector('input[placeholder*="Search"]');
      if (!searchInput) {
        throw new Error('Search input not found');
      }

      // Check for category filters
      const categoryFilters = integrationsSection.querySelectorAll('button[onclick*="setSelectedCategory"]');
      if (categoryFilters.length === 0) {
        console.warn('Category filters not found');
      }

      // Check for 3D platform effects
      const platform3DEffects = integrationsSection.querySelectorAll('.platform-card');
      if (platform3DEffects.length === 0) {
        console.warn('3D platform effects not found');
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Integrations Section',
        passed: true,
        message: `Found ${platformCards.length} platform cards with search functionality`,
        duration,
        details: {
          platforms: platformCards.length,
          hasSearch: !!searchInput,
          categoryFilters: categoryFilters.length,
          has3DEffects: platform3DEffects.length > 0
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Integrations Section',
        passed: false,
        message: `Integrations test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test demo section
  async testDemoSection(): Promise<US2TestResult> {
    const startTime = performance.now();
    
    try {
      // Check if demo section exists
      const demoSection = document.getElementById('demo');
      if (!demoSection) {
        throw new Error('Demo section not found');
      }

      // Check for chat interface
      const chatInterface = demoSection.querySelector('[data-testid="chat-interface"]');
      if (!chatInterface) {
        throw new Error('Chat interface not found');
      }

      // Check for demo selection buttons
      const demoButtons = demoSection.querySelectorAll('button[onclick*="handleDemoChange"]');
      if (demoButtons.length === 0) {
        throw new Error('Demo selection buttons not found');
      }

      // Check for playback controls
      const playbackControls = demoSection.querySelectorAll('button[onclick*="handlePlay"], button[onclick*="handlePause"], button[onclick*="handleReset"]');
      if (playbackControls.length === 0) {
        throw new Error('Playback controls not found');
      }

      // Check for glassmorphism effects
      const demoGlassEffects = demoSection.querySelectorAll('.glass-effect-enhanced');
      if (demoGlassEffects.length === 0) {
        console.warn('Enhanced glassmorphism effects not found');
      }

      // Check for chat message 3D effects
      const chat3DEffects = demoSection.querySelectorAll('.chat-message');
      if (chat3DEffects.length === 0) {
        console.warn('Chat message 3D effects not found');
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Demo Section',
        passed: true,
        message: `Found chat interface with ${demoButtons.length} demo scenarios and ${playbackControls.length} controls`,
        duration,
        details: {
          hasChatInterface: !!chatInterface,
          demoScenarios: demoButtons.length,
          playbackControls: playbackControls.length,
          hasGlassEffects: demoGlassEffects.length > 0,
          has3DEffects: chat3DEffects.length > 0
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Demo Section',
        passed: false,
        message: `Demo section test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test 3D animations and effects
  async test3DAnimations(): Promise<US2TestResult> {
    const startTime = performance.now();
    
    try {
      // Check for 3D CSS classes
      const perspectiveElements = document.querySelectorAll('.perspective-1000');
      const preserve3DElements = document.querySelectorAll('.preserve-3d');
      const rotate3DElements = document.querySelectorAll('.rotate-3d');
      const float3DElements = document.querySelectorAll('.float-3d');

      // Check for glassmorphism effects
      const glassEffects = document.querySelectorAll('.glass-effect');
      const glassEnhancedEffects = document.querySelectorAll('.glass-effect-enhanced');

      // Check for 3D card effects
      const card3DEffects = document.querySelectorAll('.card-hover-3d');
      const testimonialCards = document.querySelectorAll('.testimonial-card');
      const platformCards = document.querySelectorAll('.platform-card');
      const stepCards = document.querySelectorAll('.step-card');

      const total3DEffects = perspectiveElements.length + preserve3DElements.length + 
                             rotate3DElements.length + float3DElements.length + 
                             card3DEffects.length + testimonialCards.length + 
                             platformCards.length + stepCards.length;

      if (total3DEffects === 0) {
        throw new Error('No 3D effects found');
      }

      const duration = performance.now() - startTime;
      return {
        testName: '3D Animations and Effects',
        passed: true,
        message: `Found ${total3DEffects} 3D effects and ${glassEffects.length + glassEnhancedEffects.length} glassmorphism effects`,
        duration,
        details: {
          perspectiveElements: perspectiveElements.length,
          preserve3DElements: preserve3DElements.length,
          rotate3DElements: rotate3DElements.length,
          float3DElements: float3DEffects.length,
          card3DEffects: card3DEffects.length,
          testimonialCards: testimonialCards.length,
          platformCards: platformCards.length,
          stepCards: stepCards.length,
          glassEffects: glassEffects.length,
          glassEnhancedEffects: glassEnhancedEffects.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: '3D Animations and Effects',
        passed: false,
        message: `3D animations test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test component interactions
  async testComponentInteractions(): Promise<US2TestResult> {
    const startTime = performance.now();
    
    try {
      // Test interactive elements
      const interactiveButtons = document.querySelectorAll('button[onclick]');
      const clickableElements = document.querySelectorAll('[role="button"]');
      const hoverElements = document.querySelectorAll('.hover\\:scale-105, .zoom-effect');

      // Test form inputs
      const textInputs = document.querySelectorAll('input[type="text"]');
      const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');

      // Test navigation elements
      const navLinks = document.querySelectorAll('a[href^="#"]');
      const ctaButtons = document.querySelectorAll('button[onclick*="trackConversion"]');

      const totalInteractive = interactiveButtons.length + clickableElements.length + 
                             hoverElements.length + textInputs.length + 
                             searchInputs.length + navLinks.length + ctaButtons.length;

      if (totalInteractive === 0) {
        throw new Error('No interactive elements found');
      }

      const duration = performance.now() - startTime;
      return {
        testName: 'Component Interactions',
        passed: true,
        message: `Found ${totalInteractive} interactive elements across US2 sections`,
        duration,
        details: {
          interactiveButtons: interactiveButtons.length,
          clickableElements: clickableElements.length,
          hoverElements: hoverElements.length,
          textInputs: textInputs.length,
          searchInputs: searchInputs.length,
          navLinks: navLinks.length,
          ctaButtons: ctaButtons.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Component Interactions',
        passed: false,
        message: `Component interactions test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test performance of US2 components
  async testUS2Performance(): Promise<US2TestResult> {
    const startTime = performance.now();
    
    try {
      // Check performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      // Check for US2 specific performance
      const us2Sections = ['testimonials', 'how-it-works', 'integrations', 'demo'];
      const sectionElements = us2Sections.map(id => document.getElementById(id)).filter(Boolean);
      
      // Check for heavy 3D effects that might impact performance
      const heavy3DElements = document.querySelectorAll('.perspective-1000, .preserve-3d, .rotate-3d');
      const glassEffects = document.querySelectorAll('.glass-effect-enhanced');
      
      // Performance acceptance criteria
      const isLoadTimeAcceptable = loadTime < 3000;
      const hasReasonable3DElements = heavy3DElements.length < 50;
      const hasReasonableGlassEffects = glassEffects.length < 20;

      const duration = performance.now() - startTime;
      return {
        testName: 'US2 Performance Metrics',
        passed: isLoadTimeAcceptable && hasReasonable3DElements && hasReasonableGlassEffects,
        message: `Load time: ${loadTime.toFixed(2)}ms, 3D elements: ${heavy3DElements.length}, Glass effects: ${glassEffects.length}`,
        duration,
        details: {
          loadTime: loadTime,
          sectionsFound: sectionElements.length,
          heavy3DElements: heavy3DElements.length,
          glassEffects: glassEffects.length,
          isLoadTimeAcceptable,
          hasReasonable3DElements,
          hasReasonableGlassEffects
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'US2 Performance Metrics',
        passed: false,
        message: `Performance test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Run all US2 tests
  async runAllUS2Tests(): Promise<US2TestSuite> {
    const startTime = performance.now();
    this.results = [];

    const tests = [
      this.testTestimonialsCarousel(),
      this.testHowItWorks(),
      this.testIntegrations(),
      this.testDemoSection(),
      this.test3DAnimations(),
      this.testComponentInteractions(),
      this.testUS2Performance()
    ];

    const results = await Promise.all(tests);
    this.results = results;
    
    const totalDuration = performance.now() - startTime;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results.filter(r => !r.passed).length;

    return {
      suiteName: 'US2 Component Interactions & Animations',
      tests: this.results,
      totalDuration,
      passedTests,
      failedTests
    };
  }

  // Generate US2 test report
  generateUS2Report(testSuite: US2TestSuite): string {
    const report = `
# US2 Test Report

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

${testSuite.tests.find(t => t.testName === 'Testimonials 3D Carousel')?.details ? `
**Testimonials Carousel**:
- Cards: ${testSuite.tests.find(t => t.testName === 'Testimonials 3D Carousel')?.details?.cards || 0}
- Controls: ${testSuite.tests.find(t => t.testName === 'Testimonials 3D Carousel')?.details?.controls || 0}
- 3D Effects: ${testSuite.tests.find(t => t.testName === 'Testimonials 3D Carousel')?.details?.hasPerspective ? 'Yes' : 'No'}
- Glass Effects: ${testSuite.tests.find(t => t.testName === 'Testimonials 3D Carousel')?.details?.hasGlassEffects ? 'Yes' : 'No'}
` : ''}

${testSuite.tests.find(t => t.testName === 'Demo Section')?.details ? `
**Demo Section**:
- Chat Interface: ${testSuite.tests.find(t => t.testName === 'Demo Section')?.details?.hasChatInterface ? 'Yes' : 'No'}
- Demo Scenarios: ${testSuite.tests.find(t => t.testName === 'Demo Section')?.details?.demoScenarios || 0}
- Playback Controls: ${testSuite.tests.find(t => t.testName === 'Demo Section')?.details?.playbackControls || 0}
- 3D Effects: ${testSuite.tests.find(t => t.testName === 'Demo Section')?.details?.has3DEffects ? 'Yes' : 'No'}
` : ''}

## Recommendations

${testSuite.failedTests > 0 ? `
⚠️ **Action Required**: ${testSuite.failedTests} test(s) failed. Please review and fix the issues.
` : `
✅ **All Tests Passed**: US2 is ready for production deployment.
`}

## Performance Metrics

${testSuite.tests.find(t => t.testName === 'US2 Performance Metrics')?.message || 'N/A'}

## 3D Effects Summary

${testSuite.tests.find(t => t.testName === '3D Animations and Effects')?.details ? `
- Perspective Elements: ${testSuite.tests.find(t => t.testName === '3D Animations and Effects')?.details?.perspectiveElements || 0}
- Preserve 3D Elements: ${testSuite.tests.find(t => t.testName === '3D Animations and Effects')?.details?.preserve3DElements || 0}
- Glass Effects: ${testSuite.tests.find(t => t.testName === '3D Animations and Effects')?.details?.glassEffects || 0}
- Enhanced Glass Effects: ${testSuite.tests.find(t => t.testName === '3D Animations and Effects')?.details?.glassEnhancedEffects || 0}
` : ''}
    `.trim();

    return report;
  }
}

// Export the US2 tester
export const us2Tester = new US2Tester();

// Export a function to run US2 tests and log results
export const runUS2Tests = async () => {
  console.log('🧪 Running US2 Tests...');
  
  const testSuite = await us2Tester.runAllUS2Tests();
  const report = us2Tester.generateUS2Report(testSuite);
  
  console.log(report);
  
  // Also log to analytics for monitoring
  analytics.trackEvent('us2_test_run', {
    passedTests: testSuite.passedTests,
    failedTests: testSuite.failedTests,
    totalDuration: testSuite.totalDuration,
    successRate: (testSuite.passedTests / testSuite.tests.length) * 100
  });
  
  return testSuite;
};
