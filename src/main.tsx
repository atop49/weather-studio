import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/geist'
import '@fontsource/geist-mono'
import './index.css'
import App from './App'

window.onerror = (msg) => {
  document.title = `ERR: ${String(msg)}`
}
window.onunhandledrejection = (e) => {
  document.title = `REJ: ${String(e.reason)}`
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
