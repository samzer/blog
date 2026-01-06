import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')
const archiveDirectory = path.join(process.cwd(), 'content/archive')

export interface PostFrontmatter {
  title: string
  date: string
  description: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  excerpt: string
}

export interface PostWithHtml extends Post {
  contentHtml: string
}

function getPostsFromDirectory(directory: string): Post[] {
  if (!fs.existsSync(directory)) {
    return []
  }

  const folderNames = fs.readdirSync(directory)

  const posts = folderNames
    .filter((name) => {
      const fullPath = path.join(directory, name)
      return fs.statSync(fullPath).isDirectory()
    })
    .map((folderName) => {
      const fullPath = path.join(directory, folderName, 'index.md')

      if (!fs.existsSync(fullPath)) {
        return null
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Generate excerpt from content (first 160 chars)
      const excerpt = content
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
        .replace(/[#*`]/g, '') // Remove markdown syntax
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim()
        .slice(0, 160)

      return {
        slug: folderName,
        frontmatter: data as PostFrontmatter,
        content,
        excerpt: excerpt + (excerpt.length >= 160 ? '...' : ''),
      }
    })
    .filter((post): post is Post => post !== null)

  return posts
}

export function getAllPosts(): Post[] {
  const blogPosts = getPostsFromDirectory(postsDirectory)
  const archivePosts = getPostsFromDirectory(archiveDirectory)

  const allPosts = [...blogPosts, ...archivePosts]

  // Sort posts by date in descending order
  return allPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export function getAllPostSlugs(): string[] {
  const posts = getAllPosts()
  return posts.map((post) => post.slug)
}

export async function getPostBySlug(slug: string): Promise<PostWithHtml | null> {
  // Try blog directory first
  let fullPath = path.join(postsDirectory, slug, 'index.md')

  if (!fs.existsSync(fullPath)) {
    // Try archive directory
    fullPath = path.join(archiveDirectory, slug, 'index.md')

    if (!fs.existsSync(fullPath)) {
      return null
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Process markdown to HTML
  const processedContent = await remark().use(html).process(content)
  let contentHtml = processedContent.toString()

  // Handle local images - convert relative paths to /blog/[slug]/ paths
  contentHtml = contentHtml.replace(
    /src="\.\/([^"]+)"/g,
    `src="/blog/${slug}/$1"`
  )

  // Generate excerpt
  const excerpt = content
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[#*`]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 160)

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    contentHtml,
    excerpt: excerpt + (excerpt.length >= 160 ? '...' : ''),
  }
}

export function getAdjacentPosts(slug: string): { previous: Post | null; next: Post | null } {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex((post) => post.slug === slug)

  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  // Posts are sorted newest first, so:
  // - "previous" (older) is the next item in the array
  // - "next" (newer) is the previous item in the array
  const previous = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null

  return { previous, next }
}

