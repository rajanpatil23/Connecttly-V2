import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  FileText, Presentation, BookOpen, Download, CheckCircle, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon, { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import PricingTable, { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import ToolStackSection, { Tool } from "@/components/Services/ServiceDetail/toolstack";
import ServiceFAQ, { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import { ProcessCards, ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import { ServiceFeatures, FeatureItem } from "@/components/Services/ServiceDetail/service-features";

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
    subtitle: "Collateral pieces created",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "40%",
    subtitle: "Sales cycle reduction",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "85%",
    subtitle: "Close rate improvement",
  },
  {
    icon: <Award className="h-5 w-5 text-white" />,
    title: "100+",
    subtitle: "B2B clients served",
  },
];

const salesCollateralFeatures: FeatureItem[] = [
  {
    icon: Presentation,
    title: "Sales Decks & Presentations",
    description: "Compelling pitch decks and presentations that win deals and close sales."
  },
  {
    icon: FileText,
    title: "One-Pagers & Sell Sheets",
    description: "Concise, impactful one-pagers that communicate value quickly."
  },
  {
    icon: BookOpen,
    title: "Case Studies",
    description: "Detailed success stories that prove ROI and build credibility."
  },
  {
    icon: Download,
    title: "Whitepapers & eBooks",
    description: "In-depth thought leadership content that generates and nurtures leads."
  },
  {
    icon: Briefcase,
    title: "Proposal Templates",
    description: "Professional proposal templates that streamline your sales process."
  },
  {
    icon: CheckCircle,
    title: "Product Sheets",
    description: "Clear product documentation that helps prospects make buying decisions."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Sales-Focused", desc: "Content designed specifically to move prospects through the funnel." },
  { icon: Users, title: "Buyer-Centric", desc: "Addresses buyer concerns and objections at each stage." },
  { icon: Zap, title: "Fast Turnaround", desc: "Quick delivery without compromising quality." },
  { icon: Briefcase, title: "B2B Expertise", desc: "Deep experience in complex B2B sales cycles." },
  { icon: CheckCircle, title: "Proven Results", desc: "Collateral that shortens sales cycles by 40%." },
  { icon: Award, title: "Professional Design", desc: "Beautiful, on-brand designs that impress prospects." },
];

const salesCollateralProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Discovery & Strategy", 
    description: "Understand your sales process, buyer personas, and key messaging." 
  },
  { 
    step: "02", 
    title: "Content Development", 
    description: "Create compelling copy that addresses buyer needs and objections." 
  },
  { 
    step: "03", 
    title: "Design & Layout", 
    description: "Professional design that aligns with your brand and engages prospects." 
  },
  { 
    step: "04", 
    title: "Review & Delivery", 
    description: "Refine based on feedback and deliver in all required formats." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1000, yearly: 9600 },
    description: "Essential sales collateral",
    features: [
      "2 collateral pieces/month",
      "One-pagers or sell sheets",
      "Professional copywriting",
      "Basic design",
      "2 revision rounds",
      "PDF delivery"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 2000, yearly: 19200 },
    description: "Comprehensive sales collateral",
    features: [
      "4 collateral pieces/month",
      "All collateral types",
      "Expert copywriting",
      "Professional design",
      "Case studies included",
      "3 revision rounds",
      "Multi-format delivery",
      "Brand guidelines"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 4000, yearly: 38400 },
    description: "Enterprise sales enablement",
    features: [
      "8+ collateral pieces/month",
      "Custom collateral types",
      "Strategic messaging",
      "Premium design",
      "Sales deck development",
      "Unlimited revisions",
      "All formats & versions",
      "Sales training materials",
      "Dedicated team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const salesCollateralTools: Tool[] = [
  { name: "Adobe InDesign", logo: "https://cdn.simpleicons.org/adobeindesign/FF3366" },
  { name: "PowerPoint", logo: "https://cdn.simpleicons.org/microsoftpowerpoint/B7472A" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "Google Slides", logo: "https://cdn.simpleicons.org/googleslides/FBBC04" },
  { name: "Adobe Illustrator", logo: "https://cdn.simpleicons.org/adobeillustrator/FF9A00" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion/000000" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
];

const salesCollateralFAQs: FAQItem[] = [
  {
    question: "What types of sales collateral do you create?",
    answer: "We create all types of B2B sales collateral: sales decks and pitch presentations, one-pagers and sell sheets, case studies and success stories, whitepapers and eBooks, product sheets and brochures, proposal templates, battlecards and competitive comparisons, ROI calculators and tools, email templates, and leave-behinds. Each piece is tailored to specific stages of your sales cycle and buyer journey."
  },
  {
    question: "How do you ensure collateral aligns with our sales process?",
    answer: "We start with deep discovery: interview sales team to understand process and objections, review existing collateral and identify gaps, analyze buyer personas and decision criteria, map content to sales stages, and identify key messages and differentiators. We create collateral that addresses specific buyer concerns at each stage, making it easier for sales to move deals forward."
  },
  {
    question: "Can you help with messaging and positioning?",
    answer: "Yes! We provide strategic messaging support: competitive positioning and differentiation, value proposition development, key message frameworks, objection handling, and proof points and credibility builders. We work with your team to develop messaging that resonates with buyers and differentiates you from competitors. This messaging foundation informs all collateral."
  },
  {
    question: "Do you provide design services or just writing?",
    answer: "We provide both! Full-service includes: professional copywriting, visual design and layout, brand alignment, infographics and data visualization, image sourcing and editing, and final production in all formats. We can also work with your existing brand guidelines and templates, or create new templates for your team to use."
  },
  {
    question: "How long does it take to create sales collateral?",
    answer: "Timeline varies by complexity: One-pagers/sell sheets: 1-2 weeks, Case studies: 2-3 weeks, Sales decks: 2-3 weeks, Whitepapers/eBooks: 4-6 weeks, Complete collateral suite: 6-8 weeks. Breakdown: Week 1: Discovery and strategy, Week 2: Content development, Week 3: Design and layout, Week 4: Revisions and delivery. Rush delivery available for urgent needs."
  },
  {
    question: "Can you create case studies if we don't have customer testimonials?",
    answer: "Yes! We help with the entire process: identify successful customers, conduct customer interviews, gather quantitative results and metrics, develop compelling narrative, get customer approval, and create professional design. We handle customer outreach and interviews, making it easy for you. Most customers are happy to participate when approached professionally."
  },
  {
    question: "What formats do you deliver collateral in?",
    answer: "We deliver in all formats you need: PDF (print and digital), PowerPoint/Google Slides (editable), Word/Google Docs (editable), HTML (web), PNG/JPG (images), and InDesign/Figma (source files). We also create multiple versions: full version, executive summary, one-pager, and social media snippets. You get everything needed to use collateral across channels."
  },
  {
    question: "How do you measure collateral effectiveness?",
    answer: "We track multiple metrics: usage by sales team (adoption rate), engagement (time spent, pages viewed), conversion rates (meeting to opportunity, opportunity to close), sales cycle length, win rates, and feedback from sales and prospects. We provide recommendations for optimization based on performance data. Most clients see 30-50% improvement in key sales metrics."
  },
];

const SalesCollateral = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="SALES COLLATERAL"
        heading="Sales Collateral That Closes Deals Faster"
        description="Professional sales materials that empower your team, impress prospects, and accelerate your sales cycle."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Content Creative/SalesCollateral.png"
        imageAlt="Sales Collateral"
      />

      {/* ===== STATS RIBBON ===== */}
      <section className="py-8 sm:py-10">
        <ServicesRibbon 
        title="Trusted by Sales Teams"
        items={ribbonItems}
      />
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <ServiceFeatures
                eyebrow="What We Offer"
                heading="Complete Sales Collateral Services"
                description="From pitch decks to case studies, we create collateral that helps you win deals."
                features={salesCollateralFeatures}
                accentColor="from-[#0074ED] to-[#5B9BF8]"
              />
            </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[#B8E8DD]">
            <div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12">
              <WhyChoose 
                items={whyItems} 
                eyebrow="WHY CHOOSE CONNECTTLY" 
                heading="Why Choose Our Sales Collateral Services" 
                eyebrowColor="#0A6B5E" 
                noPadding 
                noCard 
                noContainer 
              />
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[#F1F1E9]">
            <div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12">
              <ProcessCards 
                eyebrow="Our Process"
                subheading="How We Create Sales Collateral"
                description="A proven methodology for creating collateral that wins deals"
                steps={salesCollateralProcessSteps}
                accentColor="from-[#0074ED] to-[#5B9BF8]"
              />
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <PricingTable 
                plans={pricingPlans}
                heading="Choose Your Collateral Plan"
                description="Select the perfect plan for your sales collateral needs. All plans include professional writing and design."
                accentColor="from-[#0074ED] to-[#5B9BF8]"
              />
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-8 sm:py-10">
        <ReviewCarousel noPadding />
      </section>

      {/* ===== TOOL STACK ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <ScrollAnimatedSection bgColor="">
          <ToolStackSection 
            title="Powered by Professional Design Tools"
            description="We use industry-leading design and content tools to create impressive sales collateral."
            tools={salesCollateralTools}
            ctaText="Get Started"
            ctaLink="/resources/support"
            bgColor="bg-[#B8E8DD]"
          />
        </ScrollAnimatedSection>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-8 sm:py-10">
        <ServiceFAQ 
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about sales collateral services"
        faqs={salesCollateralFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default SalesCollateral;
