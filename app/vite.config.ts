import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Build for GitHub Pages
// - base: "/HackerSpace/" so assets resolve under the repo path
// - outDir: "docs" so Pages can serve from /docs
export default defineConfig({
  plugins: [vue()],
  base: "/HackerSpace/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
