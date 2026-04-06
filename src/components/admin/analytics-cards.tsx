"use client";

import { useState, useEffect } from "react";

interface Stats {
  totalVisitors: number;
  totalLeads: number;
  totalBlogs: number;
  totalTestimonials: number;
}

export default function AnalyticsCards() {
  const [stats, setStats] = useState<Stats>({
    totalVisitors: 12543,
    totalLeads: 892,
    totalBlogs: 24,
    totalTestimonials: 18,
  });

  const statCards = [
    {
      title: "Total Visitors",
      value: stats.totalVisitors.toLocaleString(),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Total Leads",
      value: stats.totalLeads.toLocaleString(),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: "🎯",
      color: "bg-green-500",
    },
    {
      title: "Total Blogs",
      value: stats.totalBlogs.toLocaleString(),
      change: "+15.3%",
      changeType: "positive" as const,
      icon: "📝",
      color: "bg-purple-500",
    },
    {
      title: "Total Testimonials",
      value: stats.totalTestimonials.toLocaleString(),
      change: "+5.7%",
      changeType: "positive" as const,
      icon: "⭐",
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {card.icon}
              </div>
              <span className={`text-sm font-medium ${
                card.changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}>
                {card.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-sm text-slate-600 mt-1">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "New blog published", item: "Getting Started with AI", time: "2 hours ago" },
            { action: "New lead received", item: "john@example.com", time: "4 hours ago" },
            { action: "Testimonial added", item: "Sarah Johnson", time: "6 hours ago" },
            { action: "Pricing updated", item: "Pro Plan", time: "1 day ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                <p className="text-sm text-slate-600">{activity.item}</p>
              </div>
              <span className="text-xs text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
