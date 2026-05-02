import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export default function Pitch() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex flex-col">
      <nav className="flex justify-between items-center px-12 py-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-emerald-600 text-white font-black px-3 py-1 rounded-lg text-xl">ESG</div>
          <span className="text-xl font-black tracking-tight">lab</span>
        </div>
        <button onClick={() => navigate('/')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{t('nav_home')}</button>
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
    </div>
  );
}
