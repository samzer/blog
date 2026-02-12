import Link from 'next/link'
import Layout from '@/components/Layout'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All posts',
  description: siteConfig.description,
}

function parseTags(tags?: string): string[] {
  if (!tags) return []
  return tags.split(',').map(tag => tag.trim()).filter(Boolean)
}

function getPostTags(post: { frontmatter: { tags?: string; title: string } }): string[] {
  const tags = parseTags(post.frontmatter.tags)
  if (tags.length > 0) return tags

  const lowerTitle = post.frontmatter.title.toLowerCase()
  if (lowerTitle.includes('python') || lowerTitle.includes('code') || lowerTitle.includes('variable') || lowerTitle.includes('symbol')) {
    return ['Python']
  }
  if (lowerTitle.includes('korean') || lowerTitle.includes('moving') || lowerTitle.includes('watch')) {
    return ['Entertainment']
  }
  if (lowerTitle.includes('design')) {
    return ['Design']
  }
  return ['Tech']
}

export default function HomePage() {
  const posts = getAllPosts()

  if (posts.length === 0) {
    return (
      <Layout>
        <p>No blog posts found. Add markdown posts to &quot;content/blog&quot;.</p>
      </Layout>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Layout>
      <ul className="post-list">
        {posts.map((post) => {
          const title = post.frontmatter.title || post.slug
          const tags = getPostTags(post)

          return (
            <li key={post.slug}>
              <span className="post-date">{formatDate(post.frontmatter.date)}</span>
              <Link href={`/blog/${post.slug}`}>{title}</Link>
              {tags.length > 0 && (
                <span className="post-tags">{tags.join(', ')}</span>
              )}
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}
