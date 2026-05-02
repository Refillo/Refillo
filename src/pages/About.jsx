import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function About() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

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
      {/* Navbar Pubblica (Unificata) */}
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
          <button onClick={() => navigate('/')} className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">{t('nav_home')}</button>
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
      <header className="px-12 py-32 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tight">
            {t('about_mission_title')} <br/>
            <span className="text-emerald-600">{t('about_mission_span')}</span>
          </h1>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed">
            {t('about_mission_desc')}
          </p>
        </motion.div>
      </header>

      {/* Content Section */}
      <section className="px-12 py-32 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-black text-slate-900 mb-8">{t('about_why_title')}</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium text-lg">
              <p>{t('about_why_p1')}</p>
              <p>{t('about_why_p2')}</p>
              <p>{t('about_why_p3')}</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-50 p-16 rounded-[3rem] border border-slate-100 relative overflow-hidden"
          >
             <div className="text-9xl mb-8">🇮🇹</div>
             <h3 className="text-3xl font-black text-slate-900 mb-4">Made in Italy</h3>
             <p className="text-slate-500 font-medium text-lg">{t('about_made_in_italy')}</p>             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-12 py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-slate-900 mb-6">{t('about_team_title')}</h2>
            <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto">
              {t('about_team_sub')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Davide Santaniello", role: "Co-CTO", desc: "Database and AI algorithm developer." },
              { name: "Edoardo Riva", role: "Head of Product", desc: "UX and product strategy." },
              { name: "Edoardo Poletti", role: "Head of Sales", desc: "Partnerships and regulations." },
              { name: "Riccardo Vismara", role: "Co-CTO", desc: "Software developer." },
              { name: "Pepe Rimoldi", role: "Head of Growth & Marketing", desc: "Clients acquisition and digital marketing." },
              { name: "Alessio Vaghi", role: "Chief Risk Officer", desc: "Analysis of the main risks and problems." }
            ].map((member, i) => {
              const initials = member.name.split(' ').map(n => n[0]).join('');
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-2xl font-black mx-auto mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {initials}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-bold text-sm mb-6 uppercase tracking-widest">{member.role}</p>
                  <p className="text-slate-500 text-base leading-relaxed font-medium">{member.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team/Values */}
      <section className="px-12 py-32 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black text-slate-900">{t('about_values_title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: t("value_transparency_title"), desc: t("value_transparency_desc"), icon: "🔍" },
            { title: t("value_innovation_title"), desc: t("value_innovation_desc"), icon: "🚀" },
            { title: t("value_impact_title"), desc: t("value_impact_desc"), icon: "🌱" }
          ].map((v, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <div className="text-5xl mb-8">{v.icon}</div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{v.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer (Unificato) */}
      <footer className="bg-slate-900 pt-24 pb-12 px-12 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <img src="logo.png" alt="ESGlab Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-2xl font-black tracking-tighter">ESG<span className="text-emerald-500">lab</span></span>
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
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={startDemo}>{t('demo_cta')}</li>
              <li className="hover:text-emerald-500 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_api')}</li>
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
