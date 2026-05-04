import { useEffect, useMemo, useRef, useState } from "react";
import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code2,
  Undo2,
  Redo2,
  Paintbrush,
  Copy as CopyIcon,
  Eraser,
} from "lucide-react";

/* ----------------------------- Brand palette ----------------------------- */
const BRAND_NAVY = "#0A1F3D";

/* ------------------------------- Fonts ----------------------------------- */
/** Font stack that *does* include Mathematical Alphanumeric Symbols */
const MATH_FONT_STACK =
  `"Noto Sans Math","Noto Sans Symbols 2","Noto Serif Math","Cambria Math","STIX Two Math","Segoe UI Symbol","Symbola","DejaVu Sans","Apple Symbols",system-ui,sans-serif`;

/** Tiles that need the math stack to avoid tofu */
const needsMathFont = (key: string) =>
  !["normal", "underline", "strike", "fullwidth"].includes(key);

/** Load math-capable fonts (and preconnect) once */
function useLoadMathFont() {
  useEffect(() => {
    const add = (id: string, attrs: Record<string, string>) => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
      document.head.appendChild(link);
    };
    add("gf-preconnect-1", { rel: "preconnect", href: "https://fonts.googleapis.com" });
    add("gf-preconnect-2", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" });
    add("gf-noto-sans-math",  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Math&display=swap" });
    add("gf-noto-sym2",       { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols+2&display=swap" });
    add("gf-noto-serif-math", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Serif+Math&display=swap" });
  }, []);
}

/* ------------------------------- Helpers ----------------------------------- */
const WRAP_CLS = "whitespace-pre-wrap break-words [overflow-wrap:anywhere]";

const SEG: Intl.Segmenter | null =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

const graphemes = (s: string): string[] =>
  SEG ? Array.from(SEG.segment(s), (x) => x.segment) : Array.from(s);

const mapChars = (s: string, maps: Record<string, string>) =>
  graphemes(s).map((ch) => maps[ch] ?? ch).join("");

type AlphaSet =
  | "bold"
  | "italic"
  | "boldItalic"
  | "sans"
  | "sansItalic"
  | "boldSans"
  | "mono"
  | "double";

const makeAlpha = (base: number, baseCaps: number) => (c: string) => {
  const code = c.codePointAt(0)!;
  if (code >= 97 && code <= 122) return String.fromCodePoint(base + (code - 97));
  if (code >= 65 && code <= 90) return String.fromCodePoint(baseCaps + (code - 65));
  return c;
};

/** Italic small 'h' special-case: use U+210E ℎ */
const italicMap = (c: string) => {
  const code = c.codePointAt(0)!;
  if (code >= 97 && code <= 122) {
    const offset = code - 97;
    if (offset === 7) return "\u210E";
    return String.fromCodePoint(0x1d44e + offset);
  }
  if (code >= 65 && code <= 90) {
    return String.fromCodePoint(0x1d434 + (code - 65));
  }
  return c;
};

const alphaSets: Record<AlphaSet, (c: string) => string> = {
  bold: makeAlpha(0x1d41a, 0x1d400),
  italic: italicMap,
  boldItalic: makeAlpha(0x1d482, 0x1d468),
  sans: makeAlpha(0x1d5ee, 0x1d5d4),
  sansItalic: makeAlpha(0x1d622, 0x1d608),
  boldSans: makeAlpha(0x1d5f8, 0x1d5de),
  mono: makeAlpha(0x1d68a, 0x1d670),
  double: makeAlpha(0x1d552, 0x1d538),
};

const transformAlpha = (t: AlphaSet, s: string) =>
  graphemes(s).map(alphaSets[t]).join("");

const applyCombining = (s: string, mark: string) =>
  graphemes(s).map((g) => (/^\s$/.test(g) ? g : g + mark)).join("");

const fullwidthMap: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  const normal =
    ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
  const full =
    "　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～";
  for (let i = 0; i < normal.length; i++) out[normal[i]] = full[i];
  return out;
})();

const STYLES = [
  { key: "normal", title: "Normal", render: (s: string) => s },
  { key: "bold", title: "Bold", render: (s: string) => transformAlpha("bold", s) },
  { key: "italic", title: "Italic", render: (s: string) => transformAlpha("italic", s) },
  { key: "boldItalic", title: "Bold Italic", render: (s: string) => transformAlpha("boldItalic", s) },
  { key: "sans", title: "Sans", render: (s: string) => transformAlpha("sans", s) },
  { key: "sansItalic", title: "Sans Italic", render: (s: string) => transformAlpha("sansItalic", s) },
  { key: "boldSans", title: "Bold Sans", render: (s: string) => transformAlpha("boldSans", s) },
  { key: "mono", title: "Monospace", render: (s: string) => transformAlpha("mono", s) },
  { key: "underline", title: "Underline", render: (s: string) => applyCombining(s, "\u0332") },
  { key: "strike", title: "Strikethrough", render: (s: string) => applyCombining(s, "\u0336") },
  { key: "fullwidth", title: "Fullwidth", render: (s: string) => mapChars(s, fullwidthMap) },
  { key: "double", title: "Doublestruck", render: (s: string) => transformAlpha("double", s) },
];

/* --------------------------- execCommand helpers -------------------------- */
function exec(cmd: string, value?: string) {
  document.execCommand(cmd, false, value ?? "");
}
function getSelectionInside(el: HTMLElement) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  if (!el.contains(range.commonAncestorContainer)) return null;
  return { sel, range };
}

/* --------------------------- Sanitizer & Clipboard -------------------------- */
const ALLOWED_TAGS = new Set([
  "B","STRONG","I","EM","U","S","STRIKE","SPAN","CODE","BR",
  "DIV","P","H1","H2","H3","H4","H5","H6","UL","OL","LI","BLOCKQUOTE","PRE","HR",
  "A",
]);

const SAFE_CSS = new Set([
  "color","background-color",
  "text-align","font-weight","font-style",
  "text-decoration","text-decoration-line","text-decoration-color","text-decoration-style",
  "font-size","line-height","letter-spacing","word-spacing",
  "font-family","white-space",
  "margin","margin-left","margin-right","margin-top","margin-bottom",
  "padding","padding-left","padding-right","padding-top","padding-bottom",
]);

function sanitizeStyle(style: string, tagName: string): string {
  if (!style) return "";
  const rules = style.split(";").map(r => r.trim()).filter(Boolean);
  const kept: string[] = [];
  for (const rule of rules) {
    const [rawProp, ...rest] = rule.split(":");
    if (!rawProp || rest.length === 0) continue;
    const prop = rawProp.trim().toLowerCase();
    const val = rest.join(":").trim();
    if (!SAFE_CSS.has(prop)) continue;
    const lowerVal = val.toLowerCase();
    if (lowerVal.includes("url(") || lowerVal.includes("expression(") || lowerVal.includes("javascript:")) continue;
    kept.push(`${prop}:${val}`);
  }
  return kept.join(";");
}

function sanitizeAnchor(el: HTMLAnchorElement) {
  const href = (el.getAttribute("href") || "").trim();
  const ok =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#") ||
    href.startsWith("/") ||
    href === "";
  if (!ok) el.removeAttribute("href");

  const tgt = (el.getAttribute("target") || "").toLowerCase();
  if (tgt === "_blank") {
    const rel = (el.getAttribute("rel") || "").toLowerCase();
    const parts = new Set(rel.split(/\s+/).filter(Boolean));
    parts.add("noopener"); parts.add("noreferrer");
    el.setAttribute("rel", Array.from(parts).join(" "));
  }
}

function sanitizeEditorHtml(html: string): string {
  if (!html) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild as HTMLElement;
  if (!root) return "";

  const normalize = (node: Node) => {
    if (node.nodeType === 1) {
      const el = node as HTMLElement;
      if (el.tagName === "FONT") {
        const span = doc.createElement("span");
        const color = el.getAttribute("color");
        if (color) span.setAttribute("style", `color:${color}`);
        while (el.firstChild) span.appendChild(el.firstChild);
        el.parentNode?.replaceChild(span, el);
        normalize(span);
        return;
      }
      [...el.attributes].forEach((a) => {
        if (a.name.toLowerCase().startsWith("on")) el.removeAttribute(a.name);
      });
    }
    let c = node.firstChild;
    while (c) {
      const next = c.nextSibling;
      normalize(c);
      c = next;
    }
  };

  const clean = (node: Node) => {
    if (node.nodeType === 1) {
      const el = node as HTMLElement;
      const tag = el.tagName;

      if (!ALLOWED_TAGS.has(tag)) {
        const parent = el.parentNode!;
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
        return;
      }

      const keepAttrs = new Set(["style","class","id"]);
      if (tag === "A") { keepAttrs.add("href"); keepAttrs.add("target"); keepAttrs.add("rel"); }

      [...el.attributes].forEach((a) => {
        const name = a.name.toLowerCase();
        if (name.startsWith("on")) { el.removeAttribute(a.name); return; }
        if (!keepAttrs.has(name)) el.removeAttribute(a.name);
      });

      if (el.hasAttribute("style")) {
        const cleaned = sanitizeStyle(el.getAttribute("style") || "", tag);
        if (cleaned) el.setAttribute("style", cleaned);
        else el.removeAttribute("style");
      }

      if (tag === "A") sanitizeAnchor(el as HTMLAnchorElement);
    }

    let c = node.firstChild;
    while (c) {
      const next = c.nextSibling;
      clean(c);
      c = next;
    }
  };

  normalize(root);
  clean(root);
  return root.innerHTML;
}

/* Rich clipboard: write HTML + plain fallback */
async function copyAsHtml(html: string, plainFallback: string) {
  try {
    const ClipboardItemAny = (window as any).ClipboardItem || (window as any).webkitClipboardItem;
    if (navigator.clipboard && "write" in navigator.clipboard && ClipboardItemAny) {
      const item = new ClipboardItemAny({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([plainFallback], { type: "text/plain" }),
      });
      await (navigator.clipboard as any).write([item]);
      return true;
    }
  } catch {}
  try {
    await navigator.clipboard.writeText(html);
    return false;
  } catch {
    return false;
  }
}

/* ------------------------------- Component -------------------------------- */
export default function TextFormatterPage() {
  useLoadMathFont();

  const [editorMode, setEditorMode] = useState<"wysiwyg" | "html">("wysiwyg");
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("desktop");

  const [rawHtml, setRawHtml] = useState<string>("");
  const [htmlSource, setHtmlSource] = useState<string>("");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedEditorRaw, setCopiedEditorRaw] = useState(false);
  const [copiedEditorHtml, setCopiedEditorHtml] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  // color picker
  const [colorOpen, setColorOpen] = useState(false);
  const colorWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!colorWrapRef.current) return;
      if (!colorWrapRef.current.contains(e.target as Node)) setColorOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  /* Current HTML → Preview & Plain */
  const currentHtml = editorMode === "html" ? htmlSource : rawHtml;
  const previewHtml = useMemo(() => sanitizeEditorHtml(currentHtml), [currentHtml]);

  const plainText = useMemo(() => {
    const div = document.createElement("div");
    div.innerHTML = previewHtml || "";
    return div.textContent || "";
  }, [previewHtml]);

  /* WYSIWYG events */
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain") || "";
      exec("insertText", text);
    };
    el.addEventListener("paste", onPaste as any);
    return () => el.removeEventListener("paste", onPaste as any);
  }, []);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const handler = () => setRawHtml(el.innerHTML);
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, []);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const meta = e.ctrlKey || e.metaKey;
      if (!meta) return;
      if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault(); exec("undo");
      } else if (e.key.toLowerCase() === "y" || (e.key.toLowerCase() === "z" && e.shiftKey)) {
        e.preventDefault(); exec("redo");
      }
    };
    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, []);

  // switching into HTML: seed with sanitized WYSIWYG
  useEffect(() => {
    if (editorMode === "html") setHtmlSource(sanitizeEditorHtml(rawHtml));
  }, [editorMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // back to WYSIWYG: apply sanitized HTML (supports headings/lists/links/etc.)
  useEffect(() => {
    if (editorMode === "wysiwyg" && editorRef.current) {
      const sanitized = sanitizeEditorHtml(htmlSource || rawHtml);
      editorRef.current.innerHTML = sanitized;
      setRawHtml(sanitized);
    }
  }, [editorMode]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Toolbar actions */
  const applyBold = () => editorRef.current && exec("bold");
  const applyItalic = () => editorRef.current && exec("italic");
  const applyUnderline = () => editorRef.current && exec("underline");
  const applyStrike = () => editorRef.current && exec("strikeThrough");
  const applyMonospace = () => {
    const el = editorRef.current;
    const ctx = el && getSelectionInside(el);
    if (!ctx) return;
    exec(
      "insertHTML",
      `<code style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace">${ctx.sel!.toString()}</code>`
    );
  };
  const applyColor = (hex: string) => { if (editorRef.current) { exec("foreColor", hex); editorRef.current.focus(); } };
  const resetColor = () => applyColor("#111827");

  const clearFormatting = () => {
    const el = editorRef.current; if (!el) return;
    const text = el.textContent || "";
    el.innerHTML = ""; exec("insertText", text);
    setRawHtml(el.innerHTML);
  };

  /* Copy */
  const copy = async (text: string, key?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (key) {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
      }
    } catch {}
  };
  const copyEditorRaw = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopiedEditorRaw(true); setTimeout(() => setCopiedEditorRaw(false), 1500);
    } catch {}
  };
  const copyEditorHtml = async () => {
    try {
      await copyAsHtml(previewHtml, plainText);
      setCopiedEditorHtml(true); setTimeout(() => setCopiedEditorHtml(false), 1500);
    } catch {}
  };

  const primaryToggleBtn = (active: boolean) =>
    cn("rounded-full px-3 py-1 text-sm transition",
       active ? "bg-[#0074ED] text-white shadow-sm" : "text-slate-700 hover:text-slate-900");

  return (
    <ToolLayout
      title="Text Formatter"
      description="Format visually or edit HTML directly—headings, lists, links, and more."
      width="xl"
      breadcrumb={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Text Formatter" }]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Editor / HTML */}
        <Card className="border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>
                {editorMode === "wysiwyg" ? "Editor" : "Edit HTML"}
              </CardTitle>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                <button className={primaryToggleBtn(editorMode === "wysiwyg")} onClick={() => setEditorMode("wysiwyg")}>Editor</button>
                <button className={primaryToggleBtn(editorMode === "html")} onClick={() => setEditorMode("html")}>Edit HTML</button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Toolbar (WYSIWYG only) */}
            {editorMode === "wysiwyg" && (
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-2" role="toolbar" aria-label="Formatting toolbar">
                <ToolbarButton label="Bold" onClick={applyBold}><Bold className="h-4 w-4" /></ToolbarButton>
                <ToolbarButton label="Italic" onClick={applyItalic}><Italic className="h-4 w-4" /></ToolbarButton>
                <ToolbarButton label="Underline" onClick={applyUnderline}><Underline className="h-4 w-4" /></ToolbarButton>
                <ToolbarButton label="Strikethrough" onClick={applyStrike}><Strikethrough className="h-4 w-4" /></ToolbarButton>
                <ToolbarButton label="Monospace" onClick={applyMonospace}><Code2 className="h-4 w-4" /></ToolbarButton>
                <span className="mx-2 h-5 w-px bg-slate-200" />
                <ToolbarButton label="Undo (Ctrl/Cmd+Z)" onClick={() => exec("undo")}><Undo2 className="h-4 w-4" /></ToolbarButton>
                <ToolbarButton label="Redo (Ctrl/Cmd+Y)" onClick={() => exec("redo")}><Redo2 className="h-4 w-4" /></ToolbarButton>
                <span className="mx-2 h-5 w-px bg-slate-200" />
                <div ref={colorWrapRef} className="relative">
                  <ToolbarButton label="Text color" onClick={() => setColorOpen((v) => !v)}><Paintbrush className="h-4 w-4" /></ToolbarButton>
                  {colorOpen && (
                    <div className="absolute z-20 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                      <div className="mb-2 text-xs font-medium text-slate-500">Quick colors</div>
                      <div className="grid grid-cols-6 gap-2">
                        {["#111827","#374151","#6B7280","#9CA3AF","#EF4444","#F59E0B","#10B981","#3B82F6","#8B5CF6","#EC4899","#0A1F3D","#0074ED"].map((hex) => (
                          <button key={hex} title={hex} className="h-6 w-6 rounded border border-slate-200" style={{ backgroundColor: hex }}
                            onClick={() => { applyColor(hex); setColorOpen(false); }} />
                        ))}
                      </div>
                      <Button className="mt-3 w-full bg-slate-50 text-slate-700 hover:bg-slate-100" size="sm"
                        onClick={() => { resetColor(); setColorOpen(false); }}>
                        Reset color
                      </Button>
                    </div>
                  )}
                </div>
                <span className="mx-2 h-5 w-px bg-slate-200" />
                <ToolbarButton label="Clear formatting" onClick={clearFormatting}><Eraser className="h-4 w-4" /></ToolbarButton>
              </div>
            )}

            {/* WYSIWYG area */}
            {editorMode === "wysiwyg" && (
              <div className="relative">
                {!plainText && (
                  <div className="pointer-events-none absolute left-3 top-3 text-slate-400" style={{ fontSize: 16, lineHeight: "26px" }}>
                    Type or paste your text…
                  </div>
                )}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className={cn(
                    "min-h-[160px] rounded-xl border border-slate-200 bg-white p-3",
                    "outline-none focus-visible:ring-2 focus-visible:ring-[#0074ED]/20",
                    WRAP_CLS
                  )}
                  style={{ fontSize: 16, lineHeight: "26px", color: "#111827", fontFamily: MATH_FONT_STACK as any }}
                  onBlur={() => setRawHtml(editorRef.current?.innerHTML || "")}
                />
              </div>
            )}

            {/* HTML source area */}
            {editorMode === "html" && (
              <div>
                <textarea
                  value={htmlSource}
                  onChange={(e) => setHtmlSource(e.target.value)}
                  className={cn(
                    "min-h=[220px] min-h-[220px] w-full rounded-xl border bg-[#0B1020] text-slate-100",
                    "border-slate-800 p-3 font-mono text-[13px] leading-6 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-[#0074ED]/30"
                  )}
                  spellCheck={false}
                />
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span>HTML is sanitized (scripts/events removed). Headings, lists, links, inline styles are preserved.</span>
                  <Button size="sm" className="h-7 bg-[#0074ED] text-white hover:bg-[#0065d1]" onClick={() => setEditorMode("wysiwyg")}>
                    Apply & return to Editor
                  </Button>
                </div>
              </div>
            )}

            {/* Copy buttons */}
            <div className="flex items-center gap-2">
              <Button
                className={cn("gap-2", copiedEditorRaw ? "bg-emerald-600 hover:bg-emerald-600 text-white" : "bg-[#0074ED] hover:bg-[#0065d1] text-white")}
                onClick={copyEditorRaw}
                title="Copy plain text"
              >
                <CopyIcon className="h-4 w-4" />
                {copiedEditorRaw ? "✓ Copied!" : "Copy"}
              </Button>
              <Button
                className={cn("gap-2", copiedEditorHtml ? "bg-emerald-600 hover:bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")}
                onClick={copyEditorHtml}
                title="Copy formatted HTML"
              >
                <CopyIcon className="h-4 w-4" />
                {copiedEditorHtml ? "✓ Copied!" : "Copy formatted HTML"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: Preview */}
        <Card className="border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>Preview</CardTitle>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                <button className={primaryToggleBtn(viewMode === "mobile")} onClick={() => setViewMode("mobile")}>Mobile</button>
                <button className={primaryToggleBtn(viewMode === "desktop")} onClick={() => setViewMode("desktop")}>Desktop</button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={cn("mx-auto rounded-2xl border border-slate-200 bg-white p-0 shadow-sm", viewMode === "mobile" ? "max-w-[420px]" : "max-w-[680px]")}>
              <div className="flex items-start gap-3 p-4">
                <img src="https://i.pravatar.cc/80?img=15" alt="Avatar" className="h-9 w-9 rounded-full" />
                <div className="min-w-0">
                  <div className="font-medium text-slate-900">Guillaume Moubeche</div>
                  <div className="text-xs text-slate-500">Taplio · Helping you grow on LinkedIn · 12h</div>
                </div>
              </div>
              {previewHtml ? (
                <div className={cn("px-4 pb-2 text-[15px] leading-6 text-slate-900", WRAP_CLS)} dangerouslySetInnerHTML={{ __html: previewHtml }} />
              ) : (
                <div className={cn("px-4 pb-2 text-[15px] leading-6 text-slate-900", WRAP_CLS)}>Your formatted text will appear here…</div>
              )}
              <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500">
                <div className="flex items-center gap-3"><span>🔥 57</span></div>
                <div className="flex items-center gap-3"><span>24 comments</span><span>6 reposts</span></div>
              </div>
              <div className="grid grid-cols-4 border-t border-slate-100 px-2 py-2 text-sm text-slate-600">
                <Action>Like</Action><Action>Comment</Action><Action>Repost</Action><Action>Send</Action>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Style cards */}
      <div className="mt-6">
        <h3 className="mb-3 text-[15px] font-semibold" style={{ color: BRAND_NAVY }}>Style previews</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {STYLES.map((s) => {
            const out = s.render(plainText);
            const isCopied = copiedKey === s.key;
            return (
              <div key={s.key} className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col">
                <div className="px-4 pt-3 text-[14px] font-semibold text-slate-800">{s.title}</div>
                <div
                  className={cn("px-4 pb-3 pt-2 text-[15px] leading-6 text-slate-900 flex-1", WRAP_CLS)}
                  style={{ fontFamily: needsMathFont(s.key) ? (MATH_FONT_STACK as any) : undefined }}
                >
                  {out || " "}
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => copy(out, s.key)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") ? (e.preventDefault(), copy(out, s.key)) : null}
                  className={cn(
                    "h-10 rounded-b-2xl border-t px-3 cursor-pointer",
                    isCopied
                      ? "flex items-center justify-center border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "flex items-center justify-center border-[#CFE4FF] bg-[#EAF3FF] text-[#0A1F3D] hover:bg-[#E3EEFF]"
                  )}
                  title="Copy text"
                >
                  {isCopied ? <span className="text-sm">✓ Copied!</span> : <span className="inline-flex items-center gap-2 text-sm"><CopyIcon className="h-4 w-4" />Copy text</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToolLayout>
  );
}

/* ------------------------------- Subcomponents ------------------------------ */
function ToolbarButton({
  children, onClick, label,
}: { children: React.ReactNode; onClick: () => void; label: string; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white",
        "px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 active:bg-slate-100"
      )}
    >
      {children}
    </button>
  );
}

function Action({ children }: { children: React.ReactNode }) {
  return <button className="mx-auto inline-flex items-center justify-center rounded-md px-3 py-2 hover:bg-slate-50">{children}</button>;
}
