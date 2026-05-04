import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

// ====== Editable image paths (keep these 6 lines) ======
import blogimg      from "./Images/Group 37177.svg";
import templatesimg from "./Images/Group3717.svg";
import toolsimg     from "./Images/Group3717.svg";
import insightsimg  from "./Images/www.connecttly.com_ (1).png";
import communityimg from "./Images/www.connecttly.com_ (3).png";
import supportimg   from "./Images/www.connecttly.com_ (2).png";

const BLOG_IMG       = blogimg;
const TEMPLATES_IMG  = templatesimg;
const TOOLS_IMG      = toolsimg;
const INSIGHTS_IMG   = insightsimg;
const COMMUNITY_IMG  = communityimg;
const SUPPORT_IMG    = supportimg;
// =======================================================

/**
 * Brand-toned card backgrounds (darker, more vibrant tints that read well with #0A1F3D text)
 * Based on your palette:
 *  - Connecttly Blue  #0074ED
 *  - Deep Navy        #0A1F3D
 *  - Digital Aqua     #50D0FF
 *  - Vibrant Teal     #24C5B9
 *  - Lime Accent      #A6FF5F
 *  - Slate Gray       #6D7B8B
 */
const BRAND_TONES = {
  blue:  "bg-[#B8D4F7]", // darker tint of #0074ED
  navy:  "bg-[#BBD1ED]", // darker tint of #0A1F3D
  aqua:  "bg-[#B8DFF7]", // darker tint of #50D0FF
  teal:  "bg-[#B8E8DD]", // darker tint of #24C5B9
  lime:  "bg-[#D4F0B3]", // darker tint of #A6FF5F
  slate: "bg-[#C7D5E3]", // darker tint of #6D7B8B
} as const;

function CornerArrow() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" className="transition-all duration-300">
      <circle 
        cx="24" 
        cy="24" 
        r="23" 
        fill="transparent" 
        stroke="#0A1F3D" 
        strokeWidth="1"
        className="md:group-hover:fill-[#0A1F3D] transition-all duration-300"
      />
      <path
        d="M18 24l12 0m0 0l-6-6m6 6l-6 6"
        stroke="#0A1F3D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="md:group-hover:stroke-white md:group-hover:rotate-[-45deg] transition-all duration-300 origin-center"
      />
    </svg>
  );
}

type Resource = {
  title: string;
  desc: string;
  href: string;
  tone: string;     // bg + ring classes
  imageSrc: string;
  imageAlt?: string;
};

function ResourceTile({ item, className = "" }: { item: Resource; className?: string }) {
  // Check if this is the Templates card (horizontal layout)
  const isTemplatesCard = item.title === "Templates";
  // Check if this is the Blog card (needs larger image on desktop)
  const isBlogCard = item.title === "Blog";
  // Check if this is the Social Media Insights card (needs larger image on desktop)
  const isInsightsCard = item.title === "Social Media Insights";
  
  return (
    <Link
      to={item.href}
      className={[
        "group relative overflow-hidden rounded-2xl block h-full", // ensures full card background on mobile
        "transition-colors duration-300",
        "min-h-[208px] sm:min-h-[220px]",
        item.tone,
        className,
      ].join(" ")}
    >
      {isTemplatesCard ? (
        // Templates card - 2-column layout for desktop, vertical for mobile
        <div className="relative z-10 p-5 sm:p-6 flex h-full flex-col">
          {/* Content area - 2-column on desktop, vertical on mobile */}
          <div className="flex-1 flex flex-col md:flex-row md:items-start md:gap-6">
            {/* Left column - text content with button */}
            <div className="md:w-1/2">
              {/* Header with button on top right of first column */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-[17px] sm:text-[18px] md:text-[19px] font-semibold tracking-tight text-[#0A1F3D]">
                  {item.title}
                </h3>
                <span className="shrink-0">
                  <CornerArrow />
                </span>
              </div>
              
              <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-[#0A1F3D]/70 max-w-[50ch]">
                {item.desc}
              </p>
            </div>
            
            {/* Right column - image */}
            <div className="mt-4 md:mt-0 md:w-1/2">
              <div
                className={[
                  "relative ml-auto w-[88%] sm:w-[80%] md:w-[80%] md:ml-auto aspect-[5/3]",
                  "rounded-xl bg-transparent",
                  "origin-bottom-right rotate-[-6deg] translate-y-2 md:rotate-[-6deg] md:translate-y-2"
                ].join(" ")}
              >
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt || ""}
                  loading="lazy"
                  className={[
                    "h-full w-full object-cover select-none",
                    "will-change-transform",
                    "transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
                    "origin-bottom-right",
                    "md:group-hover:scale-[1.15] md:group-hover:-translate-y-1 md:group-hover:translate-x-[3px]",
                    "drop-shadow-[0_8px_18px_rgba(10,31,61,.18)] md:group-hover:drop-shadow-[0_18px_36px_rgba(10,31,61,.28)]"
                  ].join(" ")}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // All other cards - vertical layout with centered image
        <div className="relative z-10 p-5 sm:p-6 flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[17px] sm:text-[18px] md:text-[19px] font-semibold tracking-tight text-[#0A1F3D]">
              {item.title}
            </h3>
            <span className="shrink-0">
              <CornerArrow />
            </span>
          </div>

          <p className="mt-2 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-[#0A1F3D]/70 max-w-[50ch]">
            {item.desc}
          </p>

          {/* Tilted preview (image enlarges on hover) */}
          <div className="mt-auto pt-4">
            <div
              className={[
                "relative ml-auto w-[88%] sm:w-[80%]",
                (isBlogCard || isInsightsCard) ? "md:w-[95%] md:mr-[-4%]" : "md:w-[80%]", // Larger images positioned slightly left from previous position
                "aspect-[5/3]",
                "rounded-xl bg-transparent",
                "origin-bottom-right rotate-[-6deg] translate-y-2"
              ].join(" ")}
            >
              <img
                src={item.imageSrc}
                alt={item.imageAlt || ""}
                loading="lazy"
                className={[
                  "h-full w-full object-cover select-none",
                  "will-change-transform",
                  "transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
                  "origin-bottom-right",
                  "md:group-hover:scale-[1.15] md:group-hover:-translate-y-1 md:group-hover:translate-x-[3px]",
                  "drop-shadow-[0_8px_18px_rgba(10,31,61,.18)] md:group-hover:drop-shadow-[0_18px_36px_rgba(10,31,61,.28)]"
                ].join(" ")}
              />
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default function ResourcesShowcase() {
  // Map each card to a brand tone
  const resources: Resource[] = [
    {
      title: "See Benchmarks",
      desc: "Benchmark reports and platform updates so you always stay ahead in LinkedIn and social media strategy.",
      href: "/resources/blog",
      tone: BRAND_TONES.blue,
      imageSrc: BLOG_IMG, imageAlt: "Blog preview",
    },
    {
      title: "Use Free Tools",
      desc: "Free generators and builders to create posts, visuals, and tracking links effortlessly.",
      href: "/resources/tools",
      tone: BRAND_TONES.teal,
      imageSrc: TEMPLATES_IMG, imageAlt: "Templates preview",
    },
    {
      title: "View Live Metrics",
      desc: "Track our real-time business intelligence dashboard with revenue, customer, and marketing metrics updated monthly.",
      href: "/resources/insights",
      tone: BRAND_TONES.aqua,
      imageSrc: TOOLS_IMG, imageAlt: "Business metrics dashboard",
    },
    {
      title: "Talk To Us",
      desc: "Reach out for tailored consultations, partnerships, or quick answers from our expert team.",
      href: "/resources/support",
      tone: BRAND_TONES.slate,
      imageSrc: INSIGHTS_IMG, imageAlt: "Insights chart",
    },
    {
      title: "Download Templates",
      desc: "Proven LinkedIn templates, reporting frameworks, and campaign briefs to move faster and smarter.",
      href: "resources/templates",
      tone: BRAND_TONES.lime,
      imageSrc: COMMUNITY_IMG, imageAlt: "Community avatars",
    },
    {
      title: "Join Now",
      desc: "Join a network of B2B leaders, access exclusive events, and grow alongside ambitious professionals.",
      href: "/resources/community",
      tone: BRAND_TONES.navy,
      imageSrc: SUPPORT_IMG, imageAlt: "Support chat",
    },
  ];

  // Mobile carousel
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (i: number) =>
    trackRef.current?.scrollTo({ left: i * (trackRef.current?.clientWidth || 0), behavior: "smooth" });

  return (
    <div className="mx-auto max-w-[1152px]">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.14em] uppercase bg-slate-100 border border-slate-200 text-slate-700">
            Resources
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Fuel your social media success
          </h2>
          <span className="mx-auto mt-3 block h-1.5 w-24 rounded-full bg-gradient-to-r from-[#24C5B9] to-[#0074ED]" />
          <p className="mt-4 text-[15px] sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Everything you need to level up your social strategy-in one place.
          </p>
        </header>

        {/* Desktop / Tablet grid (unchanged) */}
        <div className="hidden md:grid grid-cols-12 auto-rows-[220px] grid-flow-dense gap-6">
          <ResourceTile item={resources[0]} className="md:col-span-4 md:row-span-2 md:col-start-1 md:row-start-1" />
          <ResourceTile item={resources[1]} className="md:col-span-8 md:row-span-1 md:col-start-5 md:row-start-1" />
          <ResourceTile item={resources[2]} className="md:col-span-4 md:row-span-1 md:col-start-5 md:row-start-2" />
          <ResourceTile item={resources[3]} className="md:col-span-4 md:row-span-2 md:col-start-9 md:row-start-2" />
          <ResourceTile item={resources[4]} className="md:col-span-4 md:row-span-1 md:col-start-1 md:row-start-3" />
          <ResourceTile item={resources[5]} className="md:col-span-4 md:row-span-1 md:col-start-5 md:row-start-3" />
        </div>

        {/* Mobile carousel (unchanged layout; backgrounds now brand-toned) */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth gap-4"
            aria-label="Resources carousel"
          >
            {resources.map((r, i) => (
              <div key={i} className="snap-start shrink-0 w-[88%]">
                <ResourceTile item={r} />
              </div>
            ))}
          </div>

          {/* Dots + arrows */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              className="rounded-full border border-black/10 px-3 py-1 text-sm text-[#0A1F3D]/70"
              onClick={() => scrollTo(Math.max(0, index - 1))}
              aria-label="Previous"
            >
              ‹
            </button>
            <div className="flex items-center gap-1.5">
              {resources.map((_, i) => (
                <span
                  key={i}
                  className={[
                    "h-2 w-2 rounded-full",
                    index === i ? "bg-[#0074ED]" : "bg-[#0A1F3D]/25",
                  ].join(" ")}
                />
              ))}
            </div>
            <button
              className="rounded-full border border-black/10 px-3 py-1 text-sm text-[#0A1F3D]/70"
              onClick={() => scrollTo(Math.min(resources.length - 1, index + 1))}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
    </div>
  );
}
