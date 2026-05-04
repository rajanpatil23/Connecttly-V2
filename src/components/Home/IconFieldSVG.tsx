import React from "react";
import {
  SiLinkedin, SiFacebook, SiYoutube,
  SiInstagram, SiGoogleads, SiMeta, SiReddit, SiDiscord,
  SiWhatsapp, SiTwitch, SiOpenai, SiReplit,
} from "react-icons/si";
import { Sparkles, Workflow, Database, Layers, Zap, Mic, Heart, Compass } from "lucide-react";

/**
 * Resolution-independent icon field using a single SVG with a fixed viewBox grid.
 * - viewBox coordinates: 100 x 60 units (maps uniformly to any container size)
 * - Two layers: blur (background) and clear (foreground)
 * - Central mask hole keeps headline/CTA area clean and uncluttered
 *
 * IMPORTANT:
 * - Keep the same icons, colors, and layering as the existing Hero.
 * - Only the placement system is changed to stable SVG coordinates.
 */

// Brand colors (copied to match existing palette)
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

 // Tile size inside the 100 x 60 viewBox grid
const TILE_W = 5;
const TILE_H = 5;

// Icon size within the tile
const ICON_SIZE = 2.4; // in viewBox units
const ICON_OFFSET_X = (TILE_W - ICON_SIZE) / 2;
const ICON_OFFSET_Y = (TILE_H - ICON_SIZE) / 2;

// Utility to render a React-icon/lucide SVG in an <svg> slot
function IconSVG({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <g transform={`translate(${ICON_OFFSET_X}, ${ICON_OFFSET_Y})`}>
      {/* Wrap react-icons output into a foreignObject for robustness across engines */}
      {/* However, most react-icons render plain <svg>; nesting svg inside svg is valid */}
      <g>
        {/* @ts-ignore */}
        {React.cloneElement(children as any, {
          width: ICON_SIZE,
          height: ICON_SIZE,
          color,
          fill: "currentColor",
        })}
      </g>
    </g>
  );
}

// Foreground (clear) icons in viewBox units (converted from px -> 1152x620 => 100x60)
const CLEAR_ICONS: {
  id: string;
  x: number;
  y: number;
  render: () => React.ReactNode;
}[] = [
  { id: "x", x: 50.0, y: 10.6452, render: () => <Compass /> },                                     // x: 576,110
  { id: "telegram", x: 29.5139, y: 19.3548, render: () => <SiYoutube /> },                         // 340,200
  { id: "li", x: 31.25, y: 31.9355, render: () => <SiLinkedin /> },                                // 360,330
  { id: "whatsapp_2", x: 26.0417, y: 41.7742, render: () => <SiWhatsapp /> },                      // 300,430
  { id: "ig", x: 39.9306, y: 54.1935, render: () => <SiInstagram /> },                             // 460,560
  { id: "tt", x: 80.7292, y: 29.0323, render: () => <Sparkles /> },                                // 930,300
  { id: "pi", x: 88.5417, y: 21.2903, render: () => <SiReddit /> },                                // 1020,220
  { id: "spotify_2", x: 85.0694, y: 42.5806, render: () => <SiGoogleads /> },                      // 980,440
  { id: "meta", x: 83.3333, y: 54.1935, render: () => <SiMeta /> },                                // 960,560
  { id: "fb", x: 90.2778, y: 54.1935, render: () => <SiFacebook /> },                               // 1040,560
];

// Background (blur) icons in viewBox units
const BLUR_ICONS: {
  id: string;
  x: number;
  y: number;
  render: () => React.ReactNode;
}[] = [
  { id: "yt", x: 20.8333, y: 8.7097, render: () => <SiOpenai /> },                                 // 240,90
  { id: "snapchat_2", x: 14.7569, y: 21.2903, render: () => <Workflow /> },                        // 170,220
  { id: "reddit_bg", x: 13.0208, y: 34.8387, render: () => <Database /> },                         // 150,360
  { id: "vimeo_2", x: 16.4931, y: 50.3226, render: () => <Layers /> },                             // 190,520
  { id: "tumblr_2", x: 36.4583, y: 55.1613, render: () => <Zap /> },                               // 420,570
  { id: "quora_2", x: 62.5, y: 55.1613, render: () => <SiReplit /> },                              // 720,570
  { id: "discord", x: 78.125, y: 47.4194, render: () => <Mic /> },                                  // 900,490
  { id: "twitch_2", x: 90.2778, y: 34.8387, render: () => <SiTwitch /> },                          // 1040,360
  { id: "ga", x: 86.8056, y: 24.1935, render: () => <Heart /> },                                   // 1000,250
];

// Colors map for the same icons used in Hero
const COLORS: Record<string, string> = {
  x: BRAND.x,
  telegram: BRAND.youtube,
  li: BRAND.linkedin,
  whatsapp_2: BRAND.whatsapp,
  ig: BRAND.instagram,
  tt: BRAND.tiktok,
  pi: BRAND.pinterest,
  spotify_2: BRAND.spotify,
  meta: BRAND.meta,
  fb: BRAND.facebook,

  yt: BRAND.chatgpt,
  snapchat_2: BRAND.snapchat,
  reddit_bg: BRAND.reddit,
  vimeo_2: BRAND.vimeo,
  tumblr_2: BRAND.tumblr,
  quora_2: BRAND.quora,
  discord: BRAND.discord,
  twitch_2: BRAND.twitch,
  ga: BRAND.googleads,
};

// Rounded tile with subtle border/background
function TileRect({ blur }: { blur?: boolean }) {
  return (
    <rect
      x={0}
      y={0}
      width={TILE_W}
      height={TILE_H}
      rx={1}
      ry={1}
      fill="rgba(255,255,255,0.10)"
      stroke="rgba(0,0,0,0.12)"
      strokeWidth={0.08}
      filter={blur ? "url(#tile-blur)" : "url(#tile-shadow)"}
    />
  );
}

export default function IconFieldSVG() {
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Soft shadow for clear tiles */}
          <filter id="tile-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.2" floodColor="rgba(0,0,0,0.20)" />
            <feDropShadow dx="0" dy="0.5" stdDeviation="0.6" floodColor="rgba(0,0,0,0.12)" />
          </filter>

          {/* Blur for background tiles */}
          <filter id="tile-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>

          {/* Central mask: white areas show icons, black hides them (hole around text/CTA) */}
          <mask id="content-hole" x="0" y="0" width="100" height="60" maskUnits="userSpaceOnUse">
            {/* Show everywhere */}
            <rect x="0" y="0" width="100" height="60" fill="white" />
            {/* Hide center (tune this once if needed) */}
            <rect x="23" y="12" width="54" height="36" rx="5" ry="5" fill="black" />
          </mask>
        </defs>

        {/* Background/blur layer */}
        <g mask="url(#content-hole)">
          {BLUR_ICONS.map((item) => (
            <g key={item.id} transform={`translate(${item.x - TILE_W / 2}, ${item.y - TILE_H / 2})`}>
              <TileRect blur />
              <IconSVG color={COLORS[item.id]}>
                {/* @ts-ignore */}
                {item.render()}
              </IconSVG>
            </g>
          ))}
        </g>

        {/* Foreground/clear layer (above blur) */}
        <g mask="url(#content-hole)">
          {CLEAR_ICONS.map((item) => (
            <g key={item.id} transform={`translate(${item.x - TILE_W / 2}, ${item.y - TILE_H / 2})`}>
              <TileRect />
              <IconSVG color={COLORS[item.id]}>
                {/* @ts-ignore */}
                {item.render()}
              </IconSVG>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
