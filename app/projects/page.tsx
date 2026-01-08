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
  status?: 'active' | 'archived'
  statusNote?: string
}

const projects: Project[] = [
  {
    name: 'Twitter Follower Cleanup Tool',
    description: 'Automate the removal of suspected bot followers from your Twitter/X account. The tool identifies potential bot accounts (usernames ending with 5+ consecutive digits) and removes them as followers.',
    url: 'https://github.com/samzer/x_bots_purge',
    tags: ['Python', 'Automation', 'Twitter'],
    emoji: '🧹',
    status: 'active',
  },
  {
    name: 'Dark Geman Series - Family Graph',
    description: 'An interactive network graph visualizing the intricate, time-spanning family relationships between characters in the German sci-fi series "Dark," with colored nodes representing individuals from different surnames (Tiedemen, Doppler, Kahnwald, Nielsen) connected across multiple timelines (1888-2052',
    url: 'https://github.com/samzer/dark-network-graph',
    tags: ['Web Series', 'Visualization', 'Graph'],
    emoji: '🔺',
    status: 'active',
  },
  {
    name: 'ModelChimp',
    description: 'Experiment tracking platform for Deep Learning and Machine Learning projects. Features real-time tracking of parameters and metrics, experiment comparison, team collaboration, and storage of model artifacts.',
    url: 'https://github.com/ModelChimp/modelchimp',
    tags: ['Python', 'MLOps', 'Deep Learning', 'Django'],
    emoji: '🐵',
    status: 'archived',
    statusNote: 'No longer maintained. This was an attempt to build an MLOps company that didn\'t work out.',
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
              className={`project-card ${project.status === 'archived' ? 'archived' : ''}`}
            >
              <div className="project-number">#{String(index + 1).padStart(2, '0')}</div>
              {project.status === 'archived' && (
                <div className="project-status archived">📦 ARCHIVED</div>
              )}
              <div className="project-emoji">{project.emoji}</div>
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              {project.statusNote && (
                <p className="project-status-note">⚠️ {project.statusNote}</p>
              )}
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

