// src/features/free-tools/hashtags/HashtagPage.tsx
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Copy, Hash, List, RefreshCw, Sparkles, Trash2 } from "lucide-react";

import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";
import useLocalStorage from "@/Features/free-tools/common/hooks/useLocalStorage";
import { copyToClipboard } from "@/Features/free-tools/common/utils/copy";
import { generateHashtags, PLATFORMS, type PlatformKey } from "./utils/generateHashtags";
import { textGenerate, hasTextAPI } from "@/Features/free-tools/common/api/aiClient";

/* Brand tokens */
const NAVY = "#0A1F3D";
const BLUE = "#0074ED";

/* Cards + fields (force white) */
const card = "rounded-2xl border border-slate-200 bg-white shadow-sm";
const field =
  "h-11 rounded-xl bg-white text-[15px] border border-slate-300 " +
  "placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#0074ED]/40 " +
  "focus-visible:ring-offset-2 focus-visible:outline-none focus:border-[#0074ED]/60";

/* Primary (blue) used elsewhere on page, leave as-is */
function PrimaryButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      className={cn(
        "h-11 rounded-xl px-4 text-white shadow-md",
        "hover:brightness-[1.06] active:brightness-95 transition",
        "disabled:opacity-60 disabled:pointer-events-none",
        props.className
      )}
      style={{
        backgroundImage: "linear-gradient(90deg, #2B8CFF 0%, #1E7EF5 45%, #2B8CFF 100%)",
        backgroundColor: "#2B8CFF",
      }}
    />
  );
}

/* Outline = white bg, navy text (leave as-is for non-AI actions) */
function OutlineButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      variant="outline"
      className={cn(
        "h-11 rounded-xl px-4 border-slate-300 text-[15px]",
        "hover:border-[#0074ED]/60",
        props.className
      )}
      style={{ backgroundColor: "#FFFFFF", color: NAVY }}
    />
  );
}

/* New: Gradient per your spec (deep navy -> bright blue) */
function GradientButton(props: React.ComponentProps<typeof Button>) {
  const { className, style, ...rest } = props;
  return (
    <Button
      {...rest}
      className={cn(
        "h-11 rounded-xl px-4 text-white",
        "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
        "hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1)]",
        "transition disabled:opacity-60 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2",
        className
      )}
      style={{
        background: "linear-gradient(to right, #0A1F3D, #0074ED)",
        color: "white",
        ...(style || {}),
      }}
    />
  );
}

/* Chip input */
function ChipInput({
  value,
  onChange,
  placeholder = "Add a keyword and press Enter",
  className,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  className?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = (raw: string) => {
    const t = raw.trim().replace(/\s+/g, " ");
    if (!t || value.includes(t)) return;
    onChange([...value, t]);
    setDraft("");
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && !draft && value.length) {
      e.preventDefault();
      const next = [...value];
      next.pop();
      onChange(next);
    }
  };

  return (
    <div
      className={cn(
        card,
        "p-3 ring-offset-background focus-within:ring-2 focus-within:ring-[#0074ED]/20 focus-within:ring-offset-2",
        className
      )}
    >
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <span
            key={t}
            className="group inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-800"
            title={t}
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(value.filter((v) => v !== t))}
              className="rounded-full px-1 text-slate-500 transition hover:text-slate-900"
              aria-label={`Remove ${t}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="min-w-[220px] flex-1 bg-transparent px-2 py-1.5 text-base outline-none"
          style={{ color: NAVY }}
        />
      </div>
    </div>
  );
}

export default function HashtagPage() {
  const [terms, setTerms, { remove: clearTerms }] = useLocalStorage<string[]>("ft_hashtag_terms", []);
  const [platform, setPlatform] = useLocalStorage<PlatformKey>("ft_hashtag_platform", "instagram");

  const [count, setCount] = useState<number>(30);
  const [withHash, setWithHash] = useState<boolean>(true);
  const [titleCase, setTitleCase] = useState<boolean>(false);
  const [mix, setMix] = useState<boolean>(true);

  const [aiInput, setAiInput] = useState("");
  const [aiBusy, setAiBusy] = useState(false);

  const tags = useMemo(
    () =>
      generateHashtags({
        platform,
        terms,
        limit: count,
        includeHash: withHash,
        titleCase,
        mixPopularity: mix,
      }),
    [platform, terms, count, withHash, titleCase, mix]
  );

  const copyAll = async (sep: "space" | "comma" | "newline" = "space") => {
    const text =
      sep === "comma" ? tags.join(", ") : sep === "newline" ? tags.join("\n") : tags.join(" ");
    await copyToClipboard(text);
  };

  const resetAll = () => {
    clearTerms();
    setPlatform("instagram");
    setCount(30);
    setWithHash(true);
    setTitleCase(false);
    setMix(true);
    setAiInput("");
  };

  const doAI = async (mode: "expand" | "rewrite") => {
    if (!aiInput.trim()) return;
    setAiBusy(true);
    try {
      const prompt =
        mode === "expand"
          ? `Expand and improve this list of topic keywords for ${platform}. Return only a comma-separated list of short keyword tokens (no #), keep them relevant:\n\n${aiInput}`
          : `Rewrite & refine these keywords (no #). Return only a comma-separated list of short keyword tokens:\n\n${aiInput}`;

      const text = await textGenerate(prompt);
      const list = (text || "")
        .split(/[,\n]/g)
        .map((s) => s.trim())
        .filter(Boolean);

      if (list.length) setTerms(Array.from(new Set([...terms, ...list])));
    } catch {
      alert("AI suggestion failed. Please try again.");
    } finally {
      setAiBusy(false);
    }
  };

  const platformMeta = PLATFORMS.find((p) => p.key === platform);

  return (
    <ToolLayout
      title="Hashtag Generator"
      description="Generate clean, platform-aware hashtags from a few seed keywords. Fast, deterministic, optionally AI-polished."
      width="lg"
      breadcrumb={[{ label: "Free Tools", href: "/resources/tools" }, { label: "Hashtag Generator" }]}
    >
      <div className="mb-5 h-1 w-full rounded-full bg-gradient-to-r from-[#0A1F3D]/30 via-[#0074ED]/25 to-transparent" />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left */}
        <Card className={cn(card, "md:col-span-1")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: NAVY }}>
              Platform & Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Platform */}
            <div className="space-y-2">
              <Label style={{ color: NAVY }}>Platform</Label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as PlatformKey)}>
                <SelectTrigger className={field} style={{ backgroundColor: "#FFFFFF", color: NAVY }}>
                  <SelectValue placeholder="Choose platform" />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-900">
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.key} value={p.key}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {platformMeta?.tip && <p className="text-xs text-slate-500">{platformMeta.tip}</p>}
            </div>

            {/* Count */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label style={{ color: NAVY }}>Max hashtags</Label>
                <span className="text-sm text-slate-600">{count}</span>
              </div>
              <Slider defaultValue={[count]} min={5} max={60} step={1} onValueChange={([v]) => setCount(v)} />
            </div>

            {/* Options */}
            <div className="grid gap-4">
              {[
                { label: "Include “#”", sub: "Directly pasteable", state: withHash, set: setWithHash },
                { label: "Title Case", sub: "Preserve camel/title casing", state: titleCase, set: setTitleCase },
                { label: "Smart mix", sub: "Blend niche + mid + broad tags", state: mix, set: setMix },
              ].map(({ label, sub, state, set }) => (
                <label
                  key={label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium" style={{ color: NAVY }}>
                      {label}
                    </div>
                    <p className="text-xs text-slate-500">{sub}</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#0074ED]" checked={state} onCheckedChange={set as any} />
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-1">
              <PrimaryButton className="gap-2" onClick={() => copyAll("space")}>
                <Copy className="h-4 w-4" /> Copy (space)
              </PrimaryButton>
              <OutlineButton className="gap-2" onClick={() => copyAll("comma")}>
                <List className="h-4 w-4" /> Copy (comma)
              </OutlineButton>
              <OutlineButton className="gap-2" onClick={() => copyAll("newline")}>
                <Hash className="h-4 w-4" /> Copy (lines)
              </OutlineButton>
              <Button
                variant="ghost"
                className="ml-auto gap-2 text-red-600 hover:text-red-700"
                onClick={resetAll}
                title="Reset everything"
              >
                <Trash2 className="h-4 w-4" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right */}
        <div className="md:col-span-2 grid gap-6">
          <Card className={card}>
            <CardHeader className="pb-3">
              <CardTitle className="text-[17px] font-semibold" style={{ color: NAVY }}>
                Seed keywords
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ChipInput value={terms} onChange={setTerms} />
              <div className="flex items-center gap-2">
                <Input
                  className={field}
                  style={{ backgroundColor: "#FFFFFF", color: NAVY }}
                  placeholder="Quick add: comma separated (e.g. saas, growth, startup)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const list = (e.currentTarget.value || "")
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                      if (list.length) {
                        setTerms(Array.from(new Set([...terms, ...list])));
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
                <OutlineButton
                  className="gap-2"
                  onClick={(e) => {
                    const input = (e.currentTarget.previousSibling as HTMLInputElement)!;
                    const list = (input.value || "")
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    if (list.length) {
                      setTerms(Array.from(new Set([...terms, ...list])));
                      input.value = "";
                    }
                  }}
                >
                  <RefreshCw className="h-4 w-4" /> Add
                </OutlineButton>
              </div>
              <p className="text-xs text-slate-500">
                Tip: Add a few niche and a few broad topics — the generator blends them for reach and relevance.
              </p>
            </CardContent>
          </Card>

          {hasTextAPI() && (
            <Card className={card}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-[17px] font-semibold" style={{ color: NAVY }}>
                  <Sparkles className="h-4 w-4 text-[#0074ED]" />
                  AI Assist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  className={field}
                  style={{ backgroundColor: "#FFFFFF", color: NAVY }}
                  placeholder="Paste a short description or a few keywords. AI will expand/refine them (no # in output)."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  {/* Gradient buttons per your spec */}
                  <GradientButton
                    disabled={aiBusy || !aiInput.trim()}
                    onClick={() => doAI("expand")}
                    className="gap-2"
                  >
                    <Sparkles className="h-4 w-4" /> Expand & Add
                  </GradientButton>
                  <OutlineButton
                    className="gap-2"
                    disabled={aiBusy || !aiInput.trim()}
                    onClick={() => doAI("rewrite")}
                  >
                    <Sparkles className="h-4 w-4" /> Rewrite & Add
                  </OutlineButton>
                </div>
                <p className="text-xs text-slate-500">
                  Uses your <span className="font-mono">/api/ai/text/generate</span> proxy. If unavailable, the base
                  generator still works.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className={card}>
            <CardHeader className="pb-3">
              <CardTitle className="text-[17px] font-semibold" style={{ color: NAVY }}>
                Generated hashtags ({tags.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tags.length ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="cursor-pointer bg-slate-100 text-slate-900 hover:bg-slate-200 text-[13px] py-1"
                      onClick={() => copyToClipboard(t)}
                      title="Click to copy"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
                  Add a couple of seed keywords to see suggestions here.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
