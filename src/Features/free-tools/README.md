# Free Tools Module — Structure, Conventions, and New Tool Checklist

Purpose: keep every tool consistent, discoverable, and easy to scaffold via prompt or codegen.

Root: `src/Features/free-tools/`

Recommended structure:
- routes.tsx — Route registration (lazy imports)
- index/
  - ToolsIndexPage.tsx — Landing grid showing all tools
- common/
  - components/
    - ToolLayout.tsx — Standard page shell (title, description, breadcrumbs, width)
    - ToolCard.tsx — Card used on the ToolsIndexPage
  - api/
    - aiClient.ts — Shared HTTP/proxy helpers (e.g., text/image generation)
    - aiSuggest.ts — Optional AI helper utilities
  - hooks/
    - useLocalStorage.ts — Shared hooks (used by multiple tools)
  - utils/
    - copy.ts — Shared utilities (e.g., clipboard helpers)
  - data/
    - tools.ts — TOOL_REGISTRY with metadata (slug/title/icon/status/etc.)
- <tool-slug>/
  - <ToolPageName>.tsx — Tool page (wrapped with ToolLayout)
  - components/ — Tool-specific components
  - api/ — Tool-specific API functions (built on common/api when applicable)
  - hooks/ — Tool-specific hooks
  - utils/ — Tool-specific utils
  - types.ts — Tool-specific types (optional)
  - constants.ts — Tool-specific constants (optional)
  - README.md — Tool-specific notes (optional)


## Where do I put what?

- Page shell & layout:
  - Use `ToolLayout` on every tool page for consistent title/description/breadcrumb/width.
- Routing:
  - Register each tool in `src/Features/free-tools/routes.tsx` with a lazy import.
  - Path: `/resources/tools/<tool-slug>`
  - File: `./<tool-slug>/<ToolPageName>`
- Tools index:
  - Add a `ToolCard` to `index/ToolsIndexPage.tsx` to surface the tool on the landing grid.
  - Optionally render cards from `TOOL_REGISTRY` in `common/data/tools.ts` if you want single-source metadata.
- Metadata:
  - Add an entry to `TOOL_REGISTRY` with `slug`, `title`, `description`, `category`, `icon`, `tags`, `status`, `requiresProxy`, etc.
- Shared vs per-tool code:
  - `common/*`: anything reused by two or more tools (hooks, API helpers, generic UI specific to free tools).
  - `<tool-slug>/*`: logic specific to a single tool (components, utils, hooks, API for that tool).
- Naming:
  - Folder (route): kebab-case, e.g. `text-formatter`
  - Page file: PascalCase ending with `Page.tsx`, e.g. `TextFormatterPage.tsx`
  - Components: PascalCase.tsx
  - Hooks: `useThing.ts`
  - Utils: `camelCase.ts`
- Import aliases:
  - Use a consistent alias casing everywhere: `@/Features/...`
  - Avoid mixing `@/features/...` to prevent issues on case-sensitive filesystems.


## Checklist — Adding a New Tool

1) Create folder and page:
- `src/Features/free-tools/<slug>/<ToolPageName>.tsx`
- Optional subfolders:
  - `components/`, `api/`, `hooks/`, `utils/`, `types.ts`, `constants.ts`

2) Register route in `routes.tsx`:
- Add: `{ path: "/resources/tools/<slug>", element: lazy(() => import("./<slug>/<ToolPageName>")) },`

3) Add a tile card on Tools Index:
- Edit `index/ToolsIndexPage.tsx` and add a `ToolCard` for discoverability.

4) Add metadata in `TOOL_REGISTRY` (optional but recommended):
- Edit `common/data/tools.ts` and append a new entry with slug, title, icon, tags, etc.

5) Use `ToolLayout` with proper breadcrumbs:
- Breadcrumb pattern: `Resources > Free Tools > <Title>`
- Prefer width `"lg"` or `"xl"` depending on your layout.

6) API and network calls:
- Place tool-specific fetchers under `<slug>/api/`.
- If you need server-side keys, use the proxy helpers from `common/api/aiClient.ts`.
- Set `requiresProxy: true` in the registry if applicable.

7) Test:
- Visit `/resources/tools` to confirm the tile.
- Visit `/resources/tools/<slug>` to confirm route and layout.
- Verify copy, clipboard, inputs, and any proxy calls.


## Route registration (snippet)

File: `src/Features/free-tools/routes.tsx`
- Add an item:

{ path: "/resources/tools/<slug>", element: lazy(() => import("./<slug>/<ToolPageName>")) },

Example:
{ path: "/resources/tools/text-formatter", element: lazy(() => import("./text-formatter/TextFormatterPage")) },


## Tools Index tile (snippet)

File: `src/Features/free-tools/index/ToolsIndexPage.tsx`
- Add a `ToolCard`:

<ToolCard
  to="/resources/tools/<slug>"
  title="<Title>"
  description="<1-sentence description>"
  icon={<SomeLucideIcon className="h-5 w-5" />}
  chips={["Chip1", "Chip2"]}
  badge="NEW"
/>


## TOOL_REGISTRY entry (snippet)

File: `src/Features/free-tools/common/data/tools.ts`
- Append:

{
  slug: "<slug>",
  title: "<Title>",
  description: "<short description>",
  category: "Analytics" | "Social" | "Creative" | "Dev",
  icon: SomeIcon, // import from lucide-react
  gradientFrom: "from-[#0A1F3D]",
  gradientTo: "to-[#0074ED]",
  tags: ["Tag1", "Tag2"],
  status: "live", // or "beta" | "soon"
  requiresProxy: false // or true
},


## Minimal page scaffold (copy-paste)

File: `src/Features/free-tools/<slug>/<ToolPageName>.tsx`

import { ToolLayout } from "@/Features/free-tools/common/components/ToolLayout";

export default function <ToolPageName>() {
  return (
    <ToolLayout
      title="<Title>"
      description="<Short description for SEO and UX>"
      width="lg"
      breadcrumb={[
        { label: "Resources", href: "/resources" },
        { label: "Free Tools", href: "/resources/tools" },
        { label: "<Title>" },
      ]}
    >
      {/* Your tool UI here */}
    </ToolLayout>
  );
}

Notes:
- Use consistent alias casing `@/Features/...`.
- Keep tool-specific logic inside the tool folder; extract to `common/*` only when reused by two or more tools.
- For network calls requiring API keys, always route via the proxy and avoid putting secrets in the browser.


## Optional improvements

- Render the tiles on ToolsIndexPage from `TOOL_REGISTRY` to avoid duplicate metadata (source of truth in one place).
- Add small badges (AI, NEW, SOON) consistently; align with `status` or dedicated `badge` config.
- Enforce alias casing via lint rules or CI checks to prevent regressions.


## Quick QA checklist (before PR)

- Route works: `/resources/tools/<slug>`
- Title/description/breadcrumbs show as expected in `ToolLayout`
- Tile visible on `/resources/tools`
- Registry entry (if used) is present and icon imports are correct
- All imports use `@/Features/...` casing
- If proxy required, `requiresProxy` set and calls go through `common/api/aiClient`
