import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  GitBranch, MousePointer, DollarSign, Map, Layers, TrendingDown
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
    icon: <GitBranch className="h-5 w-5 text-white" />,
    title: "1M+",
    subtitle: "Customer journeys tracked",
  },
  {
    icon: <DollarSign className="h-5 w-5 text-white" />,
    title: "$50M+",
    subtitle: "Revenue attributed",
  },
  {
    icon: <Target className="h-5 w-5 text-white" />,
    title: "95%",
    subtitle: "Attribution accuracy",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "40%",
    subtitle: "Budget optimization",
  },
];

const attributionFeatures: FeatureItem[] = [
  {
    icon: GitBranch,
    title: "Multi-Touch Attribution",
    description: "Track every touchpoint in the customer journey and understand what drives conversions."
  },
  {
    icon: Map,
    title: "Customer Journey Mapping",
    description: "Visualize complete customer paths from first touch to conversion and beyond."
  },
  {
    icon: Layers,
    title: "Cross-Channel Attribution",
    description: "Attribute revenue across all marketing channels - paid, organic, email, social, and more."
  },
  {
    icon: BarChart3,
    title: "Attribution Modeling",
    description: "Multiple attribution models (first-touch, last-touch, linear, time-decay, custom) to fit your business."
  },
  {
    icon: DollarSign,
    title: "ROI by Channel",
    description: "Calculate true ROI for each marketing channel and campaign based on attributed revenue."
  },
  {
    icon: TrendingUp,
    title: "Funnel Analysis",
    description: "Identify drop-off points and optimization opportunities throughout your conversion funnel."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Accurate Attribution", desc: "Know exactly which marketing efforts drive revenue." },
  { icon: DollarSign, title: "Better Budget Allocation", desc: "Invest more in what works, cut what doesn't." },
  { icon: Map, title: "Complete Visibility", desc: "See the entire customer journey, not just last click." },
  { icon: Zap, title: "Faster Decisions", desc: "Make data-driven decisions with confidence." },
  { icon: Users, title: "Team Alignment", desc: "Get marketing and sales on the same page with shared data." },
  { icon: Award, title: "Proven Methodology", desc: "Battle-tested attribution frameworks that work." },
];

const attributionProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Data Integration & Tracking", 
    description: "Connect all marketing platforms and implement comprehensive tracking across channels." 
  },
  { 
    step: "02", 
    title: "Attribution Model Setup", 
    description: "Configure attribution models that align with your business model and sales cycle." 
  },
  { 
    step: "03", 
    title: "Journey Mapping & Analysis", 
    description: "Map customer journeys and analyze which touchpoints drive the most value." 
  },
  { 
    step: "04", 
    title: "Optimization & Reporting", 
    description: "Use attribution insights to optimize spend and report on true marketing ROI." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1000, yearly: 9600 },
    description: "Essential attribution tracking",
    features: [
      "Multi-touch attribution setup",
      "Up to 5 marketing channels",
      "Basic attribution models",
      "Customer journey mapping",
      "Monthly attribution reports",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1800, yearly: 17280 },
    description: "Advanced attribution & analytics",
    features: [
      "Unlimited marketing channels",
      "Custom attribution models",
      "Advanced funnel analysis",
      "Revenue attribution",
      "Real-time dashboards",
      "Weekly optimization calls",
      "Priority support",
      "Dedicated analyst"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 3600, yearly: 34560 },
    description: "Enterprise attribution solution",
    features: [
      "Enterprise data warehouse",
      "Machine learning attribution",
      "Predictive analytics",
      "Custom integrations",
      "API access",
      "Executive reporting",
      "White-glove service",
      "Dedicated analytics team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const attributionTools: Tool[] = [
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Google Tag Manager", logo: "https://cdn.simpleicons.org/googletagmanager/246FDB" },
  { name: "Segment", logo: "https://logo.clearbit.com/segment.com" },
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "BigQuery", logo: "https://cdn.simpleicons.org/googlebigquery/669DF6" },
  { name: "Mixpanel", logo: "https://logo.clearbit.com/mixpanel.com" },
  { name: "Amplitude", logo: "https://logo.clearbit.com/amplitude.com" },
];

const attributionFAQs: FAQItem[] = [
  {
    question: "What is marketing attribution and why do I need it?",
    answer: "Marketing attribution tracks which marketing touchpoints contribute to conversions and revenue. Without it, you're flying blind - you don't know which campaigns work, where to invest, or what ROI you're getting. Attribution shows the complete customer journey, not just the last click. This helps you: allocate budget effectively, prove marketing ROI, optimize underperforming channels, and make data-driven decisions."
  },
  {
    question: "What's the difference between attribution models?",
    answer: "Different models credit touchpoints differently: Last-touch (100% credit to final touchpoint), First-touch (100% to first touchpoint), Linear (equal credit to all), Time-decay (more credit to recent touchpoints), Position-based (40% first, 40% last, 20% middle), Custom (your own rules). We typically recommend starting with multiple models to understand different perspectives, then choosing one that aligns with your business model."
  },
  {
    question: "How accurate is marketing attribution?",
    answer: "Our attribution is 90-95% accurate for tracked digital touchpoints. Accuracy depends on: proper tracking implementation, data quality, attribution model choice, and sales cycle complexity. We can't track everything (offline conversations, word-of-mouth), but we capture the vast majority of digital interactions. We're transparent about limitations and continuously work to improve accuracy."
  },
  {
    question: "Can you track offline marketing?",
    answer: "Yes, but with limitations. We can track: phone calls (with call tracking), in-store visits (with location data), direct mail (with unique URLs/codes), and events (with registration tracking). We integrate this offline data with digital touchpoints to create a more complete picture. However, some offline interactions (casual conversations, billboard views) are difficult to track precisely."
  },
  {
    question: "How long does it take to set up attribution?",
    answer: "Basic attribution setup takes 2-4 weeks. Complex implementations with multiple data sources and custom models can take 6-8 weeks. Timeline depends on: number of marketing channels, data source complexity, tracking implementation needs, and stakeholder alignment. You'll start seeing insights within the first month, with accuracy improving as we collect more data."
  },
  {
    question: "What if I have a long sales cycle?",
    answer: "Long sales cycles (3+ months) require special consideration. We: extend attribution windows to capture the full journey, weight touchpoints appropriately for your cycle, track engagement over time (not just clicks), and integrate with CRM to track deal progression. B2B companies with 6-12 month cycles are our specialty - we understand the complexity and have proven frameworks."
  },
  {
    question: "How do you handle cross-device tracking?",
    answer: "We use multiple methods: user login tracking (most accurate), probabilistic matching (device fingerprinting), and deterministic matching (email/phone). We integrate with platforms that have cross-device data (Google, Facebook) and use identity resolution tools. While not perfect, we typically achieve 70-80% cross-device match rates, which is industry-leading."
  },
  {
    question: "Can attribution help with budget allocation?",
    answer: "Absolutely - that's the main benefit! Attribution shows true ROI by channel, so you can: increase spend on high-ROI channels, reduce or eliminate low-ROI channels, identify underinvested opportunities, and optimize budget mix for maximum revenue. Most clients reallocate 20-40% of budget after implementing attribution, resulting in significant performance improvements."
  },
];

const AttributionFunnel = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "ATTRIBUTION & FUNNEL ANALYSIS",
      heading: "Understand What Really Drives Conversions",
      description: "Track every touchpoint in the customer journey and attribute revenue to the right channels with advanced multi-touch attribution.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Analytics&AI/AttributionandFunnel.png",
      imageAlt: "Attribution & Funnel Analysis",
    }}
    plans={pricingPlans}
    faqs={attributionFAQs}
    tools={attributionTools}
    processSteps={attributionProcessSteps}
    whyItems={whyItems}
  />
);

export default AttributionFunnel;
