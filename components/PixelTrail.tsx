'use client'

import { useEffect } from 'react'

const GRID = 10
const TEXT = 'p, a, li, h1, h2, h3, pre, blockquote'

// Homepage cursor trail drawn in the heatmap's greens. Squares are placed in page
// coordinates so scrolling leaves a trail too. Lingering darkens a square, text gets a
// faint trail, and clicks burst.
export default function PixelTrail() {
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const live = new Map<string, { el: HTMLElement; level: number }>()
    let x = -1, y = -1, lastX = 0, lastY = 0, lastT = 0

    const root = document.documentElement
    // Snap to the grid, and keep squares inside the page so they never add scroll.
    const snap = (v: number, max: number) =>
      Math.max(0, Math.min(Math.floor(v / GRID) * GRID, max - GRID))

    const square = (px: number, py: number, cls: string) => {
      const el = document.createElement('span')
      el.className = `pixel-trail ${cls}`
      el.style.left = `${px}px`
      el.style.top = `${py}px`
      el.addEventListener('animationend', () => el.remove())
      document.body.appendChild(el)
      return el
    }

    const paint = (fast: boolean, dwell = false) => {
      if (x < 0) return
      const px = snap(x + scrollX, root.scrollWidth)
      const py = snap(y + scrollY, root.scrollHeight)
      const key = `${px},${py}`
      const prev = live.get(key)
      if (dwell && (!prev || prev.level === 4)) return // darken once, then let it fade
      const level = prev ? Math.min(prev.level + 1, 4) : fast ? 1 : 2
      prev?.el.remove()
      const faint = document.elementFromPoint(x, y)?.closest(TEXT) ? ' faint' : ''
      const el = square(px, py, `l${level}${faint}`)
      el.addEventListener('animationend', () => live.get(key)?.el === el && live.delete(key))
      live.set(key, { el, level })
    }

    const onMove = (e: MouseEvent) => {
      const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY) / Math.max(e.timeStamp - lastT, 1)
      x = lastX = e.clientX
      y = lastY = e.clientY
      lastT = e.timeStamp
      paint(speed > 1)
    }
    const onScroll = () => paint(false)
    const onLeave = () => { x = -1 }
    // Fire burst: embers pop up and out, then fall to the bottom of the screen.
    const onClick = (e: MouseEvent) => {
      const px = snap(e.pageX, root.scrollWidth)
      const py = snap(e.pageY, root.scrollHeight)
      const fall = innerHeight - e.clientY - GRID // stop at the viewport's bottom edge
      for (let i = 0; i < 18; i++) {
        const spread = Math.round((Math.random() - 0.5) * 16) * GRID
        const dx = Math.max(-px, Math.min(spread, root.scrollWidth - GRID - px))
        const el = square(px, py, 'ember')
        el.style.setProperty('--dx', `${dx}px`)
        el.style.setProperty('--up', `${-Math.round(2 + Math.random() * 5) * GRID}px`)
        el.style.setProperty('--fall', `${fall}px`)
        el.style.setProperty('--t', `${(0.8 + fall / 900 + Math.random() * 0.4).toFixed(2)}s`)
      }
    }
    const dwellTimer = setInterval(() => paint(false, true), 300)

    addEventListener('mousemove', onMove, { passive: true })
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('click', onClick)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      clearInterval(dwellTimer)
      removeEventListener('mousemove', onMove)
      removeEventListener('scroll', onScroll)
      removeEventListener('click', onClick)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return null
}
