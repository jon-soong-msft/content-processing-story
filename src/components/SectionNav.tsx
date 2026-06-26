import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { chapters } from '../data/chapters'

/** Fixed vertical chapter navigation with active-section tracking. */
export function SectionNav() {
  const [active, setActive] = useState(chapters[0].id)
  const reduce = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <nav
      aria-label="Chapters"
      aria-keyshortcuts="ArrowUp ArrowDown"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div
        title="Use Up / Down arrow keys to move between chapters"
        className="mb-4 flex flex-col items-end gap-1"
      >
        <kbd className="rounded border border-white/15 bg-white/5 px-1 text-[10px] leading-5 text-slate-400">↑</kbd>
        <kbd className="rounded border border-white/15 bg-white/5 px-1 text-[10px] leading-5 text-slate-400">↓</kbd>
      </div>
      <ul className="flex flex-col items-end gap-3">
        {chapters.map((c) => {
          const isActive = active === c.id
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => go(c.id)}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-white/10 text-white opacity-100'
                      : 'translate-x-2 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`}
                >
                  {c.nav}
                </span>
                <span
                  className={`h-3 w-3 rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'scale-110 border-accent bg-accent shadow-[0_0_12px_var(--color-accent)]'
                      : 'border-white/30 bg-transparent group-hover:border-white/70'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
