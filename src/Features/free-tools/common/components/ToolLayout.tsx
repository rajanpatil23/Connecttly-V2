// src/Features/free-tools/common/components/ToolLayout.tsx
import { Link } from "react-router-dom";
import { ReactNode } from "react";

type Crumb = { label: string; href?: string };

export function ToolLayout({
  title,
  description,
  breadcrumb = [{ label: "Free Tools", href: "/resources/tools" }],
  width = "6xl",
  gradient = false,
  children,
}: {
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  /** page max-width */
  width?: "md" | "lg" | "xl" | "6xl";
  gradient?: boolean;
  children: ReactNode;
}) {
  const max =
    width === "md" ? "max-w-3xl" : 
    width === "xl" ? "max-w-7xl" : 
    width === "6xl" ? "max-w-6xl" :
    "max-w-6xl";

  return (
    <section className="min-h-screen bg-background">
      {/* Hero Section with Grid Background */}
      <div className="relative isolate bg-white rounded-b-[40px]">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(100, 116, 139, 0.15) 1px, transparent 1px),linear-gradient(to bottom, rgba(100, 116, 139, 0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className={`relative mx-auto ${max} px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-8 sm:pb-10`}>
          {/* Breadcrumbs - top left, only show if not empty */}
          {breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600 mb-8">
              <ol className="flex flex-wrap items-center gap-1.5">
                {breadcrumb.map((c, i) => {
                  const isLast = i === breadcrumb.length - 1;
                  return (
                    <li key={i} className="inline-flex items-center">
                      {c.href && !isLast ? (
                        <Link
                          to={c.href}
                          className="hover:text-slate-900 transition-colors"
                        >
                          {c.label}
                        </Link>
                      ) : (
                        <span className="text-slate-700 font-medium">{c.label}</span>
                      )}
                      {!isLast && <span className="mx-2 text-slate-400">/</span>}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {/* Title & description - centered */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-[30px] leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-[44px] md:text-[60px]">
              {title}
            </h1>
            {description && (
              <p className="mx-auto mt-4 max-w-[56ch] text-[15px] leading-6 text-slate-600 sm:text-lg sm:leading-7 md:text-xl">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className={`mx-auto ${max} px-4 sm:px-6 lg:px-8 py-12 sm:py-16`}>{children}</div>
    </section>
  );
}
