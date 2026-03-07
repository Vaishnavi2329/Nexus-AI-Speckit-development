"use client";

import React from "react";
import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
  additionalMetaTags?: Array<{
    name: string;
    content: string;
    property?: string;
  }>;
}

const defaultMeta = {
  title: "Nexus AI - Intelligent Workflow Automation Platform",
  description: "Transform your business with Nexus AI. Our intelligent automation platform streamlines workflows, boosts productivity, and drives growth with cutting-edge AI technology.",
  keywords: "AI automation, workflow optimization, business intelligence, productivity tools, AI platform, workflow automation, business transformation",
  ogImage: "/og-image.jpg",
  ogUrl: "https://nexusai.com",
  canonicalUrl: "https://nexusai.com",
};

export function SEO({
  title = defaultMeta.title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  ogImage = defaultMeta.ogImage,
  ogUrl = defaultMeta.ogUrl,
  canonicalUrl = defaultMeta.canonicalUrl,
  noindex = false,
  structuredData,
  additionalMetaTags = [],
}: SEOProps) {
  // Generate structured data for organization
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexus AI",
    "url": "https://nexusai.com",
    "logo": "https://nexusai.com/logo.png",
    "description": "Intelligent workflow automation platform for businesses",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-NEXUS-AI",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://twitter.com/nexusai",
      "https://linkedin.com/company/nexusai",
      "https://github.com/nexusai"
    ]
  };

  // Generate structured data for website
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nexus AI",
    "url": "https://nexusai.com",
    "description": "Intelligent workflow automation platform for businesses",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nexusai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Generate structured data for product
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nexus AI Platform",
    "description": "Intelligent workflow automation platform",
    "url": "https://nexusai.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Professional",
        "price": "29",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Enterprise",
        "price": "99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  // Combine structured data
  const allStructuredData = [
    organizationStructuredData,
    websiteStructuredData,
    productStructuredData,
    ...(structuredData ? [structuredData] : [])
  ];

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nexus AI" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Nexus AI" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:creator" content="@nexusai" />
      
      {/* Additional Meta Tags */}
      <meta name="language" content="English" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect and DNS Prefetch */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta
          key={index}
          name={tag.name}
          content={tag.content}
          property={tag.property}
        />
      ))}
    </Head>
  );
}

// Specific SEO components for different pages
export function HomeSEO() {
  return (
    <SEO
      title="Nexus AI - Intelligent Workflow Automation Platform"
      description="Transform your business with Nexus AI. Our intelligent automation platform streamlines workflows, boosts productivity, and drives growth with cutting-edge AI technology."
      keywords="AI automation, workflow optimization, business intelligence, productivity tools, AI platform, workflow automation, business transformation"
    />
  );
}

export function PricingSEO() {
  return (
    <SEO
      title="Pricing Plans - Nexus AI | Affordable Workflow Automation"
      description="Choose the perfect Nexus AI plan for your business. From free starter plans to enterprise solutions, we have pricing options that scale with your needs."
      keywords="Nexus AI pricing, workflow automation cost, AI platform pricing, business automation plans, enterprise pricing"
      ogUrl="https://nexusai.com/pricing"
      canonicalUrl="https://nexusai.com/pricing"
    />
  );
}

export function ContactSEO() {
  return (
    <SEO
      title="Contact Us - Nexus AI | Get in Touch"
      description="Contact Nexus AI for sales inquiries, technical support, or partnership opportunities. Our team is ready to help you transform your business with AI automation."
      keywords="Nexus AI contact, AI support, workflow automation help, sales inquiries, partnership opportunities"
      ogUrl="https://nexusai.com/contact"
      canonicalUrl="https://nexusai.com/contact"
    />
  );
}

export function FAQSEO() {
  return (
    <SEO
      title="FAQ - Nexus AI | Frequently Asked Questions"
      description="Find answers to common questions about Nexus AI's workflow automation platform. Learn about features, pricing, security, and getting started."
      keywords="Nexus AI FAQ, workflow automation questions, AI platform help, support documentation"
      ogUrl="https://nexusai.com/faq"
      canonicalUrl="https://nexusai.com/faq"
    />
  );
}

// Blog post SEO component
interface BlogPostSEOProps {
  title: string;
  description: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
}

export function BlogPostSEO({
  title,
  description,
  publishDate,
  modifiedDate,
  author,
  image,
  category,
  tags,
}: BlogPostSEOProps) {
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nexus AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nexusai.com/logo.png"
      }
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate || publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://nexusai.com/blog"
    },
    "keywords": tags.join(", "),
    "articleSection": category
  };

  return (
    <SEO
      title={`${title} | Nexus AI Blog`}
      description={description}
      keywords={tags.join(", ")}
      ogImage={image}
      structuredData={blogStructuredData}
      additionalMetaTags={[
        { name: "article:published_time", content: publishDate },
        ...(modifiedDate ? [{ name: "article:modified_time", content: modifiedDate }] : []),
        { name: "article:author", content: author },
        { name: "article:section", content: category },
        ...tags.map(tag => ({ name: "article:tag", content: tag }))
      ]}
    />
  );
}

// Product page SEO component
interface ProductSEOProps {
  productName: string;
  description: string;
  price: string;
  currency: string;
  availability: string;
  image: string;
  rating?: number;
  reviewCount?: number;
}

export function ProductSEO({
  productName,
  description,
  price,
  currency,
  availability,
  image,
  rating,
  reviewCount,
}: ProductSEOProps) {
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": "Nexus AI"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": `https://schema.org/${availability}`,
      "seller": {
        "@type": "Organization",
        "name": "Nexus AI"
      }
    },
    ...(rating && reviewCount ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating.toString(),
        "reviewCount": reviewCount.toString()
      }
    } : {})
  };

  return (
    <SEO
      title={`${productName} | Nexus AI`}
      description={description}
      keywords={`${productName}, Nexus AI, workflow automation, AI platform`}
      ogImage={image}
      structuredData={productStructuredData}
    />
  );
}
