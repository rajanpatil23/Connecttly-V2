import React from "react";

/**
 * ServicesRibbon
 * Elegant feature ribbon with fixed bluish color scheme
 * - Users only customize icon, title, and subtitle
 * - Colors are hardcoded to maintain consistency
 */

export interface RibbonItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface ServicesRibbonProps {
  title?: string;
  items?: RibbonItem[];
}

export default function ServicesRibbon({ 
  title = "What You Get with Every Service",
  items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      ),
      title: "Fixed-Price Packages",
      subtitle: "No Hourly Billing, Clear Deliverables",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      ),
      title: "Dedicated Account Manager",
      subtitle: "Single Point of Contact, Always",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
          <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      ),
      title: "Fast Turnaround",
      subtitle: "Launch Campaigns in 7-14 Days",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
          <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      title: "Real-Time Reporting",
      subtitle: "Live Dashboards & Weekly Updates",
    },
  ]
}: ServicesRibbonProps) {
  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-50/60">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Card */}
        <div className="relative rounded-3xl border border-slate-200/70 bg-[#B8E8DD] p-6 shadow-sm ring-1 ring-black/5 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/60 dark:ring-white/5">
          {/* Top sheen */}
          <div className="pointer-events-none absolute inset-x-4 -top-2 h-4 rounded-full bg-gradient-to-b from-white/80 to-transparent blur-md" />

          <h2 className="mb-6 text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
            {title}
          </h2>

          {/* Items */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it, idx) => {
              
              return (
                <li key={idx} className="group">
                  <a
                    href="#"
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/30 dark:border-slate-700/60 dark:bg-slate-900/70"
                    aria-label={`${it.title} — ${it.subtitle}`}
                  >
                  {/* Icon tile - Fixed bluish gradient for all icons */}
                  <span
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-105"
                  >
                    {it.icon}
                  </span>

                    {/* Texts */}
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-[15px] font-semibold text-slate-900 dark:text-slate-100">
                        {it.title}
                      </span>
                      <span className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                        {it.subtitle}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Subtle bottom shadow */}
          <div className="pointer-events-none absolute inset-x-2 -bottom-3 h-5 rounded-3xl bg-slate-900/5 blur" />
        </div>
      </div>
    </section>
  );
}
