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
    <footer className="bg-white border-t border-slate-100 pt-32 pb-16 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => navigate('/')}>
            <img src="logo.png" alt="Refillo Logo" className="h-8 w-auto" />
            <span className="text-2xl font-black tracking-tighter text-slate-900">Refillo</span>
          </div>
          <p className="text-slate-400 text-base font-medium leading-relaxed max-w-sm mb-10">
            {t('footer_desc')}
          </p>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-emerald-600 mb-12">{t('footer_prod')}</h4>
          <ul className="space-y-5 text-sm font-black text-slate-400">
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/faq')}>{t('footer_faq')}</li>
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/pitch')}>{t('footer_pitch')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-emerald-600 mb-12">{t('footer_legal')}</h4>
          <ul className="space-y-5 text-sm font-black text-slate-400">
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => alert(t('coming_soon'))}>{t('footer_privacy')}</li>
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => alert(t('coming_soon'))}>{t('footer_terms')}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-10">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Refillo Intelligence S.r.l.</p>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Built for the Next Industrial Era</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="Refillo Logo" className="h-8 md:h-9 w-auto" />
          <span className="text-xl font-black text-slate-900 tracking-tighter">Refillo</span>
        </div>
        <div className="flex gap-4 md:gap-6 items-center">
          <button onClick={() => navigate('/')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">{t('nav_home')}</button>
          <button onClick={startDemo} className="bg-slate-900 text-white px-6 md:px-8 py-2.5 rounded-full text-xs font-black hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-slate-200">{t('demo_cta')}</button>
        </div>
      </nav>

      {/* Presentation Container */}
      <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-video bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2">Refillo Investor Relations</p>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">{t('footer_pitch')}</h2>
          </div>
          <button 
            onClick={toggleFullscreen}
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-slate-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 3 6 6M9 21l-6-6M21 3v6h-6M3 21v-6h6M21 3l-6 6M3 21l6-6"/></svg>
            {lang === 'it' ? 'Fullscreen' : 'Presentation Mode'}
          </button>
        </div>
        
        <div 
          ref={containerRef}
          className="w-full max-w-6xl aspect-video relative overflow-hidden bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 group flex items-center justify-center [&:fullscreen]:max-w-none [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen]:rounded-none [&:fullscreen]:aspect-none"
        >
          <iframe 
            src="pitch-content/index.html" 
            title="Refillo Pitch Deck"
            className="w-full h-full border-none bg-white"
            allowFullScreen
          />
        </div>
        <p className="mt-10 text-slate-400 text-xs font-black uppercase tracking-[0.2em] italic text-center">
          {lang === 'it' ? 'Naviga con le frecce della tastiera' : 'Navigate with keyboard arrows'}
        </p>
      </div>

      <Footer />
    </div>
  );
}
