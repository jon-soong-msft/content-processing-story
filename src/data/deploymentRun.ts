/**
 * Real telemetry from Alex's actual deployment of the Content Processing Solution
 * Accelerator — a single GitHub Copilot session that ran `azd up`, hit a snag, and
 * recovered. Figures come from the run's timing report; sensitive endpoints and the
 * subscription name are intentionally omitted for the public story.
 */

import type { IconName } from '../components/icons/Icon'

export interface RunKpi {
  value: string
  label: string
  /** Emphasis tone for the value. */
  tone?: 'good' | 'neutral'
}

/** Headline numbers from the run. */
export const runKpis: RunKpi[] = [
  { value: 'SUCCESS', label: 'azd up result (exit 0)', tone: 'good' },
  { value: '10m 27s', label: 'azd up duration' },
  { value: '27m', label: 'total Copilot session' },
  { value: '13', label: 'Azure resources' },
  { value: '4 / 4', label: 'container apps running', tone: 'good' },
  { value: 'gpt-5.1', label: 'model deployed' },
]

export type RunPhaseState = 'done' | 'fail'

export interface RunPhase {
  time: string
  icon: IconName
  title: string
  text: string
  state: RunPhaseState
}

/** The Copilot activity timeline, warts and all. */
export const runTimeline: RunPhase[] = [
  {
    time: '~4 min',
    icon: 'search',
    title: 'Explore & prerequisites',
    text: 'Cloned the repo, verified az / azd tooling and sign-in, read the deployment guide, and confirmed gpt-5.1 quota.',
    state: 'done',
  },
  {
    time: '~6 min',
    icon: 'terminal',
    title: 'azd up #1 — failed',
    text: 'Configured the azd environment and ran azd up. It failed: the container apps could not pull their images.',
    state: 'fail',
  },
  {
    time: '~3 min',
    icon: 'spark',
    title: 'Diagnose & fix',
    text: "Copilot traced it to an unreachable public image registry, then switched to the repo's build-from-source path.",
    state: 'done',
  },
  {
    time: '~11 min',
    icon: 'rocket',
    title: 'azd up #2 — success',
    text: 'Provisioned 13 resources, built the four service images in ACR, deployed them, and registered the schemas.',
    state: 'done',
  },
  {
    time: '~2 min',
    icon: 'check',
    title: 'Verify',
    text: 'Resource Graph inventory confirmed all four apps Running; the web and API endpoints returned HTTP 200.',
    state: 'done',
  },
  {
    time: '~2 min',
    icon: 'chart',
    title: 'Document',
    text: 'Generated a full deployment timing report — the source for everything on this page.',
    state: 'done',
  },
]

export interface AzdSegment {
  label: string
  duration: string
  /** Percent width of the timing bar. */
  pct: number
  color: string
}

/** Breakdown of the successful `azd up` run. */
export const azdBreakdown = {
  total: '10m 27s',
  segments: [
    { label: 'Provisioning', duration: '5m 08s', pct: 49, color: 'var(--color-accent)' },
    { label: 'Deploying', duration: '5m 19s', pct: 51, color: 'var(--color-fluent-teal)' },
  ] as AzdSegment[],
  note: 'The default path takes 4–6 min with pre-built images. This run built all four images from source (~5 min extra) after the public registry was unreachable.',
}

/** The one thing that went wrong — and how it got fixed. */
export const runIssue = {
  symptom: 'The first azd up failed after ~6 minutes — the container apps could not start.',
  cause: "The template's default public image registry no longer resolves (DNS: no such host).",
  fix: 'Copilot switched to the supported build-from-source path, so the four images build in ACR (cloud-side, no local Docker) and deploy.',
}

/** How much of the work Copilot carried. */
export const copilotUsage = {
  operations: '~45',
  prompts: '1',
  agent: 'GitHub Copilot CLI',
}

export const alexRunQuote =
  "The first run failed, but I never opened a browser to debug it. Copilot found the bad registry, switched to the build-from-source path, and had everything live on the second try."
