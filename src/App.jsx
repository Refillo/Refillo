import { callApi } from './apiClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MarketGraph from './components/MarketGraph.jsx';
import AutoCompilerDemo from './components/AutoCompilerDemo.jsx';
import { useLanguage } from './LanguageContext';

const IntelligenceCard = ({ title, value, sub, icon }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-zinc-950 p-6 rounded-3xl border border-white/5 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="text-3xl mb-4">{icon}</div>
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
    <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{sub}</p>
  </motion.div>
);

function App() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    callApi('/market-intelligence')
      .then(res => res.json())
      .then(data => {
        setIntel(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleComingSoon = () => {
    alert(t('coming_soon'));
  };

  const startDemo = async () => {
    try {
      const res = await callApi('/auth/login', { method: 'POST' });
      const data = await res.json();
      localStorage.setItem('esg_token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/pmi/dashboard', { 
        state: { 
          org: data.user.org || { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' } 
        } 
      });
    } catch (err) {
      console.error("Demo login error", err);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-slate-400 selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* Navbar - Ultra Minimal & High-End */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="Refillo Logo" className="h-7 md:h-8 w-auto brightness-0 invert" />
          <span className="text-xl font-black text-white tracking-tighter">Refillo</span>
        </div>
        <div className="flex gap-6 md:gap-10 items-center">
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            {lang}
          </button>
          <button onClick={() => navigate('/about')} className="text-[11px] font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">{t('nav_about')}</button>
          <button onClick={startDemo} className="bg-white text-black px-6 md:px-8 py-2.5 rounded-full text-xs font-black hover:bg-emerald-400 transition-all active:scale-95">
            {t('demo_cta')}
          </button>
        </div>
      </nav>

      {/* Hero Section - The "ctrl.xyz" Entrance */}
      <header className="px-6 md:px-12 pt-32 pb-24 md:pt-48 md:pb-40 text-center max-w-6xl mx-auto relative">
        {/* Deep Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-video bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-[110px] font-black text-white leading-[0.9] mb-10 tracking-[-0.04em]">
            {t('hero_title')} <br className="hidden md:block"/>
            <span className="text-emerald-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">{t('hero_title_span')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-16 max-w-3xl mx-auto tracking-tight">
            {t('hero_sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={startDemo} className="w-full sm:w-auto bg-emerald-500 text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)] active:scale-95">
              {t('demo_cta')}
            </button>
            <button onClick={handleComingSoon} className="w-full sm:w-auto px-12 py-5 border border-white/10 rounded-2xl font-black text-xl hover:bg-white/5 transition-all text-white backdrop-blur-sm">
              {t('hero_cta')}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Interactive Engine Demo */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 md:mb-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl"
        >
          <AutoCompilerDemo />
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-6 md:px-12 py-32 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Feature: Formats (Large Bento) */}
            <motion.div 
              className="md:col-span-8 bg-zinc-950 p-10 md:p-16 rounded-[3rem] border border-white/5 hover:border-emerald-500/20 transition-all group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-3xl mb-10 border border-emerald-500/20">📄</div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">{t('feat_formats_title')}</h3>
                <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  {t('feat_formats_desc')}
                </p>
                <div className="mt-12 flex flex-wrap gap-4">
                  {['.xlsx', '.pdf', '.csv', '.json', '.xlsm'].map(ext => (
                    <span key={ext} className="px-5 py-2 bg-white/5 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest border border-white/5">{ext}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            </motion.div>

            {/* Extension Card (Tall Bento) */}
            <motion.div 
              className="md:col-span-4 bg-white text-black p-10 md:p-12 rounded-[3rem] shadow-2xl hover:scale-[1.02] transition-all group relative overflow-hidden flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl mb-10">🧩</div>
                <h3 className="text-3xl font-black mb-6 tracking-tighter">{t('feat_extension_title')}</h3>
                <p className="text-slate-600 text-base font-bold leading-relaxed">
                  {t('feat_extension_desc')}
                </p>
              </div>
              <div className="mt-12">
                <div className="inline-flex items-center gap-3 bg-black/5 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Live on Chrome Store
                </div>
              </div>
            </motion.div>

            {/* Steps - Bottom Row */}
            {[
              { id: '01', title: t('how_step1_title'), desc: t('how_step1_desc'), icon: '⚡' },
              { id: '02', title: t('how_step2_title'), desc: t('how_step2_desc'), icon: '🧠' },
              { id: '03', title: t('how_step3_title'), desc: t('how_step3_desc'), icon: '🚀' },
            ].map((step, idx) => (
              <motion.div 
                key={step.id}
                className="md:col-span-4 bg-zinc-950/50 p-10 rounded-[3rem] border border-white/5 hover:bg-zinc-900/50 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <div className="text-sm font-black text-emerald-500 mb-8 uppercase tracking-[0.3em] flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-[11px]">{step.id}</span>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-5 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-base font-medium leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Intelligence */}
      <section className="px-6 md:px-12 py-32 md:py-48 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[0.95] tracking-tighter">
                {t('market_title')}
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed mb-16 tracking-tight">
                {t('market_sub')}
              </p>
              
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h4 className="text-emerald-500 text-6xl font-black mb-3 tracking-tighter">94%</h4>
                  <p className="text-white font-black text-[11px] uppercase tracking-[0.2em] leading-tight">
                    {t('market_pressure_title')}
                  </p>
                </div>
                <div>
                  <h4 className="text-emerald-500 text-6xl font-black mb-3 tracking-tighter">3.5</h4>
                  <p className="text-white font-black text-[11px] uppercase tracking-[0.2em] leading-tight">
                    {t('market_quest_title')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-950 p-10 md:p-16 rounded-[4rem] border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
               <h3 className="text-xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-widest text-sm">
                 <div className="w-1.5 h-6 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                 {t('market_chart_title')}
               </h3>
               <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={intel?.stats || []}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                     <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '16px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                       cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }}
                     />
                     <Bar dataKey="emissions" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => navigate('/')}>
              <img src="logo.png" alt="Refillo Logo" className="h-8 w-auto brightness-0 invert" />
              <span className="text-2xl font-black text-white tracking-tighter">Refillo</span>
            </div>
            <p className="text-slate-500 text-base font-medium leading-relaxed max-w-sm mb-10">
              {t('footer_desc')}
            </p>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-emerald-500 mb-12">{t('footer_prod')}</h4>
            <ul className="space-y-5 text-sm font-black text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/faq')}>{t('footer_faq')}</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/pitch')}>{t('footer_pitch')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-emerald-500 mb-12">{t('footer_legal')}</h4>
            <ul className="space-y-5 text-sm font-black text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_privacy')}</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_terms')}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Refillo Intelligence S.r.l.</p>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Milan, Italy • Built for the Next Industrial Era</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
