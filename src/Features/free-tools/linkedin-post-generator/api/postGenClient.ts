// src/Features/free-tools/linkedin-post-generator/api/postGenClient.ts
import { textGenerate } from "@/Features/free-tools/common/api/aiClient";
import { FormState } from "../types";

export async function generateLinkedInPost(form: FormState): Promise<string> {
  const targetLen =
    form.length === "short" ? "≤120 words" : form.length === "long" ? "300–700 words" : "120–300 words";

  const emoji = form.emoji ? "Include a few tasteful emojis if appropriate." : "Do not include emojis.";
  const hashtag =
    form.hashtag === "0"
      ? "Do not include any hashtags."
      : form.hashtag === "3"
      ? "Append exactly 3 relevant hashtags at the end."
      : form.hashtag === "5"
      ? "Append exactly 5 relevant hashtags at the end."
      : "Append 3–5 relevant hashtags at the end.";

  const sys =
    "You are a top-tier LinkedIn content strategist. Write compelling posts that perform well on LinkedIn. " +
    "Optimize for clarity, scannability, and authenticity. Keep formatting as plain text (no markdown). " +
    "Use short paragraphs and line breaks for readability.";

  const prompt = `
Goal: ${form.goal}
Industry: ${form.industry || "General"}
Topic/Brief: ${form.topic}

Tone: ${form.tone}, Formality ${form.formality}/100.
Length: ${targetLen}.
${emoji}
${hashtag}

Constraints:
- Avoid clickbait. Be specific and credible.
- Make the first 1–2 lines hooky but not spammy.
- Use line breaks. No markdown. Pure text output.
- Keep total length ≤ 3000 characters.
`;

  const result = await textGenerate(prompt, {
    system: sys,
    temperature: 0.7,
    maxTokens: 700,
    timeoutMs: 45000,
  });

  return String(result).trim();
}

export async function suggestTopics(goal: string, industry: string): Promise<string[]> {
  const sys = "You are a LinkedIn content ideation assistant.";
  const prompt = `Give 8 concise LinkedIn post ideas (one per line, no numbering) for:
Goal: ${goal || "General"}
Industry: ${industry || "General"}
Return only the ideas, no extra text.`;

  const txt = await textGenerate(prompt, { system: sys, temperature: 0.8, maxTokens: 256, timeoutMs: 20000 });
  return String(txt)
    .split(/\r?\n+/)
    .map((s) => s.replace(/^\d+[\.)]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 12);
}
