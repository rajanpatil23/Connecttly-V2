import MagicBento from "@/components/Community/OpprtunitiesMagicBento";
import LazyWorldMap from "@/components/Community/LazyWorldMap";
import { Card, CardContent } from "@/components/ui/card";
import PageHero from "@/components/_zip/PageHero";
import SectionLabel from "@/components/_zip/SectionLabel";

export default function CommunityPage() {
  return (
    <div className="overflow-x-hidden bg-background">
      <PageHero
        eyebrow="Community"
        title={<>An ecosystem built for <span className="gradient-text">collaboration</span></>}
        description="We're reshaping how professionals build and grow online—through collaboration. Join conscious operators who serve, connect, and create meaningful outcomes together."
        primaryCtaText="Join Now"
        primaryCtaHref="/resources/support"
        secondaryCtaText="Explore Opportunities"
        secondaryCtaHref="#opportunities"
      >
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[{ k: "2,000+", v: "Members" }, { k: "25+", v: "Countries" }, { k: "20+", v: "Live Events" }].map(s => (
            <Card key={s.v} className="border-border bg-background text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-heading font-bold gradient-text">{s.k}</div>
                <div className="text-sm text-muted-foreground">{s.v}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageHero>

      <section id="opportunities" className="py-16 bg-background">
        <div className="container-main">
          <SectionLabel label="Opportunities" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center max-w-2xl mx-auto mt-4 mb-10">
            Unlock <span className="gradient-text">opportunities</span>
          </h2>
          <div className="flex justify-center"><MagicBento /></div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="container-main">
          <SectionLabel label="Global Network" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center max-w-2xl mx-auto mt-4 mb-10">
            Connect <span className="gradient-text">worldwide</span>
          </h2>
          <div className="flex justify-center">
            <LazyWorldMap
              dots={[
                { start: { lat: 64.2008, lng: -149.4937, label: "Fairbanks" }, end: { lat: 34.0522, lng: -118.2437, label: "California" } },
                { start: { lat: 64.2008, lng: -149.4937, label: "Fairbanks" }, end: { lat: -15.7975, lng: -47.8919, label: "Brasília" } },
                { start: { lat: -15.7975, lng: -47.8919, label: "Brasília" }, end: { lat: 38.7223, lng: -9.1393, label: "Lisbon" } },
                { start: { lat: 51.5074, lng: -0.1278, label: "London" }, end: { lat: -0.5284, lng: 81.0946, label: "Bengaluru" } },
                { start: { lat: -0.5284, lng: 81.0946, label: "Bengaluru" }, end: { lat: 43.1332, lng: 131.9113, label: "Vladivostok" } },
                { start: { lat: -0.5284, lng: 81.0946, label: "Bengaluru" }, end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" } },
              ]}
              headquarters={{ lat: -0.5284, lng: 81.0946, label: "Bengaluru" }}
              lineColor="hsl(var(--primary))"
              showLabels
              animationDuration={3}
              loop
            />
          </div>
        </div>
      </section>
    </div>
  );
}
