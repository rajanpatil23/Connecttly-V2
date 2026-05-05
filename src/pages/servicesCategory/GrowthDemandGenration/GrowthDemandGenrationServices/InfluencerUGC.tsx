import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Users, TrendingUp, Video, Heart, Share2, Star,
  Camera, MessageCircle, Award, Zap, Target, BarChart3
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
    title: "1000+",
    subtitle: "Influencer partnerships",
  },
  {
    icon: <Video className="h-5 w-5 text-white" />,
    title: "5M+",
    subtitle: "Content impressions",
  },
  {
    icon: <Heart className="h-5 w-5 text-white" />,
    title: "8.5%",
    subtitle: "Average engagement rate",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "4.2x",
    subtitle: "ROI on campaigns",
  },
];

const influencerFeatures: FeatureItem[] = [
  {
    icon: Users,
    title: "Influencer Discovery & Vetting",
    description: "Find and vet authentic influencers who align with your brand values and target audience."
  },
  {
    icon: MessageCircle,
    title: "Campaign Strategy & Briefs",
    description: "Develop compelling campaign concepts and detailed creator briefs for maximum impact."
  },
  {
    icon: Video,
    title: "Content Creation & Management",
    description: "Coordinate content creation, review, and approval across multiple creators simultaneously."
  },
  {
    icon: Share2,
    title: "UGC Content Library",
    description: "Build a library of authentic user-generated content for use across all marketing channels."
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Monitor campaign performance with detailed analytics on reach, engagement, and conversions."
  },
  {
    icon: Award,
    title: "Creator Relationship Management",
    description: "Manage ongoing relationships with top-performing creators for long-term partnerships."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Authentic Partnerships", desc: "Connect with creators who genuinely resonate with your brand and audience." },
  { icon: Video, title: "High-Quality Content", desc: "Professional content creation that drives engagement and conversions." },
  { icon: Users, title: "Diverse Creator Network", desc: "Access to micro, mid-tier, and macro influencers across all platforms." },
  { icon: BarChart3, title: "Data-Driven Selection", desc: "Use analytics and audience insights to choose the right creators." },
  { icon: Zap, title: "Fast Execution", desc: "Launch campaigns quickly with our streamlined creator management process." },
  { icon: Award, title: "Proven Results", desc: "Track record of successful campaigns with measurable ROI." },
];

const influencerProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Discovery & Strategy", 
    description: "Identify campaign goals, target audience, and discover relevant creators who align with your brand." 
  },
  { 
    step: "02", 
    title: "Outreach & Negotiation", 
    description: "Connect with creators, negotiate terms, and establish clear campaign guidelines and deliverables." 
  },
  { 
    step: "03", 
    title: "Content Creation", 
    description: "Coordinate content creation, provide feedback, and ensure brand alignment before publishing." 
  },
  { 
    step: "04", 
    title: "Launch & Optimize", 
    description: "Publish content, monitor performance, and optimize based on engagement and conversion data." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 800, yearly: 7680 },
    description: "Perfect for testing influencer marketing",
    features: [
      "5-10 micro-influencers",
      "Campaign strategy & briefs",
      "Creator discovery & vetting",
      "Content review & approval",
      "Basic performance reporting",
      "1 campaign per month"
    ],
    ctaText: "Start Campaign",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1600, yearly: 15360 },
    description: "Scale your influencer marketing efforts",
    features: [
      "15-25 creators (micro to mid-tier)",
      "Multi-platform campaigns",
      "UGC content library",
      "Advanced analytics dashboard",
      "Content rights management",
      "2-3 campaigns per month",
      "Creator relationship management",
      "Dedicated campaign manager"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 3200, yearly: 30720 },
    description: "Full-service influencer marketing program",
    features: [
      "50+ creators (all tiers)",
      "Always-on campaigns",
      "Custom content production",
      "Influencer events & activations",
      "White-label reporting",
      "Unlimited campaigns",
      "Long-term creator partnerships",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const influencerTools: Tool[] = [
  { name: "AspireIQ", logo: "https://logo.clearbit.com/aspireiq.com" },
  { name: "Grin", logo: "https://logo.clearbit.com/grin.co" },
  { name: "CreatorIQ", logo: "https://logo.clearbit.com/creatoriq.com" },
  { name: "Instagram", logo: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: "TikTok", logo: "https://cdn.simpleicons.org/tiktok/000000" },
  { name: "YouTube", logo: "https://cdn.simpleicons.org/youtube/FF0000" },
  { name: "HypeAuditor", logo: "https://logo.clearbit.com/hypeauditor.com" },
  { name: "Upfluence", logo: "https://logo.clearbit.com/upfluence.com" },
];

const influencerFAQs: FAQItem[] = [
  {
    question: "What's the difference between influencer marketing and UGC?",
    answer: "Influencer marketing involves partnering with creators who have established audiences to promote your brand. UGC (User-Generated Content) is authentic content created by customers or creators that you can repurpose across your marketing channels. We help with both - finding influencers for reach and engagement, and collecting UGC for authentic social proof."
  },
  {
    question: "How do you find and vet influencers?",
    answer: "We use a combination of influencer discovery platforms, manual research, and data analysis. We vet creators based on: audience authenticity (checking for fake followers), engagement rates, audience demographics, content quality, brand alignment, and past campaign performance. We also review their content history to ensure brand safety."
  },
  {
    question: "What platforms do you work with?",
    answer: "We manage influencer campaigns across all major platforms: Instagram, TikTok, YouTube, Twitter/X, LinkedIn, and emerging platforms. We'll recommend the best platforms based on your target audience and campaign goals."
  },
  {
    question: "How much do influencers cost?",
    answer: "Costs vary widely based on follower count, engagement rate, platform, and content type. Micro-influencers (10K-100K followers) typically charge $100-$1,000 per post. Mid-tier (100K-500K) range from $1,000-$10,000. Macro influencers (500K+) can charge $10,000-$100,000+. We negotiate competitive rates and can work within your budget."
  },
  {
    question: "Do we own the content creators make?",
    answer: "Content rights are negotiated as part of each partnership. Typically, creators retain ownership but grant you usage rights for a specified period and channels. We can negotiate full buyouts for additional fees if you need unlimited usage rights. All agreements are clearly documented in contracts."
  },
  {
    question: "How do you measure influencer campaign success?",
    answer: "We track multiple metrics: reach and impressions, engagement rate (likes, comments, shares), click-through rates, conversions and sales (using tracking links/codes), cost per engagement, ROI, and brand sentiment. We provide detailed reports showing which creators and content types perform best."
  },
  {
    question: "Can you help us build long-term creator relationships?",
    answer: "Absolutely! Long-term partnerships often perform better than one-off campaigns. We help identify top-performing creators, negotiate ongoing agreements, manage regular content calendars, and nurture relationships. Many of our clients have brand ambassador programs with their best creators."
  },
  {
    question: "What if an influencer doesn't deliver or creates poor content?",
    answer: "We have safeguards in place: detailed contracts with deliverable requirements, content approval processes before publishing, and payment terms tied to deliverables. If issues arise, we handle communication and resolution. We also maintain backup creator lists to ensure campaign timelines are met."
  },
];

const InfluencerUGC = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "INFLUENCER & UGC MARKETING",
      heading: "Authentic Creators That Drive Real Results",
      description: "Partner with influencers and leverage user-generated content to build trust, increase engagement, and drive conversions at scale.",
      ctaText: "Launch Campaign",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/demand-growth-generation/InfluencerandUGC.png",
      imageAlt: "Influencer Content Creation",
    }}
    plans={pricingPlans}
    faqs={influencerFAQs}
    tools={influencerTools}
    processSteps={influencerProcessSteps}
    whyItems={whyItems}
  />
);

export default InfluencerUGC;
