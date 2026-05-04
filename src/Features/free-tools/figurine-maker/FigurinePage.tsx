// src/features/free-tools/figurine-maker/FigurinePage.tsx
import { useState } from "react";
import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { enhanceFigurinePrompt } from "./api/promptEnhancer";

export default function FigurinePage() {
  const [prompt, setPrompt] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [busy, setBusy] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  const doEnhance = async () => {
    if (!prompt.trim()) return;
    setBusy(true);
    try {
      const p = await enhanceFigurinePrompt(prompt.trim());
      setEnhanced(p);
    } finally {
      setBusy(false);
    }
  };

  const doGenerate = async () => {
    const final = enhanced || prompt;
    if (!final.trim()) return;
    setBusy(true);
    try {
      const r = await fetch("/api/ai/image/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          prompt: final,
          image_size: "1024x1024",
        }),
      });
      const data = await r.json();
      const url = data?.images?.[0]?.url ?? data?.image?.url ?? data?.output?.[0]?.url ?? "";
      setImgUrl(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolLayout
      title="Figurine Maker"
      description="Turn ideas into stylized figurine shots. Enhance your prompt with AI, then render."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Prompt</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Label className="text-sm">Describe the figurine</Label>
            <Textarea rows={6} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., astronaut bear, glossy vinyl, soft studio backdrop" />
            <div className="flex gap-2">
              <Button onClick={doEnhance} disabled={!prompt || busy}>{busy ? "…" : "✨ Enhance with AI"}</Button>
              <Button variant="outline" onClick={() => setEnhanced("")} disabled={!enhanced}>Reset enhancement</Button>
            </div>
            {enhanced && (
              <div className="rounded-md border bg-slate-50 p-3 text-sm text-slate-700">
                <div className="mb-1 font-medium">Enhanced prompt</div>
                <div>{enhanced}</div>
              </div>
            )}
            <Button onClick={doGenerate} disabled={busy || (!enhanced && !prompt)}>
              {busy ? "Generating…" : "Generate"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Result</CardTitle></CardHeader>
          <CardContent>
            {imgUrl ? (
              <img src={imgUrl} alt="Figurine result" className="w-full rounded-lg border object-cover" />
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center text-slate-500">
                Your figurine will appear here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
