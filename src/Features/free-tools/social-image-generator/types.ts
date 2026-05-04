/* Shared types for Social Image Generator */

export type PlatformKey =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "tiktok"
  | "x"
  | "youtube"
  | "pinterest";

export type PostTypeKey =
  | "promo"
  | "quote"
  | "tips"
  | "announcement"
  | "giveaway"
  | "testimonial"
  | "infographic"
  | "beforeAfter"
  | "event"
  | "story"
  | "carousel"
  | "ugc"
  | "poll"
  | "meme";

export type ThemeKey =
  | "brand"
  | "minimal"
  | "bold"
  | "elegant"
  | "playful"
  | "tech"
  | "festive"
  | "surprise";

export type VariationKey = "v1" | "v2" | "v3";

export type CanvasExportType = "png" | "jpg" | "webp";

export type BrandKit = {
  name: string;
  font: string;          // CSS font-stack name (from FONT_CHOICES.value)
  primary: string;       // hex
  secondary: string;     // hex
  logoDataUrl?: string;  // data URL
};

export type ContentModel = {
  // generic
  headline?: string;
  subhead?: string;
  promoCode?: string;

  // quote
  quote?: string;
  author?: string;

  // tips / bullets
  bullets?: string[];

  // testimonial
  testimonial?: {
    text?: string;
    name?: string;
    role?: string;
  };

  // poll
  poll?: {
    question?: string;
    options?: string[];
  };

  // carousel
  carousel?: {
    slides: string[];
  };

  // NEW — prompt helpers
  additional?: string;  // free-form extra cues to improve generation
  useEmoji?: boolean;   // subtle emoji/icon motifs allowed
};
