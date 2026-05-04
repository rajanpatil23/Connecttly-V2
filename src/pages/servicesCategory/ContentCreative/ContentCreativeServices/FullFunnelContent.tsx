import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Filter, Layers, Package, CheckCircle, ArrowRight, Crown
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
    icon: <Package className="h-5 w-5 text-white" />,
    title: "All-in-One",
    subtitle: "Complete content solution",
  },
  {
    icon: <Layers className="h-5 w-5 text-white" />,
    title: "100+",
    subtitle: "Content pieces/month",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "5x",
    subtitle: "Pipeline growth",
  },
  {
    icon: <Award className="h-5 w-5 text-white" />,
    title: "50+",
    subtitle: "Brands served",
  },
];

const fullFunnelFeatures: FeatureItem[] = [
  {
    icon: Filter,
    title: "Top of Funnel (TOFU)",
    description: "Awareness content: blog posts, social media, infographics, and videos that attract prospects."
  },
  {
    icon: Layers,
    title: "Middle of Funnel (MOFU)",
    description: "Consideration content: case studies, webinars, guides, and comparisons that nurture leads."
  },
  {
    icon: Target,
    title: "Bottom of Funnel (BOFU)",
    description: "Decision content: demos, trials, proposals, and ROI calculators that close deals."
  },
  {
    icon: Package,
    title: "Integrated Strategy",
    description: "Cohesive content strategy that guides prospects through the entire buyer journey."
  },
  {
    icon: CheckCircle,
    title: "Multi-Format Content",
    description: "All content types: written, visual, video, and interactive across all channels."
  },
  {
    icon: BarChart3,
    title: "Performance Optimization",
    description: "Continuous optimization based on performance data and conversion metrics."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Package, title: "Complete Solution", desc: "All content types for every funnel stage in one package." },
  { icon: Target, title: "Strategic Approach", desc: "Content mapped to buyer journey and business goals." },
  { icon: Zap, title: "Faster Results", desc: "Integrated content drives 5x faster pipeline growth." },
  { icon: Users, title: "Dedicated Team", desc: "Full content team working on your brand." },
  { icon: Award, title: "Cost Savings", desc: "Save 40-50% vs. hiring individual specialists." },
  { icon: Crown, title: "Proven Success", desc: "Track record of transforming content marketing." },
];

const fullFunnelProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Strategy & Planning", 
    description: "Develop comprehensive content strategy mapped to buyer journey and goals." 
  },
  { 
    step: "02", 
    title: "Content Production", 
    description: "Create all content types across all funnel stages with dedicated team." 
  },
  { 
    step: "03", 
    title: "Distribution & Promotion", 
    description: "Publish and promote content across all channels for maximum reach." 
  },
  { 
    step: "04", 
    title: "Optimization & Scaling", 
    description: "Analyze performance, optimize strategy, and scale what works." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter Package",
    price: { monthly: 2000, yearly: 19200 },
    description: "Essential full-funnel content",
    features: [
      "Basic content strategy",
      "4 blog posts/month",
      "2 case studies/quarter",
      "10 social graphics/month",
      "1 video/month",
      "Sales collateral (2 pieces)",
      "Monthly reporting",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth Package",
    price: { monthly: 4000, yearly: 38400 },
    description: "Complete full-funnel content",
    features: [
      "Content strategy & planning",
      "8 blog posts/month",
      "4 case studies/quarter",
      "20 social graphics/month",
      "2 videos/month",
      "Sales collateral (4 pieces)",
      "Email templates",
      "Performance reporting",
      "Dedicated content team"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise Package",
    price: { monthly: 8000, yearly: 76800 },
    description: "Enterprise content solution",
    features: [
      "Advanced content strategy",
      "16+ blog posts/month",
      "8 case studies/quarter",
      "40+ social graphics/month",
      "4+ videos/month",
      "Complete sales enablement",
      "Whitepapers & eBooks",
      "Webinar content",
      "Multi-brand support",
      "Executive reporting",
      "Dedicated content team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const fullFunnelTools: Tool[] = [
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "SEMrush", logo: "https://cdn.simpleicons.org/semrush/FF642D" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Adobe Creative Cloud", logo: "https://cdn.simpleicons.org/adobe/FF0000" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Asana", logo: "https://cdn.simpleicons.org/asana/F06A6A" },
  { name: "WordPress", logo: "https://cdn.simpleicons.org/wordpress/21759B" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion/000000" },
];

const fullFunnelFAQs: FAQItem[] = [
  {
    question: "What's included in the Full-Funnel Content package?",
    answer: "Everything you need for complete content marketing: TOFU content (blog posts, social media, infographics, videos), MOFU content (case studies, webinars, guides, comparisons), BOFU content (sales collateral, proposals, demos), content strategy and planning, editorial calendar management, SEO optimization, design and production, distribution and promotion, and performance tracking. You get a complete content team working on your brand."
  },
  {
    question: "How is this different from hiring individual services?",
    answer: "Key advantages of full-funnel approach: integrated strategy (content works together across funnel), consistent messaging and branding, better resource efficiency, faster execution, lower total cost (40-50% savings), single point of contact, and coordinated optimization. Individual services create silos and inconsistency. Full-funnel ensures every piece supports the buyer journey and business goals."
  },
  {
    question: "How do you map content to the buyer journey?",
    answer: "We use a strategic framework: analyze your sales process and buyer personas, identify key decision points and questions, map content to each funnel stage, create content that addresses specific needs, establish conversion paths between stages, and measure effectiveness at each stage. For example: TOFU attracts with educational content, MOFU nurtures with proof and comparisons, BOFU closes with ROI and demos."
  },
  {
    question: "What results can I expect?",
    answer: "Typical results for full-funnel clients: 3-5x increase in organic traffic, 2-3x more qualified leads, 40% shorter sales cycles, 50% higher close rates, 5x pipeline growth, and 3-5x ROI on content investment. Timeline: Month 1-3: Foundation and initial content, Month 3-6: Traffic and lead growth, Month 6-12: Significant pipeline impact, Month 12+: Compounding returns. Results vary by industry and starting point."
  },
  {
    question: "How do you ensure content quality across all types?",
    answer: "We have specialists for each content type: SEO content writers, video producers, graphic designers, case study writers, and sales collateral experts. Quality process: subject matter expert input, comprehensive research, professional writing and design, multiple review stages, client approval, and performance tracking. Every piece meets high standards regardless of type."
  },
  {
    question: "Can you work with our existing content?",
    answer: "Yes! We can: audit existing content and identify gaps, refresh and optimize underperforming content, repurpose content across formats and channels, integrate with your content calendar, and build on what's working. We maximize your existing content investment while filling gaps and improving performance. Most clients have some good content that just needs optimization and amplification."
  },
  {
    question: "How do you handle content distribution?",
    answer: "We manage complete distribution: publish on your blog/website, share on social media channels, send via email marketing, promote with paid amplification, submit to relevant publications, and optimize for search engines. We also provide: content calendar, publishing schedule, promotion strategy, and performance tracking. You get content created AND distributed effectively."
  },
  {
    question: "What if we need to scale up or down?",
    answer: "Packages are flexible: scale up content volume as you grow, adjust content mix based on performance, add new content types as needed, and reduce during slower periods. We work with you to optimize content investment based on results and business needs. Most clients start with Growth package and scale to Enterprise as they see results."
  },
];

const FullFunnelContent = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "FULL-FUNNEL CONTENT",
      heading: "Complete Content Solution for Every Stage of the Buyer Journey",
      description: "Comprehensive content marketing that attracts, nurtures, and converts - all integrated and optimized for maximum impact.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Content Creative/FullFunnelContentBundle.png",
      imageAlt: "Full-Funnel Content",
    }}
    plans={pricingPlans}
    faqs={fullFunnelFAQs}
    tools={fullFunnelTools}
    processSteps={fullFunnelProcessSteps}
    whyItems={whyItems}
  />
);

export default FullFunnelContent;
