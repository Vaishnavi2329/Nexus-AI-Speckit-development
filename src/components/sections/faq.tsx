"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Shield, Lock, Users, Database, Zap, HelpCircle, MessageSquare, Phone, Mail } from "lucide-react";
import { useAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface FAQProps {
  className?: string;
}

// FAQ data with categories
const faqData = [
  {
    id: 1,
    category: "Getting Started",
    icon: Zap,
    question: "How do I get started with Nexus AI?",
    answer: "Getting started is easy! Sign up for a free account, connect your existing tools in minutes, and our AI will start analyzing your workflow patterns. You'll see productivity improvements within the first day.",
    tags: ["setup", "onboarding", "quick-start"]
  },
  {
    id: 2,
    category: "Getting Started",
    icon: Zap,
    question: "What tools does Nexus AI integrate with?",
    answer: "Nexus AI integrates with 100+ popular tools including Slack, Microsoft Teams, Google Workspace, Jira, Asana, Trello, GitHub, and many more. We're constantly adding new integrations based on customer demand.",
    tags: ["integrations", "tools", "compatibility"]
  },
  {
    id: 3,
    category: "Security & Privacy",
    icon: Shield,
    question: "How secure is my data with Nexus AI?",
    answer: "We take security seriously. All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We're SOC 2 Type II certified, GDPR compliant, and undergo regular third-party security audits.",
    tags: ["security", "encryption", "compliance"]
  },
  {
    id: 4,
    category: "Security & Privacy",
    icon: Lock,
    question: "Who owns my data?",
    answer: "You own your data. We never sell or share your data with third parties. You can export or delete your data at any time. Our privacy policy is transparent and user-first.",
    tags: ["privacy", "data-ownership", "gdpr"]
  },
  {
    id: 5,
    category: "Pricing & Billing",
    icon: Users,
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences. No long-term commitments or hidden fees.",
    tags: ["pricing", "billing", "plans"]
  },
  {
    id: 6,
    category: "Pricing & Billing",
    icon: Users,
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional tasks as needed. We never cut off your service without warning.",
    tags: ["limits", "usage", "upgrades"]
  },
  {
    id: 7,
    category: "Features & Functionality",
    icon: Database,
    question: "How does the AI learn my patterns?",
    answer: "Our AI analyzes your communication patterns, task management, and workflow habits to identify optimization opportunities. It gets smarter over time and adapts to your unique work style.",
    tags: ["ai", "machine-learning", "patterns"]
  },
  {
    id: 8,
    category: "Features & Functionality",
    icon: Database,
    question: "Can I customize the AI recommendations?",
    answer: "Absolutely! You can set preferences, create custom workflows, and fine-tune the AI's behavior to match your team's specific needs and processes.",
    tags: ["customization", "preferences", "workflows"]
  },
  {
    id: 9,
    category: "Support",
    icon: MessageSquare,
    question: "What kind of support do you offer?",
    answer: "We offer 24/7 email support for all plans, with priority phone support for Professional and Enterprise plans. Enterprise customers get dedicated account managers and custom SLAs.",
    tags: ["support", "help", "customer-service"]
  },
  {
    id: 10,
    category: "Support",
    icon: Phone,
    question: "Do you offer training or onboarding?",
    answer: "Yes! We provide comprehensive onboarding for all new customers, including video tutorials, documentation, and live training sessions for Enterprise plans.",
    tags: ["training", "onboarding", "education"]
  },
  {
    id: 11,
    category: "Technical",
    icon: Database,
    question: "What are the system requirements?",
    answer: "Nexus AI is a cloud-based solution that works on any modern web browser (Chrome, Firefox, Safari, Edge). Mobile apps are available for iOS and Android. No special hardware required.",
    tags: ["technical", "requirements", "browser"]
  },
  {
    id: 12,
    category: "Technical",
    icon: Zap,
    question: "Is there an API available?",
    answer: "Yes! Professional and Enterprise plans include API access. Our RESTful API allows you to integrate Nexus AI into your custom applications and workflows.",
    tags: ["api", "development", "integration"]
  }
];

// Category icons mapping
const categoryIcons = {
  "Getting Started": Zap,
  "Security & Privacy": Shield,
  "Pricing & Billing": Users,
  "Features & Functionality": Database,
  "Support": MessageSquare,
  "Technical": Database
};

export function FAQ({ className }: FAQProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const { trackConversion, trackEngagement } = useAnalytics();

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...Array.from(new Set(faqData.map(item => item.category)))];
    return cats;
  }, []);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqData.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    
    trackConversion('cta_click', 'faq_expand', `FAQ_${id}`);
    trackEngagement('section_view', `faq_${id}`, 'faq');
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    trackConversion('cta_click', 'faq_search', term);
    trackEngagement('section_view', term, 'faq');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    trackConversion('cta_click', 'faq_category', category);
    trackEngagement('section_view', category, 'faq');
  };

  const handleContactSupport = (method: string) => {
    trackConversion('cta_click', 'support_contact', method);
    // Handle different contact methods
    if (method === 'email') {
      window.location.href = 'mailto:support@nexusai.com';
    } else if (method === 'chat') {
      // Open chat widget
      console.log('Opening chat widget...');
    } else if (method === 'phone') {
      window.location.href = 'tel:+1-800-NEXUSAI';
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
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section
      id="faq"
      className={cn(
        "py-20 bg-background",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions about Nexus AI. Can't find what you're looking for? 
            Our support team is here to help.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || HelpCircle;
              return (
                <button
                  key={category}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted/50"
                  )}
                  onClick={() => handleCategorySelect(category)}
                >
                  <Icon className="w-4 h-4" />
                  {category}
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="text-center text-muted-foreground mb-8">
            {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} found
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4 mb-16"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredFAQs.map((item, index) => {
              const isExpanded = expandedItems.includes(item.id);
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={`${item.id}-${selectedCategory}-${searchTerm}`}
                  variants={itemVariants}
                  className="border border-border rounded-xl overflow-hidden bg-background hover:border-primary/50 transition-colors"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                    onClick={() => toggleExpanded(item.id)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.question}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {item.category}
                          </span>
                          <div className="flex gap-1">
                            {item.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="text-xs text-primary/60">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        variants={expandVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="border-t border-border"
                      >
                        <div className="p-6 pt-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No questions found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or browse all categories.
            </p>
            <button
              className="text-primary hover:underline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of Nexus AI. 
              Reach out through any of the channels below.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                className="px-6 py-3 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2"
                onClick={() => handleContactSupport('email')}
              >
                <Mail className="w-4 h-4" />
                Email Support
              </button>
              <button
                className="px-6 py-3 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2"
                onClick={() => handleContactSupport('phone')}
              >
                <Phone className="w-4 h-4" />
                Call Support
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
