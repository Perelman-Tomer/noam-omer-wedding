import { useState, useEffect, useRef } from 'react'
import { assetUrl } from '../utils/assetUrl'
import './LowerScrollContent.css'

const WEDDING_PHOTOS_DRIVE_URL =
  'https://drive.google.com/drive/folders/1TtJUyqU9nbpM_wqmdfgYuQDxxTxMgA1m?usp=sharing'
const WEDDING_DATE_LABEL = '16.6.2026'

const lowerSectionBgUrl = assetUrl('assets/images/compressed_webp/Light_Back_flowes.webp')
const theDayIconUrl = assetUrl('assets/images/The-Day.webp')

/** מצב הספירה כאן — כדי שלא ירונדר כל הסקשן כל שנייה */
function LowerCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const weddingDate = new Date('2026-06-16T19:00:00')
    const tick = () => {
      const difference = weddingDate - new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const daysStr =
    timeLeft.days >= 100 ? String(timeLeft.days) : String(timeLeft.days).padStart(2, '0')

  return (
    <div
      className="lower-countdown"
      dir="rtl"
      role="timer"
      aria-live="polite"
      aria-label={`ספירה לאחור: ${timeLeft.seconds} שניות, ${timeLeft.minutes} דקות, ${timeLeft.hours} שעות, ${timeLeft.days} ימים`}
    >
      <div className="lower-countdown__unit">
        <span className="lower-countdown__value">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="lower-countdown__label">שניות</span>
      </div>
      <span className="lower-countdown__sep" aria-hidden="true">
        :
      </span>
      <div className="lower-countdown__unit">
        <span className="lower-countdown__value">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="lower-countdown__label">דקות</span>
      </div>
      <span className="lower-countdown__sep" aria-hidden="true">
        :
      </span>
      <div className="lower-countdown__unit">
        <span className="lower-countdown__value">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="lower-countdown__label">שעות</span>
      </div>
      <span className="lower-countdown__sep" aria-hidden="true">
        :
      </span>
      <div className="lower-countdown__unit">
        <span className="lower-countdown__value">{daysStr}</span>
        <span className="lower-countdown__label">ימים</span>
      </div>
    </div>
  )
}

function WazeIcon() {
  return (
    <svg className="lower-waze-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z"
      />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg className="lower-camera-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"
      />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <img className="lower-calendar-icon" src={theDayIconUrl} alt="" aria-hidden="true" />
  )
}

function LowerScrollContent() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const animatables = section.querySelectorAll('.lower-block, .lower-footer')
    if (!animatables.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )

    animatables.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleWazeNavigation = () => {
    const wazeUrl =
      'https://waze.com/ul?q=גאיה%20חדרה%20-%20גן%20אירועים%20-%20HaUman%20St%2012%20Hadera&navigate=yes'
    window.open(wazeUrl, '_blank')
  }

  const handleAddToCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Noam & Omer Wedding//Wedding Invitation//HE
BEGIN:VEVENT
UID:noam-omer-wedding-2026@wedding.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:20260616T190000Z
DTEND:20260617T030000Z
SUMMARY:חתונת נועם ועומר
DESCRIPTION:טקס החופה בשעה 19:00\\nחגיגת הנשף בשעה 20:00\\nגאיה חדרה - גן אירועים
LOCATION:גאיה חדרה - גן אירועים, רחוב האומן 12, חדרה
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'noam-omer-wedding.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }

  return (
    <section
      ref={sectionRef}
      className="lower-scroll-section"
      aria-label="פרטי האירוע"
    >
      <div
        className="lower-scroll-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${JSON.stringify(lowerSectionBgUrl)})` }}
      />
      <div className="lower-scroll-inner">
        <div className="lower-block lower-block--sprig-left">
          <div className="lower-wreath-wrap">
            <img
              src={assetUrl('assets/images/compressed_webp/4 Flower.webp')}
              alt=""
              className="lower-wreath"
              decoding="async"
            />
          </div>
          <h2 className="lower-heading">הספירה לאחור</h2>
          <p className="lower-date-line">{WEDDING_DATE_LABEL}</p>
          <LowerCountdown />
          <p className="lower-cursive">נתראה בקרוב...</p>
          <img
          
            src={assetUrl('assets/images/compressed_webp/5 Flower left.webp')}
            alt=""
            className="lower-sprig lower-sprig--side"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="lower-block lower-block--sprig-right lower-block--calendar">
          <button
            type="button"
            id="lower-calendar-add-btn"
            className="lower-btn lower-btn--calendar"
            onClick={handleAddToCalendar}
            aria-describedby="lower-calendar-date-hint"
          >
            <span>הוסף אירוע ליומן</span>
            <CalendarIcon />
          </button>
      
          <img
          
            src={assetUrl('assets/images/compressed_webp/6 Flower Right.webp')}
            alt=""
            className="lower-sprig lower-sprig--side"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="lower-block lower-block--sprig-left">
          <button type="button" className="lower-btn lower-btn--waze" onClick={handleWazeNavigation}>
            <span className="lower-btn__label">קישור הגעה לגאיה בחדרה</span>
            <WazeIcon />
          </button>
          <img
            src={assetUrl('assets/images/compressed_webp/7 Flower left.webp')}
            alt=""
            className="lower-sprig lower-sprig--side lower-sprig--waze"
            loading="lazy"
            decoding="async"
          />
          <div className="lower-car-wrap">
            <img
              src={assetUrl('assets/images/wedding-car.webp')}
              alt="רכב חתונה דקורטיבי"
              className="lower-car"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="lower-block lower-block--sprig-right">
          <a
            className="lower-btn lower-btn--waze"
            href={WEDDING_PHOTOS_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="lower-btn__label">שתפו אותנו בצילומים מהאירוע</span>
            <CameraIcon />
          </a>
          <img
            src={assetUrl('assets/images/compressed_webp/9 Flower Right.webp')}
            alt=""
            className="lower-sprig lower-sprig--side lower-sprig--photo-share"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="lower-footer lower-block--sprig-right">
          <img
            src={assetUrl('assets/images/noam-omer-logo.webp')}
            alt="נועם ועומר"
            className="lower-footer-logo"
            loading="lazy"
            decoding="async"
          />
          <p className="lower-cursive lower-cursive--footer">תודה על השתתפותך</p>

          <div className="wreath-container lower-bottom-wreath">
            <img
              src={assetUrl('assets/images/compressed_webp/1-Flower-top.webp')}
              alt="Decorative wreath"
              className="wreath-image lower-bottom-wreath__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LowerScrollContent
