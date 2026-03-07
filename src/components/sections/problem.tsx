"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, FileText, Users, AlertCircle, TrendingDown, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ProblemProps {
  className?: string;
}

// Problem data
const problems = [
  {
    icon: Clock,
    title: "Time-Consuming Tasks",
    description: "Spending hours on repetitive administrative work instead of focusing on high-value activities.",
    impact: "high"
  },
  {
    icon: FileText,
    title: "Information Overload",
    description: "Drowning in emails, documents, and notifications with no efficient way to prioritize and process.",
    impact: "high"
  },
  {
    icon: Users,
    title: "Communication Chaos",
    description: "Juggling multiple communication channels and struggling to keep track of important conversations.",
    impact: "medium"
  },
  {
    icon: AlertCircle,
    title: "Missed Deadlines",
    description: "Losing track of important dates and deadlines due to poor organization and lack of reminders.",
    impact: "high"
  },
  {
    icon: TrendingDown,
    title: "Decreased Productivity",
    description: "Feeling overwhelmed and unable to maintain focus, leading to declining work quality and output.",
    impact: "high"
  },
  {
    icon: Target,
    title: "Lack of Prioritization",
    description: "Struggling to identify what's most important and wasting time on low-impact activities.",
    impact: "medium"
  }
];

export function Problem({ className }: ProblemProps) {
  const { trackConversion, trackEngagement } = useAnalytics();

  const handleSolveProblem = () => {
    trackConversion('cta_click', 'problem_solve', 'Solve These Problems');
    // Scroll to features section
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20';
      default:
        return 'text-blue-500 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
    }
  };

  return (
    <section
      id="problem"
      className={cn(
        "py-20 bg-muted/50",
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Productivity Crisis is Real
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Modern professionals face unprecedented challenges that impact their productivity, 
            well-being, and bottom line. You're not alone in this struggle.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className={cn(
                  "p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 glow-effect zoom-effect card-hover",
                  "glass-effect"
                )}>
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      getImpactColor(problem.impact)
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {problem.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Impact indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      problem.impact === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    )} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">73%</div>
            <p className="text-muted-foreground">
              of professionals feel overwhelmed by information overload
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">28%</div>
            <p className="text-muted-foreground">
              of work time is spent on low-value administrative tasks
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">67%</div>
            <p className="text-muted-foreground">
              report declining productivity despite working longer hours
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 glow-effect zoom-effect"
            onClick={handleSolveProblem}
          >
            Solve These Problems with AI
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Join thousands of professionals who have transformed their productivity
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Problem;
