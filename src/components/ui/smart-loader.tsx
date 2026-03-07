"use client";

import React, { useEffect, useState } from 'react';
import { WebGLShaderLoader } from './webgl-shader-loader';
import { CSSShaderLoader } from './css-shader-loader';

interface SmartLoaderProps {
  onComplete?: () => void;
  loadingText?: string;
  duration?: number;
}

export function SmartLoader({ 
  onComplete, 
  loadingText = "Initializing Nexus AI...",
  duration = 3000 
}: SmartLoaderProps) {
  const [useWebGL, setUseWebGL] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setUseWebGL(!!gl);
  }, []);

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  if (useWebGL) {
    return (
      <WebGLShaderLoader
        onComplete={onComplete}
        loadingText={loadingText}
        duration={duration}
      />
    );
  }

  return (
    <CSSShaderLoader
      onComplete={onComplete}
      loadingText={loadingText}
      duration={duration}
    />
  );
}
