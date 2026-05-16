import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';



export default function VsmeOnboarding({ org, onComplete }) {
  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [saving, setSaving] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!org) return;
    callApi(`/pmi/sector-context?sector=${encodeURIComponent(org.sector)}`)
      .then(r => r.json())
      .then(data => {
        // Prepariamo la lista delle domande unendo VSME e Corporate Extras
        const allQuestions = [
          ...data.vsme_standard.map(q => ({ ...q, category: 'VSME Standard' })),
          ...data.corporate_extras.map(e => ({ 
            id: e.code, 
            question: t('vsme_q_prefix') + ` ${e.kpi}?`,
            category: 'Corporate Ready',
            insight: e.description,
            type: 'choice',
            options: [t('vsme_opt_yes'), t('vsme_opt_maybe'), t('vsme_opt_no')]
          }))
        ];
        setContext({ ...data, questions: allQuestions });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [org]);

  const handleInput = (id, val) => {
    setResponses(prev => ({ ...prev, [id]: val }));
  };

  const next = () => {
    if (currentStep < context.questions.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      submitVsme();
    }
  };

  const submitVsme = async () => {
    setSaving(true);
    const body = new FormData();
    body.append('org_id', org.id);
    body.append('responses', JSON.stringify(responses));
    
    try {
      await callApi(`/pmi/vsme-onboarding`, { method: 'POST', body });
      onComplete();
    } catch (e) {
      alert("Errore nel salvataggio. Riprova.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
    </div>
  );

  const q = context.questions[currentStep];
  const progress = ((currentStep + 1) / context.questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-2xl border border-slate-100">
        
        {/* Header con Insight Settoriale */}
        <div className="mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-100">
              {t('vsme_step')}: {q.category}
            </span>
            <span className="text-sm font-bold text-slate-400">{currentStep + 1} / {context.questions.length}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 leading-tight">{t('vsme_title')}</h2>

          <div className="mt-6 p-4 bg-slate-900 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-1">{t('vsme_sector_label')}</p>
            <p className="text-sm text-slate-300 leading-relaxed italic">{context.sector_insight}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 rounded-full mb-12 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Domanda Corrente */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-slate-800 leading-snug mb-2">{q.question}</h3>
          {q.insight && <p className="text-sm text-slate-500">{q.insight}</p>}
        </div>

        <div className="space-y-4">
          {q.type === 'number' ? (
            <input 
              type="number"
              className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xl font-black text-slate-900"
              placeholder={t('vsme_placeholder')}
              value={responses[q.id] || ''}
              onChange={(e) => handleInput(q.id, e.target.value)}
            />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleInput(q.id, opt)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-bold ${
                    responses[q.id] === opt 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                      : 'border-slate-50 hover:border-slate-100 bg-slate-50 text-slate-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 flex gap-4">
          {currentStep > 0 && (
            <button 
              onClick={() => setCurrentStep(s => s - 1)}
              className="px-8 py-5 rounded-2xl font-black text-slate-400 hover:text-slate-600 transition-colors"
            >
              {t('vsme_back')}
            </button>
          )}
          <button
            onClick={next}
            disabled={!responses[q.id] || saving}
            className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {saving ? t('vsme_loading') : (currentStep === context.questions.length - 1 ? t('vsme_finalize') : t('vsme_continue'))}
          </button>
        </div>
      </div>
    </div>
  );
}
