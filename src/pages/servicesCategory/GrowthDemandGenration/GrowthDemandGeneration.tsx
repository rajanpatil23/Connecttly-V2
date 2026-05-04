import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  ArrowRight, BarChart3, Bot, Megaphone, Target, TrendingUp, Users,
  Rocket, Lightbulb, Network, Handshake, Zap, Globe, TrendingUpIcon, UserCheck, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon, { RibbonItem } from "@/components/Services/category/ServicesRibbon";

/* Service image mapping for Growth & Demand Generation */
const growthDemandGenImages: Record<string, string> = {
  "ABM Campaigns": "/images/Services/DemandGrowthGeneration/ABMCampaigns.png",
  "Influencer and UGC": "/images/Services/DemandGrowthGeneration/InfluencerandUGC.png",
  "Community": "/images/Services/DemandGrowthGeneration/Community.png",
  "Viral and Culture": "/images/Services/DemandGrowthGeneration/ViralCulture.png",
  "Partners & Affiliate": "/images/Services/DemandGrowthGeneration/PartnersAffiliate.png",
  "Demand Gen Bundle": "/images/Services/DemandGrowthGeneration/DemandGenBundle.png",
};

/* random placeholder image */
const img = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/640/360`;

/* category gradient accent */
const accent = "from-[#79d9ff] to-[#0074ED]";

const ribbonItems: RibbonItem[] = [
  {
    color: "bg-[#0074ED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "ABM & Pipeline Building",
    subtitle: "Target High-Value Accounts Precisely",
  },
  {
    color: "bg-[#2F8F5B]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: "Community Growth",
    subtitle: "Build Engaged User Communities",
  },
  {
    color: "bg-[#7C3AED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
      </svg>
    ),
    title: "Viral & Influencer",
    subtitle: "Amplify Through Creators & UGC",
  },
  {
    color: "bg-[#0EA5E9]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    title: "Growth Loops",
    subtitle: "Self-Reinforcing Growth Systems",
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Full-Funnel Strategy", desc: "From awareness to advocacy, we design campaigns that move prospects through every stage.", tint: "#E6F0FF", stroke: "#1677ff" },
  { icon: Network, title: "Community-Led Growth", desc: "Build engaged communities that become your best acquisition and retention engine.", tint: "#EAFBE0", stroke: "#2F8F5B" },
  { icon: UserCheck, title: "ABM Precision", desc: "Target high-value accounts with personalized campaigns that convert.", tint: "#E6F7FB", stroke: "#0EA5E9" },
  { icon: Globe, title: "Multi-Channel Orchestration", desc: "Coordinate touchpoints across paid, owned, earned, and shared media.", tint: "#FEE2E2", stroke: "#DC2626" },
  { icon: TrendingUpIcon, title: "Growth Loops", desc: "Build self-reinforcing systems where users drive more users.", tint: "#F5F5F5", stroke: "#6B7280" },
  { icon: Zap, title: "Rapid Iteration", desc: "Weekly sprints, monthly pivots, and quarterly strategy resets to stay agile.", tint: "#E0F2FE", stroke: "#0284C7" },
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

const GrowthDemandGeneration = () => {
  /* ===== GROWTH & DEMAND GENERATION SERVICES ===== */
  const services = [
    { 
      icon: Target, 
      title: "ABM Campaigns", 
      description: "Generate high-quality leads with account-based marketing", 
      path: "/services/growth-demand-generation/abm-campaigns" 
    },
    { 
      icon: TrendingUp, 
      title: "Influencer and UGC", 
      description: "Creators that convert and authentic user-generated content", 
      path: "/services/growth-demand-generation/influencer-ugc" 
    },
    { 
      icon: Users, 
      title: "Community", 
      description: "Acquire and retain customers with engaged communities", 
      path: "/services/growth-demand-generation/community" 
    },
    { 
      icon: Megaphone, 
      title: "Viral and Culture", 
      description: "Create moments people share and cultural relevance", 
      path: "/services/growth-demand-generation/viral-culture" 
    },
    { 
      icon: BarChart3, 
      title: "Partners & Affiliate", 
      description: "Leverage partnerships to scale your growth", 
      path: "/services/growth-demand-generation/partner-affiliate" 
    },
    { 
      icon: Bot, 
      title: "Demand Gen Bundle", 
      description: "Complete demand generation playbooks to pipeline", 
      path: "/services/growth-demand-generation/demand-gen-bundle" 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="GROWTH & DEMAND GENERATION"
        heading="Growth & Demand Generation"
        description="Strategic growth programs that create sustainable business expansion and predictable pipeline."
        ctaText="Talk to an expert"
        ctaLink="/resources/support"
        imageSrc="/images/home/services/GrowthDemandGeneration.svg"
        imageAlt="Growth Strategy and Demand Generation"
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
                  Growth & Demand Generation Services
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
                >
                  Comprehensive growth strategies to scale your business and build predictable revenue pipelines.
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
                          src={growthDemandGenImages[service.title] || img(service.title)}
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
                heading="Why choose us for Growth & Demand Generation" 
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

export default GrowthDemandGeneration;
