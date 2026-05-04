// src/Features/free-tools/linkedin-post-generator/types.ts
export type LengthOption = "short" | "medium" | "long";
export type HashtagStrategy = "0" | "3" | "5" | "auto";
export type UiPane = "editor" | "preview";
export type GenState =
  | "idle"
  | "generating_post"
  | "post_ready"
  | "generating_image"
  | "regenerating_image"
  | "image_ready"
  | "error";

export type FormState = {
  goal: string;
  industry: string;
  customIndustry: string;
  topic: string;
  tone: string;
  formality: number; // 0 - 100
  length: LengthOption;
  emoji: boolean;
  hashtag: HashtagStrategy;
};

export type PostDraft = {
  postText: string;
  imageUrl: string | null;
  imagePrompt: string;
  pane: UiPane;
  device: "mobile" | "desktop";
  form: FormState;
};
