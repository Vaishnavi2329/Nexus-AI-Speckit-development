import { motion } from 'framer-motion';

export interface VisualEffects {
  glow: {
    enabled: boolean;
    color: string;
    intensity: 'subtle' | 'medium' | 'strong';
  };
  zoom: {
    enabled: boolean;
    scale: number;
    duration: number;
  };
  glass: {
    enabled: boolean;
    blur: number;
    opacity: number;
    borderRadius: number;
  };
}

export const defaultVisualEffects: VisualEffects = {
  glow: {
    enabled: true,
    color: '#3b82f6', // Blue 600
    intensity: 'medium'
  },
  zoom: {
    enabled: true,
    scale: 1.05,
    duration: 0.3
  },
  glass: {
    enabled: true,
    blur: 8,
    opacity: 0.1,
    borderRadius: 12
  }
};

// Glow effect utilities
export const getGlowIntensity = (intensity: 'subtle' | 'medium' | 'strong') => {
  switch (intensity) {
    case 'subtle':
      return '0 0 10px rgba(59, 130, 246, 0.2)';
    case 'medium':
      return '0 0 20px rgba(59, 130, 246, 0.3)';
    case 'strong':
      return '0 0 40px rgba(59, 130, 246, 0.5)';
    default:
      return '0 0 20px rgba(59, 130, 246, 0.3)';
  }
};

export const getGlowHoverIntensity = (intensity: 'subtle' | 'medium' | 'strong') => {
  switch (intensity) {
    case 'subtle':
      return '0 0 20px rgba(59, 130, 246, 0.3)';
    case 'medium':
      return '0 0 40px rgba(59, 130, 246, 0.5)';
    case 'strong':
      return '0 0 60px rgba(59, 130, 246, 0.7)';
    default:
      return '0 0 40px rgba(59, 130, 246, 0.5)';
  }
};

// Zoom effect utilities
export const zoomVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: defaultVisualEffects.zoom.scale,
    transition: { 
      duration: defaultVisualEffects.zoom.duration,
      type: "spring",
      stiffness: 300,
      damping: 20 
    }
  }
};

// Glass effect utilities
export const getGlassStyle = (effects: VisualEffects['glass']) => ({
  background: `rgba(255, 255, 255, ${effects.opacity})`,
  backdropFilter: `blur(${effects.blur}px)`,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: `${effects.borderRadius}px`
});

export const getGlassStyleDark = (effects: VisualEffects['glass']) => ({
  background: `rgba(0, 0, 0, ${effects.opacity})`,
  backdropFilter: `blur(${effects.blur}px)`,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: `${effects.borderRadius}px`
});

// Combined effect utilities
export const getCardEffects = (effects: VisualEffects) => {
  const glowStyle = effects.glow.enabled ? {
    boxShadow: getGlowIntensity(effects.glow.intensity),
    transition: 'all 0.3s ease-in-out'
  } : {};

  const zoomStyle = effects.zoom.enabled ? {
    transition: `transform ${effects.zoom.duration}s cubic-bezier(0.4, 0, 0.2, 1)`
  } : {};

  const glassStyle = effects.glass.enabled ? getGlassStyle(effects.glass) : {};

  return {
    ...glowStyle,
    ...zoomStyle,
    ...glassStyle,
    '&:hover': {
      boxShadow: effects.glow.enabled ? getGlowHoverIntensity(effects.glow.intensity) : undefined,
      transform: effects.zoom.enabled ? `scale(${effects.zoom.scale})` : undefined
    }
  };
};

// Animation presets
export const fadeInUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInLeftVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInRightVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const scaleInVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Stagger animation for lists
export const staggerContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Tubelight effect
export const tubelightVariants = {
  initial: { backgroundPosition: "-200% center" },
  animate: { 
    backgroundPosition: "200% center",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// 3D rotation for testimonials
export const rotate3dVariants = {
  initial: { rotateY: 0, rotateX: 0 },
  hover: { 
    rotateY: 5,
    rotateX: -5,
    transition: { 
      duration: 0.6,
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Pulse animation for CTAs
export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Floating animation
export const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
