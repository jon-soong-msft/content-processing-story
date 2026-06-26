import { motion, useReducedMotion } from 'framer-motion'
import { personas } from '../data/personas'
import { PersonaAvatar } from '../components/PersonaAvatar'
import { Icon } from '../components/icons/Icon'

const journey = [personas.sarah, personas.marcus, personas.microsoft, personas.alex]
const journeyVerbs = ['feels the pain', 'scopes it', 'has the answer', 'ships it']

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Background */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,120,212,0.18),_transparent_55%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-azure-500/20 blur-3xl"
        animate={reduce ? undefined : { y: [0, -24, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-fluent-magenta/15 blur-3xl"
        animate={reduce ? undefined : { y: [0, 26, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm"
        >
          <Icon name="foundry" className="h-4 w-4 text-accent" />
          Microsoft Content Processing Solution Accelerator
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl"
        >
          From <span className="text-slate-400 line-through decoration-fluent-red/70">hours</span>{' '}
          to <span className="text-gradient">minutes</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-slate-300 md:text-xl"
        >
          A claims team was drowning in paperwork. Here's how a ready-made Azure
          accelerator — and GitHub Copilot — turned weeks of manual work into a
          single command.
        </motion.p>

        {/* Persona journey strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-4"
        >
          {journey.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2 md:gap-4">
              <div className="flex flex-col items-center gap-2">
                <PersonaAvatar avatar={p.avatar} accent={p.accent} size={56} />
                <div className="text-center">
                  <div className="text-xs font-semibold text-white">{p.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-400">{journeyVerbs[i]}</div>
                </div>
              </div>
              {i < journey.length - 1 && (
                <Icon name="arrowRight" className="mb-5 h-4 w-4 shrink-0 text-slate-600" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <span className="text-[11px] uppercase tracking-widest">Scroll</span>
          <Icon name="chevronDown" className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
