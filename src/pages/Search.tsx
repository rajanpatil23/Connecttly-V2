import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "@/components/_zip/PageHero";
import { ArrowRight } from "lucide-react";

const ROUTES_INDEX = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "About", path: "/about" },
  { title: "Insights", path: "/resources/blog" },
  { title: "Performance Marketing", path: "/services/performance-marketing" },
  { title: "LinkedIn Growth", path: "/services/linkedin-growth" },
  { title: "Content & Creative", path: "/services/content-creative" },
  { title: "Growth & Demand Generation", path: "/services/growth-demand-generation" },
  { title: "Analytics & AI", path: "/services/analytics-ai" },
  { title: "Brand & Reputation", path: "/services/brand-reputation" },
];

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const results = useMemo(() => {
    if (!q) return [];
    const needle = q.toLowerCase();
    return ROUTES_INDEX.filter(r => r.title.toLowerCase().includes(needle) || r.path.toLowerCase().includes(needle));
  }, [q]);

  useEffect(() => {
    document.getElementById("search-results-heading")?.focus();
  }, [q]);

  return (
    <div className="overflow-x-hidden bg-background min-h-screen">
      <PageHero
        eyebrow="Search"
        title={<>Search results for <span className="gradient-text">"{q || "…"}"</span></>}
        description={!q ? "Try searching for a service (e.g. \"LinkedIn Ads\", \"Analytics\")." : undefined}
      />
      <section className="pb-20">
        <div className="container-main max-w-3xl">
          <h1 id="search-results-heading" tabIndex={-1} className="sr-only">Search results for {q}</h1>
          {q && (results.length > 0 ? (
            <ul className="space-y-3" aria-live="polite">
              {results.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 hover:border-primary/40 transition shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
                    <span className="font-medium text-foreground">{r.title}</span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      {r.path} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="font-medium text-foreground">No results for "{q}".</p>
              <p className="mt-2 text-muted-foreground">Try different keywords or explore these popular areas:</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["/services", "/about", "/resources/blog", "/"].map((p) => (
                  <Link key={p} to={p} className="rounded-full border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary">{p}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
