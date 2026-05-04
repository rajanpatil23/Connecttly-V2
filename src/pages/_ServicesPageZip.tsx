import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/_zip/SectionLabel";
import StatsBar from "@/components/_zip/StatsBar";
import { sharedStats } from "@/components/_zip/stats-data";
import { ArrowRight, BarChart3, Megaphone, Users, Globe, PenTool, Code, Youtube, TrendingUp, MessageCircle, Search, Send } from "lucide-react";
import servicesHero from "@/assets/_zip/services-hero-person.png";
import illustrationStrategist from "@/assets/_zip/strategist-avatar.png";
import illustrationQuiz from "@/assets/_zip/services/illustration-quiz.png";
import illustrationBrief from "@/assets/_zip/services/illustration-brief.png";
import illuGoogleAds from "@/assets/_zip/services/illu-google-ads.png";
import illuMetaAds from "@/assets/_zip/services/illu-meta-ads.png";
import illuLinkedinAds from "@/assets/_zip/services/illu-linkedin-ads.png";
import illuYoutubeAds from "@/assets/_zip/services/illu-youtube-ads.png";
import illuCro from "@/assets/_zip/services/illu-cro.png";
import brandGoogleAds from "@/assets/_zip/brands/google-ads.png";
import brandMeta from "@/assets/_zip/brands/meta.png";
import brandLinkedin from "@/assets/_zip/brands/linkedin.png";
import brandYoutube from "@/assets/_zip/brands/youtube.png";
import brandGrowth from "@/assets/_zip/brands/growth.png";

const categories = ["Performance", "Social Media", "LinkedIn", "SEO", "Content", "Web & AI"];

const serviceCards = [
  { title: "Google Ads Management", desc: "Your competitors are bidding on your keywords right now. We make sure you win.", cta: "Get a Free Audit", image: illuGoogleAds, link: "/services/google-ads" },
  { title: "Meta Ads Management", desc: "3 seconds to stop the scroll. We make everyone count, and convert.", cta: "Get a Free Audit", image: illuMetaAds },
  { title: "LinkedIn Ads Management", desc: "Reach the C-suite by name, title, and company. Not by guessing.", cta: "Get a Free Audit", image: illuLinkedinAds },
  { title: "YouTube Ads Management", desc: "6 seconds before they skip. We make them stay, and act.", cta: "Get a Free Audit", image: illuYoutubeAds },
  { title: "Conversion Rate Optimisation", desc: "Same traffic. More customers. We find the leaks and fix them.", cta: "Fix My Funnel", image: illuCro },
  { title: "Performance Marketing Bundle", desc: "Every paid channel. One war room. Maximum ROI.", cta: "Explore Bundle", recommended: true },
];

const ctaCards = [
  { title: "Talk to a Strategist", desc: "Book a free 30-minute growth strategy call. We'll audit your current setup and recommend a plan.", cta: "Book a Free Call", image: illustrationStrategist },
  { title: "Take the Growth Quiz", desc: "Answer 5 quick questions and get a personalised service recommendation in under 2 minutes.", cta: "Take the Quiz", image: illustrationQuiz },
  { title: "Send Us a Brief", desc: "Share your goals, budget, and timeline. We'll come back with a custom proposal within 48 hours.", cta: "Submit a Brief", image: illustrationBrief },
];

const ServicesPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="pt-6 md:pt-10 pb-16 md:pb-20">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                Everything You Need to <span className="gradient-text">Attract, Convert, and Scale.</span>
              </h1>
              <p className="text-muted-foreground mt-4">
                36 services. 6 categories. One growth partner. Every service is built to move a number that matters to your business.
              </p>
              <div className="flex gap-3 mt-6">
                <Button className="rounded-full px-6 font-semibold">Work with us</Button>
                <Button variant="outline" className="rounded-full px-6 font-semibold">See our insights</Button>
              </div>
            </div>

            {/* Image with yellow backdrop + floating badges */}
            <div className="relative w-full max-w-[434px] mx-auto md:ml-auto md:mr-0 py-10 md:py-14">
              {/* Image in tall rectangle frame */}
              <div className="relative rounded-md overflow-hidden w-full bg-[hsl(48_100%_55%)]" style={{ aspectRatio: "434 / 659" }}>
                <img src={servicesHero} alt="Services" className="absolute inset-0 w-full h-full object-cover" width={434} height={659} />
              </div>

              {/* Floating badge: Growth Categories (top right, outside) */}
              <div className="absolute top-40 right-4 md:right-8 bg-background rounded-full shadow-[0_8px_24px_hsl(var(--foreground)/0.12)] pl-2.5 pr-4 py-1.5 flex items-center gap-2 animate-float z-10">
                <span className="text-primary font-bold text-sm">6</span>
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">Growth Categories</span>
              </div>

              {/* Floating badge: Specialized Services (upper left, overlapping image edge) */}
              <div className="absolute top-[34%] -left-4 md:-left-8 bg-primary text-primary-foreground rounded-xl shadow-[0_8px_24px_hsl(var(--primary)/0.35)] px-4 py-2.5 animate-float-slow z-10">
                <p className="text-2xl font-bold leading-none">36</p>
                <p className="text-[11px] font-medium opacity-90 mt-1 leading-tight">Specialized<br/>Services</p>
              </div>

              {/* Floating badge: All-In-One Bundles (lower-left, outside) */}
              <div className="absolute top-[62%] -left-6 md:-left-10 bg-background rounded-full shadow-[0_8px_24px_hsl(var(--foreground)/0.12)] pl-2.5 pr-4 py-1.5 flex items-center gap-2 animate-float-delay z-10">
                <span className="text-primary font-bold text-sm">6</span>
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">All-In-One Bundles</span>
              </div>

              {/* Floating badge: Results-Driven (bottom right, overlapping image) */}
              <div className="absolute bottom-16 right-4 md:right-6 bg-primary text-primary-foreground rounded-xl shadow-[0_8px_24px_hsl(var(--primary)/0.35)] px-4 py-2.5 animate-float-slow2 z-10">
                <p className="text-2xl font-bold leading-none">100%</p>
                <p className="text-[11px] font-medium opacity-90 mt-1 leading-tight">Results-Driven</p>
              </div>
            </div>
          </div>

          <StatsBar stats={sharedStats} />
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-20 bg-background">
        <div className="container-main">
          <SectionLabel label="Our Services" />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat, i) => (
              <button key={cat} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {serviceCards.map((s) =>
              s.recommended ? (
                <div key={s.title} className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-6 flex flex-col shadow-[0_10px_30px_hsl(var(--primary)/0.35)]">
                  {/* Recommended diagonal banner */}
                  <div className="absolute top-0 left-0 w-28 h-28 overflow-hidden pointer-events-none rounded-tl-2xl">
                    <div className="absolute top-5 -left-8 w-40 rotate-[-45deg] bg-white/95 text-primary text-[10px] font-bold tracking-wide text-center py-1 shadow-md">
                      Recommended
                    </div>
                  </div>
                  {/* Channel logos: 3 on top, 2 centered on bottom */}
                  <div className="mb-6 mt-8 max-w-[220px] mx-auto space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      {[brandGoogleAds, brandMeta, brandLinkedin].map((img, i) => (
                        <div key={i} className="bg-background rounded-xl p-2.5 aspect-square flex items-center justify-center shadow-md">
                          <img src={img} alt="" className="w-full h-full object-contain" loading="lazy" width={64} height={64} />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-3">
                      {[brandGrowth, brandYoutube].map((img, i) => (
                        <div key={i} className="bg-background rounded-xl p-2.5 aspect-square w-[calc((100%-1.5rem)/3)] flex items-center justify-center shadow-md">
                          <img src={img} alt="" className="w-full h-full object-contain" loading="lazy" width={64} height={64} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm opacity-90 mb-5 flex-1">{s.desc}</p>
                  <Button className="rounded-full font-semibold w-full bg-background text-primary hover:bg-background/90">
                    {s.cta}
                  </Button>
                </div>
              ) : (
                <div key={s.title} className="bg-background rounded-2xl border border-border p-5 flex flex-col shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
                  <div className="rounded-xl aspect-[4/3] mb-5 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover rounded-xl" loading="lazy" width={400} height={300} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 flex-1">{s.desc}</p>
                  <Button
                    className="rounded-full font-semibold w-full"
                    asChild={!!s.link}
                  >
                    {s.link ? <Link to={s.link}>{s.cta}</Link> : <span>{s.cta}</span>}
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Not Sure Where to Start */}
      <section className="pt-2 pb-12 md:pt-2 md:pb-16">
        <div className="container-main">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Not Sure <span className="gradient-text">Where to Start?</span>
          </h2>
          <div className="space-y-8 md:space-y-10 mt-2">
            {ctaCards.map((card, i) => (
              <div key={card.title} className={`md:flex items-center gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 max-w-sm">{card.desc}</p>
                  <Button className="rounded-full px-6 font-semibold">
                    {card.cta}
                  </Button>
                </div>
                <div className="flex-1 flex justify-center mt-8 md:mt-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    width={648}
                    height={327}
                    loading="lazy"
                    className="w-full max-w-[647.62px] h-auto md:h-[327px] object-contain"
                    style={{ aspectRatio: "647.62 / 327" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
