// src/features/free-tools/common/data/tools.ts
import type { LucideIcon } from "lucide-react";
import { Hash, Link2, Image, ToyBrick, FileText, Maximize2 } from "lucide-react";

export type ToolStatus = "live" | "beta" | "soon";
export type ToolCategory = "Social" | "Analytics" | "Creative" | "Dev";

export type ToolDef = {
  slug: string;                  // route segment, e.g. "utm"
  title: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;              // lucide icon component
  gradientFrom: string;          // e.g. "from-[#0A1F3D]"
  gradientTo: string;            // e.g. "to-[#0074ED]"
  tags: string[];
  status: ToolStatus;
  requiresProxy?: boolean;       // shows a tiny “Requires API” chip
};

export const TOOL_REGISTRY: ToolDef[] = [
  {
    slug: "utm",
    title: "UTM Builder",
    description: "Build clean UTM links with presets and shareable permalinks.",
    category: "Analytics",
    icon: Link2,
    gradientFrom: "from-[#0A1F3D]",
    gradientTo: "to-[#0074ED]",
    tags: ["UTM", "Campaigns", "Tracking"],
    status: "live",
    requiresProxy: false,
  },
  {
    slug: "hashtags",
    title: "Hashtag Generator",
    description: "Generate platform-specific tags without AI.",
    category: "Social",
    icon: Hash,
    gradientFrom: "from-[#0074ED]",
    gradientTo: "to-[#79d9ff]",
    tags: ["Instagram", "LinkedIn", "TikTok"],
    status: "live",
    requiresProxy: false,
  },
  {
    slug: "image-generator",
    title: "Image Generator",
    description: "Create on-brand images from prompts. Ratios & styles supported.",
    category: "Creative",
    icon: Image,
    gradientFrom: "from-[#0A1F3D]",
    gradientTo: "to-[#A6FF5F]",
    tags: ["AI", "Creative", "Visuals"],
    status: "beta",
    requiresProxy: true,
  },
  {
    slug: "figurine-maker",
    title: "Figurine Maker",
    description: "Turn ideas into vinyl/chibi figurine-style images.",
    category: "Creative",
    icon: ToyBrick,
    gradientFrom: "from-[#79d9ff]",
    gradientTo: "to-[#A6FF5F]",
    tags: ["AI", "Stylize"],
    status: "soon",
    requiresProxy: true,
  },
  {
    slug: "linkedin-post-generator",
    title: "LinkedIn Post Generator",
    description: "Create high-performing LinkedIn posts and preview them before publishing.",
    category: "Social",
    icon: FileText,
    gradientFrom: "from-[#0A1F3D]",
    gradientTo: "to-[#0074ED]",
    tags: ["AI", "Social", "Copywriting"],
    status: "live",
    requiresProxy: true,
  },
  {
    slug: "image-resizer",
    title: "Image Resizer",
    description: "Resize images to perfect dimensions for any platform instantly.",
    category: "Creative",
    icon: Maximize2,
    gradientFrom: "from-[#24C5B9]",
    gradientTo: "to-[#50D0FF]",
    tags: ["Images", "Resize", "Optimize"],
    status: "live",
    requiresProxy: false,
  },

];
