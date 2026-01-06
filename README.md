# Samir Madhavan's Blog

A personal blog built with Next.js 15 and App Router.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS with custom properties
- **Content**: Markdown with gray-matter for frontmatter
- **Fonts**: Montserrat (headings), Merriweather (body)

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── blog/[slug]/     # Dynamic blog post pages
│   ├── rss.xml/         # RSS feed route
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── not-found.tsx    # 404 page
├── components/          # React components
├── content/             # Blog content
│   ├── blog/           # Published blog posts
│   └── archive/        # Archived posts
├── lib/                 # Utility functions
│   ├── posts.ts        # Post fetching and parsing
│   └── site-config.ts  # Site configuration
├── public/             # Static assets
└── styles/             # CSS files
```

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

### Production Build

```bash
npm run build
npm start
```

## Adding New Posts

1. Create a new folder in `content/blog/` with your post slug
2. Add an `index.md` file with frontmatter:

```markdown
---
title: Your Post Title
date: "2024-01-01T00:00:00.000Z"
description: A brief description of your post
---

Your content here...
```

3. Add any images to the same folder and reference them with `./image.png`

## Features

- ✅ Static site generation with ISR support
- ✅ SEO optimized with metadata API
- ✅ RSS feed at `/rss.xml`
- ✅ Sitemap at `/sitemap.xml`
- ✅ Code syntax highlighting
- ✅ Responsive design
- ✅ Previous/next post navigation

## Deployment

This blog is optimized for deployment on [Vercel](https://vercel.com). Simply connect your repository and deploy.

## License

MIT
