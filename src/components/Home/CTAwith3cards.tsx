// CTAwith3cards.tsx
import { Link } from "react-router-dom";
import { MessageSquare, HelpCircle, Users, ArrowRight } from "lucide-react";

/** Brand palette */
const COLOR = {
  navy: "#0A1F3D",
  blue: "#0074ED",
  pill: "#EAF3FF", // soft blue for icon background
};

type CardProps = {
  to: string;
  title: string;
  desc: string;
  icon: "chat" | "faq" | "affiliate";
};

function IconCircle({ icon }: { icon: CardProps["icon"] }) {
  const IconComponent = icon === "chat" ? MessageSquare : icon === "faq" ? HelpCircle : Users;
  
  return (
    <span
      className="inline-flex h-11 w-11 items-center justify-center rounded-full"
      style={{ backgroundColor: COLOR.pill }}
      aria-hidden="true"
    >
      <IconComponent className="h-5 w-5" style={{ color: COLOR.blue }} />
    </span>
  );
}

function CardLink({ to, title, desc, icon }: CardProps) {
  return (
    <Link
      to={to}
      className={[
        "group relative block rounded-2xl border border-slate-200 bg-white p-6",
        "shadow-sm hover:shadow-md transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
      ].join(" ")}
    >
      {/* Corner arrow - points east initially, rotates to northeast on hover */}
      <span className="absolute right-5 top-5">
        <ArrowRight 
          className="h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-[-45deg]" 
          style={{ color: COLOR.blue }}
        />
      </span>

      <IconCircle icon={icon} />

      <h3 className="mt-4 text-lg font-semibold" style={{ color: COLOR.navy }}>{title}</h3>
      <p className="mt-2 text-[15px] leading-6 text-slate-600">{desc}</p>
    </Link>
  );
}

/** Public component */
export default function CTAwith3cards() {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <CardLink
          to="/resources/support"
          title="Contact Us"
          desc="Reach out to our support team for assistance anytime"
          icon="chat"
        />
        <CardLink
          to="/resources/faq"
          title="FAQ"
          desc="Get quick answers to your questions about our products and services"
          icon="faq"
        />
        <CardLink
          to="/resources/refer-and-earn"
          title="Become an Affiliate"
          desc="Join our affiliate program and earn recurring commission on referrals"
          icon="affiliate"
        />
      </div>
    </section>
  );
}
