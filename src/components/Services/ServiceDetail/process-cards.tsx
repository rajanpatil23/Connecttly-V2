import React from 'react';
import { motion } from 'framer-motion';

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ProcessCardsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  steps: ProcessStep[];
  accentColor?: string;
}

export function ProcessCards({ 
  eyebrow = "Our Process",
  heading,
  subheading = "How We Drive Results",
  description = "Our proven process ensures maximum ROI and campaign success",
  steps,
  accentColor = "from-[#0074ED] to-[#5B9BF8]"
}: ProcessCardsProps) {

  // Uniform color scheme for all cards - matching "What We Offer" feature cards
  const colors = [
    { border: "border-white", bg: "bg-white", badge: "bg-[#3369fd]" },
    { border: "border-white", bg: "bg-white", badge: "bg-[#3369fd]" },
    { border: "border-white", bg: "bg-white", badge: "bg-[#3369fd]" },
    { border: "border-white", bg: "bg-white", badge: "bg-[#3369fd]" }
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-slate-100 border border-slate-200 text-slate-700 mb-4">
            {eyebrow}
          </span>
          {heading && (
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {heading}
            </h2>
          )}
          {subheading && (
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${heading ? 'mt-2' : ''}`}>
              {subheading}
            </h2>
          )}
          <motion.span 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`mx-auto mt-3 mb-4 block h-1.5 w-24 rounded-full bg-gradient-to-r ${accentColor}`}
          />
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Process Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ${steps.length >= 4 ? 'lg:grid-cols-4' : steps.length === 3 ? 'lg:grid-cols-3' : ''}`}>
          {steps.map((step, index) => {
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Clean Card without borders */}
                <div className={`${color.bg} rounded-3xl p-8 h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                  {/* Step Badge */}
                  <div className="flex justify-start mb-4">
                    <div className={`${color.badge} text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider`}>
                      STEP {step.step}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed flex-grow text-left">
                    {step.description}
                  </p>

                  {/* Decorative element */}
                  <div className={`mt-6 h-1 w-16 ${color.badge} rounded-full`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
