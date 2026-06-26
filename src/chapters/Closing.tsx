import { motion, useReducedMotion } from 'framer-motion'
import { Kicker } from '../components/Kicker'
import { Reveal } from '../components/Reveal'
import { PersonaAvatar } from '../components/PersonaAvatar'
import { Icon } from '../components/icons/Icon'
import { personas } from '../data/personas'

const REPO_URL = 'https://github.com/microsoft/content-processing-solution-accelerator'

const recap = [
  { who: personas.sarah, verb: 'felt the pain' },
  { who: personas.marcus, verb: 'scoped the fix' },
  { who: personas.microsoft, verb: 'had the accelerator' },
  { who: personas.alex, verb: 'shipped it' },
]

export function Closing() {
  const reduce = useReducedMotion()

  return (
    <section
      id="closing"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,120,212,0.18),_transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <Kicker step="Your turn" name="Deploy It" className="justify-center" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Spin it up <span className="text-gradient">yourself</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            The accelerator is real, open-source, and one command away. Clone it,
            run <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-accent">azd up</code>,
            and let GitHub Copilot guide the rest.
          </p>
        </Reveal>

        {/* Command + CTA */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-[#05080e] px-4 py-3 font-mono text-sm">
              <span className="text-fluent-teal">$</span>
              <span className="text-slate-100">azd up</span>
              <motion.span
                animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
                className="ml-1 inline-block h-4 w-2 bg-accent"
              />
              <span className="ml-auto text-xs text-slate-600">one command</span>
            </div>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-xl bg-azure-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-azure-400"
            >
              <Icon name="git" className="h-5 w-5" />
              Get the accelerator on GitHub
              <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        {/* Journey recap */}
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {recap.map((r, i) => (
              <div key={r.who.id} className="flex items-center gap-2 md:gap-3">
                <div className="flex flex-col items-center gap-1.5">
                  <PersonaAvatar avatar={r.who.avatar} accent={r.who.accent} size={44} />
                  <div className="text-[11px] text-slate-400">
                    <span className="font-semibold text-white">{r.who.name.split(' ')[0]}</span>{' '}
                    {r.verb}
                  </div>
                </div>
                {i < recap.length - 1 && (
                  <Icon name="arrowRight" className="mb-4 h-4 w-4 shrink-0 text-slate-600" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-12 max-w-lg text-xs leading-relaxed text-slate-600">
            This is an illustrative story. Personas are fictional and the Copilot and
            terminal sequences are simulated — but the Content Processing Solution
            Accelerator is a real, open-source Microsoft project that deploys to Azure
            with the Azure Developer CLI.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
