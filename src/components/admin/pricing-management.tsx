"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export default function PricingManagement() {
  const [plans, setPlans] = useState<PricingPlan[]>([
    {
      id: "1",
      name: "Basic",
      price: "$9/month",
      features: [
        "10 AI Generations per month",
        "Basic templates",
        "Email support",
        "Community access"
      ],
      popular: false,
    },
    {
      id: "2",
      name: "Pro",
      price: "$29/month",
      features: [
        "Unlimited AI Generations",
        "Advanced templates",
        "Priority support",
        "Advanced analytics",
        "Custom integrations"
      ],
      popular: true,
    },
    {
      id: "3",
      name: "Enterprise",
      price: "$99/month",
      features: [
        "Everything in Pro",
        "Custom AI models",
        "Dedicated support",
        "White-label options",
        "API access",
        "SLA guarantee"
      ],
      popular: false,
    },
  ]);

  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    features: "",
  });

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      features: plan.features.join("\n"),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPlan) {
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id 
          ? {
              ...plan,
              name: formData.name,
              price: formData.price,
              features: formData.features.split("\n").filter(f => f.trim()),
            }
          : plan
      ));
    }

    setEditingPlan(null);
    setFormData({ name: "", price: "", features: "" });
  };

  const handleCancel = () => {
    setEditingPlan(null);
    setFormData({ name: "", price: "", features: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Pricing Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Plans */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Current Plans</h3>
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{plan.name}</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{plan.price}</p>
                </div>
                {plan.popular && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                onClick={() => handleEdit(plan)}
                className="w-full"
              >
                Edit Plan
              </Button>
            </div>
          ))}
        </div>

        {/* Edit Form */}
        <div>
          {editingPlan ? (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Edit {editingPlan.name} Plan
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Plan Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Price
                  </label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., $29/month"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Features (one per line)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full h-32 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit">
                    Update Plan
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-6 text-center">
              <p className="text-slate-600">Select a plan to edit its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
