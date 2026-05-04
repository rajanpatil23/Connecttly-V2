import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/_zip/SectionLabel";
import StatsBar from "@/components/_zip/StatsBar";
import { sharedStats } from "@/components/_zip/stats-data";
import ReviewCarousel from "@/components/_zip/Home/ReviewCarousel";
import ServiceHero from "@/components/Services/ServiceHero";

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
      <ServiceHero
        eyebrow={eyebrow}
        title={heading}
        description={description}
        image={heroImage}
        imageAlt={typeof heading === "string" ? heading : eyebrow}
        primaryCtaText={primaryCtaText}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaText={secondaryCtaText}
        secondaryCtaHref={secondaryCtaHref}
        badgeTopRight={{ value: "100%", label: "Results-Driven" }}
        badgeBottomLeft={{ value: String(services.length), label: <>Specialized<br />Services</> }}
      />
      {showStatsBar && (
        <div className="container-main -mt-14 mb-8">
          <StatsBar stats={sharedStats} />
        </div>
      )}

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
