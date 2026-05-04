import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  PieChart, Activity, Eye, Filter, Download, RefreshCw
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
    icon: <BarChart3 className="h-5 w-5 text-white" />,
    title: "500+",
    subtitle: "Dashboards built",
  },
  {
    icon: <Eye className="h-5 w-5 text-white" />,
    title: "100M+",
    subtitle: "Data points visualized",
  },
  {
    icon: <Zap className="h-5 w-5 text-white" />,
    title: "10x",
    subtitle: "Faster insights",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "98%",
    subtitle: "User satisfaction",
  },
];

const dashboardFeatures: FeatureItem[] = [
  {
    icon: BarChart3,
    title: "Custom Dashboard Design",
    description: "Tailored dashboards that display the metrics that matter most to your business."
  },
  {
    icon: Activity,
    title: "Real-Time Data Updates",
    description: "Live data connections that update automatically so you always have current insights."
  },
  {
    icon: PieChart,
    title: "Interactive Visualizations",
    description: "Drill down into data with interactive charts, filters, and dynamic reporting."
  },
  {
    icon: Filter,
    title: "Advanced Filtering & Segmentation",
    description: "Slice and dice data by any dimension to uncover hidden insights."
  },
  {
    icon: Download,
    title: "Automated Reporting",
    description: "Schedule automated reports delivered to stakeholders on your preferred cadence."
  },
  {
    icon: RefreshCw,
    title: "Multi-Source Integration",
    description: "Combine data from all your marketing platforms into unified dashboards."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Eye, title: "Clear Visibility", desc: "See all your marketing data in one place, clearly visualized." },
  { icon: Zap, title: "Fast Insights", desc: "Get answers to business questions in seconds, not hours." },
  { icon: Target, title: "Actionable Data", desc: "Dashboards designed to drive decisions, not just display data." },
  { icon: Users, title: "User-Friendly", desc: "Intuitive interfaces that anyone on your team can use." },
  { icon: RefreshCw, title: "Always Current", desc: "Real-time data means you're never working with stale information." },
  { icon: Award, title: "Expert Design", desc: "Built by data visualization experts who understand marketing." },
];

const dashboardProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Discovery & Requirements", 
    description: "Understand your business goals, key metrics, and reporting needs." 
  },
  { 
    step: "02", 
    title: "Data Integration", 
    description: "Connect all data sources and ensure clean, accurate data flow." 
  },
  { 
    step: "03", 
    title: "Dashboard Design & Build", 
    description: "Create custom dashboards with intuitive visualizations and interactivity." 
  },
  { 
    step: "04", 
    title: "Training & Optimization", 
    description: "Train your team and continuously refine dashboards based on usage." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 800, yearly: 7680 },
    description: "Essential analytics dashboards",
    features: [
      "Up to 3 custom dashboards",
      "5 data source integrations",
      "Real-time data updates",
      "Basic visualizations",
      "Monthly dashboard updates",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1400, yearly: 13440 },
    description: "Advanced analytics & reporting",
    features: [
      "Up to 10 custom dashboards",
      "Unlimited data sources",
      "Advanced visualizations",
      "Interactive filtering",
      "Automated reporting",
      "Weekly dashboard updates",
      "Priority support",
      "Dedicated analyst"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2800, yearly: 26880 },
    description: "Enterprise analytics solution",
    features: [
      "Unlimited custom dashboards",
      "Enterprise data warehouse",
      "Custom visualizations",
      "White-label dashboards",
      "API access",
      "Real-time alerts",
      "Executive reporting",
      "Dedicated analytics team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const dashboardTools: Tool[] = [
  { name: "Google Data Studio", logo: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Tableau", logo: "https://cdn.simpleicons.org/tableau/E97627" },
  { name: "Power BI", logo: "https://cdn.simpleicons.org/powerbi/F2C811" },
  { name: "Looker", logo: "https://logo.clearbit.com/looker.com" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "BigQuery", logo: "https://cdn.simpleicons.org/googlebigquery/669DF6" },
  { name: "Snowflake", logo: "https://cdn.simpleicons.org/snowflake/29B5E8" },
  { name: "Domo", logo: "https://logo.clearbit.com/domo.com" },
];

const dashboardFAQs: FAQItem[] = [
  {
    question: "What data sources can you integrate?",
    answer: "We can integrate virtually any data source: Google Ads, Facebook Ads, LinkedIn Ads, Google Analytics, CRM systems (Salesforce, HubSpot), email platforms, e-commerce platforms, databases, and more. If it has an API or data export, we can connect it. We handle all the technical integration work so you don't have to."
  },
  {
    question: "How long does it take to build a dashboard?",
    answer: "Simple dashboards can be built in 1-2 weeks. Complex dashboards with multiple data sources and custom visualizations typically take 3-4 weeks. The timeline depends on: number of data sources, complexity of data transformations needed, custom visualization requirements, and stakeholder review cycles. We provide a detailed timeline during discovery."
  },
  {
    question: "Can I customize the dashboards myself?",
    answer: "Yes! We build dashboards in tools like Google Data Studio, Tableau, or Power BI that allow you to make changes. We provide training so your team can update filters, add new metrics, or adjust visualizations. For major changes, we're available to help. Most clients prefer us to handle updates to ensure data accuracy and best practices."
  },
  {
    question: "How often is the data updated?",
    answer: "Data update frequency depends on the source and your needs. Most dashboards update in real-time or hourly. Some data sources (like Google Ads) update every few hours, while others (like CRM data) can update in real-time. We'll recommend the optimal refresh schedule based on your use case and data sources."
  },
  {
    question: "What's the difference between the dashboard tools?",
    answer: "Google Data Studio: Free, easy to use, great for marketing data. Tableau: Powerful, handles large datasets, best for complex analysis. Power BI: Microsoft ecosystem, good for enterprise. Looker: Advanced, requires technical setup, best for data teams. We'll recommend the best tool based on your needs, team skills, and existing tech stack."
  },
  {
    question: "Can you create mobile-friendly dashboards?",
    answer: "Yes! All our dashboards are responsive and work on mobile devices. We can also create mobile-specific views optimized for smaller screens. This is especially useful for executives who want to check metrics on the go. Mobile dashboards include the most important KPIs with simplified visualizations."
  },
  {
    question: "How do you ensure data accuracy?",
    answer: "We implement multiple quality checks: data validation rules, automated anomaly detection, reconciliation with source systems, and regular audits. We also document all data transformations and calculations so you understand exactly how metrics are calculated. If we spot data issues, we alert you immediately and work to resolve them."
  },
  {
    question: "Can you set up automated alerts?",
    answer: "Yes! We can configure alerts for any metric or threshold. For example: alert when conversion rate drops below X%, when ad spend exceeds budget, when website traffic spikes, or when leads decrease week-over-week. Alerts can be sent via email, Slack, or SMS. This helps you catch issues early and capitalize on opportunities quickly."
  },
];

const AnalyticsDashboards = () => {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <Hero
        eyebrow="ANALYTICS DASHBOARDS"
        heading="Transform Data into Actionable Insights with Custom Dashboards"
        description="Beautiful, intuitive dashboards that give you real-time visibility into your marketing performance and drive better decisions."
        ctaText="Get Started"
        ctaLink="/resources/support"
        imageSrc="/images/Services/Analytics&AI/AnalyticsandDashboards.png"
        imageAlt="Analytics Dashboards"
      />

      {/* ===== STATS RIBBON ===== */}
      <section className="py-8 sm:py-10">
        <ServicesRibbon 
        title="Trusted by Data-Driven Teams"
        items={ribbonItems}
      />
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <ServiceFeatures
                eyebrow="What We Offer"
                heading="Custom Analytics Dashboard Solutions"
                description="From design to deployment, we create dashboards that transform how you understand your business."
                features={dashboardFeatures}
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
                heading="Why Choose Our Dashboard Solutions" 
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
                subheading="How We Build Dashboards"
                description="A proven methodology for creating dashboards that drive results"
                steps={dashboardProcessSteps}
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
                heading="Choose Your Dashboard Plan"
                description="Select the perfect plan for your analytics needs. All plans include custom dashboard design and data integration."
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
            title="Powered by Leading Analytics Platforms"
            description="We use the best data visualization and analytics tools to create powerful dashboards."
            tools={dashboardTools}
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
        subtitle="Everything you need to know about our analytics dashboard services"
        faqs={dashboardFAQs}
        accentColor="from-[#0074ED] to-[#5B9BF8]"
      />
      </section>
    </div>
  );
};

export default AnalyticsDashboards;
