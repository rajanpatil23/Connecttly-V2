import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Image, Layers, Palette, Share2, Eye, Sparkles
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
    icon: <Image className="h-5 w-5 text-white" />,
    title: "5000+",
    subtitle: "Visuals created",
  },
  {
    icon: <Eye className="h-5 w-5 text-white" />,
    title: "50M+",
    subtitle: "Impressions generated",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "15x",
    subtitle: "Engagement increase",
  },
  {
    icon: <Share2 className="h-5 w-5 text-white" />,
    title: "3x",
    subtitle: "Share rate",
  },
];

const carouselsVisualsFeatures: FeatureItem[] = [
  {
    icon: Layers,
    title: "LinkedIn Carousels",
    description: "Engaging multi-slide carousels that drive LinkedIn engagement and thought leadership."
  },
  {
    icon: Image,
    title: "Instagram Carousels",
    description: "Eye-catching Instagram carousels optimized for swipes and saves."
  },
  {
    icon: Palette,
    title: "Infographics",
    description: "Data-driven infographics that simplify complex information visually."
  },
  {
    icon: Sparkles,
    title: "Social Media Graphics",
    description: "Branded graphics for all social platforms that stop the scroll."
  },
  {
    icon: Share2,
    title: "Quote Cards & Tips",
    description: "Shareable quote cards and tip graphics that amplify your message."
  },
  {
    icon: Eye,
    title: "Branded Templates",
    description: "Custom templates for consistent, on-brand visual content creation."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Palette, title: "Design Excellence", desc: "Award-winning designers who create scroll-stopping visuals." },
  { icon: Target, title: "Platform-Optimized", desc: "Visuals designed specifically for each social platform." },
  { icon: TrendingUp, title: "Engagement-Focused", desc: "Designs proven to drive 15x higher engagement." },
  { icon: Zap, title: "Fast Turnaround", desc: "Quick delivery without compromising quality." },
  { icon: Users, title: "Brand Consistency", desc: "Maintain consistent brand identity across all visuals." },
  { icon: Award, title: "Proven Results", desc: "Track record of viral content and high engagement." },
];

const carouselsVisualsProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Content & Strategy", 
    description: "Define content themes, messaging, and visual strategy aligned with goals." 
  },
  { 
    step: "02", 
    title: "Design & Creation", 
    description: "Create stunning visuals optimized for each platform and audience." 
  },
  { 
    step: "03", 
    title: "Review & Refinement", 
    description: "Refine designs based on feedback to ensure perfect execution." 
  },
  { 
    step: "04", 
    title: "Delivery & Optimization", 
    description: "Deliver in all formats and optimize based on performance data." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 600, yearly: 5760 },
    description: "Essential visual content",
    features: [
      "8 graphics per month",
      "Social media graphics",
      "Basic carousels (2)",
      "Brand-aligned design",
      "2 revision rounds",
      "PNG/JPG delivery"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1200, yearly: 11520 },
    description: "Comprehensive visual content",
    features: [
      "20 graphics per month",
      "All graphic types",
      "LinkedIn carousels (4)",
      "Instagram carousels (4)",
      "Infographics (2)",
      "3 revision rounds",
      "All formats",
      "Content calendar"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2400, yearly: 23040 },
    description: "Enterprise visual content",
    features: [
      "40+ graphics per month",
      "Custom visual strategy",
      "Unlimited carousels",
      "Advanced infographics",
      "Animated graphics",
      "Branded templates",
      "Unlimited revisions",
      "Priority support",
      "Dedicated designer"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const carouselsVisualsTools: Tool[] = [
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Adobe Illustrator", logo: "https://cdn.simpleicons.org/adobeillustrator/FF9A00" },
  { name: "Adobe Photoshop", logo: "https://cdn.simpleicons.org/adobephotoshop/31A8FF" },
  { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "After Effects", logo: "https://cdn.simpleicons.org/adobeaftereffects/9999FF" },
  { name: "Procreate", logo: "https://logo.clearbit.com/procreate.art" },
  { name: "Sketch", logo: "https://cdn.simpleicons.org/sketch/F7B500" },
  { name: "InVision", logo: "https://logo.clearbit.com/invisionapp.com" },
];

const carouselsVisualsFAQs: FAQItem[] = [
  {
    question: "What's the difference between carousels and regular graphics?",
    answer: "Carousels are multi-slide posts that users swipe through, while regular graphics are single images. Key differences: Carousels: 2-10 slides, tell a story or provide step-by-step info, higher engagement (people spend more time), better for educational content, and algorithm-favored on LinkedIn and Instagram. Regular graphics: Single image, quick message, good for quotes and announcements. Carousels typically get 3-5x more engagement than single images."
  },
  {
    question: "Which platforms work best for carousels?",
    answer: "Carousels perform exceptionally well on: LinkedIn (highest engagement, great for B2B thought leadership), Instagram (native carousel format, high saves and shares), Facebook (good reach, especially for educational content), and Twitter/X (thread-style carousels). LinkedIn carousels often get 10-20x more engagement than regular posts. We optimize design and content for each platform's unique audience and algorithm."
  },
  {
    question: "How do you ensure visuals align with our brand?",
    answer: "We follow a rigorous brand alignment process: review existing brand guidelines, analyze current visual content, create custom brand templates, use your brand colors, fonts, and style, maintain consistent visual language, and get approval before finalizing. We can work with existing guidelines or help develop new visual brand standards. All visuals are designed to be instantly recognizable as your brand."
  },
  {
    question: "Can you create animated graphics and GIFs?",
    answer: "Yes! We create various animated content: animated carousels (subtle motion), GIFs for social media, animated infographics, logo animations, and motion graphics. Animated content typically gets 2-3x more engagement than static. We optimize file sizes for each platform and ensure smooth playback. Animation adds visual interest without overwhelming the message."
  },
  {
    question: "Do you provide content ideas or just design?",
    answer: "We provide both! Our service includes: content strategy and themes, topic ideation and research, copywriting for graphics, visual storytelling, and data visualization. We work with you to develop content calendars with topics, then create both copy and design. If you prefer to provide content, we can design-only. Most clients appreciate our full-service approach."
  },
  {
    question: "What formats do you deliver graphics in?",
    answer: "We deliver in all formats you need: PNG (transparent background), JPG (smaller file size), PDF (print quality), SVG (scalable vector), and source files (Figma, AI, PSD). We also provide: platform-specific sizes (LinkedIn, Instagram, Facebook, Twitter), multiple versions (with/without text), and editable templates. You get everything needed to use graphics across all channels."
  },
  {
    question: "How do you make carousels engaging?",
    answer: "We use proven engagement techniques: strong hook on slide 1 (grab attention), clear value proposition, storytelling structure, visual hierarchy and flow, data visualization, actionable takeaways, and strong CTA on final slide. We also: use contrasting colors, include surprising stats or insights, break complex topics into digestible chunks, and add interactive elements. Our carousels average 15x higher engagement than regular posts."
  },
  {
    question: "Can you repurpose existing content into visuals?",
    answer: "Absolutely! We excel at content repurposing: blog posts → infographics or carousels, webinars → key takeaway graphics, case studies → visual success stories, whitepapers → bite-sized graphics, podcasts → quote cards, and data reports → data visualizations. Repurposing extends content reach and engagement. One blog post can become 10+ social graphics, maximizing your content investment."
  },
];

const CarouselsVisuals = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "CAROUSELS & VISUALS",
      heading: "Scroll-Stopping Visual Content That Drives Engagement",
      description: "Professional carousels, infographics, and social graphics that capture attention, communicate value, and amplify your brand.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Content Creative/CarouselsandVisuals.png",
      imageAlt: "Carousels & Visuals",
    }}
    plans={pricingPlans}
    faqs={carouselsVisualsFAQs}
    tools={carouselsVisualsTools}
    processSteps={carouselsVisualsProcessSteps}
    whyItems={whyItems}
  />
);

export default CarouselsVisuals;
