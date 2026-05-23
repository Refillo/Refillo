import { callApi } from '../apiClient';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import TerminalWindow from '../components/TerminalWindow';
import { useLanguage } from '../LanguageContext';

const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value);
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = (end - start) / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue.toLocaleString(undefined, { minimumFractionDigits: value.includes('.') ? 1 : 0, maximumFractionDigits: 1 })}{suffix}</span>;
};

export default function PrivateDashboard({ org }) {
  const navigate = useNavigate();
  const { lang, t, setLang } = useLanguage();
  
  // Dashboard State
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'form'
  const [clientForms, setClientForms] = useState([]);
  const [activeFormId, setActiveFormId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Profile / VSME State
  const [context, setContext] = useState(null);
  const [responses, setResponses] = useState({});
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();
  const clientFormInputRef = useRef();

  useEffect(() => {
    if (!org) { navigate('/login'); return; }

    const loadDashboard = async () => {
      try {
        const [formsRes, contextRes] = await Promise.all([
          callApi('/client-forms'),
          callApi(`/pmi/sector-context?sector=${encodeURIComponent(org.sector)}`)
        ]);
        
        const formsData = await formsRes.json();
        const contextData = await contextRes.json();

        setClientForms(formsData);
        setContext(contextData);
        if (formsData.length > 0) setActiveFormId(formsData[0].id);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [org, navigate]);

  const handleFileUpload = async (e, slot = 'other') => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    // Simulate ingestion delay
    await new Promise(r => setTimeout(r, 1500));
    setUploads(prev => [...prev, { name: file.name, slot, date: new Date().toLocaleDateString() }]);
    setIsUploading(false);
  };

  const handleClientFormUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newForm = { 
      id: `f${Date.now()}`, 
      client_name: file.name.split('_')[0] || 'New Client', 
      form_name: file.name, 
      status: 'todo', 
      completion: 0, 
      date: new Date().toLocaleDateString() 
    };
    setClientForms([newForm, ...clientForms]);
    setActiveFormId(newForm.id);
    setActiveTab('form');
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Command Center...</p>
      </div>
    </div>
  );

  const activeForm = clientForms.find(f => f.id === activeFormId);
  const completeness = Math.min(100, (uploads.length * 20) + (Object.keys(responses).length * 10));

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 h-screen overflow-hidden">
      
      {/* LEFT SIDEBAR: Client Inbox */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
             <div className="w-7 h-7 bg-emerald-600 rounded-lg shadow-lg shadow-emerald-100 flex items-center justify-center text-white font-black text-xs">R</div>
             <span className="text-lg font-black tracking-tight uppercase italic">Refillo</span>
          </div>
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
          >
            {lang}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('qw_nav_clients')}</h3>
            <span className="bg-slate-100 text-slate-600 text-[9px] font-black px-2 py-0.5 rounded-full">{clientForms.length}</span>
          </div>

          <div className="space-y-3">
            {clientForms.map(form => (
              <button 
                key={form.id}
                onClick={() => { setActiveFormId(form.id); setActiveTab('form'); }}
                className={`w-full text-left p-5 rounded-2xl border transition-all relative group ${
                  activeFormId === form.id && activeTab === 'form'
                  ? 'bg-emerald-50 border-emerald-200 shadow-sm'
                  : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${activeFormId === form.id && activeTab === 'form' ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {form.client_name}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${form.status === 'ready' ? 'bg-emerald-500' : form.status === 'partial' ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                </div>
                <p className="text-sm font-black text-slate-800 truncate mb-3">{form.form_name}</p>
                <div className="flex items-center justify-between">
                   <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden mr-4">
                      <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${form.completion}%` }}></div>
                   </div>
                   <span className="text-[9px] font-black text-slate-400">{form.completion}%</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10">
            <button 
              onClick={() => clientFormInputRef.current.click()}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-600 transition-all flex flex-col items-center gap-2"
            >
              <span>+ Upload Client Form</span>
              <span className="lowercase font-medium opacity-60">(Excel/PDF)</span>
            </button>
            <input type="file" ref={clientFormInputRef} className="hidden" onChange={handleClientFormUpload} />
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm">
                {org?.name?.[0]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-800 truncate">{org?.name}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase truncate tracking-tighter">{org?.sector}</p>
              </div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative">
        
        {/* TOP TABS */}
        <nav className="h-20 bg-white border-b border-slate-200 flex items-center px-12 gap-12 shrink-0 z-10">
           <button 
             onClick={() => setActiveTab('profile')}
             className={`h-full border-b-2 transition-all flex items-center gap-3 px-2 ${
               activeTab === 'profile' ? 'border-emerald-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
             }`}
           >
             <span className="text-lg">🏢</span>
             <span className="text-xs font-black uppercase tracking-widest">{t('dash_private')}</span>
           </button>
           
           <button 
             onClick={() => { if(activeFormId) setActiveTab('form'); }}
             className={`h-full border-b-2 transition-all flex items-center gap-3 px-2 ${
               activeTab === 'form' ? 'border-emerald-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
             } ${!activeFormId ? 'opacity-30 cursor-not-allowed' : ''}`}
           >
             <span className="text-lg">📋</span>
             <span className="text-xs font-black uppercase tracking-widest">{t('dash_reply')}</span>
           </button>
        </nav>

        {/* TAB CONTENT */}
        <div className="flex-1 overflow-y-auto bg-[#FDFDFC]">
          
          <AnimatePresence mode="wait">
            {activeTab === 'profile' ? (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="p-12 lg:p-20 max-w-6xl mx-auto"
              >
                <header className="mb-16 flex justify-between items-start">
                   <div>
                      <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t('dash_title')}</h1>
                      <p className="text-slate-500 text-lg font-medium max-w-2xl">{t('dash_sub')}</p>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t('dash_profile_completeness')}</div>
                      <div className="flex items-center gap-4">
                         <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${completeness}%` }}></div>
                         </div>
                         <span className="text-3xl font-black text-slate-900">{completeness}%</span>
                      </div>
                   </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   {/* Column 1 & 2: VSME Baseline */}
                   <div className="lg:col-span-2 space-y-12">
                      <section>
                         <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-4 uppercase tracking-widest text-sm">
                           <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                           VSME Baseline Questions
                         </h3>
                         <div className="space-y-6">
                            {context?.vsme_standard.map(q => {
                               const hasBill = uploads.find(u => u.slot === 'bill');
                               const hasPayroll = uploads.find(u => u.slot === 'payroll');
                               const hasFinance = uploads.find(u => u.slot === 'finance');
                               
                               let prefillValue = null;
                               if (hasBill && q.id === 'vsme_1') prefillValue = '58.37';
                               if (hasBill && q.id === 'vsme_2') prefillValue = '12.45';
                               if (hasBill && q.id === 'vsme_3') prefillValue = 'Sì';
                               if (hasPayroll && q.id === 'vsme_4') prefillValue = '142';
                               if (hasPayroll && q.id === 'vsme_5') prefillValue = '64';
                               if (hasFinance && q.id === 'vsme_7') prefillValue = 'No';

                               const isPreFilled = prefillValue !== null;

                               return (
                                 <div key={q.id} className={`p-6 rounded-3xl border transition-all ${isPreFilled ? 'bg-emerald-50/30 border-emerald-100 shadow-sm' : 'bg-white border-slate-100'}`}>
                                    <div className="flex justify-between items-start mb-3">
                                      <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{q.kpi}</p>
                                        <h4 className="text-sm font-black text-slate-800 leading-snug">{q.question}</h4>
                                      </div>
                                      {isPreFilled && (
                                        <span className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full animate-pulse shadow-sm">AI PRE-FILLED</span>
                                      )}
                                    </div>
                                    <div className="relative mt-4">
                                      {q.type === 'number' ? (
                                        <input 
                                          type="number"
                                          className={`w-full px-5 py-3 rounded-2xl border-2 focus:outline-none focus:ring-4 transition-all text-xl font-black ${isPreFilled ? 'bg-white border-emerald-200 focus:border-emerald-500' : 'bg-slate-50 border-slate-50 focus:border-emerald-600'}`}
                                          value={responses[q.id] || (isPreFilled ? prefillValue : '')}
                                          onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                                        />
                                      ) : (
                                        <div className="flex gap-2">
                                          {q.options.map(opt => (
                                            <button 
                                              key={opt}
                                              onClick={() => setResponses({ ...responses, [q.id]: opt })}
                                              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all text-sm ${ (responses[q.id] || (isPreFilled ? prefillValue : '')) === opt ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-400'}`}
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
                      </section>
                   </div>

                   {/* Column 3: Data Vault & Uploads */}
                   <div className="space-y-12">
                      <section>
                         <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-4 uppercase tracking-widest text-sm">
                           <div className="w-1.5 h-6 bg-emerald-600 rounded-full"></div>
                           Data Vault (Evidence)
                         </h3>
                         <div className="grid grid-cols-1 gap-4">
                            {[
                              { id: 'bill', label: t('qw_type_bill'), icon: '⚡' },
                              { id: 'payroll', label: t('qw_type_payroll'), icon: '👥' },
                              { id: 'finance', label: t('qw_type_finance'), icon: '📊' },
                              { id: 'iso', label: t('qw_type_iso'), icon: '📜' }
                            ].map(slot => (
                              <div 
                                key={slot.id}
                                onClick={() => { if(!isUploading) { fileInputRef.current.setAttribute('data-slot', slot.id); fileInputRef.current.click(); }}}
                                className={`p-6 rounded-[2.5rem] border transition-all cursor-pointer relative overflow-hidden group ${
                                  uploads.find(u => u.slot === slot.id) ? 'bg-white border-emerald-500 shadow-xl' : 'bg-slate-50 border-slate-100 hover:border-emerald-500'
                                }`}
                              >
                                 <div className="flex justify-between items-center relative z-10">
                                    <div className="flex items-center gap-4">
                                       <div className="text-3xl group-hover:scale-110 transition-transform">{slot.icon}</div>
                                       <div>
                                          <p className="text-sm font-black text-slate-800">{slot.label}</p>
                                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                             {uploads.find(u => u.slot === slot.id) ? 'Verified • ' + uploads.find(u => u.slot === slot.id).date : t('qw_upload_hint')}
                                          </p>
                                       </div>
                                    </div>
                                    {uploads.find(u => u.slot === slot.id) && (
                                       <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                                    )}
                                 </div>
                                 {isUploading && fileInputRef.current?.getAttribute('data-slot') === slot.id && (
                                   <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                                      <div className="w-6 h-6 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                   </div>
                                 )}
                              </div>
                            ))}
                         </div>
                         <input type="file" ref={fileInputRef} className="hidden" onChange={async (e) => await handleFileUpload(e, e.target.getAttribute('data-slot'))} />
                      </section>

                      <div className="p-8 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl"></div>
                         <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-4">Market Readiness</p>
                         <h4 className="text-2xl font-black mb-6 tracking-tight">Il tuo profilo è pronto per l'industria.</h4>
                         <p className="text-slate-400 text-sm leading-relaxed mb-8">Con questi dati, Refillo può autocompilare l'85% dei moduli richiesti dai tuoi clienti correnti.</p>
                         <button onClick={handleComingSoon} className="w-full py-4 bg-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all">Genera Report PDF</button>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="p-12 lg:p-20 max-w-6xl mx-auto"
              >
                 {activeForm ? (
                    <div className="space-y-12">
                       <header className="flex justify-between items-end">
                          <div>
                             <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">{activeForm.client_name} Request</span>
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${activeForm.status === 'ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{activeForm.status}</span>
                             </div>
                             <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{activeForm.form_name}</h2>
                          </div>
                          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">Export Mapped Excel</button>
                       </header>

                       <div className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
                          <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                             <div className="flex items-center gap-8">
                                <div>
                                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Source Format</p>
                                   <p className="text-sm font-black text-slate-700 uppercase">Excel Digital Template 1.2</p>
                                </div>
                                <div className="w-px h-8 bg-slate-200"></div>
                                <div>
                                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Mapping Strategy</p>
                                   <p className="text-sm font-black text-slate-700 uppercase">VSME x {activeForm.client_name} Custom</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Auto-Fill Accuracy</p>
                                <p className="text-sm font-black text-emerald-600 uppercase">98.2% Verified</p>
                             </div>
                          </div>
                          <div className="p-10">
                             <div className="space-y-6">
                                {[
                                  { cell: 'B18', question: 'Total Energy Consumption (MWh)', value: responses['vsme_1'] || '58.37', source: 'A2 Energy Bill', status: 'mapped' },
                                  { cell: 'B22', question: 'Renewable Energy Percentage (%)', value: responses['vsme_3'] === 'Sì' ? '100' : '0', source: 'A2 Energy Bill (GO Cert)', status: 'mapped' },
                                  { cell: 'C45', question: 'Total FTE Employees', value: responses['vsme_4'] || '142', source: 'LUL Register 2025', status: 'mapped' },
                                  { cell: 'D12', question: 'Anti-Corruption Policy Adoption', value: 'Yes', source: 'Corporate Code of Conduct', status: 'mapped' },
                                  { cell: 'E09', question: 'Supply Chain Water Intensity', value: '-', source: 'Pending Documentation', status: 'missing' },
                                ].map((row, i) => (
                                  <div key={i} className="grid grid-cols-12 gap-8 items-center py-6 border-b border-slate-50 last:border-0 group">
                                     <div className="col-span-1 font-mono text-[10px] text-slate-300 font-bold">{row.cell}</div>
                                     <div className="col-span-4">
                                        <p className="text-sm font-bold text-slate-800 leading-tight">{row.question}</p>
                                     </div>
                                     <div className="col-span-3">
                                        <div className={`px-4 py-2 rounded-xl border-2 font-black text-sm ${row.status === 'mapped' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-50 text-slate-300'}`}>
                                           {row.value}
                                        </div>
                                     </div>
                                     <div className="col-span-3 flex items-center gap-3">
                                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] text-emerald-600 font-black italic">E</div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter truncate">{row.source}</span>
                                     </div>
                                     <div className="col-span-1 flex justify-end">
                                        <button className="text-slate-300 hover:text-slate-900 transition-colors">✎</button>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                       <div className="text-6xl mb-8">📂</div>
                       <h3 className="text-2xl font-black text-slate-800 mb-4">No active client request selected.</h3>
                       <p className="text-slate-400 max-w-sm font-medium">Select a form from the sidebar to view mapping and auto-fill details.</p>
                    </div>
                 )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
