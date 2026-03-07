"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ConcentricRingsLoader from './loading-animation-1';

export function PageTransitionLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader briefly during route changes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setIsLoading(true);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
        <ConcentricRingsLoader size={60} color="hsl(var(--primary))" text="Loading page..." />
      </div>
    </div>
  );
}
