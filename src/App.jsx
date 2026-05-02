import { callApi } from './apiClient';
const API = ''; // Mock API constant
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

export default function App() {
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [isRecording] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem('recording_active');
  }, []);

  useEffect(() => {
    callApi(`/market-intelligence`)
      .then(r => r.json())
      .then(data => {
        setIntel(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar Pubblica */}
      <nav className="flex justify-between items-center px-12 py-6 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="ESGlab Logo" className="h-10 w-auto" />
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
          <button onClick={() => navigate('/login')} className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">{t('nav_login')}</button>
          <button onClick={() => navigate('/pmi')} className="bg-emerald-600 text-white px-8 py-2 rounded-xl text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
            {t('nav_register')}
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
          <div className="flex justify-center gap-4">
            <button onClick={() => navigate('/pmi')} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95">
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

      {/* Market Intelligence Section */}
      <section className="px-12 py-24 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900">{t('market_title')}</h2>
            <p className="text-slate-500 mt-4 font-medium text-xl">{t('market_sub')}</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-100 animate-pulse">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Live Analysis
          </div>
        </div>

        {loading ? (
          <div className="text-center py-40 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent mb-4"></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Scansione report ESRS in corso...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-10 mb-20">
              <IntelligenceCard 
                icon="🚨"
                title={t('market_pressure_title')}
                value={intel?.market_pressure_stats?.pmi_under_active_pressure?.toLocaleString() || "20.000"}
                sub={t('market_pressure_sub')}
              />
              <IntelligenceCard 
                icon="📝"
                title={t('market_quest_title')}
                value={intel?.market_pressure_stats?.avg_questionnaires_2026 || "6.5"}
                sub={t('market_quest_sub')}
              />
              <IntelligenceCard 
                icon="💸"
                title={t('market_cost_title')}
                value={`€${((intel?.market_pressure_stats?.avg_cost_manual_compilation || 18000) / 1000).toFixed(0)}k`}
                sub={t('market_cost_sub')}
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900">{t('market_chart_title')}</h3>
                <div className="flex gap-8">
                  {[
                    { label: 'Scope 1', sub: 'Emissioni Dirette', color: 'bg-emerald-600' },
                    { label: 'Scope 2', sub: 'Energia Consumata', color: 'bg-emerald-400' },
                    { label: 'Scope 3', sub: 'Impatto Fornitori', color: 'bg-emerald-200' },
                  ].map((legend, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-4 h-4 ${legend.color} rounded-md`}></div>
                      <div>
                        <p className="text-xs font-black text-slate-600 uppercase leading-none">{legend.label}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">{legend.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={Object.entries(intel?.sectors || {}).map(([name, data]) => ({ name, ...data }))}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 13, fontWeight: 800, fill: '#64748b' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#cbd5e1' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ 
                      borderRadius: '1.5rem', 
                      border: 'none', 
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
                      padding: '1.25rem'
                    }} 
                  />
                  <Bar dataKey="scope1" fill="#059669" radius={[6, 6, 0, 0]} name="Scope 1" barSize={40} />
                  <Bar dataKey="scope2" fill="#34d399" radius={[6, 6, 0, 0]} name="Scope 2" barSize={40} />
                  <Bar dataKey="scope3" fill="#a7f3d0" radius={[6, 6, 0, 0]} name="Scope 3" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-24 pb-12 px-12 text-white mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-emerald-600 text-white font-black px-3 py-1.5 rounded-xl text-xl">ESG</div>
              <span className="text-2xl font-black tracking-tight">lab</span>
            </div>
            <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium">
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
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => navigate('/pmi')}>{t('how_step1_title')}</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">{t('market_title')}</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">ESG Brain AI</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Report Export</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-xs text-emerald-500 mb-10">{t('footer_company')}</h4>
            <ul className="space-y-5 text-base font-bold text-slate-400">
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Mission</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-xs text-emerald-500 mb-10">{t('footer_support')}</h4>
            <ul className="space-y-5 text-base font-bold text-slate-400">
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">API Docs</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors">Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm font-bold">
            {t('footer_legal')}
          </p>
          <p className="text-slate-600 text-xs font-black uppercase tracking-[0.3em]">
            Built for the Next Industrial Era
          </p>
        </div>
      </footer>
    </div>
  );
}
