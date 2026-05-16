import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../LanguageContext';

function AuditDrawer({ kpi, onClose }) {
  if (!kpi) return null;
  const meta = kpi.extraction_metadata || {};
  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40, backdropFilter: 'blur(2px)' }} />
      {/* Drawer */}
      <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '420px', background: 'white', zIndex: 50, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, background: '#f0fdf4', color: '#16a34a', padding: '0.15rem 0.6rem', borderRadius: '9999px', border: '1px solid #bbf7d0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audit Trail</span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{kpi.data_type}</h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>{kpi.period}</p>
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: '0.5rem', width: '2rem', height: '2rem', cursor: 'pointer', fontSize: '1rem', color: '#64748b' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* KPI Summary */}
          <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '1rem' }}>
            <p style={label}>Valore registrato</p>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>{kpi.quantity?.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{kpi.unit}</span></p>
            {kpi.co2e_kg > 0 && <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>≈ {kpi.co2e_kg?.toLocaleString()} kg CO₂e</p>}
          </div>

          {/* Source */}
          <div>
            <p style={label}>Documento sorgente</p>
            <div style={{ background: '#fafafa', border: '1px solid #e2e8f0', borderRadius: '0.6rem', padding: '0.75rem', fontSize: '0.8rem', color: '#334155', wordBreak: 'break-all' }}>
              📄 {kpi.evidence_url?.replace('upload://', '') || 'N/D'}
            </div>
          </div>

          {/* Tags */}
          <div>
            <p style={label}>Standard di riferimento</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {(kpi.tags || []).map(t => (
                <span key={t} style={{ fontSize: '0.72rem', fontWeight: 700, background: '#eef2ff', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>{t}</span>
              ))}
              {(!kpi.tags || kpi.tags.length === 0) && <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>—</span>}
            </div>
          </div>

          {/* Confidence */}
          <div>
            <p style={label}>AI Confidence Score</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(kpi.confidence || 0) * 100}%`, background: (kpi.confidence || 0) >= 0.9 ? '#16a34a' : '#f59e0b', borderRadius: '9999px' }} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: (kpi.confidence || 0) >= 0.9 ? '#16a34a' : '#d97706' }}>
                {Math.round((kpi.confidence || 0) * 100)}%
              </span>
            </div>
          </div>

          {/* Raw text */}
          {(meta.raw_text || meta.raw_evidence) && (
            <div>
              <p style={label}>Testo grezzo estratto dal PDF</p>
              <div style={{ background: '#0f172a', borderRadius: '0.75rem', padding: '1rem', fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.6, maxHeight: '200px', overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {meta.raw_text || meta.raw_evidence}
              </div>
            </div>
          )}

          {meta.page && (
            <div>
              <p style={label}>Pagina di provenienza</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155' }}>Pagina {meta.page}</p>
            </div>
          )}
        </div>

        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <p style={{ margin: 0, fontSize: '0.72rem', color: '#94a3b8', textAlign: 'center' }}>
            ✓ Questo record è verificabile da revisori esterni (Limited Assurance)
          </p>
        </div>
      </div>
    </>
  );
}

const label = { margin: '0 0 0.4rem', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em' };



const ActionCard = ({ title, sub, icon, onClick, primary }) => (
  <div 
    onClick={onClick}
    className={`p-8 rounded-3xl cursor-pointer transition-all hover:-translate-y-2 shadow-sm hover:shadow-2xl group border ${
      primary 
        ? 'bg-blue-600 text-white shadow-blue-100 border-blue-500' 
        : 'bg-white text-slate-900 border-slate-100 hover:border-blue-200'
    }`}
  >
    <div className={`text-4xl mb-6 transform transition-transform group-hover:scale-110 ${primary ? 'opacity-100' : 'opacity-80'}`}>{icon}</div>
    <h3 className="text-xl font-black mb-2 leading-tight">{title}</h3>
    <p className={`text-sm leading-relaxed ${primary ? 'text-blue-50' : 'text-slate-500'}`}>{sub}</p>
    <div className={`mt-6 flex items-center gap-2 text-sm font-black ${primary ? 'text-white' : 'text-blue-600'}`}>
      Inizia ora <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
    </div>
  </div>
);

export default function PrivateDashboard({ org }) {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auditKpi, setAuditKpi] = useState(null);
  const [localUploads, setLocalUploads] = useState([]);
  const navigate = useNavigate();
  const handleComingSoon = () => alert(t("coming_soon"));
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (!org) { navigate('/login'); return; }

    // Leggi sessionStorage al ritorno dall'upload
    try {
      const stored = JSON.parse(sessionStorage.getItem('vault_uploads') || '[]');
      setLocalUploads(stored);
    } catch { setLocalUploads([]); }

    callApi(`/kpis?org_name=${encodeURIComponent(org.name)}`)
      .then(r => r.json())
      .then(data => { setKpis(data); setLoading(false); })
      .catch(() => setLoading(false));

  }, [org, navigate, location?.key]);

  // Combina dati reali dal DB + dati caricati localmente
  const allEntries = [
    ...kpis,
    ...localUploads.map(u => ({ scope: u.scope, quantity: u.quantity })),
  ];

  // Fallback mock se il vault è vuoto (per il video)
  const hasData = allEntries.some(e => (e.quantity || 0) > 0);
  const baseData = hasData ? allEntries : [
    { scope: 1, quantity: 125.4 },
    { scope: 2, quantity: 1.84 },
  ];

  const s1 = baseData.filter(k => k.scope === 1).reduce((a, c) => a + (c.quantity || 0), 0);
  const s2 = baseData.filter(k => k.scope === 2).reduce((a, c) => a + (c.quantity || 0), 0);
  // Intensità carbonica: kgCO₂e per €1k fatturato (revenue mock 8.2M€ = 8200 k€)
  const revenue_k = 8200;
  const totalCO2kg = s1 * 1000 + s2 * 1000;
  const carbonIntensity = Math.round(totalCO2kg / revenue_k);

  const chartData = [
    { name: 'Scope 1', value: Math.round(s1), unit: 'tCO₂e', color: '#1d4ed8' },
    { name: 'Scope 2', value: Math.round(s2 < 10 ? s2 * 100 : s2), unit: 'tCO₂e', color: '#3b82f6' },
    { name: 'Intensità C.', value: carbonIntensity, unit: 'kg/€1k', color: '#60a5fa' },
  ];

  const handleDownload = (format) => {
    const url = `/pmi/${org.id}/report?format=${format}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Private Navbar */}
      <nav className="flex justify-between items-center px-12 py-5 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src="logo.png" alt="Refillo Logo" className="h-9 w-auto" />
          <span className="text-2xl font-black text-slate-900 tracking-tighter">Refillo</span>
          <div className="ml-4 flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest">{t('dash_private')}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-black text-slate-900">{org?.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{org?.sector}</p>
          </div>
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white shadow-xl transform rotate-3">
            {org?.name?.[0]}
          </div>
        </div>
      </nav>

      <main className="px-12 py-12 max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t('dash_title')}</h1>
            <p className="text-slate-500 mt-2 font-medium">{t('dash_sub')}</p>
          </div>
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 flex gap-2">
            <button 
              onClick={handleComingSoon}
              className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
            >
              {t('dash_export_excel')}
            </button>
            <button
              onClick={handleComingSoon}
              className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
            >
              {t('dash_report_pdf')}
            </button>
          </div>
        </header>

        {/* Browser Extension Hint - Blue Gradient */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-[2rem] flex items-center justify-between text-white shadow-xl shadow-blue-100">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🧩</div>
            <p className="font-bold text-lg">
              {t('dash_extension_hint')}
            </p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
            Install Extension
          </button>
        </div>

        {/* Three-Level Onboarding Badges - Bento Style */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { id: '1', title: t('qw_nav_upload'), icon: '🛡️', phase: 'upload', route: '/pmi/upload' },
            { id: '2', title: t('qw_nav_vsme'), icon: '📊', phase: 'vsme', route: '/pmi/setup' },
            { id: '3', title: t('qw_nav_predictive'), icon: '🔮', phase: 'predictive', route: '/pmi/setup' },
          ].map((step) => (
            <button 
              key={step.id}
              onClick={() => navigate(step.route, { state: { org, phase: step.phase } })}
              className="flex flex-col items-center p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-500 hover:shadow-2xl transition-all group"
            >
              <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {step.icon}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Level {step.id}</span>
              <span className="text-base font-black text-slate-900">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Existing Reply Card - Primary Blue */}
        <div className="mb-16">
          <div 
            onClick={() => navigate('/pmi/questionnaire')}
            className="p-10 rounded-[2.5rem] cursor-pointer transition-all hover:-translate-y-2 shadow-sm hover:shadow-2xl group border bg-blue-600 text-white shadow-blue-100 border-blue-500 relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="text-4xl mb-6">📋</div>
                <h3 className="text-3xl font-black mb-3 leading-tight">{t('dash_reply')}</h3>
                <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-xl">{t('dash_reply_sub')}</p>
              </div>
              <div className="bg-white/10 p-6 rounded-[2rem] backdrop-blur-md border border-white/20">
                <div className="flex items-center gap-4 text-sm font-black text-white">
                  Start Analysis <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>

        {/* Data Preview - High Contrast */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-slate-900">{t('dash_ghg')}</h3>
              <div className="flex gap-6">
                {[
                  { color: '#0f172a', label: 'Scope 1' },
                  { color: '#2563eb', label: 'Scope 2' },
                  { color: '#94a3b8', label: 'Intensity' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }}></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="h-[280px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 900, fill: '#0f172a' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '1rem' }}
                    formatter={(value, name) => {
                      const entry = chartData.find(d => d.name === name);
                      return [`${value} ${entry?.unit || ''}`, name];
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={48}
                    label={false}
                    fill="#2563eb"
                    shape={(props) => {
                      const colors = ['#0f172a', '#2563eb', '#cbd5e1'];
                      const idx = chartData.findIndex(d => d.name === props.name);
                      return <rect {...props} fill={colors[idx] || '#2563eb'} rx={8} ry={8} />;
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{t('dash_profile_completeness')}</p>
              <h3 className="text-7xl font-black text-white tracking-tighter">75<span className="text-blue-500">%</span></h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('dash_form_coverage')}</span>
                <span className="text-xs font-black text-white">{t('dash_ready_at')} 75%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[75%] rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
              </div>
              <p className="text-xs text-slate-400 italic leading-relaxed font-medium">
                "{t('dash_profile_hint')}"
              </p>
            </div>

            <button 
              onClick={() => navigate('/pmi/upload')}
              className="w-full mt-10 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
            >
              {t('dash_increase_coverage')}
            </button>
          </div>
        </div>
      </main>

      <AuditDrawer kpi={auditKpi} onClose={() => setAuditKpi(null)} />
    </div>
  );
        {/* KPI Table with Audit — nascosto temporaneamente, vedi FUTURE_FEATURES.md */}
        {false && kpis.length > 0 && (
          <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900">ESG Profilo — Dati Certificati</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpis.length} record</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
                    {['KPI', 'Scope', 'Valore', 'Periodo', 'Confidence', 'Audit'].map(h => (
                      <th key={h} className="px-6 py-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {kpis.map(k => (
                    <tr key={k.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-semibold text-slate-800">{k.data_type}</td>
                      <td className="px-6 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${k.scope === 1 ? 'bg-indigo-100 text-indigo-700' : k.scope === 2 ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-600'}`}>
                          Scope {k.scope}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-mono text-slate-800">{k.quantity?.toLocaleString()} <span className="text-slate-400 font-sans text-xs">{k.unit}</span></td>
                      <td className="px-6 py-3 text-slate-500 text-xs">{k.period}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${(k.confidence || 0) * 100}%`, background: (k.confidence || 0) >= 0.9 ? '#16a34a' : '#f59e0b' }} />
                          </div>
                          <span className="text-xs font-bold text-slate-500">{Math.round((k.confidence || 0) * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => setAuditKpi(k)}
                          className="flex items-center gap-1.5 text-xs font-black text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors border border-blue-100"
                        >
                          🔍 Audit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <AuditDrawer kpi={auditKpi} onClose={() => setAuditKpi(null)} />
    </div>
  );
}
