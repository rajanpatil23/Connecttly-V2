import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

// Minimal index to demonstrate. Replace/extend with your real data source.
const ROUTES_INDEX = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "About", path: "/about" },
  { title: "Insights", path: "/resources/blog" },

  // Example service endpoints — add your real ones:
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
    return ROUTES_INDEX.filter(
      (r) => r.title.toLowerCase().includes(needle) || r.path.toLowerCase().includes(needle)
    );
  }, [q]);

  useEffect(() => {
    // Move focus to heading for a11y
    const h = document.getElementById("search-results-heading");
    h?.focus();
  }, [q]);

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <h1
          id="search-results-heading"
          tabIndex={-1}
          className="text-2xl md:text-3xl font-bold tracking-tight outline-none"
        >
          Search results for “{q || "…"}”
        </h1>

        {!q && (
          <p className="mt-3 text-muted-foreground">
            Try searching for a service (e.g. “LinkedIn Ads”, “Analytics”).
          </p>
        )}

        {q && (
          <>
            {results.length > 0 ? (
              <ul className="mt-6 space-y-3" aria-live="polite">
                {results.map((r) => (
                  <li key={r.path}>
                    <Link
                      to={r.path}
                      className="group flex items-center justify-between rounded-xl border bg-card/50 px-4 py-3 backdrop-blur hover:bg-card transition"
                    >
                      <span className="font-medium">{r.title}</span>
                      <span className="text-xs text-muted-foreground group-hover:underline">
                        {r.path}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-xl border bg-card/50 p-6 backdrop-blur">
                <p className="font-medium">No results for “{q}”.</p>
                <p className="mt-2 text-muted-foreground">
                  Try different keywords or explore these popular areas:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["/services", "/about", "/resources/blog", "/"].map((p) => (
                    <Link
                      key={p}
                      to={p}
                      className="rounded-full border px-3 py-1 text-sm hover:bg-accent"
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
