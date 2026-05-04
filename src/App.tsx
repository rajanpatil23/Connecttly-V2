// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/servicesCategory/AllServices/AllServices";
import Search from "@/pages/Search";
import Legal from "@/pages/Legal";
import PrivacyPolicy from "@/pages/Legal/privacyPolicy";
import TermsAndConditions from "@/pages/Legal/termsAndCondition";
import DataProcessingAddendum from "@/pages/Legal/dataProcessingAddendum";
import ScrollManager from "@/components/ScrollManager";
import Careers from "./pages/Careers";
import FAQ from "./pages/FAQ";

/* -------- Service Category pages -------- */
import PerformanceMarketingCategory from "./pages/servicesCategory/PerformanceMarketing/PerformanceMarketing";
import LinkedInGrowthCategory from "./pages/servicesCategory/LinkedInGrowth/LinkedInGrowth";
import ContentCreativeCategory from "./pages/servicesCategory/ContentCreative/ContentCreative";
import GrowthDemandGenerationCategory from "./pages/servicesCategory/GrowthDemandGenration/GrowthDemandGeneration";
import AnalyticsAICategory from "./pages/servicesCategory/AnalyticsAI/AnalyticsAI";
import BrandReputationCategory from "./pages/servicesCategory/BrandReputation/BrandReputation";

/* -------- Individual Services: Performance Marketing -------- */
import GoogleAds from "./pages/servicesCategory/PerformanceMarketing/PerformaceMarketingServices/GoogleAds";
import MetaAds from "./pages/servicesCategory/PerformanceMarketing/PerformaceMarketingServices/MetaAds";
import YoutubeAds from "./pages/servicesCategory/PerformanceMarketing/PerformaceMarketingServices/YoutubeAds";
import CROFunnel from "./pages/servicesCategory/PerformanceMarketing/PerformaceMarketingServices/CROFunnel";
import ShortVideoAds from "./pages/servicesCategory/PerformanceMarketing/PerformaceMarketingServices/ShortVideoAds";
import PerformanceAcceleratorBundle from "./pages/servicesCategory/PerformanceMarketing/PerformaceMarketingServices/PerformanceAcceleratorBundle";

/* -------- Individual Services: LinkedIn Growth -------- */
import LinkedInAds from "./pages/servicesCategory/LinkedInGrowth/LinkedInGrowthServices/LinkedInAds";
import LeadGenration from "./pages/servicesCategory/LinkedInGrowth/LinkedInGrowthServices/LeadGenration";
import PageManagement from "./pages/servicesCategory/LinkedInGrowth/LinkedInGrowthServices/PageManagement";
import ExecutiveLeadership from "./pages/servicesCategory/LinkedInGrowth/LinkedInGrowthServices/ExecutiveLeadership";
import SalesNavigator from "./pages/servicesCategory/LinkedInGrowth/LinkedInGrowthServices/SalesNavigator";
import LinkedInGrowthBundle from "./pages/servicesCategory/LinkedInGrowth/LinkedInGrowthServices/LinkedInGrowthbundle";

/* -------- Individual Services: Analytics & AI -------- */
import AIPoweredCampaigns from "./pages/servicesCategory/AnalyticsAI/AnalyticsAIServices/AIPoweredCampaigns";
import AnalyticsDashboards from "./pages/servicesCategory/AnalyticsAI/AnalyticsAIServices/AnalyticsDashboards";
import AttributionFunnels from "./pages/servicesCategory/AnalyticsAI/AnalyticsAIServices/AttributionFunnel";
import CRMAutomation from "./pages/servicesCategory/AnalyticsAI/AnalyticsAIServices/CRMAutomation";
import MesurementAIBundle from "./pages/servicesCategory/AnalyticsAI/AnalyticsAIServices/MeasurementAIBundle";
import TaggingGA4Audit from "./pages/servicesCategory/AnalyticsAI/AnalyticsAIServices/TaggingGA4Audit";

/* -------- Individual Services: Brand & Reputation -------- */
import BrandMomentumBundle from "./pages/servicesCategory/BrandReputation/BrandReputationServices/BrandMomentumBundle";
import BrandStrategy from "./pages/servicesCategory/BrandReputation/BrandReputationServices/BrandStrategy";
import EmployerBranding from "./pages/servicesCategory/BrandReputation/BrandReputationServices/EmployerBranding";
import LifestyleVibe from "./pages/servicesCategory/BrandReputation/BrandReputationServices/LifestyleVibe";
import PRandORM from "./pages/servicesCategory/BrandReputation/BrandReputationServices/PRandORM";
import WebsiteUXLandingPage from "./pages/servicesCategory/BrandReputation/BrandReputationServices/WebsiteUXLandingPage";

/* -------- Individual Services: Content & Creative -------- */
import CarouselsVisuals from "./pages/servicesCategory/ContentCreative/ContentCreativeServices/CarouselsVisuals";
import ContentStrategy from "./pages/servicesCategory/ContentCreative/ContentCreativeServices/ContentStrategy";
import FullFunnelContent from "./pages/servicesCategory/ContentCreative/ContentCreativeServices/FullFunnelContent";
import SalesCollateral from "./pages/servicesCategory/ContentCreative/ContentCreativeServices/SalesCollateral";
import SEOContentProduction from "./pages/servicesCategory/ContentCreative/ContentCreativeServices/SEOContentProduction";
import VideoProduction from "./pages/servicesCategory/ContentCreative/ContentCreativeServices/VideoProduction";

/* -------- Individual Services: Growth & Demand Generation -------- */
import ABMCampaigns from "./pages/servicesCategory/GrowthDemandGenration/GrowthDemandGenrationServices/ABMCampaigns";
import Community from "./pages/servicesCategory/GrowthDemandGenration/GrowthDemandGenrationServices/Community";
import DemandGenBundle from "./pages/servicesCategory/GrowthDemandGenration/GrowthDemandGenrationServices/DemandGenBundle";
import InfluencerUGC from "./pages/servicesCategory/GrowthDemandGenration/GrowthDemandGenrationServices/InfluencerUGC";
import PartnerAffiliate from "./pages/servicesCategory/GrowthDemandGenration/GrowthDemandGenrationServices/PartnerAffiliate";
import ViralCulture from "./pages/servicesCategory/GrowthDemandGenration/GrowthDemandGenrationServices/ViralCulture";

/* -------- Blog -------- */
import BlogIndex from "./blog/ui/BlogIndex";
import CategoryLanding from "./blog/ui/CategoryLanding";
import PostDetail from "./blog/ui/PostDetail";
import { BlogDataProvider } from "./blog/state/BlogDataProvider";

/* -------- Misc -------- */
import Support from "./pages/resources/Support";
import ResourcesCommunity from "./pages/resources/Community";
import Template from "./pages/resources/Template";
import Insights from "./pages/resources/Insights";
import ReferAndEarn from "./pages/ReferAndEarn";
import NotFound from "./pages/NotFound";

/* -------- Free Tools (lazy-loaded) -------- */
const ToolsIndexPage  = lazy(() => import("@/Features/free-tools/index/ToolsIndexPage"));
const UTMPage         = lazy(() => import("@/Features/free-tools/utm/UTMPage"));
const HashtagPage     = lazy(() => import("@/Features/free-tools/hashtags/HashtagPage"));
const ImageGenPage    = lazy(() => import("@/Features/free-tools/image-genrator/ImageGenPage")); // keep existing folder name
const FigurinePage    = lazy(() => import("@/Features/free-tools/figurine-maker/FigurinePage"));
const ShortenerPage   = lazy(() => import("@/Features/free-tools/url-shortener/ShortenerPage"));
const TextFormatterPage = lazy(() => import("@/Features/free-tools/text-formatter/TextFormatterPage"));
const LinkedInPostGeneratorPage = lazy(() => import("@/Features/free-tools/linkedin-post-generator/LinkedInPostGeneratorPage"));
const SocialImageGeneratorPage = lazy(() => import("@/Features/free-tools/social-image-generator/SocialImageGeneratorPage"));
const ImageResizerPage = lazy(() => import("@/Features/free-tools/image-resizer/ImageResizerPage"));
const QRCodePage = lazy(() => import("@/Features/free-tools/QRCode/QRCodePage"));

const queryClient = new QueryClient();
const Loader = () => <div className="p-6">Loading…</div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* force top-of-page on navigation */}
        <ScrollManager />
        <Layout>
          <Routes>
            {/* Core pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/search" element={<Search />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/legal/data-processing-addendum" element={<DataProcessingAddendum />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/resources/faq" element={<FAQ />} />

            {/* Service Category Routes */}
            <Route path="/services/performance-marketing" element={<PerformanceMarketingCategory />} />
            <Route path="/services/linkedin-growth" element={<LinkedInGrowthCategory />} />
            <Route path="/services/content-creative" element={<ContentCreativeCategory />} />
            <Route path="/services/growth-demand-generation" element={<GrowthDemandGenerationCategory />} />
            <Route path="/services/analytics-ai" element={<AnalyticsAICategory />} />
            <Route path="/services/brand-reputation" element={<BrandReputationCategory />} />

            {/* Individual Service Routes - Performance Marketing */}
            <Route path="/services/performance-marketing/google-ads" element={<GoogleAds />} />
            <Route path="/services/performance-marketing/meta-ads" element={<MetaAds />} />
            <Route path="/services/performance-marketing/youtube-ads" element={<YoutubeAds />} />
            <Route path="/services/performance-marketing/cro-funnel" element={<CROFunnel />} />
            <Route path="/services/performance-marketing/short-video-ads" element={<ShortVideoAds />} />
            <Route path="/services/performance-marketing/performance-accelerator-bundle" element={<PerformanceAcceleratorBundle />} />

            {/* Individual Service Routes - LinkedIn Growth */}
            <Route path="/services/linkedin-growth/linkedin-ads" element={<LinkedInAds />} />
            <Route path="/services/linkedin-growth/lead-genration" element={<LeadGenration />} />
            <Route path="/services/linkedin-growth/page-management" element={<PageManagement />} />
            <Route path="/services/linkedin-growth/executive-leadership" element={<ExecutiveLeadership />} />
            <Route path="/services/linkedin-growth/sales-navigator" element={<SalesNavigator />} />
            <Route path="/services/linkedin-growth/linkedin-growth-bundle" element={<LinkedInGrowthBundle />} />

            {/* Individual Service Routes - Analytics & AI */}
            <Route path="/services/analytics-ai/AI-Powered-Campaigns" element={<AIPoweredCampaigns />} />
            <Route path="/services/analytics-ai/analytics-dashboards" element={<AnalyticsDashboards />} />
            <Route path="/services/analytics-ai/attribution-funnel" element={<AttributionFunnels />} />
            <Route path="/services/analytics-ai/crm-automation" element={<CRMAutomation />} />
            <Route path="/services/analytics-ai/mesurement-AI-Bundle" element={<MesurementAIBundle />} />
            <Route path="/services/analytics-ai/tagging-ga4-audit" element={<TaggingGA4Audit />} />

            {/* Individual Service Routes - Brand & Reputation */}
            <Route path="/services/brand-reputation/brand-momentum-bundle" element={<BrandMomentumBundle />} />
            <Route path="/services/brand-reputation/brand-strategy" element={<BrandStrategy />} />
            <Route path="/services/brand-reputation/employer-branding" element={<EmployerBranding />} />
            <Route path="/services/brand-reputation/lifestyle-vibe" element={<LifestyleVibe />} />
            <Route path="/services/brand-reputation/pr-orm" element={<PRandORM />} />
            <Route path="/services/brand-reputation/website-ux-landing-page" element={<WebsiteUXLandingPage />} />

            {/* Individual Service Routes - Content & Creative */}
            <Route path="/services/content-creative/carousels-visuals" element={<CarouselsVisuals />} />
            <Route path="/services/content-creative/content-strategy" element={<ContentStrategy />} />
            <Route path="/services/content-creative/full-funnel-content-bundle" element={<FullFunnelContent />} />
            <Route path="/services/content-creative/sales-collateral" element={<SalesCollateral />} />
            <Route path="/services/content-creative/seo-content-production" element={<SEOContentProduction />} />
            <Route path="/services/content-creative/video-production" element={<VideoProduction />} />

            {/* Individual Service Routes - Growth & Demand Generation */}
            <Route path="/services/growth-demand-generation/abm-campaigns" element={<ABMCampaigns />} />
            <Route path="/services/growth-demand-generation/community" element={<Community />} />
            <Route path="/services/growth-demand-generation/demand-gen-bundle" element={<DemandGenBundle />} />
            <Route path="/services/growth-demand-generation/influencer-ugc" element={<InfluencerUGC />} />
            <Route path="/services/growth-demand-generation/partner-affiliate" element={<PartnerAffiliate />} />
            <Route path="/services/growth-demand-generation/viral-culture" element={<ViralCulture />} />

            {/* Blog - Wrapped with BlogDataProvider */}
            <Route path="/resources/blog/*" element={
              <BlogDataProvider>
                <Routes>
                  <Route index element={<BlogIndex />} />
                  <Route path=":category" element={<CategoryLanding />} />
                  <Route path=":category/:slug" element={<PostDetail />} />
                </Routes>
              </BlogDataProvider>
            } />

            <Route path="/resources/support" element={<Support />} />

            {/* ---------- Free Tools hub + pages (lazy) ---------- */}
            <Route
              path="/resources/tools"
              element={
                <Suspense fallback={<Loader />}>
                  <ToolsIndexPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/utm"
              element={
                <Suspense fallback={<Loader />}>
                  <UTMPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/hashtags"
              element={
                <Suspense fallback={<Loader />}>
                  <HashtagPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/image-generator"
              element={
                <Suspense fallback={<Loader />}>
                  <ImageGenPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/figurine-maker"
              element={
                <Suspense fallback={<Loader />}>
                  <FigurinePage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/url-shortener"
              element={
                <Suspense fallback={<Loader />}>
                  <ShortenerPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/text-formatter"
              element={
                <Suspense fallback={<Loader />}>
                  <TextFormatterPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/linkedin-post-generator"
              element={
                <Suspense fallback={<Loader />}>
                  <LinkedInPostGeneratorPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/social-image-generator"
              element={
                <Suspense fallback={<Loader />}>
                  <SocialImageGeneratorPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/image-resizer"
              element={
                <Suspense fallback={<Loader />}>
                  <ImageResizerPage />
                </Suspense>
              }
            />
            <Route
              path="/resources/tools/qr-code-generator"
              element={
                <Suspense fallback={<Loader />}>
                  <QRCodePage />
                </Suspense>
              }
            />

            {/* Redirect old free-tools path to new hub */}
            <Route path="/resources/free-tools" element={<Navigate to="/resources/tools" replace />} />

            {/* Placeholder routes for other resources */}
            <Route path="/resources/templates" element={<Template />} />
            <Route path="/resources/insights" element={<Insights />} />
            <Route path="/resources/community" element={<ResourcesCommunity />} />
            <Route path="/resources/refer-and-earn" element={<ReferAndEarn />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
