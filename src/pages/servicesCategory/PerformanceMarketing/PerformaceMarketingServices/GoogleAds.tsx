import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Zap, DollarSign, LineChart, Gauge, 
  TestTube, Crosshair, Users, BarChart3, ArrowRight, CheckCircle2, 
  Award, Clock, UserCheck, MousePointerClick, BarChart2, Sparkles,
  Building2, ThumbsUp, Rocket, Headphones
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

// Scroll-animated wrapper for sections - scroll-based scale animation
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
    color: "bg-[#1677ff]",
    icon: <Building2 className="h-5 w-5 text-white" />,
    title: "50+",
    subtitle: "SaaS brands served",
  },
  {
    color: "bg-[#1677ff]",
    icon: <ThumbsUp className="h-5 w-5 text-white" />,
    title: "98%",
    subtitle: "Client satisfaction",
  },
  {
    color: "bg-[#1677ff]",
    icon: <Rocket className="h-5 w-5 text-white" />,
    title: "500+",
    subtitle: "Projects delivered",
  },
  {
    color: "bg-[#1677ff]",
    icon: <Headphones className="h-5 w-5 text-white" />,
    title: "24/7",
    subtitle: "Support available",
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 400, yearly: 3840 },
    description: "Perfect for small businesses starting with Google Ads",
    features: [
      "Up to $5,000 monthly ad spend",
      "Search & Display campaigns",
      "Monthly performance reports",
      "Keyword research & optimization",
      "Ad copy creation (5 variations)",
      "Basic conversion tracking",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Professional",
    price: { monthly: 800, yearly: 7680 },
    description: "Ideal for growing businesses scaling their ads",
    features: [
      "Up to $15,000 monthly ad spend",
      "All campaign types included",
      "Bi-weekly performance reports",
      "Advanced audience targeting",
      "Ad copy creation (15 variations)",
      "A/B testing & optimization",
      "Remarketing campaigns",
      "Landing page recommendations",
      "Priority support"
    ],
    ctaText: "Start Growing",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 1600, yearly: 15360 },
    description: "For established brands with complex needs",
    features: [
      "Unlimited ad spend management",
      "Full-service campaign management",
      "Weekly performance reports",
      "Custom audience strategies",
      "Unlimited ad variations",
      "Advanced A/B testing",
      "Multi-channel remarketing",
      "Landing page design & testing",
      "Dedicated account manager",
      "24/7 priority support"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  }
];

const googleAdsFAQs: FAQItem[] = [
  {
    question: "How much should I budget for Google Ads?",
    answer: "We recommend starting with at least $2,000-$5,000/month for ad spend, plus our management fee. This allows for proper testing and optimization across multiple campaigns. The exact budget depends on your industry, competition, and goals."
  },
  {
    question: "How long does it take to see results from Google Ads?",
    answer: "You'll start seeing initial data within the first week, but meaningful results typically appear within 4-6 weeks. This timeframe allows us to gather data, optimize campaigns, and refine targeting for better performance."
  },
  {
    question: "What's the difference between Search and Display campaigns?",
    answer: "Search campaigns show text ads to people actively searching for your keywords on Google. Display campaigns show visual banner ads across Google's network of partner websites to build awareness and reach people browsing relevant content."
  },
  {
    question: "Do you provide transparent reporting?",
    answer: "Absolutely! You'll receive detailed monthly reports showing all key metrics: impressions, clicks, conversions, cost per lead, ROI, and more. You'll also have access to a live dashboard to monitor campaign performance in real-time."
  },
  {
    question: "Can you help if my current Google Ads aren't performing?",
    answer: "Yes! We specialize in auditing and optimizing underperforming campaigns. We'll analyze your account structure, keywords, ad copy, landing pages, and bidding strategy to identify issues and implement improvements that lower costs and increase conversions."
  },
  {
    question: "What makes your Google Ads management different?",
    answer: "We combine data-driven strategy with creative excellence. Our team continuously tests ad variations, refines targeting, optimizes bids, and improves landing pages. We focus on quality leads and ROI, not just clicks and traffic."
  }
];

const googleAdsTools: Tool[] = [
  {
    name: "Google Ads",
    logo: "https://cdn.simpleicons.org/googleads/4285F4"
  },
  {
    name: "Google Analytics",
    logo: "https://cdn.simpleicons.org/googleanalytics/E37400"
  },
  {
    name: "Google Tag Manager",
    logo: "https://cdn.simpleicons.org/googletagmanager/246FDB"
  },
  {
    name: "Google Search Console",
    logo: "https://cdn.simpleicons.org/googlesearchconsole/458CF5"
  },
  {
    name: "SEMrush",
    logo: "https://cdn.simpleicons.org/semrush/FF642D"
  },
  {
    name: "Asana",
    logo: "https://cdn.simpleicons.org/asana/F06A6A"
  },
  {
    name: "Google Looker Studio",
    logo: "https://cdn.simpleicons.org/looker/4285F4"
  },
  {
    name: "Hotjar",
    logo: "https://cdn.simpleicons.org/hotjar/FD3A5C"
  },
  {
    name: "Trello",
    logo: "https://cdn.simpleicons.org/trello/0052CC"
  },
  {
    name: "Zapier",
    logo: "https://cdn.simpleicons.org/zapier/FF4A00"
  },
  {
    name: "Slack",
    logo: "https://cdn.simpleicons.org/slack/4A154B"
  },
  {
    name: "HubSpot",
    logo: "https://cdn.simpleicons.org/hubspot/FF7A59"
  },
  {
    name: "Salesforce",
    logo: "https://cdn.simpleicons.org/salesforce/00A1E0"
  },
  {
    name: "Mailchimp",
    logo: "https://cdn.simpleicons.org/mailchimp/FFE01B"
  },
  {
    name: "Shopify",
    logo: "https://cdn.simpleicons.org/shopify/7AB55C"
  },
  {
    name: "WordPress",
    logo: "https://cdn.simpleicons.org/wordpress/21759B"
  },
  {
    name: "Canva",
    logo: "https://cdn.simpleicons.org/canva/00C4CC"
  },
  {
    name: "Figma",
    logo: "https://cdn.simpleicons.org/figma/F24E1E"
  }
];

const googleAdsFeatures: FeatureItem[] = [
  {
    icon: Target,
    title: "Search Campaigns",
    description: "Capture high-intent customers actively searching for your solutions on Google.",
  },
  {
    icon: BarChart3,
    title: "Display Advertising",
    description: "Build brand awareness with visually engaging ads across Google's display network.",
  },
  {
    icon: Zap,
    title: "Shopping Ads",
    description: "Showcase your products directly in search results with optimized shopping campaigns.",
  },
  {
    icon: TrendingUp,
    title: "Remarketing",
    description: "Re-engage visitors who didn't convert with strategic remarketing campaigns.",
  },
  {
    icon: Users,
    title: "Audience Targeting",
    description: "Reach the right people with custom audiences based on demographics and behavior.",
  },
  {
    icon: LineChart,
    title: "Performance Optimization",
    description: "Continuous monitoring and optimization to improve campaign performance.",
  },
];

const googleAdsProcessSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Strategy & Research",
    description: "Deep dive into your business, competitors, and target audience to create a data-driven Google Ads strategy tailored to your goals."
  },
  {
    step: "02",
    title: "Campaign Setup",
    description: "Build optimized campaigns with compelling ad copy, strategic keyword targeting, and conversion-focused landing pages."
  },
  {
    step: "03",
    title: "Launch & Monitor",
    description: "Launch campaigns and monitor performance in real-time with advanced tracking and analytics dashboards for insights."
  },
  {
    step: "04",
    title: "Optimize & Scale",
    description: "Continuous optimization through A/B testing, bid adjustments, and scaling of winning campaigns for maximum ROI."
  }
];

const whyItems: WhyChooseItem[] = [
  { 
    icon: Target, 
    title: "Precision Targeting", 
    desc: "Reach your ideal customers with advanced audience targeting and keyword strategies.", 
    tint: "#E6F0FF", 
    stroke: "#1677ff" 
  },
  { 
    icon: DollarSign, 
    title: "ROI-Focused Campaigns", 
    desc: "Every dollar is tracked and optimized for maximum return on ad spend.", 
    tint: "#E6F0FF", 
    stroke: "#1677ff" 
  },
  { 
    icon: LineChart, 
    title: "Performance Analytics", 
    desc: "Real-time dashboards with detailed insights into campaign performance.", 
    tint: "#E6F0FF", 
    stroke: "#1677ff" 
  },
  { 
    icon: Sparkles, 
    title: "Smart Bidding", 
    desc: "AI-powered bidding strategies that maximize conversions within your budget.", 
    tint: "#E6F0FF", 
    stroke: "#1677ff" 
  },
  { 
    icon: TestTube, 
    title: "A/B Testing", 
    desc: "Continuous testing and optimization of ad copy, landing pages, and targeting.", 
    tint: "#E6F0FF", 
    stroke: "#1677ff" 
  },
  { 
    icon: MousePointerClick, 
    title: "Conversion Tracking", 
    desc: "Pixel-perfect tracking setup for accurate measurement of all conversions.", 
    tint: "#E6F0FF", 
    stroke: "#1677ff" 
  },
];

const GoogleAds = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="GOOGLE ADS"
        heading="Drive Targeted Traffic with Google Ads"
        description="Reach customers at the exact moment they're searching for your products or services. Our data-driven Google Ads campaigns deliver measurable results and maximize your ROI."
        ctaText="Get a Free Audit"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Performance Marketing/GoogleAds.png"
        imageAlt="Google Ads Dashboard Analytics"
      />

      {/* ===== STATS RIBBON ===== */}
      <section className="py-8 sm:py-10">
        <ServicesRibbon 
          title="Trusted by Leading Brands"
          items={ribbonItems}
        />
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <ServiceFeatures
                eyebrow="What We Offer"
                heading="Comprehensive Google Ads Management"
                description="From search campaigns to display and shopping ads, we handle every aspect of your Google Ads strategy."
                features={googleAdsFeatures}
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
                eyebrow="WHY CHOOSE CONNECTLTY" 
                heading="Why Choose Us for Google Ads" 
                eyebrowColor="#0A6B5E" 
                noPadding 
                noCard 
                noContainer 
              />
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* ===== PROCESS CARDS ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[#F1F1E9]">
            <div className="px-6 sm:px-10 lg:px-14 py-4">
              <ProcessCards 
                eyebrow="Our Process"
                subheading="How We Drive Results"
                description="Our proven 4-step process ensures maximum ROI and campaign success"
                steps={googleAdsProcessSteps}
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
              heading="Choose Your Plan"
              description="Select the perfect plan for your Google Ads management needs. All plans include our core features with different limits and capabilities."
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
            title="Powered by Industry-Leading Tools"
            description="We leverage the best tools and platforms in the industry to deliver exceptional results for your Google Ads campaigns. From analytics to optimization, we use cutting-edge technology."
            tools={googleAdsTools}
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
          subtitle="Everything you need to know about our Google Ads management services."
          faqs={googleAdsFAQs}
          accentColor="from-[#0074ED] to-[#5B9BF8]"
        />
      </section>
    </div>
  );
};

export default GoogleAds;
