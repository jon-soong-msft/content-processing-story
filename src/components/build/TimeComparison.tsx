import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { timeComparison } from '../../data/story'
import { Icon } from '../icons/Icon'

const beforeMinutes = timeComparison.before.value * 60
const speedup = Math.round(beforeMinutes / timeComparison.after.value)

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function Count({
  to,
  active,
  reduce,
  suffix,
  duration = 1.3,
}: {
  to: number
  active: boolean
  reduce: boolean
  suffix: string
  duration?: number
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    if (reduce) {
      setValue(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      setValue(to * easeOutCubic(t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, reduce, to, duration])

  return (
    <span>
      {Math.round(value)}
      {suffix}
    </span>
  )
}

/** Animated "hours → minutes" comparison with proportional bars. */
export function TimeComparison() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4, once: reduce === true })
  const active = inView

  return (
    <div
      ref={ref}
      className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8"
    >
      <div className="mb-6 text-sm font-medium uppercase tracking-wider text-slate-400">
        Time to process one claim
      </div>

      {/* Before */}
      <Row
        label={timeComparison.before.label}
        note={timeComparison.before.note}
        number={<Count to={timeComparison.before.value} suffix="h" active={active} reduce={!!reduce} />}
        barWidth="100%"
        color="var(--color-fluent-red)"
        active={active}
        reduce={!!reduce}
        delay={0}
      />

      <div className="my-5 flex items-center justify-center gap-2 text-slate-500">
        <span className="h-px w-12 bg-white/15" />
        <Icon name="chevronDown" className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">deploy the accelerator</span>
        <Icon name="chevronDown" className="h-4 w-4" />
        <span className="h-px w-12 bg-white/15" />
      </div>

      {/* After */}
      <Row
        label={timeComparison.after.label}
        note={timeComparison.after.note}
        number={<Count to={timeComparison.after.value} suffix=" min" active={active} reduce={!!reduce} />}
        barWidth="3.3%"
        color="var(--color-fluent-teal)"
        active={active}
        reduce={!!reduce}
        delay={0.5}
      />

      {/* Speedup badge */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: reduce ? 0 : 1.4, type: 'spring', stiffness: 240, damping: 16 }}
        className="mt-7 flex items-center justify-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3"
      >
        <Icon name="bolt" className="h-5 w-5 text-accent" />
        <span className="text-lg font-semibold text-white">
          up to <span className="text-gradient">{speedup}× faster</span>
        </span>
      </motion.div>
    </div>
  )
}

interface RowProps {
  label: string
  note: string
  number: React.ReactNode
  barWidth: string
  color: string
  active: boolean
  reduce: boolean
  delay: number
}

function Row({ label, note, number, barWidth, color, active, reduce, delay }: RowProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">{label}</div>
          <div className="text-xs text-slate-400">{note}</div>
        </div>
        <div className="font-mono text-2xl font-bold text-white tabular-nums md:text-3xl">{number}</div>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, #fff))` }}
          initial={reduce ? false : { width: 0 }}
          animate={active ? { width: barWidth } : { width: 0 }}
          transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
