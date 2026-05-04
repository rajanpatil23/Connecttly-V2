// src/Features/free-tools/linkedin-post-generator/components/EditorPanel.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Loader2,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
  Wand2,
  Copy,
  Save,
} from "lucide-react";
import { useState } from "react";

export default function EditorPanel({
  state,
  error,
  postText,
  setPostText,
  imageUrl,
  imagePrompt,
  setImagePrompt,
  onGenerateImage,
  onRegenerateImage,
  onDeleteImage,
  onRegeneratePost,
  charCount,
  maxChars,
  warnAt,
}: {
  state: string;
  error: string | null;
  postText: string;
  setPostText: (v: string) => void;
  imageUrl: string | null;
  imagePrompt: string;
  setImagePrompt: (v: string) => void;
  onGenerateImage: () => Promise<void>;
  onRegenerateImage: () => Promise<void>;
  onDeleteImage: () => void;
  onRegeneratePost: () => Promise<void>;
  charCount: number;
  maxChars: number;
  warnAt: number;
}) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(postText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const saveDraftToFile = () => {
    const blob = new Blob([postText], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "linkedin-post.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };

  const countingClass =
    charCount > maxChars
      ? "text-red-600"
      : charCount >= warnAt
      ? "text-amber-600"
      : "text-slate-500";

  return (
    <div className="space-y-4 sm:space-y-3">
      {/* Image prompt card OR image block */}
      {!imageUrl ? (
        <Card className="rounded-xl border-slate-200 bg-slate-50 p-3 sm:p-4 overflow-hidden">
          <div className="flex items-start gap-2">
            <ImageIcon className="mt-1 h-5 w-5 text-[#0A1F3D] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#0A1F3D]">
                Image for this post (optional)
              </div>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={3}
                className={cn(
                  "mt-2 w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none",
                  "break-words [overflow-wrap:anywhere] min-h-[88px] sm:min-h-[96px]"
                )}
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {/* Generate image — gradient + shadow spec */}
                <Button
                  size="sm"
                  className={cn(
                    "gap-2 text-white",
                    "bg-gradient-to-r from-[#0A1F3D] to-[#0074ED]",
                    "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
                    "hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D]"
                  )}
                  style={{
                    background: "linear-gradient(to right, #0A1F3D, #0074ED)",
                    color: "white",
                  }}
                  onClick={onGenerateImage}
                  disabled={state === "generating_image"}
                >
                  {state === "generating_image" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                  Generate image
                </Button>
                {error && <span className="text-xs text-red-600">{error}</span>}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="rounded-xl border-slate-200 bg-white p-0 overflow-hidden">
          <img
            src={imageUrl}
            alt="Generated"
            className="block w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-cover"
          />
          <div className="flex flex-wrap items-center gap-2 p-2 sm:p-3">
            <Button
              size="sm"
              className="gap-2"
              onClick={onRegenerateImage}
              disabled={state === "regenerating_image"}
            >
              {state === "regenerating_image" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Regenerate
            </Button>
            <Button size="sm" className="gap-2" onClick={onDeleteImage}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
          <div className="border-t border-slate-100 p-2 sm:p-3">
            <label className="text-xs text-slate-500">
              Prompt (used for regenerations)
            </label>
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              rows={2}
              className={cn(
                "mt-1 w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none",
                "break-words [overflow-wrap:anywhere] min-h-[72px]"
              )}
            />
          </div>
        </Card>
      )}

      {/* Text editor */}
      <div className="relative">
        {!postText && (
          <div
            className="pointer-events-none absolute left-3 top-3 text-slate-400"
            style={{ fontSize: 16, lineHeight: "26px" }}
          >
            Your post will appear here after you click Generate.
          </div>
        )}
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          rows={12}
          className={cn(
            "w-full resize-y rounded-xl border border-slate-200 bg-white p-3 sm:p-4 text-[15px] leading-6 text-slate-900 outline-none",
            "break-words [overflow-wrap:anywhere] min-h-[220px] sm:min-h-[280px]"
          )}
        />
      </div>

      {/* footer actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs">
          <span className={cn("font-mono", countingClass)}>{charCount}</span>
          <span className="text-slate-400"> / {maxChars}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            className={cn(
              "gap-2",
              copied ? "border-emerald-300 bg-emerald-50 text-emerald-700" : ""
            )}
            onClick={copyText}
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>

          <Button
            className={cn(
              "gap-2",
              saved ? "border-emerald-300 bg-emerald-50 text-emerald-700" : ""
            )}
            onClick={saveDraftToFile}
          >
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save draft"}
          </Button>

          {/* Regenerate text — gradient + shadow spec */}
          <Button
            className={cn(
              "gap-2 text-white",
              "bg-gradient-to-r from-[#0A1F3D] to-[#0074ED]",
              "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
              "hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D]"
            )}
            style={{
              background: "linear-gradient(to right, #0A1F3D, #0074ED)",
              color: "white",
            }}
            onClick={onRegeneratePost}
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate text
          </Button>
        </div>
      </div>
    </div>
  );
}
