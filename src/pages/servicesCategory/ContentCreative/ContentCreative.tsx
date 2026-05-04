import ServiceCategoryTemplate from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services/content-creative.svg";
import illuContentStrategy from "@/assets/_zip/services/illu-content-strategy.png";
import illuSeo from "@/assets/_zip/services/illu-seo-content.png";
import illuCarousels from "@/assets/_zip/services/illu-carousels-visuals.png";
import illuVideo from "@/assets/_zip/services/illu-video-production.png";
import illuSalesCollateral from "@/assets/_zip/services/illu-sales-collateral.png";
import illuFullFunnel from "@/assets/_zip/services/illu-full-funnel.png";

const services = [
    { title: "Content Strategy", desc: "Editorial planning rooted in audience and intent.", link: "/services/content-creative/content-strategy", image: illuContentStrategy, cta: "Learn more" },
    { title: "SEO Content Production", desc: "Search-led content that ranks and converts.", link: "/services/content-creative/seo-content-production", image: illuSeo, cta: "Learn more" },
    { title: "Carousels & Visuals", desc: "Scroll-stopping visuals for social and ads.", link: "/services/content-creative/carousels-visuals", image: illuCarousels, cta: "Learn more" },
    { title: "Video Production", desc: "Short-form and long-form video that performs.", link: "/services/content-creative/video-production", image: illuVideo, cta: "Learn more" },
    { title: "Sales Collateral", desc: "Decks, one-pagers, and case studies that close.", link: "/services/content-creative/sales-collateral", image: illuSalesCollateral, cta: "Learn more" },
    { title: "Full Funnel Content Bundle", desc: "Top, middle, and bottom of funnel content in one program.", link: "/services/content-creative/full-funnel-content-bundle", image: illuFullFunnel, cta: "Explore Bundle", recommended: true },
];

export default function CategoryPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="CONTENT & CREATIVE"
      heading={<>Content That Converts</>}
      description="From strategy to production, we craft content built for every stage of your funnel."
      heroImage={heroImg}
      services={services}
    />
  );
}
