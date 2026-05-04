import type {
  BrandKit,
  ContentModel,
  PlatformKey,
  PostTypeKey,
  ThemeKey,
  VariationKey,
} from "../types";
import { PLATFORM_SPECS } from "../constants";

/* Simple in-memory image cache for logos */
const imgCache = new Map<string, HTMLImageElement>();
async function loadImage(src: string): Promise<HTMLImageElement> {
  if (imgCache.has(src)) return imgCache.get(src)!;
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode().catch(() => {});
  imgCache.set(src, img);
  return img;
}

/* ---- helpers ---- */
function pickThemeColors(theme: ThemeKey, brand: BrandKit): { bg: string | CanvasGradient; fg: string; accent: string } {
  switch (theme) {
    case "brand": {
      return { bg: brand.primary, fg: "#ffffff", accent: brand.secondary };
    }
    case "minimal": {
      return { bg: "#ffffff", fg: "#0A1F3D", accent: "#0074ED" };
    }
    case "bold": {
      return { bg: "#000000", fg: "#ffffff", accent: "#FFB703" };
    }
    case "elegant": {
      return { bg: "#F7F4EF", fg: "#2B2B2B", accent: "#7A6A58" };
    }
    case "playful": {
      return { bg: "#FFF4E6", fg: "#1F2937", accent: "#FF6B6B" };
    }
    case "tech": {
      return { bg: "#0B1220", fg: "#E5E7EB", accent: "#00D4FF" };
    }
    case "festive": {
      return { bg: "#FFF8E1", fg: "#1F2937", accent: "#E11D48" };
    }
    case "surprise": {
      const palette = [
        { bg: "#111827", fg: "#F9FAFB", accent: "#60A5FA" },
        { bg: "#FDF2F8", fg: "#111827", accent: "#DB2777" },
        { bg: "#F0FDF4", fg: "#111827", accent: "#10B981" },
      ];
      return palette[Math.floor(Math.random() * palette.length)];
    }
    default:
      return { bg: brand.primary, fg: "#ffffff", accent: brand.secondary };
  }
}

function setFont(ctx: CanvasRenderingContext2D, size: number, brand: BrandKit, weight: number | string = 600) {
  ctx.font = `${weight} ${size}px ${brand.font}`;
  ctx.textBaseline = "alphabetic";
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = (text || "").split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/* ---- main draw ---- */
export async function drawComposite(
  ctx: CanvasRenderingContext2D,
  params: {
    platform: PlatformKey;
    postType: PostTypeKey;
    brand: BrandKit;
    theme: ThemeKey;
    content: ContentModel;
    variation: VariationKey;
    width: number;
    height: number;
  }
) {
  const { platform, postType, brand, theme, content, variation, width: W, height: H } = params;

  // clear
  ctx.clearRect(0, 0, W, H);

  // background (solid or gradient for some themes)
  const { accent } = PLATFORM_SPECS[platform];
  let themeColors = pickThemeColors(theme, brand);

  // Special case: brand theme with gradient using brand → secondary
  let bg: string | CanvasGradient = themeColors.bg;
  if (theme === "brand") {
    const g = ctx.createLinearGradient(0, 0, W, 0);
    g.addColorStop(0, brand.primary);
    g.addColorStop(1, brand.secondary);
    bg = g;
  }
  // Tech theme gradient
  if (theme === "tech") {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#0B1220");
    g.addColorStop(1, "#0F172A");
    bg = g;
  }

  ctx.fillStyle = bg as any;
  ctx.fillRect(0, 0, W, H);

  // Optional decorative ribbon depending on variation
  if (variation === "v2") {
    ctx.fillStyle = brand.secondary;
    ctx.fillRect(0, 0, Math.max(14, Math.round(W * 0.035)), H);
  } else if (variation === "v3") {
    ctx.fillStyle = brand.secondary;
    ctx.fillRect(0, 0, W, Math.max(14, Math.round(H * 0.14)));
  }

  // Draw logo if provided (small, corner)
  if (brand.logoDataUrl) {
    try {
      const img = await loadImage(brand.logoDataUrl);
      const logoSize = Math.min(W, H) * 0.12;
      const pad = Math.round(Math.min(W, H) * 0.04);
      ctx.save();
      // white chip behind for contrast
      ctx.globalAlpha = 0.92;
      drawRoundedRect(ctx, W - logoSize - pad - 10, pad - 6, logoSize + 20, logoSize + 20, 14);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.drawImage(img, W - logoSize - pad, pad, logoSize, logoSize);
      ctx.restore();
    } catch {
      /* ignore logo errors */
    }
  }

  // Content area
  const margin = Math.round(Math.min(W, H) * 0.08);
  const innerW = W - margin * 2;
  let cursorY = variation === "v3" ? margin + Math.round(H * 0.14) : margin;

  // Typography sizes
  const big = Math.max(28, Math.round(Math.min(W, H) * 0.08));
  const mid = Math.max(18, Math.round(Math.min(W, H) * 0.045));
  const small = Math.max(14, Math.round(Math.min(W, H) * 0.032));

  const textColor = theme === "minimal" ? "#0A1F3D" : themeColors.fg;

  // decide alignment by variation
  const align: CanvasTextAlign = variation === "v1" ? "center" : "left";
  const xBase = variation === "v1" ? W / 2 : margin;

  // draw helpers
  const drawBlock = (text: string, size: number, weight = 700, lineGap = 0.2) => {
    setFont(ctx, size, brand, weight);
    ctx.fillStyle = textColor;
    ctx.textAlign = align;
    const maxWidth = innerW;
    const lines = wrapText(ctx, text, maxWidth);
    const lh = Math.round(size * (1 + lineGap));
    for (const line of lines) {
      ctx.fillText(line, xBase, cursorY, maxWidth);
      cursorY += lh;
    }
    cursorY += Math.round(size * 0.2);
  };

  const drawTagChip = (text: string) => {
    setFont(ctx, small, brand, 600);
    const padX = 14, padY = 8;
    const w = Math.ceil(ctx.measureText(text).width) + padX * 2;
    const h = small + padY * 2;
    const x = align === "center" ? Math.round(W / 2 - w / 2) : margin;
    drawRoundedRect(ctx, x, cursorY, w, h, 10);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.fillText(text, x + padX, cursorY + h - padY - 4);
    cursorY += h + Math.round(small * 0.6);
  };

  // Render depending on post type
  switch (postType) {
    case "promo": {
      if (content.headline) drawBlock(content.headline, big, 800, 0.1);
      if (content.subhead)  drawBlock(content.subhead, mid, 600);
      if (content.promoCode) drawTagChip(`Use code: ${content.promoCode}`);
      break;
    }
    case "quote": {
      if (content.quote) {
        drawBlock("“", big * 1.2, 800);
        drawBlock(content.quote, big, 800, 0.12);
        drawBlock("”", big * 1.2, 800);
      }
      if (content.author) drawBlock(`— ${content.author}`, mid, 600);
      break;
    }
    case "tips": {
      const bullets = (content.bullets ?? []).filter(Boolean);
      if (content.headline) drawBlock(content.headline, big, 800);
      setFont(ctx, mid, brand, 600);
      ctx.textAlign = align;
      ctx.fillStyle = textColor;
      const maxWidth = innerW;
      const lh = Math.round(mid * 1.35);
      bullets.forEach((b, i) => {
        const prefix = `${i + 1}. `;
        const line = prefix + b;
        const lines = wrapText(ctx, line, maxWidth);
        for (const L of lines) {
          ctx.fillText(L, xBase, cursorY, maxWidth);
          cursorY += lh;
        }
        cursorY += Math.round(mid * 0.2);
      });
      break;
    }
    case "testimonial": {
      if (content.testimonial?.text) drawBlock(`“${content.testimonial.text}”`, mid, 700, 0.1);
      const by = [content.testimonial?.name, content.testimonial?.role].filter(Boolean).join(" · ");
      if (by) drawBlock(by, small, 600);
      break;
    }
    case "poll": {
      if (content.poll?.question) drawBlock(content.poll.question, big, 800, 0.1);
      const opts = (content.poll?.options ?? ["", ""]).filter(Boolean).slice(0, 4);
      const barH = Math.max(28, Math.round(small * 1.6));
      opts.forEach((o) => {
        const barW = innerW;
        const x = align === "center" ? Math.round(W / 2 - barW / 2) : margin;
        drawRoundedRect(ctx, x, cursorY, barW, barH, 10);
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fill();
        setFont(ctx, small, brand, 600);
        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.fillText(o, x + 12, cursorY + Math.round(barH * 0.7));
        cursorY += barH + Math.round(small * 0.6);
      });
      break;
    }
    case "carousel": {
      if (content.headline) drawBlock(content.headline, big, 800);
      const slides = (content.carousel?.slides ?? []).filter(Boolean);
      if (slides.length) {
        drawTagChip(`Slide 1 of ${slides.length}`);
        drawBlock(slides[0], mid, 600, 0.12);
      }
      break;
    }
    case "announcement":
    case "giveaway":
    case "infographic":
    case "beforeAfter":
    case "event":
    case "story":
    case "ugc":
    case "meme":
    default: {
      if (content.headline) drawBlock(content.headline, big, 800);
      if (content.subhead)  drawBlock(content.subhead, mid, 600);
      break;
    }
  }

  // brand name footer (subtle)
  if (brand.name) {
    setFont(ctx, small, brand, 600);
    ctx.textAlign = "right";
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = textColor;
    ctx.fillText(brand.name, W - margin, H - Math.round(small * 0.7));
    ctx.globalAlpha = 1;
  }

  // tiny platform accent line
  ctx.fillStyle = accent;
  ctx.fillRect(0, H - 4, W, 4);
}
