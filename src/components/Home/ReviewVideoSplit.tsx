// src/components/ReviewVideoSplit.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

type Review = {
  id: string | number;
  headline: string;
  body: string;
  author: string;
  role: string;
  avatar?: string;
};

type VideoProps = {
  src: string;
  poster?: string;
  caption?: string;
  loop?: boolean;
  muted?: boolean;
};

type Props = {
  reviews?: Review[];
  eyebrow?: string;
  video?: VideoProps;
  autoPlayMs?: number;
  className?: string;
};

const REVIEWS: Review[] = [
  {
    id: "spendflo",
    headline: "Transforming SaaS Campaigns into Scalable Growth Stories",
    body:
      "PipeRocket Digital has grown our organic traffic 5X over eight months and their organic leads by 25% over six months. The team is prompt and involved strategically and in execution. Moreover, their in-depth understanding of SEO and consistent involvement make them a reliable partner.",
    author: "Nivas",
    role: "Head of Marketing, Spendflo",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: "hyperverge",
    headline: "Revolutionizing LinkedIn Outreach with Predictable Results",
    body:
      "Connecttly transformed our LinkedIn strategy from inconsistent outreach to a predictable lead generation machine. Within 8 weeks, we achieved repeatable processes, comprehensive reporting, and perfect message-market fit. The team integrated seamlessly with our operations, feeling like an in-house growth pod that understood our landscape.",
    author: "Sahana M.",
    role: "VP Growth, HyperVerge",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: "devtools",
    headline: "Content Strategy That Delivers Compound Growth Results",
    body:
      "Connecttly's comprehensive content approach revolutionized our digital presence through strategic carousels, engaging video content, and SEO optimization. Their systematic content creation, rigorous QA processes, and detailed analytics doubled our organic footprint while significantly reducing our paid acquisition costs. The results speak for themselves.",
    author: "Rohit K.",
    role: "Founder & CEO, DevTools Pro",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop&crop=faces",
  },
];

const VID: VideoProps = {
  src: "https://piperocket.digital/wp-content/themes/piperocket/assets/video/testimonial_piperocket.mp4",
  poster:
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  caption: "1:19 • Customer spotlight",
  loop: false,
  muted: false,
};

export default function ReviewVideoSplit({
  reviews = REVIEWS,
  eyebrow = "We helped Grow 50+ SaaS Brands Like Yours",
  video = VID,
  autoPlayMs = 7000,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [aspect, setAspect] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = reviews.length || 1;
  const go = (i: number) => setIndex(((i % total) + total) % total);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    if (paused || total <= 1) return;
    const t = setInterval(next, autoPlayMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, total, autoPlayMs]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  const onLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    const vw = v.videoWidth || 0;
    const vh = v.videoHeight || 0;
    if (vw && vh) {
      setIsPortrait(vh >= vw);
      setAspect(`${vw}/${vh}`);
    } else {
      setIsPortrait(null);
      setAspect(null);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 30) return;
    delta < 0 ? next() : prev();
  };

  const css = useMemo(
    () => `
:root{
  --brand:#0074ed;
  --text:#e8eef7;
  --muted:#9aa6b2;
  --ring: rgba(0,116,237,.35);

  --wrap-max: 72rem;
  --gap: 28px;
  --radius: 16px;

  --eyebrow: 14px;
  --headline-min: 34px;
  --headline-max: 66px;
  --body: 17px;
  --name: clamp(20px, 2vw, 22px);
  --role: clamp(14px, 1.5vw, 15px);

  --avatar: 54px;
  --dot: 6px;
  --icon: 40px;
  --pad-x: 30px;
  --pad-y: 24px;
  --rv-min-h: 480px;
}

/* split */
.rv-wrap{
  max-width: var(--wrap-max);
  width:100%;
  margin:0 auto;
  padding: 0;
  display:grid;
  grid-template-columns: 7fr 3fr;
  gap: var(--gap);
  align-items: stretch;
  color: var(--text);
}
@media (max-width:1020px){ .rv-wrap{ grid-template-columns:1fr; padding: 0; } }

/* cards */
.rv-card,.rv-videoCard{
  background: radial-gradient(120% 120% at 50% 0%, #13314f 0%, #0A1F3D 60%);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--radius);
  box-shadow: 0 14px 44px rgba(0,0,0,.35);
  position: relative;
  overflow: hidden;
}
.rv-card::before, .rv-videoCard::before {
  content: '';
  position: absolute;
  left: 12%;
  top: -18%;
  width: 224px;
  height: 224px;
  border-radius: 50%;
  background: rgba(0, 116, 237, 0.25);
  filter: blur(48px);
  pointer-events: none;
}
.rv-card::after, .rv-videoCard::after {
  content: '';
  position: absolute;
  right: 10%;
  bottom: -20%;
  width: 256px;
  height: 256px;
  border-radius: 50%;
  background: rgba(0, 116, 237, 0.2);
  filter: blur(48px);
  pointer-events: none;
}

/* left review */
.rv-card{
  position:relative;
  padding: var(--pad-y) var(--pad-x);
  min-height: var(--rv-min-h);
  overflow:hidden;
}
.rv-eyebrow{
  color:#cfd8e5;
  font-size: var(--eyebrow);
  font-weight:700;
  letter-spacing:.01em;
  margin-bottom: 16px;
}
.rv-headline{
  margin:0 0 12px 0;
  color:#fff;
  font-weight: 900;
  letter-spacing:-.015em;
  line-height: 1.06;
  font-size: clamp(var(--headline-min), 5vw, var(--headline-max));
  max-width: 34ch;
}
.rv-body{
  margin:0 0 24px 0;
  color:#d6deea;
  font-size: var(--body);
  line-height: 1.75;
  max-width: 78ch;
}

/* meta */
.rv-meta{
  display:grid;
  grid-template-columns: var(--avatar) 1fr;
  column-gap: 12px;
  row-gap: 6px;
  align-items:center;
}
.rv-avatar{
  grid-column: 1;
  grid-row: 1 / 3;
  width: var(--avatar);
  height: var(--avatar);
  border-radius:50%;
  object-fit:cover;
  border:2px solid var(--ring);
  box-shadow:0 6px 18px rgba(0,0,0,.33);
}
.rv-name{ grid-column:2; color:#fff; font-weight:900; font-size:var(--name); line-height:1.15; }
.rv-role{ grid-column:2; color:var(--muted); font-size:var(--role); margin-top:2px; }

.rv-dots{
  grid-column:2;
  display:flex;
  gap:8px;
  margin-top: 10px;
}
.rv-dot{
  width: var(--dot);
  height: var(--dot);
  border-radius:50%;
  background: rgba(255,255,255,.22);
  border:none; cursor:pointer;
}
.rv-dot[aria-current="true"]{ background: linear-gradient(90deg, var(--brand), #6ee1ff); }

/* arrows */
.rv-controls{
  position:absolute; right:16px; bottom:14px;
  display:flex; gap:10px;
}
.rv-iconBtn{
  width: var(--icon); height: var(--icon);
  border-radius:50%;
  display:grid; place-items:center;
  background: rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.14);
  color:#fff; cursor:pointer;
  transition: transform .15s ease, background .15s ease;
}
.rv-iconBtn:hover{ transform: translateY(-1px); background: rgba(255,255,255,.1); }

/* only active slide */
.rv-slide[aria-hidden="true"]{ display:none; }

/* right column */
.rv-videoCard{
  overflow:hidden;                 /* clip to rounded corners */
  display:grid;
  grid-template-rows: 1fr auto;    /* video + footer */
  min-height: var(--rv-min-h);
}

/* video area: remove all padding so video is flush */
.rv-videoWrap{
  position:relative;
  display:flex; align-items:center; justify-content:center;
  padding: 0;
}

/* inner box fills parent, no border/radius so no visual gap */
.rv-videoBox{
  width: 100%;
  aspect-ratio: 9 / 16;            /* default */
  background:#000;
  overflow:hidden;
}
.rv-videoBox[data-aspect="16/9"]{ aspect-ratio: 16 / 9; }

/* ensure no baseline gap from video element */
.rv-video{ width:100%; height:100%; object-fit:cover; display:block; }

/* footer */
.rv-videoFooter{
  display:flex; align-items:center; justify-content:space-between;
  padding: 10px 14px 14px;
  border-top:1px solid rgba(255,255,255,.08);
  background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015));
}
.rv-caption{ color:#cbd5e1; font-size:13px; }
.rv-kicker{ color:#9aa6b2; font-size:11px; }

@media (max-width:1020px){
  .rv-card{ min-height: unset; }
  .rv-videoCard{ min-height: unset; }
}
`,
    []
  );

  return (
    <section
      className={`rv-wrap ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{css}</style>

      {/* LEFT */}
      <article
        className="rv-card"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="rv-eyebrow">{eyebrow}</div>

        {reviews.map((r, i) =>
          i === index ? (
            <div key={r.id} className="rv-slide" aria-hidden={false}>
              <h2 className="rv-headline">{r.headline}</h2>
              <p className="rv-body">{r.body}</p>

              <div className="rv-meta" aria-label={`${r.author}, ${r.role}`}>
                {r.avatar ? (
                  <img className="rv-avatar" src={r.avatar} alt={`${r.author} avatar`} />
                ) : (
                  <div
                    className="rv-avatar"
                    style={{
                      display: "grid",
                      placeItems: "center",
                      background:
                        "linear-gradient(135deg, rgba(0,116,237,.25), rgba(255,255,255,.05))",
                      color: "#fff",
                      fontWeight: 900,
                    }}
                    aria-hidden="true"
                  >
                    {r.author[0]}
                  </div>
                )}
                <div className="rv-name">{r.author}</div>
                <div className="rv-role">{r.role}</div>

                <div className="rv-dots" role="tablist" aria-label="Testimonial slides">
                  {reviews.map((_, di) => (
                    <button
                      key={di}
                      className="rv-dot"
                      aria-label={`Go to slide ${di + 1}`}
                      aria-current={di === index}
                      onClick={() => go(di)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div key={r.id} className="rv-slide" aria-hidden />
          )
        )}

        <div className="rv-controls">
          <button className="rv-iconBtn" aria-label="Previous" onClick={prev}>
            <ArrowLeftIcon />
          </button>
          <button className="rv-iconBtn" aria-label="Next" onClick={next}>
            <ArrowRightIcon />
          </button>
        </div>
      </article>

      {/* RIGHT */}
      <aside className="rv-videoCard">
        <div className="rv-videoWrap">
          <div
            className="rv-videoBox"
            data-aspect={aspect ?? (isPortrait === false ? "16/9" : "9/16")}
          >
            <video
              className="rv-video"
              src={video.src}
              poster={video.poster}
              controls
              preload="metadata"
              playsInline
              loop={video.loop}
              muted={video.muted}
              onLoadedMetadata={onLoadedMetadata}
            />
          </div>
        </div>

        <div className="rv-videoFooter">
          <span className="rv-caption">{video.caption ?? "Customer Story"}</span>
          <span className="rv-kicker">Powered by Connecttly</span>
        </div>
      </aside>
    </section>
  );
}

/* icons */
function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 6.5L9 12l5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.5 6.5L15 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
