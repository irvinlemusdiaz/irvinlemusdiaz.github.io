import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Drafts show up with `npm run dev` but are left out of the live site.
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    kind: z.string(), // e.g. "Desktop App", "Android App", "Homelab"
    stack: z.array(z.string()).default([]),
    status: z.enum(['released', 'in-progress', 'coming-soon']).default('released'),
    order: z.number().default(100),
    color: z.enum(['blue', 'coral', 'lime', 'ink']).default('blue'),
    link: z.string().optional(), // download / repo link
    linkLabel: z.string().optional(),
    // Optional playable web build in public/games/<folder>/index.html
    godotEmbed: z.string().optional(),
    screenshots: z
      .array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
  }),
});

export const collections = { blog, projects };
