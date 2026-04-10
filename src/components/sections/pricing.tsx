"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, ArrowRight, Zap, Shield, Users, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/contexts/site-data-context";

interface PricingProps {
  className?: string;
}

export function Pricing({ className }: PricingProps) {
  const { siteData } = useSiteData();
  const pricingPlans = (siteData?.site?.pricing && Array.isArray(siteData.site.pricing)) ? siteData.site.pricing : [];
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const { trackConversion, trackEngagement } = useAnalytics();

  // Show loading state if no pricing plans are available
  if (!siteData || !siteData.site || !Array.isArray(pricingPlans) || pricingPlans.length === 0) {
    return (
      <section
        id="pricing"
        className={cn(
          "py-20 bg-background",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Loading pricing plans...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const handlePlanSelect = (planId: string, planName: string) => {
    trackConversion('pricing_click', planId, planName);
    trackEngagement('section_view', planId, 'pricing');
    
    // Track billing cycle preference
    trackConversion('pricing_click', 'billing_preference', billingCycle);
    
    // Handle different plan actions
    if (planId === "enterprise") {
      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll to signup or pricing page
      console.log(`Selected ${planName} plan`);
    }
  };

  const handleBillingToggle = () => {
    const newCycle = billingCycle === "monthly" ? "annual" : "monthly";
    setBillingCycle(newCycle);
    trackConversion('pricing_click', 'billing_toggle', newCycle);
    trackEngagement('section_view', newCycle, 'pricing');
  };

  const handleComparisonTableClick = (feature: string, plan: string) => {
    trackConversion('pricing_click', 'comparison_table', `${feature}_${plan}`);
    trackEngagement('section_view', feature, 'pricing');
  };

  const handleFAQClick = (question: string) => {
    trackConversion('pricing_click', 'faq', question);
    trackEngagement('section_view', question, 'pricing');
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

  const getPlanColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'from-green-500 to-green-600 text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
      case 'blue':
        return 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
      case 'purple':
        return 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20';
      default:
        return 'from-gray-500 to-gray-600 text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getPlanPrice = (plan: typeof pricingPlans[0]) => {
    if (billingCycle === "annual") {
      return plan.price > 0 ? Math.floor(plan.price * 10) : 0; // Annual pricing (12 months with 2 months free)
    }
    return plan.price;
  };

  const getPeriodText = () => {
    return billingCycle === "annual" ? "year" : "month";
  };

  return (
    <section
      id="pricing"
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your needs. All plans include our core AI features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn(
              "text-sm font-medium",
              billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </span>
            <motion.button
              className={cn(
                "relative w-14 h-7 rounded-full transition-colors billing-toggle",
                billingCycle === "annual" ? "active" : ""
              )}
              onClick={handleBillingToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md billing-toggle-handle"
                animate={{
                  x: billingCycle === "annual" ? 28 : 4
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
            <span className={cn(
              "text-sm font-medium",
              billingCycle === "annual" ? "text-foreground" : "text-muted-foreground"
            )}>
              Annual
              <span className="ml-1 text-xs text-primary font-semibold">Save 17%</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {pricingPlans && pricingPlans.length > 0 ? pricingPlans.map((plan, index) => {
            const currentPrice = getPlanPrice(plan);
            const isSelected = billingCycle === "annual" && plan.price > 0;
            
            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={cn(
                  "relative",
                  plan.featured && "md:-translate-y-4"
                )}
              >
                {/* Featured Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-primary/60 text-white text-sm font-semibold">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Pricing Card */}
                <div
                  className={cn(
                    "relative p-8 rounded-2xl border-2 transition-all duration-300",
                    plan.featured
                      ? "pricing-card-featured pricing-card-hover-rotate"
                      : "pricing-card pricing-card-hover-lift glass-effect"
                  )}
                >
                  {/* Plan Image */}
                  <div className="text-6xl mb-6 text-center">
                    <motion.div
                      className="inline-block"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {plan.image}
                    </motion.div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 text-center">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="price-display inline-block">
                      <div className="flex items-baseline justify-center gap-2">
                        <div className="text-4xl font-bold text-foreground">
                          ₹{currentPrice}
                          <span className="text-lg font-normal text-muted-foreground">
                            /{getPeriodText()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Original Price */}
                    {plan.originalPrice && isSelected && (
                      <div className="mt-2">
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{plan.originalPrice}/{plan.period}
                        </span>
                        <span className="ml-2 text-xs text-green-600 font-semibold">
                          Save ₹{plan.originalPrice - currentPrice}/{plan.period}
                        </span>
                      </div>
                    )}

                    {/* Annual Savings */}
                    {billingCycle === "annual" && plan.price > 0 && (
                      <div className="mt-2 text-xs text-primary font-medium">
                        ₹{plan.price * 12 - currentPrice * 12} saved annually
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-foreground mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features && Array.isArray(plan.features) && plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="feature-item flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Limitations */}
                    {plan.limitations && Array.isArray(plan.limitations) && plan.limitations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="font-semibold text-foreground mb-2">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                              </div>
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    size="lg"
                    className={cn(
                      "w-full pricing-cta-button",
                      plan.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 price-glow"
                        : "bg-background border-2 border-border text-foreground hover:bg-muted/50"
                    )}
                    onClick={() => handlePlanSelect(plan.id, plan.name)}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Glow Effect for Featured Plan */}
                {plan.featured && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-50 -z-10" />
                )}
              </motion.div>
            );
          }) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pricing plans available.</p>
            </div>
          )}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3 trust-indicator p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">30-Day Guarantee</h4>
              <p className="text-sm text-muted-foreground">
                Full refund if you're not satisfied
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 trust-indicator p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Instant Setup</h4>
              <p className="text-sm text-muted-foreground">
                Get started in minutes, not hours
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 trust-indicator p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">
                Get help whenever you need it
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Compare All Features
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full comparison-table rounded-xl">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center p-4 font-semibold text-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg">🌱</span>
                      <span>Starter</span>
                      <span className="text-xs text-muted-foreground">Free</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-semibold text-foreground bg-primary/10">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg">🚀</span>
                      <span>Professional</span>
                      <span className="text-xs text-primary font-semibold">$29/mo</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-semibold text-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg">🏢</span>
                      <span>Enterprise</span>
                      <span className="text-xs text-muted-foreground">$99/mo</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">Users</td>
                  <td className="p-4 text-center">Up to 3</td>
                  <td className="p-4 text-center bg-primary/5">Up to 20</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">AI Tasks</td>
                  <td className="p-4 text-center">1,000/month</td>
                  <td className="p-4 text-center bg-primary/5">10,000/month</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">Integrations</td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center bg-primary/5">Advanced</td>
                  <td className="p-4 text-center">All</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">Support</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center bg-primary/5">Priority</td>
                  <td className="p-4 text-center">Dedicated</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">Analytics</td>
                  <td className="p-4 text-center">Standard</td>
                  <td className="p-4 text-center bg-primary/5">Advanced</td>
                  <td className="p-4 text-center">Custom</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">Mobile App</td>
                  <td className="p-4 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-primary/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">Custom Workflows</td>
                  <td className="p-4 text-center">
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    </div>
                  </td>
                  <td className="p-4 text-center bg-primary/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">API Access</td>
                  <td className="p-4 text-center">
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    </div>
                  </td>
                  <td className="p-4 text-center bg-primary/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">Team Collaboration</td>
                  <td className="p-4 text-center">
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    </div>
                  </td>
                  <td className="p-4 text-center bg-primary/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">SSO & Security</td>
                  <td className="p-4 text-center">
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-6">
            <div className="faq-item p-6 rounded-xl">
              <h4 className="font-semibold text-foreground mb-3">
                Can I change plans anytime?
              </h4>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences.
              </p>
            </div>
            
            <div className="faq-item p-6 rounded-xl">
              <h4 className="font-semibold text-foreground mb-3">
                What happens if I exceed my limits?
              </h4>
              <p className="text-muted-foreground">
                We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional tasks as needed.
              </p>
            </div>
            
            <div className="faq-item p-6 rounded-xl">
              <h4 className="font-semibold text-foreground mb-3">
                Do you offer custom plans?
              </h4>
              <p className="text-muted-foreground">
                Yes! We offer custom plans for large organizations with specific needs. Contact our sales team to discuss your requirements.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;
