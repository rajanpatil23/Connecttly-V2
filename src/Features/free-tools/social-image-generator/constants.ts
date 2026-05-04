import type { PlatformKey, PostTypeKey, ThemeKey, VariationKey, BrandKit } from "./types";

/* ---------- Brand defaults ---------- */
export const DEFAULT_BRAND: BrandKit = {
  name: "",
  font: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  primary: "#0A1F3D",
  secondary: "#0074ED",
};

export const DEFAULT_THEME: ThemeKey = "brand";

/* ---------- Platforms ---------- */
export const ALL_PLATFORMS: { key: PlatformKey; label: string }[] = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "tiktok", label: "TikTok" },
  { key: "x", label: "X (Twitter)" },
  { key: "youtube", label: "YouTube" },
  { key: "pinterest", label: "Pinterest" },
];

export const PLATFORM_SPECS: Record<
  PlatformKey,
  { label: string; size: { w: number; h: number }; accent: string; bg: string }
> = {
  instagram: { label: "Instagram", size: { w: 1080, h: 1080 }, accent: "#E1306C", bg: "#ffffff" },
  facebook:  { label: "Facebook",  size: { w: 1200, h: 630  }, accent: "#1877F2", bg: "#ffffff" },
  linkedin:  { label: "LinkedIn",  size: { w: 1200, h: 627  }, accent: "#0A66C2", bg: "#ffffff" },
  tiktok:    { label: "TikTok",    size: { w: 1080, h: 1920 }, accent: "#FE2C55", bg: "#0f0f0f" },
  x:         { label: "X (Twitter)", size:{ w: 1200, h: 675 }, accent: "#1D9BF0", bg: "#ffffff" },
  youtube:   { label: "YouTube",   size: { w: 1280, h: 720  }, accent: "#FF0000", bg: "#ffffff" },
  pinterest: { label: "Pinterest", size: { w: 1000, h: 1500 }, accent: "#E60023", bg: "#ffffff" },
};

/* ---------- Post types shown in Step 2 ---------- */
export const POST_TYPES: { key: PostTypeKey; label: string; short: string; desc: string }[] = [
  { key: "promo",        label: "Promo / Sale",    short: "Offer or discount",          desc: "Punchy promo with CTA" },
  { key: "quote",        label: "Quote / Motive",  short: "Inspirational quote",        desc: "Large typography quote" },
  { key: "tips",         label: "Tips / How-To",   short: "Bullet list",                desc: "Quick bite-sized tips" },
  { key: "announcement", label: "Announcement",    short: "News update",                desc: "Launch, update, news" },
  { key: "giveaway",     label: "Giveaway",        short: "Contest card",               desc: "Prize + rules + CTA" },
  { key: "testimonial",  label: "Testimonial",     short: "Customer love",              desc: "Quote + name/role" },
  { key: "infographic",  label: "Infographic",     short: "Data snapshot",              desc: "Clean stat blocks" },
  { key: "beforeAfter",  label: "Before / After",  short: "Side-by-side",               desc: "Transformation visual" },
  { key: "event",        label: "Event",           short: "Date/time/venue",            desc: "Event teaser" },
  { key: "story",        label: "Story / Reel",    short: "9:16 background",            desc: "Tall canvas poster" },
  { key: "carousel",     label: "Carousel",        short: "Multi-slide",                desc: "Slide 1 preview" },
  { key: "ugc",          label: "UGC Feature",     short: "User content",               desc: "Avatar + handle" },
  { key: "poll",         label: "Poll",            short: "Question + options",         desc: "Poll bars UI" },
  { key: "meme",         label: "Meme / Caption",  short: "Top/bottom text",            desc: "Classic meme layout" },
];

/* ---------- Themes ---------- */
export const THEMES: { key: ThemeKey; label: string; short: string; desc: string }[] = [
  { key: "brand",    label: "Match My Brand", short: "Use brand colors",    desc: "Use your brand kit" },
  { key: "minimal",  label: "Minimal",        short: "Clean & airy",         desc: "Lots of whitespace" },
  { key: "bold",     label: "Bold",           short: "High contrast",        desc: "Big type, loud blocks" },
  { key: "elegant",  label: "Elegant",        short: "Serif + soft hues",    desc: "Premium look" },
  { key: "playful",  label: "Playful",        short: "Rounded & fun",        desc: "Friendly palette" },
  { key: "tech",     label: "Tech / Modern",  short: "Dark + neon",          desc: "Futuristic feel" },
  { key: "festive",  label: "Festive",        short: "Warm + celebratory",   desc: "Occasion vibes" },
  { key: "surprise", label: "Surprise me",    short: "Randomized",           desc: "Mix it up" },
];

/* ---------- Layout variations ---------- */
export const VARIATION_PRESETS: { key: VariationKey; label: string; desc: string }[] = [
  { key: "v1", label: "V1 — Centered",      desc: "Center headline + CTA" },
  { key: "v2", label: "V2 — Left Ribbon",   desc: "Left-aligned, accent strip" },
  { key: "v3", label: "V3 — Split Banner",  desc: "Top banner + body text" },
];

/* ---------- Font choices for the brand kit ---------- */
export const FONT_CHOICES: { label: string; value: string }[] = [
  { label: "Inter (Sans)", value: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' },
  { label: "Montserrat (Sans)", value: '"Montserrat", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' },
  { label: "Poppins (Sans)", value: '"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' },
  { label: "Merriweather (Serif)", value: '"Merriweather", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' },
  { label: "Playfair (Serif)", value: '"Playfair Display", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' },
  { label: "Roboto Mono (Mono)", value: '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
];
