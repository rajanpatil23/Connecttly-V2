import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  FileText, Mic, Video, BookOpen, MessageCircle, Star
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
    title: "100+",
    subtitle: "Executives branded",
  },
  {
    icon: <Star className="h-5 w-5 text-white" />,
    title: "500K+",
    subtitle: "Profile views generated",
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-white" />,
    title: "12%",
    subtitle: "Average engagement rate",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "5x",
    subtitle: "Increase in opportunities",
  },
];

const executiveLeadershipFeatures: FeatureItem[] = [
  {
    icon: Target,
    title: "Personal Brand Strategy",
    description: "Develop a unique personal brand that positions you as a thought leader in your industry."
  },
  {
    icon: FileText,
    title: "Thought Leadership Content",
    description: "Create compelling posts and articles that showcase your expertise and insights."
  },
  {
    icon: BookOpen,
    title: "LinkedIn Articles & Newsletters",
    description: "Publish long-form content that establishes authority and builds a loyal following."
  },
  {
    icon: Video,
    title: "Video & Multimedia Content",
    description: "Leverage video and other formats to increase engagement and reach."
  },
  {
    icon: MessageCircle,
    title: "Engagement & Networking",
    description: "Strategic engagement with industry leaders and potential clients or partners."
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Monitor profile growth, content performance, and business opportunities generated."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Strategic Positioning", desc: "Position yourself as the go-to expert in your field." },
  { icon: FileText, title: "Authentic Voice", desc: "Content that sounds like you, not a marketing agency." },
  { icon: Users, title: "Network Growth", desc: "Connect with the right people who can advance your goals." },
  { icon: Zap, title: "Time-Efficient", desc: "Build your brand without spending hours on LinkedIn daily." },
  { icon: Award, title: "Proven Results", desc: "Track record of building influential executive brands." },
  { icon: MessageCircle, title: "Opportunity Generation", desc: "Attract speaking engagements, partnerships, and opportunities." },
];

const executiveLeadershipProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Brand Discovery", 
    description: "Deep dive into your expertise, goals, and unique value proposition to define your personal brand." 
  },
  { 
    step: "02", 
    title: "Content Strategy", 
    description: "Develop content themes, posting schedule, and engagement strategy aligned with your goals." 
  },
  { 
    step: "03", 
    title: "Content Creation & Publishing", 
    description: "Create and publish thought leadership content consistently to build your presence." 
  },
  { 
    step: "04", 
    title: "Engagement & Growth", 
    description: "Strategic networking, engagement, and optimization to maximize reach and opportunities." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1000, yearly: 9600 },
    description: "Perfect for building executive presence",
    features: [
      "3-4 posts per week",
      "Personal brand strategy",
      "Content creation & ghostwriting",
      "Profile optimization",
      "Monthly performance report",
      "Basic engagement support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1800, yearly: 17280 },
    description: "Scale your thought leadership",
    features: [
      "5-7 posts per week",
      "LinkedIn articles (2/month)",
      "Video content creation",
      "Strategic networking support",
      "Active engagement management",
      "Speaking opportunity sourcing",
      "Weekly strategy calls",
      "Dedicated brand manager"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 3600, yearly: 34560 },
    description: "Full-service executive branding",
    features: [
      "Daily content + newsletter",
      "Custom video production",
      "Podcast & media training",
      "Crisis management",
      "PR & media placement",
      "Executive coaching",
      "White-glove service",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const executiveLeadershipTools: Tool[] = [
  { name: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "Adobe Premiere", logo: "https://cdn.simpleicons.org/adobe/FF0000" },
  { name: "Grammarly", logo: "https://logo.clearbit.com/grammarly.com" },
  { name: "Hemingway", logo: "https://logo.clearbit.com/hemingwayapp.com" },
  { name: "Loom", logo: "https://logo.clearbit.com/loom.com" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Shield Analytics", logo: "https://logo.clearbit.com/shieldapp.ai" },
];

const executiveLeadershipFAQs: FAQItem[] = [
  {
    question: "Why should executives invest in personal branding on LinkedIn?",
    answer: "A strong personal brand on LinkedIn: opens doors to speaking engagements and media opportunities, attracts top talent and partners, builds trust with customers and investors, positions you as an industry thought leader, and generates inbound business opportunities. In today's digital-first world, your LinkedIn presence is often the first impression. 92% of B2B buyers engage with thought leaders before making purchase decisions."
  },
  {
    question: "How much time do I need to invest?",
    answer: "Minimal! We handle 95% of the work. Your time commitment is typically: 30-60 minutes for initial brand discovery, 15-30 minutes weekly to review and approve content, occasional 15-minute calls for input on specific topics. We ghostwrite content in your voice, so it sounds authentic without requiring hours of your time. Many executives spend just 2-3 hours per month total."
  },
  {
    question: "Will the content sound like me or like a marketing agency?",
    answer: "It will sound like you! We start with deep discovery to understand your voice, perspectives, and communication style. We study your existing content, interview you, and learn your unique insights. Then we ghostwrite content that captures your authentic voice. You review and approve everything before it goes live, and we refine based on your feedback until it's perfect."
  },
  {
    question: "What topics should I post about?",
    answer: "We develop content themes based on: your unique expertise and insights, industry trends and hot topics, your company's strategic priorities, questions your audience is asking, and your personal interests and passions. The best executive content mixes professional insights with personal stories and lessons learned. We'll create a content strategy that positions you as a thought leader while staying authentic."
  },
  {
    question: "How do you measure success?",
    answer: "Key metrics include: profile views and follower growth, post impressions and engagement rates, inbound connection requests and messages, speaking invitations and media requests, business opportunities generated, and brand sentiment. We provide monthly reports showing these metrics plus qualitative feedback (comments, messages, opportunities). Most executives see significant results within 3-6 months."
  },
  {
    question: "Can you help with video content?",
    answer: "Yes! Video is one of the most engaging formats on LinkedIn. We can: script and storyboard video content, provide filming guidance and best practices, edit and produce professional videos, create video series and recurring formats, and optimize videos for LinkedIn's algorithm. Video posts typically get 5x more engagement than text posts. We make it easy - you just need to record, we handle the rest."
  },
  {
    question: "What if I'm not comfortable being so visible?",
    answer: "That's common! Many executives are initially hesitant about personal branding. We start slowly and build confidence over time. You control what gets published and can start with less personal content. As you see positive responses, most executives become more comfortable. We also provide media training and coaching to help you develop your on-camera presence and public speaking skills."
  },
  {
    question: "How is this different from having a PR agency?",
    answer: "We're complementary to PR but focused specifically on LinkedIn and digital thought leadership. PR agencies focus on traditional media placements (articles, interviews, press releases). We focus on building your owned audience on LinkedIn where you control the narrative. Many executives work with both - PR for external media, us for LinkedIn presence. Together, they create a powerful personal brand."
  },
];

const ExecutiveLeadership = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "EXECUTIVE BRANDING & THOUGHT LEADERSHIP",
      heading: "Build Your Personal Brand as an Industry Leader",
      description: "Position yourself as a thought leader on LinkedIn. We handle the content creation and strategy so you can focus on running your business.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/linkedin-growth/ExecutiveLeadership.png",
      imageAlt: "Executive Leadership",
    }}
    plans={pricingPlans}
    faqs={executiveLeadershipFAQs}
    tools={executiveLeadershipTools}
    processSteps={executiveLeadershipProcessSteps}
    whyItems={whyItems}
  />
);

export default ExecutiveLeadership;
