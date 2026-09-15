import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 自托管字体（Tech_Design §7）：拉丁子集 + font-display swap；中文不自托管（体积红线，AGENTS §8）
import '@fontsource/quicksand/400.css'
import '@fontsource/quicksand/600.css'
import '@fontsource/quicksand/700.css'
import '@fontsource/jetbrains-mono/400.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
