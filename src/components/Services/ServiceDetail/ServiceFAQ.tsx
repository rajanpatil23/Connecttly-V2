import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  accentColor?: string; // e.g., "from-blue-500 to-cyan-500"
  initialVisibleCount?: number; // Number of FAQs to show initially (default: 5)
}

/* ===== Animated Accordion Item ===== */
function AnimatedFAQItem({
  id,
  number,
  question,
  answer,
  open,
  onToggle,
  accentColor,
}: {
  id: string;
  number: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: (id: string) => void;
  accentColor: string;
}) {
  const [maxH, setMaxH] = useState<number>(0);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && innerRef.current) setMaxH(innerRef.current.scrollHeight);
  }, [open, question, answer]);

  useEffect(() => {
    const onResize = () => {
      if (open && innerRef.current) setMaxH(innerRef.current.scrollHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const handleClick = () => {
    if (innerRef.current) setMaxH(innerRef.current.scrollHeight);
    requestAnimationFrame(() => onToggle(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="faq-item rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-md"
    >
      <button
        id={`btn-${id}`}
        aria-controls={`panel-${id}`}
        aria-expanded={open}
        onClick={handleClick}
        className="faq-q group flex w-full items-center gap-4 rounded-2xl px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
      >
        <span className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br ${accentColor} text-white font-bold text-lg`}>
          {number}
        </span>
        <span className="flex-1 text-lg font-semibold text-slate-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-slate-600 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`btn-${id}`}
        className="faq-anim-wrapper overflow-hidden"
        style={{
          maxHeight: open ? maxH : 0,
          transition: "max-height .35s cubic-bezier(.2,.75,.25,1)",
        }}
      >
        <div
          ref={innerRef}
          className={`faq-a relative px-6 pb-6 pt-2 text-slate-700 ${open ? "open" : ""}`}
        >
          <div
            className={`answer-accent absolute left-6 top-2 bottom-6 w-1 rounded-full bg-gradient-to-b ${accentColor}`}
            aria-hidden
          />
          <p className="pl-6 leading-relaxed">{answer}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Got questions? We've got answers.",
  faqs,
  accentColor = "from-blue-500 to-cyan-500",
  initialVisibleCount = 5,
}: ServiceFAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const visibleFaqs = showAll ? faqs : faqs.slice(0, initialVisibleCount);
  const hasMoreThanInitial = faqs.length > initialVisibleCount;

  const handleToggleView = () => {
    if (showAll) {
      // Collapsing - scroll to top of section
      setShowAll(false);
      setOpenId(null); // Close any open FAQ
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      // Expanding
      setShowAll(true);
    }
  };

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.header>

        {/* FAQ Items */}
        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => {
            const id = slugify(faq.question);
            return (
              <AnimatedFAQItem
                key={id}
                id={id}
                number={index + 1}
                question={faq.question}
                answer={faq.answer}
                open={openId === id}
                onToggle={(i) => setOpenId((prev) => (prev === i ? null : i))}
                accentColor={accentColor}
              />
            );
          })}
        </div>

        {/* View More / View Less Button */}
        {hasMoreThanInitial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleToggleView}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-lg px-4 py-2"
            >
              {showAll ? (
                <>
                  View less
                  <ChevronUp className="h-5 w-5" />
                </>
              ) : (
                <>
                  View more
                  <ChevronDown className="h-5 w-5" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* Local styles */}
      <style>{`
        .faq-a {
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity .25s ease, transform .25s ease;
        }
        .faq-a.open {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-a,
          .faq-anim-wrapper {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
