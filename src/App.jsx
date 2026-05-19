import VideoSection from './components/VideoSection'
import InvitationSection from './components/InvitationSection'
import LowerScrollContent from './components/LowerScrollContent'
import BackgroundMusic from './components/BackgroundMusic'
import { SHOW_VIDEO_INTRO } from './config/flags'

function App() {
  return (
    <div className="app">
      <BackgroundMusic />
      {SHOW_VIDEO_INTRO && <VideoSection />}
      <InvitationSection />
      <LowerScrollContent />
    </div>
  )
}

export default App
