import Link from 'next/link'
import Layout from '@/components/Layout'
import { getAllPosts, Post } from '@/lib/posts'
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

function getTagClass(tag: string): string {
  const lowerTag = tag.toLowerCase()
  if (lowerTag === 'python' || lowerTag === 'tech' || lowerTag === 'code') {
    return 'python'
  }
  if (lowerTag === 'entertainment' || lowerTag === 'movies' || lowerTag === 'tv') {
    return 'entertainment'
  }
  if (lowerTag === 'design' || lowerTag === 'ux' || lowerTag === 'ui') {
    return 'design'
  }
  return 'python'
}

function getPostTags(post: Post): string[] {
  const tags = parseTags(post.frontmatter.tags)
  if (tags.length > 0) return tags
  
  // Fallback: infer from title if no tags provided
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

  const [featuredPost, ...otherPosts] = posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Layout>
      {/* Featured Quest */}
      <Link href={`/blog/${featuredPost.slug}`} className="featured-quest">
        <div className="quest-badge">★ FEATURED QUEST</div>
        <h2>{featuredPost.frontmatter.title}</h2>
        <div className="quest-meta">
          <span className="blog-date">📅 {formatDate(featuredPost.frontmatter.date)}</span>
          {getPostTags(featuredPost).map((tag, i) => (
            <span key={i} className={`tag ${getTagClass(tag)}`}>
              {tag}
            </span>
          ))}
        </div>
        <p className="blog-excerpt">
          {featuredPost.frontmatter.description || featuredPost.excerpt}
        </p>
        <span className="read-btn">START QUEST →</span>
      </Link>

      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">RECENT QUESTS</h2>
        <div className="pixel-line"></div>
        <div className="coin-counter">
          <div className="coin"></div>
          <span>{posts.length} POSTS</span>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-grid">
        {otherPosts.map((post, index) => {
          const title = post.frontmatter.title || post.slug

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="card-number">#{String(index + 2).padStart(2, '0')}</div>
              <h2>{title}</h2>
              <p className="blog-excerpt">
                {post.frontmatter.description || post.excerpt}
              </p>
              <div className="card-footer">
                <span className="blog-date">{formatShortDate(post.frontmatter.date)}</span>
                <div className="tags">
                  {getPostTags(post).map((tag, i) => (
                    <span key={i} className={`tag ${getTagClass(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
