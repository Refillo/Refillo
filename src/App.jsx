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
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="text-3xl mb-4">{icon}</div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
    <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
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
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar - Ultra Clean */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="Refillo Logo" className="h-8 md:h-9 w-auto" />
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">Refillo</span>
        </div>
        <div className="flex gap-4 md:gap-8 items-center">
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            {lang}
          </button>
          <button onClick={() => navigate('/about')} className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider">{t('nav_about')}</button>
          <button onClick={startDemo} className="bg-slate-900 text-white px-5 md:px-7 py-2.5 rounded-full text-xs font-black hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
            {t('demo_cta')}
          </button>
        </div>
      </nav>

      {/* Hero Section - Bold & Minimal */}
      <header className="px-6 md:px-12 pt-24 pb-16 md:pt-32 md:pb-24 text-center max-w-5xl mx-auto relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-50/50 to-transparent pointer-events-none -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            {t('hero_title')} <br className="hidden md:block"/>
            <span className="text-blue-600">{t('hero_title_span')}</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
            {t('hero_sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={startDemo} className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95">
              {t('demo_cta')}
            </button>
            <button onClick={handleComingSoon} className="w-full sm:w-auto px-10 py-4 border border-slate-200 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all text-slate-600">
              {t('hero_cta')}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Interactive Engine Demo */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-24 md:mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AutoCompilerDemo />
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-6 md:px-12 py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Main Feature: Formats (Large Card) */}
            <motion.div 
              className="md:col-span-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">📄</div>
                <h3 className="text-3xl md:text-4xl font-black mb-4">{t('feat_formats_title')}</h3>
                <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  {t('feat_formats_desc')}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['.xlsx', '.pdf', '.csv', '.json', '.xlsm'].map(ext => (
                    <span key={ext} className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest border border-slate-100">{ext}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none hidden md:block"></div>
            </motion.div>

            {/* Extension Card (Small Card) */}
            <motion.div 
              className="md:col-span-4 bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl hover:shadow-blue-900/20 transition-all group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-8">🧩</div>
                <h3 className="text-2xl font-black mb-4">{t('feat_extension_title')}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                  {t('feat_extension_desc')}
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                  Live on Chrome Store
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Steps - Row 2 */}
            {[
              { id: '01', title: t('how_step1_title'), desc: t('how_step1_desc'), icon: '⚡' },
              { id: '02', title: t('how_step2_title'), desc: t('how_step2_desc'), icon: '🧠' },
              { id: '03', title: t('how_step3_title'), desc: t('how_step3_desc'), icon: '🚀' },
            ].map((step, idx) => (
              <motion.div 
                key={step.id}
                className="md:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <div className="text-sm font-black text-blue-600 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-[10px]">{step.id}</span>
                  {step.icon}
                </div>
                <h3 className="text-xl font-black mb-4">{step.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Intelligence - Cleaned Up */}
      <section className="px-6 md:px-12 py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
                {t('market_title')}
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12">
                {t('market_sub')}
              </p>
              
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="text-blue-600 text-5xl font-black mb-2 tracking-tighter">94%</h4>
                  <p className="text-slate-900 font-black text-[10px] uppercase tracking-widest leading-tight">
                    {t('market_pressure_title')}
                  </p>
                </div>
                <div>
                  <h4 className="text-blue-600 text-5xl font-black mb-2 tracking-tighter">3.5</h4>
                  <p className="text-slate-900 font-black text-[10px] uppercase tracking-widest leading-tight">
                    {t('market_quest_title')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-slate-100">
               <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                 {t('market_chart_title')}
               </h3>
               <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={intel?.stats || []}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                     <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', color: '#0f172a', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                       cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
                     />
                     <Bar dataKey="emissions" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
              <img src="logo.png" alt="Refillo Logo" className="h-9 w-auto" />
              <span className="text-2xl font-black tracking-tighter">Refillo</span>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 max-w-xs">
              {t('footer_desc')}
            </p>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-600 mb-10">{t('footer_prod')}</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/faq')}>{t('footer_faq')}</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/pitch')}>{t('footer_pitch')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-600 mb-10">{t('footer_legal')}</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_privacy')}</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_terms')}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">© 2026 Refillo</p>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Built for the Next Industrial Era</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
