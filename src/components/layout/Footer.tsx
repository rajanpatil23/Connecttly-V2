import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube,
  FileText,
  Wrench,
  Headphones,
  HelpCircle,
  DollarSign,
  Info,
  Briefcase,
  Shield,
  FileCheck,
  Database,
  Lightbulb,
  Image,
  Type,
  Link as LinkIcon,
  BarChart3
} from "lucide-react";

// Brand logo - using same logo as Navbar
import brandLogo from "@/components/Home/Images/Connecttly_final_log.svg";

const footerLinks = {
  resources: [
    { label: "Blog", href: "/resources/blog", icon: FileText },
    { label: "Free Tools", href: "/resources/tools", icon: Wrench },
    { label: "Contact", href: "/resources/support", icon: Headphones },
    { label: "FAQ", href: "/resources/faq", icon: HelpCircle },
    { label: "Refer and Earn", href: "/resources/refer-and-earn", icon: DollarSign },
  ],
  company: [
    { label: "About", href: "/about", icon: Info },
    { label: "Career", href: "/career", icon: Briefcase },
    { label: "Privacy Policy", href: "/legal/privacy-policy", icon: Shield },
    { label: "Terms & Conditions", href: "/legal/terms-conditions", icon: FileCheck },
    { label: "Data Processing Addendum", href: "/legal/data-processing-addendum", icon: Database },
  ],
  freeTools: [
    { label: "LinkedIn Post Generator", href: "/resources/tools/linkedin-post-generator", icon: Lightbulb },
    { label: "Social Image Generator", href: "/resources/tools/social-image-generator", icon: Image },
    { label: "Text Editor", href: "/resources/tools/text-formatter", icon: Type },
    { label: "URL Shortener", href: "/resources/tools/url-shortener", icon: LinkIcon },
    { label: "UTM Builder", href: "/resources/tools/utm", icon: BarChart3 },
  ],
};

function MobileAccordion({ title, items, id, icon: Icon }) {
  return (
    <details className="group rounded-2xl border border-slate-300 bg-white/50 open:bg-white/70">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-slate-900" />}
          <span className="uppercase tracking-wider text-slate-900">{title}</span>
        </div>
        <svg
          className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 text-slate-900"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <nav aria-labelledby={id} className="px-4 pb-3">
        <ul className="space-y-2 text-sm">
          {items.map((link) => {
            const ItemIcon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {ItemIcon && <ItemIcon className="h-4 w-4" />}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </details>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer 
      role="contentinfo" 
      className="bg-[#B8D4F7]"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* === Top: Brand + Newsletter === */}
        <div className="pt-24 sm:pt-28 pb-8 border-b border-slate-300">
          {/* Mobile: stacked */}
          <div className="flex flex-col items-center gap-5 text-center md:hidden">
            <Link to="/" className="inline-flex items-center" aria-label="Connecttly Home">
              <img
                src={brandLogo}
                alt="Connecttly"
                className="h-12 w-auto sm:h-14"
                loading="eager"
                decoding="async"
              />
            </Link>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Newsletter subscribe:", email);
                setEmail("");
              }}
              className="w-full max-w-md"
              aria-label="Subscribe to newsletter"
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <div className="flex w-full items-center gap-2 rounded-full border border-slate-300 bg-white p-2">
                <Input
                  id="footer-newsletter"
                  name="email"
                  type="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 flex-1 border-0 bg-transparent text-slate-900 placeholder:text-slate-500 focus-visible:ring-0"
                  required
                />
                <Button type="submit" className="h-10 rounded-full px-4 font-semibold bg-slate-900 hover:bg-slate-800">
                  Subscribe
                </Button>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Weekly insights. No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Desktop: grid with logo aligned to Resources column */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 items-center gap-8">
              {/* Left-aligned logo so its left edge matches the Resources column below */}
              <div className="col-span-1 flex justify-start">
                <Link to="/" className="inline-flex items-center" aria-label="Connecttly Home">
                  <img
                    src={brandLogo}
                    alt="Connecttly"
                    className="h-16 w-auto lg:h-18"
                    loading="eager"
                    decoding="async"
                  />
                </Link>
              </div>

              {/* Newsletter spans 3 columns and stays right */}
              <div className="col-span-3 flex justify-end">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Newsletter subscribe:", email);
                    setEmail("");
                  }}
                  className="w-full max-w-2xl"
                  aria-label="Subscribe to newsletter"
                >
                  <div className="flex w-full items-center gap-2 rounded-full border border-slate-300 bg-white p-2">
                    <Input
                      id="footer-newsletter-desktop"
                      name="email"
                      type="email"
                      inputMode="email"
                      placeholder="Enter your email for Weekly insights"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 flex-1 border-0 bg-transparent text-slate-900 placeholder:text-slate-500 focus-visible:ring-0"
                      required
                    />
                    <Button type="submit" className="h-10 rounded-full px-4 font-semibold bg-slate-900 hover:bg-slate-800">
                      Subscribe
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* === Middle: Links + Contact === */}
        {/* Mobile: accordions */}
        <div className="py-8 md:hidden">
          <div className="space-y-3">
            <MobileAccordion title="Resources" items={footerLinks.resources} id="footer-resources" icon={FileText} />
            <MobileAccordion title="Company" items={footerLinks.company} id="footer-company" icon={Briefcase} />
            <MobileAccordion title="Free Tools" items={footerLinks.freeTools} id="footer-free-tools" icon={Wrench} />
          </div>

          {/* Contact */}
          <div className="mt-6 rounded-2xl border border-slate-300 bg-white/50 p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-900">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-700" />
                <a
                  href="tel:+917905212348"
                  className="text-slate-700 transition-colors hover:text-slate-900"
                >
                  +91 7905212348
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-700" />
                <a
                  href="mailto:info@connecttly.com"
                  className="text-slate-700 transition-colors hover:text-slate-900"
                >
                  info@connecttly.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-700" />
                <span className="text-slate-700">Mon–Fri, 9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-8 w-8 text-slate-700 -mt-1" />
                <span className="text-slate-700 text-left">
                  Blr10-Vaishnavi, Signature No. 78/9, Bellandur, Bengaluru South, Karnataka, India 560103
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: four columns */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 py-10">
          <nav aria-labelledby="footer-resources-desktop" className="col-span-1">
            <h3
              id="footer-resources-desktop"
              className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900"
            >
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-700 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company-desktop" className="col-span-1">
            <h3
              id="footer-company-desktop"
              className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900"
            >
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-700 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-free-tools-desktop" className="col-span-1">
            <h3
              id="footer-free-tools-desktop"
              className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900"
            >
              Free Tools
            </h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.freeTools.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-700 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-1">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-700" />
                <a
                  href="tel:+917905212348"
                  className="text-slate-700 transition-colors hover:text-slate-900"
                >
                  +91 7905212348
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-700" />
                <a
                  href="mailto:info@connecttly.com"
                  className="text-slate-700 transition-colors hover:text-slate-900"
                >
                  info@connecttly.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-700" />
                <span className="text-slate-700">Mon–Fri, 9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-8 w-8 text-slate-700 -mt-1" />
                <span className="text-slate-700 text-left">
                  Blr10-Vaishnavi, Signature No. 78/9, Bellandur, Bengaluru South, Karnataka, India 560103
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === Bottom: Social + Legal === */}
        <div className="flex flex-col items-center gap-4 border-t border-slate-300 py-6 text-center md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://instagram.com/connecttly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-900 text-white transition-colors hover:bg-slate-800 hover:border-slate-400"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com/connecttly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-900 text-white transition-colors hover:bg-slate-800 hover:border-slate-400"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/company/connecttly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-900 text-white transition-colors hover:bg-slate-800 hover:border-slate-400"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@connecttly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-900 text-white transition-colors hover:bg-slate-800 hover:border-slate-400"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>

          <div className="text-xs text-slate-600">
            <p>&copy; 2025 Connecttly. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
