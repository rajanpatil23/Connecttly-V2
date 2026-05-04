// src/Features/free-tools/linkedin-post-generator/utils/imagePrompt.ts
type BuildArgs = { text: string; goal: string; industry: string; tone: string };

export function buildImagePrompt({ text, goal, industry, tone }: BuildArgs): string {
  const base = summarizeForPrompt(text);
  const motif = motifForIndustry(industry);
  const mood = toneMood(tone);

  return [
    `LinkedIn cover-style image, 16:9, clean and modern, no text or UI mock text.`,
    `Subject: ${base}`,
    `Industry motif: ${motif}`,
    `Mood: ${mood}`,
    `High-quality, professional lighting, minimal distractions.`,
  ].join(" ");
}

function summarizeForPrompt(text: string): string {
  const firstLines = text.split(/\n/).slice(0, 4).join(" ");
  return firstLines.slice(0, 220).replace(/\s+/g, " ").trim();
}

function motifForIndustry(industry: string): string {
  const s = (industry || "").toLowerCase();
  if (s.includes("fintech") || s.includes("bank")) return "abstract finance charts, terminals, data overlays";
  if (s.includes("health")) return "clinicians, labs, clean clinical environment";
  if (s.includes("ai") || s.includes("machine")) return "neural patterns, circuitry, flowing data visuals";
  if (s.includes("marketing") || s.includes("advert")) return "collaborating people, whiteboards, post-its";
  if (s.includes("logistics") || s.includes("supply")) return "warehouses, delivery routes, containers";
  if (s.includes("education") || s.includes("edtech")) return "classroom, devices, learning visuals";
  if (s.includes("retail") || s.includes("e-comm")) return "products, shopping context, clean studio feel";
  if (s.includes("cyber")) return "shields, secure nodes, code patterns";
  if (s.includes("real estate") || s.includes("construction")) return "architecture, site visuals";
  if (s.includes("manufactur")) return "factory, robotics, assembly lines";
  if (s.includes("startup") || s.includes("venture")) return "founders collaborating, startup vibe";
  return "clean abstract shapes that match the topic, business context";
}

function toneMood(tone: string): string {
  const t = (tone || "").toLowerCase();
  if (t.includes("inspir")) return "airy and uplifting";
  if (t.includes("professional")) return "crisp and confident";
  if (t.includes("educat")) return "structured and clear";
  if (t.includes("humor")) return "light and friendly";
  if (t.includes("persuas")) return "bold and energetic";
  if (t.includes("analyt")) return "precise and focused";
  return "balanced and modern";
}
