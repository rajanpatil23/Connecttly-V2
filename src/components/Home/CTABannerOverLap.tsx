// components/CTABannerOverlap.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  note?: string;
};

export default function CTABannerOverlap({
  title,
  description,
  ctaText,
  ctaHref,
  note,
}: Props) {
  return (
    <div
      className="
        absolute left-1/2 bottom-0 -translate-x-1/2 
        translate-y-[30%] sm:translate-y-[30%]
        w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-6xl z-40
        px-2 sm:px-0
      "
    >
      <div
        className="
          relative isolate rounded-3xl sm:rounded-[48px] bg-white
          shadow-[0_20px_60px_rgba(2,6,23,0.15),0_8px_24px_rgba(2,6,23,0.10),0_2px_8px_rgba(2,6,23,0.08)]
          px-5 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12
          ring-1 ring-black/5
        "
      >
        <div className="flex flex-col items-center sm:items-start gap-5 sm:gap-6 lg:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-3xl text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">{description}</p>
            )}
          </div>

          <div className="w-full lg:w-auto flex items-center justify-center sm:justify-start shrink-0">
            <Button
              asChild
              className="w-full lg:w-auto h-11 sm:h-12 lg:h-14 rounded-full px-5 sm:px-6 text-sm sm:text-base text-white bg-[#3369fd] hover:bg-[#2557e8] shadow-[inset_0_-2px_0_rgba(0,0,0,.08)] transition-colors"
            >
              <a href={ctaHref} className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="font-medium">{ctaText}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
