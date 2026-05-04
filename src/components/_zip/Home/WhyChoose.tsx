import { useState } from "react";
import { Monitor } from "lucide-react";
import connecttlyMark from "@/assets/connecttly-mark.svg";
import aiIcon from "@/assets/why/ai.svg";
import performanceIcon from "@/assets/why/performance.svg";
import founderFriendlyIcon from "@/assets/why/founder-friendly.svg";

type CardKey = "tl" | "tr" | "bl" | "br";

type CardDef = {
  key: CardKey;
  title: string;
  desc: string;
  Icon?: React.ComponentType<{ className?: string }>;
  iconSrc?: string;
};

const CARDS: CardDef[] = [
  { key: "tl", title: "Strategy + Execution", desc: "We don't just advise, we build and run your growth engine.", Icon: Monitor },
  { key: "tr", title: "AI-Powered Marketing", desc: "Automation and AI tools drive efficiency and scale.", iconSrc: aiIcon },
  { key: "bl", title: "Performance Focused", desc: "Every campaign is optimised for measurable ROI.", iconSrc: performanceIcon },
  { key: "br", title: "Founder-Friendly", desc: "We work closely with startups and growth-stage businesses.", iconSrc: founderFriendlyIcon },
];

// Each corner uses a radial gradient anchored to its outer corner so only a
// small, soft quarter-arc of blue hugs the edge, not a hard solid block.
const cornerClass: Record<CardKey, string> = {
  tl: "top-0 left-0 rounded-tl-[20px] [background:radial-gradient(circle_at_top_left,hsl(var(--primary))_0,hsl(var(--primary))_55%,transparent_72%)]",
  tr: "top-0 right-0 rounded-tr-[20px] [background:radial-gradient(circle_at_top_right,hsl(var(--primary))_0,hsl(var(--primary))_55%,transparent_72%)]",
  bl: "bottom-0 left-0 rounded-bl-[20px] [background:radial-gradient(circle_at_bottom_left,hsl(var(--primary))_0,hsl(var(--primary))_55%,transparent_72%)]",
  br: "bottom-0 right-0 rounded-br-[20px] [background:radial-gradient(circle_at_bottom_right,hsl(var(--primary))_0,hsl(var(--primary))_55%,transparent_72%)]",
};

// Rotation (deg) of the blue arc segment so it sits in the quadrant facing the hovered card.
// Base arc lives in top-left quadrant -> 0deg points top-left.
const arcRotation: Record<CardKey, number> = {
  tl: 0,
  tr: 90,
  br: 180,
  bl: 270,
};

const Card = ({
  card,
  hovered,
  setHovered,
}: {
  card: CardDef;
  hovered: CardKey | null;
  setHovered: (k: CardKey | null) => void;
}) => {
  const isActive = hovered === card.key;
  const { Icon, iconSrc } = card;
  return (
    <article
      onMouseEnter={() => setHovered(card.key)}
      onMouseLeave={() => setHovered(null)}
      tabIndex={0}
      onFocus={() => setHovered(card.key)}
      onBlur={() => setHovered(null)}
      className={`relative bg-background rounded-2xl p-6 flex flex-col justify-between aspect-[5/4] outline-none transition-all duration-200 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)] border-2 ${
        isActive ? "border-primary" : "border-transparent ring-1 ring-border/40"
      }`}
    >
      {iconSrc ? (
        <img src={iconSrc} alt="" className="w-14 h-14 -ml-1 -mt-1" />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
        </div>
      )}
      <div>
        <h3 className={`font-heading font-semibold text-lg mb-1.5 transition-colors duration-200 ${isActive ? "text-primary" : "text-foreground"}`}>{card.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
      </div>
    </article>
  );
};

const ServicesHub = ({
  hovered,
  setHovered,
}: {
  hovered: CardKey | null;
  setHovered: (k: CardKey | null) => void;
}) => {
  const cardByKey = (k: CardKey) => CARDS.find((c) => c.key === k)!;

  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      {/* 2x2 grid */}
      <div className="grid grid-cols-2 gap-8 md:gap-24">
        <Card card={cardByKey("tl")} hovered={hovered} setHovered={setHovered} />
        <Card card={cardByKey("tr")} hovered={hovered} setHovered={setHovered} />
        <Card card={cardByKey("bl")} hovered={hovered} setHovered={setHovered} />
        <Card card={cardByKey("br")} hovered={hovered} setHovered={setHovered} />
      </div>

      {/* Decorative blank dummy strip cards in the N/E/S/W gaps, fading toward outer edges */}
      <div aria-hidden className="hidden md:block pointer-events-none">
        {/* WEST strip, fades toward the left (outer) */}
        <div
          className="absolute -translate-y-1/2 bg-background rounded-lg ring-1 ring-border/40 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)]"
          style={{
            top: "50%",
            left: 0,
            width: "calc(50% - 68px)",
            height: "60px",
            WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)",
            maskImage: "linear-gradient(to left, black 70%, transparent 100%)",
          }}
        />
        {/* EAST strip, fades toward the right (outer) */}
        <div
          className="absolute -translate-y-1/2 bg-background rounded-lg ring-1 ring-border/40 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)]"
          style={{
            top: "50%",
            right: 0,
            width: "calc(50% - 68px)",
            height: "60px",
            WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 100%)",
            maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
          }}
        />
        {/* NORTH strip, fades toward the top (outer) */}
        <div
          className="absolute -translate-x-1/2 bg-background rounded-lg ring-1 ring-border/40 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)]"
          style={{
            left: "50%",
            top: 0,
            height: "calc(50% - 68px)",
            width: "60px",
            WebkitMaskImage: "linear-gradient(to top, black 70%, transparent 100%)",
            maskImage: "linear-gradient(to top, black 70%, transparent 100%)",
          }}
        />
        {/* SOUTH strip, fades toward the bottom (outer) */}
        <div
          className="absolute -translate-x-1/2 bg-background rounded-lg ring-1 ring-border/40 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)]"
          style={{
            left: "50%",
            bottom: 0,
            height: "calc(50% - 68px)",
            width: "60px",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />
      </div>

      {/* CENTRAL DIAL, desktop only */}
      <div
        aria-hidden
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ width: 104, height: 104 }}
      >
        {/* Layer 1: outer rounded square */}
        <div className="absolute inset-0 rounded-[20px] bg-background shadow-[0_4px_18px_-6px_hsl(var(--primary)/0.25)] ring-1 ring-border/50 overflow-hidden">
          {/* Corner fills */}
          {(["tl", "tr", "bl", "br"] as CardKey[]).map((k) => (
            <span
              key={`corner-${k}`}
              className={`absolute w-5 h-5 transition-opacity duration-300 ${cornerClass[k]} ${
                hovered === k ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Layer 2: white circle (creates ring gap) */}
        <div className="absolute inset-[10px] rounded-full bg-background ring-1 ring-border/40 flex items-center justify-center">
          {/* Layer 2.5: rotating blue arc segment in the ring gap */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `rotate(${hovered ? arcRotation[hovered] : 0}deg)`,
              opacity: hovered ? 1 : 0,
              transitionProperty: "transform, opacity",
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Arc lives in top-left quadrant when rotation = 0 */}
              <path
                d="M 50 12 A 38 38 0 0 0 12 50"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Layer 3: inner blue circle with logo */}
          <div className="relative w-[54px] h-[54px] rounded-full bg-primary flex items-center justify-center shadow-[0_2px_10px_hsl(var(--primary)/0.45)]">
            <img src={connecttlyMark} alt="Connecttly" className="w-5 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyChoose = () => {
  const [hovered, setHovered] = useState<CardKey | null>(null);

  return (
    <section className="py-16 md:py-24 bg-ct-section">
      <div className="container-main">
        <div className="flex justify-center mb-6">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full border border-primary/30 bg-primary/5 text-primary">
            How Connecttly Works
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center">
          Why Brands Choose <span className="gradient-text">Connecttly</span>
        </h2>

        <div className="mt-14">
          <ServicesHub hovered={hovered} setHovered={setHovered} />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
