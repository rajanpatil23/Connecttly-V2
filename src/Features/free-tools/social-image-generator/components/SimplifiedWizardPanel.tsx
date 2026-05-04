import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Trash2, Sparkles } from "lucide-react";
import { textGenerate } from "@/Features/free-tools/common/api/aiClient";

/* ----------------------------- UI tokens ----------------------------- */
const LABEL = "text-[13px] font-medium text-slate-800";
const FIELD =
  "h-11 rounded-lg bg-white border border-slate-300 text-[15px] " +
  "text-slate-900 placeholder:text-slate-400 " +
  "focus-visible:ring-2 focus-visible:ring-[#0074ED]/30 " +
  "focus-visible:ring-offset-2 focus-visible:outline-none";

const SELECT_TRIGGER = cn(
  FIELD,
  "data-[placeholder]:text-slate-400 data-[state=open]:ring-2"
);

const SELECT_CONTENT =
  "bg-white text-slate-900 border border-slate-200 rounded-md shadow-md " +
  "focus:outline-none overflow-auto";

const SELECT_ITEM =
  "relative cursor-pointer rounded px-3 py-2 text-[15px] text-slate-900 text-left " +
  "pl-3 pr-3 " +
  "[&>span:first-child]:hidden " +
  "hover:bg-slate-100 hover:text-slate-900 " +
  "focus:bg-slate-100 focus:text-slate-900 " +
  "data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-900 " +
  "data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900 " +
  "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none";

/* ----------------------------- Constants ----------------------------- */
const PLATFORMS = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "tiktok", label: "TikTok" },
  { key: "x", label: "X (Twitter)" },
  { key: "youtube", label: "YouTube" },
  { key: "pinterest", label: "Pinterest" },
];

const POST_TYPES = [
  { key: "promo", label: "Promo/Sales" },
  { key: "meme", label: "Meme" },
  { key: "tips", label: "Tips/How-to" },
  { key: "event", label: "Event" },
  { key: "announcement", label: "Announcement" },
  { key: "testimonial", label: "Testimonial" },
  { key: "carousel", label: "Carousel" },
  { key: "quote", label: "Quote" },
  { key: "poll", label: "Poll" },
];

const FONTS = [
  { key: "inter", label: "Inter (Modern)" },
  { key: "poppins", label: "Poppins (Friendly)" },
  { key: "playfair", label: "Playfair (Elegant)" },
  { key: "roboto", label: "Roboto (Clean)" },
  { key: "montserrat", label: "Montserrat (Bold)" },
  { key: "opensans", label: "Open Sans (Readable)" },
];

const IMAGE_COUNTS = [
  { key: "1", label: "1 Image" },
  { key: "2", label: "2 Images" },
  { key: "3", label: "3 Images" },
  { key: "4", label: "4 Images" },
];

/* ----------------------------- Types ----------------------------- */
export type SimplifiedFormData = {
  platform: string;
  postType: string;
  logoDataUrl?: string;
  font: string;
  userPrompt: string;
  enhancedPrompt: string;
  imageCount: number;
};

type Props = {
  formData: SimplifiedFormData;
  setFormData: (data: SimplifiedFormData) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  error?: string;
};

/* ----------------------------- Helper Functions ----------------------------- */
async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (result === null) {
        reject(new Error("Failed to read file: result is null"));
        return;
      }
      resolve(String(result));
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file: " + (reader.error?.message || "Unknown error")));
    };
    reader.readAsDataURL(file);
  });
}

async function enhancePrompt(userPrompt: string, platform: string, postType: string, font: string): Promise<string> {
  const system = `You are an image prompt enhancer. Improve the user's description to create better images. Make the description more vivid and specific while keeping it concise.`;

  const prompt = `Enhance this image description for a ${postType} image for ${platform} with ${font} style: "${userPrompt}"`;

  try {
    const enhanced = await textGenerate(prompt, { 
      system, 
      temperature: 0.7, 
      maxTokens: 150 
    });
    return enhanced.toString();
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return userPrompt; // Fallback to original prompt
  }
}

/* ----------------------------- Component ----------------------------- */
export default function SimplifiedWizardPanel({
  formData,
  setFormData,
  onGenerate,
  isGenerating,
  error,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const updateFormData = (updates: Partial<SimplifiedFormData>) => {
    setFormData({ ...formData, ...updates });
  };

  const handleLogoUpload = async (file?: File | null) => {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file);
      updateFormData({ logoDataUrl: url });
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!formData.userPrompt.trim()) return;
    
    setIsEnhancing(true);
    try {
      const enhanced = await enhancePrompt(
        formData.userPrompt,
        formData.platform,
        formData.postType,
        formData.font
      );
      updateFormData({ enhancedPrompt: enhanced });
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const canGenerate = formData.userPrompt.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Platform and Type of Post - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="grid gap-2">
          <Label className={LABEL}>Platform</Label>
          <Select value={formData.platform} onValueChange={(value) => updateFormData({ platform: value })}>
            <SelectTrigger className={SELECT_TRIGGER}>
              <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent className={SELECT_CONTENT}>
              {PLATFORMS.map((platform) => (
                <SelectItem key={platform.key} value={platform.key} className={SELECT_ITEM}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <section className="grid gap-2">
          <Label className={LABEL}>Type of Post</Label>
          <Select value={formData.postType} onValueChange={(value) => updateFormData({ postType: value })}>
            <SelectTrigger className={SELECT_TRIGGER}>
              <SelectValue placeholder="Select post type" />
            </SelectTrigger>
            <SelectContent className={SELECT_CONTENT}>
              {POST_TYPES.map((type) => (
                <SelectItem key={type.key} value={type.key} className={SELECT_ITEM}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
      </div>

      {/* Logo Upload - Modern Drag & Drop */}
      <section className="grid gap-2">
        <Label className={LABEL}>Logo (Optional)</Label>
        <div 
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            "hover:border-slate-400 hover:bg-slate-50",
            formData.logoDataUrl ? "border-green-300 bg-green-50" : "border-slate-300 bg-slate-50"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              handleLogoUpload(files[0]);
            }
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleLogoUpload(e.target.files?.[0])}
            className="hidden"
          />
          
          {formData.logoDataUrl ? (
            <div className="space-y-3">
              <img 
                src={formData.logoDataUrl} 
                alt="Uploaded logo" 
                className="h-16 w-auto mx-auto rounded border border-slate-200"
              />
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  className="gap-2"
                >
                  <ImageIcon className="h-4 w-4" /> Change Logo
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateFormData({ logoDataUrl: undefined })}
                  className="gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
                className="gap-2"
              >
                <ImageIcon className="h-4 w-4" /> Upload Logo
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Font Reference and Number of Images - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="grid gap-2">
          <Label className={LABEL}>Font Reference</Label>
          <Select value={formData.font} onValueChange={(value) => updateFormData({ font: value })}>
            <SelectTrigger className={SELECT_TRIGGER}>
              <SelectValue placeholder="Select font style" />
            </SelectTrigger>
            <SelectContent className={SELECT_CONTENT}>
              {FONTS.map((font) => (
                <SelectItem key={font.key} value={font.key} className={SELECT_ITEM}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <section className="grid gap-2">
          <Label className={LABEL}>Number of Images</Label>
          <Select value={formData.imageCount.toString()} onValueChange={(value) => updateFormData({ imageCount: parseInt(value) })}>
            <SelectTrigger className={SELECT_TRIGGER}>
              <SelectValue placeholder="Select number of images" />
            </SelectTrigger>
            <SelectContent className={SELECT_CONTENT}>
              {IMAGE_COUNTS.map((count) => (
                <SelectItem key={count.key} value={count.key} className={SELECT_ITEM}>
                  {count.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
      </div>

      {/* Describe Your Image - Full Width */}
      <section className="grid gap-3">
        <Label className={LABEL}>Describe Your Image</Label>
        <Textarea
          className={cn(FIELD, "min-h-[100px]")}
          value={formData.userPrompt}
          onChange={(e) => updateFormData({ userPrompt: e.target.value })}
          placeholder="e.g., A minimalist desk setup with a laptop showing our new app"
          rows={4}
        />
        
        <Button
          variant="outline"
          onClick={handleEnhancePrompt}
          disabled={!formData.userPrompt.trim() || isEnhancing}
          className="w-fit gap-2 mx-auto"
        >
          <Sparkles className="h-4 w-4" />
          {isEnhancing ? "Enhancing..." : "Enhance Prompt"}
        </Button>

        {formData.enhancedPrompt && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Label className={cn(LABEL, "text-blue-800 mb-2 block font-semibold")}>Enhanced Prompt:</Label>
            <p className="text-sm text-blue-700 leading-relaxed">{formData.enhancedPrompt}</p>
          </div>
        )}
      </section>

      {/* Generate Images Button */}
      <section className="pt-2">
        <Button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          className={cn(
            "w-full h-12 gap-2 text-white text-base font-medium",
            "bg-gradient-to-r from-[#0A1F3D] to-[#0074ED]",
            "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
            "hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1)]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isGenerating ? "Generating Images..." : "Generate Images"}
        </Button>
        
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </section>
    </div>
  );
}
