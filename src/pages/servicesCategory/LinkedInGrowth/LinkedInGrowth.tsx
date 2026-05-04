import ServiceCategoryTemplate from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services/linkedin-growth.svg";

const services = [
    { title: "LinkedIn Ads", desc: "High-intent B2B campaigns engineered for pipeline.", link: "/services/linkedin-growth/linkedin-ads", image: "/images/Services/Linkedin Growth/LinkedinAds.png", cta: "Learn more" },
    { title: "Lead Generation", desc: "Predictable inbound and outbound on LinkedIn.", link: "/services/linkedin-growth/lead-genration", image: "/images/Services/Linkedin Growth/LeadGenration.png", cta: "Learn more" },
    { title: "Page Management", desc: "Grow your company page into a content engine.", link: "/services/linkedin-growth/page-management", image: "/images/Services/Linkedin Growth/PageManagement.png", cta: "Learn more" },
    { title: "Executive Leadership", desc: "Position your founders as industry voices.", link: "/services/linkedin-growth/executive-leadership", image: "/images/Services/Linkedin Growth/ExecutiveLeadership.png", cta: "Learn more" },
    { title: "Sales Navigator", desc: "Turn Sales Navigator into a closing machine.", link: "/services/linkedin-growth/sales-navigator", image: "/images/Services/Linkedin Growth/SalesNavigatorEnablement.png", cta: "Learn more" },
    { title: "LinkedIn Growth Bundle", desc: "End-to-end LinkedIn engine across ads, content & social selling.", link: "/services/linkedin-growth/linkedin-growth-bundle", image: "/images/Services/Linkedin Growth/LinkedInGrowthBundle.png", cta: "Explore Bundle", recommended: true },
];

export default function CategoryPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="LINKEDIN GROWTH"
      heading={<>LinkedIn Growth Engine</>}
      description="Build authority, generate leads, and scale your LinkedIn presence with our specialised services."
      heroImage={heroImg}
      services={services}
    />
  );
}
