import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CTABannerOverlap from "@/components/Home/CTABannerOverLap";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <section className="relative overflow-visible px-4 sm:px-6 lg:px-8 pb-28 sm:pb-40 mt-16 sm:mt-0">
        <CTABannerOverlap
          title="Ready to scale smarter?"
          description="No fluff, no jargon. Just ROI-driven growth strategies."
          ctaText="Book a Free Strategy Call"
          ctaHref="/resources/support"
        />
      </section>
      <Footer />
    </div>
  );
};

export default Layout;