import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/_zip/SectionLabel";

export interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  primaryCtaOnClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  align?: "center" | "left";
  children?: ReactNode;
  meta?: ReactNode;
}

/**
 * Unified page hero matching the new service-category theme.
 * Uses semantic tokens, container-main, font-heading, gradient-text accent.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  primaryCtaText,
  primaryCtaHref,
  primaryCtaOnClick,
  secondaryCtaText,
  secondaryCtaHref,
  align = "center",
  children,
  meta,
}: PageHeroProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <section className="pt-10 md:pt-14 pb-10 md:pb-14 bg-background">
      <div className="container-main">
        <div className={`max-w-3xl ${alignCls}`}>
          {eyebrow && (
            <div className={align === "center" ? "flex justify-center" : ""}>
              <SectionLabel label={eyebrow} />
            </div>
          )}
          <h1 className="mt-4 text-4xl md:text-6xl font-heading font-bold leading-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}

          {(primaryCtaText || secondaryCtaText) && (
            <div
              className={`mt-7 flex flex-wrap gap-3 ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              {primaryCtaText &&
                (primaryCtaOnClick ? (
                  <Button
                    onClick={primaryCtaOnClick}
                    className="rounded-full px-6 font-semibold"
                  >
                    {primaryCtaText}
                  </Button>
                ) : (
                  <Button asChild className="rounded-full px-6 font-semibold">
                    <Link to={primaryCtaHref || "/resources/support"}>
                      {primaryCtaText}
                    </Link>
                  </Button>
                ))}
              {secondaryCtaText && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 font-semibold"
                >
                  {secondaryCtaHref?.startsWith("#") ? (
                    <a href={secondaryCtaHref}>{secondaryCtaText}</a>
                  ) : (
                    <Link to={secondaryCtaHref || "#"}>{secondaryCtaText}</Link>
                  )}
                </Button>
              )}
            </div>
          )}

          {meta && (
            <div className="mt-4 text-sm text-muted-foreground">{meta}</div>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
