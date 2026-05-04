import { useMemo, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DicedHeroSection } from "@/components/Career/diced-hero-section";
import { FeaturesSectionWithHoverEffects } from "@/components/Career/feature-section-with-hover-effects";
import { motion } from "framer-motion";
import { useScrollScale } from "@/hooks/useScrollScale";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Globe2,
  HeartHandshake,
  MapPin,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

// Import Tabler Icons for better variety and professional look
import {
  IconBulb,
  IconRocket,
  IconSparkles,
  IconChartBar,
  IconFileText,
  IconTarget,
  IconTrendingUp,
  IconPalette,
  IconUsers,
  IconSend,
  IconMessageCircle,
  IconClipboardCheck,
} from "@tabler/icons-react";

// Scroll-animated wrapper - scroll-based scale animation
const ScrollAnimatedSection = ({ children, bgColor }: { children: React.ReactNode; bgColor?: string }) => {
  const { ref, scale } = useScrollScale();
  
  return (
    <motion.div 
      ref={ref}
      style={{ scale }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      }}
      className="relative rounded-3xl"
    >
      {bgColor && <div className={`absolute inset-0 rounded-3xl ${bgColor}`} />}
      <div className="relative rounded-3xl">{children}</div>
    </motion.div>
  );
};

/* =========================
   Demo role data
   ========================= */
type Role = {
  id: string;
  title: string;
  dept: "Marketing" | "Creative" | "Growth" | "Analytics" | "Operations";
  location: "Remote" | "Bengaluru" | "New York";
  type: "Full-time" | "Contract" | "Internship";
  level: "Junior" | "Mid" | "Senior" | "Lead";
  summary: string;
  tags: string[];
};

const ROLES: Role[] = [
  {
    id: "pm-01",
    title: "Performance Marketing Manager",
    dept: "Marketing",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    summary:
      "Own paid social/search across Meta, Google, and YouTube. Scale profitably with rigorous testing.",
    tags: ["Meta", "Google Ads", "Experimentation"],
  },
  {
    id: "cg-01",
    title: "Content Strategist",
    dept: "Creative",
    location: "Bengaluru",
    type: "Full-time",
    level: "Mid",
    summary:
      "Plan narratives, calendars, and formats for LinkedIn, blog, and video that drive demand.",
    tags: ["Editorial", "SEO", "Storytelling"],
  },
  {
    id: "gr-01",
    title: "Growth Specialist (ABM)",
    dept: "Growth",
    location: "Remote",
    type: "Contract",
    level: "Senior",
    summary:
      "Run targeted ABM motions with tight ICPs, outreach systems, and crisp measurement.",
    tags: ["ABM", "Outbound", "ICP"],
  },
  {
    id: "an-01",
    title: "Analytics Engineer",
    dept: "Analytics",
    location: "New York",
    type: "Full-time",
    level: "Mid",
    summary:
      "Ship reliable tracking, clean models, and dashboards that make decisions obvious.",
    tags: ["GA4", "DBT", "Attribution"],
  },
  {
    id: "cr-01",
    title: "Creative Designer (Motion/Video)",
    dept: "Creative",
    location: "Remote",
    type: "Contract",
    level: "Senior",
    summary:
      "Craft premium motion pieces and short-form assets for paid + organic. Fast, on-brand, delightful.",
    tags: ["After Effects", "Short-form", "Brand"],
  },
  {
    id: "op-01",
    title: "Operations Coordinator",
    dept: "Operations",
    location: "Bengaluru",
    type: "Internship",
    level: "Junior",
    summary:
      "Keep projects humming: schedules, docs, vendor coordination, and internal comms.",
    tags: ["PM", "Documentation", "Detail-oriented"],
  },
];

/* =========================
   Filters
   ========================= */
const departments = ["All", "Marketing", "Creative", "Growth", "Analytics", "Operations"] as const;
const locations = ["All", "Remote", "Bengaluru", "New York"] as const;
const types = ["All", "Full-time", "Contract", "Internship"] as const;

export default function Careers() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<(typeof departments)[number]>("All");
  const [loc, setLoc] = useState<(typeof locations)[number]>("All");
  const [t, setT] = useState<(typeof types)[number]>("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return ROLES.filter((r) => {
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query) ||
        r.summary.toLowerCase().includes(query) ||
        r.tags.join(" ").toLowerCase().includes(query);
      const matchesDept = dept === "All" || r.dept === dept;
      const matchesLoc = loc === "All" || r.location === loc;
      const matchesType = t === "All" || r.type === t;
      return matchesQuery && matchesDept && matchesLoc && matchesType;
    });
  }, [q, dept, loc, t]);

  return (
    <div className="min-h-screen">
      {/* ========= 1) EVP hero ========= */}
      <section className="overflow-hidden bg-[#F5F3EE] rounded-b-[40px] relative">
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

        <div className="container relative z-10 mx-auto max-w-5xl px-6 py-8 sm:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm text-slate-700">
              <Sparkles className="h-4 w-4 text-[#0074ED]" />
              We're hiring - join the journey
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Build the future of{" "}
              <span className="bg-gradient-to-r from-[#0074ED] via-[#5B9BF8] to-[#0074ED] bg-clip-text text-transparent">
                performance-led growth
              </span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              At Connecttly, you'll ship work that moves the needle for real
              brands, alongside people who care deeply about craft, clarity, and
              outcomes.
            </p>
            <div className="mt-7 mb-8 sm:mb-0 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto rounded-full bg-[#0074ED] text-white hover:bg-[#0065d1]">
                <Link to="#open-roles">See open roles</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto rounded-full border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              >
                <Link to="/resources/support">Talk to recruiting</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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

{/* ========= Career Innovation Section ========= */}
<section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
  <div className="mx-auto max-w-6xl">
    <ScrollAnimatedSection bgColor="bg-[#B8DFF7]">
      <div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12">
        <DicedHeroSection
          topText="Discover"
          mainText="Innovation"
          subMainText="Unlock the future of digital growth with bold ideas and creative strategies. At Connecttly, we believe innovation is the key to standing out in a crowded market. From leveraging the latest marketing technologies to designing data-driven campaigns, we help businesses transform challenges into opportunities. Discover how innovation can drive smarter engagement, stronger visibility, and lasting impact for your brand."
          buttonText="Apply Now"
          slides={[
            {
              title: "Performance Marketing",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Creative Design",
              image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Growth Strategy",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Team Collaboration",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ]}
          onMainButtonClick={() => console.log("Main button clicked")}
          onGridImageHover={index => console.log(`Grid image ${index} hovered`)}
          onGridImageClick={index => console.log(`Grid image ${index} clicked`)}
          topTextStyle={{ 
            color: "#0A1F3D",
            fontSize: "1.2rem",
            fontWeight: "600"
          }}
          mainTextStyle={{
            fontSize: "4rem",
            color: "#0A1F3D",
          }}
          subMainTextStyle={{ 
            color: "#64748b",
            fontSize: "1.1rem"
          }}
          buttonStyle={{
            backgroundColor: "#0074ED",
            color: "#ffffff",
            borderRadius: "12px",
            hoverColor: "#0065d1",
            hoverForeground: "#ffffff",
          }}
          separatorColor="#0074ED"
          backgroundColor="transparent"
          maxContentWidth="1280px"
          mobileBreakpoint={768}
          fontFamily="system-ui, -apple-system, sans-serif"
          isRTL={false}
          centerElement={
            <img
              src="/images/shortlogo.png"
              alt="Connecttly Logo"
              style={{ width: '100px', height: '100px', borderRadius: '12px' }}
            />
          }
        />
      </div>
    </ScrollAnimatedSection>
  </div>
</section>

{/* ========= Our values - matching About page "What We Do" section exactly ========= */}
<section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
  <div className="mx-auto max-w-6xl">
    <ScrollAnimatedSection bgColor="bg-[rgb(241,241,233)]">
      <div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.14em] uppercase bg-slate-100 border border-slate-200 text-slate-700"
          >
            Our Values
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            The Principles That Guide Us
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-3 block h-1.5 w-24 rounded-full bg-gradient-to-r from-[#0074ED] to-[#5B9BF8]"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Principles that keep us fast, clear, and customer-obsessed.
          </motion.p>
        </motion.header>

        {/* Values Cards Grid - single wrapper animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            { 
              title: "Client-Centric", 
              description: "We put our clients at the center of everything we do, ensuring their success is our priority.", 
              icon: IconUsers 
            },
            { 
              title: "Results-Driven", 
              description: "We focus on delivering measurable results that directly impact your business growth.", 
              icon: IconChartBar 
            },
            { 
              title: "Innovation", 
              description: "We stay ahead of digital marketing trends to provide cutting-edge solutions.", 
              icon: IconBulb 
            },
            { 
              title: "Transparency", 
              description: "We believe in open communication and honest reporting, keeping you informed every step.", 
              icon: IconFileText 
            },
            { 
              title: "Excellence", 
              description: "We strive for excellence in every project, delivering quality that exceeds expectations.", 
              icon: IconTarget 
            },
            { 
              title: "Collaboration", 
              description: "We work as partners with our clients, fostering teamwork and shared success.", 
              icon: IconRocket 
            },
          ].map((value) => {
            const IconComponent = value.icon;
            return (
              <div key={value.title} className="group block">
                <div className="relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 text-center h-full">
                  {/* Icon with gradient background */}
                  <div className="mb-6 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </ScrollAnimatedSection>
  </div>
</section>

{/* ========= Features Section with Light Styling ========= */}
<section className="py-12 sm:py-16 bg-[#F6F8FB]">
  <div className="container relative mx-auto max-w-6xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold leading-tight md:text-4xl text-slate-900">
        Benefits & Perks
      </h2>
      <span className="mx-auto mt-3 mb-1 block h-1.5 w-16 rounded-full bg-gradient-to-r from-[#0074ED] to-[#5B9BF8]" />
      <p className="mt-0 mb-1 text-slate-600 text-lg leading-relaxed">
        Discover the benefits and opportunities that make Connecttly an exceptional place to build your career.
      </p>
    </div>
    
    <FeaturesSectionWithHoverEffects />
  </div>
</section>

      {/* ========= 4) Open roles ========= */}
      <section id="open-roles" className="relative py-16 bg-white scroll-mt-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A1F3D]">
              Open roles
            </h3>
            <span className="mx-auto mt-3 block h-1.5 w-16 rounded-full bg-[#0074ED]" />
          </div>

          {/* Filters */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-[#F6F8FB] p-4 sm:p-5 lg:p-6 shadow-sm">
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search roles, skills, or keywords…"
                    aria-label="Search open roles"
                    className="h-11 rounded-xl border-slate-200 bg-white pl-10 text-slate-900 placeholder-slate-500 shadow-sm focus-visible:ring-2 focus-visible:ring-[#0074ED]/30 focus-visible:border-[#0074ED]"
                  />
                </div>
              </div>

              <Select value={dept} onValueChange={(v) => setDept(v as any)}>
                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-2 focus:ring-[#0074ED]/30 focus:border-[#0074ED]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-auto border border-slate-200 bg-white text-slate-900 shadow-lg">
                  {departments.map((d) => (
                    <SelectItem key={d} value={d} className="focus:bg-[#F6F8FB]">
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select value={loc} onValueChange={(v) => setLoc(v as any)}>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-2 focus:ring-[#0074ED]/30 focus:border-[#0074ED]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-auto border border-slate-200 bg-white text-slate-900 shadow-lg">
                    {locations.map((l) => (
                      <SelectItem key={l} value={l} className="focus:bg-[#F6F8FB]">
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={t} onValueChange={(v) => setT(v as any)}>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-2 focus:ring-[#0074ED]/30 focus:border-[#0074ED]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-auto border border-slate-200 bg-white text-slate-900 shadow-lg">
                    {types.map((tp) => (
                      <SelectItem key={tp} value={tp} className="focus:bg-[#F6F8FB]">
                        {tp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Roles grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.length === 0 ? (
              <Card className="border-dashed border-slate-300 bg-white">
                <CardContent className="p-8 text-center">
                  <p className="text-slate-900">
                    No roles matched your filters. Try clearing or changing the filters.
                  </p>
                  <Button
                    onClick={() => {
                      setQ("");
                      setDept("All");
                      setLoc("All");
                      setT("All");
                    }}
                    className="mt-4"
                    variant="outline"
                  >
                    Reset filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filtered.map((r) => (
                <Card
                  key={r.id}
                  className="border-slate-200 bg-white shadow-sm hover:shadow-md transition"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-[19px] font-semibold text-slate-900">
                        {r.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-[#0A1F3D] text-white">
                        {r.level}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-[14px] text-slate-800">
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="h-4 w-4 text-slate-900"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 21v-4a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        {r.dept}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="h-4 w-4 text-slate-900"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {r.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="h-4 w-4 text-slate-900"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" />
                          <path d="M16 3v4" />
                          <path d="M8 3v4" />
                        </svg>
                        {r.type}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-[15px] leading-[1.75] text-slate-800">
                      {r.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="border-slate-300 bg-slate-100 text-slate-900"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                      <Button
                        asChild
                        className="w-full sm:w-auto justify-center rounded-full bg-[#0074ED] text-white hover:bg-[#0065d1] shadow-[0_8px_20px_rgba(0,116,237,.18)]"
                      >
                        <Link to={`/resources/support?role=${encodeURIComponent(r.title)}`}>
                          Apply now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Link
                        to="/resources/support"
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white text-slate-900 border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0074ED] focus-visible:ring-offset-2 focus-visible:ring-offset-white shadow-sm hover:shadow transition-colors"
                      >
                        Ask a question
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

{/* ========= 5) Our hiring process (responsive) ========= */}
<section className="py-16 bg-white">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-[#0A1F3D]">Our hiring process</h3>
      <p className="mt-2 text-slate-800 leading-relaxed">
        Clear, respectful, and fast. We value your time.
      </p>
    </div>

    {(() => {
      const STEPS = [
        { title: "Apply", desc: "Share your work & context—keep it real.", icon: <IconSend size={20} /> },
        { title: "Intro chat", desc: "30 mins to align on role and goals.", icon: <IconMessageCircle size={20} /> },
        { title: "Practical task", desc: "A scoped exercise or portfolio review.", icon: <IconClipboardCheck size={20} /> },
        { title: "Final chat", desc: "Meet leadership. Offer if we're aligned.", icon: <IconUsers size={20} /> },
      ];

      return (
        <>
          {/* Desktop / Tablet: horizontal stepper with connectors */}
          <div className="mt-8 hidden md:block">
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-0 right-0 top-7 h-0.5 bg-gradient-to-r from-slate-200 via-slate-200 to-slate-200"
              />
              <div className="grid grid-cols-4 gap-6">
                {STEPS.map((s, i) => (
                  <div key={s.title} className="relative flex flex-col items-center text-center">
                    <div className="z-10 flex items-center justify-center h-14 w-14 rounded-full bg-white ring-2 ring-[#0074ED] shadow-sm">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0074ED]/10 text-[#0074ED]">
                        {s.icon}
                      </div>
                    </div>
                    <div className="mt-4 font-semibold text-slate-900">
                      {i + 1}. {s.title}
                    </div>
                    <p className="mt-1 text-sm text-slate-700 leading-6 max-w-[28ch]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: simple card carousel */}
          <div className="mt-8 md:hidden">
            <div
              className="-mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Hiring process steps"
              role="list"
            >
              {STEPS.map((s, i) => (
                <div
                  key={s.title}
                  role="listitem"
                  className="snap-center shrink-0 w-[86%] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-[15px] font-semibold text-[#0A1F3D]">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0074ED]/10 text-[#0074ED] text-xs">
                      {i + 1}
                    </span>
                    {s.title}
                  </div>
                  <div className="mt-2 flex items-start gap-3">
                    <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-md bg-[#0074ED]/10 text-[#0074ED]">
                      {s.icon}
                    </div>
                    <p className="text-[15px] leading-6 text-slate-700">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    })()}
  </div>
</section>

      {/* ========= 6) Diversity & Inclusion + CTA ========= */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <ScrollAnimatedSection bgColor="bg-[rgb(241,241,233)]">
            <div className="px-6 sm:px-10 lg:px-14 pt-16 sm:pt-12 pb-10 sm:pb-12">
              <div className="mx-auto max-w-[1000px] text-center">
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Diversity & Inclusion
                </h3>
                <span className="mx-auto mt-3 mb-6 block h-1.5 w-16 rounded-full bg-gradient-to-r from-[#0074ED] to-[#5B9BF8]" />

                <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
                  <p className="text-slate-700 leading-relaxed">
                    We're an equal opportunity employer. We celebrate diversity and are
                    committed to creating an inclusive environment for all employees -
                    irrespective of background, identity, or life path. If you're excited
                    by the work but don't meet every requirement, we still encourage you to
                    apply.
                  </p>
                </div>

                <div className="mx-auto my-2 h-px w-16 bg-slate-200" />

                <p className="mt-2 text-slate-600">
                  We hire opportunistically for exceptional talent. Send us your portfolio or resume.
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild className="w-full sm:w-auto rounded-full bg-[#0074ED] text-white hover:bg-[#0065d1]">
                    <Link to="/resources/support">Apply to the talent network</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto rounded-full border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <Link to="#open-roles">Browse open roles</Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}
