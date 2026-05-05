import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Shield, AlertCircle, MessageCircle, Newspaper, Star, TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";


import type { WhyChooseItem } from "@/components/Services/category/WhyChoose";

import type { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import type { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import type { Tool } from "@/components/Services/ServiceDetail/toolstack";
import type { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import type { ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import type { FeatureItem } from "@/components/Services/ServiceDetail/service-features";
const ribbonItems: RibbonItem[] = [
  { icon: <Shield className="h-5 w-5 text-white" />, title: "500+", subtitle: "Crises managed" },
  { icon: <Star className="h-5 w-5 text-white" />, title: "95%", subtitle: "Positive sentiment" },
  { icon: <Newspaper className="h-5 w-5 text-white" />, title: "10K+", subtitle: "Media placements" },
  { icon: <TrendingUp className="h-5 w-5 text-white" />, title: "4x", subtitle: "Brand visibility" },
];

const prOrmFeatures: FeatureItem[] = [
  { icon: Newspaper, title: "Media Relations & PR", description: "Strategic media outreach and press coverage that builds brand authority." },
  { icon: Shield, title: "Reputation Management", description: "Proactive reputation monitoring and management across all channels." },
  { icon: AlertCircle, title: "Crisis Management", description: "Rapid response and crisis communication to protect your brand." },
  { icon: MessageCircle, title: "Review Management", description: "Monitor and respond to reviews to maintain positive online reputation." },
  { icon: Star, title: "Sentiment Analysis", description: "Track brand sentiment and perception across social media and news." },
  { icon: TrendingUp, title: "Thought Leadership", description: "Position executives as industry thought leaders through strategic PR." },
];

const whyItems: WhyChooseItem[] = [
  { icon: Shield, title: "Proactive Protection", desc: "Protect your reputation before issues arise." },
  { icon: Zap, title: "Rapid Response", desc: "24/7 crisis monitoring and immediate response capability." },
  { icon: Newspaper, title: "Media Relationships", desc: "Established relationships with top-tier media outlets." },
  { icon: Star, title: "Proven Results", desc: "95% positive sentiment across managed brands." },
  { icon: Users, title: "Expert Team", desc: "Former journalists and PR professionals on your team." },
  { icon: Award, title: "Crisis Veterans", desc: "Successfully managed 500+ reputation crises." },
];

const prOrmProcessSteps: ProcessStep[] = [
  { step: "01", title: "Audit & Monitoring", description: "Comprehensive reputation audit and setup of monitoring systems." },
  { step: "02", title: "Strategy Development", description: "Create PR and ORM strategy aligned with business goals." },
  { step: "03", title: "Execution & Outreach", description: "Execute media campaigns and manage online reputation actively." },
  { step: "04", title: "Response & Optimization", description: "Monitor, respond to issues, and continuously optimize strategy." },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 1200, yearly: 11520 },
    description: "Essential PR & ORM",
    features: ["Reputation monitoring", "Review management", "Basic media outreach", "Crisis response plan", "Monthly reporting", "Email support"],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 2400, yearly: 23040 },
    description: "Comprehensive PR & ORM",
    features: ["Advanced monitoring", "Active review management", "Media relations campaign", "Crisis management", "Thought leadership", "Sentiment analysis", "Weekly reporting", "Priority support"],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 4800, yearly: 46080 },
    description: "Enterprise PR & ORM",
    features: ["24/7 monitoring", "Complete ORM management", "Full PR campaigns", "Crisis war room", "Executive positioning", "Competitive intelligence", "Real-time alerts", "Dedicated PR team"],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const prOrmTools: Tool[] = [
  { name: "Brandwatch", logo: "https://logo.clearbit.com/brandwatch.com" },
  { name: "Meltwater", logo: "https://logo.clearbit.com/meltwater.com" },
  { name: "Mention", logo: "https://logo.clearbit.com/mention.com" },
  { name: "Google Alerts", logo: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Trustpilot", logo: "https://logo.clearbit.com/trustpilot.com" },
  { name: "ReviewTrackers", logo: "https://logo.clearbit.com/reviewtrackers.com" },
  { name: "Cision", logo: "https://logo.clearbit.com/cision.com" },
  { name: "Hootsuite", logo: "https://cdn.simpleicons.org/hootsuite/000000" },
];

const prOrmFAQs: FAQItem[] = [
  {
    question: "What's the difference between PR and ORM?",
    answer: "PR (Public Relations) is proactive: building positive brand perception through media coverage, thought leadership, and strategic communications. ORM (Online Reputation Management) is both proactive and reactive: monitoring online mentions, managing reviews, responding to negative content, and protecting brand reputation. PR builds reputation, ORM protects it. Both work together for comprehensive reputation management. We provide integrated PR and ORM services for maximum impact."
  },
  {
    question: "How quickly can you respond to a reputation crisis?",
    answer: "We provide 24/7 crisis monitoring and can respond within 1-2 hours for urgent issues. Our crisis response process: immediate alert (real-time monitoring), rapid assessment (within 1 hour), response strategy (within 2 hours), and execution (within 4 hours). We have crisis playbooks ready for common scenarios. For Enterprise clients, we provide dedicated crisis war room with immediate response capability. Speed is critical in crisis management - delays can amplify damage exponentially."
  },
  {
    question: "Can you remove negative content about our brand?",
    answer: "We can't guarantee removal (most content is protected), but we can: request removal of false/defamatory content, suppress negative content through SEO, respond professionally to negative reviews, create positive content to outrank negative, and work with platforms to address violations. Our approach: assess if content violates policies, attempt removal if appropriate, suppress through positive content, and address root cause. Most negative content can be effectively managed even if not removed."
  },
  {
    question: "How do you secure media coverage?",
    answer: "We use a strategic approach: develop newsworthy angles and stories, leverage existing media relationships, create compelling press materials, pitch to relevant journalists and outlets, and follow up professionally. We have relationships with: top-tier publications (WSJ, Forbes, TechCrunch), industry trade publications, local media, and podcasts/influencers. Success rate: 60-80% placement rate for quality pitches. We focus on quality over quantity - relevant coverage that reaches your audience."
  },
  {
    question: "What's included in reputation monitoring?",
    answer: "Comprehensive monitoring across: news and media mentions, social media (all major platforms), review sites (Google, Yelp, Trustpilot, etc.), forums and communities, blogs and websites, and search results. We track: brand mentions, competitor mentions, industry keywords, executive names, and product names. You receive: real-time alerts for urgent issues, daily digest of mentions, weekly sentiment analysis, and monthly comprehensive reports. We monitor 24/7 and alert you immediately to potential issues."
  },
  {
    question: "How do you handle negative reviews?",
    answer: "Our review management process: monitor all review platforms, respond within 24 hours, address concerns professionally, offer to resolve offline, and encourage positive reviews. For negative reviews: acknowledge the issue, apologize if appropriate, offer solution, take conversation offline, and follow up. We also: identify patterns in negative feedback, work with you to address root causes, and implement improvements. Proper review management can turn detractors into advocates - 70% of customers who receive good responses update their reviews positively."
  },
  {
    question: "Can you help with thought leadership?",
    answer: "Yes! Thought leadership is key to PR strategy. We help: identify unique perspectives and expertise, develop content (articles, whitepapers, presentations), secure speaking opportunities, pitch byline articles to publications, arrange podcast interviews, and build executive social media presence. Benefits: increased brand authority, media coverage, lead generation, and competitive differentiation. Most executives see significant visibility increase within 3-6 months of consistent thought leadership efforts."
  },
  {
    question: "How do you measure PR and ORM success?",
    answer: "We track comprehensive metrics: Media coverage (quantity, quality, reach), sentiment (positive/negative/neutral), share of voice (vs. competitors), review ratings and volume, search results (first page presence), crisis response time, and business impact (traffic, leads, sales). Monthly reports show: coverage highlights, sentiment trends, competitive benchmarks, and ROI analysis. Most clients see: 4x increase in media visibility, 95% positive sentiment, and significant improvement in search results within 6 months."
  },
];

const PRandORM = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "PR & ONLINE REPUTATION MANAGEMENT",
      heading: "Protect and Enhance Your Brand Reputation",
      description: "Strategic PR and reputation management that builds positive perception, secures media coverage, and protects your brand from threats.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/brand-reputation/PRandORM.png",
      imageAlt: "PR & ORM",
    }}
    plans={pricingPlans}
    faqs={prOrmFAQs}
    tools={prOrmTools}
    processSteps={prOrmProcessSteps}
    whyItems={whyItems}
  />
);

export default PRandORM;
