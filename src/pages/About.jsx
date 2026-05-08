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

  const team = [
    { name: "Davide Santaniello", role: "Co-CTO", photo: "team/davide-santaniello.jpeg", linkedin: "https://www.linkedin.com/in/davide--santaniello/" },
    { name: "Edoardo Riva", role: "Head of Product", photo: "team/edoardo-riva.jpeg", linkedin: "https://www.linkedin.com/in/edoardo-rinaldo-riva-98967b3b7/" },
    { name: "Edoardo Poletti", role: "Head of Sales", photo: "team/edoardo-poletti.jpeg", linkedin: "https://www.linkedin.com/in/edoardo-poletti-9747a9399/" },
    { name: "Riccardo Vismara", role: "Co-CTO", photo: "team/riccardo-vismara.jpeg", linkedin: "https://www.linkedin.com/in/riccardo-vismara-7443a9254/" },
    { name: "Pepe Rimoldi", role: "Head of Growth", photo: "team/pepe-rimoldi.jpeg", linkedin: "https://www.linkedin.com/in/pepe-rimoldi/" },
    { name: "Alessio Vaghi", role: "Chief Risk Officer", photo: "team/alessio-vaghi.jpeg", linkedin: "https://www.linkedin.com/in/alessio-vaghi-701284280/" }
  ];

  const Footer = () => (
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
          <div className="flex justify-center md:justify-start gap-5">
            <a href="https://github.com/esglab" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
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
        <p className="text-slate-500 text-sm font-bold">© 2026 ESGlab</p>
        <p className="text-slate-600 text-xs font-black uppercase tracking-[0.3em]">Built for the Next Industrial Era</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="ESGlab Logo" className="h-8 md:h-10 w-auto" />
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">ESG<span className="text-emerald-600">lab</span></span>
        </div>
        <div className="flex gap-3 md:gap-6 items-center">
          <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 text-[10px] md:text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase">{lang}</button>
          <button onClick={() => navigate('/')} className="text-xs md:text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">{t('nav_home')}</button>
          <button onClick={handleComingSoon} className="hidden sm:block px-6 py-2 text-sm font-bold text-slate-400 opacity-50 cursor-not-allowed transition-colors">{t('nav_login')}</button>
          <button onClick={handleComingSoon} className="hidden lg:block bg-slate-200 text-slate-400 px-8 py-2 rounded-xl text-sm font-black cursor-not-allowed opacity-60">{t('nav_register')}</button>
          <button onClick={startDemo} className="bg-emerald-600 text-white px-4 md:px-8 py-2 rounded-xl text-xs md:text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">{t('demo_cta')}</button>
        </div>
      </nav>

      <header className="px-6 md:px-12 py-20 md:py-32 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight mb-6 md:mb-8 tracking-tight">
            {t('about_mission_title')} <br className="hidden md:block"/>
            <span className="text-emerald-600">{t('about_mission_span')}</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed">{t('about_mission_desc')}</p>
        </motion.div>
      </header>

      <section className="px-6 md:px-12 py-20 md:py-32 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 md:mb-8">{t('about_why_title')}</h2>
            <div className="space-y-4 md:space-y-6 text-slate-600 leading-relaxed font-medium text-base md:text-lg">
              <p>{t('about_why_p1')}</p>
              <p>{t('about_why_p2')}</p>
              <p>{t('about_why_p3')}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-slate-50 p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-slate-100 relative overflow-hidden text-center">
             <div className="text-7xl md:text-9xl mb-6 md:mb-8">🇮🇹</div>
             <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Made in Italy</h3>
             <p className="text-slate-500 font-medium text-base md:text-lg">{lang === 'it' ? 'Sviluppato con passione per le PMI italiane.' : 'Developed with passion for Italian SMEs.'}</p>
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6">{t('about_team_title')}</h2>
            <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto">{t('about_team_sub')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all text-center group overflow-hidden relative">
                <div className="relative mb-6 md:mb-8 inline-block">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-xl shadow-emerald-100 ring-4 ring-emerald-50 transform group-hover:scale-105 transition-transform duration-500">
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-2 rounded-xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-emerald-700 z-10"
                  >
                    <span className="text-xs font-black">in</span>
                  </a>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-bold text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-widest">{member.role}</p>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bsc management engineering</p>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">Engineering/Industrial Management</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                {t('about_story_title')}
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed font-medium text-lg md:text-xl">
                <p>{t('about_story_desc')}</p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider border border-emerald-100">
                    Politecnico di Milano
                  </span>
                  <span className="bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider border border-slate-200">
                    Startup Challenge 2026
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 border-8 border-white shadow-2xl"
            >
              {/* Photo Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                <p className="text-sm font-black uppercase tracking-[0.2em] opacity-30">Event Photo Coming Soon</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
