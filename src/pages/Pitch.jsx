import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export default function Pitch() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const handleComingSoon = () => alert(t('coming_soon'));

  const startDemo = async () => {
    try {
      localStorage.setItem('esg_token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify({ id: 'demo-user', name: 'Azienda Demo SPA', sector: 'Manufacturing' }));
      navigate('/pmi/dashboard', { state: { org: { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' } } });
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex flex-col">
      <nav className="flex justify-between items-center px-12 py-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="ESGlab Logo" className="h-10 w-auto brightness-0 invert" />
          <span className="text-2xl font-black tracking-tighter">ESG<span className="text-emerald-600">lab</span></span>
        </div>
        <div className="flex gap-6">
          <button onClick={() => navigate('/')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{t('nav_home')}</button>
          <button onClick={startDemo} className="bg-emerald-600 text-white px-8 py-2 rounded-xl text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">{t('demo_cta')}</button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <div className="max-w-5xl w-full aspect-video bg-slate-800 rounded-[2.5rem] border border-slate-700 shadow-2xl flex flex-col items-center justify-center text-center p-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500 rounded-full blur-[120px]"></div>
          </div>
          
          <h2 className="text-5xl font-black mb-6">ESGlab Pitch Deck</h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
            {lang === 'it' 
              ? "La presentazione ufficiale per investitori e partner strategici sarà disponibile a breve in questo spazio."
              : "The official presentation for investors and strategic partners will be available shortly in this space."}
          </p>
          
          <div className="flex gap-4">
             <div className="px-8 py-4 bg-emerald-600 rounded-2xl font-black text-lg opacity-50 cursor-not-allowed">
               {lang === 'it' ? 'Guarda Presentation' : 'View Presentation'}
             </div>
          </div>
        </div>
      </div>

      {/* Footer (Unificato) */}
      <footer className="bg-slate-900 pt-24 pb-12 px-12 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <img src="logo.png" alt="ESGlab Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-2xl font-black tracking-tighter">ESG<span className="text-emerald-600">lab</span></span>
            </div>
            <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium max-w-sm">
              {t('footer_desc')}
            </p>
            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors text-lg">in</div>
              <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors text-lg">𝕏</div>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-xs text-emerald-500 mb-10">{t('footer_prod')}</h4>
            <ul className="space-y-5 text-base font-bold text-slate-400">
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => navigate('/faq')}>{t('footer_faq')}</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => navigate('/pitch')}>{t('footer_pitch')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-xs text-emerald-500 mb-10">{t('footer_legal')}</h4>
            <ul className="space-y-5 text-base font-bold text-slate-400">
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_privacy')}</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_terms')}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm font-bold">
            {t('footer_copy')}
          </p>
          <p className="text-slate-600 text-xs font-black uppercase tracking-[0.3em]">
            Built for the Next Industrial Era
          </p>
        </div>
      </footer>
    </div>
  );
}
