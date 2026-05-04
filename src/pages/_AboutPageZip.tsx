import SectionLabel from "@/components/_zip/SectionLabel";
import StatsBar from "@/components/_zip/StatsBar";
import { sharedStats } from "@/components/_zip/stats-data";
import ReviewCarousel from "@/components/_zip/Home/ReviewCarousel";
import { Button } from "@/components/ui/button";
import { Linkedin, Quote, Shield, Zap, BarChart3, Handshake, Clock, Users, Building2, GraduationCap, Building, HeartPulse, Cpu, Briefcase, RefreshCw, Code2, MessageSquare, HelpCircle, ArrowUpRight, ArrowRight } from "lucide-react";
import founderImg from "@/assets/_zip/team/neeraj-yadav.svg";
import iconTransparency from "@/assets/principles/transparency.png";
import iconAi from "@/assets/principles/ai.png";
import iconGrowth from "@/assets/principles/growth.png";
import iconTarget from "@/assets/principles/target.png";
import iconLightning from "@/assets/principles/lightning.png";
import iconHandshake from "@/assets/principles/handshake.png";
import teamImg from "@/assets/_zip/team-collab.jpg";
import testimonialImg from "@/assets/_zip/testimonial-person.jpg";
import connecttlyMark from "@/assets/_zip/connecttly-mark.svg";
import IndustriesFlow from "@/components/_zip/About/IndustriesFlow";

const aboutStats = [
  { value: "15,000+", label: "Qualified Leads Generated" },
  { value: "6+", label: "Industries Served" },
  { value: "20+", label: "Marketing Systems Automated" },
  { value: "47%", label: "Avg. CPL Reduction" },
];

const principles = [
  { title: "Radical Transparency", desc: "No black-box reporting and no hidden fees. You see exactly what we're working on, why we're doing it, and the results it's driving for your brand in real time.", icon: <img src={iconTransparency} alt="" className="w-6 h-6" /> },
  { title: "AI-First Thinking", desc: "We weave AI and automation into everything, from content to lead scoring to campaign optimisation, delivering big-agency output at startup-friendly costs every day.", icon: <img src={iconAi} alt="" className="w-6 h-6" /> },
  { title: "Continuous Optimization", desc: "Good enough is never enough. Every campaign, asset, and workflow is measured, tested, and refined relentlessly so performance compounds week after week.", icon: <img src={iconGrowth} alt="" className="w-6 h-6" /> },
  { title: "Results Over Rhetoric", desc: "We measure success in pipeline, revenue, and real growth, never vanity impressions. Every strategy we build is tied directly to a meaningful business outcome.", icon: <img src={iconTarget} alt="" className="w-6 h-6" /> },
  { title: "Speed of Execution", desc: "We move fast. Strategies never sit in decks for weeks. We plan, launch, learn, and optimise in rapid cycles because real growth simply does not wait around.", icon: <img src={iconLightning} alt="" className="w-6 h-6" /> },
  { title: "Partnership, Not Vendorship", desc: "We don't operate as an outside vendor. We embed deeply into your team, understand your business inside out, and treat your goals as if they were entirely our own.", icon: <img src={iconHandshake} alt="" className="w-6 h-6" /> },
];

const steps = [
  { num: "01", title: "Discover", desc: "We learn your business, goals, and audience." },
  { num: "02", title: "Strategize", desc: "We build a custom growth strategy tailored to you." },
  { num: "03", title: "Launch", desc: "We execute campaigns, content, and automation." },
  { num: "04", title: "Scale", desc: "We optimise and scale what works to maximise ROI." },
];

const teamMembers = [
  { name: "Raja Patil", role: "Senior Developer" },
  { name: "Divya Agrawal", role: "Account Manager & SMM" },
  { name: "Nithish Kumar", role: "UI/UX & Graphic Designer" },
  { name: "Anamika Yadav", role: "SEO Specialist" },
  { name: "Vaibhav Mohan", role: "Social Media Manager" },
  { name: "Namrata Tamse", role: "AI Generalist" },
];

const clientTypes = [
  { title: "Startups & Early-Stage Companies", desc: "You've found product-market fit and need to build a scalable, predictable lead-generation engine.", icon: <Briefcase className="w-5 h-5 text-primary" /> },
  { title: "Scaling B2B Businesses", desc: "You're growing, but your marketing hasn't kept up. You need systems, strategy, and execution to match your ambition.", icon: <RefreshCw className="w-5 h-5 text-primary" /> },
  { title: "Enterprise Teams", desc: "You need a specialized partner to handle LinkedIn growth, performance marketing, or content at scale alongside your internal team.", icon: <Building2 className="w-5 h-5 text-primary" /> },
  { title: "EdTech & Training Companies", desc: "You're building an audience and need a content strategy, paid acquisition, and brand positioning that drives enrollments.", icon: <GraduationCap className="w-5 h-5 text-primary" /> },
];

const industriesLeft = [
  { name: "SaaS & Technology", icon: <Code2 className="w-5 h-5 text-primary" /> },
  { name: "EdTech & E-Learning", icon: <GraduationCap className="w-5 h-5 text-primary" /> },
  { name: "Professional Services", icon: <Briefcase className="w-5 h-5 text-primary" /> },
];
const industriesRight = [
  { name: "Enterprise Automation", icon: <Building2 className="w-5 h-5 text-primary" /> },
  { name: "Real Estate & Co-Working", icon: <Building className="w-5 h-5 text-primary" /> },
  { name: "Healthcare & Wellness", icon: <HeartPulse className="w-5 h-5 text-primary" /> },
];

const AboutPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-main">
          <SectionLabel label="About Us" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                We Build Growth Engines for <span className="gradient-text">Ambitious Brands.</span>
              </h1>
              <p className="text-muted-foreground mt-6 leading-relaxed max-w-md">
                Connecttly is an AI-powered growth marketing agency that helps startups, scaling businesses, and enterprise teams generate demand, build authority, and turn marketing into a measurable revenue driver.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img src={teamImg} alt="Team collaborating" className="w-full h-[420px] object-cover" width={800} height={512} />
              </div>

              {/* Top-left: Qualified Leads */}
              <div className="absolute -top-4 left-6 md:left-12 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-lg animate-float">
                <p className="font-heading font-bold text-2xl leading-none">15,000+</p>
                <p className="text-xs mt-1 opacity-90 leading-tight">Qualified Leads<br />Generated</p>
              </div>

              {/* Top-right: Industries */}
              <div className="absolute top-10 -right-2 md:-right-6 bg-background rounded-full pl-3 pr-4 py-2 shadow-lg flex items-center gap-2 animate-float-slow">
                <span className="font-heading font-bold text-primary text-lg">6+</span>
                <span className="text-xs font-medium">Industries Served</span>
              </div>

              {/* Bottom-left: Marketing Systems */}
              <div className="absolute bottom-16 -left-3 md:-left-6 bg-background rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-3 animate-float-slow2">
                <span className="font-heading font-bold text-primary text-xl">20+</span>
                <span className="text-xs leading-tight">Marketing Systems<br />Automated</span>
              </div>

              {/* Bottom-right: CPL Reduction */}
              <div className="absolute -bottom-4 right-4 md:right-8 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-lg text-right animate-float-delay">
                <p className="font-heading font-bold text-2xl leading-none">47%</p>
                <p className="text-xs mt-1 opacity-90">Avg. CPL Reduction</p>
              </div>
            </div>
          </div>
          <StatsBar stats={sharedStats} />
        </div>
      </section>

      {/* Our Story */}
      <section className="pb-16 md:pb-24 bg-background">
        <div className="container-main">
          <SectionLabel label="How it started" />
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mt-4 mb-12">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={teamImg}
                alt="Connecttly team collaborating on growth strategy"
                className="w-full h-[420px] object-cover"
                loading="lazy"
                width={800}
                height={512}
              />
            </div>
            <div className="border-l-2 border-primary pl-6 text-muted-foreground space-y-4 leading-relaxed text-sm">
              <div>
                <p>Connecttly was born from a simple frustration: too many businesses were paying premium prices for marketing that didn't deliver results.</p>
                <p>Our founder, Neeraj Yadav, saw the gap firsthand, agencies that overpromised and underdelivered, strategies built on vanity metrics instead of revenue, and small businesses left behind because they couldn't afford the big-agency price tag.</p>
              </div>
              <p className="font-semibold text-foreground">So he built Connecttly to be different.</p>
              <div>
                <p>We're a growth marketing agency that operates like an extension of your team. We combine strategic thinking with hands-on execution, powered by AI and automation, to deliver marketing that actually moves the needle, more leads, more pipeline, more revenue.</p>
                <p>Based in Bengaluru and serving clients globally, we've helped 20+ brands across EdTech, SaaS, professional services, and enterprise automation build scalable growth systems from the ground up.</p>
              </div>
              <p className="font-semibold text-foreground">We don't believe in marketing for marketing's sake. If it doesn't drive growth, we don't do it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#09233C] text-white">
        <div className="container-main py-16 md:py-24 px-8 md:px-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Our Mission</h2>
          <div className="relative px-12 md:px-20 py-12 md:py-16">
            {/* Opening quote, top left */}
            <span aria-hidden className="pointer-events-none absolute left-0 -top-2 text-6xl sm:text-7xl lg:text-8xl font-heading font-bold leading-none text-white select-none">
              “
            </span>
            {/* Closing quote, bottom right */}
            <span aria-hidden className="pointer-events-none absolute right-0 -bottom-6 text-6xl sm:text-7xl lg:text-8xl font-heading font-bold leading-none text-white select-none">
              ”
            </span>
            <p className="text-center text-base md:text-xl font-heading leading-relaxed">
              To make world-class growth marketing accessible to every ambitious brand, regardless of size or budget, by combining strategy, execution, and AI-powered automation.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <SectionLabel label="What We Stand For" />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center max-w-2xl mx-auto leading-tight mt-4">
            The Principles Behind Our Work
          </h2>
          {/* Staggered 3-column grid (desktop) — matches wireframe.
                 Col 1: SHORT top (flush), TALL bottom
                 Col 2: TALL top (offset down), SHORT bottom
                 Col 3: SHORT top (flush), TALL bottom
              Heights: short ≈ 40%, tall ≈ 60% of column. Even gaps. */}
          <div className="hidden md:grid grid-cols-3 gap-6 mt-12" style={{ minHeight: 580 }}>
            {[0, 1, 2].map((col) => {
              const top = principles[col];
              const bottom = principles[col + 3];
              const topTall = col === 1; // middle column starts with tall card
              const colOffsetTop = ""; // no offset — middle column tall card fills from top
              return (
                <div key={col} className={`flex flex-col gap-6 h-full ${colOffsetTop}`}>
                  {[
                    { item: top, tall: topTall },
                    { item: bottom, tall: !topTall },
                  ].map(({ item: p, tall }) => (
                    <div
                      key={p.title}
                      className="bg-background rounded-xl border border-border hover:border-primary p-6 shadow-[14px_18px_36px_-8px_hsl(var(--foreground)/0.20)] hover:shadow-none transition-all flex flex-col justify-between"
                      style={{ flex: tall ? "8 2 0" : "5 1 0" }}
                    >
                      <div className="p-3 rounded-lg bg-ct-blue-light inline-block self-start">{p.icon}</div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg mb-2">{p.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Mobile: simple stack */}
          <div className="grid md:hidden grid-cols-1 gap-6 mt-12">
            {principles.map((p) => (
              <div
                key={p.title}
                className="bg-background rounded-xl border border-border hover:border-primary transition-colors p-6 shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]"
              >
                <div className="p-3 rounded-lg bg-ct-blue-light inline-block mb-4">{p.icon}</div>
                <h3 className="font-heading font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works, Dark Section (mirrors Home) */}
      <section className="py-16 md:py-24 bg-[#09233C]">
        <div className="container-main">
          <div className="flex justify-center mb-6">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full border border-primary/40 bg-primary/10 text-primary">
              Why Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white">
            How <span className="gradient-text">Connecttly</span> Works
          </h2>

          {/* Cards + connector arrows */}
          <div className="relative mt-16">
            <svg
              aria-hidden
              className="hidden md:block absolute inset-x-0 -top-12 w-full h-12 pointer-events-none overflow-visible"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <path d="M 16 12 Q 25 -2 34 12" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="butt" vectorEffect="non-scaling-stroke" className="animated-dash" />
              <path d="M 66 12 Q 75 -2 84 12" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="butt" vectorEffect="non-scaling-stroke" className="animated-dash" />
            </svg>
            <svg
              aria-hidden
              className="hidden md:block absolute inset-x-0 -bottom-12 w-full h-12 pointer-events-none overflow-visible"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <path d="M 41 0 Q 50 16 59 0" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="butt" vectorEffect="non-scaling-stroke" className="animated-dash" />
            </svg>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {steps.map((step) => (
                <div key={step.num} className="rounded-2xl p-6 bg-primary min-h-[210px] flex flex-col">
                  <span className="text-5xl md:text-6xl font-heading font-bold leading-none text-white">{step.num}</span>
                  <h3 className="font-heading font-semibold text-lg mt-5 text-white">{step.title}</h3>
                  {step.desc && <p className="text-xs mt-2 leading-relaxed text-white/75">{step.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pt-16 md:pt-24">
        <div className="container-main">
          <SectionLabel label="Meet the Team" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mt-4 mb-12">Meet the Team</h2>
        </div>

        {/* Founder, dark navy full-width band */}
        <div className="bg-[#09233C] text-white">
          <div className="container-main py-10 md:py-14 md:flex gap-10 items-center">
            <div className="w-full md:w-72 h-72 rounded-2xl overflow-hidden shrink-0 mb-6 md:mb-0 bg-primary">
              <img src={founderImg} alt="Neeraj Yadav" className="w-full h-full object-cover object-top" loading="lazy" width={288} height={288} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-3xl md:text-4xl font-heading font-bold">Neeraj Yadav</h3>
                <a
                  href="https://www.linkedin.com/in/neerajyadavconnecttly/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Neeraj Yadav on LinkedIn"
                  className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] bg-[#0A66C2] hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#ffffff" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
                  </svg>
                </a>
              </div>
              <p className="text-2xl md:text-3xl font-heading font-light mb-5">Founder & Growth Head</p>
              <p className="text-sm md:text-base text-white/85 leading-relaxed">
                Neeraj built Connecttly with a mission to democratize growth marketing. With deep expertise in demand generation, LinkedIn strategy, and marketing automation, he personally architects the growth strategy for every client and leads the team with a bias for speed, data, and measurable outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="container-main pt-6 pb-10 md:pb-12">
          {/* Team Grid, solid blue cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {teamMembers.map((m) => (
              <div key={m.name} className="bg-primary text-primary-foreground rounded-2xl p-5 aspect-square flex flex-col items-center justify-center text-center overflow-hidden">
                <p className="font-heading font-semibold text-sm">{m.name}</p>
                <p className="text-xs text-primary-foreground/80 mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Brands */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <SectionLabel label="Who We Work With" />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center max-w-2xl mx-auto leading-tight mt-4">
            Built for Brands <span className="gradient-text">That Want to Grow</span>
          </h2>
          {/* Desktop: 2-column staggered grid (matches wireframe).
              Col 1: SHORT top, TALL bottom
              Col 2: TALL top, SHORT bottom */}
          <div className="hidden md:grid grid-cols-2 gap-6 mt-12" style={{ minHeight: 620 }}>
            {[0, 1].map((col) => {
              const top = clientTypes[col];
              const bottom = clientTypes[col + 2];
              const topTall = col === 1; // right column starts tall
              return (
                <div key={col} className="flex flex-col gap-6 h-full">
                  {[
                    { item: top, tall: topTall },
                    { item: bottom, tall: !topTall },
                  ].map(({ item: c, tall }) => (
                    <div
                      key={c.title}
                      className="bg-background rounded-2xl border border-border hover:border-primary p-6 shadow-[14px_18px_36px_-8px_hsl(var(--foreground)/0.20)] hover:shadow-none transition-all flex flex-col justify-between"
                      style={{ flex: tall ? "8 2 0" : "5 1 0" }}
                    >
                      <div className="p-2.5 rounded-lg bg-ct-blue-light inline-flex w-fit">{c.icon}</div>
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-2">{c.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Mobile: simple stack */}
          <div className="grid md:hidden grid-cols-1 gap-6 mt-12">
            {clientTypes.map((c) => (
              <div
                key={c.title}
                className="bg-background rounded-2xl border border-border hover:border-primary transition-colors p-6 shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]"
              >
                <div className="p-2.5 rounded-lg bg-ct-blue-light inline-flex w-fit mb-4">{c.icon}</div>
                <h3 className="font-heading font-semibold text-xl mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries, hub & spoke */}
      <section className="pt-16 md:pt-20 pb-4 md:pb-6 bg-background">
        <div className="container-main">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center">
            <span className="gradient-text">Industries</span> we serve
          </h2>

          <div className="relative mt-8">
            {/* Desktop: React Flow hub-and-spoke */}
            <div className="hidden md:block">
              <IndustriesFlow />
            </div>

            {/* Mobile fallback: simple stack with hub in middle */}
            <div className="md:hidden space-y-4">
              {industriesLeft.map((ind) => (
                <div key={ind.name} className="bg-background rounded-xl border border-border/60 shadow-[0_4px_18px_hsl(var(--foreground)/0.06)] px-5 py-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-heading font-semibold leading-tight">{ind.name}</p>
                  <div className="p-2 rounded-lg bg-ct-blue-light shrink-0">{ind.icon}</div>
                </div>
              ))}
              <div className="flex justify-center py-2">
                <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.6)]">
                  <img src={connecttlyMark} alt="Connecttly" className="w-9 h-auto" />
                </div>
              </div>
              {industriesRight.map((ind) => (
                <div key={ind.name} className="bg-background rounded-xl border border-border/60 shadow-[0_4px_18px_hsl(var(--foreground)/0.06)] px-5 py-4 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-ct-blue-light shrink-0">{ind.icon}</div>
                  <p className="text-sm font-heading font-semibold leading-tight">{ind.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <SectionLabel label="Testimonials" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mt-4 mb-10">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>
        <ReviewCarousel noPadding />

        <div className="container-main">
          {/* Bottom action row */}
          <div className="mt-10 max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {[
              { icon: <MessageSquare className="w-5 h-5 text-primary" />, title: "Contact Us", desc: "Reach out to our support team for assistance anytime" },
              { icon: <HelpCircle className="w-5 h-5 text-primary" />, title: "FAQ", desc: "Get quick answers to your questions about our products and services" },
              { icon: <Users className="w-5 h-5 text-primary" />, title: "Become an Affiliate", desc: "Join our affiliate program and earn recurring commission on referrals" },
            ].map((item) => (
              <a key={item.title} href="#" className="group bg-background rounded-xl border border-border/60 shadow-[0_2px_10px_hsl(var(--foreground)/0.04)] p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-full bg-ct-blue-light flex items-center justify-center">{item.icon}</div>
                  <ArrowRight className="w-4 h-4 text-primary opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <p className="font-heading font-semibold mb-1.5">{item.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
