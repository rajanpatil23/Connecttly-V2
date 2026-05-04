import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Users, TrendingUp, Video, Heart, Share2, Star,
  Camera, MessageCircle, Award, Zap, Target, BarChart3
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
    icon: <Users className="h-5 w-5 text-white" />,
    title: "1000+",
    subtitle: "Influencer partnerships",
  },
  {
    icon: <Video className="h-5 w-5 text-white" />,
    title: "5M+",
    subtitle: "Content impressions",
  },
  {
    icon: <Heart className="h-5 w-5 text-white" />,
    title: "8.5%",
    subtitle: "Average engagement rate",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "4.2x",
    subtitle: "ROI on campaigns",
  },
];

const influencerFeatures: FeatureItem[] = [
  {
    icon: Users,
    title: "Influencer Discovery & Vetting",
    description: "Find and vet authentic influencers who align with your brand values and target audience."
  },
  {
    icon: MessageCircle,
    title: "Campaign Strategy & Briefs",
    description: "Develop compelling campaign concepts and detailed creator briefs for maximum impact."
  },
  {
    icon: Video,
    title: "Content Creation & Management",
    description: "Coordinate content creation, review, and approval across multiple creators simultaneously."
  },
  {
    icon: Share2,
    title: "UGC Content Library",
    description: "Build a library of authentic user-generated content for use across all marketing channels."
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Monitor campaign performance with detailed analytics on reach, engagement, and conversions."
  },
  {
    icon: Award,
    title: "Creator Relationship Management",
    description: "Manage ongoing relationships with top-performing creators for long-term partnerships."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Authentic Partnerships", desc: "Connect with creators who genuinely resonate with your brand and audience." },
  { icon: Video, title: "High-Quality Content", desc: "Professional content creation that drives engagement and conversions." },
  { icon: Users, title: "Diverse Creator Network", desc: "Access to micro, mid-tier, and macro influencers across all platforms." },
  { icon: BarChart3, title: "Data-Driven Selection", desc: "Use analytics and audience insights to choose the right creators." },
  { icon: Zap, title: "Fast Execution", desc: "Launch campaigns quickly with our streamlined creator management process." },
  { icon: Award, title: "Proven Results", desc: "Track record of successful campaigns with measurable ROI." },
];

const influencerProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Discovery & Strategy", 
    description: "Identify campaign goals, target audience, and discover relevant creators who align with your brand." 
  },
  { 
    step: "02", 
    title: "Outreach & Negotiation", 
    description: "Connect with creators, negotiate terms, and establish clear campaign guidelines and deliverables." 
  },
  { 
    step: "03", 
    title: "Content Creation", 
    description: "Coordinate content creation, provide feedback, and ensure brand alignment before publishing." 
  },
  { 
    step: "04", 
    title: "Launch & Optimize", 
    description: "Publish content, monitor performance, and optimize based on engagement and conversion data." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 800, yearly: 7680 },
    description: "Perfect for testing influencer marketing",
    features: [
      "5-10 micro-influencers",
      "Campaign strategy & briefs",
      "Creator discovery & vetting",
      "Content review & approval",
      "Basic performance reporting",
      "1 campaign per month"
    ],
    ctaText: "Start Campaign",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1600, yearly: 15360 },
    description: "Scale your influencer marketing efforts",
    features: [
      "15-25 creators (micro to mid-tier)",
      "Multi-platform campaigns",
      "UGC content library",
      "Advanced analytics dashboard",
      "Content rights management",
      "2-3 campaigns per month",
      "Creator relationship management",
      "Dedicated campaign manager"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 3200, yearly: 30720 },
    description: "Full-service influencer marketing program",
    features: [
      "50+ creators (all tiers)",
      "Always-on campaigns",
      "Custom content production",
      "Influencer events & activations",
      "White-label reporting",
      "Unlimited campaigns",
      "Long-term creator partnerships",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const influencerTools: Tool[] = [
  { name: "AspireIQ", logo: "https://logo.clearbit.com/aspireiq.com" },
  { name: "Grin", logo: "https://logo.clearbit.com/grin.co" },
  { name: "CreatorIQ", logo: "https://logo.clearbit.com/creatoriq.com" },
  { name: "Instagram", logo: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: "TikTok", logo: "https://cdn.simpleicons.org/tiktok/000000" },
  { name: "YouTube", logo: "https://cdn.simpleicons.org/youtube/FF0000" },
  { name: "HypeAuditor", logo: "https://logo.clearbit.com/hypeauditor.com" },
  { name: "Upfluence", logo: "https://logo.clearbit.com/upfluence.com" },
];

const influencerFAQs: FAQItem[] = [
  {
    question: "What's the difference between influencer marketing and UGC?",
    answer: "Influencer marketing involves partnering with creators who have established audiences to promote your brand. UGC (User-Generated Content) is authentic content created by customers or creators that you can repurpose across your marketing channels. We help with both - finding influencers for reach and engagement, and collecting UGC for authentic social proof."
  },
  {
    question: "How do you find and vet influencers?",
    answer: "We use a combination of influencer discovery platforms, manual research, and data analysis. We vet creators based on: audience authenticity (checking for fake followers), engagement rates, audience demographics, content quality, brand alignment, and past campaign performance. We also review their content history to ensure brand safety."
  },
  {
    question: "What platforms do you work with?",
    answer: "We manage influencer campaigns across all major platforms: Instagram, TikTok, YouTube, Twitter/X, LinkedIn, and emerging platforms. We'll recommend the best platforms based on your target audience and campaign goals."
  },
  {
    question: "How much do influencers cost?",
    answer: "Costs vary widely based on follower count, engagement rate, platform, and content type. Micro-influencers (10K-100K followers) typically charge $100-$1,000 per post. Mid-tier (100K-500K) range from $1,000-$10,000. Macro influencers (500K+) can charge $10,000-$100,000+. We negotiate competitive rates and can work within your budget."
  },
  {
    question: "Do we own the content creators make?",
    answer: "Content rights are negotiated as part of each partnership. Typically, creators retain ownership but grant you usage rights for a specified period and channels. We can negotiate full buyouts for additional fees if you need unlimited usage rights. All agreements are clearly documented in contracts."
  },
  {
    question: "How do you measure influencer campaign success?",
    answer: "We track multiple metrics: reach and impressions, engagement rate (likes, comments, shares), click-through rates, conversions and sales (using tracking links/codes), cost per engagement, ROI, and brand sentiment. We provide detailed reports showing which creators and content types perform best."
  },
  {
    question: "Can you help us build long-term creator relationships?",
    answer: "Absolutely! Long-term partnerships often perform better than one-off campaigns. We help identify top-performing creators, negotiate ongoing agreements, manage regular content calendars, and nurture relationships. Many of our clients have brand ambassador programs with their best creators."
  },
  {
    question: "What if an influencer doesn't deliver or creates poor content?",
    answer: "We have safeguards in place: detailed contracts with deliverable requirements, content approval processes before publishing, and payment terms tied to deliverables. If issues arise, we handle communication and resolution. We also maintain backup creator lists to ensure campaign timelines are met."
  },
];

const InfluencerUGC = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="INFLUENCER & UGC MARKETING"
        heading="Authentic Creators That Drive Real Results"
        description="Partner with influencers and leverage user-generated content to build trust, increase engagement, and drive conversions at scale."
        ctaText="Launch Campaign"
        ctaLink="/resources/support"
        imageSrc="/images/Services/DemandGrowthGeneration/InfluencerandUGC.png"
        imageAlt="Influencer Content Creation"
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
                heading="Complete Influencer Marketing Services"
                description="From discovery to campaign execution, we handle every aspect of your influencer and UGC strategy."
                features={influencerFeatures}
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
                heading="Why Choose Us for Influencer Marketing" 
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
                subheading="How We Execute Influencer Campaigns"
                description="A proven methodology for finding creators and launching successful campaigns"
                steps={influencerProcessSteps}
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
                heading="Choose Your Influencer Plan"
                description="Select the perfect plan for your influencer marketing needs. All plans include creator vetting and campaign management."
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
            title="Powered by Leading Influencer Platforms"
            description="We leverage the best influencer marketing platforms and social media tools to discover creators, manage campaigns, and track performance."
            tools={influencerTools}
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
        subtitle="Everything you need to know about our influencer marketing services"
        faqs={influencerFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default InfluencerUGC;
