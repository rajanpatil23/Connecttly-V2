import ServiceCategoryTemplate, {
  CategoryServiceCard,
} from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services-hero-person.png";

const services: CategoryServiceCard[] = [
  // Performance Marketing
  { title: "Google Ads", desc: "Drive targeted traffic with powerful Google Ads campaigns.", link: "/services/performance-marketing/google-ads", image: "/images/Services/Performance Marketing/GoogleAds.png", cta: "Learn more" },
  { title: "Meta Ads", desc: "Reach your audience on Facebook and Instagram.", link: "/services/performance-marketing/meta-ads", image: "/images/Services/Performance Marketing/MetaAds.png", cta: "Learn more" },
  { title: "YouTube Ads", desc: "Engage viewers with compelling video advertisements.", link: "/services/performance-marketing/youtube-ads", image: "/images/Services/Performance Marketing/YouTubeAds.png", cta: "Learn more" },
  { title: "CRO and Funnel", desc: "Optimize conversion rates with data-driven insights.", link: "/services/performance-marketing/cro-funnel", image: "/images/Services/Performance Marketing/CROandFunnel.png", cta: "Learn more" },
  { title: "Short Video Ads", desc: "Capture attention with short-form video advertising.", link: "/services/performance-marketing/short-video-ads", image: "/images/Services/Performance Marketing/ShortVideoAds.png", cta: "Learn more" },
  { title: "Performance Accelerator Bundle", desc: "Complete performance marketing solution for rapid growth.", link: "/services/performance-marketing/performance-accelerator-bundle", image: "/images/Services/Performance Marketing/PerformanceAcceleratorBundle.png", cta: "Explore Bundle", recommended: true },

  // LinkedIn Growth
  { title: "LinkedIn Ads", desc: "High-intent B2B campaigns engineered for pipeline.", link: "/services/linkedin-growth/linkedin-ads", image: "/images/Services/Linkedin Growth/LinkedinAds.png", cta: "Learn more" },
  { title: "Lead Generation", desc: "Predictable inbound and outbound on LinkedIn.", link: "/services/linkedin-growth/lead-genration", image: "/images/Services/Linkedin Growth/LeadGenration.png", cta: "Learn more" },
  { title: "Page Management", desc: "Grow your company page into a content engine.", link: "/services/linkedin-growth/page-management", image: "/images/Services/Linkedin Growth/PageManagement.png", cta: "Learn more" },
  { title: "Executive Leadership", desc: "Position your founders as industry voices.", link: "/services/linkedin-growth/executive-leadership", image: "/images/Services/Linkedin Growth/ExecutiveLeadership.png", cta: "Learn more" },
  { title: "Sales Navigator", desc: "Turn Sales Navigator into a closing machine.", link: "/services/linkedin-growth/sales-navigator", image: "/images/Services/Linkedin Growth/SalesNavigatorEnablement.png", cta: "Learn more" },
  { title: "LinkedIn Growth Bundle", desc: "End-to-end LinkedIn engine across ads, content & social selling.", link: "/services/linkedin-growth/linkedin-growth-bundle", image: "/images/Services/Linkedin Growth/LinkedInGrowthBundle.png", cta: "Explore Bundle", recommended: true },

  // Content & Creative
  { title: "Content Strategy", desc: "Editorial planning rooted in audience and intent.", link: "/services/content-creative/content-strategy", image: "/images/Services/Content Creative/ContentStratergy.png", cta: "Learn more" },
  { title: "SEO Content Production", desc: "Search-led content that ranks and converts.", link: "/services/content-creative/seo-content-production", image: "/images/Services/Content Creative/SEOContentProduction.png", cta: "Learn more" },
  { title: "Carousels & Visuals", desc: "Scroll-stopping visuals for social and ads.", link: "/services/content-creative/carousels-visuals", image: "/images/Services/Content Creative/CarouselsandVisuals.png", cta: "Learn more" },
  { title: "Video Production", desc: "Short-form and long-form video that performs.", link: "/services/content-creative/video-production", image: "/images/Services/Content Creative/VideoProduction.png", cta: "Learn more" },
  { title: "Sales Collateral", desc: "Decks, one-pagers, and case studies that close.", link: "/services/content-creative/sales-collateral", image: "/images/Services/Content Creative/SalesCollateral.png", cta: "Learn more" },
  { title: "Full Funnel Content Bundle", desc: "Top, middle, and bottom of funnel content in one program.", link: "/services/content-creative/full-funnel-content-bundle", image: "/images/Services/Content Creative/FullFunnelContentBundle.png", cta: "Explore Bundle", recommended: true },

  // Growth & Demand Generation
  { title: "ABM Campaigns", desc: "Account-based campaigns that win named accounts.", link: "/services/growth-demand-generation/abm-campaigns", image: "/images/Services/DemandGrowthGeneration/ABMCampaigns.png", cta: "Learn more" },
  { title: "Community", desc: "Build owned communities that compound over time.", link: "/services/growth-demand-generation/community", image: "/images/Services/DemandGrowthGeneration/Community.png", cta: "Learn more" },
  { title: "Influencer & UGC", desc: "Authentic creator partnerships and UGC at scale.", link: "/services/growth-demand-generation/influencer-ugc", image: "/images/Services/DemandGrowthGeneration/InfluencerandUGC.png", cta: "Learn more" },
  { title: "Partner & Affiliate", desc: "Launch and scale partner-led growth programs.", link: "/services/growth-demand-generation/partner-affiliate", image: "/images/Services/DemandGrowthGeneration/PartnersAffiliate.png", cta: "Learn more" },
  { title: "Viral Culture", desc: "Cultural campaigns that travel beyond your channels.", link: "/services/growth-demand-generation/viral-culture", image: "/images/Services/DemandGrowthGeneration/ViralCulture.png", cta: "Learn more" },
  { title: "Demand Gen Bundle", desc: "Full demand engine across owned, earned and paid.", link: "/services/growth-demand-generation/demand-gen-bundle", image: "/images/Services/DemandGrowthGeneration/DemandGenBundle.png", cta: "Explore Bundle", recommended: true },

  // Analytics & AI
  { title: "Tagging & GA4 Audit", desc: "Pixel-perfect tracking across web and app.", link: "/services/analytics-ai/tagging-ga4-audit", image: "/images/Services/Analytics&AI/Tagging&GA4Audit.png", cta: "Learn more" },
  { title: "Analytics & Dashboards", desc: "Looker dashboards your CFO actually understands.", link: "/services/analytics-ai/analytics-dashboards", image: "/images/Services/Analytics&AI/AnalyticsandDashboards.png", cta: "Learn more" },
  { title: "Attribution & Funnel", desc: "Multi-touch attribution and funnel intelligence.", link: "/services/analytics-ai/attribution-funnel", image: "/images/Services/Analytics&AI/AttributionandFunnel.png", cta: "Learn more" },
  { title: "CRM & Automation", desc: "HubSpot/Salesforce ops and lifecycle automation.", link: "/services/analytics-ai/crm-automation", image: "/images/Services/Analytics&AI/CRMandAutomation.png", cta: "Learn more" },
  { title: "AI-Powered Campaigns", desc: "AI-augmented creative, bidding and personalisation.", link: "/services/analytics-ai/AI-Powered-Campaigns", image: "/images/Services/Analytics&AI/AIPoweredCampaigns.png", cta: "Learn more" },
  { title: "Measurement + AI Bundle", desc: "Complete measurement and AI stack in one program.", link: "/services/analytics-ai/mesurement-AI-Bundle", image: "/images/Services/Analytics&AI/Measurement+AIBundle.png", cta: "Explore Bundle", recommended: true },

  // Brand & Reputation
  { title: "Brand Strategy", desc: "Positioning, narrative and identity systems.", link: "/services/brand-reputation/brand-strategy", image: "/images/Services/Brand&Reputation/BrandStrategy.png", cta: "Learn more" },
  { title: "PR & ORM", desc: "Earned media, reputation and crisis response.", link: "/services/brand-reputation/pr-orm", image: "/images/Services/Brand&Reputation/PRandORM.png", cta: "Learn more" },
  { title: "Website UX & Landing Pages", desc: "High-converting websites and landing pages.", link: "/services/brand-reputation/website-ux-landing-page", image: "/images/Services/Brand&Reputation/WebsiteUX&LandingPages.png", cta: "Learn more" },
  { title: "Employer Branding", desc: "EVP and recruitment marketing that attracts talent.", link: "/services/brand-reputation/employer-branding", image: "/images/Services/Brand&Reputation/EmployerBranding.png", cta: "Learn more" },
  { title: "Lifestyle & Vibe", desc: "Photo, video and culture content that humanises brand.", link: "/services/brand-reputation/lifestyle-vibe", image: "/images/Services/Brand&Reputation/LifestyleandVibe.png", cta: "Learn more" },
  { title: "Brand Momentum Bundle", desc: "Strategy + PR + web + content in one program.", link: "/services/brand-reputation/brand-momentum-bundle", image: "/images/Services/Brand&Reputation/BrandMomentumBundle.png", cta: "Explore Bundle", recommended: true },
];

export default function AllServices() {
  return (
    <ServiceCategoryTemplate
      eyebrow="ALL DIGITAL SERVICES"
      heading={
        <>
          Everything You Need to{" "}
          <span className="gradient-text">Attract, Convert, and Scale</span>
        </>
      }
      description="36 services. 6 categories. One growth partner. Every service is built to move a number that matters to your business."
      heroImage={heroImg}
      servicesEyebrow="Our Services"
      services={services}
    />
  );
}
