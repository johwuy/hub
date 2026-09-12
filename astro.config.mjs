import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mermaid from "astro-mermaid";

export default defineConfig({
  site: "https://johnnywu.net",
  compressHTML: true,
  integrations: [
    mermaid({
      theme: "neutral",
      autoTheme: true,
      enableLog: false,
      mermaidConfig: {
        fontFamily: "Instrument Sans, sans-serif",
        flowchart: {
          curve: "basis",
          nodeSpacing: 36,
          rankSpacing: 48,
        },
      },
    }),
    mdx(),
    sitemap(),
    tailwind(),
  ],
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid", "math"],
    },
  },
});
