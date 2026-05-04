// src/Features/free-tools/index/ToolsIndexPage.tsx
import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";
import { ToolCard } from "@/Features/free-tools/common/components/ToolCard";

export default function ToolsIndexPage() {
  return (
    <ToolLayout
      title="Free Tools"
      description="Fast, brand-aligned utilities for modern marketers and founders. No sign-in. Built to be practical, clean, and quick."
      breadcrumb={[]}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ToolCard
          to="/resources/tools/social-image-generator"
          title="Social Image Generator"
          description="Design platform-perfect images with native previews and export instantly."
          image="/images/free-tools/SocialImageGenerator.png"
          badge="NEW"
        />

        <ToolCard
          to="/resources/tools/linkedin-post-generator"
          title="LinkedIn Post Generator"
          description="Generate on-brand LinkedIn posts with optional AI imagery and preview."
          image="/images/free-tools/LinkedInPostGenerator.png"
          badge="AI"
        />

        <ToolCard
          to="/resources/tools/utm"
          title="UTM Builder"
          description="Craft consistent, analytics-friendly tracking links with bulk build support."
          image="/images/free-tools/UTMBuilder.png"
        />

        <ToolCard
          to="/resources/tools/hashtags"
          title="Hashtag Generator"
          description="Platform-aware suggestions for Instagram, LinkedIn, and TikTok."
          image="/images/free-tools/HashtagGenerator.png"
        />

        <ToolCard
          to="/resources/tools/image-generator"
          title="Image Generator"
          description="Generate on-brand images with AI in multiple aspect ratios."
          image="/images/free-tools/ImageGenerator.png"
          badge="AI"
        />

        <ToolCard
          to="/resources/tools/url-shortener"
          title="URL Shortener"
          description="Create branded short links with optional expiry and tracking."
          image="/images/free-tools/URLShortener.png"
        />

        <ToolCard
          to="/resources/tools/text-formatter"
          title="Text Formatter"
          description="Bold, italic, fullwidth & more for social captions."
          image="/images/free-tools/TextFormatter.png"
        />

        <ToolCard
          to="/resources/tools/image-resizer"
          title="Image Resizer"
          description="Resize images to perfect dimensions for any platform instantly."
          image="/images/free-tools/ImageResizer.png"
          badge="NEW"
        />

        <ToolCard
          to="/resources/tools/qr-code-generator"
          title="QR Code Generator"
          description="Generate QR codes for URLs, text, and contact information instantly."
          image="/images/free-tools/QRCodeGenerator.png"
          badge="NEW"
        />

        <ToolCard
          title="Figurine Maker"
          description="Create figure/mascot-style illustrations from prompts with presets."
          image="/images/free-tools/FigurineMaker.png"
          disabled
        />
      </div>
    </ToolLayout>
  );
}
