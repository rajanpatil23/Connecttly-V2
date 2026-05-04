import { cn } from "@/lib/utils";
import {
  IconHeart,
  IconClock,
  IconBriefcase,
  IconSchool,
  IconHome,
  IconUsers,
  IconTrendingUp,
  IconShield,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Health & Wellness",
      description:
        "Comprehensive coverage and a monthly wellness stipend for your physical and mental health.",
      icon: <IconHeart />,
    },
    {
      title: "Flexible Hours & PTO",
      description:
        "Async culture, recharge days, and generous paid time off to maintain work-life balance.",
      icon: <IconClock />,
    },
    {
      title: "Learning & Growth",
      description:
        "Annual budget of ₹1L/year, conferences, and mentorship to level up your skills.",
      icon: <IconSchool />,
    },
    {
      title: "Tools That Empower",
      description:
        "Premium hardware and best-in-class software to move fast and do your best work.",
      icon: <IconBriefcase />,
    },
    {
      title: "Remote-First Culture",
      description:
        "Work from anywhere with async-friendly processes and flexible collaboration.",
      icon: <IconHome />,
    },
    {
      title: "Inclusive Environment",
      description:
        "Diverse, supportive team culture where everyone's voice matters and contributions are valued.",
      icon: <IconUsers />,
    },
    {
      title: "Clear Growth Paths",
      description:
        "Thoughtful feedback, career development plans, and leadership that invests in your future.",
      icon: <IconTrendingUp />,
    },
    {
      title: "Job Security & Benefits",
      description:
        "Competitive compensation, comprehensive benefits, and the stability to focus on meaningful work.",
      icon: <IconShield />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-2 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#0074ED]/10 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#0074ED]/10 to-transparent pointer-events-none" />
      )}
      {/* Icon with gradient background matching About page style */}
      <div className="mb-4 relative z-10 px-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover/feature:scale-110 transition-transform duration-300">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074ED] to-[#5B9BF8] flex items-center justify-center text-white">
            {icon}
          </div>
        </div>
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-slate-200 group-hover/feature:bg-[#0074ED] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-slate-900">
          {title}
        </span>
      </div>
      <p className="text-sm text-slate-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
