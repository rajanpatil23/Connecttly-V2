import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Database, Workflow, Mail, Bell, RefreshCw, GitMerge
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
    icon: <Workflow className="h-5 w-5 text-white" />,
    title: "10K+",
    subtitle: "Workflows automated",
  },
  {
    icon: <Zap className="h-5 w-5 text-white" />,
    title: "80%",
    subtitle: "Time saved",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "50K+",
    subtitle: "Leads processed",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "3x",
    subtitle: "Sales productivity",
  },
];

const crmAutomationFeatures: FeatureItem[] = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automate repetitive tasks like lead assignment, follow-ups, and data entry."
  },
  {
    icon: Database,
    title: "Data Enrichment",
    description: "Automatically enrich leads with company data, social profiles, and contact information."
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Trigger personalized email sequences based on lead behavior and lifecycle stage."
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Alert sales reps about hot leads, engagement spikes, and follow-up reminders."
  },
  {
    icon: GitMerge,
    title: "Integration & Sync",
    description: "Connect CRM with marketing tools, ensuring seamless data flow across platforms."
  },
  {
    icon: RefreshCw,
    title: "Lead Scoring & Routing",
    description: "Automatically score leads and route them to the right sales rep based on criteria."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Zap, title: "Save Time", desc: "Eliminate hours of manual work with intelligent automation." },
  { icon: Target, title: "Better Lead Quality", desc: "Automated scoring ensures sales focuses on best opportunities." },
  { icon: Users, title: "Faster Response", desc: "Instant lead routing and notifications mean faster follow-up." },
  { icon: Database, title: "Clean Data", desc: "Automated data enrichment and deduplication keeps CRM clean." },
  { icon: TrendingUp, title: "Increased Revenue", desc: "Sales teams close more deals when freed from admin work." },
  { icon: Award, title: "Expert Implementation", desc: "We've automated thousands of CRM workflows successfully." },
];

const crmAutomationProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Process Audit", 
    description: "Map current workflows and identify automation opportunities for maximum impact." 
  },
  { 
    step: "02", 
    title: "Automation Design", 
    description: "Design custom workflows, triggers, and rules tailored to your sales process." 
  },
  { 
    step: "03", 
    title: "Implementation & Testing", 
    description: "Build and test automations to ensure they work flawlessly before going live." 
  },
  { 
    step: "04", 
    title: "Training & Optimization", 
    description: "Train your team and continuously optimize automations based on performance." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 800, yearly: 7680 },
    description: "Essential CRM automation",
    features: [
      "Up to 10 automated workflows",
      "Lead scoring & routing",
      "Email automation",
      "Basic integrations",
      "Monthly optimization",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1400, yearly: 13440 },
    description: "Advanced automation & integration",
    features: [
      "Unlimited workflows",
      "Advanced lead scoring",
      "Data enrichment",
      "Custom integrations",
      "Smart notifications",
      "Weekly optimization",
      "Priority support",
      "Dedicated specialist"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2800, yearly: 26880 },
    description: "Enterprise automation solution",
    features: [
      "Custom workflow development",
      "AI-powered automation",
      "Enterprise integrations",
      "Multi-CRM support",
      "API access",
      "White-glove service",
      "Executive reporting",
      "Dedicated automation team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const crmAutomationTools: Tool[] = [
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Pipedrive", logo: "https://logo.clearbit.com/pipedrive.com" },
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier/FF4A00" },
  { name: "Make", logo: "https://logo.clearbit.com/make.com" },
  { name: "Clearbit", logo: "https://logo.clearbit.com/clearbit.com" },
  { name: "ZoomInfo", logo: "https://logo.clearbit.com/zoominfo.com" },
  { name: "Outreach", logo: "https://logo.clearbit.com/outreach.io" },
];

const crmAutomationFAQs: FAQItem[] = [
  {
    question: "What CRM platforms do you work with?",
    answer: "We work with all major CRMs: Salesforce, HubSpot, Pipedrive, Zoho, Microsoft Dynamics, Close, and more. We're platform-agnostic and can automate workflows in any CRM that has an API or native automation features. If you're using a less common CRM, we can likely still help - just ask!"
  },
  {
    question: "How much time will automation save?",
    answer: "Most clients save 10-20 hours per week per sales rep through automation. Common time savings: lead data entry (5-10 hrs/week), follow-up scheduling (3-5 hrs/week), lead research (5-8 hrs/week), and reporting (2-4 hrs/week). The exact savings depend on your current processes and automation complexity. We typically see 60-80% reduction in manual CRM work."
  },
  {
    question: "Will automation work with our existing processes?",
    answer: "Yes! We design automations around your existing processes, not the other way around. We start by mapping your current workflows, then identify where automation adds value without disrupting what works. We can automate parts of your process while keeping manual steps where human judgment is needed. The goal is to enhance, not replace, your team."
  },
  {
    question: "How do you handle lead scoring?",
    answer: "We create custom lead scoring models based on your ideal customer profile and historical conversion data. Scores consider: demographic fit (company size, industry, title), behavioral signals (website visits, email opens, content downloads), and engagement level (meeting requests, demo requests). Scores update in real-time and trigger automated actions like routing to sales or nurture campaigns."
  },
  {
    question: "Can you automate data entry from forms and emails?",
    answer: "Absolutely! We can automatically: capture form submissions and create/update CRM records, parse emails and extract contact information, enrich leads with company data from third-party sources, and deduplicate records to keep your CRM clean. This eliminates 90% of manual data entry and ensures data accuracy."
  },
  {
    question: "What about email automation?",
    answer: "We set up sophisticated email automation: welcome sequences for new leads, nurture campaigns based on behavior, re-engagement campaigns for cold leads, and personalized follow-ups triggered by actions. Emails can be personalized with CRM data and sent from sales reps' inboxes for authenticity. We also track engagement and trigger next steps automatically."
  },
  {
    question: "How long does implementation take?",
    answer: "Simple automations (5-10 workflows) take 2-3 weeks. Complex implementations with custom integrations take 4-6 weeks. Timeline depends on: CRM complexity, number of workflows, integration requirements, and data cleanup needs. You'll start seeing benefits within the first 2 weeks as we roll out automations incrementally."
  },
  {
    question: "What if something breaks?",
    answer: "We provide ongoing monitoring and support. If an automation fails, we're alerted immediately and fix it quickly. We also: test thoroughly before launch, implement error handling and fallbacks, provide detailed documentation, and offer training so your team understands how things work. Most issues are caught and resolved before they impact your team."
  },
];

const CRMAutomation = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="CRM AUTOMATION"
        heading="Automate Your CRM and Free Your Sales Team"
        description="Eliminate manual work with intelligent CRM automation. Let your sales team focus on selling while automation handles the rest."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Analytics&AI/CRMandAutomation.png"
        imageAlt="CRM Automation"
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
                heading="Complete CRM Automation Solutions"
                description="From lead capture to deal close, we automate every step of your sales process."
                features={crmAutomationFeatures}
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
                heading="Why Choose Our CRM Automation" 
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
                subheading="How We Automate Your CRM"
                description="A proven methodology for implementing CRM automation that works"
                steps={crmAutomationProcessSteps}
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
                heading="Choose Your Automation Plan"
                description="Select the perfect plan for your CRM automation needs. All plans include workflow design and implementation."
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
            title="Powered by Leading CRM & Automation Tools"
            description="We work with all major CRMs and automation platforms to deliver seamless workflows."
            tools={crmAutomationTools}
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
        subtitle="Everything you need to know about CRM automation"
        faqs={crmAutomationFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default CRMAutomation;
