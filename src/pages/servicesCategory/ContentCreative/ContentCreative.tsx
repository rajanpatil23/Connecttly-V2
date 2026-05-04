import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  ArrowRight, Heart, Megaphone, Star, Target, TrendingUp, Users,
  Palette, Video, FileText, Sparkles, Layers, PenTool, Image, BookOpen, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon, { RibbonItem } from "@/components/Services/category/ServicesRibbon";

/* Service image mapping for Content Creative */
const contentCreativeImages: Record<string, string> = {
  "Content Strategy": "/images/Services/Content Creative/ContentStratergy.png",
  "Carousels and Visuals": "/images/Services/Content Creative/CarouselsandVisuals.png",
  "Video Production": "/images/Services/Content Creative/VideoProduction.png",
  "Sales Collateral": "/images/Services/Content Creative/SalesCollateral.png",
  "SEO Content Production": "/images/Services/Content Creative/SEOContentProduction.png",
  "Full-Funnel Content Bundle": "/images/Services/Content Creative/FullFunnelContentBundle.png",
};

/* Fallback placeholder image */
const img = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/640/360`;

/* category gradient accent */
const accent = "from-[#A6FF5F] to-[#79d9ff]";

const ribbonItems: RibbonItem[] = [
  {
    color: "bg-[#0074ED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Multi-Format Content",
    subtitle: "Video, Carousels, Blogs & More",
  },
  {
    color: "bg-[#2F8F5B]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 10h9v2H5zm0-3h9v2H5zm0 6h5v2H5zm11-1l4-4v10l-4-4z"/>
      </svg>
    ),
    title: "Brand Storytelling",
    subtitle: "Authentic Narratives That Connect",
  },
  {
    color: "bg-[#7C3AED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    title: "SEO Optimization",
    subtitle: "Content That Ranks & Converts",
  },
  {
    color: "bg-[#0EA5E9]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    title: "Content Repurposing",
    subtitle: "One Asset, Multiple Channels",
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Sparkles, title: "Brand-Aligned Creativity", desc: "Every asset reflects your voice, values, and visual identity.", tint: "#F1E8FF", stroke: "#7C3AED" },
  { icon: Layers, title: "Full-Funnel Content", desc: "Awareness, consideration, conversion, and retention—all covered.", tint: "#E6F0FF", stroke: "#1677ff" },
  { icon: Video, title: "Multi-Format Mastery", desc: "Carousels, reels, long-form video, blogs, whitepapers, and more.", tint: "#FEF3E2", stroke: "#F59E0B" },
  { icon: Target, title: "SEO & Performance", desc: "Content optimized for search, social algorithms, and conversion.", tint: "#EAFBE0", stroke: "#2F8F5B" },
  { icon: Image, title: "Platform-Native Design", desc: "Formats tailored for LinkedIn, Instagram, TikTok, YouTube, and more.", tint: "#EEFDF3", stroke: "#16A34A" },
  { icon: Zap, title: "Repurposing Engine", desc: "One piece of content becomes 10+ assets across channels.", tint: "#E0F2FE", stroke: "#0284C7" },
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

const ContentCreative = () => {
  /* ===== CONTENT & CREATIVE SERVICES ===== */
  const services = [
    { 
      icon: Megaphone, 
      title: "Content Strategy", 
      description: "Develop comprehensive content strategies that drive results", 
      path: "/services/content-creative/content-strategy" 
    },
    { 
      icon: Star, 
      title: "Carousels and Visuals", 
      description: "Create stunning visuals and engaging carousel content", 
      path: "/services/content-creative/carousels-visuals" 
    },
    { 
      icon: Users, 
      title: "Video Production", 
      description: "Produce engaging video content for all platforms", 
      path: "/services/content-creative/video-production" 
    },
    { 
      icon: Heart, 
      title: "Sales Collateral", 
      description: "Craft compelling sales materials that convert", 
      path: "/services/content-creative/sales-collateral" 
    },
    { 
      icon: Target, 
      title: "SEO Content Production", 
      description: "Search-led content at scale for organic growth", 
      path: "/services/content-creative/seo-content-production" 
    },
    { 
      icon: TrendingUp, 
      title: "Full-Funnel Content Bundle", 
      description: "Complete content solution for every stage of the funnel", 
      path: "/services/content-creative/full-funnel-content-bundle" 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="CONTENT & CREATIVE"
        heading="Content & Creative Excellence"
        description="Create compelling content and stunning visuals that engage your audience and drive conversions."
        ctaText="Talk to an expert"
        ctaLink="/resources/support"
        imageSrc="/images/home/services/ContentCreative.svg"
        imageAlt="Creative Content Production"
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
                  Content & Creative Services
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
                >
                  End-to-end content and creative solutions that captivate your audience and drive meaningful results.
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
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={contentCreativeImages[service.title] || img(service.title)}
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
                heading="Why choose us for Content & Creative" 
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

export default ContentCreative;
