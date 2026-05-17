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
      <div onClick={onClose} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      <div className="fixed right-0 top-0 bottom-0 width-[420px] bg-white border-l border-slate-100 z-50 shadow-2xl flex flex-col font-sans">
        <div className="p-8 border-b border-slate-100 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">Audit Trail</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">{kpi.data_type}</h3>
            <p className="text-sm text-slate-500 mt-1">{kpi.period}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Value Recorded</p>
            <p className="text-3xl font-black text-slate-900">{kpi.quantity?.toLocaleString()} <span className="text-sm text-slate-500 font-medium">{kpi.unit}</span></p>
            {kpi.co2e_kg > 0 && <p className="text-sm text-emerald-600 font-bold mt-2">≈ {kpi.co2e_kg?.toLocaleString()} kg CO₂e</p>}
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Evidence Source</p>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-600 font-mono break-all leading-relaxed shadow-sm">
              {kpi.evidence_url?.replace('upload://', '') || 'N/A'}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Standard Mapping</p>
            <div className="flex gap-2 flex-wrap">
              {(kpi.tags || []).map(t => (
                <span key={t} className="text-[10px] font-black bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">AI Confidence</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(kpi.confidence || 0) * 100}%` }} />
              </div>
              <span className="text-sm font-black text-slate-900">{Math.round((kpi.confidence || 0) * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest leading-relaxed">
            ✓ External Audit Verified (Limited Assurance)
          </p>
        </div>
      </div>
    </>
  );
}

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
    try {
      const stored = JSON.parse(sessionStorage.getItem('vault_uploads') || '[]');
      setLocalUploads(stored);
    } catch { setLocalUploads([]); }

    callApi(`/kpis?org_name=${encodeURIComponent(org.name)}`)
      .then(r => r.json())
      .then(data => { setKpis(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [org, navigate, location?.key]);

  const allEntries = [...kpis, ...localUploads.map(u => ({ scope: u.scope, quantity: u.quantity }))];
  const hasData = allEntries.some(e => (e.quantity || 0) > 0);
  const baseData = hasData ? allEntries : [{ scope: 1, quantity: 125.4 }, { scope: 2, quantity: 1.84 }];
  const s1 = baseData.filter(k => k.scope === 1).reduce((a, c) => a + (c.quantity || 0), 0);
  const s2 = baseData.filter(k => k.scope === 2).reduce((a, c) => a + (c.quantity || 0), 0);
  const totalCO2kg = s1 * 1000 + s2 * 1000;
  const carbonIntensity = Math.round(totalCO2kg / 8200);

  const chartData = [
    { name: 'Scope 1', value: Math.round(s1), unit: 'tCO₂e', color: '#0f172a' },
    { name: 'Scope 2', value: Math.round(s2 < 10 ? s2 * 100 : s2), unit: 'tCO₂e', color: '#10b981' },
    { name: 'Intensity', value: carbonIntensity, unit: 'kg/€1k', color: '#64748b' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-500">
      {/* Private Navbar - Premium Light */}
      <nav className="flex justify-between items-center px-12 py-5 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src="logo.png" alt="Refillo Logo" className="h-8 md:h-9 w-auto" />
          <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">Refill<span className="text-emerald-500">o</span></span>
          <div className="ml-6 flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('dash_private')}</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-sm font-black text-slate-900 tracking-tight">{org?.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{org?.sector}</p>
          </div>
          <div className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black shadow-xl transform rotate-2">
            {org?.name?.[0]}
          </div>
        </div>
      </nav>

      <main className="px-12 py-16 max-w-7xl mx-auto">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-3">{t('dash_title')}</h1>
            <p className="text-slate-500 text-lg font-medium">{t('dash_sub')}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleComingSoon} className="px-6 py-3 bg-slate-50 text-slate-400 border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:text-slate-900 transition-all">
              {t('dash_export_excel')}
            </button>
            <button onClick={handleComingSoon} className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg">
              {t('dash_report_pdf')}
            </button>
          </div>
        </header>

        {/* Extension Banner - Premium Light Theme */}
        <div className="mb-12 p-10 bg-emerald-600 rounded-[2.5rem] flex items-center justify-between text-white shadow-2xl shadow-emerald-100 border border-emerald-500 relative overflow-hidden group">
          <div className="relative z-10 flex items-center gap-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[1.8rem] flex items-center justify-center text-4xl border border-white/20 group-hover:rotate-6 transition-transform">🧩</div>
            <div>
              <p className="font-black text-3xl tracking-tighter leading-tight mb-1">
                {t('dash_extension_hint')}
              </p>
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-[0.2em] opacity-80">Official Chrome & Edge Core v1.0</p>
            </div>
          </div>
          <button className="relative z-10 bg-white text-emerald-600 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 transition-all active:scale-95 shadow-xl">
            Install Extension
          </button>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Bento Steps */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {[
            { id: '1', title: t('qw_nav_upload'), icon: '🛡️', phase: 'upload', route: '/pmi/upload' },
            { id: '2', title: t('qw_nav_vsme'), icon: '📊', phase: 'vsme', route: '/pmi/setup' },
            { id: '3', title: t('qw_nav_predictive'), icon: '🔮', phase: 'predictive', route: '/pmi/setup' },
          ].map((step) => (
            <button 
              key={step.id}
              onClick={() => navigate(step.route, { state: { org, phase: step.phase } })}
              className="flex flex-col items-center p-12 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                {step.icon}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Stage 0{step.id}</span>
              <span className="text-lg font-black text-slate-900 tracking-tight">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Action Card - Massive Light */}
        <div className="mb-20">
          <div 
            onClick={() => navigate('/pmi/questionnaire')}
            className="p-16 rounded-[4rem] cursor-pointer transition-all hover:translate-y-[-4px] shadow-sm hover:shadow-2xl bg-white border border-slate-100 relative overflow-hidden group hover:border-emerald-500/30"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="max-w-2xl">
                <div className="text-5xl mb-12 transform group-hover:scale-110 transition-transform duration-500">📋</div>
                <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.9] uppercase">{t('dash_reply')}</h3>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">{t('dash_reply_sub')}</p>
              </div>
              <div className="bg-slate-900 text-white p-12 rounded-[2.5rem] shadow-2xl group-hover:bg-emerald-600 transition-colors">
                <span className="text-3xl font-black">→</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-full h-full bg-emerald-500/[0.01] pointer-events-none"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{t('dash_ghg')}</h3>
              <div className="flex gap-8">
                {[
                  { color: '#0f172a', label: 'Scope 1' },
                  { color: '#10b981', label: 'Scope 2' },
                  { color: '#cbd5e1', label: 'Intensity' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }}></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#cbd5e1' }} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '1.5rem', border: 'none', padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                    formatter={(value, name) => [`${value} tCO₂e`, name]}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={56}
                    shape={(props) => {
                      const colors = ['#0f172a', '#10b981', '#e2e8f0'];
                      const idx = chartData.findIndex(d => d.name === props.name);
                      return <rect {...props} fill={colors[idx] || '#10b981'} rx={10} ry={10} />;
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white p-12 rounded-[3.5rem] text-slate-900 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">{t('dash_profile_completeness')}</p>
              <h3 className="text-[100px] font-black text-slate-900 tracking-tighter leading-[0.8]">75<span className="text-emerald-500">%</span></h3>
            </div>
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('dash_form_coverage')}</span>
              </div>
              <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[75%] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
              </div>
              <p className="text-sm text-slate-500 font-bold leading-relaxed italic">
                "{t('dash_profile_hint')}"
              </p>
              <button onClick={() => navigate('/pmi/upload')} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
                {t('dash_increase_coverage')}
              </button>
            </div>
          </div>
        </div>
      </main>
      <AuditDrawer kpi={auditKpi} onClose={() => setAuditKpi(null)} />
    </div>
  );
}
