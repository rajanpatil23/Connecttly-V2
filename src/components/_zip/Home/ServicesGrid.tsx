import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import svcPerformance from "@/assets/services/performance-marketing.svg";
import svcSocial from "@/assets/services/social-media-management.svg";
import svcLinkedIn from "@/assets/services/linkedin-growth.svg";
import svcSeo from "@/assets/services/seo.svg";
import svcContent from "@/assets/services/content-creative.svg";
import svcWebAi from "@/assets/services/web-ai-automation.svg";

type Service = { id: string; num: string; title: string; desc: string; image: string };

const row1: Service[] = [
  { id: "01", num: "01", title: "Performance Marketing", desc: "Run high-performing ad campaigns that generate leads and revenue.", image: svcPerformance },
  { id: "02", num: "02", title: "Social Media Management", desc: "Build a strong brand presence and an engaged audience.", image: svcSocial },
  { id: "03", num: "03", title: "LinkedIn Growth", desc: "Turn LinkedIn into your most powerful B2B growth engine.", image: svcLinkedIn },
];

const row2: Service[] = [
  { id: "04", num: "04", title: "Search Engine Optimisation", desc: "Drive long-term organic traffic and visibility.", image: svcSeo },
  { id: "05", num: "05", title: "Content & Creative", desc: "Create content that builds authority and demand.", image: svcContent },
  { id: "06", num: "06", title: "Web & AI Automation", desc: "Build high-converting websites and automated marketing systems.", image: svcWebAi },
];

interface CardProps {
  s: Service;
  isActive: boolean;
  onActivate: () => void;
  /** Compact (idle) flex-basis Tailwind class. */
  idleBasisClass: string;
}

const ServiceCard = ({ s, isActive, onActivate, idleBasisClass }: CardProps) => (
  <article
    tabIndex={0}
    onMouseEnter={onActivate}
    onFocus={onActivate}
    className={`relative bg-background rounded-xl border border-border p-5 h-[380px] overflow-hidden transition-[flex-basis,box-shadow] duration-500 ease-out shadow-[8px_10px_24px_-4px_hsl(var(--foreground)/0.18)] hover:shadow-[12px_14px_32px_-4px_hsl(var(--foreground)/0.24)] focus:shadow-[12px_14px_32px_-4px_hsl(var(--foreground)/0.24)] focus:outline-none cursor-pointer md:flex-grow-0 md:flex-shrink-0 ${
      isActive
        ? "md:basis-[calc((100%-2.5rem)/2)]"
        : idleBasisClass
    }`}
  >
    {/* Illustration layer, absolutely positioned in the bottom-right 75% of the card
        (cells 6-8, 10-12, 14-16 of a 4×4 grid). Sits behind the text/number layer. */}
    <div
      aria-hidden={!isActive}
      className={`absolute pointer-events-none transition-opacity duration-500 ease-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ left: "20%", top: "20%", right: 0, bottom: 0 }}
    >
      <img
        src={s.image}
        alt=""
        className="w-full h-full object-cover object-center"
        loading="lazy"
        width={943}
        height={597}
      />
    </div>

    {/* Foreground content layer */}
    <div className="relative z-10 flex flex-col justify-between h-full">
      <div>
        <h3
          className={`font-heading font-semibold text-base mb-1.5 transition-colors ${
            isActive ? "text-primary" : "text-foreground"
          }`}
        >
          {s.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[34ch]">{s.desc}</p>
      </div>

      <div className="flex items-end justify-between mt-auto pt-4">
        <span className="text-5xl font-heading font-bold text-primary/80 leading-none">{s.num}</span>
        <ArrowUpRight
          className={`w-8 h-8 text-primary transition-opacity ${isActive ? "opacity-0" : "opacity-60"}`}
        />
      </div>
    </div>
  </article>
);

const ServicesGrid = () => {
  // Single global active id across BOTH rows, only one card can be expanded at a time.
  const [activeId, setActiveId] = useState<string>("01");

  // Both rows share the same idle card width (~25% of row).
  const idleBasis = "md:basis-[calc((100%-2.5rem)/4)]";

  // When the active card lives in the OTHER row, this row has only idle cards and
  // should be centered (so the empty ~25% gap splits equally on left & right).
  const row1HasActive = row1.some((s) => s.id === activeId);
  const row2HasActive = row2.some((s) => s.id === activeId);

  return (
    <section className="pb-16 md:pb-20">
      <div
        className="container-main space-y-5 mt-12"
        onMouseLeave={() => setActiveId("01")}
      >
        {/* Row 1, center when no card here is active */}
        <div className={`flex flex-col md:flex-row gap-5 ${row1HasActive ? "" : "md:justify-center"}`}>
          {row1.map((s) => (
            <ServiceCard
              key={s.id}
              s={s}
              isActive={activeId === s.id}
              onActivate={() => setActiveId(s.id)}
              idleBasisClass={idleBasis}
            />
          ))}
        </div>

        {/* Row 2, center when no card here is active */}
        <div className={`flex flex-col md:flex-row gap-5 ${row2HasActive ? "" : "md:justify-center"}`}>
          {row2.map((s) => (
            <ServiceCard
              key={s.id}
              s={s}
              isActive={activeId === s.id}
              onActivate={() => setActiveId(s.id)}
              idleBasisClass={idleBasis}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
