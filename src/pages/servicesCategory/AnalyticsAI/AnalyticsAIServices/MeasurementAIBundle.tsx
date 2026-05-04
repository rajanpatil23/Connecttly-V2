import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Package, Layers, Brain, Sparkles, CheckCircle, Crown
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
const ScrollAnimatedSection = ({ children, bgColor }: { children: React.ReactNode; bgColor?: string }) => {
  const { ref, scale } = useScrollScale();
  
  return (
    <motion.div 
      ref={ref}
      style={{ scale }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      }}
      className="relative rounded-3xl"
    >
      {bgColor && (
        <div className={`absolute inset-0 rounded-3xl ${bgColor}`} />
      )}
      <div className="relative rounded-3xl">
        {children}
      </div>
    </motion.div>
  );
};

const ribbonItems: RibbonItem[] = [
  {
    icon: <Package className="h-5 w-5 text-white" />,
    title: "All-in-One",
    subtitle: "Complete analytics solution",
  },
  {
    icon: <Brain className="h-5 w-5 text-white" />,
    title: "AI-Powered",
    subtitle: "Advanced automation",
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-white" />,
    title: "99%",
    subtitle: "Data accuracy",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "5x",
    subtitle: "Better insights",
  },
];

const measurementBundleFeatures: FeatureItem[] = [
  {
    icon: Brain,
    title: "AI-Powered Campaign Optimization",
    description: "Machine learning models that predict performance and optimize campaigns automatically."
  },
  {
    icon: BarChart3,
    title: "Custom Analytics Dashboards",
    description: "Beautiful, real-time dashboards that give you complete visibility into performance."
  },
  {
    icon: Layers,
    title: "Multi-Touch Attribution",
    description: "Understand the complete customer journey and attribute revenue accurately."
  },
  {
    icon: Sparkles,
    title: "CRM Automation",
    description: "Intelligent workflows that eliminate manual work and improve sales efficiency."
  },
  {
    icon: CheckCircle,
    title: "GA4 & Tracking Setup",
    description: "Proper implementation of Google Analytics 4 and all tracking tags."
  },
  {
    icon: Target,
    title: "Unified Reporting",
    description: "All your analytics in one place with consistent metrics and insights."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Package, title: "Complete Solution", desc: "Everything you need for data-driven marketing in one bundle." },
  { icon: Zap, title: "Better Together", desc: "Services work synergistically for amplified results." },
  { icon: Target, title: "Unified Strategy", desc: "Coordinated approach across all analytics and AI services." },
  { icon: Award, title: "Cost Savings", desc: "Save 35-45% compared to purchasing services separately." },
  { icon: Users, title: "Dedicated Team", desc: "One team managing all aspects of your analytics and AI." },
  { icon: Crown, title: "Proven Results", desc: "Track record of transforming marketing performance with data." },
];

const measurementBundleProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Comprehensive Audit", 
    description: "Audit all data sources, tracking, and current analytics setup to identify opportunities." 
  },
  { 
    step: "02", 
    title: "Integrated Strategy", 
    description: "Create unified strategy covering tracking, attribution, dashboards, automation, and AI." 
  },
  { 
    step: "03", 
    title: "Implementation & Integration", 
    description: "Implement all services with seamless integration across platforms and tools." 
  },
  { 
    step: "04", 
    title: "Optimization & Insights", 
    description: "Continuously optimize and deliver actionable insights to drive better results." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter Bundle",
    price: { monthly: 2400, yearly: 23040 },
    description: "Essential analytics & AI",
    features: [
      "Basic AI optimization",
      "3 custom dashboards",
      "Basic attribution tracking",
      "5 CRM workflows",
      "GA4 setup & audit",
      "Monthly reporting",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth Bundle",
    price: { monthly: 4000, yearly: 38400 },
    description: "Complete analytics & AI solution",
    features: [
      "AI campaign optimization",
      "Custom analytics dashboards (5)",
      "Multi-touch attribution",
      "CRM automation (10 workflows)",
      "GA4 & tracking setup",
      "Unified reporting",
      "Weekly optimization",
      "Dedicated analytics team"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise Bundle",
    price: { monthly: 8000, yearly: 76800 },
    description: "Enterprise analytics & AI suite",
    features: [
      "Advanced AI optimization",
      "Unlimited dashboards",
      "Machine learning attribution",
      "Unlimited CRM automation",
      "Enterprise tracking setup",
      "Predictive analytics",
      "Custom integrations",
      "White-glove service",
      "Executive reporting",
      "Dedicated analytics team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const measurementBundleTools: Tool[] = [
  { name: "Google Analytics 4", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Google Tag Manager", logo: "https://cdn.simpleicons.org/googletagmanager/246FDB" },
  { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "BigQuery", logo: "https://cdn.simpleicons.org/googlebigquery/669DF6" },
  { name: "Tableau", logo: "https://cdn.simpleicons.org/tableau/E97627" },
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier/FF4A00" },
];

const measurementBundleFAQs: FAQItem[] = [
  {
    question: "What's included in the Measurement & AI Bundle?",
    answer: "The bundle includes everything: AI-powered campaign optimization, custom analytics dashboards, multi-touch attribution, CRM automation, GA4 and tracking setup, and unified reporting. You get a complete analytics and AI solution managed by one dedicated team. This integrated approach delivers better results than siloed services."
  },
  {
    question: "How much can I save with the bundle?",
    answer: "The bundle saves you 35-45% compared to purchasing services separately. For example: AI Campaigns ($5K) + Dashboards ($3.5K) + Attribution ($4.5K) + CRM Automation ($3.5K) + Tracking ($4K) = $20.5K/month separately. Growth Bundle is $9,999/month - a savings of $10,500/month or 51%. Plus you get better integration and results."
  },
  {
    question: "Can I customize which services are included?",
    answer: "Yes! While we offer standard bundles, we can customize based on your needs. Want more dashboards? Additional AI models? Custom integrations? We'll create a package that fits your goals and budget. Most clients start with a standard bundle and add custom features as needed."
  },
  {
    question: "How do the services work together?",
    answer: "The services amplify each other: AI uses attribution data to optimize campaigns, dashboards display AI insights and attribution, CRM automation triggers based on analytics, tracking feeds all systems with accurate data, and unified reporting shows the complete picture. This integration delivers 2-3x better results than separate services."
  },
  {
    question: "What results can I expect?",
    answer: "Typical results for Growth Bundle clients: 40-60% improvement in campaign performance (from AI), complete visibility into marketing ROI (from attribution and dashboards), 80% reduction in manual work (from automation), 99% data accuracy (from proper tracking), and 3-5x ROI on total investment. Enterprise clients typically see even better results."
  },
  {
    question: "How long does implementation take?",
    answer: "Full implementation takes 6-8 weeks: Week 1-2: Audit and strategy, Week 3-4: Tracking and GA4 setup, Week 5-6: Dashboards and attribution, Week 7-8: AI and automation. You'll start seeing benefits within the first month as we roll out services incrementally. Full optimization typically takes 3 months as AI models learn."
  },
  {
    question: "Do I need technical resources on my team?",
    answer: "No! We handle all technical implementation. You'll need to: provide access to platforms, answer questions about your business, and review/approve deliverables. We provide training so your team can use everything effectively. Most clients are self-sufficient after our training, but we're available for ongoing support."
  },
  {
    question: "What if I'm already using some of these services?",
    answer: "No problem! We can integrate with your existing setup. For example, if you already have GA4, we'll audit and optimize it. If you have dashboards, we'll enhance them. We'll assess what's working and what needs improvement, then fill the gaps. The goal is to maximize your existing investments while adding new capabilities."
  },
];

const MeasurementAIBundle = () => (
  <ServiceDetailAdapter
    heroProps={{
eyebrow="MEASUREMENT & AI BUNDLE"
        heading="Complete Analytics & AI Solution - All Services in One Package"
        description="Transform your marketing with our comprehensive bundle: AI optimization, dashboards, attribution, automation, and tracking - all working together for maximum impact."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Analytics&AI/Measurement+AIBundle.png"
        imageAlt="Measurement & AI Bundle"
      
    }}
    plans={pricingPlans}
    faqs={measurementBundleFAQs}
    tools={measurementBundleTools}
    processSteps={measurementBundleProcessSteps}
    whyItems={whyItems}
  />
);

export default MeasurementAIBundle;
