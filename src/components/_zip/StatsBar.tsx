import { CheckCircle, Users, Briefcase, Headphones } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  /** When true, renders the icon as-is without the primary background tile. */
  bareIcon?: boolean;
}

interface StatsBarProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { icon: <Briefcase className="w-5 h-5 text-primary-foreground" />, value: "70+", label: "SaaS brands served" },
  { icon: <CheckCircle className="w-5 h-5 text-primary-foreground" />, value: "98%", label: "Client satisfaction" },
  { icon: <Users className="w-5 h-5 text-primary-foreground" />, value: "500+", label: "Projects delivered" },
  { icon: <Headphones className="w-5 h-5 text-primary-foreground" />, value: "24/7", label: "Support available" },
];

const StatsBar = ({ stats = defaultStats }: StatsBarProps) => (
  <div className="mt-12 bg-ct-blue-light rounded-[2rem] px-6 md:px-10 py-6 md:py-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-start gap-0">
          {stat.bareIcon ? (
            <div className="shrink-0 flex items-center h-7 -ml-1 mt-1">{stat.icon}</div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-md">
              {stat.icon}
            </div>
          )}
          <div className="leading-tight">
            <p className="font-heading font-bold text-xl text-foreground leading-7">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StatsBar;
