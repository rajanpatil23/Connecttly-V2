import ServiceCategoryTemplate from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services/seo.svg";

const services = [
    { title: "Brand Strategy", desc: "Positioning, narrative and identity systems.", link: "/services/brand-reputation/brand-strategy", image: "/images/Services/Brand&Reputation/BrandStrategy.png", cta: "Learn more" },
    { title: "PR & ORM", desc: "Earned media, reputation and crisis response.", link: "/services/brand-reputation/pr-orm", image: "/images/Services/Brand&Reputation/PRandORM.png", cta: "Learn more" },
    { title: "Website UX & Landing Pages", desc: "High-converting websites and landing pages.", link: "/services/brand-reputation/website-ux-landing-page", image: "/images/Services/Brand&Reputation/WebsiteUX&LandingPages.png", cta: "Learn more" },
    { title: "Employer Branding", desc: "EVP and recruitment marketing that attracts talent.", link: "/services/brand-reputation/employer-branding", image: "/images/Services/Brand&Reputation/EmployerBranding.png", cta: "Learn more" },
    { title: "Lifestyle & Vibe", desc: "Photo, video and culture content that humanises brand.", link: "/services/brand-reputation/lifestyle-vibe", image: "/images/Services/Brand&Reputation/LifestyleandVibe.png", cta: "Learn more" },
    { title: "Brand Momentum Bundle", desc: "Strategy + PR + web + content in one program.", link: "/services/brand-reputation/brand-momentum-bundle", image: "/images/Services/Brand&Reputation/BrandMomentumBundle.png", cta: "Explore Bundle", recommended: true },
];

export default function CategoryPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="BRAND & REPUTATION"
      heading={<>Brand & Reputation</>}
      description="Strategy, PR, employer brand and the lifestyle content that builds trust at scale."
      heroImage={heroImg}
      services={services}
    />
  );
}
