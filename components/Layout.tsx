import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <div className="container">
          <div className="header-content">
            <div className="profile-image">
              <Image
                src="/profile-pic.png"
                alt={siteConfig.author.name}
                width={48}
                height={48}
                priority
              />
            </div>
            <div className="header-text">
              <h1>
                <Link href="/">{siteConfig.title}</Link>
              </h1>
              <p className="tagline">{siteConfig.author.summary}</p>
              <p className="roles">Product & Tech Leader · Fintech · AI Engineer · Data Storyteller</p>

              <nav>
                <Link href="/">Blog</Link>
                <Link href="/projects">Projects</Link>
                <a
                  href={`https://twitter.com/${siteConfig.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://www.linkedin.com/in/samir-madhavan-7b172115/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/samzer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">{children}</div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {siteConfig.title}</p>
        </div>
      </footer>
    </>
  )
}
