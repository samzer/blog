import { notFound } from 'next/navigation'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Bio from '@/components/Bio'
import { getPostBySlug, getAllPostSlugs, getAdjacentPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

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
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{formattedDate}</p>
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
    </Layout>
  )
}

