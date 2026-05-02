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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar Pubblica */}
      <nav className="flex justify-between items-center px-12 py-6 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="ESGlab Logo" className="h-10 w-auto" />
          <span className="text-2xl font-black text-slate-900 tracking-tighter">ESG<span className="text-emerald-600">lab</span></span>
        </div>
        <div className="flex gap-6 items-center">
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase"
          >
            {lang}
          </button>
          <button onClick={() => navigate('/about')} className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">{t('nav_about')}</button>
          <button onClick={handleComingSoon} className="px-6 py-2 text-sm font-bold text-slate-400 opacity-50 cursor-not-allowed transition-colors">{t('nav_login')}</button>
          <button onClick={handleComingSoon} className="bg-slate-200 text-slate-400 px-8 py-2 rounded-xl text-sm font-black cursor-not-allowed opacity-60">
            {t('nav_register')}
          </button>
          <button onClick={startDemo} className="bg-emerald-600 text-white px-8 py-2 rounded-xl text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">
            {t('demo_cta')}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-12 py-24 text-center max-w-4xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tight">
            {t('hero_title')} <br/>
            <span className="text-emerald-600">{t('hero_title_span')}</span>
          </h1>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-12">
            {t('hero_sub')}
          </p>
          <div className="flex flex-col items-center gap-4">
            <button onClick={startDemo} className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-2xl active:scale-95">
              {t('demo_cta')}
            </button>
            <button onClick={handleComingSoon} className="text-slate-400 font-bold text-sm opacity-50 cursor-not-allowed hover:underline">
              {t('hero_cta')}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Corporate Interoperability Graph */}
      {!loading && (
        <section className="px-12 max-w-7xl mx-auto mb-24 overflow-visible">
          <motion.div
            animate={isRecording ? {
              scale: [1, 1.15, 1],
              y: [0, -20, 0]
            } : {}}
            transition={{ duration: 4, delay: 2, ease: "easeInOut" }}
          >
            <MarketGraph data={intel?.graph} />
          </motion.div>
        </section>
      )}

      {/* How it Works Section */}
      <section className="px-12 py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900">{t('how_title')}</h2>
            <p className="text-slate-500 mt-4 font-medium text-xl">{t('how_sub')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { id: '01', title: t('how_step1_title'), desc: t('how_step1_desc') },
              { id: '02', title: t('how_step2_title'), desc: t('how_step2_desc') },
              { id: '03', title: t('how_step3_title'), desc: t('how_step3_desc') },
            ].map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="text-5xl font-black text-emerald-600/10 absolute -top-8 -left-2">{step.id}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">{step.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-Compiler Interactive Demo */}
      <section className="px-12 max-w-6xl mx-auto my-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <AutoCompilerDemo />
        </motion.div>
      </section>

      {/* Market Intelligence Intro */}
      <section className="px-12 py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-black mb-8 leading-tight">
                {t('market_title')}
              </h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                {t('market_sub')}
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-emerald-500 text-4xl font-black mb-2">94%</h4>
                  <p className="text-slate-300 font-bold text-sm uppercase tracking-widest leading-tight">
                    {t('market_pressure_title')}
                  </p>
                  <p className="text-slate-500 text-xs mt-2 font-medium">
                    {t('market_pressure_sub')}
                  </p>
                </div>
                <div>
                  <h4 className="text-emerald-500 text-4xl font-black mb-2">12</h4>
                  <p className="text-slate-300 font-bold text-sm uppercase tracking-widest leading-tight">
                    {t('market_quest_title')}
                  </p>
                  <p className="text-slate-500 text-xs mt-2 font-medium">
                    {t('market_quest_sub')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-1 rounded-3xl border border-slate-700 backdrop-blur-xl">
               <div className="bg-slate-900 p-8 rounded-[22px]">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    {t('market_chart_title')}
                  </h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={intel?.stats || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                          cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                        />
                        <Bar dataKey="emissions" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-24 pb-12 px-12 text-white">
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

export default App;
