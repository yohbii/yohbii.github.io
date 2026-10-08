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

## Visitor Map

The homepage uses the MapMyVisitors globe registered for this site. To replace
its embed code, set `PUBLIC_VISITOR_GLOBE_URL` and `PUBLIC_VISITOR_STATS_URL` in
`.env` locally and in GitHub Actions repository variables for deployment.

The default still uses `globe.js`. Its token comes from the same site's Map
Widget code: the Globe Widget code supplied by the dashboard returned HTML
from the data endpoint, whereas this token returns data for `/web/1c8jn`.

The globe artwork alone does not confirm that tracking works. Verify that
`globe_call_home.js` returns a JSONP callback, the globe links to the site's
`/web/…` statistics page, and visits appear there. If the provider returns HTML
instead, the page shows an unavailable message and a link to the statistics
page; changing the site's CSS or rebuilding cannot repair that response.
An empty but valid response keeps the globe visible with a message that no
visitor locations are available yet; this is distinct from a loading error.

## Build

```sh
npm run build
```
