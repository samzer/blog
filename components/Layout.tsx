'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/site-config'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isRootPath = pathname === '/'

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {isRootPath ? (
          <h1 className="main-heading">
            <Link href="/">{siteConfig.title}</Link>
          </h1>
        ) : (
          <Link className="header-link-home" href="/">
            {siteConfig.title}
          </Link>
        )}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()},{' '}
        <a href="https://www.samirmadhavan.com">samirmadhavan.com</a>
      </footer>
    </div>
  )
}

