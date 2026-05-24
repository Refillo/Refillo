import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function App() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    sessionStorage.removeItem('recording_active');
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-7 h-7 bg-emerald-600 rounded-md" />
          <span className="text-xl font-black text-slate-900 tracking-tight">Re<span className="text-emerald-600">fillo</span></span>
        </div>
        <div className="flex gap-8 items-center">
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
          >
            {lang === 'it' ? 'EN' : 'IT'}
          </button>
          <button onClick={() => navigate('/about')} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('nav_about')}</button>
          <button onClick={() => navigate('/login')} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('nav_login')}</button>
          <button
            onClick={() => navigate('/pmi')}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all"
          >
            {t('nav_register')}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          background: 'radial-gradient(ellipse at 65% 40%, rgba(16,185,129,0.13) 0%, transparent 55%), #0f172a',
        }}
        className="px-10 py-36 text-white"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.25em] mb-6">
            ESG Automation · VSME · CSRD
          </p>
          <h1 className="text-6xl font-black leading-tight tracking-tight mb-8">
            {t('hero_title')}<br />
            <span className="text-emerald-400">{t('hero_title_span')}</span>
          </h1>
          <p className="text-slate-300 text-xl font-medium leading-relaxed mb-12 max-w-2xl">
            {t('hero_sub')}
          </p>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate('/pmi')}
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-lg font-bold text-base transition-all"
            >
              {t('hero_cta')}
            </button>
            <button
              onClick={() => navigate('/about')}
              className="text-slate-300 hover:text-white text-sm font-semibold transition-colors flex items-center gap-2"
            >
              {t('nav_about')} →
            </button>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-transparent" />

      {/* ── STATS ── */}
      <section className="bg-white px-10 py-16 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-12">
          {[
            { value: '87%', label: lang === 'it' ? 'form compilato in automatico' : 'form auto-filled on average' },
            { value: '< 10 min', label: lang === 'it' ? 'per caricare i tuoi documenti' : 'to upload your documents' },
            { value: '3 standard', label: lang === 'it' ? 'VSME · ESRS · GHG Protocol' : 'VSME · ESRS · GHG Protocol' },
          ].map(s => (
            <div key={s.value} className="text-center">
              <p className="text-4xl font-black text-slate-900 mb-2">{s.value}</p>
              <p className="text-sm text-slate-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-10 py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-4">{lang === 'it' ? 'Come funziona' : 'How it works'}</p>
          <h2 className="text-4xl font-black text-slate-900 mb-20 max-w-xl leading-tight">{t('how_title')}</h2>

          <div className="grid grid-cols-3 gap-16">
            {[
              { num: '01', title: t('how_step1_title'), desc: t('how_step1_desc') },
              { num: '02', title: t('how_step2_title'), desc: t('how_step2_desc') },
              { num: '03', title: t('how_step3_title'), desc: t('how_step3_desc') },
            ].map(step => (
              <div key={step.num}>
                <p className="text-6xl font-black text-emerald-100 mb-4 leading-none">{step.num}</p>
                <h3 className="text-lg font-black text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY REFILLO ── */}
      <section className="px-10 py-28 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-24 items-center">
          <div>
            <p className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-4">{lang === 'it' ? 'Il problema' : 'The problem'}</p>
            <h2 className="text-4xl font-black text-slate-900 leading-tight mb-6">
              {lang === 'it'
                ? <span>Le grandi aziende chiedono dati ESG.<br />Le PMI non hanno tempo.</span>
                : <span>Large companies demand ESG data.<br />SMEs don't have time.</span>}
            </h2>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              {t('about_why_p1')}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: '📄', text: lang === 'it' ? 'Carica le tue bollette e documenti operativi' : 'Upload your bills and operational documents' },
              { icon: '🤖', text: lang === 'it' ? "L'AI estrae i dati e li mappa agli standard ESRS" : 'AI extracts data and maps it to ESRS standards' },
              { icon: '✅', text: lang === 'it' ? 'Rispondi ai questionari dei clienti in un click' : 'Answer client questionnaires in one click' },
            ].map(item => (
              <div key={item.icon} className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-slate-700 font-semibold text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.18) 0%, transparent 60%), #0f172a' }}
        className="px-10 py-28 text-white text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-6 leading-tight">
            {lang === 'it' ? 'Pronto a semplificare la tua compliance ESG?' : 'Ready to simplify your ESG compliance?'}
          </h2>
          <p className="text-slate-300 text-lg font-medium mb-10">
            {lang === 'it' ? "Inizia l'onboarding in meno di 10 minuti." : 'Start your onboarding in less than 10 minutes.'}
          </p>
          <button
            onClick={() => navigate('/pmi')}
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-12 py-4 rounded-lg font-bold text-base transition-all"
          >
            {t('hero_cta')}
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 px-10 py-16 text-white">
        <div className="max-w-5xl mx-auto flex justify-between items-start gap-16">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 bg-emerald-600 rounded-md" />
              <span className="text-lg font-black tracking-tight">Re<span className="text-emerald-400">fillo</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{t('footer_desc')}</p>
          </div>

          <div className="flex gap-20">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-6">{t('footer_prod')}</p>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/pmi')}>{t('how_step1_title')}</li>
                <li className="hover:text-white cursor-pointer transition-colors">Refillo AI</li>
                <li className="hover:text-white cursor-pointer transition-colors">Report Export</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-6">{t('footer_company')}</p>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/about')}>{t('nav_about')}</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-slate-800">
          <p className="text-slate-600 text-xs font-medium">{t('footer_legal')}</p>
        </div>
      </footer>

    </div>
  );
}
