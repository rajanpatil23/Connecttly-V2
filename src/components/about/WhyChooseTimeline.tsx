import { useLayoutEffect, useRef, useState, useEffect, useMemo, Fragment } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Brand system
const BRAND = {
  dark: "#0A1F3D",
  gradA: "#0A1F3D",
  gradB: "#0074ED",
};

// Data
export type Item = { id: number; title: string; description: string; image: string };

const ITEMS: Item[] = [
  { id: 1, title: "Omnichannel Expertise", description: "From LinkedIn to Meta, Google to X, we run high-ROI ad campaigns that convert.", image: "/images/omni.svg" },
  { id: 2, title: "Executive Branding Specialists", description: "Build authority for leadership with premium content and smart distribution.", image: "/images/executive.svg" },
  { id: 3, title: "Custom-Tailored Solutions", description: "No generic playbooks — only strategies crafted around your unique goals.", image: "/images/custom.svg" },
  { id: 4, title: "Full-Service Support", description: "From ideation to execution, we handle the heavy lifting so you can focus on growth.", image: "/images/fullService.svg" },
];

/**
 * Modernized ScrollTimeline
 * - Polished visuals (glass cards, subtle borders, depth, grid/gradient background, dark-mode aware)
 * - Smoother progress rail, responsive spacing, and reduced-motion fallback
 * - Better a11y: keyboard navigation, roles, focus rings
 * - Safer layout sync and ScrollTrigger lifecycle
 */
export default function ScrollTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightShellRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Height sync
  const syncHeights = useMemo(() => {
    let raf = 0;
    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const L = leftColRef.current;
        const R = rightShellRef.current;
        if (!L || !R) return;
        const h = L.offsetHeight;
        R.style.height = `${h}px`;
        R.style.minHeight = `${h}px`;
      });
    };
  }, []);

  useLayoutEffect(() => {
    const L = leftColRef.current;
    if (!L) return;

    const ro = new ResizeObserver(syncHeights);
    ro.observe(L);
    window.addEventListener("resize", syncHeights);
    syncHeights();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncHeights);
    };
  }, [syncHeights]);

  // Scroll + master progress
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Kill any prior triggers local to this section only
    ScrollTrigger.getAll().forEach((st) => {
      // @ts-ignore private prop
      if ((st as any).vars?.trigger === section) st.kill();
    });

    // Early exit when reduced motion
    if (prefersReducedMotion) {
      setProgress(0);
      setActive(0);
      return;
    }

    const lines = gsap.utils.toArray<HTMLElement>(".tl-progress");
    gsap.set(lines, { transformOrigin: "top left", scaleY: 0 });

    const totalSeg = ITEMS.length;
    const totalSpan = () => {
      const vh = window.innerHeight;
      const perItem = Math.max(1.4, Math.min(3.0, vh / 500));
      return Math.round(vh * totalSeg * perItem);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${totalSpan()}`,
      scrub: 0.2,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        const idx = Math.min(totalSeg - 1, Math.max(0, Math.floor(p * totalSeg)));
        setActive((prev) => (prev === idx ? prev : idx));

        lines.forEach((line, i) => {
          const segStart = i / totalSeg;
          const t = Math.max(0, Math.min(1, (p - segStart) * totalSeg));
          gsap.set(line, { scaleY: t });
        });
      },
    });

    const onResize = () => st.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      st.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  // Resync after active changes (post expander animation)
  useEffect(() => {
    const id = window.setTimeout(syncHeights, 380);
    return () => window.clearTimeout(id);
  }, [active, syncHeights]);

  // Keyboard support: arrow navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") setActive((v) => Math.min(ITEMS.length - 1, v + 1));
      if (e.key === "ArrowUp" || e.key === "PageUp") setActive((v) => Math.max(0, v - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate" aria-label="Why Choose Connecttly">
      {/* Background: gradient + subtle grid + glow accents */}
      <div className="absolute inset-0 -z-30">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(120% 120% at 50% 0%, #13314f 0%, #0A1F3D 60%)",
          }}
        />
        {/* grid */}
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:36px_36px]" />
        {/* glows */}
        <span className="pointer-events-none absolute left-[10%] -top-8 h-56 w-56 rounded-full bg-[#0074ED]/25 blur-3xl -z-10" />
        <span className="pointer-events-none absolute right-[8%] -bottom-10 h-64 w-64 rounded-full bg-[#0074ED]/20 blur-3xl -z-10" />
      </div>

      <div
        className={[
          "mx-auto w-full max-w-[1200px]",
          "px-4 sm:px-6 lg:px-8",
          "py-16 sm:py-20 lg:py-24",
          progress > 0 ? "h-screen flex flex-col justify-center pt-16" : "",
          "transition-all duration-700 ease-out",
        ].join(" ")}
        style={progress > 0 ? { paddingTop: "4rem" } : undefined}
      >
        {/* Header */}
        <header
          className={[
            "text-center overflow-hidden transition-all duration-700 ease-out",
            progress > 0
              ? "mb-0 max-h-0 -translate-y-full opacity-0 pointer-events-none"
              : "mb-10 sm:mb-12 translate-y-0 opacity-100",
          ].join(" ")}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Why Choose Connecttly?</h2>
          <p className="mt-4 text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
            At Connectly, we craft experiences that move people and grow businesses. From building executive brands to managing cross-platform ad strategies, we deliver measurable results around your goals.
          </p>
        </header>

        <div
          className={[
            "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8",
            progress > 0 ? "place-items-center" : "items-start",
            "transition-all duration-700 ease-out",
          ].join(" ")}
          style={typeof window !== 'undefined' && window.innerHeight < 670 && progress > 0 ? { marginTop: '100px' } : undefined}
        >
          {/* LEFT */}
          <div ref={leftColRef} className="w-full lg:col-span-5 xl:col-span-5">
            <ul role="tablist" aria-label="Capabilities" className="flex flex-col gap-3 sm:gap-4">
              {ITEMS.map((it, i) => (
                <li key={it.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={active === i}
                    aria-controls={`panel-${i}`}
                    id={`tab-${i}`}
                    onClick={() => setActive(i)}
                    className={[
                      "group relative w-full text-left",
                      // glass card
                      "rounded-2xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur",
                      "shadow-[0_10px_24px_rgba(10,31,61,.10)] hover:shadow-[0_16px_36px_rgba(10,31,61,.16)]",
                      "transition-all duration-300",
                      active === i ? "ring-2 ring-[#85b8ff]" : "focus-visible:ring-2 focus-visible:ring-[#85b8ff]",
                    ].join(" ")}
                  >
                    <div className={`flex p-4 sm:p-5 lg:p-6 ${active === i ? "items-start" : "items-center"}`}>
                      {/* Rail */}
                      <div className="relative w-[10px] self-stretch bg-slate-200/70 dark:bg-white/10 overflow-hidden rounded">
                        <div
                          className="tl-progress absolute left-0 top-0 w-full h-full"
                          style={{ background: `linear-gradient(${BRAND.gradA}, ${BRAND.gradB})` }}
                        />
                      </div>

                      {/* Icon */}
                      <div className="ml-3 sm:ml-4 mr-2 sm:mr-3 flex-shrink-0 flex items-center">
                        <img src={it.image} alt="" className="h-10 w-10 sm:h-12 sm:w-12" loading="lazy" />
                      </div>

                      {/* Text */}
                      <div className={`flex-1 ${active === i ? "" : "flex items-center"}`}>
                        <div className="w-full">
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 dark:text-white">
                            {it.title}
                          </h3>
                          <DescriptionExpander expanded={active === i}>{it.description}</DescriptionExpander>
                        </div>
                      </div>

                      {/* Chevron */}
                      <svg
                        aria-hidden
                        className={`ml-3 h-5 w-5 flex-shrink-0 transition-transform ${active === i ? "rotate-90" : "group-hover:translate-x-0.5"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M7 5l6 5-6 5V5z" />
                      </svg>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:col-span-7 xl:col-span-7">
            <div ref={rightShellRef} className="w-full h-full overflow-hidden relative flex items-center justify-center">
              <div className="w-full max-w-[720px] h-full overflow-hidden">
                <RightContent activeIndex={active} />
              </div>
            </div>
          </div>
        </div>

        <div className={progress > 0 ? "h-4 lg:h-6 xl:h-8" : ""} />
      </div>
    </section>
  );
}

/* Animated description expander */
function DescriptionExpander({ expanded, children }: { expanded: boolean; children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const target = expanded ? inner.scrollHeight : 0;

    gsap.killTweensOf(wrap);
    gsap.to(wrap, {
      height: target,
      duration: 0.35,
      ease: "power1.out",
      onUpdate: () => {
        const evt = new Event("resize");
        window.dispatchEvent(evt);
      },
    });

    gsap.killTweensOf(inner);
    gsap.to(inner, { opacity: expanded ? 1 : 0, y: expanded ? 0 : -6, duration: 0.3, ease: "power1.out" });
  }, [expanded]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    gsap.set(wrap, { height: 0, overflow: "hidden" });
    gsap.set(inner, { opacity: 0, y: -6 });
  }, []);

  return (
    <div ref={wrapRef} className="mt-2">
      <div ref={innerRef} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/* Right content with image preloading + shimmer */
function RightContent({ activeIndex }: { activeIndex: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Map index to filename
  const getImageName = (index: number) => {
    const imageNames = [
      "Omnichannel Expertise.jpg",
      "Executive Branding Specialists.jpg",
      "Custom-Tailored Solutions.jpg",
      "Full Service Support.jpg",
    ];
    return imageNames[index];
  };

  // Preload next image for snappier transitions
  useEffect(() => {
    setImageLoaded(false);
    const next = new Image();
    const n = Math.min(activeIndex + 1, ITEMS.length - 1);
    next.src = `/images/about/${getImageName(n)}`;
  }, [activeIndex]);

  return (
    <div className="relative w-full h-full rounded-3xl border border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-[0_10px_26px_rgba(10,31,61,.14)] overflow-hidden">
      {/* top gradient stroke */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <img
        src={`/images/about/${getImageName(activeIndex)}`}
        alt={ITEMS[activeIndex].title}
        className="w-full h-full object-cover"
        loading={activeIndex === 0 ? "eager" : "lazy"}
        onLoad={() => setImageLoaded(true)}
        style={{ opacity: imageLoaded ? 1 : 0, transition: "opacity .25s ease-out" }}
      />

      {/* shimmer while loading */}
      {!imageLoaded && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-200/60 dark:bg-slate-800/40" />
          <div className="absolute inset-0 animate-pulse" />
          <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black,transparent)]">
            <div className="absolute -inset-y-2 -left-40 w-1/2 rotate-12 bg-white/30 blur-2xl animate-[shimmer_1.2s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      {/* corner badge */}
      <div className="pointer-events-none absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium text-white/90 bg-[conic-gradient(at_30%_30%,#1b62ff,#73a7ff,#1b62ff)]/70 backdrop-blur-sm">
        Featured
      </div>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(0); } 100% { transform: translateX(180%); } }
      `}</style>
    </div>
  );
}
