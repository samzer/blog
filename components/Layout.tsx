'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/site-config'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const SpaceBrickBreaker = dynamic(() => import('./SpaceBrickBreaker'), { ssr: false })

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isRootPath = pathname === '/'
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    // Animate skill bars on load
    const timeout = setTimeout(() => {
      document.querySelectorAll('.skill-fill').forEach((bar) => {
        const element = bar as HTMLElement
        const width = element.getAttribute('data-width')
        if (width) {
          element.style.width = width + '%'
        }
      })
    }, 500)

    // Achievement pulse effect
    const interval = setInterval(() => {
      const achievements = document.querySelectorAll('.achievement')
      if (achievements.length > 0) {
        const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)] as HTMLElement
        randomAchievement.style.transform = 'scale(1.2)'
        setTimeout(() => {
          randomAchievement.style.transform = 'scale(1)'
        }, 200)
      }
    }, 3000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <header>
        <div className="container">
          <div className="header-content">
            <div className="profile-container">
              <div className="profile-image">
                <Image
                  src="/profile-pic.png"
                  alt={siteConfig.author.name}
                  width={120}
                  height={120}
                  priority
                />
              </div>
              <div className="level-badge">LV 101</div>
            </div>
            <div className="header-text">
              <h1>
                <Link href="/">{siteConfig.title.toUpperCase()}</Link>
              </h1>
              <p className="tagline">{siteConfig.author.summary}</p>

              <div className="stats-bar">
                <div className="stat">
                  <span>●</span>
                  <span><b>Product & Tech Leader</b></span>
                </div>
                <div className="stat">
                  <span>●</span>
                  <span><b>Fintecth</b></span>
                </div>
                <div className="stat">
                  <span>●</span>
                  <span><b>AI Engineer</b></span>
                </div>
                <div className="stat">
                  <span>●</span>
                  <span><b>Data Storyteller</b></span>
                </div>
              </div>

              <div className="skill-bars">

                <div className="skill-bar-container">
                  <span className="skill-label">BUILDING</span>
                  <div className="skill-bar">
                    <div className="skill-fill blue" style={{ width: '0%' }} data-width="92">
                      <span className="skill-value">92/100</span>
                    </div>
                  </div>
                </div>
                <div className="skill-bar-container">
                  <span className="skill-label">LEADERSHIP</span>
                  <div className="skill-bar">
                    <div className="skill-fill purple" style={{ width: '0%' }} data-width="88">
                      <span className="skill-value">88/100</span>
                    </div>
                  </div>
                </div>
                <div className="skill-bar-container">
                  <span className="skill-label">CREATIVITY</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: '0%' }} data-width="85">
                      <span className="skill-value">85/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="achievements">
                <div className="achievement" data-title="AI Expert">🤖</div>
                <div className="achievement" data-title="Team Leader">👥</div>
                {/* <div className="achievement" data-title="Code Warrior">⚔️</div> */}
                <div className="achievement" data-title="Data Wizard">🔮</div>
                <div className="achievement" data-title="Python Master">🐍</div>
              </div>

              <div className="nav-links">
                <Link href="/" className={`nav-btn ${pathname === '/' || pathname.startsWith('/blog') ? 'active' : ''}`}>
                  📝 BLOG
                </Link>
                <Link href="/projects" className={`nav-btn ${pathname === '/projects' ? 'active' : ''}`}>
                  📦 OPEN SOURCE
                </Link>
              </div>

              <div className="social-links">
                <a
                  href={`https://twitter.com/${siteConfig.social.twitter}`}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ► TWITTER
                </a>
                <a
                  href="https://www.linkedin.com/in/samir-madhavan-7b172115/"
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ► LINKEDIN
                </a>
                <a
                  href="https://github.com/samzer"
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ► GITHUB
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">{children}</div>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} {siteConfig.title.toUpperCase()}</p>
            {/* <p style={{ marginTop: '0.5rem' }}>
              Made with <span className="heart"></span> and pixels
            </p> */}
            <p 
              className="footer-pixel-text start-game-btn"
              onClick={() => setShowGame(true)}
              style={{ cursor: 'pointer' }}
            >
              PRESS START TO CONTINUE<span className="cursor"></span>
            </p>
          </div>
        </div>
      </footer>

      {showGame && <SpaceBrickBreaker onClose={() => setShowGame(false)} />}
    </>
  )
}
