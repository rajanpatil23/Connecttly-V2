// components/WhyChoose.tsx
import { ComponentType } from "react";
import { motion } from "framer-motion";

type IconType = ComponentType<{ className?: string }>;

export type WhyChooseItem = {
  icon: IconType;          // lucide-react or any React icon
  title: string;
  desc: string;
  tint?: string;
  stroke?: string;
  tone?: string;
  color?: string;
  [key: string]: any;
};

type Props = {
  items: WhyChooseItem[];
  eyebrow?: string;
  heading?: string;
  className?: string;
  eyebrowColor?: string;
  noPadding?: boolean;
  noCard?: boolean;
  noContainer?: boolean;
};

export default function WhyChoose({
  items,
  eyebrow = "WHY CHOOSE US",
  heading = "The Connectlty Edge",
  className = "",
  eyebrowColor = "#2F5D62",
  noPadding = false,
  noCard = false,
  noContainer = false,
}: Props) {
  // Fixed bluish color scheme - cycles through 6 combinations
  const colorSchemes = [
    { tint: "#E6F7FB", stroke: "#0EA5E9" },  // Sky blue
    { tint: "#E6F0FF", stroke: "#1677ff" },  // Primary blue
    { tint: "#EFF6FF", stroke: "#3B82F6" },  // Blue
    { tint: "#DBEAFE", stroke: "#60A5FA" },  // Light blue
    { tint: "#E0F2FE", stroke: "#0284C7" },  // Cyan blue
    { tint: "#F0F9FF", stroke: "#0EA5E9" },  // Very light blue
  ];

  const content = (
    <div className={noCard ? `` : `rounded-3xl ${className || 'bg-[#F6F7F4]'} border border-black/5 shadow-sm p-6 md:p-10`}>
      {eyebrow && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs sm:text-[11px] font-semibold tracking-[0.14em] uppercase mb-3" 
          style={{ color: `${eyebrowColor}` }}
        >
          {eyebrow}
        </motion.p>
      )}
      {heading && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A1F3D] mb-8 sm:mb-10"
        >
          {heading}
        </motion.h2>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.6, 
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
      >
        {items.map(({ icon: Icon, title, desc }, index) => {
          const { tint, stroke } = colorSchemes[index % colorSchemes.length];
          
          return (
            <div 
              key={title} 
              className="flex items-start gap-3 sm:gap-4"
            >
              <div className="relative shrink-0">
                <span
                  className="absolute -z-10 -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full"
                  style={{ backgroundColor: tint }}
                />
                <div
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-white flex items-center justify-center"
                  style={{ border: `1px solid ${stroke}22`, color: stroke }}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-[17px] md:text-[18px] font-semibold text-[#132238]">{title}</h3>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );

  if (noPadding) {
    return noContainer ? content : (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    );
  }

  return (
    <section className="py-16">
      {noContainer ? (
        content
      ) : (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {content}
        </div>
      )}
    </section>
  );
}
