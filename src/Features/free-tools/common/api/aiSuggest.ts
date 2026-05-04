// src/features/free-tools/hashtags/api/aiSuggest.ts
import { textGenerate } from "@/Features/free-tools/common/api/aiClient";

export async function aiSuggestHashtags(params: {
  platform: "instagram" | "linkedin" | "tiktok";
  terms: string[];
  max?: number;
}) {
  const system = `You are a social media strategist. Generate platform-appropriate hashtags only. 
- Avoid banned/spammy tags
- Keep each tag single token without spaces
- Do not add commentary`;

  const prompt = `Platform: ${params.platform}
Seed terms: ${params.terms.join(", ")}

Return up to ${params.max ?? 30} hashtags separated by spaces.`;

  const raw = await textGenerate(prompt, {
    system,
    temperature: 0.55,
    maxTokens: 220,
  });

  return raw
    .replace(/\n+/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^#/, "").trim())
    .filter(Boolean)
    .map((t) => `#${t}`);
}
