import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)