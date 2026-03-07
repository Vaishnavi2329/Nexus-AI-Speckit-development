"use client";

import React, { useEffect, useState } from 'react';
import ConcentricRingsLoader from './loading-animation-1';

interface CSSShaderLoaderProps {
  onComplete?: () => void;
  loadingText?: string;
  duration?: number;
}

export function CSSShaderLoader({ 
  onComplete, 
  loadingText = "Initializing Nexus AI...",
  duration = 3000 
}: CSSShaderLoaderProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);

    // Start fade out after duration
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-blue-600/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/10 via-transparent to-purple-600/10 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated wave effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-slide" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-300/20 to-transparent animate-slide" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-300/20 to-transparent animate-slide" style={{ animationDelay: '1s' }} />
        </div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/80 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + particle.delay}s`
            }}
          />
        ))}

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50" />
      </div>
      
      {/* Loader Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <ConcentricRingsLoader 
              size={120} 
              color="#ffffff" 
              text="" 
              showText={false}
            />
          </div>
          <div className="text-white text-xl font-medium animate-pulse">
            {loadingText}
          </div>
          <div className="text-white/70 text-sm mt-2">
            Powered by AI
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }

        .animate-slide {
          animation: slide 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
