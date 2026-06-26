import { useEffect, useRef, useState } from 'react'

interface TypewriterOptions {
  /** Only begin typing once this is true. */
  start?: boolean
  /** Milliseconds per character. */
  speed?: number
  /** Delay before the first character, in ms. */
  startDelay?: number
  /** Show the full text immediately (used for reduced-motion). */
  instant?: boolean
  /** Fired once the full string has been typed. */
  onDone?: () => void
}

/**
 * Types a string out one character at a time. Sequences (chat threads, terminal
 * output) are built by chaining several of these and advancing an index in the
 * parent when `onDone` fires.
 */
export function useTypewriter(
  text: string,
  { start = true, speed = 26, startDelay = 0, instant = false, onDone }: TypewriterOptions = {},
) {
  const [displayed, setDisplayed] = useState(instant ? text : '')
  const [done, setDone] = useState(instant)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (instant) {
      setDisplayed(text)
      setDone(true)
      onDoneRef.current?.()
      return
    }
    if (!start) {
      setDisplayed('')
      setDone(false)
      return
    }

    setDisplayed('')
    setDone(false)
    let i = 0
    let intervalId: number | undefined

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          if (intervalId) window.clearInterval(intervalId)
          setDone(true)
          onDoneRef.current?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(startId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [text, start, speed, startDelay, instant])

  return { displayed, done }
}
