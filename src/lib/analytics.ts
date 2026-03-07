// Analytics tracking utility for Nexus AI landing page
import React from 'react';

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export interface PageViewEvent extends AnalyticsEvent {
  event: 'page_view';
  properties: {
    page: string;
    title?: string;
    referrer?: string;
  };
}

export interface ConversionEvent extends AnalyticsEvent {
  event: 'conversion';
  properties: {
    type: 'cta_click' | 'form_submit' | 'pricing_click' | 'signup_click';
    source: string;
    value?: string;
  };
}

export interface UserEngagementEvent extends AnalyticsEvent {
  event: 'engagement';
  properties: {
    type: 'scroll_depth' | 'time_on_page' | 'section_view';
    value: number | string;
    section?: string;
  };
}

// Simple analytics implementation using localStorage and console
class AnalyticsTracker {
  private isEnabled: boolean;
  private events: AnalyticsEvent[] = [];
  private sessionStart: number;
  private maxEvents: number = 100;

  constructor() {
    this.isEnabled = typeof window !== 'undefined';
    this.sessionStart = Date.now();
    this.loadStoredEvents();
  }

  private loadStoredEvents() {
    if (!this.isEnabled) return;
    
    try {
      const stored = localStorage.getItem('nexus_analytics_events');
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load stored analytics events:', error);
    }
  }

  private saveEvents() {
    if (!this.isEnabled) return;
    
    try {
      // Keep only the most recent events
      const eventsToSave = this.events.slice(-this.maxEvents);
      localStorage.setItem('nexus_analytics_events', JSON.stringify(eventsToSave));
    } catch (error) {
      console.warn('Failed to save analytics events:', error);
    }
  }

  private addEvent(event: AnalyticsEvent) {
    const eventWithTimestamp = {
      ...event,
      timestamp: Date.now()
    };

    this.events.push(eventWithTimestamp);
    
    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Analytics Event:', eventWithTimestamp);
    }

    this.saveEvents();
  }

  // Page view tracking
  trackPageView(page: string, title?: string) {
    const event: PageViewEvent = {
      event: 'page_view',
      properties: {
        page,
        title,
        referrer: typeof window !== 'undefined' ? document.referrer : undefined
      }
    };

    this.addEvent(event);
  }

  // Conversion tracking
  trackConversion(type: ConversionEvent['properties']['type'], source: string, value?: string) {
    const event: ConversionEvent = {
      event: 'conversion',
      properties: {
        type,
        source,
        value
      }
    };

    this.addEvent(event);
  }

  // User engagement tracking
  trackEngagement(type: UserEngagementEvent['properties']['type'], value: number | string, section?: string) {
    const event: UserEngagementEvent = {
      event: 'engagement',
      properties: {
        type,
        value,
        section
      }
    };

    this.addEvent(event);
  }

  // Custom event tracking
  trackEvent(event: string, properties?: Record<string, any>) {
    this.addEvent({ event, properties });
  }

  // Get analytics data
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Get events by type
  getEventsByType(eventType: string): AnalyticsEvent[] {
    return this.events.filter(event => event.event === eventType);
  }

  // Get conversion metrics
  getConversionMetrics() {
    const conversions = this.getEventsByType('conversion') as ConversionEvent[];
    
    return {
      totalConversions: conversions.length,
      conversionsByType: conversions.reduce((acc, conversion) => {
        const type = conversion.properties.type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      conversionsBySource: conversions.reduce((acc, conversion) => {
        const source = conversion.properties.source;
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  // Get engagement metrics
  getEngagementMetrics() {
    const engagements = this.getEventsByType('engagement') as UserEngagementEvent[];
    
    return {
      totalEngagements: engagements.length,
      engagementsByType: engagements.reduce((acc, engagement) => {
        const type = engagement.properties.type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      averageScrollDepth: this.calculateAverageScrollDepth(engagements),
      sessionDuration: Date.now() - this.sessionStart
    };
  }

  private calculateAverageScrollDepth(engagements: UserEngagementEvent[]): number {
    const scrollEvents = engagements.filter(e => e.properties.type === 'scroll_depth');
    if (scrollEvents.length === 0) return 0;
    
    const totalDepth = scrollEvents.reduce((sum, event) => {
      return sum + (typeof event.properties.value === 'number' ? event.properties.value : 0);
    }, 0);
    
    return Math.round(totalDepth / scrollEvents.length);
  }

  // Clear all events
  clearEvents() {
    this.events = [];
    if (this.isEnabled) {
      localStorage.removeItem('nexus_analytics_events');
    }
  }

  // Export analytics data
  exportData(): string {
    const data = {
      events: this.events,
      sessionStart: this.sessionStart,
      sessionEnd: Date.now(),
      conversionMetrics: this.getConversionMetrics(),
      engagementMetrics: this.getEngagementMetrics()
    };

    return JSON.stringify(data, null, 2);
  }
}

// Create singleton instance
export const analytics = new AnalyticsTracker();

// React hooks for analytics
export const useAnalytics = () => {
  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    trackEngagement: analytics.trackEngagement.bind(analytics),
    trackEvent: analytics.trackEvent.bind(analytics),
    getEvents: analytics.getEvents.bind(analytics),
    getConversionMetrics: analytics.getConversionMetrics.bind(analytics),
    getEngagementMetrics: analytics.getEngagementMetrics.bind(analytics)
  };
};

// Higher-order component for tracking page views
export const withPageTracking = <P extends object>(
  WrappedComponent: React.ComponentType<P>, 
  pageTitle?: string
): React.ComponentType<P> => {
  return (props: P) => {
    React.useEffect(() => {
      analytics.trackPageView(window.location.pathname, pageTitle);
    }, []);

    return React.createElement(WrappedComponent, props);
  };
};

// Custom hooks for specific tracking
export const useScrollTracking = () => {
  React.useEffect(() => {
    let maxScrollDepth = 0;
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollDepth = Math.round((currentScroll / scrollHeight) * 100);
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Debounce scroll events
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          analytics.trackEngagement('scroll_depth', maxScrollDepth);
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);
};

export const useTimeOnPage = () => {
  React.useEffect(() => {
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      analytics.trackEngagement('time_on_page', timeOnPage);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, []);
};

// CTA tracking utilities
export const trackCTAClick = (ctaId: string, ctaText: string) => {
  analytics.trackConversion('cta_click', ctaId, ctaText);
};

export const trackFormSubmit = (formId: string, formData?: any) => {
  analytics.trackConversion('form_submit', formId, JSON.stringify(formData));
};

export const trackPricingClick = (planName: string) => {
  analytics.trackConversion('pricing_click', planName, planName);
};

export const trackSignupClick = (source: string) => {
  analytics.trackConversion('signup_click', source, 'signup');
};
