// src/pages/Home.tsx
import { Link } from "react-router-dom";
import Hero from "@/components/Home/Hero";
// import ResourcesShowcase from "@/components/Home/ResourcesShowcase";
import ResourceShowcaseTabular from "@/components/Home/ResourceShowcaseTabular";
import CTAwith3cards from "@/components/Home/CTAwith3cards";
import LogoMarquee from "@/components/Home/LogoMarquee";
import DemoReviewVideoSplit from "@/components/Home/ReviewVideoSplit";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import { useScrollScale } from "@/hooks/useScrollScale";
// Service card images
const CARD_IMG_1 = "/images/home/services/Perfomancev2.svg";
const CARD_IMG_2 = "/images/home/services/LinkedIn.svg";
const CARD_IMG_3 = "/images/home/services/ContentCreative.svg";
const CARD_IMG_4 = "/images/home/services/GrowthDemandGeneration.svg";
const CARD_IMG_5 = "/images/home/services/AnalyticsAI.svg";
const CARD_IMG_6 = "/images/home/services/BrandRep.svg"; // Repeating first image for 6th card

import {
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Lightbulb,
  Zap,
  Award,
  LineChart,
  Shield,
  Eye,
  Pen,
  Palette,
  Share2,
  UserPlus,
  Filter,
  Handshake,
} from "lucide-react";

// Scroll-animated card wrapper component with scroll-based scale animation
const ScrollAnimatedCard = ({ children, bgColor }: { children: React.ReactNode; bgColor: string }) => {
  const { ref, scale } = useScrollScale();

  return (
    <div ref={ref} className="relative group rounded-3xl transition-all duration-300">
      <motion.div 
        style={{ scale }} 
        transition={{ 
          type: "spring", 
          stiffness: 80, 
          damping: 15, 
          mass: 0.6,
          duration: 1.2
        }}
        className={`absolute inset-0 rounded-3xl ${bgColor} transition-all duration-300 group-hover:brightness-[1.02]`}
      />
      <div className="relative rounded-3xl">
        {children}
      </div>
    </div>
  );
};

// Scroll-animated wrapper for Resources section with scroll-based scale animation
const ScrollAnimatedSection = ({ children, bgColor }: { children: React.ReactNode; bgColor: string }) => {
  const { ref, scale } = useScrollScale();

  return (
    <div ref={ref} className="relative rounded-3xl">
      <motion.div 
        style={{ scale }} 
        transition={{ 
          type: "spring", 
          stiffness: 80, 
          damping: 15, 
          mass: 0.6,
          duration: 1.2
        }}
        className={`absolute inset-0 rounded-3xl ${bgColor}`}
      />
      <div className="relative rounded-3xl">
        {children}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* HERO extracted into its own component */}
      <Hero title="AI-Powered Marketing Partner for scaling Brands" />

      <div>
        {/* Mobile: Full width, no card styling */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden relative z-10"
        >
          <div className="w-full overflow-hidden" style={{ background: 'radial-gradient(120% 120% at 50% 0%, #13314f 0%, #0A1F3D 55%, #061426 100%)' }}>
            <LogoMarquee
              variant="card"
              title=""
              showLabels={false}
              height={84}
              iconSize={44}
            />
          </div>
        </motion.div>
        
        {/* Tablet & Desktop: Card with shadow */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block -mt-[80px] md:-mt-[82px] lg:-mt-[84px] relative z-10 px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.25),0_4px_16px_rgba(0,0,0,0.15)]">
            <LogoMarquee
              variant="card"
              title="Recognized By"
              showLabels={true}
              height={84}
              iconSize={44}
            />
          </div>
        </motion.div>
  {/* Services Cards Section - All 5 cards in one section */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-10">
          <div className="mx-auto max-w-6xl space-y-6">
            
            {/* 1st Card - Performance Marketing */}
            <ScrollAnimatedCard bgColor="bg-gradient-to-b from-[#B8D4F7] to-[#E8F2FC]">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-14 px-6 sm:px-10 lg:px-14 py-6 lg:py-12">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="order-1 lg:order-1"
                >
                  <div className="rounded-2xl">
                    <img
                      src={CARD_IMG_1}
                      alt=""
                      className="h-[280px] lg:h-[320px] w-full object-contain"
                    />
                  </div>
                </motion.div>
                <div className="order-2 lg:order-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-[11px] font-semibold tracking-[0.16em] text-slate-700/80" 
                    style={{ color: "#0A5A8A" }}
                  >
                    Growth powered by data-driven marketing
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
                  >
                    Performance Marketing
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-4 text-slate-700 leading-relaxed"
                  >
                    Optimize your spend with precise strategies across Google, Meta, LinkedIn, and YouTube.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-6"
                  >
                    <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-5 h-11 group/btn">
                      <a href="/services/performance-marketing">
                        Unlock ROI Now
                        <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:rotate-[-45deg]" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.ul 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-6 space-y-3 hidden lg:block"
                  >
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Target className="h-5 w-5" style={{ color: "#0A5A8A" }} /></span>
                      <span className="leading-relaxed">Audience targeting with precision</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><TrendingUp className="h-5 w-5" style={{ color: "#0A5A8A" }} /></span>
                      <span className="leading-relaxed">Continuous optimization & insights</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><BarChart3 className="h-5 w-5" style={{ color: "#0A5A8A" }} /></span>
                      <span className="leading-relaxed">Measurable ROI at every step</span>
                    </li>
                  </motion.ul>
                </div>
              </div>
            </ScrollAnimatedCard>

            {/* 2nd Card - LinkedIn Growth */}
            <ScrollAnimatedCard bgColor="bg-gradient-to-b from-[#B8E8DD] to-[#E8F7F3]">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-14 px-6 sm:px-10 lg:px-14 py-6 lg:py-12">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="order-1 lg:order-2"
                >
                  <div className="rounded-2xl">
                    <img
                      src={CARD_IMG_2}
                      alt=""
                      className="h-[280px] lg:h-[320px] w-full object-contain"
                    />
                  </div>
                </motion.div>
                <div className="order-2 lg:order-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-[11px] font-semibold tracking-[0.16em] text-slate-700/80" 
                    style={{ color: "#0A6B5E" }}
                  >
                    Build your professional brand with impact
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
                  >
                    LinkedIn Growth
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-4 text-slate-700 leading-relaxed"
                  >
                    Grow your presence, generate high-quality leads, and establish thought leadership on LinkedIn.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-6"
                  >
                    <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-5 h-11 group/btn">
                      <a href="/services/linkedin-growth">
                        Grow on Linkedin
                        <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:rotate-[-45deg]" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.ul 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-6 space-y-3 hidden lg:block"
                  >
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Eye className="h-5 w-5" style={{ color: "#0A6B5E" }} /></span>
                      <span className="leading-relaxed">Optimize your profile for maximum visibility</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Users className="h-5 w-5" style={{ color: "#0A6B5E" }} /></span>
                      <span className="leading-relaxed">Build and expand your professional network with ease</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Lightbulb className="h-5 w-5" style={{ color: "#0A6B5E" }} /></span>
                      <span className="leading-relaxed">Plan and execute a winning content strategy</span>
                    </li>
                  </motion.ul>
                </div>
              </div>
            </ScrollAnimatedCard>

            {/* 3rd Row - 2 Cards Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 3a - Content & Creative */}
              <ScrollAnimatedCard bgColor="bg-gradient-to-b from-[#B8D4F7] to-[#E8F2FC]">
                <div className="grid grid-cols-1 items-center gap-4 lg:gap-8 px-6 sm:px-10 lg:px-10 py-6 lg:py-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl"
                  >
                    <img
                      src={CARD_IMG_3}
                      alt=""
                      className="h-[240px] lg:h-[280px] w-full object-contain"
                    />
                  </motion.div>
                  <div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-[11px] font-semibold tracking-[0.16em] text-slate-700/80" 
                      style={{ color: "#0A5A8A" }}
                    >
                      Create content that converts
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-900"
                    >
                      Content & Creative
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mt-4 text-slate-700 leading-relaxed"
                    >
                      End-to-end creative solutions designed to engage your audience and drive meaningful results.
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="mt-6"
                    >
                      <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-5 h-11 group/btn">
                        <a href="/services/content-creative">
                          Create with us
                          <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:rotate-[-45deg]" />
                        </a>
                      </Button>
                    </motion.div>
                    <motion.ul 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="mt-6 space-y-3 hidden lg:block"
                    >
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Pen className="h-5 w-5" style={{ color: "#0A5A8A" }} /></span>
                      <span className="leading-relaxed">Ghostwriting that captures your authentic voice</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Palette className="h-5 w-5" style={{ color: "#0A5A8A" }} /></span>
                      <span className="leading-relaxed">Visual design and brand identity development</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Share2 className="h-5 w-5" style={{ color: "#0A5A8A" }} /></span>
                      <span className="leading-relaxed">Multi-platform distribution for maximum reach</span>
                    </li>
                    </motion.ul>
                  </div>
                </div>
              </ScrollAnimatedCard>

              {/* 3b - Growth & Demand Generation */}
              <ScrollAnimatedCard bgColor="bg-gradient-to-b from-[#D4F0B3] to-[#EDF9DD]">
                <div className="grid grid-cols-1 items-center gap-4 lg:gap-8 px-6 sm:px-10 lg:px-10 py-6 lg:py-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl"
                  >
                    <img
                      src={CARD_IMG_4}
                      alt=""
                      className="h-[240px] lg:h-[280px] w-full object-contain"
                    />
                  </motion.div>
                  <div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-[11px] font-semibold tracking-[0.16em] text-slate-700/80" 
                      style={{ color: "#5A7A0A" }}
                    >
                      Scale your business growth
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-900"
                    >
                      Growth & Demand Generation
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mt-4 text-slate-700 leading-relaxed"
                    >
                      Comprehensive strategies to drive sustainable business expansion and accelerate growth.
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="mt-6"
                    >
                      <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-5 h-11 group/btn">
                        <a href="/services/growth-demand-generation">
                          Scale faster
                          <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:rotate-[-45deg]" />
                        </a>
                      </Button>
                    </motion.div>
                    <motion.ul 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="mt-6 space-y-3 hidden lg:block"
                    >
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><UserPlus className="h-5 w-5" style={{ color: "#5A7A0A" }} /></span>
                      <span className="leading-relaxed">Lead generation and prospect nurturing</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Filter className="h-5 w-5" style={{ color: "#5A7A0A" }} /></span>
                      <span className="leading-relaxed">Funnel optimization to maximize ROI</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Handshake className="h-5 w-5" style={{ color: "#5A7A0A" }} /></span>
                      <span className="leading-relaxed">Strategic partnerships to expand reach</span>
                    </li>
                    </motion.ul>
                  </div>
                </div>
              </ScrollAnimatedCard>
            </div>

            {/* 4th Card - Analytics, AI & Automation */}
            <ScrollAnimatedCard bgColor="bg-gradient-to-b from-[#B8E8DD] to-[#E8F7F3]">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-14 px-6 sm:px-10 lg:px-14 py-6 lg:py-12">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="order-1 lg:order-1"
                >
                  <div className="rounded-2xl">
                    <img
                      src={CARD_IMG_5}
                      alt=""
                      className="h-[280px] lg:h-[320px] w-full object-contain"
                    />
                  </div>
                </motion.div>
                <div className="order-2 lg:order-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-[11px] font-semibold tracking-[0.16em] text-slate-700/80" 
                    style={{ color: "#3D4A5C" }}
                  >
                    Data-driven intelligence
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
                  >
                    AI, Automation & Analytics
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-4 text-slate-700 leading-relaxed"
                  >
                    Leverage advanced analytics and AI to make smarter marketing decisions and optimize performance.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-6"
                  >
                    <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-5 h-11 group/btn">
                      <a href="/services/analytics-ai">
                        Explore AI advantage
                        <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:rotate-[-45deg]" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.ul 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-6 space-y-3 hidden lg:block"
                  >
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><BarChart3 className="h-5 w-5" style={{ color: "#3D4A5C" }} /></span>
                      <span className="leading-relaxed">Advanced dashboards and KPI tracking</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Zap className="h-5 w-5" style={{ color: "#3D4A5C" }} /></span>
                      <span className="leading-relaxed">AI-powered insights and automation</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><LineChart className="h-5 w-5" style={{ color: "#3D4A5C" }} /></span>
                      <span className="leading-relaxed">Data-driven performance optimization</span>
                    </li>
                  </motion.ul>
                </div>
              </div>
            </ScrollAnimatedCard>

            {/* 5th Card - Brand & Reputation */}
            <ScrollAnimatedCard bgColor="bg-gradient-to-b from-[#D4F0B3] to-[#EDF9DD]">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-14 px-6 sm:px-10 lg:px-14 py-6 lg:py-12">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="order-1 lg:order-2"
                >
                  <div className="rounded-2xl">
                    <img
                      src={CARD_IMG_6}
                      alt=""
                      className="h-[280px] lg:h-[320px] w-full object-contain"
                    />
                  </div>
                </motion.div>
                <div className="order-2 lg:order-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-[11px] font-semibold tracking-[0.16em] text-slate-700/80" 
                    style={{ color: "#0A3A52" }}
                  >
                    Protect & enhance your brand
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
                  >
                    Brand & Reputation
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-4 text-slate-700 leading-relaxed"
                  >
                    Comprehensive strategies to build, monitor, and protect your brand reputation across all digital channels.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-6"
                  >
                    <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-5 h-11 group/btn">
                      <a href="/services/brand-reputation">
                        Protect your brand
                        <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:rotate-[-45deg]" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.ul 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-6 space-y-3 hidden lg:block"
                  >
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Eye className="h-5 w-5" style={{ color: "#0A3A52" }} /></span>
                      <span className="leading-relaxed">Real-time brand monitoring and tracking</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Shield className="h-5 w-5" style={{ color: "#0A3A52" }} /></span>
                      <span className="leading-relaxed">Proactive crisis and review management</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5"><Award className="h-5 w-5" style={{ color: "#0A3A52" }} /></span>
                      <span className="leading-relaxed">Strategic brand building and engagement</span>
                    </li>
                  </motion.ul>
                </div>
              </div>
            </ScrollAnimatedCard>

          </div>
        </section>

        {/* REVIEWS CAROUSEL */}
        <section className="py-8 sm:py-10">
          <ReviewCarousel noPadding={true} />
        </section>

        
        {/* RESOURCES - New Tabular Version */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResourceShowcaseTabular />
          </motion.div>
        </section>

        {/* CTA WITH 3 CARDS */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CTAwith3cards />
          </motion.div>
        </section>
        
        {/* OLD RESOURCES - Commented out for reference */}
        {/* <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="mx-auto max-w-6xl">
            <ScrollAnimatedSection bgColor="bg-[rgb(241,241,233)]">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12"
              >
                <ResourcesShowcase />
              </motion.div>
            </ScrollAnimatedSection>
          </div>
        </section> */}
        
        
      </div>

      {/* REVIEWS / VIDEO SPLIT */}
      {/* <div className="bg-white px-4 sm:px-6 lg:px-8">
        <DemoReviewVideoSplit />
      </div> */}

      {/* =================== CTA ===================
      <div className="bg-white">
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl bg-[#0A1F3D] py-16 sm:py-20 md:py-24">
              <span className="pointer-events-none absolute left-[12%] top-[-18%] h-56 w-56 rounded-full bg-[#0074ED]/25 blur-3xl" />
              <span className="pointer-events-none absolute right-[10%] bottom-[-20%] h-64 w-64 rounded-full bg-[#0074ED]/20 blur-3xl" />

              <div className="relative px-6 text-center">
                <h2 className="mx-auto max-w-3xl text-[32px] font-semibold leading-tight tracking-tight text-white sm:text-[40px] md:text-[52px]">
                  Grow your social presence
                  <br className="hidden sm:block" />
                  with confidence
                </h2>

                <div className="mt-8">
                  <Link
                    to="/resources/support"
                    className={[
                      "inline-flex items-center gap-2 rounded-full",
                      "bg-[#A6FF5F] text-[#0A1F3D] px-6 py-3 font-medium",
                      "ring-1 ring-black/10 shadow-[0_10px_28px_rgba(166,255,95,.35)]",
                      "transition-transform duration-200 hover:-translate-y-0.5",
                      "hover:shadow-[0_16px_36px_rgba(166,255,95,.45)]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                    ].join(" ")}
                  >
                    Get started for free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </div>
  );
};

export default Home;
