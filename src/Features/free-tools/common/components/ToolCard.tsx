import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, ArrowRight } from "lucide-react";

export function ToolCard({
  to, title, description, image, badge, disabled = false, className,
}: {
  to?: string;
  title: string;
  description: string;
  image?: string;
  badge?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const showPlaceholder = !image || imageError;

  const CardInner = (
    <div className={cn(
      "group relative h-full rounded-2xl border border-border bg-background overflow-hidden",
      "shadow-[0_2px_10px_hsl(var(--foreground)/0.04)] hover:shadow-[0_8px_24px_hsl(var(--foreground)/0.08)]",
      "transition-all duration-300",
      !disabled && "hover:-translate-y-1 hover:border-primary/40",
      disabled && "opacity-60 pointer-events-none",
      className
    )}>
      <div className="relative w-full aspect-[16/9] bg-secondary overflow-hidden">
        {showPlaceholder ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileText className="h-16 w-16 text-muted-foreground/40" />
          </div>
        ) : (
          <img src={image} alt={title} className="w-full h-full object-cover"
            onError={() => setImageError(true)} loading="lazy" />
        )}
        {badge && (
          <div className="absolute top-3 right-3">
            <span className="inline-block rounded-lg bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-lg">
              {badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{description}</p>
        {!disabled && to && (
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 text-sm font-semibold transition-all">
            Open Tool
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
        {disabled && (
          <div className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-muted-foreground px-4 py-2.5 text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/50" /> Coming Soon
          </div>
        )}
      </div>
    </div>
  );

  return to && !disabled ? <Link to={to} className="block h-full">{CardInner}</Link> : CardInner;
}
