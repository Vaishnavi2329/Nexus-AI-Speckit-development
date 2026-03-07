"use client";

import React, { useState } from 'react';
import { SmartLoader } from './smart-loader';
import { WebGLShaderLoader } from './webgl-shader-loader';
import { CSSShaderLoader } from './css-shader-loader';

export function ShaderDemo() {
  const [currentDemo, setCurrentDemo] = useState<'smart' | 'webgl' | 'css'>('smart');
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoComplete = () => {
    setIsLoading(false);
  };

  const startDemo = (type: 'smart' | 'webgl' | 'css') => {
    setIsLoading(true);
    setCurrentDemo(type);
  };

  if (isLoading) {
    switch (currentDemo) {
      case 'webgl':
        return (
          <WebGLShaderLoader
            onComplete={handleDemoComplete}
            loadingText="WebGL Shader Demo"
            duration={5000}
          />
        );
      case 'css':
        return (
          <CSSShaderLoader
            onComplete={handleDemoComplete}
            loadingText="CSS Shader Demo"
            duration={5000}
          />
        );
      default:
        return (
          <SmartLoader
            onComplete={handleDemoComplete}
            loadingText="Smart Shader Demo"
            duration={5000}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Shader Loading Effects Demo</h1>
        <p className="text-muted-foreground mb-8">
          Experience the mesmerizing shader effects that power the Nexus AI loading experience.
        </p>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Current Demo: {currentDemo.toUpperCase()}</h3>
          <div className="space-y-4">
            <button
              onClick={() => startDemo('webgl')}
              disabled={isLoading}
              className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              WebGL Shader
            </button>
            
            <button
              onClick={() => startDemo('css')}
              disabled={isLoading}
              className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              CSS Fallback
            </button>
            
            <button
              onClick={() => startDemo('smart')}
              disabled={isLoading}
              className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              Smart Auto-Detect
            </button>
            <ul className="flex items-center gap-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Animated gradients
              </li>
            </ul>
            <ul className="flex items-center gap-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Floating particle effects
              </li>
            </ul>
            <ul className="flex items-center gap-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Wave animations
              </li>
            </ul>
            <ul className="flex items-center gap-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Lightweight performance
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Usage Examples</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">1. Smart Loader (Recommended):</h4>
            <code className="block bg-background border border-border rounded p-2 text-xs">
              {`import { SmartLoader } from "@/components/ui/smart-loader";

<SmartLoader
  onComplete={() => console.log('Loaded!')}
  loadingText="Initializing..."
  duration={3000}
/>`}
            </code>
          </div>
          <div>
            <h4 className="font-medium mb-2">2. Initial Loader (First Visit Only):</h4>
            <code className="block bg-background border border-border rounded p-2 text-xs">
              {`import { InitialLoader } from "@/components/ui/initial-loader";

<InitialLoader>
  <YourApp />
</InitialLoader>`}
            </code>
          </div>
          <div>
            <h4 className="font-medium mb-2">3. WebGL Only:</h4>
            <code className="block bg-background border border-border rounded p-2 text-xs">
              {`import { WebGLShaderLoader } from "@/components/ui/webgl-shader-loader";

<WebGLShaderLoader
  onComplete={handleComplete}
  loadingText="WebGL Loading..."
  duration={4000}
/>`}
            </code>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">WebGL Shader:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Hardware-accelerated graphics</li>
              <li>Custom fragment shaders</li>
              <li>Particle system with physics</li>
              <li>60fps performance</li>
              <li>Gradient animations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">CSS Fallback:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Universal browser support</li>
              <li>Animated gradients</li>
              <li>Wave effects</li>
              <li>Floating particles</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Smart Loader:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Automatic WebGL detection</li>
              <li>Graceful fallback</li>
              <li>Best performance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Browser Support */}
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Browser Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">WebGL Shader:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Hardware-accelerated graphics</li>
              <li>Custom fragment shaders</li>
              <li>Particle system with physics</li>
              <li>60fps performance</li>
              <li>Gradient animations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">CSS Fallback:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Universal browser support</li>
              <li>Animated gradients</li>
              <li>Wave effects</li>
              <li>Floating particles</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Smart Loader:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Automatic WebGL detection</li>
              <li>Graceful fallback</li>
              <li>Best performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
