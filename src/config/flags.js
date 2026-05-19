/**
 * דגלי אתר (פיתוח / פריסה).
 *
 * סרטון הפתיחה:
 * - כש־`SHOW_VIDEO_INTRO` הוא `false` — האתר נטען ישר במצב «אחרי הסרטון» (בלי וידאו, בלי חסימת גלילה).
 * - כש־`true` — מוצג הסרטון כרגיל.
 *
 * איך משנים:
 * 1) לערוך את `DEFAULT_SHOW_VIDEO_INTRO` למטה, או
 * 2) להגדיר ב־`.env` / `.env.local` (גובר על ברירת המחדל):
 *    VITE_SHOW_VIDEO_INTRO=true
 *    VITE_SHOW_VIDEO_INTRO=false
 */

/** ברירת מחדל כשלא מגדירים `VITE_SHOW_VIDEO_INTRO` ב־.env */
const DEFAULT_SHOW_VIDEO_INTRO = true

const env = import.meta.env.VITE_SHOW_VIDEO_INTRO
export const SHOW_VIDEO_INTRO =
  env === 'true' || env === '1'
    ? true
    : env === 'false' || env === '0'
      ? false
      : DEFAULT_SHOW_VIDEO_INTRO
