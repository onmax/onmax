import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon(),
    metaTags(),
    tailwind({ nesting: true }),
  ],
  site: 'https://onmax.github.io',
  base: '/onmax',
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      // Alternatively, provide multiple themes
      // https://shiki.style/guide/dual-themes
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: []
    }
  },
  vite: {}
});
