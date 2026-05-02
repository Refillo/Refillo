import { callApi } from './apiClient';
const API = ''; // Mock API constant
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';



export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();


  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('password', form.password);

      const response = await callApi(`/auth/login`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('esg_token', data.access_token);
        navigate('/pmi/dashboard', { state: { org: data.org } });
      } else {
        setError(data.detail || 'Email o password non corretti.');
      }
    } catch (err) {
      setError('Errore di connessione al server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="absolute top-8 left-8 flex items-center gap-4 z-50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors"
        >
          {t('login_back')}
        </button>
        <button 
          onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-slate-100 text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase shadow-sm"
        >
          {lang}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
            className="inline-block bg-emerald-600 text-white font-black px-5 py-2.5 rounded-2xl text-2xl mb-6 shadow-xl shadow-emerald-100"
          >
            ESG
          </motion.div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">{t('login_welcome')}</h1>
          <p className="text-slate-500 font-medium">{t('login_sub')}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
              {t('login_email')}
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleInput}
              placeholder="admin@azienda.it"
              className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 font-bold placeholder:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
              {t('login_pass')}
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleInput}
              placeholder="••••••••"
              className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 font-bold placeholder:text-slate-300"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black text-white shadow-xl transition-all ${
              loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 hover:shadow-emerald-200 active:scale-[0.98]'
            }`}
          >
            {loading ? '...' : t('login_cta')}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-400 font-bold">
            {t('login_no_account')}{' '}
            <button 
              onClick={() => navigate('/pmi')}
              className="text-emerald-600 font-black hover:underline ml-1"
            >
              {t('nav_register')}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
