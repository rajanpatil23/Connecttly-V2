import ServiceCategoryTemplate from "@/components/Services/templates/ServiceCategoryTemplate";
import heroImg from "@/assets/_zip/services/performance-marketing.svg";
import illuGoogleAds from "@/assets/_zip/services/illu-google-ads.png";
import illuMetaAds from "@/assets/_zip/services/illu-meta-ads.png";
import illuYoutubeAds from "@/assets/_zip/services/illu-youtube-ads.png";
import illuCro from "@/assets/_zip/services/illu-cro.png";
import illuLinkedinAds from "@/assets/_zip/services/illu-linkedin-ads.png";
import illuPerformanceBundle from "@/assets/_zip/services/illu-performance-bundle.png";

const services = [
    { title: "Google Ads", desc: "Drive targeted traffic with powerful Google Ads campaigns", link: "/services/performance-marketing/google-ads", image: illuGoogleAds, cta: "Learn more" },
    { title: "Meta Ads", desc: "Reach your audience on Facebook and Instagram", link: "/services/performance-marketing/meta-ads", image: illuMetaAds, cta: "Learn more" },
    { title: "YouTube Ads", desc: "Engage viewers with compelling video advertisements", link: "/services/performance-marketing/youtube-ads", image: illuYoutubeAds, cta: "Learn more" },
    { title: "CRO and Funnel", desc: "Optimize conversion rates with data-driven insights", link: "/services/performance-marketing/cro-funnel", image: illuCro, cta: "Learn more" },
    { title: "Short Video Ads", desc: "Capture attention with short-form video advertising", link: "/services/performance-marketing/short-video-ads", image: illuLinkedinAds, cta: "Learn more" },
    { title: "Performance Accelerator Bundle", desc: "Complete performance marketing solution for rapid growth", link: "/services/performance-marketing/performance-accelerator-bundle", cta: "Explore Bundle", recommended: true },
];

export default function CategoryPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="PERFORMANCE MARKETING"
      heading={<>Performance Marketing Excellence</>}
      description="Drive measurable growth with data-driven advertising strategies across all major platforms."
      heroImage={heroImg}
      services={services}
    />
  );
}
