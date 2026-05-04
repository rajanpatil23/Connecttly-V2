import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ImagePlus, Sparkles, Upload } from "lucide-react";

type StyleKey = "classic" | "neon" | "noir";

const SAMPLE =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&h=800&fit=crop&crop=faces";

const CANVAS_W = 900;  // 3:4 portrait canvas
const CANVAS_H = 1200;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

export default function FigurineForm() {
  const [displayName, setDisplayName] = useState("Your Figurine");
  const [style, setStyle] = useState<StyleKey>("classic");
  const [useSample, setUseSample] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string>(SAMPLE);
  const [busy, setBusy] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (photoUrl && photoUrl.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [photoUrl, outputUrl]);

  const theme = useMemo(() => {
    switch (style) {
      case "classic":
        return {
          boxGrad: ["#0A1F3D", "#061a33"],
          accent: "#0074ED",
          labelBg: "#A6FF5F",
          labelText: "#0A1F3D",
        };
      case "neon":
        return {
          boxGrad: ["#141528", "#0a0b18"],
          accent: "#7DF9FF",
          labelBg: "#FF6AD5",
          labelText: "#12081a",
        };
      case "noir":
        return {
          boxGrad: ["#1a1a1a", "#0f0f0f"],
          accent: "#e5e7eb",
          labelBg: "#111827",
          labelText: "#e5e7eb",
        };
    }
  }, [style]);

  const onPickFile = useCallback(() => fileRef.current?.click(), []);
  const onFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (photoUrl && photoUrl.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
    const url = URL.createObjectURL(f);
    setUseSample(false);
    setPhotoUrl(url);
  }, [photoUrl]);

  const draw = useCallback(async () => {
    if (!canvasRef.current) return;
    setBusy(true);
    setOutputUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    // Load subject image (sample or user-supplied)
    let img: HTMLImageElement;
    try {
      img = await loadImage(photoUrl || SAMPLE);
    } catch {
      // fallback to sample if load failed
      img = await loadImage(SAMPLE);
    }

    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    if (!ctx) {
      setBusy(false);
      return;
    }

    // Clear
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    grad.addColorStop(0, theme.boxGrad[0]);
    grad.addColorStop(1, theme.boxGrad[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // “Box” frame
    const inset = 40;
    const r = 28;
    roundedRect(ctx, inset, inset, CANVAS_W - inset * 2, CANVAS_H - inset * 2, r);
    ctx.lineWidth = 3;
    ctx.strokeStyle = theme.accent + "99";
    ctx.stroke();

    // Title (top area)
    ctx.font = "700 34px Inter, ui-sans-serif, system-ui, -apple-system";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.fillText("Connecttly Figurine", inset + 16, inset + 54);

    // Window (white inner panel)
    const winX = inset + 28;
    const winY = inset + 90;
    const winW = CANVAS_W - (inset + 28) * 2;
    const winH = CANVAS_H - winY - 160;
    roundedRect(ctx, winX, winY, winW, winH, 22);
    ctx.fillStyle = "rgba(255,255,255,0.98)";
    ctx.fill();

    // Subject image inside a circular “blister”
    const cx = CANVAS_W / 2;
    const cy = winY + winH / 2 + 10;
    const radius = Math.min(winW, winH) * 0.35;

    // soft shadow
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fill();
    ctx.restore();

    // clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // draw image scaled to cover circle
    const ratio = Math.max((radius * 2) / img.width, (radius * 2) / img.height);
    const dw = img.width * ratio;
    const dh = img.height * ratio;
    ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
    ctx.restore();

    // rim
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = theme.accent;
    ctx.stroke();

    // Label sash
    const labelH = 56;
    const labelW = Math.min(winW, 520);
    const lx = (CANVAS_W - labelW) / 2;
    const ly = winY + winH + 22;
    roundedRect(ctx, lx, ly, labelW, labelH, 14);
    ctx.fillStyle = theme.labelBg;
    ctx.fill();

    ctx.font = "800 22px Inter, ui-sans-serif, system-ui, -apple-system";
    ctx.fillStyle = theme.labelText;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(displayName || "Your Figurine", CANVAS_W / 2, ly + labelH / 2);

    // Export
    const url = c.toDataURL("image/png");
    setOutputUrl(url);
    setBusy(false);
  }, [photoUrl, displayName, theme]);

  const download = useCallback(() => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `${(displayName || "figurine").replace(/\s+/g, "-").toLowerCase()}.png`;
    a.click();
  }, [outputUrl, displayName]);

  return (
    <>
      {/* Form controls */}
      <div className="grid grid-cols-1 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name on box</Label>
          <Input
            id="name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g., Nivas, Aarav, Sahana"
          />
        </div>

        <div className="grid gap-2">
          <Label>Style</Label>
          <Select value={style} onValueChange={(v) => setStyle(v as StyleKey)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic (brand)</SelectItem>
              <SelectItem value="neon">Neon (vapor)</SelectItem>
              <SelectItem value="noir">Noir (mono)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Photo</Label>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" onClick={onPickFile} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload image
            </Button>
            <Button
              type="button"
              variant={useSample ? "default" : "secondary"}
              className="gap-2"
              onClick={() => {
                if (photoUrl && photoUrl.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
                setUseSample(true);
                setPhotoUrl(SAMPLE);
              }}
            >
              <ImagePlus className="h-4 w-4" />
              Use sample
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />
          </div>
          <p className="text-xs text-slate-500">
            Square-ish images with a single person work best.
          </p>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            className="gap-2 bg-[#0074ED] hover:bg-[#0a66d1]"
            onClick={draw}
            disabled={busy}
          >
            <Sparkles className="h-4 w-4" />
            {busy ? "Generating…" : "Generate figurine"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={download}
            disabled={!outputUrl}
          >
            <Download className="h-4 w-4" />
            Download PNG
          </Button>
        </div>
      </div>

      {/* Live preview */}
      <div className="mt-6">
        <Card className="border-slate-200">
          <CardContent className="p-3 sm:p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Canvas (hidden but keeps exact pixels for export) */}
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-sm font-medium text-slate-700 mb-2">Canvas (export)</div>
                <div className="overflow-auto rounded-lg border border-slate-200 bg-white">
                  <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    className="block"
                    aria-label="Figurine canvas"
                  />
                </div>
              </div>

              {/* Preview image */}
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-sm font-medium text-slate-700 mb-2">Preview</div>
                <div className="flex items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-2">
                  {outputUrl ? (
                    <img
                      src={outputUrl}
                      alt="Figurine preview"
                      className="max-h-[520px] w-auto"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
                      <Sparkles className="mb-2 h-6 w-6" />
                      <p className="text-sm">No preview yet. Click <strong>Generate figurine</strong>.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

/** helper: rounded rectangle path */
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}
