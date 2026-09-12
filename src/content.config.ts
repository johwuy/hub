import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const markdownLoader = (base: string) => glob({
  pattern: "**/*.{md,mdx}",
  base,
  generateId: ({ entry }) => entry.replace(/(?:\/index)?\.(?:md|mdx)$/, ""),
});

const blog = defineCollection({
  loader: markdownLoader("./src/content/blog"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    tableOfContents: z.boolean().default(true),
  }),
});

const work = defineCollection({
  loader: markdownLoader("./src/content/work"),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
});

const projects = defineCollection({
  loader: markdownLoader("./src/content/projects"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
  }),
});

export const collections = { blog, work, projects };
