import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const SECTORS = [
  { value: 'Manifatturiero', key: 'sector_manifatturiero' },
  { value: 'Logistica e Trasporti', key: 'sector_logistica' },
  { value: 'Alimentare', key: 'sector_alimentare' },
  { value: 'Tessile e Moda', key: 'sector_tessile' },
  { value: 'Edilizia', key: 'sector_edilizia' },
  { value: 'Chimico e Farmaceutico', key: 'sector_chimico' },
  { value: 'Metalmeccanico', key: 'sector_metalmeccanico' },
  { value: 'Altro', key: 'sector_altro' },
];



export default function Onboarding({ onComplete }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', vat: '', sector: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true); 
    setError('');

    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));

    try {
      const res = await callApi(`/auth/register`, { method: 'POST', body });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('esg_token', data.access_token);
        onComplete(data.org);
      } else {
        setError(data.detail || t('onb_error'));
      }
    } catch {
      setError(t('onb_error_conn'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors"
      >
        {t('onb_back')}
      </button>

      <div className="bg-white rounded-3xl p-10 w-full max-w-xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="inline-block bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-6 border border-blue-100">
          {t('onb_step')}
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">{t('onb_title')}</h2>
        <p className="text-slate-500 mb-10">{t('onb_sub')}</p>

        <form onSubmit={submit} className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <Field label={t('onb_name')} name="name" value={form.name} onChange={handle} placeholder="es. Rossi Srl" />
          </div>

          <div className="col-span-1">
            <Field label={t('onb_email')} name="email" type="email" value={form.email} onChange={handle} placeholder="admin@rossi.it" />
          </div>

          <div className="col-span-1">
            <Field label={t('onb_password')} name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" />
          </div>

          <div className="col-span-1">
            <Field label={t('onb_vat')} name="vat" value={form.vat} onChange={handle} placeholder="IT01234567890" />
          </div>

          <div className="col-span-1">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{t('onb_sector')}</label>
            <select
              name="sector"
              value={form.sector}
              onChange={handle}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium appearance-none"
            >
              <option value="">{t('onb_select')}</option>
              {SECTORS.map(s => <option key={s.value} value={s.value}>{t(s.key)}</option>)}
            </select>
          </div>

          {error && <div className="col-span-2 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 py-5 rounded-2xl font-black text-white text-lg shadow-lg transition-all ${
              loading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100 hover:shadow-blue-200 active:scale-[0.98]'
            }`}
          >
            {loading ? t('onb_loading') : t('onb_cta')}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
      <input 
        type={type}
        name={name} 
        required
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder:text-slate-300" 
      />
    </div>
  );
}
