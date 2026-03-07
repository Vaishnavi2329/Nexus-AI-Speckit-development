// Local storage utility for Nexus AI landing page
import React from 'react';

export interface StorageItem<T = any> {
  data: T;
  timestamp: number;
  expiry?: number; // Optional expiry timestamp
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

export interface AnalyticsData {
  events: any[];
  sessionStart: number;
  lastActivity: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  animations: boolean;
  reducedMotion: boolean;
}

class LocalStorageManager {
  private prefix = 'nexus_ai_';

  // Generic methods
  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, data: T, expiryInHours?: number): void {
    if (typeof window === 'undefined') return;

    try {
      const item: StorageItem<T> = {
        data,
        timestamp: Date.now(),
        expiry: expiryInHours ? Date.now() + (expiryInHours * 60 * 60 * 1000) : undefined
      };

      localStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      console.warn(`Failed to set localStorage item ${key}:`, error);
    }
  }

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return null;

      const parsed: StorageItem<T> = JSON.parse(item);

      // Check if item has expired
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.remove(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn(`Failed to get localStorage item ${key}:`, error);
      return null;
    }
  }

  remove(key: string): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.warn(`Failed to remove localStorage item ${key}:`, error);
    }
  }

  exists(key: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
      return localStorage.getItem(this.getKey(key)) !== null;
    } catch (error) {
      return false;
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  // Contact form specific methods
  saveContactSubmission(formData: ContactFormData): void {
    const existingSubmissions = this.get<ContactFormData[]>('contact_submissions') || [];
    existingSubmissions.push(formData);
    
    // Keep only last 50 submissions
    const submissions = existingSubmissions.slice(-50);
    
    this.set('contact_submissions', submissions, 365); // Keep for 1 year
  }

  getContactSubmissions(): ContactFormData[] {
    return this.get<ContactFormData[]>('contact_submissions') || [];
  }

  // Analytics specific methods
  saveAnalyticsData(data: AnalyticsData): void {
    this.set('analytics', data, 30); // Keep for 30 days
  }

  getAnalyticsData(): AnalyticsData | null {
    return this.get<AnalyticsData>('analytics');
  }

  // User preferences specific methods
  saveUserPreferences(preferences: Partial<UserPreferences>): void {
    const existing = this.getUserPreferences();
    const updated = { ...existing, ...preferences };
    this.set('user_preferences', updated);
  }

  getUserPreferences(): UserPreferences {
    const defaultPreferences: UserPreferences = {
      theme: 'light',
      animations: true,
      reducedMotion: false
    };

    return this.get<UserPreferences>('user_preferences') || defaultPreferences;
  }

  // Theme specific methods
  saveTheme(theme: 'light' | 'dark'): void {
    this.saveUserPreferences({ theme });
  }

  getTheme(): 'light' | 'dark' {
    return this.getUserPreferences().theme;
  }

  // Form data persistence
  saveFormData(formId: string, data: Record<string, any>): void {
    this.set(`form_${formId}`, data, 24); // Keep for 24 hours
  }

  getFormData(formId: string): Record<string, any> | null {
    return this.get<Record<string, any>>(`form_${formId}`);
  }

  clearFormData(formId: string): void {
    this.remove(`form_${formId}`);
  }

  // Session management
  getSessionId(): string {
    let sessionId = this.get<string>('session_id');
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.set('session_id', sessionId, 24); // Session expires after 24 hours
    }
    
    return sessionId;
  }

  // Utility methods
  getStorageInfo(): {
    totalItems: number;
    nexusItems: number;
    usedSpace: number;
    maxSize: number;
  } {
    if (typeof window === 'undefined') {
      return { totalItems: 0, nexusItems: 0, usedSpace: 0, maxSize: 0 };
    }

    try {
      const keys = Object.keys(localStorage);
      const nexusKeys = keys.filter(key => key.startsWith(this.prefix));
      
      let usedSpace = 0;
      nexusKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          usedSpace += value.length;
        }
      });

      return {
        totalItems: keys.length,
        nexusItems: nexusKeys.length,
        usedSpace,
        maxSize: 5 * 1024 * 1024 // 5MB typical localStorage limit
      };
    } catch (error) {
      return { totalItems: 0, nexusItems: 0, usedSpace: 0, maxSize: 0 };
    }
  }

  // Cleanup expired items
  cleanupExpired(): void {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              const parsed: StorageItem = JSON.parse(item);
              if (parsed.expiry && Date.now() > parsed.expiry) {
                localStorage.removeItem(key);
              }
            } catch {
              // Remove malformed items
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup expired localStorage items:', error);
    }
  }

  // Export/Import functionality
  exportData(): string {
    if (typeof window === 'undefined') return '';

    try {
      const keys = Object.keys(localStorage);
      const nexusData: Record<string, any> = {};
      
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const value = localStorage.getItem(key);
          if (value) {
            nexusData[key] = value;
          }
        }
      });

      return JSON.stringify(nexusData, null, 2);
    } catch (error) {
      console.warn('Failed to export localStorage data:', error);
      return '';
    }
  }

  importData(jsonData: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const data = JSON.parse(jsonData);
      
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key]);
      });

      return true;
    } catch (error) {
      console.warn('Failed to import localStorage data:', error);
      return false;
    }
  }
}

// Create singleton instance
export const storage = new LocalStorageManager();

// React hooks for localStorage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    return storage.get<T>(key) ?? initialValue;
  });

  const setValue = React.useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storage.set(key, valueToStore);
    } catch (error) {
      console.warn(`Error setting localStorage value for key ${key}:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

export const useContactForm = () => {
  const [submissions, setSubmissions] = React.useState<ContactFormData[]>([]);

  React.useEffect(() => {
    setSubmissions(storage.getContactSubmissions());
  }, []);

  const submitForm = React.useCallback((formData: Omit<ContactFormData, 'timestamp'>) => {
    const submission: ContactFormData = {
      ...formData,
      timestamp: Date.now()
    };
    
    storage.saveContactSubmission(submission);
    setSubmissions(prev => [...prev, submission]);
    
    return submission;
  }, []);

  return { submissions, submitForm };
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = React.useState<UserPreferences>(() => {
    return storage.getUserPreferences();
  });

  const updatePreferences = React.useCallback((newPreferences: Partial<UserPreferences>) => {
    storage.saveUserPreferences(newPreferences);
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  }, []);

  return { preferences, updatePreferences };
};

// Cleanup on mount
if (typeof window !== 'undefined') {
  storage.cleanupExpired();
}
