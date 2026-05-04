import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Crosshair, FileText,
  Mail, Phone, Calendar, Award, Shield, Zap
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
    icon: <Target className="h-5 w-5 text-white" />,
    title: "500+",
    subtitle: "Target accounts engaged",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "3.2x",
    subtitle: "Average deal size increase",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "92%",
    subtitle: "Account engagement rate",
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-white" />,
    title: "$2.5M+",
    subtitle: "Pipeline generated",
  },
];

const abmFeatures: FeatureItem[] = [
  {
    icon: Target,
    title: "Account Selection & Research",
    description: "Identify and prioritize high-value target accounts based on ideal customer profiles and intent data."
  },
  {
    icon: Users,
    title: "Multi-Stakeholder Mapping",
    description: "Map decision-makers and influencers within target accounts for comprehensive engagement."
  },
  {
    icon: Mail,
    title: "Personalized Outreach",
    description: "Craft highly personalized messaging and content tailored to each account's specific needs."
  },
  {
    icon: Phone,
    title: "Multi-Channel Engagement",
    description: "Coordinate touchpoints across email, LinkedIn, phone, and direct mail for maximum impact."
  },
  {
    icon: Calendar,
    title: "Meeting Coordination",
    description: "Schedule and facilitate high-value meetings with key decision-makers at target accounts."
  },
  {
    icon: BarChart3,
    title: "Account Intelligence",
    description: "Track engagement, intent signals, and account progression through the sales cycle."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Precision Targeting", desc: "Focus resources on accounts with highest revenue potential and fit.", tint: "#E6F7FB", stroke: "#0EA5E9" },
  { icon: Users, title: "Full-Funnel Approach", desc: "Engage multiple stakeholders simultaneously for faster deal cycles.", tint: "#EAFBE0", stroke: "#2F8F5B" },
  { icon: FileText, title: "Personalized Content", desc: "Custom content and messaging for each target account's unique challenges.", tint: "#F1E8FF", stroke: "#7C3AED" },
  { icon: BarChart3, title: "Data-Driven Insights", desc: "Leverage intent data and account intelligence for strategic engagement.", tint: "#E6F0FF", stroke: "#1677ff" },
  { icon: Award, title: "Proven Methodology", desc: "Battle-tested ABM frameworks that consistently deliver results.", tint: "#EEFDF3", stroke: "#16A34A" },
  { icon: Shield, title: "Dedicated Support", desc: "Expert ABM strategists managing your campaigns end-to-end.", tint: "#F5F5F5", stroke: "#6B7280" },
];

const abmProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Account Selection", 
    description: "Identify and prioritize target accounts based on ICP, firmographics, and intent signals." 
  },
  { 
    step: "02", 
    title: "Research & Planning", 
    description: "Deep dive into account structure, stakeholders, pain points, and buying triggers." 
  },
  { 
    step: "03", 
    title: "Campaign Execution", 
    description: "Launch personalized multi-channel campaigns with coordinated touchpoints." 
  },
  { 
    step: "04", 
    title: "Optimize & Scale", 
    description: "Analyze engagement data, refine messaging, and expand to new accounts." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1000, yearly: 9600 },
    description: "Perfect for testing ABM with a focused account list",
    features: [
      "25 target accounts",
      "Account research & mapping",
      "Email & LinkedIn outreach",
      "Monthly strategy calls",
      "Basic reporting dashboard",
      "CRM integration"
    ],
    ctaText: "Start with Starter",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 2000, yearly: 19200 },
    description: "Comprehensive ABM for scaling pipeline",
    features: [
      "50 target accounts",
      "Multi-stakeholder mapping",
      "Multi-channel campaigns",
      "Personalized content creation",
      "Weekly strategy calls",
      "Advanced analytics",
      "Intent data integration",
      "Dedicated ABM manager"
    ],
    ctaText: "Choose Growth",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 4000, yearly: 38400 },
    description: "Full-scale ABM program for enterprise teams",
    features: [
      "100+ target accounts",
      "Executive engagement programs",
      "Custom content & events",
      "Account-based advertising",
      "Sales enablement",
      "Predictive analytics",
      "White-glove service",
      "Dedicated ABM team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const abmTools: Tool[] = [
  { name: "6sense", logo: "https://logo.clearbit.com/6sense.com" },
  { name: "Demandbase", logo: "https://logo.clearbit.com/demandbase.com" },
  { name: "LinkedIn Sales Navigator", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "ZoomInfo", logo: "https://logo.clearbit.com/zoominfo.com" },
  { name: "Outreach", logo: "https://logo.clearbit.com/outreach.io" },
  { name: "Terminus", logo: "https://logo.clearbit.com/terminusplatform.com" },
];

const abmFAQs: FAQItem[] = [
  {
    question: "What is Account-Based Marketing (ABM)?",
    answer: "ABM is a strategic approach that focuses marketing and sales resources on a clearly defined set of target accounts. Instead of casting a wide net, ABM treats individual accounts as markets of one, delivering personalized campaigns designed to resonate with specific companies and decision-makers."
  },
  {
    question: "How is ABM different from traditional demand generation?",
    answer: "Traditional demand gen casts a wide net to generate leads, while ABM focuses on specific high-value accounts. ABM involves deeper research, more personalized messaging, multi-stakeholder engagement, and closer sales-marketing alignment. It's quality over quantity, targeting accounts that are the best fit for your solution."
  },
  {
    question: "What size companies benefit most from ABM?",
    answer: "ABM works best for B2B companies with: longer sales cycles, multiple decision-makers, high deal values ($50K+), and a clearly defined ideal customer profile. It's particularly effective for SaaS, enterprise software, professional services, and complex B2B solutions."
  },
  {
    question: "How long does it take to see results from ABM?",
    answer: "Initial engagement typically starts within 2-4 weeks. Meaningful pipeline generation usually occurs within 3-6 months. ABM is a long-term strategy - the best results come after 6-12 months of consistent execution as relationships deepen and trust builds with target accounts."
  },
  {
    question: "How do you select target accounts?",
    answer: "We use a combination of: ideal customer profile (ICP) criteria, firmographic data, technographic signals, intent data showing active research, engagement history, and revenue potential. We work with your sales team to prioritize accounts based on fit, intent, and opportunity."
  },
  {
    question: "What channels do you use for ABM campaigns?",
    answer: "We orchestrate multi-channel campaigns including: personalized email sequences, LinkedIn outreach and InMail, targeted advertising (LinkedIn, display), direct mail for key moments, phone outreach for high-priority contacts, and custom content (case studies, ROI calculators, webinars)."
  },
  {
    question: "How do you measure ABM success?",
    answer: "Key metrics include: account engagement rate, number of engaged stakeholders per account, meetings booked with target accounts, pipeline generated from target accounts, deal velocity and win rates, and ultimately revenue from ABM accounts. We track both leading indicators (engagement) and lagging indicators (revenue)."
  },
  {
    question: "Do you integrate with our CRM and sales tools?",
    answer: "Yes, we integrate with major CRMs (Salesforce, HubSpot, Pipedrive) and sales engagement platforms (Outreach, SalesLoft, Apollo). This ensures seamless data flow, proper attribution, and enables your sales team to see all account activity in their existing workflows."
  },
];

const ABMCampaigns = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="ACCOUNT-BASED MARKETING"
        heading="ABM Campaigns That Drive Enterprise Revenue"
        description="Target and engage high-value accounts with personalized, multi-channel campaigns that accelerate deal cycles and increase win rates."
        ctaText="Book a Strategy Call"
        ctaLink="/resources/support"
        imageSrc="/images/Services/DemandGrowthGeneration/ABMCampaigns.png"
        imageAlt="ABM Strategy Meeting"
      />

      {/* ===== STATS RIBBON ===== */}
      <section className="py-8 sm:py-10">
        <ServicesRibbon 
        title="Trusted by Leading B2B Brands"
        items={ribbonItems}
      />
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <ServiceFeatures
                eyebrow="What We Offer"
                heading="Comprehensive ABM Services"
                description="From account selection to deal closure, we handle every aspect of your account-based marketing strategy."
                features={abmFeatures}
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
                heading="Why Choose Us for ABM" 
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
                subheading="How We Execute ABM"
                description="A proven methodology for engaging and converting high-value accounts"
                steps={abmProcessSteps}
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
                heading="Choose Your ABM Plan"
                description="Select the perfect plan for your account-based marketing needs. All plans include expert strategy and dedicated support."
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
            title="Powered by Leading ABM Tools"
            description="We leverage the best account-based marketing platforms and data providers to identify, engage, and convert your target accounts."
            tools={abmTools}
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
        subtitle="Everything you need to know about our ABM services"
        faqs={abmFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default ABMCampaigns;
