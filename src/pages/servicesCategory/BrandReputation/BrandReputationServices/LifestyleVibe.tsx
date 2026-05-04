import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";


import { Target, TrendingUp, Users, BarChart3, Zap, Award, Camera, Heart, Sparkles, Image, Video, Share2 } from "lucide-react";

import type { WhyChooseItem } from "@/components/Services/category/WhyChoose";

import type { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import type { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import type { Tool } from "@/components/Services/ServiceDetail/toolstack";
import type { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import type { ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import type { FeatureItem } from "@/components/Services/ServiceDetail/service-features";
const ScrollAnimatedSection = ({ children, bgColor }: { children: React.ReactNode; bgColor?: string }) => {
  const { ref, scale } = useScrollScale();
  return (<motion.div ref={ref} style={{ scale }} transition={{ type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }} className="relative rounded-3xl">{bgColor && <div className={`absolute inset-0 rounded-3xl ${bgColor}`} />}<div className="relative rounded-3xl">{children}</div></motion.div>);
};

const ribbonItems: RibbonItem[] = [
  { icon: <Camera className="h-5 w-5 text-white" />, title: "5000+", subtitle: "Lifestyle content pieces" },
  { icon: <Heart className="h-5 w-5 text-white" />, title: "10x", subtitle: "Engagement increase" },
  { icon: <Share2 className="h-5 w-5 text-white" />, title: "50M+", subtitle: "Impressions generated" },
  { icon: <Sparkles className="h-5 w-5 text-white" />, title: "100+", subtitle: "Lifestyle brands built" },
];

const lifestyleVibeFeatures: FeatureItem[] = [
  { icon: Camera, title: "Lifestyle Photography", description: "Professional lifestyle photography that captures your brand's personality and vibe." },
  { icon: Video, title: "Lifestyle Video Content", description: "Engaging video content that showcases your brand lifestyle authentically." },
  { icon: Sparkles, title: "Brand Aesthetic Development", description: "Create cohesive visual aesthetic that defines your brand's lifestyle." },
  { icon: Image, title: "Social Media Content", description: "Lifestyle content optimized for Instagram, TikTok, and other social platforms." },
  { icon: Heart, title: "Influencer Collaborations", description: "Partner with lifestyle influencers who embody your brand values." },
  { icon: Share2, title: "User-Generated Content", description: "Encourage and curate authentic UGC that amplifies your lifestyle brand." },
];

const whyItems: WhyChooseItem[] = [
  { icon: Camera, title: "Visual Excellence", desc: "Stunning lifestyle content that stops the scroll." },
  { icon: Heart, title: "Authentic Storytelling", desc: "Real stories that resonate with your audience." },
  { icon: Sparkles, title: "Cohesive Aesthetic", desc: "Consistent visual identity across all content." },
  { icon: TrendingUp, title: "Proven Results", desc: "10x engagement increase on lifestyle content." },
  { icon: Users, title: "Audience Connection", desc: "Content that builds emotional connection with audience." },
  { icon: Award, title: "Creative Excellence", desc: "Award-winning creative team and photographers." },
];

const lifestyleVibeProcessSteps: ProcessStep[] = [
  { step: "01", title: "Brand Discovery", description: "Understand your brand values, target audience, and desired lifestyle positioning." },
  { step: "02", title: "Aesthetic Development", description: "Create visual aesthetic, mood boards, and content strategy." },
  { step: "03", title: "Content Production", description: "Produce high-quality lifestyle photography and video content." },
  { step: "04", title: "Distribution & Amplification", description: "Distribute content and amplify through social media and influencers." },
];

const pricingPlans: Plan[] = [
  { title: "Starter", price: { monthly: 1200, yearly: 11520 }, description: "Essential lifestyle content", features: ["1 photoshoot/month", "20 edited photos", "Basic video (1)", "Social media content", "Content calendar", "2 revision rounds"], ctaText: "Get Started", ctaHref: "/resources/support" },
  { title: "Growth", price: { monthly: 2400, yearly: 23040 }, description: "Comprehensive lifestyle content", features: ["2 photoshoots/month", "50 edited photos", "Videos (3)", "Influencer collaborations (2)", "UGC curation", "Content strategy", "Social media management", "3 revision rounds"], ctaText: "Scale Up", ctaHref: "/resources/support", isFeatured: true },
  { title: "Enterprise", price: { monthly: 4800, yearly: 46080 }, description: "Enterprise lifestyle content", features: ["4+ photoshoots/month", "100+ edited photos", "Videos (8+)", "Influencer program", "UGC campaigns", "Brand aesthetic development", "Multi-platform content", "Unlimited revisions", "Dedicated creative team"], ctaText: "Contact Sales", ctaHref: "/resources/support" },
];

const lifestyleVibeTools: Tool[] = [
  { name: "Adobe Lightroom", logo: "https://cdn.simpleicons.org/adobelightroom/31A8FF" },
  { name: "Adobe Premiere Pro", logo: "https://cdn.simpleicons.org/adobepremierepro/9999FF" },
  { name: "Instagram", logo: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: "TikTok", logo: "https://cdn.simpleicons.org/tiktok/000000" },
  { name: "Pinterest", logo: "https://cdn.simpleicons.org/pinterest/E60023" },
  { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "Later", logo: "https://logo.clearbit.com/later.com" },
  { name: "Planoly", logo: "https://logo.clearbit.com/planoly.com" },
];

const lifestyleVibeFAQs: FAQItem[] = [
  { question: "What is lifestyle branding?", answer: "Lifestyle branding positions your brand as part of your audience's desired lifestyle, not just a product/service. It's about: aspirational living, values and identity, emotional connection, and community belonging. Examples: Nike (athletic lifestyle), Apple (creative lifestyle), Patagonia (outdoor lifestyle). Lifestyle brands sell a way of life, not just products. This creates deeper connection and loyalty. Customers become brand advocates because the brand represents who they are or want to be." },
  { question: "What's included in lifestyle content production?", answer: "Complete lifestyle content includes: professional photography (lifestyle, product, behind-scenes), video content (brand stories, day-in-life, tutorials), social media content (posts, stories, reels), influencer collaborations, and user-generated content curation. We handle: creative direction, talent/model sourcing, location scouting, styling and props, shooting and editing, and content delivery. Typical shoot produces 20-50 photos and 3-5 video clips. All content is optimized for social platforms." },
  { question: "How do you develop brand aesthetic?", answer: "We create cohesive visual aesthetic through: brand discovery (values, audience, positioning), mood board development, color palette selection, photography style guide, content themes and concepts, and visual consistency guidelines. Process includes: competitive analysis, audience research, trend analysis, and creative exploration. Result is comprehensive aesthetic guide that ensures all content feels cohesive and on-brand. This becomes foundation for all visual content." },
  { question: "Can you help with influencer collaborations?", answer: "Yes! We manage complete influencer programs: influencer identification and vetting, outreach and negotiation, campaign strategy, content guidelines, performance tracking, and relationship management. We work with: micro-influencers (10K-100K followers), macro-influencers (100K-1M), and nano-influencers (1K-10K). Focus on authentic partnerships with influencers who genuinely align with your brand. Most campaigns see 5-10x ROI through influencer content." },
  { question: "What's the difference between lifestyle and product photography?", answer: "Product photography: clean, studio shots focusing on product details. Lifestyle photography: products in real-life context showing how they're used. Lifestyle is more: aspirational, emotional, story-driven, and relatable. It shows the lifestyle your product enables. For example: Product photo shows a coffee mug. Lifestyle photo shows someone enjoying coffee in a beautiful morning setting. Lifestyle content performs 3-5x better on social media because it's more engaging and relatable." },
  { question: "How do you encourage user-generated content?", answer: "We build UGC programs through: branded hashtag campaigns, customer photo contests, incentive programs (discounts, features), easy submission process, and community engagement. We also: curate best UGC, get usage rights, feature customers, and create UGC galleries. UGC is powerful because it's: authentic, trusted (more than brand content), cost-effective, and builds community. Most brands see 50-100 UGC submissions per month with active programs." },
  { question: "What social platforms work best for lifestyle content?", answer: "Platform depends on your audience: Instagram (visual lifestyle, 25-45 age), TikTok (video lifestyle, 18-35 age), Pinterest (aspirational lifestyle, 25-45 age, female-heavy), YouTube (long-form lifestyle, all ages), and Facebook (community lifestyle, 35+ age). We recommend: Instagram + TikTok for most lifestyle brands, Pinterest for home/fashion/food, YouTube for in-depth content. We optimize content for each platform's unique format and audience." },
  { question: "How do you measure lifestyle content success?", answer: "We track comprehensive metrics: engagement rate (likes, comments, shares, saves), reach and impressions, follower growth, website traffic from social, conversions and sales, brand sentiment, and UGC volume. We also measure: content performance by type, best-performing themes, audience demographics, and competitive benchmarks. Most clients see: 10x engagement increase, 3-5x follower growth, and significant improvement in brand perception within 3-6 months of consistent lifestyle content." },
];

const LifestyleVibe = () => (
  <ServiceDetailAdapter
    heroProps={{
eyebrow="LIFESTYLE & VIBE" heading="Create a Lifestyle Brand That Resonates and Inspires" description="Authentic lifestyle content and brand aesthetic that connects emotionally with your audience and builds a community around your brand." ctaText="Get Started" ctaLink="/resources/support" imageSrc="/images/Services/Brand&Reputation/LifestyleandVibe.png" imageAlt="Lifestyle & Vibe" 
    }}
    plans={pricingPlans}
    faqs={lifestyleVibeFAQs}
    tools={lifestyleVibeTools}
    processSteps={lifestyleVibeProcessSteps}
    whyItems={whyItems}
  />
);

export default LifestyleVibe;
