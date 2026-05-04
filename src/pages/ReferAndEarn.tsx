import PageHero from "@/components/_zip/PageHero";
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
import ReviewCarousel from "@/components/_zip/Home/ReviewCarousel";
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
      className="border-b border-border last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
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
      <PageHero
        eyebrow="Affiliate Program"
        title={<>Turn referrals into <span className="gradient-text">revenue</span></>}
        description="Refer customers, we handle tracking, you get paid. Earn up to 20% recurring commission by becoming a Connecttly Affiliate Partner."
        primaryCtaText="Apply Now"
        primaryCtaOnClick={() => setIsModalOpen(true)}
        secondaryCtaText="Program Details"
        secondaryCtaHref="#details"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { value: "$1M+", label: "Paid to affiliates" },
            { value: "20%", label: "Commission rate" },
            { value: "500+", label: "Active partners" },
          ].map((s) => (
            <div key={s.label} className="bg-background rounded-2xl p-5 border border-border shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
              <div className="text-2xl font-heading font-bold gradient-text">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
            >
              What's in It for You?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto"
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
                  className="group relative bg-card rounded-2xl p-8 shadow-[0_4px_20px_hsl(var(--foreground)/0.08)] hover:shadow-[0_8px_30px_hsl(var(--foreground)/0.12)] transition-all duration-300 text-center"
                >
                  {/* Icon with gradient background */}
                  <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                      <IconComponent className="h-7 w-7 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =================== PARTNER PERKS SECTION =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-muted">
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
          <ScrollAnimatedSection bgColor="bg-muted">
            <div className="px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  How to Join & Start Earning
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our simple 4-step process gets you up and running in minutes
                </p>
              </motion.div>

              {/* Process Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 lg:grid-cols-4">
                {processSteps.map((step, index) => {
                  const color = { bg: "bg-card", badge: "bg-primary" };
                  
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
                          <div className={`${color.badge} text-primary-foreground px-4 py-2 rounded-full text-sm font-bold tracking-wider`}>
                            STEP {step.step}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-4 text-left">
                          {step.title}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed flex-grow text-left">
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
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-muted/40">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl text-foreground">
              Who's a Good Fit?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
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
                  } ${index < 4 ? "lg:border-b" : ""} border-border`}
                >
                  {index < 4 && (
                    <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                  )}
                  {index >= 4 && (
                    <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                  )}
                  {/* Icon with gradient background */}
                  <div className="mb-4 relative z-10 px-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover/feature:scale-110 transition-transform duration-300">
                      <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                        <IconComponent className="h-7 w-7" />
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold mb-2 relative z-10 px-10">
                    <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-border group-hover/feature:bg-primary transition-all duration-200 origin-center" />
                    <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
                      {type.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
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
            className="bg-card rounded-2xl p-8 md:p-10 shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">Let's paint a payout picture</h3>
            <p className="text-sm text-muted-foreground text-center mb-8">
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
                        className="w-full bg-primary rounded-t-lg relative group hover:bg-primary/90 transition-all duration-300 cursor-pointer"
                      >
                        {/* Value label on top of bar */}
                        <div className="absolute -top-8 left-0 right-0 text-center">
                          <div className="text-lg md:text-xl font-bold text-foreground">
                            ${tier.yearly.toLocaleString()}/yr
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* X-axis label */}
                    <div className="text-center pt-2 border-t-2 border-border w-full">
                      <div className="text-base md:text-lg font-semibold text-foreground">{tier.referrals}</div>
                      <div className="text-xs text-muted-foreground mt-1">referrals</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* X-axis label */}
              <div className="text-center mt-4">
                <p className="text-sm font-medium text-foreground/80">Number of referrals</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our affiliate program
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-lg"
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
          <ScrollAnimatedSection bgColor="bg-muted">
            <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Ready to Partner Up?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join our affiliate program today and start earning recurring commission on every referral.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
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
