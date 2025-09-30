// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            lucide: ["lucide-svelte", "lucide-astro"],
          },
        },
      },
    },
    ssr: {
      noExternal: ["lucide-svelte", "lucide-astro"],
    },
  },

  build: {
    inlineStylesheets: "auto",
  },

  compressHTML: true,
});
