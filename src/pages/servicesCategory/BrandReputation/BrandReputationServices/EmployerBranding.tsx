import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import { Target, TrendingUp, Users, BarChart3, Zap, Award, Briefcase, Heart, Star, UserPlus, MessageSquare, Trophy } from "lucide-react";
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
  { icon: <Briefcase className="h-5 w-5 text-white" />, title: "150+", subtitle: "Employer brands built" },
  { icon: <UserPlus className="h-5 w-5 text-white" />, title: "3x", subtitle: "Application increase" },
  { icon: <Star className="h-5 w-5 text-white" />, title: "4.5+", subtitle: "Glassdoor rating" },
  { icon: <Trophy className="h-5 w-5 text-white" />, title: "50+", subtitle: "Best place to work awards" },
];

const employerBrandingFeatures: FeatureItem[] = [
  { icon: Briefcase, title: "Employer Value Proposition", description: "Define what makes your company a great place to work and why talent should choose you." },
  { icon: Heart, title: "Culture & Values", description: "Articulate your company culture, values, and employee experience authentically." },
  { icon: MessageSquare, title: "Recruitment Marketing", description: "Strategic campaigns that attract top talent and showcase your employer brand." },
  { icon: Star, title: "Employee Advocacy", description: "Turn employees into brand ambassadors who share authentic stories." },
  { icon: Users, title: "Careers Page Optimization", description: "Compelling careers pages that convert visitors into applicants." },
  { icon: Trophy, title: "Awards & Recognition", description: "Position for 'Best Place to Work' awards and employer recognition." },
];

const whyItems: WhyChooseItem[] = [
  { icon: Briefcase, title: "Talent Attraction", desc: "Attract 3x more qualified candidates." },
  { icon: Heart, title: "Authentic Stories", desc: "Real employee stories that resonate with candidates." },
  { icon: Target, title: "Strategic Approach", desc: "Data-driven employer branding strategy." },
  { icon: Star, title: "Award-Winning", desc: "Help clients win 'Best Place to Work' awards." },
  { icon: Users, title: "Employee-Centric", desc: "Built on real employee insights and experiences." },
  { icon: Award, title: "Proven Results", desc: "Track record of transforming employer brands." },
];

const employerBrandingProcessSteps: ProcessStep[] = [
  { step: "01", title: "Research & Discovery", description: "Employee surveys, interviews, and competitive analysis to understand your employer brand." },
  { step: "02", title: "EVP Development", description: "Create compelling employer value proposition and messaging framework." },
  { step: "03", title: "Content & Campaigns", description: "Develop recruitment marketing content and employee advocacy programs." },
  { step: "04", title: "Launch & Amplify", description: "Launch employer brand and amplify through multiple channels." },
];

const pricingPlans: Plan[] = [
  { title: "Starter", price: { monthly: 1600, yearly: 15360 }, description: "Essential employer branding", features: ["EVP development", "Basic messaging", "Careers page content", "Employee testimonials (5)", "Recruitment content", "2 revision rounds"], ctaText: "Get Started", ctaHref: "/resources/support" },
  { title: "Growth", price: { monthly: 3200, yearly: 30720 }, description: "Comprehensive employer branding", features: ["Complete EVP framework", "Advanced messaging", "Careers page redesign", "Employee stories (15)", "Recruitment campaigns", "Social media content", "Employee advocacy program", "3 revision rounds"], ctaText: "Scale Up", ctaHref: "/resources/support", isFeatured: true },
  { title: "Enterprise", price: { monthly: 6400, yearly: 61440 }, description: "Enterprise employer branding", features: ["Strategic EVP development", "Multi-location messaging", "Complete careers site", "Video testimonials (10)", "Full recruitment marketing", "Awards positioning", "Internal communications", "Unlimited revisions", "Dedicated team"], ctaText: "Contact Sales", ctaHref: "/resources/support" },
];

const employerBrandingTools: Tool[] = [
  { name: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "Glassdoor", logo: "https://logo.clearbit.com/glassdoor.com" },
  { name: "Indeed", logo: "https://logo.clearbit.com/indeed.com" },
  { name: "Comparably", logo: "https://logo.clearbit.com/comparably.com" },
  { name: "Canva", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "SurveyMonkey", logo: "https://logo.clearbit.com/surveymonkey.com" },
  { name: "Hootsuite", logo: "https://cdn.simpleicons.org/hootsuite/000000" },
];

const employerBrandingFAQs: FAQItem[] = [
  { question: "What is employer branding and why is it important?", answer: "Employer branding is how you position your company as an employer of choice. It's your reputation as a workplace. Why it matters: attracts better talent (3x more applications), reduces hiring costs (50% lower cost-per-hire), improves retention (28% lower turnover), and enhances company reputation. In competitive talent markets, strong employer brand is critical. Candidates research companies extensively - 75% check employer brand before applying. Without strong employer brand, you lose top talent to competitors." },
  { question: "What's an Employer Value Proposition (EVP)?", answer: "EVP is the unique value you offer employees in exchange for their skills and experience. It answers: Why should someone work here? What makes us different? What's the employee experience? Good EVP includes: career development, culture and values, compensation and benefits, work-life balance, and purpose and impact. We develop EVP through: employee research, competitive analysis, leadership input, and candidate insights. Strong EVP attracts right-fit candidates and reduces turnover." },
  { question: "How do you gather employee insights?", answer: "We use multiple research methods: anonymous employee surveys, focus groups and interviews, exit interview analysis, Glassdoor/Indeed review analysis, and new hire feedback. We talk to: current employees (all levels), recent hires, departing employees, and hiring managers. This gives authentic understanding of employee experience. We identify: what employees love, what needs improvement, unique differentiators, and authentic stories. Research typically takes 2-3 weeks." },
  { question: "Can you help improve our Glassdoor rating?", answer: "Yes! We help improve employer reputation on review sites: encourage satisfied employees to review, respond professionally to negative reviews, address root causes of complaints, and showcase improvements. We also: create review response templates, train HR on review management, and monitor all review sites. Important: We focus on genuine improvement, not fake reviews. Most clients see 0.5-1.0 star improvement within 6 months through authentic efforts." },
  { question: "How do you create employee stories?", answer: "We develop authentic employee stories through: employee interviews (30-60 min), photo/video shoots, story writing and editing, and employee approval. Stories highlight: career growth, company culture, work-life balance, diversity and inclusion, and unique benefits. Formats include: written testimonials, video interviews, day-in-the-life content, and social media posts. We typically create 10-20 stories covering diverse employees and experiences." },
  { question: "What's included in recruitment marketing?", answer: "Recruitment marketing attracts candidates through: job descriptions (compelling, SEO-optimized), social media campaigns, email campaigns, content marketing (blog posts, guides), employee referral programs, and recruitment events. We create: branded templates, content calendar, campaign strategy, and performance tracking. Goal is to build talent pipeline before you need to hire. Most clients see 3x increase in qualified applications." },
  { question: "How long does employer branding take?", answer: "Timeline varies by scope: EVP development: 6-8 weeks, Complete employer brand: 10-12 weeks, Full implementation: 3-6 months. Breakdown: Weeks 1-3: Research and insights, Weeks 4-6: EVP and messaging, Weeks 7-9: Content creation, Weeks 10-12: Launch and activation. Results timeline: Month 1-3: Foundation built, Month 3-6: Increased applications, Month 6-12: Improved quality of hire and retention." },
  { question: "How do you measure employer branding success?", answer: "We track comprehensive metrics: application volume and quality, time-to-hire, cost-per-hire, offer acceptance rate, employee retention, Glassdoor/Indeed ratings, career page traffic, and employee referrals. We also measure: brand awareness surveys, candidate experience scores, and employee engagement. Most clients see: 3x more applications, 50% lower hiring costs, 28% better retention, and 0.5-1.0 star rating improvement within 6-12 months." },
];

const EmployerBranding = () => {
  return (
    <div className="min-h-screen">
      <Hero 
        eyebrow="EMPLOYER BRANDING" 
        heading="Attract Top Talent with a Powerful Employer Brand" 
        description="Strategic employer branding that positions you as an employer of choice, attracts quality candidates, and reduces hiring costs." 
        ctaText="Get Started" 
        ctaLink="/resources/support" 
        imageSrc="/images/Services/Brand&Reputation/EmployerBranding.png" 
        imageAlt="Employer Branding" 
      />
      <section className="py-8 sm:py-10">
        <ServicesRibbon title="Trusted by Top Employers" items={ribbonItems} />
      </section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><div className="mx-auto max-w-6xl"><ServiceFeatures eyebrow="What We Offer" heading="Complete Employer Branding Services" description="From EVP to recruitment marketing, we build employer brands that attract top talent." features={employerBrandingFeatures} accentColor="from-[#0074ED] to-[#5B9BF8]" /></div></section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><div className="mx-auto max-w-6xl"><ScrollAnimatedSection bgColor="bg-[#B8E8DD]"><div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12"><WhyChoose items={whyItems} eyebrow="WHY CHOOSE CONNECTTLY" heading="Why Choose Our Employer Branding Services" eyebrowColor="#0A6B5E" noPadding noCard noContainer /></div></ScrollAnimatedSection></div></section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><div className="mx-auto max-w-6xl"><ScrollAnimatedSection bgColor="bg-[#F1F1E9]"><div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12"><ProcessCards eyebrow="Our Process" subheading="How We Build Employer Brands" description="A proven methodology for creating employer brands that attract talent" steps={employerBrandingProcessSteps} accentColor="from-[#0074ED] to-[#5B9BF8]" /></div></ScrollAnimatedSection></div></section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><div className="mx-auto max-w-6xl"><ScrollAnimatedSection bgColor=""><div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12"><PricingTable plans={pricingPlans} heading="Choose Your Employer Branding Plan" description="Select the perfect plan for your employer branding needs. All plans include EVP development and employee research." accentColor="from-[#0074ED] to-[#5B9BF8]" /></div></ScrollAnimatedSection></div></section>
      <section className="py-8 sm:py-10"><ReviewCarousel noPadding /></section>
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><ScrollAnimatedSection bgColor=""><ToolStackSection title="Powered by Leading Recruitment Tools" description="We use the best employer branding and recruitment marketing tools." tools={employerBrandingTools} ctaText="Get Started" ctaLink="/resources/support" bgColor="bg-[#B8E8DD]" /></ScrollAnimatedSection></section>
      <section className="py-8 sm:py-10">
        <ServiceFAQ title="Frequently Asked Questions" subtitle="Everything you need to know about employer branding services" faqs={employerBrandingFAQs} accentColor="from-[#0074ED] to-[#5B9BF8]" />
      </section>
    </div>
  );
};

export default EmployerBranding;
