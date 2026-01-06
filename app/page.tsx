import Link from 'next/link'
import Layout from '@/components/Layout'
import Bio from '@/components/Bio'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All posts',
  description: siteConfig.description,
}

export default function HomePage() {
  const posts = getAllPosts()

  if (posts.length === 0) {
    return (
      <Layout>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to &quot;content/blog&quot;.
        </p>
      </Layout>
    )
  }

  return (
    <Layout>
      <Bio />
      <ol style={{ listStyle: 'none' }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.slug

          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link href={`/blog/${post.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

