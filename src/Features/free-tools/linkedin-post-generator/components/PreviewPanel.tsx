// src/Features/free-tools/linkedin-post-generator/components/PreviewPanel.tsx
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import {
  Globe2,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  BadgeCheck,
} from "lucide-react";

/* ---------------------- Helpers: escape + linkify + tags ---------------------- */
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function linkifyAndHashtag(s: string) {
  // URLs
  const urlRegex = /\bhttps?:\/\/[^\s)]+/gi;
  let out = escapeHtml(s).replace(
    urlRegex,
    (m) =>
      `<a href="${m}" target="_blank" rel="noopener noreferrer" class="text-[#0a66c2] hover:underline break-words">${m}</a>`
  );
  // Hashtags
  out = out.replace(/(^|\s)#([a-z0-9_]+)/gi, (_m, p1, tag) => {
    return `${p1}<span class="text-[#0a66c2]">#${tag}</span>`;
  });
  // Newlines to <br/>
  out = out.replace(/\n/g, "<br/>");
  return out;
}

/* -------------------------------- Component --------------------------------- */
export default function PreviewPanel({
  device,
  setDevice,
  postText,
  imageUrl,
}: {
  device: "mobile" | "desktop";
  setDevice: (d: "mobile" | "desktop") => void;
  postText: string;
  imageUrl: string | null;
}) {
  const [expanded, setExpanded] = useState(false);

  // Truncate to ~5 lines / ~160 chars
  const limit = 160;
  const needsTruncate = postText && postText.length > limit;
  const condensed = needsTruncate ? postText.slice(0, limit) : postText;

  const htmlFull = useMemo(() => linkifyAndHashtag(postText || ""), [postText]);
  const htmlTrunc = useMemo(
    () => linkifyAndHashtag(condensed || ""),
    [condensed]
  );

  return (
    <div className="space-y-3 overflow-x-hidden">
      {/* Device toggle */}
      <div className="flex justify-end">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
          <button
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
      </div>

      {/* Post card */}
      <div
        className={cn(
          "mx-auto w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
          device === "mobile" ? "max-w-[420px]" : "max-w-[680px]"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-3 pt-3 sm:px-4 sm:pt-4">
          <div className="flex items-start gap-3 min-w-0">
            <img
              src="/images/shortlogo.png"
              alt="Avatar"
              className="h-9 w-9 rounded-full sm:h-10 sm:w-10 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[15px] font-semibold text-slate-900">
                <span className="truncate">Connecttly</span>
                <BadgeCheck className="ml-0.5 h-4 w-4 text-[#0a66c2]" aria-hidden />
              </div>
              <div className="truncate text-xs text-slate-500">
                Connecttly — Digital Marketing Agency | Future that connects
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span>9h</span>
                <span>•</span>
                <span>Edited</span>
                <span>•</span>
                <Globe2 className="h-3.5 w-3.5" aria-hidden />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
            aria-label="More options"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Body: image (optional) */}
        {imageUrl ? (
          <div className="mt-3">
            <img
              src={imageUrl}
              alt="Post"
              className="block h-auto w-full max-h-[60vh] sm:max-h-[680px] object-cover"
            />
          </div>
        ) : null}

        {/* Body: text */}
        <div className="px-3 pb-2 pt-3 text-[15px] leading-6 text-slate-900 whitespace-pre-wrap break-words [overflow-wrap:anywhere] sm:px-4">
          {!postText ? (
            <span className="text-slate-500">Your post preview will appear here…</span>
          ) : expanded ? (
            <>
              <span dangerouslySetInnerHTML={{ __html: htmlFull }} />
              <div className="pt-1">
                <button
                  className="text-sm font-medium text-[#0a66c2] hover:underline"
                  onClick={() => setExpanded(false)}
                >
                  See less
                </button>
              </div>
            </>
          ) : (
            <>
              <span dangerouslySetInnerHTML={{ __html: htmlTrunc }} />
              {needsTruncate && (
                <>
                  <span>… </span>
                  <button
                    className="align-baseline text-sm font-medium text-[#0a66c2] hover:underline"
                    onClick={() => setExpanded(true)}
                  >
                    see more
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Reactions meta (static placeholders for look & feel) */}
        <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 sm:px-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0a66c2] text-white ring-2 ring-white">
                <ThumbsUp className="h-3 w-3" />
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                ❤
              </span>
            </div>
            <span>32</span>
          </div>
          <div className="flex items-center gap-3">
            <span>2 comments</span>
            <span>4 reposts</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-slate-100" />

        {/* Footer actions */}
        <div className="grid grid-cols-4 gap-y-1 px-1 py-1.5 text-sm text-slate-600 sm:gap-y-0">
          <FooterAction icon={<ThumbsUp className="h-4 w-4" />}>Like</FooterAction>
          <FooterAction icon={<MessageSquare className="h-4 w-4" />}>Comment</FooterAction>
          <FooterAction icon={<Repeat2 className="h-4 w-4" />}>Repost</FooterAction>
          <FooterAction icon={<Send className="h-4 w-4" />}>Send</FooterAction>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Subparts -------------------------------- */
function FooterAction({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="mx-auto inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-slate-50"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
