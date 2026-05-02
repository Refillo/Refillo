import { callApi } from './apiClient';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import './index.css'
import App from './App.jsx'
import PmiFlow from './pmi/PmiFlow.jsx'
import Login from './Login.jsx'
import About from './pages/About.jsx'

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pmi/*" element={<PmiFlow />} />
      </Routes>
    </BrowserRouter>
  </LanguageProvider>,
)
