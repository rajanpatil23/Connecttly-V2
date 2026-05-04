import { useState, useMemo, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/_zip/SectionLabel";
import blogImg from "@/assets/_zip/resources/blog.svg";
import freeToolImg from "@/assets/_zip/resources/free-tool.svg";
import templateImg from "@/assets/_zip/resources/template.svg";
import communityImg from "@/assets/_zip/resources/community.svg";
import liveMetricsImg from "@/assets/_zip/resources/live-metrics.svg";
import contactImg from "@/assets/_zip/resources/contact.svg";

type TabKey = "blog" | "tools" | "templates" | "community" | "metrics" | "support";

type Tab = {
  key: TabKey;
  label: string;
  title: string;
  desc: string;
  cta: { label: string; to: string };
  img: { src: string; alt: string };
};

const TABS: Tab[] = [
  {
    key: "blog",
    label: "Blog",
    title: "Blog",
    desc: "Benchmark reports and platform updates so you always stay ahead in LinkedIn and social media strategy.",
    cta: { label: "Read Updates", to: "/resources/blog" },
    img: { src: blogImg, alt: "Blog preview" },
  },
  {
    key: "tools",
    label: "Free Tools",
    title: "Free Tools",
    desc: "Free generators and builders to create posts, visuals, and tracking links effortlessly.",
    cta: { label: "Use Tools", to: "/resources/tools" },
    img: { src: freeToolImg, alt: "Free Tools preview" },
  },
  {
    key: "templates",
    label: "Templates",
    title: "Templates",
    desc: "Proven LinkedIn templates, reporting frameworks, and campaign briefs to move faster and smarter.",
    cta: { label: "Get Templates", to: "/resources/templates" },
    img: { src: templateImg, alt: "Templates preview" },
  },
  {
    key: "community",
    label: "Community",
    title: "Community",
    desc: "Join a network of B2B leaders, access exclusive events, and grow alongside ambitious professionals.",
    cta: { label: "Join Community", to: "/resources/community" },
    img: { src: communityImg, alt: "Community preview" },
  },
  {
    key: "metrics",
    label: "Live Metrics",
    title: "Live Metrics",
    desc: "Track our real-time business intelligence dashboard with revenue, customer, and marketing metrics updated monthly.",
    cta: { label: "Open Dashboard", to: "/resources/insights" },
    img: { src: liveMetricsImg, alt: "Live Metrics dashboard" },
  },
  {
    key: "support",
    label: "Support",
    title: "Support",
    desc: "Reach out for tailored consultations, partnerships, or quick answers from our expert team.",
    cta: { label: "Contact", to: "/resources/support" },
    img: { src: contactImg, alt: "Support preview" },
  },
];

// Unified white panel background for all tabs
const PANEL_BG = ["bg-background"];

const ResourcesShowcase = () => {
  const [active, setActive] = useState<TabKey>("blog");
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const current = useMemo(() => TABS.find((t) => t.key === active) ?? TABS[0], [active]);
  const activeIndex = TABS.findIndex((t) => t.key === active);

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
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-10 md:pt-14 pb-16 md:pb-20">
      <div className="container-main">
        <SectionLabel label="Resource Hub" />
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mt-4">
          Fuel Your <span className="gradient-text">Marketing Success</span>
        </h2>

        {/* Desktop tabs */}
        <div className="mt-8 hidden md:block">
          <div className="grid grid-cols-6 gap-3" role="tablist" aria-label="Resource categories">
            {TABS.map((tab) => {
              const selected = tab.key === active;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(tab.key)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop panel */}
        <div className="hidden md:block mt-6">
          <div className={`rounded-3xl border border-border/60 shadow-[12px_16px_32px_-12px_hsl(var(--foreground)/0.18)] ${PANEL_BG[activeIndex % PANEL_BG.length]}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-5 md:p-6 h-[380px]">
              <div className="order-2 md:order-1 self-center">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-foreground/75">{current.desc}</p>
                <div className="mt-4">
                  <Link
                    to={current.cta.to}
                    className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:underline group/btn"
                  >
                    {current.cta.label}
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2 flex items-center justify-end h-full">
                <div className="relative overflow-hidden rounded-2xl w-full h-full flex items-center justify-center">
                  <img
                    key={current.key}
                    src={current.img.src}
                    alt={current.img.alt}
                    loading="lazy"
                    className="block max-w-full max-h-full object-contain animate-fade-in"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden mt-6">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth gap-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Resources carousel"
          >
            {TABS.map((tab, i) => (
              <div key={tab.key} className="snap-start shrink-0 w-[88%]">
                <div className={`rounded-3xl ${PANEL_BG[i % PANEL_BG.length]}`}>
                  <div className="flex flex-col p-5 min-h-[400px]">
                    <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                      {tab.title}
                    </h3>
                    <p className="text-sm text-foreground/75 mb-4">{tab.desc}</p>
                    <div className="mb-4">
                      <Link
                        to={tab.cta.to}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                      >
                        {tab.cta.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="mt-auto">
                      <div className="relative overflow-hidden rounded-2xl">
                        <img src={tab.img.src} alt={tab.img.alt} loading="lazy" className="block h-full w-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
              onClick={() => scrollTo(Math.max(0, index - 1))}
              aria-label="Previous"
            >
              ‹
            </button>
            <div className="flex items-center gap-1.5">
              {TABS.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === i ? "bg-primary" : "bg-foreground/25"
                  }`}
                />
              ))}
            </div>
            <button
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
              onClick={() => scrollTo(Math.min(TABS.length - 1, index + 1))}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesShowcase;
