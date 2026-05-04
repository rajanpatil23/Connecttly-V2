import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";


import { Target, TrendingUp, Users, BarChart3, Zap, Award, Package, Layers, Crown, CheckCircle, Sparkles, Rocket } from "lucide-react";

import type { WhyChooseItem } from "@/components/Services/category/WhyChoose";

import type { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import type { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import type { Tool } from "@/components/Services/ServiceDetail/toolstack";
import type { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import type { ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import type { FeatureItem } from "@/components/Services/ServiceDetail/service-features";
const ribbonItems: RibbonItem[] = [
  { icon: <Package className="h-5 w-5 text-white" />, title: "All-in-One", subtitle: "Complete brand solution" },
  { icon: <Rocket className="h-5 w-5 text-white" />, title: "5x", subtitle: "Brand value increase" },
  { icon: <TrendingUp className="h-5 w-5 text-white" />, title: "200%", subtitle: "Brand awareness growth" },
  { icon: <Crown className="h-5 w-5 text-white" />, title: "100+", subtitle: "Brands transformed" },
];

const brandMomentumFeatures: FeatureItem[] = [
  { icon: Target, title: "Complete Brand Strategy", description: "Comprehensive brand positioning, identity, and messaging framework." },
  { icon: Sparkles, title: "PR & Reputation Management", description: "Strategic PR, media relations, and online reputation management." },
  { icon: Layers, title: "Website & Digital Presence", description: "High-converting website, UX optimization, and landing pages." },
  { icon: Users, title: "Employer Branding", description: "Attract top talent with compelling employer brand and EVP." },
  { icon: CheckCircle, title: "Lifestyle Content", description: "Authentic lifestyle photography, video, and social content." },
  { icon: BarChart3, title: "Performance Tracking", description: "Comprehensive analytics and reporting on brand performance." },
];

const whyItems: WhyChooseItem[] = [
  { icon: Package, title: "Complete Solution", desc: "Everything you need for brand success in one package." },
  { icon: Zap, title: "Faster Results", desc: "Integrated approach delivers 5x faster brand growth." },
  { icon: Target, title: "Strategic Alignment", desc: "All services work together toward unified brand goals." },
  { icon: Award, title: "Cost Savings", desc: "Save 40-50% vs. purchasing services separately." },
  { icon: Users, title: "Dedicated Team", desc: "One team managing all aspects of your brand." },
  { icon: Crown, title: "Proven Success", desc: "Track record of transforming brands completely." },
];

const brandMomentumProcessSteps: ProcessStep[] = [
  { step: "01", title: "Comprehensive Audit", description: "Audit all aspects of your brand: strategy, reputation, digital presence, and content." },
  { step: "02", title: "Integrated Strategy", description: "Develop unified brand strategy covering all services and touchpoints." },
  { step: "03", title: "Coordinated Execution", description: "Execute all services with seamless coordination and consistent messaging." },
  { step: "04", title: "Continuous Optimization", description: "Monitor performance and optimize all brand elements for maximum impact." },
];

const pricingPlans: Plan[] = [
  { title: "Starter Bundle", price: { monthly: 1600, yearly: 15360 }, description: "Essential brand bundle", features: ["Basic brand strategy", "PR monitoring & response", "Landing page design", "Basic employer content", "Lifestyle content (quarterly)", "Monthly reporting", "Email support"], ctaText: "Get Started", ctaHref: "/resources/support" },
  { title: "Growth Bundle", price: { monthly: 3200, yearly: 30720 }, description: "Complete brand solution", features: ["Brand strategy & positioning", "PR & reputation management", "Website design & UX", "Employer branding", "Lifestyle content (monthly)", "Social media management", "Performance tracking", "Dedicated brand team"], ctaText: "Get Started", ctaHref: "/resources/support", isFeatured: true },
  { title: "Enterprise Bundle", price: { monthly: 6400, yearly: 61440 }, description: "Enterprise brand transformation", features: ["Advanced brand strategy", "Full PR & crisis management", "Enterprise website solution", "Complete employer branding", "Premium lifestyle content", "Multi-channel campaigns", "Executive positioning", "Brand training", "White-glove service", "Dedicated brand team"], ctaText: "Contact Sales", ctaHref: "/resources/support" },
];

const brandMomentumTools: Tool[] = [
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Adobe Creative Cloud", logo: "https://cdn.simpleicons.org/adobe/FF0000" },
  { name: "Brandwatch", logo: "https://logo.clearbit.com/brandwatch.com" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Miro", logo: "https://logo.clearbit.com/miro.com" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion/000000" },
  { name: "Asana", logo: "https://cdn.simpleicons.org/asana/F06A6A" },
];

const brandMomentumFAQs: FAQItem[] = [
  { question: "What's included in the Brand Momentum Bundle?", answer: "Everything you need for complete brand success: Brand Strategy (positioning, identity, messaging), PR & ORM (media relations, reputation management, crisis response), Website & UX (design, development, optimization), Employer Branding (EVP, recruitment marketing, employee stories), Lifestyle Content (photography, video, social content), and Performance Tracking (analytics, reporting, optimization). You get a complete brand team working on all aspects of your brand with unified strategy and execution." },
  { question: "How is this different from hiring individual services?", answer: "Key advantages of the bundle: Integrated strategy (all services work together), consistent messaging across all touchpoints, better resource efficiency, faster execution, lower total cost (40-50% savings), single point of contact, and coordinated optimization. Individual services create silos and inconsistency. The bundle ensures every element supports your overall brand goals. Services amplify each other - PR drives website traffic, employer brand attracts talent who create lifestyle content, etc." },
  { question: "What results can I expect?", answer: "Typical results for Brand Momentum clients: 5x increase in brand value, 200% growth in brand awareness, 3x improvement in brand perception, 150% increase in website conversions, 3x more qualified job applications, 10x social media engagement, and 95% positive brand sentiment. Timeline: Month 1-3: Foundation and strategy, Month 3-6: Significant visibility growth, Month 6-12: Major brand transformation, Month 12+: Sustained brand leadership. Results vary by industry and starting point." },
  { question: "How long does complete brand transformation take?", answer: "Full transformation takes 6-12 months: Month 1-2: Comprehensive audit and strategy, Month 3-4: Foundation building (brand identity, website, initial content), Month 5-6: Launch and activation (PR, campaigns, employer brand), Month 7-12: Optimization and scaling. You'll see early wins within 3 months (improved messaging, new website, initial PR coverage). Major transformation becomes evident at 6 months. Full impact realized at 12 months with sustained momentum." },
  { question: "Do I need all these services?", answer: "While we recommend the complete bundle for maximum impact, we can customize based on your needs. However, services work best together: Brand strategy informs all other services, PR amplifies your brand message, Website converts the traffic PR generates, Employer brand attracts talent who create content, Lifestyle content humanizes your brand. Most clients who start with partial services eventually add more because they see how services amplify each other. The bundle provides best ROI." },
  { question: "How do you ensure consistency across all services?", answer: "We maintain consistency through: Unified brand strategy (foundation for all work), Single dedicated team (knows your brand intimately), Shared brand guidelines (visual, messaging, tone), Regular coordination meetings, Centralized content calendar, and Consistent quality standards. All team members work from same strategy document and brand guidelines. We have weekly syncs to ensure alignment. This integrated approach is why bundle clients see 2-3x better results than those using separate vendors." },
  { question: "Can you work with our existing brand elements?", answer: "Absolutely! We can: Audit existing brand elements, Preserve what's working well, Refresh what needs improvement, Fill gaps in brand coverage, and Integrate with existing systems. We maximize your existing brand investments while adding new capabilities. Most clients have some good brand elements that just need optimization and integration. We ensure smooth transition without losing brand equity you've built." },
  { question: "What if we need to scale up or down?", answer: "The bundle is flexible: Scale up services as you grow, Adjust service mix based on priorities, Add new services as needed, and Reduce during slower periods. We work with you to optimize brand investment based on results and business needs. Most clients start with Growth Bundle and scale to Enterprise as they see results. We can also customize bundles for specific industries or situations. Goal is to maximize your brand ROI at every stage." },
];

const BrandMomentumBundle = () => (
  <ServiceDetailAdapter
    heroProps={{
      // eyebrow="BRAND MOMENTUM BUNDLE" heading="Complete Brand Solution - Transform Your Brand Completely" description="Comprehensive brand services that work together seamlessly: strategy, PR, website, employer branding, and lifestyle content - all integrated for maximum impact." ctaText="Get Started" ctaLink="/resources/support" imageSrc="/images/Services/Brand&Reputation/BrandMomentumBundle.png" imageAlt="Brand Momentum Bundle"
    }}
    plans={pricingPlans}
    faqs={brandMomentumFAQs}
    tools={brandMomentumTools}
    processSteps={brandMomentumProcessSteps}
    whyItems={whyItems}
  />
);

export default BrandMomentumBundle;
