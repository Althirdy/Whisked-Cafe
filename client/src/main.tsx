import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Style/Index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)