// src/Features/free-tools/common/api/aiClient.ts
// Backward + forward compatible text AI client.
//
// Works with:
//   - Phase 1 code:  const { text } = await textGenerate(prompt)
//   - Phase 2 code:  const text = await textGenerate(prompt)
//
// Also adds hasTextAPI() so UI can conditionally show AI panels.

const TEXT_ENDPOINT =
  import.meta.env.VITE_TEXT_API_URL || "/api/ai/text/generate";

export function hasTextAPI(): boolean {
  // If you want this to hide when no proxy is configured,
  // you can change to: return !!import.meta.env.VITE_TEXT_API_URL;
  return Boolean(TEXT_ENDPOINT);
}

type GenerateOpts = {
  system?: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
};

// Helper to POST with timeout and readable errors
async function postJSON<T>(
  url: string,
  body: unknown,
  timeoutMs = 25000
): Promise<T> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), Math.max(3000, timeoutMs));
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    const json = (await res.json().catch(() => ({}))) as any;
    if (!res.ok) {
      throw new Error(json?.error || `AI_${res.status}`);
    }
    return json as T;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Hybrid return:
 *  - acts like a string (Phase 2 usage)
 *  - also has `.text` property (Phase 1 usage)
 */
export async function textGenerate(
  prompt: string,
  opts?: GenerateOpts
): Promise<string & { text: string }> {
  const body = {
    prompt,
    system: opts?.system,
    temperature: opts?.temperature ?? 0.7,
    maxTokens: opts?.maxTokens ?? 256,
  };

  try {
    const json = await postJSON<any>(
      TEXT_ENDPOINT,
      body,
      opts?.timeoutMs ?? 25000
    );

    // Accept several possible shapes:
    // { text: "..." }
    // { ok: true, text: "..." }
    // Raw Gemini-like: { candidates[0].content.parts[].text }
    let out =
      typeof json?.text === "string"
        ? json.text
        : Array.isArray(json?.candidates)
        ? (json.candidates[0]?.content?.parts || [])
            .map((p: any) => p.text)
            .filter(Boolean)
            .join("")
        : "";

    out = (out || "").trim();
    if (!out) throw new Error("EMPTY_AI_RESPONSE");

    // Build a hybrid return value:
    // a String object that behaves like a string *and* has a `.text` prop.
    const hybrid = new String(out) as unknown as string & { text: string };
    (hybrid as any).text = out;
    return hybrid;
  } catch (err: any) {
    if (err?.name === "AbortError") {
      const hybrid = new String("") as unknown as string & { text: string };
      (hybrid as any).text = "";
      throw new Error("AI_TIMEOUT");
    }
    throw err;
  }
}
