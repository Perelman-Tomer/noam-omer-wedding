import { useState, useEffect, useRef, useCallback } from 'react'
import { assetUrl } from '../utils/assetUrl'
import './VideoSection.css'

const SPARK_COUNT = 12
const INTRO_POSTER_URL = assetUrl('assets/images/firstFrame.webp')

/**
 * Seal position inside the *native* video frame, expressed as fractions (0–1).
 * Tweak these two numbers if the video asset ever changes.
 */
const SEAL_X = 0.5
const SEAL_Y = 0.58
const SEAL_DIAMETER = 0.099 // fraction of video height

function useSealPosition(videoRef) {
  const [pos, setPos] = useState(null)

  const compute = useCallback(() => {
    const vid = videoRef.current
    if (!vid || !vid.videoWidth) return

    const cW = vid.clientWidth
    const cH = vid.clientHeight
    const vW = vid.videoWidth
    const vH = vid.videoHeight

    const scale = Math.max(cW / vW, cH / vH)
    const rW = vW * scale
    const rH = vH * scale
    const ox = (rW - cW) / 2
    const oy = (rH - cH) / 2

    const screenX = SEAL_X * rW - ox
    const screenY = SEAL_Y * rH - oy
    const ringPx = SEAL_DIAMETER * vH * scale

    setPos({ x: screenX, y: screenY, size: ringPx })
  }, [videoRef])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    vid.addEventListener('loadedmetadata', compute)
    window.addEventListener('resize', compute)
    compute()

    return () => {
      vid.removeEventListener('loadedmetadata', compute)
      window.removeEventListener('resize', compute)
    }
  }, [videoRef, compute])

  return pos
}

function VideoSection() {
  const videoRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const sealPos = useSealPosition(videoRef)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const scrollDocumentToTop = useCallback(() => {
    const go = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    go()
    requestAnimationFrame(go)
    requestAnimationFrame(() => requestAnimationFrame(go))
  }, [])

  useEffect(() => {
    if (!showContent) return
    scrollDocumentToTop()
  }, [showContent, scrollDocumentToTop])

  const handleVideoEnd = () => {
    setTimeout(() => {
      setShowContent(true)
      scrollDocumentToTop()
      setTimeout(() => {
        document.body.style.overflow = 'auto'
        scrollDocumentToTop()
      }, 1500)
    }, 0)
  }

  const startPlayback = useCallback(async () => {
    const el = videoRef.current
    if (!el) return false
    try {
      await el.play()
      setHasStarted(true)
      return true
    } catch {
      return false
    }
  }, [])

  const handlePlayClick = useCallback(() => {
    startPlayback()
  }, [startPlayback])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const onCanPlay = () => {
      startPlayback()
    }

    el.addEventListener('canplay', onCanPlay, { once: true })
    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startPlayback()
    }

    return () => el.removeEventListener('canplay', onCanPlay)
  }, [startPlayback])

  const triggerStyle = sealPos
    ? {
        left: sealPos.x,
        top: sealPos.y,
        width: sealPos.size,
        height: sealPos.size,
        '--play-ring-size': `${sealPos.size}px`,
      }
    : undefined

  return (
    <section className={`video-section ${showContent ? 'content-visible' : ''}`}>
      <div className="video-container">
        <video
          ref={videoRef}
          poster={INTRO_POSTER_URL}
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={handleVideoEnd}
          className="hero-video"
        >
          <source src={assetUrl('assets/video/envelope-animation.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!hasStarted && sealPos && (
          <button
            type="button"
            className="video-play-trigger"
            aria-label="הפעלת סרטון הפתיחה"
            onClick={handlePlayClick}
            style={triggerStyle}
          >
            <span className="video-play-ring" aria-hidden />
            <span className="video-play-sparks" aria-hidden>
              {Array.from({ length: SPARK_COUNT }, (_, i) => (
                <span key={i} className="video-play-spark" />
              ))}
            </span>
          </button>
        )}
      </div>
    </section>
  )
}

export default VideoSection
