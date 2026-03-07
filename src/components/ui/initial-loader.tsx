"use client";

import React, { useEffect, useState } from 'react';
import { SmartLoader } from './smart-loader';

interface InitialLoaderProps {
  children: React.ReactNode;
}

export function InitialLoader({ children }: InitialLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('nexus-ai-visited');
    
    if (hasVisited) {
      // Skip loader for returning visitors
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    // Mark as visited
    localStorage.setItem('nexus-ai-visited', 'true');
    
    // Show loader for first-time visitors
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {isLoading && (
        <SmartLoader
          onComplete={handleLoaderComplete}
          loadingText="Initializing Nexus AI..."
          duration={3000}
        />
      )}
      
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  );
}
