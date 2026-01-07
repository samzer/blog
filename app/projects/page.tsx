import Link from 'next/link'
import Layout from '@/components/Layout'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Source Projects',
  description: 'Open source projects and tools built by ' + siteConfig.author.name,
}

interface Project {
  name: string
  description: string
  url: string
  tags: string[]
  emoji: string
}

const projects: Project[] = [
  {
    name: 'Twitter Follower Cleanup Tool',
    description: 'Automate the removal of suspected bot followers from your Twitter/X account. The tool identifies potential bot accounts (usernames ending with 3+ consecutive digits) and removes them as followers.',
    url: 'https://github.com/samzer/x_bots_purge',
    tags: ['Python', 'Automation', 'Twitter'],
    emoji: '🧹',
  },
]

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="projects-page">
        <Link href="/" className="back-link">
          ← BACK TO QUESTS
        </Link>

        <div className="section-header">
          <h1 className="section-title">OPEN SOURCE</h1>
          <div className="pixel-line"></div>
          <div className="coin-counter">
            <div className="coin"></div>
            <span>{projects.length} {projects.length === 1 ? 'PROJECT' : 'PROJECTS'}</span>
          </div>
        </div>

        <p className="projects-intro">
          Tools and projects I&apos;ve built and open-sourced for the community. Feel free to use, fork, and contribute!
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-number">#{String(index + 1).padStart(2, '0')}</div>
              <div className="project-emoji">{project.emoji}</div>
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <span className="view-btn">VIEW ON GITHUB →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  )
}

