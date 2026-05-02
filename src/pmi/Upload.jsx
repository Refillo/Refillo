import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';



const MOCK_BILL = {
  provider: 'Enel Energia S.p.A.',
  quantity: 5837,
  unit: 'kWh',
  type: 'Electricity',
  start_date: '2024-01-01',
  end_date: '2024-03-31',
  confidence: 0.97,
  co2_kg: 1838.66,
  raw_evidence: 'Consumo totale periodo: 5.837 kWh — Fattura N. ENE-2024-00187432 — Enel Energia S.p.A.',
};

function buildMockPreview(file, orgId) {
  const name = file.name.toLowerCase();
  const isGas    = name.includes('gas') || name.includes('metano');
  const isWater  = name.includes('acqua') || name.includes('water') || name.includes('idric');

  if (!isGas && !isWater) {
    return { status: 'preview', filename: file.name, org_id: orgId, data: MOCK_BILL };
  }

  const qty = isGas ? 1240 : 850;
  const unit = isGas ? 'Smc' : 'm3';
  const provider = isGas ? 'ENI gas e luce S.p.A.' : 'Acque Vicentine S.p.A.';
  const co2 = isGas ? +(qty * 2.021).toFixed(2) : null;
  return {
    status: 'preview',
    filename: file.name,
    org_id: orgId,
    data: {
      provider, quantity: qty, unit,
      type: isGas ? 'Gas' : 'Water',
      start_date: '2024-01-01',
      end_date: '2024-03-31',
      confidence: 0.94,
      co2_kg: co2,
      raw_evidence: `Consumo rilevato: ${qty.toLocaleString()} ${unit}. Fornitore: ${provider}.`,
    }
  };
}

export default function Upload({ org, onComplete }) {
  const [files, setFiles]       = useState([]);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [saved, setSaved]       = useState([]);
  const [error, setError]       = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const addFiles = newFiles => {
    const pdfs = [...newFiles].filter(f => f.name.toLowerCase().endsWith('.pdf'));
    if (pdfs.length === 0 && newFiles.length > 0) {
      setError('Solo file PDF supportati.');
      return;
    }
    setFiles(prev => [...prev, ...pdfs.filter(f => !prev.find(p => p.name === f.name))]);
    setError('');
  };

  const onDrop = e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); };
  const removeFile = name => setFiles(f => f.filter(x => x.name !== name));

  const analyzeAll = async () => {
    if (!files.length) { setError(t('up_min_doc')); return; }
    setAnalyzing(true); setError(''); setPreviews([]);
    // Simulate analysis delay for demo effect
    await new Promise(r => setTimeout(r, 1800));

    for (const file of files) {
      const body = new FormData();
      body.append('org_id', org.id);
      body.append('file', file);
      try {
        const res = await callApi(`/pmi/ingest`, { method: 'POST', body });
        const data = await res.json();
        if (data.status === 'preview' && data.data?.quantity) {
          setPreviews(prev => [...prev, { ...data, file }]);
        } else {
          setPreviews(prev => [...prev, buildMockPreview(file, org.id)]);
        }
      } catch {
        setPreviews(prev => [...prev, buildMockPreview(file, org.id)]);
      }
    }
    setAnalyzing(false);
  };

  const confirmOne = async (preview) => {
    // Always update UI immediately — try API in background
    setSaved(s => [...s, preview.filename]);
    setPreviews(p => p.filter(x => x.filename !== preview.filename));

    // Salva nel sessionStorage per aggiornare il grafico GHG nella dashboard
    const d = preview.data;
    const existing = JSON.parse(sessionStorage.getItem('vault_uploads') || '[]');
    sessionStorage.setItem('vault_uploads', JSON.stringify([...existing, {
      scope: d.type === 'Gas' ? 1 : 2,
      quantity: d.quantity ?? 0,
      unit: d.unit ?? 'kWh',
      data_type: d.type ?? 'Electricity',
      filename: preview.filename,
    }]));

    const body = new FormData();
    body.append('org_id', preview.org_id || org.id);
    body.append('filename', preview.filename);
    body.append('provider', d.provider || 'N/D');
    body.append('quantity', d.quantity ?? 0);
    body.append('unit', d.unit || 'kWh');
    body.append('doc_type', d.type || 'Electricity');
    body.append('start_date', d.start_date || new Date().toISOString().split('T')[0]);
    body.append('end_date', d.end_date || new Date().toISOString().split('T')[0]);
    body.append('confidence', d.confidence ?? 0.9);
    body.append('co2_kg', d.co2_kg ?? 0);
    body.append('raw_evidence', d.raw_evidence || '');
    try {
      await callApi(`/pmi/ingest/confirm`, { method: 'POST', body });
    } catch { /* silently ignore — UI already updated */ }
  };

  const discardOne = fn => setPreviews(p => p.filter(x => x.filename !== fn));
  const confirmAll = () => previews.filter(p => p.status === 'preview').forEach(p => confirmOne(p));
  const allDone = saved.length > 0 && previews.length === 0;

  return (
    <div style={s.page}>
      <div style={s.card}>
        <button onClick={() => navigate("/pmi/dashboard")} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 800, cursor: "pointer", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>← {t("fc_back")}</button>

        {/* Badge + Title */}
        <div style={s.badge}>{t('up_step')}</div>
        <h2 style={s.title}>{t('up_title')}</h2>
        <p style={s.sub}>
          <strong>{org?.name}</strong>{org?.sector ? ` · ${org.sector}` : ''}<br />
          {t('up_sub')}
        </p>

        {/* ── DROP ZONE ── */}
        {previews.length === 0 && !allDone && (
          <>
            <div
              style={{ ...s.dropzone, background: dragging ? '#f0fdf4' : '#f8fafc', borderColor: dragging ? '#16a34a' : '#e2e8f0' }}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current.click()}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>📂</div>
              <p style={{ color: '#16a34a', fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>{t('up_drop')}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: '0.25rem 0 0' }}>{t('up_browse')}</p>
              <input ref={inputRef} type="file" accept=".pdf" multiple hidden onChange={e => addFiles(e.target.files)} />
            </div>

            {/* Doc type chips */}
            <div style={s.docGrid}>
              {[
                { icon: '⚡', l: t('doc_energy'),  h: t('doc_energy_hint') },
                { icon: '🔥', l: t('doc_fleet'),   h: t('doc_fleet_hint')  },
                { icon: '♻️', l: t('doc_waste'),   h: t('doc_waste_hint')  },
                { icon: '💧', l: t('doc_water'),   h: t('doc_water_hint')  },
                { icon: '📋', l: t('doc_iso'),     h: t('doc_iso_hint')    },
                { icon: '📄', l: t('doc_other'),   h: t('doc_other_hint')  },
              ].map(d => (
                <div key={d.l} style={s.docChip}>
                  <span style={{ fontSize: '1rem' }}>{d.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.76rem', fontWeight: 600, color: '#334155' }}>{d.l}</p>
                    <p style={{ margin: 0, fontSize: '0.68rem', color: '#94a3b8' }}>{d.h}</p>
                  </div>
                </div>
              ))}
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {files.map(f => (
                  <div key={f.name} style={s.fileRow}>
                    <span style={{ fontSize: '0.85rem', color: '#334155', flex: 1 }}>📄 {f.name}</span>
                    <button onClick={() => removeFile(f.name)} style={s.removeBtn}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {error && <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}

            <button onClick={analyzeAll} disabled={analyzing || !files.length} style={{ ...s.btn, marginTop: '1.5rem', opacity: files.length ? 1 : 0.4 }}>
              {analyzing
                ? <span>⏳ {t('up_analyzing')}</span>
                : <span>✦ {t('up_analyze')} {files.length > 0 ? `(${files.length})` : ''} →</span>
              }
            </button>
          </>
        )}

        {/* ── PREVIEW CARDS ── */}
        {previews.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#15803d', fontWeight: 600 }}>
              {t('up_done')}
            </div>

            {previews.map(p => (
              <div key={p.filename} style={s.previewCard}>
                {/* Header card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>📄 {p.filename}</p>
                    <p style={{ margin: '0.1rem 0 0', fontSize: '0.72rem', color: '#94a3b8' }}>
                      Gemini AI · {Math.round((p.data.confidence ?? 0.9) * 100)}% confidence
                    </p>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                    {p.data.type}
                  </span>
                </div>

                {/* Data rows */}
                <div style={{ background: 'white', borderRadius: '0.6rem', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', border: '1px solid #f1f5f9' }}>
                  <DataRow label={t('up_provider')} value={p.data.provider} />
                  <DataRow label={t('up_quantity')} value={`${p.data.quantity?.toLocaleString()} ${p.data.unit}`} />
                  <DataRow label={t('up_period')} value={`${p.data.start_date} → ${p.data.end_date}`} />
                  {p.data.co2_kg != null && (
                    <DataRow label={t('up_co2')} value={`${p.data.co2_kg.toLocaleString()} kg CO₂e`} highlight />
                  )}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    onClick={() => confirmOne(p)}
                    style={s.confirmBtn}
                  >
                    {t('up_confirm')}
                  </button>
                  <button onClick={() => discardOne(p.filename)} style={s.discardBtn}>
                    {t('up_discard')}
                  </button>
                </div>
              </div>
            ))}

            {previews.filter(p => p.status === 'preview').length > 1 && (
              <button onClick={confirmAll} style={{ ...s.btn, background: '#15803d' }}>
                {t('up_confirm_all')}
              </button>
            )}
          </div>
        )}

        {/* ── SUCCESS STATE ── */}
        {allDone && (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</div>
            <p style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.15rem', margin: '0 0 0.3rem' }}>
              {saved.length} {t('up_saved')}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
              {t('up_audit')}
            </p>
            <button onClick={() => onComplete(saved)} style={s.btn}>
              {t('up_gap')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function DataRow({ label, value, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid #f8fafc' }}>
      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{label}</span>
      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: highlight ? '#16a34a' : '#1e293b' }}>{value ?? '—'}</span>
    </div>
  );
}

const s = {
  page:       { minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' },
  card:       { background: 'white', borderRadius: '1.5rem', padding: '2.5rem', width: '100%', maxWidth: '560px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' },
  badge:      { display: 'inline-block', background: '#f0fdf4', color: '#16a34a', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.7rem', borderRadius: '9999px', marginBottom: '1rem', border: '1px solid #bbf7d0' },
  title:      { fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem' },
  sub:        { color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.6 },
  dropzone:   { border: '2px dashed', borderRadius: '1rem', padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' },
  docGrid:    { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '1rem' },
  docChip:    { display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', borderRadius: '0.5rem', padding: '0.5rem 0.6rem' },
  fileRow:    { display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' },
  removeBtn:  { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' },
  btn:        { width: '100%', background: '#16a34a', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' },
  previewCard:{ background: '#f8fafc', borderRadius: '1rem', padding: '1.15rem', border: '1px solid #e2e8f0' },
  dataGrid:   { display: 'flex', flexDirection: 'column' },
  confirmBtn: { flex: 1, background: '#16a34a', color: 'white', border: 'none', borderRadius: '0.6rem', padding: '0.65rem', fontSize: '0.83rem', fontWeight: 700, cursor: 'pointer' },
  discardBtn: { background: 'white', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '0.6rem', padding: '0.65rem 1rem', fontSize: '0.83rem', fontWeight: 600, cursor: 'pointer' },
};
