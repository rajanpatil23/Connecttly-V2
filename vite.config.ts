import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// MDX must run BEFORE React
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

export default defineConfig(() => {
  const plugins: PluginOption[] = [
    { ...(mdx({ remarkPlugins: [remarkGfm], include: /\.mdx?$/ })), enforce: "pre" } as PluginOption,
    react(),
  ];

  return {
    base: "/",                 // IMPORTANT for production at domain root
    server: { host: true, port: 8080 }, // safe dev host (avoid '::')
    plugins,
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    build: { outDir: "dist" }, // default, explicit for clarity
  };
});
