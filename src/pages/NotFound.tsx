import { useEffect, useMemo, useState, FormEvent } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Home, Target, FileText, Users, ArrowRight } from "lucide-react";
import PageHero from "@/components/_zip/PageHero";

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

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const suggestions = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return ROUTES_INDEX.filter(r => r.title.toLowerCase().includes(needle) || r.path.toLowerCase().includes(needle)).slice(0, 5);
  }, [q]);

  const links = [
    { to: "/", icon: Home, title: "Home", desc: "Start from the beginning" },
    { to: "/services", icon: Target, title: "Services", desc: "Explore what we offer" },
    { to: "/about", icon: Users, title: "About", desc: "Learn about Connecttly" },
    { to: "/resources/blog", icon: FileText, title: "Insights", desc: "Read articles & resources" },
  ];

  return (
    <div className="overflow-x-hidden bg-background min-h-screen">
      <PageHero
        eyebrow="404 — Page not found"
        title={<>Oops — we can't find <span className="gradient-text">that page</span></>}
        description="The link may be broken or the page may have moved. Try a quick search, or jump to one of the helpful links below."
      >
        <form onSubmit={onSearch} className="flex items-center gap-2 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search pages, services, or articles…"
              className="w-full rounded-full border border-border bg-background px-10 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-background shadow-lg text-left">
                {suggestions.map(s => (
                  <li key={s.path}>
                    <Link to={s.path} className="flex items-center justify-between px-3 py-2 hover:bg-secondary">
                      <span className="font-medium text-foreground">{s.title}</span>
                      <span className="text-xs text-muted-foreground">{s.path}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" disabled={!q.trim()} className="rounded-full px-6">Search</Button>
        </form>
      </PageHero>

      <section className="pb-20">
        <div className="container-main max-w-3xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {links.map(({ to, icon: Icon, title, desc }) => (
              <Link key={to} to={to} className="group flex items-center gap-3 rounded-2xl border border-border bg-background p-4 hover:border-primary/40 transition shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{title}</div>
                  <div className="text-sm text-muted-foreground">{desc}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full"><Link to="/">Go to Home</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link to="/resources/support">Contact support</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
