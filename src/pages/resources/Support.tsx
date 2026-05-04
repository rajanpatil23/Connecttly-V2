import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Clock, MapPin, CalendarCheck } from "lucide-react";
import PageHero from "@/components/_zip/PageHero";

const CALENDLY_URL = "https://calendly.com/connecttly-info/30min";

export default function Support() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const scrollToSchedule = useCallback(() => {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <PageHero
        eyebrow="Get in touch"
        title={<>Let's start your <span className="gradient-text">growth journey</span></>}
        description="Talk to our team or book a strategy call that fits your schedule."
        primaryCtaText="Book a call"
        primaryCtaOnClick={scrollToSchedule}
        secondaryCtaText="Send a message"
        secondaryCtaHref="mailto:info@connecttly.com"
      />

      <section id="schedule" className="pb-20 bg-background scroll-mt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 overflow-hidden rounded-2xl border-border shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
              <div className="min-h-[700px]">
                <div className="calendly-inline-widget" data-url={CALENDLY_URL}
                  style={{ minWidth: '320px', height: '700px', width: '100%' }} />
              </div>
              <div className="border-t border-border bg-secondary p-3 text-center text-sm text-muted-foreground">
                Can't see the scheduler?{" "}
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="underline font-medium text-foreground">
                  Open Calendly in a new tab
                </a>.
              </div>
            </Card>

            <Card className="rounded-2xl border-border shadow-[0_2px_10px_hsl(var(--foreground)/0.04)]">
              <CardHeader>
                <CardTitle className="text-foreground font-heading text-2xl">Contact details</CardTitle>
                <p className="text-muted-foreground">Prefer a direct line? We've got you covered.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href="mailto:info@connecttly.com" className="flex items-center gap-4 rounded-xl border border-border bg-secondary/50 p-4 hover:bg-secondary transition">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-sm text-muted-foreground break-all">info@connecttly.com</div>
                  </div>
                </a>
                <a href="tel:+917905212348" className="flex items-center gap-4 rounded-xl border border-border bg-secondary/50 p-4 hover:bg-secondary transition">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Phone / WhatsApp</div>
                    <div className="text-sm text-muted-foreground">+91 7905212348</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary/50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Hours</div>
                    <div className="text-sm text-muted-foreground">Mon–Fri, 10:00–18:00 IST</div>
                  </div>
                </div>
                <a href="https://share.google/mTE2CHUwDjyY91Z7W" target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-xl border border-border bg-secondary/50 p-4 hover:bg-secondary transition">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Address (INDIA)</div>
                    <div className="text-sm text-muted-foreground leading-relaxed mt-1">
                      Blr10-Vaishnavi, Signature No. 78/9, Bellandur, Bangalore South, Karnataka, India (560103)
                    </div>
                  </div>
                </a>
                <Button asChild className="w-full rounded-full mt-2">
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    <CalendarCheck className="h-4 w-4 mr-2" /> Book a strategy call
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
