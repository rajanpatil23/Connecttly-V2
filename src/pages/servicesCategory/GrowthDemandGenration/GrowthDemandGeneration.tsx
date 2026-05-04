import ServiceCategoryTemplate from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services/social-media-management.svg";
import illuAbm from "@/assets/_zip/services/illu-abm.png";
import illuCommunity from "@/assets/_zip/services/illu-community.png";
import illuInfluencer from "@/assets/_zip/services/illu-influencer-ugc.png";
import illuPartner from "@/assets/_zip/services/illu-partner-affiliate.png";
import illuViral from "@/assets/_zip/services/illu-viral-culture.png";
import illuDemandBundle from "@/assets/_zip/services/illu-demand-gen-bundle.png";

const services = [
    { title: "ABM Campaigns", desc: "Account-based campaigns that win named accounts.", link: "/services/growth-demand-generation/abm-campaigns", image: illuAbm, cta: "Learn more" },
    { title: "Community", desc: "Build owned communities that compound over time.", link: "/services/growth-demand-generation/community", image: illuCommunity, cta: "Learn more" },
    { title: "Influencer & UGC", desc: "Authentic creator partnerships and UGC at scale.", link: "/services/growth-demand-generation/influencer-ugc", image: illuInfluencer, cta: "Learn more" },
    { title: "Partner & Affiliate", desc: "Launch and scale partner-led growth programs.", link: "/services/growth-demand-generation/partner-affiliate", image: illuPartner, cta: "Learn more" },
    { title: "Viral Culture", desc: "Cultural campaigns that travel beyond your channels.", link: "/services/growth-demand-generation/viral-culture", image: illuViral, cta: "Learn more" },
    { title: "Demand Gen Bundle", desc: "Full demand engine across owned, earned and paid.", link: "/services/growth-demand-generation/demand-gen-bundle", image: illuDemandBundle, cta: "Explore Bundle", recommended: true },
];

export default function CategoryPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="GROWTH & DEMAND GEN"
      heading={<>Growth & Demand Generation</>}
      description="Build sustainable demand engines across communities, ABM, partners and culture."
      heroImage={heroImg}
      services={services}
    />
  );
}
