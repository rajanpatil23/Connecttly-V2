import { Card, CardContent } from "@/components/ui/card";
import MagicBento from "../../components/Community/OpprtunitiesMagicBento";
import LazyWorldMap from "../../components/Community/LazyWorldMap";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CommunityPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    sectionRef.current && observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  return (
    <main className="relative bg-background min-h-screen">
      {/* HERO */}
      <header className="relative w-full overflow-hidden bg-[#F5F3EE] rounded-b-[40px]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-30 animate-gradient-shift rounded-b-[40px]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-40 rounded-b-[40px]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(100, 116, 139, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl text-center">
            {/* Headline */}
            <h1 className="text-[30px] leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-[44px] md:text-[60px]">
              An Ecosystem built for{" "}
              <span className="bg-gradient-to-r from-[#0074ED] to-[#5B9BF8] bg-clip-text text-transparent">
                Collaboration
              </span>
            </h1>

            {/* Supporting copy */}
            <p className="mx-auto mt-4 max-w-[56ch] text-[15px] leading-6 text-slate-600 sm:text-lg sm:leading-7 md:text-xl">
              We're reshaping how professionals build and grow online-through collaboration.
              Join conscious operators who serve, connect, and create meaningful outcomes together.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:items-center sm:justify-center">
              <button className="w-full sm:w-auto rounded-full bg-[#0074ED] hover:bg-[#0065d1] text-white px-7 py-3 font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105">
                Join Now
              </button>
              <a
                href="#opportunities"
                className="w-full sm:w-auto rounded-full border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 px-7 py-3 text-center font-semibold text-slate-700 transition-all"
              >
                Explore Opportunities
              </a>
            </div>

            {/* Stats strip */}
            <div className="mx-auto mt-7 flex flex-wrap justify-center gap-3 sm:mt-8 sm:grid sm:grid-cols-3 max-w-4xl">
              {[
                { k: "2,000+", v: "Members" },
                { k: "25+", v: "Countries" },
                { k: "20+", v: "Live Events" },
              ].map((s) => (
                <Card key={s.v} className="border-slate-200 bg-white shadow-sm text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#0074ED] to-[#5B9BF8] bg-clip-text text-transparent">{s.k}</div>
                    <div className="text-sm text-slate-600">{s.v}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Scroll cue */}
            <div className="mt-8 flex items-center justify-center text-slate-400">
              <ChevronDown className="h-6 w-6 motion-safe:animate-bounce" />
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background: linear-gradient(135deg, #dbeafe 0%, #fae8ff 50%, #fce7f3 100%);
          }
          25% {
            background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 50%, #fae8ff 100%);
          }
          50% {
            background: linear-gradient(135deg, #fae8ff 0%, #fce7f3 50%, #dbeafe 100%);
          }
          75% {
            background: linear-gradient(135deg, #fce7f3 0%, #dbeafe 50%, #e0e7ff 100%);
          }
        }
        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
        }
      `}</style>

      {/* Opportunities */}
      <section
        id="opportunities"
        ref={sectionRef}
        className="relative pt-12 pb-12 sm:pt-16 sm:pb-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <header
            className={`mb-8 text-center sm:mb-12 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Unlock Opportunities
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[15px] text-slate-600 sm:text-lg">
              Discover what makes our community special through interactive experiences.
            </p>
          </header>

          <div
            className={`flex justify-center transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <MagicBento />
          </div>
        </div>
      </section>

      {/* Global Community Map */}
      <section className="relative py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-[1152px] px-4">
          <header className="mb-8 text-center sm:mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Connect Worldwide
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[15px] text-slate-600 sm:text-lg">
              Our community spans across continents, connecting professionals from every corner of the globe.
            </p>
          </header>

          <div className="flex justify-center">
            <LazyWorldMap
              dots={[
                { start: { lat: 64.2008, lng: -149.4937, label: "Fairbanks" }, end: { lat: 34.0522, lng: -118.2437, label: "California" } },
                { start: { lat: 64.2008, lng: -149.4937, label: "Fairbanks" }, end: { lat: -15.7975, lng: -47.8919, label: "Brasília" } },
                { start: { lat: -15.7975, lng: -47.8919, label: "Brasília" }, end: { lat: 38.7223, lng: -9.1393, label: "Lisbon" } },
                { start: { lat: 51.5074, lng: -0.1278, label: "London" }, end: { lat: -0.5284, lng: 81.0946, label: "Bengaluru" } },
                { start: { lat: -0.5284, lng: 81.0946, label: "Bengaluru" }, end: { lat: 43.1332, lng: 131.9113, label: "Vladivostok" } },
                { start: { lat: -0.5284, lng: 81.0946, label: "Bengaluru" }, end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" } },
              ]}
              headquarters={{ lat: -0.5284, lng: 81.0946, label: "Bengaluru" }}
              lineColor="#0885e3"
              showLabels={true}
              animationDuration={3}
              loop={true}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
