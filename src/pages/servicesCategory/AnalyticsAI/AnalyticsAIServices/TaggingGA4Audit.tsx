import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Code, CheckCircle, AlertTriangle, Search, FileCheck, Settings
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
    icon: <FileCheck className="h-5 w-5 text-white" />,
    title: "500+",
    subtitle: "Audits completed",
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-white" />,
    title: "10K+",
    subtitle: "Issues identified",
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-white" />,
    title: "99%",
    subtitle: "Data accuracy achieved",
  },
  {
    icon: <Zap className="h-5 w-5 text-white" />,
    title: "2 weeks",
    subtitle: "Average implementation",
  },
];

const taggingAuditFeatures: FeatureItem[] = [
  {
    icon: Search,
    title: "Comprehensive Tracking Audit",
    description: "Deep dive into your tracking setup to identify gaps, errors, and opportunities."
  },
  {
    icon: Code,
    title: "GA4 Implementation",
    description: "Proper Google Analytics 4 setup with custom events, conversions, and enhanced measurement."
  },
  {
    icon: Settings,
    title: "Tag Management",
    description: "Clean, organized Google Tag Manager setup with proper naming conventions and documentation."
  },
  {
    icon: Target,
    title: "Conversion Tracking",
    description: "Accurate tracking of all key conversions across your website and marketing campaigns."
  },
  {
    icon: FileCheck,
    title: "Data Layer Implementation",
    description: "Robust data layer architecture for reliable, scalable tracking."
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance & Testing",
    description: "Thorough testing to ensure all tracking works correctly before going live."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Accurate Data", desc: "Trust your data to make confident business decisions." },
  { icon: CheckCircle, title: "GA4 Expertise", desc: "Deep expertise in Google Analytics 4 and modern tracking." },
  { icon: Code, title: "Clean Implementation", desc: "Well-organized, documented tracking that's easy to maintain." },
  { icon: Zap, title: "Fast Turnaround", desc: "Most audits and implementations completed in 2-4 weeks." },
  { icon: AlertTriangle, title: "Issue Prevention", desc: "Catch tracking problems before they cost you money." },
  { icon: Award, title: "Proven Process", desc: "Hundreds of successful tracking implementations." },
];

const taggingAuditProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Audit & Discovery", 
    description: "Comprehensive audit of current tracking setup and identification of all issues." 
  },
  { 
    step: "02", 
    title: "Strategy & Planning", 
    description: "Create tracking plan with all events, conversions, and data requirements." 
  },
  { 
    step: "03", 
    title: "Implementation", 
    description: "Implement GA4, GTM, and all tracking tags according to best practices." 
  },
  { 
    step: "04", 
    title: "Testing & Documentation", 
    description: "Thorough QA testing and complete documentation for your team." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Audit Only",
    price: { monthly: 600, yearly: 5760 },
    description: "Comprehensive tracking audit",
    features: [
      "Full tracking audit report",
      "GA4 configuration review",
      "GTM container audit",
      "Conversion tracking check",
      "Prioritized recommendations",
      "30-minute consultation"
    ],
    ctaText: "Get Audit",
    ctaHref: "/resources/support"
  },
  {
    title: "Audit + Implementation",
    price: { monthly: 1600, yearly: 15360 },
    description: "Complete tracking setup",
    features: [
      "Everything in Audit",
      "GA4 setup & migration",
      "GTM implementation",
      "Conversion tracking setup",
      "Data layer implementation",
      "Testing & QA",
      "Documentation",
      "30-day support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 3200, yearly: 30720 },
    description: "Enterprise tracking solution",
    features: [
      "Everything in Implementation",
      "Multi-site tracking",
      "Custom event architecture",
      "Advanced e-commerce tracking",
      "Server-side tracking",
      "Custom integrations",
      "Ongoing optimization",
      "Dedicated analyst"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const taggingAuditTools: Tool[] = [
  { name: "Google Analytics 4", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Google Tag Manager", logo: "https://cdn.simpleicons.org/googletagmanager/246FDB" },
  { name: "Google Search Console", logo: "https://cdn.simpleicons.org/googlesearchconsole/458CF5" },
  { name: "Segment", logo: "https://logo.clearbit.com/segment.com" },
  { name: "Hotjar", logo: "https://logo.clearbit.com/hotjar.com" },
  { name: "Mixpanel", logo: "https://logo.clearbit.com/mixpanel.com" },
  { name: "Amplitude", logo: "https://logo.clearbit.com/amplitude.com" },
  { name: "Looker Studio", logo: "https://cdn.simpleicons.org/google/4285F4" },
];

const taggingAuditFAQs: FAQItem[] = [
  {
    question: "Why do I need a tracking audit?",
    answer: "Most websites have tracking issues that lead to inaccurate data and poor decisions. Common problems: missing conversions (you're not tracking key actions), broken tracking (data gaps from implementation errors), duplicate tracking (inflated numbers), and GA4 misconfiguration (wrong settings). An audit identifies these issues so you can trust your data. We typically find 10-20 significant issues in every audit."
  },
  {
    question: "What's included in the audit?",
    answer: "We review everything: GA4 configuration (properties, data streams, events), GTM setup (tags, triggers, variables), conversion tracking (goals, events, e-commerce), data layer implementation, cross-domain tracking, and data quality issues. You'll receive a detailed report with: all issues found (prioritized by impact), specific recommendations, and implementation guidance. Most audits are 20-30 pages."
  },
  {
    question: "How long does an audit take?",
    answer: "Audits typically take 1-2 weeks depending on complexity. Timeline: Week 1 - Technical audit and analysis, Week 2 - Report creation and consultation. For complex sites (e-commerce, multi-domain, high traffic), audits may take 2-3 weeks. You'll receive the report and have a consultation call to review findings and recommendations."
  },
  {
    question: "What's the difference between Universal Analytics and GA4?",
    answer: "GA4 is Google's new analytics platform (Universal Analytics stopped collecting data July 2023). Key differences: GA4 uses events (not sessions), has better cross-device tracking, includes predictive analytics, and has different reporting. If you haven't migrated, you're losing data. We help with: GA4 setup, historical data preservation, and team training on the new interface."
  },
  {
    question: "Can you migrate from Universal Analytics to GA4?",
    answer: "Yes! We handle the complete migration: set up GA4 property, recreate important reports, configure events and conversions, implement enhanced measurement, and train your team. Note: Historical data doesn't transfer (GA4 limitation), but we can preserve UA data for reference. Most migrations take 2-3 weeks."
  },
  {
    question: "What is Google Tag Manager and do I need it?",
    answer: "Google Tag Manager (GTM) is a tag management system that makes it easy to add and update tracking tags without changing website code. Benefits: faster implementation, no developer needed for changes, better organization, and easier testing. We recommend GTM for any site with multiple tracking tags. If you're not using it, we'll implement it as part of the setup."
  },
  {
    question: "How do you ensure tracking accuracy?",
    answer: "We follow a rigorous process: implement tracking according to best practices, use data layer for reliable data, test thoroughly in staging environment, verify with real-time reports, and cross-check with other data sources. We also provide ongoing monitoring to catch issues early. Our implementations typically achieve 95-99% data accuracy."
  },
  {
    question: "What happens after implementation?",
    answer: "We provide: complete documentation of all tracking, training for your team on how to use GA4, 30 days of support for questions/issues, and recommendations for ongoing optimization. We can also provide ongoing management if needed. Most clients are self-sufficient after our training, but we're available if you need continued support."
  },
];

const TaggingGA4Audit = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="TRACKING AUDIT & GA4 SETUP"
        heading="Fix Your Tracking and Trust Your Data"
        description="Comprehensive tracking audits and Google Analytics 4 implementation to ensure accurate, reliable data for better decisions."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Analytics&AI/Tagging&GA4Audit.png"
        imageAlt="Tracking Audit & GA4"
      />

      {/* ===== STATS RIBBON ===== */}
      <section className="py-8 sm:py-10">
        <ServicesRibbon 
        title="Trusted by Data-Driven Companies"
        items={ribbonItems}
      />
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <ServiceFeatures
                eyebrow="What We Offer"
                heading="Complete Tracking Audit & Implementation"
                description="From audit to implementation, we ensure your tracking is accurate and reliable."
                features={taggingAuditFeatures}
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
                heading="Why Choose Our Tracking Services" 
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
                subheading="How We Fix Your Tracking"
                description="A proven methodology for accurate, reliable analytics implementation"
                steps={taggingAuditProcessSteps}
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
                heading="Choose Your Tracking Plan"
                description="Select the perfect plan for your tracking needs. All plans include detailed audit and recommendations."
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
            title="Powered by Leading Analytics Tools"
            description="We use the best analytics and tracking platforms to ensure accurate data collection."
            tools={taggingAuditTools}
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
        subtitle="Everything you need to know about tracking audits and GA4 implementation"
        faqs={taggingAuditFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default TaggingGA4Audit;
