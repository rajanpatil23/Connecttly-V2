// src/Features/free-tools/linkedin-post-generator/LinkedInPostGeneratorPage.tsx
import { useEffect, useMemo, useState } from "react";
import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import InputsPanel from "./components/InputsPanel";
import EditorPanel from "./components/EditorPanel";
import PreviewPanel from "./components/PreviewPanel";
import { Button } from "@/components/ui/button";
import { generateLinkedInPost, suggestTopics } from "./api/postGenClient";
import { buildImagePrompt } from "./utils/imagePrompt";
import { FormState, PostDraft, UiPane, GenState } from "./types";
import useLocalStorage from "@/Features/free-tools/common/hooks/useLocalStorage";
import { generateImages } from "@/Features/free-tools/image-genrator/api/imageGenClient"; // keep existing import
import { RotateCcw } from "lucide-react";

const MAX_CHARS = 3000;
const WARN_AT = 2800;

export default function LinkedInPostGeneratorPage() {
  const [pane, setPane] = useState<UiPane>("editor"); // editor | preview
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");

  // Left form state (pre-generate)
  const [form, setForm] = useState<FormState>({
    goal: "",
    industry: "",
    customIndustry: "",
    topic: "",
    tone: "Professional",
    formality: 50,
    length: "medium",
    emoji: false,
    hashtag: "auto",
  });

  // Right editor state
  const [postText, setPostText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [genState, setGenState] = useState<GenState>("idle");
  const [error, setError] = useState<string | null>(null);

  // Draft persistence (text + image prompt/url + pane/device)
  const [draft, setDraft] = useLocalStorage<PostDraft>("lpgen_draft_v1", {
    postText: "",
    imageUrl: null,
    imagePrompt: "",
    pane: "editor",
    device: "desktop",
    form,
  });

  // restore draft on first load (once)
  useEffect(() => {
    if (draft && (draft.postText || draft.imagePrompt)) {
      setPostText(draft.postText || "");
      setImageUrl(draft.imageUrl || null);
      setImagePrompt(draft.imagePrompt || "");
      setPane((draft.pane as UiPane) || "editor");
      setDevice((draft.device as "mobile" | "desktop") || "desktop");
      setForm(draft.form || form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-save draft
  useEffect(() => {
    setDraft({ postText, imageUrl, imagePrompt, pane, device, form });
  }, [postText, imageUrl, imagePrompt, pane, device, form, setDraft]);

  const charCount = useMemo(() => (postText || "").length, [postText]);

  /* ------------------ Actions ------------------ */

  const onGeneratePost = async () => {
    setError(null);
    setGenState("generating_post");
    try {
      const text = await generateLinkedInPost(form);
      setPostText(text);
      setPane("editor");
      setGenState("post_ready");
      // Seed image prompt
      const prompt = buildImagePrompt({
        text,
        goal: form.goal,
        industry: form.industry === "Other" ? form.customIndustry : form.industry,
        tone: form.tone,
      });
      setImagePrompt(prompt);
      setImageUrl(null); // always start with prompt card
    } catch (e: any) {
      setError(e?.message || "Failed to generate post.");
      setGenState("error");
    }
  };

  const onRegeneratePostText = async () => {
    if (!form.goal || !form.topic.trim()) return;
    setError(null);
    setGenState("generating_post");
    try {
      const text = await generateLinkedInPost(form);
      setPostText(text);
      // keep existing image prompt/url as-is (text-only regen)
      setGenState(imageUrl ? "image_ready" : "post_ready");
    } catch (e: any) {
      setError(e?.message || "Failed to regenerate post.");
      setGenState(imageUrl ? "image_ready" : "post_ready");
    }
  };

  const onGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setError(null);
    setGenState("generating_image");
    try {
      const urls = await generateImages(imagePrompt, {
        aspect: "16:9",
        size: "2K",
        count: 1,
        timeoutMs: 60000,
      });
      setImageUrl(urls[0]);
      setGenState("image_ready");
    } catch (e: any) {
      setError(e?.message || "Image generation failed.");
      setGenState("post_ready");
    }
  };

  const onRegenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setError(null);
    setGenState("regenerating_image");
    try {
      const urls = await generateImages(imagePrompt, {
        aspect: "16:9",
        size: "2K",
        count: 1,
        timeoutMs: 60000,
      });
      setImageUrl(urls[0]);
      setGenState("image_ready");
    } catch (e: any) {
      setError(e?.message || "Image regeneration failed.");
      setGenState("image_ready"); // keep old image
    }
  };

  const onDeleteImage = () => {
    setImageUrl(null);
    setGenState("post_ready");
  };

  const onReset = () => {
    if (!confirm("Clear the current draft?")) return;
    setForm({
      goal: "",
      industry: "",
      customIndustry: "",
      topic: "",
      tone: "Professional",
      formality: 50,
      length: "medium",
      emoji: false,
      hashtag: "auto",
    });
    setPostText("");
    setImagePrompt("");
    setImageUrl(null);
    setGenState("idle");
    setError(null);
    setPane("editor");
    setDevice("desktop");
  };

  const canGenerate = form.goal.trim() && form.topic.trim();

  return (
    <ToolLayout
      title="LinkedIn Post Generator"
      description="Generate compelling LinkedIn posts with one click. Edit the text, add an optional AI image, and preview it in a realistic LinkedIn layout."
      width="xl"
      breadcrumb={[
        { label: "Free Tools", href: "/resources/tools" },
        { label: "LinkedIn Post Generator" },
      ]}
    >
      {/* Stack on mobile; split on large screens */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* LEFT: Inputs */}
        <Card className="border-slate-200 bg-white rounded-2xl overflow-hidden">
          <CardHeader className="py-3 sm:py-4" />
          <CardContent className="pt-0 sm:pt-0">
            <InputsPanel
              value={form}
              onChange={setForm}
              onGenerate={onGeneratePost}
              onSuggestTopics={(goal, industry) =>
                suggestTopics(goal, industry === "Other" ? form.customIndustry : industry)
              }
              disabled={!canGenerate || genState === "generating_post"}
              busy={genState === "generating_post"}
            />
          </CardContent>
        </Card>

        {/* RIGHT: Editor / Preview */}
        <Card className="border-slate-200 bg-white rounded-2xl overflow-hidden">
          <CardHeader className="py-3 sm:py-4" />
          <CardContent className="space-y-3 sm:space-y-4">
            {/* Top toggle (Editor | Preview) + Reset */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  className={cn(
                    "rounded-full px-3 py-1 text-sm transition w-1/2 sm:w-auto",
                    pane === "editor"
                      ? "bg-[#0074ED] text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900"
                  )}
                  onClick={() => setPane("editor")}
                >
                  Editor
                </button>
                <button
                  className={cn(
                    "rounded-full px-3 py-1 text-sm transition w-1/2 sm:w-auto",
                    pane === "preview"
                      ? "bg-[#0074ED] text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900"
                  )}
                  onClick={() => setPane("preview")}
                >
                  Preview
                </button>
              </div>

              {/* Reset button — simple black icon + label, readable in all states */}
              <div className="flex w-full sm:w-auto items-center gap-2">
                <Button
                  onClick={onReset}
                  aria-label="Reset post"
                  className="h-9 w-full sm:w-auto px-3 gap-2 bg-white text-[#111827] hover:bg-slate-100 border border-slate-200"
                >
                  <RotateCcw className="h-4 w-4 text-[#111827]" />
                  Reset post
                </Button>
              </div>
            </div>

            {pane === "editor" ? (
              <EditorPanel
                state={genState}
                error={error}
                postText={postText}
                setPostText={setPostText}
                imageUrl={imageUrl}
                imagePrompt={imagePrompt}
                setImagePrompt={setImagePrompt}
                onGenerateImage={onGenerateImage}
                onRegenerateImage={onRegenerateImage}
                onDeleteImage={onDeleteImage}
                onRegeneratePost={onRegeneratePostText}
                charCount={charCount}
                maxChars={MAX_CHARS}
                warnAt={WARN_AT}
              />
            ) : (
              <PreviewPanel
                device={device}
                setDevice={setDevice}
                postText={postText}
                imageUrl={imageUrl}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
