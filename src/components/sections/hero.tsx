"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Zap, Mail, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/providers";
import { useAnalytics } from "@/lib/analytics";
import { variants, staggerConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

// Rotating keywords for the headline
const rotatingKeywords = [
  "emails",
  "meetings", 
  "tasks",
  "deadlines",
  "projects",
  "deadlines"
];

export function Hero({ className }: HeroProps) {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();
  const { trackConversion, trackEngagement } = useAnalytics();

  // Rotate keywords
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentKeywordIndex((prev) => (prev + 1) % rotatingKeywords.length);
        setIsVisible(true);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle CTA clicks
  const handleGetStarted = () => {
    trackConversion('cta_click', 'hero_get_started', 'Get Started');
    // Scroll to features or pricing
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    trackConversion('cta_click', 'hero_learn_more', 'Learn More');
    // Scroll to features
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const keywordVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section
      id="hero"
      className={cn(
        "min-h-screen flex items-center justify-center relative overflow-hidden",
        "hero-gradient",
        className
      )}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grid animate-grid" />
      </div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8 glass-effect"
        >
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Productivity</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
        >
          <span className="block">Transform your</span>
          <span className="block text-gradient">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentKeywordIndex}
                variants={keywordVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="inline-block"
              >
                {rotatingKeywords[currentKeywordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="block">with AI</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Nexus AI is your intelligent productivity assistant that automates repetitive tasks, 
          streamlines workflows, and helps you focus on what matters most. 
          Experience the future of work today.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 glow-effect zoom-effect btn-primary"
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <CheckCircle className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-medium border-2 border-border hover:bg-muted/50 glow-effect zoom-effect"
            onClick={handleLearnMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <Calendar className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col sm:flex-row gap-8 items-center justify-center text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl float-animation"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl float-animation"
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl float-animation"
        animate={{
          y: [-15, 15, -15],
          x: [-10, 10, -10]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
}

export default Hero;
