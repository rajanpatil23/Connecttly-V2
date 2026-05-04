import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Sparkles, Workflow, Database, Layers, Zap, Mic, Heart, Compass, Linkedin as LinkedinIcon } from "lucide-react";
import {
  SiFacebook, SiYoutube,
  SiInstagram, SiGoogleads, SiMeta, SiReddit,
  SiWhatsapp, SiTwitch, SiOpenai, SiReplit,
} from "react-icons/si";
import type { IconType } from "react-icons";
import TrustedMarquee from "@/components/_zip/Home/TrustedMarquee";

/* ---------- Brand colors ---------- */
const BRAND = {
  linkedin: "#0A66C2",
  facebook: "#1877F2",
  youtube: "#FF0000",
  pinterest: "#FF4500",
  x: "#0A66C2",
  tiktok: "#A855F7",
  instagram: "#E1306C",
  googleads: "#FF6B6B",
  meta: "#0866FF",
  reddit: "#311C87",
  discord: "#000000",
  snapchat: "#EA4E4E",
  whatsapp: "#25D366",
  twitch: "#9146FF",
  spotify: "#1A73E8",
  vimeo: "#FF6B35",
  tumblr: "#1FB8CD",
  quora: "#5865F2",
  chatgpt: "#10A37F",
};

/* ---------- Motion tuning ---------- */
const MAG_RADIUS = 500;
const MAG_MAX = 35;
const MAG_SWIRL = 0.02;
const SEP_DIST = 85;
const SEP_FORCE = 0.07;
const SAFE_CFG = { cx: 0.5, cy: 0.46, inner: 0.46, pad: 120, margin: 24 };
const SMOOTH_TILE = 0.05;
const SMOOTH_GLOBAL = 0.04;
const MOMENTUM_DECAY = 0.995;
const MOMENTUM_THRESHOLD = 0.008;

type TileId =
  | "yt" | "x" | "li" | "pi" | "fb" | "tt" | "ig" | "ga" | "meta"
  | "reddit" | "discord" | "telegram" | "snapchat_2" | "whatsapp_2" | "twitch_2"
  | "spotify_2" | "vimeo_2" | "tumblr_2" | "quora_2";

type TileSpec = { id: TileId; Icon: IconType; color: string };

const CORE: TileSpec[] = [
  { id: "yt",         Icon: SiOpenai,    color: BRAND.chatgpt },
  { id: "x",          Icon: Compass,     color: BRAND.x },
  { id: "li",         Icon: LinkedinIcon as unknown as IconType,  color: BRAND.linkedin },
  { id: "pi",         Icon: SiReddit,    color: BRAND.pinterest },
  { id: "fb",         Icon: SiFacebook,  color: BRAND.facebook },
  { id: "tt",         Icon: Sparkles,    color: BRAND.tiktok },
  { id: "ig",         Icon: SiInstagram, color: BRAND.instagram },
  { id: "ga",         Icon: Heart,       color: BRAND.googleads },
  { id: "meta",       Icon: SiMeta,      color: BRAND.meta },
  { id: "snapchat_2", Icon: Workflow,    color: BRAND.snapchat },
  { id: "whatsapp_2", Icon: SiWhatsapp,  color: BRAND.whatsapp },
  { id: "twitch_2",   Icon: SiTwitch,    color: BRAND.twitch },
];

const EXTRA: TileSpec[] = [
  { id: "reddit",    Icon: Database,    color: BRAND.reddit },
  { id: "discord",   Icon: Mic,         color: BRAND.discord },
  { id: "telegram",  Icon: SiYoutube,   color: BRAND.youtube },
  { id: "spotify_2", Icon: SiGoogleads, color: BRAND.spotify },
  { id: "vimeo_2",   Icon: Layers,      color: BRAND.vimeo },
  { id: "tumblr_2",  Icon: Zap,         color: BRAND.tumblr },
  { id: "quora_2",   Icon: SiReplit,    color: BRAND.quora },
];

type Pos = { leftPct: number; topPct: number };

const POSITIONS_DESKTOP: Record<TileId, Pos> = {
  yt:         { leftPct: 5,  topPct: 7 },
  snapchat_2: { leftPct: 88, topPct: 28 },
  ga:         { leftPct: 18, topPct: 55 },
  twitch_2:   { leftPct: 12, topPct: 80 },
  reddit:     { leftPct: 12, topPct: 35 },
  vimeo_2:    { leftPct: 60, topPct: 88 },
  tumblr_2:   { leftPct: 77, topPct: 88 },
  discord:    { leftPct: 95, topPct: 48 },
  quora_2:    { leftPct: 96, topPct: 85 },
  x:          { leftPct: 25, topPct: 13 },
  telegram:   { leftPct: 7,  topPct: 22 },
  li:         { leftPct: 9,  topPct: 53 },
  whatsapp_2: { leftPct: 4,  topPct: 88 },
  ig:         { leftPct: 24, topPct: 80 },
  meta:       { leftPct: 43, topPct: 90 },
  spotify_2:  { leftPct: 72, topPct: 13 },
  fb:         { leftPct: 85, topPct: 68 },
  pi:         { leftPct: 95, topPct: 15 },
  tt:         { leftPct: 80, topPct: 50 },
};

const POSITIONS_MOBILE: Record<TileId, Pos> = {
  yt:         { leftPct: 8,  topPct: 8 },
  snapchat_2: { leftPct: 35, topPct: 10 },
  ga:         { leftPct: 5,  topPct: 40 },
  twitch_2:   { leftPct: 8,  topPct: 85 },
  reddit:     { leftPct: 15, topPct: 15 },
  vimeo_2:    { leftPct: 90, topPct: 25 },
  tumblr_2:   { leftPct: 92, topPct: 85 },
  discord:    { leftPct: 92, topPct: 50 },
  quora_2:    { leftPct: 92, topPct: 85 },
  x:          { leftPct: 92, topPct: 6 },
  telegram:   { leftPct: 8,  topPct: 17 },
  li:         { leftPct: 5,  topPct: 55 },
  whatsapp_2: { leftPct: 12, topPct: 98 },
  ig:         { leftPct: 92, topPct: 94 },
  meta:       { leftPct: 50, topPct: 96 },
  spotify_2:  { leftPct: 70, topPct: 9 },
  fb:         { leftPct: 88, topPct: 65 },
  pi:         { leftPct: 92, topPct: 55 },
  tt:         { leftPct: 85, topPct: 50 },
};

function GlassTile({
  Icon, color, leftPct, topPct, leftPctMobile, topPctMobile, delay = "0s", isBlurred = false,
}: {
  Icon: IconType;
  color: string;
  leftPct: number;
  topPct: number;
  leftPctMobile: number;
  topPctMobile: number;
  delay?: string;
  isBlurred?: boolean;
}) {
  return (
    <div
      className="tile absolute"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        // @ts-expect-error CSS custom props
        "--left-mobile": `${leftPctMobile}%`,
        "--top-mobile": `${topPctMobile}%`,
        "--d": delay,
      }}
    >
      <div className={`tile-inner ${isBlurred ? "blurred-icon" : ""}`}>
        <Icon size={22} color={color} />
      </div>
    </div>
  );
}

type HeroProps = {
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function Hero({
  primaryHref = "/contact",
  primaryLabel = "Book your free consulting session",
  secondaryHref = "/about",
  secondaryLabel = "Learn more",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* Measure CTA buttons to size & position the sliding pill */
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;
    const measure = () => {
      const primary = cta.querySelector<HTMLElement>(".hero-cta__primary");
      const secondary = cta.querySelector<HTMLElement>(".hero-cta__secondary");
      if (!primary || !secondary) return;
      const ctaRect = cta.getBoundingClientRect();
      const pRect = primary.getBoundingClientRect();
      const sRect = secondary.getBoundingClientRect();
      cta.style.setProperty("--primary-w", `${pRect.width}px`);
      cta.style.setProperty("--secondary-w", `${sRect.width}px`);
      cta.style.setProperty("--secondary-x", `${sRect.left - pRect.left}px`);
      // anchor pill to primary's left offset within container
      cta.style.setProperty("--pill-left", `${pRect.left - ctaRect.left}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(cta);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [primaryLabel, secondaryLabel]);

  /* Section parallax */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let tx = 0, ty = 0, sx = 0, sy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const loop = () => {
      sx += (tx - sx) * SMOOTH_GLOBAL;
      sy += (ty - sy) * SMOOTH_GLOBAL;
      el.style.setProperty("--sx", sx.toFixed(4));
      el.style.setProperty("--sy", sy.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* Magnetic motion */
  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    if (window.innerWidth < 768) return;

    let tiles: HTMLDivElement[] = Array.from(root.querySelectorAll<HTMLDivElement>(".tile"));
    let raf = 0;
    let isRunning = true;

    type S = {
      mx: number; my: number; tx: number; ty: number; cx: number; cy: number; phase: number;
      vx: number; vy: number; lastTx: number; lastTy: number;
    };
    const state = new Map<HTMLDivElement, S>();

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let mouseMoving = false;
    let lastMouseTime = Date.now();
    let heroRect = root.getBoundingClientRect();
    let containerRect = { left: 0, top: 0, width: 0, height: 0 };

    const updateCenters = () => {
      heroRect = root.getBoundingClientRect();
      const inner = root.querySelector<HTMLElement>(".hero-content-box");
      if (inner) {
        const cRect = inner.getBoundingClientRect();
        containerRect = { left: cRect.left, top: cRect.top, width: cRect.width, height: cRect.height };
      }
      tiles.forEach((tile) => {
        const r = tile.getBoundingClientRect();
        const s = state.get(tile) ?? {
          mx: 0, my: 0, tx: 0, ty: 0, cx: 0, cy: 0, phase: Math.random() * 2 - 1,
          vx: 0, vy: 0, lastTx: 0, lastTy: 0,
        };
        s.cx = r.left + r.width / 2;
        s.cy = r.top + r.height / 2;
        state.set(tile, s);
      });
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      mouseMoving = true;
      lastMouseTime = Date.now();
    };

    const loop = () => {
      if (!isRunning) return;
      if (mouseMoving && Date.now() - lastMouseTime > 200) mouseMoving = false;

      const cCx = containerRect.left + containerRect.width / 2;
      const cCy = containerRect.top + containerRect.height / 2;
      const safeR = Math.min(containerRect.width, containerRect.height) * 0.5 + 60;

      const heroBounds = {
        left: heroRect.left + 50,
        right: heroRect.right - 50,
        top: heroRect.top + 50,
        bottom: heroRect.bottom - 50,
      };

      tiles.forEach((tile) => {
        const s = state.get(tile)!;
        const inHero = px >= heroRect.left && px <= heroRect.right && py >= heroRect.top && py <= heroRect.bottom;
        let dx = 0, dy = 0, influence = 0, mag = 0;
        if (inHero) {
          dx = px - s.cx; dy = py - s.cy;
          const d = Math.hypot(dx, dy) || 1;
          influence = Math.max(0, 1 - d / MAG_RADIUS);
          mag = influence * MAG_MAX;
        }
        const ang = Math.atan2(dy, dx) + MAG_SWIRL * s.phase * influence;
        let tx = Math.cos(ang) * mag;
        let ty = Math.sin(ang) * mag;

        const dX = tx - s.lastTx;
        const dY = ty - s.lastTy;
        if (mouseMoving && inHero) {
          s.vx = dX * 0.5; s.vy = dY * 0.5;
        } else {
          // Mouse idle / outside hero, bleed off momentum without injecting
          // any new random energy. Otherwise, all tiles end up drifting in
          // sync because they share the same RNG-driven jitter.
          s.vx *= MOMENTUM_DECAY; s.vy *= MOMENTUM_DECAY;
          if (Math.abs(s.vx) < MOMENTUM_THRESHOLD) s.vx = 0;
          if (Math.abs(s.vy) < MOMENTUM_THRESHOLD) s.vy = 0;
          tx += s.vx * 25; ty += s.vy * 25;
        }
        s.lastTx = tx; s.lastTy = ty;

        const fX = s.cx + s.mx + tx;
        const fY = s.cy + s.my + ty;
        if (fX < heroBounds.left) { tx = heroBounds.left - s.cx - s.mx; s.vx = Math.max(0, s.vx); }
        else if (fX > heroBounds.right) { tx = heroBounds.right - s.cx - s.mx; s.vx = Math.min(0, s.vx); }
        if (fY < heroBounds.top) { ty = heroBounds.top - s.cy - s.my; s.vy = Math.max(0, s.vy); }
        else if (fY > heroBounds.bottom) { ty = heroBounds.bottom - s.cy - s.my; s.vy = Math.min(0, s.vy); }

        const cx = s.cx + s.mx + tx;
        const cy = s.cy + s.my + ty;
        const sdx = cx - cCx, sdy = cy - cCy;
        const sd = Math.hypot(sdx, sdy) || 1;
        if (sd < safeR) {
          const push = safeR - sd + SAFE_CFG.margin;
          tx += (sdx / sd) * push * 0.4;
          ty += (sdy / sd) * push * 0.4;
        }
        s.tx = tx; s.ty = ty;
      });

      for (let i = 0; i < tiles.length; i++) {
        const sa = state.get(tiles[i])!;
        for (let j = i + 1; j < tiles.length; j++) {
          const sb = state.get(tiles[j])!;
          const ax = sa.cx + sa.mx + sa.tx, ay = sa.cy + sa.my + sa.ty;
          const bx = sb.cx + sb.mx + sb.tx, by = sb.cy + sb.my + sb.ty;
          let dx = bx - ax, dy = by - ay;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < SEP_DIST) {
            const overlap = (SEP_DIST - dist) / SEP_DIST;
            const f = overlap * SEP_FORCE * 12;
            dx /= dist; dy /= dist;
            sa.tx -= dx * f; sa.ty -= dy * f;
            sb.tx += dx * f; sb.ty += dy * f;
          }
        }
      }

      tiles.forEach((tile) => {
        const s = state.get(tile)!;
        s.mx += (s.tx - s.mx) * SMOOTH_TILE;
        s.my += (s.ty - s.my) * SMOOTH_TILE;
        const fX = s.cx + s.mx, fY = s.cy + s.my;
        if (fX < heroBounds.left) s.mx = heroBounds.left - s.cx;
        else if (fX > heroBounds.right) s.mx = heroBounds.right - s.cx;
        if (fY < heroBounds.top) s.my = heroBounds.top - s.cy;
        else if (fY > heroBounds.bottom) s.my = heroBounds.bottom - s.cy;
        const cx = s.cx + s.mx, cy = s.cy + s.my;
        const dx = cx - cCx, dy = cy - cCy;
        const d = Math.hypot(dx, dy) || 1;
        const minD = safeR + SAFE_CFG.margin;
        if (d < minD) {
          const k = (minD - d) * 1.2;
          s.mx += (dx / d) * k;
          s.my += (dy / d) * k;
        }
        tile.style.setProperty("--mx", `${s.mx.toFixed(2)}px`);
        tile.style.setProperty("--my", `${s.my.toFixed(2)}px`);
        tile.style.transform =
          `translate(calc(var(--sx,0) * 10px + var(--mx,0px)), calc(var(--sy,0) * -8px + var(--my,0px))) translate(-50%,-50%)`;
      });

      raf = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        isRunning = false;
        cancelAnimationFrame(raf);
        return;
      }
      updateCenters();
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", handleResize);
    updateCenters();
    raf = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const blurredIds: TileId[] = ["yt", "ga", "snapchat_2", "twitch_2", "reddit", "discord", "quora_2", "vimeo_2", "tumblr_2"];
  const allSpecs: TileSpec[] = [...CORE, ...EXTRA];

  return (
    <>
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-background"
      >
        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        {/* Hero content area (icons + text), wrapped so floating icons stay in this region only and don't overlap the marquee below */}
        <div className="relative">
          {/* Content + floating icons share the same container rail so everything aligns with the navbar/logo */}
          <div className="relative container-main min-h-[520px] md:min-h-[min(calc(100svh-4rem),680px)] py-14 md:py-16 flex items-center justify-center">
            {/* Floating icons, constrained to the container rail, not the full viewport */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {allSpecs.map((spec, i) => {
                const d = POSITIONS_DESKTOP[spec.id];
                const m = POSITIONS_MOBILE[spec.id];
                return (
                  <GlassTile
                    key={spec.id}
                    Icon={spec.Icon}
                    color={spec.color}
                    leftPct={d.leftPct}
                    topPct={d.topPct}
                    leftPctMobile={m.leftPct}
                    topPctMobile={m.topPct}
                    delay={`${(i % 6) * 0.4}s`}
                    isBlurred={blurredIds.includes(spec.id)}
                  />
                );
              })}
            </div>

            {/* Content */}
            <div className="hero-content-box relative z-20 max-w-3xl mx-auto text-center">
              <h1 className="text-[2rem] md:text-5xl lg:text-[3.25rem] font-heading font-bold leading-[1.12] tracking-tight text-foreground">
                AI-Powered Marketing Partner for{" "}
                <span className="gradient-text">Scaling Brands</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                Everything you need to grow, everywhere.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex justify-center">
                {/* Mobile */}
                <div className="flex flex-col sm:hidden gap-3 w-full max-w-xs">
                  <Button asChild className="rounded-full h-12 font-semibold gap-2">
                    <Link to={primaryHref}><Handshake className="w-4 h-4" /> Book Free Session</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full h-12 font-semibold gap-2">
                    <Link to={secondaryHref}>{secondaryLabel} <ArrowRight className="w-4 h-4" /></Link>
                  </Button>
                </div>

                {/* Desktop segmented CTA with sliding pill */}
                <div ref={ctaRef} className="hero-cta hidden sm:flex relative items-center p-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border shadow-sm">
                  <span aria-hidden className="hero-cta__pill absolute top-1.5 bottom-1.5 rounded-full bg-primary transition-all duration-300 ease-out" />
                  <Link
                    to={primaryHref}
                    className="hero-cta__primary relative z-10 inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-semibold text-primary-foreground transition-colors duration-300"
                  >
                    <Handshake className="w-4 h-4" />
                    {primaryLabel}
                  </Link>
                  <Link
                    to={secondaryHref}
                    className="hero-cta__secondary relative z-10 inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-sm font-semibold text-foreground transition-colors duration-300"
                  >
                    {secondaryLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By marquee, part of hero (shares grid bg), sits flush at the bottom so it connects directly to the stats grid below */}
        <div className="relative z-20 pb-6 md:pb-8">
          <div className="mx-auto w-[94%] sm:w-[88%] md:w-[78%] lg:w-[70%] xl:w-[64%] rounded-2xl md:rounded-3xl border border-border bg-card/80 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4">
            <TrustedMarquee />
          </div>
        </div>

        <style>{`
          .hero-cta__pill {
            left: var(--pill-left, 6px);
            width: var(--primary-w, 0px);
            transform: translateX(0);
          }
          .hero-cta:has(.hero-cta__secondary:hover) .hero-cta__pill {
            width: var(--secondary-w, 0px);
            transform: translateX(var(--secondary-x, 0px));
          }
          .hero-cta:has(.hero-cta__secondary:hover) .hero-cta__primary { color: hsl(var(--foreground)); }
          .hero-cta:has(.hero-cta__secondary:hover) .hero-cta__secondary { color: hsl(var(--primary-foreground)); }

          .tile { --mx: 0px; --my: 0px; will-change: transform; }
          @media (max-width: 767px) {
            .tile { left: var(--left-mobile) !important; top: var(--top-mobile) !important; }
          }
          .tile-inner {
            width: 44px; height: 44px; border-radius: 10px;
            display: grid; place-items: center;
            background: hsl(var(--background));
            border: 1px solid hsl(var(--border));
            box-shadow: 0 4px 14px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.6);
            backdrop-filter: saturate(110%) blur(0.6px);
            will-change: transform;
            animation: tile-float 14s ease-in-out infinite alternate var(--d, 0s);
          }
          .tile-inner.blurred-icon { filter: blur(2px); opacity: 0.6; }
          @keyframes tile-float {
            0% { transform: translateY(0); }
            100% { transform: translateY(-12px); }
          }
        `}</style>
      </section>

    </>
  );
}
