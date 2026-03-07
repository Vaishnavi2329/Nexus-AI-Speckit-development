"use client";

import React from "react";
import { ThemeProvider } from "@/components/ui/providers";
import NavBar from "@/components/ui/tubelight-navbar";
import Hero from "@/components/sections/hero";
import Problem from "@/components/sections/problem";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";
import HowItWorks from "@/components/sections/how-it-works";
import Integrations from "@/components/sections/integrations";
import Demo from "@/components/sections/demo";
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import FinalCTA from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";
import { useSmoothScroll } from "@/lib/scroll-smooth";

export default function Home() {
  // Enable smooth scrolling behavior
  useSmoothScroll();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero />
          
          {/* Problem Section */}
          <Problem />
          
          {/* Features Section */}
          <Features />
          
          {/* Testimonials Section */}
          <Testimonials />
          
          {/* How It Works Section */}
          <HowItWorks />
          
          {/* Integrations Section */}
          <Integrations />
          
          {/* Demo Section */}
          <Demo />
          
          {/* Pricing Section */}
          <Pricing />
          
          {/* FAQ Section */}
          <FAQ />
          
          {/* Contact Section */}
          <Contact />
          
          {/* Final CTA Section */}
          <FinalCTA />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
