import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, BarChart3, Users, Code, Star, Quote, Play, MessageSquare, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/_zip/SectionLabel";
import Hero from "@/components/_zip/Home/Hero";
import ServicesGrid from "@/components/_zip/Home/ServicesGrid";
import WhyChoose from "@/components/_zip/Home/WhyChoose";
import CaseStudies from "@/components/_zip/Home/CaseStudies";
import ResourcesShowcase from "@/components/_zip/Home/ResourcesShowcase";
import ReviewCarousel from "@/components/_zip/Home/ReviewCarousel";
import blogIllustration from "@/assets/_zip/blog-illustration.jpg";

const steps = [
  { num: "01", title: "Discover", desc: "We learn your business, goals, and audience." },
  { num: "02", title: "Strategize", desc: "We build a custom growth strategy tailored to you." },
  { num: "03", title: "Launch", desc: "We execute campaigns, content, and automation." },
  { num: "04", title: "Scale", desc: "We optimise and scale what works to maximise ROI." },
];

const whyUs = [
  { title: "Strategy + Execution", desc: "We don't just advise, we build and run your growth engine.", icon: <BarChart3 className="w-6 h-6 text-primary" /> },
  { title: "AI-Powered Marketing", desc: "Automation and AI tools drive efficiency and scale.", icon: <Code className="w-6 h-6 text-primary" /> },
  { title: "Performance Focused", desc: "Every campaign is optimised for measurable ROI.", icon: <Star className="w-6 h-6 text-primary" /> },
  { title: "Founder-Friendly", desc: "We work closely with startups and growth-stage businesses.", icon: <Users className="w-6 h-6 text-primary" /> },
];

const resourceTabs = ["Blog", "Free Tools", "Templates", "Community", "Live Metrics", "Support"];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Services intro */}
      <section className="relative pt-14 md:pt-16 pb-2">
        <div className="container-main">
          <SectionLabel label="Services" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center max-w-2xl mx-auto mt-4">
            The Future of Digital Growth In{" "}
            <span className="gradient-text">One Unified Platform</span>
          </h2>
        </div>
      </section>

      {/* Services cards, expandable rows. Active card grows wider + shows image; others compact. Both rows share identical flex ratios so widths align. */}
      <ServicesGrid />

      {/* How It Works, Dark Section */}
      <section className="py-16 md:py-24 bg-[#09233C]">
        <div className="container-main">
          <div className="flex justify-center mb-6">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full border border-white/20 bg-white text-primary">
              Why Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white">
            How <span className="gradient-text">Connecttly</span> Works
          </h2>

          {/* Cards + connector arrows */}
          <div className="relative mt-16 max-w-5xl mx-auto">
            {/* Decorative dashed arrows, desktop only.
                Top arrows arc from card 1 -> 2 and card 3 -> 4.
                Bottom arrow arcs from card 2 -> 3. */}
            <svg
              aria-hidden
              className="hidden md:block absolute inset-x-0 -top-12 w-full h-12 pointer-events-none overflow-visible"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              {/* Card 1 (right side ~16%) -> Card 2 (left side ~34%) */}
              <path
                d="M 16 12 Q 25 -2 34 12"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="butt"
                vectorEffect="non-scaling-stroke"
                className="animated-dash"
              />
              {/* Card 3 (right side ~66%) -> Card 4 (left side ~84%) */}
              <path
                d="M 66 12 Q 75 -2 84 12"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="butt"
                vectorEffect="non-scaling-stroke"
                className="animated-dash"
              />
            </svg>

            <svg
              aria-hidden
              className="hidden md:block absolute inset-x-0 -bottom-12 w-full h-12 pointer-events-none overflow-visible"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              {/* Card 2 (right side ~41%) -> Card 3 (left side ~59%) */}
              <path
                d="M 41 0 Q 50 16 59 0"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="butt"
                vectorEffect="non-scaling-stroke"
                className="animated-dash"
              />
            </svg>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl p-6 bg-primary min-h-[210px] flex flex-col"
                >
                  <span className="text-5xl md:text-6xl font-heading font-bold leading-none text-white">
                    {step.num}
                  </span>
                  <h3 className="font-heading font-semibold text-lg mt-5 text-white">
                    {step.title}
                  </h3>
                  {step.desc && (
                    <p className="text-xs mt-2 leading-relaxed text-white/75">
                      {step.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Brands Choose */}
      <WhyChoose />

      {/* Case Studies, Dark Section */}
      <CaseStudies />

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <SectionLabel label="Testimonials" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mt-4 mb-10">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>
        <ReviewCarousel noPadding />
      </section>

      {/* Resource Hub */}
      <ResourcesShowcase />

      {/* Bottom action row */}
      <section className="pb-16 md:pb-20">
        <div className="container-main">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {[
              { icon: <MessageSquare className="w-5 h-5 text-primary" />, title: "Contact Us", desc: "Reach out to our support team for assistance anytime", href: "/resources/support" },
              { icon: <HelpCircle className="w-5 h-5 text-primary" />, title: "FAQ", desc: "Get quick answers to your questions about our products and services", href: "/resources/faq" },
              { icon: <Users className="w-5 h-5 text-primary" />, title: "Become an Affiliate", desc: "Join our affiliate program and earn recurring commission on referrals", href: "/resources/refer-and-earn" },
            ].map((item) => (
              <Link key={item.title} to={item.href} className="group bg-background rounded-xl border border-border/60 shadow-[0_2px_10px_hsl(var(--foreground)/0.04)] p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-full bg-ct-blue-light flex items-center justify-center">{item.icon}</div>
                  <ArrowRight className="w-4 h-4 text-primary opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <p className="font-heading font-semibold mb-1.5">{item.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
