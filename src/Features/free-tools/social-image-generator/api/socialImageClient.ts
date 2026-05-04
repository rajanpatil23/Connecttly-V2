// src/Features/free-tools/social-image-generator/api/socialImageClient.ts

export type SocialImageOptions = {
  aspect?: string;            // "9:16" | "1:1" | "16:9" | "4:5"
  size?: "1K" | "2K";
  timeoutMs?: number;         // default 45s
  logoDataUrl?: string;       // base64 data URL for logo integration
  count?: number;             // 1..4
};

const EDIT_ENDPOINT = "/api/ai/image/edit";

/** Helper to extract base64 and mime from data URL */
function parseDataUrl(dataUrl: string): { b64: string; mime: string } | null {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return { mime: match[1], b64: match[2] };
}
async function postJSON<T>(url: string, body: unknown, timeoutMs = 45000): Promise<T> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), Math.max(1000, timeoutMs));
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body),
      signal: ac.signal,
    });

    const ct = res.headers.get("content-type") || "";
    const text = await res.text();

    if (!ct.includes("application/json")) {
      // Surface the first part of the HTML so you immediately see what's wrong (404 page, login, 413, etc.)
      throw new Error(`NON_JSON_${res.status}: ${text.slice(0, 160)}`);
    }

    let data: any;
    try { data = JSON.parse(text); } catch {
      throw new Error(`INVALID_JSON_${res.status}: ${text.slice(0, 160)}`);
    }

    if (!res.ok || data?.ok === false) {
      throw new Error(data?.error || `API_${res.status}`);
    }
    return data as T;
  } finally {
    clearTimeout(t);
  }
}

/** Generate social media images with optional logo integration */
export async function generateSocialImages(
  prompt: string,
  opts?: SocialImageOptions
): Promise<string[]> {
  const count = Math.max(1, Math.min(4, opts?.count ?? 1));
  
  const body: any = {
    prompt,
    count,
  };
  
  // Add logo data if provided
  if (opts?.logoDataUrl) {
    const logoData = parseDataUrl(opts.logoDataUrl);
    if (!logoData) throw new Error("INVALID_LOGO_FORMAT");
    
    body.imageB64 = logoData.b64;
    body.imageMime = logoData.mime;
  }
  
  // Always add aspect ratio and size (regardless of logo presence)
  body.aspect = opts?.aspect;
  body.aspectRatio = opts?.aspect;
  body.size = opts?.size ?? "1K";
  
  const data = await postJSON<any>(EDIT_ENDPOINT, body, opts?.timeoutMs);
  
  // Handle response
  if (data.ok && data.images && Array.isArray(data.images)) {
    const urls = data.images.map((img: any) => {
      if (img.b64 && img.mime) {
        return `data:${img.mime};base64,${img.b64}`;
      }
      return null;
    }).filter(Boolean);
    
    if (!urls.length) throw new Error("NO_IMAGE_RETURNED");
    return urls;
  }
  
  throw new Error("NO_IMAGE_RETURNED");
}
