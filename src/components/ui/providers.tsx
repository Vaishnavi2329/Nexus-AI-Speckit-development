"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Theme {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
  };
}

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#8b5cf6',
    background: '#ffffff',
    foreground: '#1f2937',
    muted: '#6b7280'
  }
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#60a5fa',
    secondary: '#3b82f6',
    accent: '#8b5cf6',
    background: '#0f172a',
    foreground: '#f8fafc',
    muted: '#64748b'
  }
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(darkTheme);

  useEffect(() => {
    // Check system preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const systemTheme = mediaQuery.matches ? darkTheme : lightTheme;
      
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const initialTheme = savedTheme || (mediaQuery.matches ? 'dark' : 'light');
      
      setThemeState(initialTheme === 'dark' ? darkTheme : lightTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = theme.mode === 'dark' ? 'light' : 'dark';
    const newTheme = newMode === 'dark' ? darkTheme : lightTheme;
    
    setThemeState(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newMode);
      document.documentElement.classList.toggle('dark', newMode === 'dark');
    }
  };

  const setTheme = (mode: 'light' | 'dark') => {
    const newTheme = mode === 'dark' ? darkTheme : lightTheme;
    setThemeState(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', mode);
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
