// src/features/free-tools/figurine-maker/api/promptEnhancer.ts
import { textGenerate } from "@/Features/free-tools/common/api/aiClient";

export async function enhanceFigurinePrompt(userPrompt: string) {
  const system = `You are a prompt engineer for stylized figurines. 
Return a concise prompt that yields a 3D figurine / toy photography look with consistent style, neutral background, soft studio lighting. 
Avoid brands/copyrighted characters.`;
  const prompt = `User idea: ${userPrompt}\nReturn ONLY the improved figurine prompt.`;
  return await textGenerate(`${system}\n\n${prompt}`);
}
