import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../components/SceneContainer'
import { Kicker } from '../components/Kicker'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/icons/Icon'
import { acceleratorFeatures } from '../data/story'

const topics = ['Azure AI Foundry', 'Azure OpenAI', 'Content Understanding', 'azd template', 'Cosmos DB']

export function Discovery() {
  const reduce = useReducedMotion()

  return (
    <Section id="discovery" className="bg-gradient-to-b from-transparent via-azure-950/30 to-transparent">
      <div className="mx-auto w-full max-w-6xl">
        <div className="text-center">
          <Reveal>
            <Kicker step="Chapter 03" name="The Discovery" className="justify-center" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              Microsoft already built the hard part
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
              Marcus reaches out to Microsoft — and finds an open-source
              accelerator that does exactly this, ready to deploy on Azure.
            </p>
          </Reveal>
        </div>

        {/* Repo card */}
        <Reveal delay={0.1}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/12 bg-[#0d1117] shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-sm text-slate-400">
              <Icon name="git" className="h-4 w-4" />
              <span className="font-medium text-slate-300">microsoft</span>
              <span className="text-slate-600">/</span>
              <span className="font-semibold text-white">content-processing-solution-accelerator</span>
              <span className="ml-auto hidden items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-xs sm:flex">
                <Icon name="spark" className="h-3 w-3 text-fluent-yellow" /> Public
              </span>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-300">
                Extract data and apply schemas to unstructured, multi-modal documents
                using Azure AI Foundry, Azure OpenAI, Azure AI Content Understanding,
                and Cosmos DB.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-azure-500/30 bg-azure-500/10 px-3 py-1 text-xs font-medium text-azure-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                <span className="inline-flex items-center gap-2 rounded-lg bg-fluent-teal/15 px-3 py-1.5 text-sm font-semibold text-fluent-teal">
                  <Icon name="terminal" className="h-4 w-4" />
                  Deploys with <code className="font-mono">azd up</code>
                </span>
                <span className="text-xs text-slate-500">MIT licensed · open source</span>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Features */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {acceleratorFeatures.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/30">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Icon name="check" className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="text-base font-semibold text-white">{f.title}</div>
                <p className="mt-1.5 text-sm text-slate-400">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
