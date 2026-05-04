// PublishBlock.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import * as React from "react";

type Bullet = {
  text: string;
  icon?: React.ReactNode;
  iconColor?: string;
};

type PublishBlockProps = {
  imageSrc: string;
  subLabel?: string;
  subLabelColor?: string; // CSS color
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  bullets?: Bullet[];
  showBullets?: boolean;
  bgClassName?: string; // e.g. "bg-[#dcc7ff]" or gradient classes
  rtl?: boolean;        // true: image left
};

export default function PublishBlock({
  imageSrc,
  subLabel = "PUBLISH",
  subLabelColor,
  title,
  description,
  ctaText = "Learn more",
  ctaHref = "#",
  bullets = [],
  showBullets = true,
  bgClassName = "bg-[#dcc7ff]",
  rtl = true,
}: PublishBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  // defaults for bullets
  const DEFAULT_ICON_COLOR = "#047857";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="relative group rounded-3xl">
          {/* scroll-synced background */}
          <motion.div style={{ scale: bgScale }} className={`absolute inset-0 rounded-3xl ${bgClassName}`} />

          {/* content */}
          <div className="relative rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-14 px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
              {/* Image */}
              <div className={`order-1 ${rtl ? "lg:order-1" : "lg:order-2"}`}>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={imageSrc}
                    alt=""
                    className="h-[320px] w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`order-2 ${rtl ? "lg:order-2" : "lg:order-1"}`}>
                <div
                  className={`text-[11px] font-semibold tracking-[0.16em] ${subLabelColor ? "" : "text-slate-700/80"}`}
                  style={subLabelColor ? { color: subLabelColor } : undefined}
                >
                  {subLabel}
                </div>

                <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  {title}
                </h2>

                <p className="mt-4 text-slate-700 leading-relaxed">{description}</p>

                {/* CTA before bullets */}
                <div className="mt-6">
                  <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-5 h-11">
                    <a href={ctaHref}>
                      {ctaText}
                      <ArrowRight className="ml-3 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                {showBullets && bullets.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-0.5">
                          {b.icon ?? <Check className="h-5 w-5" style={{ color: b.iconColor ?? DEFAULT_ICON_COLOR }} />}
                        </span>
                        <span className="leading-relaxed">{b.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl" />
        </div>
      </div>
    </section>
  );
}
