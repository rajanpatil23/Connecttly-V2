import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Package, Rocket, Shield, Star, CheckCircle, Crown
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
    icon: <Package className="h-5 w-5 text-white" />,
    title: "All-in-One",
    subtitle: "Complete LinkedIn solution",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "1M+",
    subtitle: "Total reach generated",
  },
  {
    icon: <Star className="h-5 w-5 text-white" />,
    title: "95%",
    subtitle: "Client satisfaction",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "5x",
    subtitle: "Average ROI",
  },
];

const linkedInGrowthBundleFeatures: FeatureItem[] = [
  {
    icon: Target,
    title: "LinkedIn Ads Management",
    description: "Full-service LinkedIn advertising to generate high-quality B2B leads and drive conversions."
  },
  {
    icon: Users,
    title: "Lead Generation & Outreach",
    description: "Done-for-you LinkedIn outreach campaigns that fill your pipeline with qualified prospects."
  },
  {
    icon: Package,
    title: "Company Page Management",
    description: "Professional content creation and community management to build your brand presence."
  },
  {
    icon: Crown,
    title: "Executive Branding",
    description: "Position your executives as thought leaders with ghostwritten content and strategy."
  },
  {
    icon: Rocket,
    title: "Sales Navigator Optimization",
    description: "Maximize your Sales Navigator investment with expert setup, training, and management."
  },
  {
    icon: BarChart3,
    title: "Unified Analytics & Reporting",
    description: "Comprehensive reporting across all LinkedIn activities with actionable insights."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Package, title: "Complete Solution", desc: "Everything you need for LinkedIn success in one package." },
  { icon: Zap, title: "Better Together", desc: "Services work synergistically for amplified results." },
  { icon: Target, title: "Unified Strategy", desc: "Coordinated approach across all LinkedIn activities." },
  { icon: Shield, title: "Cost Savings", desc: "Save 30-40% compared to purchasing services separately." },
  { icon: Users, title: "Dedicated Team", desc: "One team managing all aspects of your LinkedIn presence." },
  { icon: Award, title: "Proven Results", desc: "Track record of driving significant business growth on LinkedIn." },
];

const linkedInGrowthBundleProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Comprehensive Audit & Strategy", 
    description: "Analyze current LinkedIn presence, define goals, and create integrated strategy across all services." 
  },
  { 
    step: "02", 
    title: "Setup & Launch", 
    description: "Set up all services, optimize profiles and pages, and launch coordinated campaigns." 
  },
  { 
    step: "03", 
    title: "Execution & Management", 
    description: "Execute integrated campaigns across ads, outreach, content, and executive branding." 
  },
  { 
    step: "04", 
    title: "Optimization & Scaling", 
    description: "Continuously optimize all activities and scale what works for maximum ROI." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter Bundle",
    price: { monthly: 2000, yearly: 19200 },
    description: "Essential LinkedIn growth package",
    features: [
      "LinkedIn Ads ($3K-$5K spend)",
      "Lead generation (100 leads/month)",
      "Company page management",
      "Sales Navigator setup",
      "Monthly reporting",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth Bundle",
    price: { monthly: 3600, yearly: 34560 },
    description: "Complete LinkedIn growth solution",
    features: [
      "LinkedIn Ads ($5K-$10K spend)",
      "Lead generation (200 leads/month)",
      "Company page management",
      "1 executive profile",
      "Sales Navigator optimization",
      "Unified reporting",
      "Dedicated account manager",
      "Weekly strategy calls"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise Bundle",
    price: { monthly: 6800, yearly: 65280 },
    description: "Full-service LinkedIn domination",
    features: [
      "LinkedIn Ads ($15K+ spend)",
      "Lead generation (500+ leads/month)",
      "Company page + employee advocacy",
      "3 executive profiles",
      "Sales Navigator management",
      "Video content production",
      "Advanced analytics & insights",
      "Priority support",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const linkedInGrowthBundleTools: Tool[] = [
  { name: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "LinkedIn Sales Navigator", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier/FF4A00" },
  { name: "Agorapulse", logo: "https://logo.clearbit.com/agorapulse.com" },
];

const linkedInGrowthBundleFAQs: FAQItem[] = [
  {
    question: "What's included in the LinkedIn Growth Bundle?",
    answer: "The bundle includes: LinkedIn Ads management (with ad spend budget), lead generation and outreach campaigns, company page content and management, executive branding for key leaders, Sales Navigator setup and optimization, unified analytics and reporting, and a dedicated account team. Everything you need for comprehensive LinkedIn success in one package."
  },
  {
    question: "How much can I save with the bundle vs. individual services?",
    answer: "The bundle saves you 30-40% compared to purchasing services separately. For example, buying LinkedIn Ads ($3,500), Lead Gen ($3,000), Page Management ($3,500), and Executive Branding ($4,500) separately would cost $14,500/month. The Growth Bundle is $8,999/month - a savings of $5,500/month or 38%."
  },
  {
    question: "Can I customize which services are included?",
    answer: "Yes! While we offer standard bundles, we can customize based on your needs. Want more executive profiles? Higher ad spend? Additional lead generation? We'll create a custom package that fits your goals and budget. Contact us to discuss your specific requirements."
  },
  {
    question: "How do the services work together?",
    answer: "The services amplify each other: LinkedIn Ads drive traffic to your company page and executive profiles, lead generation campaigns reference your thought leadership content, executive posts promote company content and offers, Sales Navigator insights inform ad targeting, and all activities feed into unified reporting. This integrated approach delivers better results than siloed efforts."
  },
  {
    question: "What results can I expect?",
    answer: "Typical results for Growth Bundle clients: 200-400 qualified leads per month, 50-100 meetings booked, 10,000+ profile views, 50,000+ content impressions, 3-5x ROI on total investment. Enterprise Bundle clients typically see 2-3x these numbers. Results vary by industry and target audience, but the integrated approach consistently outperforms individual services."
  },
  {
    question: "How long does it take to see results?",
    answer: "You'll start seeing activity immediately: ads launch week 1, outreach begins week 2, content starts publishing week 1-2. Meaningful results typically appear within 4-6 weeks: qualified leads flowing in, meetings being booked, engagement growing. Full optimization and consistent performance usually takes 2-3 months as we refine all activities based on data."
  },
  {
    question: "Do I need to provide content or will you create everything?",
    answer: "We create everything! You'll provide initial input during onboarding (company info, target audience, key messages), then we handle all content creation: ad copy and creative, outreach messages, company page posts, executive thought leadership, and more. You review and approve, but we do the heavy lifting."
  },
  {
    question: "What if I'm already doing some LinkedIn activities in-house?",
    answer: "No problem! We can complement your existing efforts. For example, if you're already running ads, we can focus on lead generation and content. Or if you have someone posting occasionally, we can professionalize and scale it. We'll audit your current activities and recommend the best approach to maximize results without duplicating efforts."
  },
];

const LinkedInGrowthbundle = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="LINKEDIN GROWTH BUNDLE"
        heading="Complete LinkedIn Growth Solution - All Services in One Package"
        description="Dominate LinkedIn with our comprehensive bundle: Ads, Lead Generation, Page Management, Executive Branding, and Sales Navigator - all working together for maximum impact."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Linkedin Growth/LinkedInGrowthBundle.png"
        imageAlt="LinkedIn Growth Bundle"
      />

      {/* ===== STATS RIBBON ===== */}
      <section className="py-8 sm:py-10">
        <ServicesRibbon 
        title="The Ultimate LinkedIn Solution"
        items={ribbonItems}
      />
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <ServiceFeatures
                eyebrow="What's Included"
                heading="Everything You Need for LinkedIn Success"
                description="A comprehensive suite of services that work together to maximize your LinkedIn ROI."
                features={linkedInGrowthBundleFeatures}
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
                eyebrow="WHY CHOOSE THE BUNDLE" 
                heading="Why Choose the LinkedIn Growth Bundle" 
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
                subheading="How We Deliver LinkedIn Growth"
                description="A proven methodology for comprehensive LinkedIn success"
                steps={linkedInGrowthBundleProcessSteps}
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
                heading="Choose Your LinkedIn Growth Bundle"
                description="Select the perfect bundle for your LinkedIn growth needs. Save 30-40% vs. individual services."
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
            title="Powered by the Best LinkedIn Tools"
            description="We leverage the full LinkedIn ecosystem and integrate with your existing marketing stack."
            tools={linkedInGrowthBundleTools}
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
        subtitle="Everything you need to know about the LinkedIn Growth Bundle"
        faqs={linkedInGrowthBundleFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default LinkedInGrowthbundle;
