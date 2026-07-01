import { Section } from '../components/SceneContainer'
import { Kicker } from '../components/Kicker'
import { Reveal } from '../components/Reveal'
import { PersonaAvatar } from '../components/PersonaAvatar'
import { Icon } from '../components/icons/Icon'
import { personas } from '../data/personas'
import type { RunPhase } from '../data/deploymentRun'
import {
  runKpis,
  runTimeline,
  azdBreakdown,
  runIssue,
  copilotUsage,
  alexRunQuote,
} from '../data/deploymentRun'

export function RealRun() {
  const alex = personas.alex

  return (
    <Section id="realrun">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <Reveal>
            <Kicker step="Chapter 05" name="The Real Run" className="justify-center" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              Not a demo — <span className="text-gradient">an actual deployment</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
              Here's the honest version. Alex ran it for real in one Copilot
              session — the first attempt failed, and it was still live on Azure
              inside half an hour.
            </p>
          </Reveal>
        </div>

        {/* Headline metrics */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {runKpis.map((kpi, i) => (
            <Reveal key={kpi.label} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div
                  className={`text-2xl font-bold ${
                    kpi.tone === 'good' ? 'text-[#28c840]' : 'text-gradient'
                  }`}
                >
                  {kpi.value}
                </div>
                <div className="mt-1 text-xs text-slate-400">{kpi.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline + azd breakdown */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {/* Left: Copilot activity timeline */}
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Icon name="copilot" className="h-4 w-4 text-accent" />
                GitHub Copilot — one session, start to finish
              </div>
              <ol>
                {runTimeline.map((phase, i) => (
                  <TimelineItem
                    key={phase.title}
                    phase={phase}
                    last={i === runTimeline.length - 1}
                  />
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Right: azd breakdown + issue/fix */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Icon name="terminal" className="h-4 w-4 text-fluent-teal" />
                    azd up — the successful run
                  </div>
                  <span className="font-mono text-sm text-slate-400">
                    {azdBreakdown.total}
                  </span>
                </div>

                {/* Proportional timing bar */}
                <div className="flex h-8 overflow-hidden rounded-lg border border-white/10">
                  {azdBreakdown.segments.map((seg) => (
                    <div
                      key={seg.label}
                      style={{ width: `${seg.pct}%`, background: seg.color }}
                      className="flex items-center justify-center px-2 text-center text-[11px] font-bold text-[#04121f]"
                    >
                      <span className="truncate">
                        {seg.label} · {seg.duration}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-400">
                  {azdBreakdown.segments.map((seg) => (
                    <span key={seg.label} className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-[3px]"
                        style={{ background: seg.color }}
                      />
                      {seg.label}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  {azdBreakdown.note}
                </p>
              </div>
            </Reveal>

            {/* Issue & resolution callout */}
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-fluent-yellow/25 bg-fluent-yellow/5 p-6 md:p-7">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <Icon name="bolt" className="h-4 w-4 text-fluent-yellow" />
                  First run failed — here's the fix
                </div>
                <dl className="space-y-3 text-sm">
                  <IssueRow label="Symptom" text={runIssue.symptom} />
                  <IssueRow label="Cause" text={runIssue.cause} />
                  <IssueRow label="Fix" text={runIssue.fix} />
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Alex's take */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-accent/25 bg-accent/5 p-6 md:flex-row md:items-center md:gap-6 md:p-7">
            <PersonaAvatar
              avatar={alex.avatar}
              accent={alex.accent}
              size={56}
              className="shrink-0"
            />
            <div>
              <p className="text-pretty text-slate-200">“{alexRunQuote}”</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-white">{alex.name}</span>
                <span className="text-slate-400">{alex.role}</span>
                <span className="hidden text-slate-600 md:inline">·</span>
                <span className="text-xs text-slate-500">
                  {copilotUsage.operations} operations · {copilotUsage.prompts}{' '}
                  prompt · {copilotUsage.agent}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function TimelineItem({ phase, last }: { phase: RunPhase; last: boolean }) {
  const failed = phase.state === 'fail'
  return (
    <li className="flex gap-4">
      {/* Rail */}
      <div className="flex flex-col items-center">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
            failed
              ? 'border-fluent-red/50 bg-fluent-red/10 text-fluent-red'
              : 'border-accent/40 bg-accent/10 text-accent'
          }`}
        >
          <Icon name={phase.icon} className="h-4 w-4" />
        </span>
        {!last && <span className="mt-1 w-px flex-1 bg-white/10" />}
      </div>

      {/* Content */}
      <div className={last ? '' : 'pb-5'}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold text-white">{phase.title}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              failed
                ? 'bg-fluent-red/10 text-fluent-red'
                : 'bg-white/5 text-slate-400'
            }`}
          >
            {phase.time}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{phase.text}</p>
      </div>
    </li>
  )
}

function IssueRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-fluent-yellow">
        {label}
      </dt>
      <dd className="text-slate-300">{text}</dd>
    </div>
  )
}
