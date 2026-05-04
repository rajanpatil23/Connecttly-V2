import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Database, Mail, LifeBuoy } from "lucide-react";
import PageHero from "@/components/_zip/PageHero";
import SectionLabel from "@/components/_zip/SectionLabel";

const LAST_UPDATED = "September 2025";

const cards = [
  { to: "/legal/privacy-policy", title: "Privacy Policy", icon: Shield, blurb: "Learn how we collect, use, and protect your information.", cta: "Read Privacy Policy" },
  { to: "/legal/terms-conditions", title: "Terms & Conditions", icon: FileText, blurb: "Understand the terms governing your use of our services.", cta: "Read T&C" },
  { to: "/legal/data-processing-addendum", title: "Data Processing Addendum", icon: Database, blurb: "Our DPA for enterprise customers and GDPR compliance.", cta: "Read DPA" },
];

export default function Legal() {
  return (
    <div className="overflow-x-hidden bg-background">
      <PageHero
        eyebrow="Legal"
        title={<>Legal <span className="gradient-text">information</span></>}
        description="Clear information about how we handle your data, our terms of service, and our data processing practices."
        meta={`Last updated: ${LAST_UPDATED}`}
      />

      <section className="pb-16 bg-background">
        <div className="container-main">
          <SectionLabel label="Legal Documents" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center max-w-2xl mx-auto mt-4 mb-10">
            Our legal <span className="gradient-text">framework</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map(({ to, title, icon: Icon, blurb, cta }) => (
              <div key={to} className="bg-background rounded-2xl border border-border p-6 flex flex-col text-center shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{blurb}</p>
                <Button asChild className="rounded-full w-full"><Link to={to}>{cta}</Link></Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-main max-w-4xl">
          <div className="rounded-3xl bg-primary text-primary-foreground p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Need legal assistance?</h2>
            <p className="mt-3 opacity-90 max-w-2xl mx-auto">
              Quick guidance on Privacy, Terms, and Data Processing. Our team responds fast and keeps it simple.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full bg-background text-primary hover:bg-background/90">
                <Link to="/resources/support"><LifeBuoy className="h-4 w-4 mr-2" />Contact Support</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <a href="mailto:info@connecttly.com"><Mail className="h-4 w-4 mr-2" />Email Legal Team</a>
              </Button>
            </div>
            <p className="mt-5 text-xs opacity-80">Typical response time: under 24 hours (Mon–Fri, IST)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
