"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SiteData {
  site: {
    hero?: any;
    features?: any[];
    testimonials?: any[];
    blogs?: any[];
    pricing?: any[];
    contact?: any;
  };
  admin?: {
    email: string;
    password: string;
    name: string;
  };
}

interface SiteDataContextType {
  siteData: SiteData | null;
  setSiteData: React.Dispatch<React.SetStateAction<SiteData | null>>;
  updateSiteData: (updates: Partial<SiteData>) => void;
  refreshSiteData: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    const loadSiteData = async () => {
      try {
        const response = await fetch('/site-data.json');
        const data = await response.json();
        setSiteData(data);
      } catch (error) {
        console.error('Error loading site data:', error);
      }
    };

    loadSiteData();
  }, []);

  const updateSiteData = (updates: Partial<SiteData>) => {
    setSiteData(prev => {
      if (!prev) return updates as SiteData;
      const newData = {
        ...prev,
        ...updates,
        site: {
          ...prev?.site,
          ...updates.site
        }
      };
      
      // Also update the JSON file for persistence
      fetch('/api/site-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData, null, 2)
      }).catch(error => {
        console.error('Error updating site data:', error);
      });
      
      return newData;
    });
  };

  const refreshSiteData = async () => {
    try {
      const response = await fetch('/api/site-data');
      const data = await response.json();
      setSiteData(data);
    } catch (error) {
      console.error('Error refreshing site data:', error);
    }
  };

  const contextValue: SiteDataContextType = {
    siteData,
    setSiteData,
    updateSiteData
  };

  return (
    <SiteDataContext.Provider value={contextValue}>
      {children}
    </SiteDataContext.Provider>
  );
}
