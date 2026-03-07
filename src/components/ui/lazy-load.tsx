"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
  placeholder?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyLoad({
  children,
  className,
  placeholder,
  rootMargin = "50px",
  threshold = 0.1,
  fallback,
  onLoad,
  onError,
}: LazyLoadProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Default placeholder
  const defaultPlaceholder = (
    <div className="lazy-placeholder h-32 w-full rounded-lg" />
  );

  // Default fallback
  const defaultFallback = (
    <div className="flex items-center justify-center h-32 w-full bg-muted rounded-lg">
      <span className="text-muted-foreground">Failed to load content</span>
    </div>
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  if (hasError) {
    return <div className={cn(className)}>{fallback || defaultFallback}</div>;
  }

  if (!isInView) {
    return (
      <div ref={elementRef} className={cn(className)}>
        {placeholder || defaultPlaceholder}
      </div>
    );
  }

  return (
    <div className={cn("gpu-accelerated", className)}>
      {React.cloneElement(children as React.ReactElement<any>, {
        onLoad: handleLoad,
        onError: handleError,
      })}
    </div>
  );
}

// Lazy image component
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  className,
  placeholder,
  width,
  height,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={cn("flex items-center justify-center bg-muted rounded-lg", className)}>
        <span className="text-muted-foreground">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="lazy-placeholder absolute inset-0" />
      )}
      
      {/* Image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          "gpu-accelerated"
        )}
      />
    </div>
  );
}

// Lazy component wrapper for heavy components
interface LazyComponentProps {
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  className?: string;
  placeholder?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

export function LazyComponent({
  component: Component,
  props = {},
  className,
  placeholder,
  rootMargin,
  threshold,
}: LazyComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: rootMargin || "100px",
        threshold: threshold || 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (!isInView) {
    return (
      <div ref={elementRef} className={cn(className)}>
        {placeholder || <div className="lazy-placeholder h-64 w-full rounded-lg" />}
      </div>
    );
  }

  return (
    <div className={cn("gpu-accelerated", className)}>
      <Component {...props} onLoad={handleLoad} />
    </div>
  );
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId: number;

    const measurePerformance = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime >= 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / deltaTime);
        setFps(currentFps);
        setIsLowPerformance(currentFps < 30);
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return { fps, isLowPerformance };
}

// Preload utility for critical resources
export function usePreload(resources: string[]) {
  const [loadedResources, setLoadedResources] = useState<Set<string>>(new Set());
  const [failedResources, setFailedResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    const promises = resources.map((resource) => {
      return new Promise<void>((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = resource;

        if (resource.endsWith(".js")) {
          link.as = "script";
        } else if (resource.endsWith(".css")) {
          link.as = "style";
        } else if (resource.match(/\.(jpg|jpeg|png|gif|webp|avif)$/)) {
          link.as = "image";
        } else if (resource.match(/\.(woff|woff2|ttf|eot)$/)) {
          link.as = "font";
          link.crossOrigin = "anonymous";
        }

        link.onload = () => {
          setLoadedResources((prev) => new Set(prev).add(resource));
          resolve();
        };

        link.onerror = () => {
          setFailedResources((prev) => new Set(prev).add(resource));
          reject();
        };

        document.head.appendChild(link);
      });
    });

    Promise.allSettled(promises).then(() => {
      // All resources have been attempted to load
    });
  }, [resources]);

  return { loadedResources, failedResources };
}

// Resource hints utility
export function addResourceHints() {
  // DNS prefetch for external domains
  const domains = [
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "cdn.jsdelivr.net",
  ];

  domains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect for critical domains
  const criticalDomains = ["fonts.googleapis.com", "fonts.gstatic.com"];

  criticalDomains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = `https://${domain}`;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}

// Call resource hints on mount
if (typeof window !== "undefined") {
  addResourceHints();
}
