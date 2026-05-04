import { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Mail, Phone, Globe, ChevronDown, ChevronUp } from "lucide-react";
import PageHero from "@/components/_zip/PageHero";

const LAST_UPDATED = "September 2025";

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
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function AnimatedItem({ id, q, a, open, onToggle, number }: {
  id: string; q: string; a: string; open: boolean; onToggle: (id: string) => void; number: number;
}) {
  const [maxH, setMaxH] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && innerRef.current) setMaxH(innerRef.current.scrollHeight);
  }, [open, q, a]);

  return (
    <div className="rounded-xl border border-border bg-background transition shadow-[0_2px_10px_hsl(var(--foreground)/0.04)] hover:border-primary/40">
      <button
        aria-expanded={open}
        onClick={() => onToggle(id)}
        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-foreground font-semibold text-sm">
          {number}
        </span>
        <span className="flex-1 font-semibold text-foreground">{q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className="overflow-hidden"
        style={{ maxHeight: open ? maxH : 0, transition: "max-height .35s cubic-bezier(.2,.75,.25,1)" }}
      >
        <div ref={innerRef} className="px-4 pb-4 pt-3 text-muted-foreground border-t border-border">
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map(sec => ({ ...sec, items: sec.items.filter(({ q: Q, a: A }) => Q.toLowerCase().includes(q) || A.toLowerCase().includes(q)) }))
      .filter(sec => sec.items.length > 0);
  }, [query]);

  const resultCount = useMemo(() => filtered.reduce((acc, s) => acc + s.items.length, 0), [filtered]);
  useEffect(() => { setVisibleCount(INITIAL_VISIBLE); setOpenId(null); }, [query]);

  const limitedSections = useMemo<FAQSection[]>(() => {
    let remain = visibleCount;
    const out: FAQSection[] = [];
    for (const sec of filtered) {
      if (remain <= 0) break;
      const take = sec.items.slice(0, remain);
      if (take.length) { out.push({ ...sec, items: take }); remain -= take.length; }
    }
    return out;
  }, [filtered, visibleCount]);

  const visibleNow = limitedSections.reduce((acc, s) => acc + s.items.length, 0);
  const atEnd = visibleNow >= resultCount && resultCount > 0;
  const canMore = resultCount > visibleNow;

  return (
    <div className="overflow-x-hidden">
      <PageHero
        eyebrow="FAQ"
        title={<>Frequently Asked <span className="gradient-text">Questions</span></>}
        description="Everything about Connecttly—services, process, timelines, pricing, and more."
        meta={`Last updated: ${LAST_UPDATED}`}
      />

      <section className="pb-20 bg-background">
        <div className="container-main max-w-3xl">
          <div className="mb-8 relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions (e.g., pricing, LinkedIn, dashboards)"
              className="w-full rounded-full border border-border bg-background px-12 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm text-muted-foreground hover:bg-secondary"
                onClick={() => setQuery("")}
              >Clear</button>
            )}
            <div className="mt-2 text-sm text-muted-foreground">
              {resultCount} result{resultCount !== 1 ? "s" : ""}{query ? " • filtered" : ""}
            </div>
          </div>

          {resultCount === 0 ? (
            <p className="text-muted-foreground">No results found.</p>
          ) : (
            <>
              {limitedSections.map((section) => {
                let itemNumber = 0;
                for (const sec of filtered) {
                  if (sec.title === section.title) break;
                  itemNumber += sec.items.length;
                }
                return (
                  <div key={section.title} className="mb-8">
                    <h2 className="mb-3 text-xl font-heading font-semibold text-foreground">{section.title}</h2>
                    <ul className="space-y-3">
                      {section.items.map(({ q, a }) => {
                        itemNumber++;
                        const id = slugify(q);
                        return (
                          <li key={id}>
                            <AnimatedItem id={id} q={q} a={a} open={openId === id}
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

              <div className="mt-6 flex items-center justify-center gap-6">
                {!atEnd && canMore && (
                  <button onClick={() => setVisibleCount(v => Math.min(v + STEP, resultCount))} className="inline-flex items-center gap-2 text-foreground hover:text-primary">
                    View more <ChevronDown className="h-4 w-4" />
                  </button>
                )}
                {atEnd && resultCount > INITIAL_VISIBLE && (
                  <button onClick={() => { setVisibleCount(INITIAL_VISIBLE); setOpenId(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center gap-2 text-foreground hover:text-primary">
                    View less <ChevronUp className="h-4 w-4" />
                  </button>
                )}
              </div>
            </>
          )}

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-foreground">Didn't find what you're looking for?</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full">
                <Link to="/resources/support">Book a free consultation</Link>
              </Button>
              <a href="mailto:infoj@connecttly.com" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-foreground hover:bg-secondary">
                <Mail className="h-4 w-4" /> infoj@connecttly.com
              </a>
              <a href="tel:+917905212348" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-foreground hover:bg-secondary">
                <Phone className="h-4 w-4" /> +91 7905212348
              </a>
              <a href="https://www.connecttly.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-foreground hover:bg-secondary">
                <Globe className="h-4 w-4" /> connecttly.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
