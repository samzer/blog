import { notFound } from 'next/navigation'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Bio from '@/components/Bio'
import { getPostBySlug, getAllPostSlugs, getAdjacentPosts, PostWithHtml } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

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

function getPostTags(post: PostWithHtml): string[] {
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

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const description = post.frontmatter.description || post.excerpt

  return {
    title: post.frontmatter.title,
    description,
    openGraph: {
      title: post.frontmatter.title,
      description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [siteConfig.author.name],
      url: `${siteConfig.siteUrl}/blog/${slug}`,
    },
    twitter: {
      card: 'summary',
      title: post.frontmatter.title,
      description,
      creator: `@${siteConfig.social.twitter}`,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { previous, next } = getAdjacentPosts(slug)

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Layout>
      <div className="blog-post-page">
        <Link href="/" className="back-link">
          ← BACK TO QUESTS
        </Link>

        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <p>📅 {formattedDate}</p>
            <div className="tags" style={{ marginTop: '1rem' }}>
              {getPostTags(post).map((tag, i) => (
                <span key={i} className={`tag ${getTagClass(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            itemProp="articleBody"
          />
          <hr />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav className="blog-post-nav">
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link href={`/blog/${previous.slug}`} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link href={`/blog/${next.slug}`} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  )
}
