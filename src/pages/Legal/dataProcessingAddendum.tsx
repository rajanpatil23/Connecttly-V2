import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const LAST_UPDATED = "September 2025";
const LEGAL_EMAIL = "info@connecttly.com";

export default function DataProcessingAddendum() {
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
          <div id="top" className="container px-4 py-12 sm:py-16">
            <div className="max-w-6xl mx-auto">
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
                        <BreadcrumbLink asChild>
                          <Link to="/legal" className="text-slate-600 hover:text-slate-900">Legal</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-slate-400" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-slate-900 font-medium">Data Processing Addendum</BreadcrumbPage>
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
                    Data Processing Addendum (DPA)
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    variants={itemVariants}
                    className="mt-3 text-lg text-slate-600 max-w-3xl mx-auto"
                  >
                    Our data processor commitments for customers who require a DPA.
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
        
        /* Anchor offset for smooth scrolling */
        #dpa, #contact,
        #dpa-scope, #dpa-security, #dpa-subprocessors, #dpa-transfers, #dpa-rights, #dpa-get {
          scroll-margin-top: 96px;
        }
      `}</style>

      {/* =================== CONTENT SECTION =================== */}
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
            className="relative rounded-3xl bg-white p-6 sm:p-10 lg:p-14 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          >
            <div className="prose prose-slate max-w-none">
              <div className="border-b border-slate-200 pb-6 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Data Processing Addendum (DPA)</h2>
                <p className="text-sm text-slate-600">Our data processor commitments for customers who require a DPA.</p>
              </div>

              <p className="text-slate-700 leading-relaxed">
                Connecttly offers a Data Processing Addendum (DPA) for customers who process personal data with us and require
                specific contractual commitments under data protection laws (e.g., GDPR).
              </p>

              <h3 id="dpa-scope" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Scope & Roles
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong className="text-slate-900">Roles:</strong> Customer (Controller) and Connecttly (Processor) for processing personal data under the Agreement.
                </li>
                <li>
                  <strong className="text-slate-900">Purpose:</strong> Provision of services as described in the main agreement and applicable order forms.
                </li>
              </ul>

              <h3 id="dpa-security" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Security Measures
              </h3>
              <p className="text-slate-700 leading-relaxed">
                We implement organizational and technical safeguards appropriate to the risk, including access controls, encryption
                in transit where applicable, and vendor due diligence for subprocessors.
              </p>

              <h3 id="dpa-subprocessors" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Subprocessors
              </h3>
              <p className="text-slate-700 leading-relaxed">
                We may engage vetted subprocessors to support service delivery. We require each subprocessor to implement
                appropriate security and confidentiality obligations.
              </p>

              <h3 id="dpa-transfers" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                International Data Transfers
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Where cross-border transfers occur, we will support appropriate transfer mechanisms as required by applicable law.
              </p>

              <h3 id="dpa-rights" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Data Subject Requests
              </h3>
              <p className="text-slate-700 leading-relaxed">
                We assist customers in responding to data subject requests, within the scope and limitations of our role as a processor.
              </p>

              <h3 id="dpa-get" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Get a Copy
              </h3>
              <p className="text-slate-700 leading-relaxed">
                To request a copy of our DPA (and current subprocessor list), please email{" "}
                <a className="text-[#0074ED] underline hover:text-[#0066cc]" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
              </p>

              <p className="mt-6 text-xs text-slate-500 italic">
                <em>Note:</em> This section summarizes our standard DPA terms and is provided for informational purposes only. The executed DPA governs.
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="contact"
            className="flex flex-col items-center gap-4 text-center mt-10"
          >
            <p className="text-slate-600">
              Need something specific, or have a question about data processing?{" "}
              <a className="text-[#0074ED] underline hover:text-[#0066cc]" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 font-medium transition-all hover:scale-105"
              >
                Go to Home
              </Link>
              <Link
                to="/resources/support"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 font-medium transition-all"
              >
                Contact Support
              </Link>
              <a
                href="#top"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 px-6 py-3 text-sm font-medium transition-all"
              >
                Back to top
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
