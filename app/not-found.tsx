import Layout from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404: Not Found',
}

export default function NotFound() {
  return (
    <Layout>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&apos;t exist... the sadness.</p>
    </Layout>
  )
}

