import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Home, 
  Info, 
  Briefcase, 
  BookOpen,
  TrendingUp,
  Linkedin,
  Palette,
  Zap,
  BarChart3,
  Award,
  FileText,
  Lightbulb,
  Wrench,
  Eye,
  Users,
  Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ========= ONE PLACE TO CHANGE YOUR LOGO =========
   Update the import path below to your actual file.
   You can also replace with a string path if you prefer.
*/
import brandLogo from "../Home/Images/Connecttly_final_logo.png";
const LOGO_SRC = brandLogo;
const LOGO_ALT = "Connecttly";
/* ================================================ */

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const serviceCategories = [
    { name: "Performance Marketing", path: "/services/performance-marketing" },
    { name: "LinkedIn Growth", path: "/services/linkedin-growth" },
    { name: "Content & Creative", path: "/services/content-creative" },
    { name: "Growth & Demand Generation", path: "/services/growth-demand-generation" },
    { name: "Analytics & AI", path: "/services/analytics-ai" },
    { name: "Brand & Reputation", path: "/services/brand-reputation" },
  ];

  const resources = [
    { name: "Blog", path: "/resource/blog" },
    { name: "Free Tools", path: "/resources/free-tools" },
    { name: "Templates", path: "/resources/templates" },
    { name: "Community", path: "/resources/community" },
    { name: "Our Insights", path: "/resources/insights" },
    { name: "Support", path: "/resources/support" },
  ];

  const isActive = (p: string) =>
    location.pathname === p || location.pathname.startsWith(p + "/");

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90",
        "border-gray-200 text-[#0A1F3D]"
      )}
    >
      <div className="container flex h-16 items-center">
        {/* Logo (desktop) */}
        <Link to="/" className="mr-4 flex items-center space-x-2" aria-label="Home">
          <img
            src={LOGO_SRC}
            alt={LOGO_ALT}
            className="h-11 w-auto select-none"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </Link>

        {/* Desktop Navigation (unchanged) */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn("nav-link", isActive("/") && "nav-link--active")}
              >
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn("nav-link", isActive("/about") && "nav-link--active")}
              >
                <Link to="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Services — plain text trigger */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "nav-link nav-trigger-plain",
                  "bg-transparent hover:bg-transparent focus:bg-transparent",
                  "data-[state=open]:bg-transparent"
                )}
              >
                <span className="inline-flex items-center gap-1">Services</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[520px] p-6 bg-white border border-gray-200 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      {serviceCategories.slice(0, 3).map((s) => (
                        <NavigationMenuLink key={s.path} asChild className="menu-tile">
                          <Link to={s.path}>
                            <div className="text-sm font-medium leading-none text-[#0A1F3D]">{s.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {serviceCategories.slice(3, 6).map((s) => (
                        <NavigationMenuLink key={s.path} asChild className="menu-tile">
                          <Link to={s.path}>
                            <div className="text-sm font-medium leading-none text-[#0A1F3D]">{s.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/services"
                      className="flex w-full select-none justify-center rounded-lg bg-[#3369fd] p-3 text-sm font-medium text-white transition-colors hover:bg-[#2557e8] focus:outline-none focus:ring-2 focus:ring-[#3369fd]/20"
                    >
                      All Services
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Resources — plain text trigger */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "nav-link nav-trigger-plain",
                  "bg-transparent hover:bg-transparent focus:bg-transparent",
                  "data-[state=open]:bg-transparent"
                )}
              >
                <span className="inline-flex items-center gap-1">Resources</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[520px] p-6 bg-white border border-gray-200 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {resources.slice(0, 3).map((r) => (
                        <NavigationMenuLink key={r.path} asChild className="menu-tile">
                          <Link to={r.path}>
                            <div className="text-sm font-medium leading-none text-[#0A1F3D]">{r.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {resources.slice(3, 6).map((r) => (
                        <NavigationMenuLink key={r.path} asChild className="menu-tile">
                          <Link to={r.path}>
                            <div className="text-sm font-medium leading-none text-[#0A1F3D]">{r.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="ml-auto hidden lg:flex">
          <Button
            asChild
            className="rounded-full bg-[#3369fd] hover:bg-[#2557e8] text-white shadow-[0_10px_24px_rgba(51,105,253,.25)] px-6"
          >
            <Link to="/resources/support" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1F3D]/40"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu - Collapses from TOP */}
      <div
        className={cn(
          "lg:hidden fixed left-0 right-0 top-16 z-[60]",
          "bg-white border-b border-gray-200 shadow-lg",
          "transition-all duration-300 ease-out",
          isMobileMenuOpen 
            ? "max-h-[calc(100vh-4rem)] opacity-100" 
            : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <nav className="overflow-y-auto max-h-[calc(100vh-4rem)] px-4 py-3">
          <MobileItem to="/" label="Home" active={isActive("/")} icon={Home} />
          <MobileItem to="/about" label="About" active={isActive("/about")} icon={Info} />

          <MobileGroup
            label="Services"
            open={openServices}
            onToggle={() => setOpenServices((v) => !v)}
            icon={Briefcase}
          >
            <MobileSubItem to="/services/performance-marketing" label="Performance Marketing" icon={TrendingUp} />
            <MobileSubItem to="/services/linkedin-growth" label="LinkedIn Growth" icon={Linkedin} />
            <MobileSubItem to="/services/content-creative" label="Content & Creative" icon={Palette} />
            <MobileSubItem to="/services/growth-demand-generation" label="Growth & Demand Generation" icon={Zap} />
            <MobileSubItem to="/services/analytics-ai" label="Analytics & AI" icon={BarChart3} />
            <MobileSubItem to="/services/brand-reputation" label="Brand & Reputation" icon={Award} />
            <MobileSubItem to="/services" label="All Services" icon={Briefcase} />
          </MobileGroup>

          <MobileGroup
            label="Resources"
            open={openResources}
            onToggle={() => setOpenResources((v) => !v)}
            icon={BookOpen}
          >
            <MobileSubItem to="/resource/blog" label="Blog" icon={FileText} />
            <MobileSubItem to="/resources/templates" label="Templates" icon={Lightbulb} />
            <MobileSubItem to="/resources/free-tools" label="Free Tools" icon={Wrench} />
            <MobileSubItem to="/resources/insights" label="Our Insights" icon={Eye} />
            <MobileSubItem to="/resources/community" label="Community" icon={Users} />
            <MobileSubItem to="/resources/support" label="Support" icon={Headphones} />
          </MobileGroup>

          {/* CTA Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              asChild
              className="w-full rounded-full bg-[#3369fd] hover:bg-[#2557e8] text-white shadow-md"
            >
              <Link to="/resources/support" className="flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </div>

      {/* link polish (desktop) */}
      <style>{`
        .nav-link{
          position:relative;
          display:inline-flex; align-items:center; justify-content:center;
          height:2.5rem; padding:0 .85rem;
          border-radius:.5rem;
          font-size:.9rem; font-weight:600;
          color: #0A1F3D;
          transition: color .2s ease, background .2s ease;
        }
        .nav-link:hover,
        .nav-link:focus-visible{
          background: rgba(10, 31, 61, 0.08);
          color: #0A1F3D;
          outline: none;
        }
        .nav-link::after{
          content:"";
          position:absolute; left:.85rem; right:.85rem; bottom:.35rem; height:2px;
          background:#0074ED; transform: scaleX(0);
          transform-origin:left center; transition: transform .18s ease;
          border-radius:9999px;
        }
        .nav-link:hover::after{ transform: scaleX(1) }
        .nav-link--active{ color: #0A1F3D; }
        .nav-link--active::after{ transform: scaleX(1) }

        .nav-trigger-plain{
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 .85rem !important;
          color: #0A1F3D !important;
        }
        .nav-trigger-plain:hover{
          color: #0A1F3D !important;
        }
        .nav-trigger-plain[data-state="open"]{
          background: transparent !important;
          color: #0A1F3D !important;
        }

        .menu-tile{
          display:block; border-radius:.6rem; padding:.65rem .75rem;
          transition: background .18s ease, color .18s ease;
          color: #0A1F3D;
        }
        .menu-tile:hover,
        .menu-tile:focus-visible{
          background: rgba(10, 31, 61, 0.08);
          color: #0A1F3D;
          outline:none;
        }
        @media (prefers-reduced-motion: reduce){
          .nav-link::after{ transition:none }
        }
      `}</style>
    </nav>
  );
};

/* ---------- Mobile Navigation Components ---------- */
function MobileItem({
  to,
  label,
  active,
  icon: Icon,
}: {
  to: string;
  label: string;
  active?: boolean;
  icon?: React.ElementType;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 my-1 text-[15px] font-medium rounded-lg",
        "transition-all duration-200",
        "hover:bg-gray-50",
        active 
          ? "text-[#3369fd] bg-[#3369fd]/5" 
          : "text-[#0A1F3D] hover:text-[#3369fd]"
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {label}
    </Link>
  );
}

function MobileGroup({
  label,
  open,
  onToggle,
  children,
  icon: Icon,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="my-1">
      <button
        type="button"
        className={cn(
          "flex w-full items-center gap-3 px-4 py-3 rounded-lg",
          "text-[15px] font-medium",
          "transition-all duration-200",
          "hover:bg-gray-50",
          open 
            ? "text-[#3369fd] bg-[#3369fd]/5" 
            : "text-[#0A1F3D] hover:text-[#3369fd]"
        )}
        aria-expanded={open}
        onClick={onToggle}
      >
        {Icon && <Icon className="h-5 w-5" />}
        <span className="flex-1 text-left">{label}</span>
        <svg
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="py-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

function MobileSubItem({ 
  to, 
  label,
  icon: Icon 
}: { 
  to: string; 
  label: string;
  icon?: React.ElementType;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 ml-6 my-0.5 rounded-md",
        "text-[14px] font-normal",
        "transition-all duration-200",
        isActive 
          ? "text-[#3369fd] bg-[#3369fd]/5" 
          : "text-[#0A1F3D]/70 hover:text-[#3369fd] hover:bg-gray-50"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Link>
  );
}

export default Navbar;
