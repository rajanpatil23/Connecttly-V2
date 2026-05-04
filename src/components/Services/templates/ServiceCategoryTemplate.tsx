import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/_zip/SectionLabel";
import StatsBar from "@/components/_zip/StatsBar";
import { sharedStats } from "@/components/_zip/stats-data";
import ReviewCarousel from "@/components/_zip/Home/ReviewCarousel";

export interface CategoryServiceCard {
  title: string;
  desc: string;
  cta?: string;
  image?: string;
  link?: string;
  recommended?: boolean;
}

export interface ServiceCategoryTemplateProps {
  eyebrow: string;
  heading: ReactNode;
  description: string;
  heroImage: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  servicesEyebrow?: string;
  services: CategoryServiceCard[];
  showStatsBar?: boolean;
}

export default function ServiceCategoryTemplate({
  eyebrow,
  heading,
  description,
  heroImage,
  primaryCtaText = "Work with us",
  primaryCtaHref = "/resources/support",
  secondaryCtaText = "See our insights",
  secondaryCtaHref = "/resources/blog",
  servicesEyebrow = "Our Services",
  services,
  showStatsBar = true,
}: ServiceCategoryTemplateProps) {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="pt-6 md:pt-10 pb-16 md:pb-20">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel label={eyebrow} />
              <h1 className="mt-4 text-3xl md:text-5xl font-heading font-bold leading-tight">
                {heading}
              </h1>
              <p className="text-muted-foreground mt-4">{description}</p>
              <div className="flex gap-3 mt-6 flex-wrap">
                <Button asChild className="rounded-full px-6 font-semibold">
                  <Link to={primaryCtaHref}>{primaryCtaText}</Link>
                </Button>
                {secondaryCtaText && (
                  <Button asChild variant="outline" className="rounded-full px-6 font-semibold">
                    <Link to={secondaryCtaHref}>{secondaryCtaText}</Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="relative w-full max-w-[434px] mx-auto md:ml-auto md:mr-0 py-10 md:py-14">
              <div
                className="relative rounded-md overflow-hidden w-full bg-[hsl(48_100%_55%)]"
                style={{ aspectRatio: "434 / 659" }}
              >
                <img
                  src={heroImage}
                  alt={typeof heading === "string" ? heading : eyebrow}
                  className="absolute inset-0 w-full h-full object-cover"
                  width={434}
                  height={659}
                />
              </div>

              {/* Top right: Service count for this category */}
              <div className="absolute top-40 right-4 md:right-8 bg-background rounded-full shadow-[0_8px_24px_hsl(var(--foreground)/0.12)] pl-2.5 pr-4 py-1.5 flex items-center gap-2 animate-float-y z-10">
                <span className="text-primary font-bold text-sm">{services.length}</span>
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                  Specialised Services
                </span>
              </div>

              {/* Upper-left: Category eyebrow chip */}
              <div className="absolute top-[34%] -left-4 md:-left-8 bg-primary text-primary-foreground rounded-xl shadow-[0_8px_24px_hsl(var(--primary)/0.35)] px-4 py-2.5 animate-float-y z-10 max-w-[170px]">
                <p className="text-2xl font-bold leading-none">{services.length}</p>
                <p className="text-[11px] font-medium opacity-90 mt-1 leading-tight uppercase tracking-wide">
                  {eyebrow}
                </p>
              </div>

              {/* Lower-left: Bundle badge */}
              <div className="absolute top-[62%] -left-6 md:-left-10 bg-background rounded-full shadow-[0_8px_24px_hsl(var(--foreground)/0.12)] pl-2.5 pr-4 py-1.5 flex items-center gap-2 animate-float-y z-10">
                <span className="text-primary font-bold text-sm">1</span>
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">All-In-One Bundle</span>
              </div>

              {/* Bottom right: Results-Driven */}
              <div className="absolute bottom-16 right-4 md:right-6 bg-primary text-primary-foreground rounded-xl shadow-[0_8px_24px_hsl(var(--primary)/0.35)] px-4 py-2.5 animate-float-y z-10">
                <p className="text-2xl font-bold leading-none">100%</p>
                <p className="text-[11px] font-medium opacity-90 mt-1 leading-tight">
                  Results-Driven
                </p>
              </div>
            </div>
          </div>

          {showStatsBar && <StatsBar stats={sharedStats} />}
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-20 bg-background">
        <div className="container-main">
          <SectionLabel label={servicesEyebrow} />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center max-w-2xl mx-auto mt-4 mb-10">
            Everything you need to <span className="gradient-text">grow this channel</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) =>
              s.recommended ? (
                <div
                  key={s.title}
                  className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-6 flex flex-col shadow-[0_10px_30px_hsl(var(--primary)/0.35)]"
                >
                  <div className="absolute top-0 left-0 w-28 h-28 overflow-hidden pointer-events-none rounded-tl-2xl">
                    <div className="absolute top-5 -left-8 w-40 rotate-[-45deg] bg-white/95 text-primary text-[10px] font-bold tracking-wide text-center py-1 shadow-md">
                      Recommended
                    </div>
                  </div>
                  {s.image && (
                    <div className="rounded-xl aspect-[4/3] mb-5 overflow-hidden bg-white/10">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h3 className="font-heading font-semibold text-lg mb-2 mt-2">{s.title}</h3>
                  <p className="text-sm opacity-90 mb-5 flex-1">{s.desc}</p>
                  <Button
                    asChild
                    className="rounded-full font-semibold w-full bg-background text-primary hover:bg-background/90"
                  >
                    <Link to={s.link || "/resources/support"}>{s.cta || "Explore"}</Link>
                  </Button>
                </div>
              ) : (
                <div
                  key={s.title}
                  className="bg-background rounded-2xl border border-border p-5 flex flex-col shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]"
                >
                  {s.image && (
                    <div className="rounded-xl aspect-[4/3] mb-5 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 flex-1">{s.desc}</p>
                  <Button asChild={!!s.link} className="rounded-full font-semibold w-full">
                    {s.link ? <Link to={s.link}>{s.cta || "Learn more"}</Link> : <span>{s.cta || "Learn more"}</span>}
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-ct-section">
        <div className="container-main">
          <SectionLabel label="Testimonials" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mt-4 mb-10">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>
        <ReviewCarousel noPadding />
      </section>
    </div>
  );
}
