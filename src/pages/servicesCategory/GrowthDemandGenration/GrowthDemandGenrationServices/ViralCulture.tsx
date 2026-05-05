import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Zap, TrendingUp, Share2, Eye, Sparkles, Rocket,
  Target, Users, Video, MessageCircle, Award, BarChart3
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
    icon: <Eye className="h-5 w-5 text-white" />,
    title: "100M+",
    subtitle: "Viral impressions generated",
  },
  {
    icon: <Share2 className="h-5 w-5 text-white" />,
    title: "2.5M+",
    subtitle: "Organic shares",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "15+",
    subtitle: "Viral campaigns launched",
  },
  {
    icon: <Zap className="h-5 w-5 text-white" />,
    title: "8.2%",
    subtitle: "Average engagement rate",
  },
];

const viralFeatures: FeatureItem[] = [
  {
    icon: Sparkles,
    title: "Viral Content Strategy",
    description: "Develop content strategies designed to maximize shareability and organic reach across platforms."
  },
  {
    icon: Video,
    title: "Trend Identification & Hijacking",
    description: "Monitor trends in real-time and create timely content that rides viral waves for maximum exposure."
  },
  {
    icon: MessageCircle,
    title: "Meme & Cultural Marketing",
    description: "Create culturally relevant memes and content that resonates with your audience's sense of humor."
  },
  {
    icon: Share2,
    title: "Social Seeding & Amplification",
    description: "Strategic content distribution to spark initial engagement and trigger viral sharing loops."
  },
  {
    icon: Users,
    title: "Community Activation",
    description: "Mobilize your community and brand advocates to amplify content and drive organic reach."
  },
  {
    icon: BarChart3,
    title: "Viral Performance Tracking",
    description: "Monitor content performance in real-time and optimize for maximum viral potential."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Zap, title: "Viral Expertise", desc: "Deep understanding of what makes content shareable and how virality works." },
  { icon: Sparkles, title: "Creative Excellence", desc: "Award-winning creative team that knows how to capture attention." },
  { icon: Target, title: "Strategic Approach", desc: "Data-driven strategies combined with creative intuition for viral success." },
  { icon: TrendingUp, title: "Trend Mastery", desc: "Stay ahead of trends and capitalize on viral moments as they happen." },
  { icon: Users, title: "Community-Driven", desc: "Leverage community power to amplify reach and drive organic sharing." },
  { icon: Award, title: "Proven Track Record", desc: "Portfolio of successful viral campaigns across multiple industries." },
];

const viralProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Trend Research & Ideation", 
    description: "Analyze current trends, audience behavior, and cultural moments to identify viral opportunities." 
  },
  { 
    step: "02", 
    title: "Content Creation", 
    description: "Develop highly shareable content optimized for each platform's algorithm and audience preferences." 
  },
  { 
    step: "03", 
    title: "Strategic Seeding", 
    description: "Launch content with strategic seeding to key communities and influencers to spark initial momentum." 
  },
  { 
    step: "04", 
    title: "Amplify & Optimize", 
    description: "Monitor performance, amplify winning content, and optimize based on real-time engagement data." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1400, yearly: 13440 },
    description: "Test viral marketing with focused campaigns",
    features: [
      "2-3 viral campaigns per month",
      "Trend monitoring & analysis",
      "Content strategy & ideation",
      "Platform-optimized content",
      "Basic seeding & distribution",
      "Performance reporting"
    ],
    ctaText: "Go Viral",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 2800, yearly: 26880 },
    description: "Scale viral reach with multiple campaigns",
    features: [
      "5-7 viral campaigns per month",
      "Real-time trend hijacking",
      "Meme & cultural content",
      "Influencer seeding network",
      "Community activation",
      "Advanced analytics",
      "A/B testing & optimization",
      "Dedicated viral strategist"
    ],
    ctaText: "Scale Virality",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 6000, yearly: 57600 },
    description: "Full-service viral marketing program",
    features: [
      "Unlimited viral campaigns",
      "24/7 trend monitoring",
      "Custom content production",
      "Celebrity/macro influencer access",
      "PR & media amplification",
      "Crisis management",
      "White-label reporting",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const viralTools: Tool[] = [
  { name: "TikTok", logo: "https://cdn.simpleicons.org/tiktok/000000" },
  { name: "Instagram", logo: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: "Twitter", logo: "https://cdn.simpleicons.org/x/000000" },
  { name: "YouTube", logo: "https://cdn.simpleicons.org/youtube/FF0000" },
  { name: "Reddit", logo: "https://cdn.simpleicons.org/reddit/FF4500" },
  { name: "BuzzSumo", logo: "https://logo.clearbit.com/buzzsumo.com" },
  { name: "Sprout Social", logo: "https://logo.clearbit.com/sproutsocial.com" },
  { name: "Hootsuite", logo: "https://cdn.simpleicons.org/hootsuite/000000" },
];

const viralFAQs: FAQItem[] = [
  {
    question: "Can you guarantee content will go viral?",
    answer: "No one can guarantee virality - it depends on many factors including timing, audience mood, and platform algorithms. However, we use proven strategies and frameworks that significantly increase the probability of viral success. We study what makes content shareable, optimize for platform algorithms, and use strategic seeding to give content the best chance of taking off."
  },
  {
    question: "What makes content go viral?",
    answer: "Viral content typically has several elements: strong emotional trigger (humor, surprise, awe), high shareability (easy to understand and share), cultural relevance (taps into current trends or conversations), visual appeal (eye-catching and platform-optimized), and timing (posted when audience is most active). We combine these elements strategically in every campaign."
  },
  {
    question: "Which platforms are best for viral content?",
    answer: "Different platforms have different viral potential: TikTok has the highest viral coefficient with its algorithm favoring new creators. Instagram Reels can reach massive audiences quickly. Twitter/X is best for text-based viral moments and trending topics. YouTube Shorts is growing rapidly. Reddit can drive massive traffic if you hit the right subreddit. We'll recommend platforms based on your audience and content type."
  },
  {
    question: "How long does it take for content to go viral?",
    answer: "Viral content typically takes off within 24-72 hours if it's going to happen. TikTok can be faster (hours), while YouTube might take longer (days to weeks). We monitor content closely in the first 48 hours and can amplify if we see early traction. Some content also has a 'second wave' of virality weeks later when it's rediscovered."
  },
  {
    question: "What if viral content attracts negative attention?",
    answer: "We have crisis management protocols in place. Before launching, we assess potential risks and have response plans ready. If negative attention occurs, we can: pause or remove content quickly, issue clarifications or apologies if needed, redirect conversation positively, and leverage the attention constructively. We also monitor comments and sentiment in real-time."
  },
  {
    question: "How do you measure viral campaign success?",
    answer: "Key metrics include: total reach and impressions, share rate and viral coefficient, engagement rate (likes, comments, saves), traffic driven to your website/landing pages, new followers gained, media mentions and PR value, and ultimately conversions and ROI. We track both vanity metrics (reach) and business metrics (conversions)."
  },
  {
    question: "Can B2B companies benefit from viral marketing?",
    answer: "Absolutely! B2B viral content works differently than B2C but can be very effective. Successful B2B viral content often: educates while entertaining, taps into industry pain points with humor, showcases thought leadership in creative ways, or humanizes the brand. LinkedIn is particularly effective for B2B viral content. We've helped many B2B brands achieve viral success."
  },
  {
    question: "What's the difference between viral marketing and regular social media marketing?",
    answer: "Regular social media marketing focuses on consistent, steady growth through regular posting and engagement. Viral marketing aims for explosive, exponential reach through highly shareable content that spreads organically. Viral campaigns are higher risk/higher reward - they might not always work, but when they do, the ROI is massive. We recommend a mix of both approaches."
  },
];

const ViralCulture = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "VIRAL & CULTURAL MARKETING",
      heading: "Create Content That Spreads Like Wildfire",
      description: "Harness the power of viral marketing and cultural trends to achieve explosive organic reach and turn your brand into a cultural phenomenon.",
      ctaText: "Go Viral",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/demand-growth-generation/ViralCulture.png",
      imageAlt: "Viral Content Creation",
    }}
    plans={pricingPlans}
    faqs={viralFAQs}
    tools={viralTools}
    processSteps={viralProcessSteps}
    whyItems={whyItems}
  />
);

export default ViralCulture;
