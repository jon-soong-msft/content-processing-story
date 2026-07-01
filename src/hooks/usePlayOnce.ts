import { useEffect, useRef } from 'react'

/**
 * Plays an audio clip exactly once — the first time `active` becomes true.
 *
 * It never replays: scrolling away and back, or navigating to the chapter
 * again, will not retrigger it (the page keeps every chapter mounted, so the
 * guard persists for the session). Autoplay failures caused by browser policy
 * are swallowed silently.
 */
export function usePlayOnce(src: string, active: boolean) {
  const played = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!active || played.current) return
    played.current = true
    const audio = new Audio(src)
    audio.preload = 'auto'
    audioRef.current = audio
    void audio.play().catch(() => {
      // Autoplay blocked (no user gesture yet) or playback failed — ignore.
    })
  }, [active, src])

  // Stop playback if the component unmounts mid-clip.
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])
}
