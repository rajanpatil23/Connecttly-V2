import { ReactNode } from "react";
import { MonitorSmartphone, FileType2, Target } from "lucide-react";
import ServiceDetailTemplate, {
  ServicePricingPlan,
  ServiceFAQItem,
  ServiceTool,
  ServiceProcessStep,
  ServiceWhyUs,
  ServicePainPoint,
  ServiceImpactStat,
} from "./ServiceDetailTemplate";

// Existing shapes used across the 36 service pages
export interface ExistingPlan {
  title: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  ctaText: string;
  ctaHref?: string;
  isFeatured?: boolean;
}
export interface ExistingFAQ {
  question: string;
  answer: string;
}
export interface ExistingTool {
  name: string;
  logo: string;
}
export interface ExistingProcessStep {
  step: string;
  title: string;
  description: string;
}
export interface ExistingWhyItem {
  icon?: any;
  title: string;
  desc: string;
  tint?: string;
  stroke?: string;
}

export interface HeroProps {
  eyebrow?: string;
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ServiceDetailAdapterProps {
  heroProps: HeroProps;

  // Data
  plans?: ExistingPlan[];
  faqs?: ExistingFAQ[];
  tools?: ExistingTool[];
  processSteps?: ExistingProcessStep[];
  whyItems?: ExistingWhyItem[];

  // Optional explicit overrides
  toolStackTitle?: string;
  toolStackDescription?: string;
}

const toCurrency = (n: number) => {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `$${n}`;
};

export default function ServiceDetailAdapter(props: ServiceDetailAdapterProps) {
  const {
    heroProps,
    plans,
    faqs,
    tools,
    processSteps,
    whyItems,
    toolStackTitle,
    toolStackDescription,
  } = props;
  const { eyebrow, heading, description, imageSrc, imageAlt, ctaText, ctaLink } = heroProps;

  const heroTitle: ReactNode = eyebrow ? (
    <>
      {heading.split(" ").slice(0, -2).join(" ")}{" "}
      <span className="gradient-text">{heading.split(" ").slice(-2).join(" ")}</span>
    </>
  ) : (
    heading
  );

  const mappedPlans: ServicePricingPlan[] | undefined = plans?.map((p) => ({
    name: p.title,
    tagline: p.description,
    monthlyPrice: toCurrency(p.price.monthly),
    yearlyPrice: toCurrency(Math.round(p.price.yearly / 12)),
    cta: p.ctaText,
    ctaHref: p.ctaHref,
    popular: p.isFeatured,
    features: p.features,
  }));

  const mappedFaqs: ServiceFAQItem[] | undefined = faqs?.map((f) => ({
    q: f.question,
    a: f.answer,
  }));

  const mappedTools: ServiceTool[] | undefined = tools?.map((t) => ({
    name: t.name,
    logo: t.logo,
  }));

  const mappedSteps: ServiceProcessStep[] | undefined = processSteps?.map((s) => ({
    num: s.step,
    title: s.title,
    desc: s.description,
  }));

  const mappedWhy: ServiceWhyUs[] | undefined = whyItems?.map((w) => {
    const Icon = w.icon;
    return {
      title: w.title,
      desc: w.desc,
      icon: Icon ? <Icon className="w-6 h-6 text-primary" /> : undefined,
    };
  });

  return (
    <ServiceDetailTemplate
      heroTitle={heroTitle}
      heroDescription={description}
      heroImage={imageSrc}
      heroImageAlt={heading}
      primaryCtaText={ctaText || "Book a Free Strategy Call"}
      primaryCtaHref={ctaLink || "/resources/support"}
      pricingPlans={mappedPlans}
      faqs={mappedFaqs}
      toolStack={mappedTools}
      toolStackTitle={toolStackTitle}
      toolStackDescription={toolStackDescription}
      processSteps={mappedSteps}
      whyUs={mappedWhy}
      whyUsTitle={
        <>
          Why Choose Us for <span className="gradient-text">{eyebrow || heading}</span>
        </>
      }
    />
  );
}
