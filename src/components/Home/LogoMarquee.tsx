import React, { useLayoutEffect, useRef, useEffect } from "react";
import {
  SiAirbnb,
  SiLoom,
  SiAirtable,
  SiGoogle,
  SiFigma,
  SiCanva,
  SiPaypal,
  SiReddit,
  SiStripe,
  SiSpotify,
  SiSlack,
  SiWebflow,
  SiUpwork,
  SiZapier,
  SiSalesforce,
  SiNetflix,
  SiDropbox,
  SiTrello,
  SiAdobe,
  SiNotion,
  SiLinkedin,
  SiYoutube,
} from "react-icons/si";

/**
 * Logo Marquee (no background by default)
 * - Infinite loop (right → left)
 * - Original-color logos using React Icons
 * - Constant speed (pixels/second), auto-calculated duration
 * - Optional pauses on hover
 * - Optional edge fades (off by default)
 */
export default function LogosMarquee({
  speedPps = 50,        // pixels per second (lower = slower)
  height = 76,          // card height in px
  gap = 20,             // space between cards in px
  pauseOnHover = true,
  showFades = false,    // <<< turn on if you want the left/right fades
  logos = DEFAULT_LOGOS,
  variant = "card",
  title,
  showLabels = true,
  iconSize = 44,
}: {
  speedPps?: number;
  height?: number;
  gap?: number;
  pauseOnHover?: boolean;
  showFades?: boolean;
  logos?: { alt: string; icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; color?: string }[];
  variant?: "bare" | "card";
  title?: string;
  showLabels?: boolean;
  iconSize?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const useIsoLayout =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  const recalc = () => {
    const track = trackRef.current;
    if (!track) return;

    const children = Array.from(track.children) as HTMLElement[];
    const half = Math.floor(children.length / 2);
    const oneSetWidth =
      children.slice(0, half).reduce((sum, el) => sum + el.offsetWidth, 0) +
      (half - 1) * gap;

    track.style.setProperty("--scroll-distance", `-${oneSetWidth}px`);
    track.style.animationDuration = `${oneSetWidth / speedPps}s`;
  };

  useIsoLayout(() => {
    recalc();
    const onResize = () => {
      const track = trackRef.current;
      if (!track) return;
      const prev = getComputedStyle(track).animation;
      track.style.animation = "none";
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      track.offsetHeight;
      track.style.animation = prev.includes("marqueeScroll")
        ? prev
        : "marqueeScroll linear infinite";
      recalc();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
     
  }, [logos.length, speedPps, gap, height]);

  return (
    <section
      className={[
        "marqueeWrap",
        pauseOnHover ? "pauseOnHover" : "",
      ].join(" ")}
      style={
        {
          "--marquee-height": `${height}px`,
          "--marquee-gap": `${gap}px`,
          "--connectly-navy": "#0A1F3D",
          "--connectly-white": "#FFFFFF",
          "--connectly-blue": "#0074ED",
          "--fade-color": variant === "card" ? "#FFFFFF" : "var(--connectly-navy)",
        } as React.CSSProperties
      }
      role="region"
      aria-label="Trusted by leading platforms"
    >
      {variant === "card" ? (
        <div className="marqueeCard">
          {title && <h3 className="marqueeTitle">{title}</h3>}

          {/* Edge fades (optional, off by default) */}
          {showFades && <div className="fade left" aria-hidden="true" />}
          {showFades && <div className="fade right" aria-hidden="true" />}

          {/* Track with two identical sets for seamless loop */}
          <div className="marqueeTrack" ref={trackRef}>
            {renderSet(logos, "a", iconSize, showLabels)}
            {renderSet(logos, "b", iconSize, showLabels)}
          </div>
        </div>
      ) : (
        <>
          {/* Edge fades (optional, off by default) */}
          {showFades && <div className="fade left" aria-hidden="true" />}
          {showFades && <div className="fade right" aria-hidden="true" />}

          {/* Track with two identical sets for seamless loop */}
          <div className="marqueeTrack" ref={trackRef}>
            {renderSet(logos, "a", iconSize, showLabels)}
            {renderSet(logos, "b", iconSize, showLabels)}
          </div>
        </>
      )}

      <style>{css}</style>
    </section>
  );
}

/* ---------- Helpers ---------- */

function renderSet(list: { alt: string; icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; color?: string }[], key: string, iconSize: number, showLabels: boolean) {
  return (
    <>
      {list.map((l, i) => {
        const IconComponent = l.icon;
        return (
          <div className={`logoCard ${showLabels ? "withLabel" : ""}`} key={`${key}-${i}`}>
            <IconComponent size={iconSize} className="brand-icon" style={l.color ? { color: l.color } : undefined} />
            {showLabels && <div className="brand-label">{l.alt}</div>}
          </div>
        );
      })}
    </>
  );
}

/* ---------- Default logos (colorful React Icons) ---------- */

const DEFAULT_LOGOS = [
  { alt: "Airbnb", icon: SiAirbnb, color: "#FF5A5F" },
  { alt: "Loom", icon: SiLoom, color: "#6159F6" },
  { alt: "Airtable", icon: SiAirtable, color: "#18BFFF" },
  { alt: "Google", icon: SiGoogle, color: "#4285F4" },
  { alt: "Figma", icon: SiFigma, color: "#F24E1E" },
  { alt: "Canva", icon: SiCanva, color: "#00C4CC" },
  { alt: "PayPal", icon: SiPaypal, color: "#003087" },
  { alt: "Reddit", icon: SiReddit, color: "#FF4500" },
  { alt: "Stripe", icon: SiStripe, color: "#635BFF" },
  { alt: "Spotify", icon: SiSpotify, color: "#1DB954" },
  { alt: "Slack", icon: SiSlack, color: "#4A154B" },
  { alt: "Webflow", icon: SiWebflow, color: "#146EF5" },
  { alt: "Upwork", icon: SiUpwork, color: "#6FDA44" },
  { alt: "Zapier", icon: SiZapier, color: "#FF4A00" },
  { alt: "Salesforce", icon: SiSalesforce, color: "#00A1E0" },
  { alt: "Netflix", icon: SiNetflix, color: "#E50914" },
  { alt: "Dropbox", icon: SiDropbox, color: "#0061FF" },
  { alt: "Trello", icon: SiTrello, color: "#026AA7" },
  { alt: "Adobe", icon: SiAdobe, color: "#FF0000" },
  { alt: "Notion", icon: SiNotion, color: "#000000" },
  { alt: "LinkedIn", icon: SiLinkedin, color: "#0A66C2" },
  { alt: "YouTube", icon: SiYoutube, color: "#FF0000" },
];

/* ---------- CSS ---------- */

const css = `
:root{
  --marquee-height: 76px;
  --marquee-gap: 20px;
  --connectly-navy: #0A1F3D;
  --connectly-white: #FFFFFF;
  --connectly-blue: #0074ED;
}

.marqueeWrap{
  position: relative;
  overflow: hidden;
  padding: 0;
}

/* Card variant */
.marqueeCard{
  background: #FFFFFF;
  border-radius: 0;
  border: none;
  box-shadow: none;
  padding: 22px 24px 18px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .marqueeCard{
    border-radius: 16px;
    border: 1px solid rgba(2,6,23,0.08);
    box-shadow: 0 8px 24px rgba(2,6,23,0.12), 0 2px 8px rgba(2,6,23,0.08);
  }
}

.marqueeTitle{
  text-align: center;
  font-weight: 600;
  color: #0A1F3D;
  font-size: 18px;
  margin: 4px 0 12px 0;
}

.logoCard.withLabel{
  flex-direction: column;
  gap: 8px;
  min-width: 120px;
}

.brand-label{
  font-size: 12px;
  color: #4b5563;
  line-height: 1;
}

/* Edge fade overlays (rendered only when showFades=true) */
.fade{
  position:absolute; top:0; bottom:0; width:120px; pointer-events:none; z-index:2;
}
.fade.left{
  left:0;
  background: linear-gradient(90deg, var(--fade-color) 0%, rgba(10,31,61,0) 100%);
}
.fade.right{
  right:0;
  background: linear-gradient(270deg, var(--fade-color) 0%, rgba(10,31,61,0) 100%);
}

/* Track */
.marqueeTrack{
  display:flex; gap: var(--marquee-gap);
  will-change: transform;
  animation: marqueeScroll linear infinite;
}

/* Pause on hover (optional) */
.pauseOnHover:hover .marqueeTrack{ animation-play-state: paused; }

/* Logo containers - no cards, just clean icons */
.logoCard{
  flex: 0 0 auto;
  display: flex; 
  align-items: center; 
  justify-content: center;
  height: var(--marquee-height);
  min-width: 80px;
  padding: 0 20px;
}

/* Brand icon colors - inherit by default; per-logo inline style sets brand colors */
.brand-icon {
  color: inherit;
}

/* keyframes (distance + duration set from JS) */
@keyframes marqueeScroll{
  from { transform: translateX(0); }
  to   { transform: translateX(var(--scroll-distance, -50%)); }
}

@media (prefers-reduced-motion: reduce){
  .marqueeTrack{ animation: none; }
}
`;
