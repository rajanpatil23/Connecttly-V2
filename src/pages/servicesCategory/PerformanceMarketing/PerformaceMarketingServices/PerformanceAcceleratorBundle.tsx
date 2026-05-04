import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Zap, DollarSign, LineChart, Gauge, 
  TestTube, Crosshair, Users, BarChart3, ArrowRight, CheckCircle2, 
  Award, Clock, UserCheck, MousePointerClick, BarChart2, Sparkles,
  Building2, ThumbsUp, Rocket, Headphones, Package, Layers, 
  Infinity, Crown, Star, Gem
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
    color: "bg-[#0074ED]",
    icon: <Building2 className="h-5 w-5 text-white" />,
    title: "50+",
    subtitle: "Enterprise clients",
  },
  {
    color: "bg-[#0074ED]",
    icon: <ThumbsUp className="h-5 w-5 text-white" />,
    title: "3X",
    subtitle: "Avg ROI increase",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Rocket className="h-5 w-5 text-white" />,
    title: "$100M+",
    subtitle: "Revenue generated",
  },
  {
    color: "bg-[#0074ED]",
    icon: <Headphones className="h-5 w-5 text-white" />,
    title: "24/7",
    subtitle: "Dedicated support",
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Growth Bundle",
    price: { monthly: 3200, yearly: 30720 },
    description: "Complete performance marketing for growing businesses",
    features: [
      "Google Ads management",
      "Meta Ads (Facebook & Instagram)",
      "YouTube Ads",
      "Landing page optimization",
      "Monthly strategy sessions",
      "Dedicated account manager",
      "Advanced analytics & reporting",
      "A/B testing & optimization",
      "Priority support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Scale Bundle",
    price: { monthly: 6000, yearly: 57600 },
    description: "Full-service performance marketing for scaling brands",
    features: [
      "Everything in Growth Bundle",
      "Short-form video ads (TikTok, Reels, Shorts)",
      "CRO & funnel optimization",
      "Video production (20 videos/month)",
      "Influencer partnerships",
      "Cross-platform remarketing",
      "Weekly strategy sessions",
      "Custom reporting dashboards",
      "Bi-weekly optimization reviews",
      "24/7 priority support"
    ],
    ctaText: "Start Scaling",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise Bundle",
    price: { monthly: 12000, yearly: 115200 },
    description: "White-glove performance marketing for enterprises",
    features: [
      "Everything in Scale Bundle",
      "Unlimited ad spend management",
      "Unlimited video production",
      "Custom platform integrations",
      "Predictive analytics & AI",
      "Multi-brand management",
      "Executive strategy sessions",
      "Dedicated team (5+ specialists)",
      "Real-time optimization",
      "White-label reporting",
      "24/7 dedicated support line"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  }
];

const bundleFAQs: FAQItem[] = [
  {
    question: "What's included in the Performance Accelerator Bundle?",
    answer: "The bundle includes comprehensive management of Google Ads, Meta Ads, YouTube Ads, short-form video ads (TikTok, Reels, Shorts), CRO & funnel optimization, video production, landing page design, and ongoing optimization. It's a complete performance marketing solution managed by a dedicated team."
  },
  {
    question: "How is the bundle different from individual services?",
    answer: "The bundle provides integrated, cross-platform strategies that work together synergistically. You get better results, significant cost savings (30-40% vs individual services), a unified strategy, single point of contact, and holistic optimization across all channels."
  },
  {
    question: "What kind of results can I expect?",
    answer: "Our bundle clients typically see 2-3X ROI within 6 months, 40-60% reduction in cost per acquisition, 50-80% increase in qualified leads, and 30-50% improvement in conversion rates. Results vary by industry and starting point, but our integrated approach consistently outperforms single-channel strategies."
  },
  {
    question: "Do I need to commit to all platforms?",
    answer: "While the bundle includes all platforms, we customize the strategy based on your goals, audience, and budget. We may focus more heavily on certain platforms initially and expand as we identify opportunities. The flexibility of the bundle allows us to allocate resources where they'll have the most impact."
  },
  {
    question: "How much should I budget for ad spend?",
    answer: "We recommend a minimum of $25,000-$50,000/month in total ad spend across all platforms for the Growth Bundle, $50,000-$100,000/month for the Scale Bundle, and $100,000+ for Enterprise. This allows for proper testing and optimization across multiple channels."
  },
  {
    question: "What makes your bundle approach better?",
    answer: "Our integrated approach means all channels work together strategically. We use insights from one platform to optimize others, create cohesive messaging across channels, retarget users cross-platform, and optimize budget allocation in real-time. This holistic strategy delivers better results than managing channels in silos."
  }
];

const bundleTools: Tool[] = [
  {
    name: "Google Ads",
    logo: "https://cdn.simpleicons.org/googleads/4285F4"
  },
  {
    name: "Meta Business Suite",
    logo: "https://cdn.simpleicons.org/meta/0668E1"
  },
  {
    name: "YouTube",
    logo: "https://cdn.simpleicons.org/youtube/FF0000"
  },
  {
    name: "TikTok",
    logo: "https://cdn.simpleicons.org/tiktok/000000"
  },
  {
    name: "Google Analytics",
    logo: "https://cdn.simpleicons.org/googleanalytics/E37400"
  },
  {
    name: "Hotjar",
    logo: "https://cdn.simpleicons.org/hotjar/FD3A5C"
  },
  {
    name: "Optimizely",
    logo: "https://cdn.simpleicons.org/optimizely/0073E6"
  },
  {
    name: "Adobe Creative Cloud",
    logo: "https://cdn.simpleicons.org/adobecreativecloud/DA1F26"
  },
  {
    name: "Canva",
    logo: "https://cdn.simpleicons.org/canva/00C4CC"
  },
  {
    name: "Figma",
    logo: "https://cdn.simpleicons.org/figma/F24E1E"
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
    name: "Slack",
    logo: "https://cdn.simpleicons.org/slack/4A154B"
  },
  {
    name: "Asana",
    logo: "https://cdn.simpleicons.org/asana/F06A6A"
  },
  {
    name: "Zapier",
    logo: "https://cdn.simpleicons.org/zapier/FF4A00"
  },
  {
    name: "Trello",
    logo: "https://cdn.simpleicons.org/trello/0052CC"
  }
];

const bundleFeatures: FeatureItem[] = [
  {
    icon: Package,
    title: "All-in-One Solution",
    description: "Complete performance marketing across Google, Meta, YouTube, TikTok, and more - all managed by one expert team.",
  },
  {
    icon: Layers,
    title: "Integrated Strategy",
    description: "Cohesive cross-platform strategies that work together synergistically for maximum impact and ROI.",
  },
  {
    icon: Gem,
    title: "Premium Services",
    description: "Video production, landing page design, CRO, and creative services all included in one package.",
  },
  {
    icon: Crown,
    title: "Dedicated Team",
    description: "Your own team of specialists including strategists, designers, copywriters, and analysts.",
  },
  {
    icon: Infinity,
    title: "Unlimited Optimization",
    description: "Continuous testing, optimization, and improvement across all channels with no limits.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Our bundle clients see 2-3X better ROI compared to managing channels separately.",
  },
];

const bundleProcessSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Strategic Planning",
    description: "Comprehensive audit and strategy development across all channels, identifying opportunities and creating an integrated roadmap."
  },
  {
    step: "02",
    title: "Multi-Channel Launch",
    description: "Simultaneous launch of optimized campaigns across Google, Meta, YouTube, and short-form platforms with unified messaging."
  },
  {
    step: "03",
    title: "Cross-Platform Optimization",
    description: "Use insights from each platform to optimize others, creating a synergistic effect that amplifies results."
  },
  {
    step: "04",
    title: "Scale & Dominate",
    description: "Continuously scale winning campaigns, expand to new platforms, and dominate your market with data-driven strategies."
  }
];

const whyItems: WhyChooseItem[] = [
  { 
    icon: Package, 
    title: "Complete Solution", 
    desc: "Everything you need for performance marketing success in one comprehensive, integrated package.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: DollarSign, 
    title: "Cost Savings", 
    desc: "Save 30-40% compared to purchasing services individually while getting better results.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Layers, 
    title: "Integrated Strategy", 
    desc: "All channels work together strategically for synergistic effects and maximum ROI.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Crown, 
    title: "Dedicated Team", 
    desc: "Your own team of specialists working exclusively on your success across all platforms.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: Sparkles, 
    title: "Premium Services", 
    desc: "Video production, design, CRO, and creative services all included at no extra cost.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
  { 
    icon: TrendingUp, 
    title: "Proven Results", 
    desc: "Our bundle clients consistently achieve 2-3X better ROI than single-channel approaches.", 
    tint: "#E6F7FB", 
    stroke: "#0EA5E9" 
  },
];

const PerformanceAcceleratorBundle = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="PERFORMANCE ACCELERATOR BUNDLE"
        heading="Complete Performance Marketing Solution"
        description="Dominate every channel with our all-in-one Performance Accelerator Bundle. Get Google Ads, Meta Ads, YouTube, TikTok, CRO, video production, and more - all managed by one expert team for maximum ROI and efficiency."
        ctaText="Get a Free Strategy Session"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Performance Marketing/PerformanceAcceleratorBundle.png"
        imageAlt="Performance Marketing Dashboard"
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
                eyebrow="What's Included"
                heading="Everything You Need to Dominate Performance Marketing"
                description="Our comprehensive bundle includes all services, platforms, and expertise needed to maximize your performance marketing ROI."
                features={bundleFeatures}
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
                heading="Why Choose Our Performance Accelerator Bundle" 
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
                subheading="How We Accelerate Your Growth"
                description="Our proven 4-step process ensures maximum ROI across all performance marketing channels"
                steps={bundleProcessSteps}
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
              heading="Choose Your Bundle"
              description="Select the perfect bundle for your business. All plans include comprehensive multi-channel management and dedicated support."
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
            description="We leverage the best tools across all platforms to deliver exceptional results. From advertising to analytics, creative to optimization - we use cutting-edge technology."
            tools={bundleTools}
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
        subtitle="Everything you need to know about our Performance Accelerator Bundle."
        faqs={bundleFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default PerformanceAcceleratorBundle;
