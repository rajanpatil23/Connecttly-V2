import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  MessageCircle, Mail, Phone, Calendar, CheckCircle, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";


import type { WhyChooseItem } from "@/components/Services/category/WhyChoose";

import type { RibbonItem } from "@/components/Services/category/ServicesRibbon";
import type { Plan } from "@/components/Services/ServiceDetail/modern-pricing-table";
import type { Tool } from "@/components/Services/ServiceDetail/toolstack";
import type { FAQItem } from "@/components/Services/ServiceDetail/ServiceFAQ";
import type { ProcessStep } from "@/components/Services/ServiceDetail/process-cards";
import type { FeatureItem } from "@/components/Services/ServiceDetail/service-features";
// Scroll-animated wrapper for sections
const ribbonItems: RibbonItem[] = [
  {
    icon: <Users className="h-5 w-5 text-white" />,
    title: "50K+",
    subtitle: "Qualified leads delivered",
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-white" />,
    title: "35%",
    subtitle: "Average response rate",
  },
  {
    icon: <Calendar className="h-5 w-5 text-white" />,
    title: "5K+",
    subtitle: "Meetings booked",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "4.2x",
    subtitle: "ROI on campaigns",
  },
];

const leadGenFeatures: FeatureItem[] = [
  {
    icon: Search,
    title: "Prospect Research & List Building",
    description: "Identify and build targeted lists of ideal prospects based on your ICP and buying signals."
  },
  {
    icon: Mail,
    title: "Personalized Outreach Campaigns",
    description: "Craft and send personalized connection requests and messages that get responses."
  },
  {
    icon: MessageCircle,
    title: "Multi-Touch Sequences",
    description: "Automated follow-up sequences that nurture prospects without being pushy."
  },
  {
    icon: Calendar,
    title: "Meeting Booking & Qualification",
    description: "Pre-qualify prospects and book meetings directly with your sales team."
  },
  {
    icon: BarChart3,
    title: "Performance Tracking & Reporting",
    description: "Detailed analytics on outreach performance, response rates, and conversion metrics."
  },
  {
    icon: Zap,
    title: "CRM Integration & Lead Handoff",
    description: "Seamless integration with your CRM for smooth lead handoff to sales."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Precision Targeting", desc: "Reach exactly the right decision-makers at the right companies." },
  { icon: MessageCircle, title: "High Response Rates", desc: "Personalized messaging that gets 3-5x higher response rates." },
  { icon: Users, title: "Qualified Leads Only", desc: "Focus on quality over quantity - only send qualified leads to sales." },
  { icon: BarChart3, title: "Data-Driven Approach", desc: "Continuous optimization based on performance data and A/B testing." },
  { icon: Zap, title: "Fast Results", desc: "Start seeing responses and booked meetings within the first 2 weeks." },
  { icon: Award, title: "Proven Process", desc: "Battle-tested methodology that consistently delivers results." },
];

const leadGenProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "ICP Definition & List Building", 
    description: "Define your ideal customer profile and build targeted prospect lists using LinkedIn Sales Navigator." 
  },
  { 
    step: "02", 
    title: "Message Development", 
    description: "Create personalized messaging sequences that resonate with your target audience." 
  },
  { 
    step: "03", 
    title: "Outreach Execution", 
    description: "Launch campaigns, send connection requests, and engage prospects with multi-touch sequences." 
  },
  { 
    step: "04", 
    title: "Optimize & Scale", 
    description: "Analyze performance, refine messaging, and scale successful campaigns." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 600, yearly: 5760 },
    description: "Perfect for testing LinkedIn outreach",
    features: [
      "100 connection requests/month",
      "Prospect research & list building",
      "Personalized messaging",
      "Basic follow-up sequences",
      "Monthly reporting",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1200, yearly: 11520 },
    description: "Scale your LinkedIn lead generation",
    features: [
      "300 connection requests/month",
      "Advanced prospect targeting",
      "Multi-touch sequences",
      "Meeting booking & qualification",
      "CRM integration",
      "Weekly reporting & optimization",
      "Priority support",
      "Dedicated account manager"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 2400, yearly: 23040 },
    description: "Full-service LinkedIn lead generation",
    features: [
      "Unlimited connection requests",
      "Multi-account management",
      "Custom messaging & sequences",
      "Sales team training",
      "Advanced analytics",
      "Executive reporting",
      "White-glove service",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const leadGenTools: Tool[] = [
  { name: "LinkedIn Sales Navigator", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "Lemlist", logo: "https://logo.clearbit.com/lemlist.com" },
  { name: "Apollo", logo: "https://logo.clearbit.com/apollo.io" },
  { name: "Phantombuster", logo: "https://logo.clearbit.com/phantombuster.com" },
  { name: "Calendly", logo: "https://logo.clearbit.com/calendly.com" },
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier/FF4A00" },
];

const leadGenFAQs: FAQItem[] = [
  {
    question: "How many leads can I expect per month?",
    answer: "Results vary based on your target audience and offer, but typical results are: 100-150 connection requests sent per month (Starter), 300-400 (Growth), 500+ (Enterprise). Response rates average 25-35%, and meeting booking rates are typically 10-15% of responses. So for Growth plan, expect 75-140 responses and 10-20 booked meetings per month."
  },
  {
    question: "What's your approach to LinkedIn outreach?",
    answer: "We use a personalized, value-first approach. We research each prospect, personalize connection requests, and send helpful, relevant messages (not sales pitches). We use multi-touch sequences with 3-5 touchpoints over 2-3 weeks. We focus on starting conversations and building relationships, not hard selling. This approach gets 3-5x higher response rates than generic outreach."
  },
  {
    question: "Do you use automation tools?",
    answer: "Yes, but carefully. We use LinkedIn-safe automation tools that mimic human behavior to scale outreach while staying within LinkedIn's limits. We never use aggressive automation that could get your account restricted. All messages are personalized and sent at human-like intervals. We prioritize account safety while maximizing efficiency."
  },
  {
    question: "How do you ensure lead quality?",
    answer: "We use multiple qualification criteria: job title and seniority matching your ICP, company size and industry filters, engagement signals (recent activity, profile completeness), and pre-qualification questions in our messaging. We only pass leads to your sales team after they've shown genuine interest and meet your criteria. Quality over quantity is our mantra."
  },
  {
    question: "Can you target specific companies or industries?",
    answer: "Absolutely! We can target by: specific company lists (account-based approach), industry and sub-industry, company size and growth stage, geography, and even technologies used. We use LinkedIn Sales Navigator's advanced filters plus additional data sources to build highly targeted prospect lists that match your exact ICP."
  },
  {
    question: "How long does it take to see results?",
    answer: "You'll start seeing connection acceptances within the first week. Responses typically start coming in week 2-3. First meetings are usually booked within 3-4 weeks. It takes about 2-3 months to optimize messaging and hit consistent performance. LinkedIn outreach is a long-term strategy that compounds over time as your network grows."
  },
  {
    question: "Do you integrate with our CRM?",
    answer: "Yes! We integrate with all major CRMs (Salesforce, HubSpot, Pipedrive, etc.). Qualified leads flow directly into your CRM with all conversation history and context. We can also trigger workflows, assign leads to reps, and track conversion through your sales process. This ensures seamless handoff and proper attribution."
  },
  {
    question: "What if LinkedIn restricts my account?",
    answer: "We follow LinkedIn's best practices and stay well within their limits to minimize risk. However, if restrictions occur, we help resolve them quickly. We also offer account warming for new accounts and can manage multiple accounts for enterprise clients. Our approach prioritizes long-term account health over short-term gains."
  },
];

const LeadGenration = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "LINKEDIN LEAD GENERATION",
      heading: "Fill Your Pipeline with Qualified LinkedIn Leads",
      description: "Done-for-you LinkedIn outreach that books meetings with your ideal customers. Personalized, scalable, and proven to work.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/Linkedin Growth/LeadGenration.png",
      imageAlt: "LinkedIn Lead Generation",
    }}
    plans={pricingPlans}
    faqs={leadGenFAQs}
    tools={leadGenTools}
    processSteps={leadGenProcessSteps}
    whyItems={whyItems}
  />
);

export default LeadGenration;
