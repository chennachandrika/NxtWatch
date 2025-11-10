import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config' // Initialize i18n
import App from './App.tsx'
import './stores/AuthModel.ts' // Initialize AuthStore
import './stores/ThemeModel.ts' // Initialize ThemeStore
import './stores/LanguageModel.ts' // Initialize LanguageModel

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
