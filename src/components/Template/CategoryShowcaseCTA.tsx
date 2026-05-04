// src/components/Template/CategoryShowcase.tsx
import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
  categories?: string[];
  onPick?: (category: string) => void; // ignored; showcase-only
  id?: string;
  pattern?: number[]; // desktop rows pattern
  showCta?: boolean;
  tagline?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaNewTab?: boolean;
};

// Maintain list here (no JSON import)
const DEFAULT_CATEGORIES = [
  "Linekedin Growth", 
  "E-Commerce", 
  "SEO", 
  "YouTube", 
  "Sales Outreach", 
  "Generative",
  "Unsure",
  "Productivity",
  "Copywriting",
  "SEO",
  "Marketing",
];

function titleCase(s: string) {
  return s
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function chunkByPattern<T>(list: T[], pattern: number[]): T[][] {
  if (!pattern.length) return [list];
  const rows: T[][] = [];
  let i = 0, p = 0;
  while (i < list.length) {
    const take = pattern[p % pattern.length];
    rows.push(list.slice(i, i + take));
    i += take; p += 1;
  }
  return rows;
}

export default function CategoryShowcase({
  categories,
  id = "all-categories",
  pattern = [4, 4, 3],
  showCta = true,
  tagline = "We have tools buid for you that you need to Go Digital",
  ctaText = "Explore our Free Tools to enhance your productivity",
  ctaHref = "/resources/tools",
  ctaNewTab = false,
}: Props) {
  const cats = React.useMemo(() => {
    const base = categories?.length ? categories : DEFAULT_CATEGORIES;
    return base.map((c) => titleCase(String(c)));
  }, [categories]);

  const rows = React.useMemo(() => chunkByPattern(cats, pattern), [cats, pattern]);

  return (
    <section id={id} className="bg-white">
      {/* Local keyframes/utilities for seamless marquee */}
      <style>{`
        .kc-marquee {
          overflow: hidden;
          --gap: 0.75rem;
          mask-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0));
          -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0));
        }
        .kc-track {
          display: flex;
          gap: var(--gap);
        }
        .kc-group {
          display: flex;
          flex-shrink: 0;
          min-width: 100%;
          gap: var(--gap);
        }
        .kc-anim {
          animation: kc-scroll var(--dur, 20s) linear infinite;
          will-change: transform;
        }
        .kc-anim.rev { animation-direction: reverse; }
        @keyframes kc-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kc-anim { animation: none !important; transform: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          All types of{" "}
          <span className="underline decoration-[#0074ED] decoration-4 underline-offset-4">
            AI Prompts
          </span>
        </h2>

        {/* MOBILE: seamless continuous marquee (3 rows) */}
        <div className="mt-8 sm:hidden space-y-4">
          {rows.map((row, idx) => (
            <MarqueeRow
              key={idx}
              items={row}
              reverse={idx % 2 === 1}           // row 2 = reverse
              // duration scales with content for consistent speed
              durationSec={Math.max(14, 6 + row.length * 3)}
            />
          ))}
        </div>

        {/* TABLET/DESKTOP: static clustered rows */}
        <div className="mt-8 sm:mt-10 hidden sm:flex sm:flex-col sm:items-center sm:gap-4">
          {rows.map((row, idx) => (
            <div key={idx} className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {row.map((cat) => (
                <Pill key={cat} label={`${cat} Prompts`} />
              ))}
            </div>
          ))}
        </div>

        {/* Tagline + CTA */}
        {showCta && (
          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-sm sm:text-base text-slate-600">{tagline}</p>
            {ctaNewTab ? (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0074ED] px-4 sm:px-5 py-2 text-white text-sm font-medium shadow hover:bg-[#0060C9] active:bg-[#004FA3] transition-colors"
              >
                <span className="sm:hidden">Explore our Free Tools</span>
                <span className="hidden sm:inline">{ctaText}</span>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            ) : (
              <Link
                to={ctaHref}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0074ED] px-4 sm:px-5 py-2 text-white text-sm font-medium shadow hover:bg-[#0060C9] active:bg-[#004FA3] transition-colors"
              >
                <span className="sm:hidden">Explore our Free Tools</span>
                <span className="hidden sm:inline">{ctaText}</span>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  durationSec = 20,
}: {
  items: string[];
  reverse?: boolean;
  durationSec?: number;
}) {
  // Two identical groups, each min-width: 100% → animation 0→-100% is seamless
  const style = { ["--dur" as any]: `${durationSec}s` };

  return (
    <div className="kc-marquee -mx-4 px-4">
      <div className={`kc-track kc-anim ${reverse ? "rev" : ""}`} style={style} aria-hidden>
        <div className="kc-group">
          {items.map((t) => (
            <Pill key={`a-${t}`} label={`${t} Prompts`} />
          ))}
        </div>
        <div className="kc-group" aria-hidden>
          {items.map((t) => (
            <Pill key={`b-${t}`} label={`${t} Prompts`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Pill({ label }: { label: string }) {
  // Non-clickable showcase pill
  const base =
    "shrink-0 whitespace-nowrap select-none cursor-default " +
    "inline-flex items-center justify-center rounded-xl border-2 px-4 py-2 " +
    "text-sm font-medium border-slate-900 text-slate-900 bg-white";
  return <span className={base} aria-hidden="true">{label}</span>;
}
