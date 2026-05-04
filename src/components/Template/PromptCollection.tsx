import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Star,
  Share2,
  Copy,
  X,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Check,
  FileX,
} from "lucide-react";
import promptsData from "./data/prompts.json";

// ---------- Types ----------
export type Prompt = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags?: string[];
  views?: number;
  likes?: number;
  createdAt?: string;
  examples?: Record<string, string>;
};

// ---------- Props ----------
export type PromptCollectionProps = {
  prompts?: Prompt[];
  pageSize?: number; // default 9
  enableSidebar?: boolean; // default true
};

const FAVORITES_KEY = "prompt-favorites-v1";

// Unified base styles
const HOVER = "hover:bg-gray-100 hover:text-black";
const BASE_BTN =
  "bg-gray-50 text-black border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0";
const MENU_ITEM =
  "text-black focus:bg-gray-100 focus:text-black data-[highlighted]:bg-gray-100 data-[highlighted]:text-black data-[state=checked]:bg-gray-100 data-[state=checked]:text-black";
const TRANSITION_BTN = "transition-colors duration-200 ease-out";

// ---------- Helpers ----------
const clampLines = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

function safeLocalStorageGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

function normalize(text: string) {
  return text.toLowerCase();
}

function getShareUrl(id: string) {
  if (typeof window === "undefined") return `?prompt=${id}`;
  const url = new URL(window.location.href);
  url.searchParams.set("prompt", id);
  return url.toString();
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function PromptCollection({
  prompts: incoming,
  pageSize = 9,
  enableSidebar = true,
}: PromptCollectionProps) {
  // Use props → JSON → empty
  const prompts: Prompt[] =
    (incoming && incoming.length ? incoming : null) ??
    (Array.isArray(promptsData) ? (promptsData as Prompt[]) : []) ??
    [];

  // Derived facets
  const categories = useMemo(
    () => Array.from(new Set(prompts.map((p) => p.category))).sort(),
    [prompts]
  );
  const allTags = useMemo(
    () => Array.from(new Set(prompts.flatMap((p) => p.tags || []))).sort(),
    [prompts]
  );

  // UI state
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<
    "latest" | "most_viewed" | "a_z" | "favorites"
  >("latest");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Prompt | null>(null);
  const [favorites, setFavorites] = useState<Record<string, true>>({});
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [tab, setTab] = useState<"prompt" | "preview" | "related">("prompt");
  const [varValues, setVarValues] = useState<Record<string, string>>({});
  const [filled, setFilled] = useState("");
  const [copiedPreview, setCopiedPreview] = useState(false);
  const [bottomCopied, setBottomCopied] = useState(false);

  // Mobile filter sheet
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Load favorites
  useEffect(() => {
    const raw = safeLocalStorageGet(FAVORITES_KEY);
    if (raw) {
      try {
        setFavorites(JSON.parse(raw));
      } catch {}
    }
  }, []);
  useEffect(() => {
    safeLocalStorageSet(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Open from URL share ?prompt=
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = new URLSearchParams(window.location.search).get("prompt");
    const found = id ? prompts.find((p) => p.id === id) : null;
    if (found) {
      setSelected(found);
      setOpen(true);
      setTab("prompt");
    }
  }, [prompts]);

  // Filtering
  const filtered = useMemo(() => {
    const q = normalize(query);
    const bySearch = prompts.filter((p) => {
      if (!q) return true;
      return (
        normalize(p.title).includes(q) || normalize(p.description).includes(q)
      );
    });

    const byCats = selectedCategory
      ? bySearch.filter((p) => p.category === selectedCategory)
      : bySearch;

    const byTags = selectedTags.length
      ? byCats.filter((p) =>
          (p.tags || []).some((t) => selectedTags.includes(t))
        )
      : byCats;

    const byFav = favoritesOnly
      ? byTags.filter((p) => !!favorites[p.id])
      : byTags;

    const sorted = [...byFav].sort((a, b) => {
      switch (sort) {
        case "a_z":
          return a.title.localeCompare(b.title);
        case "most_viewed":
          return (b.views || 0) - (a.views || 0);
        case "favorites":
          return Number(!!favorites[b.id]) - Number(!!favorites[a.id]);
        default: {
          const ad = a.createdAt ? Date.parse(a.createdAt) : 0;
          const bd = b.createdAt ? Date.parse(b.createdAt) : 0;
          return bd - ad;
        }
      }
    });

    return sorted;
  }, [prompts, query, selectedCategory, selectedTags, sort, favoritesOnly, favorites]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filtered.length, totalPages, page]);
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Actions
  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  async function sharePrompt(id: string) {
    const url = getShareUrl(id);
    const title = "Prompt";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {}
  }

  function onOpenPrompt(p: Prompt) {
    setSelected(p);
    setOpen(true);
    setTab("prompt");
  }

  // Related prompts for modal
  const related = useMemo(() => {
    if (!selected) return [] as Prompt[];
    const tagset = new Set(selected.tags || []);
    return prompts
      .filter((p) => p.id !== selected.id)
      .map((p) => ({
        p,
        score:
          (p.category === selected.category ? 2 : 0) +
          (p.tags || []).reduce((acc, t) => acc + (tagset.has(t) ? 1 : 0), 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((x) => x.p);
  }, [selected, prompts]);

  // Preview helpers
  const placeholders = useMemo(() => {
    if (!selected?.content) return [] as string[];
    const hits = Array.from(selected.content.matchAll(/\{([^}]+)\}/g)).map((m) => m[1]);
    return Array.from(new Set(hits));
  }, [selected]);

  useEffect(() => {
    setVarValues({});
    setFilled("");
    setCopiedPreview(false);
  }, [selected]);

  function generateFilled() {
    if (!selected) return;
    let txt = selected.content;
    placeholders.forEach((k) => {
      const fromPrompt = selected?.examples?.[k];
      const v = varValues[k] ?? fromPrompt ?? `[${k}]`;
      txt = txt.replace(new RegExp(`\\{${escapeRegExp(k)}\\}`, "g"), v);
    });
    setFilled(txt);
  }

  function fillExamples() {
    const init: Record<string, string> = {};
    placeholders.forEach((k) => {
      const fromPrompt = selected?.examples?.[k];
      init[k] = fromPrompt ?? `[${k}]`;
    });
    setVarValues((prev) => ({ ...init, ...prev }));
  }

  function resetPreview() {
    setVarValues({});
    setFilled("");
    setCopiedPreview(false);
  }

  // Desktop controls
  const DesktopControls = (
    <div className="hidden sm:flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full gap-2 flex-wrap">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            className="pl-9 bg-white text-black placeholder:text-gray-500 border border-gray-300"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Categories */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className={`gap-2 ${BASE_BTN} ${HOVER}`}>
              <Filter className="h-4 w-4" />
              {selectedCategory || "Categories"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white text-black border border-gray-200">
            <DropdownMenuLabel>Select category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={!selectedCategory}
              onCheckedChange={() => setSelectedCategory("")}
              className={`${MENU_ITEM} [&_svg]:text-slate-900`}
            >
              All Categories
            </DropdownMenuCheckboxItem>
            {categories.map((c) => (
              <DropdownMenuCheckboxItem
                key={c}
                checked={selectedCategory === c}
                onCheckedChange={() => setSelectedCategory(selectedCategory === c ? "" : c)}
                className={`${MENU_ITEM} [&_svg]:text-slate-900`}
              >
                {c}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tags */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className={`gap-2 ${BASE_BTN} ${HOVER}`}>
              <SlidersHorizontal className="h-4 w-4" />
              Tags
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white text-black border border-gray-200">
            <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-64 pr-2">
              {allTags.map((t) => (
                <DropdownMenuCheckboxItem
                  key={t}
                  checked={selectedTags.includes(t)}
                  onCheckedChange={(v) =>
                    setSelectedTags((prev) =>
                      v ? [...prev, t] : prev.filter((x) => x !== t)
                    )
                  }
                  className={`${MENU_ITEM} [&_svg]:text-slate-900`}
                >
                  {t}
                </DropdownMenuCheckboxItem>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() => setFavoritesOnly((v) => !v)}
          className={`gap-2 group ${BASE_BTN} ${HOVER}`}
        >
          <Star
            className={`h-4 w-4 transition-colors ${
              favoritesOnly ? "text-slate-900" : "text-gray-700"
            } group-hover:text-slate-900`}
            fill={favoritesOnly ? "rgb(15 23 42)" : "none"}
            stroke="currentColor"
          />
          Favorites
        </Button>

        {/* Sort and Reset moved to left side */}
        <Select value={sort} onValueChange={(v) => setSort(v as any)}>
          <SelectTrigger className={`w-[180px] ${BASE_BTN} ${HOVER}`}>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border border-gray-200">
            <SelectItem value="latest" className={MENU_ITEM}>Latest</SelectItem>
            <SelectItem value="most_viewed" className={MENU_ITEM}>Most Viewed</SelectItem>
            <SelectItem value="a_z" className={MENU_ITEM}>A → Z</SelectItem>
            <SelectItem value="favorites" className={MENU_ITEM}>Favorites First</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          onClick={() => {
            setSelectedCategory("");
            setSelectedTags([]);
            setFavoritesOnly(false);
          }}
          className={`${BASE_BTN} ${HOVER}`}
        >
          Reset
        </Button>
      </div>

      {/* Pagination moved to top right - desktop only */}
      <div className="hidden sm:flex items-center gap-2 ml-auto">
        {totalPages > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`${BASE_BTN} ${HOVER}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`${BASE_BTN} ${HOVER}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );

  // Mobile compact controls
  const MobileControls = (
    <div className="sm:hidden flex flex-col gap-2">
      <div className="flex w-full gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            className="pl-9 bg-white text-black placeholder:text-gray-500 border border-gray-300"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <Button
          variant="outline"
          className={`${BASE_BTN} ${HOVER}`}
          onClick={() => setMobileFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full container mx-auto">
      {/* Top Controls */}
      {DesktopControls}
      {MobileControls}

      {/* Optional sidebar layout */}
      <div className={`mt-4 grid gap-4 ${enableSidebar ? "lg:grid-cols-[220px_1fr]" : "grid-cols-1"}`}>
        {enableSidebar && (
          <aside className="hidden lg:block">
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">Categories</div>
              <div className="flex flex-col gap-2">
                <Button
                  variant={!selectedCategory ? "secondary" : "ghost"}
                  className={`justify-between text-black ${!selectedCategory ? "bg-gray-50" : ""} ${HOVER} focus-visible:ring-0 focus-visible:ring-offset-0`}
                  onClick={() => setSelectedCategory("")}
                >
                  <span>All Categories</span>
                </Button>
                {categories.map((c) => {
                  const active = selectedCategory === c;
                  return (
                    <Button
                      key={c}
                      variant={active ? "secondary" : "ghost"}
                      className={`justify-between text-black ${active ? "bg-gray-50" : ""} ${HOVER} focus-visible:ring-0 focus-visible:ring-offset-0`}
                      onClick={() => setSelectedCategory(active ? "" : c)}
                    >
                      <span>{c}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Cards */}
        <section className="relative">
          {slice.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slice.map((p) => (
                <div key={p.id} className="relative">
                  <Card className="h-full bg-white text-black border border-gray-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">{p.title}</CardTitle>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Favorite"
                          onClick={() => toggleFavorite(p.id)}
                          className="group hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                          title={favorites[p.id] ? "Unfavorite" : "Favorite"}
                        >
                          <Star
                            className={`h-5 w-5 transition-colors ${favorites[p.id] ? "text-slate-900" : "text-gray-700"} group-hover:text-slate-900`}
                            fill={favorites[p.id] ? "rgb(15 23 42)" : "none"}
                            stroke="currentColor"
                          />
                        </Button>
                      </div>
                      <CardDescription>
                        <div style={clampLines}>{p.description}</div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0" />
                    <CardFooter className="mt-auto">
                      <div className="flex w-full items-center gap-2">
                        <Button className={`w-full ${BASE_BTN} ${HOVER}`} variant="outline" onClick={() => onOpenPrompt(p)}>
                          <Eye className="mr-2 h-4 w-4" /> View Prompt
                        </Button>
                        <Button variant="outline" size="icon" className={`${BASE_BTN} ${HOVER}`} onClick={() => sharePrompt(p.id)} aria-label="Share">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="mb-4 p-4 rounded-full bg-gray-100">
                <FileX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No prompts found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                {query || selectedCategory || selectedTags.length || favoritesOnly
                  ? "No prompts match your current filters. Try adjusting your search or filters to find what you're looking for."
                  : "No prompts are available at the moment."}
              </p>
              {(query || selectedCategory || selectedTags.length || favoritesOnly) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("");
                    setSelectedTags([]);
                    setFavoritesOnly(false);
                    setPage(1);
                  }}
                  className={`${BASE_BTN} ${HOVER}`}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}

          {/* Mobile Pagination - bottom placement */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2 sm:hidden">
              <Button
                variant="outline"
                size="icon"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`${BASE_BTN} ${HOVER}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`${BASE_BTN} ${HOVER}`}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Modal (centered, scrollable) */}
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
          <DialogPrimitive.Content
            className={cn(
              "fixed left-1/2 top-1/2 z-50 grid w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 gap-4",
              "border bg-white text-black p-6 shadow-lg sm:rounded-lg border-gray-200",
              "max-h-[90vh] overflow-y-auto overscroll-contain"
            )}
          >
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-xl text-black">{selected?.title}</DialogTitle>
                  <DialogDescription className="mt-1 text-black">
                    {selected?.description}
                  </DialogDescription>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded bg-gray-100 px-2 py-1">{selected?.category}</span>
                    {selected?.tags?.map((tag) => (
                      <span key={tag} className="rounded bg-gray-100 px-2 py-1">#{tag}</span>
                    ))}
                    {selected?.views && <span>👁 {selected.views.toLocaleString()}</span>}
                    {selected?.likes && <span>❤️ {selected.likes.toLocaleString()}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={
                      (bottomCopied
                        ? "bg-green-500 text-white border-green-500 hover:bg-green-500 shadow-sm "
                        : `${BASE_BTN} ${HOVER} `) + TRANSITION_BTN
                    }
                    onClick={async () => {
                      if (!selected) return;
                      await copyToClipboard(selected.content);
                      setBottomCopied(true);
                      setTimeout(() => setBottomCopied(false), 2000);
                    }}
                    aria-label={bottomCopied ? "Copied" : "Copy"}
                  >
                    <Check className={bottomCopied ? "h-4 w-4" : "hidden"} />
                    {!bottomCopied && <Copy className="h-4 w-4" />}
                  </Button>
                  {selected && (
                    <Button variant="outline" size="icon" className={`${BASE_BTN} ${HOVER}`} onClick={() => sharePrompt(selected.id)} aria-label="Share">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="icon" className={`${BASE_BTN} ${HOVER}`} onClick={() => setOpen(false)} aria-label="Close">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white text-black border rounded-md p-1">
                <TabsTrigger value="prompt" className="text-black data-[state=active]:bg-[#0066eb] data-[state=active]:text-white">Prompt</TabsTrigger>
                <TabsTrigger value="preview" className="text-black data-[state=active]:bg-[#0066eb] data-[state=active]:text-white">Preview</TabsTrigger>
                <TabsTrigger value="related" className="text-black data-[state=active]:bg-[#0066eb] data-[state=active]:text-white">Related</TabsTrigger>
              </TabsList>

              <TabsContent value="prompt" className="mt-4">
                <ScrollArea className="max-h-[60vh] rounded border p-4 text-sm">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{selected?.content}</pre>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="preview" className="mt-4 text-sm">
                <div className="space-y-3">
                  {placeholders.length > 0 ? (
                    <>
                      <div className="text-sm text-black">
                        Detected variables from your prompt. Provide values and generate a filled version for quick testing.
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {placeholders.map((k) => (
                          <div key={k} className="space-y-1">
                            <label className="text-xs font-medium text-gray-700">{k}</label>
                            <Input
                              value={varValues[k] ?? ""}
                              onChange={(e) => setVarValues((prev) => ({ ...prev, [k]: e.target.value }))}
                              placeholder={selected?.examples?.[k] ? `e.g. ${selected.examples[k]}` : "Enter a value"}
                              className="bg-white text-black border border-gray-300"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <Button onClick={fillExamples} variant="outline" className={`${BASE_BTN} ${HOVER}`}>Use examples</Button>
                        <Button onClick={generateFilled} className="gap-2">Preview with values</Button>
                        <Button onClick={resetPreview} variant="outline" className={`${BASE_BTN} ${HOVER}`}>Reset</Button>
                        <Button
                          variant="outline"
                          disabled={!filled}
                          onClick={async () => {
                            if (!filled) return;
                            await copyToClipboard(filled);
                            setCopiedPreview(true);
                            setTimeout(() => setCopiedPreview(false), 2000);
                          }}
                          className={`gap-2 ${BASE_BTN} ${HOVER}`}
                        >
                          <Copy className="h-4 w-4" /> {copiedPreview ? "Copied" : "Copy filled"}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-black">No variables detected in this prompt. You can still preview the raw content below.</div>
                  )}

                  <div className="rounded border p-4 leading-relaxed bg-white text-black">
                    <div className="text-xs font-medium text-gray-600 mb-2">Filled Preview</div>
                    <ScrollArea className="max-h-[40vh]">
                      <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{filled || selected?.content || ""}</pre>
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="related" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {related.map((p) => (
                    <Card key={p.id} className="bg-white text-black border border-gray-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{p.title}</CardTitle>
                        <CardDescription>{p.category}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button size="sm" className={`w-full ${BASE_BTN} ${HOVER}`} variant="outline" onClick={() => { onOpenPrompt(p); setTab("prompt"); }}>View</Button>
                      </CardFooter>
                    </Card>
                  ))}
                  {!related.length && (
                    <div className="text-sm text-muted-foreground">No related prompts yet.</div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>

      {/* MOBILE FILTERS SHEET (with dropdowns & raised z-index select) */}
      <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/60" />
          <DialogPrimitive.Content
            className={cn(
              "fixed inset-x-0 bottom-0 z-[61] w-full rounded-t-2xl border border-gray-200 bg-white p-4 shadow-lg",
              "sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:right-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:rounded-lg",
              "max-h-[85vh] overflow-y-auto"
            )}
          >
            <div className="flex items-start justify-between">
              <DialogTitle className="text-base font-semibold text-black">Filters</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-3 space-y-6 text-black">
              {/* Sort (bumped z-index so it opens over sheet) */}
              <div>
                <div className="text-sm font-medium mb-2">Sort</div>
                <Select value={sort} onValueChange={(v) => setSort(v as any)}>
                  <SelectTrigger className="w-full bg-white text-black border border-gray-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="z-[70] bg-white text-black border border-gray-200">
                    <SelectItem value="latest" className={MENU_ITEM}>Latest</SelectItem>
                    <SelectItem value="most_viewed" className={MENU_ITEM}>Most Viewed</SelectItem>
                    <SelectItem value="a_z" className={MENU_ITEM}>A → Z</SelectItem>
                    <SelectItem value="favorites" className={MENU_ITEM}>Favorites First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Favorites */}
              <div>
                <div className="text-sm font-medium mb-2">Favorites</div>
                <Button
                  variant="outline"
                  onClick={() => setFavoritesOnly((v) => !v)}
                  className={`w-full justify-start gap-2 ${BASE_BTN} ${HOVER}`}
                >
                  <Star
                    className={`h-4 w-4 ${favoritesOnly ? "text-slate-900" : "text-gray-700"}`}
                    fill={favoritesOnly ? "rgb(15 23 42)" : "none"}
                    stroke="currentColor"
                  />
                  {favoritesOnly ? "Show favorites only" : "Include all"}
                </Button>
              </div>

              {/* Categories DROPDOWN (multi) */}
              <div>
                <div className="text-sm font-medium mb-2">Categories</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-between ${BASE_BTN} ${HOVER}`}
                    >
                      <span className="truncate">
                        {selectedCategory || "All categories"}
                      </span>
                      <Filter className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-[70] w-64 bg-white text-black border border-gray-200">
                    <DropdownMenuLabel>Select category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ScrollArea className="h-64 pr-2">
                      <DropdownMenuCheckboxItem
                        checked={!selectedCategory}
                        onCheckedChange={() => setSelectedCategory("")}
                        className={`${MENU_ITEM} [&_svg]:text-slate-900`}
                      >
                        All Categories
                      </DropdownMenuCheckboxItem>
                      {categories.map((c) => (
                        <DropdownMenuCheckboxItem
                          key={c}
                          checked={selectedCategory === c}
                          onCheckedChange={() => setSelectedCategory(selectedCategory === c ? "" : c)}
                          className={`${MENU_ITEM} [&_svg]:text-slate-900`}
                        >
                          {c}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Tags DROPDOWN (multi) */}
              <div>
                <div className="text-sm font-medium mb-2">Tags</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-between ${BASE_BTN} ${HOVER}`}
                    >
                      <span className="truncate">
                        {selectedTags.length
                          ? `${selectedTags.length} selected`
                          : "All tags"}
                      </span>
                      <SlidersHorizontal className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-[70] w-72 bg-white text-black border border-gray-200">
                    <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ScrollArea className="h-64 pr-2">
                      {allTags.map((t) => (
                        <DropdownMenuCheckboxItem
                          key={t}
                          checked={selectedTags.includes(t)}
                          onCheckedChange={(v) =>
                            setSelectedTags((prev) =>
                              v ? [...prev, t] : prev.filter((x) => x !== t)
                            )
                          }
                          className={`${MENU_ITEM} [&_svg]:text-slate-900`}
                        >
                          {t}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedTags([]);
                  setFavoritesOnly(false);
                }}
                className="text-black"
              >
                Reset
              </Button>
              <Button onClick={() => setMobileFiltersOpen(false)}>Apply</Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>
    </div>
  );
}

/*
Usage:

import PromptCollection from "@/components/Template/PromptCollection";

export default function Page() {
  return (
    <div className="container py-10">
      <PromptCollection /> // or pass prompts={[...]} and pageSize
    </div>
  );
}
*/