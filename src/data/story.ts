/** Narrative content for the story chapters, kept in one place for easy tuning. */

export interface PainPoint {
  icon: 'clock' | 'stack' | 'maze' | 'queue'
  title: string
  text: string
}

export const painPoints: PainPoint[] = [
  {
    icon: 'stack',
    title: 'Documents everywhere',
    text: 'Every collision claim arrives as a bundle — claim form, police report, repair estimate, and photos of the damage.',
  },
  {
    icon: 'maze',
    title: 'Manual cross-referencing',
    text: 'Analysts read each document by hand and reconcile names, VINs, dates, and amounts across all of them.',
  },
  {
    icon: 'clock',
    title: 'Hours per claim',
    text: 'A single claim can take four to six hours to summarize and check for missing or conflicting information.',
  },
  {
    icon: 'queue',
    title: 'A backlog that grows',
    text: 'The queue only gets longer, and customers wait days for a decision that should take minutes.',
  },
]

export interface Feature {
  title: string
  text: string
}

export const acceleratorFeatures: Feature[] = [
  {
    title: 'Multi-document claim processing',
    text: 'Upload a whole claim at once; the workflow extracts every document, then summarizes across all of them.',
  },
  {
    title: 'Multimodal extraction',
    text: 'OCR plus GPT-5.1 Vision read text, tables, graphs, and photos — not just clean PDFs.',
  },
  {
    title: 'AI summary & gap analysis',
    text: 'A consolidated summary plus automatic detection of missing documents and cross-document discrepancies.',
  },
  {
    title: 'Confidence scoring',
    text: 'Every extraction is scored, so people only review what actually needs a human in the loop.',
  },
  {
    title: 'No-code rules (YAML DSL)',
    text: 'Domain experts add or change gap-analysis rules without touching application code.',
  },
  {
    title: 'Deploys with azd',
    text: 'One open-source template provisions every Azure resource and ships the app — no glue code required.',
  },
]

export interface ValueStat {
  value: string
  label: string
  sub: string
}

export const valueStats: ValueStat[] = [
  { value: 'Hours → Minutes', label: 'per claim', sub: 'manual cross-referencing is now orchestrated automatically' },
  { value: '1', label: 'command to deploy', sub: 'azd up provisions and ships the whole solution' },
  { value: '9+', label: 'Azure services wired up', sub: 'Foundry, OpenAI, Content Understanding, Cosmos DB & more' },
  { value: '0', label: 'lines of glue code', sub: 'the accelerator already connects every piece' },
]

/** Used by the hours → minutes comparison animation. */
export const timeComparison = {
  before: { value: 5, unit: 'hours', label: 'Manual review', note: 'read, reconcile, repeat' },
  after: { value: 10, unit: 'minutes', label: 'With the accelerator', note: 'extract, summarize, flag gaps' },
}
