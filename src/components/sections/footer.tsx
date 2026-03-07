"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/providers";
import { useAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

// Footer links data
const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Integrations", href: "#integrations" },
    { name: "Pricing", href: "#pricing" },
    { name: "API", href: "#api" }
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Press", href: "#press" },
    { name: "Contact", href: "#contact" }
  ],
  resources: [
    { name: "Documentation", href: "#docs" },
    { name: "Help Center", href: "#help" },
    { name: "Community", href: "#community" },
    { name: "Status", href: "#status" },
    { name: "Changelog", href: "#changelog" }
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Security", href: "#security" },
    { name: "Compliance", href: "#compliance" }
  ]
};

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "GitHub", href: "#", icon: Github }
];

export function Footer({ className }: FooterProps) {
  const { theme } = useTheme();
  const { trackConversion, trackEngagement } = useAnalytics();

  const handleLinkClick = (linkName: string, linkType: string) => {
    trackConversion('cta_click', `footer_${linkType}_${linkName.toLowerCase().replace(' ', '_')}`, linkName);
  };

  const handleSocialClick = (platform: string) => {
    trackConversion('cta_click', `footer_social_${platform.toLowerCase()}`, platform);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackConversion('cta_click', 'footer_scroll_to_top', 'Scroll to Top');
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
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
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <footer
      id="footer"
      className={cn(
        "bg-background border-t border-border",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="py-12"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <Link 
                  href="/" 
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  onClick={() => handleLinkClick('Nexus AI', 'logo')}
                >
                  Nexus AI
                </Link>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Transform your productivity with AI-powered automation and intelligent task management.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">support@nexusai.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">1-800-NEXUS-AI</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.button
                      key={social.name}
                      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors glow-effect zoom-effect"
                      onClick={() => handleSocialClick(social.name)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Footer Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => handleLinkClick(link.name, 'product')}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => handleLinkClick(link.name, 'company')}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => handleLinkClick(link.name, 'resources')}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => handleLinkClick(link.name, 'legal')}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="py-6 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Nexus AI. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Made with ❤️ by group 2 - EvolVIT Team
              </span>
              
              {/* Scroll to Top Button */}
              <motion.button
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors glow-effect zoom-effect"
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
