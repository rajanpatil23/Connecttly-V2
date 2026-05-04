// components/ReviewCarousel.tsx
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { EmblaOptionsType } from "embla-carousel";

type ReviewItem = {
  brand: string;
  brandLogo: string;       // URL/path
  quote: string;
  person: { name: string; title: string; avatar: string };
  bg: string;              // Tailwind bg class, e.g. "bg-[#EEF0FF]"
  ink?: string;            // Tailwind text color for content, defaults to slate-900/80
};

// Default reviews data - can be used across all pages
const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    brand: "Theeduocean",
    brandLogo: "/images/home/Review/eduoceansvg.svg",
    quote:
      "Connecttly exceeded expectations with their strategic ad campaigns. From research to budget optimization, they drove real ROI across Google, Meta, LinkedIn, and YouTube. A reliable partner in scaling performance marketing.",
    person: {
      name: "Karm Veer Singh",
      title: "Founder & CEO, Theeduocean",
      avatar: "/images/home/Review/karm-veer.jpeg",
    },
    bg: "bg-[#B8D4F7]",
    ink: "text-slate-900/80",
  },
  {
    brand: "Waaree Group",
    brandLogo: "/images/home/Review/waareegroupsvg.svg",
    quote:
      "Exploring LinkedIn Ads for the first time was seamless with Connecttly. Their insights helped me optimize my profile, generate leads, and grow with confidence. Excited to see the long-term impact!",
    person: {
      name: "Ankit Doshi",
      title: "Director, Waaree Group",
      avatar: "/images/home/Review/AnkitDoshi.jpeg",
    },
    bg: "bg-[#B8D4F7]",
    ink: "text-slate-900/80",
  },
  {
    brand: "Tech Solutions",
    brandLogo: "/images/home/Review/softwareengineersvg1.svg",
    quote:
      "Connecttly's ghostwriting and creative storytelling captured my voice authentically. They turned ideas into engaging posts that resonated with my audience. Professional, creative, and effortless to work with.",
    person: {
      name: "Ankit Pahwa",
      title: "Software Engineer",
      avatar: "/images/home/Review/ankit-pahwa.jpeg",
    },
    bg: "bg-[#B8D4F7]",
    ink: "text-slate-900/80",
  },
  {
    brand: "ActionSync",
    brandLogo: "/images/home/Review/ActionSync.svg",
    quote:
      "Partnering with Connecttly on demand generation was a game-changer. They built a strategy that attracted the right audience, nurtured leads, and strengthened our pipeline. Their precision and creativity made real impact.",
    person: {
      name: "Tushar Dublish",
      title: "Founder, ActionSync",
      avatar: "/images/home/Review/TusharDublish.jpeg",
    },
    bg: "bg-[#B8D4F7]",
    ink: "text-slate-900/80",
  },
  {
    brand: "Mending Mind",
    brandLogo: "/images/home/Review/MendingMindsvg.svg",
    quote:
      "Connecttly helped us harness AI-powered analytics to uncover insights we were missing. From dashboards to automation, they gave clarity and optimized campaigns in real time. Like having a full analytics team on demand.",
    person: {
      name: "Kinjal M Jain",
      title: "Founder, Mending Mind",
      avatar: "/images/home/Review/KinjalJain.jpeg",
    },
    bg: "bg-[#B8D4F7]",
    ink: "text-slate-900/80",
  },
  {
    brand: "Amara Teletech",
    brandLogo: "/images/home/Review/amara_teletech_svg.svg",
    quote:
      "Growing our LinkedIn page with Connecttly was transformative. They went beyond numbers—strengthening brand credibility, improving engagement, and building trust. Their strategies truly elevated our reputation.",
    person: {
      name: "Manwendrasinh Jadeja",
      title: "Founder & CEO, Amara Teletech",
      avatar: "/images/home/Review/Jadeja Amara.jpeg",
    },
    bg: "bg-[#B8D4F7]",
    ink: "text-slate-900/80",
  },
];

type Props = {
  items?: ReviewItem[];  // Now optional - will use DEFAULT_REVIEWS if not provided
  options?: EmblaOptionsType;
  noPadding?: boolean;
};

export default function ReviewCarousel({
  items = DEFAULT_REVIEWS,  // Use default reviews if not provided
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
    <section className={`${noPadding ? '' : 'py-16'} overflow-hidden bg-transparent`}>
      <div className="relative">
        {/* left/right edge fades - ONLY on desktop (hidden on mobile) */}
        <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-48 xl:w-64 z-10
                        bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-48 xl:w-64 z-10
                        bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* arrows - hidden on mobile, visible on tablet+ */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="hidden sm:inline-flex absolute left-4 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20
                     h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white
                     shadow-[0_8px_24px_rgba(2,6,23,0.10)] ring-1 ring-black/5 hover:scale-105 transition"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-slate-800" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="hidden sm:inline-flex absolute right-4 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20
                     h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white
                     shadow-[0_8px_24px_rgba(2,6,23,0.10)] ring-1 ring-black/5 hover:scale-105 transition"
        >
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-800" />
        </button>

        {/* carousel */}
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-12 px-4 sm:px-6 lg:px-8">
            {items.map((it, idx) => (
              <article
                key={idx}
                className="embla__slide shrink-0 grow-0 basis-[90%] sm:basis-[85%] md:basis-[80%] lg:basis-[75%] xl:basis-[70%] min-w-0 bg-transparent"
              >
                  <div
                    className={[
                      "rounded-2xl sm:rounded-3xl lg:rounded-[40px]",
                      "px-5 sm:px-8 lg:px-12 xl:px-16",
                      "py-8 sm:py-10 lg:py-12 xl:py-16",
                      "shadow-[0_8px_32px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.02)]",
                      "relative overflow-hidden",
                      "transition-all duration-500 ease-out",
                      selectedIndex === idx 
                        ? "scale-100 opacity-100" 
                        : "scale-90 sm:scale-95 opacity-70 sm:opacity-90",
                      it.bg,
                    ].join(" ")}
                  >
                    {/* soft inner vignette */}
                    <div className="pointer-events-none absolute inset-0
                                    [background:radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,.35),transparent_70%)]" />
                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* brand */}
                      <img
                        src={it.brandLogo}
                        alt={it.brand}
                        className="h-8 sm:h-10 lg:h-12 opacity-90"
                      />

                      {/* quote */}
                      <p
                        className={[
                          "mt-5 sm:mt-6 lg:mt-8 max-w-3xl text-base sm:text-lg lg:text-xl leading-6 sm:leading-7 lg:leading-8 font-semibold",
                          it.ink ?? "text-slate-900/80",
                        ].join(" ")}
                      >
                        {it.quote}
                      </p>

                      {/* person */}
                      <div className="mt-6 sm:mt-7 lg:mt-8 flex items-center gap-3 sm:gap-4">
                        <img
                          src={it.person.avatar}
                          alt={it.person.name}
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-white/70 shadow-sm"
                        />
                        <div className="text-left">
                          <div className="text-sm sm:text-base font-semibold text-slate-900">{it.person.name}</div>
                          <div className="text-xs sm:text-sm text-slate-700/70">{it.person.title}</div>
                        </div>
                      </div>
                    </div>
                  </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile dots indicator */}
        <div className="flex sm:hidden justify-center gap-1.5 mt-6">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={[
                "h-2 rounded-full transition-all duration-300",
                selectedIndex === idx 
                  ? "w-6 bg-slate-700" 
                  : "w-2 bg-slate-300",
              ].join(" ")}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
