import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function GapAnalysis({ org, onRestart }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    callApi(`http://localhost:8000/pmi/${org.id}/gap-analysis`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [org.id]);

  if (loading) return (
    <div style={{ ...styles.page, flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '2rem' }}>⏳</div>
      <p style={{ color: '#64748b' }}>{t('gap_loading')}</p>
    </div>
  );

  if (!data) return (
    <div style={styles.page}>
      <p style={{ color: '#dc2626' }}>{t('gap_error')}</p>
    </div>
  );

  const scoreColor = data.score >= 70 ? '#16a34a' : data.score >= 40 ? '#d97706' : '#dc2626';
  const scoreLabel = data.score >= 70 ? t('gap_good') : data.score >= 40 ? t('gap_partial') : t('gap_low');

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.badge}>{t('gap_step')}</div>
            <h2 style={styles.title}>{data.org}</h2>
            <p style={{ color: '#64748b', margin: 0 }}>{data.sector} · {data.total_kpis} {t('gap_kpis')}</p>
          </div>
          <button onClick={onRestart} style={styles.restartBtn}>{t('gap_new')}</button>
        </div>

        {/* Score */}
        <div style={styles.scoreCard}>
          <div>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('gap_score')}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 900, color: scoreColor }}>{data.score}%</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: scoreColor }}>{scoreLabel}</span>
            </div>
          </div>
          <ScoreRing score={data.score} color={scoreColor} />
        </div>

        <div style={styles.grid}>
          {/* Coperti */}
          <div style={styles.panel}>
            <h3 style={{ ...styles.panelTitle, color: '#16a34a' }}>{t('gap_covered')} ({data.covered.length})</h3>
            {data.covered.length === 0
              ? <p style={styles.empty}>{t('gap_none_covered')}</p>
              : data.covered.map(k => (
                <div key={k.key} style={styles.kpiRow}>
                  <div style={{ flex: 1 }}>
                    <p style={styles.kpiLabel}>{k.label}</p>
                    <p style={styles.kpiTag}>{k.tag}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontWeight: 700, color: '#1e293b', fontFamily: 'monospace' }}>
                      {k.value?.toLocaleString()} <span style={{ color: '#94a3b8', fontFamily: 'sans-serif', fontWeight: 400 }}>{k.unit}</span>
                    </p>
                    {k.confidence && (
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#16a34a' }}>
                        AI {(k.confidence * 100).toFixed(0)}% conf.
                      </p>
                    )}
                  </div>
                </div>
              ))
            }
          </div>

          {/* Mancanti */}
          <div style={styles.panel}>
            <h3 style={{ ...styles.panelTitle, color: '#dc2626' }}>{t('gap_missing_label')} ({data.missing.length})</h3>
            {data.missing.length === 0
              ? <p style={styles.empty}>{t('gap_none_missing')}</p>
              : data.missing.map(k => (
                <div key={k.key} style={{ ...styles.kpiRow, background: '#fff7f7' }}>
                  <div style={{ flex: 1 }}>
                    <p style={styles.kpiLabel}>{k.label}</p>
                    <p style={styles.kpiTag}>{k.tag}</p>
                  </div>
                  <span style={styles.missingBadge}>{t('gap_upload')}</span>
                </div>
              ))
            }

            {data.missing.length > 0 && (
              <div style={styles.aiTip}>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.75rem', fontWeight: 700, color: '#4338ca' }}>{t('gap_ai_hint')}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#3730a3', lineHeight: 1.5 }}>
                  {data.missing.map(m => m.label).join(', ')}.{' '}
                  {t('gap_prev')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button style={styles.btnPrimary} onClick={() => window.open(`http://localhost:8000/pmi/${org.id}/report?format=pdf`, '_blank')}>
            {t('gap_report')}
          </button>
          <button style={styles.btnSecondary} onClick={() => window.open(`http://localhost:8000/pmi/${org.id}/report?format=excel`, '_blank')}>
            {t('gap_excel')}
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreRing({ score, color }) {
  const r = 40, circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 1s ease' }} />
      <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="800" fill={color}>{score}%</text>
    </svg>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' },
  container: { width: '100%', maxWidth: '800px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' },
  badge: { display: 'inline-block', background: '#eef2ff', color: '#4f46e5', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', marginBottom: '0.5rem' },
  title: { fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' },
  restartBtn: { background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.6rem 1.2rem', fontSize: '0.875rem', fontWeight: 600, color: '#334155', cursor: 'pointer' },
  scoreCard: { background: 'white', borderRadius: '1.25rem', padding: '1.75rem 2rem', marginBottom: '1.5rem', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' },
  panel: { background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  panelTitle: { fontSize: '0.9rem', fontWeight: 700, marginTop: 0, marginBottom: '1rem' },
  kpiRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', borderRadius: '0.6rem', padding: '0.75rem', marginBottom: '0.5rem' },
  kpiLabel: { margin: '0 0 0.15rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' },
  kpiTag: { margin: 0, fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace' },
  missingBadge: { fontSize: '0.65rem', fontWeight: 700, background: '#fee2e2', color: '#dc2626', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', whiteSpace: 'nowrap' },
  aiTip: { background: '#eef2ff', borderRadius: '0.75rem', padding: '0.875rem', marginTop: '1rem' },
  empty: { color: '#94a3b8', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' },
  btnPrimary: { flex: 1, background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '0.85rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' },
  btnSecondary: { background: 'white', color: '#334155', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.85rem 1.5rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' },
};
