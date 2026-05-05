import ServiceDetailAdapter from "@/components/Services/templates/ServiceDetailAdapter";
import { Link } from "react-router-dom";


import {
  Target, TrendingUp, Users, BarChart3, Zap, Award,
  Search, Filter, Mail, Calendar, CheckCircle, BookOpen
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
    title: "10K+",
    subtitle: "Prospects identified monthly",
  },
  {
    icon: <Target className="h-5 w-5 text-white" />,
    title: "85%",
    subtitle: "Lead accuracy rate",
  },
  {
    icon: <Calendar className="h-5 w-5 text-white" />,
    title: "2K+",
    subtitle: "Meetings booked monthly",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    title: "4.1x",
    subtitle: "Sales team productivity",
  },
];

const salesNavigatorFeatures: FeatureItem[] = [
  {
    icon: Search,
    title: "Advanced Prospect Research",
    description: "Leverage Sales Navigator's powerful search and filters to find ideal prospects."
  },
  {
    icon: Filter,
    title: "Precise Targeting & Segmentation",
    description: "Create highly targeted lists based on job title, company, industry, and intent signals."
  },
  {
    icon: Users,
    title: "Lead Scoring & Prioritization",
    description: "Score and prioritize prospects based on fit, engagement, and buying signals."
  },
  {
    icon: Mail,
    title: "InMail Strategy & Optimization",
    description: "Craft compelling InMail campaigns that get responses and drive conversations."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Track campaign performance, lead quality, and ROI with detailed analytics."
  },
  {
    icon: Zap,
    title: "Automation & Workflows",
    description: "Set up automated sequences and workflows to nurture prospects at scale."
  },
];

const whyItems: WhyChooseItem[] = [
  { icon: Target, title: "Precision Targeting", desc: "Find exactly the right decision-makers at the right companies." },
  { icon: Search, title: "Advanced Search", desc: "Access LinkedIn's most powerful search and filtering capabilities." },
  { icon: Users, title: "Quality Leads", desc: "Generate high-quality, sales-ready leads that convert." },
  { icon: BarChart3, title: "Data-Driven", desc: "Make decisions based on real data and performance metrics." },
  { icon: Zap, title: "Scalable Process", desc: "Build repeatable, scalable lead generation processes." },
  { icon: Award, title: "Proven Results", desc: "Track record of driving significant sales pipeline growth." },
];

const salesNavigatorProcessSteps: ProcessStep[] = [
  { 
    step: "01", 
    title: "Strategy & Setup", 
    description: "Define target accounts, ideal customer profiles, and Sales Navigator search strategies." 
  },
  { 
    step: "02", 
    title: "List Building & Research", 
    description: "Build targeted prospect lists and research key decision-makers and buying signals." 
  },
  { 
    step: "03", 
    title: "Outreach & Engagement", 
    description: "Execute personalized outreach campaigns using InMail and connection requests." 
  },
  { 
    step: "04", 
    title: "Optimization & Scaling", 
    description: "Analyze performance, refine strategies, and scale successful campaigns." 
  },
];

const pricingPlans: Plan[] = [
  {
    title: "Starter",
    price: { monthly: 800, yearly: 7680 },
    description: "Perfect for testing Sales Navigator",
    features: [
      "Sales Navigator account setup",
      "Basic prospect research",
      "50 InMail credits/month",
      "Lead list building",
      "Monthly performance report",
      "Email support"
    ],
    ctaText: "Get Started",
    ctaHref: "/resources/support"
  },
  {
    title: "Growth",
    price: { monthly: 1600, yearly: 15360 },
    description: "Scale your lead generation",
    features: [
      "Advanced account optimization",
      "200 InMail credits/month",
      "Custom lead scoring",
      "Automated sequences",
      "CRM integration",
      "Weekly strategy calls",
      "Advanced analytics",
      "Dedicated account manager"
    ],
    ctaText: "Scale Up",
    ctaHref: "/resources/support",
    isFeatured: true
  },
  {
    title: "Enterprise",
    price: { monthly: 3200, yearly: 30720 },
    description: "Full-service Sales Navigator management",
    features: [
      "500+ InMail credits/month",
      "Multi-account management",
      "Custom automation workflows",
      "Team training & enablement",
      "Advanced lead scoring",
      "Executive reporting",
      "White-label solutions",
      "Dedicated account team"
    ],
    ctaText: "Contact Sales",
    ctaHref: "/resources/support"
  },
];

const salesNavigatorTools: Tool[] = [
  { name: "LinkedIn Sales Navigator", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "ZoomInfo", logo: "https://logo.clearbit.com/zoominfo.com" },
  { name: "DiscoverOrg", logo: "https://logo.clearbit.com/discoverorg.com" },
  { name: "LeadIQ", logo: "https://logo.clearbit.com/lead-iq.com" },
  { name: "Reply.io", logo: "https://logo.clearbit.com/reply.io" },
  { name: "Outreach", logo: "https://logo.clearbit.com/outreach.io" },
];

const salesNavigatorFAQs: FAQItem[] = [
  {
    question: "What's the difference between Sales Navigator and regular LinkedIn?",
    answer: "Sales Navigator is LinkedIn's premium sales tool with advanced features: unlimited searches (vs. 3/month on free), advanced filters for precise targeting, lead recommendations, saved searches, InMail messaging, real-time insights on profile changes, and CRM integrations. It's designed specifically for sales professionals and B2B lead generation."
  },
  {
    question: "How many leads can I expect to generate?",
    answer: "Results vary by industry and target audience, but typical results are: 50-100 qualified leads per month (Starter), 200-400 leads (Growth), 500+ leads (Enterprise). Lead quality is high - 80-90% are typically sales-ready. We focus on quality over quantity, ensuring leads match your ICP and show buying signals."
  },
  {
    question: "What's the best way to use InMail?",
    answer: "InMail works best when personalized and value-focused. We: research each recipient before sending, reference specific details from their profile/company, offer genuine value (not sales pitches), include clear calls-to-action, and follow up appropriately. Response rates are typically 10-25% when done right."
  },
  {
    question: "Can you integrate with my CRM?",
    answer: "Yes! We integrate Sales Navigator with all major CRMs (Salesforce, HubSpot, Pipedrive, etc.). Leads flow directly into your CRM with all LinkedIn data, conversation history, and lead scores. We can also trigger workflows, assign leads to reps, and track conversion through your sales process."
  },
  {
    question: "How do you ensure lead quality?",
    answer: "We use multiple qualification criteria: job title seniority (we target decision-makers), company size and growth signals, engagement indicators (recent activity, profile completeness), and intent data (job changes, content consumption). We score leads based on fit and buying signals."
  },
  {
    question: "What's the cost of Sales Navigator?",
    answer: "LinkedIn Sales Navigator costs $79.99/month per user. We include this in our pricing - you don't pay extra. For enterprise clients, we can negotiate team discounts. The ROI is typically 3-5x the cost in additional revenue generated."
  },
  {
    question: "How do you handle LinkedIn's limits and restrictions?",
    answer: "We stay well within LinkedIn's limits: 20-30 connection requests per day, 10-15 InMails per day, and follow all best practices. We use multiple accounts for larger campaigns and rotate them appropriately. We monitor account health and have protocols for any restrictions."
  },
  {
    question: "Can you train my sales team on Sales Navigator?",
    answer: "Yes! We provide comprehensive training including: account setup and optimization, advanced search techniques, lead research best practices, InMail writing and A/B testing, CRM integration setup, and ongoing optimization strategies. Training can be done individually or for teams."
  },
];

const SalesNavigator = () => (
  <ServiceDetailAdapter
    heroProps={{
      eyebrow: "LINKEDIN SALES NAVIGATOR",
      heading: "Unlock LinkedIn's Most Powerful Sales Tool",
      description: "Master Sales Navigator to find, engage, and convert high-quality B2B leads. We handle the strategy and execution so your sales team can focus on closing deals.",
      ctaText: "Get Started",
      ctaLink: "/resources/support",
      imageSrc: "/images/Services/linkedin-growth/SalesNavigatorEnablement.png",
      imageAlt: "Sales Navigator",
    }}
    plans={pricingPlans}
    faqs={salesNavigatorFAQs}
    tools={salesNavigatorTools}
    processSteps={salesNavigatorProcessSteps}
    whyItems={whyItems}
  />
);

export default SalesNavigator;
