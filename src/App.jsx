import { callApi } from './apiClient';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MarketGraph from './components/MarketGraph.jsx';
import AutoCompilerDemo from './components/AutoCompilerDemo.jsx';
import { useLanguage } from './LanguageContext';

const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value);
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        
        const current = start + (end - start) * easeOutExpo;
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {Number.isInteger(parseFloat(value)) 
        ? Math.floor(displayValue) 
        : displayValue.toFixed(1)}
      {suffix}
    </span>
  );
};

const FloatingElement = ({ delay = 0, x = "0%", y = "0%", size = "w-20", label = "" }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0, y: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0.3], 
      scale: [0.8, 1, 0.9],
      y: [0, -30, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className={`absolute ${size} p-4 rounded-[2rem] bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-xl shadow-emerald-500/5 flex items-center justify-center -z-10`}
    style={{ left: x, top: y }}
  >
    <div className="w-full h-full rounded-2xl bg-emerald-500/5 flex items-center justify-center text-[8px] font-black text-emerald-600/40 uppercase tracking-tighter overflow-hidden whitespace-nowrap">
      {label || "DATA_PILL"}
    </div>
  </motion.div>
);

function App() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-white font-sans text-slate-500 selection:bg-emerald-500/10 selection:text-emerald-600">
      {/* Navbar - Ultra Clean Light */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="Refillo Logo" className="h-7 md:h-8 w-auto" />
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">Refillo</span>
        </div>
        <div className="flex gap-6 md:gap-10 items-center">
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
          >
            {lang}
          </button>
          <button onClick={() => navigate('/about')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">{t('nav_about')}</button>
          <button onClick={() => navigate('/news')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">News</button>
          <button onClick={startDemo} className="bg-emerald-600 text-white px-6 md:px-8 py-2.5 rounded-full text-xs font-black hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-100">
            {t('demo_cta')}
          </button>
        </div>
      </nav>

      {/* Hero Section - The "ctrl.xyz" Entrance in Light */}
      <header className="px-6 md:px-12 pt-32 pb-24 md:pt-48 md:pb-40 text-center max-w-7xl mx-auto relative">
        {/* Subtle Light Glow & Floating Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-video bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <FloatingElement x="12%" y="15%" size="w-32 h-20" delay={0} label="ESG_DATA" />
        <FloatingElement x="78%" y="12%" size="w-24 h-16" delay={1} label="KPI_01" />
        <FloatingElement x="8%" y="65%" size="w-40 h-24" delay={2} label="AUTO_COMP" />
        <FloatingElement x="82%" y="72%" size="w-28 h-20" delay={1.5} label="VAULT" />
        <FloatingElement x="45%" y="85%" size="w-36 h-20" delay={3} label="EMERALD" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-[110px] font-black text-slate-900 leading-[0.9] mb-10 tracking-[-0.04em]">
            {t('hero_title')} <br className="hidden md:block"/>
            <span className="text-emerald-600 drop-shadow-[0_10px_20px_rgba(16,185,129,0.1)]">{t('hero_title_span')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16 max-w-3xl mx-auto tracking-tight">
            {t('hero_sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={startDemo} className="w-full sm:w-auto bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)] active:scale-95">
              {t('demo_cta')}
            </button>
            <button onClick={handleComingSoon} className="w-full sm:w-auto px-12 py-5 border border-slate-200 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all text-slate-900">
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
          className="rounded-[3rem] overflow-hidden border border-slate-100 bg-white shadow-2xl shadow-slate-200/50 group hover:border-emerald-500/30 transition-colors"
        >
          <AutoCompilerDemo />
        </motion.div>
      </section>

      {/* Bento Grid Features - Ultra Clean Light Cards */}
      <section className="px-6 md:px-12 py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Feature: Formats (Large Bento) */}
            <motion.div 
              className="md:col-span-8 bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-10 border border-emerald-100 group-hover:scale-110 transition-transform">📄</div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">{t('feat_formats_title')}</h3>
                <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  {t('feat_formats_desc')}
                </p>
                <div className="mt-12 flex flex-wrap gap-4">
                  {['.xlsx', '.pdf', '.csv', '.json', '.xlsm'].map(ext => (
                    <span key={ext} className="px-5 py-2 bg-slate-50 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest border border-slate-100 group-hover:border-emerald-200 transition-colors">{ext}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/[0.05] transition-colors"></div>
            </motion.div>

            {/* Extension Card (Tall Bento) */}
            <motion.div 
              className="md:col-span-4 bg-white p-10 md:p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col justify-between border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-3xl mb-10 group-hover:rotate-12 transition-transform">🧩</div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter">{t('feat_extension_title')}</h3>
                <p className="text-slate-500 text-base font-bold leading-relaxed">
                  {t('feat_extension_desc')}
                </p>
              </div>
              <div className="mt-12 relative z-10">
                <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border border-emerald-100">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Live on Chrome Store
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/[0.05] rounded-full blur-3xl opacity-50"></div>
            </motion.div>

            {/* Steps - Bottom Row */}
            {[
              { id: '01', title: t('how_step1_title'), desc: t('how_step1_desc'), icon: '⚡' },
              { id: '02', title: t('how_step2_title'), desc: t('how_step2_desc'), icon: '🧠' },
              { id: '03', title: t('how_step3_title'), desc: t('how_step3_desc'), icon: '🚀' },
            ].map((step, idx) => (
              <motion.div 
                key={step.id}
                className="md:col-span-4 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group hover:border-emerald-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <div className="text-sm font-black text-emerald-600 mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-[11px] font-black border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">{step.id}</span>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-5 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-base font-medium leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Intelligence - High Contrast Light */}
      <section className="px-6 md:px-12 py-32 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-[0.95] tracking-tighter">
                {t('market_title')}
              </h2>
              <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed mb-16 tracking-tight">
                {t('market_sub')}
              </p>
              
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h4 className="text-emerald-500 text-6xl font-black mb-3 tracking-tighter">
                    <AnimatedNumber value="94" suffix="%" />
                  </h4>
                  <p className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] leading-tight">
                    {t('market_pressure_title')}
                  </p>
                </div>
                <div>
                  <h4 className="text-emerald-500 text-6xl font-black mb-3 tracking-tighter">
                    <AnimatedNumber value="3.5" />
                  </h4>
                  <p className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] leading-tight">
                    {t('market_quest_title')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-10 md:p-16 rounded-[4rem] border border-slate-200 relative overflow-hidden shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-12 flex items-center gap-4 uppercase tracking-widest text-sm">
                 <div className="w-1.5 h-6 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                 {t('market_chart_title')}
               </h3>
               <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={intel?.stats || []}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                     <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', color: '#0f172a', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
                       cursor={{ fill: 'rgba(16, 185, 129, 0.02)' }}
                     />
                     <Bar dataKey="emissions" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Ultra Minimal Light */}
      <footer className="bg-white border-t border-slate-100 pt-32 pb-16 px-6 md:px-12">
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
              <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/news')}>{t('footer_faq')}</li>
              <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/pitch')}>{t('footer_pitch')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-emerald-600 mb-12">{t('footer_legal')}</h4>
            <ul className="space-y-5 text-sm font-black text-slate-400">
              <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_privacy')}</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_terms')}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Refillo Intelligence S.r.l.</p>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Milan, Italy • Built for the Next Industrial Era</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
