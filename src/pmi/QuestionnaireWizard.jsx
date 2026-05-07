import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';



export default function QuestionnaireWizard({ org, onComplete, initialPhase = 'welcome' }) {
  const [phase, setPhase] = useState(initialPhase); 
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
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (!org) return;

    const loadData = async () => {
      try {
        const [contextRes, orgsRes] = await Promise.all([
          callApi(`/pmi/sector-context?sector=${encodeURIComponent(org.sector)}`),
          callApi(`/organizations`)
        ]);
        
        const contextData = await contextRes.json();
        const orgsData = await orgsRes.json();

        setContext(contextData);
        setBigCorps(orgsData.filter(o => o.id !== org.id));
      } catch (err) {
        console.error("Failed to load wizard data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  const handleFileUpload = async (e, slot = 'other') => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('org_id', org.id);
    formData.append('file', file);
    formData.append('type', slot);
    try {
      const res = await callApi(`/pmi/ingest`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.status === 'preview') {
        setUploads(prev => [...prev, { name: file.name, type: data.data.type, slot }]);
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
              { id: 'vsme', label: t('qw_nav_vsme'), icon: '📊' },
              { id: 'upload', label: t('qw_nav_upload'), icon: '🛡️' },
              { id: 'welcome', label: t('qw_nav_clients'), icon: '🤝' },
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

              <div className="flex gap-4">
                <button onClick={() => setPhase('upload')} className="px-8 py-5 rounded-2xl font-black text-slate-400">{t('qw_back')}</button>
                <button onClick={() => setPhase('predictive')} className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                  {t('qw_continue')}
                </button>
              </div>
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

              <div className="grid grid-cols-2 gap-4 mb-12">
                {[
                  { id: 'bill', label: t('qw_type_bill'), icon: '⚡' },
                  { id: 'iso', label: t('qw_type_iso'), icon: '📜' },
                  { id: 'policy', label: t('qw_type_policy'), icon: '🌿' },
                  { id: 'other', label: t('qw_upload_doc'), icon: '📁' }
                ].map(slot => (
                  <div 
                    key={slot.id}
                    onClick={() => {
                      if (!isUploading) {
                        fileInputRef.current.setAttribute('data-slot', slot.id);
                        fileInputRef.current.click();
                      }
                    }}
                    className="p-6 bg-white border border-slate-100 rounded-3xl hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform">{slot.icon}</div>
                      {uploads.find(u => u.slot === slot.id) && (
                        <span className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">UPLOADED</span>
                      )}
                    </div>
                    <p className="text-sm font-black text-slate-800 mb-1">{slot.label}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{t('qw_upload_hint')}</p>
                    
                    {isUploading && fileInputRef.current?.getAttribute('data-slot') === slot.id && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-6 h-6 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={async (e) => {
                  const slot = e.target.getAttribute('data-slot');
                  await handleFileUpload(e, slot);
                }} 
              />

              <div className="flex gap-4">
                <button onClick={() => setPhase('vsme')} className="px-8 py-5 rounded-2xl font-black text-slate-400">{t('qw_back')}</button>
                <button 
                  onClick={() => setPhase('welcome')}
                  className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-emerald-100"
                >
                  {t('qw_continue')}
                </button>
              </div>
            </div>
          )}

          {/* PHASE: VSME (Step 3: Level 2 Baseline) */}
          {phase === 'vsme' && context?.vsme_standard && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{t('qw_nav_vsme')}</span>
                  <span className="text-xs font-bold text-slate-400 italic">Standard: VSME (Voluntary SME)</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">{t('vsme_title')}</h2>
                
                {/* Sector Insight Card */}
                <div className="p-6 bg-slate-900 rounded-[2rem] relative overflow-hidden mb-8 shadow-2xl shadow-emerald-900/10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-2">{t('vsme_sector_label')}</p>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {context.sector_insight}
                  </p>
                </div>
              </header>

              <div className="space-y-6 mb-12 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                {context.vsme_standard.map((q, idx) => {
                  const isPreFilled = uploads.length > 0 && q.id === 'vsme_1';
                  return (
                    <div key={q.id} className={`p-6 rounded-3xl border transition-all ${isPreFilled ? 'bg-emerald-50/30 border-emerald-100' : 'bg-white border-slate-100'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{q.kpi}</p>
                          <h4 className="text-sm font-black text-slate-800 leading-snug">{q.question}</h4>
                        </div>
                        {isPreFilled && (
                          <span className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full animate-pulse shadow-sm shadow-emerald-200">AI PRE-FILLED</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">{q.description}</p>
                      <div className="relative">
                        {q.type === 'number' ? (
                          <div className="relative">
                            <input 
                              type="number"
                              className={`w-full px-5 py-3 rounded-2xl border-2 focus:outline-none focus:ring-4 transition-all text-xl font-black ${
                                isPreFilled 
                                  ? 'bg-white border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/10 text-emerald-700' 
                                  : 'bg-slate-50 border-slate-50 focus:border-emerald-600 focus:ring-emerald-500/10 text-slate-900'
                              }`}
                              placeholder="0.00"
                              value={responses[q.id] || (isPreFilled ? '5837' : '')}
                              onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 uppercase tracking-widest">
                              {q.question.match(/\((.*?)\)/)?.[1] || ''}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {q.options.map(opt => (
                              <button 
                                key={opt}
                                onClick={() => setResponses({ ...responses, [q.id]: opt })}
                                className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold border-2 transition-all text-sm ${
                                  responses[q.id] === opt 
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setPhase('welcome')} className="px-8 py-5 rounded-2xl font-black text-slate-400">{t('qw_back')}</button>
                <button 
                  onClick={() => setPhase('upload')}
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

