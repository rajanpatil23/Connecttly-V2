import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Users, MessageCircle, Heart, Share2, Award, Sparkles,
  Target, TrendingUp, Zap, Shield, Globe, UserPlus
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
    icon: <Users className="h-5 w-5 text-white" />,
    title: "50K+",
    subtitle: "Community members managed",
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-white" />,
    title: "92%",
    subtitle: "Member retention rate",
  },
  {
    icon: <Heart className="h-5 w-5 text-white" />,
    title: "15K+",
    subtitle: "Monthly active discussions",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "3.5x",
    subtitle: "Higher customer LTV",
  },
];

const communityFeatures: FeatureItem[] = [
  {
    icon: Users,
    title: "Community Strategy & Setup",
    description: "Design and launch engaging communities on the right platforms for your audience and goals."
  },
  {
    icon: MessageCircle,
    title: "Content & Engagement",
    description: "Create discussion topics, host events, and foster meaningful conversations that keep members active."
  },
  {
    icon: Shield,
    title: "Moderation & Management",
    description: "Professional community moderation to maintain positive culture and handle conflicts effectively."
  },
  {
    icon: Sparkles,
    title: "Member Onboarding",
    description: "Welcome new members with structured onboarding that drives engagement from day one."
  },
  {
    icon: Award,
    title: "Gamification & Rewards",
    description: "Implement badges, levels, and rewards to recognize active members and encourage participation."
  },
  {
    icon: TrendingUp,
    title: "Analytics & Growth",
    description: "Track engagement metrics, identify power users, and implement strategies to grow your community."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Users, title: "Community-First Approach", desc: "Build genuine connections that turn customers into brand advocates." },
  { icon: MessageCircle, title: "Active Engagement", desc: "Keep your community buzzing with regular content, events, and discussions." },
  { icon: Shield, title: "Professional Moderation", desc: "Maintain a positive, safe environment with experienced community managers." },
  { icon: Target, title: "Strategic Growth", desc: "Data-driven strategies to attract and retain the right members." },
  { icon: Award, title: "Member Recognition", desc: "Celebrate and reward your most engaged community members." },
  { icon: Zap, title: "Fast Setup", desc: "Launch your community quickly with our proven frameworks and templates." },
];

const communityProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Strategy & Platform Selection", 
    description: "Define community goals, identify your ideal members, and choose the best platform (Discord, Slack, Circle, etc.)." 
  },
  { 
    step: "02", 
    title: "Setup & Launch", 
    description: "Build community structure, create guidelines, design onboarding flow, and launch with founding members." 
  },
  { 
    step: "03", 
    title: "Engagement & Growth", 
    description: "Host events, create content, facilitate discussions, and implement growth strategies to attract new members." 
  },
  { 
    step: "04", 
    title: "Optimize & Scale", 
    description: "Analyze engagement data, identify what works, empower power users, and scale community operations." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1000, yearly: 9600 },
    description: "Perfect for launching your first community",
    features: [
      "Up to 500 members",
      "Community strategy & setup",
      "Platform selection guidance",
      "Basic moderation (20 hrs/month)",
      "Monthly engagement reports",
      "Member onboarding flow"
    ],
    ctaText: "Launch Community",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 2000, yearly: 19200 },
    description: "Scale your community with expert management",
    features: [
      "Up to 2,500 members",
      "Full community management",
      "Active moderation (40 hrs/month)",
      "Weekly events & activities",
      "Gamification & rewards system",
      "Advanced analytics dashboard",
      "Content calendar & planning",
      "Dedicated community manager"
    ],
    ctaText: "Scale Community",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 4000, yearly: 38400 },
    description: "Full-service community program",
    features: [
      "Unlimited members",
      "Multi-platform communities",
      "24/7 moderation coverage",
      "Custom integrations",
      "Ambassador program management",
      "White-label solutions",
      "Executive reporting",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const communityTools: Tool[] = [
  { name: "Discord", logo: "https://cdn.simpleicons.org/discord/5865F2" },
  { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
  { name: "Circle", logo: "https://logo.clearbit.com/circle.so" },
  { name: "Discourse", logo: "https://cdn.simpleicons.org/discourse/000000" },
  { name: "Mighty Networks", logo: "https://logo.clearbit.com/mightynetworks.com" },
  { name: "Tribe", logo: "https://logo.clearbit.com/tribe.so" },
  { name: "Hivebrite", logo: "https://logo.clearbit.com/hivebrite.com" },
  { name: "Common Room", logo: "https://logo.clearbit.com/commonroom.io" },
];

const communityFAQs: FAQItem[] = [
  {
    question: "What platform should we use for our community?",
    answer: "The best platform depends on your audience and goals. Discord is great for gaming and tech communities with real-time chat. Slack works well for professional communities. Circle and Mighty Networks offer all-in-one solutions with courses and content. We'll help you evaluate options based on your specific needs, budget, and where your audience already spends time."
  },
  {
    question: "How do you grow a community from zero?",
    answer: "We start with a core group of founding members (customers, fans, beta users). We create valuable content and discussions that attract similar people. We leverage your existing channels (email, social media) to invite members. We implement referral programs and make it easy for members to invite others. Growth is organic but strategic - we focus on quality over quantity to maintain engagement."
  },
  {
    question: "What does community moderation include?",
    answer: "Moderation includes: monitoring discussions for spam and inappropriate content, enforcing community guidelines, resolving conflicts between members, answering questions and facilitating discussions, welcoming new members, and maintaining a positive culture. We provide trained moderators who understand your brand and can represent you professionally."
  },
  {
    question: "How do you keep community members engaged?",
    answer: "Engagement comes from: regular valuable content and discussions, hosting events (AMAs, workshops, challenges), recognizing and rewarding active members, creating exclusive perks and early access, facilitating member-to-member connections, and responding quickly to questions and contributions. We create a content calendar and engagement strategy tailored to your community."
  },
  {
    question: "Can you integrate our community with our existing tools?",
    answer: "Yes! We can integrate communities with your CRM, email marketing, product, support system, and other tools. Common integrations include: syncing member data with your CRM, triggering emails based on community activity, connecting to your product for feature discussions, and integrating with your support system for customer help."
  },
  {
    question: "How do you measure community success?",
    answer: "Key metrics include: member growth rate, active member percentage, engagement rate (posts, comments, reactions), retention rate, time spent in community, member satisfaction scores, and business impact (support ticket reduction, product feedback, customer LTV). We provide regular reports showing these metrics and insights."
  },
  {
    question: "What if our community becomes toxic or negative?",
    answer: "Prevention is key - we establish clear guidelines from day one and enforce them consistently. We train moderators to handle conflicts professionally. If issues arise, we address them quickly: warning members, temporary bans for violations, and permanent bans for serious offenses. We also foster positive culture by highlighting good behavior and creating spaces for constructive feedback."
  },
  {
    question: "Can you help us monetize our community?",
    answer: "Absolutely! Monetization strategies include: paid membership tiers with exclusive benefits, premium content or courses, virtual events and workshops, job boards and classifieds, sponsorships and partnerships, and affiliate programs. We'll help you implement monetization that adds value without compromising community culture."
  },
];

const Community = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "COMMUNITY BUILDING",
      heading: "Build Engaged Communities That Drive Growth",
      description: "Create thriving communities where customers become advocates, support each other, and fuel your business growth through authentic connections.",
      ctaText: "Start Building",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/DemandGrowthGeneration/Community.png",
      imageAlt: "Community Engagement",
    }}
    plans={pricingPlans}
    faqs={communityFAQs}
    tools={communityTools}
    processSteps={communityProcessSteps}
    whyItems={whyItems}
  />
);

export default Community;
