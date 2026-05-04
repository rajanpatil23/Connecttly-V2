// src/features/free-tools/image-generator/api/promptEnhancer.ts
import { textGenerate } from "@/Features/free-tools/common/api/aiClient";

export async function enhancePrompt(userPrompt: string) {
  const system = `You are an image prompt engineer. Expand the user's idea into a concise, vivid prompt suitable for modern diffusion models. 
- Keep 1–3 sentences max 
- Include style cues (lighting, lens, composition) only if relevant 
- Avoid copyrighted characters and NSFW`;
  const prompt = `User idea: ${userPrompt}\nReturn ONLY the improved prompt.`;
  return await textGenerate(prompt, { system, temperature: 0.8, maxTokens: 180 });
}
