import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { StickyStage } from '../components/SceneContainer'
import { CopilotChat } from '../components/build/CopilotChat'
import { Terminal } from '../components/build/Terminal'
import { ArchitectureDiagram } from '../components/build/ArchitectureDiagram'
import { PersonaAvatar } from '../components/PersonaAvatar'
import { personas } from '../data/personas'
import { Icon } from '../components/icons/Icon'

type Phase = 'idle' | 'copilot' | 'terminal' | 'arch' | 'done'

const status: Record<Phase, { text: string; tone: string }> = {
  idle: { text: 'Ready to deploy', tone: 'text-slate-400' },
  copilot: { text: 'GitHub Copilot is setting things up…', tone: 'text-accent' },
  terminal: { text: 'azd up — provisioning Azure…', tone: 'text-fluent-yellow' },
  arch: { text: 'Assembling your Azure solution…', tone: 'text-fluent-teal' },
  done: { text: 'Provisioned & deployed to Azure', tone: 'text-[#28c840]' },
}

export function Build() {
  const [phase, setPhase] = useState<Phase>('idle')
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { amount: 0.5, once: true })
  const alex = personas.alex

  useEffect(() => {
    if (inView && phase === 'idle') setPhase('copilot')
  }, [inView, phase])

  const showArch = phase === 'arch' || phase === 'done'

  return (
    <StickyStage id="build" heightVh={300}>
      <div ref={stageRef} className="mx-auto flex w-full max-w-6xl flex-col">
        {/* Heading */}
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span>Chapter 04</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-slate-400">The Build</span>
            </div>
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              Alex spins it up <span className="text-gradient">in one command</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 text-sm font-medium ${status[phase].tone}`}>
              <motion.span
                key={phase}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex h-2.5 w-2.5 rounded-full bg-current"
              />
              {status[phase].text}
            </div>
            <PersonaAvatar avatar={alex.avatar} accent={alex.accent} size={44} />
          </div>
        </div>

        {/* Stage */}
        <div className="relative h-[58vh] min-h-[440px]">
          <AnimatePresence mode="wait">
            {!showArch ? (
              <motion.div
                key="ide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <VSCodeFrame>
                  <div className="grid h-full grid-cols-1 gap-px overflow-hidden bg-white/10 md:grid-cols-2">
                    <div className="bg-[#0b0f17] p-3">
                      <CopilotChat active={phase === 'copilot'} onDone={() => setPhase('terminal')} />
                    </div>
                    <div className="bg-[#05080e] p-3">
                      <Terminal
                        active={phase === 'terminal'}
                        onDone={() => setPhase('arch')}
                      />
                    </div>
                  </div>
                </VSCodeFrame>
              </motion.div>
            ) : (
              <motion.div
                key="arch"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-950/60 p-4 backdrop-blur-sm"
              >
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Icon name="check" className="h-4 w-4 text-[#28c840]" strokeWidth={2.4} />
                  Deployed to Azure — every service wired together, zero glue code
                </div>
                <div className="h-[calc(100%-2rem)]">
                  <ArchitectureDiagram active={showArch} onDone={() => setPhase('done')} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </StickyStage>
  )
}

function VSCodeFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-black/40 bg-[#323233] px-4 py-2">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto text-xs font-medium text-slate-400">
          content-processing-solution-accelerator — Visual Studio Code
        </span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  )
}
