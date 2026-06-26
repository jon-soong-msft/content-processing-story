import type { Persona } from '../data/personas'
import { PersonaAvatar } from './PersonaAvatar'

interface PersonaCardProps {
  persona: Persona
  className?: string
  showBlurb?: boolean
  size?: number
}

export function PersonaCard({ persona, className = '', showBlurb = false, size = 72 }: PersonaCardProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm ${className}`}
      style={{ boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${persona.accent} 22%, transparent)` }}
    >
      <PersonaAvatar avatar={persona.avatar} accent={persona.accent} size={size} className="shrink-0" />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-white">{persona.name}</div>
        <div className="text-xs font-medium" style={{ color: persona.accent }}>
          {persona.role}
        </div>
        <div className="text-xs text-slate-400">{persona.org}</div>
        {showBlurb && <p className="mt-2 text-sm text-slate-300">{persona.blurb}</p>}
      </div>
    </div>
  )
}
