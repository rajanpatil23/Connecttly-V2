import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface ScrollBasedProcessAccordionProps {
  steps: ProcessStep[];
  heading?: string;
  subheading?: string;
}

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive }: { item: ProcessStep; isActive: boolean }) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { 
          e.currentTarget.onerror = null; 
          e.currentTarget.src = 'https://placehold.co/400x450/4285F4/ffffff?text=' + encodeURIComponent(item.step);
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>

      {/* Step Number Badge */}
      <div className={`
        absolute w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm
        flex items-center justify-center text-white font-bold text-lg
        transition-all duration-500
        ${isActive ? 'top-6 left-6 scale-100 opacity-100' : 'top-6 left-1/2 -translate-x-1/2 scale-75 opacity-70'}
      `}>
        {item.step}
      </div>

      {/* Content */}
      <div className={`
        absolute inset-0 flex flex-col justify-end p-6
        transition-all duration-500
        ${isActive ? 'opacity-100' : 'opacity-0'}
      `}>
        <h3 className="text-2xl font-bold text-white mb-2">
          {item.title}
        </h3>
        <p className="text-white/90 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Vertical Title (when inactive) */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? 'opacity-0 scale-95'
              : 'opacity-100 scale-100 bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main Component ---
export function ScrollBasedProcessAccordion({ 
  steps, 
  heading = "Our Process",
  subheading = "How We Drive Results"
}: ScrollBasedProcessAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Calculate which step should be active based on scroll progress
      const stepIndex = Math.min(
        Math.floor(latest * steps.length),
        steps.length - 1
      );
      setActiveIndex(Math.max(0, stepIndex));
    });

    return () => unsubscribe();
  }, [scrollYProgress, steps.length]);

  return (
    <div ref={containerRef} className="bg-white font-sans py-12 md:py-24 min-h-[600vh]">
      <div className="sticky top-0 h-screen flex items-center">
        <section className="container mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.14em] uppercase bg-orange-100 border border-orange-200 text-orange-700"
            >
              {heading}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
            >
              {subheading}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0"
            >
              Scroll down to see each step of our proven process. We guide you through every phase to ensure maximum ROI and campaign success.
            </motion.p>
            
            {/* Active Step Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {steps[activeIndex].step}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {steps[activeIndex].title}
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {steps[activeIndex].description}
              </p>
            </motion.div>
          </div>

          {/* Right Side: Scroll-Based Accordion */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full md:w-1/2"
          >
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {steps.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                />
              ))}
            </div>
          </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
