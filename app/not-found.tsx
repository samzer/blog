import Link from 'next/link'
import Layout from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404: Not Found',
}

export default function NotFound() {
  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-pixel)', 
          fontSize: '3rem', 
          color: 'var(--accent-red)',
          marginBottom: '1rem',
          textShadow: '4px 4px 0 var(--shadow)'
        }}>
          404
        </h1>
        <p style={{ 
          fontFamily: 'var(--font-pixel)', 
          fontSize: '1rem',
          marginBottom: '2rem',
          color: 'var(--text-secondary)'
        }}>
          QUEST NOT FOUND
        </p>
        <p style={{ marginBottom: '2rem' }}>
          You just hit a route that doesn&apos;t exist... the sadness.
        </p>
        <Link href="/" className="read-btn" style={{ textDecoration: 'none' }}>
          ← RETURN TO BASE
        </Link>
      </div>
    </Layout>
  )
}
