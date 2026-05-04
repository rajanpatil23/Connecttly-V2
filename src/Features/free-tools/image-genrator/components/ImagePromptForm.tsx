// src/Features/free-tools/image-generator/components/ImagePromptForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Copy, Loader2, Wand2, RefreshCw } from "lucide-react";

import useLocalStorage from "@/Features/free-tools/common/hooks/useLocalStorage";
import { copyToClipboard } from "@/Features/free-tools/common/utils/copy";
import { textGenerate, hasTextAPI } from "@/Features/free-tools/common/api/aiClient";

const ASPECTS = [
  { key: "1:1", label: "Square 1:1" },
  { key: "3:4", label: "Portrait 3:4" },
  { key: "4:3", label: "Landscape 4:3" },
  { key: "9:16", label: "Story 9:16" },
  { key: "16:9", label: "Wide 16:9" },
];

// keep sizes; your API client can decide how to use it
const SIZES: Array<{ key: "1K" | "2K"; label: string }> = [
  { key: "1K", label: "Standard (~1K)" },
  { key: "2K", label: "High (~2K)" },
];

export type FormState = {
  prompt: string;
  aspect: string;
  size: "1K" | "2K";
  count: number;
};

export default function ImagePromptForm({
  onGenerate,
}: {
  onGenerate: (payload: FormState) => Promise<void> | void;
}) {
  const [prompt, setPrompt] = useLocalStorage<string>("ft_image_prompt", "");
  const [aspect, setAspect] = useLocalStorage<string>("ft_image_aspect", "9:16");
  const [size, setSize] = useLocalStorage<"1K" | "2K">("ft_image_size", "1K");
  const [count, setCount] = useLocalStorage<number>("ft_image_count", 1);

  const [busy, setBusy] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const canEnhance = hasTextAPI();

  const onCopyPrompt = () => copyToClipboard(prompt);

  const onAiEnhance = async () => {
    if (!prompt.trim()) return;
    try {
      setAiBusy(true);
      const sys =
        "You are a world-class image prompt engineer. Improve the user's prompt for a modern text-to-image model. " +
        "Keep it concise but descriptive. Include relevant camera/lighting/art style details. " +
        "Return ONLY the improved prompt text.";
      const result = await textGenerate(
        `Improve this prompt for a high-quality image:\n\n${prompt}`,
        { system: sys, temperature: 0.7, maxTokens: 256, timeoutMs: 20000 }
      );
      setPrompt(String(result));
    } catch (e) {
      console.error(e);
      alert("AI enhance failed. Please try again.");
    } finally {
      setAiBusy(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setBusy(true);
    try {
      await onGenerate({
        prompt: prompt.trim(),
        aspect,
        size,
        count: Math.min(4, Math.max(1, Number(count) || 1)),
      });
    } finally {
      setBusy(false);
    }
  };

  // Primary button — subtle premium gradient
  const primaryBtn =
    "bg-gradient-to-r from-[#0A1F3D] to-[#0074ED] text-white shadow-sm hover:shadow-md transition " +
    "ring-1 ring-white/0 hover:ring-white/10";

  // Neutral control surfaces: white UI
  const control =
    "h-10 bg-white text-slate-900 border border-slate-200 focus-visible:ring-2 focus-visible:ring-[#0074ED]/40 focus-visible:ring-offset-2";

  return (
    <Card className="rounded-xl border border-slate-200 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-[#0A1F3D]">Create</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Prompt */}
        <div className="space-y-2">
          <Label className="text-[#0A1F3D]">Prompt</Label>
          <div className="rounded-xl border border-slate-200 bg-white p-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want…"
              rows={5}
              className="w-full resize-y rounded-lg bg-transparent px-3 py-2 text-[15px] leading-6 text-slate-900 outline-none placeholder:text-slate-500"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="gap-2 bg-white text-[#0A1F3D] border-slate-200 hover:bg-white/95"
                onClick={onCopyPrompt}
              >
                <Copy className="h-4 w-4" /> Copy prompt
              </Button>
              {canEnhance && (
                <Button
                  type="button"
                  className={`gap-2 ${primaryBtn}`}
                  onClick={onAiEnhance}
                  disabled={aiBusy}
                >
                  {aiBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                  Enhance with AI
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Tip: Include subject, scene, lighting, and style (e.g., “cinematic”, “editorial”, “soft rim light”).
          </p>
        </div>

        {/* Controls */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Aspect */}
          <div className="space-y-2">
            <Label className="text-[#0A1F3D]">Aspect ratio</Label>
            <Select value={aspect} onValueChange={setAspect}>
              <SelectTrigger className={control}>
                <SelectValue placeholder="Aspect" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 border border-slate-200">
                {ASPECTS.map((a) => (
                  <SelectItem key={a.key} value={a.key}>
                    {a.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Label className="text-[#0A1F3D]">Resolution</Label>
            <Select value={size} onValueChange={(v) => setSize(v as "1K" | "2K")}>
              <SelectTrigger className={control}>
                <SelectValue placeholder="Resolution" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 border border-slate-200">
                {SIZES.map((s) => (
                  <SelectItem key={s.key} value={s.key}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[#0A1F3D]">Variations</Label>
              <span className="text-sm text-slate-600">{count}</span>
            </div>
            <Slider
              defaultValue={[count]}
              min={1}
              max={4}
              step={1}
              onValueChange={([v]) => setCount(v)}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Generate */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button
            type="button"
            className={`gap-2 ${primaryBtn}`}
            onClick={handleGenerate}
            disabled={busy || !prompt.trim()}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Generate
          </Button>
          <span className="text-xs text-slate-500">Images generate in ~3–10s depending on load.</span>
        </div>
      </CardContent>
    </Card>
  );
}
