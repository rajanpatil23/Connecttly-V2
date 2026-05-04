import { useState } from "react";
import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SimplifiedWizardPanel, { SimplifiedFormData } from "./components/SimplifiedWizardPanel";
import PreviewPanel from "./components/PreviewPanel";
import { generateSocialImages } from "./api/socialImageClient";

const NAVY = "#0A1F3D";

/* ----------------------------- Helper Functions ----------------------------- */

// Map platform to aspect ratio for the image API
function getAspectRatio(platform: string): string {
  const aspectMap: Record<string, string> = {
    instagram: "1:1",
    facebook: "16:9", 
    linkedin: "16:9",
    tiktok: "9:16",
    x: "16:9",
    youtube: "16:9",
    pinterest: "4:5",
  };
  return aspectMap[platform] || "1:1";
}

// Build the final prompt for image generation - merge all form fields properly
function buildFinalPrompt(formData: SimplifiedFormData, aspectRatio: string): string {
  const { platform, postType, font, enhancedPrompt, userPrompt, logoDataUrl } = formData;
  
  // Use enhanced prompt if available, otherwise use user prompt
  const userDescription = enhancedPrompt || userPrompt;
  
  // Build prompt parts with smooth, natural sentences
  const parts = [];
  
  // 1. Platform context with explicit aspect ratio
  parts.push(`Create a ${aspectRatio} aspect ratio image for ${platform}.`);
  
  // 2. Post type expectation
  parts.push(`Post type I expect: ${postType}.`);
  
  // 3. User's description (main content)
  parts.push(userDescription);
  
  // 4. Font/style reference
  parts.push(`Font style reference: ${font} aesthetic.`);
  
  // 5. Logo integration with aspect ratio emphasis (only if logo is uploaded)
  if (logoDataUrl) {
    parts.push(`Use attached logo for branding while maintaining ${aspectRatio} aspect ratio.`);
  }
  
  // 6. Explicit aspect ratio instruction
  parts.push(`Important: Generate image in ${aspectRatio} aspect ratio format.`);
  
  // Merge all parts into final prompt with smooth flow
  return parts.join(' ');
}

/* ----------------------------- Main Component ----------------------------- */

export default function SimplifiedSocialImageGeneratorPage() {
  const [formData, setFormData] = useState<SimplifiedFormData>({
    platform: "instagram",
    postType: "promo",
    font: "inter",
    userPrompt: "",
    enhancedPrompt: "",
    imageCount: 3,
  });

  const [images, setImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!formData.userPrompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const aspectRatio = getAspectRatio(formData.platform);
      const finalPrompt = buildFinalPrompt(formData, aspectRatio);

      const generatedImages = await generateSocialImages(finalPrompt, {
        aspect: aspectRatio,
        size: "2K",
        count: formData.imageCount,
        timeoutMs: 60000,
        logoDataUrl: formData.logoDataUrl,
      });

      setImages(generatedImages);
      setActiveImage(0);
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err?.message || "Failed to generate images. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ToolLayout
      title="Social Media Image Generator"
      description="Create stunning social media images with AI. Simply describe what you want, and we'll generate professional images optimized for your chosen platform."
      width="xl"
      breadcrumb={[
        { label: "Free Tools", href: "/resources/tools" },
        { label: "Social Media Image Generator" },
      ]}
    >
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* LEFT — Input Panel */}
        <Card className="rounded-2xl border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: NAVY }}>
              Create Your Image
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Fill in the details below to generate your perfect social media image
            </p>
          </CardHeader>
          <CardContent>
            <SimplifiedWizardPanel
              formData={formData}
              setFormData={setFormData}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              error={error}
            />
          </CardContent>
        </Card>

        {/* RIGHT — Preview Panel */}
        <Card className="rounded-2xl border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-[17px] font-semibold" style={{ color: NAVY }}>
              Generated Images
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              {images.length > 0 
                ? `${images.length} images generated • Click to select`
                : "Your generated images will appear here"
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {images.length > 0 ? (
              <PreviewPanel 
                platform={formData.platform as any} 
                images={images} 
                active={activeImage} 
                setActive={setActiveImage} 
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                <div className="text-center">
                  <div className="text-slate-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-sm">
                    {isGenerating ? "Generating your images..." : "Fill in the form and click 'Generate Images' to start"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
