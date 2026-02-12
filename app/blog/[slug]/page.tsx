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

function getPostTags(post: PostWithHtml): string[] {
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

  const tags = getPostTags(post)

  return (
    <Layout>
      <div className="blog-post-page">
        <Link href="/" className="back-link">
          &larr; All posts
        </Link>

        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <p className="post-meta">
              {formattedDate}
              {tags.length > 0 && <> &middot; {tags.join(', ')}</>}
            </p>
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
          <ul>
            <li>
              {previous && (
                <Link href={`/blog/${previous.slug}`} rel="prev">
                  &larr; {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link href={`/blog/${next.slug}`} rel="next">
                  {next.frontmatter.title} &rarr;
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  )
}
