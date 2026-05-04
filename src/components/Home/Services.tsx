import React from "react";
import { Link } from "react-router-dom";

// Import service images
import performanceMarketingImg from "@/components/Home/Images/performance marketing.svg";
import linkedinGrowthImg from "@/components/Home/Images/linkedin-growth.svg";
import contentCreativeImg from "@/components/Home/Images/content-creation.jpg";
import growthDemandImg from "@/components/Home/Images/growth-demand/growth-demand.jpg";
import analyticsAiImg from "@/components/Home/Images/analytics-ai/Analytics & Ai.jpg";
import brandReputationImg from "@/components/Home/Images/brand-reputation/brand-reputation.jpg";

export interface ServiceItem {
  icon?: React.ReactNode; // Keep for backward compatibility
  image?: string; // New image property
  title: string;
  description: string;
  path: string;
  colorClass: string; // e.g. "bg-blue-500"
}

// Image mapping based on service titles
const getServiceImage = (title: string): string => {
  const imageMap: { [key: string]: string } = {
    "Performance Marketing": performanceMarketingImg,
    "LinkedIn Growth": linkedinGrowthImg,
    "Content & Creative": contentCreativeImg,
    "Growth & Demand Generation": growthDemandImg,
    "Analytics & AI": analyticsAiImg,
    "Brand & Reputation": brandReputationImg,
  };
  
  return imageMap[title] || performanceMarketingImg; // fallback to performance marketing
};

interface ServicesProps {
  title: string;
  subtitle: string;
  services: ServiceItem[];
  sectionClassName?: string;
  darkDesktop?: boolean; // when true: cards styled for dark/black section backgrounds
}

/* ---------- Single Service Card ---------- */
function ServiceCard({
  item,
  darkDesktop,
}: {
  item: ServiceItem;
  darkDesktop: boolean;
}) {
  const wrapBase =
    "group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 transform hover:-translate-y-2";
  const wrapDark =
    "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-white/5";
  const wrapLight =
    "bg-gradient-to-br from-[#13314f] to-[#0A1F3D] ring-1 ring-white/10 hover:ring-white/20 shadow-lg hover:shadow-2xl";

  const titleCls = "text-white";
  const descCls = "text-white/70";
  const ctaCls = "text-white/60 group-hover:text-white/85";

  return (
    <Link to={item.path} className={`${wrapBase} ${darkDesktop ? wrapDark : wrapLight}`}>
      {/* Enhanced corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-[#0074ED]/20 to-[#24C5B9]/15 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100"
      />
      {/* Soft inner ring on hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: darkDesktop
            ? "inset 0 0 0 1px rgba(255,255,255,.08)"
            : "inset 0 0 0 1px rgba(2,6,23,.08)",
        }}
      />

      <div className="relative flex h-full flex-col items-center text-center">
        {/* Service Image */}
        <div className="mb-6 w-full">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={item.image || getServiceImage(item.title)}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
          </div>
        </div>

        <h3 className={`text-2xl font-bold mb-4 transition-colors ${titleCls}`}>
          {item.title}
        </h3>

        <p className={`leading-relaxed flex-grow text-base ${descCls} mb-6`}>
          {item.description}
        </p>

        <div className={`flex items-center text-sm font-semibold ${ctaCls} transform md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 ease-out`}>
          Learn more
          <svg
            className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-[-45deg]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Services Section ---------- */
export default function Services({
  title,
  subtitle,
  services,
  sectionClassName = "",
  darkDesktop = true,
}: ServicesProps) {
  return (
    <section className={`py-12 sm:py-16 ${sectionClassName}`}>
      <div className="mx-auto max-w-[1152px] px-4">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.14em] uppercase ${
            darkDesktop 
              ? "bg-white/10 border border-white/15 text-white/90"
              : "bg-slate-100 border border-slate-200 text-slate-700"
          }`}>
            Services
          </span>
          <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
            darkDesktop ? "text-white" : "text-slate-900"
          }`}>
            {title}
          </h2>
          <span className="mx-auto mt-3 block h-1.5 w-24 rounded-full bg-gradient-to-r from-[#24C5B9] to-[#0074ED]" />
          <p className={`mt-4 text-[15px] sm:text-lg max-w-3xl mx-auto ${
            darkDesktop ? "text-white/70" : "text-slate-600"
          }`}>
            {subtitle}
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} item={service} darkDesktop={darkDesktop} />
          ))}
        </div>
      </div>
    </section>
  );
}
