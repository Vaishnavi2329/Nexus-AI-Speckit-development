"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Brain, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface HowItWorksProps {
  className?: string;
}

// Steps data
const steps = [
  {
    id: 1,
    icon: Zap,
    title: "Connect Your Tools",
    description: "Integrate Nexus AI with your existing tools and platforms in minutes. We support 100+ popular business applications.",
    details: [
      "Slack, Microsoft Teams, Google Workspace",
      "Project management tools (Jira, Asana, Trello)",
      "Communication platforms (Email, Calendar)",
      "Custom API integrations"
    ],
    color: "blue",
    duration: "2 minutes"
  },
  {
    id: 2,
    icon: Brain,
    title: "AI Learns Your Patterns",
    description: "Our AI analyzes your workflow patterns and automatically identifies opportunities for optimization and automation.",
    details: [
      "Analyzes communication patterns",
      "Identifies repetitive tasks",
      "Learns your priorities and preferences",
      "Adapts to your work style"
    ],
    color: "purple",
    duration: "24 hours"
  },
  {
    id: 3,
    icon: Target,
    title: "Experience Productivity Gains",
    description: "Watch as Nexus AI automates tasks, prioritizes work, and helps you focus on what matters most.",
    details: [
      "Automated task management",
      "Smart scheduling and reminders",
      "Intelligent email filtering",
      "Performance insights and recommendations"
    ],
    color: "green",
    duration: "Immediate"
  }
];

export function HowItWorks({ className }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(1);
  const { trackConversion, trackEngagement } = useAnalytics();

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    trackEngagement('section_view', stepId, 'how-it-works');
  };

  const handleGetStarted = () => {
    trackConversion('cta_click', 'how_it_works_get_started', 'Get Started');
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentStep = steps.find(step => step.id === activeStep);

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

  const getStepColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
      case 'purple':
        return 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20';
      case 'green':
        return 'from-green-500 to-green-600 text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
      default:
        return 'from-gray-500 to-gray-600 text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <section
      id="how-it-works"
      className={cn(
        "py-20 bg-background",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How Nexus AI Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get up and running in minutes. Our AI learns your patterns and starts delivering value immediately.
          </p>
        </motion.div>

        {/* Step Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            
            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={cn(
                    "p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
                    isActive
                      ? "border-primary bg-primary/5 glow-effect"
                      : "border-border hover:border-primary/50 bg-background"
                  )}
                  onClick={() => handleStepClick(step.id)}
                >
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                      getStepColor(step.color)
                    )}>
                      {step.id}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {step.duration}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={cn(
                    "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6",
                    getStepColor(step.color)
                  )}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                </div>

                {/* Connection Lines */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Active Step Details */}
        {currentStep && (
          <motion.div
            className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 glass-effect mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={cn(
                "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center",
                getStepColor(currentStep.color)
              )}>
                <currentStep.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{currentStep.title}</h3>
                <p className="text-muted-foreground">Step {currentStep.id} of 3</p>
              </div>
            </div>
            
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              {currentStep.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentStep.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background/50">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Setup Progress</span>
            <span className="text-sm font-medium text-foreground">{activeStep}/3 Complete</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/80"
              initial={{ width: 0 }}
              animate={{ width: `${(activeStep / 3) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 glow-effect zoom-effect"
            onClick={handleGetStarted}
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Start your free 14-day trial • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
