import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown, 
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

/* ========= LOGO CONFIGURATION ========= */
import brandLogo from "../Home/Images/Connecttly_final_log.svg";
const LOGO_SRC = brandLogo;
const LOGO_ALT = "Connecttly";
/* ====================================== */

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const serviceCategories = [
    { name: "Performance Marketing", path: "/services/performance-marketing" },
    { name: "LinkedIn Growth", path: "/services/linkedin-growth" },
    { name: "Content & Creative", path: "/services/content-creative" },
    { name: "Growth & Demand Generation", path: "/services/growth-demand-generation" },
    { name: "Analytics & AI", path: "/services/analytics-ai" },
    { name: "Brand & Reputation", path: "/services/brand-reputation" },
  ];

  const resources = [
    { name: "Blog", path: "/resources/blog" },
    { name: "Free Tools", path: "/resources/free-tools" },
    { name: "Templates", path: "/resources/templates" },
    { name: "Community", path: "/resources/community" },
    { name: "Our Insights", path: "/resources/insights" },
    { name: "Support", path: "/resources/support" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Navbar Container with padding for the "tube" effect */}
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-white backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-3">
          {/* Rounded Container - The "Tube" */}
          <div className="bg-white rounded-full border-2 border-gray-300 px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 lg:h-16">
              {/* Logo */}
              <Link 
                to="/" 
                className="flex items-center space-x-2 flex-shrink-0"
                aria-label="Home"
              >
                <img
                  src={LOGO_SRC}
                  alt={LOGO_ALT}
                  className="h-10 lg:h-11 w-auto select-none"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                <NavLink to="/" active={isActive("/")}>
                  Home
                </NavLink>
                
                <NavLink to="/about" active={isActive("/about")}>
                  About
                </NavLink>

                {/* Services Dropdown */}
                <DropdownMenu
                  label="Services"
                  items={serviceCategories}
                  viewAllLink="/services"
                  viewAllText="All Services"
                />

                {/* Resources Dropdown */}
                <DropdownMenu
                  label="Resources"
                  items={resources}
                />
              </div>

              {/* CTA Button - Desktop */}
              <div className="hidden lg:flex items-center">
                <Button
                  asChild
                  className="rounded-full bg-[#3369fd] hover:bg-[#2557e8] text-white px-8 py-2.5 text-[15px] font-semibold shadow-lg shadow-[#3369fd]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#3369fd]/30 hover:scale-105"
                >
                  <Link to="/resources/support">
                    Get Started
                  </Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3369fd] focus:border-[#3369fd] transition-all duration-200"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel - Slides down from the tube */}
        <div
          className={cn(
            "absolute left-4 right-4 bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[calc(100vh-7rem)] origin-top",
            "transition-all duration-300 ease-out",
            isMobileMenuOpen 
              ? "top-24 opacity-100 scale-y-100" 
              : "top-20 opacity-0 scale-y-0"
          )}
          style={{
            transformOrigin: 'top center'
          }}
        >
          <div className="overflow-y-auto max-h-[calc(100vh-7rem)] px-4 py-6 space-y-1">
            {/* Home */}
            <MobileNavLink to="/" active={isActive("/")} icon={Home}>
              Home
            </MobileNavLink>

            {/* About */}
            <MobileNavLink to="/about" active={isActive("/about")} icon={Info}>
              About
            </MobileNavLink>

            {/* Services Dropdown */}
            <MobileDropdown
              label="Services"
              isOpen={activeDropdown === "services"}
              onToggle={() => toggleDropdown("services")}
              icon={Briefcase}
            >
              <MobileDropdownItem to="/services/performance-marketing" active={isActive("/services/performance-marketing")} icon={TrendingUp}>
                Performance Marketing
              </MobileDropdownItem>
              <MobileDropdownItem to="/services/linkedin-growth" active={isActive("/services/linkedin-growth")} icon={Linkedin}>
                LinkedIn Growth
              </MobileDropdownItem>
              <MobileDropdownItem to="/services/content-creative" active={isActive("/services/content-creative")} icon={Palette}>
                Content & Creative
              </MobileDropdownItem>
              <MobileDropdownItem to="/services/growth-demand-generation" active={isActive("/services/growth-demand-generation")} icon={Zap}>
                Growth & Demand Generation
              </MobileDropdownItem>
              <MobileDropdownItem to="/services/analytics-ai" active={isActive("/services/analytics-ai")} icon={BarChart3}>
                Analytics & AI
              </MobileDropdownItem>
              <MobileDropdownItem to="/services/brand-reputation" active={isActive("/services/brand-reputation")} icon={Award}>
                Brand & Reputation
              </MobileDropdownItem>
              <MobileDropdownItem to="/services" active={isActive("/services")} icon={Briefcase}>
                All Services
              </MobileDropdownItem>
            </MobileDropdown>

            {/* Resources Dropdown */}
            <MobileDropdown
              label="Resources"
              isOpen={activeDropdown === "resources"}
              onToggle={() => toggleDropdown("resources")}
              icon={BookOpen}
            >
              <MobileDropdownItem to="/resources/blog" active={isActive("/resources/blog")} icon={FileText}>
                Blog
              </MobileDropdownItem>
              <MobileDropdownItem to="/resources/free-tools" active={isActive("/resources/free-tools")} icon={Wrench}>
                Free Tools
              </MobileDropdownItem>
              <MobileDropdownItem to="/resources/templates" active={isActive("/resources/templates")} icon={Lightbulb}>
                Templates
              </MobileDropdownItem>
              <MobileDropdownItem to="/resources/community" active={isActive("/resources/community")} icon={Users}>
                Community
              </MobileDropdownItem>
              <MobileDropdownItem to="/resources/insights" active={isActive("/resources/insights")} icon={Eye}>
                Our Insights
              </MobileDropdownItem>
              <MobileDropdownItem to="/resources/support" active={isActive("/resources/support")} icon={Headphones}>
                Support
              </MobileDropdownItem>
            </MobileDropdown>

            {/* CTA Button - Mobile */}
            <div className="pt-6 mt-6 border-t border-gray-200">
              <Button
                asChild
                className="w-full rounded-full bg-[#3369fd] hover:bg-[#2557e8] text-white py-3 text-base font-semibold shadow-lg"
              >
                <Link to="/resources/support">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20 lg:h-22" />
    </>
  );
};

/* ========= Desktop Navigation Components ========= */

interface NavLinkProps {
  to: string;
  active?: boolean;
  children: React.ReactNode;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "relative px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200",
        "hover:text-[#3369fd]",
        active
          ? "text-[#3369fd]"
          : "text-gray-700"
      )}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#3369fd] rounded-full" />
      )}
    </Link>
  );
}

interface DropdownMenuProps {
  label: string;
  items: Array<{ name: string; path: string }>;
  viewAllLink?: string;
  viewAllText?: string;
}

function DropdownMenu({ label, items, viewAllLink, viewAllText }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = items.some(item => location.pathname.startsWith(item.path));

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200",
          "hover:text-[#3369fd]",
          isActive || isOpen ? "text-[#3369fd]" : "text-gray-700"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Panel - Positioned closer to button */}
      <div
        className={cn(
          "absolute top-full left-0 -mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="p-3 space-y-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-3 text-[14px] font-medium text-gray-700 hover:text-[#3369fd] hover:bg-[#3369fd]/5 rounded-lg transition-all duration-150"
            >
              {item.name}
            </Link>
          ))}
          {viewAllLink && viewAllText && (
            <>
              <div className="my-2 border-t border-gray-100" />
              <Link
                to={viewAllLink}
                className="block px-4 py-3 text-[14px] font-semibold text-white bg-[#3369fd] hover:bg-[#2557e8] rounded-lg text-center transition-colors duration-150"
              >
                {viewAllText}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========= Mobile Navigation Components ========= */

interface MobileNavLinkProps {
  to: string;
  active?: boolean;
  children: React.ReactNode;
  icon?: React.ElementType;
}

function MobileNavLink({ to, active, children, icon: Icon }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-150",
        active
          ? "text-[#3369fd] bg-[#3369fd]/10"
          : "text-gray-700 hover:text-[#3369fd] hover:bg-gray-50"
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </Link>
  );
}

interface MobileDropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ElementType;
}

function MobileDropdown({ label, isOpen, onToggle, children, icon: Icon }: MobileDropdownProps) {
  return (
    <div className="space-y-1">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-3 w-full px-4 py-3 text-base font-medium rounded-xl transition-all duration-150",
          isOpen
            ? "text-[#3369fd] bg-[#3369fd]/10"
            : "text-gray-700 hover:text-[#3369fd] hover:bg-gray-50"
        )}
      >
        {Icon && <Icon className="h-5 w-5" />}
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pl-4 py-1 space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MobileDropdownItemProps {
  to: string;
  active?: boolean;
  children: React.ReactNode;
  icon?: React.ElementType;
}

function MobileDropdownItem({ to, active, children, icon: Icon }: MobileDropdownItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 text-[15px] font-normal rounded-lg transition-all duration-150",
        active
          ? "text-[#3369fd] bg-[#3369fd]/10"
          : "text-gray-600 hover:text-[#3369fd] hover:bg-gray-50"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Link>
  );
}

export default Navbar;
