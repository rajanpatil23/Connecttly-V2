// src/Features/free-tools/utm/UTMPage.tsx
import { ToolLayout } from "../common/components/ToolLayout";
import UTMForm from "./components/UTMForm";
// src/Features/free-tools/utm/UTMPage.tsx


export default function UTMPage() {
  return (
    <ToolLayout
      title="UTM Builder"
      description="Build clean, consistent UTM-tagged links. Save presets, add custom parameters, and optionally use AI to polish names."
      width="xl"
      breadcrumb={[
        { label: "Free Tools", href: "/resources/tools" },
        { label: "UTM Builder" },
      ]}
    >
      <UTMForm />
    </ToolLayout>
  );
}
