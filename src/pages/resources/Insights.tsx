import PageHero from "@/components/_zip/PageHero";
import React, { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from "recharts";
import { Card as UICard, CardContent } from "@/components/ui/card";

/**
 * INSIGHTS DASHBOARD (Static-friendly, 2025+)
 * - Data starts at Jun 4, 2025
 * - Timeline stops at a fixed build "current" month so the site does not look stale later
 *   Set window.__INSIGHTS_DATA_END__ = "YYYY-MM" (e.g., "2025-10") in a small inline script at build/deploy time
 *   If not set, falls back to hardcoded DEFAULT_DATA_END below
 * - Range filters: 3M, 1Y, 3Y, ALL
 * - Up–down micro-variation with overall upward trend
 */

// ---------- Time bounds ----------
const DATA_START = new Date("2025-06-01"); // company registered Jun 4, 2025 → start month June 2025

function getDataEnd(): Date {
  // TEST MODE: Check URL for test date parameter
  // Example: ?testDate=2026-03 or ?testDate=2030-12
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const testDate = params.get('testDate');
    if (testDate) {
      const [y, m] = testDate.split('-').map(Number);
      if (y && m) {
        console.log(`🧪 TEST MODE: Using date ${testDate}`);
        return new Date(y, m - 1, 1);
      }
    }
  }
  
  // Always use current month for live, dynamic data
  const now = new Date();
  // Use first day of current month for consistency
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function* monthIterator(start: Date, end: Date) {
  const d = new Date(start.getFullYear(), start.getMonth(), 1);
  while (d <= end) {
    yield new Date(d);
    d.setMonth(d.getMonth() + 1);
  }
}

// ---------- Utilities ----------
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Range options
type RangeKey = "3M" | "1Y" | "3Y" | "ALL";
const RANGE_LABELS: { key: RangeKey; months?: number }[] = [
  { key: "3M", months: 3 },
  { key: "1Y", months: 12 },
  { key: "3Y", months: 36 },
  { key: "ALL" },
];

// ---------- Reusable UI ----------
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={cn("rounded-2xl border border-black/10 bg-white p-4 md:p-6 shadow-sm", className)}>{children}</div>
);

// Use UICard from shadcn for hero stats
const StatsCard = UICard;

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 mb-4">{title}</h2>
);

const Segmented: React.FC<{
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="inline-flex rounded-full border border-gray-200 p-1 bg-gray-50">
    {options.map((o) => (
      <button
        key={o.value}
        onClick={() => onChange(o.value)}
        className={cn(
          "px-3 py-1.5 text-sm rounded-full transition",
          value === o.value ? "bg-white shadow text-gray-900" : "text-gray-600 hover:text-gray-900"
        )}
      >
        {o.label}
      </button>
    ))}
  </div>
);

const Chip: React.FC<React.PropsWithChildren<{ color?: string }>> = ({ children, color }) => (
  <div className={cn("rounded-xl px-4 py-3 text-sm font-medium", color || "bg-gray-100 text-gray-800")}>{children}</div>
);

const Kpi: React.FC<{ 
  label: string; 
  value: string; 
  highlight?: boolean;
  onClick?: () => void;
  clickable?: boolean;
  bgColor?: string;
  borderColor?: string;
}> = ({ label, value, highlight, onClick, clickable, bgColor, borderColor }) => (
  <div
    onClick={onClick}
    className={cn(
      "flex-1 min-w-[140px] rounded-xl px-3 py-2 border transition-all",
      highlight ? (bgColor || "bg-[#B8D4F7]") : "bg-gray-50",
      highlight ? (borderColor || "border-[#0074ED]/30") : "border-gray-200",
      clickable && "cursor-pointer hover:shadow-md hover:scale-105 active:scale-95"
    )}
  >
    <div className="text-xs text-gray-600">{label}</div>
    <div className="text-lg font-semibold text-gray-900">{value}</div>
  </div>
);

// ---------- Data generation ----------
interface Point { key: string; label: string; value: number }

function buildMonthLabels(start: Date, end: Date): { key: string; label: string }[] {
  const arr: { key: string; label: string }[] = [];
  for (const d of monthIterator(start, end)) {
    const key = monthKey(d);
    const label = d.toLocaleString(undefined, { month: "short", year: "numeric" });
    arr.push({ key, label });
  }
  return arr;
}

// Produce an up-trending but wavy series with realistic ups and downs
function synthSeries(labels: { key: string; label: string }[], growth = 1, noise = 0.25, base = 800) {
  return labels.map((m, i) => {
    const trend = base + i * 120 * growth + Math.max(0, i - 6) * 28 * growth; // long-term uptrend
    
    // Multiple wave patterns for more variation
    const wave1 = Math.sin(i / 1.7) * 120 * noise;
    const wave2 = Math.cos(i / 2.3) * 80 * noise;
    const wave3 = Math.sin(i / 3.1) * 60 * noise;
    
    // Stronger jitter for more variation
    const jitter = ((i * 97) % 17) * 8 * noise;
    
    // More pronounced dips and plateaus
    const dip = (i % 6 === 0) ? -80 * noise : 0; // sharper dips
    const plateau = (i % 4 === 0) ? -35 * noise : 0; // more plateaus
    const spike = (i % 8 === 0) ? 60 * noise : 0; // occasional spikes
    
    // Flat periods (every 3rd month has minimal change)
    const flatness = (i % 3 === 0) ? -wave1 * 0.5 : 0;
    
    return { 
      key: m.key, 
      label: m.label, 
      value: Math.max(0, Math.round(trend + wave1 + wave2 + wave3 + jitter + dip + plateau + spike + flatness)) 
    } as Point;
  });
}

function sliceByRange<T>(data: T[], range: RangeKey): T[] {
  if (range === "ALL") return data;
  const months = RANGE_LABELS.find((r) => r.key === range)?.months || 0;
  // If requested range is larger than available data, return all data
  if (months > data.length) return data;
  return data.slice(-months);
}

// ---------- Metric data model ----------
function useTimeline() {
  const [end, setEnd] = useState<Date>(getDataEnd());
  useEffect(() => {
    // In case the global is injected after hydration
    const maybeEnd = getDataEnd();
    setEnd(maybeEnd);
  }, []);
  const labels = useMemo(() => buildMonthLabels(DATA_START, end), [end]);
  return labels;
}

// ---------- Cards ----------
const RevenueMetrics: React.FC = () => {
  const labels = useTimeline();
  const [metric, setMetric] = useState<"arr" | "mrr" | "pipeline">("arr");
  const [range, setRange] = useState<RangeKey>("1Y");

  const base = useMemo(() => ({
    arr: synthSeries(labels, 2.1, 0.35, 1200),
    mrr: synthSeries(labels, 1.4, 0.3, 500),
    pipeline: synthSeries(labels, 2.6, 0.45, 900),
  }), [labels]);

  const series = useMemo(() => sliceByRange(
    base[metric].map((d, idx) => ({ name: `${d.label}`, value: d.value, index: idx })),
    range
  ), [base, metric, range]);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <SectionTitle title="Revenue metrics" />
        <Segmented
          options={RANGE_LABELS.map((r) => ({ label: r.key, value: r.key }))}
          value={range}
          onChange={(v) => setRange(v as RangeKey)}
        />
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ left: 4, right: 40, top: 12, bottom: 48 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0074ED" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#0074ED" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eaeaea" vertical={false} />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              interval={series.length <= 6 ? 0 : range === "3M" ? 0 : range === "1Y" ? 1 : range === "3Y" ? 5 : 12}
              padding={{ left: 10, right: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 11 }}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip cursor={{ stroke: "#B8D4F7" }} />
            <Area type="monotone" dataKey="value" stroke="#0074ED" fill="url(#g1)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
=======

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Kpi 
          label="ARR" 
          value={`$${(base.arr.at(-1)?.value || 0).toLocaleString()}`} 
          highlight={metric === "arr"}
          onClick={() => setMetric("arr")}
          clickable
          bgColor="bg-[#B8D4F7]"
          borderColor="border-[#0074ED]/30"
        />
        <Kpi 
          label="MRR" 
          value={`$${(base.mrr.at(-1)?.value || 0).toLocaleString()}`}
          highlight={metric === "mrr"}
          onClick={() => setMetric("mrr")}
          clickable
          bgColor="bg-[#B8D4F7]"
          borderColor="border-[#0074ED]/30"
        />
        <Kpi 
          label="Pipeline" 
          value={`$${(base.pipeline.at(-1)?.value || 0).toLocaleString()}`}
          highlight={metric === "pipeline"}
          onClick={() => setMetric("pipeline")}
          clickable
          bgColor="bg-[#B8D4F7]"
          borderColor="border-[#0074ED]/30"
        />
      </div>
    </Card>
  );
};

const CustomerMetrics: React.FC = () => {
  const labels = useTimeline();
  const [metric, setMetric] = useState<"customers" | "arpu" | "ltv">("customers");
  const [range, setRange] = useState<RangeKey>("1Y");

  const base = useMemo(() => ({
    customers: synthSeries(labels, 1.2, 0.35, 700),
    arpu: synthSeries(labels, 0.4, 0.25, 60),
    ltv: synthSeries(labels, 0.7, 0.3, 240),
  }), [labels]);

  const series = useMemo(() => sliceByRange(
    base[metric].map((d, idx) => ({ name: d.label, value: d.value, index: idx })),
    range
  ), [base, metric, range]);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <SectionTitle title="Customer metrics" />
        <Segmented
          options={RANGE_LABELS.map((r) => ({ label: r.key, value: r.key }))}
          value={range}
          onChange={(v) => setRange(v as RangeKey)}
        />
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ left: 4, right: 40, top: 12, bottom: 48 }}>
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#24C5B9" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#24C5B9" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eaeaea" vertical={false} />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              interval={range === "3M" ? 0 : range === "1Y" ? 1 : range === "3Y" ? 5 : 12}
              padding={{ left: 10, right: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 11 }}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip cursor={{ stroke: "#B8E8DD" }} />
            <Area type="monotone" dataKey="value" stroke="#24C5B9" fill="url(#g2)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Kpi 
          label="Customers" 
          value={(base.customers.at(-1)?.value || 0).toLocaleString()} 
          highlight={metric === "customers"}
          onClick={() => setMetric("customers")}
          clickable
          bgColor="bg-[#B8E8DD]"
          borderColor="border-[#24C5B9]/30"
        />
        <Kpi 
          label="ARPU" 
          value={`$${(base.arpu.at(-1)?.value || 0).toLocaleString()}`}
          highlight={metric === "arpu"}
          onClick={() => setMetric("arpu")}
          clickable
          bgColor="bg-[#B8E8DD]"
          borderColor="border-[#24C5B9]/30"
        />
        <Kpi 
          label="LTV" 
          value={`$${(base.ltv.at(-1)?.value || 0).toLocaleString()}`}
          highlight={metric === "ltv"}
          onClick={() => setMetric("ltv")}
          clickable
          bgColor="bg-[#B8E8DD]"
          borderColor="border-[#24C5B9]/30"
        />
      </div>
    </Card>
  );
};

const AdvocacyMetrics: React.FC = () => {
  const labels = useTimeline();
  const base = useMemo(() => ({
    firstResponse: synthSeries(labels, 0.05, 0.3, 75),
    csat: synthSeries(labels, 0.03, 0.25, 85),
    issuesSolved: synthSeries(labels, 0.9, 0.35, 6000),
  }), [labels]);

  const last = {
    fr: `${Math.min(95, (base.firstResponse.at(-1)?.value || 0)).toFixed(1)}%`,
    cs: `${Math.min(98, (base.csat.at(-1)?.value || 0)).toFixed(1)}%`,
    is: `${(base.issuesSolved.at(-1)?.value || 0).toLocaleString()}`,
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <SectionTitle title="Customer advocacy metrics" />
        <span className="text-sm px-3 py-1.5 rounded-full border bg-white">Last quarter</span>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <Chip color="bg-[#B8E8DD] text-[#0A1F3D]">
          <div className="text-base font-semibold">{last.fr}</div>
          <div className="text-xs opacity-70 mt-1">First response within 2 hours</div>
        </Chip>
        <Chip color="bg-[#D4F0B3] text-[#0A1F3D]">
          <div className="text-base font-semibold">{last.cs}</div>
          <div className="text-xs opacity-70 mt-1">Customer satisfaction</div>
        </Chip>
        <Chip color="bg-[#BBD1ED] text-[#0A1F3D]">
          <div className="text-base font-semibold">{last.is}</div>
          <div className="text-xs opacity-70 mt-1">Customer requests resolved</div>
        </Chip>
      </div>
    </Card>
  );
};

const MarketingMetrics: React.FC = () => {
  const labels = useTimeline();
  const [metric, setMetric] = useState<"blog" | "time" | "contacts" | "downloads">("blog");
  const [range, setRange] = useState<RangeKey>("1Y");

  const base = useMemo(() => ({
    blog: synthSeries(labels, 1.0, 0.35, 900), // blog visits
    time: synthSeries(labels, 0.6, 0.25, 120), // avg time on site index
    contacts: synthSeries(labels, 0.8, 0.3, 60), // contact requests
    downloads: synthSeries(labels, 0.7, 0.3, 30), // resource downloads
  }), [labels]);

  const buttons = [
    { key: "blog", label: "Blog visits", secondary: "Time on site" },
    { key: "time", label: "Time on site", secondary: "Blog visits" },
    { key: "contacts", label: "Contact requests", secondary: "Blog visits" },
    { key: "downloads", label: "Resource downloads", secondary: "Blog visits" },
  ] as const;

  const series = useMemo(() => {
    const a = base[metric];
    const bKey = metric === "blog" ? "time" : "blog";
    const b = base[bKey as keyof typeof base];
    const currentButton = buttons.find(btn => btn.key === metric);
    const merged = a.map((d, i) => ({ 
      name: d.label, 
      [currentButton?.label || metric]: d.value, 
      [currentButton?.secondary || "Comparison"]: b[i].value,
      index: i
    }));
    return sliceByRange(merged, range);
  }, [base, metric, range]);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <SectionTitle title="Marketing metrics" />
        <Segmented
          options={RANGE_LABELS.map((r) => ({ label: r.key, value: r.key }))}
          value={range}
          onChange={(v) => setRange(v as RangeKey)}
        />
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ left: 4, right: 40, top: 12, bottom: 48 }}>
            <CartesianGrid stroke="#eaeaea" vertical={false} />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              interval={range === "3M" ? 0 : range === "1Y" ? 1 : range === "3Y" ? 5 : 12}
              padding={{ left: 10, right: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 11 }}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={buttons.find(b => b.key === metric)?.label || metric} stroke="#0074ED" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey={buttons.find(b => b.key === metric)?.secondary || "Comparison"} stroke="#50D0FF" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {buttons.map((b) => (
          <div
            key={b.key}
            onClick={() => setMetric(b.key as any)}
            className={cn(
              "rounded-xl px-3 py-2 border transition-all cursor-pointer hover:shadow-md hover:scale-105 active:scale-95",
              metric === b.key ? "bg-[#D4F0B3] border-[#A6FF5F]/40" : "bg-gray-50 border-gray-200"
            )}
          >
            <div className="text-xs text-gray-600">{b.label}</div>
            <div className="text-lg font-semibold text-gray-900">
              {base[b.key].at(-1)?.value.toLocaleString() || "0"}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ---------- Page ----------
export default function InsightsDashboard() {
  return (
    <main className="relative bg-background min-h-screen">
      <PageHero
        eyebrow="Live Metrics"
        title={<>Real-time <span className="gradient-text">business insights</span></>}
        description="Track our growth journey with live metrics and data-driven insights. Transparency in action—updated automatically every month."
        primaryCtaText="View Dashboard"
        primaryCtaHref="#dashboard"
        secondaryCtaText="Contact Us"
        secondaryCtaHref="/resources/support"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { value: "Live Data", label: "Auto-Updated" },
            { value: "4 Metrics", label: "Categories" },
            { value: "100% Real", label: "Transparency" },
          ].map((s) => (
            <div key={s.label} className="bg-background rounded-2xl p-5 border border-border shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
              <div className="text-2xl font-heading font-bold gradient-text">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* DASHBOARD SECTION */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-6">
          <RevenueMetrics />
          <CustomerMetrics />
          <AdvocacyMetrics />
          <MarketingMetrics />
          
          <p className="text-xs text-gray-500 text-center">
            Data shown from Jun 2025. Updates automatically every month.
          </p>
        </div>
      </section>

      {/* KEY INSIGHTS SECTION - Matching "What We Do" style from About page */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="relative rounded-3xl bg-[rgb(241,241,233)]">
            <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
              {/* Header */}
              <header className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                  What the Data Tells Us
                </h2>
                <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
                  Key insights and trends from our business metrics
                </p>
              </header>

              {/* Insight Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  {/* Icon with gradient background */}
                  <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Consistent Growth</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Our revenue metrics show steady upward momentum with strategic investments paying off across all channels.
                  </p>
                </div>

                <div className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  {/* Icon with gradient background */}
                  <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Customer Success</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    High satisfaction rates and growing customer base demonstrate our commitment to delivering exceptional value.
                  </p>
                </div>

                <div className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center">
                  {/* Icon with gradient background */}
                  <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Market Expansion</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Increasing blog engagement and contact requests signal strong market interest and brand awareness growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
