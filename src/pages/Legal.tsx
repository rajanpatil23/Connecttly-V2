import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, LifeBuoy, ShieldCheck, ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FileText, Shield, Database } from "lucide-react";

const LAST_UPDATED = "September 2025";

export default function Legal() {
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
      {/* =================== HERO =================== */}
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
            <div className="max-w-5xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Breadcrumb */}
                <motion.div variants={itemVariants} className="mb-6">
                  <Breadcrumb>
                    <BreadcrumbList className="text-slate-600">
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to="/" className="text-slate-600 hover:text-slate-900">Home</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-slate-400" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-slate-900 font-medium">Legal</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </motion.div>

                {/* Center-aligned content */}
                <div className="text-center">
                  {/* Heading */}
                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
                  >
                    Legal Information
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    variants={itemVariants}
                    className="mt-3 text-lg text-slate-600 max-w-3xl mx-auto"
                  >
                    Clear information about how we handle your data, our terms of service, and our data
                    processing practices.
                  </motion.p>

                  {/* Last Updated */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-4 text-sm text-slate-500"
                  >
                    Last updated: {LAST_UPDATED}
                  </motion.div>
                </div>
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

      {/* =================== CARDS SECTION =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative rounded-3xl bg-[rgb(241,241,233)] p-6 sm:p-10 lg:p-14"
          >
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-10 sm:mb-12"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.14em] uppercase bg-slate-100 border border-slate-200 text-slate-700"
              >
                Legal Documents
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
              >
                Our Legal Framework
              </motion.h2>
              <motion.span
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mx-auto mt-3 block h-1.5 w-24 rounded-full bg-gradient-to-r from-[#0074ED] to-[#5B9BF8]"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
              >
                Explore our comprehensive legal documentation to understand how we protect your data and ensure compliance with industry standards.
              </motion.p>
            </motion.header>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              
              {/* Privacy Policy Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="h-full flex flex-col bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                      <Shield className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy Policy</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    How we collect, use, and protect your personal information.
                  </p>
                </div>
                <div className="text-center flex flex-col flex-1">
                  <p className="mb-6 text-sm text-slate-600 leading-relaxed">
                    Learn about our data collection practices, how we use your information, and the measures we take to keep your data secure and protected.
                  </p>
                  <Link
                    to="/legal/privacy-policy"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 font-medium transition-all hover:scale-105"
                  >
                    Read Privacy Policy
                  </Link>
                </div>
              </motion.div>

              {/* Terms & Conditions Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="h-full flex flex-col bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                      <FileText className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Terms & Conditions</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Your use of our website and related online services
                  </p>
                </div>
                <div className="text-center flex flex-col flex-1">
                  <p className="mb-6 text-sm text-slate-600 leading-relaxed">
                    Understand the terms that govern your use of our services, including user responsibilities and service limitations for all users.
                  </p>
                  <Link
                    to="/legal/terms-conditions"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 font-medium transition-all hover:scale-105"
                  >
                    Read T&C
                  </Link>
                </div>
              </motion.div>

              {/* Data Processing Addendum Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="h-full flex flex-col bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                      <Database className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Data Processing Addendum</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Our data processor commitments for enterprise customers.
                  </p>
                </div>
                <div className="text-center flex flex-col flex-1">
                  <p className="mb-6 text-sm text-slate-600 leading-relaxed">
                    For customers who require specific contractual commitments under data protection laws like GDPR and other compliance requirements.
                  </p>
                  <Link
                    to="/legal/data-processing-addendum"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 font-medium transition-all hover:scale-105"
                  >
                    Read DPA
                  </Link>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* =================== CTA SECTION =================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative rounded-3xl bg-[#B8E8DD] p-6 sm:p-8"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#0A6B5E]/20 bg-[#0A6B5E]/10 px-3 py-1 text-xs text-[#0A6B5E] font-semibold"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Trust & Compliance Helpdesk
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Need Legal Assistance?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-2 max-w-2xl text-slate-600"
              >
                Quick guidance on Privacy, Terms, and Data Processing. Our team responds fast and keeps it simple.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 grid w-full gap-3 sm:grid-cols-2 max-w-2xl"
              >
                {/* Contact Support */}
                <Link
                  to="/resources/support"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 font-medium transition-all hover:scale-105"
                >
                  <LifeBuoy className="h-5 w-5" />
                  Contact Support
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* Email Legal */}
                <a
                  href="mailto:info@connecttly.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 font-medium transition-all"
                >
                  <Mail className="h-5 w-5" />
                  Email Legal Team
                </a>
              </motion.div>

              {/* Info Line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 text-xs text-slate-600"
              >
                Typical response time: <span className="text-slate-900 font-medium">under 24 hours</span> (Mon–Fri, IST) | Aligned with Advertising Standards Council of India (ASCI)
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
