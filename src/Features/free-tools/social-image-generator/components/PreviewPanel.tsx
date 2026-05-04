// src/Features/free-tools/social-image-generator/components/PreviewPanel.tsx
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlatformKey, CanvasExportType } from "../types";
import { PlatformFrame } from "./PlatformFrames";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PreviewPanel({
  platform,
  images,
  active,
  setActive,
}: {
  platform: PlatformKey;
  images: string[];
  active: number;
  setActive: (n: number) => void;
}) {
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");
  const [fmt, setFmt] = useState<CanvasExportType>("png");
  const [downloadAll, setDownloadAll] = useState(false);

  const hasMany = images.length > 1;
  const prev = () => setActive((active - 1 + images.length) % images.length);
  const next = () => setActive((active + 1) % images.length);

  const handleDownload = async () => {
    if (!images.length) return;
    if (downloadAll) {
      for (let i = 0; i < images.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await downloadAsFormat(
          images[i],
          fmt,
          `post-${platform}-${device}-v${i + 1}`
        );
      }
    } else {
      await downloadAsFormat(images[active], fmt, `post-${platform}-${device}`);
    }
  };

  return (
    <div className="space-y-3">
      {/* Top bar: device toggle + download controls */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Segmented device toggle (affects the WHOLE frame via outer wrapper) */}
        <div
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1"
          role="tablist"
          aria-label="Preview device"
        >
          <button
            role="tab"
            aria-selected={device === "mobile"}
            className={cn(
              "rounded-full px-3 py-1 text-sm transition",
              device === "mobile"
                ? "bg-[#0074ED] text-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            )}
            onClick={() => setDevice("mobile")}
          >
            Mobile
          </button>
          <button
            role="tab"
            aria-selected={device === "desktop"}
            className={cn(
              "rounded-full px-3 py-1 text-sm transition",
              device === "desktop"
                ? "bg-[#0074ED] text-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            )}
            onClick={() => setDevice("desktop")}
          >
            Desktop
          </button>
        </div>

        {/* Download controls */}
        <div className="flex items-center gap-2">
          <Select value={fmt} onValueChange={(v) => setFmt(v as CanvasExportType)}>
            <SelectTrigger className="h-9 w-[130px] rounded-lg border-slate-300 bg-white text-[14px] text-slate-900 data-[placeholder]:text-slate-500">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-900 border border-slate-200 rounded-md shadow-md focus:outline-none overflow-auto">
              <SelectItem
                value="png"
                className="relative cursor-pointer rounded px-3 py-2 text-[15px] text-slate-900 text-left pl-3 pr-3 [&>span:first-child]:hidden hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-900 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
              >
                PNG
              </SelectItem>
              <SelectItem
                value="jpg"
                className="relative cursor-pointer rounded px-3 py-2 text-[15px] text-slate-900 text-left pl-3 pr-3 [&>span:first-child]:hidden hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-900 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
              >
                JPG
              </SelectItem>
              <SelectItem
                value="webp"
                className="relative cursor-pointer rounded px-3 py-2 text-[15px] text-slate-900 text-left pl-3 pr-3 [&>span:first-child]:hidden hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-900 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
              >
                WEBP
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1">
            <span className="text-xs text-slate-600">All variations</span>
            <Switch
              checked={downloadAll}
              onCheckedChange={setDownloadAll}
              className="data-[state=checked]:bg-[#0074ED]"
            />
          </div>

          <Button
            onClick={handleDownload}
            disabled={!images.length}
            className={cn(
              "h-9 gap-2 text-white rounded-lg",
              "bg-gradient-to-r from-[#0A1F3D] to-[#0074ED]",
              "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
              "hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1)]"
            )}
            style={{
              background: "linear-gradient(to right, #0A1F3D, #0074ED)",
              color: "white",
            }}
          >
            Download
          </Button>
        </div>
      </div>

      {/* Outer wrapper width changes with device — affects the WHOLE PlatformFrame */}
      <div className={cn(device === "mobile" ? "max-w-[420px] mx-auto" : "max-w-full")}>
        <PlatformFrame platform={platform}>
          {/* Inner content stays the same; arrows/dots kept */}
          {!images.length ? (
            <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-slate-600 text-sm">
                Generate images to preview here.
                <br />
                The frame follows the selected platform’s native look.
              </p>
            </div>
          ) : (
            <div className="group relative">
              <img
                src={images[active]}
                alt={`Variation ${active + 1}`}
                className="block w-full h-auto rounded-md border border-slate-200 object-contain"
              />
              {hasMany && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className={cn(
                      "absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white",
                      "opacity-0 group-hover:opacity-100 transition hover:bg-black/20"
                    )}
                  >
                    <ChevronLeft className="h-6 w-6 drop-shadow-lg" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white",
                      "opacity-0 group-hover:opacity-100 transition hover:bg-black/20"
                    )}
                  >
                    <ChevronRight className="h-6 w-6 drop-shadow-lg" />
                  </button>
                </>
              )}
            </div>
          )}
        </PlatformFrame>
      </div>

      {/* Dots */}
      {hasMany && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition",
                i === active ? "bg-[#0A1F3D]" : "bg-slate-300 hover:bg-slate-400"
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- helpers ---------- */
// Re-encode URL/dataURL to desired format when possible; fallback to direct link.
async function downloadAsFormat(
  url: string,
  fmt: CanvasExportType,
  name = "image"
) {
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.crossOrigin = "anonymous";
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const mime =
      fmt === "jpg" ? "image/jpeg" : fmt === "webp" ? "image/webp" : "image/png";
    const dataUrl = canvas.toDataURL(
      mime,
      fmt === "jpg" || fmt === "webp" ? 0.95 : undefined
    );
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${name}.${fmt}`;
    a.click();
  } catch {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.png`;
    a.click();
  }
}
