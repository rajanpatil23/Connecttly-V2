import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  ArrowRight, BarChart3, Bot, Megaphone, Target, TrendingUp, Users,
  Linkedin, Network, UserPlus, MessageSquare, Award, Briefcase, Building2, Sparkles, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon, { RibbonItem } from "@/components/Services/category/ServicesRibbon";

/* Service image mapping for LinkedIn Growth */
const linkedInGrowthImages: Record<string, string> = {
  "LinkedIn Ads": "/images/Services/Linkedin Growth/LinkedinAds.png",
  "Lead Generation": "/images/Services/Linkedin Growth/LeadGenration.png",
  "Page Management": "/images/Services/Linkedin Growth/PageManagement.png",
  "Executive Leadership": "/images/Services/Linkedin Growth/ExecutiveLeadership.png",
  "Sales Navigator Enablement": "/images/Services/Linkedin Growth/SalesNavigatorEnablement.png",
  "LinkedIn Growth Bundle": "/images/Services/Linkedin Growth/LinkedInGrowthBundle.png",
};

/* Fallback placeholder image */
const img = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/640/360`;

/* category gradient accent */
const accent = "from-[#79d9ff] to-[#A6FF5F]";

const ribbonItems: RibbonItem[] = [
  {
    color: "bg-[#0074ED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
    title: "B2B Lead Generation",
    subtitle: "Quality Leads from Decision Makers",
  },
  {
    color: "bg-[#2F8F5B]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
    ),
    title: "Executive Branding",
    subtitle: "Build Thought Leadership & Authority",
  },
  {
    color: "bg-[#7C3AED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    ),
    title: "Content Strategy",
    subtitle: "Posts, Carousels & Videos That Engage",
  },
  {
    color: "bg-[#0EA5E9]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Sales Navigator",
    subtitle: "Advanced Prospecting & Outreach",
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Award, title: "Executive Positioning", desc: "Build thought leadership and personal brand for C-suite and founders.", tint: "#E6F0FF", stroke: "#1677ff" },
  { icon: Network, title: "Strategic Networking", desc: "Connect with decision-makers and industry leaders that matter.", tint: "#EAFBE0", stroke: "#2F8F5B" },
  { icon: MessageSquare, title: "Content That Converts", desc: "Posts, carousels, and videos designed to drive engagement and leads.", tint: "#F1E8FF", stroke: "#7C3AED" },
  { icon: Target, title: "LinkedIn Ads Mastery", desc: "Sponsored content, InMail, and lead gen forms optimized for B2B.", tint: "#FEF3E2", stroke: "#F59E0B" },
  { icon: UserPlus, title: "Profile Optimization", desc: "SEO-optimized profiles that attract the right connections and opportunities.", tint: "#E6F7FB", stroke: "#0EA5E9" },
  { icon: Briefcase, title: "Sales Navigator Enablement", desc: "Advanced search, lead lists, and outreach sequences that work.", tint: "#EEFDF3", stroke: "#16A34A" },
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

const LinkedInGrowth = () => {
  /* ===== LINKEDIN GROWTH SERVICES ===== */
  const services = [
    { 
      icon: Users, 
      title: "LinkedIn Ads", 
      description: "Optimize your LinkedIn profile for maximum visibility", 
      path: "/services/linkedin-growth/linkedin-ads" 
    },
    { 
      icon: Megaphone, 
      title: "Lead Generation", 
      description: "Create engaging content that builds your network", 
      path: "/services/linkedin-growth/lead-genration" 
    },
    { 
      icon: Target, 
      title: "Page Management", 
      description: "Expand your professional network strategically", 
      path: "/services/linkedin-growth/page-management" 
    },
    { 
      icon: TrendingUp, 
      title: "Executive Leadership", 
      description: "Generate quality leads through LinkedIn outreach", 
      path: "/services/linkedin-growth/executive-leadership" 
    },
    { 
      icon: BarChart3, 
      title: "Sales Navigator Enablement", 
      description: "Track your LinkedIn performance and growth", 
      path: "/services/linkedin-growth/sales-navigator" 
    },
    { 
      icon: Bot, 
      title: "LinkedIn Growth Bundle", 
      description: "Automate your LinkedIn activities efficiently", 
      path: "/services/linkedin-growth/linkedin-growth-bundle" 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="LINKEDIN GROWTH"
        heading="LinkedIn Growth Strategies"
        description="Build your professional brand, generate quality leads, and establish thought leadership on LinkedIn."
        ctaText="Talk to an expert"
        ctaLink="/resources/support"
        imageSrc="/images/home/services/LinkedIn.svg"
        imageAlt="LinkedIn Professional Networking"
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
                  LinkedIn Growth Services
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
                >
                  Comprehensive LinkedIn strategies to build your professional brand and generate quality leads.
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
                          src={linkedInGrowthImages[service.title] || img(service.title)}
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
                heading="Why choose us for LinkedIn Growth" 
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

export default LinkedInGrowth;
