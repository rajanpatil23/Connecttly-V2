import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Zap, DollarSign, LineChart, Gauge, 
  TestTube, Crosshair, Users, BarChart3, ArrowRight, CheckCircle2, 
  Award, Clock, UserCheck, MousePointerClick, BarChart2, Sparkles,
  Building2, ThumbsUp, Rocket, Headphones, Video, Play, Film,
  Eye, MonitorPlay, Tv
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
    title: "75+",
    subtitle: "YouTube campaigns",
  },
  {
    color: "bg-[#0074ED]",
    icon: <ThumbsUp className="h-5 w-5 text-white" />,
    title: "97%",
    subtitle: "View completion rate",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Rocket className="h-5 w-5 text-white" />,
    title: "50M+",
    subtitle: "Video views delivered",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Headphones className="h-5 w-5 text-white" />,
    title: "24/7",
    subtitle: "Campaign optimization",
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 600, yearly: 5760 },
    description: "Perfect for businesses starting with YouTube advertising",
    features: [
      "Up to $8,000 monthly ad spend",
      "Skippable & non-skippable ads",
      "Monthly performance reports",
      "Audience targeting setup",
      "Video ad optimization (3 videos)",
      "Basic analytics tracking",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Professional",
    price: { monthly: 1200, yearly: 11520 },
    description: "Ideal for growing brands scaling YouTube presence",
    features: [
      "Up to $25,000 monthly ad spend",
      "All YouTube ad formats",
      "Bi-weekly performance reports",
      "Advanced audience targeting",
      "Video ad production (10 videos)",
      "A/B testing & optimization",
      "Remarketing campaigns",
      "YouTube SEO optimization",
      "Priority support"
    ],
    ctaText: "Start Growing",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2400, yearly: 23040 },
    description: "For established brands with complex video needs",
    features: [
      "Unlimited ad spend management",
      "Full-service YouTube management",
      "Weekly performance reports",
      "Custom audience strategies",
      "Unlimited video production",
      "Multi-variant testing",
      "Cross-platform remarketing",
      "Channel optimization",
      "Dedicated account manager",
      "24/7 priority support"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  }
];

const youtubeAdsFAQs: FAQItem[] = [
  {
    question: "What types of YouTube ads do you manage?",
    answer: "We manage all YouTube ad formats including skippable in-stream ads, non-skippable ads, bumper ads, discovery ads, and masthead ads. We'll recommend the best formats based on your goals, budget, and target audience."
  },
  {
    question: "Do you create the video content for ads?",
    answer: "Yes! Our team includes video production specialists who create engaging video ads optimized for YouTube. We handle scripting, filming, editing, and optimization to ensure your ads capture attention and drive results."
  },
  {
    question: "How much should I budget for YouTube Ads?",
    answer: "We recommend starting with at least $5,000-$8,000/month for ad spend, plus our management fee. YouTube ads typically have lower CPMs than other platforms, but video production costs should also be considered in your budget."
  },
  {
    question: "How long does it take to see results?",
    answer: "You'll start seeing views and engagement within the first week. However, meaningful conversion data typically appears within 3-4 weeks as YouTube's algorithm learns and optimizes your campaigns for better performance."
  },
  {
    question: "Can you target specific YouTube channels or videos?",
    answer: "Absolutely! We can target specific channels, videos, or even keywords to ensure your ads appear alongside relevant content. This placement targeting helps reach highly engaged audiences interested in your niche."
  },
  {
    question: "What makes your YouTube Ads management different?",
    answer: "We combine video production expertise with data-driven optimization. Our team understands YouTube's unique algorithm, creates thumb-stopping content, and uses advanced targeting to maximize watch time and conversions while minimizing cost per view."
  }
];

const youtubeAdsTools: Tool[] = [
  {
    name: "YouTube",
    logo: "https://cdn.simpleicons.org/youtube/FF0000"
  },
  {
    name: "Google Ads",
    logo: "https://cdn.simpleicons.org/googleads/4285F4"
  },
  {
    name: "Google Analytics",
    logo: "https://cdn.simpleicons.org/googleanalytics/E37400"
  },
  {
    name: "Adobe Premiere Pro",
    logo: "https://cdn.simpleicons.org/adobepremierepro/9999FF"
  },
  {
    name: "Adobe After Effects",
    logo: "https://cdn.simpleicons.org/adobeaftereffects/9999FF"
  },
  {
    name: "Final Cut Pro",
    logo: "https://cdn.simpleicons.org/apple/000000"
  },
  {
    name: "Canva",
    logo: "https://cdn.simpleicons.org/canva/00C4CC"
  },
  {
    name: "VidIQ",
    logo: "https://cdn.simpleicons.org/youtube/FF0000"
  },
  {
    name: "TubeBuddy",
    logo: "https://cdn.simpleicons.org/youtube/FF0000"
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
    name: "Figma",
    logo: "https://cdn.simpleicons.org/figma/F24E1E"
  },
  {
    name: "Trello",
    logo: "https://cdn.simpleicons.org/trello/0052CC"
  }
];

const youtubeAdsFeatures: FeatureItem[] = [
  {
    icon: Play,
    title: "Skippable In-Stream Ads",
    description: "Engage viewers with compelling video ads that drive action before they can skip.",
  },
  {
    icon: Film,
    title: "Non-Skippable Ads",
    description: "Guarantee your message is seen with 15-20 second non-skippable video ads.",
  },
  {
    icon: Tv,
    title: "Bumper Ads",
    description: "Create memorable 6-second ads perfect for brand awareness and reach.",
  },
  {
    icon: MonitorPlay,
    title: "Discovery Ads",
    description: "Appear in YouTube search results and alongside related videos to capture intent.",
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Reach your ideal audience based on demographics, interests, and viewing behavior.",
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "Continuous optimization of bids, targeting, and creative for maximum ROI.",
  },
];

const youtubeAdsProcessSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Strategy & Planning",
    description: "Define goals, target audience, and create a comprehensive YouTube advertising strategy aligned with your business objectives."
  },
  {
    step: "02",
    title: "Video Production",
    description: "Create engaging video content optimized for YouTube, including scripting, filming, editing, and thumbnail design."
  },
  {
    step: "03",
    title: "Campaign Launch",
    description: "Set up and launch optimized campaigns with proper targeting, bidding strategies, and tracking in place."
  },
  {
    step: "04",
    title: "Optimize & Scale",
    description: "Continuous A/B testing, audience refinement, and creative optimization to maximize views, engagement, and conversions."
  }
];

const whyItems: WhyChooseItem[] = [
  { 
    icon: Video, 
    title: "Video Expertise", 
    desc: "Our team specializes in creating thumb-stopping video content that captures attention and drives action.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Target, 
    title: "Advanced Targeting", 
    desc: "Reach your ideal audience with YouTube's powerful targeting options including demographics and interests.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: LineChart, 
    title: "Performance Analytics", 
    desc: "Real-time dashboards with detailed insights into views, engagement, and conversion metrics.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Sparkles, 
    title: "Algorithm Mastery", 
    desc: "We understand YouTube's algorithm and optimize campaigns for maximum reach and engagement.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: TestTube, 
    title: "A/B Testing", 
    desc: "Continuous testing of video creatives, thumbnails, and targeting to find winning combinations.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: DollarSign, 
    title: "Cost-Effective", 
    desc: "Maximize your budget with optimized bidding strategies and high-performing video content.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
];

const YoutubeAds = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "YOUTUBE ADS",
      heading: "Dominate Video Marketing with YouTube Ads",
      description: "Reach billions of viewers on the world's largest video platform. Our expert team creates engaging video ads that drive brand awareness, engagement, and conversions at scale.",
      ctaText: "Get a Free Video Strategy",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Performance Marketing/YouTubeAds.png",
      imageAlt: "YouTube Ads Dashboard",
    }}
    plans={pricingPlans}
    faqs={youtubeAdsFAQs}
    tools={youtubeAdsTools}
    processSteps={youtubeAdsProcessSteps}
    whyItems={whyItems}
  />
);

export default YoutubeAds;
