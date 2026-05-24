import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

/* Forma del logo Refillo (fulmine) come decorazione SVG */
const LogoShape = ({ size = 48, opacity = 0.12, rotate = 0, color = '#059669' }) => (
  <svg
    width={size} height={size * 0.96}
    viewBox="0 0 48 46" fill="none"
    style={{ opacity, transform: `rotate(${rotate}deg)`, flexShrink: 0 }}
  >
    <path
      fill={color}
      d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
    />
  </svg>
);

// NEWS is built inside component to use t()

// FEATURES is built inside component to use t()

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  const NEWS = [
    { tag: t('app_n1_tag'), date: lang === 'it' ? 'Maggio 2026' : 'May 2026', title: t('app_n1_title'), desc: t('app_n1_desc') },
    { tag: t('app_n2_tag'), date: lang === 'it' ? 'Aprile 2026' : 'April 2026', title: t('app_n2_title'), desc: t('app_n2_desc') },
    { tag: t('app_n3_tag'), date: lang === 'it' ? 'Marzo 2026' : 'March 2026', title: t('app_n3_title'), desc: t('app_n3_desc') },
  ];

  const FEATURES = [
    { emoji: '🗃️', label: t('app_feat1_label'), title: t('app_feat1_title'), desc: t('app_feat1_desc'), gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-100', badge: 'bg-emerald-100 text-emerald-700', delay: 0.1 },
    { emoji: '🤖', label: t('app_feat2_label'), title: t('app_feat2_title'), desc: t('app_feat2_desc'), gradient: 'from-violet-50 to-indigo-50', border: 'border-violet-100', badge: 'bg-violet-100 text-violet-700', delay: 0.3 },
    { emoji: '📬', label: t('app_feat3_label'), title: t('app_feat3_title'), desc: t('app_feat3_desc'), gradient: 'from-amber-50 to-orange-50', border: 'border-amber-100', badge: 'bg-amber-100 text-amber-700', delay: 0.5 },
    { emoji: '📈', label: t('app_feat4_label'), title: t('app_feat4_title'), desc: t('app_feat4_desc'), gradient: 'from-sky-50 to-blue-50', border: 'border-sky-100', badge: 'bg-sky-100 text-sky-700', delay: 0.7 },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white/90 backdrop-blur border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Refillo" className="h-8 w-auto" />
          <span className="text-xl font-black text-slate-900 tracking-tight">Re<span className="text-emerald-600">fillo</span></span>
        </div>

        {/* Anchor links */}
        <div className="hidden md:flex gap-7 items-center">
          {[
            { label: t('app_how_label'), id: 'how' },
            { label: t('app_prod_label'), id: 'product' },
            { label: 'News', id: 'news' },
            { label: t('app_invest_nav'), id: 'invest' },
          ].map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex gap-5 items-center">
          <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">
            {lang === 'it' ? 'EN' : 'IT'}
          </button>
          <button onClick={() => navigate('/about')} className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">{t('nav_about')}</button>
          <button onClick={() => navigate('/login')} className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">{t('nav_login')}</button>
          <button onClick={() => navigate('/pmi')} className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all">
            {t('nav_register')}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative px-10 pt-28 pb-0 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 40%, #ecfdf5 100%)' }}>
        {/* Blob sfumati */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-emerald-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-teal-100 rounded-full blur-2xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-emerald-100 rounded-full blur-2xl opacity-30 pointer-events-none" />

        {/* Motivo logo sparso nello sfondo */}
        {[
          { size: 180, opacity: 0.11, rotate: 20,  top: '8%',  left: '64%' },
          { size: 100, opacity: 0.14, rotate: -15, top: '55%', left: '78%' },
          { size: 130, opacity: 0.09, rotate: 10,  top: '18%', left: '4%'  },
          { size: 70,  opacity: 0.12, rotate: -30, top: '62%', left: '7%'  },
          { size: 220, opacity: 0.07, rotate: 5,   top: '4%',  left: '41%' },
        ].map((s, i) => (
          <div key={i} className="absolute pointer-events-none" style={{ top: s.top, left: s.left }}>
            <LogoShape size={s.size} opacity={s.opacity} rotate={s.rotate} color="#059669" />
          </div>
        ))}

        <div className="relative max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[4.5rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-7 max-w-3xl"
          >
            {t('hero_title')}<br />
            <span className="text-emerald-600">{t('hero_title_span')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-slate-500 text-xl font-medium leading-relaxed mb-10 max-w-xl"
          >
            {t('hero_sub')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
            className="flex gap-4 items-center"
          >
            <button onClick={() => navigate('/pmi')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-base transition-all shadow-xl shadow-emerald-100">
              {t('hero_cta')}
            </button>
            <button onClick={() => scrollTo('how')} className="text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors flex items-center gap-2">
              {t('app_discover')}
            </button>
          </motion.div>
        </div>

        {/* Motivi logo Refillo — banda decorativa */}
        <div className="relative mt-20 w-full flex items-end justify-between px-4 overflow-hidden" style={{ height: '90px' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-50 to-transparent pointer-events-none" />
          {[
            { size: 90, opacity: 0.18, rotate: -10 },
            { size: 60, opacity: 0.10, rotate: 5 },
            { size: 110, opacity: 0.22, rotate: -5 },
            { size: 50, opacity: 0.08, rotate: 15 },
            { size: 80, opacity: 0.15, rotate: -15 },
            { size: 70, opacity: 0.12, rotate: 8 },
            { size: 120, opacity: 0.20, rotate: -8 },
            { size: 55, opacity: 0.09, rotate: 12 },
            { size: 95, opacity: 0.17, rotate: -3 },
            { size: 65, opacity: 0.11, rotate: 20 },
          ].map((s, i) => (
            <div key={i} style={{ alignSelf: i % 2 === 0 ? 'flex-end' : 'flex-start', marginTop: i % 3 === 0 ? '10px' : '0' }}>
              <LogoShape {...s} />
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-emerald-50 px-10 py-14 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x divide-emerald-200">
          {[
            { value: '87%', label: t('app_stat1_label'), sub: t('app_stat1_sub') },
            { value: '< 10 min', label: t('app_stat2_label'), sub: t('app_stat2_sub') },
            { value: '3 standard', label: t('app_stat3_label'), sub: 'VSME · ESRS · GHG Protocol' },
          ].map((s, i) => (
            <motion.div key={s.value} {...fadeUp(i * 0.12)} className="text-center px-10 first:pl-0 last:pr-0">
              <p className="text-5xl font-black text-emerald-700 mb-2 tracking-tight">{s.value}</p>
              <p className="text-sm font-black text-slate-700 mb-1">{s.label}</p>
              <p className="text-xs text-slate-500 font-medium">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section id="how" className="px-10 py-28 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp()} className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-3">{t('app_how_label')}</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black text-slate-900 mb-20 max-w-lg leading-tight">{t('how_title')}</motion.h2>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: t('how_step1_title'),
                desc: t('how_step1_desc'),
                emoji: '🗂️',
                gradient: 'from-emerald-50 to-teal-50',
                border: 'border-emerald-100',
                badge: 'bg-emerald-100 text-emerald-700',
                delay: 0.1,
              },
              {
                num: '02',
                title: t('how_step2_title'),
                desc: t('how_step2_desc'),
                emoji: '⚡',
                gradient: 'from-violet-50 to-indigo-50',
                border: 'border-violet-100',
                badge: 'bg-violet-100 text-violet-700',
                delay: 0.45,
              },
              {
                num: '03',
                title: t('how_step3_title'),
                desc: t('how_step3_desc'),
                emoji: '🎯',
                gradient: 'from-amber-50 to-orange-50',
                border: 'border-amber-100',
                badge: 'bg-amber-100 text-amber-700',
                delay: 0.8,
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 48, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: step.delay, ease: 'easeOut' }}
                className={`relative bg-gradient-to-br ${step.gradient} border ${step.border} rounded-3xl p-8 flex flex-col gap-5`}
              >
                {/* Numero step */}
                <span className={`self-start text-xs font-black px-3 py-1 rounded-full tracking-widest ${step.badge}`}>
                  STEP {step.num}
                </span>

                {/* Emoji grande */}
                <div className="text-6xl leading-none">{step.emoji}</div>

                {/* Freccia connettore */}
                {i < 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: step.delay + 0.5 }}
                    className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-2xl hidden xl:block"
                  >
                    →
                  </motion.div>
                )}

                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IL PROBLEMA ── */}
      <section className="px-10 py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-emerald-900 rounded-full blur-3xl opacity-25 pointer-events-none" />
        {/* Motivo logo sfondo */}
        <div className="absolute inset-0 flex items-center justify-end pr-16 pointer-events-none opacity-5">
          <LogoShape size={320} opacity={1} rotate={-15} color="#ffffff" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.p {...fadeUp()} className="text-emerald-400 text-xs font-black uppercase tracking-[0.25em] mb-4">{t('app_problem_label')}</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black leading-tight mb-4 max-w-xl">
            {t('app_problem_h1')}
          </motion.h2>
          <motion.h2 {...fadeUp(0.18)} className="text-4xl font-black leading-tight mb-14 max-w-xl text-emerald-400">
            {t('app_problem_h2')}
          </motion.h2>

          <div className="grid grid-cols-2 gap-5">
            {[
              { emoji: '⏱️', value: t('app_problem_c1_val'), desc: t('app_problem_c1_desc') },
              { emoji: '📑', value: t('app_problem_c2_val'), desc: t('app_problem_c2_desc') },
              { emoji: '⚠️', value: t('app_problem_c3_val'), desc: t('app_problem_c3_desc') },
              { emoji: '📄', value: t('app_problem_c4_val'), desc: t('app_problem_c4_desc') },
            ].map((c, i) => (
              <motion.div
                key={c.value}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.13 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <span className="text-3xl block mb-3">{c.emoji}</span>
                <p className="font-black text-white text-lg mb-2">{c.value}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODOTTO ── */}
      <section id="product" className="px-10 py-28 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.p {...fadeUp()} className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-3">{t('app_prod_label')}</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black text-slate-900 mb-3 max-w-xl leading-tight">
            {t('app_prod_title')}
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-slate-500 text-base mb-16 max-w-2xl leading-relaxed">
            {t('app_prod_sub')}
          </motion.p>

          <div className="grid grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: f.delay, ease: 'easeOut' }}
                className={`bg-gradient-to-br ${f.gradient} border ${f.border} rounded-3xl p-8 flex flex-col gap-5`}
              >
                <span className={`self-start text-xs font-black px-3 py-1 rounded-full tracking-widest ${f.badge}`}>
                  {f.label}
                </span>
                <div className="text-6xl leading-none">{f.emoji}</div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.85)} className="mt-12 text-center">
            <button onClick={() => navigate('/pmi')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-base transition-all shadow-lg shadow-emerald-100">
              {t('app_try_btn')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="px-10 py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-14">
            <div>
              <motion.p {...fadeUp()} className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-3">News</motion.p>
              <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black text-slate-900">{t('app_news_title')}</motion.h2>
            </div>
            <button onClick={() => navigate('/news')} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              {t('app_news_all')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {NEWS.map((n, i) => (
              <motion.div key={n.title} {...fadeUp(i * 0.15)}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => navigate('/news')}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{n.tag}</span>
                  <span className="text-xs text-slate-400 font-medium">{n.date}</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug mb-3 group-hover:text-emerald-700 transition-colors">{n.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{n.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTI SU DI NOI ── */}
      <section id="invest" className="relative px-10 py-28 bg-white border-t-4 border-emerald-600 overflow-hidden">
        {/* Motivo logo decorativo */}
        <div className="absolute -bottom-10 -right-10 pointer-events-none">
          <LogoShape size={280} opacity={0.06} rotate={15} />
        </div>
        <div className="absolute top-10 left-20 pointer-events-none">
          <LogoShape size={80} opacity={0.07} rotate={-20} />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-24 items-center relative">
          <div>
            <motion.p {...fadeUp()} className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-4">{t('app_invest_label')}</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl font-black text-slate-900 leading-tight mb-6">
              {t('app_invest_title')}<br />
              <span className="text-emerald-600">{t('app_invest_title2')}</span>
            </motion.h2>
            <motion.p {...fadeUp(0.18)} className="text-slate-500 text-base leading-relaxed mb-8">
              {t('app_invest_desc')}
            </motion.p>
            <motion.a {...fadeUp(0.26)} href="mailto:refillo.2026@gmail.com"
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all">
              <span>✉️</span> {t('app_invest_cta')}
            </motion.a>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { value: '€47B', label: t('app_invest_m1'), color: 'bg-emerald-50 border-emerald-200' },
              { value: '200K+', label: t('app_invest_m2'), color: 'bg-slate-50 border-slate-200' },
              { value: 'Pre-seed', label: t('app_invest_m3'), color: 'bg-slate-50 border-slate-200' },
            ].map((item, i) => (
              <motion.div key={item.value}
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`flex items-center gap-5 p-5 rounded-2xl border ${item.color}`}>
                <p className="text-2xl font-black text-emerald-700 min-w-[110px]">{item.value}</p>
                <p className="text-slate-600 text-sm font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 px-10 py-16 text-white">
        <div className="max-w-5xl mx-auto flex justify-between items-start gap-16">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-5">
              <img src="/logo.png" alt="Refillo" className="h-7 w-auto" />
              <span className="text-lg font-black tracking-tight">Re<span className="text-emerald-400">fillo</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{t('footer_desc')}</p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-5">{t('footer_prod')}</p>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => scrollTo('how')}>{t('footer_how')}</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => scrollTo('product')}>{t('footer_product')}</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/pmi')}>{t('footer_try')}</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-5">{t('footer_company')}</p>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/news')}>News</li>
                <li><a href="mailto:refillo.2026@gmail.com" className="hover:text-white transition-colors">{t('footer_contact')}</a></li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => scrollTo('invest')}>{t('footer_invest')}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-14 pt-8 border-t border-slate-800">
          <p className="text-slate-600 text-xs font-medium">{t('footer_legal')}</p>
        </div>
      </footer>

    </div>
  );
}
