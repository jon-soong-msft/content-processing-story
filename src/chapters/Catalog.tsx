import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Kicker } from '../components/Kicker'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/icons/Icon'
import {
  accelerators,
  catalogCategories,
  topUseCases,
} from '../data/accelerators'
import type { AcceleratorCategory } from '../data/accelerators'

const CATALOG_URL = 'https://accelerators.ms/'

type Filter = AcceleratorCategory | 'All'
const filters: Filter[] = ['All', ...catalogCategories]

const categoryColor: Record<AcceleratorCategory, string> = {
  'Content Processing': 'var(--color-azure-400)',
  Agents: 'var(--color-accent)',
  'Data & Analytics': 'var(--color-fluent-teal)',
  Conversation: 'var(--color-fluent-magenta)',
  Security: 'var(--color-fluent-yellow)',
  Platform: 'var(--color-fluent-green)',
}

export function Catalog() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<Filter>('All')

  const shown = useMemo(
    () => (filter === 'All' ? accelerators : accelerators.filter((a) => a.category === filter)),
    [filter],
  )

  return (
    <section
      id="catalog"
      className="relative w-full overflow-hidden px-6 py-24 md:px-10"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,120,212,0.14),_transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="text-center">
          <Reveal>
            <Kicker step="For every team" name="Accelerator Catalog" className="justify-center" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              One was for claims. <span className="text-gradient">There's one for you.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
              Whatever your use case is, a Microsoft Solution Accelerator can kickstart
              it — proven architecture, sample data, and one-command deploy. Here are the top
              use cases and the accelerators that fit best.
            </p>
          </Reveal>
        </div>

        {/* Top use case → best fit strip */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topUseCases.map((u) => (
              <div
                key={u.useCase}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <Icon name="bolt" className="h-4 w-4 shrink-0 text-fluent-yellow" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">{u.useCase}</div>
                  <div className="truncate text-xs text-accent">{u.fit}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Filter menu */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active ? 'text-ink-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="catalog-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            )
          })}
        </div>

        {/* Card grid */}
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((a, i) => (
              <motion.a
                key={a.name}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : (i % 3) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25"
              >
                {a.featured && (
                  <span className="absolute right-4 top-4 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                    You saw this
                  </span>
                )}
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    color: categoryColor[a.category],
                    background: `color-mix(in srgb, ${categoryColor[a.category]} 15%, transparent)`,
                  }}
                >
                  <Icon name={a.icon} className="h-6 w-6" />
                </div>
                <div className="text-base font-semibold text-white">{a.name}</div>
                <span
                  className="mt-1 text-xs font-medium"
                  style={{ color: categoryColor[a.category] }}
                >
                  {a.category}
                </span>
                <p className="mt-2 flex-1 text-sm text-slate-400">{a.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {a.products.slice(0, 3).map((p) => (
                    <span
                      key={p}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-400"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  Open in GitHub
                  <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
            <a
              href={CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-azure-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-azure-400"
            >
              <Icon name="grid" className="h-5 w-5" />
              Explore all accelerators at accelerators.ms
              <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-xs text-slate-500">Pick your use case · deploy in minutes · build the rest</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
