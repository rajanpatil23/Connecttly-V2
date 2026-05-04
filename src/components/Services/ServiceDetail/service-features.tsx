import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string; // e.g., "from-blue-500 to-cyan-500"
}

interface ServiceFeaturesProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  features: FeatureItem[];
  accentColor?: string; // e.g., "from-[#0074ED] to-[#5B9BF8]"
}

export function ServiceFeatures({
  eyebrow = "What We Offer",
  heading,
  description,
  features,
  accentColor = "from-[#4285F4] to-[#5B9BF8]",
}: ServiceFeaturesProps) {
  return (
    <div>
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
          {heading}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </motion.header>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const gradient = feature.gradient || accentColor;
          
          return (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center"
            >
              {/* Icon with gradient background */}
              <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:scale-110 transition-transform duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
