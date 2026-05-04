import { useEffect, useMemo, useState, FormEvent } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Home, Target, FileText, Users, ArrowRight } from "lucide-react";

/** Lightweight site index for inline suggestions */
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

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    // Provide both q and query params for compatibility
    const enc = encodeURIComponent(query);
    navigate(`/search?q=${enc}&query=${enc}`);
  };

  const suggestions = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return ROUTES_INDEX.filter(
      (r) =>
        r.title.toLowerCase().includes(needle) ||
        r.path.toLowerCase().includes(needle)
    ).slice(0, 5);
  }, [q]);

  return (
    <section className="relative isolate min-h-screen overflow-hidden text-white">
      {/* Brand backdrop */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, #13314f 0%, #0A1F3D 60%, #061426 100%)",
        }}
      />
      {/* Soft grid + glows */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.08] [mask-image:radial-gradient(130%_110%_at_50%_-10%,#000_60%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.22) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,.22) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      <span className="pointer-events-none absolute left-[10%] top-[14%] h-64 w-64 rounded-full bg-[#0074ED]/25 blur-3xl" />
      <span className="pointer-events-none absolute right-[8%] bottom-[10%] h-72 w-72 rounded-full bg-[#A6FF5F]/20 blur-3xl" />

      {/* Content */}
      <div className="container relative mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm backdrop-blur">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0074ED]/25 text-[#A6FF5F]">!</span>
            <span>Page not found</span>
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Oops — we can’t find that page
          </h1>

          <p className="mt-4 text-white/85">
            The link may be broken or the page may have moved. Try a quick search,
            or jump to one of the helpful links below.
          </p>

          {/* Search */}
          <form onSubmit={onSearch} className="mt-8 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search pages, services, or articles…"
                aria-label="Search site"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-10 py-3 text-white placeholder-white/60 outline-none backdrop-blur transition focus:border-white/25 focus:bg-white/15"
              />
              {/* Inline suggestions (only when typing) */}
              {suggestions.length > 0 && (
                <ul
                  role="listbox"
                  className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0B1F3E]/90 backdrop-blur shadow-lg"
                >
                  {suggestions.map((s) => (
                    <li key={s.path} role="option">
                      <Link
                        to={s.path}
                        className="flex items-center justify-between px-3 py-2 text-left hover:bg-white/10"
                      >
                        <span className="font-medium">{s.title}</span>
                        <span className="text-xs text-white/70">{s.path}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-white/10">
                    <button
                      type="submit"
                      className="w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                    >
                      Search “{q.trim()}”
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <Button
              type="submit"
              disabled={!q.trim()}
              className="rounded-xl bg-[#A6FF5F] text-[#0A1F3D] hover:bg-[#95ee4f] disabled:opacity-60"
            >
              Search
            </Button>
          </form>

          {/* Helpful links */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur transition hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A6FF5F]/20">
                <Home className="h-5 w-5 text-[#A6FF5F]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Home</div>
                <div className="text-sm text-white/75">Start from the beginning</div>
              </div>
              <ArrowRight className="h-5 w-5 opacity-70 transition group-hover:translate-x-0.5" />
            </Link>

            <Link
              to="/services"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0074ED]/20">
                <Target className="h-5 w-5 text-[#79d9ff]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Services</div>
                <div className="text-sm text-white/75">Explore what we offer</div>
              </div>
              <ArrowRight className="h-5 w-5 opacity-70 transition group-hover:translate-x-0.5" />
            </Link>

            <Link
              to="/about"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">About</div>
                <div className="text-sm text-white/75">Learn about Connecttly</div>
              </div>
              <ArrowRight className="h-5 w-5 opacity-70 transition group-hover:translate-x-0.5" />
            </Link>

            <Link
              to="/resources/blog"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Insights</div>
                <div className="text-sm text-white/75">Read articles & resources</div>
              </div>
              <ArrowRight className="h-5 w-5 opacity-70 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-[#A6FF5F] text-[#0A1F3D] hover:bg-[#95ee4f]">
              <Link to="/">Go to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              <Link to="/resources/support">Contact support</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
