import { motion, AnimatePresence, MotionProps } from 'framer-motion';

// Animation configuration types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  type?: 'tween' | 'spring' | 'keyframes';
  stiffness?: number;
  damping?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  viewport?: boolean;
  amount?: number;
  once?: boolean;
}

// Default animation configurations
export const defaultAnimations = {
  // Fast animations
  fast: {
    duration: 0.2,
    ease: "easeOut"
  },
  
  // Normal animations
  normal: {
    duration: 0.3,
    ease: "easeInOut"
  },
  
  // Slow animations
  slow: {
    duration: 0.6,
    ease: "easeOut"
  },
  
  // Spring animations
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
  },
  
  // Bouncy animations
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 10
  }
};

// Scroll-triggered animation defaults
export const scrollAnimations = {
  fadeIn: {
    viewport: true,
    amount: 0.3,
    once: true,
    duration: 0.6,
    ease: "easeOut"
  },
  
  slideUp: {
    viewport: true,
    amount: 0.2,
    once: true,
    duration: 0.5,
    ease: "easeOut"
  },
  
  scaleIn: {
    viewport: true,
    amount: 0.1,
    once: true,
    duration: 0.4,
    ease: "easeOut"
  }
};

// Common animation variants
export const variants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  
  scaleUp: {
    initial: { scale: 1 },
    animate: { scale: 1.05 },
    exit: { scale: 1 }
  },
  
  // Slide animations
  slideUp: {
    initial: { y: 100 },
    animate: { y: 0 },
    exit: { y: 100 }
  },
  
  slideDown: {
    initial: { y: -100 },
    animate: { y: 0 },
    exit: { y: -100 }
  },
  
  slideLeft: {
    initial: { x: 100 },
    animate: { x: 0 },
    exit: { x: 100 }
  },
  
  slideRight: {
    initial: { x: -100 },
    animate: { x: 0 },
    exit: { x: -100 }
  },
  
  // Rotation animations
  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 }
  },
  
  // 3D animations
  rotate3d: {
    initial: { rotateY: 0, rotateX: 0 },
    animate: { rotateY: 5, rotateX: -5 },
    exit: { rotateY: 0, rotateX: 0 }
  },
  
  // Special animations
  tubelight: {
    initial: { backgroundPosition: "-200% center" },
    animate: { backgroundPosition: "200% center" }
  },
  
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1]
    }
  },
  
  float: {
    animate: {
      y: [-10, 0, -10]
    }
  },
  
  glow: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(59, 130, 246, 0.5)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ]
    }
  }
};

// Stagger animation configurations
export const staggerConfig = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  item: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },
  
  fast: {
    staggerChildren: 0.05,
    delayChildren: 0.1
  },
  
  slow: {
    staggerChildren: 0.2,
    delayChildren: 0.3
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: 0.3,
    ease: "easeInOut"
  }
};

// Custom animation hooks
export const createScrollAnimation = (variant: string, config?: Partial<ScrollAnimationConfig>) => {
  return {
    initial: "initial",
    whileInView: "animate",
    exit: "exit",
    variants: variants[variant as keyof typeof variants],
    viewport: { once: true, amount: 0.3 },
    transition: {
      duration: 0.6,
      ease: "easeOut",
      ...config
    }
  };
};

export const createHoverAnimation = (variant: string, config?: Partial<AnimationConfig>) => {
  return {
    whileHover: "animate",
    variants: variants[variant as keyof typeof variants],
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20,
      ...config
    }
  };
};

export const createTapAnimation = (variant: string, config?: Partial<AnimationConfig>) => {
  return {
    whileTap: "animate",
    variants: variants[variant as keyof typeof variants],
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 10,
      ...config
    }
  };
};

// Animation presets for common use cases
export const animationPresets = {
  // Hero section animations
  hero: {
    badge: createScrollAnimation('fadeInDown', { delay: 0.2 }),
    headline: createScrollAnimation('fadeInUp', { delay: 0.4 }),
    subtext: createScrollAnimation('fadeInUp', { delay: 0.6 }),
    cta: createScrollAnimation('fadeInUp', { delay: 0.8 })
  },
  
  // Card animations
  card: {
    container: createScrollAnimation('fadeInUp'),
    hover: createHoverAnimation('scaleUp'),
    tap: createTapAnimation('scaleIn')
  },
  
  // Navigation animations
  nav: {
    container: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, ease: "easeOut" }
    },
    item: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 }
    }
  },
  
  // Testimonial animations
  testimonial: {
    container: staggerConfig.container,
    item: {
      ...staggerConfig.item,
      whileHover: variants.rotate3d.animate
    }
  },
  
  // Pricing animations
  pricing: {
    container: staggerConfig.container,
    item: {
      ...staggerConfig.item,
      whileHover: variants.scaleUp.animate
    }
  },
  
  // Form animations
  form: {
    container: createScrollAnimation('fadeInUp'),
    field: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.3, ease: "easeOut" }
    },
    button: createHoverAnimation('scaleUp')
  }
};

// Helper function to combine multiple animations
export const combineAnimations = (...animations: MotionProps[]) => {
  return animations.reduce((acc, animation) => ({
    ...acc,
    ...animation
  }), {});
};

// Performance optimization utilities
export const reducedMotion = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: { duration: 0.1 }
};

// Check for reduced motion preference
export const shouldReduceMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Get appropriate animation based on motion preferences
export const getAdaptiveAnimation = (normalAnimation: any, reducedAnimation?: any) => {
  return shouldReduceMotion() ? (reducedAnimation || reducedMotion) : normalAnimation;
};
