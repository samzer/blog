import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'

export async function GET() {
  const posts = getAllPosts()

  const itemsXml = posts
    .map((post) => {
      const pubDate = new Date(post.frontmatter.date).toUTCString()
      const url = `${siteConfig.siteUrl}/blog/${post.slug}`

      return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.frontmatter.description || post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${siteConfig.siteUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  })
}

