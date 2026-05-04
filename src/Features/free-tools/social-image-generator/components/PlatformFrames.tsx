import { cn } from "@/lib/utils";
import { Globe2, MoreHorizontal, ThumbsUp, MessageSquare, Repeat2, Send, Heart } from "lucide-react";
import type { PlatformKey } from "../types";
import { PLATFORM_SPECS } from "../constants";

/* A simple “native-like” frame around the canvas for each platform */
export function PlatformFrame({
  platform,
  children,
}: {
  platform: PlatformKey;
  children: React.ReactNode;
}) {
  const spec = PLATFORM_SPECS[platform];
  const isDark = platform === "tiktok";

  const header = (
    <div className={cn("flex items-start justify-between px-4 pt-3", isDark ? "text-slate-200" : "text-slate-900")}>
      <div className="flex items-start gap-3">
        <img
          src="https://i.pravatar.cc/80?img=11"
          alt="Avatar"
          className="h-9 w-9 rounded-full"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-[15px] font-semibold">
            {spec.label} Page
            {platform !== "tiktok" && <span className="ml-1 text-xs font-normal text-slate-500">•</span>}
          </div>
          <div className="text-xs text-slate-500">
            {platform === "linkedin" ? "Company • 9h •" : "1h •"}
            <Globe2 className="ml-1 inline h-3.5 w-3.5" />
          </div>
        </div>
      </div>
      <button
        type="button"
        className={cn("rounded-full p-1.5", isDark ? "text-slate-300 hover:bg-white/5" : "text-slate-500 hover:bg-slate-100")}
        aria-label="More"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );

  const reactions = (
    <div className={cn("grid grid-cols-4 px-1 py-1.5 text-sm", isDark ? "text-slate-200" : "text-slate-600")}>
      <FooterAction icon={<ThumbsUp className="h-4 w-4" />}>Like</FooterAction>
      <FooterAction icon={<MessageSquare className="h-4 w-4" />}>Comment</FooterAction>
      <FooterAction icon={<Repeat2 className="h-4 w-4" />}>Share</FooterAction>
      <FooterAction icon={<Send className="h-4 w-4" />}>Send</FooterAction>
    </div>
  );

  return (
    <div
      className={cn(
        "w-full rounded-2xl border shadow-sm",
        isDark ? "border-neutral-800 bg-neutral-950" : "border-slate-200 bg-white"
      )}
    >
      {header}
      <div className={cn("mt-2", isDark ? "bg-neutral-950" : "bg-white")}>{children}</div>
      {/* Meta row */}
      <div className={cn("flex items-center justify-between px-4 py-2 text-xs", isDark ? "text-slate-300" : "text-slate-500")}>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <span
              className={cn(
                "inline-flex h-5 w-5 items-center justify-center rounded-full text-white ring-2",
                isDark ? "ring-neutral-950" : "ring-white"
              )}
              style={{ backgroundColor: spec.accent }}
            >
              <Heart className="h-3 w-3" />
            </span>
          </div>
          <span>32</span>
        </div>
        <div className="flex items-center gap-3">
          <span>2 comments</span>
          <span>4 shares</span>
        </div>
      </div>

      {/* Divider */}
      <div className={cn("h-px w-full", isDark ? "bg-neutral-800" : "bg-slate-100")} />
      {reactions}
    </div>
  );
}

function FooterAction({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="mx-auto inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/5"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
