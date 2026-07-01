import { Section } from '../components/SceneContainer'
import { Kicker } from '../components/Kicker'
import { Reveal } from '../components/Reveal'
import { PersonaAvatar } from '../components/PersonaAvatar'
import { TimeComparison } from '../components/build/TimeComparison'
import { valueStats } from '../data/story'
import { personas } from '../data/personas'

export function Payoff() {
  const sarah = personas.sarah

  return (
    <Section id="payoff">
      <div className="mx-auto w-full max-w-6xl">
        <div className="text-center">
          <Reveal>
            <Kicker step="Chapter 06" name="The Payoff" className="justify-center" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              Back on Sarah's desk
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
              The same claim that used to eat an afternoon is now summarized,
              cross-checked, and flagged for gaps — in minutes.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {/* Comparison */}
          <Reveal>
            <TimeComparison />
          </Reveal>

          {/* Stats + resolution */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              {valueStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                    <div className="mt-1 text-sm font-semibold text-white">{stat.label}</div>
                    <div className="mt-1 text-xs text-slate-400">{stat.sub}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="flex items-start gap-4 rounded-2xl border border-fluent-magenta/25 bg-fluent-magenta/5 p-5">
                <PersonaAvatar avatar={sarah.avatar} accent={sarah.accent} size={56} className="shrink-0" />
                <div>
                  <p className="text-pretty text-slate-200">
                    “My team reviews exceptions instead of retyping documents. The
                    backlog is gone, and customers get answers the same day.”
                  </p>
                  <div className="mt-2 text-sm font-semibold text-white">
                    {sarah.name}
                    <span className="ml-2 font-normal text-slate-400">{sarah.role}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
