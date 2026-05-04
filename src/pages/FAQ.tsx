import { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone, Globe, ChevronDown, ChevronUp } from "lucide-react";

const LAST_UPDATED = "September 2025";

/* ---------- FAQ DATA ---------- */
type QA = { q: string; a: string };
type FAQSection = { title: string; items: QA[] };

const sections: FAQSection[] = [
  {
    title: "About Connecttly",
    items: [
      { q: "What is Connecttly?", a: "Connecttly is a 360° B2B marketing agency specializing in LinkedIn-first authority building, full-funnel campaigns, and creative growth systems." },
      { q: "What makes Connecttly different from other agencies?", a: "We combine LinkedIn expertise with end-to-end marketing—blending strategy, storytelling, and performance data to deliver measurable ROI." },
      { q: "What services do you offer?", a: "LinkedIn marketing, personal branding, paid ads (LinkedIn, Meta, Google), content & ghostwriting, design & creatives, SEO, email & WhatsApp marketing, employer branding, and analytics." },
      { q: "Do you only work on LinkedIn?", a: "No. While LinkedIn is our core, we also run Meta, Google, YouTube, SEO, and multi-channel campaigns." },
      { q: "Do you handle both B2B and B2C?", a: "Yes. We specialize in B2B growth but also run performance-driven B2C campaigns." },
      { q: "Who should work with Connecttly?", a: "Founders, executives, consultants, growth-stage firms, funded startups, and enterprises seeking predictable lead flow, branding, and growth." },
      { q: "Do you work globally?", a: "Yes. We serve clients across APAC, Europe, North America, and the Middle East, adapting to regional styles." },
      { q: "How do you run 360° campaigns?", a: "5 steps—Audit, Strategy, Creative, Execution, Optimization." },
      { q: "How soon can I see results?", a: "Paid campaigns: 3–6 weeks. Personal branding: 8–12 weeks. Full 360°: 2–3 months for consistent ROI." },
      { q: "What KPIs do you track?", a: "CPL, MQL-to-SQL conversion, CTR, ROI, and talent engagement." },
      { q: "Do you provide dashboards?", a: "Yes. Clients receive transparent dashboards + regular reports." },
      { q: "Can you fix underperforming campaigns?", a: "Absolutely. We audit, restructure, and optimize to lower CPL and boost lead quality." },
      { q: "How is pricing structured?", a: "We offer monthly retainers, campaign-based pricing, and custom quotes based on services and budget." },
      { q: "Do you offer one-time projects?", a: "Yes—for audits, strategy setup, or pilot campaigns. Long-term retainers are best for sustained growth." },
      { q: "Do you design content and ads?", a: "Yes. We create carousels, reels, memes, videos, and infographics aligned with Connecttly's brand identity." },
      { q: "Do you also help with SEO and web presence?", a: "Yes. We provide SEO, blogs, and landing pages as part of our 360° services." },
      { q: "Who founded Connecttly?", a: "Neeraj Yadav & Rishu Raj, with a vision to be the #1 global LinkedIn-first + 360° growth partner." },
      { q: "What is your long-term vision?", a: "To be the most trusted B2B growth partner worldwide, delivering authority, credibility, and measurable ROI." },
      { q: "Do you have case studies?", a: "Yes. We share campaign success stories during consultation calls." },
      { q: "How do I start working with Connecttly?", a: "Fill our contact form, book a discovery call, and get a tailored growth roadmap." },
      { q: "Do you offer free consultations?", a: "Yes. A 15–30 min discovery call is free." },
      { q: "How can I contact you?", a: "📧 infoj@connecttly.com | 📞 +91 7905212348 | 🌐 www.connecttly.com" },
    ],
  },
];

const allItems: QA[] = sections.flatMap(s => s.items);
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// JSON-LD
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ===== Controlled + Animated Accordion Item ===== */
function AnimatedItem({
  id, q, a, open, onToggle, number,
}: {
  id: string; q: string; a: string; open: boolean; onToggle: (id: string) => void; number: number;
}) {
  const [maxH, setMaxH] = useState<number>(0);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && innerRef.current) setMaxH(innerRef.current.scrollHeight);
  }, [open, q, a]);

  useEffect(() => {
    const onResize = () => {
      if (open && innerRef.current) setMaxH(innerRef.current.scrollHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const handleClick = () => {
    if (innerRef.current) setMaxH(innerRef.current.scrollHeight);
    requestAnimationFrame(() => onToggle(id));
  };

  return (
    <div className="faq-item rounded-xl border border-slate-200 bg-white transition shadow-sm hover:border-slate-300 hover:shadow-md">
      <button
        id={`btn-${id}`}
        aria-controls={`panel-${id}`}
        aria-expanded={open}
        onClick={handleClick}
        className="faq-q group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0074ED]/50"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm">
          {number}
        </span>
        <span className="flex-1 font-semibold text-slate-900">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`btn-${id}`}
        className="faq-anim-wrapper overflow-hidden"
        style={{ maxHeight: open ? maxH : 0, transition: "max-height .35s cubic-bezier(.2,.75,.25,1)" }}
      >
        <div ref={innerRef} className={`faq-a relative px-4 pb-4 pt-3 text-slate-700 ${open ? "open" : ""}`}>
          <div className="answer-accent" aria-hidden />
          <p className="leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const INITIAL_VISIBLE = 5;
  const STEP = 5;

  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Filter by search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map(sec => ({
        ...sec,
        items: sec.items.filter(({ q: Q, a: A }) =>
          Q.toLowerCase().includes(q) || A.toLowerCase().includes(q)
        ),
      }))
      .filter(sec => sec.items.length > 0);
  }, [query]);

  const resultCount = useMemo(
    () => filtered.reduce((acc, s) => acc + s.items.length, 0),
    [filtered]
  );

  // Reset visible batch on search change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
    setOpenId(null);
  }, [query]);

  // Limit sections to current visibleCount (across sections)
  const limitedSections = useMemo<FAQSection[]>(() => {
    let remain = visibleCount;
    const out: FAQSection[] = [];
    for (const sec of filtered) {
      if (remain <= 0) break;
      const take = sec.items.slice(0, remain);
      if (take.length) {
        out.push({ ...sec, items: take });
        remain -= take.length;
      }
    }
    return out;
  }, [filtered, visibleCount]);

  const limitedIds = useMemo(
    () => new Set(limitedSections.flatMap(sec => sec.items.map(({ q }) => slugify(q)))),
    [limitedSections]
  );

  // Keep openId within current visible batch
  useEffect(() => {
    if (!openId) return;
    if (!limitedIds.has(openId)) setOpenId(null);
  }, [limitedIds, openId]);

  const visibleNow = limitedSections.reduce((acc, s) => acc + s.items.length, 0);
  const atEnd = visibleNow >= resultCount && resultCount > 0;
  const canMore = resultCount > visibleNow;

  const onViewMore = () => setVisibleCount(v => Math.min(v + STEP, resultCount));
  const onViewLess = () => {
    setVisibleCount(INITIAL_VISIBLE);
    setOpenId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="overflow-hidden bg-[#F5F3EE] rounded-b-[40px] relative">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-30 animate-gradient-shift rounded-b-[40px]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-40 rounded-b-[40px]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(100, 116, 139, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="container mx-auto max-w-5xl px-6 py-16 sm:py-20 text-center">
            <Badge className="border border-slate-200 bg-slate-100 text-slate-700">FAQ</Badge>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">Frequently Asked Questions</h1>
            <p className="mt-3 text-slate-600">
              Everything about Connecttly—services, process, timelines, pricing, and more.
            </p>
            <div className="mt-4 text-sm text-slate-500">Last updated: {LAST_UPDATED}</div>
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="relative isolate bg-background">
        <div className="container relative mx-auto max-w-5xl px-6 py-12 sm:py-16 pb-20">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions (e.g., pricing, LinkedIn, dashboards)"
                className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-slate-900 placeholder-slate-400 outline-none ring-0 focus:border-slate-300 focus:ring-2 focus:ring-[#0074ED]/20"
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="mt-2 text-sm text-slate-500">
              {resultCount} result{resultCount !== 1 ? "s" : ""}{query ? " • filtered" : ""}
            </div>
          </div>

          {/* FAQ List */}
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              {resultCount === 0 ? (
                <p className="text-slate-600">No results found.</p>
              ) : (
                <>
                  {limitedSections.map((section) => {
                    let itemNumber = 0;
                    // Calculate starting number for this section
                    for (const sec of filtered) {
                      if (sec.title === section.title) break;
                      itemNumber += sec.items.length;
                    }
                    
                    return (
                      <div key={section.title} className="mb-8">
                        <h2 className="mb-3 text-xl font-semibold text-slate-900">{section.title}</h2>
                        <ul className="space-y-4">
                          {section.items.map(({ q, a }) => {
                            itemNumber++;
                            const id = slugify(q);
                            return (
                              <li key={id}>
                                <AnimatedItem 
                                  id={id} 
                                  q={q} 
                                  a={a} 
                                  open={openId === id} 
                                  onToggle={(i) => setOpenId(prev => prev === i ? null : i)}
                                  number={itemNumber}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}

                  {/* Load controls */}
                  <div className="mt-6 flex items-center justify-center gap-6">
                    {!atEnd && canMore && (
                      <button
                        type="button"
                        onClick={onViewMore}
                        className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900"
                      >
                        View more <ChevronDown className="h-4 w-4" />
                      </button>
                    )}
                    {atEnd && resultCount > INITIAL_VISIBLE && (
                      <button
                        type="button"
                        onClick={onViewLess}
                        className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900"
                      >
                        View less <ChevronUp className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-slate-700">Didn't find what you're looking for?</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-[#0074ED] text-white hover:bg-[#0062c7]">
                <Link to="/resources/support">Book a free consultation</Link>
              </Button>
              <a href="mailto:infoj@connecttly.com" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50">
                <Mail className="h-4 w-4" /> infoj@connecttly.com
              </a>
              <a href="tel:+917905212348" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50">
                <Phone className="h-4 w-4" /> +91 7905212348
              </a>
              <a href="https://www.connecttly.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50">
                <Globe className="h-4 w-4" /> connecttly.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Local styles */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background: linear-gradient(135deg, #dbeafe 0%, #fae8ff 50%, #fce7f3 100%);
          }
          25% {
            background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 50%, #fae8ff 100%);
          }
          50% {
            background: linear-gradient(135deg, #fae8ff 0%, #fce7f3 50%, #dbeafe 100%);
          }
          75% {
            background: linear-gradient(135deg, #fce7f3 0%, #dbeafe 50%, #e0e7ff 100%);
          }
        }
        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
        }
        
        .faq-a {
          background: linear-gradient(180deg, rgba(241,245,249,0.5), rgba(248,250,252,0.3));
          border-top: 1px solid rgba(226,232,240,0.8);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity .25s ease, transform .25s ease;
        }
        .faq-a.open { opacity: 1; transform: translateY(0); }
        .answer-accent {
          position: absolute; left: 0; top: 12px; bottom: 12px; width: 3px;
          border-radius: 2px;
          background: linear-gradient(180deg, #0074ED, #0062c7);
          opacity: .9;
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-a, .faq-anim-wrapper { transition: none !important; }
        }
      `}</style>
    </>
  );
}
