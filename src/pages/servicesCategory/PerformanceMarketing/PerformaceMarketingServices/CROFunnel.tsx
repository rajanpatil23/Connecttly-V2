import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Zap, DollarSign, LineChart, Gauge, 
  TestTube, Crosshair, Users, BarChart3, ArrowRight, CheckCircle2, 
  Award, Clock, UserCheck, MousePointerClick, BarChart2, Sparkles,
  Building2, ThumbsUp, Rocket, Headphones, Filter, Layers, 
  TrendingDown, Activity, Percent, ArrowDownUp
} from "lucide-react";
import { Button } from "@/components/ui/button";


import type { WhyChooseItem } from "@/components/Services/category/WhyChoose";

import type { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import type { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import type { Tool } from "@/components/Services/ServiceDetail/toolstack";
import type { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import type { ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import type { FeatureItem } from "@/components/Services/ServiceDetail/service-features";
// Scroll-animated wrapper for sections - scroll-based scale animation
const ribbonItems: RibbonItem[] = [
  {
    color: "bg-[#0074ED]",
    icon: <Building2 className="h-5 w-5 text-white" />,
    title: "150+",
    subtitle: "Funnels optimized",
  },
  {
    color: "bg-[#0074ED]",
    icon: <ThumbsUp className="h-5 w-5 text-white" />,
    title: "45%",
    subtitle: "Avg conversion lift",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Rocket className="h-5 w-5 text-white" />,
    title: "$25M+",
    subtitle: "Revenue optimized",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Headphones className="h-5 w-5 text-white" />,
    title: "24/7",
    subtitle: "Testing & monitoring",
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1000, yearly: 9600 },
    description: "Perfect for businesses starting with CRO",
    features: [
      "Single funnel optimization",
      "Monthly A/B tests (5 tests)",
      "Heatmap & session recording",
      "Conversion audit",
      "Landing page optimization",
      "Basic analytics setup",
      "Monthly reports",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Professional",
    price: { monthly: 2000, yearly: 19200 },
    description: "Ideal for growing businesses scaling conversions",
    features: [
      "Multi-funnel optimization",
      "Unlimited A/B tests",
      "Advanced heatmaps & recordings",
      "Full funnel audit",
      "Landing page redesign",
      "Form optimization",
      "User behavior analysis",
      "Bi-weekly reports",
      "Priority support"
    ],
    ctaText: "Start Growing",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 4000, yearly: 38400 },
    description: "For established brands maximizing conversions",
    features: [
      "Enterprise-wide optimization",
      "Unlimited testing & optimization",
      "Advanced user research",
      "Custom funnel design",
      "Personalization engine",
      "Multivariate testing",
      "Predictive analytics",
      "Weekly strategy sessions",
      "Dedicated CRO specialist",
      "24/7 priority support"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  }
];

const croFunnelFAQs: FAQItem[] = [
  {
    question: "What is Conversion Rate Optimization (CRO)?",
    answer: "CRO is the systematic process of increasing the percentage of website visitors who take a desired action. We use data analysis, user feedback, and A/B testing to identify and remove friction points in your funnel, ultimately increasing conversions without increasing traffic."
  },
  {
    question: "How much can CRO improve my conversion rate?",
    answer: "Results vary by industry and starting point, but our clients typically see 20-50% improvement in conversion rates within 3-6 months. Some see even higher gains. We focus on sustainable, data-driven improvements that compound over time."
  },
  {
    question: "What's included in a funnel audit?",
    answer: "Our comprehensive funnel audit includes heatmap analysis, session recordings, user surveys, technical SEO review, page speed optimization, mobile responsiveness check, form analysis, and a detailed report with prioritized recommendations for improvement."
  },
  {
    question: "How long does it take to see results?",
    answer: "Initial quick wins can be implemented within 2-4 weeks. However, meaningful CRO is an ongoing process. We typically see significant improvements within 2-3 months as we gather data, test hypotheses, and implement winning variations."
  },
  {
    question: "Do you redesign landing pages?",
    answer: "Yes! We design high-converting landing pages based on conversion best practices and your specific audience data. We create multiple variations for testing and continuously optimize based on performance data to maximize conversions."
  },
  {
    question: "What makes your CRO approach different?",
    answer: "We combine quantitative data (analytics, heatmaps) with qualitative insights (user testing, surveys) to understand not just what users do, but why they do it. This holistic approach leads to more effective optimizations and sustainable conversion improvements."
  }
];

const croFunnelTools: Tool[] = [
  {
    name: "Google Analytics",
    logo: "https://cdn.simpleicons.org/googleanalytics/E37400"
  },
  {
    name: "Hotjar",
    logo: "https://cdn.simpleicons.org/hotjar/FD3A5C"
  },
  {
    name: "Optimizely",
    logo: "https://cdn.simpleicons.org/optimizely/0073E6"
  },
  {
    name: "VWO",
    logo: "https://cdn.simpleicons.org/vwo/4B4B4B"
  },
  {
    name: "Google Optimize",
    logo: "https://cdn.simpleicons.org/google/4285F4"
  },
  {
    name: "Crazy Egg",
    logo: "https://cdn.simpleicons.org/crazyegg/FF6900"
  },
  {
    name: "Unbounce",
    logo: "https://cdn.simpleicons.org/unbounce/00D563"
  },
  {
    name: "Figma",
    logo: "https://cdn.simpleicons.org/figma/F24E1E"
  },
  {
    name: "Google Tag Manager",
    logo: "https://cdn.simpleicons.org/googletagmanager/246FDB"
  },
  {
    name: "Mixpanel",
    logo: "https://cdn.simpleicons.org/mixpanel/7856FF"
  },
  {
    name: "Asana",
    logo: "https://cdn.simpleicons.org/asana/F06A6A"
  },
  {
    name: "Slack",
    logo: "https://cdn.simpleicons.org/slack/4A154B"
  },
  {
    name: "HubSpot",
    logo: "https://cdn.simpleicons.org/hubspot/FF7A59"
  },
  {
    name: "Salesforce",
    logo: "https://cdn.simpleicons.org/salesforce/00A1E0"
  },
  {
    name: "Zapier",
    logo: "https://cdn.simpleicons.org/zapier/FF4A00"
  },
  {
    name: "Trello",
    logo: "https://cdn.simpleicons.org/trello/0052CC"
  }
];

const croFunnelFeatures: FeatureItem[] = [
  {
    icon: TestTube,
    title: "A/B Testing",
    description: "Run data-driven experiments to identify winning variations that increase conversions and revenue.",
  },
  {
    icon: Activity,
    title: "Heatmap Analysis",
    description: "Understand user behavior with click, scroll, and movement heatmaps to optimize page layouts.",
  },
  {
    icon: Filter,
    title: "Funnel Optimization",
    description: "Identify and eliminate drop-off points in your conversion funnel to maximize completion rates.",
  },
  {
    icon: Layers,
    title: "Landing Page Design",
    description: "Create high-converting landing pages optimized for your specific audience and goals.",
  },
  {
    icon: Percent,
    title: "Form Optimization",
    description: "Reduce form abandonment and increase submissions with optimized form design and flow.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "Ongoing testing and optimization to continuously improve conversion rates over time.",
  },
];

const croFunnelProcessSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Audit & Analysis",
    description: "Comprehensive analysis of your current funnel using analytics, heatmaps, and user recordings to identify opportunities."
  },
  {
    step: "02",
    title: "Hypothesis Development",
    description: "Create data-backed hypotheses for improvements based on user behavior insights and conversion best practices."
  },
  {
    step: "03",
    title: "Testing & Implementation",
    description: "Design and run A/B tests to validate hypotheses, then implement winning variations across your funnel."
  },
  {
    step: "04",
    title: "Monitor & Iterate",
    description: "Continuously monitor performance, gather insights, and run new tests to compound conversion improvements."
  }
];

const whyItems: WhyChooseItem[] = [
  { 
    icon: TestTube, 
    title: "Data-Driven Approach", 
    desc: "Every optimization is backed by data and validated through rigorous A/B testing for proven results.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Activity, 
    title: "User Behavior Insights", 
    desc: "We analyze how users actually interact with your site to identify and fix friction points.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: LineChart, 
    title: "Proven Methodology", 
    desc: "Our systematic CRO process has helped 150+ businesses increase conversions by an average of 45%.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Sparkles, 
    title: "Quick Wins + Long-term", 
    desc: "We deliver immediate improvements while building a sustainable optimization program.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Target, 
    title: "Holistic Optimization", 
    desc: "We optimize every touchpoint in your funnel from landing page to checkout for maximum impact.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: DollarSign, 
    title: "ROI-Focused", 
    desc: "Our optimizations directly impact your bottom line by increasing revenue without increasing ad spend.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
];

const CROFunnel = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "CRO & FUNNEL OPTIMIZATION",
      heading: "Maximize Conversions with CRO & Funnel Optimization",
      description: "Turn more visitors into customers with data-driven conversion rate optimization. Our expert team identifies friction points, runs strategic A/B tests, and implements proven optimizations that increase your conversion rates and revenue.",
      ctaText: "Get a Free Funnel Audit",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/performance-marketing/CROandFunnel.png",
      imageAlt: "CRO Analytics Dashboard",
    }}
    plans={pricingPlans}
    faqs={croFunnelFAQs}
    tools={croFunnelTools}
    processSteps={croFunnelProcessSteps}
    whyItems={whyItems}
  />
);

export default CROFunnel;
