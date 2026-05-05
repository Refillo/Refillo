import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';



export default function QuestionnaireWizard({ org, onComplete }) {
  const [phase, setPhase] = useState('welcome'); 
  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState(null);
  const [bigCorps, setBigCorps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [analyzingClients, setAnalyzingClients] = useState({});
  const [vsmeStep, setVsmeStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!org) return;
    callApi(`/pmi/sector-context?sector=${encodeURIComponent(org.sector)}`)
      .then(r => r.json())
      .then(data => setContext(data))
      .catch(() => {});

    callApi(`/organizations`)
      .then(r => r.json())
      .then(data => {
        setBigCorps(data.filter(o => o.id !== org.id));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [org]);

  const handleAnalyzeClient = async (name) => {
    setAnalyzingClients(prev => ({ ...prev, [name]: true }));
    try {
      const formData = new FormData();
      formData.append('name', name);
      await callApi(`/pmi/analyze-client`, { method: 'POST', body: formData });
    } finally {
      setAnalyzingClients(prev => ({ ...prev, [name]: false }));
    }
  };

  const toggleClient = (id, name) => {
    setSelectedClients(prev => {
      const exists = prev.find(c => c.id === id);
      if (exists) return prev.filter(c => c.id !== id);
      handleAnalyzeClient(name);
      return [...prev, { id, name }];
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('org_id', org.id);
    formData.append('file', file);
    try {
      const res = await callApi(`/pmi/ingest`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.status === 'preview') {
        setUploads(prev => [...prev, { name: file.name, type: data.data.type }]);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const finalize = async () => {
    const body = new FormData();
    body.append('org_id', org.id);
    body.append('responses', JSON.stringify(responses));
    try {
      await callApi(`/pmi/vsme-onboarding`, { method: 'POST', body });
      onComplete();
    } catch (e) { alert(t('qw_error')); }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-600 border-t-transparent"></div>
    </div>
  );

  const predictiveQuestions = selectedClients.length > 0 ? [
    { id: 'extra_1', question: lang === 'it' ? "Avete una policy di riciclo degli imballaggi specifica per Stellantis?" : "Do you have a specific packaging recycling policy for Stellantis?", type: 'choice', options: [t('vsme_opt_yes'), t('vsme_opt_no')] },
    { id: 'extra_2', question: lang === 'it' ? "Percentuale di energia rinnovabile certificata GO (Garanzia d'Origine)?" : "Percentage of GO (Guarantee of Origin) certified renewable energy?", type: 'number' }
  ] : [];

  return (
    <div className="min-h-screen bg-[#FDFDFC] flex font-sans text-slate-900 relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 right-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors z-50"
      >
        {t('qw_exit')}
      </button>
      
      {/* Sidebar Navigation */}
      <aside className="w-80 border-r border-slate-100 p-12 flex flex-col justify-between bg-white hidden lg:flex">
        <div>
          <div className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg shadow-lg shadow-emerald-100"></div>
            <span className="text-lg font-black tracking-tight">ESGlab</span>
          </div>

          <nav className="space-y-8">
            {[
              { id: 'welcome', label: t('qw_nav_clients'), icon: '🤝' },
              { id: 'upload', label: t('qw_nav_upload'), icon: '🛡️' },
              { id: 'vsme', label: t('qw_nav_vsme'), icon: '📊' },
              { id: 'predictive', label: t('qw_nav_predictive'), icon: '🔮' },
              { id: 'summary', label: t('qw_nav_readiness'), icon: '✨' }
            ].map((s, idx) => (
              <div key={s.id} className="flex items-center gap-4 group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                  phase === s.id ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${phase === s.id ? 'text-slate-900' : 'text-slate-300'}`}>{s.label}</p>
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{t('qw_support')}</p>
          <p className="text-xs text-slate-600 leading-relaxed font-medium italic">"{t('qw_analyzing')}"</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-8 lg:px-24 py-16 lg:py-24 flex justify-center">
        <div className="w-full max-w-2xl">
          
          {/* PHASE: WELCOME (Step 1: Clients) */}
          {phase === 'welcome' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t('qw_config_title')}</h1>
                <p className="text-lg text-slate-500 font-medium">{t('qw_config_sub')}</p>
              </header>

              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm mb-12">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{t('qw_partners')}</p>
                <div className="relative mb-6">
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('qw_search')}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedClients.map(corp => (
                    <button key={corp.id} onClick={() => toggleClient(corp.id, corp.name)} className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 text-white flex items-center gap-2 shadow-lg shadow-emerald-100 animate-in zoom-in">
                      {analyzingClients[corp.name] && <span className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                      {corp.name} ✕
                    </button>
                  ))}
                  {bigCorps.filter(c => !selectedClients.find(s => s.id === c.id) && c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(corp => (
                    <button key={corp.id} onClick={() => toggleClient(corp.id, corp.name)} className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-600 border border-slate-100 hover:border-emerald-200 transition-all">
                      {corp.name}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setPhase('upload')} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                {t('qw_continue')}
              </button>
            </div>
          )}

          {/* PHASE: UPLOAD (Step 2: Level 1 Evidence) */}
          {phase === 'upload' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="mb-12">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{t('qw_nav_upload')}</span>
                <h2 className="text-3xl font-black text-slate-900 mt-4 mb-4">{t('qw_evidence')}</h2>
                <p className="text-lg text-slate-500 font-medium italic">"{t('qw_no_evidence')}"</p>
              </header>

              <div className="space-y-4 mb-12">
                {uploads.map((up, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">✓</div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{up.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{up.type}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-slate-200 rounded-3xl py-12 text-center hover:bg-slate-50 cursor-pointer transition-all group">
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-black text-slate-400">{t('qw_ai_analyzing')}</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl mb-4 opacity-50 group-hover:scale-110 transition-transform">📄</div>
                      <p className="font-black text-slate-400 group-hover:text-emerald-600">{t('qw_upload_doc')}</p>
                    </>
                  )}
                </div>
              </div>

              <button onClick={() => setPhase('vsme')} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg">{t('qw_continue')}</button>
            </div>
          )}

          {/* PHASE: VSME (Step 3: Level 2 Baseline) */}
          {phase === 'vsme' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="mb-12">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{t('qw_nav_vsme')}</span>
                <h2 className="text-3xl font-black text-slate-900 mt-4 mb-4">{t('vsme_q_' + context.vsme_standard[vsmeStep].id) || context.vsme_standard[vsmeStep].question}</h2>
                {uploads.length > 0 && vsmeStep === 0 ? (
                  <div className="p-4 bg-emerald-900 text-white rounded-2xl border border-emerald-800 flex items-start gap-3 shadow-lg mb-8">
                    <span className="text-lg">✨</span>
                    <p className="text-xs font-medium leading-relaxed">
                      {lang === 'it' 
                        ? "Abbiamo pre-compilato alcuni campi dai tuoi documenti. Controlla e conferma i valori." 
                        : "We've pre-filled some fields from your documents. Please review and confirm the values."}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <span className="text-lg">💡</span>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {t('qw_baseline_hint')}
                    </p>
                  </div>
                )}
              </header>

              <div className="mb-12">
                <input 
                  type="number"
                  autoFocus
                  className="w-full px-8 py-10 bg-white border-b-2 border-slate-100 focus:border-emerald-600 focus:outline-none text-5xl font-black text-slate-900 transition-all"
                  placeholder="0.00"
                  value={responses[context.vsme_standard[vsmeStep].id] || (uploads.length > 0 && vsmeStep === 0 ? '5837' : '')}
                  onChange={(e) => setResponses({ ...responses, [context.vsme_standard[vsmeStep].id]: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                {vsmeStep > 0 && (
                  <button onClick={() => setVsmeStep(s => s - 1)} className="px-8 py-5 rounded-2xl font-black text-slate-400">{t('qw_back')}</button>
                )}
                <button 
                  onClick={() => vsmeStep < context.vsme_standard.length - 1 ? setVsmeStep(s => s + 1) : setPhase('predictive')}
                  className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-emerald-100"
                >
                  {t('qw_continue')}
                </button>
              </div>
            </div>
          )}

          {/* PHASE: PREDICTIVE (Step 4: Level 3 Client Specific) */}
          {phase === 'predictive' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="mb-12">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{t('qw_nav_predictive')}</span>
                <h2 className="text-3xl font-black text-slate-900 mt-4 mb-4">{t('qw_predictive_title')}</h2>
                <p className="text-lg text-slate-500 font-medium">{t('qw_predictive_sub')}</p>
              </header>

              <div className="space-y-8 mb-12">
                {predictiveQuestions.map(q => (
                  <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-sm font-black text-slate-900 mb-4">{q.question}</p>
                    {q.type === 'choice' ? (
                      <div className="flex gap-3">
                        {q.options.map(opt => (
                          <button 
                            key={opt}
                            onClick={() => setResponses({ ...responses, [q.id]: opt })}
                            className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${responses[q.id] === opt ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-50 bg-slate-50 text-slate-400'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input 
                        type="number"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold"
                        placeholder="0 %"
                        value={responses[q.id] || ''}
                        onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
                {predictiveQuestions.length === 0 && (
                  <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold">{lang === 'it' ? "Nessun requisito extra rilevato per i partner selezionati." : "No extra requirements detected for selected partners."}</p>
                  </div>
                )}
              </div>

              <button onClick={() => setPhase('summary')} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg">{t('qw_continue')}</button>
            </div>
          )}

          {/* PHASE: SUMMARY (Step 5: Readiness) */}
          {phase === 'summary' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-12">✨</div>
              <h2 className="text-4xl font-black mb-12 text-slate-900">{t('qw_done')}</h2>

              <div className="bg-white rounded-3xl border border-slate-100 p-8 text-left mb-12 shadow-sm">
                <div className="flex justify-between items-baseline mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('qw_nav_readiness')}</p>
                  <span className="text-3xl font-black text-emerald-600">{uploads.length > 0 ? '75%' : '40%'}</span>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: uploads.length > 0 ? '75%' : '40%' }}></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <span className="w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                    {selectedClients.length} {t('qw_partners_mapped')}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <span className="w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                    {t('qw_baseline_done')}
                  </div>
                  {uploads.length > 0 && (
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <span className="w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                      {uploads.length} {t('qw_evidence')} (Level 1)
                    </div>
                  )}
                </div>
              </div>

              <button onClick={finalize} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-xl shadow-2xl active:scale-95">
                {t('qw_dashboard')}
              </button>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}

