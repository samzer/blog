# Authoring Blog Posts

This directory holds the blog content. Each post is a **folder** containing an
`index.md`. The folder name **is** the URL slug (`/blog/<folder-name>`).

## Creating a new post

1. Copy the template folder `_template/` to a new folder. Use the naming
   convention `YYYYMMDD_short_topic` (e.g. `20260506_raspberrypi_ai`). The date
   prefix should match the `date` in the frontmatter.
2. Write the post in `index.md`.
3. Drop any images in the **same folder** and reference them as `./image.png`.

The template (`_template/index.md`) is the canonical starting point.

## Frontmatter (required)

Every post starts with this frontmatter block:

```markdown
---
title: xyz
date: "2026-01-06T22:00:32.169Z"
description: abc
tags: tag1, tag2
---
```

- **title** — post title (also the SEO/social title).
- **date** — ISO 8601 string, **quoted**. Controls sort order (newest first)
  and previous/next navigation. Match the folder's date prefix.
- **description** — one- or two-sentence summary; used for the post listing and
  SEO/social meta. Keep it meaningful, not boilerplate.
- **tags** — comma-separated string (e.g. `AI, Product Management`).

The parser (`gray-matter` in `../../lib/posts.ts`) reads these into
`PostFrontmatter`. Body content begins after the closing `---`.

## Images

- Place images in the post folder alongside `index.md`.
- Reference them with a relative path: `![alt](./image.png)` or, for explicit
  sizing, raw HTML is supported: `<img src="./raspberry.jpg" width="850" alt="...">`.
- `scripts/sync-blog-images.js` copies images from `content/blog/<slug>/` to
  `public/blog/<slug>/` and runs automatically via `predev`/`prebuild`. When
  rendering, `lib/posts.ts` rewrites `src="./x.png"` → `src="/blog/<slug>/x.png"`.
- Supported extensions: `.png .jpg .jpeg .gif .webp .svg .ico`.
- No manual step needed — just `npm run dev` and the sync runs first.

## Drafts & the template

- Any folder whose name **starts with `_`** is treated as a draft/template and is
  **excluded** from the site (it won't build, list, or be served). `_template`
  and other `_`-prefixed folders are skipped by `getPostsFromDirectory`.
- To publish a draft, rename the folder to remove the leading `_`.

## Conventions

- Markdown is rendered with `remark` + `rehype` (raw HTML allowed), so inline
  HTML and code blocks with syntax highlighting both work.
- Excerpts are auto-generated from the first ~160 chars of body content — no
  separate excerpt field needed.
- Keep prose in Samir's voice: direct, first-person, concrete. Look at recent
  posts (e.g. `20260506_raspberrypi_ai`, `20260504_product_management`) for tone.

## Verify before done

Run `npm run dev` and open the post at `http://localhost:3000/blog/<slug>` to
confirm it renders, images load, and the frontmatter (title/date/description)
appears correctly.
