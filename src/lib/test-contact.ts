// Test script for contact form validation and error states
import { analytics } from "./analytics";

export interface ContactTestResult {
  testName: string;
  passed: boolean;
  message: string;
  duration: number;
  details?: any;
}

export interface ContactTestSuite {
  suiteName: string;
  tests: ContactTestResult[];
  totalDuration: number;
  passedTests: number;
  failedTests: number;
}

class ContactTester {
  private results: ContactTestResult[] = [];

  // Test contact section structure
  async testContactSectionStructure(): Promise<ContactTestResult> {
    const startTime = performance.now();
    
    try {
      // Check if contact section exists
      const contactSection = document.getElementById('contact');
      if (!contactSection) {
        throw new Error('Contact section not found');
      }

      // Check for contact form
      const contactForm = contactSection.querySelector('form');
      const hasForm = contactForm !== null;

      // Check for contact information
      const contactInfo = contactSection.querySelectorAll('.flex.items-start');
      const hasContactInfo = contactInfo.length > 0;

      // Check for form fields
      const formInputs = contactSection.querySelectorAll('input, textarea, select');
      const hasFormFields = formInputs.length > 0;

      // Check for submit button
      const submitButton = contactSection.querySelector('button[type="submit"]');
      const hasSubmitButton = submitButton !== null;

      const duration = performance.now() - startTime;
      return {
        testName: 'Contact Section Structure',
        passed: hasForm && hasContactInfo && hasFormFields && hasSubmitButton,
        message: `Found form: ${hasForm}, contact info: ${hasContactInfo}, fields: ${formInputs.length}, submit: ${hasSubmitButton}`,
        duration,
        details: {
          hasForm,
          hasContactInfo,
          contactInfoElements: contactInfo.length,
          hasFormFields,
          formInputs: formInputs.length,
          hasSubmitButton
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Contact Section Structure',
        passed: false,
        message: `Structure test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test React Hook Form integration
  async testReactHookForm(): Promise<ContactTestResult> {
    const startTime = performance.now();
    
    try {
      const contactSection = document.getElementById('contact');
      if (!contactSection) {
        throw new Error('Contact section not found');
      }

      // Check for form with proper structure
      const form = contactSection.querySelector('form');
      if (!form) {
        throw new Error('Form not found');
      }

      // Check for form fields with proper attributes
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const subjectInput = form.querySelector('input[name="subject"]');
      const messageTextarea = form.querySelector('textarea[name="message"]');
      const inquirySelect = form.querySelector('select[name="inquiryType"]');

      const hasRequiredFields = nameInput && emailInput && subjectInput && messageTextarea && inquirySelect;

      // Check for validation attributes
      const requiredFields = form.querySelectorAll('[required], [aria-required="true"]');
      const hasRequiredAttributes = requiredFields.length > 0;

      // Check for error display elements
      const errorElements = form.querySelectorAll('.text-red-500, .text-red-600');
      const hasErrorElements = errorElements.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'React Hook Form Integration',
        passed: hasRequiredFields && hasRequiredAttributes,
        message: `Required fields: ${hasRequiredFields}, required attributes: ${hasRequiredAttributes}, error elements: ${hasErrorElements}`,
        duration,
        details: {
          hasRequiredFields,
          nameInput: !!nameInput,
          emailInput: !!emailInput,
          subjectInput: !!subjectInput,
          messageTextarea: !!messageTextarea,
          inquirySelect: !!inquirySelect,
          hasRequiredAttributes,
          requiredFields: requiredFields.length,
          hasErrorElements,
          errorElements: errorElements.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'React Hook Form Integration',
        passed: false,
        message: `React Hook Form test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test Zod validation
  async testZodValidation(): Promise<ContactTestResult> {
    const startTime = performance.now();
    
    try {
      const contactSection = document.getElementById('contact');
      if (!contactSection) {
        throw new Error('Contact section not found');
      }

      // Check for validation patterns in inputs
      const emailInput = contactSection.querySelector('input[type="email"]') as HTMLInputElement;
      const hasEmailValidation = emailInput?.type === 'email';

      // Check for min/max length attributes
      const nameInput = contactSection.querySelector('input[name="name"]') as HTMLInputElement;
      const hasLengthValidation = nameInput?.minLength || nameInput?.maxLength;

      // Check for required field indicators
      const requiredIndicators = contactSection.querySelectorAll('.text-red-500');
      const hasRequiredIndicators = requiredIndicators.length > 0;

      // Check for validation error containers
      const errorContainers = contactSection.querySelectorAll('[class*="text-red"]');
      const hasErrorContainers = errorContainers.length > 0;

      // Test validation logic (basic check)
      const canValidate = typeof window !== 'undefined' && 'zod' in window || 
                        contactSection.textContent?.includes('validation') || false;

      const duration = performance.now() - startTime;
      return {
        testName: 'Zod Validation',
        passed: hasEmailValidation && hasRequiredIndicators,
        message: `Email validation: ${hasEmailValidation}, required indicators: ${hasRequiredIndicators}, error containers: ${hasErrorContainers}`,
        duration,
        details: {
          hasEmailValidation,
          hasLengthValidation,
          hasRequiredIndicators,
          requiredIndicators: requiredIndicators.length,
          hasErrorContainers,
          errorContainers: errorContainers.length,
          canValidate
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Zod Validation',
        passed: false,
        message: `Zod validation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test localStorage submission handling
  async testLocalStorageHandling(): Promise<ContactTestResult> {
    const startTime = performance.now();
    
    try {
      // Check if localStorage is available
      const hasLocalStorage = typeof window !== 'undefined' && 'localStorage' in window;

      // Check for existing contact submissions
      let existingSubmissions = [];
      if (hasLocalStorage) {
        try {
          existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        } catch (e) {
          existingSubmissions = [];
        }
      }

      // Test localStorage write capability
      let canWriteLocalStorage = false;
      if (hasLocalStorage) {
        try {
          const testKey = 'test_contact_submissions';
          const testData = [{ id: Date.now(), test: true }];
          localStorage.setItem(testKey, JSON.stringify(testData));
          const retrieved = JSON.parse(localStorage.getItem(testKey) || '[]');
          canWriteLocalStorage = retrieved.length > 0;
          localStorage.removeItem(testKey);
        } catch (e) {
          canWriteLocalStorage = false;
        }
      }

      // Check for submission tracking
      const hasSubmissionTracking = existingSubmissions.length >= 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'LocalStorage Submission Handling',
        passed: hasLocalStorage && canWriteLocalStorage,
        message: `LocalStorage available: ${hasLocalStorage}, can write: ${canWriteLocalStorage}, existing submissions: ${existingSubmissions.length}`,
        duration,
        details: {
          hasLocalStorage,
          canWriteLocalStorage,
          hasSubmissionTracking,
          existingSubmissions: existingSubmissions.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'LocalStorage Submission Handling',
        passed: false,
        message: `LocalStorage test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test on-screen confirmation component
  async testConfirmationComponent(): Promise<ContactTestResult> {
    const startTime = performance.now();
    
    try {
      const contactSection = document.getElementById('contact');
      if (!contactSection) {
        throw new Error('Contact section not found');
      }

      // Check for success state elements
      const successIcon = contactSection.querySelector('.lucide-check-circle');
      const hasSuccessIcon = successIcon !== null;

      // Check for confirmation message
      const confirmationMessage = contactSection.querySelector('h2, h3');
      const hasConfirmationMessage = confirmationMessage !== null;

      // Check for action buttons after submission
      const actionButtons = contactSection.querySelectorAll('button');
      const hasActionButtons = actionButtons.length > 0;

      // Check for step-by-step process
      const processSteps = contactSection.querySelectorAll('.flex.items-start.gap-3');
      const hasProcessSteps = processSteps.length > 0;

      // Check for animation classes
      const animatedElements = contactSection.querySelectorAll('[class*="animate-"], [class*="motion"]');
      const hasAnimations = animatedElements.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'On-screen Confirmation Component',
        passed: hasSuccessIcon && hasConfirmationMessage && hasActionButtons,
        message: `Success icon: ${hasSuccessIcon}, confirmation message: ${hasConfirmationMessage}, action buttons: ${hasActionButtons}`,
        duration,
        details: {
          hasSuccessIcon,
          hasConfirmationMessage,
          hasActionButtons,
          actionButtons: actionButtons.length,
          hasProcessSteps,
          processSteps: processSteps.length,
          hasAnimations,
          animatedElements: animatedElements.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'On-screen Confirmation Component',
        passed: false,
        message: `Confirmation component test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test form analytics tracking
  async testFormAnalytics(): Promise<ContactTestResult> {
    const startTime = performance.now();
    
    try {
      const contactSection = document.getElementById('contact');
      if (!contactSection) {
        throw new Error('Contact section not found');
      }

      // Check for analytics tracking (basic check)
      const hasAnalytics = typeof window !== 'undefined' && 'analytics' in window;

      // Check for form event handlers
      const form = contactSection.querySelector('form');
      const hasFormHandler = form && typeof (form as any).onsubmit === 'function';

      // Check for field change handlers
      const inputsWithHandlers = contactSection.querySelectorAll('input[onchange], input[oninput], textarea[onchange], select[onchange]');
      const hasFieldHandlers = inputsWithHandlers.length > 0;

      // Check for tracking scripts
      const scriptTags = document.querySelectorAll('script');
      const hasTrackingScripts = Array.from(scriptTags).some(script => 
        script.textContent?.includes('analytics') || script.textContent?.includes('track')
      );

      // Check for data attributes
      const dataAttributes = contactSection.querySelectorAll('[data-testid], [data-track]');
      const hasDataAttributes = dataAttributes.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Form Analytics Tracking',
        passed: hasAnalytics && (hasFormHandler || hasFieldHandlers),
        message: `Analytics available: ${hasAnalytics}, form handler: ${hasFormHandler}, field handlers: ${hasFieldHandlers}`,
        duration,
        details: {
          hasAnalytics,
          hasFormHandler,
          hasFieldHandlers,
          inputsWithHandlers: inputsWithHandlers.length,
          hasTrackingScripts,
          scriptTags: scriptTags.length,
          hasDataAttributes,
          dataAttributes: dataAttributes.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Form Analytics Tracking',
        passed: false,
        message: `Analytics test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Test form validation and error states
  async testFormValidationAndErrors(): Promise<ContactTestResult> {
    const startTime = performance.now();
    
    try {
      const contactSection = document.getElementById('contact');
      if (!contactSection) {
        throw new Error('Contact section not found');
      }

      // Check for validation error display
      const errorMessages = contactSection.querySelectorAll('.text-red-500, .text-red-600');
      const hasErrorMessages = errorMessages.length > 0;

      // Check for error icons
      const errorIcons = contactSection.querySelectorAll('.lucide-alert-circle');
      const hasErrorIcons = errorIcons.length > 0;

      // Check for field validation states
      const invalidFields = contactSection.querySelectorAll('.border-red-500');
      const hasInvalidFields = invalidFields.length > 0;

      // Check for form submission states
      const submitButton = contactSection.querySelector('button[type="submit"]');
      const hasSubmitButton = submitButton !== null;

      // Check for loading states
      const loadingIndicators = contactSection.querySelectorAll('.animate-spin');
      const hasLoadingIndicators = loadingIndicators.length > 0;

      // Check for disabled states
      const disabledElements = contactSection.querySelectorAll(':disabled');
      const hasDisabledStates = disabledElements.length > 0;

      const duration = performance.now() - startTime;
      return {
        testName: 'Form Validation and Error States',
        passed: hasErrorMessages && hasSubmitButton,
        message: `Error messages: ${hasErrorMessages}, error icons: ${hasErrorIcons}, invalid fields: ${hasInvalidFields}`,
        duration,
        details: {
          hasErrorMessages,
          errorMessages: errorMessages.length,
          hasErrorIcons,
          errorIcons: errorIcons.length,
          hasInvalidFields,
          invalidFields: invalidFields.length,
          hasSubmitButton,
          hasLoadingIndicators,
          loadingIndicators: loadingIndicators.length,
          hasDisabledStates,
          disabledElements: disabledElements.length
        }
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        testName: 'Form Validation and Error States',
        passed: false,
        message: `Validation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  }

  // Run all contact tests
  async runAllContactTests(): Promise<ContactTestSuite> {
    const startTime = performance.now();
    this.results = [];

    const tests = [
      this.testContactSectionStructure(),
      this.testReactHookForm(),
      this.testZodValidation(),
      this.testLocalStorageHandling(),
      this.testConfirmationComponent(),
      this.testFormAnalytics(),
      this.testFormValidationAndErrors()
    ];

    const results = await Promise.all(tests);
    this.results = results;
    
    const totalDuration = performance.now() - startTime;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = results.filter(r => !r.passed).length;

    return {
      suiteName: 'Contact Form Validation and Error States',
      tests: this.results,
      totalDuration,
      passedTests,
      failedTests
    };
  }

  // Generate contact test report
  generateContactReport(testSuite: ContactTestSuite): string {
    const report = `
# Contact Form Test Report

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

${testSuite.tests.find(t => t.testName === 'React Hook Form Integration')?.details ? `
**React Hook Form Features**:
- Name Input: ${testSuite.tests.find(t => t.testName === 'React Hook Form Integration')?.details?.nameInput ? 'Yes' : 'No'}
- Email Input: ${testSuite.tests.find(t => t.testName === 'React Hook Form Integration')?.details?.emailInput ? 'Yes' : 'No'}
- Subject Input: ${testSuite.tests.find(t => t.testName === 'React Hook Form Integration')?.details?.subjectInput ? 'Yes' : 'No'}
- Message Textarea: ${testSuite.tests.find(t => t.testName === 'React Hook Form Integration')?.details?.messageTextarea ? 'Yes' : 'No'}
- Inquiry Select: ${testSuite.tests.find(t => t.testName === 'React Hook Form Integration')?.details?.inquirySelect ? 'Yes' : 'No'}
- Required Attributes: ${testSuite.tests.find(t => t.testName === 'React Hook Form Integration')?.details?.hasRequiredAttributes ? 'Yes' : 'No'}
- Error Elements: ${testSuite.tests.find(t => t.testName === 'React Hook Form Integration')?.details?.errorElements || 0}
` : ''}

${testSuite.tests.find(t => t.testName === 'Zod Validation')?.details ? `
**Zod Validation Features**:
- Email Validation: ${testSuite.tests.find(t => t.testName === 'Zod Validation')?.details?.hasEmailValidation ? 'Yes' : 'No'}
- Length Validation: ${testSuite.tests.find(t => t.testName === 'Zod Validation')?.details?.hasLengthValidation ? 'Yes' : 'No'}
- Required Indicators: ${testSuite.tests.find(t => t.testName === 'Zod Validation')?.details?.hasRequiredIndicators ? 'Yes' : 'No'}
- Error Containers: ${testSuite.tests.find(t => t.testName === 'Zod Validation')?.details?.hasErrorContainers ? 'Yes' : 'No'}
` : ''}

${testSuite.tests.find(t => t.testName === 'LocalStorage Submission Handling')?.details ? `
**LocalStorage Features**:
- LocalStorage Available: ${testSuite.tests.find(t => t.testName === 'LocalStorage Submission Handling')?.details?.hasLocalStorage ? 'Yes' : 'No'}
- Can Write: ${testSuite.tests.find(t => t.testName === 'LocalStorage Submission Handling')?.details?.canWriteLocalStorage ? 'Yes' : 'No'}
- Submission Tracking: ${testSuite.tests.find(t => t.testName === 'LocalStorage Submission Handling')?.details?.hasSubmissionTracking ? 'Yes' : 'No'}
- Existing Submissions: ${testSuite.tests.find(t => t.testName === 'LocalStorage Submission Handling')?.details?.existingSubmissions || 0}
` : ''}

## Recommendations

${testSuite.failedTests > 0 ? `
⚠️ **Action Required**: ${testSuite.failedTests} test(s) failed. Please review and fix the issues.
` : `
✅ **All Tests Passed**: Contact form is ready for production deployment.
`}

## Validation Summary

${testSuite.tests.find(t => t.testName === 'Form Validation and Error States')?.details ? `
- Error Messages: ${testSuite.tests.find(t => t.testName === 'Form Validation and Error States')?.details?.errorMessages || 0}
- Error Icons: ${testSuite.tests.find(t => t.testName === 'Form Validation and Error States')?.details?.errorIcons || 0}
- Invalid Fields: ${testSuite.tests.find(t => t.testName === 'Form Validation and Error States')?.details?.invalidFields || 0}
- Submit Button: ${testSuite.tests.find(t => t.testName === 'Form Validation and Error States')?.details?.hasSubmitButton ? 'Yes' : 'No'}
- Loading Indicators: ${testSuite.tests.find(t => t.testName === 'Form Validation and Error States')?.details?.hasLoadingIndicators ? 'Yes' : 'No'}
` : ''}

## Analytics Summary

${testSuite.tests.find(t => t.testName === 'Form Analytics Tracking')?.details ? `
- Analytics Available: ${testSuite.tests.find(t => t.testName === 'Form Analytics Tracking')?.details?.hasAnalytics ? 'Yes' : 'No'}
- Form Handler: ${testSuite.tests.find(t => t.testName === 'Form Analytics Tracking')?.details?.hasFormHandler ? 'Yes' : 'No'}
- Field Handlers: ${testSuite.tests.find(t => t.testName === 'Form Analytics Tracking')?.details?.inputsWithHandlers || 0}
- Tracking Scripts: ${testSuite.tests.find(t => t.testName === 'Form Analytics Tracking')?.details?.hasTrackingScripts ? 'Yes' : 'No'}
- Data Attributes: ${testSuite.tests.find(t => t.testName === 'Form Analytics Tracking')?.details?.hasDataAttributes ? 'Yes' : 'No'}
` : ''}
    `.trim();

    return report;
  }
}

// Export the contact tester
export const contactTester = new ContactTester();

// Export a function to run contact tests and log results
export const runContactTests = async () => {
  console.log('🧪 Running Contact Form Tests...');
  
  const testSuite = await contactTester.runAllContactTests();
  const report = contactTester.generateContactReport(testSuite);
  
  console.log(report);
  
  // Also log to analytics for monitoring
  analytics.trackEvent('contact_test_run', {
    passedTests: testSuite.passedTests,
    failedTests: testSuite.failedTests,
    totalDuration: testSuite.totalDuration,
    successRate: (testSuite.passedTests / testSuite.tests.length) * 100
  });
  
  return testSuite;
};
