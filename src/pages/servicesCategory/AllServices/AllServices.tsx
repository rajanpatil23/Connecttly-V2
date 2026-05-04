import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SectionLabel from "@/components/_zip/SectionLabel";
import StatsBar from "@/components/_zip/StatsBar";
import { sharedStats } from "@/components/_zip/stats-data";
import ReviewCarousel from "@/components/_zip/Home/ReviewCarousel";
import { CategoryServiceCard } from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services-hero-person.png";

type ServiceItem = CategoryServiceCard & { category: string };

const services: ServiceItem[] = [
  // Performance Marketing
  { category: "Performance Marketing", title: "Google Ads", desc: "Drive targeted traffic with powerful Google Ads campaigns.", link: "/services/performance-marketing/google-ads", image: "/images/Services/Performance Marketing/GoogleAds.png", cta: "Learn more" },
  { category: "Performance Marketing", title: "Meta Ads", desc: "Reach your audience on Facebook and Instagram.", link: "/services/performance-marketing/meta-ads", image: "/images/Services/Performance Marketing/MetaAds.png", cta: "Learn more" },
  { category: "Performance Marketing", title: "YouTube Ads", desc: "Engage viewers with compelling video advertisements.", link: "/services/performance-marketing/youtube-ads", image: "/images/Services/Performance Marketing/YouTubeAds.png", cta: "Learn more" },
  { category: "Performance Marketing", title: "CRO and Funnel", desc: "Optimize conversion rates with data-driven insights.", link: "/services/performance-marketing/cro-funnel", image: "/images/Services/Performance Marketing/CROandFunnel.png", cta: "Learn more" },
  { category: "Performance Marketing", title: "Short Video Ads", desc: "Capture attention with short-form video advertising.", link: "/services/performance-marketing/short-video-ads", image: "/images/Services/Performance Marketing/ShortVideoAds.png", cta: "Learn more" },
  { category: "Performance Marketing", title: "Performance Accelerator Bundle", desc: "Complete performance marketing solution for rapid growth.", link: "/services/performance-marketing/performance-accelerator-bundle", image: "/images/Services/Performance Marketing/PerformanceAcceleratorBundle.png", cta: "Explore Bundle", recommended: true },

  // LinkedIn Growth
  { category: "LinkedIn Growth", title: "LinkedIn Ads", desc: "High-intent B2B campaigns engineered for pipeline.", link: "/services/linkedin-growth/linkedin-ads", image: "/images/Services/Linkedin Growth/LinkedinAds.png", cta: "Learn more" },
  { category: "LinkedIn Growth", title: "Lead Generation", desc: "Predictable inbound and outbound on LinkedIn.", link: "/services/linkedin-growth/lead-genration", image: "/images/Services/Linkedin Growth/LeadGenration.png", cta: "Learn more" },
  { category: "LinkedIn Growth", title: "Page Management", desc: "Grow your company page into a content engine.", link: "/services/linkedin-growth/page-management", image: "/images/Services/Linkedin Growth/PageManagement.png", cta: "Learn more" },
  { category: "LinkedIn Growth", title: "Executive Leadership", desc: "Position your founders as industry voices.", link: "/services/linkedin-growth/executive-leadership", image: "/images/Services/Linkedin Growth/ExecutiveLeadership.png", cta: "Learn more" },
  { category: "LinkedIn Growth", title: "Sales Navigator", desc: "Turn Sales Navigator into a closing machine.", link: "/services/linkedin-growth/sales-navigator", image: "/images/Services/Linkedin Growth/SalesNavigatorEnablement.png", cta: "Learn more" },
  { category: "LinkedIn Growth", title: "LinkedIn Growth Bundle", desc: "End-to-end LinkedIn engine across ads, content & social selling.", link: "/services/linkedin-growth/linkedin-growth-bundle", image: "/images/Services/Linkedin Growth/LinkedInGrowthBundle.png", cta: "Explore Bundle", recommended: true },

  // Content & Creative
  { category: "Content & Creative", title: "Content Strategy", desc: "Editorial planning rooted in audience and intent.", link: "/services/content-creative/content-strategy", image: "/images/Services/Content Creative/ContentStratergy.png", cta: "Learn more" },
  { category: "Content & Creative", title: "SEO Content Production", desc: "Search-led content that ranks and converts.", link: "/services/content-creative/seo-content-production", image: "/images/Services/Content Creative/SEOContentProduction.png", cta: "Learn more" },
  { category: "Content & Creative", title: "Carousels & Visuals", desc: "Scroll-stopping visuals for social and ads.", link: "/services/content-creative/carousels-visuals", image: "/images/Services/Content Creative/CarouselsandVisuals.png", cta: "Learn more" },
  { category: "Content & Creative", title: "Video Production", desc: "Short-form and long-form video that performs.", link: "/services/content-creative/video-production", image: "/images/Services/Content Creative/VideoProduction.png", cta: "Learn more" },
  { category: "Content & Creative", title: "Sales Collateral", desc: "Decks, one-pagers, and case studies that close.", link: "/services/content-creative/sales-collateral", image: "/images/Services/Content Creative/SalesCollateral.png", cta: "Learn more" },
  { category: "Content & Creative", title: "Full Funnel Content Bundle", desc: "Top, middle, and bottom of funnel content in one program.", link: "/services/content-creative/full-funnel-content-bundle", image: "/images/Services/Content Creative/FullFunnelContentBundle.png", cta: "Explore Bundle", recommended: true },

  // Growth & Demand Generation
  { category: "Growth & Demand", title: "ABM Campaigns", desc: "Account-based campaigns that win named accounts.", link: "/services/growth-demand-generation/abm-campaigns", image: "/images/Services/DemandGrowthGeneration/ABMCampaigns.png", cta: "Learn more" },
  { category: "Growth & Demand", title: "Community", desc: "Build owned communities that compound over time.", link: "/services/growth-demand-generation/community", image: "/images/Services/DemandGrowthGeneration/Community.png", cta: "Learn more" },
  { category: "Growth & Demand", title: "Influencer & UGC", desc: "Authentic creator partnerships and UGC at scale.", link: "/services/growth-demand-generation/influencer-ugc", image: "/images/Services/DemandGrowthGeneration/InfluencerandUGC.png", cta: "Learn more" },
  { category: "Growth & Demand", title: "Partner & Affiliate", desc: "Launch and scale partner-led growth programs.", link: "/services/growth-demand-generation/partner-affiliate", image: "/images/Services/DemandGrowthGeneration/PartnersAffiliate.png", cta: "Learn more" },
  { category: "Growth & Demand", title: "Viral Culture", desc: "Cultural campaigns that travel beyond your channels.", link: "/services/growth-demand-generation/viral-culture", image: "/images/Services/DemandGrowthGeneration/ViralCulture.png", cta: "Learn more" },
  { category: "Growth & Demand", title: "Demand Gen Bundle", desc: "Full demand engine across owned, earned and paid.", link: "/services/growth-demand-generation/demand-gen-bundle", image: "/images/Services/DemandGrowthGeneration/DemandGenBundle.png", cta: "Explore Bundle", recommended: true },

  // Analytics & AI
  { category: "Analytics & AI", title: "Tagging & GA4 Audit", desc: "Pixel-perfect tracking across web and app.", link: "/services/analytics-ai/tagging-ga4-audit", image: "/images/Services/Analytics&AI/Tagging&GA4Audit.png", cta: "Learn more" },
  { category: "Analytics & AI", title: "Analytics & Dashboards", desc: "Looker dashboards your CFO actually understands.", link: "/services/analytics-ai/analytics-dashboards", image: "/images/Services/Analytics&AI/AnalyticsandDashboards.png", cta: "Learn more" },
  { category: "Analytics & AI", title: "Attribution & Funnel", desc: "Multi-touch attribution and funnel intelligence.", link: "/services/analytics-ai/attribution-funnel", image: "/images/Services/Analytics&AI/AttributionandFunnel.png", cta: "Learn more" },
  { category: "Analytics & AI", title: "CRM & Automation", desc: "HubSpot/Salesforce ops and lifecycle automation.", link: "/services/analytics-ai/crm-automation", image: "/images/Services/Analytics&AI/CRMandAutomation.png", cta: "Learn more" },
  { category: "Analytics & AI", title: "AI-Powered Campaigns", desc: "AI-augmented creative, bidding and personalisation.", link: "/services/analytics-ai/AI-Powered-Campaigns", image: "/images/Services/Analytics&AI/AIPoweredCampaigns.png", cta: "Learn more" },
  { category: "Analytics & AI", title: "Measurement + AI Bundle", desc: "Complete measurement and AI stack in one program.", link: "/services/analytics-ai/mesurement-AI-Bundle", image: "/images/Services/Analytics&AI/Measurement+AIBundle.png", cta: "Explore Bundle", recommended: true },

  // Brand & Reputation
  { category: "Brand & Reputation", title: "Brand Strategy", desc: "Positioning, narrative and identity systems.", link: "/services/brand-reputation/brand-strategy", image: "/images/Services/Brand&Reputation/BrandStrategy.png", cta: "Learn more" },
  { category: "Brand & Reputation", title: "PR & ORM", desc: "Earned media, reputation and crisis response.", link: "/services/brand-reputation/pr-orm", image: "/images/Services/Brand&Reputation/PRandORM.png", cta: "Learn more" },
  { category: "Brand & Reputation", title: "Website UX & Landing Pages", desc: "High-converting websites and landing pages.", link: "/services/brand-reputation/website-ux-landing-page", image: "/images/Services/Brand&Reputation/WebsiteUX&LandingPages.png", cta: "Learn more" },
  { category: "Brand & Reputation", title: "Employer Branding", desc: "EVP and recruitment marketing that attracts talent.", link: "/services/brand-reputation/employer-branding", image: "/images/Services/Brand&Reputation/EmployerBranding.png", cta: "Learn more" },
  { category: "Brand & Reputation", title: "Lifestyle & Vibe", desc: "Photo, video and culture content that humanises brand.", link: "/services/brand-reputation/lifestyle-vibe", image: "/images/Services/Brand&Reputation/LifestyleandVibe.png", cta: "Learn more" },
  { category: "Brand & Reputation", title: "Brand Momentum Bundle", desc: "Strategy + PR + web + content in one program.", link: "/services/brand-reputation/brand-momentum-bundle", image: "/images/Services/Brand&Reputation/BrandMomentumBundle.png", cta: "Explore Bundle", recommended: true },
];

const CATEGORIES = [
  "Performance Marketing",
  "LinkedIn Growth",
  "Content & Creative",
  "Growth & Demand",
  "Analytics & AI",
  "Brand & Reputation",
];

const PAGE_SIZE = 6;

function ServiceCard({ s }: { s: CategoryServiceCard }) {
  if (s.recommended) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-6 flex flex-col shadow-[0_10px_30px_hsl(var(--primary)/0.35)]">
        <div className="absolute top-0 left-0 w-28 h-28 overflow-hidden pointer-events-none rounded-tl-2xl">
          <div className="absolute top-5 -left-8 w-40 rotate-[-45deg] bg-white/95 text-primary text-[10px] font-bold tracking-wide text-center py-1 shadow-md">
            Recommended
          </div>
        </div>
        {s.image && (
          <div className="rounded-xl aspect-[4/3] mb-5 overflow-hidden bg-white/10">
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <h3 className="font-heading font-semibold text-lg mb-2 mt-2">{s.title}</h3>
        <p className="text-sm opacity-90 mb-5 flex-1">{s.desc}</p>
        <Button asChild className="rounded-full font-semibold w-full bg-background text-primary hover:bg-background/90">
          <Link to={s.link || "/resources/support"}>{s.cta || "Explore"}</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="bg-background rounded-2xl border border-border p-5 flex flex-col shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
      {s.image && (
        <div className="rounded-xl aspect-[4/3] mb-5 overflow-hidden">
          <img src={s.image} alt={s.title} className="w-full h-full object-cover rounded-xl" loading="lazy" />
        </div>
      )}
      <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
      <p className="text-sm text-muted-foreground mb-5 flex-1">{s.desc}</p>
      <Button asChild={!!s.link} className="rounded-full font-semibold w-full">
        {s.link ? <Link to={s.link}>{s.cta || "Learn more"}</Link> : <span>{s.cta || "Learn more"}</span>}
      </Button>
    </div>
  );
}

function AllServicesGrid() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const total = services.length;
  const items = services.slice(0, visible);
  const canLoadMore = visible < total;
  const isExpanded = visible > PAGE_SIZE;

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((s) => (
          <ServiceCard key={s.title} s={s} />
        ))}
      </div>
      <div className="flex justify-center mt-10 gap-3">
        {canLoadMore && (
          <Button
            onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, total))}
            className="rounded-full px-6 font-semibold"
          >
            View more
          </Button>
        )}
        {!canLoadMore && isExpanded && (
          <Button
            onClick={() => setVisible(PAGE_SIZE)}
            variant="outline"
            className="rounded-full px-6 font-semibold"
          >
            View less
          </Button>
        )}
      </div>
    </>
  );
}

export default function AllServices() {
  const byCategory = useMemo(() => {
    const map: Record<string, ServiceItem[]> = {};
    for (const c of CATEGORIES) map[c] = [];
    for (const s of services) map[s.category]?.push(s);
    return map;
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="pt-6 md:pt-10 pb-16 md:pb-20">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel label="ALL DIGITAL SERVICES" />
              <h1 className="mt-4 text-3xl md:text-5xl font-heading font-bold leading-tight">
                Everything You Need to{" "}
                <span className="gradient-text">Attract, Convert, and Scale</span>
              </h1>
              <p className="text-muted-foreground mt-4">
                36 services. 6 categories. One growth partner. Every service is built to move a number that matters to your business.
              </p>
              <div className="flex gap-3 mt-6 flex-wrap">
                <Button asChild className="rounded-full px-6 font-semibold">
                  <Link to="/resources/support">Work with us</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6 font-semibold">
                  <Link to="/resources/blog">See our insights</Link>
                </Button>
              </div>
            </div>

            <div className="relative w-full max-w-[434px] mx-auto md:ml-auto md:mr-0 py-10 md:py-14">
              <div className="relative rounded-md overflow-hidden w-full bg-[hsl(48_100%_55%)]" style={{ aspectRatio: "434 / 659" }}>
                <img src={heroImg} alt="All services" className="absolute inset-0 w-full h-full object-cover" width={434} height={659} />
              </div>
              <div className="absolute top-40 right-4 md:right-8 bg-background rounded-full shadow-[0_8px_24px_hsl(var(--foreground)/0.12)] pl-2.5 pr-4 py-1.5 flex items-center gap-2 animate-float-y z-10">
                <span className="text-primary font-bold text-sm">36</span>
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">Specialised Services</span>
              </div>
              <div className="absolute top-[34%] -left-4 md:-left-8 bg-primary text-primary-foreground rounded-xl shadow-[0_8px_24px_hsl(var(--primary)/0.35)] px-4 py-2.5 animate-float-y z-10">
                <p className="text-2xl font-bold leading-none">36</p>
                <p className="text-[11px] font-medium opacity-90 mt-1 leading-tight">Specialized<br />Services</p>
              </div>
              <div className="absolute bottom-16 right-4 md:right-6 bg-primary text-primary-foreground rounded-xl shadow-[0_8px_24px_hsl(var(--primary)/0.35)] px-4 py-2.5 animate-float-y z-10">
                <p className="text-2xl font-bold leading-none">100%</p>
                <p className="text-[11px] font-medium opacity-90 mt-1 leading-tight">Results-Driven</p>
              </div>
            </div>
          </div>

          <StatsBar stats={sharedStats} />
        </div>
      </section>

      {/* Tabbed Services */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-20 bg-background">
        <div className="container-main">
          <SectionLabel label="Our Services" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center max-w-2xl mx-auto mt-4 mb-8">
            Everything you need to <span className="gradient-text">grow your business</span>
          </h2>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-transparent mb-10">
              <TabsTrigger value="all" className="rounded-full px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                All Services
              </TabsTrigger>
              {CATEGORIES.map((c) => (
                <TabsTrigger
                  key={c}
                  value={c}
                  className="rounded-full px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <AllServicesGrid />
            </TabsContent>

            {CATEGORIES.map((c) => (
              <TabsContent key={c} value={c}>
                <div className="grid md:grid-cols-3 gap-6">
                  {byCategory[c].map((s) => (
                    <ServiceCard key={s.title} s={s} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-ct-section">
        <div className="container-main">
          <SectionLabel label="Testimonials" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mt-4 mb-10">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>
        <ReviewCarousel noPadding />
      </section>
    </div>
  );
}
