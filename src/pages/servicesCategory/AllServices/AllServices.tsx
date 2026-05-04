import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  ArrowLeft, ArrowRight, BarChart3, Bot, Brain, Database, Heart,
  Megaphone, Search, Shield, Star, Target, TrendingUp, Users, Zap,
  ChevronDown, ChevronUp, UserCheck, Filter, ShieldCheck, Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon from "@/components/Services/category/ServicesRibbon";
/* Service image mapping for Performance Marketing */
const performanceMarketingImages: Record<string, string> = {
  "Google Ads": "/images/Services/Performance Marketing/GoogleAds.png",
  "Meta Ads": "/images/Services/Performance Marketing/MetaAds.png",
  "YouTube Ads": "/images/Services/Performance Marketing/YouTubeAds.png",
  "CRO and Funnel": "/images/Services/Performance Marketing/CROandFunnel.png",
  "Short Video Ads": "/images/Services/Performance Marketing/ShortVideoAds.png",
  "Performance Accelerator Bundle": "/images/Services/Performance Marketing/PerformanceAcceleratorBundle.png",
};

/* Service image mapping for LinkedIn Growth */
const linkedInGrowthImages: Record<string, string> = {
  "LinkedIn Ads": "/images/Services/Linkedin Growth/LinkedinAds.png",
  "Lead Generation": "/images/Services/Linkedin Growth/LeadGenration.png",
  "Page Management": "/images/Services/Linkedin Growth/PageManagement.png",
  "Executive Leadership": "/images/Services/Linkedin Growth/ExecutiveLeadership.png",
  "Sales Navigator Enablement": "/images/Services/Linkedin Growth/SalesNavigatorEnablement.png",
  "LinkedIn Growth Bundle": "/images/Services/Linkedin Growth/LinkedInGrowthBundle.png",
};

/* Service image mapping for Content Creative */
const contentCreativeImages: Record<string, string> = {
  "Content Strategy": "/images/Services/Content Creative/ContentStratergy.png",
  "Carousels and Visuals": "/images/Services/Content Creative/CarouselsandVisuals.png",
  "Video Production": "/images/Services/Content Creative/VideoProduction.png",
  "Sales Collateral": "/images/Services/Content Creative/SalesCollateral.png",
  "SEO Content Production": "/images/Services/Content Creative/SEOContentProduction.png",
  "Full-Funnel Content Bundle": "/images/Services/Content Creative/FullFunnelContentBundle.png",
};

/* Service image mapping for Growth & Demand Generation */
const growthDemandGenImages: Record<string, string> = {
  "ABM Campaigns": "/images/Services/DemandGrowthGeneration/ABMCampaigns.png",
  "Influencer and UGC": "/images/Services/DemandGrowthGeneration/InfluencerandUGC.png",
  "Community": "/images/Services/DemandGrowthGeneration/Community.png",
  "Viral and Culture": "/images/Services/DemandGrowthGeneration/ViralCulture.png",
  "Partners & Affiliate": "/images/Services/DemandGrowthGeneration/PartnersAffiliate.png",
  "Demand Gen Bundle": "/images/Services/DemandGrowthGeneration/DemandGenBundle.png",
};

/* Service image mapping for Brand & Reputation */
const brandReputationImages: Record<string, string> = {
  "Brand Strategy": "/images/Services/Brand&Reputation/BrandStrategy.png",
  "Employer Branding": "/images/Services/Brand&Reputation/EmployerBranding.png",
  "PR and ORM": "/images/Services/Brand&Reputation/PRandORM.png",
  "Lifestyle and Vibe": "/images/Services/Brand&Reputation/LifestyleandVibe.png",
  "Website UX & Landing Pages": "/images/Services/Brand&Reputation/WebsiteUX&LandingPages.png",
  "Brand Momentum Bundle": "/images/Services/Brand&Reputation/BrandMomentumBundle.png",
};


/* Service image mapping for Analytics & AI */
const analyticsAIImages: Record<string, string> = {
  "Analytics and Dashboards": "/images/Services/Analytics&AI/AnalyticsandDashboards.png",
  "Attribution and Funnel": "/images/Services/Analytics&AI/AttributionandFunnel.png",
  "AI Powered Campaigns": "/images/Services/Analytics&AI/AIPoweredCampaigns.png",
  "CRM and Automation": "/images/Services/Analytics&AI/CRMandAutomation.png",
  "Tagging & GA4 Audit": "/images/Services/Analytics&AI/Tagging&GA4Audit.png",
  "Measurement + AI Bundle": "/images/Services/Analytics&AI/Measurement+AIBundle.png",
};

/* Fallback placeholder image */
const img = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/640/360`;

/* category gradient accents to sync with home palette */
const accent: Record<string, string> = {
  "performance-marketing": "from-[#0074ED] to-[#79d9ff]",
  "linkedin-growth": "from-[#79d9ff] to-[#A6FF5F]",
  "content-creative": "from-[#A6FF5F] to-[#79d9ff]",
  "growth-demand-generation": "from-[#79d9ff] to-[#0074ED]",
  "analytics-ai": "from-[#0074ED] to-[#A6FF5F]",
  "brand-reputation": "from-[#0A1F3D] to-[#0074ED]",
};

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Outcomes, not hours", desc: "Clear KPIs. Fixed milestones. We ship results you can measure.", tint: "#E6F0FF", stroke: "#1677ff" },
  { icon: UserCheck, title: "Senior-only team", desc: "Operators with 7–15 years in-seat experience. No handoffs.", tint: "#EAFBE0", stroke: "#2F8F5B" },
  { icon: Filter, title: "Full-funnel thinking", desc: "Acquisition, activation, revenue, and retention planned together.", tint: "#F1E8FF", stroke: "#7C3AED" },
  { icon: BarChart3, title: "Analytics first", desc: "Source-of-truth tracking, dashboards, and causal reads, not vanity metrics.", tint: "#E6F7FB", stroke: "#0EA5E9" },
  { icon: ShieldCheck, title: "Brand-safe and compliant", desc: "Review gates, approvals, and audit trails built in.", tint: "#EEFDF3", stroke: "#16A34A" },
  { icon: Receipt, title: "Transparent pricing and scope", desc: "No surprise fees. You see the plan, the spend, and the change log.", tint: "#F5F5F5", stroke: "#6B7280" },
];

// Scroll-animated wrapper for sections - scroll-based scale animation on wrapper
const ScrollAnimatedSection = ({ children, bgColor }: { children: React.ReactNode; bgColor: string }) => {
  const { ref, scale } = useScrollScale();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
    </div>
  );
};

const AllServices = () => {
  /* ===== DATA ===== */
  const allServices = [
    // Performance Marketing
    { icon: Target, title: "Google Ads", description: "Drive targeted traffic with powerful Google Ads campaigns", category: "performance-marketing", path: "/services/performance-marketing/google-ads" },
    { icon: Users, title: "Meta Ads", description: "Reach your audience on Facebook and Instagram", category: "performance-marketing", path: "/services/performance-marketing/meta-ads" },
    { icon: Megaphone, title: "YouTube Ads", description: "Engage viewers with compelling video advertisements", category: "performance-marketing", path: "/services/performance-marketing/youtube-ads" },
    { icon: TrendingUp, title: "CRO and Funnel", description: "Maximize your Amazon marketplace presence", category: "performance-marketing", path: "/services/performance-marketing/cro-funnel" },
    { icon: BarChart3, title: "Short Video Ads", description: "Track and optimize your advertising performance", category: "performance-marketing", path: "/services/performance-marketing/short-video-ads" },
    { icon: Zap, title: "Performance Accelerator Bundle", description: "Improve your conversion rates with data-driven insights", category: "performance-marketing", path: "/services/performance-marketing/performance-accelerator-bundle" },

    // LinkedIn Growth
    { icon: Users, title: "LinkedIn Ads", description: "Optimize your LinkedIn profile for maximum visibility", category: "linkedin-growth", path: "/services/linkedin-growth/linkedin-ads" },
    { icon: Megaphone, title: "Lead Generation", description: "Create engaging content that builds your network", category: "linkedin-growth", path: "/services/linkedin-growth/lead-genration" },
    { icon: Target, title: "Page Management", description: "Expand your professional network strategically", category: "linkedin-growth", path: "/services/linkedin-growth/page-management" },
    { icon: TrendingUp, title: "Executive Leadership", description: "Generate quality leads through LinkedIn outreach", category: "linkedin-growth", path: "/services/linkedin-growth/executive-leadership" },
    { icon: BarChart3, title: "Sales Navigator Enablement", description: "Track your LinkedIn performance and growth", category: "linkedin-growth", path: "/services/linkedin-growth/sales-navigator" },
    { icon: Bot, title: "LinkedIn Growth Bundle", description: "Automate your LinkedIn activities efficiently", category: "linkedin-growth", path: "/services/linkedin-growth/linkedin-growth-bundle" },

    // Content & Creative
    { icon: Megaphone, title: "Content Strategy", description: "Develop comprehensive content strategies", category: "content-creative", path: "/services/content-creative/content-strategy" },
    { icon: Star, title: "Carousels and Visuals", description: "Create stunning visuals", category: "content-creative", path: "/services/content-creative/carousels-visuals" },
    { icon: Users, title: "Video Production", description: "Produce engaging video content for all platforms", category: "content-creative", path: "/services/content-creative/video-production" },
    { icon: Heart, title: "Sales Collateral", description: "Craft compelling copy that converts", category: "content-creative", path: "/services/content-creative/sales-collateral" },
    { icon: Target, title: "SEO Content Production", description: "Search-led content at scale", category: "content-creative", path: "/services/content-creative/seo-content-production" },
    { icon: TrendingUp, title: "Full-Funnel Content Bundle", description: "Measure and optimize performance", category: "content-creative", path: "/services/content-creative/full-funnel-content-bundle" },

    // Growth & Demand Generation
    { icon: Target, title: "ABM Campaigns", description: "Generate high-quality leads", category: "growth-demand-generation", path: "/services/growth-demand-generation/abm-campaigns" },
    { icon: TrendingUp, title: "Influencer and UGC", description: "Creators that convert", category: "growth-demand-generation", path: "/services/growth-demand-generation/influencer-ugc" },
    { icon: Users, title: "Community", description: "Acquire and retain with community", category: "growth-demand-generation", path: "/services/growth-demand-generation/community" },
    { icon: Megaphone, title: "Viral and Culture", description: "Moments people share", category: "growth-demand-generation", path: "/services/growth-demand-generation/viral-culture" },
    { icon: BarChart3, title: "Partners & Affiliate", description: "Leverage partnerships to scale", category: "growth-demand-generation", path: "/services/growth-demand-generation/partner-affiliate" },
    { icon: Bot, title: "Demand Gen Bundle", description: "Playbooks to pipeline", category: "growth-demand-generation", path: "/services/growth-demand-generation/demand-gen-bundle" },

    // Analytics & AI
    { icon: BarChart3, title: "Analytics and Dashboards", description: "See the full picture", category: "analytics-ai", path: "/services/analytics-ai/analytics-dashboards" },
    { icon: Brain, title: "Attribution and Funnel", description: "Understand what drives ROI", category: "analytics-ai", path: "/services/analytics-ai/attribution-funnel" },
    { icon: Database, title: "AI Powered Campaigns", description: "Predictive and creative AI", category: "analytics-ai", path: "/services/analytics-ai/AI-Powered-Campaigns" },
    { icon: TrendingUp, title: "CRM and Automation", description: "Lifecycle orchestration", category: "analytics-ai", path: "/services/analytics-ai/crm-automation" },
    { icon: Bot, title: "Tagging & GA4 Audit", description: "Trustworthy data foundations", category: "analytics-ai", path: "/services/analytics-ai/tagging-ga4-audit" },
    { icon: Zap, title: "Measurement + AI Bundle", description: "End-to-end measurement + AI", category: "analytics-ai", path: "/services/analytics-ai/mesurement-AI-Bundle" },

    // Brand & Reputation
    { icon: Shield, title: "Brand Strategy", description: "Monitor and grow your brand", category: "brand-reputation", path: "/services/brand-reputation/brand-strategy" },
    { icon: Target, title: "Employer Branding", description: "Attract top talent", category: "brand-reputation", path: "/services/brand-reputation/employer-branding" },
    { icon: Star, title: "PR and ORM", description: "Manage and improve reviews", category: "brand-reputation", path: "/services/brand-reputation/pr-orm" },
    { icon: Heart, title: "Lifestyle and Vibe", description: "Build recognition and affinity", category: "brand-reputation", path: "/services/brand-reputation/lifestyle-vibe" },
    { icon: Users, title: "Website UX & Landing Pages", description: "High-converting UX + LPs", category: "brand-reputation", path: "/services/brand-reputation/website-ux-landing-page" },
    { icon: TrendingUp, title: "Brand Momentum Bundle", description: "Brand performance & sentiment", category: "brand-reputation", path: "/services/brand-reputation/brand-momentum-bundle" },
  ];

  const categories = [
    { name: "All Services", value: "all" },
    { name: "Performance Marketing", value: "performance-marketing" },
    { name: "LinkedIn Growth", value: "linkedin-growth" },
    { name: "Content & Creative", value: "content-creative" },
    { name: "Growth & Demand Generation", value: "growth-demand-generation" },
    { name: "Analytics & AI", value: "analytics-ai" },
    { name: "Brand & Reputation", value: "brand-reputation" },
  ];

  /* ===== STATE ===== */
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleServices, setVisibleServices] = useState(6);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  /* for scroll-to on View less */
  const servicesRef = useRef<HTMLDivElement | null>(null);

  /* scroller (for styling only; no arrows) */
  const tabsWrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = tabsWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {});
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* filter */
  const filtered = useMemo(() => {
    const byCat =
      activeCategory === "all"
        ? allServices
        : allServices.filter((s) => s.category === activeCategory);
    if (!query.trim()) return byCat;
    const q = query.toLowerCase();
    return (showSearch ? allServices : byCat).filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [allServices, activeCategory, query, showSearch]);

  /* paging flags */
  const canViewMore = filtered.length > 6 && visibleServices < filtered.length;
  const canViewLess = filtered.length > 6 && visibleServices >= filtered.length;

  const handleCategoryChange = (v: string) => {
    setActiveCategory(v);
    setVisibleServices(6);
    setQuery("");
  };

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="ALL DIGITAL SERVICES"
        heading="Complete Digital Marketing Solutions"
        description="Discover our comprehensive range of services to grow and scale."
        ctaText="Talk to an Expert"
        ctaLink="/resources/support"
        imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
        imageAlt="Digital Marketing Team Collaboration"
      />
      
      {/* ===== SERVICES ===== */}
      <section id="services" ref={servicesRef} className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10">
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
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Explore our complete service catalog
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-[15px] sm:text-lg text-slate-600 max-w-3xl mx-auto"
            >
              From performance marketing to brand building—find the perfect solution to accelerate your growth.
            </motion.p>
          </motion.header>

          <div className="container px-4">
          <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
            {/* Mobile: dropdown */}
            <div className="md:hidden mb-8">
              <label htmlFor="services-category" className="block text-sm font-medium text-muted-foreground mb-2">
                Filter services
              </label>
              <Select
                value={activeCategory}
                onValueChange={(v) => { setShowSearch(false); handleCategoryChange(v); }}
              >
                <SelectTrigger id="services-category" className="w-full">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop: connected strip with premium scrollbar */}
            <div className="hidden md:block mb-12">
              {!showSearch ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0 rounded-2xl border bg-white shadow-sm overflow-hidden">
                    <div 
                      ref={tabsWrapRef} 
                      className="overflow-x-auto px-1 py-1"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#cbd5e1 #f1f5f9',
                      }}
                    >
                      <style>{`
                        .overflow-x-auto::-webkit-scrollbar {
                          height: 6px;
                        }
                        .overflow-x-auto::-webkit-scrollbar-track {
                          background: #f1f5f9;
                          border-radius: 10px;
                          margin: 0 8px;
                        }
                        .overflow-x-auto::-webkit-scrollbar-thumb {
                          background: #cbd5e1;
                          border-radius: 10px;
                          transition: background 0.2s ease;
                        }
                        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                          background: #94a3b8;
                        }
                      `}</style>
                      <TabsList className="flex h-12 items-center gap-2 px-2 min-w-max bg-transparent">
                        {categories.map((c) => (
                          <TabsTrigger
                            key={c.value}
                            value={c.value}
                            className={[
                              "px-4 h-9 rounded-full whitespace-nowrap shrink-0 text-[13px]",
                              "transition-colors",
                              "data-[state=active]:bg-[#1677ff] data-[state=active]:text-white",
                              "data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground/80 hover:bg-muted/70",
                              "border border-transparent data-[state=active]:border-[#1677ff]",
                            ].join(" ")}
                          >
                            {c.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Search services"
                    onClick={() => { setShowSearch(true); setQuery(""); }}
                    className="rounded-full border bg-white shadow-sm hover:bg-slate-50"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Back to categories"
                    onClick={() => { setShowSearch(false); setQuery(""); }}
                    className="rounded-full border bg-white shadow-sm hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Input
                    autoFocus
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setVisibleServices(6); }}
                    placeholder="Search services, categories…"
                    className="flex-1 h-11 rounded-full bg-white border shadow-sm"
                  />
                </div>
              )}
            </div>

              {/* Cards */}
              {categories.map((c) => (
                <TabsContent key={c.value} value={c.value}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.slice(0, visibleServices).map((service, i) => {
                      const Icon = service.icon;
                      const grad = accent[service.category] || "from-[#79d9ff] to-[#0074ED]";
                      return (
                        <Card
                          key={service.path}
                          className="group border-0 rounded-xl bg-white shadow-[0_6px_24px_rgba(6,20,38,.06)] hover:shadow-[0_10px_28px_rgba(6,20,38,.10)] transition-shadow overflow-hidden"
                          style={{ animationDelay: `${i * 80}ms` }}
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={
                                performanceMarketingImages[service.title] || 
                                linkedInGrowthImages[service.title] || 
                                contentCreativeImages[service.title] ||
                                growthDemandGenImages[service.title] ||
                                brandReputationImages[service.title] ||
                                analyticsAIImages[service.title] ||
                                img(service.title)
                              }
                              alt={service.title}
                              className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                            <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-2.5 py-1 text-white text-xs backdrop-blur">
                              <Icon className="h-3.5 w-3.5" />
                              <span>{service.title}</span>
                            </div>
                          </div>
                          <CardHeader className="pb-1">
                            <CardTitle className="text-[18px]">{service.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-5">{service.description}</p>
                            <Button asChild className="w-full bg-[#1677ff] hover:bg-[#1468df]">
                              <Link to={service.path}>
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                    </div>

                    {/* Load more / less — one button at a time */}
                    <div className="flex justify-center mt-12">
                    {canViewMore && (
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 rounded-full"
                        onClick={() =>
                          setVisibleServices((n) => Math.min(n + 6, filtered.length))
                        }
                      >
                        View more services <ChevronDown className="h-4 w-4" />
                      </Button>
                    )}

                    {canViewLess && (
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 rounded-full"
                        onClick={() => {
                          setVisibleServices(6);
                          servicesRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                      >
                        View less services <ChevronUp className="h-4 w-4" />
                      </Button>
                    )}
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
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
                heading="Why choose us for All Services" 
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

export default AllServices;
