import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { callApi } from '../apiClient';
import { useLanguage } from '../LanguageContext';

const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value);
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = (end - start) / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue.toLocaleString(undefined, { minimumFractionDigits: value.includes('.') ? 1 : 0, maximumFractionDigits: 1 })}{suffix}</span>;
};

export default function About() {
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

  // Team of 6 Members - Verified
  const team = [
    { name: "Davide Santaniello", role: t('role_cto'), desc: t('desc_davide'), photo: "team/davide-santaniello.jpeg", linkedin: "https://www.linkedin.com/in/davide-santaniello-3210451a5/" },
    { name: "Riccardo Vismara", role: t('role_cto'), desc: t('desc_riccardo'), photo: "team/riccardo-vismara.jpeg", linkedin: "https://www.linkedin.com/in/riccardo-vismara-7443a9254/" },
    { name: "Edoardo Riva", role: t('role_product'), desc: t('desc_riva'), photo: "team/edoardo-riva.jpeg", linkedin: "https://www.linkedin.com/in/edoardo-rinaldo-riva-98967b3b7/" },
    { name: "Edoardo Poletti", role: t('role_sales'), desc: t('desc_poletti'), photo: "team/edoardo-poletti.jpeg", linkedin: "https://www.linkedin.com/in/edoardo-poletti-9747a9399/" },
    { name: "Pepe Rimoldi", role: t('role_growth'), desc: t('desc_pepe'), photo: "team/pepe-rimoldi.jpeg", linkedin: "https://www.linkedin.com/in/pepe-rimoldi/" },
    { name: "Alessio Vaghi", role: t('role_risk'), desc: t('desc_vaghi'), photo: "team/alessio-vaghi.jpeg", linkedin: "https://www.linkedin.com/in/alessio-vaghi-701284280/" }
  ];

  const Footer = () => (
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
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-500 selection:bg-emerald-500/10 selection:text-emerald-600">
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
          <button onClick={() => navigate('/news')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">{t('footer_news')}</button>

          <button onClick={startDemo} className="bg-emerald-600 text-white px-6 md:px-8 py-2.5 rounded-full text-xs font-black hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-100">
            {t('demo_cta')}
          </button>
        </div>
      </nav>

      <header className="px-6 md:px-12 pt-32 pb-24 md:pt-48 md:pb-40 text-center max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-video bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-[110px] font-black text-slate-900 leading-[0.9] mb-10 tracking-[-0.04em]">
            {t('about_mission_title')} <br className="hidden md:block"/>
            <span className="text-emerald-600 drop-shadow-[0_10px_20px_rgba(16,185,129,0.1)]">{t('about_mission_span')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto tracking-tight">{t('about_mission_desc')}</p>
        </motion.div>
      </header>

      <section className="px-6 md:px-12 py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-black text-slate-900 mb-10 tracking-tighter">{t('about_why_title')}</h2>
            <div className="space-y-8 text-slate-500 leading-relaxed font-medium text-xl tracking-tight">
              <p>{t('about_why_p1')}</p>
              <p>{t('about_why_p2')}</p>
              <p>{t('about_why_p3')}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white p-16 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden text-center group shadow-slate-200/50">
             <div className="text-[120px] mb-12 transform group-hover:scale-110 transition-transform duration-700">🇮🇹</div>
             <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Made in Italy</h3>
             <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">{lang === 'it' ? 'Sviluppato con passione a Milano.' : 'Developed with passion in Milan.'}</p>
             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Live Market Intelligence - Supporting the Mission */}
      <section className="px-6 md:px-12 py-32 md:py-48 bg-white relative overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-blue-500/[0.02] blur-[100px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-[0.95] tracking-tighter">
                {t('market_title')}
              </h2>
              <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed mb-10 tracking-tight">
                {t('market_sub')}
              </p>
              <p className="text-emerald-600 text-lg font-bold leading-relaxed mb-16 tracking-tight border-l-4 border-emerald-500 pl-8 italic">
                "{t('about_market_context')}"
              </p>

              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h4 className="text-emerald-500 text-6xl font-black mb-3 tracking-tighter">
                    <AnimatedNumber value="150" suffix="+" />
                  </h4>
                  <p className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] leading-tight">
                    {t('market_node_title')}
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

      <section className="px-6 md:px-12 py-32 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-[80px] font-black text-slate-900 mb-8 tracking-tighter leading-none">{t('about_team_title')}</h2>
            <p className="text-slate-500 font-medium text-xl md:text-2xl max-w-2xl mx-auto tracking-tight">{t('about_team_sub')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-500/20 transition-all group overflow-hidden relative shadow-slate-100">
                <div className="relative mb-12 flex justify-center">
                  <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 ring-1 ring-slate-100 transform group-hover:scale-105 transition-transform duration-700">
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">{member.name}</h3>
                  <p className="text-emerald-600 font-black text-[10px] mb-4 uppercase tracking-[0.4em]">{member.role}</p>
                  <p className="text-slate-500 text-sm font-medium mb-8 leading-tight italic px-4">{member.desc}</p>
                  
                  <div className="space-y-2 pt-4 border-t border-slate-50">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{t('edu_bsc')}</p>
                    <p className="text-slate-400 text-[9px] font-medium tracking-tight uppercase">{t('edu_uni')}</p>
                  </div>
                </div>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute top-10 right-10 text-slate-300 hover:text-emerald-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
