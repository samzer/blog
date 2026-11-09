import type { Post } from '@/lib/posts'

const DAY = 86400000
const WEEKS = 53
const day = (d: Date) => d.toISOString().slice(0, 10)

// GitHub-style calendar of posts per day over the last year (UTC).
export default function PostHeatmap({ posts }: { posts: Post[] }) {
  const counts = new Map<string, string[]>()
  for (const p of posts) {
    const key = day(new Date(p.frontmatter.date))
    counts.set(key, [...(counts.get(key) ?? []), p.frontmatter.title || p.slug])
  }

  const today = new Date(day(new Date()))
  const start = new Date(today.getTime() - (today.getUTCDay() + 7 * (WEEKS - 1)) * DAY)
  const cells = Array.from({ length: WEEKS * 7 }, (_, i) => new Date(start.getTime() + i * DAY))

  const months = Array.from({ length: WEEKS }, (_, w) => {
    const d = cells[w * 7]
    return d.getUTCDate() <= 7 ? d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }) : ''
  })

  return (
    <section className="heatmap" aria-label="Posting frequency over the last year">
      <div className="heatmap-months">
        {months.map((m, i) => <span key={i}>{m}</span>)}
      </div>
      <div className="heatmap-body">
        <div className="heatmap-days">
          <span /><span>M</span><span /><span>W</span><span /><span>F</span><span />
        </div>
        <div className="heatmap-grid">
          {cells.map((d) => {
            const titles = counts.get(day(d)) ?? []
            const future = d > today
            const label = `${day(d)}: ${titles.length ? titles.join(', ') : 'no posts'}`
            return (
              <span
                key={d.getTime()}
                className={`heatmap-cell l${Math.min(titles.length, 4)}`}
                style={future ? { visibility: 'hidden' } : undefined}
                title={label}
              />
            )
          })}
        </div>
      </div>
    <div className="heatmap-legend">
        Less <span className="heatmap-cell l0" /><span className="heatmap-cell l1" />
        <span className="heatmap-cell l2" /><span className="heatmap-cell l3" />
        <span className="heatmap-cell l4" /> More
      </div>
    </section>
  )
}
