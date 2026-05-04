import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface ModernProcessTimelineProps {
  steps: ProcessStep[];
  heading?: string;
  subheading?: string;
}

export function ModernProcessTimeline({ 
  steps, 
  heading = "Our Process",
  subheading = "How We Drive Results"
}: ModernProcessTimelineProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-orange-100 border border-orange-200 text-orange-700 mb-4">
            {heading}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {subheading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our proven 4-step process ensures maximum ROI and campaign success
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                  
                  {/* Image Side */}
                  <div className="w-full md:w-1/2">
                    <div className="relative group">
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3]">
                        <img
                          src={step.imageUrl}
                          alt={step.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { 
                            e.currentTarget.onerror = null; 
                            e.currentTarget.src = 'https://placehold.co/600x450/4285F4/ffffff?text=' + encodeURIComponent(step.step);
                          }}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        
                        {/* Step Number Badge on Image */}
                        <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                          <span className="text-2xl font-bold bg-gradient-to-br from-orange-500 to-orange-600 bg-clip-text text-transparent">
                            {step.step}
                          </span>
                        </div>
                      </div>

                      {/* Decorative Element */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${isEven ? '-right-6' : '-left-6'} w-12 h-12 rounded-full bg-orange-500 shadow-lg flex items-center justify-center z-10`}>
                        <ArrowRight className={`w-6 h-6 text-white ${isEven ? '' : 'rotate-180'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2">
                    <div className={`${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
                      {/* Step Number (Mobile) */}
                      <div className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-xl mb-4 shadow-lg">
                        {step.step}
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Key Points (Optional Enhancement) */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">Data-driven strategy and research</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">Continuous optimization and testing</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">Transparent reporting and insights</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connecting Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full h-16 w-0.5 bg-gradient-to-b from-orange-300 to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="/resources/support"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started Today
            </a>
            <a
              href="/resources/support"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-orange-500 transition-all duration-300"
            >
              Schedule a Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
