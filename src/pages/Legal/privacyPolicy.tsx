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

export default function PrivacyPolicy() {
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
                        <BreadcrumbPage className="text-slate-900 font-medium">Privacy Policy</BreadcrumbPage>
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
                    Privacy Policy
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    variants={itemVariants}
                    className="mt-3 text-lg text-slate-600 max-w-3xl mx-auto"
                  >
                    Clear information about how we collect, use, and protect your personal information.
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
        #privacy, #contact,
        #privacy-collection, #privacy-use, #privacy-sharing-security, #privacy-changes, #privacy-contact {
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
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Privacy Policy</h2>
                <p className="text-sm text-slate-600">How we collect, use, and protect your information.</p>
              </div>

              <p className="text-slate-700 leading-relaxed">
                At Connecttly, we place a high value on the privacy and security of our users.
                This Privacy Policy explains how we gather, utilize, and safeguard your personal
                information when you engage with our Website (www.connecttly.com). By using the
                Website, you agree to this Policy.
              </p>
              <p className="text-slate-700 leading-relaxed">
                We value your trust. To honor that trust, Connecttly adheres to ethical standards
                in gathering, using, and safeguarding any information you provide. Syntheoconnect
                Marketing LLP (operating as "Connecttly"), incorporated in India, is a marketing
                technology company focused on digital growth and performance solutions. This Policy
                governs your use of the Connecttly website, applications, and related services. If
                you do not agree, please do not use our platforms or services.
              </p>

              <h3 id="privacy-collection" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Information We Collect
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong className="text-slate-900">Personal Information:</strong> When you sign up, request information, or interact with our
                  services, we may collect details such as your name, email address, and other relevant information.
                </li>
                <li>
                  <strong className="text-slate-900">Log Data:</strong> We automatically collect data like IP address, browser type, operating system,
                  referring URLs, and timestamps to analyze trends and administer the site.
                </li>
                <li>
                  <strong className="text-slate-900">Cookies:</strong> We use cookies and similar technologies to enhance your experience, analyze usage
                  patterns, and personalize content. You can manage cookies via your browser settings.
                </li>
              </ul>

              <h3 id="privacy-use" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                How We Use Information
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong className="text-slate-900">Personalization:</strong> Tailoring content, recommendations, and services based on your interests.
                </li>
                <li>
                  <strong className="text-slate-900">Communication:</strong> Sending updates, newsletters, or promotional materials (you can opt out at any time).
                </li>
                <li>
                  <strong className="text-slate-900">Analytics & Improvements:</strong> Reviewing aggregated data to enhance our services and develop new features.
                </li>
              </ul>

              <h3 id="privacy-sharing-security" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Data Sharing & Security
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong className="text-slate-900">Third-Party Service Providers:</strong> We may share information with vetted providers who support our Website and
                  services and are committed to confidentiality.
                </li>
                <li>
                  <strong className="text-slate-900">Legal Requirements:</strong> We may disclose information where required by law or to protect rights, property, or safety.
                </li>
                <li>
                  <strong className="text-slate-900">Security:</strong> We implement safeguards to protect personal information; however, no method of transmission
                  or storage is 100% secure.
                </li>
              </ul>

              <h3 id="privacy-changes" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Changes to this Privacy Policy
              </h3>
              <p className="text-slate-700 leading-relaxed">
                We may update this Policy periodically. Updates will be posted here with an adjusted "Last updated" date. Please review
                this page from time to time.
              </p>

              <h3 id="privacy-contact" className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
                Contact
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Questions about this Policy or our data practices? Email{" "}
                <a className="text-[#0074ED] underline hover:text-[#0066cc]" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
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
              Need something specific, or have a privacy question?{" "}
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
