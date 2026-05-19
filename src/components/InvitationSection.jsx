import { useEffect, useRef, useState } from 'react'
import './InvitationSection.css'

function InvitationSection() {
  const sectionRef = useRef(null)
  const topSentinelRef = useRef(null)
  const [showScroll, setShowScroll] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setShowScroll(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const sentinel = topSentinelRef.current
    if (!section || !sentinel) return

    /**
     * נצפה ברקע דק בראש ההזמנה — לא בכל גובה הסקשן.
     * במסכים קטנים עם תמונת הזמנה ארוכה, סף על כל הסקשן (למשל 12%) לא נפגע
     * כשהמשתמש רואה רק את החלק העליון, ולכן הטקסט/עיטורים נשארים בשקיפות 0.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('invitation--in-view')
          }
        })
      },
      { threshold: [0, 0.01, 0.99, 1], rootMargin: '0px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="invitation-section">
      <div ref={topSentinelRef} className="invitation-top-sentinel" aria-hidden />
      <div className="invitation-bg-top" />
      <div className="invitation-hero">
        <div className="invitation-top-image">
          <div className="wreath-container">
            <img
            
              src="/assets/images/compressed_webp/1-Flower-top.webp"
              alt="Decorative wreath"
              className="wreath-image"
            />
          </div>
          <img
            src="/assets/images/invitation-text-icons.webp"
            alt="Noam and Omer wedding invitation"
            className="invitation-image"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <button
          className={`scroll-hint${showScroll ? '' : ' scroll-hint--hidden'}`}
          aria-label="גלול למטה"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default InvitationSection
