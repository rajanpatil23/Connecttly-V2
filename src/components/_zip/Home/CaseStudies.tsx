import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import edtechBrand from "@/assets/_zip/case-studies/edtech-brand.svg";
import b2bSaas from "@/assets/_zip/case-studies/b2b-saas-startup.svg";
import serviceBusiness from "@/assets/_zip/case-studies/service-business.svg";

type CaseStudy = {
  key: string;
  title: string;
  desc: string;
  image: string;
};

const CASES: CaseStudy[] = [
  {
    key: "edtech",
    title: "EdTech Brand",
    desc: "2M+ impressions generated through LinkedIn content strategy and organic growth.",
    image: edtechBrand,
  },
  {
    key: "b2b",
    title: "B2B SaaS Startup",
    desc: "Pipeline doubled with a full-funnel paid + content engine across LinkedIn and Google.",
    image: b2bSaas,
  },
  {
    key: "service",
    title: "Service Business",
    desc: "5x qualified leads through local SEO and conversion-optimised landing pages.",
    image: serviceBusiness,
  },
];

const CaseStudies = () => {
  const [activeKey, setActiveKey] = useState<string>(CASES[0].key);
  const active = CASES.find((c) => c.key === activeKey)!;

  return (
    <section className="py-16 md:py-20 bg-ct-dark">
      <div className="container-main">
        <div className="flex justify-center mb-6">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full border border-white/20 bg-white text-primary">
            Case Study
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white">
          Real <span className="gradient-text">Growth Stories</span>
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Accordion list */}
          <div className="space-y-0" onMouseLeave={() => setActiveKey(CASES[0].key)}>
            {CASES.map((c, i) => {
              const isOpen = activeKey === c.key;
              const isLast = i === CASES.length - 1;
              return (
                <div
                  key={c.key}
                  onMouseEnter={() => setActiveKey(c.key)}
                  onFocus={() => setActiveKey(c.key)}
                  tabIndex={0}
                  className={`outline-none py-4 ${isLast ? "" : "border-b border-white/10"}`}
                >
                  <h3
                    className={`font-heading font-semibold text-lg transition-colors duration-200 ${
                      isOpen ? "text-white" : "text-white/50"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-white/60">{c.desc}</p>
                      <button className="text-sm text-primary font-semibold mt-3 ml-auto flex items-center gap-1 hover:underline">
                        Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right - Image swaps based on active */}
          <div className="rounded-xl overflow-hidden bg-background aspect-[4/3] max-h-[360px] mx-auto w-full">
            <img
              key={active.key}
              src={active.image}
              alt={`${active.title} case study`}
              className="w-full h-full object-cover rounded-xl animate-fade-in"
              loading="lazy"
              width={640}
              height={480}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
