import type { AvatarKey } from '../data/personas'

interface PersonaAvatarProps {
  avatar: AvatarKey
  size?: number
  accent?: string
  className?: string
}

const labels: Record<AvatarKey, string> = {
  sarah: 'Illustration of Sarah, a claims operations manager',
  marcus: 'Illustration of Marcus, an IT solutions architect',
  alex: 'Illustration of Alex, a developer',
  microsoft: 'Microsoft logo',
}

/** Hand-built, license-free SVG avatars so each persona reads as a distinct person. */
export function PersonaAvatar({
  avatar,
  size = 88,
  accent = 'var(--color-azure-400)',
  className,
}: PersonaAvatarProps) {
  const id = avatar

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={labels[avatar]}
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#11263c" />
          <stop offset="1" stopColor="#070f1c" />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <circle cx="50" cy="50" r="46" />
        </clipPath>
      </defs>

      <circle cx="50" cy="50" r="48" fill={`url(#bg-${id})`} />

      <g clipPath={`url(#clip-${id})`}>
        {avatar === 'sarah' && <Sarah />}
        {avatar === 'marcus' && <Marcus />}
        {avatar === 'alex' && <Alex />}
        {avatar === 'microsoft' && <MicrosoftMark />}
      </g>

      <circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke={accent}
        strokeOpacity="0.6"
        strokeWidth="2"
      />
    </svg>
  )
}

function Sarah() {
  const skin = '#f0c6a0'
  const hair = '#46303c'
  const cloth = '#8a2f64'
  return (
    <g>
      {/* hair behind (bob) */}
      <path
        d="M29 52 C29 30 71 30 71 52 L71 70 L61 70 L61 49 C61 41 56 37 50 37 C44 37 39 41 39 49 L39 70 L29 70 Z"
        fill={hair}
      />
      <path d="M44 60 h12 v8 h-12 z" fill={skin} />
      <path d="M18 96 C18 80 31 72 50 72 C69 72 82 80 82 96 Z" fill={cloth} />
      <circle cx="50" cy="47" r="15.5" fill={skin} />
      {/* bangs */}
      <path d="M35 45 C40 37 60 37 65 45 C60 42 56 41 50 41 C44 41 40 42 35 45 Z" fill={hair} />
      {/* headset */}
      <path d="M34 41 A17 17 0 0 1 66 41" stroke="#1c2430" strokeWidth="2.4" fill="none" />
      <rect x="62" y="44" width="5" height="9" rx="2" fill="#1c2430" />
      <path d="M64 52 Q60 60 53 60" stroke="#1c2430" strokeWidth="2" fill="none" />
      <circle cx="52" cy="60" r="1.7" fill="#1c2430" />
    </g>
  )
}

function Marcus() {
  const skin = '#cf9b6e'
  const hair = '#211c19'
  const cloth = '#1f6f63'
  return (
    <g>
      <path d="M44 60 h12 v8 h-12 z" fill={skin} />
      <path d="M18 96 C18 80 31 72 50 72 C69 72 82 80 82 96 Z" fill={cloth} />
      <circle cx="50" cy="47" r="15.5" fill={skin} />
      {/* short hair */}
      <path d="M34 46 C35 33 65 33 66 46 C62 39 57 36 50 36 C43 36 38 39 34 46 Z" fill={hair} />
      {/* glasses */}
      <rect x="38" y="44" width="10" height="8" rx="2.5" fill="none" stroke="#10161f" strokeWidth="1.8" />
      <rect x="52" y="44" width="10" height="8" rx="2.5" fill="none" stroke="#10161f" strokeWidth="1.8" />
      <path d="M48 47 h4" stroke="#10161f" strokeWidth="1.8" />
    </g>
  )
}

function Alex() {
  const skin = '#e7b489'
  const hair = '#1b1922'
  const cloth = '#21405c'
  return (
    <g>
      <path d="M44 60 h12 v8 h-12 z" fill={skin} />
      <path d="M18 96 C18 80 31 72 50 72 C69 72 82 80 82 96 Z" fill={cloth} />
      {/* hoodie collar */}
      <path d="M37 73 q13 9 26 0" stroke="#16314a" strokeWidth="3" fill="none" />
      <circle cx="50" cy="47" r="15.5" fill={skin} />
      {/* fringe */}
      <path d="M34 47 C35 34 65 34 66 47 C62 40 57 42 50 42 C43 42 38 40 34 47 Z" fill={hair} />
      {/* headphones */}
      <path d="M31 48 A19 19 0 0 1 69 48" stroke="var(--color-accent)" strokeWidth="3" fill="none" />
      <rect x="27" y="45" width="7" height="12" rx="3" fill="var(--color-accent)" />
      <rect x="66" y="45" width="7" height="12" rx="3" fill="var(--color-accent)" />
    </g>
  )
}

function MicrosoftMark() {
  return (
    <g>
      <rect x="33" y="33" width="15" height="15" rx="1.5" fill="#f25022" />
      <rect x="52" y="33" width="15" height="15" rx="1.5" fill="#7fba00" />
      <rect x="33" y="52" width="15" height="15" rx="1.5" fill="#00a4ef" />
      <rect x="52" y="52" width="15" height="15" rx="1.5" fill="#ffb900" />
    </g>
  )
}
