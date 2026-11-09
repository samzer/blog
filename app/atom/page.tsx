import type { Metadata } from 'next'

// Same as the homepage, but AtomCat always shows here (see components/AtomCat.tsx).
export { default } from '../page'

export const metadata: Metadata = { title: 'All posts', robots: { index: false } }
