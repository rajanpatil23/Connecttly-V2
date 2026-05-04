// src/Features/free-tools/utm/components/UTMForm.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { copyToClipboard } from "@/Features/free-tools/common/utils/copy";
import useLocalStorage from "@/Features/free-tools/common/hooks/useLocalStorage";
import { buildUtm } from "../utils/buildUtm";
import {
  PRESETS,
  DEFAULT_NORMALIZATION,
  type Normalization,
  type PresetKey,
} from "../utils/presets";

import {
  Link2,
  Check,
  Copy,
  Layers,
  Upload,
  Wand2,
  Share2,
  RotateCcw,
  Sparkles,
  Plus,
  X,
} from "lucide-react";
import { aiSuggestCampaigns, aiSuggestContents } from "../api/aiUtm";

/* ----------------- Types & constants ----------------- */

type Template = {
  name: string;
  params: Record<string, string>;
  normalization: Normalization;
};

type CustomRow = { id: string; key: string; value: string };

const PARAM_FIELDS: { key: string; label: string; placeholder?: string }[] = [
  { key: "utm_source", label: "UTM Source", placeholder: "google / facebook / email" },
  { key: "utm_medium", label: "UTM Medium", placeholder: "cpc / paid_social / email" },
  { key: "utm_campaign", label: "UTM Campaign", placeholder: "summer_sale / brand_launch" },
  { key: "utm_id", label: "UTM ID", placeholder: "optional id" },
  { key: "utm_term", label: "UTM Term", placeholder: "keyword term" },
  { key: "utm_content", label: "UTM Content", placeholder: "ad_variant / banner_a" },
];

const BRAND_BLUE = "#0074ED";
const BRAND_NAVY = "#0A1F3D";

/** Hard enforce white surface + brand focus ring for all form controls */
const CONTROL =
  "h-10 bg-white text-slate-900 border border-slate-200 " +
  "placeholder:text-slate-400 " +
  "focus-visible:ring-2 focus-visible:ring-[#0074ED]/40 focus-visible:ring-offset-2 focus-visible:outline-none";

/** Primary CTA: deep-navy → blue (no black) */
const BTN_PRIMARY =
  "bg-gradient-to-r from-[#0A1F3D] to-[#0074ED] text-white shadow-sm hover:shadow-md";

/** Neutral action: white surface (no black), subtle border */
const BTN_OUTLINE_WHITE =
  "bg-white text-[#0A1F3D] border-slate-200 hover:bg-white/95";

/* ----------------- Component ----------------- */

export default function UTMForm() {
  /** Persistent core params */
  const [params, setParams] = useLocalStorage<Record<string, string>>(
    "ft_utm_params",
    {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_id: "",
      utm_term: "",
      utm_content: "",
    }
  );
  const [baseUrl, setBaseUrl] = useLocalStorage<string>("ft_utm_base", "");
  const [norm, setNorm] = useLocalStorage<Normalization>(
    "ft_utm_norm",
    DEFAULT_NORMALIZATION
  );

  /** Custom parameters (persisted) */
  const [customRows, setCustomRows] = useLocalStorage<CustomRow[]>(
    "ft_utm_custom",
    []
  );

  /** Templates */
  const [templates, setTemplates] = useLocalStorage<Template[]>(
    "ft_utm_templates",
    []
  );

  const [selectedPreset, setSelectedPreset] = useState<PresetKey | null>(null);

  /** Merge params + custom for builder */
  const mergedParams = useMemo(() => {
    const customObj = Object.fromEntries(
      customRows
        .filter((r) => r.key && r.value)
        .map((r) => [r.key.trim(), r.value])
    );
    return { ...params, ...customObj };
  }, [params, customRows]);

  /** Build result */
  const result = useMemo(
    () => buildUtm({ baseUrl, params: mergedParams, normalization: norm }),
    [baseUrl, mergedParams, norm]
  );

  /** Copy helpers */
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string, which: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(which);
      setTimeout(() => setCopied(null), 1100);
    }
  };

  /** Share state in URL */
  const shareRef = useRef<HTMLButtonElement | null>(null);
  const makeShareLink = () => {
    const state = { baseUrl, params, customRows, norm };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    const url = new URL(window.location.href);
    url.hash = `#s=${b64}`;
    return url.toString();
  };

  useEffect(() => {
    try {
      const h = window.location.hash;
      if (h.startsWith("#s=")) {
        const b64 = h.slice(3);
        const raw = decodeURIComponent(escape(atob(b64)));
        const state = JSON.parse(raw);
        if (state?.baseUrl) setBaseUrl(state.baseUrl);
        if (state?.params) setParams(state.params);
        if (state?.customRows) setCustomRows(state.customRows);
        if (state?.norm) setNorm(state.norm);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Bulk builder */
  const [bulkInput, setBulkInput] = useState<string>("");
  const bulkList = useMemo(() => {
    return (bulkInput || "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(",").map((s) => s.trim());
        const url = parts[0] || "";
        const campaign = parts[1] || params.utm_campaign || "";
        const content = parts[2] || params.utm_content || "";
        const res = buildUtm({
          baseUrl: url,
          params: { ...mergedParams, utm_campaign: campaign, utm_content: content },
          normalization: norm,
        });
        return { line, url: res.url || "", ok: res.ok, error: res.error };
      });
  }, [bulkInput, norm, mergedParams, params.utm_campaign, params.utm_content]);

  const bulkCsv = useMemo(() => {
    const rows = bulkList.map((r) => [r.line.replace(/,/g, ";"), r.url]);
    const txt = [["input", "utm_url"], ...rows]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");
    return txt;
  }, [bulkList]);

  /** AI Assist (optional) */
  const [aiBrand, setAiBrand] = useState("");
  const [aiProduct, setAiProduct] = useState("");
  const [aiAudience, setAiAudience] = useState("");
  const [aiTone, setAiTone] = useState("");
  const [aiCount, setAiCount] = useState(6);
  const [aiCampaignIdeas, setAiCampaignIdeas] = useState<string[]>([]);
  const [aiContentIdeas, setAiContentIdeas] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState<"campaign" | "content" | null>(null);
  const [aiErr, setAiErr] = useState<string | null>(null);

  const runCampaignAI = async () => {
    setAiErr(null);
    setAiLoading("campaign");
    try {
      const out = await aiSuggestCampaigns({
        brand: aiBrand,
        product: aiProduct,
        audience: aiAudience,
        tone: aiTone,
        count: aiCount,
      });
      setAiCampaignIdeas(out);
    } catch (e: any) {
      setAiErr(e?.message || "AI unavailable");
    } finally {
      setAiLoading(null);
    }
  };

  const runContentAI = async () => {
    setAiErr(null);
    setAiLoading("content");
    try {
      const out = await aiSuggestContents({
        campaign: params.utm_campaign || aiProduct || aiBrand,
        formatHints: "banner, video, adset, hook",
        count: Math.max(3, Math.min(12, aiCount)),
      });
      setAiContentIdeas(out);
    } catch (e: any) {
      setAiErr(e?.message || "AI unavailable");
    } finally {
      setAiLoading(null);
    }
  };

  /** Presets & param helpers */
  const applyPreset = (key: PresetKey) => {
    const p = PRESETS.find((x) => x.key === key)!;
    setParams((prev) => ({ ...prev, ...p.defaults }));
    setSelectedPreset(key);
  };
  const setParam = (k: string, v: string) => setParams((prev) => ({ ...prev, [k]: v }));

  const resetAll = () => {
    setBaseUrl("");
    setParams({
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_id: "",
      utm_term: "",
      utm_content: "",
    });
    setCustomRows([]);
    setNorm(DEFAULT_NORMALIZATION);
    setSelectedPreset(null);
  };

  const saveTemplate = () => {
    const name = prompt("Template name?");
    if (!name) return;
    const tpl: Template = { name, params: mergedParams, normalization: norm };
    setTemplates((prev) => {
      const others = prev.filter((t) => t.name !== name);
      return [tpl, ...others].slice(0, 20);
    });
  };

  const loadTemplate = (t: Template) => {
    setParams(t.params);
    setNorm(t.normalization);
  };

  const removeTemplate = (name: string) => {
    setTemplates((prev) => prev.filter((t) => t.name !== name));
  };

  /** Custom rows ops */
  const addCustomRow = () => {
    setCustomRows((prev) => [...prev, { id: crypto.randomUUID(), key: "", value: "" }]);
  };
  const updateCustomRow = (id: string, field: "key" | "value", val: string) => {
    setCustomRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  };
  const removeCustomRow = (id: string) => {
    setCustomRows((prev) => prev.filter((r) => r.id !== id));
  };

  /* ----------------- UI ----------------- */
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* LEFT: Controls */}
      <div className="md:col-span-2 space-y-6">
        {/* Presets */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>
              Channel presets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => {
                const active = selectedPreset === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => applyPreset(p.key)}
                    title={p.hints?.join(" • ")}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                      active
                        ? "border-[#0074ED] bg-[#EAF3FF] text-[#0A1F3D] focus-visible:ring-[#0074ED]"
                        : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-300"
                    )}
                  >
                    <Layers className={cn("h-4 w-4", active ? "text-[#0074ED]" : "text-slate-500")} />
                    {p.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Assist */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>
              <Sparkles className="h-4 w-4 text-[#0074ED]" />
              AI Assist (optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Brand">
                <Input className={CONTROL} value={aiBrand} onChange={(e) => setAiBrand(e.target.value)} placeholder="Connecttly" />
              </Field>
              <Field label="Product / Offer">
                <Input className={CONTROL} value={aiProduct} onChange={(e) => setAiProduct(e.target.value)} placeholder="Analytics bundle" />
              </Field>
              <Field label="Audience">
                <Input className={CONTROL} value={aiAudience} onChange={(e) => setAiAudience(e.target.value)} placeholder="SaaS founders" />
              </Field>
              <Field label="Tone / Style">
                <Input className={CONTROL} value={aiTone} onChange={(e) => setAiTone(e.target.value)} placeholder="Bold, concise" />
              </Field>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <div>
                <Label className="text-slate-700">Ideas</Label>
                <Input
                  className={cn(CONTROL, "w-24 mt-1")}
                  type="number"
                  min={3}
                  max={12}
                  value={aiCount}
                  onChange={(e) => setAiCount(parseInt(e.target.value || "6", 10))}
                />
              </div>

              <Button
                className={cn("gap-2", BTN_PRIMARY)}
                onClick={runCampaignAI}
                disabled={aiLoading === "campaign"}
                title="Suggest UTM campaign slugs"
              >
                {aiLoading === "campaign" ? "Generating…" : "Suggest campaigns"}
              </Button>

              <Button
                variant="outline"
                className={cn("gap-2", BTN_OUTLINE_WHITE)}
                onClick={runContentAI}
                disabled={aiLoading === "content"}
                title="Suggest UTM content variants"
              >
                {aiLoading === "content" ? "Generating…" : "Suggest contents"}
              </Button>
            </div>

            {aiErr && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {aiErr === "AI_401" || aiErr === "AI_403"
                  ? "AI is disabled or the server key is missing."
                  : aiErr}
              </div>
            )}

            {aiCampaignIdeas.length > 0 && (
              <SuggestionBlock
                title="Campaign suggestions"
                items={aiCampaignIdeas}
                onPick={(c) => setParams((prev) => ({ ...prev, utm_campaign: c }))}
              />
            )}

            {aiContentIdeas.length > 0 && (
              <SuggestionBlock
                title="Content suggestions"
                items={aiContentIdeas}
                onPick={(c) => setParams((prev) => ({ ...prev, utm_content: c }))}
              />
            )}
          </CardContent>
        </Card>

        {/* Builder */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>
              Build tracking link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Base URL */}
            <div className="space-y-2">
              <Label className="text-slate-800">Base URL</Label>
              <div className="flex gap-2">
                <Input
                  className={CONTROL}
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://yourdomain.com/landing"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!baseUrl) return;
                    try {
                      const u = new URL(baseUrl);
                      setBaseUrl(u.toString());
                    } catch {}
                  }}
                  className={BTN_OUTLINE_WHITE}
                  title="Normalize URL"
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Start with <span className="font-mono">http://</span> or <span className="font-mono">https://</span>.
                Existing query params are preserved.
              </p>
            </div>

            {/* Standard params */}
            <div className="grid gap-4 sm:grid-cols-2">
              {PARAM_FIELDS.map((f) => (
                <Field key={f.key} label={f.label}>
                  <Input
                    className={CONTROL}
                    value={params[f.key] ?? ""}
                    onChange={(e) => setParam(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                </Field>
              ))}
            </div>

            {/* Custom parameters */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-slate-800">Custom parameters</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCustomRow}
                  className={cn("gap-1.5", BTN_OUTLINE_WHITE)}
                >
                  <Plus className="h-4 w-4" /> Add parameter
                </Button>
              </div>

              {customRows.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-600">
                  Add any extra query params like <code className="font-mono">ref</code>,{" "}
                  <code className="font-mono">channel</code>, etc.
                </div>
              ) : (
                <div className="grid gap-2">
                  {customRows.map((row) => (
                    <div key={row.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                      <Input
                        className={CONTROL}
                        placeholder="param key (e.g. ref)"
                        value={row.key}
                        onChange={(e) => updateCustomRow(row.id, "key", e.target.value)}
                      />
                      <Input
                        className={CONTROL}
                        placeholder="value"
                        value={row.value}
                        onChange={(e) => updateCustomRow(row.id, "value", e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => removeCustomRow(row.id)}
                        title="Remove row"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Normalization */}
            <div className="grid gap-4 sm:grid-cols-3">
              <SwitchCard
                title="Lowercase values"
                subtitle="Consistency across channels"
                checked={norm.lowercaseValues}
                onCheckedChange={(v) => setNorm({ ...norm, lowercaseValues: v })}
              />
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div className="text-sm font-medium text-slate-900">Spaces</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { key: "hyphen", label: "Hyphen -" },
                    { key: "underscore", label: "Underscore _" },
                    { key: "encode", label: "Encode %20" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setNorm({ ...norm, spaceReplacement: opt.key as any })}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                        norm.spaceReplacement === opt.key
                          ? "border-[#0074ED] bg-[#EAF3FF] text-[#0A1F3D] focus-visible:ring-[#0074ED]"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <SwitchCard
                title="Strict encoding"
                subtitle="RFC3986 safe"
                checked={norm.strictEncode}
                onCheckedChange={(v) => setNorm({ ...norm, strictEncode: v })}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                className={cn("gap-2", BTN_PRIMARY)}
                onClick={() => result.url && copy(result.url, "url")}
                disabled={!result.ok}
              >
                <Copy className="h-4 w-4" />
                Copy URL
                {copied === "url" && <Check className="h-4 w-4 text-white/80" />}
              </Button>

              <Button
                variant="outline"
                className={cn("gap-2", BTN_OUTLINE_WHITE)}
                onClick={() => result.query && copy(result.query, "query")}
                disabled={!result.ok}
              >
                <Copy className="h-4 w-4" />
                Copy query
                {copied === "query" && <Check className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                className={cn("gap-2", BTN_OUTLINE_WHITE)}
                onClick={() => {
                  const payload = { baseUrl, params: mergedParams, norm, customRows };
                  copy(JSON.stringify(payload, null, 2), "json");
                }}
              >
                <Copy className="h-4 w-4" />
                Copy JSON
                {copied === "json" && <Check className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                className={cn("gap-2", BTN_OUTLINE_WHITE)}
                onClick={() => copy(makeShareLink(), "share")}
                ref={shareRef}
              >
                <Share2 className="h-4 w-4" />
                Share config
                {copied === "share" && <Check className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                className="gap-2 ml-auto text-red-600 hover:text-red-700"
                onClick={resetAll}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>

              <Button
                variant="outline"
                className={cn("gap-2", BTN_OUTLINE_WHITE)}
                onClick={saveTemplate}
              >
                <Upload className="h-4 w-4" />
                Save as template
              </Button>
            </div>

            {/* Preview */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Link2 className="h-4 w-4" />
                Preview
              </div>
              <div className="mt-2 break-words rounded-lg bg-white p-3 font-mono text-[13px] leading-6 text-slate-800">
                {result.ok ? result.url : <span className="text-red-600">{result.error}</span>}
              </div>
              {!!result.warnings?.length && (
                <div className="mt-2 text-xs text-amber-700">
                  {result.warnings.map((w, i) => (
                    <div key={i}>• {w}</div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bulk builder */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>
              Bulk builder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-700">
              Paste one per line:
              <code className="ml-1 rounded bg-slate-100 px-1 py-0.5 text-[12px]">
                https://domain/path , optional-campaign , optional-content
              </code>
            </p>
            <Textarea
              className={cn("min-h-[160px]", CONTROL.replace("h-10 ", ""))}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder={`https://example.com/landing-a , summer_sale , banner_a
https://example.com/landing-b , summer_sale , banner_b`}
            />
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{bulkList.length} rows</Badge>
              <Button
                variant="outline"
                className={cn("gap-2", BTN_OUTLINE_WHITE)}
                onClick={() => copy(bulkCsv, "csv")}
                disabled={!bulkList.length}
                title="Copy CSV: input,utm_url"
              >
                <Copy className="h-4 w-4" /> Copy CSV
                {copied === "csv" && <Check className="h-4 w-4" />}
              </Button>
            </div>

            {bulkList.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-[640px] w-full text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">#</th>
                      <th className="px-3 py-2 text-left font-medium">Input</th>
                      <th className="px-3 py-2 text-left font-medium">UTM URL</th>
                      <th className="px-3 py-2 text-left font-medium">Copy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkList.map((r, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                        <td className="px-3 py-2 align-top">{r.line}</td>
                        <td className="px-3 py-2 align-top text-[#0A1F3D] break-words">
                          {r.ok ? r.url : <span className="text-red-600">{r.error}</span>}
                        </td>
                        <td className="px-3 py-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className={BTN_OUTLINE_WHITE}
                            onClick={() => r.url && copy(r.url, `row-${i}`)}
                            disabled={!r.ok}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Templates */}
      <div className="md:col-span-1">
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>
              Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {templates.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-700">
                Save your configuration as a template, then reuse in one click.
              </div>
            ) : (
              <div className="space-y-2">
                {templates.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-slate-900">{t.name}</div>
                      <div className="truncate text-xs text-slate-500">
                        {Object.entries(t.params)
                          .filter(([, v]) => v)
                          .map(([k, v]) => `${k}=${v}`)
                          .slice(0, 3)
                          .join(" • ") || "—"}
                      </div>
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className={BTN_OUTLINE_WHITE}
                        onClick={() => loadTemplate(t)}
                      >
                        Load
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => removeTemplate(t.name)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ----------------- Small UI helpers ----------------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-slate-800">{label}</Label>
      {children}
    </div>
  );
}

function SwitchCard({
  title,
  subtitle,
  checked,
  onCheckedChange,
}: {
  title: string;
  subtitle?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
      <div>
        <div className="text-sm font-medium text-slate-900">{title}</div>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-[#0074ED] focus-visible:ring-2 focus-visible:ring-[#0074ED]"
      />
    </label>
  );
}

function SuggestionBlock({
  title,
  items,
  onPick,
}: {
  title: string;
  items: string[];
  onPick: (val: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-slate-800">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((c) => (
          <Badge
            key={c}
            className="cursor-pointer bg-slate-100 text-slate-900 hover:bg-slate-200"
            onClick={() => onPick(c)}
            title="Click to use"
          >
            {c}
          </Badge>
        ))}
      </div>
    </div>
  );
}
