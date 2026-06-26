import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { chapters } from '../data/chapters'

const FIELD_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

/**
 * Lets the reader jump between story chapters with the keyboard:
 *   ArrowDown / PageDown → next chapter
 *   ArrowUp / PageUp     → previous chapter
 *   Home / End           → first / last chapter
 *
 * Navigation is based on the current scroll position, so it stays in sync with
 * manual scrolling. Rapid taps advance multiple chapters even while a smooth
 * scroll is still in flight.
 */
export function useKeyboardNav() {
  const reduce = useReducedMotion()

  useEffect(() => {
    let target = -1
    let lastNavAt = 0

    const sectionTop = (id: string) => {
      const el = document.getElementById(id)
      if (!el) return Number.POSITIVE_INFINITY
      return el.getBoundingClientRect().top + window.scrollY
    }

    const currentIndex = () => {
      const y = window.scrollY
      let idx = 0
      chapters.forEach((c, i) => {
        if (sectionTop(c.id) <= y + 8) idx = i
      })
      return idx
    }

    const scrollToIndex = (index: number) => {
      const clamped = Math.max(0, Math.min(chapters.length - 1, index))
      target = clamped
      lastNavAt = performance.now()
      document.getElementById(chapters[clamped].id)?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      })
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat) return
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return

      const node = e.target as HTMLElement | null
      if (node && (node.isContentEditable || FIELD_TAGS.has(node.tagName))) return

      // While a smooth scroll is still settling, advance from the last target
      // so quick double-taps don't land on the same chapter twice.
      const recent = performance.now() - lastNavAt < 700
      const base = recent && target >= 0 ? target : currentIndex()

      let next: number
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          next = base + 1
          break
        case 'ArrowUp':
        case 'PageUp':
          next = base - 1
          break
        case 'Home':
          next = 0
          break
        case 'End':
          next = chapters.length - 1
          break
        default:
          return
      }

      e.preventDefault()
      scrollToIndex(next)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [reduce])
}
