import type { CSSProperties, ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** A standard full-height story section that anchors the side navigation. */
export function Section({ id, children, className = '', style }: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={`relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-10 ${className}`}
    >
      {children}
    </section>
  )
}

interface StickyStageProps {
  id: string
  children: ReactNode
  /** Total scroll length of the section, in viewport heights. */
  heightVh?: number
  className?: string
}

/**
 * A pinned "stage": the outer section is tall, while the inner stage sticks to
 * the viewport so an animated sequence can play while the reader scrolls.
 */
export function StickyStage({ id, children, heightVh = 220, className = '' }: StickyStageProps) {
  return (
    <section id={id} style={{ minHeight: `${heightVh}vh` }} className="relative w-full">
      <div
        className={`sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5 py-12 md:px-10 ${className}`}
      >
        {children}
      </div>
    </section>
  )
}
