import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Handshake, TrendingUp, DollarSign, Users, Award, Target,
  BarChart3, Zap, Shield, Globe, Link as LinkIcon, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";


import type { WhyChooseItem } from "@/components/Services/category/WhyChoose";

import type { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import type { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import type { Tool } from "@/components/Services/ServiceDetail/toolstack";
import type { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import type { ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import type { FeatureItem } from "@/components/Services/ServiceDetail/service-features";
// Scroll-animated wrapper for sections
const ScrollAnimatedSection = ({ children, bgColor }: { children: React.ReactNode; bgColor?: string }) => {
  const { ref, scale } = useScrollScale();
  
  return (
    <motion.div 
      ref={ref}
      style={{ scale }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      }}
      className="relative rounded-3xl"
    >
      {bgColor && (
        <div className={`absolute inset-0 rounded-3xl ${bgColor}`} />
      )}
      <div className="relative rounded-3xl">
        {children}
      </div>
    </motion.div>
  );
};

const ribbonItems: RibbonItem[] = [
  {
    icon: <Handshake className="h-5 w-5 text-white" />,
    title: "500+",
    subtitle: "Active partners",
  },
  {
    icon: <DollarSign className="h-5 w-5 text-white" />,
    title: "$5M+",
    subtitle: "Partner revenue generated",
  },
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "25%",
    subtitle: "Average commission rate",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "3.2x",
    subtitle: "ROI on partner programs",
  },
];

const partnerFeatures: FeatureItem[] = [
  {
    icon: Target,
    title: "Program Strategy & Setup",
    description: "Design and launch affiliate/partner programs with optimal commission structures and terms."
  },
  {
    icon: Users,
    title: "Partner Recruitment",
    description: "Identify and recruit high-quality partners who align with your brand and target audience."
  },
  {
    icon: Gift,
    title: "Onboarding & Enablement",
    description: "Provide partners with training, resources, and tools they need to successfully promote your products."
  },
  {
    icon: LinkIcon,
    title: "Tracking & Attribution",
    description: "Implement robust tracking systems to accurately attribute sales and calculate commissions."
  },
  {
    icon: BarChart3,
    title: "Performance Management",
    description: "Monitor partner performance, identify top performers, and optimize program for maximum ROI."
  },
  {
    icon: DollarSign,
    title: "Commission Management",
    description: "Handle all commission calculations, payments, and reporting with full transparency."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Handshake, title: "Partnership Expertise", desc: "Deep experience building and scaling successful partner programs." },
  { icon: Target, title: "Quality Over Quantity", desc: "Focus on recruiting partners who drive real, qualified revenue." },
  { icon: Shield, title: "Fraud Prevention", desc: "Advanced fraud detection to protect your program from bad actors." },
  { icon: BarChart3, title: "Data-Driven Optimization", desc: "Continuous optimization based on performance data and insights." },
  { icon: Zap, title: "Fast Setup", desc: "Launch your partner program quickly with our proven frameworks." },
  { icon: Award, title: "Proven Results", desc: "Track record of building programs that drive significant revenue." },
];

const partnerProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Program Design", 
    description: "Define program structure, commission rates, terms, and create partner resources and materials." 
  },
  { 
    step: "02", 
    title: "Partner Recruitment", 
    description: "Identify and recruit ideal partners through outreach, applications, and strategic partnerships." 
  },
  { 
    step: "03", 
    title: "Onboarding & Activation", 
    description: "Train partners, provide promotional materials, and help them start driving referrals successfully." 
  },
  { 
    step: "04", 
    title: "Optimize & Scale", 
    description: "Monitor performance, reward top partners, optimize commission structure, and scale recruitment." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1200, yearly: 11520 },
    description: "Perfect for launching your first partner program",
    features: [
      "Up to 50 active partners",
      "Program strategy & setup",
      "Partner recruitment support",
      "Basic tracking & reporting",
      "Commission management",
      "Partner portal access"
    ],
    ctaText: "Launch Program",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 2400, yearly: 23040 },
    description: "Scale your partner program with advanced features",
    features: [
      "Up to 200 active partners",
      "Advanced partner recruitment",
      "Custom onboarding & training",
      "Multi-tier commission structure",
      "Fraud detection & prevention",
      "Advanced analytics dashboard",
      "Partner relationship management",
      "Dedicated program manager"
    ],
    ctaText: "Scale Program",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 4800, yearly: 46080 },
    description: "Full-service partner program management",
    features: [
      "Unlimited partners",
      "White-label partner portal",
      "Custom integrations",
      "Strategic partnership development",
      "Co-marketing campaigns",
      "Executive reporting",
      "Dedicated account team",
      "24/7 partner support"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const partnerTools: Tool[] = [
  { name: "Impact", logo: "https://logo.clearbit.com/impact.com" },
  { name: "PartnerStack", logo: "https://logo.clearbit.com/partnerstack.com" },
  { name: "Rewardful", logo: "https://logo.clearbit.com/rewardful.com" },
  { name: "Tapfiliate", logo: "https://logo.clearbit.com/tapfiliate.com" },
  { name: "Refersion", logo: "https://logo.clearbit.com/refersion.com" },
  { name: "Post Affiliate Pro", logo: "https://logo.clearbit.com/postaffiliatepro.com" },
  { name: "ShareASale", logo: "https://logo.clearbit.com/shareasale.com" },
  { name: "CJ Affiliate", logo: "https://logo.clearbit.com/cj.com" },
];

const partnerFAQs: FAQItem[] = [
  {
    question: "What's the difference between affiliate and partner programs?",
    answer: "Affiliate programs typically involve individuals or content creators who promote your product for a commission on sales. Partner programs are broader and can include: resellers who sell your product directly, referral partners who introduce you to customers, integration partners who build complementary products, and strategic partners for co-marketing. We help with both models and hybrid approaches."
  },
  {
    question: "What commission structure should we offer?",
    answer: "Commission structures vary by industry and product: SaaS typically offers 20-30% recurring commissions. E-commerce often uses 5-15% per sale. High-ticket B2B might offer flat fees ($500-$5,000+). We'll analyze your margins, customer LTV, and competitive landscape to recommend an attractive yet profitable commission structure. We can also implement tiered structures that reward top performers."
  },
  {
    question: "How do you recruit quality partners?",
    answer: "We use multiple recruitment strategies: direct outreach to relevant influencers and businesses, partner application forms on your website, listings on affiliate networks, attending industry events and conferences, and leveraging existing customer relationships. We vet all partners for brand alignment, audience quality, and promotional methods to ensure they'll drive valuable traffic."
  },
  {
    question: "How do you prevent affiliate fraud?",
    answer: "We implement multiple fraud prevention measures: cookie stuffing detection, monitoring for suspicious traffic patterns, validating conversions before paying commissions, blacklisting known fraudulent affiliates, requiring partner approval before activation, and regular audits of partner activity. We use advanced tracking platforms with built-in fraud detection."
  },
  {
    question: "What tracking and attribution do you use?",
    answer: "We use enterprise-grade affiliate tracking platforms that provide: unique tracking links for each partner, cookie-based attribution (typically 30-90 days), first-click and last-click attribution options, cross-device tracking, conversion tracking, and detailed reporting. All tracking is GDPR and privacy-compliant. Partners get real-time access to their performance data."
  },
  {
    question: "How long does it take to see results?",
    answer: "Timeline varies by program type: Initial setup takes 2-4 weeks. First partners can be recruited within 1-2 months. Meaningful revenue typically starts flowing within 3-6 months. Mature programs (12+ months) often drive 15-30% of total revenue. The key is consistent partner recruitment and relationship building - it's a long-term growth channel."
  },
  {
    question: "Do you handle commission payments?",
    answer: "Yes! We manage the entire commission process: tracking all conversions and calculating commissions, handling payment processing (PayPal, bank transfer, etc.), providing detailed payout reports to partners, managing payment schedules (monthly, quarterly, etc.), and handling any payment disputes or questions. You maintain full visibility and control."
  },
  {
    question: "Can you help with partner enablement and support?",
    answer: "Absolutely! Partner enablement includes: creating promotional materials (banners, email templates, landing pages), providing product training and demos, sharing best practices and success stories, offering co-marketing opportunities, providing dedicated partner support, and hosting regular partner webinars and events. Well-enabled partners perform significantly better."
  },
];

const PartnerAffiliate = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "PARTNER & AFFILIATE PROGRAMS",
      heading: "Build Revenue-Driving Partner Programs",
      description: "Launch and scale affiliate and partner programs that turn advocates into a powerful revenue channel for sustainable growth.",
      ctaText: "Launch Program",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/DemandGrowthGeneration/PartnersAffiliate.png",
      imageAlt: "Partnership Collaboration",
    }}
    plans={pricingPlans}
    faqs={partnerFAQs}
    tools={partnerTools}
    processSteps={partnerProcessSteps}
    whyItems={whyItems}
  />
);

export default PartnerAffiliate;
