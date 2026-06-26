export type AvatarKey = 'sarah' | 'marcus' | 'alex' | 'microsoft'

export interface Persona {
  id: string
  name: string
  role: string
  org: string
  /** Tailwind-friendly accent color (CSS color value). */
  accent: string
  avatar: AvatarKey
  blurb: string
}

export const personas: Record<AvatarKey, Persona> = {
  sarah: {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Claims Operations Manager',
    org: 'Contoso Insurance',
    accent: 'var(--color-fluent-magenta)',
    avatar: 'sarah',
    blurb: 'Owns the claims backlog — and the customers waiting on it.',
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Reyes',
    role: 'IT Solutions Architect',
    org: 'Contoso Insurance',
    accent: 'var(--color-fluent-teal)',
    avatar: 'marcus',
    blurb: 'Turns business problems into systems — without reinventing the wheel.',
  },
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft',
    role: 'Solution Accelerator team',
    org: 'Azure',
    accent: 'var(--color-azure-400)',
    avatar: 'microsoft',
    blurb: 'Already built the hard parts — and shipped them as an open accelerator.',
  },
  alex: {
    id: 'alex',
    name: 'Alex Kumar',
    role: 'Developer',
    org: 'Contoso Insurance',
    accent: 'var(--color-accent)',
    avatar: 'alex',
    blurb: 'Ships fast with the right tools — azd, Bicep, and GitHub Copilot.',
  },
}
