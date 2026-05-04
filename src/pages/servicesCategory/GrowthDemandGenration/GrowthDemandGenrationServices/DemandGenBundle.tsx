import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";

import { Link } from "react-router-dom";


import {
  Rocket, TrendingUp, Target, Users, Zap, Award,
  BarChart3, Shield, Sparkles, Globe, DollarSign, CheckCircle
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
    icon: <Rocket className="h-5 w-5 text-white" />,
    title: "5x",
    subtitle: "Faster growth vs single channel",
  },
  {
    icon: <DollarSign className="h-5 w-5 text-white" />,
    title: "$10M+",
    subtitle: "Pipeline generated",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "50K+",
    subtitle: "Qualified leads delivered",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "4.5x",
    subtitle: "Average ROI",
  },
];

const bundleFeatures: FeatureItem[] = [
  {
    icon: Target,
    title: "ABM Campaigns",
    description: "Target and engage high-value accounts with personalized multi-channel campaigns."
  },
  {
    icon: Users,
    title: "Influencer & UGC",
    description: "Leverage authentic creators and user-generated content to build trust and drive conversions."
  },
  {
    icon: Globe,
    title: "Community Building",
    description: "Create engaged communities where customers become advocates and fuel growth."
  },
  {
    icon: Sparkles,
    title: "Viral Marketing",
    description: "Create content that spreads organically and achieves explosive reach."
  },
  {
    icon: Zap,
    title: "Partner Programs",
    description: "Build revenue-driving affiliate and partner programs for sustainable growth."
  },
  {
    icon: BarChart3,
    title: "Unified Analytics",
    description: "Comprehensive reporting across all channels with attribution and ROI tracking."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Rocket, title: "Accelerated Growth", desc: "Multi-channel approach delivers faster results than single-channel strategies." },
  { icon: Target, title: "Integrated Strategy", desc: "All channels work together synergistically for maximum impact." },
  { icon: Shield, title: "Reduced Risk", desc: "Diversified approach reduces dependency on any single channel." },
  { icon: Award, title: "Expert Team", desc: "Access specialists across all growth and demand gen disciplines." },
  { icon: DollarSign, title: "Better ROI", desc: "Bundle pricing delivers more value than purchasing services separately." },
  { icon: Zap, title: "Faster Execution", desc: "Coordinated team launches campaigns faster with better results." },
];

const bundleProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Strategic Planning", 
    description: "Comprehensive audit, goal setting, and integrated strategy across all growth channels." 
  },
  { 
    step: "02", 
    title: "Multi-Channel Launch", 
    description: "Coordinated launch of ABM, influencer, community, viral, and partner initiatives." 
  },
  { 
    step: "03", 
    title: "Optimization & Scaling", 
    description: "Continuous testing, optimization, and scaling of winning tactics across channels." 
  },
  { 
    step: "04", 
    title: "Reporting & Growth", 
    description: "Unified reporting, insights, and strategic recommendations for sustained growth." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Growth Accelerator",
    price: { monthly: 6000, yearly: 57600 },
    description: "Complete growth engine for scaling companies",
    features: [
      "ABM campaigns (25 accounts)",
      "Influencer marketing (10-15 creators)",
      "Community management (up to 1K members)",
      "2-3 viral campaigns per month",
      "Partner program setup & management",
      "Unified analytics dashboard",
      "Weekly strategy calls",
      "Dedicated growth team"
    ],
    ctaText: "Accelerate Growth",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise Growth",
    price: { monthly: 12000, yearly: 115200 },
    description: "Full-scale growth program for enterprises",
    features: [
      "ABM campaigns (100+ accounts)",
      "Influencer marketing (50+ creators)",
      "Community management (unlimited)",
      "Unlimited viral campaigns",
      "Full partner program management",
      "Custom integrations & automation",
      "Daily optimization & reporting",
      "Executive advisory",
      "Dedicated account team",
      "White-label solutions"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const bundleTools: Tool[] = [
  { name: "6sense", logo: "https://logo.clearbit.com/6sense.com" },
  { name: "Demandbase", logo: "https://logo.clearbit.com/demandbase.com" },
  { name: "AspireIQ", logo: "https://logo.clearbit.com/aspireiq.com" },
  { name: "Discord", logo: "https://cdn.simpleicons.org/discord/5865F2" },
  { name: "Impact", logo: "https://logo.clearbit.com/impact.com" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
];

const bundleFAQs: FAQItem[] = [
  {
    question: "What's included in the Demand Gen Bundle?",
    answer: "The bundle includes all five of our Growth & Demand Generation services: ABM Campaigns for targeting high-value accounts, Influencer & UGC Marketing for authentic promotion, Community Building for customer engagement, Viral & Cultural Marketing for explosive reach, and Partner/Affiliate Programs for sustainable growth. You get a dedicated team managing all channels with unified strategy and reporting."
  },
  {
    question: "How is the bundle different from buying services separately?",
    answer: "The bundle offers: 30-40% cost savings vs purchasing separately, integrated strategy where all channels work together, unified reporting and attribution, single point of contact managing everything, faster execution with coordinated launches, and better results from synergies between channels. For example, viral content can feed your community, influencers can promote your partner program, etc."
  },
  {
    question: "Can we customize which services are included?",
    answer: "Yes! While we recommend the full bundle for maximum impact, we can customize based on your needs and priorities. Some clients start with 2-3 services and add more over time. We'll work with you to design a package that fits your goals, budget, and timeline. The key is maintaining strategic integration between the services you choose."
  },
  {
    question: "How long does it take to see results?",
    answer: "Timeline varies by channel: ABM and partner programs typically show results in 3-6 months. Influencer campaigns can drive immediate traffic and conversions. Community building is long-term (6-12 months for maturity). Viral campaigns can deliver explosive results quickly but are less predictable. The bundle approach means you'll see wins across different timeframes, with some quick wins and some building long-term value."
  },
  {
    question: "What kind of companies is this bundle best for?",
    answer: "The bundle works best for: B2B SaaS companies with $1M+ ARR, companies with deal sizes of $10K+, businesses with 6+ month sales cycles, brands targeting enterprise customers, and companies ready to invest in multi-channel growth. If you're earlier stage or have simpler sales, individual services might be better to start."
  },
  {
    question: "How do you coordinate across all these channels?",
    answer: "We have a dedicated growth team with specialists in each area, led by a strategic director who ensures integration. We use: weekly strategy meetings to align all channels, shared content calendars and campaign planning, unified tracking and attribution, regular cross-channel optimization, and monthly executive reviews. You get one main point of contact who coordinates everything."
  },
  {
    question: "What's the minimum commitment?",
    answer: "We recommend a minimum 6-month commitment for the bundle. Growth and demand generation take time - you need at least 3 months to launch and optimize, and another 3 months to see meaningful results and ROI. Most clients stay 12+ months as they see the compounding benefits. We offer quarterly payment options to make it more manageable."
  },
  {
    question: "How do you measure success and ROI?",
    answer: "We track metrics across all channels: pipeline generated and revenue attributed, cost per qualified lead/opportunity, customer acquisition cost (CAC), marketing-sourced revenue percentage, engagement metrics by channel, and overall program ROI. You get a unified dashboard showing performance across all channels, plus detailed channel-specific reports. We typically see 3-5x ROI within 12 months."
  },
];

const DemandGenBundle = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "DEMAND GENERATION BUNDLE",
      heading: "Complete Growth Engine for B2B Companies",
      description: "Combine ABM, influencer marketing, community building, viral campaigns, and partner programs into one integrated growth machine that delivers predictable, scalable results.",
      ctaText: "Accelerate Growth",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/DemandGrowthGeneration/DemandGenBundle.png",
      imageAlt: "Growth Strategy Dashboard",
    }}
    plans={pricingPlans}
    faqs={bundleFAQs}
    tools={bundleTools}
    processSteps={bundleProcessSteps}
    whyItems={whyItems}
  />
);

export default DemandGenBundle;
