import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../components/SceneContainer'
import { Kicker } from '../components/Kicker'
import { Reveal } from '../components/Reveal'
import { PersonaCard } from '../components/PersonaCard'
import { Icon } from '../components/icons/Icon'
import type { IconName } from '../components/icons/Icon'
import { personas } from '../data/personas'
import { painPoints } from '../data/story'

const docs = [
  { label: 'Auto claim form', tint: 'var(--color-azure-400)', rotate: -8, x: -16, y: 8 },
  { label: 'Police report', tint: 'var(--color-fluent-teal)', rotate: -2, x: 6, y: -6 },
  { label: 'Repair estimate', tint: 'var(--color-fluent-yellow)', rotate: 5, x: 28, y: 10 },
  { label: 'Damage photos', tint: 'var(--color-fluent-magenta)', rotate: 11, x: 46, y: 30 },
]

export function BusinessPain() {
  return (
    <Section id="pain" className="bg-gradient-to-b from-transparent via-ink-900/40 to-transparent">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Narrative */}
          <div>
            <Reveal>
              <Kicker step="Chapter 01" name="The Pain" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Every claim is a stack of paperwork
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg text-slate-300">
                Sarah runs claims operations. A single collision claim arrives as a
                bundle of documents — and someone has to read each one, then reconcile
                the details by hand.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <PersonaCard persona={personas.sarah} showBlurb className="mt-7 max-w-md" />
            </Reveal>
          </div>

          {/* Document stack visual */}
          <DocumentStack />
        </div>

        {/* Pain points */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <PainCard icon={point.icon} title={point.title} text={point.text} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function DocumentStack() {
  const reduce = useReducedMotion()
  return (
    <div className="relative mx-auto flex h-80 w-full max-w-md items-center justify-center">
      {docs.map((doc, i) => (
        <motion.div
          key={doc.label}
          initial={reduce ? false : { opacity: 0, y: 40, rotate: 0 }}
          whileInView={{ opacity: 1, y: doc.y, rotate: doc.rotate }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: doc.x, zIndex: i }}
          className="absolute h-56 w-44 rounded-xl border border-white/10 bg-[#0e1726] p-4 shadow-2xl"
        >
          <div className="mb-3 h-8 w-8 rounded-lg" style={{ background: doc.tint }} />
          <div className="text-sm font-semibold text-white">{doc.label}</div>
          <div className="mt-3 space-y-1.5">
            {Array.from({ length: 5 }).map((_, k) => (
              <div
                key={k}
                className="h-1.5 rounded-full bg-white/10"
                style={{ width: `${90 - k * 12}%` }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Clock badge */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.7, type: 'spring', stiffness: 220, damping: 16 }}
        className="absolute -bottom-2 right-2 z-20 flex items-center gap-2 rounded-full border border-fluent-red/40 bg-ink-950/90 px-4 py-2 shadow-xl backdrop-blur"
      >
        <Icon name="clock" className="h-5 w-5 text-fluent-red" />
        <span className="text-sm font-semibold text-white">4–6 hrs / claim</span>
      </motion.div>
    </div>
  )
}

function PainCard({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-fluent-red/15 text-fluent-red">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div className="text-base font-semibold text-white">{title}</div>
      <p className="mt-1.5 text-sm text-slate-400">{text}</p>
    </div>
  )
}
