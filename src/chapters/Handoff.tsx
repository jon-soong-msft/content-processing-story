import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../components/SceneContainer'
import { Kicker } from '../components/Kicker'
import { Reveal } from '../components/Reveal'
import { PersonaAvatar } from '../components/PersonaAvatar'
import { Icon } from '../components/icons/Icon'
import { personas } from '../data/personas'

const options = [
  { label: 'Build it in-house', verdict: 'months of work', good: false },
  { label: 'Hire a vendor', verdict: 'slow & costly', good: false },
  { label: 'Start from an accelerator', verdict: 'proven & fast', good: true },
]

export function Handoff() {
  const reduce = useReducedMotion()
  const sarah = personas.sarah
  const marcus = personas.marcus

  return (
    <Section id="handoff">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <Reveal>
            <Kicker step="Chapter 02" name="The Handoff" className="justify-center" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              So Sarah brings it to IT
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
              She hands the problem to Marcus with one ask: make claims faster,
              without adding headcount.
            </p>
          </Reveal>
        </div>

        {/* Handoff flow */}
        <div className="mt-14 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-4">
          <Reveal x={-30} y={0}>
            <Persona who={sarah} caption="Hands off the requirement" />
          </Reveal>

          {/* Ticket */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.8, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-72 rounded-2xl border border-white/10 bg-[#0e1726] p-5 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-md bg-fluent-magenta/15 px-2 py-0.5 text-xs font-semibold text-fluent-magenta">
                REQ-4821
              </span>
              <span className="text-xs text-slate-500">Priority: High</span>
            </div>
            <div className="text-sm font-semibold text-white">
              Cut claim processing time
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Automate document extraction and cross-checking across every claim.
            </p>
            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-slate-500">
              <Icon name="arrowRight" className="h-3.5 w-3.5 text-accent" />
              Assigned to IT — Solutions
            </div>
          </motion.div>

          <Reveal x={30} y={0} delay={0.2}>
            <Persona who={marcus} caption="Picks it up" />
          </Reveal>
        </div>

        {/* Brainstorm */}
        <div className="mt-14">
          <Reveal>
            <p className="mb-5 text-center text-sm font-medium uppercase tracking-wider text-slate-500">
              Marcus weighs the options
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {options.map((opt, i) => (
              <Reveal key={opt.label} delay={i * 0.1}>
                <div
                  className={`flex items-center gap-3 rounded-2xl border p-4 ${
                    opt.good
                      ? 'border-fluent-teal/40 bg-fluent-teal/10'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      opt.good ? 'bg-fluent-teal/20 text-fluent-teal' : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    <Icon name={opt.good ? 'check' : 'clock'} className="h-5 w-5" strokeWidth={opt.good ? 2.4 : 1.6} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{opt.label}</div>
                    <div className={`text-xs ${opt.good ? 'text-fluent-teal' : 'text-slate-500'}`}>
                      {opt.verdict}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Persona({ who, caption }: { who: (typeof personas)[keyof typeof personas]; caption: string }) {
  return (
    <div className="flex w-44 flex-col items-center text-center">
      <PersonaAvatar avatar={who.avatar} accent={who.accent} size={76} />
      <div className="mt-3 text-sm font-semibold text-white">{who.name}</div>
      <div className="text-xs" style={{ color: who.accent }}>
        {who.role}
      </div>
      <div className="mt-1 text-xs text-slate-500">{caption}</div>
    </div>
  )
}
