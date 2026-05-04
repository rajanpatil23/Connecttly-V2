// src/Features/free-tools/common/components/ToolCard.tsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

export function ToolCard({
  to,
  title,
  description,
  image,
  badge,
  disabled = false,
  className,
}: {
  to?: string;
  title: string;
  description: string;
  image?: string;
  /** e.g. "AI", "NEW", "BETA" */
  badge?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const showPlaceholder = !image || imageError;

  const CardInner = (
    <div
      className={cn(
        "group relative h-full rounded-2xl border border-slate-200 bg-white overflow-hidden",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
        "transition-all duration-300",
        !disabled && "hover:-translate-y-1",
        disabled && "opacity-60 pointer-events-none",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        {showPlaceholder ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileText className="h-16 w-16 text-blue-200" />
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3">
            <span className="inline-block rounded-lg bg-gradient-to-r from-[#0074ED] to-[#5B9BF8] px-3 py-1 text-[11px] font-bold text-white shadow-lg">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Button */}
        {!disabled && to && (
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-[#0074ED] text-white px-4 py-2.5 text-sm font-semibold transition-all duration-300 group-hover:shadow-lg">
            Open Tool
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {disabled && (
          <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 text-slate-500 px-4 py-2.5 text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );

  return to && !disabled ? (
    <Link to={to} className="block">
      {CardInner}
    </Link>
  ) : (
    CardInner
  );
}
