import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  ShoppingCart,
  GraduationCap,
  Factory,
  Stethoscope,
  PieChart,
  Shield,
  Users,
} from "lucide-react";

/* =================== INDUSTRIES =================== */
type Industry = {
  name: string;
  desc: string;
  icon: any;
  bgColor: string;
};

const industries: Industry[] = [
  { name: "SaaS & B2B", desc: "PLG, enterprise, subscriptions", icon: PieChart, bgColor: "bg-[#B8D4F7]" },
  { name: "E-commerce", desc: "D2C, marketplaces, funnels", icon: ShoppingCart, bgColor: "bg-[#B8D4F7]" },
  { name: "Fintech", desc: "Lending, payments, KYC funnels", icon: Shield, bgColor: "bg-[#B8D4F7]" },
  { name: "Healthcare", desc: "Clinics, apps, patient funnels", icon: Stethoscope, bgColor: "bg-[#B8D4F7]" },
  { name: "EdTech", desc: "Cohorts, LMS, lead nurture", icon: GraduationCap, bgColor: "bg-[#B8D4F7]" },
  { name: "Manufacturing", desc: "Dealer leads, portals, CRM", icon: Factory, bgColor: "bg-[#B8D4F7]" },
  { name: "Real Estate", desc: "Listings, broker ops, leads", icon: Building2, bgColor: "bg-[#B8D4F7]" },
  { name: "Consumer Apps", desc: "Acquisition & retention", icon: Users, bgColor: "bg-[#B8D4F7]" },
];

function IndustryCard({ item }: { item: Industry }) {
  const Icon = item.icon;
  return (
    <div className={`shrink-0 w-[240px] sm:w-[280px] md:w-[320px] rounded-2xl border border-slate-200 ${item.bgColor} shadow-lg overflow-hidden text-center flex flex-col items-center justify-center px-6 pt-6 pb-8 hover:shadow-xl transition-shadow`}>
      <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] shadow-md">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 leading-tight">{item.name}</h3>
      <p className="mt-1.5 text-sm text-slate-600">{item.desc}</p>
    </div>
  );
}

/* ============== Marquee ============== */
function Marquee({
  children,
  speed = 110,
  duration,
  gap = 24,
  fade = true,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  duration?: number;
  gap?: number;
  fade?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const xRef = useRef(0);
  const lastTRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const contentWRef = useRef(0);
  const reqRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (!contentRef.current) return;
      contentWRef.current = contentRef.current.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const tick = (t: number) => {
      if (!trackRef.current) {
        reqRef.current = requestAnimationFrame(tick);
        return;
      }
      if (lastTRef.current == null) lastTRef.current = t;
      const dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;

      if (!pausedRef.current && contentWRef.current > 0) {
        const pxPerSec = duration && duration > 0 ? contentWRef.current / duration : speed;
        xRef.current -= pxPerSec * dt;
        if (xRef.current <= -contentWRef.current) {
          xRef.current += contentWRef.current;
        }
        trackRef.current.style.transform = `translate3d(${xRef.current}px,0,0)`;
      }
      reqRef.current = requestAnimationFrame(tick);
    };
    reqRef.current = requestAnimationFrame(tick);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [speed, duration]);

  const onEnter = () => (pausedRef.current = true);
  const onLeave = () => (pausedRef.current = false);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={
        fade
          ? {
              maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }
          : undefined
      }
    >
      <div ref={trackRef} className="will-change-transform flex flex-nowrap" style={{ columnGap: `${gap}px` }}>
        <div ref={contentRef} className="flex flex-nowrap" style={{ columnGap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex flex-nowrap" style={{ columnGap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ============== Main Component ============== */
export default function IndustriesMarquee() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Expertise Across Industries
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          We've shipped growth programs across SaaS, ecommerce, fintech, healthcare, and more.
        </p>
      </motion.div>

      <div className="mt-10">
        <Marquee speed={80} gap={24} fade>
          {industries.map((it) => (
            <IndustryCard key={it.name} item={it} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
