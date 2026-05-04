// src/Features/free-tools/linkedin-post-generator/components/InputsPanel.tsx
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GOALS, INDUSTRIES, TONES, LENGTHS } from "../constants";
import { FormState, LengthOption, HashtagStrategy } from "../types";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";

export default function InputsPanel({
  value,
  onChange,
  onGenerate,
  onSuggestTopics,
  disabled,
  busy,
}: {
  value: FormState;
  onChange: (v: FormState) => void;
  onGenerate: () => void;
  onSuggestTopics: (goal: string, industry: string) => Promise<string[]>;
  disabled?: boolean;
  busy?: boolean;
}) {
  const [ideas, setIdeas] = useState<string[] | null>(null);
  const [ideasBusy, setIdeasBusy] = useState(false);
  const [ideasError, setIdeasError] = useState<string | null>(null);

  const getIdeas = async () => {
    setIdeasBusy(true);
    setIdeasError(null);
    try {
      const list = await onSuggestTopics(value.goal, value.industry);
      setIdeas(list);
    } catch (e: any) {
      setIdeasError(e?.message || "Could not fetch ideas.");
    } finally {
      setIdeasBusy(false);
    }
  };

  // when an idea is selected: set topic AND immediately clear the ideas list
  const pickIdea = (s: string) => {
    onChange({ ...value, topic: s });
    setIdeas(null); // hide the list after selection
  };

  return (
    <div className="space-y-5">
      {/* Goal */}
      <div className="space-y-2">
        <Label className="text-slate-900">Post goal</Label>
        <Select
          value={value.goal}
          onValueChange={(v) => onChange({ ...value, goal: v })}
        >
          <SelectTrigger className="bg-white text-slate-900 border-slate-200">
            <SelectValue placeholder="Select a goal" />
          </SelectTrigger>
          <SelectContent className="bg-white text-slate-900 border-slate-200">
            {GOALS.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Industry with conditional custom field */}
      <div className="grid gap-2">
        <Label className="text-slate-900">Industry</Label>
        <Select
          value={value.industry}
          onValueChange={(v) =>
            onChange({
              ...value,
              industry: v,
              customIndustry: v === "Other" ? value.customIndustry : "",
            })
          }
        >
          <SelectTrigger className="bg-white text-slate-900 border-slate-200">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent className="bg-white text-slate-900 border-slate-200 max-h-64 overflow-y-auto">
            {INDUSTRIES.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value.industry === "Other" && (
          <input
            value={value.customIndustry}
            onChange={(e) =>
              onChange({ ...value, customIndustry: e.target.value })
            }
            placeholder="Please specify your industry…"
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-[#0074ED]/40 focus-visible:ring-offset-2"
          />
        )}
      </div>

      {/* Topic / Brief */}
      <div className="space-y-2">
        <Label className="text-slate-900">Topic / brief</Label>
        <textarea
          value={value.topic}
          onChange={(e) => onChange({ ...value, topic: e.target.value })}
          placeholder="What’s your post about?"
          rows={4}
          className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-[15px] leading-6 text-slate-900 outline-none"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="gap-2 bg-white text-[#0A1F3D] border-slate-200 hover:bg-white/95"
            onClick={getIdeas}
            disabled={ideasBusy}
          >
            {ideasBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="h-4 w-4" />
            )}
            Generate topic ideas
          </Button>
        </div>

        {ideasError && <p className="text-xs text-red-600">{ideasError}</p>}

        {/* Ideas list: appears under the button; disappears immediately after a pick */}
        {ideas && ideas.length > 0 && (
          <Card className="mt-2 border-slate-200 bg-slate-50 p-2">
            <div className="grid gap-2">
              {ideas.map((s, i) => (
                <button
                  key={i}
                  onClick={() => pickIdea(s)}
                  className="rounded-md bg-white px-3 py-2 text-left text-sm text-slate-800 hover:bg-slate-100 border border-slate-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Style */}
      <div className="space-y-2">
        <Label className="text-slate-900">Style</Label>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <div className="text-xs text-slate-500">Tone</div>
            <Select
              value={value.tone}
              onValueChange={(v) => onChange({ ...value, tone: v })}
            >
              <SelectTrigger className="bg-white text-slate-900 border-slate-200">
                <SelectValue placeholder="Tone" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 border-slate-200 max-h-64 overflow-y-auto">
                {TONES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-500">Length</div>
            <Select
              value={value.length}
              onValueChange={(v) =>
                onChange({ ...value, length: v as LengthOption })
              }
            >
              <SelectTrigger className="bg-white text-slate-900 border-slate-200">
                <SelectValue placeholder="Length" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 border-slate-200">
                {LENGTHS.map((l) => (
                  <SelectItem key={l.key} value={l.key}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-500">Formality</div>
            <Slider
              defaultValue={[value.formality]}
              value={[value.formality]}
              onValueChange={([v]) => onChange({ ...value, formality: v })}
              min={0}
              max={100}
              step={5}
              className="cursor-pointer"
            />
            <div className="text-xs text-slate-500">{value.formality} / 100</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-500">Hashtags</div>
            <Select
              value={value.hashtag}
              onValueChange={(v) =>
                onChange({ ...value, hashtag: v as HashtagStrategy })
              }
            >
              <SelectTrigger className="bg-white text-slate-900 border-slate-200">
                <SelectValue placeholder="Hashtags" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 border-slate-200">
                {["0", "3", "5", "auto"].map((h) => (
                  <SelectItem key={h} value={h}>
                    {h === "auto" ? "Auto (smart)" : `${h} tags`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <label className="mt-2 inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={value.emoji}
            onChange={(e) => onChange({ ...value, emoji: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-[#0074ED] focus:ring-[#0074ED]"
          />
          Include emojis
        </label>
      </div>

      {/* Generate */}
      <div className="pt-2">
        <Button
          disabled={disabled}
          onClick={onGenerate}
          className={cn(
            "w-full gap-2 text-white",
            // Gradient + exact shadow spec
            "bg-gradient-to-r from-[#0A1F3D] to-[#0074ED]",
            "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
            "hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1)]",
            // Nice focus ring without altering your palette
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D]",
            disabled ? "opacity-70" : ""
          )}
          style={{
            // fallback inline background for environments without Tailwind JIT
            background: "linear-gradient(to right, #0A1F3D, #0074ED)",
            color: "white",
          }}
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Generate post
        </Button>
      </div>
    </div>
  );
}
