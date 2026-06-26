import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { copilotScript } from '../../data/copilotScript'
import type { CopilotMessage } from '../../data/copilotScript'
import { useTypewriter } from '../../hooks/useTypewriter'
import { Icon } from '../icons/Icon'

interface CopilotChatProps {
  active: boolean
  onDone?: () => void
}

const LAST = copilotScript.length - 1

/** A simulated GitHub Copilot chat panel that types out the deployment exchange. */
export function CopilotChat({ active, onDone }: CopilotChatProps) {
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  // Reduced motion: reveal the whole thread at once.
  useEffect(() => {
    if (active && reduce) setCurrent(LAST)
  }, [active, reduce])

  // Keep the latest content pinned to the bottom as it types.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const pin = () => {
      el.scrollTop = el.scrollHeight
    }
    const observer = new MutationObserver(pin)
    observer.observe(el, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  const handleRowDone = (index: number) => {
    if (index < LAST) {
      window.setTimeout(() => setCurrent((c) => Math.max(c, index + 1)), 600)
    } else {
      window.setTimeout(() => onDoneRef.current?.(), 500)
    }
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0f17] shadow-2xl">
      {/* Panel header */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <Icon name="copilot" className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold tracking-wide text-slate-200">GitHub Copilot</span>
        <span className="ml-auto flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {copilotScript.slice(0, current + 1).map((message, i) => {
          const isCurrent = i === current
          return (
            <MessageRow
              key={i}
              message={message}
              start={active && isCurrent && !reduce}
              instant={reduce ? active : !isCurrent}
              onDone={isCurrent ? () => handleRowDone(i) : undefined}
              reduce={!!reduce}
            />
          )
        })}
      </div>

      {/* Faux input */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-500">
          <span>Ask Copilot…</span>
          <Icon name="arrowRight" className="ml-auto h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  )
}

interface MessageRowProps {
  message: CopilotMessage
  start: boolean
  instant: boolean
  reduce: boolean
  onDone?: () => void
}

function MessageRow({ message, start, instant, reduce, onDone }: MessageRowProps) {
  const isUser = message.role === 'user'
  const { displayed, done } = useTypewriter(message.text, {
    start,
    instant,
    speed: isUser ? 16 : 22,
    onDone,
  })

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[88%] gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}>
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
            isUser ? 'bg-azure-600 text-white' : 'bg-white/10 text-accent'
          }`}
        >
          {isUser ? 'AK' : <Icon name="copilot" className="h-3.5 w-3.5" />}
        </span>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'rounded-tr-sm bg-azure-600/90 text-white'
              : 'rounded-tl-sm bg-white/[0.06] text-slate-200'
          }`}
        >
          <span className={start && !done ? 'caret' : undefined}>{displayed}</span>
          {message.code && done && (
            <motion.pre
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-2.5 overflow-x-auto rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-[12px] leading-relaxed text-accent"
            >
              {message.code}
            </motion.pre>
          )}
        </div>
      </div>
    </motion.div>
  )
}
