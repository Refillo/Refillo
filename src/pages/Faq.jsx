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
        ? "Assolutamente. Ogni KPI generato mantiene un 'Audit Trail' completo: un drawer dedicato mostra il documento sorgente, lo snippet di testo grezzo estratto, la pagina esatta e un AI Confidence Score. Questo riduce i tempi di Limited Assurance da parte dei revisori esterni fino al 50%."
        : "Absolutely. Every generated KPI maintains a complete 'Audit Trail': a dedicated drawer shows the source document, the raw text snippet extracted, the exact page, and an AI Confidence Score. This reduces Limited Assurance times by external auditors by up to 50%."
    },
    {
      q: lang === 'it' ? "Il sistema impara dalle correzioni degli utenti?" : "Does the system learn from user corrections?",
      a: lang === 'it'
        ? "Sì, implementiamo un Continuous Learning Loop. Le correzioni umane vengono anonimizzate e utilizzate per il fine-tuning notturno dei nostri Small Language Models locali, garantendo un miglioramento costante dell'accuratezza specifica per i documenti di ogni settore merceologico."
        : "Yes, we implement a Continuous Learning Loop. Human corrections are anonymized and used for nightly fine-tuning of our local Small Language Models, ensuring constant improvement in accuracy specific to documents in each product sector."
    },
    {
      q: lang === 'it' ? "Come gestite la privacy e i costi dell'IA?" : "How do you handle privacy and AI costs?",
      a: lang === 'it'
        ? "Utilizziamo istanze isolate e tecniche di RAG (Retrieval-Augmented Generation). Per l'efficienza economica, adottiamo il Context Caching e il Batch Processing di Gemini 1.5 Flash, riducendo i costi di elaborazione a pochi centesimi per azienda, pur mantenendo performance di livello Enterprise."
        : "We use isolated instances and RAG (Retrieval-Augmented Generation) techniques. For economic efficiency, we adopt Context Caching and Batch Processing of Gemini 1.5 Flash, reducing processing costs to a few cents per company while maintaining Enterprise-level performance."
    }
  ];

  const Footer = () => (
    <footer className="bg-slate-900 pt-24 pb-12 px-12 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-8" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src="logo.png" alt="Refillo Logo" className="h-10 w-auto brightness-0 invert" />
            <span className="text-2xl font-black tracking-tighter">Refillo</span>
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
        <p className="text-slate-500 text-sm font-bold">{t('footer_copy')}</p>
        <p className="text-slate-600 text-xs font-black uppercase tracking-[0.3em]">Built for the Next Industrial Era</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="flex justify-between items-center px-12 py-6 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="Refillo Logo" className="h-10 w-auto" />
          <span className="text-2xl font-black text-slate-900 tracking-tighter">Refillo</span>
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase">{lang}</button>
          <button onClick={() => navigate('/')} className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">{t('nav_home')}</button>
          <button onClick={startDemo} className="bg-emerald-600 text-white px-8 py-2 rounded-xl text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">{t('demo_cta')}</button>
        </div>
      </nav>

      <header className="px-12 py-24 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-slate-900 mb-6">FAQ</h1>
        <p className="text-xl text-slate-500 font-medium">{lang === 'it' ? 'Dettagli tecnici sulla nostra pipeline di Intelligenza Artificiale.' : 'Technical details about our AI pipeline.'}</p>
      </header>

      <section className="px-12 pb-32 max-w-3xl mx-auto">
        <div className="space-y-8">
          {faqs.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
            >
              <h3 className="text-xl font-black text-slate-900 mb-4">{f.q}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
