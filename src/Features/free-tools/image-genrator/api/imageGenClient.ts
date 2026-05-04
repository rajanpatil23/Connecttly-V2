// src/Features/free-tools/image-genrator/api/imageGenClient.ts

export type GenerateImageOptions = {
  aspect?: string;            // "9:16" | "1:1" | "16:9" | "4:5"
  size?: "1K" | "2K";
  timeoutMs?: number;         // default 45s
};

export type GenerateImagesOptions = GenerateImageOptions & {
  count?: number;             // 1..4
};

const GENERATE_ENDPOINT =
  import.meta.env.VITE_IMAGE_API_URL || "/image/generate";

/** Normalize various backend shapes into array of URLs/data-URLs */
function normalizeToUrls(resp: any): string[] {
  if (!resp) return [];

  if (typeof resp.imageUrl === "string") return [resp.imageUrl];

  if (Array.isArray(resp.images) && typeof resp.images[0] === "string") {
    return resp.images as string[];
  }

  if (Array.isArray(resp.images) && typeof resp.images[0] === "object") {
    return resp.images
      .map((img: any) => {
        if (!img) return null;
        if (img.url && typeof img.url === "string") return img.url;
        if (img.b64 && typeof img.b64 === "string") {
          const mime = img.mime || "image/png";
          return `data:${mime};base64,${img.b64}`;
        }
        return null;
      })
      .filter(Boolean) as string[];
  }

  return [];
}

async function postJSON<T>(url: string, body: unknown, timeoutMs = 45000): Promise<T> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), Math.max(1000, timeoutMs));
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      const msg = data?.error || data?.message || `API_${res.status}`;
      throw new Error(msg);
    }
    return data as T;
  } catch (e: any) {
    if (e?.name === "AbortError") throw new Error("REQUEST_TIMEOUT");
    throw e;
  } finally {
    clearTimeout(t);
  }
}

/** ONE image -> { imageUrl }  */
export async function generateImage(
  prompt: string,
  opts?: GenerateImageOptions
): Promise<{ imageUrl: string }> {
  const body: any = {
    prompt,
    aspect: opts?.aspect,
    aspectRatio: opts?.aspect,
    size: opts?.size ?? "1K",
    count: 1,
  };
  const data = await postJSON<any>(GENERATE_ENDPOINT, body, opts?.timeoutMs);
  const urls = normalizeToUrls(data);
  if (!urls.length) throw new Error("NO_IMAGE_RETURNED");
  return { imageUrl: urls[0] };
}

/** MANY images -> string[] (urls or data:urls) */
export async function generateImages(
  prompt: string,
  opts?: GenerateImagesOptions
): Promise<string[]> {
  const count = Math.max(1, Math.min(4, opts?.count ?? 1));
  
  const body: any = {
    prompt,
    aspect: opts?.aspect,
    aspectRatio: opts?.aspect,
    size: opts?.size ?? "1K",
    count,
  };
  const data = await postJSON<any>(GENERATE_ENDPOINT, body, opts?.timeoutMs);
  const urls = normalizeToUrls(data);
  if (!urls.length) throw new Error("NO_IMAGE_RETURNED");
  return urls;
}
