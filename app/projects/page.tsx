import Link from 'next/link'
import Layout from '@/components/Layout'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open source projects and tools built by ' + siteConfig.author.name,
}

interface Project {
  name: string
  description: string
  url: string
  tags: string[]
  status?: 'active' | 'archived'
  statusNote?: string
}

const projects: Project[] = [
  {
    name: 'Global Trade Balance Visualization',
    description: 'An interactive 3D globe visualizing trade surplus and deficit between countries, built using UN Comtrade data, mirror statistics, and AI-generated insights for the top 100 countries.',
    url: 'https://remarkable-semifreddo-946a1e.netlify.app/',
    tags: ['Data Visualization', '3D Globe', 'AI', 'Trade'],
    status: 'active',
  },
  {
    name: 'Pinch the Bug',
    description: 'A Duck Hunt-inspired game using webcam motion capture to squash bugs with your fingers.',
    url: 'https://github.com/samzer/pinch_the_bug',
    tags: ['Game', 'Project'],
    status: 'active',
  },
  {
    name: 'samzerSQL',
    description: 'A minimal, no-nonsense SQL client for data professionals who just want to write, format, and organize queries without the bloat.',
    url: 'https://samzersql.netlify.app/',
    tags: ['SQL', 'Client', 'Data'],
    status: 'active',
  },
  {
    name: 'Dark German Series - Family Graph',
    description: 'An interactive network graph visualizing the intricate, time-spanning family relationships between characters in the German sci-fi series "Dark."',
    url: 'https://github.com/samzer/dark-network-graph',
    tags: ['Web Series', 'Visualization', 'Graph'],
    status: 'active',
  },
  {
    name: 'ModelChimp',
    description: 'Experiment tracking platform for Deep Learning and Machine Learning projects. Features real-time tracking of parameters and metrics, experiment comparison, team collaboration, and storage of model artifacts.',
    url: 'https://github.com/ModelChimp/modelchimp',
    tags: ['Python', 'MLOps', 'Deep Learning', 'Django'],
    status: 'archived',
    statusNote: 'No longer maintained. This was an attempt to build an MLOps company that didn\'t work out.',
  },
]

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="projects-page">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <h2>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
              {project.status === 'archived' && (
                <span className="archived-label"> (archived)</span>
              )}
            </h2>
            <p className="project-description">{project.description}</p>
            {project.statusNote && (
              <p className="project-status-note">{project.statusNote}</p>
            )}
            <p className="project-tags">{project.tags.join(' / ')}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
