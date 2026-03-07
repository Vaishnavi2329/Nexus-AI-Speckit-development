"use client";

import React, { useEffect, useRef, useState } from 'react';
import ConcentricRingsLoader from './loading-animation-1';

interface WebGLShaderLoaderProps {
  onComplete?: () => void;
  loadingText?: string;
  duration?: number;
}

export function WebGLShaderLoader({ 
  onComplete, 
  loadingText = "Initializing Nexus AI...",
  duration = 3000 
}: WebGLShaderLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) {
      console.warn('WebGL not supported, falling back to canvas');
      return;
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source with animated gradient and particles
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_fadeOut;
      
      varying vec2 v_uv;
      
      // Noise function for particle generation
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      // Particle system
      float particles(vec2 uv, float time) {
        float result = 0.0;
        
        for (float i = 0.0; i < 20.0; i++) {
          vec2 pos = vec2(
            noise(vec2(i * 0.3, time * 0.1)),
            noise(vec2(i * 0.4, time * 0.15 + 100.0))
          );
          
          float size = 0.002 + noise(vec2(i * 0.5, time * 0.2)) * 0.003;
          float dist = distance(uv, pos);
          
          if (dist < size) {
            result += (1.0 - dist / size) * 0.5;
          }
        }
        
        return result;
      }
      
      // Animated gradient
      vec3 gradient(vec2 uv, float time) {
        // Nexus AI theme colors
        vec3 color1 = vec3(0.23, 0.51, 0.96); // Blue (#3b82f6)
        vec3 color2 = vec3(0.14, 0.32, 0.82); // Darker blue
        vec3 color3 = vec3(0.59, 0.13, 0.35); // Accent (#eb3b5a)
        
        float wave1 = sin(uv.x * 3.0 + time) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 2.0 + time * 0.7) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 1.5 + time * 1.3) * 0.5 + 0.5;
        
        vec3 gradientColor = mix(
          mix(color1, color2, wave1),
          color3,
          wave2 * wave3
        );
        
        // Add subtle animation
        gradientColor += vec3(
          sin(time * 0.5) * 0.05,
          cos(time * 0.3) * 0.05,
          sin(time * 0.7) * 0.05
        );
        
        return gradientColor;
      }
      
      void main() {
        vec2 uv = v_uv;
        
        // Create animated gradient background
        vec3 backgroundColor = gradient(uv, u_time * 0.5);
        
        // Add particle effects
        float particleEffect = particles(uv, u_time);
        
        // Combine gradient with particles
        vec3 finalColor = backgroundColor + particleEffect;
        
        // Apply fade out
        finalColor *= (1.0 - u_fadeOut);
        
        // Add subtle vignette
        float vignette = 1.0 - distance(uv, vec2(0.5)) * 0.5;
        finalColor *= vignette;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Create and compile shaders
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    // Set up geometry (full screen quad)
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const fadeOutUniformLocation = gl.getUniformLocation(program, 'u_fadeOut');

    // Start animation
    startTimeRef.current = Date.now();

    const render = () => {
      if (!startTimeRef.current) return;

      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      
      // Check if duration exceeded
      if (currentTime * 1000 >= duration) {
        setFadeOut(true);
        setTimeout(() => {
          onComplete?.();
        }, 500); // Allow fade out animation
        return;
      }

      // Clear and set up
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Set uniforms
      gl.uniform1f(timeUniformLocation, currentTime);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(fadeOutUniformLocation, fadeOut ? 1.0 : 0.0);

      // Set up attribute
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [duration, fadeOut, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* WebGL Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Loader Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <ConcentricRingsLoader 
              size={120} 
              color="#3b82f6" 
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
    </div>
  );
}
