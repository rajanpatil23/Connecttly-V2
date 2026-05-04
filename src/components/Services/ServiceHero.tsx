import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/_zip/SectionLabel";

export interface ServiceHeroBadge {
  value: string;
  label: ReactNode;
}

export interface ServiceHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badgeTopRight?: ServiceHeroBadge;
  badgeBottomLeft?: ServiceHeroBadge;
}

export default function ServiceHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "Service hero",
  primaryCtaText = "Book a Free Strategy Call",
  primaryCtaHref = "/resources/support",
  secondaryCtaText = "See Pricing",
  secondaryCtaHref = "#pricing",
  badgeTopRight = { value: "100%", label: "Results-Driven" },
  badgeBottomLeft,
}: ServiceHeroProps) {
  return (
    <section className="pt-10 md:pt-16 pb-12 md:pb-16">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: content */}
          <div className="text-left">
            {eyebrow && <SectionLabel label={eyebrow} />}
            <h1 className={`${eyebrow ? "mt-4" : ""} text-3xl md:text-5xl font-heading font-bold leading-tight`}>
              {title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-xl">
              {description}
            </p>
            <div className="flex gap-3 mt-6 flex-wrap">
              <Button asChild className="rounded-full px-6 font-semibold">
                <Link to={primaryCtaHref}>{primaryCtaText}</Link>
              </Button>
              {secondaryCtaText && (
                <Button asChild variant="outline" className="rounded-full px-6 font-semibold">
                  {secondaryCtaHref?.startsWith("#") ? (
                    <a href={secondaryCtaHref}>{secondaryCtaText}</a>
                  ) : (
                    <Link to={secondaryCtaHref || "#"}>{secondaryCtaText}</Link>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative w-full flex items-center justify-center">
            <div className="relative w-full max-w-[460px] mx-auto">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-auto object-contain"
                width={700}
                height={560}
              />
              {badgeTopRight && (
                <div
                  className="absolute -right-2 md:-right-4 top-6 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-xl text-center animate-float-y"
                  style={{ animationDelay: "0s" }}
                >
                  <p className="font-heading font-bold text-xl leading-none">{badgeTopRight.value}</p>
                  <p className="text-[10px] font-medium mt-1 opacity-90 leading-tight">{badgeTopRight.label}</p>
                </div>
              )}
              {badgeBottomLeft && (
                <div
                  className="absolute -left-2 md:left-0 bottom-6 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-xl text-center animate-float-y"
                  style={{ animationDelay: "1.5s" }}
                >
                  <p className="font-heading font-bold text-xl leading-none">{badgeBottomLeft.value}</p>
                  <p className="text-[10px] font-medium mt-1 opacity-90 leading-tight">{badgeBottomLeft.label}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
