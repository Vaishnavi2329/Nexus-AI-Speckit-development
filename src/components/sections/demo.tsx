"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface DemoProps {
  className?: string;
}

// Demo conversations
const demoConversations = [
  {
    id: "task-management",
    title: "Smart Task Management",
    description: "Watch how Nexus AI organizes your tasks and priorities automatically",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "I have a lot of tasks today. Can you help me prioritize?",
        timestamp: "9:00 AM"
      },
      {
        id: 2,
        sender: "ai",
        content: "I've analyzed your calendar and deadlines. Here's your prioritized list:\n\n1. **Urgent**: Client presentation prep (due 2 PM)\n2. **High**: Team standup notes (due 10 AM)\n3. **Medium**: Email responses (batch by 11 AM)\n4. **Low**: Project planning (afternoon)\n\nI've also blocked time for deep work on the presentation.",
        timestamp: "9:01 AM",
        highlight: true
      },
      {
        id: 3,
        sender: "user",
        content: "Perfect! Can you schedule the presentation prep time?",
        timestamp: "9:02 AM"
      },
      {
        id: 4,
        sender: "ai",
        content: "Done! I've blocked 11 AM-1:30 PM for presentation prep and moved your meetings accordingly. I'll also remind you 30 minutes before.",
        timestamp: "9:02 AM",
        highlight: true
      }
    ]
  },
  {
    id: "email-automation",
    title: "Email Automation",
    description: "See how Nexus AI handles your inbox automatically",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "My inbox is overwhelming. Can you help me organize it?",
        timestamp: "2:00 PM"
      },
      {
        id: 2,
        sender: "ai",
        content: "I've processed 127 emails and categorized them:\n\n🔴 **Urgent (3)**: Client responses needed\n🟡 **Important (12)**: Team updates\n🟢 **Review Later (45)**: Newsletters\n⚪ **Archive (67)**: Auto-categorized\n\nI've drafted responses for the urgent emails. Would you like to review?",
        timestamp: "2:01 PM",
        highlight: true
      },
      {
        id: 3,
        sender: "user",
        content: "Yes, show me the urgent ones first",
        timestamp: "2:02 PM"
      },
      {
        id: 4,
        sender: "ai",
        content: "Here's the first urgent email from the client:\n\n**Subject**: Project Timeline Update\n**My Draft**: 'Hi [Client], Thanks for the update. I've reviewed the timeline and have a few suggestions...'\n\nShould I send this or would you like to edit?",
        timestamp: "2:03 PM",
        highlight: true
      }
    ]
  },
  {
    id: "meeting-scheduler",
    title: "Intelligent Scheduling",
    description: "Experience how Nexus AI manages your calendar and meetings",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "I need to schedule a meeting with the design team about the new feature",
        timestamp: "3:00 PM"
      },
      {
        id: 2,
        sender: "ai",
        content: "I found the best time slot: Tomorrow 10-11 AM. All design team members are available. I've also:\n\n✅ Checked everyone's calendars\n✅ Booked the meeting room\n✅ Sent calendar invites\n✅ Added agenda items based on your recent conversations\n\nShould I proceed?",
        timestamp: "3:01 PM",
        highlight: true
      },
      {
        id: 3,
        sender: "user",
        content: "Yes, that sounds perfect!",
        timestamp: "3:02 PM"
      },
      {
        id: 4,
        sender: "ai",
        content: "Great! Meeting is scheduled. I've also:\n\n📋 Created a shared agenda document\n📝 Set up follow-up reminders\n🔄 Scheduled a 15-minute prep session\n📊 Prepared relevant project metrics\n\nYou're all set!",
        timestamp: "3:03 PM",
        highlight: true
      }
    ]
  }
];

export function Demo({ className }: DemoProps) {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const { trackConversion, trackEngagement } = useAnalytics() ;

  const currentDemo = demoConversations[activeDemo];
  const currentMessages = currentDemo.messages;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev >= currentMessages.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, currentMessages.length]);

  const handlePlay = () => {
    setIsPlaying(true);
    trackConversion('cta_click', 'demo_play', currentDemo.title);
  };

  const handlePause = () => {
    setIsPlaying(false);
    trackConversion('cta_click', 'demo_pause', currentDemo.title);
  };

  const handleReset = () => {
    setCurrentMessageIndex(0);
    setIsPlaying(false);
    trackConversion('cta_click', 'demo_reset', currentDemo.title);
  };

  const handleDemoChange = (index: number) => {
    setActiveDemo(index);
    setCurrentMessageIndex(0);
    setIsPlaying(false);
    trackEngagement('section_view', demoConversations[index].id, 'demo');
  };

  const handleGetStarted = () => {
    trackConversion('cta_click', 'demo_get_started', 'Get Started');
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <section
      id="demo"
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
            See Nexus AI in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Watch real conversations and see how Nexus AI transforms your workflow
          </p>
        </motion.div>

        {/* Demo Selection */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {demoConversations.map((demo, index) => (
            <button
              key={demo.id}
              className={cn(
                "px-6 py-3 rounded-lg border transition-all duration-300",
                activeDemo === index
                  ? "bg-primary text-primary-foreground border-primary glow-effect"
                  : "bg-background border-border hover:bg-muted/50"
              )}
              onClick={() => handleDemoChange(index)}
            >
              {demo.title}
            </button>
          ))}
        </motion.div>

        {/* Demo Interface */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden glass-effect">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Nexus AI Assistant</h3>
                    <p className="text-sm text-muted-foreground">{currentDemo.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="wait">
                {currentMessages.slice(0, currentMessageIndex + 1).map((message, index) => (
                  <motion.div
                    key={`${message.id}-${index}`}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex gap-3",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={cn(
                        "max-w-xs sm:max-w-md p-4 rounded-2xl",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.highlight
                          ? "bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isPlaying && currentMessageIndex < currentMessages.length - 1 && (
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted p-4 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Controls */}
            <div className="border-t border-border p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg bg-background border border-border hover:bg-muted/50 transition-colors"
                    onClick={isPlaying ? handlePause : handlePlay}
                    disabled={currentMessageIndex >= currentMessages.length - 1}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    className="p-2 rounded-lg bg-background border border-border hover:bg-muted/50 transition-colors"
                    onClick={handleReset}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <div className="text-sm text-muted-foreground">
                    {currentMessageIndex + 1} / {currentMessages.length}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled
                  />
                  <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Natural Conversations
            </h3>
            <p className="text-muted-foreground">
              Chat naturally with Nexus AI. No complex commands or special syntax needed.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Context-Aware Responses
            </h3>
            <p className="text-muted-foreground">
              Nexus AI understands your context and provides relevant, actionable responses.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Real-Time Processing
            </h3>
            <p className="text-muted-foreground">
              Get instant responses and see the AI work in real-time with live updates.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 glow-effect zoom-effect"
            onClick={handleGetStarted}
          >
            Try It Yourself
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Start your free 14-day trial and experience Nexus AI today
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Demo;
