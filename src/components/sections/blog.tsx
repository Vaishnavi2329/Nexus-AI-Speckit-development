"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/contexts/site-data-context";

interface BlogProps {
  className?: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  category: string;
  author: string;
  tags: string[];
  readTime: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function Blog({ className }: BlogProps) {
  const { siteData } = useSiteData();
  const blogPosts = (siteData?.site?.blogs && Array.isArray(siteData.site.blogs)) 
    ? siteData.site.blogs.filter((blog: BlogPost) => blog.published) 
    : [];
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { trackConversion, trackEngagement } = useAnalytics();

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(blogPosts.map((post: BlogPost) => post.category)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter((post: BlogPost) => post.category === selectedCategory);

  const handlePostClick = (post: BlogPost) => {
    trackConversion('blog_click', 'post_read', post.title);
    trackEngagement('section_view', post.id, 'blog');
    console.log(`Reading blog post: ${post.title}`);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    trackConversion('blog_filter', 'category_filter', category);
    trackEngagement('section_view', category, 'blog');
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tech':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'productivity':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'ai':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'workflow':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Show loading state if no blog posts are available
  if (!siteData || !siteData.site || !Array.isArray(blogPosts) || blogPosts.length === 0) {
    return (
      <section
        id="blog"
        className={cn(
          "py-20 bg-muted/50",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Loading blog posts...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="blog"
      className={cn(
        "py-20 bg-muted/50",
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Latest Blog Posts
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest insights on AI, productivity, and workflow automation
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {category === "all" ? "All Posts" : category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {filteredPosts.map((post: BlogPost, index: number) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="group"
            >
              <article className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Blog Post Image */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary/30" />
                </div>

                {/* Blog Post Content */}
                <div className="p-6">
                  {/* Category and Read Time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      getCategoryColor(post.category)
                    )}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
                    onClick={() => handlePostClick(post)}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Posts Button */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                trackConversion('blog_click', 'view_all', 'blog');
                trackEngagement('section_view', 'view_all', 'blog');
              }}
            >
              View All Blog Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
