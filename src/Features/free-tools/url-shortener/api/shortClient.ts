// src/Features/free-tools/url-shortener/api/shortClient.ts
const API = import.meta.env.VITE_SHORT_API_BASE || "/api/short";

type Json = Record<string, any>;

class HttpError extends Error {
  status: number;
  code?: string;
  body?: Json;
  constructor(status: number, code?: string, body?: Json) {
    super(code || `HTTP_${status}`);
    this.status = status;
    this.code = code;
    this.body = body;
  }
}

async function postJSON<T = any>(path: string, body: Json): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as Json;
  if (!res.ok) throw new HttpError(res.status, data?.error, data);
  return data as T;
}

async function getJSON<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  const data = (await res.json().catch(() => ({}))) as Json;
  if (!res.ok) throw new HttpError(res.status, data?.error, data);
  return data as T;
}

/** POST /api/short/create */
export async function createShortLink(input: {
  url: string;
  customCode?: string; // server normalizes/lowercases; optional
  ttlDays?: number;    // 0 or undefined = never
  tag?: string;
}): Promise<{ ok: true; code: string; shortUrl: string }> {
  return postJSON("/create", input);
}

/** GET /api/short/info?code=... */
export async function getShortInfo(code: string): Promise<{
  ok: true;
  link: {
    code: string;
    long_url: string;
    tag: string | null;
    clicks: number;
    created_at: string;
    expires_at: string | null;
  };
  expired: boolean;
  shortUrl: string;
}> {
  const qs = new URLSearchParams({ code });
  return getJSON(`/info?${qs.toString()}`);
}

/** GET /api/short/health */
export async function health(): Promise<{
  ok: true;
  hasSecrets: boolean;
  storage: "mysql" | "sqlite" | null;
}> {
  return getJSON("/health");
}

// Re-export the error class so UI can branch on .code/status if needed.
export { HttpError };
