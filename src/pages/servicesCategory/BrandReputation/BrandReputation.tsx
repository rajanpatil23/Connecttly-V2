import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  ArrowRight, Heart, Shield, Star, Target, TrendingUp, Users,
  Award, Briefcase, MessageCircle, Sparkles, Monitor, Zap, Eye, Globe, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon, { RibbonItem } from "@/components/Services/category/ServicesRibbon";

/* Service image mapping for Brand & Reputation */
const brandReputationImages: Record<string, string> = {
  "Brand Strategy": "/images/Services/Brand&Reputation/BrandStrategy.png",
  "Employer Branding": "/images/Services/Brand&Reputation/EmployerBranding.png",
  "PR and ORM": "/images/Services/Brand&Reputation/PRandORM.png",
  "Lifestyle and Vibe": "/images/Services/Brand&Reputation/LifestyleandVibe.png",
  "Website UX & Landing Pages": "/images/Services/Brand&Reputation/WebsiteUX&LandingPages.png",
  "Brand Momentum Bundle": "/images/Services/Brand&Reputation/BrandMomentumBundle.png",
};

/* category gradient accent */
const accent = "from-[#0A1F3D] to-[#0074ED]";

const ribbonItems: RibbonItem[] = [
  {
    color: "bg-[#0074ED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Strategic Positioning",
    subtitle: "Define & Own Your Market Space",
  },
  {
    color: "bg-[#2F8F5B]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 16.09L6 13.5l1.41-1.41 3.18 3.18 6.59-6.59L18.59 10l-8 8.09z M12 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5z"/>
      </svg>
    ),
    title: "Reputation Monitoring",
    subtitle: "24/7 Brand Sentiment Tracking",
  },
  {
    color: "bg-[#7C3AED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
    ),
    title: "PR & Crisis Management",
    subtitle: "Proactive Media Relations",
  },
  {
    color: "bg-[#0EA5E9]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
    ),
    title: "Employer Branding",
    subtitle: "Attract Top Talent & Culture",
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Award, title: "Strategic Brand Positioning", desc: "Define and own your unique market position with clarity and confidence.", tint: "#E6F0FF", stroke: "#1677ff" },
  { icon: Eye, title: "Reputation Monitoring", desc: "24/7 tracking of brand mentions, sentiment, and competitive landscape.", tint: "#F1E8FF", stroke: "#7C3AED" },
  { icon: MessageCircle, title: "Crisis-Ready PR", desc: "Proactive media relations and rapid response protocols for any situation.", tint: "#FEF3E2", stroke: "#F59E0B" },
  { icon: Briefcase, title: "Employer Brand Excellence", desc: "Attract top talent with compelling employer value propositions.", tint: "#EAFBE0", stroke: "#2F8F5B" },
  { icon: Globe, title: "Multi-Channel Presence", desc: "Consistent brand experience across every touchpoint and platform.", tint: "#FEE2E2", stroke: "#DC2626" },
  { icon: Zap, title: "Brand Momentum Tracking", desc: "Measure brand health, awareness, and sentiment over time.", tint: "#E0F2FE", stroke: "#0284C7" },
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

const BrandReputation = () => {
  /* ===== BRAND & REPUTATION SERVICES ===== */
  const services = [
    { 
      icon: Shield, 
      title: "Brand Strategy", 
      description: "Monitor and grow your brand with strategic positioning", 
      path: "/services/brand-reputation/brand-strategy" 
    },
    { 
      icon: Target, 
      title: "Employer Branding", 
      description: "Attract top talent with compelling employer brand", 
      path: "/services/brand-reputation/employer-branding" 
    },
    { 
      icon: Star, 
      title: "PR and ORM", 
      description: "Manage and improve your online reputation", 
      path: "/services/brand-reputation/pr-orm" 
    },
    { 
      icon: Heart, 
      title: "Lifestyle and Vibe", 
      description: "Build recognition and affinity through authentic storytelling", 
      path: "/services/brand-reputation/lifestyle-vibe" 
    },
    { 
      icon: Users, 
      title: "Website UX & Landing Pages", 
      description: "High-converting UX and landing page experiences", 
      path: "/services/brand-reputation/website-ux-landing-page" 
    },
    { 
      icon: TrendingUp, 
      title: "Brand Momentum Bundle", 
      description: "Complete brand performance and sentiment tracking", 
      path: "/services/brand-reputation/brand-momentum-bundle" 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="BRAND & REPUTATION"
        heading="Brand & Reputation Management"
        description="Build, protect, and amplify your brand reputation across all channels with strategic positioning and proactive management."
        ctaText="Talk to an expert"
        ctaLink="/resources/support"
        imageSrc="/images/home/services/BrandRep.svg"
        imageAlt="Brand and Reputation Management"
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
                  Brand & Reputation Services
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
                >
                  Comprehensive brand management and reputation protection strategies that build trust and drive growth.
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
                          src={brandReputationImages[service.title] || `/images/Services/Brand&Reputation/${service.title.replace(/ /g, '')}.png`}
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
                heading="Why choose us for Brand & Reputation" 
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

export default BrandReputation;
