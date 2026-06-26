import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { terminalScript } from '../../data/terminalScript'
import type { TerminalLine } from '../../data/terminalScript'
import { useTypewriter } from '../../hooks/useTypewriter'
import { Icon } from '../icons/Icon'

interface TerminalProps {
  active: boolean
  onDone?: () => void
}

/** A simulated `azd up` run that streams provisioning output line by line. */
export function Terminal({ active, onDone }: TerminalProps) {
  const reduce = useReducedMotion()
  const [revealed, setRevealed] = useState(0)
  const [commandDone, setCommandDone] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const command = terminalScript[0]?.text ?? ''
  const { displayed, done: cmdTyped } = useTypewriter(command, {
    start: active && !reduce,
    instant: !!(reduce && active),
    speed: 60,
    onDone: () => setCommandDone(true),
  })
  void cmdTyped

  useEffect(() => {
    if (!active) return
    if (reduce) {
      setRevealed(terminalScript.length)
      setCommandDone(true)
      const t = window.setTimeout(() => onDoneRef.current?.(), 300)
      return () => window.clearTimeout(t)
    }
    setRevealed(1)
  }, [active, reduce])

  useEffect(() => {
    if (!active || reduce || !commandDone) return
    let i = 1
    let timer = 0
    const step = () => {
      setRevealed(i + 1)
      const line = terminalScript[i]
      i += 1
      if (i < terminalScript.length) {
        const delay =
          line.kind === 'resource' ? 330 : line.kind === 'section' ? 300 : line.kind === 'blank' ? 90 : 160
        timer = window.setTimeout(step, delay)
      } else {
        timer = window.setTimeout(() => onDoneRef.current?.(), 850)
      }
    }
    timer = window.setTimeout(step, 320)
    return () => window.clearTimeout(timer)
  }, [active, reduce, commandDone])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [revealed, displayed])

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#05080e] shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <Icon name="terminal" className="h-3.5 w-3.5" />
          pwsh — azd
        </span>
      </div>

      {/* Body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed">
        {terminalScript.slice(0, revealed).map((line, i) => (
          <LineRow key={i} line={line} index={i} command={displayed} commandTyping={active && !commandDone && !reduce} reduce={!!reduce} />
        ))}
      </div>
    </div>
  )
}

interface LineRowProps {
  line: TerminalLine
  index: number
  command: string
  commandTyping: boolean
  reduce: boolean
}

function LineRow({ line, index, command, commandTyping, reduce }: LineRowProps) {
  const motionProps = reduce
    ? {}
    : { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 } }

  if (line.kind === 'blank') return <div className="h-3" />

  if (line.kind === 'command') {
    return (
      <div className="flex flex-wrap items-center gap-x-2">
        <span className="text-fluent-teal">PS C:\src\cps&gt;</span>
        <span className={`text-slate-100 ${commandTyping ? 'caret' : ''}`}>{command}</span>
      </div>
    )
  }

  if (line.kind === 'section') {
    return (
      <motion.div {...motionProps} className="mt-1 font-semibold text-slate-300">
        {line.text}
      </motion.div>
    )
  }

  if (line.kind === 'resource') {
    return (
      <motion.div {...motionProps} className="flex items-center gap-2 pl-1">
        <motion.span
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.05 }}
          className="text-[#28c840]"
        >
          <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
        </motion.span>
        <span className="w-44 text-slate-200">{line.name}</span>
        <span className="text-slate-500">{line.detail}</span>
      </motion.div>
    )
  }

  if (line.kind === 'url') {
    const [pre, url] = (line.text ?? '').split('https://')
    return (
      <motion.div {...motionProps} className="flex items-center gap-2 pl-1 text-slate-300">
        <span className="text-[#28c840]">
          <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>
        <span>{pre}</span>
        {url && <span className="text-accent underline decoration-accent/40">https://{url}</span>}
      </motion.div>
    )
  }

  // success
  return (
    <motion.div
      {...(reduce ? {} : { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4 } })}
      className="mt-1 font-semibold text-[#28c840]"
      key={index}
    >
      {line.text}
    </motion.div>
  )
}
