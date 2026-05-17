import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function Faq() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  const handleComingSoon = () => alert(t('coming_soon'));

  const startDemo = async () => {
    try {
      localStorage.setItem('esg_token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify({ id: 'demo-user', name: 'Azienda Demo SPA', sector: 'Manufacturing' }));
      navigate('/pmi/dashboard', { state: { org: { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' } } });
    } catch (err) { console.error(err); }
  };

  const faqs = [
    {
      q: lang === 'it' ? "Come è strutturata tecnicamente la conoscenza nel Vault?" : "How is knowledge technically structured in the Vault?",
      a: lang === 'it' 
        ? "Non usiamo semplice testo. Ogni dato è un'entità JSON arricchita da metadati rigidi (KPI Code ESRS/VSME, periodo fiscale, unità di misura, confidence score). Questo 'Structured RAG' permette all'IA di non limitarsi alla ricerca di parole chiave, ma di eseguire query logiche precise sui dati aziendali, garantendo coerenza tra form diversi."
        : "We don't use simple text. Every data point is a JSON entity enriched with rigid metadata (ESRS/VSME KPI codes, fiscal period, units of measure, confidence score). This 'Structured RAG' allows the AI to go beyond keyword searches, executing precise logical queries on company data, ensuring consistency across different forms."
    },
    {
      q: lang === 'it' ? "Cos'è il 'Global Mapping' e come aiuta le PMI?" : "What is 'Global Mapping' and how does it help SMEs?",
      a: lang === 'it' 
        ? "Il Global Mapping è la nostra 'Stele di Rosetta': un database condiviso che mappa le domande caotiche dei vari contractor (es. Stellantis, Eni, Volkswagen) su standard universali. Grazie a questo, se abbiamo già mappato il form di un cliente, tutte le altre PMI beneficiano di un'auto-compilazione istantanea per quel template, dovendo solo validare il dato finale."
        : "Global Mapping is our 'Rosetta Stone': a shared database that maps chaotic questions from various contractors (e.g., Stellantis, Eni, Volkswagen) to universal standards. Thanks to this, if we have already mapped a customer's form, all other SMEs benefit from instant auto-filling for that template, only needing to validate the final data."
    },
    {
      q: lang === 'it' ? "Come gestite le conversioni e la coerenza dei dati?" : "How do you handle conversions and data consistency?",
      a: lang === 'it' 
        ? "L'IA opera su un sistema a due livelli (SQL + Vector DB). Se il Vault contiene dati in kWh ma il form richiede MWh, il sistema esegue la conversione matematica automatica citando la fonte originale. Questo crea una 'Single Source of Truth' aziendale, evitando che lo stesso dato venga riportato in modo diverso in questionari differenti."
        : "The AI operates on a two-tier system (SQL + Vector DB). If the Vault contains data in kWh but the form requires MWh, the system performs an automatic mathematical conversion citing the original source. This creates a corporate 'Single Source of Truth', preventing the same data from being reported differently in different questionnaires."
    },
    {
      q: lang === 'it' ? "Come funziona l'estrazione intelligente dai PDF?" : "How does intelligent PDF extraction work?",
      a: lang === 'it' 
        ? "Utilizziamo una pipeline ibrida: Gemini 1.5 Pro analizza la struttura spaziale complessa, mentre modelli NER specializzati (fine-tuned su dataset Hugging Face come esg-ner-sb253) estraggono quantità e unità di misura. Questi dati vengono poi 'taggati' con standard ESRS/GRI e salvati permanentemente nel tuo Vault."
        : "We use a hybrid pipeline: Gemini 1.5 Pro analyzes complex spatial structures, while specialized NER models (fine-tuned on Hugging Face datasets like esg-ner-sb253) extract quantities and units of measure. This data is then 'tagged' with ESRS/GRI standards and permanently saved in your Vault."
    },
    {
      q: lang === 'it' ? "I dati estratti sono verificabili?" : "Is the extracted data verifiable?",
      a: lang === 'it'
        ? "Assolutamente. Ogni KPI generato mantiene un 'Audit Trail' completo: un drawer dedicato mostra il documento sorgente, lo snippet di testo grezzo estratto, la pagina esatta e un AI Confidence Score. Questo rriduce i tempi di Limited Assurance da parte dei revisori esterni fino al 50%."
        : "Absolutely. Every generated KPI maintains a complete 'Audit Trail': a dedicated drawer shows the source document, the raw text snippet extracted, the exact page, and an AI Confidence Score. This reduces Limited Assurance times by external auditors by up to 50%."
    }
  ];

  const Footer = () => (
    <footer className="bg-white border-t border-slate-100 pt-32 pb-16 px-12">
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
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/faq')}>{t('footer_faq')}</li>
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => navigate('/pitch')}>{t('footer_pitch')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-emerald-600 mb-12">{t('footer_legal')}</h4>
          <ul className="space-y-5 text-sm font-black text-slate-400">
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_privacy')}</li>
            <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={handleComingSoon}>{t('footer_terms')}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-10">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Refillo Intelligence S.r.l.</p>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Built for the Next Industrial Era</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-500/10 selection:text-emerald-600">
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="Refillo Logo" className="h-7 md:h-8 w-auto" />
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">Refillo</span>
        </div>
        <div className="flex gap-10 items-center">
          <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">{lang}</button>
          <button onClick={() => navigate('/')} className="text-[11px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">{t('nav_home')}</button>
          <button onClick={startDemo} className="bg-slate-900 text-white px-6 md:px-8 py-2.5 rounded-full text-xs font-black hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-slate-200">{t('demo_cta')}</button>
        </div>
      </nav>

      <header className="px-6 md:px-12 pt-32 pb-24 md:pt-48 md:pb-32 text-center max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-video bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-[110px] font-black text-slate-900 leading-[0.9] mb-10 tracking-[-0.04em]">
            Frequently Asked <br/>
            <span className="text-emerald-600 drop-shadow-[0_10px_20px_rgba(16,185,129,0.1)]">Questions</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto tracking-tight">{lang === 'it' ? 'Dettagli tecnici sulla nostra pipeline di Intelligenza Artificiale.' : 'Technical details about our AI pipeline.'}</p>
        </motion.div>
      </header>

      <section className="px-6 md:px-12 pb-32 max-w-4xl mx-auto">
        <div className="space-y-12">
          {faqs.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter leading-snug group-hover:text-emerald-600 transition-colors">{f.q}</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium tracking-tight border-l-4 border-slate-100 pl-8 group-hover:border-emerald-500 transition-colors">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
