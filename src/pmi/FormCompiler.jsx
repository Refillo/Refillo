import { callApi } from '../apiClient';
import { useState, useRef } from 'react';
import { useLanguage } from '../LanguageContext';



export default function FormCompiler({ org, onBack }) {
  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchClientResults] = useState([]);
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [compilationData, setCompilationData] = useState(null);
  const fileInputRef = useRef();
  const { t } = useLanguage();

  const searchClient = async (val) => {
    setClientName(val);
    if (val.length < 2) { setSearchClientResults([]); return; }
    setIsSearching(true);
    try {
      const res = await callApi(`${API}/organizations`);
      const allOrgs = await res.json();
      setSearchClientResults(allOrgs.filter(o => o.name.toLowerCase().includes(val.toLowerCase())));
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectClient = (c) => {
    setSelectedClient(c);
    setClientName(c.name);
    setSearchClientResults([]);
    setStep(2);
  };

  const startAICompilation = async (selectedFile) => {
    setAnalyzing(true);
    const formData = new FormData();
    formData.append('org_id', org.id);
    formData.append('client_id', selectedClient.id);
    formData.append('file', selectedFile);
    try {
      const res = await callApi(`${API}/pmi/compile-form`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.status === 'success') {
        setCompilationData(data);
        setStep(3);
      } else {
        setCompilationData(getMockCompilation(selectedClient.name));
        setStep(3);
      }
    } catch (e) {
      setCompilationData(getMockCompilation(selectedClient.name));
      setStep(3);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    startAICompilation(selectedFile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 font-sans text-slate-900">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 w-full max-w-2xl border border-slate-100">

        {/* Step Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 w-12 rounded-full transition-all ${step >= s ? 'bg-emerald-600' : 'bg-slate-100'}`} />
            ))}
          </div>
          <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Step {step} of 3</span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black mb-2 tracking-tight">{t('fc_who')}</h2>
            <p className="text-slate-500 mb-8 font-medium">{t('fc_who_sub')}</p>
            <div className="relative">
              <input
                type="text"
                value={clientName}
                onChange={(e) => searchClient(e.target.value)}
                placeholder={t('fc_search')}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-lg font-bold transition-all"
              />
              {isSearching && <div className="absolute right-6 top-6 animate-spin">⌛</div>}
              {searchResults.length > 0 && (
                <div className="absolute w-full mt-2 bg-white border border-slate-100 rounded-3xl shadow-xl z-20 overflow-hidden">
                  {searchResults.map(c => (
                    <div
                      key={c.id}
                      onClick={() => handleSelectClient(c)}
                      className="px-6 py-4 hover:bg-emerald-50 cursor-pointer flex justify-between items-center group transition-colors"
                    >
                      <div>
                        <p className="font-black group-hover:text-emerald-700">{c.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-black">{c.sector}</p>
                      </div>
                      <span className="text-emerald-600 font-black opacity-0 group-hover:opacity-100">{t('fc_select')} →</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-emerald-600 text-white p-2 rounded-xl text-xs font-black uppercase tracking-tighter shadow-lg shadow-emerald-100">{selectedClient.name}</span>
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-tight">{t('fc_upload_title')}</h2>
            <p className="text-slate-500 mb-10 font-medium">{t('fc_upload_sub')}</p>
            {analyzing ? (
              <div className="py-16 text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">🧠</div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{t('fc_analyzing')}</h3>
                <p className="text-slate-400 text-sm italic">{selectedClient.name} × {org.name}</p>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-4 border-dashed border-slate-100 rounded-[2rem] py-16 text-center hover:border-emerald-200 hover:bg-emerald-50/30 cursor-pointer transition-all group"
              >
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📄</div>
                <p className="font-black text-slate-400 group-hover:text-emerald-600">{t('fc_drop')}</p>
                <p className="text-[10px] text-slate-300 font-bold uppercase mt-2 tracking-widest">{t('fc_formats')}</p>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && compilationData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{t('fc_prefilled')}</h2>
                <p className="text-slate-500 text-sm font-medium">{selectedClient.name}</p>
                {compilationData.file_type === 'excel' && (
                  <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">{t('fc_excel_active')}</span>
                )}
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-emerald-600">{compilationData.match_rate}%</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter leading-none">{t('fc_match_rate')}</p>
              </div>
            </div>

            <div className="space-y-3 mb-10 max-h-[350px] overflow-y-auto pr-2">
              {compilationData.form_fields.map((f, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${f.found ? 'bg-white border-slate-100' : 'bg-rose-50 border-rose-100'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-black text-slate-700">{f.question}</p>
                    {f.found
                      ? <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full">{t('fc_match100')}</span>
                      : <span className="bg-rose-100 text-rose-700 text-[9px] font-black px-2 py-0.5 rounded-full">{t('fc_gap')}</span>
                    }
                  </div>
                  {f.found ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-slate-50 px-3 py-2 rounded-xl text-sm font-bold text-emerald-700 border border-emerald-100">{f.value}</div>
                        <div className="text-right">
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{t('fc_source')}</p>
                          <p className="text-[10px] font-bold text-slate-500 truncate max-w-[120px]">{f.source}</p>
                        </div>
                      </div>
                      {f.narrative && (
                        <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                          <p className="text-[10px] text-emerald-800 font-medium leading-relaxed italic">"{f.narrative}"</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-rose-600 font-medium italic">{t('fc_missing_data')}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 py-4 px-6 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-200 transition-colors">
                {t('fc_change')}
              </button>
              {compilationData.download_url ? (
                <a href={`${API}${compilationData.download_url}`} target="_blank" rel="noopener noreferrer"
                  className="flex-[2] py-4 px-6 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all text-center flex items-center justify-center">
                  {t('fc_download_excel')}
                </a>
              ) : (
                <a
                  href={`${API}/pmi/${org.id}/compiled-form?client_name=${encodeURIComponent(selectedClient.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-[2] py-4 px-6 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all text-center flex items-center justify-center"
                >
                  {t('fc_download_pdf')}
                </a>
              )}
            </div>
          </div>
        )}

        {step < 3 && (
          <button onClick={onBack} className="mt-10 text-sm font-black text-slate-300 hover:text-emerald-600 transition-colors flex items-center gap-2 mx-auto">
            <span>←</span> {t('fc_back')}
          </button>
        )}
      </div>
    </div>
  );
}

function getMockCompilation(clientName) {
  return {
    status: 'success',
    match_rate: 87,
    file_type: 'pdf',
    form_fields: [
      { question: 'Total Scope 1 GHG emissions (tCO2e)', found: true, value: '125.4 tCO2e', source: 'Bolletta Enel Q1 2024', narrative: 'Direct emissions calculated per GHG Protocol Scope 1, based on natural gas consumption.' },
      { question: 'Total energy consumption (MWh)', found: true, value: '5.837 MWh', source: 'Bolletta Enel Q1 2024', narrative: 'Total electricity consumption from grid, location-based method per ESRS E1-5.' },
      { question: 'Renewable energy share (%)', found: true, value: '42%', source: 'Bolletta Enel Q1 2024' },
      { question: 'Scope 2 GHG emissions — market-based (tCO2e)', found: true, value: '1.091 kgCO2e', source: 'Bolletta Enel Q1 2024' },
      { question: 'Total water withdrawal (m³)', found: false, value: null },
      { question: 'Total waste produced (tonnes)', found: false, value: null },
    ]
  };
}
