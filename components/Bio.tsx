import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'

export default function Bio() {
  const { author, social } = siteConfig

  return (
    <div className="bio">
      <Image
        src="/profile-pic.png"
        alt={author.name}
        width={50}
        height={50}
        className="bio-avatar"
      />
      <p>
        Written by <strong>{author.name}</strong> {author.summary}{' '}
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow on Twitter
        </a>
      </p>
    </div>
  )
}
