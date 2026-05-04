import ServiceCategoryTemplate from "@/components/Services/templates/ServiceCategoryTemplate";

const services = [
    { title: "Google Ads", desc: "Drive targeted traffic with powerful Google Ads campaigns", link: "/services/performance-marketing/google-ads", image: "/images/Services/Performance Marketing/GoogleAds.png", cta: "Learn more" },
    { title: "Meta Ads", desc: "Reach your audience on Facebook and Instagram", link: "/services/performance-marketing/meta-ads", image: "/images/Services/Performance Marketing/MetaAds.png", cta: "Learn more" },
    { title: "YouTube Ads", desc: "Engage viewers with compelling video advertisements", link: "/services/performance-marketing/youtube-ads", image: "/images/Services/Performance Marketing/YouTubeAds.png", cta: "Learn more" },
    { title: "CRO and Funnel", desc: "Optimize conversion rates with data-driven insights", link: "/services/performance-marketing/cro-funnel", image: "/images/Services/Performance Marketing/CROandFunnel.png", cta: "Learn more" },
    { title: "Short Video Ads", desc: "Capture attention with short-form video advertising", link: "/services/performance-marketing/short-video-ads", image: "/images/Services/Performance Marketing/ShortVideoAds.png", cta: "Learn more" },
    { title: "Performance Accelerator Bundle", desc: "Complete performance marketing solution for rapid growth", link: "/services/performance-marketing/performance-accelerator-bundle", image: "/images/Services/Performance Marketing/PerformanceAcceleratorBundle.png", cta: "Explore Bundle", recommended: true },
];

export default function CategoryPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="PERFORMANCE MARKETING"
      heading={<>Performance Marketing Excellence</>}
      description="Drive measurable growth with data-driven advertising strategies across all major platforms."
      heroImage="/images/home/services/Perfomancev2.svg"
      services={services}
    />
  );
}
