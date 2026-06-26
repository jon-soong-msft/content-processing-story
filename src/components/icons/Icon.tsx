import type { ReactElement, SVGProps } from 'react'

export type IconName =
  | 'clock'
  | 'stack'
  | 'maze'
  | 'queue'
  | 'web'
  | 'api'
  | 'processor'
  | 'foundry'
  | 'openai'
  | 'content'
  | 'cosmos'
  | 'blob'
  | 'spark'
  | 'check'
  | 'chevronDown'
  | 'bolt'
  | 'terminal'
  | 'copilot'
  | 'git'
  | 'arrowRight'

const paths: Record<IconName, ReactElement> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  stack: (
    <>
      <path d="M12 3l8 4-8 4-8-4 8-4Z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16.5l8 4 8-4" />
    </>
  ),
  maze: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 7h10v10" />
      <path d="M7 12h6v5" />
    </>
  ),
  queue: (
    <>
      <circle cx="5" cy="6" r="1" />
      <circle cx="5" cy="12" r="1" />
      <circle cx="5" cy="18" r="1" />
      <path d="M9 6h11M9 12h11M9 18h11" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  api: (
    <>
      <path d="M9 8l-4 4 4 4" />
      <path d="M15 8l4 4-4 4" />
      <path d="M13 6l-2 12" />
    </>
  ),
  processor: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2" />
    </>
  ),
  foundry: (
    <>
      <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9L12 3Z" />
      <path d="M12 9l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />
    </>
  ),
  openai: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />,
  content: (
    <>
      <path d="M7 3h6l5 5v13H7z" />
      <path d="M13 3v5h5" />
      <path d="M9 13h6M9 16.5h6" />
    </>
  ),
  cosmos: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3 3 7 3s7-1.3 7-3" />
    </>
  ),
  blob: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" />
    </>
  ),
  spark: (
    <path d="M12 4l1.4 4.1L17.5 9.5l-4.1 1.4L12 15l-1.4-4.1L6.5 9.5l4.1-1.4L12 4Z" />
  ),
  check: <path d="M5 12l4.5 4.5L19 6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z" />,
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" />
    </>
  ),
  copilot: (
    <>
      <path d="M3 12c1.8-3.6 5-5 9-5s7.2 1.4 9 5" />
      <path d="M4 12.5a3 3 0 0 1 3-3h2a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2H7a3 3 0 0 1-3-2.5Z" />
      <path d="M20 12.5a3 3 0 0 0-3-3h-2a2 2 0 0 0-2 2v1.5a2 2 0 0 0 2 2h2a3 3 0 0 0 3-2.5Z" />
    </>
  ),
  git: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 8v8M18 11a6 6 0 0 1-6 6H9" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
