// src/Features/free-tools/url-shortener/ShortenerPage.tsx
import { useMemo, useState } from "react";
import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { copyToClipboard } from "@/Features/free-tools/common/utils/copy";
import useLocalStorage from "@/Features/free-tools/common/hooks/useLocalStorage";
import { createShortLink, getShortInfo, HttpError } from "./api/shortClient";
import { Check, Copy, Link2, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type HistoryItem = {
  code: string;
  shortUrl: string;
  url: string;
  tag?: string | null;
  clicks?: number;
};

const BRAND_NAVY = "#0A1F3D";

function sanitizeCustomCode(raw: string) {
  // mirrors server normalization to give good UX
  let s = raw.toLowerCase().trim();
  s = s.replace(/[^a-z0-9_-]/g, "-");
  s = s.replace(/-+/g, "-").replace(/^[-]+|[-]+$/g, "");
  if (s.length > 60) s = s.slice(0, 60);
  return s;
}

export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [ttlDays, setTtlDays] = useState<number>(0);
  const [tag, setTag] = useState("");
  const [permanent, setPermanent] = useState(true); // UI hint only (server uses 302)

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [hist, setHist] = useLocalStorage<HistoryItem[]>("ft_short_history", []);

  const valid = useMemo(() => /^https?:\/\//i.test(url.trim()), [url]);

  const submit = async () => {
    if (!valid) {
      setMsg("Enter a valid URL starting with http:// or https://");
      return;
    }
    setMsg(null);
    setBusy(true);
    try {
      const res = await createShortLink({
        url: url.trim(),
        customCode: custom.trim() ? sanitizeCustomCode(custom) : undefined,
        ttlDays: ttlDays || undefined,
        tag: tag.trim() || undefined,
      });
      const item: HistoryItem = {
        code: res.code,
        shortUrl: res.shortUrl,
        url: url.trim(),
        tag: tag || null,
      };
      setHist([item, ...hist].slice(0, 50));
      setUrl("");
      setCustom("");
      setTag("");
      setMsg("Short link created successfully.");
    } catch (e: any) {
      let human = "Failed to shorten link.";
      if (e instanceof HttpError) {
        if (e.code === "CODE_EXISTS") human = "That custom code is already taken. Try another.";
        else if (e.code === "CODE_RESERVED") human = "That code word is reserved. Please choose a different one.";
        else if (e.code === "BAD_URL") human = "Destination URL is invalid.";
      }
      setMsg(human);
    } finally {
      setBusy(false);
    }
  };

  const checkInfo = async (code: string) => {
    try {
      const info = await getShortInfo(code);
      setHist((h) => h.map((x) => (x.code === code ? { ...x, clicks: info.link.clicks } : x)));
    } catch {
      /* ignore */
    }
  };

  return (
    <ToolLayout
      title="URL Shortener"
      description="Create clean, branded short links with optional expiry and tags. Copy, share, and track basic clicks."
      breadcrumb={[{ label: "Free Tools", href: "/resources/tools" }, { label: "URL Shortener" }]}
      width="lg"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left: form */}
        <Card className="md:col-span-2 border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>
              Create short link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-slate-800" htmlFor="url-input">Destination URL</Label>
              <Input
                id="url-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourdomain.com/awesome-landing-page?utm_source=..."
                inputMode="url"
                autoComplete="url"
                className="bg-white text-slate-900 placeholder:text-slate-400 border-slate-200"
                aria-describedby="url-help"
              />
              <p id="url-help" className="text-xs text-slate-500">Existing query params (UTMs) are preserved.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-slate-800" htmlFor="custom-input">Custom code (optional)</Label>
                <Input
                  id="custom-input"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="e.g. launch-2025"
                  className="bg-white text-slate-900 placeholder:text-slate-400 border-slate-200"
                  autoComplete="off"
                  spellCheck={false}
                />
                <p className="text-xs text-slate-500">Letters, numbers, - or _ (max 60 chars).</p>
              </div>

              {/* READABLE select */}
              <div className="space-y-2">
                <Label className="text-slate-800" htmlFor="expires-select">Expires in</Label>
                <select
                  id="expires-select"
                  value={ttlDays}
                  onChange={(e) => setTtlDays(parseInt(e.target.value, 10))}
                  className={cn(
                    "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none",
                    "focus:ring-2 focus:ring-[#0074ED]/30",
                    "text-slate-900"
                  )}
                  style={{ color: BRAND_NAVY }}
                >
                  <option value={0}>Never</option>
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={365}>365 days</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-800" htmlFor="tag-input">Tag (optional)</Label>
                <Input
                  id="tag-input"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. summer-campaign"
                  className="bg-white text-slate-900 placeholder:text-slate-400 border-slate-200"
                  autoComplete="off"
                />
              </div>
            </div>

            <label
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
              htmlFor="perm-switch"
            >
              <div>
                <div className="text-sm font-medium text-slate-900">Use permanent redirect (301)</div>
                <p className="text-xs text-slate-500">SEO-friendly for stable links</p>
              </div>
              <Switch
                id="perm-switch"
                checked={permanent}
                onCheckedChange={setPermanent}
                className="data-[state=checked]:bg-[#0074ED] focus-visible:ring-2 focus-visible:ring-[#0074ED]"
                aria-label="Use permanent redirect (301)"
              />
            </label>

            {msg && (
              <div
                className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
                role="status"
                aria-live="polite"
              >
                {msg}
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <Button
                className="gap-2 bg-[#0074ED] hover:bg-[#0065d1]"
                onClick={submit}
                disabled={busy || !valid}
                title="Create short link"
              >
                {busy ? <Sparkles className="h-4 w-4 animate-pulse" /> : <Link2 className="h-4 w-4" />}
                {busy ? "Working…" : "Shorten URL"}
              </Button>
              <Badge variant="secondary" className="gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> No tracking pixels
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Right: history */}
        <Card className="md:col-span-1 border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: BRAND_NAVY }}>
              Recent links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {hist.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-600">
                Your last 50 created links will appear here.
              </div>
            ) : (
              <div className="space-y-2">
                {hist.map((h, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-2">
                      <a
                        className="font-medium text-[#0A1F3D] truncate"
                        href={h.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={h.shortUrl}
                      >
                        {h.shortUrl}
                      </a>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() => copyToClipboard(h.shortUrl)}
                          title="Copy short URL"
                        >
                          <Copy className="h-4 w-4" /> Copy
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => checkInfo(h.code)}>
                          Check
                        </Button>
                      </div>
                    </div>
                    <div className="mt-1 truncate text-xs text-slate-500">{h.url}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      {h.tag && <Badge variant="secondary">{h.tag}</Badge>}
                      {typeof h.clicks === "number" && (
                        <span className="text-slate-600">{h.clicks} clicks</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
