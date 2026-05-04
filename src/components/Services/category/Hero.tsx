import { Link } from "react-router-dom";
import { ArrowRight, Target, BarChart3, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type HeroProps = {
  eyebrow?: string;
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function Hero({
  eyebrow = "ALL DIGITAL SERVICES",
  heading,
  description,
  ctaText = "Get started now",
  ctaLink = "/resources/support",
  imageSrc = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  imageAlt = "Digital Marketing Dashboard",
}: HeroProps) {
  // Animation variants for fade-in slide-up
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <>
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
          <div className="container px-4 pt-8 sm:pt-10 pb-8 sm:pb-10">
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
                    {eyebrow}
                  </motion.p>

                  {/* Heading */}
                  <motion.h1
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-slate-900 leading-[1.1]"
                    variants={itemVariants}
                  >
                    {heading}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl"
                    variants={itemVariants}
                  >
                    {description}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div variants={itemVariants}>
                    <Link
                      to={ctaLink}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0074ED] hover:bg-[#0065d1] text-white px-8 py-4 font-medium shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    >
                      {ctaText} <ArrowRight className="h-5 w-5" />
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right Visual */}
                <motion.div
                  className="relative order-1 lg:order-2"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="relative bg-[#B8D4F7] rounded-[40px] p-8 md:p-12 lg:p-16 min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
                    {/* Mockup Container */}
                    <div className="relative w-full max-w-md">
                      <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full rounded-2xl"
                      />
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-float">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      
                      <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-float" style={{ animationDelay: '0.5s' }}>
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      
                      <div className="absolute top-1/2 -right-6 bg-white rounded-xl shadow-lg p-3 animate-float" style={{ animationDelay: '1s' }}>
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
