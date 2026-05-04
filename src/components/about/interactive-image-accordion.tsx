import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, Target, TrendingUp, Palette, Lightbulb, Zap, LineChart, Eye, FileText, Headphones, Users } from 'lucide-react';

// Brand-toned backgrounds matching Home page resources
const BRAND_TONES = {
  blue: "bg-[#B8D4F7]",
  navy: "bg-[#BBD1ED]",
  aqua: "bg-[#B8DFF7]",
  teal: "bg-[#B8E8DD]",
  lime: "bg-[#D4F0B3]",
};

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Data-Driven Strategy',
    description: 'We leverage analytics and insights to create strategies that deliver measurable results and ROI.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    bgColor: BRAND_TONES.blue,
    iconColor: "#0A5A8A",
    points: [
      { icon: BarChart3, text: 'Advanced analytics and performance tracking' },
      { icon: Target, text: 'Strategic planning based on data insights' },
      { icon: TrendingUp, text: 'Continuous optimization for maximum ROI' }
    ]
  },
  {
    id: 2,
    title: 'Creative Excellence',
    description: 'Our creative team crafts compelling content that resonates with your audience and drives engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop',
    bgColor: BRAND_TONES.teal,
    iconColor: "#0A6B5E",
    points: [
      { icon: Palette, text: 'Professional design and brand identity' },
      { icon: Lightbulb, text: 'Innovative content that captures attention' },
      { icon: Zap, text: 'Fast turnaround without compromising quality' }
    ]
  },
  {
    id: 3,
    title: 'Performance Marketing',
    description: 'Optimized campaigns across all channels to maximize your marketing performance and growth.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    bgColor: BRAND_TONES.blue,
    iconColor: "#0A5A8A",
    points: [
      { icon: Target, text: 'Multi-channel campaign management' },
      { icon: LineChart, text: 'Real-time performance monitoring' },
      { icon: TrendingUp, text: 'Scalable strategies for sustainable growth' }
    ]
  },
  {
    id: 4,
    title: 'Transparent Reporting',
    description: 'Clear, detailed reports that keep you informed about campaign performance and business impact.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    bgColor: BRAND_TONES.lime,
    iconColor: "#5A7A0A",
    points: [
      { icon: FileText, text: 'Comprehensive reports with actionable insights' },
      { icon: Eye, text: 'Full visibility into campaign metrics' },
      { icon: BarChart3, text: 'Regular updates and performance reviews' }
    ]
  },
  {
    id: 5,
    title: 'Dedicated Support',
    description: 'A committed team ready to assist you at every step of your digital marketing journey.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    bgColor: BRAND_TONES.blue,
    iconColor: "#0A3A52",
    points: [
      { icon: Headphones, text: '24/7 support from dedicated experts' },
      { icon: Users, text: 'Collaborative approach to your success' },
      { icon: Zap, text: 'Quick response times and proactive solutions' }
    ]
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter, onClick }) => {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive 
          ? 'md:w-[400px] w-full md:h-[450px] h-[400px]' 
          : 'md:w-[60px] w-full md:h-[450px] h-[60px]'}
        ${item.bgColor}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {/* Content - fades in after card expands to 50% */}
      <div 
        className="absolute inset-0 p-4 md:p-6 flex flex-col" 
        style={{ 
          pointerEvents: isActive ? 'auto' : 'none'
        }}
      >
        {/* Image - fade in only - fixed dimensions */}
        <div 
          className="mb-3 md:mb-4 w-full rounded-xl overflow-hidden transition-opacity duration-500"
          style={{
            height: '140px',
            maxWidth: '100%',
            opacity: isActive ? 1 : 0,
            transitionDelay: isActive ? '350ms' : '0ms'
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = 'https://placehold.co/400x160/2d3748/ffffff?text=Image'; 
            }}
          />
        </div>
        
        {/* Title - fade in + slide up */}
        <h3 
          className="text-lg md:text-xl font-bold text-[#0A1F3D] mb-2 transition-all duration-500"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: isActive ? '350ms' : '0ms'
          }}
        >
          {item.title}
        </h3>
        
        {/* Description - fade in + slide up */}
        <p 
          className="text-xs md:text-sm text-[#0A1F3D]/70 leading-relaxed mb-3 md:mb-4 transition-all duration-500"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: isActive ? '400ms' : '0ms'
          }}
        >
          {item.description}
        </p>
        
        {/* 3 Points with icons - fade in + slide up */}
        <ul className="space-y-2 md:space-y-2.5 mt-auto">
          {item.points.map((point, idx) => {
            const PointIcon = point.icon;
            return (
              <li 
                key={idx} 
                className="flex items-start gap-2 md:gap-2.5 text-[#0A1F3D]/80 transition-all duration-500"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: isActive ? `${450 + (idx * 50)}ms` : '0ms'
                }}
              >
                <span className="mt-0.5 flex-shrink-0">
                  <PointIcon className="h-3.5 w-3.5 md:h-4 md:w-4" style={{ color: item.iconColor }} />
                </span>
                <span className="text-[11px] md:text-xs leading-relaxed">{point.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Vertical Title - visible when inactive - desktop only, horizontal on mobile */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? 'none' : 'auto' }}
      >
        <span className="text-[#0A1F3D] text-base md:text-lg font-semibold whitespace-nowrap w-auto text-center md:text-left md:bottom-24 md:left-1/2 md:-translate-x-1/2 md:rotate-90 md:absolute">
          {item.title}
        </span>
      </div>
    </div>
  );
};


// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemInteraction = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="font-sans">
      <section className="container mx-auto px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Your Partner in Digital Growth
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 max-w-xl mx-auto">
              We combine strategic thinking, creative excellence, and data-driven execution to deliver measurable results for your business.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/resources/support"
                className="inline-flex items-center gap-2 bg-[#3369fd] hover:bg-[#2557e8] text-white font-semibold px-6 md:px-8 py-3 rounded-full shadow-[0_10px_24px_rgba(51,105,253,.25)] transition-colors duration-300 text-sm md:text-base"
              >
                Work with Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2">
            {/* Vertical on mobile, horizontal on desktop */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemInteraction(index)}
                  onClick={() => handleItemInteraction(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
