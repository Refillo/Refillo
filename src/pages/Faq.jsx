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
      q: lang === 'it' ? "Qual è l'architettura tecnica alla base di ESGlab?" : "What is the technical architecture behind ESGlab?",
      a: lang === 'it' 
        ? "ESGlab adotta un'architettura 'Brain-in-the-Middle' che centralizza l'intelligenza normativa. Il sistema si compone di un DiscoveryEngine per il monitoraggio dei requisiti di filiera, un PMIIngestor per l'estrazione dati da documenti vivi e un FormFiller semantico per la compilazione automatica dei questionari."
        : "ESGlab adopts a 'Brain-in-the-Middle' architecture that centralizes regulatory intelligence. The system consists of a DiscoveryEngine for monitoring supply chain requirements, a PMIIngestor for data extraction from live documents, and a semantic FormFiller for automatic questionnaire compilation."
    },
    {
      q: lang === 'it' ? "Come funziona l'estrazione dei dati dai PDF?" : "How does data extraction from PDFs work?",
      a: lang === 'it' 
        ? "Utilizziamo una pipeline ibrida: Gemini 1.5 Pro analizza la struttura spaziale complessa, mentre modelli specializzati (fine-tuned su dataset Hugging Face come esg-ner-sb253) eseguono il Named Entity Recognition (NER) per estrarre quantità, unità di misura e codici standard ESRS con precisione superiore ai modelli generalisti."
        : "We use a hybrid pipeline: Gemini 1.5 Pro analyzes complex spatial structures, while specialized models (fine-tuned on Hugging Face datasets like esg-ner-sb253) perform Named Entity Recognition (NER) to extract quantities, units of measure, and ESRS standard codes with precision superior to general-purpose models."
    },
    {
      q: lang === 'it' ? "Come riuscite a mappare i dati sugli standard corretti?" : "How do you map data to the correct standards?",
      a: lang === 'it'
        ? "Il sistema non effettua una ricerca per parole chiave, ma per concetti semantici. Utilizziamo modelli ESGBERT per la classificazione ambientale che identificano se un dato appartiene allo standard ESRS-E1 (Clima) o ESRS-E3 (Acqua), mappandoli automaticamente sui requisiti specifici richiesti dai grandi contractor (es. Stellantis, Eni)."
        : "The system doesn't perform keyword searches, but semantic concept searches. We use ESGBERT models for environmental classification that identify whether data belongs to the ESRS-E1 (Climate) or ESRS-E3 (Water) standard, automatically mapping them to specific requirements requested by major contractors (e.g., Stellantis, Eni)."
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
            <img src="logo.png" alt="ESGlab Logo" className="h-10 w-auto brightness-0 invert" />
            <span className="text-2xl font-black tracking-tighter">ESG<span className="text-emerald-600">lab</span></span>
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
      <Footer />
    </div>
  );
}
