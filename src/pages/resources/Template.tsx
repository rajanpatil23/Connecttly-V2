import * as React from "react";
import PromptCollection from "@/components/Template/PromptCollection";
import CategoryShowcase from "@/components/Template/CategoryShowcaseCTA";

/** Upward arc underline with adjustable gap and thickness */
function WavyUnderline({
  children,
  className = "",
  depth = 4,      // < 10 = upward arc
  offset = 10,    // px gap below text
  thickness = 6,  // line weight
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  offset?: number;
  thickness?: number;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        className="absolute left-0 right-0 h-3 w-full text-[#0074ED]"
        viewBox="0 0 120 18"
        preserveAspectRatio="none"
        style={{ bottom: `-${offset}px` }}
      >
        <path
          d={`M2 10 C 40 ${depth}, 80 ${depth}, 118 10`}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Renders smaller underline on mobile/tablet, thicker on desktop for the same text */
function ResponsiveUnderline({
  children,
  mobile = { depth: 3, offset: 10, thickness: 5 },
  desktop = { depth: 4, offset: 12, thickness: 6 },
}: {
  children: React.ReactNode;
  mobile?: { depth: number; offset: number; thickness: number };
  desktop?: { depth: number; offset: number; thickness: number };
}) {
  return (
    <>
      <span className="md:hidden">
        <WavyUnderline depth={mobile.depth} offset={mobile.offset} thickness={mobile.thickness}>
          {children}
        </WavyUnderline>
      </span>
      <span className="hidden md:inline">
        <WavyUnderline depth={desktop.depth} offset={desktop.offset} thickness={desktop.thickness}>
          {children}
        </WavyUnderline>
      </span>
    </>
  );
}

export default function Template() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-bold leading-tight tracking-tight text-3xl sm:text-5xl md:text-6xl">
            {/* Line 1 (always its own line on all breakpoints) */}
            <span className="block">
              <ResponsiveUnderline>Quickly Start</ResponsiveUnderline>{" "}
              with 100s of AI prompts for
            </span>

            {/* Line 2 */}
            <span className="block mt-2">
              Digital Marketing for{" "}
              <span className="relative inline-block">
                <span className="relative z-10">all</span>
                <svg
                  aria-hidden
                  className="absolute left-0 right-0 h-3 w-full text-[#0074ED]"
                  viewBox="0 0 120 18"
                  preserveAspectRatio="none"
                  style={{ bottom: "-10px" }}
                >
                  <path
                    d="M2 10 L 118 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>

            {/* Line 3 */}
            <span className="block mt-2">
              <ResponsiveUnderline
                mobile={{ depth: 3, offset: 12, thickness: 5 }}
                desktop={{ depth: 3, offset: 14, thickness: 6 }}
              >
                your needs
              </ResponsiveUnderline>
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600">
            What used to take hours can be done in minutes.
          </p>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Use these Prompts in AI modals for free to get the result you want.
          </p>

          <p className="mt-8 text-sm text-slate-500">
            <a
              href="#ai-stats"
              className="text-emerald-700 underline decoration-emerald-500/50 hover:decoration-emerald-700"
            >
              AI statistics
            </a>{" "}
            reveal that over half (53%) of companies that use AI have reported a
            reduction in response time for everyday tasks and dealing with customers.
          </p>
        </div>
      </section>

      <PromptCollection />

      <CategoryShowcase ctaHref="/resources/tools" />
    </main>
  );
}
