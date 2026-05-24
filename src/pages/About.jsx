import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const LogoShape = ({ size = 48, opacity = 0.12, rotate = 0, color = '#059669' }) => (
  <svg width={size} height={size * 0.96} viewBox="0 0 48 46" fill="none"
    style={{ opacity, transform: `rotate(${rotate}deg)`, flexShrink: 0 }}>
    <path fill={color}
      d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
    />
  </svg>
);

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function About() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  const team = [
    { name: 'Davide Santaniello', role: t('role_cto'),     desc: t('desc_davide'),  photo: 'team/davide-santaniello.jpeg', linkedin: 'https://www.linkedin.com/in/davide-santaniello-3210451a5/' },
    { name: 'Riccardo Vismara',   role: t('role_cto'),     desc: t('desc_riccardo'), photo: 'team/riccardo-vismara.jpeg',   linkedin: 'https://www.linkedin.com/in/riccardo-vismara-7443a9254/' },
    { name: 'Edoardo Riva',       role: t('role_product'), desc: t('desc_riva'),     photo: 'team/edoardo-riva.jpeg',       linkedin: 'https://www.linkedin.com/in/edoardo-rinaldo-riva-98967b3b7/' },
    { name: 'Edoardo Poletti',    role: t('role_sales'),   desc: t('desc_poletti'), photo: 'team/edoardo-poletti.jpeg',    linkedin: 'https://www.linkedin.com/in/edoardo-poletti-9747a9399/' },
    { name: 'Pepe Rimoldi',       role: t('role_growth'),  desc: t('desc_pepe'),    photo: 'team/pepe-rimoldi.jpeg',       linkedin: 'https://www.linkedin.com/in/pepe-rimoldi/' },
  ];

  const values = [
    { icon: '🔍', title: t('value_transparency_title'), desc: t('value_transparency_desc'), gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-100', badge: 'bg-emerald-100 text-emerald-700', delay: 0.1  },
    { icon: '⚡', title: t('value_innovation_title'),   desc: t('value_innovation_desc'),   gradient: 'from-violet-50 to-indigo-50', border: 'border-violet-100', badge: 'bg-violet-100 text-violet-700', delay: 0.45 },
    { icon: '🌍', title: t('value_impact_title'),       desc: t('value_impact_desc'),       gradient: 'from-amber-50 to-orange-50', border: 'border-amber-100', badge: 'bg-amber-100 text-amber-700', delay: 0.8  },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white/90 backdrop-blur border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Refillo" className="h-8 w-auto" />
          <span className="text-xl font-black text-slate-900 tracking-tight">Re<span className="text-emerald-600">fillo</span></span>
        </div>
        <div className="hidden md:flex gap-7 items-center">
          <button onClick={() => navigate('/')} className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">{t('nav_home')}</button>
          <button onClick={() => navigate('/news')} className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">News</button>
        </div>
        <div className="flex gap-5 items-center">
          <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">
            {lang === 'it' ? 'EN' : 'IT'}
          </button>
          <button onClick={() => navigate('/login')} className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">{t('nav_login')}</button>
          <button onClick={() => navigate('/pmi')} className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all">
            {t('nav_register')}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative px-10 pt-28 pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 40%, #ecfdf5 100%)' }}>
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-emerald-200 rounded-full blur-3xl opacity-25 pointer-events-none" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-teal-100 rounded-full blur-2xl opacity-35 pointer-events-none" />
        {[
          { size: 160, opacity: 0.18, rotate: 20,  top: '10%', left: '75%' },
          { size: 90,  opacity: 0.22, rotate: -15, top: '65%', left: '88%' },
          { size: 120, opacity: 0.15, rotate: 10,  top: '20%', left: '-2%' },
        ].map((s, i) => (
          <div key={i} className="absolute pointer-events-none" style={{ top: s.top, left: s.left }}>
            <LogoShape size={s.size} opacity={s.opacity} rotate={s.rotate} color="#059669" />
          </div>
        ))}

        <div className="relative max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-6">
            {t('nav_about')}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[4rem] font-black text-slate-900 leading-tight tracking-tight mb-6">
            {t('about_mission_title')}<br />
            <span className="text-emerald-600">{t('about_mission_span')}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl">
            {t('about_mission_desc')}
          </motion.p>
        </div>
      </section>

      {/* ── PERCHÉ REFILLO ── */}
      <section className="px-10 py-28 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div>
            <motion.p {...fadeUp()} className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-4">{t('about_why_title')}</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black text-slate-900 leading-tight mb-8">
              {lang === 'it' ? <>Il mercato sta cambiando.<br /><span className="text-emerald-600">Noi ci siamo già.</span></> : <>The market is shifting.<br /><span className="text-emerald-600">We are already there.</span></>}
            </motion.h2>
            {[t('about_why_p1'), t('about_why_p2'), t('about_why_p3')].map((p, i) => (
              <motion.p key={i} {...fadeUp(0.15 + i * 0.1)} className="text-slate-500 text-base leading-relaxed mb-4">{p}</motion.p>
            ))}
          </div>
          <motion.div {...fadeUp(0.2)} className="relative">
            <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 pointer-events-none">
                <LogoShape size={140} opacity={0.08} rotate={-10} color="#ffffff" />
              </div>
              <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">Made in Italy</p>
              <p className="text-4xl font-black mb-3">🇮🇹</p>
              <p className="text-2xl font-black mb-4">{lang === 'it' ? 'Politecnico di Milano' : 'Politecnico di Milano'}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{t('about_made_in_italy')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALORI ── */}
      <section className="px-10 py-28 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp()} className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-3">{t('about_values_title')}</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black text-slate-900 mb-20 max-w-lg leading-tight">
            {lang === 'it' ? 'I principi che guidano ogni scelta.' : 'The principles behind every decision.'}
          </motion.h2>
          <div className="grid grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 48, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: v.delay, ease: 'easeOut' }}
                className={`bg-gradient-to-br ${v.gradient} border ${v.border} rounded-3xl p-8 flex flex-col gap-5`}>
                <span className={`self-start text-xs font-black px-3 py-1 rounded-full tracking-widest ${v.badge}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="text-6xl leading-none">{v.icon}</div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="px-10 py-28" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 60%, #d1fae5 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp()} className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-3">{t('about_team_title')}</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black text-slate-900 mb-4 max-w-lg leading-tight">
            {lang === 'it' ? 'Le persone dietro Refillo.' : 'The people behind Refillo.'}
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-slate-500 text-base mb-16 max-w-xl leading-relaxed">{t('about_team_sub')}</motion.p>

          <div className="grid grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                className="bg-white border border-emerald-100 rounded-3xl p-7 flex flex-col items-center text-center hover:border-emerald-300 hover:shadow-lg transition-all group relative"
              >
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                  className="absolute top-5 right-5 text-slate-300 hover:text-emerald-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-5 ring-2 ring-emerald-100 group-hover:ring-emerald-300 transition-all">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-1">{member.name}</h3>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed italic">{member.desc}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 w-full">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{t('edu_bsc')} · {t('edu_uni')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-10 py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-end pr-20 pointer-events-none opacity-5">
          <LogoShape size={350} opacity={1} rotate={-10} color="#ffffff" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p {...fadeUp()} className="text-emerald-400 text-xs font-black uppercase tracking-[0.25em] mb-4">
            {lang === 'it' ? 'Inizia ora' : 'Get started'}
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black text-white leading-tight mb-6">
            {lang === 'it' ? <>Pronto a semplificare<br />la tua compliance ESG?</> : <>Ready to simplify<br />your ESG compliance?</>}
          </motion.h2>
          <motion.p {...fadeUp(0.18)} className="text-slate-300 text-lg font-medium mb-10">
            {lang === 'it' ? "Inizia l'onboarding in meno di 10 minuti." : 'Start your onboarding in less than 10 minutes.'}
          </motion.p>
          <motion.button {...fadeUp(0.26)} onClick={() => navigate('/pmi')}
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-12 py-4 rounded-xl font-bold text-base transition-all">
            {t('hero_cta')}
          </motion.button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 px-10 py-14 text-white">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Refillo" className="h-7 w-auto" />
            <span className="text-lg font-black tracking-tight">Re<span className="text-emerald-400">fillo</span></span>
          </div>
          <div className="flex gap-8">
            <button onClick={() => navigate('/')} className="text-sm text-slate-400 hover:text-white transition-colors">{t('nav_home')}</button>
            <button onClick={() => navigate('/news')} className="text-sm text-slate-400 hover:text-white transition-colors">News</button>
            <a href="mailto:refillo.2026@gmail.com" className="text-sm text-slate-400 hover:text-white transition-colors">{lang === 'it' ? 'Contatti' : 'Contact'}</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-10 pt-8 border-t border-slate-800">
          <p className="text-slate-600 text-xs font-medium">{t('footer_copy')}</p>
        </div>
      </footer>

    </div>
  );
}
