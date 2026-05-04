import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { EmblaOptionsType } from "embla-carousel";
import testimonialPerson from "@/assets/_zip/testimonial-person.jpg";
import karmVeerAvatar from "@/assets/_zip/testimonials/karm-veer.jpeg";
import deepannitaAvatar from "@/assets/_zip/testimonials/deepannita-evolveu.png";
import tusharAvatar from "@/assets/_zip/testimonials/tushar-dublish.jpeg";
import kinjalAvatar from "@/assets/_zip/testimonials/kinjal-jain.jpeg";
import richikeshAvatar from "@/assets/_zip/testimonials/richikesh-kumar.jpg";
import edgeLogo from "@/assets/_zip/brands/the-edu-edge.png";
import oceanLogo from "@/assets/_zip/brands/the-edu-ocean.svg";
import actionSyncLogo from "@/assets/_zip/brands/action-sync.png";
import infosecLogo from "@/assets/_zip/brands/infosec-minds.svg";
import yttLogo from "@/assets/_zip/brands/ytt-global.svg";
import evolveuLogo from "@/assets/_zip/brands/evolveu.svg";
import mendingMindLogo from "@/assets/_zip/brands/mending-mind.svg";
import waareeLogo from "@/assets/_zip/brands/waaree-group.svg";
import ankitDoshiAvatar from "@/assets/_zip/testimonials/ankit-doshi.jpeg";

type ReviewItem = {
  brand: string;
  brandLogo: string;
  quote: string;
  person: { name: string; title: string; avatar: string };
};

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    brand: "The Edu Ocean",
    brandLogo: oceanLogo,
    quote:
      "Connecttly exceeded expectations with their strategic ad campaigns. From research to budget optimization, they drove real ROI across Google, Meta, LinkedIn, and YouTube. A reliable partner in scaling performance marketing.",
    person: { name: "Karm Veer Singh", title: "Founder & CEO, The Edu Ocean", avatar: karmVeerAvatar },
  },
  {
    brand: "EvolveU",
    brandLogo: evolveuLogo,
    quote:
      "Connecttly helped us turn LinkedIn into a real growth channel. Their content strategy, profile optimization, and ad guidance gave us clarity, consistency, and measurable traction from day one.",
    person: { name: "Deepannita C.", title: "Founder, EvolveU", avatar: deepannitaAvatar },
  },
  {
    brand: "Infosec Minds",
    brandLogo: infosecLogo,
    quote:
      "Connecttly's ghostwriting and creative storytelling captured my voice authentically. They turned ideas into engaging posts that resonated with my audience. Professional, creative, and effortless to work with.",
    person: { name: "Ankit Pahwa", title: "Software Engineer", avatar: testimonialPerson },
  },
  {
    brand: "ActionSync",
    brandLogo: actionSyncLogo,
    quote:
      "Partnering with Connecttly on demand generation was a game-changer. They built a strategy that attracted the right audience, nurtured leads, and strengthened our pipeline. Their precision and creativity made real impact.",
    person: { name: "Tushar Dublish", title: "Founder, ActionSync", avatar: tusharAvatar },
  },
  {
    brand: "Mending Mind",
    brandLogo: mendingMindLogo,
    quote:
      "Connecttly helped us harness AI-powered analytics to uncover insights we were missing. From dashboards to automation, they gave clarity and optimized campaigns in real time. Like having a full analytics team on demand.",
    person: { name: "Kinjal M Jain", title: "Founder, Mending Mind", avatar: kinjalAvatar },
  },
  {
    brand: "YTT Global",
    brandLogo: yttLogo,
    quote:
      "Growing our LinkedIn page with Connecttly was transformative. They went beyond numbers,strengthening brand credibility, improving engagement, and building trust. Their strategies truly elevated our reputation.",
    person: { name: "Manwendrasinh Jadeja", title: "Founder & CEO, YTT Global", avatar: testimonialPerson },
  },
  {
    brand: "The Edu Edge",
    brandLogo: edgeLogo,
    quote:
      "Connecttly transformed our digital presence with sharp strategy and consistent execution. Their team understood our vision, delivered creative campaigns, and helped us reach the right learners at the right time.",
    person: { name: "Richikesh Kumar", title: "CEO & Founder, The Edu Edge", avatar: richikeshAvatar },
  },
  {
    brand: "Waaree Group",
    brandLogo: waareeLogo,
    quote:
      "Exploring LinkedIn Ads for the first time was seamless with Connecttly. Their insights helped me optimize my profile, generate leads, and grow with confidence. Excited to see the long-term impact!",
    person: { name: "Ankit Doshi", title: "Director, Waaree Group", avatar: ankitDoshiAvatar },
  },
];

type Props = {
  items?: ReviewItem[];
  options?: EmblaOptionsType;
  noPadding?: boolean;
};

export default function ReviewCarousel({
  items = DEFAULT_REVIEWS,
  options = { loop: true, align: "center", containScroll: "trimSnaps" },
  noPadding = false,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className={`${noPadding ? "" : "pt-16 pb-6"} bg-transparent`}>
      <div className="relative">
        {/* edge fades */}
        <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-48 xl:w-64 z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-48 xl:w-64 z-10 bg-gradient-to-l from-background via-background/80 to-transparent" />

        {/* arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="hidden sm:inline-flex absolute left-4 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-background shadow-[0_8px_24px_hsl(var(--foreground)/0.10)] ring-1 ring-border hover:scale-105 transition"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="hidden sm:inline-flex absolute right-4 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-background shadow-[0_8px_24px_hsl(var(--foreground)/0.10)] ring-1 ring-border hover:scale-105 transition"
        >
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
        </button>

        {/* carousel */}
        <div className="overflow-visible pt-6 sm:pt-8 pb-2" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-12 px-4 sm:px-6 lg:px-8">
            {items.map((it, idx) => (
              <article
                key={idx}
                className="shrink-0 grow-0 basis-[90%] sm:basis-[85%] md:basis-[80%] lg:basis-[75%] xl:basis-[70%] min-w-0 bg-transparent"
              >
                <div
                  className={[
                    "group rounded-2xl sm:rounded-3xl lg:rounded-[40px]",
                    "px-5 sm:px-8 lg:px-12 xl:px-16",
                    "py-8 sm:py-10 lg:py-12 xl:py-16",
                    "relative overflow-hidden transition-all duration-500 ease-out",
                    "bg-card border border-border/60 hover:border-primary",
                    "shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.18),0_2px_8px_hsl(var(--foreground)/0.04)]",
                    selectedIndex === idx
                      ? "scale-100 opacity-100 ring-1 ring-primary/15"
                      : "scale-90 sm:scale-95 opacity-70 sm:opacity-90",
                  ].join(" ")}
                >
                  {/* subtle primary-tinted glow */}
                  <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_60%_at_50%_0%,hsl(var(--primary)/0.06),transparent_70%)]" />
                  {/* decorative quote mark */}
                  <div className="pointer-events-none absolute top-6 left-6 sm:top-8 sm:left-10 text-6xl sm:text-7xl lg:text-8xl font-heading font-bold leading-none text-primary/10 group-hover:text-primary/70 transition-colors duration-500 select-none">
                    “
                  </div>
                  <div className="pointer-events-none absolute bottom-2 right-6 sm:right-10 text-6xl sm:text-7xl lg:text-8xl font-heading font-bold leading-none text-primary/10 group-hover:text-primary/70 transition-colors duration-500 select-none">
                    ”
                  </div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <img src={it.brandLogo} alt={it.brand} className="h-8 sm:h-10 lg:h-12 opacity-90" />

                    <p className="mt-5 sm:mt-6 lg:mt-8 max-w-3xl text-base sm:text-lg lg:text-xl leading-6 sm:leading-7 lg:leading-8 font-medium text-foreground/85">
                      {it.quote}
                    </p>

                    <div className="mt-6 sm:mt-7 lg:mt-8 flex items-center gap-3 sm:gap-4">
                      <img
                        src={it.person.avatar}
                        alt={it.person.name}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
                      />
                      <div className="text-left">
                        <div className="text-sm sm:text-base font-heading font-semibold text-foreground">{it.person.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{it.person.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* mobile dots */}
        <div className="flex sm:hidden justify-center gap-1.5 mt-6">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={[
                "h-2 rounded-full transition-all duration-300",
                selectedIndex === idx ? "w-6 bg-foreground/70" : "w-2 bg-muted-foreground/30",
              ].join(" ")}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
