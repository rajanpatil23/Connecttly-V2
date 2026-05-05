import ServiceCategoryTemplate from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services/web-ai-automation.svg";

const services = [
    { title: "Tagging & GA4 Audit", desc: "Pixel-perfect tracking across web and app.", link: "/services/analytics-ai/tagging-ga4-audit", image: "/images/Services/analytics-ai/TaggingGA4Audit.png", cta: "Learn more" },
    { title: "Analytics & Dashboards", desc: "Looker dashboards your CFO actually understands.", link: "/services/analytics-ai/analytics-dashboards", image: "/images/Services/analytics-ai/AnalyticsandDashboards.png", cta: "Learn more" },
    { title: "Attribution & Funnel", desc: "Multi-touch attribution and funnel intelligence.", link: "/services/analytics-ai/attribution-funnel", image: "/images/Services/analytics-ai/AttributionandFunnel.png", cta: "Learn more" },
    { title: "CRM & Automation", desc: "HubSpot/Salesforce ops and lifecycle automation.", link: "/services/analytics-ai/crm-automation", image: "/images/Services/analytics-ai/CRMandAutomation.png", cta: "Learn more" },
    { title: "AI-Powered Campaigns", desc: "AI-augmented creative, bidding and personalisation.", link: "/services/analytics-ai/AI-Powered-Campaigns", image: "/images/Services/analytics-ai/AIPoweredCampaigns.png", cta: "Learn more" },
    { title: "Measurement + AI Bundle", desc: "Complete measurement and AI stack in one program.", link: "/services/analytics-ai/mesurement-AI-Bundle", image: "/images/Services/analytics-ai/MeasurementAIBundle.png", cta: "Explore Bundle", recommended: true },
];

export default function CategoryPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="ANALYTICS & AI"
      heading={<>Measurement Meets AI</>}
      description="Tracking, attribution, AI campaigns and CRM automation that compound revenue."
      heroImage={heroImg}
      services={services}
    />
  );
}
