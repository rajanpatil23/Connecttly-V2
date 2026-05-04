import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  ArrowLeft, ArrowRight, BarChart3, Megaphone, Target, TrendingUp, Users, Zap,
  DollarSign, LineChart, Gauge, TestTube, Crosshair, FileBarChart, Activity, Shield, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon, { RibbonItem } from "@/components/Services/category/ServicesRibbon";

/* Service image mapping */
const serviceImages: Record<string, string> = {
  "Google Ads": "/images/Services/Performance Marketing/GoogleAds.png",
  "Meta Ads": "/images/Services/Performance Marketing/MetaAds.png",
  "YouTube Ads": "/images/Services/Performance Marketing/YouTubeAds.png",
  "CRO and Funnel": "/images/Services/Performance Marketing/CROandFunnel.png",
  "Short Video Ads": "/images/Services/Performance Marketing/ShortVideoAds.png",
  "Performance Accelerator Bundle": "/images/Services/Performance Marketing/PerformanceAcceleratorBundle.png",
};

/* category gradient accent */
const accent = "from-[#0074ED] to-[#79d9ff]";

const ribbonItems: RibbonItem[] = [
  {
    color: "bg-[#0074ED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Multi-Platform Campaigns",
    subtitle: "Google, Meta, YouTube, TikTok & More",
  },
  {
    color: "bg-[#2F8F5B]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    title: "ROI-Driven Strategy",
    subtitle: "Every Dollar Tracked & Optimized",
  },
  {
    color: "bg-[#7C3AED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    title: "Advanced Analytics",
    subtitle: "Real-Time Performance Dashboards",
  },
  {
    color: "bg-[#0EA5E9]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "A/B Testing & CRO",
    subtitle: "Continuous Optimization for Growth",
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: DollarSign, title: "ROI-Focused Campaigns", desc: "Every dollar spent is tracked, optimized, and tied to revenue growth.", tint: "#E6F7FB", stroke: "#0EA5E9" },
  { icon: Target, title: "Multi-Platform Expertise", desc: "Master Google, Meta, YouTube, TikTok, and emerging channels.", tint: "#EAFBE0", stroke: "#2F8F5B" },
  { icon: LineChart, title: "Advanced Analytics", desc: "Real-time dashboards, attribution models, and predictive insights.", tint: "#F1E8FF", stroke: "#7C3AED" },
  { icon: Gauge, title: "Budget Efficiency", desc: "Smart bidding strategies that maximize results within your budget.", tint: "#E6F0FF", stroke: "#1677ff" },
  { icon: Crosshair, title: "Conversion Tracking", desc: "Pixel-perfect tracking setup for accurate conversion measurement.", tint: "#EEFDF3", stroke: "#16A34A" },
  { icon: Users, title: "Audience Targeting", desc: "Precision targeting based on behavior, demographics, and intent.", tint: "#F5F5F5", stroke: "#6B7280" },
];

// Scroll-animated wrapper for sections - scroll-based scale animation on wrapper
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

const PerformanceMarketing = () => {
  /* ===== PERFORMANCE MARKETING SERVICES ===== */
  const services = [
    { 
      icon: Target, 
      title: "Google Ads", 
      description: "Drive targeted traffic with powerful Google Ads campaigns", 
      path: "/services/performance-marketing/google-ads" 
    },
    { 
      icon: Users, 
      title: "Meta Ads", 
      description: "Reach your audience on Facebook and Instagram", 
      path: "/services/performance-marketing/meta-ads" 
    },
    { 
      icon: Megaphone, 
      title: "YouTube Ads", 
      description: "Engage viewers with compelling video advertisements", 
      path: "/services/performance-marketing/youtube-ads" 
    },
    { 
      icon: TrendingUp, 
      title: "CRO and Funnel", 
      description: "Optimize conversion rates with data-driven insights", 
      path: "/services/performance-marketing/cro-funnel" 
    },
    { 
      icon: BarChart3, 
      title: "Short Video Ads", 
      description: "Capture attention with short-form video advertising", 
      path: "/services/performance-marketing/short-video-ads" 
    },
    { 
      icon: Zap, 
      title: "Performance Accelerator Bundle", 
      description: "Complete performance marketing solution for rapid growth", 
      path: "/services/performance-marketing/performance-accelerator-bundle" 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="PERFORMANCE MARKETING"
        heading="Performance Marketing Excellence"
        description="Drive measurable growth with data-driven advertising strategies across all major platforms."
        ctaText="Talk to an expert"
        ctaLink="/resources/support"
        imageSrc="/images/home/services/Perfomancev2.svg"
        imageAlt="Performance Marketing Analytics Dashboard"
      />

      {/* ===== SERVICES ===== */}
      <section id="services" className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          
              {/* Header */}
              <motion.header 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-10 sm:mb-12"
              >
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
                >
                  Performance Marketing Services
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
                >
                  Comprehensive performance marketing solutions to maximize your ROI and drive sustainable growth.
                </motion.p>
              </motion.header>

              {/* Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
              >
                {services.map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={service.path}
                      className="group border-0 rounded-xl bg-white shadow-[0_6px_24px_rgba(6,20,38,.06)] hover:shadow-[0_10px_28px_rgba(6,20,38,.10)] transition-shadow overflow-hidden"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={serviceImages[service.title]}
                          alt={service.title}
                          className="h-48 sm:h-44 md:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-white text-xs backdrop-blur-sm">
                          <Icon className="h-3.5 w-3.5" />
                          <span className="font-medium">{service.title}</span>
                        </div>
                      </div>
                      <CardHeader className="pb-2 px-5 pt-5">
                        <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-5 pb-5">
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                        <Button asChild className="w-full bg-[#1677ff] hover:bg-[#1468df] h-11 text-sm font-medium">
                          <Link to={service.path}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          
              
          <ScrollAnimatedSection bgColor="bg-[#B8E8DD]">
            <div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12">
              <WhyChoose 
                items={whyItems} 
                eyebrow="WHY CHOOSE CONNECTLTY" 
                heading="Why choose us for Performance Marketing" 
                eyebrowColor="#0A6B5E" 
                noPadding 
                noCard 
                noContainer 
              />
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <section className="py-8 sm:py-10">
        <ReviewCarousel noPadding />
      </section>
    </div>
  );
};

export default PerformanceMarketing;
