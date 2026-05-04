import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Brain, Sparkles, LineChart, Cpu, TrendingDown, Lightbulb
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
    icon: <Brain className="h-5 w-5 text-white" />,
    title: "50M+",
    subtitle: "Data points analyzed",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "45%",
    subtitle: "Average performance lift",
  },
  {
    icon: <Zap className="h-5 w-5 text-white" />,
    title: "10x",
    subtitle: "Faster optimization",
  },
  {
    icon: <Target className="h-5 w-5 text-white" />,
    title: "92%",
    subtitle: "Prediction accuracy",
  },
];

const aiCampaignFeatures: FeatureItem[] = [
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "AI models predict campaign performance and recommend optimal strategies before launch."
  },
  {
    icon: Sparkles,
    title: "Automated Optimization",
    description: "Machine learning continuously optimizes bids, budgets, and targeting in real-time."
  },
  {
    icon: Target,
    title: "Audience Intelligence",
    description: "AI identifies high-value audience segments and predicts conversion likelihood."
  },
  {
    icon: Lightbulb,
    title: "Creative Insights",
    description: "AI analyzes creative performance and generates recommendations for improvement."
  },
  {
    icon: LineChart,
    title: "Performance Forecasting",
    description: "Predict future campaign performance and ROI with AI-powered forecasting models."
  },
  {
    icon: Cpu,
    title: "Smart Budget Allocation",
    description: "AI automatically allocates budget across campaigns for maximum ROI."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Brain, title: "Advanced AI Models", desc: "Proprietary machine learning models trained on billions of data points." },
  { icon: Zap, title: "Real-Time Optimization", desc: "AI makes thousands of micro-optimizations per day." },
  { icon: Target, title: "Better Performance", desc: "Consistently outperform manual campaign management by 40-60%." },
  { icon: LineChart, title: "Predictive Insights", desc: "Know what will work before you spend a dollar." },
  { icon: Users, title: "Expert Oversight", desc: "AI-powered with human expertise for best results." },
  { icon: Award, title: "Proven Results", desc: "Track record of driving significant performance improvements." },
];

const aiCampaignProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Data Integration & Analysis", 
    description: "Connect data sources and train AI models on your historical campaign performance." 
  },
  { 
    step: "02", 
    title: "Strategy Development", 
    description: "AI generates campaign strategies based on predictive models and best practices." 
  },
  { 
    step: "03", 
    title: "Launch & Automation", 
    description: "Deploy campaigns with AI-powered automation for bidding, targeting, and optimization." 
  },
  { 
    step: "04", 
    title: "Continuous Learning", 
    description: "AI learns from performance data and continuously improves campaign results." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1200, yearly: 11520 },
    description: "AI-powered campaign optimization",
    features: [
      "Up to $10K monthly ad spend",
      "AI bid optimization",
      "Automated budget allocation",
      "Performance forecasting",
      "Monthly AI insights report",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 2000, yearly: 19200 },
    description: "Advanced AI campaign management",
    features: [
      "Up to $50K monthly ad spend",
      "Advanced AI optimization",
      "Predictive audience modeling",
      "Creative performance AI",
      "Real-time optimization",
      "Weekly strategy calls",
      "Priority support",
      "Dedicated AI specialist"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 4000, yearly: 38400 },
    description: "Full AI-powered marketing suite",
    features: [
      "$50K+ monthly ad spend",
      "Custom AI model training",
      "Multi-channel AI optimization",
      "Advanced forecasting & simulation",
      "Custom integrations",
      "Executive reporting",
      "White-glove service",
      "Dedicated AI team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const aiCampaignTools: Tool[] = [
  { name: "Google AI", logo: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "BigQuery", logo: "https://cdn.simpleicons.org/googlebigquery/669DF6" },
  { name: "Looker", logo: "https://logo.clearbit.com/looker.com" },
  { name: "Tableau", logo: "https://cdn.simpleicons.org/tableau/E97627" },
  { name: "Power BI", logo: "https://cdn.simpleicons.org/powerbi/F2C811" },
];

const aiCampaignFAQs: FAQItem[] = [
  {
    question: "How does AI improve campaign performance?",
    answer: "AI analyzes millions of data points to identify patterns humans can't see. It predicts which audiences, creatives, and strategies will perform best, then automatically optimizes campaigns in real-time. This results in 40-60% better performance compared to manual management. AI makes thousands of micro-optimizations per day - adjusting bids, budgets, targeting, and more based on performance signals."
  },
  {
    question: "What data does the AI need to work effectively?",
    answer: "The AI needs access to your campaign data (Google Ads, Facebook Ads, etc.), website analytics, conversion data, and CRM data. The more historical data available, the better the AI performs. We typically need at least 3 months of data to train effective models, but can work with less. We handle all data integration and ensure compliance with privacy regulations."
  },
  {
    question: "Will AI replace human marketers?",
    answer: "No - AI augments human expertise, not replaces it. AI handles data analysis, optimization, and execution at scale. Humans provide strategy, creativity, and oversight. Our approach combines AI automation with expert marketers who interpret insights, make strategic decisions, and ensure campaigns align with business goals. This hybrid approach delivers the best results."
  },
  {
    question: "How accurate are the AI predictions?",
    answer: "Our AI models achieve 85-95% accuracy in predicting campaign performance, depending on data quality and volume. Predictions improve over time as the AI learns from your specific campaigns. We provide confidence intervals with all predictions so you understand the reliability. Even conservative predictions typically outperform human estimates."
  },
  {
    question: "Can AI work with my existing campaigns?",
    answer: "Yes! We can integrate AI optimization into your existing campaigns without disrupting them. We start by analyzing historical performance, then gradually introduce AI optimizations. You maintain full control and can adjust AI settings at any time. Most clients see improvements within 2-4 weeks of AI implementation."
  },
  {
    question: "What's the ROI of AI-powered campaigns?",
    answer: "Clients typically see 40-60% improvement in key metrics (CPA, ROAS, conversion rate) within 3 months. ROI varies by industry and campaign maturity, but most clients achieve 3-5x ROI on our fees through improved performance. The AI pays for itself through better campaign efficiency and reduced wasted spend."
  },
  {
    question: "How is this different from platform AI (Google Smart Bidding, etc.)?",
    answer: "Platform AI (like Google Smart Bidding) is limited to that platform's data and objectives. Our AI works across all your marketing channels, uses your complete customer data, and optimizes for your specific business goals. We also provide transparency into AI decisions and allow custom optimization strategies - something platform AI doesn't offer."
  },
  {
    question: "What if the AI makes a mistake?",
    answer: "We have multiple safeguards: AI recommendations are reviewed by experts before implementation, we set guardrails to prevent extreme changes, and we monitor performance continuously. If something goes wrong, we can quickly revert changes. In practice, AI mistakes are rare and less costly than human errors because AI learns and adapts quickly."
  },
];

const AIPoweredCampaigns = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "AI-POWERED CAMPAIGNS",
      heading: "Supercharge Your Marketing with Artificial Intelligence",
      description: "Leverage advanced AI and machine learning to optimize campaigns, predict performance, and drive better results automatically.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Analytics&AI/AIPoweredCampaigns.png",
      imageAlt: "AI-Powered Campaigns",
    }}
    plans={pricingPlans}
    faqs={aiCampaignFAQs}
    tools={aiCampaignTools}
    processSteps={aiCampaignProcessSteps}
    whyItems={whyItems}
  />
);

export default AIPoweredCampaigns;
