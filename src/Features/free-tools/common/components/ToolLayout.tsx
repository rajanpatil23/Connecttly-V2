import { Link } from "react-router-dom";
import { ReactNode } from "react";
import PageHero from "@/components/_zip/PageHero";

type Crumb = { label: string; href?: string };

export function ToolLayout({
  title,
  description,
  breadcrumb = [{ label: "Free Tools", href: "/resources/tools" }],
  width = "6xl",
  children,
}: {
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  width?: "md" | "lg" | "xl" | "6xl";
  gradient?: boolean;
  children: ReactNode;
}) {
  const max =
    width === "md" ? "max-w-3xl" :
    width === "xl" ? "max-w-7xl" :
    "max-w-6xl";

  return (
    <div className="overflow-x-hidden bg-background min-h-screen">
      {breadcrumb.length > 0 && (
        <div className={`mx-auto ${max} px-5 sm:px-6 lg:px-8 pt-6`}>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumb.map((c, i) => {
                const isLast = i === breadcrumb.length - 1;
                return (
                  <li key={i} className="inline-flex items-center">
                    {c.href && !isLast ? (
                      <Link to={c.href} className="hover:text-foreground transition-colors">{c.label}</Link>
                    ) : (
                      <span className="text-foreground font-medium">{c.label}</span>
                    )}
                    {!isLast && <span className="mx-2 text-muted-foreground/60">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      )}

      <PageHero title={title} description={description} />

      <div className={`mx-auto ${max} px-5 sm:px-6 lg:px-8 pb-16`}>{children}</div>
    </div>
  );
}
