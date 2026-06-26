import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ARCH_VIEWBOX,
  NODE_H,
  NODE_W,
  archEdges,
  archNodes,
} from '../../data/architecture'
import type { ArchNode, IconKey } from '../../data/architecture'
import { Icon } from '../icons/Icon'

interface ArchitectureDiagramProps {
  active: boolean
  onDone?: () => void
}

const nodeById = (id: IconKey) => archNodes.find((n) => n.id === id)!
const NODE_STEP = 0.16
const EDGE_START = archNodes.length * NODE_STEP + 0.15

function edgePath(a: ArchNode, b: ArchNode): string {
  const dx = b.x - a.x
  const dy = b.y - a.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    const x1 = a.x + Math.sign(dx) * (NODE_W / 2)
    const x2 = b.x - Math.sign(dx) * (NODE_W / 2)
    const mx = (x1 + x2) / 2
    return `M ${x1} ${a.y} C ${mx} ${a.y} ${mx} ${b.y} ${x2} ${b.y}`
  }
  const y1 = a.y + Math.sign(dy) * (NODE_H / 2)
  const y2 = b.y - Math.sign(dy) * (NODE_H / 2)
  const my = (y1 + y2) / 2
  return `M ${a.x} ${y1} C ${a.x} ${my} ${b.x} ${my} ${b.x} ${y2}`
}

/** Renders the Azure architecture and assembles it node-by-node, then wires edges. */
export function ArchitectureDiagram({ active, onDone }: ArchitectureDiagramProps) {
  const reduce = useReducedMotion()
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (!active) return
    const t = window.setTimeout(() => onDoneRef.current?.(), reduce ? 300 : 3700)
    return () => window.clearTimeout(t)
  }, [active, reduce])

  return (
    <svg
      viewBox={`0 0 ${ARCH_VIEWBOX.w} ${ARCH_VIEWBOX.h}`}
      className="h-full w-full"
      role="img"
      aria-label="Azure architecture deployed by the accelerator"
    >
      <defs>
        <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-azure-500)" />
        </linearGradient>
      </defs>

      {/* Edges (behind nodes) */}
      <g fill="none">
        {archEdges.map((edge, i) => {
          const a = nodeById(edge.from)
          const b = nodeById(edge.to)
          const d = edgePath(a, b)
          return (
            <motion.path
              key={`${edge.from}-${edge.to}`}
              d={d}
              stroke="url(#edge-grad)"
              strokeWidth={2}
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : EDGE_START + i * 0.1, ease: 'easeInOut' }}
            />
          )
        })}
      </g>

      {/* Nodes */}
      {archNodes.map((node) => (
        <motion.g
          key={node.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: reduce ? 0 : node.order * NODE_STEP, ease: [0.16, 1, 0.3, 1] }}
        >
          <foreignObject
            x={node.x - NODE_W / 2}
            y={node.y - NODE_H / 2}
            width={NODE_W}
            height={NODE_H}
          >
            <div
              className="flex h-full w-full items-center gap-2.5 rounded-xl border px-3"
              style={{
                borderColor: `color-mix(in srgb, ${node.color} 45%, transparent)`,
                background: `linear-gradient(180deg, color-mix(in srgb, ${node.color} 12%, #0b1320), #0a1019)`,
                boxShadow: `0 6px 20px -10px ${node.color}`,
              }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  color: node.color,
                  background: `color-mix(in srgb, ${node.color} 16%, transparent)`,
                }}
              >
                <Icon name={node.id} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold leading-tight text-white">
                  {node.label}
                </div>
                <div className="truncate text-[11px] leading-tight text-slate-400">
                  {node.sublabel}
                </div>
              </div>
            </div>
          </foreignObject>
        </motion.g>
      ))}
    </svg>
  )
}
