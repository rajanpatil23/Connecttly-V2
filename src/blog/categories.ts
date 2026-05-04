// src/blog/categories.ts

export const CATEGORIES = [
  { slug: "performance-marketing",       label: "Performance Marketing",        blurb: "Paid media, CRO, experiments." },
  { slug: "linkedin-growth",             label: "LinkedIn Growth",              blurb: "LinkedIn ads, lead gen, page growth." },
  { slug: "content-creative",            label: "Content & Creative",           blurb: "Strategy, carousels, video, SEO content." },
  { slug: "growth-demand-generation",    label: "Growth & Demand Generation",   blurb: "ABM, influencers, community, partners." },
  { slug: "analytics-ai",                label: "Analytics & AI",               blurb: "Dashboards, attribution, tagging, AI." },
  { slug: "brand-reputation",            label: "Brand & Reputation",           blurb: "Positioning, employer brand, PR/ORM." },
] as const;

export type CategorySlug = typeof CATEGORIES[number]["slug"];

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
