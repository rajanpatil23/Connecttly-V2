// src/Features/free-tools/image-generator/ImageGenPage.tsx
import { useEffect, useState, useCallback } from "react";
import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";
import ImagePromptForm, { type FormState } from "./components/ImagePromptForm";
import { generateImages } from "./api/imageGenClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

function PremiumLoader() {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white/85 px-6 py-5 ring-1 ring-slate-200 shadow-lg">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#0A1F3D,#0074ED,#0A1F3D)] animate-[spin_1.6s_linear_infinite]" />
          <div className="absolute inset-[6px] rounded-full bg-white" />
          <Sparkles className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-[#0074ED]" />
        </div>
        <div className="text-sm font-medium text-[#0A1F3D]">Generating images…</div>
        <p className="text-xs text-slate-600">This usually takes a few seconds.</p>
      </div>
    </div>
  );
}

function PlaceholderArt() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-10 bg-white">
      <div className="mx-auto max-w-md text-center">
        <svg width="160" height="100" viewBox="0 0 360 220" className="mx-auto mb-4" aria-hidden>
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#0A1F3D" />
              <stop offset="100%" stopColor="#0074ED" />
            </linearGradient>
          </defs>
          <rect x="20" y="20" width="320" height="180" rx="14" fill="url(#g1)" opacity="0.08" />
          <rect x="36" y="36" width="288" height="120" rx="10" fill="#fff" stroke="#e5e7eb" />
          <circle cx="90" cy="96" r="28" fill="#f1f5f9" stroke="#e5e7eb" />
          <rect x="132" y="74" width="160" height="12" rx="6" fill="#e2e8f0" />
          <rect x="132" y="96" width="140" height="12" rx="6" fill="#e2e8f0" />
          <rect x="132" y="118" width="90" height="12" rx="6" fill="#e2e8f0" />
        </svg>
        <h4 className="text-base font-semibold text-[#0A1F3D]">Your images will appear here</h4>
        <p className="mt-1 text-sm text-slate-600">
          Describe the image, enhance the prompt (optional), then click <span className="font-medium">Generate</span>.
        </p>
      </div>
    </div>
  );
}

export default function ImageGenPage() {
  const [images, setImages] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  // Lightbox state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onGenerate = async (payload: FormState) => {
    setGenerating(true);
    try {
      const urls = await generateImages(payload.prompt, {
        aspect: payload.aspect,
        size: payload.size,
        count: payload.count,
        timeoutMs: 60000,
      });
      setImages(urls);
      // open viewer automatically if only 1 image (optional; comment out if not desired)
      // if (urls.length === 1) { setCurrentIndex(0); setViewerOpen(true); }
      setTimeout(() => {
        document.getElementById("ig-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } finally {
      setGenerating(false);
    }
  };

  const download = (src: string, idx: number) => {
    const a = document.createElement("a");
    a.download = `image-${idx + 1}.png`;
    a.href = src;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const openViewer = (i: number) => {
    setCurrentIndex(i);
    setViewerOpen(true);
  };
  const closeViewer = () => setViewerOpen(false);

  const next = useCallback(() => {
    setCurrentIndex((i) => (images.length ? (i + 1) % images.length : 0));
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0));
  }, [images.length]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [viewerOpen, next, prev]);

  return (
    <ToolLayout
      title="Image Generator"
      description="Generate premium-quality visuals in a click. Clean, fast, and on-brand."
      breadcrumb={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Image Generator" }]}
      width="xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <ImagePromptForm onGenerate={onGenerate} />
        </div>

        <div className="lg:col-span-1" id="ig-results">
          <Card className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[#0A1F3D]">Results</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              {generating && <PremiumLoader />}

              {images.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white cursor-zoom-in"
                      onClick={() => openViewer(i)}
                      role="button"
                      aria-label={`Open image ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt={`Generated ${i + 1}`}
                        className="block h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/35 via-black/10 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-white text-[#0A1F3D] hover:bg-white/95"
                          onClick={(e) => {
                            e.stopPropagation();
                            download(src, i);
                          }}
                        >
                          <Download className="h-4 w-4" /> Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-white text-[#0A1F3D] hover:bg-white/95"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(src, "_blank");
                          }}
                        >
                          <ExternalLink className="h-4 w-4" /> Open
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <PlaceholderArt />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lightbox / Viewer */}
      {viewerOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90"
          onClick={closeViewer}
          aria-modal="true"
          role="dialog"
        >
          <button
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              closeViewer();
            }}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="flex h-full w-full items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative max-h-[85vh] w-full max-w-5xl">
              <img
                src={images[currentIndex]}
                alt={`Preview ${currentIndex + 1}`}
                className="mx-auto block h-full w-full max-h-[85vh] object-contain"
              />

              {/* Bottom bar */}
              <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/40 to-transparent px-2 pb-2 pt-6">
                <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-900">
                  {currentIndex + 1} / {images.length}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white text-[#0A1F3D] hover:bg-white/95"
                    onClick={() => download(images[currentIndex], currentIndex)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white text-[#0A1F3D] hover:bg-white/95"
                    onClick={() => window.open(images[currentIndex], "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
