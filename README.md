# irvinlemusdiaz.com

Portfolio, blog, and benchmark site, built with [Astro](https://astro.build) and deployed to GitHub Pages by GitHub Actions.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321 (drafts are visible here)
npm run build    # production build into dist/ (drafts left out)
```

## Where things live

| What | Where |
|---|---|
| Blog posts | `src/content/blog/*.md` |
| Project pages | `src/content/projects/*.md` |
| Benchmark data | `src/data/benchmarks.json` |
| Screenshots and images | `public/images/` (use as `/images/name.png`) |
| Godot web builds | `public/games/<name>/index.html` |
| Home page | `src/pages/index.astro` |
| Styles | `css/styles.css` (original site) + `src/styles/additions.css` |

## Add a blog post

Create `src/content/blog/my-post.md`:

```markdown
---
title: "My post"
description: "One-sentence summary for the list and search results."
date: 2026-12-01
tags: [godot, homelab]
draft: true   # change to false (or delete the line) to publish
---

Write in Markdown here.
```

## Add a benchmark run

Add an object to the top of `experiments` in `src/data/benchmarks.json`. Each chart is a list of bars; set
`"highlight": true` on the option you kept and `"muted": true` on baselines or rejected options. Use
`"higherIsBetter": false` for times. Update `updated` and, if needed, `headline`.

## Add screenshots or a playable Godot build to a project

In the project's front matter:

```yaml
screenshots:
  - { src: /images/freecalc-graph.png, alt: "FreeCalc graphing three functions", caption: "Trace and tangent" }
godotEmbed: freecalc   # loads public/games/freecalc/index.html
```

For the web build, export from Godot with **Web** as the platform and **Thread Support turned off** (GitHub Pages
can't send the headers the threaded build needs), and name the HTML file `index.html`. Keep single files under
100 MB.

## Going live

1. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Merge this branch into `main`. The workflow builds and deploys automatically.
3. The custom domain (`irvinlemusdiaz.com`) stays as set in Settings → Pages.
