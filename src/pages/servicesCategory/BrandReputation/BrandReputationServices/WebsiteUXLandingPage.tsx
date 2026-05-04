import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import { Target, TrendingUp, Users, BarChart3, Zap, Award, Layout, Smartphone, Gauge, MousePointer, Eye, CheckCircle } from "lucide-react";
import Hero from "@/components/Services/category/Hero";
import WhyChoose, { WhyChooseItem } from "@/components/Services/category/WhyChoose";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServicesRibbon, { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import PricingTable, { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import ToolStackSection, { Tool } from "@/components/Services/ServiceDetail/toolstack";
import ServiceFAQ, { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import { ProcessCards, ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import { ServiceFeatures, FeatureItem } from "@/components/Services/ServiceDetail/service-features";

const ScrollAnimatedSection = ({ children, bgColor }: { children: React.ReactNode; bgColor?: string }) => {
  const { ref, scale } = useScrollScale();
  return (<motion.div ref={ref} style={{ scale }} transition={{ type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }} className="relative rounded-3xl">{bgColor && <div className={`absolute inset-0 rounded-3xl ${bgColor}`} />}<div className="relative rounded-3xl">{children}</div></motion.div>);
};

const ribbonItems: RibbonItem[] = [
  { icon: <Layout className="h-5 w-5 text-white" />, title: "300+", subtitle: "Websites designed" },
  { icon: <TrendingUp className="h-5 w-5 text-white" />, title: "150%", subtitle: "Conversion increase" },
  { icon: <Gauge className="h-5 w-5 text-white" />, title: "2s", subtitle: "Average load time" },
  { icon: <Users className="h-5 w-5 text-white" />, title: "95%", subtitle: "User satisfaction" },
];

const websiteFeatures: FeatureItem[] = [
  { icon: Layout, title: "Custom Website Design", description: "Beautiful, on-brand websites that convert visitors into customers." },
  { icon: Smartphone, title: "Responsive & Mobile-First", description: "Flawless experience across all devices and screen sizes." },
  { icon: Gauge, title: "Performance Optimization", description: "Lightning-fast load times and optimal Core Web Vitals scores." },
  { icon: MousePointer, title: "Conversion-Focused UX", description: "User experience designed to guide visitors toward conversion." },
  { icon: Eye, title: "Landing Page Design", description: "High-converting landing pages for campaigns and lead generation." },
  { icon: CheckCircle, title: "A/B Testing & Optimization", description: "Continuous testing and optimization to improve conversion rates." },
];

const whyItems: WhyChooseItem[] = [
  { icon: Layout, title: "Design Excellence", desc: "Award-winning designs that elevate your brand." },
  { icon: Target, title: "Conversion-Focused", desc: "Every element designed to drive conversions." },
  { icon: Gauge, title: "Performance First", desc: "Fast, optimized sites that rank well in search." },
  { icon: Users, title: "User-Centric", desc: "Designs based on user research and best practices." },
  { icon: Zap, title: "Proven Results", desc: "150% average conversion rate improvement." },
  { icon: Award, title: "Expert Team", desc: "Experienced UX designers and developers." },
];

const websiteProcessSteps: ProcessStep[] = [
  { step: "01", title: "Discovery & Research", description: "Understand your business, audience, and goals through research and analysis." },
  { step: "02", title: "Design & Prototyping", description: "Create wireframes and high-fidelity designs with user testing." },
  { step: "03", title: "Development & Testing", description: "Build responsive, performant website with thorough QA testing." },
  { step: "04", title: "Launch & Optimization", description: "Launch website and continuously optimize based on data." },
];

const pricingPlans: Plan[] = [
  { title: "Starter", price: { monthly: 2000, yearly: 19200 }, description: "Essential website design", features: ["5-page website", "Responsive design", "Basic SEO", "Contact forms", "1 month support", "2 revision rounds"], ctaText: "Get Started", ctaHref: "/resources/support" },
  { title: "Growth", price: { monthly: 4000, yearly: 38400 }, description: "Professional website & UX", features: ["10-page website", "Custom UX design", "Advanced SEO", "CMS integration", "Analytics setup", "3 landing pages", "3 months support", "3 revision rounds"], ctaText: "Scale Up", ctaHref: "/resources/support", isFeatured: true },
  { title: "Enterprise", price: { monthly: 8000, yearly: 76800 }, description: "Enterprise website solution", features: ["Unlimited pages", "Advanced UX/UI", "Technical SEO", "Custom development", "A/B testing setup", "Conversion optimization", "12 months support", "Unlimited revisions", "Dedicated team"], ctaText: "Contact Sales", ctaHref: "/resources/support" },
];

const websiteTools: Tool[] = [
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Webflow", logo: "https://cdn.simpleicons.org/webflow/4353FF" },
  { name: "WordPress", logo: "https://cdn.simpleicons.org/wordpress/21759B" },
  { name: "Google PageSpeed", logo: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Hotjar", logo: "https://logo.clearbit.com/hotjar.com" },
  { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Optimizely", logo: "https://logo.clearbit.com/optimizely.com" },
  { name: "Cloudflare", logo: "https://cdn.simpleicons.org/cloudflare/F38020" },
];

const websiteFAQs: FAQItem[] = [
  { question: "What's included in website design?", answer: "Complete website design includes: UX/UI design, responsive development, content integration, SEO optimization, performance optimization, analytics setup, and training. We handle everything from strategy to launch. You'll receive: design files, source code, documentation, and ongoing support. Most websites include: homepage, about, services, blog, and contact pages. We can customize based on your needs." },
  { question: "How long does website design take?", answer: "Timeline varies by complexity: Simple website (5 pages): 4-6 weeks, Standard website (10 pages): 6-8 weeks, Complex website (15+ pages): 8-12 weeks. Breakdown: Week 1-2: Discovery and wireframes, Week 3-4: Design and revisions, Week 5-6: Development, Week 7-8: Testing and launch. E-commerce and custom functionality add 2-4 weeks. We provide detailed timeline during kickoff." },
  { question: "Will my website be mobile-friendly?", answer: "Yes! All websites are fully responsive and mobile-first. We design for: mobile phones, tablets, laptops, and desktops. Testing includes: multiple devices, different browsers, various screen sizes, and touch interactions. Mobile optimization is critical - 60%+ of traffic is mobile. We ensure perfect experience on all devices." },
  { question: "Can you help with website content?", answer: "Yes! We offer content services: copywriting for all pages, content strategy, SEO optimization, image sourcing/editing, and video integration. We can: write from scratch, edit existing content, or work with your content. Most clients need some content help. We ensure content is: clear, compelling, SEO-optimized, and conversion-focused." },
  { question: "What about website hosting and maintenance?", answer: "We provide hosting recommendations and can manage hosting for you. Options include: managed WordPress hosting, cloud hosting (AWS, Google Cloud), and CDN setup. Maintenance packages available: security updates, performance monitoring, content updates, backup management, and technical support. Most clients choose managed hosting for peace of mind." },
  { question: "How do you optimize for conversions?", answer: "Conversion optimization is built into our process: clear value propositions, strategic CTAs, optimized forms, trust signals, social proof, and fast load times. We use: user research, A/B testing, heatmaps, and analytics. Typical improvements: 50-150% increase in conversion rate, 30-50% reduction in bounce rate, and 2-3x more leads. Continuous optimization post-launch." },
  { question: "Can you redesign our existing website?", answer: "Absolutely! Website redesign process: audit current site, identify issues and opportunities, preserve SEO value, improve UX and conversion, and migrate content. We ensure: no loss of search rankings, improved performance, better user experience, and higher conversions. Most redesigns see immediate improvements in key metrics." },
  { question: "What's the difference between a website and landing page?", answer: "Websites are multi-page with navigation (home, about, services, etc.) for general audience. Landing pages are single-page, focused on one goal (lead capture, sale) for specific campaigns. Use websites for: brand presence, SEO, multiple offerings. Use landing pages for: PPC campaigns, specific offers, lead generation. We recommend both: website for organic traffic, landing pages for paid campaigns." },
];

const WebsiteUXLandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero eyebrow="WEBSITE, UX & LANDING PAGES" heading="Beautiful, High-Converting Websites That Drive Results" description="Custom website design and UX optimization that turns visitors into customers with stunning design and seamless user experience." ctaText="Get Started" ctaLink="/resources/support" imageSrc="/images/Services/Brand&Reputation/WebsiteUX&LandingPages.png" imageAlt="Website & UX Design" />
      <section className="py-8 sm:py-10">
        <ServicesRibbon title="Award-Winning Web Design" items={ribbonItems} />
      </section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><div className="mx-auto max-w-6xl"><ServiceFeatures eyebrow="What We Offer" heading="Complete Website & UX Services" description="From design to development, we create websites that look great and convert." features={websiteFeatures} accentColor="from-[#0074ED] to-[#5B9BF8]" /></div></section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><div className="mx-auto max-w-6xl"><ScrollAnimatedSection bgColor="bg-[#B8E8DD]"><div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12"><WhyChoose items={whyItems} eyebrow="WHY CHOOSE CONNECTTLY" heading="Why Choose Our Website Services" eyebrowColor="#0A6B5E" noPadding noCard noContainer /></div></ScrollAnimatedSection></div></section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><div className="mx-auto max-w-6xl"><ScrollAnimatedSection bgColor="bg-[#F1F1E9]"><div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12"><ProcessCards eyebrow="Our Process" subheading="How We Design Websites" description="A proven methodology for creating high-converting websites" steps={websiteProcessSteps} accentColor="from-[#0074ED] to-[#5B9BF8]" /></div></ScrollAnimatedSection></div></section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><div className="mx-auto max-w-6xl"><ScrollAnimatedSection bgColor=""><div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12"><PricingTable plans={pricingPlans} heading="Choose Your Website Plan" description="Select the perfect plan for your website needs. All plans include responsive design and SEO." accentColor="from-[#0074ED] to-[#5B9BF8]" /></div></ScrollAnimatedSection></div></section>
      <section className="py-8 sm:py-10"><ReviewCarousel noPadding /></section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><ScrollAnimatedSection bgColor=""><ToolStackSection title="Powered by Leading Web Tools" description="We use the best design and development tools to create exceptional websites." tools={websiteTools} ctaText="Get Started" ctaLink="/resources/support" bgColor="bg-[#B8E8DD]" /></ScrollAnimatedSection></section>
      <section className="py-8 sm:py-10">
        <ServiceFAQ title="Frequently Asked Questions" subtitle="Everything you need to know about website design and UX services" faqs={websiteFAQs} accentColor="from-[#0074ED] to-[#5B9BF8]" />
      </section>
    </div>
  );
};

export default WebsiteUXLandingPage;
