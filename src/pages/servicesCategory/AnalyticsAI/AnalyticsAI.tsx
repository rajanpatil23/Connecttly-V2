import ServiceCategoryTemplate from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services/web-ai-automation.svg";
import illuTagging from "@/assets/_zip/services/illu-tagging-ga4.png";
import illuDashboards from "@/assets/_zip/services/illu-analytics-dashboards.png";
import illuAttribution from "@/assets/_zip/services/illu-attribution.png";
import illuCrm from "@/assets/_zip/services/illu-crm-automation.png";
import illuAi from "@/assets/_zip/services/illu-ai-campaigns.png";
import illuMeasurementBundle from "@/assets/_zip/services/illu-measurement-bundle.png";

const services = [
    { title: "Tagging & GA4 Audit", desc: "Pixel-perfect tracking across web and app.", link: "/services/analytics-ai/tagging-ga4-audit", image: illuTagging, cta: "Learn more" },
    { title: "Analytics & Dashboards", desc: "Looker dashboards your CFO actually understands.", link: "/services/analytics-ai/analytics-dashboards", image: illuDashboards, cta: "Learn more" },
    { title: "Attribution & Funnel", desc: "Multi-touch attribution and funnel intelligence.", link: "/services/analytics-ai/attribution-funnel", image: illuAttribution, cta: "Learn more" },
    { title: "CRM & Automation", desc: "HubSpot/Salesforce ops and lifecycle automation.", link: "/services/analytics-ai/crm-automation", image: illuCrm, cta: "Learn more" },
    { title: "AI-Powered Campaigns", desc: "AI-augmented creative, bidding and personalisation.", link: "/services/analytics-ai/AI-Powered-Campaigns", image: illuAi, cta: "Learn more" },
    { title: "Measurement + AI Bundle", desc: "Complete measurement and AI stack in one program.", link: "/services/analytics-ai/mesurement-AI-Bundle", image: illuMeasurementBundle, cta: "Explore Bundle", recommended: true },
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
