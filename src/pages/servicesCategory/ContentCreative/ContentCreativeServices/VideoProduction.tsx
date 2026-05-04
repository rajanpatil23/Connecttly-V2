import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Video, Film, Play, Edit3, Camera, Sparkles
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
    icon: <Video className="h-5 w-5 text-white" />,
    title: "1000+",
    subtitle: "Videos produced",
  },
  {
    icon: <Play className="h-5 w-5 text-white" />,
    title: "100M+",
    subtitle: "Video views",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "10x",
    subtitle: "Engagement increase",
  },
  {
    icon: <Award className="h-5 w-5 text-white" />,
    title: "50+",
    subtitle: "Award-winning videos",
  },
];

const videoProductionFeatures: FeatureItem[] = [
  {
    icon: Film,
    title: "Explainer Videos",
    description: "Clear, engaging videos that explain your product, service, or concept effectively."
  },
  {
    icon: Camera,
    title: "Product Demos",
    description: "Professional product demonstrations that showcase features and benefits."
  },
  {
    icon: Users,
    title: "Customer Testimonials",
    description: "Authentic testimonial videos that build trust and credibility."
  },
  {
    icon: Sparkles,
    title: "Brand Videos",
    description: "Compelling brand stories that connect emotionally with your audience."
  },
  {
    icon: Edit3,
    title: "Social Media Videos",
    description: "Short-form videos optimized for social platforms and maximum engagement."
  },
  {
    icon: Play,
    title: "Video Ads",
    description: "High-converting video ads for YouTube, Facebook, LinkedIn, and more."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Film, title: "Professional Quality", desc: "Broadcast-quality videos that elevate your brand." },
  { icon: Sparkles, title: "Creative Excellence", desc: "Award-winning creative team with proven track record." },
  { icon: Target, title: "Strategic Approach", desc: "Videos designed to achieve specific business goals." },
  { icon: Zap, title: "Fast Turnaround", desc: "Efficient production process without compromising quality." },
  { icon: Users, title: "Full-Service", desc: "From concept to final delivery, we handle everything." },
  { icon: Award, title: "Proven Results", desc: "Videos that drive 10x engagement and conversions." },
];

const videoProductionProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Discovery & Concept", 
    description: "Understand goals, audience, and message. Develop creative concept and script." 
  },
  { 
    step: "02", 
    title: "Pre-Production", 
    description: "Storyboarding, shot planning, talent casting, and location scouting." 
  },
  { 
    step: "03", 
    title: "Production", 
    description: "Professional filming with high-end equipment and experienced crew." 
  },
  { 
    step: "04", 
    title: "Post-Production", 
    description: "Editing, color grading, sound design, and final delivery in all formats." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1200, yearly: 11520 },
    description: "Essential video production",
    features: [
      "1 video per month",
      "Up to 60 seconds",
      "Script development",
      "Professional editing",
      "Stock footage & music",
      "2 revision rounds",
      "HD delivery"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 2400, yearly: 23040 },
    description: "Professional video production",
    features: [
      "2 videos per month",
      "Up to 2 minutes each",
      "Creative concept & script",
      "Professional filming",
      "Advanced editing & effects",
      "Custom graphics & animation",
      "3 revision rounds",
      "4K delivery",
      "Social media versions"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 5200, yearly: 49920 },
    description: "Enterprise video production",
    features: [
      "4+ videos per month",
      "Unlimited length",
      "Full creative development",
      "On-location filming",
      "Professional talent",
      "Advanced post-production",
      "Custom animations",
      "Unlimited revisions",
      "Multi-format delivery",
      "Dedicated video team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const videoProductionTools: Tool[] = [
  { name: "Adobe Premiere Pro", logo: "https://cdn.simpleicons.org/adobepremierepro/9999FF" },
  { name: "After Effects", logo: "https://cdn.simpleicons.org/adobeaftereffects/9999FF" },
  { name: "DaVinci Resolve", logo: "https://logo.clearbit.com/blackmagicdesign.com" },
  { name: "Final Cut Pro", logo: "https://cdn.simpleicons.org/apple/000000" },
  { name: "Cinema 4D", logo: "https://logo.clearbit.com/maxon.net" },
  { name: "Blender", logo: "https://cdn.simpleicons.org/blender/F5792A" },
  { name: "Frame.io", logo: "https://logo.clearbit.com/frame.io" },
  { name: "Vimeo", logo: "https://cdn.simpleicons.org/vimeo/1AB7EA" },
];

const videoProductionFAQs: FAQItem[] = [
  {
    question: "What types of videos do you produce?",
    answer: "We produce all types of business videos: explainer videos (product/service explanations), product demos (feature showcases), testimonial videos (customer stories), brand videos (company story and culture), social media videos (short-form content), video ads (paid advertising), training videos (internal/external education), event videos (conferences, webinars), and animated videos (motion graphics, 2D/3D animation). Each type is tailored to specific goals and platforms."
  },
  {
    question: "How long does video production take?",
    answer: "Timeline varies by complexity: Simple videos (30-60 sec): 2-3 weeks, Standard videos (1-2 min): 3-4 weeks, Complex videos (2+ min, filming): 4-6 weeks, Animated videos: 4-8 weeks. Breakdown: Week 1: Concept and script, Week 2: Pre-production/storyboarding, Week 3: Filming/animation, Week 4: Editing and revisions. Rush delivery available for additional fee."
  },
  {
    question: "Do you provide filming services or just editing?",
    answer: "We provide full-service video production: concept development and scriptwriting, professional filming with crew and equipment, talent casting and direction, location scouting and permits, lighting and sound, editing and post-production, color grading and sound design, and graphics and animation. We can also edit your existing footage if you prefer to film yourself."
  },
  {
    question: "What if I don't have a script or concept?",
    answer: "No problem! We handle creative development: discovery call to understand goals and message, audience research and messaging strategy, creative concept development, professional scriptwriting, storyboard creation, and revision rounds until you're happy. Most clients come to us with just an idea - we develop it into a compelling video concept and script."
  },
  {
    question: "Can you create videos for different platforms?",
    answer: "Yes! We optimize videos for each platform: YouTube (16:9, longer format), Instagram (1:1 square, 9:16 stories/reels), Facebook (1:1 or 16:9), LinkedIn (16:9, professional tone), TikTok (9:16 vertical), Twitter (16:9, short), and website (various formats). We deliver multiple versions optimized for each platform's specs and best practices."
  },
  {
    question: "Do you provide voiceover and music?",
    answer: "Yes! We handle all audio: professional voiceover talent (multiple options to choose from), script recording and direction, licensed music (royalty-free or custom), sound effects and design, audio mixing and mastering, and subtitles/captions. We can also use your team members for voiceover if preferred. All music is properly licensed for commercial use."
  },
  {
    question: "How many revisions are included?",
    answer: "Revision rounds vary by plan: Starter: 2 rounds, Growth: 3 rounds, Enterprise: Unlimited. Each round includes: script revisions (before filming), rough cut feedback, final cut adjustments, and minor tweaks. Major changes after filming (re-shoots, new scenes) are additional. We work closely with you throughout to minimize revisions and ensure you're happy with the final product."
  },
  {
    question: "What's the difference between live-action and animated videos?",
    answer: "Live-action: Real people, locations, and products. Best for: testimonials, product demos, brand stories, and human connection. Pros: authentic, relatable, builds trust. Cons: requires filming, location-dependent. Animated: Graphics, illustrations, motion design. Best for: explainers, complex concepts, abstract ideas. Pros: unlimited creative possibilities, easier to update. Cons: less personal. We recommend based on your goals, message, and budget."
  },
];

const VideoProduction = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="VIDEO PRODUCTION"
        heading="Professional Video Production That Captivates and Converts"
        description="From concept to final cut, we create high-quality videos that tell your story, engage your audience, and drive results."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Content Creative/VideoProduction.png"
        imageAlt="Video Production"
      />

      {/* ===== STATS RIBBON ===== */}
      <section className="py-8 sm:py-10">
        <ServicesRibbon 
        title="Award-Winning Video Production"
        items={ribbonItems}
      />
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <ServiceFeatures
                eyebrow="What We Offer"
                heading="Complete Video Production Services"
                description="From explainers to brand videos, we create content that resonates with your audience."
                features={videoProductionFeatures}
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
                heading="Why Choose Our Video Production Services" 
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
                subheading="How We Produce Videos"
                description="A proven methodology for creating videos that engage and convert"
                steps={videoProductionProcessSteps}
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
                heading="Choose Your Video Plan"
                description="Select the perfect plan for your video production needs. All plans include professional editing and delivery."
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
            title="Powered by Professional Video Tools"
            description="We use industry-leading video production and editing software to create stunning videos."
            tools={videoProductionTools}
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
        subtitle="Everything you need to know about video production services"
        faqs={videoProductionFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default VideoProduction;
