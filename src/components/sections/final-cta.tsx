"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface FinalCTAProps {
  className?: string;
}

// Testimonial snippets
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    content: "Nexus AI transformed how our team works. We save 15+ hours per week on administrative tasks.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "CEO",
    content: "The AI automation is incredible. It's like having a personal assistant for every team member.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Freelancer",
    content: "I can take on more clients without feeling overwhelmed. Nexus AI handles the busy work.",
    rating: 5
  }
];

export function FinalCTA({ className }: FinalCTAProps) {
  const { trackConversion, trackEngagement } = useAnalytics();

  const handleGetStarted = () => {
    trackConversion('cta_click', 'final_cta_get_started', 'Get Started Free');
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScheduleDemo = () => {
    trackConversion('cta_click', 'final_cta_schedule_demo', 'Schedule Demo');
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section
      id="final-cta"
      className={cn(
        "py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 mb-8 glass-effect">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Join 50,000+ Professionals</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start your free 14-day trial today. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="p-6 rounded-xl bg-background/80 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 glow-effect zoom-effect glass-effect"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-muted-foreground mb-4 italic">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-foreground">14-day free trial</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-foreground">No credit card required</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-foreground">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-foreground">24/7 support</span>
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 glow-effect zoom-effect"
              onClick={handleGetStarted}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-medium border-2 border-border hover:bg-muted/50 glow-effect zoom-effect"
              onClick={handleScheduleDemo}
            >
              Schedule Demo
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Instant setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>No commitment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>Proven results</span>
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 pt-8 border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center text-sm text-muted-foreground mb-4">
            Trusted by leading companies worldwide
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder company logos - in production, these would be actual logos */}
            <div className="text-2xl font-bold text-foreground">TechCorp</div>
            <div className="text-2xl font-bold text-foreground">InnovateCo</div>
            <div className="text-2xl font-bold text-foreground">GlobalTech</div>
            <div className="text-2xl font-bold text-foreground">FutureSoft</div>
            <div className="text-2xl font-bold text-foreground">SmartSys</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
