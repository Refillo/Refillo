import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { useState } from 'react';

const articles = [
  {
    id: 1,
    category: 'Insights',
    date: '15 Maggio 2026',
    title: 'Guida all\'ESG per le PMI: Perché la Sostenibilità è il nuovo standard competitivo',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Non più solo per le grandi corporation: l\'ESG sta diventando fondamentale per l\'accesso al credito e la partecipazione ai bandi enterprise.'
  },
  {
    id: 2,
    category: 'Technology',
    date: '10 Maggio 2026',
    title: 'Come l\'AI sta automatizzando il Reporting di Sostenibilità',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Dalle bollette ai report finali: scopri come il nostro motore di auto-compilazione elimina ore di lavoro manuale.'
  },
  {
    id: 3,
    category: 'Market',
    date: '2 Maggio 2026',
    title: 'La Nuova Direttiva CSRD: Cosa cambia per i fornitori italiani',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Un\'analisi dettagliata dei requisiti richiesti dalle Big Corp ai propri partner della supply chain.'
  },
  {
    id: 4,
    category: 'Product',
    date: '28 Aprile 2026',
    title: 'Refillo Extension: Compilare portali ESG non è mai stato così veloce',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Lancio ufficiale della nostra estensione per Chrome e Edge. Riduci del 90% il tempo di copy-paste.'
  },
  {
    id: 5,
    category: 'Insights',
    date: '15 Aprile 2026',
    title: 'Carbon Intensity: Come misurarla e migliorarla',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Tutto quello che c\'è da sapere sullo Scope 1, 2 e 3 per la tua azienda manifatturiera.'
  },
  {
    id: 6,
    category: 'Market',
    date: '5 Aprile 2026',
    title: 'Trend 2026: La sostenibilità come driver di crescita nel settore arredamento',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Case study su come le aziende del Made in Italy stanno scalando i mercati esteri grazie ai dati ESG.'
  }
];

export default function News() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Insights', 'Technology', 'Market', 'Product'];
  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const handleComingSoon = () => alert(t('coming_soon'));
  const startDemo = async () => { navigate('/login'); };

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
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/news')}>News</li>
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
          <button onClick={() => navigate('/')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">{t('nav_home')}</button>
          <button onClick={() => navigate('/about')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">{t('nav_about')}</button>
          <button onClick={startDemo} className="bg-emerald-600 text-white px-6 md:px-8 py-2.5 rounded-full text-xs font-black hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-100">
            {t('demo_cta')}
          </button>
        </div>
      </nav>

      <header className="px-6 md:px-12 pt-32 pb-24 md:pt-48 md:pb-32 text-left max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-8">Refillo Intelligence Journal</p>
          <h1 className="text-6xl md:text-[100px] font-black text-slate-900 leading-[0.9] mb-10 tracking-[-0.04em]">
            News and <br/>
            <span className="text-emerald-600">ESG Insights</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl tracking-tight">Esplora le ultime novità sul reporting ESG, l'automazione AI e le tendenze del mercato manifatturiero italiano.</p>
        </motion.div>
      </header>

      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="flex gap-8 mb-16 border-b border-slate-100 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'text-emerald-600 border-b-2 border-emerald-600 pb-4' : 'text-slate-400 hover:text-slate-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-12 md:gap-y-20">
          {filteredArticles.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-8 border border-slate-100 shadow-sm relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-lg">
                    {article.category}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{article.date}</p>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter leading-[1.1] group-hover:text-emerald-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mb-32"></div>

      <Footer />
    </div>
  );
}
