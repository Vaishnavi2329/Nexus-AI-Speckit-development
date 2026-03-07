"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string>;
  isolate?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeout?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Track error in analytics
    analytics.trackEvent('error_boundary_triggered', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      retryCount: this.state.retryCount
    });

    // Call custom error handler
    this.props.onError?.(error, errorInfo);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys = [] } = this.props;
    const { hasError } = this.state;

    if (hasError && prevProps.resetKeys !== resetKeys) {
      const hasKeyChanged = resetKeys.some((key, index) => 
        prevProps.resetKeys?.[index] !== key
      );

      if (hasKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleRetry = () => {
    const { retryCount } = this.state;
    
    if (retryCount < 3) {
      this.setState(prevState => ({ 
        retryCount: prevState.retryCount + 1 
      }));
      
      analytics.trackEvent('error_boundary_retry', {
        retryCount: retryCount + 1
      });
      
      this.resetErrorBoundary();
    } else {
      // Max retries reached, show different message
      this.setState({ retryCount: retryCount + 1 });
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { children, fallback, isolate } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className={`min-h-screen flex items-center justify-center bg-background ${isolate ? 'pointer-events-none' : ''}`}>
          <div className="max-w-md w-full mx-auto p-6">
            <div className="text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-foreground mb-4">
                {retryCount >= 3 ? 'Something went wrong' : 'Oops! An error occurred'}
              </h1>

              {/* Error Message */}
              <p className="text-muted-foreground mb-6">
                {retryCount >= 3 
                  ? "We're sorry, but something went wrong and we couldn't recover from this error. Please try refreshing the page or contact support if the problem persists."
                  : "We encountered an unexpected error. You can try again or refresh the page."
                }
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground mb-2">
                    Error Details
                  </summary>
                  <div className="bg-muted p-4 rounded-lg text-xs font-mono text-red-600 overflow-auto max-h-32">
                    <div className="mb-2">
                      <strong>Error:</strong> {error.message}
                    </div>
                    {error.stack && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="whitespace-pre-wrap">{error.stack}</pre>
                      </div>
                    )}
                    {errorInfo?.componentStack && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap">{errorInfo.componentStack}</pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {retryCount < 3 && (
                  <Button
                    onClick={this.handleRetry}
                    className="w-full sm:w-auto"
                    variant="default"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {retryCount === 0 ? 'Try Again' : `Retry (${retryCount}/3)`}
                  </Button>
                )}
                
                <Button
                  onClick={this.handleGoHome}
                  className="w-full sm:w-auto"
                  variant="outline"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Support Info */}
              {retryCount >= 3 && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    If this problem persists, please contact our support team at{' '}
                    <a href="mailto:support@nexusai.com" className="text-primary hover:underline">
                      support@nexusai.com
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Hook for handling async errors
export function useAsyncError() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
    analytics.trackEvent('async_error_caught', {
      error: error.message,
      stack: error.stack
    });
  }, []);

  // Throw error to be caught by ErrorBoundary
  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

// Component for handling async operations with error boundary
export function AsyncErrorHandler({ 
  children, 
  fallback 
}: { 
  children: ReactNode; 
  fallback?: ReactNode;
}) {
  const { captureError, resetError } = useAsyncError();

  return (
    <ErrorBoundary
      fallback={fallback}
      onError={(error) => {
        captureError(error);
        resetError();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// Network error boundary for API calls
export function NetworkErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Network Error
            </h1>
            <p className="text-muted-foreground mb-6">
              We're having trouble connecting to our servers. Please check your internet connection and try again.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Graceful degradation wrapper
export function GracefulDegradation({ 
  children, 
  fallback 
}: { 
  children: ReactNode; 
  fallback: ReactNode;
}) {
  const [isSupported, setIsSupported] = React.useState(true);

  React.useEffect(() => {
    // Check for required browser features
    const requiredFeatures = [
      'Promise',
      'Map',
      'Set',
      'Array.prototype.includes',
      'Array.prototype.find',
      'Array.prototype.findIndex',
      'Object.assign',
      'fetch'
    ];

    const unsupportedFeatures = requiredFeatures.filter(feature => {
      try {
        const parts = feature.split('.');
        let obj = window as any;
        for (const part of parts) {
          obj = obj[part];
          if (!obj) return true;
        }
        return false;
      } catch {
        return true;
      }
    });

    if (unsupportedFeatures.length > 0) {
      setIsSupported(false);
      analytics.trackEvent('browser_not_supported', {
        unsupportedFeatures
      });
    }
  }, []);

  if (!isSupported) {
    return fallback;
  }

  return <>{children}</>;
}

// Progressive enhancement wrapper
export function ProgressiveEnhancement({ 
  children, 
  fallback 
}: { 
  children: ReactNode; 
  fallback?: ReactNode;
}) {
  const [enhancedFeatures, setEnhancedFeatures] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Check for enhanced features
    const features = [
      { name: 'webgl', check: () => {
        try {
          const canvas = document.createElement('canvas');
          return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch {
          return false;
        }
      }},
      { name: 'webworkers', check: () => 'Worker' in window },
      { name: 'intersectionobserver', check: () => 'IntersectionObserver' in window },
      { name: 'resizeobserver', check: () => 'ResizeObserver' in window },
      { name: 'localstorage', check: () => 'localStorage' in window },
      { name: 'sessionstorage', check: () => 'sessionStorage' in window },
      { name: 'geolocation', check: () => 'geolocation' in navigator },
      { name: 'serviceworker', check: () => 'serviceWorker' in navigator }
    ];

    const supportedFeatures = features
      .filter(feature => feature.check())
      .map(feature => feature.name);

    setEnhancedFeatures(supportedFeatures);
  }, []);

  // Provide enhanced features context
  return (
    <div data-enhanced-features={enhancedFeatures.join(',')}>
      {children}
    </div>
  );
}

// Error recovery utilities
export class ErrorRecovery {
  private static instance: ErrorRecovery;
  private errorCounts: Map<string, number> = new Map();
  private lastErrors: Map<string, number> = new Map();

  static getInstance(): ErrorRecovery {
    if (!ErrorRecovery.instance) {
      ErrorRecovery.instance = new ErrorRecovery();
    }
    return ErrorRecovery.instance;
  }

  // Check if error should be retried
  shouldRetry(error: Error, context: string): boolean {
    const errorKey = `${context}:${error.message}`;
    const count = this.errorCounts.get(errorKey) || 0;
    const lastError = this.lastErrors.get(errorKey) || 0;
    const now = Date.now();

    // Don't retry if too many attempts
    if (count >= 3) return false;

    // Don't retry if last error was recent (rate limiting)
    if (now - lastError < 1000) return false;

    // Don't retry for certain error types
    const nonRetryableErrors = [
      'authentication failed',
      'authorization failed',
      'not found',
      'forbidden'
    ];

    const errorMessage = error.message.toLowerCase();
    if (nonRetryableErrors.some(pattern => errorMessage.includes(pattern))) {
      return false;
    }

    return true;
  }

  // Record error attempt
  recordError(error: Error, context: string): void {
    const errorKey = `${context}:${error.message}`;
    const count = (this.errorCounts.get(errorKey) || 0) + 1;
    
    this.errorCounts.set(errorKey, count);
    this.lastErrors.set(errorKey, Date.now());

    analytics.trackEvent('error_recovery_attempt', {
      context,
      error: error.message,
      attemptCount: count
    });
  }

  // Reset error counts
  resetErrors(context?: string): void {
    if (context) {
      // Reset errors for specific context
      const keysToDelete = Array.from(this.errorCounts.keys())
        .filter(key => key.startsWith(`${context}:`));
      
      keysToDelete.forEach(key => {
        this.errorCounts.delete(key);
        this.lastErrors.delete(key);
      });
    } else {
      // Reset all errors
      this.errorCounts.clear();
      this.lastErrors.clear();
    }
  }

  // Get error statistics
  getErrorStats(): { totalErrors: number; errorsByContext: Record<string, number> } {
    const errorsByContext: Record<string, number> = {};
    
    this.errorCounts.forEach((count, key) => {
      const context = key.split(':')[0];
      errorsByContext[context] = (errorsByContext[context] || 0) + count;
    });

    return {
      totalErrors: this.errorCounts.size,
      errorsByContext
    };
  }
}

export const errorRecovery = ErrorRecovery.getInstance();
