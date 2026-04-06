"use client";

import { useState, useEffect } from "react";
import AuthGuard from "@/components/admin/auth-guard";
import { Button } from "@/components/ui/button";
import AnalyticsCards from "@/components/admin/analytics-cards";
import BlogManagement from "@/components/admin/blog-management";
import PricingManagement from "@/components/admin/pricing-management";
import ContactManagement from "@/components/admin/contact-management";
import TestimonialManagement from "@/components/admin/testimonial-management";

type TabType = "dashboard" | "blogs" | "pricing" | "contacts" | "testimonials";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "blogs", label: "Blogs", icon: "📝" },
    { id: "pricing", label: "Pricing", icon: "💰" },
    { id: "contacts", label: "Contacts", icon: "💬" },
    { id: "testimonials", label: "Testimonials", icon: "⭐" },
  ];

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "dashboard" && <AnalyticsCards />}
          {activeTab === "blogs" && <BlogManagement />}
          {activeTab === "pricing" && <PricingManagement />}
          {activeTab === "contacts" && <ContactManagement />}
          {activeTab === "testimonials" && <TestimonialManagement />}
        </div>
      </div>
    </AuthGuard>
  );
}
