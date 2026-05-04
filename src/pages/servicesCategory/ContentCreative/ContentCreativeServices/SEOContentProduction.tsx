import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Search, FileText, Edit, CheckCircle, Globe, TrendingDown
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
    title: "10K+",
    subtitle: "Articles published",
  },
  {
    icon: <Search className="h-5 w-5 text-white" />,
    title: "500%",
    subtitle: "Average traffic increase",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "#1",
    subtitle: "Rankings achieved",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "50M+",
    subtitle: "Organic visitors driven",
  },
];

const seoContentFeatures: FeatureItem[] = [
  {
    icon: Search,
    title: "SEO-Optimized Content",
    description: "Content crafted to rank high in search engines while providing value to readers."
  },
  {
    icon: FileText,
    title: "Blog Posts & Articles",
    description: "High-quality, engaging blog content that drives organic traffic and establishes authority."
  },
  {
    icon: Globe,
    title: "Website Copy & Landing Pages",
    description: "Conversion-focused website content optimized for both search engines and users."
  },
  {
    icon: Edit,
    title: "Content Optimization",
    description: "Refresh and optimize existing content to improve rankings and performance."
  },
  {
    icon: Target,
    title: "Keyword Research & Strategy",
    description: "Comprehensive keyword research to target high-value search terms."
  },
  {
    icon: CheckCircle,
    title: "Content Quality Assurance",
    description: "Rigorous editing and fact-checking to ensure accuracy and readability."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Search, title: "SEO Expertise", desc: "Deep understanding of search algorithms and ranking factors." },
  { icon: FileText, title: "Quality Content", desc: "Well-researched, engaging content that readers love." },
  { icon: TrendingUp, title: "Proven Results", desc: "Track record of 500%+ organic traffic increases." },
  { icon: Target, title: "Strategic Approach", desc: "Content aligned with business goals and search intent." },
  { icon: Users, title: "Audience-Focused", desc: "Content that resonates with your target audience." },
  { icon: Award, title: "Expert Writers", desc: "Team of experienced SEO content writers and editors." },
];

const seoContentProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Research & Planning", 
    description: "Keyword research, competitor analysis, and content planning aligned with SEO goals." 
  },
  { 
    step: "02", 
    title: "Content Creation", 
    description: "Expert writers create SEO-optimized, high-quality content based on research." 
  },
  { 
    step: "03", 
    title: "Optimization & Editing", 
    description: "Content optimized for SEO, edited for quality, and formatted for readability." 
  },
  { 
    step: "04", 
    title: "Publishing & Monitoring", 
    description: "Content published and performance monitored to track rankings and traffic." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 800, yearly: 7680 },
    description: "Essential SEO content",
    features: [
      "4 blog posts per month",
      "Keyword research",
      "SEO optimization",
      "Basic editing",
      "Monthly performance report",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1600, yearly: 15360 },
    description: "Comprehensive SEO content",
    features: [
      "8 blog posts per month",
      "Advanced keyword research",
      "Full SEO optimization",
      "Professional editing",
      "Content refresh (2 posts)",
      "Landing page copy",
      "Performance tracking",
      "Priority support"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 3200, yearly: 30720 },
    description: "Enterprise SEO content",
    features: [
      "16+ blog posts per month",
      "Comprehensive keyword strategy",
      "Advanced SEO optimization",
      "Expert editing & QA",
      "Content refresh (5 posts)",
      "Website copy & landing pages",
      "Content strategy",
      "Dedicated content team",
      "Weekly reporting"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const seoContentTools: Tool[] = [
  { name: "SEMrush", logo: "https://cdn.simpleicons.org/semrush/FF642D" },
  { name: "Ahrefs", logo: "https://logo.clearbit.com/ahrefs.com" },
  { name: "Google Search Console", logo: "https://cdn.simpleicons.org/googlesearchconsole/458CF5" },
  { name: "Surfer SEO", logo: "https://logo.clearbit.com/surferseo.com" },
  { name: "Clearscope", logo: "https://logo.clearbit.com/clearscope.io" },
  { name: "Grammarly", logo: "https://logo.clearbit.com/grammarly.com" },
  { name: "WordPress", logo: "https://cdn.simpleicons.org/wordpress/21759B" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
];

const seoContentFAQs: FAQItem[] = [
  {
    question: "What makes SEO content different from regular content?",
    answer: "SEO content is strategically optimized to rank in search engines while still providing value to readers. Key differences: keyword optimization (targeting specific search terms), search intent alignment (matching what users are looking for), technical optimization (meta tags, headers, internal linking), and data-driven approach (based on search volume and competition). Good SEO content ranks well AND engages readers - it's not just keyword stuffing."
  },
  {
    question: "How long does it take to see SEO results?",
    answer: "SEO is a long-term strategy. Typical timeline: Month 1-3: Content published, indexed by Google, Month 3-6: Rankings start improving, traffic increases, Month 6-12: Significant traffic growth, top rankings achieved, Month 12+: Compounding returns, sustained traffic. Some content ranks quickly (weeks), others take months. Factors include: domain authority, competition, content quality, and backlinks. Most clients see meaningful results by month 6."
  },
  {
    question: "How do you choose keywords to target?",
    answer: "We use a strategic approach: analyze search volume and competition, assess business value and conversion potential, evaluate search intent and user needs, review competitor rankings, and identify content gaps and opportunities. We target a mix of: high-volume head terms (competitive, high traffic), long-tail keywords (easier to rank, high intent), and question-based queries (featured snippet opportunities). Each piece targets primary and secondary keywords."
  },
  {
    question: "Can you write about technical or niche topics?",
    answer: "Yes! We specialize in technical B2B content. Our process: subject matter expert interviews, comprehensive research and fact-checking, technical accuracy review, and industry-specific terminology. We've written for: SaaS and technology, healthcare and biotech, manufacturing and industrial, financial services, and legal and compliance. We can handle complex topics while making them accessible to your target audience."
  },
  {
    question: "Do you optimize existing content?",
    answer: "Absolutely! Content refresh is highly effective. We: audit existing content performance, identify optimization opportunities, update with current information, improve SEO optimization, enhance readability and structure, and add new sections or examples. Refreshed content often ranks better than new content because it has existing authority. We typically see 50-200% traffic increases from content refresh."
  },
  {
    question: "How do you ensure content quality?",
    answer: "We have a rigorous quality process: experienced writers with subject expertise, comprehensive research and fact-checking, SEO optimization by specialists, professional editing for clarity and grammar, plagiarism checking, and client review and approval. Every piece goes through multiple review stages. We also track performance and continuously improve based on what works."
  },
  {
    question: "What content formats do you create?",
    answer: "We create various SEO content formats: blog posts and articles (800-3000+ words), pillar pages and guides (3000-5000+ words), landing pages and website copy, product descriptions, case studies and whitepapers, FAQ pages, and glossaries and resource pages. Each format is optimized for its specific purpose and search intent. We recommend formats based on your goals and target keywords."
  },
  {
    question: "How do you measure content performance?",
    answer: "We track comprehensive metrics: organic traffic and rankings, keyword positions and visibility, engagement (time on page, bounce rate), conversions and leads generated, backlinks earned, and featured snippets won. Monthly reports show: traffic growth, ranking improvements, top-performing content, and optimization recommendations. We use data to continuously improve content strategy and performance."
  },
];

const SEOContentProduction = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="SEO CONTENT PRODUCTION"
        heading="SEO-Optimized Content That Ranks and Converts"
        description="High-quality, search-optimized content that drives organic traffic, establishes authority, and generates leads."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Content Creative/SEOContentProduction.png"
        imageAlt="SEO Content Production"
      />

      {/* ===== STATS RIBBON ===== */}
      <section className="py-8 sm:py-10">
        <ServicesRibbon 
        title="Proven SEO Content Results"
        items={ribbonItems}
      />
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <ServiceFeatures
                eyebrow="What We Offer"
                heading="Complete SEO Content Services"
                description="From keyword research to published content, we handle every aspect of SEO content production."
                features={seoContentFeatures}
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
                heading="Why Choose Our SEO Content Services" 
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
                subheading="How We Create SEO Content"
                description="A proven methodology for creating content that ranks and converts"
                steps={seoContentProcessSteps}
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
                heading="Choose Your Content Plan"
                description="Select the perfect plan for your SEO content needs. All plans include keyword research and optimization."
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
        <ScrollAnimatedSection bgColor="bg-[#F1F1E9]">
          <ToolStackSection 
            title="Powered by Leading SEO Tools"
            description="We use the best SEO and content tools to create high-ranking content."
            tools={seoContentTools}
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
        subtitle="Everything you need to know about SEO content production"
        faqs={seoContentFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default SEOContentProduction;
