import { callApi } from './apiClient';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MarketGraph from './components/MarketGraph.jsx';
import AutoCompilerDemo from './components/AutoCompilerDemo.jsx';
import TerminalWindow from './components/TerminalWindow.jsx';
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

const ComparisonTable = ({ t }) => (
  <section className="px-6 md:px-12 py-32 md:py-48 bg-white overflow-hidden">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-24 text-center tracking-tighter leading-[0.9]">{t('vs_title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
        <div className="p-10 md:p-14 bg-slate-50 border-r border-slate-100 hidden md:block">
           <div className="h-20 flex items-center">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Parameters</span>
           </div>
           <ul className="space-y-16 mt-8">
             <li className="text-sm font-black text-slate-400 uppercase tracking-widest">{t('vs_time')}</li>
             <li className="text-sm font-black text-slate-400 uppercase tracking-widest">{t('vs_accuracy')}</li>
             <li className="text-sm font-black text-slate-400 uppercase tracking-widest">{t('vs_compliance')}</li>
           </ul>
        </div>
        <div className="p-10 md:p-14 bg-white border-r border-slate-100">
           <div className="h-20 flex flex-col justify-center">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Legacy Method</span>
             <h4 className="text-2xl font-black text-slate-900 tracking-tight">{t('vs_manual')}</h4>
           </div>
           <ul className="space-y-16 mt-8">
             <li className="flex flex-col">
               <span className="md:hidden text-[10px] font-black text-slate-400 uppercase mb-2">{t('vs_time')}</span>
               <span className="text-slate-500 font-bold text-lg">{t('vs_manual_time')}</span>
             </li>
             <li className="flex flex-col">
               <span className="md:hidden text-[10px] font-black text-slate-400 uppercase mb-2">{t('vs_accuracy')}</span>
               <span className="text-slate-500 font-bold text-lg">{t('vs_manual_accuracy')}</span>
             </li>
             <li className="flex flex-col">
               <span className="md:hidden text-[10px] font-black text-slate-400 uppercase mb-2">{t('vs_compliance')}</span>
               <span className="text-slate-500 font-bold text-lg">{t('vs_manual_compliance')}</span>
             </li>
           </ul>
        </div>
        <div className="p-10 md:p-14 bg-emerald-600 text-white relative">
           <div className="absolute top-8 right-8 bg-white/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md">Recommended</div>
           <div className="h-20 flex flex-col justify-center">
             <span className="text-[10px] font-black text-emerald-200 uppercase tracking-[0.2em] mb-3">Refillo Platform</span>
             <h4 className="text-2xl font-black tracking-tight">{t('vs_refillo')}</h4>
           </div>
           <ul className="space-y-16 mt-8">
             <li className="flex flex-col">
               <span className="md:hidden text-[10px] font-black text-emerald-200 uppercase mb-2">{t('vs_time')}</span>
               <span className="font-black text-emerald-50 text-xl">{t('vs_refillo_time')}</span>
             </li>
             <li className="flex flex-col">
               <span className="md:hidden text-[10px] font-black text-emerald-200 uppercase mb-2">{t('vs_accuracy')}</span>
               <span className="font-black text-emerald-50 text-xl">{t('vs_refillo_accuracy')}</span>
             </li>
             <li className="flex flex-col">
               <span className="md:hidden text-[10px] font-black text-emerald-200 uppercase mb-2">{t('vs_compliance')}</span>
               <span className="font-black text-emerald-50 text-xl">{t('vs_refillo_compliance')}</span>
             </li>
           </ul>
        </div>
      </div>
    </div>
  </section>
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
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase">Refill<span className="text-emerald-500">o</span></span>
        </div>
        <div className="flex gap-6 md:gap-10 items-center">
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
          >
            {lang}
          </button>
          <button onClick={() => navigate('/about')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">{t('nav_about')}</button>
          <button onClick={() => navigate('/news')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">{t('footer_news')}</button>
          <button onClick={startDemo} className="bg-emerald-600 text-white px-6 md:px-8 py-2.5 rounded-full text-xs font-black hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-100">
            {t('demo_cta')}
          </button>
        </div>
      </nav>

      {/* Hero Section - High Tech Modern */}
      <header className="px-6 md:px-12 pt-32 pb-24 md:pt-48 md:pb-32 text-center max-w-7xl mx-auto relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full"></div>
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-10 border border-emerald-100 shadow-sm shadow-emerald-500/5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            AI-Powered ESG Automation v2.0
          </div>
          
          <h1 className="text-6xl md:text-[115px] font-black text-slate-900 leading-[0.85] mb-12 tracking-[-0.05em]">
            {t('hero_title')} <br className="hidden md:block"/>
            <span className="text-emerald-600 drop-shadow-[0_15px_30px_rgba(16,185,129,0.15)]">{t('hero_title_span')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16 max-w-3xl mx-auto tracking-tight">
            {t('hero_sub')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <button onClick={startDemo} className="w-full sm:w-auto bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-[0_25px_50px_-12px_rgba(16,185,129,0.3)] active:scale-95">
              {t('demo_cta')}
            </button>
            <button onClick={handleComingSoon} className="w-full sm:w-auto px-12 py-5 border border-slate-200 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all text-slate-900">
              {t('hero_cta')}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Integration Banner - Trusted by */}
      <div className="py-16 border-y border-slate-100 bg-slate-50/20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center mb-12 opacity-80">Seamlessly Integrated with Global Standards</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale hover:opacity-60 transition-all duration-700">
            {['SAP', 'Oracle', 'Microsoft', 'EcoVadis', 'CDP', 'Synesgy', 'ESG Book'].map(partner => (
               <span key={partner} className="text-sm md:text-lg font-black text-slate-900 tracking-tighter uppercase">{partner}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Engine Demo - Restored Original Style */}
      <section className="px-6 md:px-12 py-32 md:py-48 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-emerald-500/[0.02] -skew-y-3 -z-10"></div>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">{t('land_auto_title')}</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">{t('land_auto_sub')}</p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-slate-100 bg-white shadow-2xl shadow-slate-200/50 group hover:border-emerald-500/30 transition-all"
        >
          <AutoCompilerDemo />
        </motion.div>
      </section>

      {/* Z-Pattern Features - Developer & Tech Focus */}
      <section className="px-6 md:px-12 py-32 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto space-y-32 md:space-y-64">
          
          {/* Section 1: Data Discovery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95]">{t('land_extract_title')}</h3>
              <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed mb-10">
                {t('how_step1_desc')}
              </p>
              <ul className="space-y-4">
                {[t('land_extract_desc1'), t('land_extract_desc2'), t('land_extract_desc3')].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-widest">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className="order-1 lg:order-2 bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 relative overflow-hidden group">
               <div className="absolute inset-0 bg-emerald-500/[0.01] group-hover:bg-emerald-500/[0.03] transition-colors"></div>
               <TerminalWindow title="discovery-engine --extract" className="shadow-none border-slate-200 bg-white">
                 <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>File: enel_invoice_2026.pdf</span>
                      <span className="text-emerald-500 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>Extracted</span>
                    </div>
                    <div className="space-y-3 opacity-20">
                      <div className="h-2 bg-slate-400 rounded-full w-full"></div>
                      <div className="h-2 bg-slate-400 rounded-full w-4/5"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
                         <div className="text-[9px] font-black text-emerald-600 uppercase mb-2 tracking-widest">Scope 2 Emissions</div>
                         <div className="text-2xl font-black text-emerald-900">425.2 kg CO₂e</div>
                       </div>
                       <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                         <div className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Confidence</div>
                         <div className="text-2xl font-black text-slate-900">99.8%</div>
                       </div>
                    </div>
                 </div>
               </TerminalWindow>
            </div>
          </div>

          {/* Section 2: Universal Mapping (Reversed) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 relative overflow-hidden group">
               <div className="absolute inset-0 bg-blue-500/[0.01] group-hover:bg-blue-500/[0.03] transition-colors"></div>
               <div className="relative z-10 grid grid-cols-2 gap-4 md:gap-6">
                  {[
                    { label: 'VSME Baseline', value: '100%', color: 'text-emerald-500' },
                    { label: 'ESRS Readiness', value: '94%', color: 'text-emerald-500' },
                    { label: 'EcoVadis V3', value: '88%', color: 'text-blue-500' },
                    { label: 'CDP Rating', value: '82%', color: 'text-purple-500' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.label}</div>
                      <div className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</div>
                    </div>
                  ))}
               </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-blue-100">🧠</div>
              <h3 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95]">{t('how_step2_title')}</h3>
              <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed mb-10">
                {t('how_step2_desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                {['CSRD', 'ESRS', 'VSME', 'GRI', 'CDP', 'IFRS'].map(std => (
                  <span key={std} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">{std}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Section 3: Browser Extension (Large Full-Width) - Switched to Light for Readability */}
          <div className="bg-white rounded-[4rem] p-12 md:p-24 text-slate-900 relative overflow-hidden group border border-slate-100 shadow-2xl shadow-slate-200/50">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.03] blur-[150px] rounded-full group-hover:bg-emerald-500/[0.05] transition-all duration-1000"></div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                  <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-emerald-100 shadow-sm">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    {t('land_chrome_featured')}
                  </div>
                  <h3 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[0.95]">{t('feat_extension_title')}</h3>
                  <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed mb-12 tracking-tight">
                    {t('feat_extension_desc')}
                  </p>
                  <button className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95">
                    {t('land_chrome_btn')}
                  </button>
                </div>
                <div className="relative">
                   <div className="absolute -inset-4 bg-emerald-500/5 blur-2xl rounded-[3rem] opacity-50"></div>
                   <TerminalWindow title="refillo-extension --overlay" className="shadow-2xl border-slate-100 bg-white">
                     <div className="p-8 space-y-8 bg-white">
                        <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                           <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100 shadow-sm">📦</div>
                           <div>
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Portal</div>
                             <div className="text-lg font-black text-slate-900 uppercase tracking-tighter">STELLANTIS_V3</div>
                           </div>
                        </div>
                        <div className="space-y-6">
                           {[
                             { label: 'Energy Consumption (MWh)', value: '450.2', status: 'Mapped' },
                             { label: 'Recycling Rate (%)', value: '82.5', status: 'Mapped' },
                             { label: 'Gender Pay Gap (%)', value: '2.1', status: 'Mapped' },
                           ].map(row => (
                             <div key={row.label} className="flex justify-between items-center group">
                                <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors">{row.label}</span>
                                <div className="flex items-center gap-4">
                                   <span className="text-sm font-black text-slate-900">{row.value}</span>
                                   <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase">{row.status}</span>
                                </div>
                             </div>
                           ))}
                        </div>
                        <div className="pt-6 border-t border-slate-50 flex justify-end">
                           <div className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">{t('land_autofill_btn')}</div>
                        </div>
                     </div>
                   </TerminalWindow>
                </div>
             </div>
          </div>
        </div>
      </section>

      <ComparisonTable t={t} />

      {/* Market Intelligence - High Contrast Light */}
      <section className="px-6 md:px-12 py-32 md:py-48 bg-white relative overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-blue-500/[0.02] blur-[100px] rounded-full -z-10"></div>
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
              <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/news')}>{t('footer_news')}</li>
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
