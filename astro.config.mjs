import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: true,
    }),
    astroI18next(),
  ],
});
