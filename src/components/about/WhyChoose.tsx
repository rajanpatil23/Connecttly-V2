import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CARD = {
  base:
    "relative w-full overflow-hidden rounded-[28px] bg-[#F5F9FF] text-[#0A1F3D] " +
    "shadow-[0_8px_24px_rgba(10,31,61,.08)] border border-[#D6E7FF] " +
    "transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-[0_14px_36px_rgba(10,31,61,.12)]",
  pad: "p-7 sm:p-8 md:p-9",
};

type Item = { image: string; title: string; body: string };

const items: Item[] = [
  { image: "/images/omni.svg", title: "Omnichannel Expertise", body: "From LinkedIn to Meta, Google to X, we run high-ROI ad campaigns that convert." },
  { image: "/images/executive.svg", title: "Executive Branding Specialists", body: "Build authority for leadership with premium content and smart distribution." },
  { image: "/images/custom.svg", title: "Custom-Tailored Solutions", body: "No generic playbooks — only strategies crafted around your unique goals." },
  { image: "/images/fullService.svg", title: "Full-Service Support", body: "From ideation to execution, we handle the heavy lifting so you can focus on growth." },
];

function CardItem({ it, className = "" }: { it: Item; className?: string }) {
  return (
    <article className={`${CARD.base} ${CARD.pad} min-h-[220px] h-full group ${className}`}>
      <div className="flex flex-col items-center text-center h-full">
        <div className="shrink-0 mb-4 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1">
          <img src={it.image} alt={it.title} className="h-16 w-16" />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl sm:text-2xl font-semibold leading-snug break-words [overflow-wrap:anywhere]">
            {it.title}
          </h3>
          <p
            className="mt-3 text-[15px] sm:text-base text-slate-600 whitespace-normal break-words [overflow-wrap:anywhere] leading-relaxed"
            style={{ hyphens: "auto" }}
          >
            {it.body}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function WhyChoose() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.9; // roughly one slide
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="relative isolate overflow-hidden bg-white py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0A1F3D]">
          Why Choose Connecttly?
        </h2>

        {/* Desktop / Tablet grid */}
        <div className="mt-10 hidden md:grid md:mt-14 grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {items.map((it, i) => (
            <div key={i} className="h-full">
              <CardItem it={it} className="h-full" />
            </div>
          ))}
        </div>

        {/* Mobile scroll-snap carousel (no external lib) */}
        <div className="md:hidden mt-8">
          <div
            ref={trackRef}
            className="
              flex gap-3 -mx-3 px-3
              overflow-x-auto scroll-smooth
              snap-x snap-mandatory
              [scrollbar-width:none] [-ms-overflow-style:none]
            "
          >
            {/* Hide webkit scrollbar */}
            <style>
              {`.no-scrollbar::-webkit-scrollbar{display:none}`}
            </style>

            {items.map((it, i) => (
              <div
                key={i}
                className="
                  snap-start
                  shrink-0 basis-[88%] max-w-[88%]
                "
              >
                <CardItem it={it} className="h-full" />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-5 flex justify-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D6E7FF] bg-[#F5F9FF] text-[#0A1F3D] hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D6E7FF] bg-[#F5F9FF] text-[#0A1F3D] hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
