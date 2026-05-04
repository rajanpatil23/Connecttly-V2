import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  ArrowRight, BarChart3, Bot, Brain, Database, TrendingUp, Zap,
  LineChart, Cpu, GitBranch, Workflow, CheckCircle2, Gauge, Activity, Shield, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon, { RibbonItem } from "@/components/Services/category/ServicesRibbon";

/* Service image mapping for Analytics & AI */
const analyticsAIImages: Record<string, string> = {
  "Analytics and Dashboards": "/images/Services/Analytics&AI/AnalyticsandDashboards.png",
  "Attribution and Funnel": "/images/Services/Analytics&AI/AttributionandFunnel.png",
  "AI Powered Campaigns": "/images/Services/Analytics&AI/AIPoweredCampaigns.png",
  "CRM and Automation": "/images/Services/Analytics&AI/CRMandAutomation.png",
  "Tagging & GA4 Audit": "/images/Services/Analytics&AI/Tagging&GA4Audit.png",
  "Measurement + AI Bundle": "/images/Services/Analytics&AI/Measurement+AIBundle.png",
};

/* category gradient accent */
const accent = "from-[#0074ED] to-[#A6FF5F]";

const ribbonItems: RibbonItem[] = [
  {
    color: "bg-[#0074ED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    title: "Real-Time Dashboards",
    subtitle: "Live Performance Tracking & Insights",
  },
  {
    color: "bg-[#2F8F5B]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "Multi-Touch Attribution",
    subtitle: "Understand Full Customer Journey",
  },
  {
    color: "bg-[#7C3AED]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69z"/>
      </svg>
    ),
    title: "AI-Powered Predictions",
    subtitle: "Forecasting & Anomaly Detection",
  },
  {
    color: "bg-[#0EA5E9]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    title: "GA4 & Tag Audits",
    subtitle: "Clean, Accurate Data Foundations",
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: LineChart, title: "Source-of-Truth Data", desc: "Clean, unified tracking across all platforms—no more conflicting numbers.", tint: "#E6F0FF", stroke: "#1677ff" },
  { icon: GitBranch, title: "Multi-Touch Attribution", desc: "Understand the full customer journey, not just last-click conversions.", tint: "#F1E8FF", stroke: "#7C3AED" },
  { icon: Cpu, title: "AI-Powered Insights", desc: "Predictive models, anomaly detection, and automated recommendations.", tint: "#EAFBE0", stroke: "#2F8F5B" },
  { icon: Gauge, title: "Real-Time Dashboards", desc: "Live performance views for executives, marketers, and analysts.", tint: "#E6F7FB", stroke: "#0EA5E9" },
  { icon: CheckCircle2, title: "GA4 & Tag Audits", desc: "Fix broken tracking, validate data accuracy, and ensure compliance.", tint: "#EEFDF3", stroke: "#16A34A" },
  { icon: Sparkles, title: "Custom AI Models", desc: "Train models on your data for churn prediction, LTV forecasting, and more.", tint: "#E0F2FE", stroke: "#0284C7" },
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

const AnalyticsAI = () => {
  /* ===== ANALYTICS & AI SERVICES ===== */
  const services = [
    { 
      icon: BarChart3, 
      title: "Analytics and Dashboards", 
      description: "See the full picture with comprehensive analytics dashboards", 
      path: "/services/analytics-ai/analytics-dashboards" 
    },
    { 
      icon: Brain, 
      title: "Attribution and Funnel", 
      description: "Understand what drives ROI with multi-touch attribution", 
      path: "/services/analytics-ai/attribution-funnel" 
    },
    { 
      icon: Database, 
      title: "AI Powered Campaigns", 
      description: "Predictive and creative AI for smarter campaigns", 
      path: "/services/analytics-ai/AI-Powered-Campaigns" 
    },
    { 
      icon: TrendingUp, 
      title: "CRM and Automation", 
      description: "Lifecycle orchestration and marketing automation", 
      path: "/services/analytics-ai/crm-automation" 
    },
    { 
      icon: Bot, 
      title: "Tagging & GA4 Audit", 
      description: "Trustworthy data foundations with proper tracking", 
      path: "/services/analytics-ai/tagging-ga4-audit" 
    },
    { 
      icon: Zap, 
      title: "Measurement + AI Bundle", 
      description: "End-to-end measurement and AI solutions", 
      path: "/services/analytics-ai/mesurement-AI-Bundle" 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="ANALYTICS & AI"
        heading="Analytics & AI Intelligence"
        description="Transform data into actionable insights with advanced analytics and AI-powered intelligence."
        ctaText="Talk to an expert"
        ctaLink="/resources/support"
        imageSrc="/images/home/services/AnalyticsAI.svg"
        imageAlt="Analytics and AI Intelligence Dashboard"
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
                  Analytics & AI Services
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
                >
                  Leverage advanced analytics and AI to make data-driven decisions and optimize performance.
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
                          src={analyticsAIImages[service.title] || `/images/Services/Analytics&AI/${service.title.replace(/ /g, '')}.png`}
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
                heading="Why choose us for Analytics & AI" 
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

export default AnalyticsAI;
