interface KickerProps {
  step: string
  name: string
  className?: string
}

/** The "Chapter 0X · Name" eyebrow shown above each chapter title. */
export function Kicker({ step, name, className = '' }: KickerProps) {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent ${className}`}
    >
      <span>{step}</span>
      <span className="h-1 w-1 rounded-full bg-accent" />
      <span className="text-slate-400">{name}</span>
    </div>
  )
}
