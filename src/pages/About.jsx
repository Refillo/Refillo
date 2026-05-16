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
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
            <img src="logo.png" alt="Refillo Logo" className="h-9 w-auto" />
            <span className="text-2xl font-black tracking-tighter text-slate-900">Refillo</span>
          </div>
          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 max-w-sm">
            {t('footer_desc')}
          </p>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-emerald-600 mb-10">{t('footer_prod')}</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-400">
            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => navigate('/faq')}>{t('footer_faq')}</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => navigate('/pitch')}>{t('footer_pitch')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-emerald-600 mb-10">{t('footer_legal')}</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-400">
            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_privacy')}</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_terms')}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">© 2026 Refillo</p>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Built for the Next Industrial Era</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="Refillo Logo" className="h-8 md:h-9 w-auto" />
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">Refillo</span>
        </div>
        <div className="flex gap-4 md:gap-8 items-center">
          <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">{lang}</button>
          <button onClick={() => navigate('/')} className="text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors uppercase tracking-wider">{t('nav_home')}</button>
          <button onClick={startDemo} className="bg-slate-900 text-white px-5 md:px-7 py-2.5 rounded-full text-xs font-black hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-slate-200">{t('demo_cta')}</button>
        </div>
      </nav>

      <header className="px-6 md:px-12 py-24 md:py-32 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            {t('about_mission_title')} <br className="hidden md:block"/>
            <span className="text-emerald-600">{t('about_mission_span')}</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{t('about_mission_desc')}</p>
        </motion.div>
      </header>

      <section className="px-6 md:px-12 py-24 md:py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">{t('about_why_title')}</h2>
            <div className="space-y-6 text-slate-500 leading-relaxed font-medium text-lg">
              <p>{t('about_why_p1')}</p>
              <p>{t('about_why_p2')}</p>
              <p>{t('about_why_p3')}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden text-center">
             <div className="text-8xl mb-8">🇮🇹</div>
             <h3 className="text-3xl font-black text-slate-900 mb-4">Made in Italy</h3>
             <p className="text-slate-400 font-medium text-lg">{lang === 'it' ? 'Sviluppato con passione per le PMI italiane.' : 'Developed with passion for Italian SMEs.'}</p>
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">{t('about_team_title')}</h2>
            <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto">{t('about_team_sub')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <div className="relative mb-8 flex justify-center">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-100 ring-4 ring-slate-50 transform group-hover:scale-105 transition-transform duration-500">
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-black text-[10px] mb-6 uppercase tracking-widest">{member.role}</p>
                  
                  <div className="space-y-1 opacity-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bsc management engineering</p>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">Politecnico di Milano</p>
                  </div>
                </div>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-6 right-6 text-slate-300 hover:text-emerald-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
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
