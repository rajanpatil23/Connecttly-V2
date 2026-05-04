import { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock, MapPin, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";

const CALENDLY_URL = "https://calendly.com/connecttly-info/30min";

// Scroll-animated wrapper - matching other pages
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

export default function Support() {
  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const scrollToSchedule = useCallback(() => {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  }, []);

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

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO ===== */}
      <section className="overflow-hidden bg-[#F5F3EE] rounded-b-[40px] relative">
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
        
        {/* Content */}
        <div className="relative z-10">
          <div className="container px-4 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="mx-auto max-w-4xl text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight"
                >
                  Let's start your <span className="text-[#3369fd]">growth journey</span>
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants}
                  className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                >
                  Talk to our team or book a strategy call that fits your schedule.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="mt-8 sm:mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
                  <button
                    onClick={scrollToSchedule}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 font-medium shadow-lg transition-all hover:shadow-xl hover:scale-105"
                  >
                    Book a call <CalendarCheck className="h-5 w-5" />
                  </button>
                  <a
                    href="mailto:info@connecttly.com?subject=Inquiry%20from%20Connecttly%20Website&body=Hello%20Connecttly%20Team%2C%0A%0AI%20would%20like%20to%20get%20in%20touch%20regarding%3A%20%5Bservice%2C%20partnership%2C%20support%2C%20other%5D%0A%0AName%3A%20%5BYour%20Full%20Name%5D%0ACompany%20(if%20any)%3A%20%5BYour%20Company%20Name%5D%0APhone%2FWhatsApp%3A%20%5BYour%20Contact%20Number%5D%0A%0AService%20of%20Interest%3A%20%5Be.g.%2C%20Performance%20Marketing%2C%20Web%20Development%2C%20AI%20Tools%5D%0ABudget%20%2F%20Timeline%20(optional)%3A%20%5BApproximate%20Budget%20%2F%20Expected%20Timeline%5D%0AMessage%20%2F%20Query%3A%0A%5BType%20your%20details%20here...%5D%0A%0AThank%20you%2C%0A%5BYour%20Name%5D"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 font-medium transition-all"
                  >
                    Send a message
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

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

      {/* ===== CALENDLY SECTION ===== */}
      <section
        id="schedule"
        className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl">
          <ScrollAnimatedSection bgColor="bg-[rgb(241,241,233)]">
            <div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12">
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
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
                >
                  Book a strategy call
                </motion.h2>
                <motion.span
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mx-auto mt-3 block h-1.5 w-24 rounded-full bg-gradient-to-r from-[#0074ED] to-[#5B9BF8]"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
                >
                  Pick a time that works for you. We'll discuss goals, timelines, and the fastest path to impact.
                </motion.p>
              </motion.header>

              {/* Content Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12 lg:items-stretch"
              >
                {/* Calendly Widget (left, spans 2 cols) */}
                <div className="order-1 lg:order-1 lg:col-span-2">
                  <Card className="h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                    <div className="flex h-full flex-col">
                      <div className="flex-1 min-h-[700px]">
                        {/* Calendly inline widget */}
                        <div 
                          className="calendly-inline-widget" 
                          data-url={CALENDLY_URL}
                          style={{ minWidth: '320px', height: '700px', width: '100%' }}
                        />
                      </div>

                      {/* Helper text */}
                      <div className="border-t border-slate-200 bg-slate-50 p-3 text-center text-xs sm:text-sm text-slate-600">
                        Can't see the scheduler?{" "}
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-slate-400 hover:decoration-slate-700 font-medium"
                        >
                          Open Calendly in a new tab
                        </a>
                        .
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Contact details (right, spans 1 col) */}
                <div className="order-2 lg:order-2 lg:col-span-1">
                  <Card className="h-full flex flex-col relative overflow-hidden border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl sm:rounded-3xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 bg-white">
                    <CardHeader className="pb-4 px-6 sm:px-8 pt-6 sm:pt-8">
                      <CardTitle className="text-slate-900 text-xl sm:text-2xl font-bold">
                        Contact details
                      </CardTitle>
                      <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                        Prefer a direct line? We've got you covered.
                      </p>
                    </CardHeader>

                    <CardContent className="pt-2 px-6 sm:px-8 pb-6 sm:pb-8">
                      <div className="space-y-4 sm:space-y-6">
                        <a
                          href="mailto:info@connecttly.com"
                          className="flex items-center gap-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 hover:bg-slate-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                        >
                          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] text-white shadow-md">
                            <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm sm:text-base font-semibold text-slate-900">Email</div>
                            <div className="text-sm sm:text-base text-slate-600 break-all">info@connecttly.com</div>
                          </div>
                        </a>

                        <a
                          href="tel:+917905212348"
                          className="flex items-center gap-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 hover:bg-slate-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                        >
                          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] text-white shadow-md">
                            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm sm:text-base font-semibold text-slate-900">Phone / WhatsApp</div>
                            <div className="text-sm sm:text-base text-slate-600">+91 7905212348</div>
                          </div>
                        </a>

                        <div className="flex items-center gap-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] text-white shadow-md">
                            <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm sm:text-base font-semibold text-slate-900">Hours</div>
                            <div className="text-sm sm:text-base text-slate-600">Mon–Fri, 10:00–18:00 IST</div>
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-4 sm:pt-6">
                          <a
                            href="https://share.google/mTE2CHUwDjyY91Z7W"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-start gap-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 hover:bg-slate-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                          >
                            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] text-white shrink-0 shadow-md">
                              <MapPin className="h-6 w-6 sm:h-7 sm:w-7" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm sm:text-base font-semibold text-slate-900">Address (INDIA)</div>
                              <div className="text-sm sm:text-base text-slate-600 leading-relaxed mt-1">
                                Blr10-Vaishnavi, Signature No. 78/9, Bellandur, Bangalore, Bangalore South, Karnataka, India (560103)
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}
