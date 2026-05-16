import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useRef } from 'react';

export default function Pitch() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const containerRef = useRef(null);

  const startDemo = async () => {
    try {
      localStorage.setItem('esg_token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify({ id: 'demo-user', name: 'Azienda Demo SPA', sector: 'Manufacturing' }));
      navigate('/pmi/dashboard', { state: { org: { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' } } });
    } catch (err) { console.error(err); }
  };

  const toggleFullscreen = async () => {
    try {
      if (!containerRef.current) return;
      
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen toggle failed:", err);
    }
  };

  const Footer = () => (
    <footer className="bg-slate-900 pt-24 pb-12 px-12 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-8" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src="logo.png" alt="Refillo Logo" className="h-10 w-auto brightness-0 invert" />
            <span className="text-2xl font-black tracking-tighter">Refillo</span>
          </div>
          <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium max-w-sm mx-auto md:mx-0">
            {t('footer_desc')}
          </p>
          <div className="flex justify-center md:justify-start gap-5">
            <a href="https://github.com/Refillo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-[0.2em] text-xs text-emerald-500 mb-10">{t('footer_prod')}</h4>
          <ul className="space-y-5 text-base font-bold text-slate-400 text-center md:text-left">
            <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => navigate('/faq')}>{t('footer_faq')}</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => navigate('/pitch')}>{t('footer_pitch')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-[0.2em] text-xs text-emerald-500 mb-10 text-center md:text-left">{t('footer_legal')}</h4>
          <ul className="space-y-5 text-base font-bold text-slate-400 text-center md:text-left">
            <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => alert(t('coming_soon'))}>{t('footer_privacy')}</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => alert(t('coming_soon'))}>{t('footer_terms')}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <p className="text-slate-500 text-sm font-bold">© 2026 Refillo</p>
        <p className="text-slate-600 text-xs font-black uppercase tracking-[0.3em]">Built for the Next Industrial Era</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex flex-col">
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="Refillo Logo" className="h-8 md:h-10 w-auto brightness-0 invert" />
          <span className="text-xl md:text-2xl font-black tracking-tighter">Refillo</span>
        </div>
        <div className="flex gap-4 md:gap-6">
          <button onClick={() => navigate('/')} className="text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors">{t('nav_home')}</button>
          <button onClick={startDemo} className="bg-emerald-600 text-white px-4 md:px-8 py-2 rounded-xl text-xs md:text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">{t('demo_cta')}</button>
        </div>
      </nav>

      {/* Presentation Container */}
      <div className="flex-1 bg-black flex flex-col items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t('footer_pitch')}</h2>
          <button 
            onClick={toggleFullscreen}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 md:py-2 rounded-lg text-sm font-bold transition-all border border-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 3 6 6M9 21l-6-6M21 3v6h-6M3 21v-6h6M21 3l-6 6M3 21l6-6"/></svg>
            {lang === 'it' ? 'Modalità Presentazione' : 'Presentation Mode'}
          </button>
        </div>
        
        <div 
          ref={containerRef}
          className="w-full max-w-6xl aspect-video relative overflow-hidden bg-white shadow-2xl rounded-xl md:rounded-2xl group flex items-center justify-center [&:fullscreen]:max-w-none [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen]:rounded-none [&:fullscreen]:aspect-none"
        >
          <iframe 
            src="pitch-content/index.html" 
            title="Refillo Pitch Deck"
            className="w-full h-full border-none bg-white"
            allowFullScreen
          />
        </div>
        <p className="mt-6 md:mt-8 text-slate-500 text-xs md:text-sm font-medium italic text-center">
          {lang === 'it' ? 'Usa le frecce della tastiera o scorri per navigare' : 'Use arrow keys or swipe to navigate'}
        </p>
      </div>

      <Footer />
    </div>
  );
}
