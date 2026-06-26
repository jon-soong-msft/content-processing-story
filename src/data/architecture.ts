export type IconKey =
  | 'web'
  | 'api'
  | 'processor'
  | 'foundry'
  | 'openai'
  | 'content'
  | 'cosmos'
  | 'blob'
  | 'queue'

export interface ArchNode {
  id: IconKey
  label: string
  sublabel: string
  /** Center coordinates in the SVG viewBox (1060 x 600). */
  x: number
  y: number
  /** Accent color for the node. */
  color: string
  /** Assembly order for the "diagram builds itself" animation. */
  order: number
}

export interface ArchEdge {
  from: IconKey
  to: IconKey
}

export const ARCH_VIEWBOX = { w: 1060, h: 600 } as const
export const NODE_W = 188
export const NODE_H = 66

export const archNodes: ArchNode[] = [
  { id: 'web', label: 'Web App', sublabel: 'Container Apps', x: 150, y: 300, color: 'var(--color-azure-300)', order: 0 },
  { id: 'api', label: 'Content API', sublabel: 'Container Apps', x: 410, y: 190, color: 'var(--color-azure-400)', order: 1 },
  { id: 'processor', label: 'Processing Engine', sublabel: 'Container Apps', x: 410, y: 410, color: 'var(--color-accent)', order: 2 },
  { id: 'foundry', label: 'Azure AI Foundry', sublabel: 'hub + project', x: 670, y: 110, color: 'var(--color-fluent-teal)', order: 3 },
  { id: 'openai', label: 'Azure OpenAI', sublabel: 'GPT-5.1 Vision', x: 670, y: 300, color: 'var(--color-fluent-magenta)', order: 4 },
  { id: 'content', label: 'Content Understanding', sublabel: 'multimodal extract', x: 670, y: 490, color: 'var(--color-fluent-yellow)', order: 5 },
  { id: 'cosmos', label: 'Cosmos DB', sublabel: 'claims + results', x: 920, y: 150, color: 'var(--color-fluent-teal)', order: 6 },
  { id: 'blob', label: 'Blob Storage', sublabel: 'documents', x: 920, y: 320, color: 'var(--color-azure-300)', order: 7 },
  { id: 'queue', label: 'Queue Storage', sublabel: 'work items', x: 920, y: 490, color: 'var(--color-fluent-green)', order: 8 },
]

export const archEdges: ArchEdge[] = [
  { from: 'web', to: 'api' },
  { from: 'api', to: 'processor' },
  { from: 'api', to: 'cosmos' },
  { from: 'api', to: 'blob' },
  { from: 'processor', to: 'queue' },
  { from: 'processor', to: 'foundry' },
  { from: 'processor', to: 'openai' },
  { from: 'processor', to: 'content' },
  { from: 'foundry', to: 'openai' },
  { from: 'foundry', to: 'content' },
]
