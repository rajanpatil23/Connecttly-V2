import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  MessageCircle, Briefcase, DollarSign, Shield, Globe, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";


import type { WhyChooseItem } from "@/components/Services/category/WhyChoose";

import type { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import type { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import type { Tool } from "@/components/Services/ServiceDetail/toolstack";
import type { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import type { ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import type { FeatureItem } from "@/components/Services/ServiceDetail/service-features";
// Scroll-animated wrapper for sections
const ribbonItems: RibbonItem[] = [
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "225K+",
    subtitle: "B2B leads generated",
  },
  {
    icon: <DollarSign className="h-5 w-5 text-white" />,
    title: "$51M+",
    subtitle: "Revenue generated",
  },
  {
    icon: <Target className="h-5 w-5 text-white" />,
    title: "94%",
    subtitle: "Lead quality rate",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "3.8x",
    subtitle: "Average ROI",
  },
];

const linkedInAdsFeatures: FeatureItem[] = [
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Reach decision-makers by job title, company, industry, seniority, and more with LinkedIn's powerful targeting."
  },
  {
    icon: MessageCircle,
    title: "Sponsored Content & InMail",
    description: "Engage prospects with native ads in their feed and personalized messages directly in their inbox."
  },
  {
    icon: BarChart3,
    title: "Lead Gen Forms",
    description: "Capture high-quality leads with pre-filled forms that make it easy for prospects to convert."
  },
  {
    icon: Briefcase,
    title: "Account-Based Targeting",
    description: "Upload target account lists and reach specific companies with tailored messaging and offers."
  },
  {
    icon: Globe,
    title: "Retargeting & Lookalikes",
    description: "Re-engage website visitors and find new prospects similar to your best customers."
  },
  {
    icon: Award,
    title: "Campaign Optimization",
    description: "Continuous A/B testing and optimization to improve performance and reduce cost per lead."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "B2B Expertise", desc: "Specialized in LinkedIn advertising for B2B companies and complex sales cycles." },
  { icon: Users, title: "Quality Over Quantity", desc: "Focus on generating high-quality leads that convert, not just clicks." },
  { icon: BarChart3, title: "Data-Driven Approach", desc: "Use analytics and testing to continuously improve campaign performance." },
  { icon: Zap, title: "Fast Setup", desc: "Launch campaigns quickly with proven templates and best practices." },
  { icon: Shield, title: "Transparent Reporting", desc: "Clear, detailed reporting on leads, costs, and ROI." },
  { icon: Award, title: "Proven Results", desc: "Track record of successful LinkedIn campaigns across industries." },
];

const linkedInAdsProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Strategy & Setup", 
    description: "Define target audience, create campaign structure, and set up tracking and conversion goals." 
  },
  { 
    step: "02", 
    title: "Creative Development", 
    description: "Design compelling ad creative, write persuasive copy, and create lead gen forms." 
  },
  { 
    step: "03", 
    title: "Launch & Monitor", 
    description: "Launch campaigns, monitor performance daily, and make real-time optimizations." 
  },
  { 
    step: "04", 
    title: "Optimize & Scale", 
    description: "A/B test variations, scale winning campaigns, and continuously improve ROI." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 800, yearly: 7680 },
    description: "Perfect for testing LinkedIn Ads",
    features: [
      "$3,000-$5,000 monthly ad spend",
      "Campaign strategy & setup",
      "Sponsored content ads",
      "Lead gen form creation",
      "Monthly reporting",
      "Basic optimization"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1400, yearly: 13440 },
    description: "Scale your LinkedIn lead generation",
    features: [
      "$5,000-$15,000 monthly ad spend",
      "Multi-campaign management",
      "Sponsored InMail campaigns",
      "Account-based targeting",
      "A/B testing & optimization",
      "Weekly reporting & calls",
      "CRM integration",
      "Dedicated account manager"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2800, yearly: 26880 },
    description: "Full-service LinkedIn advertising",
    features: [
      "$15,000+ monthly ad spend",
      "Enterprise campaign management",
      "Custom audience development",
      "Advanced retargeting",
      "Conversion rate optimization",
      "Executive reporting",
      "Priority support",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const linkedInAdsTools: Tool[] = [
  { name: "LinkedIn Campaign Manager", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "LinkedIn Sales Navigator", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier/FF4A00" },
  { name: "Clearbit", logo: "https://logo.clearbit.com/clearbit.com" },
  { name: "Terminus", logo: "https://logo.clearbit.com/terminusplatform.com" },
];

const linkedInAdsFAQs: FAQItem[] = [
  {
    question: "How much should I spend on LinkedIn Ads?",
    answer: "We recommend starting with at least $3,000-$5,000/month to gather meaningful data and optimize campaigns. LinkedIn Ads are more expensive than other platforms (typically $5-$15 per click for B2B), but the lead quality is significantly higher. Most successful campaigns spend $5,000-$20,000/month. We'll help you determine the right budget based on your goals and target audience size."
  },
  {
    question: "What's a good cost per lead on LinkedIn?",
    answer: "Cost per lead varies widely by industry, target audience, and offer. Typical ranges: $50-$150 for content downloads, $100-$300 for webinar registrations, $200-$500 for demo requests. The key is lead quality - LinkedIn leads typically have 2-3x higher conversion rates than other channels, so a higher CPL can still deliver better ROI."
  },
  {
    question: "How do LinkedIn Lead Gen Forms work?",
    answer: "Lead Gen Forms are pre-filled forms that appear directly in LinkedIn, making it easy for users to submit their information without leaving the platform. They auto-populate with the user's LinkedIn profile data (name, email, company, title), resulting in higher conversion rates (typically 2-3x higher than landing pages). We can integrate these leads directly into your CRM."
  },
  {
    question: "Can you target specific companies on LinkedIn?",
    answer: "Yes! LinkedIn offers powerful account-based targeting. You can upload a list of target companies and show ads only to employees at those companies. You can also target by company size, industry, and growth rate. We combine this with job title and seniority targeting to reach the exact decision-makers you want."
  },
  {
    question: "What types of LinkedIn Ads do you run?",
    answer: "We manage all LinkedIn ad formats: Sponsored Content (native ads in the feed), Sponsored InMail (personalized messages), Text Ads (sidebar ads), Dynamic Ads (personalized ads), and Video Ads. We'll recommend the best formats based on your goals - typically a mix of Sponsored Content for awareness and Lead Gen Forms for conversion."
  },
  {
    question: "How long does it take to see results?",
    answer: "You'll start seeing leads within the first week of launching. However, it typically takes 4-8 weeks to gather enough data to optimize campaigns effectively and achieve stable performance. Most clients see significant improvement in cost per lead and lead quality after 2-3 months of optimization. LinkedIn Ads are a long-term strategy that compounds over time."
  },
  {
    question: "Do you integrate with our CRM?",
    answer: "Yes! We integrate LinkedIn Lead Gen Forms with all major CRMs (Salesforce, HubSpot, Pipedrive, etc.) so leads flow directly into your sales process. We can also set up custom integrations using Zapier or webhooks. This ensures your sales team gets leads immediately and you have proper attribution."
  },
  {
    question: "What makes LinkedIn Ads different from Google or Facebook Ads?",
    answer: "LinkedIn is the only platform where you can target by professional criteria (job title, seniority, company, industry, skills). This makes it ideal for B2B marketing and reaching decision-makers. While LinkedIn Ads are more expensive per click, the lead quality is significantly higher - users are in a professional mindset and more likely to engage with B2B offers. Best for: enterprise sales, professional services, B2B SaaS, and high-ticket products."
  },
];

const LinkedInAds = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "LINKEDIN ADVERTISING",
      heading: "LinkedIn Ads That Generate High-Quality B2B Leads",
      description: "Reach decision-makers where they're most engaged. Our LinkedIn advertising experts create campaigns that drive qualified leads and measurable ROI.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Linkedin Growth/LinkedinAds.png",
      imageAlt: "LinkedIn Advertising Dashboard",
    }}
    plans={pricingPlans}
    faqs={linkedInAdsFAQs}
    tools={linkedInAdsTools}
    processSteps={linkedInAdsProcessSteps}
    whyItems={whyItems}
  />
);

export default LinkedInAds;
