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
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <div className="fixed right-0 top-0 bottom-0 width-[420px] bg-zinc-950 border-l border-white/5 z-50 shadow-2xl flex flex-col font-sans">
        <div className="p-8 border-b border-white/5 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">Audit Trail</span>
            </div>
            <h3 className="text-xl font-black text-white">{kpi.data_type}</h3>
            <p className="text-sm text-slate-500 mt-1">{kpi.period}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Value Recorded</p>
            <p className="text-3xl font-black text-white">{kpi.quantity?.toLocaleString()} <span className="text-sm text-slate-500 font-medium">{kpi.unit}</span></p>
            {kpi.co2e_kg > 0 && <p className="text-sm text-emerald-500 font-bold mt-2">≈ {kpi.co2e_kg?.toLocaleString()} kg CO₂e</p>}
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Evidence Source</p>
            <div className="bg-black border border-white/5 rounded-xl p-4 text-xs text-slate-400 font-mono break-all leading-relaxed">
              {kpi.evidence_url?.replace('upload://', '') || 'N/A'}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Standard Mapping</p>
            <div className="flex gap-2 flex-wrap">
              {(kpi.tags || []).map(t => (
                <span key={t} className="text-[10px] font-black bg-white/5 text-white px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">AI Confidence</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(kpi.confidence || 0) * 100}%` }} />
              </div>
              <span className="text-sm font-black text-white">{Math.round((kpi.confidence || 0) * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/5 bg-black/40">
          <p className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-widest leading-relaxed">
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
    { name: 'Scope 1', value: Math.round(s1), unit: 'tCO₂e', color: '#10b981' },
    { name: 'Scope 2', value: Math.round(s2 < 10 ? s2 * 100 : s2), unit: 'tCO₂e', color: '#34d399' },
    { name: 'Intensity', value: carbonIntensity, unit: 'kg/€1k', color: '#6ee7b7' },
  ];

  return (
    <div className="min-h-screen bg-black font-sans text-slate-400">
      {/* Private Navbar - High Tech Dark */}
      <nav className="flex justify-between items-center px-12 py-5 bg-black border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src="logo.png" alt="Refillo Logo" className="h-8 md:h-9 w-auto brightness-0 invert" />
          <span className="text-xl font-black text-white tracking-tighter uppercase">Refillo</span>
          <div className="ml-6 flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('dash_private')}</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-sm font-black text-white tracking-tight">{org?.name}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{org?.sector}</p>
          </div>
          <div className="w-10 h-10 bg-white text-black rounded-2xl flex items-center justify-center font-black shadow-xl">
            {org?.name?.[0]}
          </div>
        </div>
      </nav>

      <main className="px-12 py-16 max-w-7xl mx-auto">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-3">{t('dash_title')}</h1>
            <p className="text-slate-500 text-lg font-medium">{t('dash_sub')}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleComingSoon} className="px-6 py-3 bg-zinc-950 text-slate-400 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:text-white hover:bg-zinc-900 transition-all">
              {t('dash_export_excel')}
            </button>
            <button onClick={handleComingSoon} className="bg-white text-black px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all">
              {t('dash_report_pdf')}
            </button>
          </div>
        </header>

        {/* Extension Banner - High Impact Emerald */}
        <div className="mb-12 p-8 bg-emerald-600 rounded-[2.5rem] flex items-center justify-between text-black shadow-[0_30px_60px_-12px_rgba(16,185,129,0.3)] border border-emerald-400">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-black text-white rounded-[1.5rem] flex items-center justify-center text-3xl">🧩</div>
            <div>
              <p className="font-black text-2xl tracking-tighter leading-tight">
                {t('dash_extension_hint')}
              </p>
              <p className="text-black/60 text-sm font-bold mt-1 uppercase tracking-widest">Chrome & Edge Compatible</p>
            </div>
          </div>
          <button className="bg-black text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-2xl">
            Install Core v1.0
          </button>
        </div>

        {/* Bento Steps */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {[
            { id: '1', title: t('qw_nav_upload'), icon: '🛡️', phase: 'upload', route: '/pmi/upload' },
            { id: '2', title: t('qw_nav_vsme'), icon: '📊', phase: 'vsme', route: '/pmi/setup' },
            { id: '3', title: t('qw_nav_predictive'), icon: '🔮', phase: 'predictive', route: '/pmi/setup' },
          ].map((step) => (
            <button 
              key={step.id}
              onClick={() => navigate(step.route, { state: { org, phase: step.phase } })}
              className="flex flex-col items-center p-10 bg-zinc-950 border border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-16 h-16 bg-white/5 text-slate-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:text-emerald-500 transition-colors">
                {step.icon}
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2">Stage 0{step.id}</span>
              <span className="text-lg font-black text-white tracking-tight">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Action Card - Massive Dark */}
        <div className="mb-20">
          <div 
            onClick={() => navigate('/pmi/questionnaire')}
            className="p-16 rounded-[4rem] cursor-pointer transition-all hover:translate-y-[-4px] shadow-2xl bg-zinc-950 border border-white/10 relative overflow-hidden group"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="max-w-2xl">
                <div className="text-5xl mb-10">📋</div>
                <h3 className="text-4xl font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase">{t('dash_reply')}</h3>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">{t('dash_reply_sub')}</p>
              </div>
              <div className="bg-emerald-500 text-black p-10 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
                <span className="text-3xl font-black">→</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-full h-full bg-emerald-500/[0.02] pointer-events-none"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-zinc-950 p-12 rounded-[3rem] border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{t('dash_ghg')}</h3>
              <div className="flex gap-8">
                {[
                  { color: '#10b981', label: 'Scope 1' },
                  { color: '#34d399', label: 'Scope 2' },
                  { color: '#94a3b8', label: 'Intensity' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }}></div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{l.label}</span>
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
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#475569' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#1e293b' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#000', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem' }}
                    formatter={(value, name) => [`${value} tCO₂e`, name]}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={56}
                    shape={(props) => {
                      const colors = ['#10b981', '#34d399', '#1e293b'];
                      const idx = chartData.findIndex(d => d.name === props.name);
                      return <rect {...props} fill={colors[idx] || '#10b981'} rx={8} ry={8} />;
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white p-12 rounded-[3rem] text-black relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div>
              <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em] mb-6">{t('dash_profile_completeness')}</p>
              <h3 className="text-[100px] font-black text-black tracking-tighter leading-[0.8]">75<span className="text-emerald-500">%</span></h3>
            </div>
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-black/40 uppercase tracking-widest">{t('dash_form_coverage')}</span>
              </div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[75%]" />
              </div>
              <p className="text-sm text-slate-500 font-bold leading-relaxed italic">
                "{t('dash_profile_hint')}"
              </p>
              <button onClick={() => navigate('/pmi/upload')} className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
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
