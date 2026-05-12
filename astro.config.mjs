import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkCitations from "./src/plugins/remark-citations.mjs";

export default defineConfig({
  site: "https://username.github.io",
  integrations: [
    mdx({
      remarkPlugins: [remarkMath, remarkCitations],
      rehypePlugins: [rehypeKatex]
    }),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkCitations],
    rehypePlugins: [rehypeKatex],
    syntaxHighlight: "shiki"
  }
});
