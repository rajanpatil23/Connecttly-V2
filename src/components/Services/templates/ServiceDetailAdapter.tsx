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
  painPoints?: ServicePainPoint[];
  impactStats?: ServiceImpactStat[];

  // Optional explicit overrides
  toolStackTitle?: string;
  toolStackDescription?: string;
  painSectionTitle?: ReactNode;
  painCta?: string;
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
    painPoints,
    impactStats,
    toolStackTitle,
    toolStackDescription,
    painSectionTitle,
    painCta,
  } = props;
  const { eyebrow, heading, description, imageSrc, ctaText, ctaLink } = heroProps;

  const heroTitle: ReactNode = eyebrow ? (
    <>
      {heading.split(" ").slice(0, -2).join(" ")}{" "}
      <span className="gradient-text">{heading.split(" ").slice(-2).join(" ")}</span>
    </>
  ) : (
    heading
  );

  // Default pain points so every page renders a consistent section
  const defaultPainPoints: ServicePainPoint[] = [
    {
      title: "You're investing budget but can't tell what's actually working.",
      desc: "Most spend goes to clicks and impressions that never convert. That's not marketing — that's guesswork.",
      icon: <MonitorSmartphone className="w-7 h-7 text-primary" />,
    },
    {
      title: "Your reports are full of numbers nobody on the leadership team understands.",
      desc: "If you can't explain ROI in one sentence, your current setup has failed you.",
      icon: <FileType2 className="w-7 h-7 text-primary" />,
    },
    {
      title: "Leads come in, but your sales team says they're the wrong fit.",
      desc: "Wrong targeting and lazy strategy = paying for leads that were never going to buy.",
      icon: <Target className="w-7 h-7 text-primary" />,
    },
  ];

  const defaultImpactStats: ServiceImpactStat[] = [
    { value: "42%", label: "Avg. CPL Reduction" },
    { value: "3.8x", label: "Return on Investment" },
    { value: "90", label: "Days to Meaningful ROI" },
    { value: "0", label: "Long-Term Lock-ins" },
  ];

  const finalPainPoints = painPoints && painPoints.length > 0 ? painPoints : defaultPainPoints;
  const finalImpactStats = impactStats && impactStats.length > 0 ? impactStats : defaultImpactStats;

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
      painSectionTitle={
        painSectionTitle ?? (
          <>
            Tired of wasting your <span className="gradient-text">{eyebrow || heading} budget?</span>
          </>
        )
      }
      painPoints={finalPainPoints}
      painCta={
        painCta ??
        `You don't have a ${eyebrow || heading} problem. You have a strategy problem. We fix that.`
      }
      impactStats={finalImpactStats}
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
