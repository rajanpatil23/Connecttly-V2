import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Zap, DollarSign, LineChart, Gauge, 
  TestTube, Crosshair, Users, BarChart3, ArrowRight, CheckCircle2, 
  Award, Clock, UserCheck, MousePointerClick, BarChart2, Sparkles,
  Building2, ThumbsUp, Rocket, Headphones, Video, Play, Film,
  Eye, Smartphone, Repeat, Hash
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
    color: "bg-[#0074ED]",
    icon: <Building2 className="h-5 w-5 text-white" />,
    title: "200+",
    subtitle: "Short video campaigns",
  },
  {
    color: "bg-[#0074ED]",
    icon: <ThumbsUp className="h-5 w-5 text-white" />,
    title: "99%",
    subtitle: "Completion rate",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Rocket className="h-5 w-5 text-white" />,
    title: "100M+",
    subtitle: "Views generated",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Headphones className="h-5 w-5 text-white" />,
    title: "24/7",
    subtitle: "Trend monitoring",
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 720, yearly: 6912 },
    description: "Perfect for businesses starting with short-form video ads",
    features: [
      "Up to $10,000 monthly ad spend",
      "TikTok, Reels & Shorts ads",
      "Monthly performance reports",
      "Trend research & targeting",
      "Video production (5 videos/month)",
      "Basic hashtag strategy",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Professional",
    price: { monthly: 1400, yearly: 13440 },
    description: "Ideal for brands scaling short-form video presence",
    features: [
      "Up to $30,000 monthly ad spend",
      "All short-form platforms",
      "Bi-weekly performance reports",
      "Advanced trend analysis",
      "Video production (15 videos/month)",
      "Influencer collaboration",
      "Viral content strategy",
      "Cross-platform optimization",
      "Priority support"
    ],
    ctaText: "Start Growing",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2800, yearly: 26880 },
    description: "For brands dominating short-form video",
    features: [
      "Unlimited ad spend management",
      "Full-service video management",
      "Weekly performance reports",
      "Custom viral strategies",
      "Unlimited video production",
      "Influencer partnerships",
      "Trend-jacking campaigns",
      "Multi-platform domination",
      "Dedicated account manager",
      "24/7 priority support"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  }
];

const shortVideoAdsFAQs: FAQItem[] = [
  {
    question: "What platforms do you advertise on?",
    answer: "We manage short-form video ads across TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels. We optimize campaigns for each platform's unique algorithm and audience to maximize reach and engagement."
  },
  {
    question: "Do you create the short-form video content?",
    answer: "Yes! Our team specializes in creating viral-worthy short-form content. We handle concept development, filming, editing, and optimization for each platform. We create thumb-stopping videos that capture attention in the first 3 seconds."
  },
  {
    question: "How much should I budget for short video ads?",
    answer: "We recommend starting with at least $7,000-$10,000/month for ad spend, plus our management fee. Short-form video ads typically have excellent CPMs and engagement rates, making them cost-effective for reaching younger demographics."
  },
  {
    question: "How do you keep up with trends?",
    answer: "Our team monitors trending sounds, hashtags, and formats daily across all platforms. We use trend-jacking strategies to capitalize on viral moments and create content that resonates with current platform culture while staying true to your brand."
  },
  {
    question: "Can you work with influencers?",
    answer: "Absolutely! We have partnerships with micro and macro influencers across TikTok, Instagram, and YouTube. We can coordinate influencer collaborations, manage sponsored content, and amplify influencer posts with paid advertising for maximum reach."
  },
  {
    question: "What makes your short video ads different?",
    answer: "We combine platform-native content creation with performance marketing expertise. Our team understands what makes content go viral on each platform and uses data-driven strategies to maximize views, engagement, and conversions while maintaining authentic brand voice."
  }
];

const shortVideoAdsTools: Tool[] = [
  {
    name: "TikTok",
    logo: "https://cdn.simpleicons.org/tiktok/000000"
  },
  {
    name: "Instagram",
    logo: "https://cdn.simpleicons.org/instagram/E4405F"
  },
  {
    name: "YouTube",
    logo: "https://cdn.simpleicons.org/youtube/FF0000"
  },
  {
    name: "CapCut",
    logo: "https://cdn.simpleicons.org/tiktok/000000"
  },
  {
    name: "Adobe Premiere Pro",
    logo: "https://cdn.simpleicons.org/adobepremierepro/9999FF"
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
    name: "Meta Business Suite",
    logo: "https://cdn.simpleicons.org/meta/0668E1"
  },
  {
    name: "Google Analytics",
    logo: "https://cdn.simpleicons.org/googleanalytics/E37400"
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

const shortVideoAdsFeatures: FeatureItem[] = [
  {
    icon: Smartphone,
    title: "TikTok Ads",
    description: "Create viral-worthy TikTok ads that blend seamlessly with organic content and drive massive engagement.",
  },
  {
    icon: Video,
    title: "Instagram Reels Ads",
    description: "Capture attention with scroll-stopping Reels ads optimized for Instagram's algorithm and audience.",
  },
  {
    icon: Play,
    title: "YouTube Shorts Ads",
    description: "Reach billions with engaging YouTube Shorts ads that drive views, subscribers, and conversions.",
  },
  {
    icon: Hash,
    title: "Trend-Jacking",
    description: "Capitalize on viral trends, sounds, and challenges to maximize organic reach and engagement.",
  },
  {
    icon: Repeat,
    title: "Cross-Platform Strategy",
    description: "Repurpose and optimize content across all short-form platforms for maximum ROI.",
  },
  {
    icon: TrendingUp,
    title: "Viral Optimization",
    description: "Use data-driven strategies to increase the viral potential of every video we create.",
  },
];

const shortVideoAdsProcessSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Trend Research",
    description: "Monitor trending sounds, hashtags, and formats across TikTok, Reels, and Shorts to identify viral opportunities."
  },
  {
    step: "02",
    title: "Content Creation",
    description: "Produce platform-native short-form videos that capture attention in 3 seconds and drive engagement."
  },
  {
    step: "03",
    title: "Campaign Launch",
    description: "Launch optimized campaigns across all short-form platforms with proper targeting and tracking."
  },
  {
    step: "04",
    title: "Viral Optimization",
    description: "Continuously test, optimize, and scale winning content to maximize views, engagement, and conversions."
  }
];

const whyItems: WhyChooseItem[] = [
  { 
    icon: Smartphone, 
    title: "Platform Expertise", 
    desc: "We understand the unique algorithms and cultures of TikTok, Reels, and Shorts to create native content.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Sparkles, 
    title: "Viral Content", 
    desc: "Our team creates thumb-stopping content designed to go viral and maximize organic reach.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Hash, 
    title: "Trend Mastery", 
    desc: "We stay ahead of trends and capitalize on viral moments to amplify your brand message.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Target, 
    title: "Precision Targeting", 
    desc: "Reach Gen Z and Millennials with advanced targeting based on interests, behaviors, and demographics.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: TestTube, 
    title: "Rapid Testing", 
    desc: "Quick iteration and testing to identify winning content formats and scale them fast.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: DollarSign, 
    title: "Cost-Effective", 
    desc: "Short-form video ads offer excellent CPMs and engagement rates for maximum ROI.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
];

const ShortVideoAds = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "SHORT-FORM VIDEO ADS",
      heading: "Go Viral with Short-Form Video Ads",
      description: "Dominate TikTok, Instagram Reels, and YouTube Shorts with scroll-stopping video ads. Our expert team creates viral-worthy content that drives massive engagement, brand awareness, and conversions.",
      ctaText: "Get a Free Viral Strategy",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Performance Marketing/ShortVideoAds.png",
      imageAlt: "Short Video Ads Creation",
    }}
    plans={pricingPlans}
    faqs={shortVideoAdsFAQs}
    tools={shortVideoAdsTools}
    processSteps={shortVideoAdsProcessSteps}
    whyItems={whyItems}
  />
);

export default ShortVideoAds;
