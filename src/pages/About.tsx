import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LandingAccordionItem } from "@/components/about/interactive-image-accordion";
import IndustriesMarquee from "@/components/about/IndustriesMarquee";
import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Users,
  Target,
  Lightbulb,
  ArrowRight,
  BarChart3,
  TrendingUp,
  Shield,
  Settings,
} from "lucide-react";

// Scroll-animated wrapper - scroll-based scale animation
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

/* ===== Values ===== */
const values = [
  {
    icon: Users,
    title: "Client-Centric",
    description: "We put our clients at the center of everything we do, ensuring their success is our priority.",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
  {
    icon: BarChart3,
    title: "Results-Driven",
    description: "We focus on delivering measurable results that directly impact your business growth.",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of digital marketing trends to provide cutting-edge solutions.",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "We believe in open communication and honest reporting, keeping you informed every step of the way.",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
];

/* ===== Service Cards Data ===== */
const serviceCards = [
  {
    id: 1,
    icon: Target,
    title: "Performance Marketing",
    description: "Drive efficient growth through paid social, paid search, landing pages, and conversion rate optimization strategies that scale your business effectively.",
    link: "/services/performance-marketing",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Content & Social",
    description: "Build engaging editorial systems, on-brand creative content, and community growth strategies that drive demand and audience engagement across platforms.",
    link: "/services/content-creative",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
  {
    id: 3,
    icon: Settings,
    title: "Automation & CRM",
    description: "Create sophisticated lifecycle funnels, lead scoring systems, and email journeys that are tied to revenue growth and measurable business outcomes.",
    link: "/services/analytics-ai",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Strategy & Analytics",
    description: "Develop clear positioning, north-star KPIs, and comprehensive dashboards that clarify focus and accelerate data-driven learning and strategic growth.",
    link: "/services/growth-demand-generation",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Generate Quality Leads",
    description: "Transform LinkedIn into a powerful lead-generation engine that delivers qualified contacts and meaningful conversations that convert into sustainable revenue.",
    link: "/services/linkedin-growth",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
  {
    id: 6,
    icon: Shield,
    title: "Protect Your Reputation",
    description: "Implement proactive monitoring and strategic reputation management to ensure your brand stays protected from negative impact while building lasting credibility.",
    link: "/services/brand-reputation",
    gradient: "from-[#0074ED] to-[#5B9BF8]"
  },
];



export default function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as any,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* =================== HERO =================== */}
      <section className="overflow-hidden bg-[#ffffff] rounded-b-[40px] relative">
        {/* Grid Pattern with Fade */}
        <div className="absolute inset-0 pointer-events-none rounded-b-[40px]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: `
            radial-gradient(
              ellipse 80% 60% at 50% 45%,
              black 0%,
              rgba(0, 0, 0, 0.8) 15%,
              rgba(0, 0, 0, 0.6) 30%,
              rgba(0, 0, 0, 0.3) 50%,
              transparent 70%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              ellipse 80% 60% at 50% 45%,
              black 0%,
              rgba(0, 0, 0, 0.8) 15%,
              rgba(0, 0, 0, 0.6) 30%,
              rgba(0, 0, 0, 0.3) 50%,
              transparent 70%,
              transparent 100%
            )
          `
        }}></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="container px-4 py-8 sm:py-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  className="p-4 md:p-6 lg:p-8 order-2 lg:order-1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Icons Row */}
                  <motion.div
                    className="flex items-center gap-3 mb-6"
                    variants={itemVariants}
                  >
                    <motion.div variants={iconVariants}>
                      <Target className="h-5 w-5 text-slate-700" />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      transition={{ delay: 0.1 }}
                    >
                      <BarChart3 className="h-5 w-5 text-slate-700" />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      transition={{ delay: 0.2 }}
                    >
                      <Users className="h-5 w-5 text-slate-700" />
                    </motion.div>
                  </motion.div>

                  {/* Eyebrow */}
                  <motion.p
                    className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-slate-600 mb-4"
                    variants={itemVariants}
                  >
                    ABOUT CONNECTTLY
                  </motion.p>

                  {/* Heading */}
                  <motion.h1
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-slate-900 leading-[1.1]"
                    variants={itemVariants}
                  >
                    Driving Growth with <span className="text-[#3369fd]">Transparency</span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl"
                    variants={itemVariants}
                  >
                    We partner with businesses to unlock growth through strategy, creativity, and automation - always backed by data and measurable results.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/resources/support"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0074ED] hover:bg-[#0065d1] text-white px-8 py-4 font-medium shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    >
                      Work with us <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      to="/resources/blog"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 font-medium transition-all"
                    >
                      See our insights
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right Visual - Stats Cards */}
                <motion.div
                  className="relative order-1 lg:order-2"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1] as any,
                  }}
                >
                  <div className="relative bg-[#B8D4F7] rounded-[40px] p-8 md:p-12 lg:p-16 min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
                    {/* Stats Cards Container */}
                    <div className="relative w-full max-w-md space-y-4">
                      {[
                        { value: "50+", label: "SaaS brands served", icon: Target, delay: 0 },
                        { value: "98%", label: "Client satisfaction", icon: TrendingUp, delay: 0.2 },
                        { value: "500+", label: "Projects delivered", icon: BarChart3, delay: 0.4 },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + stat.delay }}
                          className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                              <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="text-3xl font-bold bg-gradient-to-r from-[#0074ED] to-[#5B9BF8] bg-clip-text text-transparent">
                                {stat.value}
                              </div>
                              <div className="text-sm text-slate-600">{stat.label}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== WHAT WE DO =================== */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-18 pb-8 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Comprehensive Digital Marketing Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
            >
              We help businesses grow through strategic marketing, automation, and data-driven insights.
            </motion.p>
          </motion.header>

          {/* Service Cards Grid - single wrapper animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {serviceCards.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link key={service.id} to={service.link} className="group block">
                  <div className="relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center h-full">
                    {/* Icon with gradient background */}
                    <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:scale-110 transition-transform duration-300">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                    
                    {/* Hover arrow */}
                    <div className="mt-4 text-sm font-semibold text-[#0074ED] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =================== VALUES =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[#B8E8DD]">
            <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-10 sm:mb-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
                >
                  The Principles That Guide Us
                </motion.h2>
              </motion.header>

              {/* Values Cards Grid - single wrapper animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {values.map((value) => {
                  const IconComponent = value.icon;
                  return (
                    <div
                      key={value.title}
                      className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center"
                    >
                      {/* Icon with gradient background */}
                      <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:scale-110 transition-transform duration-300">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center`}>
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* =================== MISSION =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[#D4F0B3]">
            <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Empowering Business Growth
                </h2>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  To empower businesses of all sizes to achieve their digital marketing goals through data-driven strategies, innovative solutions, and exceptional service.
                </p>
              </motion.div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* =================== WHY CHOOSE CONNECTTLY =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection>
            <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
              <LandingAccordionItem />
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
   
      {/* =================== INDUSTRIES =================== */}
      <section className="py-8 sm:py-10">
        <IndustriesMarquee />
      </section>

    </div>
  );
}
