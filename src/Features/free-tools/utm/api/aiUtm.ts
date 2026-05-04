// src/Features/free-tools/utm/api/aiUtm.ts
import { textGenerate } from "@/Features/free-tools/common/api/aiClient";

function parseLinesToArray(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.replace(/^[-*\d.)\s]+/, "")) // strip bullets like "1) " or "- "
    .slice(0, 20);
}

/** Suggest UTM campaign slugs */
export async function aiSuggestCampaigns(input: {
  brand?: string;
  product?: string;
  audience?: string;
  tone?: string;
  count?: number;
}): Promise<string[]> {
  const count = Math.min(12, Math.max(3, input.count ?? 6));
  const sys =
    "You are a marketing assistant. Return short, slug-friendly campaign names for UTM usage: lowercase, use hyphens instead of spaces, avoid punctuation, 2–4 words.";

  const prompt = `
Brand: ${input.brand || "N/A"}
Product/Offer: ${input.product || "N/A"}
Primary audience: ${input.audience || "N/A"}
Tone/style: ${input.tone || "neutral"}

Return ${count} campaign slugs, each on a new line. No numbering, no extra commentary.
Examples:
growth-launch-q2
summer-sale-20off
founders-week-lp
`;

  const { text } = await textGenerate(prompt, { system: sys, temperature: 0.6 });
  return parseLinesToArray(text)
    .map(s => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, ""))
    .filter(Boolean);
}

/** Suggest UTM content variants */
export async function aiSuggestContents(input: {
  campaign?: string;
  formatHints?: string; // e.g. "video, banner, adset_a"
  count?: number;
}): Promise<string[]> {
  const count = Math.min(12, Math.max(3, input.count ?? 6));
  const sys =
    "You are a marketing assistant. Return short UTM content variants: lowercase, hyphenated, avoid punctuation, 1–3 tokens like 'banner-a' or 'video-hook1'.";

  const prompt = `
Campaign: ${input.campaign || "N/A"}
Format hints: ${input.formatHints || "banner, video, adset"}

Return ${count} content slugs, each on a new line. No numbering, no commentary.
Examples:
banner-a
banner-b
video-hook1
adset-x
`;

  const { text } = await textGenerate(prompt, { system: sys, temperature: 0.7 });
  return parseLinesToArray(text)
    .map(s => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, ""))
    .filter(Boolean);
}
