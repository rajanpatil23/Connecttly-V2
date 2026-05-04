// src/Features/free-tools/utm/utils/presets.ts

export type PresetKey =
  | "google_ads"
  | "meta_ads"
  | "linkedin_ads"
  | "email"
  | "whatsapp"
  | "newsletter";

export type Preset = {
  key: PresetKey;
  label: string;
  defaults: Partial<Record<string, string>>;
  hints?: string[];
};

export const PRESETS: Preset[] = [
  {
    key: "google_ads",
    label: "Google Ads",
    defaults: {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    },
    hints: ["source=google", "medium=cpc", "campaign=your_adgroup/theme"],
  },
  {
    key: "meta_ads",
    label: "Meta Ads",
    defaults: {
      utm_source: "facebook",
      utm_medium: "paid_social",
      utm_campaign: "",
      utm_content: "",
    },
    hints: ["source=facebook", "medium=paid_social"],
  },
  {
    key: "linkedin_ads",
    label: "LinkedIn Ads",
    defaults: {
      utm_source: "linkedin",
      utm_medium: "paid_social",
      utm_campaign: "",
      utm_content: "",
    },
    hints: ["source=linkedin", "medium=paid_social"],
  },
  {
    key: "email",
    label: "Email",
    defaults: {
      utm_source: "email",
      utm_medium: "email",
      utm_campaign: "",
      utm_content: "newsletter",
    },
    hints: ["source=email", "content=newsletter"],
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    defaults: {
      utm_source: "whatsapp",
      utm_medium: "share",
      utm_campaign: "",
    },
    hints: ["Use for shared links in chats"],
  },
  {
    key: "newsletter",
    label: "Newsletter",
    defaults: {
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "",
      utm_content: "weekly",
    },
    hints: ["source=newsletter", "content=weekly/digest"],
  },
];

export const UTM_KEYS_ORDER = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_term",
  "utm_content",
] as const;

export type Normalization = {
  lowercaseValues: boolean;
  spaceReplacement: "hyphen" | "underscore" | "encode";
  strictEncode: boolean; // RFC3986 encodeURIComponent-safe
};

export const DEFAULT_NORMALIZATION: Normalization = {
  lowercaseValues: true,
  spaceReplacement: "hyphen",
  strictEncode: true,
};
