// src/Features/free-tools/routes.tsx
import { lazy } from "react";

export const FreeToolsRoutes = [
  { path: "/resources/tools",            element: lazy(() => import("./index/ToolsIndexPage")) },
  { path: "/resources/tools/utm",        element: lazy(() => import("./utm/UTMPage")) },
  { path: "/resources/tools/hashtags",   element: lazy(() => import("./hashtags/HashtagPage")) },
  { path: "/resources/tools/image-generator", element: lazy(() => import("./image-genrator/ImageGenPage")) },
  { path: "/resources/tools/figurine-maker",  element: lazy(() => import("./figurine-maker/FigurinePage")) },
  { path: "/resources/tools/url-shortener",  element: lazy(() => import("./url-shortener/ShortenerPage")) },
  { path: "/resources/tools/text-formatter", element: lazy(() => import("./text-formatter/TextFormatterPage")) },
  { path: "/resources/tools/linkedin-post-generator", element: lazy(() => import("./linkedin-post-generator/LinkedInPostGeneratorPage")) },
  { path: "/resources/tools/social-image-generator", element: lazy(() => import("./social-image-generator/SimplifiedSocialImageGeneratorPage")) },
  { path: "/resources/tools/image-resizer", element: lazy(() => import("./image-resizer/ImageResizerPage")) },

];
