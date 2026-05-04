// ResourcesShowcase.tsx
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// ====== Updated image imports from Resources folder ======
import blogimg      from "../../../public/images/home/Resources/Blog.svg";
import templatesimg from "../../../public/images/home/Resources/Template.svg";
import toolsimg     from "../../../public/images/home/Resources/Free tool.svg";
import insightsimg  from "../../../public/images/home/Resources/Live Metrics.svg";
import communityimg from "../../../public/images/home/Resources/Community.svg";
import supportimg   from "../../../public/images/home/Resources/Contact.svg";

const BLOG_IMG       = blogimg;
const TEMPLATES_IMG  = templatesimg;
const TOOLS_IMG      = toolsimg;
const INSIGHTS_IMG   = insightsimg;
const COMMUNITY_IMG  = communityimg;
const SUPPORT_IMG    = supportimg;
// =========================================================

// Brand colors aligned to your palette - using the 3 service card colors
const BG_COLORS = [
  "bg-gradient-to-b from-[#B8D4F7] to-[#E8F2FC]", // Blue (Performance Marketing, Content & Creative)
  "bg-gradient-to-b from-[#B8E8DD] to-[#E8F7F3]", // Teal (LinkedIn Growth, AI & Analytics)
  "bg-gradient-to-b from-[#D4F0B3] to-[#EDF9DD]", // Green (Growth & Demand, Brand & Reputation)
];

const COLORS = {
  navy: "#0A1F3D",
  blue: "#0074ED",
};

type TabKey =
  | "benchmarks"
  | "tools"
  | "metrics"
  | "support"
  | "templates"
  | "community";

type Tab = {
  key: TabKey;
  label: string;            // pill text
  title: string;            // H1
  desc: string;             // paragraph
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
  img: { src: string; alt: string };
};

// Derived from your current content - Tab labels match card titles
const TABS: Tab[] = [
  {
    key: "benchmarks",
    label: "Blog",
    title: "Blog",
    desc:
      "Benchmark reports and platform updates so you always stay ahead in LinkedIn and social media strategy.",
    primary: { label: "Read Updates", to: "/resources/blog" },
    secondary: { label: "Learn More", to: "/resources/blog" },
    img: { src: BLOG_IMG, alt: "Blog preview" },
  },
  {
    key: "tools",
    label: "Free Tools",
    title: "Free Tools",
    desc:
      "Free generators and builders to create posts, visuals, and tracking links effortlessly.",
    primary: { label: "Use Tools", to: "/resources/tools" },
    secondary: { label: "Browse All", to: "/resources/tools" },
    img: { src: TOOLS_IMG, alt: "Free Tools preview" },
  },
  {
    key: "templates",
    label: "Templates",
    title: "Templates",
    desc:
      "Proven LinkedIn templates, reporting frameworks, and campaign briefs to move faster and smarter.",
    primary: { label: "Get Templates", to: "/resources/templates" },
    secondary: { label: "Preview", to: "/resources/templates" },
    img: { src: TEMPLATES_IMG, alt: "Templates preview" },
  },
  {
    key: "community",
    label: "Community",
    title: "Community",
    desc:
      "Join a network of B2B leaders, access exclusive events, and grow alongside ambitious professionals.",
    primary: { label: "Join Community", to: "/resources/community" },
    secondary: { label: "See Benefits", to: "/resources/community" },
    img: { src: COMMUNITY_IMG, alt: "Community preview" },
  },
  {
    key: "metrics",
    label: "Live Metrics",
    title: "Live Metrics",
    desc:
      "Track our real-time business intelligence dashboard with revenue, customer, and marketing metrics updated monthly.",
    primary: { label: "Open Dashboard", to: "/resources/insights" },
    secondary: { label: "How It Works", to: "/resources/insights" },
    img: { src: INSIGHTS_IMG, alt: "Live Metrics dashboard" },
  },
  {
    key: "support",
    label: "Support",
    title: "Support",
    desc:
      "Reach out for tailored consultations, partnerships, or quick answers from our expert team.",
    primary: { label: "Contact", to: "/resources/support" },
    secondary: { label: "Learn More", to: "/resources/support" },
    img: { src: SUPPORT_IMG, alt: "Support preview" },
  },
];

export default function ResourcesShowcase() {
  const [active, setActive] = useState<TabKey>("benchmarks");
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  
  const current = useMemo(
    () => TABS.find((t) => t.key === active) ?? TABS[0],
    [active]
  );

  // Mobile carousel scroll tracking
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const newIndex = Math.round(el.scrollLeft / el.clientWidth);
      setIndex(newIndex);
      setActive(TABS[newIndex].key);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    trackRef.current?.scrollTo({ 
      left: i * (trackRef.current?.clientWidth || 0), 
      behavior: "smooth" 
    });
  };

  return (
    <section className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <header className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Fuel your social media success
        </h2>
      </header>

      {/* Tabs - Full width with spacing (hidden on mobile) */}
      <div className="mb-6 hidden md:block">
        <div
          className="grid grid-cols-6 gap-3"
          role="tablist"
          aria-label="Resource categories"
        >
          {TABS.map((tab) => {
            const selected = tab.key === active;
            return (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${tab.key}`}
                onClick={() => setActive(tab.key)}
                className={[
                  "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  selected
                    ? "bg-[#0A1F3D] text-white border-[#0A1F3D]"
                    : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: Single panel with tabs */}
      <div className="hidden md:block">
        <div
          id={`panel-${current.key}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.key}`}
          className={`rounded-3xl ${BG_COLORS[TABS.findIndex(t => t.key === active) % BG_COLORS.length]}`}
          style={{ minHeight: "400px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-5 sm:p-8 md:p-10 min-h-[400px]">
            {/* Left: copy */}
            <div className="order-2 md:order-1">
              <h3
                className="text-[28px] sm:text-[34px] md:text-[40px] leading-tight font-extrabold"
                style={{ color: COLORS.navy }}
              >
                {current.title}
              </h3>
              <p className="mt-4 text-base sm:text-lg" style={{ color: `${COLORS.navy}CC` }}>
                {current.desc}
              </p>

              <div className="mt-6">
                <Link
                  to={current.primary.to}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 group/btn transition-colors"
                >
                  {current.primary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:rotate-[-45deg]" />
                </Link>
              </div>
            </div>

            {/* Right: image */}
            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={current.img.src}
                  alt={current.img.alt}
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_10px_30px_rgba(10,31,61,0.18)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Horizontal scroll carousel */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth gap-4 pb-2"
          aria-label="Resources carousel"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TABS.map((tab, i) => (
            <div key={tab.key} className="snap-start shrink-0 w-[88%]">
              <div
                className={`rounded-3xl ${BG_COLORS[i % BG_COLORS.length]}`}
                style={{ minHeight: "400px" }}
              >
                <div className="flex flex-col p-5 sm:p-6 min-h-[400px]">
                  <h3
                    className="text-[24px] sm:text-[28px] leading-tight font-extrabold mb-3"
                    style={{ color: COLORS.navy }}
                  >
                    {tab.title}
                  </h3>
                  <p className="text-sm sm:text-base mb-4" style={{ color: `${COLORS.navy}CC` }}>
                    {tab.desc}
                  </p>

                  <div className="mb-4">
                    <Link
                      to={tab.primary.to}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm group/btn transition-colors"
                    >
                      {tab.primary.label}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:rotate-[-45deg]" />
                    </Link>
                  </div>

                  <div className="mt-auto">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={tab.img.src}
                        alt={tab.img.alt}
                        loading="lazy"
                        className="block h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
            {TABS.map((_, i) => (
              <span
                key={i}
                className={[
                  "h-2 w-2 rounded-full transition-all duration-300",
                  index === i ? "bg-[#0074ED]" : "bg-[#0A1F3D]/25",
                ].join(" ")}
              />
            ))}
          </div>
          <button
            className="rounded-full border border-black/10 px-3 py-1 text-sm text-[#0A1F3D]/70"
            onClick={() => scrollTo(Math.min(TABS.length - 1, index + 1))}
            aria-label="Next"
          >
            ›
          </button>
        </div>

        <style>{`
          .flex.snap-x::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
