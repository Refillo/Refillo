import { callApi } from './apiClient';
const API = ''; // Mock API constant
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import './index.css'
import App from './App.jsx'
import PmiFlow from './pmi/PmiFlow.jsx'
import Login from './Login.jsx'
import About from './pages/About.jsx'

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/pitch" element={<Pitch />} />
        <Route path="/pmi/*" element={<PmiFlow />} />
      </Routes>
    </HashRouter>
  </LanguageProvider>,
)
