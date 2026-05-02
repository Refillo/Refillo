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
      q: lang === 'it' ? "Come funziona l'estrazione dei dati dai PDF?" : "How does data extraction from PDFs work?",
      a: lang === 'it' 
        ? "Utilizziamo modelli Vision-Language (Gemini 1.5 Pro) per analizzare la struttura spaziale di bollette e certificati. L'AI non si limita a leggere il testo, ma comprende il contesto (es. distingue tra 'Totale dovuto' e 'Consumo energia') mappando i valori sugli standard ESRS."
        : "We use Vision-Language models (Gemini 1.5 Pro) to analyze the spatial structure of bills and certificates. The AI doesn't just read text; it understands context (e.g., distinguishing between 'Total Due' and 'Energy Consumption') mapping values to ESRS standards."
    },
    {
      q: lang === 'it' ? "Quali standard ESG sono supportati?" : "Which ESG standards are supported?",
      a: lang === 'it'
        ? "Attualmente supportiamo nativamente lo standard VSME (Voluntary SME) e i core requirements degli ESRS (CSRD). Il nostro motore può mappare i dati estratti su framework specifici come EcoVadis, CDP e GRI."
        : "We currently natively support the VSME (Voluntary SME) standard and core ESRS (CSRD) requirements. Our engine can map extracted data to specific frameworks like EcoVadis, CDP, and GRI."
    },
    {
      q: lang === 'it' ? "I dati estratti sono verificabili?" : "Is the extracted data verifiable?",
      a: lang === 'it'
        ? "Sì. Ogni dato salvato nel profilo mantiene un 'Audit Trail' che include il link al documento originale, lo snippet di testo grezzo estratto e il punteggio di confidenza dell'IA. Questo facilita enormemente il processo di Limited Assurance da parte di revisori esterni."
        : "Yes. Every data point saved in the profile maintains an 'Audit Trail' including the link to the original document, the raw text snippet extracted, and the AI confidence score. This greatly facilitates the Limited Assurance process by external auditors."
    },
    {
      q: lang === 'it' ? "Come gestite la privacy dei documenti aziendali?" : "How do you handle document privacy?",
      a: lang === 'it'
        ? "I documenti vengono elaborati in istanze isolate. Nella versione Enterprise, utilizziamo un approccio RAG (Retrieval-Augmented Generation) con database vettoriali crittografati, garantendo che i dati di un'azienda non vengano mai usati per addestrare modelli pubblici."
        : "Documents are processed in isolated instances. In the Enterprise version, we use a RAG (Retrieval-Augmented Generation) approach with encrypted vector databases, ensuring company data is never used to train public models."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="flex justify-between items-center px-12 py-6 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="logo.png" alt="ESGlab Logo" className="h-10 w-auto" />
          <span className="text-2xl font-black text-slate-900 tracking-tighter">ESG<span className="text-emerald-600">lab</span></span>
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
    </div>
  );
}
