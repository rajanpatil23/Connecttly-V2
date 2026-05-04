import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Users,
  Award,
  Zap,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Globe,
  Briefcase,
  Mic,
  Video,
  FileText,
  MessageSquare,
  Building2,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import { ProcessCards, ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import ReviewCarousel from "@/components/Home/ReviewCarousel";
import ServiceFAQ, { FAQItem as ServiceFAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import { FeatureSteps } from "@/components/partnerperks";
import { useState } from "react";
import AffiliateApplicationModal from "@/components/ReferAndEarn/AffiliateApplicationModal";

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
      {bgColor && <div className={`absolute inset-0 rounded-3xl ${bgColor}`} />}
      <div className="relative rounded-3xl">{children}</div>
    </motion.div>
  );
};


// Process Steps Data
const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Apply in Minutes",
    description: "Fill out our simple application form with your details. We'll review and email your approval status within 24-48 hours.",
  },
  {
    step: "02",
    title: "Get Your Link",
    description: "Access your unique referral link and marketing materials through our partner portal dashboard.",
  },
  {
    step: "03",
    title: "Share & Earn",
    description: "Share your link across your network. We track all clicks, conversions, and attribute them to your account.",
  },
  {
    step: "04",
    title: "Track & Get Paid",
    description: "Monitor real-time performance in your portal and receive regular payouts once you hit the minimum threshold.",
  },
];

// FAQ Component
interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-slate-200 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-lg font-semibold text-slate-900 group-hover:text-[#0074ED] transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-slate-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
};

// FAQ Data
const faqData = [
  {
    question: "What is the Connecttly Affiliate Program?",
    answer: "A referral program that pays commission for qualified customers you send to Connecttly. You earn up to 20% recurring commission on every successful referral.",
  },
  {
    question: "How do I get started?",
    answer: "Apply on this page by filling out the application form. If approved, you'll receive a unique referral link and access to the partner portal with all marketing materials.",
  },
  {
    question: "Can you explain the commission structure?",
    answer: "You earn up to 20% recurring commission on eligible referrals for the qualified period. Exact rates depend on the plan your referral signs up for and their region.",
  },
  {
    question: "When and how do I get paid?",
    answer: "Payouts occur monthly once you reach the minimum threshold of $100. We support popular payout methods including PayPal, bank transfer, and Stripe.",
  },
  {
    question: "How do I track my referrals and commissions?",
    answer: "Use your partner portal to see real-time data on clicks, signups, conversions, pending commissions, and payout history. You'll have full transparency into your performance.",
  },
  {
    question: "What marketing materials do you provide?",
    answer: "We provide logos, banners in multiple sizes, email templates, social media copy, landing page screenshots, and comprehensive messaging guidelines to help you succeed.",
  },
  {
    question: "Can I join if I live outside the United States?",
    answer: "Yes! Our affiliate program is open globally. However, availability of specific payout methods may vary by country. Check with our team for details.",
  },
  {
    question: "Are there any restrictions on where I can share my link?",
    answer: "Yes. We prohibit spamming, misleading advertising, coupon/deal sites without approval, and trademark bidding. Full terms are provided upon approval.",
  },
];

export default function ReferAndEarn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* =================== HERO SECTION =================== */}
      <header className="relative w-full overflow-hidden bg-[#F5F3EE] rounded-b-[40px]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-30 animate-gradient-shift rounded-b-[40px]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-40 rounded-b-[40px]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(100, 116, 139, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-700">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
              Affiliate Program
            </div>

            {/* Headline */}
            <h1 className="mt-4 text-[30px] leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-[44px] md:text-[60px]">
              Turn Referrals into{" "}
              <span className="bg-gradient-to-r from-[#0074ED] to-[#5B9BF8] bg-clip-text text-transparent">
                Revenue
              </span>
            </h1>

            {/* Supporting copy */}
            <p className="mx-auto mt-4 max-w-[56ch] text-[15px] leading-6 text-slate-600 sm:text-lg sm:leading-7 md:text-xl">
              Refer customers, we handle tracking, you get paid. Earn up to 20% recurring commission by becoming a Connecttly Affiliate Partner.
            </p>

            {/* CTA Buttons - matching Careers page style */}
            <div className="mt-7 mb-8 sm:mb-0 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0074ED] text-white hover:bg-[#0065d1] px-8 py-3 font-medium shadow-lg transition-all hover:shadow-xl"
              >
                Apply Now
              </button>
              <Link
                to="#details"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 px-8 py-3 font-medium transition-all"
              >
                Program Details
              </Link>
            </div>

            {/* Stats Cards - matching Insights page style */}
            <div className="relative mt-8">
              <div className="relative w-full max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: "$1M+", label: "Paid to affiliates", delay: 0 },
                    { value: "20%", label: "Commission rate", delay: 0.2 },
                    { value: "500+", label: "Active partners", delay: 0.4 },
                  ].map((stat, i) => {
                    // Different icon for each card
                    const iconPath = i === 0 
                      ? "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" // Dollar icon
                      : i === 1 
                      ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" // Trending up icon
                      : "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"; // Users icon
                    
                    return (
                      <div
                        key={i}
                        className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                            </svg>
                          </div>
                          <div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-[#0074ED] to-[#5B9BF8] bg-clip-text text-transparent">
                              {stat.value}
                            </div>
                            <div className="text-sm text-slate-600">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background: linear-gradient(135deg, #dbeafe 0%, #fae8ff 50%, #fce7f3 100%);
          }
          25% {
            background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 50%, #fae8ff 100%);
          }
          50% {
            background: linear-gradient(135deg, #fae8ff 0%, #fce7f3 50%, #dbeafe 100%);
          }
          75% {
            background: linear-gradient(135deg, #fce7f3 0%, #dbeafe 50%, #e0e7ff 100%);
          }
        }
        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
        }
      `}</style>

      {/* =================== BENEFITS SECTION =================== */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-18 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              What's in It for You?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
            >
              Join hundreds of partners earning recurring income by referring customers to Connecttly
            </motion.p>
          </motion.header>

          {/* Benefits Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: DollarSign,
                title: "Recurring Commission",
                description: "Earn up to 20% for every qualified customer you refer, month after month.",
              },
              {
                icon: BarChart3,
                title: "Transparent Tracking",
                description: "Real-time dashboard showing clicks, conversions, and payouts with full transparency.",
              },
              {
                icon: Award,
                title: "Fair Attribution",
                description: "First-click or last-click credit ensures you get paid fairly for your referrals.",
              },
              {
                icon: Sparkles,
                title: "Marketing Assets",
                description: "Ready-to-use banners, copy templates, and creative materials to launch faster.",
              },
            ].map((benefit, i) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center"
                >
                  {/* Icon with gradient background */}
                  <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =================== PARTNER PERKS SECTION =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[#B8E8DD]">
            <FeatureSteps
              title="Everything You Need to Succeed"
              features={[
                {
                  step: "Unique Referral Link",
                  title: "Unique referral link to track earnings",
                  content: "Get your personalized tracking link that monitors every click, signup, and conversion in real-time.",
                  image: "/images/home/services/performance.svg"
                },
                {
                  step: "Reward Management",
                  title: "Easy reward management",
                  content: "Track your commissions, manage payouts, and view detailed reports all in one convenient location.",
                  image: "/images/home/services/22.webp"
                },
                {
                  step: "Marketing Materials",
                  title: "Free marketing materials",
                  content: "Access professionally designed banners, email templates, social media content, and landing pages.",
                  image: "/images/home/services/44.webp"
                },
              
              ]}
              autoPlayInterval={4000}
            />
        
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* =================== HOW TO GET STARTED =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[#F1F1E9]">
            <div className="px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  How to Join & Start Earning
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our simple 4-step process gets you up and running in minutes
                </p>
              </motion.div>

              {/* Process Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 lg:grid-cols-4">
                {processSteps.map((step, index) => {
                  const color = { border: "border-white", bg: "bg-white", badge: "bg-[#3369fd]" };
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className={`${color.bg} rounded-3xl p-8 h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                        <div className="flex justify-start mb-4">
                          <div className={`${color.badge} text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider`}>
                            STEP {step.step}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed flex-grow text-left">
                          {step.description}
                        </p>
                        <div className={`mt-6 h-1 w-16 ${color.badge} rounded-full`}></div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* =================== WHO'S A GOOD FIT =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-[#F6F8FB]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl text-slate-900">
              Who's a Good Fit?
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Ideal partners who can benefit from our affiliate program
            </p>
          </div>
          
          {/* Partner Types Grid - matching Benefits & Perks style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-2 mb-12">
            {[
              { icon: FileText, title: "Bloggers & Writers", desc: "Content creators with engaged audiences" },
              { icon: Mic, title: "Podcasters", desc: "Audio content creators and hosts" },
              { icon: Video, title: "Video Creators", desc: "YouTubers and video influencers" },
              { icon: MessageSquare, title: "Social Influencers", desc: "Social media content creators" },
              { icon: Globe, title: "Online Publishers", desc: "Website and media publishers" },
              { icon: Briefcase, title: "Consultants", desc: "Business and marketing consultants" },
              { icon: Building2, title: "Agencies", desc: "Marketing and creative agencies" },
              { icon: Users, title: "Community Leaders", desc: "Industry thought leaders" },
            ].map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col lg:border-r py-10 relative group/feature ${
                    (index === 0 || index === 4) ? "lg:border-l" : ""
                  } ${index < 4 ? "lg:border-b" : ""} border-slate-200`}
                >
                  {index < 4 && (
                    <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#0074ED]/10 to-transparent pointer-events-none" />
                  )}
                  {index >= 4 && (
                    <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#0074ED]/10 to-transparent pointer-events-none" />
                  )}
                  {/* Icon with gradient background */}
                  <div className="mb-4 relative z-10 px-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover/feature:scale-110 transition-transform duration-300">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center text-white">
                        <IconComponent className="h-7 w-7" />
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold mb-2 relative z-10 px-10">
                    <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-slate-200 group-hover/feature:bg-[#0074ED] transition-all duration-200 origin-center" />
                    <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-slate-900">
                      {type.title}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 max-w-xs relative z-10 px-10">
                    {type.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Payout Visualization - Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 text-center">Let's paint a payout picture</h3>
            <p className="text-sm text-slate-600 text-center mb-8">
              Let's daydream a little, shall we? Check out these commission estimates based on the # of paid referrals signing up for our most popular plan (Professional, annual).
            </p>
            
            {/* Bar Chart */}
            <div className="relative">
              {/* Y-axis labels */}
              <div className="flex items-end justify-center gap-3 md:gap-6 h-80 mb-4">
                {[
                  { referrals: 0, yearly: 0, height: 0 },
                  { referrals: 5, yearly: 948, height: 30 },
                  { referrals: 10, yearly: 1880, height: 60 },
                  { referrals: 20, yearly: 3792, height: 95 },
                ].map((tier, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 max-w-[200px]">
                    {/* Bar */}
                    <div className="w-full flex flex-col items-center justify-end mb-3" style={{ height: '280px' }}>
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${tier.height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        className="w-full bg-gradient-to-t from-[#0074ED] to-[#5B9BF8] rounded-t-lg relative group hover:from-[#0074ED] hover:to-[#0074ED] hover:brightness-125 transition-all duration-300 cursor-pointer"
                      >
                        {/* Value label on top of bar */}
                        <div className="absolute -top-8 left-0 right-0 text-center">
                          <div className="text-lg md:text-xl font-bold text-slate-900">
                            ${tier.yearly.toLocaleString()}/yr
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* X-axis label */}
                    <div className="text-center pt-2 border-t-2 border-slate-200 w-full">
                      <div className="text-base md:text-lg font-semibold text-slate-900">{tier.referrals}</div>
                      <div className="text-xs text-slate-600 mt-1">referrals</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* X-axis label */}
              <div className="text-center mt-4">
                <p className="text-sm font-medium text-slate-700">Number of referrals</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Note:</strong> These are illustrative examples based on our Professional plan (annual billing) with 20% commission rate. 
                Actual earnings depend on the plan your referrals choose, their billing cycle, retention, and our current commission structure. 
                Commission rates and terms are subject to change. See full terms in your partner agreement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================== REVIEWS SECTION =================== */}
      <section className="py-8 sm:py-10">
        <ReviewCarousel noPadding />
      </section>

      {/* =================== FAQ SECTION =================== */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about our affiliate program
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
          >
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================== FINAL CTA SECTION =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[#F1F1E9]">
            <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Ready to Partner Up?
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                  Join our affiliate program today and start earning recurring commission on every referral.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                  Apply Now <ArrowRight className="h-5 w-5" />
                </button>
              </motion.div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Application Modal */}
      <AffiliateApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
