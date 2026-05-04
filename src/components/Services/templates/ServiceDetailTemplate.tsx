import { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/_zip/SectionLabel";
import StatsBar from "@/components/_zip/StatsBar";
import { sharedStats } from "@/components/_zip/stats-data";
import ReviewCarousel from "@/components/_zip/Home/ReviewCarousel";
import ServiceHero from "@/components/Services/ServiceHero";

import { Check } from "lucide-react";

export interface ServicePainPoint {
  title: string;
  desc: string;
  icon?: ReactNode;
}
export interface ServiceWhyUs {
  title: string;
  desc: string;
  icon?: ReactNode;
}
export interface ServiceProcessStep {
  num: string;
  title: string;
  desc: string;
}
export interface ServicePricingPlan {
  name: string;
  tagline: string;
  monthlyPrice: string;
  yearlyPrice: string;
  cta: string;
  ctaHref?: string;
  popular?: boolean;
  features: string[];
}
export interface ServiceFAQItem {
  q: string;
  a: string;
}
export interface ServiceTool {
  name: string;
  logo: string;
}
export interface ServiceImpactStat {
  value: string;
  label: string;
}

export interface ServiceDetailTemplateProps {
  heroTitle: ReactNode;
  heroDescription: string;
  heroImage: string;
  heroImageAlt?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;

  painSectionTitle?: ReactNode;
  painPoints?: ServicePainPoint[];
  painCta?: ReactNode;

  impactTitle?: ReactNode;
  impactStats?: ServiceImpactStat[];

  whyUsTitle?: ReactNode;
  whyUs?: ServiceWhyUs[];

  processSteps?: ServiceProcessStep[];

  pricingPlans?: ServicePricingPlan[];

  toolStackTitle?: string;
  toolStackDescription?: string;
  toolStack?: ServiceTool[];

  faqTitle?: ReactNode;
  faqs?: ServiceFAQItem[];

  showStatsBar?: boolean;
}

export default function ServiceDetailTemplate({
  heroTitle,
  heroDescription,
  heroImage,
  heroImageAlt = "Service hero",
  primaryCtaText = "Book a Free Strategy Call",
  primaryCtaHref = "/resources/support",
  secondaryCtaText = "See Pricing",
  secondaryCtaHref = "#pricing",
  painSectionTitle,
  painPoints,
  painCta,
  impactTitle,
  impactStats,
  whyUsTitle,
  whyUs,
  processSteps,
  pricingPlans,
  toolStackTitle = "The Stack Behind Your Campaigns",
  toolStackDescription = "We leverage the best tools and platforms in the industry to deliver exceptional results.",
  toolStack,
  faqTitle,
  faqs,
  showStatsBar = true,
}: ServiceDetailTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div>
      <ServiceHero
        title={heroTitle}
        description={heroDescription}
        image={heroImage}
        imageAlt={heroImageAlt}
        primaryCtaText={primaryCtaText}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaText={secondaryCtaText}
        secondaryCtaHref={secondaryCtaHref}
        badgeTopRight={{ value: "100%", label: "Results-Driven" }}
        badgeBottomLeft={{ value: "36", label: <>Specialized<br />Services</> }}
      />
      {showStatsBar && (
        <div className="container-main -mt-14 mb-8">
          <StatsBar stats={sharedStats} />
        </div>
      )}

      {/* Pain Points */}
      {painPoints && painPoints.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-main">
            {painSectionTitle && (
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-center max-w-3xl mx-auto">
                {painSectionTitle}
              </h2>
            )}
            <div className="space-y-4 mt-10 max-w-2xl mx-auto">
              {painPoints.map((p) => (
                <div
                  key={p.title}
                  className="bg-ct-blue-light/60 rounded-2xl p-5 flex gap-5 items-center border-l-[3px] border-primary"
                >
                  {p.icon && (
                    <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center shrink-0 shadow-sm">
                      {p.icon}
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading font-semibold text-sm md:text-base mb-1.5 text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {painCta && (
              <p className="text-center mt-12 text-2xl md:text-3xl font-heading font-bold max-w-3xl mx-auto">
                {painCta}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Measured Impact */}
      {impactStats && impactStats.length > 0 && (
        <section className="relative pt-20 md:pt-24 pb-8 md:pb-10 bg-ct-section">
          <div
            className="absolute inset-x-0 top-0 h-2/3"
            style={{ backgroundColor: "#09233C" }}
            aria-hidden="true"
          />
          <div className="container-main relative">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground text-center">
              {impactTitle ?? (
                <>
                  Measured Impact. <span className="gradient-text">Proven Outcomes.</span>
                </>
              )}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mt-14 md:mt-16 max-w-5xl mx-auto">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-background rounded-2xl p-6 text-center shadow-xl flex flex-col items-center justify-center min-h-[150px]"
                >
                  <p className="text-4xl md:text-5xl font-heading font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-3 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Us */}
      {whyUs && whyUs.length > 0 && (
        <section className={`${impactStats && impactStats.length > 0 ? "pt-4 pb-16 md:pb-20" : "section-padding"} bg-ct-section`}>
          <div className="container-main">
            {!(impactStats && impactStats.length > 0) && <SectionLabel label="Why Us" />}
            {whyUsTitle && (
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mt-4">
                {whyUsTitle}
              </h2>
            )}
            <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-[1264px] mx-auto md:items-start">
              {whyUs.map((w, i) => {
                const dims =
                  i === 0
                    ? "md:max-w-[611px] md:h-[480px]"
                    : i === 3
                    ? "md:max-w-[629px] md:h-[480px]"
                    : "md:max-w-[629px] md:h-[386px]";
                const justify =
                  i === 1 || i === 3 ? "md:justify-self-end" : "md:justify-self-start";
                return (
                  <div
                    key={w.title}
                    className={`${dims} ${justify} ${i === 3 ? "md:-mt-24" : ""} w-full bg-background rounded-2xl p-8 shadow-md min-h-[260px] flex flex-col justify-end transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                  >
                    {w.icon && <div className="mb-4">{w.icon}</div>}
                    <h3 className="font-heading font-semibold text-xl mb-3">{w.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {processSteps && processSteps.length > 0 && (
        <section className="section-padding">
          <div className="container-main">
            <SectionLabel label="Our Process" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center">
              How We Get You Results
            </h2>
            <div className="max-w-2xl mx-auto mt-12 space-y-12">
              {processSteps.map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg relative z-10">
                    <span className="text-lg font-heading font-bold text-primary-foreground">
                      {step.num}
                    </span>
                  </div>
                  <div className="bg-background rounded-2xl shadow-md w-full -mt-8 pt-12 pb-8 px-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="font-heading font-semibold text-2xl">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {pricingPlans && pricingPlans.length > 0 && (
        <section id="pricing" className="section-padding bg-ct-section">
          <div className="container-main">
            <SectionLabel label="Pricing" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center">
              Choose a plan that's right for you
            </h2>
            <div className="flex items-center justify-center gap-3 mt-8">
              <span
                className={`text-sm font-medium ${
                  billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Pay Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="relative w-12 h-6 rounded-full bg-muted-foreground/30 transition-colors"
                aria-label="Toggle billing cycle"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background shadow transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : ""
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Pay Yearly
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => {
                const isPopular = plan.popular;
                return (
                  <div
                    key={plan.name}
                    className={`rounded-2xl p-7 flex flex-col shadow-lg transition-transform hover:-translate-y-1 ${
                      isPopular ? "bg-primary text-primary-foreground" : "bg-background"
                    }`}
                  >
                    <h3 className={`font-heading font-semibold text-lg ${isPopular ? "" : "text-foreground"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-2 leading-relaxed ${
                      isPopular ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      {plan.tagline}
                    </p>
                    <p className={`text-4xl font-heading font-bold mt-6 ${isPopular ? "" : "text-foreground"}`}>
                      {billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                      <span className={`text-sm font-normal ${
                        isPopular ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {" "}/ {billingCycle === "yearly" ? "Year" : "Month"}
                      </span>
                    </p>
                    <Button
                      asChild
                      className={`rounded-full font-semibold mt-6 ${
                        isPopular
                          ? "bg-background text-foreground hover:bg-background/90"
                          : "bg-background text-primary border border-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      <Link to={plan.ctaHref || "/resources/support"}>{plan.cta}</Link>
                    </Button>
                    <ul className="mt-6 space-y-3 flex-1">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className={`flex items-start gap-3 text-sm ${
                            isPopular ? "text-primary-foreground/90" : "text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isPopular ? "bg-background" : "bg-primary"
                            }`}
                          >
                            <Check
                              className={`w-3 h-3 ${
                                isPopular ? "text-primary" : "text-primary-foreground"
                              }`}
                              strokeWidth={3}
                            />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <SectionLabel label="Testimonials" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mt-4 mb-10">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>
        <ReviewCarousel noPadding />
      </section>

      {/* Tool Stack */}
      {toolStack && toolStack.length > 0 && (
        <section className="pt-10 pb-16 md:pt-12 md:pb-20 bg-ct-dark">
          <div className="container-main">
            <div className="flex justify-center mb-2">
              <SectionLabel label="Tool Stack" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground leading-tight mt-1">
                  {toolStackTitle}
                </h2>
                <p className="text-primary-foreground/70 mt-4 text-sm leading-relaxed max-w-md">
                  {toolStackDescription}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3 max-w-sm ml-auto">
                {toolStack.slice(0, 12).map((tool, i) => {
                  const col = i % 4;
                  const offset = col === 1 || col === 3 ? "translate-y-5" : "";
                  return (
                    <div key={tool.name} className={offset}>
                      <div
                        className="aspect-square rounded-2xl bg-background flex items-center justify-center shadow-lg p-3 animate-float-y"
                        style={{ animationDelay: `${i * 0.2}s` }}
                        title={tool.name}
                      >
                        <img
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="w-3/4 h-3/4 object-contain"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="section-padding">
          <div className="container-main">
            <div className="flex justify-center">
              <SectionLabel label="FAQ" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mt-4">
              {faqTitle ?? (
                <>
                  Questions <span className="gradient-text">We Get Asked</span>
                </>
              )}
            </h2>
            <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-x-8 gap-y-6 items-start">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="bg-background border border-border/60 shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.08)] self-start"
                  >
                    <button
                      className="w-full flex items-start gap-5 px-7 py-5 text-left"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span className="text-primary text-3xl font-light leading-none w-6 flex-shrink-0 flex items-center justify-center pt-1">
                        {isOpen ? "×" : "+"}
                      </span>
                      <span className="flex-1">
                        <span className="block font-heading font-semibold text-base text-foreground leading-snug">
                          {faq.q}
                        </span>
                        {isOpen && (
                          <span className="block text-sm text-muted-foreground mt-3 leading-relaxed">
                            {faq.a}
                          </span>
                        )}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
