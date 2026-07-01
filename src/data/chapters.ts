export interface ChapterMeta {
  id: string
  /** Short label used in the side navigation. */
  nav: string
  /** Roman-ish step label shown in section headers. */
  step: string
}

export const chapters: ChapterMeta[] = [
  { id: 'hero', nav: 'Intro', step: '' },
  { id: 'pain', nav: 'The Pain', step: 'Chapter 01' },
  { id: 'handoff', nav: 'The Handoff', step: 'Chapter 02' },
  { id: 'discovery', nav: 'The Discovery', step: 'Chapter 03' },
  { id: 'build', nav: 'The Build', step: 'Chapter 04' },
  { id: 'realrun', nav: 'The Real Run', step: 'Chapter 05' },
  { id: 'payoff', nav: 'The Payoff', step: 'Chapter 06' },
  { id: 'closing', nav: 'Deploy It', step: '' },
  { id: 'catalog', nav: 'More', step: '' },
]
