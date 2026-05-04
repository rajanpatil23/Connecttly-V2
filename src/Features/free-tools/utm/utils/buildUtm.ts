// src/Features/free-tools/utm/utils/buildUtm.ts
import { UTM_KEYS_ORDER, type Normalization } from "./presets";

export type BuildUtmInput = {
  baseUrl: string;
  params: Record<string, string>;
  normalization?: Normalization;
};

export type BuildUtmOutput = {
  ok: boolean;
  url?: string;
  query?: string;
  error?: string;
  warnings?: string[];
};

const SAFE_KEY = /^[a-zA-Z0-9._~-]+$/;

/** Normalize a value per chosen policy */
function normalizeValue(v: string, n: Normalization): string {
  let s = v.trim();

  if (n.lowercaseValues) s = s.toLowerCase();

  if (n.spaceReplacement === "hyphen") s = s.replace(/\s+/g, "-");
  else if (n.spaceReplacement === "underscore") s = s.replace(/\s+/g, "_");
  else if (n.spaceReplacement === "encode") s = s.replace(/\s+/g, "%20"); // will be re-encoded anyway

  return n.strictEncode ? encodeURIComponent(s) : encodeURI(s);
}

/** Build sorted query string merging existing query params + new ones */
export function buildUtm({
  baseUrl,
  params,
  normalization,
}: BuildUtmInput): BuildUtmOutput {
  const norm: Normalization = normalization ?? {
    lowercaseValues: true,
    spaceReplacement: "hyphen",
    strictEncode: true,
  };

  if (!baseUrl || !/^https?:\/\//i.test(baseUrl)) {
    return { ok: false, error: "Please enter a valid URL starting with http:// or https://" };
  }

  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    return { ok: false, error: "Base URL is not valid" };
  }

  const warnings: string[] = [];

  // Merge existing query params into a map
  const q = new URLSearchParams(url.search);

  // Apply normalized UTM params
  for (const [key, raw] of Object.entries(params)) {
    if (!raw?.trim()) continue;

    // Force "utm_" prefix for known keys if missing
    const k = key.startsWith("utm_") ? key : key.toLowerCase().startsWith("utm") ? `utm_${key}` : key;

    if (!SAFE_KEY.test(k)) {
      warnings.push(`Skipped invalid key: ${k}`);
      continue;
    }
    q.set(k, normalizeValue(raw, norm));
  }

  // Build a sorted query (UTM first in best-practice order, then the rest)
  const entries = Array.from(q.entries());
  const utmEntries: [string, string][] = [];
  const otherEntries: [string, string][] = [];

  const order = new Map<string, number>(UTM_KEYS_ORDER.map((k, i) => [k, i]));

  entries.forEach(([k, v]) => {
    if (k.startsWith("utm_")) utmEntries.push([k, v]);
    else otherEntries.push([k, v]);
  });

  utmEntries.sort((a, b) => (order.get(a[0]) ?? 999) - (order.get(b[0]) ?? 999));
  otherEntries.sort((a, b) => a[0].localeCompare(b[0]));

  const final = new URLSearchParams([...otherEntries, ...utmEntries]);
  const query = final.toString();

  url.search = query ? `?${query}` : "";

  return { ok: true, url: url.toString(), query, warnings };
}
