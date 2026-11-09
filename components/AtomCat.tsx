'use client'

import { useEffect, useState } from 'react'
import { Caveat } from 'next/font/google'

const caveat = Caveat({ subsets: ['latin'], weight: '600' })

// Easter egg: Atom peeks in from the right. Always in dev and on /atom, 1-in-10 visits otherwise.
export default function AtomCat() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Rolled on the client: the homepage is static, so a server roll would be frozen at build time.
    const always = process.env.NODE_ENV === 'development' || location.pathname.startsWith('/atom')
    if (always || Math.random() < 1 / 10) setShow(true)
  }, [])

  if (!show) return null

  return (
    <aside className="atom" aria-label="Easter egg">
      <div className="atom-note">
        <button className="atom-close" onClick={() => setShow(false)} aria-label="Dismiss">
          ×
        </button>
        <p className={`atom-text ${caveat.className}`}>
          This is my cat, Atom. Congratulations to be one of the few people to see him here
        </p>
        <svg className="atom-arrow" viewBox="0 0 120 70" aria-hidden="true">
          <path className="atom-arrow-line" pathLength={1} d="M20 4 C 10 50, 60 70, 112 46" />
          <path className="atom-arrow-head" pathLength={1} d="M98 38 L 112 46 L 98 56" />
        </svg>
      </div>
      <img className="atom-img" src="/atom.png" alt="Atom, a white and tabby cat, peeking in" />
    </aside>
  )
}
