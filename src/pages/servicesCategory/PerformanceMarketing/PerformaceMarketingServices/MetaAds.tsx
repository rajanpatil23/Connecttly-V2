import heroIllustration from "@/assets/_zip/services/illu-meta-ads.png";
import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Zap, DollarSign, LineChart, Gauge, 
  TestTube, Crosshair, Users, BarChart3, ArrowRight, CheckCircle2, 
  Award, Clock, UserCheck, MousePointerClick, BarChart2, Sparkles,
  Building2, ThumbsUp, Rocket, Headphones, Video, Image, Share2,
  Eye, Heart, MessageCircle
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
    title: "100+",
    subtitle: "Brands on Meta",
  },
  {
    color: "bg-[#0074ED]",
    icon: <ThumbsUp className="h-5 w-5 text-white" />,
    title: "95%",
    subtitle: "Client retention",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Rocket className="h-5 w-5 text-white" />,
    title: "2M+",
    subtitle: "Leads generated",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Headphones className="h-5 w-5 text-white" />,
    title: "24/7",
    subtitle: "Campaign monitoring",
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 520, yearly: 4992 },
    description: "Perfect for businesses starting with Meta advertising",
    features: [
      "Up to $7,500 monthly ad spend",
      "Facebook & Instagram campaigns",
      "Monthly performance reports",
      "Audience research & targeting",
      "Ad creative design (5 variations)",
      "Basic A/B testing",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Professional",
    price: { monthly: 1000, yearly: 9600 },
    description: "Ideal for growing brands scaling Meta presence",
    features: [
      "Up to $20,000 monthly ad spend",
      "All Meta platforms included",
      "Bi-weekly performance reports",
      "Advanced audience targeting",
      "Ad creative design (20 variations)",
      "Advanced A/B testing",
      "Retargeting campaigns",
      "Landing page optimization",
      "Priority support"
    ],
    ctaText: "Start Growing",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2000, yearly: 19200 },
    description: "For established brands with complex needs",
    features: [
      "Unlimited ad spend management",
      "Full-service Meta management",
      "Weekly performance reports",
      "Custom audience strategies",
      "Unlimited ad variations",
      "Multi-variant testing",
      "Cross-platform remarketing",
      "Video ad production",
      "Dedicated account manager",
      "24/7 priority support"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  }
];

const metaAdsFAQs: FAQItem[] = [
  {
    question: "What's the difference between Facebook and Instagram ads?",
    answer: "While both are Meta platforms, Facebook ads typically perform better for detailed targeting and longer-form content, while Instagram excels at visual storytelling and reaching younger demographics. We optimize campaigns for both platforms based on your target audience and goals."
  },
  {
    question: "How much should I budget for Meta Ads?",
    answer: "We recommend starting with at least $3,000-$7,500/month for ad spend, plus our management fee. This allows for proper testing across Facebook and Instagram, audience optimization, and meaningful data collection to improve performance."
  },
  {
    question: "How long does it take to see results from Meta Ads?",
    answer: "You'll start seeing initial engagement within the first few days, but meaningful conversion data typically appears within 2-4 weeks. Meta's algorithm needs time to learn and optimize, so we recommend a minimum 90-day commitment for best results."
  },
  {
    question: "Do you create the ad creatives?",
    answer: "Yes! Our team designs scroll-stopping ad creatives including images, videos, and carousel ads. We create multiple variations for A/B testing and continuously optimize based on performance data to maximize your ROI."
  },
  {
    question: "Can you help with retargeting campaigns?",
    answer: "Absolutely! Retargeting is one of the most effective Meta advertising strategies. We set up pixel tracking, create custom audiences, and build strategic retargeting campaigns to re-engage visitors who didn't convert on their first visit."
  },
  {
    question: "What makes your Meta Ads management different?",
    answer: "We combine creative excellence with data-driven optimization. Our team stays ahead of Meta's algorithm changes, tests new ad formats, and uses advanced targeting strategies. We focus on quality leads and ROI, not just reach and impressions."
  }
];

const metaAdsTools: Tool[] = [
  {
    name: "Meta Business Suite",
    logo: "https://cdn.simpleicons.org/meta/0668E1"
  },
  {
    name: "Facebook Ads Manager",
    logo: "https://cdn.simpleicons.org/facebook/1877F2"
  },
  {
    name: "Instagram",
    logo: "https://cdn.simpleicons.org/instagram/E4405F"
  },
  {
    name: "Meta Pixel",
    logo: "https://cdn.simpleicons.org/meta/0668E1"
  },
  {
    name: "Google Analytics",
    logo: "https://cdn.simpleicons.org/googleanalytics/E37400"
  },
  {
    name: "Canva",
    logo: "https://cdn.simpleicons.org/canva/00C4CC"
  },
  {
    name: "Adobe Creative Cloud",
    logo: "https://cdn.simpleicons.org/adobecreativecloud/DA1F26"
  },
  {
    name: "Hotjar",
    logo: "https://cdn.simpleicons.org/hotjar/FD3A5C"
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
    name: "Mailchimp",
    logo: "https://cdn.simpleicons.org/mailchimp/FFE01B"
  },
  {
    name: "Zapier",
    logo: "https://cdn.simpleicons.org/zapier/FF4A00"
  },
  {
    name: "Figma",
    logo: "https://cdn.simpleicons.org/figma/F24E1E"
  },
  {
    name: "Trello",
    logo: "https://cdn.simpleicons.org/trello/0052CC"
  }
];

const metaAdsFeatures: FeatureItem[] = [
  {
    icon: Video,
    title: "Video Ad Campaigns",
    description: "Create engaging video ads that capture attention and drive conversions across Facebook and Instagram.",
  },
  {
    icon: Image,
    title: "Image & Carousel Ads",
    description: "Design stunning visual ads and multi-image carousels that showcase your products and services.",
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Reach your ideal customers with Meta's powerful targeting options including demographics, interests, and behaviors.",
  },
  {
    icon: Share2,
    title: "Retargeting Campaigns",
    description: "Re-engage website visitors and past customers with strategic retargeting across Meta platforms.",
  },
  {
    icon: Eye,
    title: "Brand Awareness",
    description: "Build brand recognition and reach new audiences with optimized awareness campaigns.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    description: "Maximize conversions with continuous testing, optimization, and performance tracking.",
  },
];

const metaAdsProcessSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Audience Research",
    description: "Deep dive into your target audience, competitors, and market to create data-driven Meta advertising strategies."
  },
  {
    step: "02",
    title: "Creative Development",
    description: "Design scroll-stopping ad creatives including images, videos, and copy that resonate with your audience."
  },
  {
    step: "03",
    title: "Campaign Launch",
    description: "Launch optimized campaigns across Facebook and Instagram with proper tracking and monitoring in place."
  },
  {
    step: "04",
    title: "Optimize & Scale",
    description: "Continuous A/B testing, audience refinement, and budget optimization to maximize ROI and scale winning campaigns."
  }
];

const whyItems: WhyChooseItem[] = [
  { 
    icon: Target, 
    title: "Advanced Targeting", 
    desc: "Leverage Meta's powerful targeting to reach your ideal customers based on demographics, interests, and behaviors.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Video, 
    title: "Creative Excellence", 
    desc: "Our team creates scroll-stopping ad creatives that capture attention and drive engagement.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: LineChart, 
    title: "Performance Tracking", 
    desc: "Real-time dashboards with detailed insights into campaign performance across all Meta platforms.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Sparkles, 
    title: "Algorithm Mastery", 
    desc: "We stay ahead of Meta's algorithm changes to ensure your campaigns perform optimally.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: TestTube, 
    title: "A/B Testing", 
    desc: "Continuous testing of ad creatives, audiences, and placements to find winning combinations.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: DollarSign, 
    title: "ROI-Focused", 
    desc: "Every dollar is tracked and optimized for maximum return on ad spend across Meta platforms.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
];

const MetaAds = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "META ADS (FACEBOOK & INSTAGRAM)",
      heading: "Dominate Social Media with Meta Ads",
      description: "Reach billions of users on Facebook and Instagram with data-driven Meta advertising campaigns. Our expert team creates scroll-stopping ads that drive engagement, leads, and sales.",
      ctaText: "Get a Free Strategy Session",
      ctaLink: "/resources/support",
      imageSrc: heroIllustration,
      imageAlt: "Meta Ads Dashboard",
    }}
    plans={pricingPlans}
    faqs={metaAdsFAQs}
    tools={metaAdsTools}
    processSteps={metaAdsProcessSteps}
    whyItems={whyItems}
  />
);

export default MetaAds;
