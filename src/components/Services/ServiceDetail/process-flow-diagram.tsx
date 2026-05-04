import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Target, Lightbulb, FileText, 
  Rocket, BarChart3, TrendingUp, Zap,
  ArrowRight, CheckCircle2, Settings
} from 'lucide-react';

interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  details: string[];
}

interface ProcessFlowDiagramProps {
  heading?: string;
  subheading?: string;
}

export function ProcessFlowDiagram({ 
  heading = "Our Process",
  subheading = "How We Drive Results"
}: ProcessFlowDiagramProps) {
  
  const steps: ProcessStep[] = [
    {
      id: 1,
      step: "01",
      title: "Strategy & Research",
      description: "Deep dive into your business, competitors, and target audience",
      icon: Search,
      color: "from-blue-500 to-blue-600",
      details: [
        "Market & competitor analysis",
        "Keyword research & selection",
        "Audience targeting strategy",
        "Budget allocation planning"
      ]
    },
    {
      id: 2,
      step: "02",
      title: "Campaign Setup",
      description: "Build optimized campaigns with compelling ad copy and targeting",
      icon: Settings,
      color: "from-purple-500 to-purple-600",
      details: [
        "Campaign structure design",
        "Ad copy creation & testing",
        "Landing page optimization",
        "Conversion tracking setup"
      ]
    },
    {
      id: 3,
      step: "03",
      title: "Launch & Monitor",
      description: "Launch campaigns and monitor performance in real-time",
      icon: Rocket,
      color: "from-orange-500 to-orange-600",
      details: [
        "Campaign launch execution",
        "Real-time performance monitoring",
        "Quality score optimization",
        "Initial data collection"
      ]
    },
    {
      id: 4,
      step: "04",
      title: "Optimize & Scale",
      description: "Continuous optimization and scaling of winning campaigns",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      details: [
        "A/B testing & refinement",
        "Bid strategy optimization",
        "Budget reallocation",
        "Performance scaling"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 md:py-24">
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

        {/* Process Flow - Desktop */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-orange-200 to-green-200"></div>
            
            {/* Steps */}
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex flex-col items-center"
                  >
                    {/* Icon Circle */}
                    <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${step.color} p-1 shadow-2xl mb-6 group hover:scale-105 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center p-6">
                        <Icon className="w-16 h-16 mb-3" style={{ color: step.color.split(' ')[0].replace('from-', '#') }} />
                        <span className={`text-2xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 text-center">
                        {step.description}
                      </p>
                      
                      {/* Details List */}
                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 text-${step.color.split('-')[1]}-500`} />
                            <span className="text-xs text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow (except last) */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-24 -translate-y-1/2" style={{ left: `${(index + 1) * 25 - 2}%` }}>
                        <ArrowRight className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process Flow - Mobile/Tablet */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title & Step */}
                    <div className="flex-1">
                      <span className={`text-sm font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                        {step.step}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-gray-300 to-gray-200 rounded-full"></div>
                  </div>
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
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Let's discuss how our proven process can drive results for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href="/resources/support"
                className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get a Free Audit
              </a>
              <a
                href="/resources/support"
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
