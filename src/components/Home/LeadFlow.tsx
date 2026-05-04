import { useEffect, useRef } from "react";
import { Search, Pencil, Send, Handshake } from "lucide-react";

export default function LeadFlow() {
  // Data shared by desktop + mobile
  const steps = [
    {
      title: "Find Prospects",
      icon: <Search size={44} strokeWidth={2.2} className="text-[#0A1F3D]" />,
      copy: "We build targeted & qualified lists of your ideal prospects on LinkedIn.",
      px: 120, py: 290,
    },
    {
      title: "Write Messages",
      icon: <Pencil size={44} strokeWidth={2.2} className="text-[#0A1F3D]" />,
      copy: "Clear, personal outreach that actually gets responses.",
      px: 340, py: 150,
    },
    {
      title: "Execute Outreach",
      icon: <Send size={44} strokeWidth={2.2} className="text-[#0A1F3D]" />,
      copy: "Sequenced delivery across LinkedIn & email to reach thousands efficiently.",
      px: 570, py: 290,
    },
    {
      title: "Close Deals",
      icon: <Handshake size={44} strokeWidth={2.2} className="text-[#0A1F3D]" />,
      copy: "You’re notified instantly when leads respond so your team can close.",
      px: 790, py: 150,
    },
  ];

  // ----- Desktop: keyboard flip support -----
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLButtonElement>(".ctly-flip");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (e.currentTarget as unknown as HTMLElement)
          .closest(".ctly-node, .ctly-node-mobile")
          ?.classList.toggle("is-flipped");
      }
    };
    btns.forEach((b) => b.addEventListener("keydown", onKey as any));
    return () => btns.forEach((b) => b.removeEventListener("keydown", onKey as any));
  }, []);

  const onFlipClick: React.MouseEventHandler = (e) => {
    (e.currentTarget as HTMLElement).closest(".ctly-node, .ctly-node-mobile")?.classList.toggle("is-flipped");
  };

  // ----- Mobile/Tablet: continuous auto-scroll carousel -----
  const trackRef = useRef<HTMLOListElement | null>(null);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Only run below lg
    const mq = window.matchMedia("(min-width: 1024px)");
    if (mq.matches) return;

    // Duplicate items once so we can loop seamlessly
    if (!el.dataset.cloned) {
      el.dataset.cloned = "1";
      const nodes = Array.from(el.children);
      nodes.forEach((n) => el.appendChild(n.cloneNode(true)));
    }

    let raf = 0;
    let running = true;
    const speed = 0.45; // px per frame (~27 px/s at 60fps). Tweak if needed.

    const tick = () => {
      if (!running) return;
      el.scrollLeft += speed;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half; // wrap
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => { running = false; cancelAnimationFrame(raf); };
    const resume = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };

    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerenter", pause);
    el.addEventListener("focusin", pause);
    el.addEventListener("pointerup", () => setTimeout(resume, 300));
    el.addEventListener("pointerleave", () => setTimeout(resume, 300));
    el.addEventListener("focusout", () => setTimeout(resume, 300));

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("focusin", pause);
    };
  }, []);

  return (
    <section className="px-4 mt-16 hidden lg:block">
      <div className="mx-auto max-w-6xl">
        <div className="ctly-canvas">
          {/* Header (shared) */}
          <header className="ctly-head">
            <h2 className="ctly-title">How we generate leads for clients</h2>
            <p className="ctly-sub">
              We leverage thousands of campaigns to target &amp; engage decision makers—then move them into your funnel.
            </p>
            <span className="ctly-underline" />
          </header>

          {/* ---------------- DESKTOP (lg+) ---------------- */}
          <svg
            className="ctly-ribbon hidden lg:block"
            viewBox="0 0 900 420"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ctlyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0074ED" />
                <stop offset="100%" stopColor="#0A1F3D" />
              </linearGradient>
            </defs>
            <path
              d="M110 290 C 220 290 240 150 340 150 S 460 290 570 290 S 690 150 790 150"
              fill="none"
              stroke="url(#ctlyGrad)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="120"
            />
          </svg>

          <ol className="ctly-nodes hidden lg:block" role="list">
            {steps.map((n, i) => (
              <li key={i} className="ctly-node mt-11 " style={{ ["--px" as any]: n.px, ["--py" as any]: n.py }}>
                <div className="ctly-shadow">
                  <button className="ctly-flip" aria-label={`${n.title} (flip for details)`} onClick={onFlipClick}>
                    {/* FRONT */}
                    <div className="ctly-face ctly-front">
                      <div className="ctly-glyph">{n.icon}</div>
                      <div className="ctly-front-title">{n.title}</div>
                    </div>
                    {/* BACK */}
                    <div className="ctly-face ctly-back">
                      <div className="ctly-desc">{n.copy}</div>
                    </div>
                  </button>
                </div>
              </li>
            ))}
          </ol>

          {/* ---------------- TABLET/MOBILE (<lg) ---------------- */}
          <div className="lg:hidden relative mt-2">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#f5f9ff] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f5f9ff] to-transparent z-10" />

            <ol
              ref={trackRef}
              className="ctly-track flex gap-5 overflow-x-auto no-scrollbar px-1 py-2"
              role="list"
              aria-label="Lead flow slider"
            >
              {steps.map((n, i) => (
                <li key={`m-${i}`} className="ctly-node-mobile shrink-0">
                  <div className="ctly-shadow">
                    <button className="ctly-flip" aria-label={`${n.title} (flip for details)`} onClick={onFlipClick}>
                      {/* FRONT (white) */}
                      <div className="ctly-face ctly-front">
                        <div className="ctly-glyph">{n.icon}</div>
                        <div className="ctly-front-title">{n.title}</div>
                      </div>
                      {/* BACK (also white on small screens so it "remains same") */}
                      <div className="ctly-face ctly-back-mobile">
                        <div className="ctly-desc text-[#0A1F3D]">{n.copy}</div>
                      </div>
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar{ display:none; }
        .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }

        .ctly-canvas{
          --pad: clamp(22px, 3.5vw, 34px);
          --stage-offset: clamp(78px, 5vw, 76px);
          position:relative;
          aspect-ratio:900/520;
          background:linear-gradient(180deg,#ffffff 0%,#f5f9ff 100%);
          border-radius:24px;
          padding:var(--pad);
          box-shadow:0 24px 60px rgba(10,31,61,.08);
          display:grid;
          grid-template-rows:auto 1fr;
          gap: clamp(8px, 1.8vw, 14px);
        }
        .ctly-head{ display:grid; justify-items:center; gap:8px; padding-top:10px; }
        .ctly-title{ margin:0; font-size: clamp(22px, 2.3vw, 30px); font-weight:700; color:#0A1F3D; text-align:center; }
        .ctly-sub{ margin:0; max-width:820px; font-size: clamp(14px, 1.2vw, 16px); color: color-mix(in oklab, #0A1F3D 70%, white); text-align:center; }
        .ctly-underline{ display:block; height:4px; width: clamp(220px, 28vw, 470px); background: linear-gradient(90deg,#0074ED 0%, #0A1F3D 100%); border-radius:2px; opacity:.55; }

        /* Desktop stage */
        .ctly-ribbon, .ctly-nodes{
          position:absolute; left:var(--pad); right:var(--pad); bottom:var(--pad);
          top: calc(var(--pad) + var(--stage-offset));
        }
        .ctly-ribbon{ filter:drop-shadow(0 18px 28px rgba(0,116,237,.22)) }
        .ctly-nodes{ list-style:none; margin:0; padding:0; }

        .ctly-node{ position:absolute; left:calc((var(--px)/900) * 100%); top:calc((var(--py)/520) * 100%); transform:translate(-50%,-50%); perspective:1000px; }
        .ctly-shadow{ filter:drop-shadow(0 22px 18px rgba(0,0,0,.18)); }

        .ctly-flip{
          width:192px; height:192px; border-radius:50%; position:relative;
          transform-style:preserve-3d; transition:transform .8s cubic-bezier(.2,.8,.2,1);
          background:transparent; border:0; cursor:pointer; outline-offset:6px;
        }
        .ctly-face{
          position:absolute; inset:0; border-radius:50%;
          display:grid; place-items:center; gap:10px; text-align:center; padding:18px;
          backface-visibility:hidden; transform:translateZ(0);
        }
        .ctly-front{
          background:radial-gradient(ellipse at 30% 30%, #fff 0%, #f6f7fb 55%, #edf1f7 100%);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.9), inset 0 -6px 14px rgba(10,31,61,.10);
        }
        .ctly-glyph{
          display:grid; place-items:center; width:68px; height:68px; border-radius:9999px;
          background: radial-gradient(circle at 30% 30%, #eef5ff, #deebff);
          box-shadow: inset 0 2px 6px rgba(0,0,0,.06), 0 6px 10px rgba(10,31,61,.10);
        }
        .ctly-front-title{ font-size:16px; font-weight:600; color:#0A1F3D; letter-spacing:.01em; }

        .ctly-back{
          background:linear-gradient(145deg,#0074ED,#0A1F3D);
          color:#fff; transform:rotateY(180deg);
          box-shadow:inset 0 -8px 18px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.28);
        }
        .ctly-desc{ max-width: 160px; margin: 0 auto; font-size:16px; line-height:1.35; font-weight:500; }

        .ctly-node:hover .ctly-flip,
        .ctly-node.is-flipped .ctly-flip,
        .ctly-node:focus-within .ctly-flip{ transform: rotateY(180deg); }

        .ctly-flip:focus-visible{
          outline:none;
          box-shadow: 0 0 0 3px rgba(0,116,237,.22), 0 0 0 1.5px #0074ED;
        }

        @media (prefers-reduced-motion: reduce){
          .ctly-node:hover .ctly-flip{ transform:none; }
          .ctly-flip{ transition:none; }
        }

        /* ---- Tablet & Mobile ---- */
        @media (max-width: 1023.98px){
          .ctly-canvas{ aspect-ratio:auto; }
          .ctly-track{ scroll-snap-type: x proximity; }
          .ctly-node-mobile{ width: clamp(160px, 26vw, 200px); display:flex; justify-content:center; }
          .ctly-node-mobile .ctly-flip{ width: clamp(140px, 22vw, 180px); height: clamp(140px, 22vw, 180px); }

          /* Make back face same look as front on small screens */
          .ctly-back-mobile{
            background:radial-gradient(ellipse at 30% 30%, #fff 0%, #f6f7fb 55%, #edf1f7 100%);
            box-shadow:inset 0 1px 0 rgba(255,255,255,.9), inset 0 -6px 14px rgba(10,31,61,.10);
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </section>
  );
}
