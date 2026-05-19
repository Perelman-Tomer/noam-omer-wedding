import { useState, useEffect, useRef, useCallback } from 'react'
import './BackgroundMusic.css'

const MAX_VOLUME = 0.35

function BackgroundMusic() {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const hasStartedRef = useRef(false)
  const [isMuted, setIsMuted] = useState(false)

  const fadeIn = useCallback((duration = 2500) => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)

    audio.volume = 0
    audio.muted = false
    const startTime = Date.now()
    const step = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1)
      audio.volume = progress * MAX_VOLUME
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step)
      }
    }
    step()
  }, [])

  const startMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio || hasStartedRef.current) return

    hasStartedRef.current = true
    audio.volume = 0
    audio.play()
      .then(() => fadeIn())
      .catch(() => {
        hasStartedRef.current = false
      })
  }, [fadeIn])

  useEffect(() => {
    const onInteraction = () => {
      if (!hasStartedRef.current) {
        startMusic()
      }
    }

    document.addEventListener('click', onInteraction, true)
    document.addEventListener('touchstart', onInteraction, true)

    return () => {
      document.removeEventListener('click', onInteraction, true)
      document.removeEventListener('touchstart', onInteraction, true)
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
    }
  }, [startMusic])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!hasStartedRef.current) {
      startMusic()
      return
    }

    if (isMuted) {
      audio.muted = false
      setIsMuted(false)
    } else {
      audio.muted = true
      setIsMuted(true)
    }
  }, [isMuted, startMusic])

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={encodeURI('/assets/הזמנה לחתונה - אורי בנאי.mp3')}
      />

      <button
        type="button"
        className="music-toggle-btn"
        onClick={toggleMute}
        aria-label={isMuted ? 'הפעלת מוזיקה' : 'השתקת מוזיקה'}
      >
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </>
  )
}

export default BackgroundMusic
