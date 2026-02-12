import Link from 'next/link'
import Layout from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404: Not Found',
}

export default function NotFound() {
  return (
    <Layout>
      <div className="not-found">
        <h1>404</h1>
        <p>Page not found.</p>
        <Link href="/">&larr; Back to home</Link>
      </div>
    </Layout>
  )
}
