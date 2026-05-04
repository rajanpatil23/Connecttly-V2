import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface Tool {
  name: string;
  logo: string;
}

interface ToolStackSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  tools: Tool[];
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
}

export default function ToolStackSection({
  eyebrow = "Our Tool Stack",
  title,
  description,
  tools,
  ctaText = "Get Started",
  ctaLink = "/resources/support",
  bgColor = "bg-white dark:bg-gray-900",
}: ToolStackSectionProps) {
  // Limit to 12 tools maximum
  const displayTools = tools.slice(0, 12);
  
  return (
    <section className={`max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center border border-gray-200 dark:border-gray-700 p-8 md:p-12 rounded-3xl ${bgColor}`}>
      {/* Left Side */}
      <div className="text-center md:text-left">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="uppercase text-xs font-semibold mb-2"
          style={{ color: "#0A6B5E" }}
        >
          {eyebrow}
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mt-2 mb-3 text-slate-900"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300 mb-5 text-base leading-relaxed"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to={ctaLink}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3369fd] hover:bg-[#2557e8] text-white px-8 py-3.5 font-medium shadow-[0_10px_24px_rgba(51,105,253,.25)] transition-all hover:shadow-xl hover:scale-105"
          >
            {ctaText} <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      {/* Right Side - 2 rows of 6 icons */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.6, 
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center"
      >
        {displayTools.map((tool, idx) => (
          <div
            key={idx}
            className="group relative w-16 h-16 p-2.5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            title={tool.name}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-300" />
            
            <img
              src={tool.logo}
              alt={tool.name}
              className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
