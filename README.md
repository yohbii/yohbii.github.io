# yohbi's Personal Website

An academic personal site built with Astro, MDX, KaTeX, BibTeX references,
RSS, sitemap generation, and optional Giscus comments.

## Local Development

```sh
npm install
npm run dev
```

The site is configured for a root GitHub Pages deployment such as
`https://username.github.io`. Update `site` in `astro.config.mjs` and the profile
details in `src/lib/site.ts` before publishing.

## Writing Posts

Add MDX files under `src/content/blog/`. Supported frontmatter:

```yaml
title: "Post Title"
description: "Short archive description."
date: 2026-05-09
updated: 2026-05-10
tags: ["Research", "Notes"]
category: "research"
draft: false
comments: true
```

Use `category: "research"`, `"notes"`, or `"life"`. Posts with `draft: true`
are excluded from generated routes, archives, tags, categories, and RSS.

## Math and References

Use LaTeX in Markdown:

```md
Inline math: $E = mc^2$

$$
\mathrm{Attention}(Q, K, V) =
\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$
```

Add references to `src/data/references.bib`, then cite them in posts:

```md
This follows earlier work [@vaswani2017attention; @latour1987science].
```

Referenced entries are rendered automatically at the bottom of the post.

## Giscus Comments

Comments are hidden until Giscus is configured. After creating the GitHub
repository and enabling Discussions:

1. Install the Giscus GitHub app for the repository.
2. Generate values at `https://giscus.app`.
3. Add these GitHub Actions repository variables:

```txt
PUBLIC_GISCUS_REPO
PUBLIC_GISCUS_REPO_ID
PUBLIC_GISCUS_CATEGORY
PUBLIC_GISCUS_CATEGORY_ID
PUBLIC_GISCUS_MAPPING
PUBLIC_GISCUS_THEME
```

For local testing, copy `.env.example` to `.env` and fill in the same values.

## Build

```sh
npm run build
```

