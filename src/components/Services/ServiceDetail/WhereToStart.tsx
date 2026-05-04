import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gridBg from "@/assets/where-to-start/grid-bg.png";
import strategistImg from "@/assets/where-to-start/strategist.png";
import quizImg from "@/assets/where-to-start/quiz.png";
import briefImg from "@/assets/where-to-start/brief.png";

interface Item {
  title: string;
  desc: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const items: Item[] = [
  {
    title: "Talk to a Strategist",
    desc: "Book a free 30-minute growth strategy call. We'll audit your current setup and recommend a plan.",
    cta: "Book a Free Call",
    href: "/resources/support",
    image: strategistImg,
    imageAlt: "Talk to a strategist",
  },
  {
    title: "Take the Growth Quiz",
    desc: "Answer 5 quick questions and get a personalised service recommendation in under 2 minutes.",
    cta: "Take the Quiz",
    href: "/resources/support",
    image: quizImg,
    imageAlt: "Take the growth quiz",
    reverse: true,
  },
  {
    title: "Send Us a Brief",
    desc: "Share your goals, budget, and timeline. We'll come back with a custom proposal within 48 hours.",
    cta: "Submit a Brief",
    href: "/resources/support",
    image: briefImg,
    imageAlt: "Send us a brief",
  },
];

export default function WhereToStart() {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 md:mb-16 text-center">
          Not Sure <span className="gradient-text">Where to Start?</span>
        </h2>

        <div className="space-y-12 md:space-y-16">
          {items.map((item) => (
            <div
              key={item.title}
              className="grid md:grid-cols-2 gap-8 md:gap-10 items-center"
            >
              {/* Text */}
              <div className={item.reverse ? "md:order-2" : ""}>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                  {item.desc}
                </p>
                <Button
                  asChild
                  className="rounded-full px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link to={item.href}>{item.cta}</Link>
                </Button>
              </div>

              {/* Image with grid background */}
              <div className={item.reverse ? "md:order-1" : ""}>
                <div
                  className="relative w-full max-w-[647.62px] mx-auto rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio: "647.62 / 327.4",
                    backgroundImage: `url(${gridBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-[78%] w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
