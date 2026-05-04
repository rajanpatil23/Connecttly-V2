import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  FileText, Lightbulb, Map, Calendar, CheckCircle, BookOpen
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
    icon: <FileText className="h-5 w-5 text-white" />,
    title: "500+",
    subtitle: "Strategies created",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "3x",
    subtitle: "Content performance",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "10M+",
    subtitle: "Audience reached",
  },
  {
    icon: <Award className="h-5 w-5 text-white" />,
    title: "95%",
    subtitle: "Client satisfaction",
  },
];

const contentStrategyFeatures: FeatureItem[] = [
  {
    icon: Lightbulb,
    title: "Strategic Content Planning",
    description: "Comprehensive content strategies aligned with your business goals and audience needs."
  },
  {
    icon: Map,
    title: "Content Roadmap Development",
    description: "Detailed roadmaps outlining content themes, topics, and distribution channels."
  },
  {
    icon: Target,
    title: "Audience Research & Personas",
    description: "Deep audience analysis to create content that resonates with your ideal customers."
  },
  {
    icon: Calendar,
    title: "Editorial Calendar Management",
    description: "Organized content calendars ensuring consistent, timely content delivery."
  },
  {
    icon: BarChart3,
    title: "Content Performance Analysis",
    description: "Data-driven insights to optimize content strategy and maximize ROI."
  },
  {
    icon: BookOpen,
    title: "Content Governance & Guidelines",
    description: "Brand voice guidelines and content standards for consistency across channels."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Strategic Approach", desc: "Data-driven strategies that align content with business objectives." },
  { icon: Users, title: "Audience-First", desc: "Content strategies built around your audience's needs and behaviors." },
  { icon: Zap, title: "Proven Results", desc: "Track record of 3x content performance improvements." },
  { icon: Map, title: "Clear Roadmaps", desc: "Actionable plans that guide content creation and distribution." },
  { icon: BarChart3, title: "Data-Driven", desc: "Strategies informed by analytics and market research." },
  { icon: Award, title: "Expert Strategists", desc: "Team of experienced content strategists and marketers." },
];

const contentStrategyProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Discovery & Research", 
    description: "Analyze your business, audience, competitors, and current content performance." 
  },
  { 
    step: "02", 
    title: "Strategy Development", 
    description: "Create comprehensive content strategy with themes, topics, and distribution plan." 
  },
  { 
    step: "03", 
    title: "Roadmap & Calendar", 
    description: "Develop detailed content roadmap and editorial calendar for execution." 
  },
  { 
    step: "04", 
    title: "Implementation & Optimization", 
    description: "Execute strategy, measure performance, and continuously optimize for results." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1000, yearly: 9600 },
    description: "Essential content strategy",
    features: [
      "Content audit & analysis",
      "Basic content strategy",
      "3-month content roadmap",
      "Editorial calendar",
      "Audience personas (2)",
      "Monthly strategy review"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1800, yearly: 17280 },
    description: "Comprehensive content strategy",
    features: [
      "In-depth content audit",
      "Advanced content strategy",
      "6-month content roadmap",
      "Multi-channel calendar",
      "Audience personas (5)",
      "Content guidelines",
      "Performance tracking",
      "Bi-weekly strategy calls"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 3200, yearly: 30720 },
    description: "Enterprise content strategy",
    features: [
      "Comprehensive audit",
      "Multi-brand strategy",
      "12-month roadmap",
      "Global content calendar",
      "Unlimited personas",
      "Content governance",
      "Advanced analytics",
      "Weekly strategy sessions",
      "Dedicated strategist"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const contentStrategyTools: Tool[] = [
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "SEMrush", logo: "https://cdn.simpleicons.org/semrush/FF642D" },
  { name: "Ahrefs", logo: "https://logo.clearbit.com/ahrefs.com" },
  { name: "BuzzSumo", logo: "https://logo.clearbit.com/buzzsumo.com" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion/000000" },
  { name: "Asana", logo: "https://cdn.simpleicons.org/asana/F06A6A" },
  { name: "Google Trends", logo: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
];

const contentStrategyFAQs: FAQItem[] = [
  {
    question: "What is content strategy and why do I need it?",
    answer: "Content strategy is a comprehensive plan for creating, publishing, and managing content that achieves your business goals. Without strategy, content efforts are scattered and ineffective. A good strategy ensures: every piece of content serves a purpose, content aligns with audience needs, resources are used efficiently, and you can measure and improve results. Most companies waste 60-70% of content budget on ineffective content - strategy fixes this."
  },
  {
    question: "What's included in a content strategy?",
    answer: "A comprehensive content strategy includes: audience research and personas, content audit and gap analysis, content themes and topics, content types and formats, distribution channels and tactics, editorial calendar and workflow, content governance and guidelines, KPIs and measurement framework, and resource and budget planning. You'll receive a detailed strategy document plus actionable roadmap."
  },
  {
    question: "How long does it take to develop a content strategy?",
    answer: "Strategy development typically takes 4-6 weeks: Week 1-2: Discovery, research, and audit, Week 3-4: Strategy development and roadmap creation, Week 5-6: Refinement and presentation. Complex strategies (multi-brand, global) may take 8-10 weeks. You'll see the strategy document and roadmap by week 4, with final refinements based on your feedback."
  },
  {
    question: "How do you research our audience?",
    answer: "We use multiple research methods: analyze your existing customer data and analytics, conduct surveys and interviews with customers, review competitor content and audience engagement, analyze search trends and social listening, create detailed buyer personas, and map customer journey touchpoints. This gives us deep understanding of what content your audience needs at each stage."
  },
  {
    question: "Can you help implement the strategy?",
    answer: "Yes! We offer implementation support: content creation services, editorial calendar management, content distribution and promotion, performance tracking and reporting, and ongoing strategy optimization. Many clients start with strategy development, then add implementation services. We can also train your team to execute the strategy internally."
  },
  {
    question: "How do you measure content strategy success?",
    answer: "We track metrics aligned with your goals: traffic and engagement (views, time on page, shares), lead generation (conversions, MQLs, SQLs), SEO performance (rankings, organic traffic), brand awareness (reach, mentions, sentiment), and revenue impact (influenced revenue, customer acquisition cost). We provide monthly reports showing progress against KPIs and recommendations for optimization."
  },
  {
    question: "What if our industry is very niche?",
    answer: "We specialize in niche B2B industries! Our process includes: deep industry research and competitive analysis, subject matter expert interviews, technical content development, and industry-specific content formats. We've created strategies for highly technical industries (SaaS, manufacturing, healthcare, finance) and understand how to create content that resonates with specialized audiences."
  },
  {
    question: "How often should content strategy be updated?",
    answer: "We recommend quarterly reviews and annual strategy updates. Markets, audiences, and algorithms change constantly. Quarterly reviews allow us to: analyze performance data, adjust tactics based on results, incorporate new trends and opportunities, and refine messaging and positioning. Annual updates involve comprehensive strategy refresh with new research and roadmap."
  },
];

const ContentStrategy = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "CONTENT STRATEGY",
      heading: "Strategic Content Planning That Drives Real Business Results",
      description: "Comprehensive content strategies that align with your business goals, resonate with your audience, and deliver measurable ROI.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Content Creative/ContentStratergy.png",
      imageAlt: "Content Strategy",
    }}
    plans={pricingPlans}
    faqs={contentStrategyFAQs}
    tools={contentStrategyTools}
    processSteps={contentStrategyProcessSteps}
    whyItems={whyItems}
  />
);

export default ContentStrategy;
