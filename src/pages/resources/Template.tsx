import PromptCollection from "@/components/Template/PromptCollection";
import CategoryShowcase from "@/components/Template/CategoryShowcaseCTA";
import PageHero from "@/components/_zip/PageHero";

export default function Template() {
  return (
    <div className="overflow-x-hidden bg-background">
      <PageHero
        eyebrow="Templates"
        title={<>Quickly start with 100s of <span className="gradient-text">AI prompts</span> for digital marketing</>}
        description="What used to take hours can be done in minutes. Use these prompts in any AI model—free—to get the result you want."
      />
      <PromptCollection />
      <CategoryShowcase ctaHref="/resources/tools" />
    </div>
  );
}
