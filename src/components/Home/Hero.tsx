// src/components/Home/Hero.tsx
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake } from "lucide-react";
import {
  SiLinkedin, SiFacebook, SiYoutube,
  SiInstagram, SiGoogleads, SiMeta, SiReddit, SiDiscord,
  SiWhatsapp, SiTwitch, SiOpenai, SiReplit,
} from "react-icons/si";
import { Sparkles, Workflow, Database, Layers, Zap, Mic, Heart, Compass } from "lucide-react";
import type { IconType } from "react-icons";

/* ---------- Brand colors ---------- */
const BRAND = {
  linkedin: "#0A66C2",      // LinkedIn official blue
  facebook: "#1877F2",      // Facebook official blue
  youtube: "#FF0000",       // YouTube official red
  pinterest: "#FF4500",     // Reddit official orange
  x: "#0A66C2",             // LinkedIn Sales Navigator blue
  tiktok: "#A855F7",        // AI icon purple
  instagram: "#E1306C",     // Instagram official pink
  googleads: "#FF6B6B",     // Lovable pink/red
  meta: "#0866FF",          // Meta official blue
  reddit: "#311C87",        // Apollo purple
  discord: "#000000",       // ElevenLabs black
  telegram: "#26A5E4",      // Telegram official blue
  snapchat: "#EA4E4E",      // n8n red
  whatsapp: "#25D366",      // WhatsApp official green
  twitch: "#9146FF",        // Twitch official purple
  spotify: "#1A73E8",       // Google Ads blue (foreground)
  vimeo: "#FF6B35",         // Clay orange
  tumblr: "#1FB8CD",        // Perplexity cyan
  quora: "#5865F2",         // Replit blue
  chatgpt: "#10A37F",       // ChatGPT/OpenAI official green
};

/* ---------- Glow base (all "spots" use this hue) ---------- */
const GLOW_RGB = "7,52,105"; // rgb(7,52,105)

/* ---------- Motion tuning ---------- */
const MAG_RADIUS = 500;  // Balanced range for mouse influence
const MAG_MAX = 35;  // Reduced movement capability for slower response
const MAG_SWIRL = 0.02;  // Reduced swirl for smoother movement

const SEP_DIST = 85;
const SEP_FORCE = 0.07;  // Balanced separation force

const SAFE_CFG = {
  cx: 0.50,
  cy: 0.46,
  inner: 0.46,  // Expanded inner safe radius to keep center clean
  pad: 120,     // Wider padding to avoid text/CTA
  margin: 24,   // Keep margin
};

// Slower, smoother movement with momentum
const SMOOTH_TILE = 0.05;  // Slower movement speed for smoother transitions
const SMOOTH_GLOBAL = 0.04;  // Slower global parallax
const MOMENTUM_DECAY = 0.995;  // Higher retention for smoother momentum
const MOMENTUM_THRESHOLD = 0.008;  // Threshold for momentum

/* ---------- Expanded Icon specs ---------- */
type TileId =
  | "yt" | "x" | "li" | "pi" | "fb" | "tt" | "ig" | "ga" | "meta"
  | "reddit" | "discord" | "telegram" | "snapchat_2" | "whatsapp_2" | "twitch_2"
  | "spotify_2" | "vimeo_2" | "tumblr_2" | "quora_2";

type TileSpec = { id: TileId; Icon: IconType; color: string };

// FOREGROUND ICONS (Above blur) - Keep as is
const CORE: TileSpec[] = [
  { id: "yt",         Icon: SiOpenai,     color: BRAND.chatgpt }, // ChatGPT (background) - OpenAI green
  { id: "x",          Icon: Compass,      color: BRAND.x }, // LinkedIn Sales Navigator
  { id: "li",         Icon: SiLinkedin,   color: BRAND.linkedin },
  { id: "pi",         Icon: SiReddit,     color: BRAND.pinterest }, // Reddit (foreground)
  { id: "fb",         Icon: SiFacebook,   color: BRAND.facebook },
  { id: "tt",         Icon: Sparkles,     color: BRAND.tiktok }, // AI icon (foreground)
  { id: "ig",         Icon: SiInstagram,  color: BRAND.instagram },
  { id: "ga",         Icon: Heart,        color: BRAND.googleads }, // Lovable (background)
  { id: "meta",       Icon: SiMeta,       color: BRAND.meta },
  { id: "snapchat_2", Icon: Workflow,     color: BRAND.snapchat }, // n8n (background)
  { id: "whatsapp_2", Icon: SiWhatsapp,   color: BRAND.whatsapp },
  { id: "twitch_2",   Icon: SiTwitch,     color: BRAND.twitch },
];

// BACKGROUND ICONS (Below blur) - Replaced with new tools
const EXTRA: TileSpec[] = [
  { id: "reddit",       Icon: Database,     color: BRAND.reddit }, // Apollo (background)
  { id: "discord",      Icon: Mic,          color: BRAND.discord }, // ElevenLabs (background)
  { id: "telegram",     Icon: SiYoutube,    color: BRAND.youtube }, // YouTube (foreground - keep)
  { id: "spotify_2",    Icon: SiGoogleads,  color: BRAND.spotify }, // Google Ads (foreground - keep)
  { id: "vimeo_2",      Icon: Layers,       color: BRAND.vimeo }, // Clay (background)
  { id: "tumblr_2",     Icon: Zap,          color: BRAND.tumblr }, // Perplexity (background)
  { id: "quora_2",      Icon: SiReplit,     color: BRAND.quora }, // Replit (background)
];


// Desktop positions - Based on Buffer reference image positioning
const POSITIONS_DESKTOP: Record<TileId, { leftPct: number; topPct: number }> = {
  // BLUR LAYER (Background icons - faded in reference)
  yt:         { leftPct: 5, topPct: 7 },      // ChatGPT - top-left (blur)
  snapchat_2: { leftPct: 88, topPct: 28 },    // n8n/Workflow - left upper (blur)
  ga:         { leftPct: 18, topPct: 55 },    // Heart/Lovable - left middle (blur)
  twitch_2:   { leftPct: 12, topPct: 80 },     // Twitch - left lower (blur)
  reddit:     { leftPct: 12, topPct: 35 },    // Apollo/Database - bottom-left (blur)
  vimeo_2:    { leftPct: 60, topPct: 88 },    // Clay/Layers - bottom-center (blur)
  tumblr_2:   { leftPct: 77, topPct: 88 },    // Perplexity/Zap - bottom-right (blur)
  discord:    { leftPct: 95, topPct: 48 },    // ElevenLabs/Mic - right middle (blur)
  quora_2:    { leftPct: 96, topPct: 85 },    // Replit - bottom-right corner (blur)
  
  // CLEAR LAYER (Foreground icons - sharp in reference)
  x:          { leftPct: 25, topPct: 13 },     // Compass/LinkedIn Nav - top-left-center (clear)
  telegram:   { leftPct: 7, topPct: 22 },     // YouTube - left upper (clear)
  li:         { leftPct: 9, topPct: 53 },    // LinkedIn - left middle (clear)
  whatsapp_2: { leftPct: 4, topPct: 88 },     // WhatsApp - left lower-mid (clear)
  ig:         { leftPct: 24, topPct: 80 },    // Instagram - bottom-left (clear)
  meta:       { leftPct: 43, topPct: 90 },    // Meta - bottom-left-center (clear)
  spotify_2:  { leftPct: 72, topPct: 13 },    // Google Ads - bottom-right-center (clear)
  fb:         { leftPct: 85, topPct: 68 },    // Facebook - right lower (clear)
  pi:         { leftPct: 95, topPct: 15 },    // Reddit - right upper (clear)
  tt:         { leftPct: 80, topPct: 50 },    // AI Sparkles - right middle (clear)
};

// Mobile positions - Optimized for mobile viewport (adjust these as needed)
const POSITIONS_MOBILE: Record<TileId, { leftPct: number; topPct: number }> = {
  // BLUR LAYER (Background icons)
  yt:         { leftPct: 8, topPct: 8 },      // ChatGPT - top-left (blur) - HIDDEN
  snapchat_2: { leftPct: 35, topPct: 10 },    // n8n/Workflow - top-center between YouTube and Google Ads (blur) - NOW VISIBLE
  ga:         { leftPct: 5, topPct: 40 },    // Heart/Lovable - left middle (blur)
  twitch_2:   { leftPct: 8, topPct: 85 },    // Twitch - left lower (blur)
  reddit:     { leftPct: 15, topPct: 15 },    // Apollo/Database - left (blur) - HIDDEN
  vimeo_2:    { leftPct: 90, topPct: 25 },    // Clay/Layers - below LinkedIn Nav (blur) - NOW VISIBLE
  tumblr_2:   { leftPct: 92, topPct: 85 },    // Perplexity/Zap - bottom-right (blur)
  discord:    { leftPct: 92, topPct: 50 },    // ElevenLabs/Mic - right middle (blur) - HIDDEN
  quora_2:    { leftPct: 92, topPct: 85 },    // Replit - bottom-right (blur) - HIDDEN
  
  // CLEAR LAYER (Foreground icons - visible on mobile)
  x:          { leftPct: 92, topPct: 6 },    // Compass/LinkedIn Nav - top-right (clear)
  telegram:   { leftPct: 8, topPct: 17 },     // YouTube - left upper (clear)
  li:         { leftPct: 5, topPct: 55 },    // LinkedIn - left middle (clear)
  whatsapp_2: { leftPct: 12, topPct: 98 },     // WhatsApp - left lower (clear)
  ig:         { leftPct: 92, topPct: 94 },    // Instagram - bottom-right (clear)
  meta:       { leftPct: 50, topPct: 96 },    // Meta - bottom-center (clear)
  spotify_2:  { leftPct: 70, topPct: 9 },    // Google Ads - top-right area (clear)
  fb:         { leftPct: 88, topPct: 65 },    // Facebook - right lower (clear) - HIDDEN
  pi:         { leftPct: 92, topPct: 55 },    // Reddit - right middle (clear)
  tt:         { leftPct: 85, topPct: 50 },    // AI Sparkles - right middle (clear) - HIDDEN
};

/* ---------- Single-layer glass tile ---------- */
function GlassTile({
  Icon, color, leftPct, topPct, leftPctMobile, topPctMobile, delay = "0s", className = "", iconId = "", isBlurred = false,
}: {
  Icon: IconType; 
  color: string; 
  leftPct?: number; 
  topPct?: number; 
  leftPctMobile?: number;
  topPctMobile?: number;
  delay?: string; 
  className?: string; 
  iconId?: string;
  isBlurred?: boolean;
}) {
  return (
    <div
      className={`tile absolute ${className} icon-${iconId}`}
      style={
        {
          left: `${leftPct}%`,
          top: `${topPct}%`,
          transform: "translate(-50%, -50%)",
          ["--d" as any]: delay,
          ["--left-mobile" as any]: `${leftPctMobile}%`,
          ["--top-mobile" as any]: `${topPctMobile}%`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className={`floater tile-inner ${isBlurred ? 'blurred-icon' : ''}`}>
        <Icon size={24} style={{ color }} />
      </div>
    </div>
  );
}

type HeroProps = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function Hero({
  title = "Grow your social presence with confidence",
  subtitle = "Everything you need to grow, everywhere.",
  primaryHref = "/resources/support",
  primaryLabel = "Book your free consulting session",
  secondaryHref = "/about",
  secondaryLabel = "Learn more",
}: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);


  /* -------- Section parallax (desktop only) -------- */
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

  /* -------- Magnetic motion + separation + hard clamp to safe-zone -------- */
  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    
    // Disable motion on mobile devices
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return; // Exit early on mobile - no motion effects
    }
    
    let tiles: HTMLDivElement[] = [];
    let raf = 0;
    let isRunning = false;

    // Function to initialize or reinitialize the animation
    const initAnimation = () => {
      tiles = Array.from(root.querySelectorAll<HTMLDivElement>(".tile"));
      if (!tiles.length) {
        // Retry up to 10 times with increasing delays
        let retryCount = 0;
        const maxRetries = 10;
        const retryInit = () => {
          retryCount++;
          tiles = Array.from(root.querySelectorAll<HTMLDivElement>(".tile"));
          if (tiles.length > 0) {
            // Found tiles, proceed with initialization
            tiles.forEach((tile) => {
              tile.style.setProperty("--mx", "0px");
              tile.style.setProperty("--my", "0px");
              tile.style.transform = "translate(-50%, -50%)";
            });
            if (!isRunning) {
              isRunning = true;
              startLoop();
            }
          } else if (retryCount < maxRetries) {
            // Retry with exponential backoff
            setTimeout(retryInit, 100 * retryCount);
          }
        };
        retryInit();
        return;
      }

      // Reset all tile transforms on mount to prevent hot-reload issues
      tiles.forEach((tile) => {
        tile.style.setProperty("--mx", "0px");
        tile.style.setProperty("--my", "0px");
        tile.style.transform = "translate(-50%, -50%)";
      });

      if (!isRunning) {
        isRunning = true;
        startLoop();
      }
    };

    type S = { 
      mx: number; my: number; tx: number; ty: number; cx: number; cy: number; phase: number;
      vx: number; vy: number; // velocity for momentum
      lastTx: number; lastTy: number; // previous target positions
    };
    const state = new Map<HTMLDivElement, S>();

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let lastPx = px;
    let lastPy = py;
    let mouseMoving = false;
    let lastMouseTime = Date.now();
    let heroRect = root.getBoundingClientRect();
    let containerRect = { left: 0, top: 0, width: 0, height: 0 };

    const updateCenters = () => {
      heroRect = root.getBoundingClientRect();

      const contentWrapper = root.querySelector('.absolute.flex.items-center.justify-center.z-20') as HTMLElement
        || root.querySelector('.absolute.flex.items-center.justify-center.z-10') as HTMLElement;
      if (contentWrapper) {
        const innerContainer = contentWrapper.querySelector('.mx-auto.max-w-\\[1440px\\]') as HTMLElement;
        if (innerContainer) {
          const cRect = innerContainer.getBoundingClientRect();
          containerRect = {
            left: cRect.left,
            top: cRect.top,
            width: cRect.width,
            height: cRect.height
          };
        }
      }

      tiles.forEach((tile) => {
        const r = tile.getBoundingClientRect();
        const s = state.get(tile) ?? {
          mx: 0, my: 0, tx: 0, ty: 0, cx: 0, cy: 0, phase: Math.random() * 2 - 1,
          vx: 0, vy: 0, lastTx: 0, lastTy: 0
        };
        s.cx = r.left + r.width / 2;
        s.cy = r.top + r.height / 2;
        state.set(tile, s);
      });
    };

    const onMove = (e: PointerEvent) => { 
      lastPx = px;
      lastPy = py;
      px = e.clientX; 
      py = e.clientY; 
      mouseMoving = true;
      lastMouseTime = Date.now();
    };

    const startLoop = () => {
      if (raf) cancelAnimationFrame(raf);
      updateCenters();
      loop();
    };

    const loop = () => {
      if (!isRunning) return;
      
      const now = Date.now();
      const timeSinceLastMove = now - lastMouseTime;
      
      // Check if mouse has stopped moving (after 200ms of no movement for smoother transition)
      if (mouseMoving && timeSinceLastMove > 200) {
        mouseMoving = false;
      }

      const containerCx = containerRect.left + containerRect.width / 2;
      const containerCy = containerRect.top + containerRect.height / 2;
      const safeR = Math.min(containerRect.width, containerRect.height) * 0.50 + 60;  // Increased safe radius

      // Hero section boundaries
      const heroBounds = {
        left: heroRect.left + 50, // 50px padding from edges
        right: heroRect.right - 50,
        top: heroRect.top + 50,
        bottom: heroRect.bottom - 50
      };

      tiles.forEach((tile) => {
        const s = state.get(tile)!;
        
        // Only apply mouse influence if mouse is within hero section
        const mouseInHero = px >= heroRect.left && px <= heroRect.right && 
                           py >= heroRect.top && py <= heroRect.bottom;
        
        let dx = 0, dy = 0, influence = 0, mag = 0;
        
        if (mouseInHero) {
          dx = px - s.cx;
          dy = py - s.cy;
          const d = Math.hypot(dx, dy) || 1;
          influence = Math.max(0, 1 - d / MAG_RADIUS);
          mag = influence * MAG_MAX;
        }

        const ang = Math.atan2(dy, dx) + MAG_SWIRL * s.phase * influence;
        let tx = Math.cos(ang) * mag;
        let ty = Math.sin(ang) * mag;

        // Calculate velocity from target position changes
        const deltaX = tx - s.lastTx;
        const deltaY = ty - s.lastTy;
        
        if (mouseMoving && mouseInHero) {
          // Mouse is moving within hero - update velocity and use current target
          s.vx = deltaX * 0.5;
          s.vy = deltaY * 0.5;
        } else {
          // Mouse stopped or outside hero - apply momentum with very slow decay
          s.vx *= MOMENTUM_DECAY;
          s.vy *= MOMENTUM_DECAY;
          
          // Add subtle continuous drift when momentum gets very low
          if (Math.abs(s.vx) < MOMENTUM_THRESHOLD && Math.abs(s.vy) < MOMENTUM_THRESHOLD) {
            s.vx += (Math.random() - 0.5) * 0.01;
            s.vy += (Math.random() - 0.5) * 0.01;
          }
          
          // Add momentum to target position
          tx += s.vx * 25;
          ty += s.vy * 25;
        }

        // Store current target for next frame velocity calculation
        s.lastTx = tx;
        s.lastTy = ty;

        // Apply hard boundary constraints to keep icons within hero section
        const finalX = s.cx + s.mx + tx;
        const finalY = s.cy + s.my + ty;
        
        if (finalX < heroBounds.left) {
          tx = heroBounds.left - s.cx - s.mx;
          s.vx = Math.max(0, s.vx); // Stop leftward momentum
        } else if (finalX > heroBounds.right) {
          tx = heroBounds.right - s.cx - s.mx;
          s.vx = Math.min(0, s.vx); // Stop rightward momentum
        }
        
        if (finalY < heroBounds.top) {
          ty = heroBounds.top - s.cy - s.my;
          s.vy = Math.max(0, s.vy); // Stop upward momentum
        } else if (finalY > heroBounds.bottom) {
          ty = heroBounds.bottom - s.cy - s.my;
          s.vy = Math.min(0, s.vy); // Stop downward momentum
        }

        const cx = s.cx + s.mx + tx;
        const cy = s.cy + s.my + ty;
        const sdx = cx - containerCx;
        const sdy = cy - containerCy;
        const sd  = Math.hypot(sdx, sdy) || 1;

        if (sd < safeR) {
          const push = (safeR - sd + SAFE_CFG.margin);
          tx += (sdx / sd) * push * 0.40;  // Increased push force
          ty += (sdy / sd) * push * 0.40;
        }

        s.tx = tx;
        s.ty = ty;
      });

      for (let i = 0; i < tiles.length; i++) {
        const a = tiles[i]; const sa = state.get(a)!;
        for (let j = i + 1; j < tiles.length; j++) {
          const b = tiles[j]; const sb = state.get(b)!;

          const ax = sa.cx + sa.mx + sa.tx;
          const ay = sa.cy + sa.my + sa.ty;
          const bx = sb.cx + sb.mx + sb.tx;
          const by = sb.cy + sb.my + sb.ty;

          let dx = bx - ax, dy = by - ay;
          let dist = Math.hypot(dx, dy) || 1;
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

        // Hero section boundaries for final position check
        const heroBounds = {
          left: heroRect.left + 50,
          right: heroRect.right - 50,
          top: heroRect.top + 50,
          bottom: heroRect.bottom - 50
        };

        // Final boundary enforcement
        const finalX = s.cx + s.mx;
        const finalY = s.cy + s.my;
        
        if (finalX < heroBounds.left) {
          s.mx = heroBounds.left - s.cx;
        } else if (finalX > heroBounds.right) {
          s.mx = heroBounds.right - s.cx;
        }
        
        if (finalY < heroBounds.top) {
          s.my = heroBounds.top - s.cy;
        } else if (finalY > heroBounds.bottom) {
          s.my = heroBounds.bottom - s.cy;
        }

        const cx = s.cx + s.mx;
        const cy = s.cy + s.my;
        const dx = cx - containerCx;
        const dy = cy - containerCy;
        const d  = Math.hypot(dx, dy) || 1;
        const minD = safeR + SAFE_CFG.margin;
        if (d < minD) {
          const k = (minD - d) * 1.2;  // Stronger enforcement
          s.mx += (dx / d) * k;
          s.my += (dy / d) * k;
        }

        tile.style.setProperty("--mx", `${s.mx.toFixed(2)}px`);
        tile.style.setProperty("--my", `${s.my.toFixed(2)}px`);
        tile.style.transform =
          `translate(calc(var(--sx,0) * 10px + var(--mx,0px)),
                     calc(var(--sy,0) * -8px + var(--my,0px))) translate(-50%,-50%)`;
      });

      if (isRunning) {
        raf = requestAnimationFrame(loop);
      }
    };

    // Add resize listener to update centers and check if mobile
    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      if (nowMobile) {
        // Stop animation if resized to mobile
        isRunning = false;
        if (raf) cancelAnimationFrame(raf);
        return;
      }
      updateCenters();
    };

    // Add visibility change listener to restart animation when tab becomes visible
    const handleVisibilityChange = () => {
      const nowMobile = window.innerWidth < 768;
      if (!document.hidden && !nowMobile) {
        // Always restart when tab becomes visible (desktop only)
        if (!isRunning) {
          isRunning = true;
          // Re-query tiles in case DOM changed
          tiles = Array.from(root.querySelectorAll<HTMLDivElement>(".tile"));
          if (tiles.length > 0) {
            startLoop();
          }
        }
      } else if (document.hidden && isRunning) {
        // Pause when tab is hidden to save resources
        isRunning = false;
        if (raf) cancelAnimationFrame(raf);
      }
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Initialize animation
    initAnimation();

    return () => {
      isRunning = false;
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      
      // Reset transforms on cleanup to prevent hot-reload issues
      tiles.forEach((tile) => {
        tile.style.setProperty("--mx", "0px");
        tile.style.setProperty("--my", "0px");
        tile.style.transform = "translate(-50%, -50%)";
      });
    };
  }, []);

  return (
    <>
    <section
      ref={heroRef}
      className="
        relative isolate overflow-x-clip overflow-y-visible
        pt-16 md:pt-20 lg:pt-24
        pb-16 md:pb-20 lg:pb-24
        text-[#0A1F3D] min-h-[620px]
      "
    >
      {/* Main Backdrop - White Background */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          background: "#ffffff",
        }}
      />

      {/* Subtle Grid Pattern with Fade - Icon-sized cells */}
      <div
        className="absolute inset-0 -z-29 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: `
            radial-gradient(
              ellipse 80% 60% at 50% 45%,
              black 0%,
              rgba(0, 0, 0, 0.8) 15%,
              rgba(0, 0, 0, 0.6) 30%,
              rgba(0, 0, 0, 0.3) 50%,
              transparent 70%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              ellipse 80% 60% at 50% 45%,
              black 0%,
              rgba(0, 0, 0, 0.8) 15%,
              rgba(0, 0, 0, 0.6) 30%,
              rgba(0, 0, 0, 0.3) 50%,
              transparent 70%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Glowing Effects - Removed for white background */}
      {/* <span className="pointer-events-none absolute left-[10%] -top-8 h-56 w-56 rounded-full bg-[#0074ED]/25 blur-3xl -z-29" />
      <span className="pointer-events-none absolute right-[8%] -bottom-10 h-64 w-64 rounded-full bg-[#0074ED]/20 blur-3xl -z-29" /> */}

      {/* All Icons - Single layer with blur applied to background icons */}
      <div className="absolute inset-x-0 top-0 bottom-16 sm:bottom-18 md:bottom-20 lg:bottom-24 flex items-center justify-center z-0" aria-hidden="true">
        <div className="mx-auto max-w-[1440px] w-full h-full relative">
          {[
            // Background icons (blurred)
            ...CORE.filter(spec => ['yt', 'ga', 'snapchat_2', 'twitch_2'].includes(spec.id)),
            ...EXTRA.filter(spec => ['reddit', 'discord', 'quora_2', 'vimeo_2', 'tumblr_2'].includes(spec.id)),
            // Foreground icons (sharp)
            ...CORE.filter(spec => ['x', 'li', 'tt', 'ig', 'meta', 'whatsapp_2', 'pi', 'fb'].includes(spec.id)),
            ...EXTRA.filter(spec => ['telegram', 'spotify_2'].includes(spec.id))
          ].map((spec, i) => {
            const pctDesktop = POSITIONS_DESKTOP[spec.id];
            const pctMobile = POSITIONS_MOBILE[spec.id];
            const hiddenOnMobile = ['tt', 'fb', 'quora_2', 'yt', 'reddit', 'discord', 'tumblr_2'].includes(spec.id);
            // Check if this icon should be blurred (background layer)
            const isBlurred = ['yt', 'ga', 'snapchat_2', 'twitch_2', 'reddit', 'discord', 'quora_2', 'vimeo_2', 'tumblr_2'].includes(spec.id);
            return (
              <GlassTile
                key={spec.id}
                Icon={spec.Icon}
                color={spec.color}
                leftPct={pctDesktop.leftPct}
                topPct={pctDesktop.topPct}
                leftPctMobile={pctMobile.leftPct}
                topPctMobile={pctMobile.topPct}
                delay={`${(i * 0.08).toFixed(2)}s`}
                className={hiddenOnMobile ? 'hidden md:block' : ''}
                iconId={spec.id}
                isBlurred={isBlurred}
              />
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 top-0 bottom-16 sm:bottom-18 md:bottom-20 lg:bottom-24 flex items-center justify-center z-20">
        <div className="mx-auto max-w-[1440px] px-4 w-full h-full flex items-center">
          <div className="p-8 md:p-12 w-full h-full flex items-center">
            <div className="max-w-4xl mx-auto text-center w-full">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-[#0A1F3D]" style={{ lineHeight: "1.3" }}>
                AI-Powered Marketing Partner for{' '}
                <span className="text-[#3369fd]">
                  Scaling Brands
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-[#0A1F3D]/85 mb-7 md:mb-8 max-w-3xl mx-auto">
                {subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="mt-2 flex justify-center">
                <div className="w-full max-w-[560px] md:max-w-[600px]">
                  {/* Mobile: Stacked buttons without blur container */}
                  <div className="flex flex-col gap-3 md:hidden">
                    {/* Primary */}
                    <Link
                      to={primaryHref}
                      className="
                        inline-flex items-center justify-center
                        h-12 rounded-full
                        bg-[#3369fd] text-white
                        text-[15px] font-semibold tracking-tight
                        px-6
                        shadow-[inset_0_-2px_0_rgba(0,0,0,.08)]
                        transition-colors
                        hover:bg-[#2557e8]
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3369fd]/30
                      "
                    >
                      <Handshake className="mr-2 h-4 w-4" />
                      Book Free Session
                    </Link>

                    {/* Secondary */}
                    <Link
                      to={secondaryHref}
                      className="
                        inline-flex items-center justify-center
                        h-12 rounded-full
                        bg-white text-[#0A1F3D]
                        text-[15px] font-medium
                        px-6
                        border border-slate-600/80
                        transition-colors duration-150
                        hover:bg-[#F3F6FA] hover:border-slate-700
                        active:bg-[#E9EEF5]
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1F3D]/20
                        group
                      "
                    >
                      <span className="mr-2">{secondaryLabel}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  {/* Desktop: Segmented CTA with blur container */}
                  <div
                    className="
                      hidden md:block
                      rounded-full
                      p-1.5 md:p-2
                      shadow-[0_8px_22px_rgba(0,0,0,0.14)]
                      ring-1 ring-white/10
                    "
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(12px) saturate(1.1)',
                      WebkitBackdropFilter: 'blur(12px) saturate(1.1)',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    <div className="grid grid-cols-[1.7fr_1fr] gap-1.5 md:gap-2">
                      {/* Primary */}
                      <Link
                        to={primaryHref}
                        className="
                          inline-flex items-center justify-center
                          h-10 md:h-11 rounded-full
                          bg-[#3369fd] text-white
                          text-[15px] font-semibold tracking-tight
                          px-4 md:px-5
                          shadow-[inset_0_-2px_0_rgba(0,0,0,.08)]
                          transition-colors
                          hover:bg-[#2557e8]
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3369fd]/30
                        "
                      >
                        <Handshake className="mr-2 h-4 w-4" />
                        {primaryLabel}
                      </Link>

                      {/* Secondary */}
                      <Link
                        to={secondaryHref}
                        className="
                          inline-flex items-center justify-center
                          h-10 md:h-11 rounded-full
                          bg-white text-[#0A1F3D]
                          text-[15px] font-medium
                          px-4 md:px-5
                          border border-slate-600/80
                          transition-colors duration-150
                          hover:bg-[#F3F6FA] hover:border-slate-700
                          active:bg-[#E9EEF5]
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1F3D]/20
                          group
                        "
                      >
                        <span className="mr-2">{secondaryLabel}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /CTA */}
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        :root {
          --safe-cx: 50%;
          --safe-cy: 46%;
          --safe-in: 30%;
          --safe-out: 44%;
        }
        @media (min-width: 1024px) {
          :root { --safe-in: 29%; --safe-out: 43%; }
        }
        @media (min-width: 1440px) {
          :root { --safe-in: 28%; --safe-out: 42%; }
        }

        .tile { 
          --mx: 0px; 
          --my: 0px; 
          will-change: transform;
        }
        
        /* Mobile positioning - Override inline styles */
        @media (max-width: 767px) {
          .tile {
            left: var(--left-mobile) !important;
            top: var(--top-mobile) !important;
          }
        }
        
        .tile-inner {
          width: 44px; height: 44px; border-radius: 6px;
          display: grid; place-items: center;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 2px 8px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.08),
                      inset 0 1px 0 rgba(255,255,255,.10);
          backdrop-filter: saturate(110%) blur(0.6px);
          will-change: transform;
          animation: float 14s ease-in-out infinite alternate var(--d, 0s);
          animation-play-state: running;
        }
        .tile-inner.blurred-icon {
          filter: blur(2px);
          opacity: 0.7;
        }
        @keyframes float { 
          0% { transform: translateY(0) } 
          100% { transform: translateY(-12px) } 
        }

      `}</style>
    </section>
    
    {/* Spacer div after hero section - adds gap at bottom with responsive curved edges - hidden on mobile */}
    <div 
      className="hidden md:block md:h-20 lg:h-24 w-full bg-white rounded-b-[60px]"
    ></div>
    </>
  );
}
