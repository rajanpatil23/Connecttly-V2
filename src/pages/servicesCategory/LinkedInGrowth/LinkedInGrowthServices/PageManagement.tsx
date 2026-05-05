import heroIllustration from "@/assets/_zip/services/illu-page-management.png";
import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  FileText, Image, Calendar, MessageCircle, Eye, ThumbsUp
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
    title: "500K+",
    subtitle: "Followers managed",
  },
  {
    icon: <Eye className="h-5 w-5 text-white" />,
    title: "10M+",
    subtitle: "Monthly impressions",
  },
  {
    icon: <ThumbsUp className="h-5 w-5 text-white" />,
    title: "8.5%",
    subtitle: "Average engagement rate",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "3.2x",
    subtitle: "Follower growth rate",
  },
];

const pageManagementFeatures: FeatureItem[] = [
  {
    icon: FileText,
    title: "Content Strategy & Planning",
    description: "Develop comprehensive content strategies aligned with your business goals and audience interests."
  },
  {
    icon: Image,
    title: "Content Creation & Design",
    description: "Create engaging posts, articles, and visuals that capture attention and drive engagement."
  },
  {
    icon: Calendar,
    title: "Publishing & Scheduling",
    description: "Consistent posting schedule optimized for maximum reach and engagement."
  },
  {
    icon: MessageCircle,
    title: "Community Management",
    description: "Respond to comments, engage with followers, and build meaningful relationships."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Track performance metrics and provide insights to continuously improve results."
  },
  {
    icon: Users,
    title: "Employee Advocacy",
    description: "Amplify reach by activating employees to share and engage with company content."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Strategic Approach", desc: "Data-driven content strategy aligned with your business objectives." },
  { icon: FileText, title: "Quality Content", desc: "Professional content that positions your brand as a thought leader." },
  { icon: Users, title: "Audience Growth", desc: "Proven tactics to grow your follower base with relevant professionals." },
  { icon: MessageCircle, title: "Active Engagement", desc: "Build a community through consistent engagement and conversations." },
  { icon: BarChart3, title: "Measurable Results", desc: "Clear metrics and reporting to track ROI and performance." },
  { icon: Zap, title: "Consistent Presence", desc: "Maintain an active, professional presence without the time commitment." },
];

const pageManagementProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Strategy & Audit", 
    description: "Audit current page, define goals, identify target audience, and create content strategy." 
  },
  { 
    step: "02", 
    title: "Content Creation", 
    description: "Develop content calendar, create posts and visuals, and prepare publishing schedule." 
  },
  { 
    step: "03", 
    title: "Publishing & Engagement", 
    description: "Post content consistently, engage with audience, and respond to comments and messages." 
  },
  { 
    step: "04", 
    title: "Analyze & Optimize", 
    description: "Track performance, analyze what works, and continuously refine strategy." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 800, yearly: 7680 },
    description: "Perfect for establishing LinkedIn presence",
    features: [
      "3-4 posts per week",
      "Content strategy & calendar",
      "Basic graphic design",
      "Community management (10 hrs/month)",
      "Monthly analytics report",
      "Page optimization"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1400, yearly: 13440 },
    description: "Scale your LinkedIn presence",
    features: [
      "5-7 posts per week",
      "Advanced content strategy",
      "Professional design & video",
      "LinkedIn articles (2/month)",
      "Active community management",
      "Employee advocacy program",
      "Weekly analytics & optimization",
      "Dedicated account manager"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2800, yearly: 26880 },
    description: "Full-service LinkedIn page management",
    features: [
      "Daily posting + LinkedIn articles",
      "Custom content production",
      "Video content creation",
      "Influencer collaborations",
      "Crisis management",
      "Advanced analytics & insights",
      "Executive reporting",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const pageManagementTools: Tool[] = [
  { name: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "Adobe Creative Cloud", logo: "https://cdn.simpleicons.org/adobe/FF0000" },
  { name: "Hootsuite", logo: "https://cdn.simpleicons.org/hootsuite/000000" },
  { name: "Connecttly", logo: "" },
  { name: "Sprout Social", logo: "https://logo.clearbit.com/sproutsocial.com" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Agorapulse", logo: "https://logo.clearbit.com/agorapulse.com" },
];

const pageManagementFAQs: FAQItem[] = [
  {
    question: "How often should we post on LinkedIn?",
    answer: "For optimal results, we recommend posting 3-5 times per week. This keeps your page active and visible without overwhelming your audience. The key is consistency - it's better to post 3 times per week consistently than to post daily for a month and then go silent. We'll develop a posting schedule based on when your audience is most active."
  },
  {
    question: "What type of content performs best on LinkedIn?",
    answer: "Top-performing content types include: thought leadership articles and insights, industry news and trends, company updates and milestones, employee spotlights and culture posts, educational content (how-tos, tips), and engaging questions that spark discussion. We mix these formats to keep your feed diverse and engaging while aligning with your business goals."
  },
  {
    question: "Do you create the content or do we need to provide it?",
    answer: "We handle all content creation! We'll work with you initially to understand your brand voice, key messages, and content themes. Then we create all posts, graphics, and articles. You'll have approval rights before anything goes live. We may occasionally ask for input on specific topics or company news, but the heavy lifting is on us."
  },
  {
    question: "How do you grow our follower count?",
    answer: "We use multiple growth strategies: posting high-quality, shareable content consistently, optimizing your page for search and discovery, engaging with relevant content in your industry, encouraging employee advocacy and sharing, running targeted LinkedIn Ads (if budget allows), and participating in relevant LinkedIn groups and discussions. Growth is organic and sustainable, typically 10-30% per month."
  },
  {
    question: "Will you respond to comments and messages?",
    answer: "Yes! Community management is included. We monitor and respond to comments on your posts, engage with followers' content, and handle general inquiries via LinkedIn messages. For sales inquiries or specific questions requiring internal knowledge, we'll route them to the appropriate person on your team with context."
  },
  {
    question: "How do you measure success?",
    answer: "Key metrics we track include: follower growth rate, post impressions and reach, engagement rate (likes, comments, shares), click-through rates to your website, lead generation (if applicable), and brand awareness metrics. We provide monthly reports showing these metrics, insights on what's working, and recommendations for improvement."
  },
  {
    question: "Can you help with employee advocacy?",
    answer: "Absolutely! Employee advocacy is one of the most effective ways to amplify your reach. We can: create shareable content for employees, provide guidelines and training, set up an employee advocacy program, track employee engagement and impact, and recognize top advocates. When employees share company content, it reaches 10x more people than company page posts alone."
  },
  {
    question: "What if we want to post about something timely or urgent?",
    answer: "We're flexible! While we work from a planned content calendar, we can quickly create and post timely content when needed. For urgent posts, we have a rapid approval process. You can also request specific posts at any time. We typically need 24-48 hours for standard posts, but can turn around urgent posts in a few hours if needed."
  },
];

const PageManagement = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "LINKEDIN PAGE MANAGEMENT",
      heading: "Professional LinkedIn Page Management That Drives Results",
      description: "Build your brand, engage your audience, and generate leads with expert LinkedIn page management. We handle everything so you can focus on your business.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: heroIllustration,
      imageAlt: "LinkedIn Page Management",
    }}
    plans={pricingPlans}
    faqs={pageManagementFAQs}
    tools={pageManagementTools}
    processSteps={pageManagementProcessSteps}
    whyItems={whyItems}
  />
);

export default PageManagement;
