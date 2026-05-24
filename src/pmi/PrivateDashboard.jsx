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

const API = 'http://localhost:8000';

const ActionCard = ({ title, sub, icon, onClick, primary }) => (
  <div 
    onClick={onClick}
    className={`p-8 rounded-3xl cursor-pointer transition-all hover:-translate-y-2 shadow-sm hover:shadow-2xl group border ${
      primary 
        ? 'bg-emerald-600 text-white shadow-emerald-100 border-emerald-500' 
        : 'bg-white text-slate-900 border-slate-100 hover:border-emerald-200'
    }`}
  >
    <div className={`text-4xl mb-6 transform transition-transform group-hover:scale-110 ${primary ? 'opacity-100' : 'opacity-80'}`}>{icon}</div>
    <h3 className="text-xl font-black mb-2 leading-tight">{title}</h3>
    <p className={`text-sm leading-relaxed ${primary ? 'text-emerald-50' : 'text-slate-500'}`}>{sub}</p>
    <div className={`mt-6 flex items-center gap-2 text-sm font-black ${primary ? 'text-white' : 'text-emerald-600'}`}>
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
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (!org) { navigate('/login'); return; }

    // Leggi sessionStorage al ritorno dall'upload
    try {
      const stored = JSON.parse(sessionStorage.getItem('vault_uploads') || '[]');
      setLocalUploads(stored);
    } catch { setLocalUploads([]); }

    fetch(`${API}/kpis?org_name=${encodeURIComponent(org.name)}`)
      .then(r => r.json())
      .then(data => { setKpis(data); setLoading(false); })
      .catch(() => setLoading(false));

  }, [org, navigate, location?.key]);

  // Combina dati reali dal DB + dati caricati localmente
  const allEntries = [
    ...kpis,
    ...localUploads.map(u => ({ scope: u.scope, quantity: u.quantity })),
  ];

  // Converte in tCO₂e uniformemente
  const toTco2e = (entry) => {
    const q = entry.quantity || 0;
    const u = (entry.unit || '').toLowerCase();
    if (u === 'kwh') return q * 0.000315;   // kWh → tCO₂e (fattore ISPRA)
    if (u === 'smc') return q * 0.002021;   // m³ gas → tCO₂e
    return q; // già in tCO₂e
  };

  const hasData = allEntries.some(e => (e.quantity || 0) > 0);
  const baseData = hasData ? allEntries : [
    { scope: 1, quantity: 125.4, unit: 'tCO₂e' },
    { scope: 2, quantity: 1.84,  unit: 'tCO₂e' },
  ];

  const s1tco2 = +baseData.filter(k => k.scope === 1).reduce((a, c) => a + toTco2e(c), 0).toFixed(2);
  const s2tco2 = +baseData.filter(k => k.scope === 2).reduce((a, c) => a + toTco2e(c), 0).toFixed(2);

  // Intensità Carbonica = kgCO₂e per €1k di fatturato (VSME revenue mock: 8.2M€)
  const revenueK = 8200;
  const carbonIntensity = +((s1tco2 + s2tco2) * 1000 / revenueK).toFixed(1);

  const chartData = [
    { name: 'Scope 1', value: s1tco2 },
    { name: 'Scope 2', value: s2tco2 },
  ];

  const handleDownload = (format) => {
    const url = `${API}/pmi/${org.id}/report?format=${format}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Private Navbar */}
      <nav className="flex justify-between items-center px-12 py-6 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white font-black px-3 py-1 rounded-lg text-xl shadow-lg shadow-emerald-100">ESG</div>
          <span className="text-xl font-black text-slate-900 tracking-tight">lab</span>
          <div className="ml-4 flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest">{t('dash_private')}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-black text-slate-900">{org?.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{org?.sector}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-emerald-100 transform rotate-3">
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
          <div className="bg-white p-2 rounded-2xl border border-slate-100 flex gap-2">
            <button 
              onClick={() => handleDownload('excel')}
              className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
            >
              {t('dash_export_excel')}
            </button>
            <button
              onClick={() => handleDownload('pdf')}
              className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
            >
              {t('dash_report_pdf')}
            </button>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          <ActionCard
            primary
            icon="📋"
            title={t('dash_reply')}
            sub={t('dash_reply_sub')}
            onClick={() => navigate('/pmi/questionnaire')}
          />
          <ActionCard
            icon="⚡"
            title={t('dash_feed')}
            sub={t('dash_feed_sub')}
            onClick={() => navigate('/pmi/upload')}
          />
        </div>

        {/* Data Preview */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900">{t('dash_ghg')}</h3>
              <div className="flex gap-4">
                {[
                  { color: '#059669', label: 'Scope 1', sub: 'Emissioni dirette' },
                  { color: '#34d399', label: 'Scope 2', sub: 'Energia acquistata' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }}></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600 uppercase leading-none">{l.label}</p>
                      <p className="text-[9px] text-slate-400">{l.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="h-[250px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#cbd5e1' }} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '1rem' }}
                    formatter={(value) => [`${value} tCO₂e`]}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={56} name="tCO₂e"
                    fill="#059669"
                    shape={(props) => {
                      const colors = { 'Scope 1': '#059669', 'Scope 2': '#34d399' };
                      return <rect x={props.x} y={props.y} width={props.width} height={props.height} fill={colors[props.name] || '#059669'} rx={6} ry={6} />;
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* Carbon Intensity card — sotto il grafico */}
            {!loading && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Intensità Carbonica</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Il KPI che le Big Corp monitorano per i propri fornitori
                  </p>
                </div>
                <div className="text-right ml-6 shrink-0">
                  <p className="text-3xl font-black text-slate-900">{carbonIntensity}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">kgCO₂e / €1k rev.</p>
                  <p className="text-[9px] text-emerald-600 font-bold mt-1">
                    ↓ Benchmark settore: ~32
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-emerald-900 p-8 rounded-3xl text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-emerald-200/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div>
              <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">{t('dash_profile_completeness')}</p>
              <h3 className="text-6xl font-black text-white">75<span className="text-emerald-500">%</span></h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-emerald-300 uppercase">{t('dash_form_coverage')}</span>
                <span className="text-xs font-black text-white">{t('dash_ready_at')} 75%</span>
              </div>
              <div className="h-2 bg-emerald-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[75%] rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
              </div>
              <p className="text-xs text-emerald-200/70 italic leading-relaxed">
                "{t('dash_profile_hint')}"
              </p>
            </div>

            <button 
              onClick={() => navigate('/pmi/upload')}
              className="w-full mt-6 py-3 bg-white text-emerald-900 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-colors shadow-lg shadow-black/20"
            >
              {t('dash_increase_coverage')}
            </button>
          </div>
        </div>
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
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${(k.confidence || 0) * 100}%`, background: (k.confidence || 0) >= 0.9 ? '#16a34a' : '#f59e0b' }} />
                          </div>
                          <span className="text-xs font-bold text-slate-500">{Math.round((k.confidence || 0) * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => setAuditKpi(k)}
                          className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors border border-emerald-100"
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
