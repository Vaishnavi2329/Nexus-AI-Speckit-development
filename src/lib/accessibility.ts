// Accessibility utilities for Nexus AI landing page
import React from 'react';

// ARIA helpers
export const getAriaLabel = (label: string, required?: boolean): string => {
  return required ? `${label} (required)` : label;
};

export const getAriaDescribedBy = (...ids: (string | undefined)[]): string | undefined => {
  const validIds = ids.filter(Boolean) as string[];
  return validIds.length > 0 ? validIds.join(' ') : undefined;
};

export const getAriaErrorMessage = (error: string, fieldId: string): string => {
  return `${fieldId}-error`;
};

// Focus management
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstFocusable?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

// Screen reader announcements
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  if (typeof document === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Keyboard navigation helpers
export const keyboardNavigation = {
  // Handle escape key
  onEscape: (callback: () => void) => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  },

  // Handle enter key
  onEnter: (callback: () => void) => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEnter);
    return () => document.removeEventListener('keydown', handleEnter);
  },

  // Handle arrow keys
  onArrow: (callback: (direction: 'up' | 'down' | 'left' | 'right') => void) => {
    const handleArrow = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          callback('up');
          break;
        case 'ArrowDown':
          callback('down');
          break;
        case 'ArrowLeft':
          callback('left');
          break;
        case 'ArrowRight':
          callback('right');
          break;
      }
    };

    document.addEventListener('keydown', handleArrow);
    return () => document.removeEventListener('keydown', handleArrow);
  }
};

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  // This is a simplified version - in production, use a proper color contrast library
  const getLuminance = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const sRGB = [r, g, b].map(val => {
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const meetsWCAG = (contrastRatio: number, level: 'AA' | 'AAA' = 'AA', large = false): boolean => {
  if (large) {
    return level === 'AA' ? contrastRatio >= 3.0 : contrastRatio >= 4.5;
  }
  return level === 'AA' ? contrastRatio >= 4.5 : contrastRatio >= 7.0;
};

// Reduced motion detection
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// High contrast detection
export const prefersHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Screen reader detection
export const isScreenReaderActive = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for common screen reader indicators
  const hasAriaLiveElements = document.querySelectorAll('[aria-live]').length > 0;
  const hasAriaHiddenElements = document.querySelectorAll('[aria-hidden="true"]').length > 0;
  
  return hasAriaLiveElements || hasAriaHiddenElements;
};

// Accessibility testing utilities
export const runAccessibilityAudit = (element: HTMLElement): {
  errors: string[];
  warnings: string[];
  passed: number;
} => {
  const errors: string[] = [];
  const warnings: string[] = [];
  let passed = 0;

  // Check for alt text on images
  const images = element.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt) {
      errors.push(`Image ${index + 1} is missing alt text`);
    }
  });

  // Check for form labels
  const inputs = element.querySelectorAll('input, textarea, select');
  inputs.forEach((input, index) => {
    const hasLabel = element.querySelector(`label[for="${input.id}"]`) || 
                     input.getAttribute('aria-label') || 
                     input.getAttribute('aria-labelledby');
    
    if (!hasLabel) {
      errors.push(`Form input ${index + 1} is missing a label`);
    }
  });

  // Check for heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > lastLevel + 1) {
      warnings.push(`Heading level skipped: from h${lastLevel} to h${level}`);
    }
    lastLevel = level;
  });

  // Check for skip links
  const skipLink = element.querySelector('a[href^="#"]');
  if (!skipLink) {
    warnings.push('Consider adding a skip link for keyboard navigation');
  }

  // Check for focus indicators
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length > 0) {
    const style = window.getComputedStyle(focusableElements[0]);
    if (style.outline === 'none' && style.boxShadow === 'none') {
      warnings.push('Focus indicators may not be visible');
    }
  }

  passed = images.length + inputs.length + headings.length - errors.length;

  return { errors, warnings, passed };
};

// React hooks for accessibility
export const useAccessibility = () => {
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  const [screenReader, setScreenReader] = React.useState(false);

  React.useEffect(() => {
    const checkPreferences = () => {
      setReducedMotion(prefersReducedMotion());
      setHighContrast(prefersHighContrast());
      setScreenReader(isScreenReaderActive());
    };

    checkPreferences();

    // Listen for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');

    motionQuery.addEventListener('change', checkPreferences);
    contrastQuery.addEventListener('change', checkPreferences);

    return () => {
      motionQuery.removeEventListener('change', checkPreferences);
      contrastQuery.removeEventListener('change', checkPreferences);
    };
  }, []);

  return {
    reducedMotion,
    highContrast,
    screenReader,
    announce: announceToScreenReader,
    trapFocus,
    getAriaLabel,
    getAriaDescribedBy,
    getAriaErrorMessage
  };
};

// Focus trap hook
export const useFocusTrap = (isActive: boolean) => {
  const elementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!isActive || !elementRef.current) return;

    const cleanup = trapFocus(elementRef.current);
    return cleanup;
  }, [isActive]);

  return elementRef;
};

// Keyboard navigation hook
export const useKeyboardNavigation = (
  onEscape?: () => void,
  onEnter?: () => void,
  onArrow?: (direction: 'up' | 'down' | 'left' | 'right') => void
) => {
  React.useEffect(() => {
    const cleanups: (() => void)[] = [];

    if (onEscape) {
      cleanups.push(keyboardNavigation.onEscape(onEscape));
    }

    if (onEnter) {
      cleanups.push(keyboardNavigation.onEnter(onEnter));
    }

    if (onArrow) {
      cleanups.push(keyboardNavigation.onArrow(onArrow));
    }

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, [onEscape, onEnter, onArrow]);
};

// Accessibility component wrapper
export const withAccessibility = <P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P & { accessibilityProps?: AccessibilityProps }> => {
  const AccessibilityWrapper = ({ accessibilityProps, ...props }: P & { accessibilityProps?: AccessibilityProps }) => {
    const accessibility = useAccessibility();

    return React.createElement(WrappedComponent, {
      ...props,
      accessibility,
      ...accessibilityProps
    } as unknown as P);
  };

  return AccessibilityWrapper;
};

interface AccessibilityProps {
  reducedMotion?: boolean;
  highContrast?: boolean;
  screenReader?: boolean;
  announce?: (message: string, priority?: 'polite' | 'assertive') => void;
  trapFocus?: (element: HTMLElement) => () => void;
  getAriaLabel?: (label: string, required?: boolean) => string;
  getAriaDescribedBy?: (...ids: (string | undefined)[]) => string | undefined;
  getAriaErrorMessage?: (error: string, fieldId: string) => string;
}

// Common accessibility patterns
export const accessibilityPatterns = {
  // Modal pattern
  modal: {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'modal-title',
    'aria-describedby': 'modal-description'
  },

  // Tooltip pattern
  tooltip: {
    role: 'tooltip',
    'aria-hidden': 'true'
  },

  // Menu pattern
  menu: {
    role: 'menu',
    'aria-orientation': 'vertical'
  },

  // Menu item pattern
  menuItem: {
    role: 'menuitem',
    tabIndex: -1
  },

  // Tab panel pattern
  tabPanel: {
    role: 'tabpanel',
    'aria-labelledby': undefined, // Set to tab button id
    tabIndex: 0
  },

  // Tab button pattern
  tabButton: {
    role: 'tab',
    'aria-selected': 'false',
    'aria-controls': undefined, // Set to panel id
    tabIndex: -1
  }
};
