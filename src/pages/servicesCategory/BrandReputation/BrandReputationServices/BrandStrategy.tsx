import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Compass, Lightbulb, Eye, MessageSquare, Heart, Star
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
    icon: <Compass className="h-5 w-5 text-white" />,
    title: "200+",
    subtitle: "Brands positioned",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "3x",
    subtitle: "Brand value increase",
  },
  {
    icon: <Heart className="h-5 w-5 text-white" />,
    title: "85%",
    subtitle: "Brand recall improvement",
  },
  {
    icon: <Award className="h-5 w-5 text-white" />,
    title: "50+",
    subtitle: "Award-winning brands",
  },
];

const brandStrategyFeatures: FeatureItem[] = [
  {
    icon: Compass,
    title: "Brand Positioning",
    description: "Define your unique position in the market and differentiate from competitors."
  },
  {
    icon: Lightbulb,
    title: "Brand Identity Development",
    description: "Create compelling brand identity including mission, vision, values, and personality."
  },
  {
    icon: MessageSquare,
    title: "Messaging Framework",
    description: "Develop clear, consistent messaging that resonates with your target audience."
  },
  {
    icon: Eye,
    title: "Visual Brand Guidelines",
    description: "Comprehensive brand guidelines ensuring consistency across all touchpoints."
  },
  {
    icon: Users,
    title: "Audience Research",
    description: "Deep understanding of your target audience, their needs, and perceptions."
  },
  {
    icon: Target,
    title: "Competitive Analysis",
    description: "Analyze competitors to identify opportunities for differentiation."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Compass, title: "Strategic Approach", desc: "Data-driven brand strategy that drives business growth." },
  { icon: Lightbulb, title: "Creative Excellence", desc: "Award-winning creative team with proven track record." },
  { icon: Target, title: "Market Differentiation", desc: "Position your brand uniquely in the market." },
  { icon: Users, title: "Audience-Centric", desc: "Strategies built around deep audience understanding." },
  { icon: Zap, title: "Proven Results", desc: "Track record of 3x brand value increases." },
  { icon: Award, title: "Expert Team", desc: "Experienced brand strategists and creative directors." },
];

const brandStrategyProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Discovery & Research", 
    description: "Comprehensive research on your business, market, competitors, and audience." 
  },
  { 
    step: "02", 
    title: "Strategy Development", 
    description: "Develop brand positioning, identity, and messaging framework." 
  },
  { 
    step: "03", 
    title: "Creative Execution", 
    description: "Create visual identity, brand guidelines, and key brand assets." 
  },
  { 
    step: "04", 
    title: "Implementation & Launch", 
    description: "Roll out brand strategy across all touchpoints and channels." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 2000, yearly: 19200 },
    description: "Essential brand strategy",
    features: [
      "Brand audit & analysis",
      "Brand positioning",
      "Basic messaging framework",
      "Visual identity guidelines",
      "Competitor analysis",
      "2 revision rounds"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 4000, yearly: 38400 },
    description: "Comprehensive brand strategy",
    features: [
      "In-depth brand research",
      "Complete brand positioning",
      "Advanced messaging framework",
      "Full visual identity system",
      "Brand guidelines document",
      "Audience personas",
      "3 revision rounds",
      "Brand workshop"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 8000, yearly: 76800 },
    description: "Enterprise brand strategy",
    features: [
      "Comprehensive brand strategy",
      "Multi-brand architecture",
      "Global brand guidelines",
      "Complete visual system",
      "Brand activation plan",
      "Internal brand training",
      "Unlimited revisions",
      "Dedicated brand team",
      "Ongoing brand management"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const brandStrategyTools: Tool[] = [
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Adobe Creative Cloud", logo: "https://cdn.simpleicons.org/adobe/FF0000" },
  { name: "Miro", logo: "https://logo.clearbit.com/miro.com" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion/000000" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "SEMrush", logo: "https://cdn.simpleicons.org/semrush/FF642D" },
  { name: "Brandwatch", logo: "https://logo.clearbit.com/brandwatch.com" },
  { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
];

const brandStrategyFAQs: FAQItem[] = [
  {
    question: "What is brand strategy and why do I need it?",
    answer: "Brand strategy is a long-term plan for developing a successful brand to achieve specific goals. It defines who you are, what you stand for, and how you're different from competitors. Without strategy, branding efforts are scattered and ineffective. A strong brand strategy: increases brand value (3x average), improves customer loyalty, commands premium pricing, attracts better talent, and drives business growth. It's the foundation for all marketing and business decisions."
  },
  {
    question: "How long does brand strategy development take?",
    answer: "Comprehensive brand strategy typically takes 8-12 weeks: Week 1-3: Discovery and research (market analysis, competitor research, audience insights), Week 4-6: Strategy development (positioning, messaging, identity), Week 7-9: Creative execution (visual identity, guidelines), Week 10-12: Refinement and delivery. Simple brand refreshes can be faster (4-6 weeks). Complex multi-brand strategies may take 12-16 weeks. Timeline depends on scope and stakeholder alignment."
  },
  {
    question: "What's included in brand positioning?",
    answer: "Brand positioning defines your unique place in the market. It includes: target audience definition, competitive differentiation, unique value proposition, brand promise, positioning statement, and proof points. We analyze your strengths, market opportunities, and competitive landscape to find your sweet spot. Good positioning is: relevant to your audience, differentiated from competitors, credible and deliverable, and sustainable long-term."
  },
  {
    question: "How do you develop brand messaging?",
    answer: "We create a comprehensive messaging framework: brand story and narrative, key messages and pillars, value propositions, elevator pitch, tagline and slogans, tone of voice guidelines, and messaging by audience segment. Process includes: audience research, competitive analysis, message testing, and stakeholder workshops. The framework ensures consistent communication across all channels and touchpoints."
  },
  {
    question: "Can you help with brand naming?",
    answer: "Yes! Brand naming is part of our strategy service. Process includes: naming strategy and criteria, creative brainstorming, name generation (100+ options), shortlist development (10-15 names), trademark screening, domain availability check, stakeholder testing, and final selection. We ensure names are: memorable, meaningful, differentiated, legally available, and work globally if needed."
  },
  {
    question: "What are brand guidelines and why are they important?",
    answer: "Brand guidelines are a comprehensive document that defines how your brand should be presented. They include: logo usage and variations, color palette and specifications, typography and fonts, imagery style and photography, tone of voice, and application examples. Guidelines ensure: consistency across all touchpoints, professional brand presentation, easier onboarding of new team members, and protection of brand equity. We create guidelines that are practical and easy to use."
  },
  {
    question: "How do you measure brand strategy success?",
    answer: "We track multiple metrics: brand awareness (aided and unaided recall), brand perception (sentiment, attributes), brand preference (consideration, choice), brand loyalty (repeat purchase, NPS), and business impact (revenue, market share, premium pricing). We establish baseline metrics before strategy launch, then track quarterly. Most clients see significant improvements within 6-12 months: 50-100% increase in awareness, 30-50% improvement in perception, and 20-40% increase in preference."
  },
  {
    question: "What if we already have a brand but need to refresh it?",
    answer: "Brand refresh is common and often necessary. We start with: brand audit (current state analysis), stakeholder interviews, market research, and competitive analysis. Then determine refresh scope: minor (visual updates, messaging refinement), moderate (repositioning, new identity), or major (complete rebrand). We preserve brand equity while modernizing for current market. Most refreshes take 6-10 weeks and result in renewed brand relevance and improved performance."
  },
];

const BrandStrategy = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="BRAND STRATEGY"
        heading="Build a Powerful Brand That Drives Business Growth"
        description="Strategic brand development that differentiates you in the market, resonates with your audience, and drives measurable business results."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Brand&Reputation/BrandStrategy.png"
        imageAlt="Brand Strategy"
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
                heading="Comprehensive Brand Strategy Services"
                description="From positioning to visual identity, we create brands that stand out and drive growth."
                features={brandStrategyFeatures}
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
                heading="Why Choose Our Brand Strategy Services" 
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
                subheading="How We Develop Brand Strategy"
                description="A proven methodology for creating brands that win in the market"
                steps={brandStrategyProcessSteps}
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
                heading="Choose Your Brand Strategy Plan"
                description="Select the perfect plan for your brand strategy needs. All plans include comprehensive research and strategy development."
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
            title="Powered by Leading Brand Tools"
            description="We use the best strategy, design, and research tools to create powerful brands."
            tools={brandStrategyTools}
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
        subtitle="Everything you need to know about brand strategy services"
        faqs={brandStrategyFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default BrandStrategy;
