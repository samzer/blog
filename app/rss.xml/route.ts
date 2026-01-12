import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

async function markdownToHtml(content: string, slug: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content)
  
  let html = processedContent.toString()
  
  // Convert relative image paths to absolute URLs
  html = html.replace(
    /src="\.\/([^"]+)"/g,
    `src="${siteConfig.siteUrl}/blog/${slug}/$1"`
  )
  
  return html
}

export async function GET() {
  const posts = getAllPosts()

  const itemsXml = await Promise.all(
    posts.map(async (post) => {
      const pubDate = new Date(post.frontmatter.date).toUTCString()
      const url = `${siteConfig.siteUrl}/blog/${post.slug}`
      const contentHtml = await markdownToHtml(post.content, post.slug)

      return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.frontmatter.description || post.excerpt}]]></description>
      <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
  )

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${siteConfig.siteUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml.join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  })
}

