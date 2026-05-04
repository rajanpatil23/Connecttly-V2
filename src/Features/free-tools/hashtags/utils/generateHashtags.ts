// src/features/free-tools/hashtags/utils/generateHashtags.ts

export type PlatformKey = "instagram" | "linkedin" | "tiktok";

export const PLATFORMS: Array<{ key: PlatformKey; label: string; max?: number; tip: string }> = [
  { key: "instagram", label: "Instagram", max: 30, tip: "IG allows up to 30 tags; mix niche + pop." },
  { key: "linkedin", label: "LinkedIn", max: 10, tip: "LI recommends fewer, more relevant tags (3–10)." },
  { key: "tiktok", label: "TikTok", max: 35, tip: "Keep it short, culturally relevant, trend-aware." },
];

type GenOpts = {
  platform: PlatformKey;
  terms: string[];
  limit: number;
  includeHash: boolean;
  titleCase: boolean;
  mixPopularity: boolean;
};

// Lightweight “domain knowledge” to expand seeds without AI.
// You can tweak/extend these lists anytime.
const BASE_POPULAR = {
  instagram: [
    "instagood","reels","explore","creator","marketing","socialmedia","content","growth","branding","trending",
  ],
  linkedin: [
    "leadership","marketing","b2b","growth","product","analytics","sales","hiring","careers","community",
  ],
  tiktok: [
    "fyp","viral","tiktok","trending","challenge","behindthescenes","aesthetic","learnontiktok","marketing",
  ],
};

const CATEGORY_SYNONYMS: Record<string, string[]> = {
  // broad marketing
  marketing: ["digitalmarketing","growthmarketing","performance","brandmarketing","demandgen","b2bmarketing"],
  growth: ["growth","growthhacking","scaling","startupgrowth"],
  content: ["content","contentmarketing","ugc","shortform","copywriting","videomarketing"],
  saas: ["saas","startups","b2b","product","founders"],
  analytics: ["analytics","data","ga4","attribution","insights","dashboard"],
  seo: ["seo","organic","search","contentseo","linkbuilding"],
  paid: ["ppc","googleads","metaads","paidmedia","paidsearch","paidgrowth"],
  linkedin: ["linkedin","linkedintips","linkedinmarketing","personalbranding"],
  instagram: ["instagram","reels","insta","contentcreator"],
  tiktok: ["tiktok","fyp","shortvideo","algorithm","tiktokmarketing"],
};

function clean(s: string) {
  return s.toLowerCase().trim().replace(/\s+/g, "");
}

function titleize(tag: string) {
  return tag
    .split(/[_-]/g)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

/** Split into popularity buckets to blend niche + mid + broad */
function bucketize(all: string[], platform: PlatformKey) {
  const base = BASE_POPULAR[platform] || [];
  const set = new Set(base.map(clean));
  const broad: string[] = [];
  const mid: string[] = [];
  const niche: string[] = [];

  for (const t of all) {
    const c = clean(t);
    if (set.has(c)) broad.push(c);
    else if (c.length <= 10) mid.push(c);
    else niche.push(c);
  }
  return { niche: uniq(niche), mid: uniq(mid), broad: uniq(broad) };
}

/** Map seed terms to expanded, platform-aware tags (deterministic, fast) */
function expandTerms(terms: string[], platform: PlatformKey): string[] {
  const out: string[] = [];
  const base = BASE_POPULAR[platform] || [];

  for (const raw of terms) {
    const t = clean(raw);
    if (!t) continue;

    out.push(t);

    // synonyms by category
    Object.entries(CATEGORY_SYNONYMS).forEach(([key, list]) => {
      if (t.includes(key)) out.push(...list);
    });

    // generic derivations
    if (t.length > 3) {
      out.push(`${t}tips`, `${t}101`, `${t}strategy`, `${t}community`, `${t}ideas`);
    }
  }

  // always blend a bit of platform base tags
  out.push(...base.slice(0, 8));

  return uniq(out);
}

/** Main generator (platform rules, options, smart mix) */
export function generateHashtags(opts: GenOpts): string[] {
  const { platform, terms, limit, includeHash, titleCase, mixPopularity } = opts;

  if (!terms?.length) return [];

  const expanded = expandTerms(terms, platform);

  // Smart mixing
  let ordered: string[] = [];
  if (mixPopularity) {
    const { niche, mid, broad } = bucketize(expanded, platform);
    const nTake = Math.max(0, Math.floor(limit * 0.4));
    const mTake = Math.max(0, Math.floor(limit * 0.4));
    const bTake = Math.max(0, limit - (nTake + mTake));

    ordered = [
      ...niche.slice(0, nTake),
      ...mid.slice(0, mTake),
      ...broad.slice(0, bTake),
    ];
  } else {
    ordered = expanded.slice(0, limit);
  }

  // Platform-specific trimming (hard caps are advice rather than limits)
  const platformMax = PLATFORMS.find((p) => p.key === platform)?.max ?? limit;
  const final = ordered.slice(0, Math.min(limit, platformMax));

  return final.map((t) => {
    let tag = t;
    if (titleCase) tag = titleize(tag);
    if (includeHash) tag = `#${tag}`;
    return tag;
  });
}
