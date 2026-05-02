import { callApi } from '../apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const DATA_POINTS = [
  { id: 1, label: 'CO2 Scope 1: 125t', color: 'bg-emerald-500' },
  { id: 2, label: 'ISO 14001: Valid', color: 'bg-blue-500' },
  { id: 3, label: 'Energy: 450MWh', color: 'bg-amber-500' },
  { id: 4, label: 'Waste: 12t recycled', color: 'bg-purple-500' },
  { id: 5, label: 'Gender Pay Gap: 2%', color: 'bg-rose-500' },
];

export default function AutoCompilerDemo() {
  const [activePoint, setActivePoint] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint(prev => (prev + 1) % DATA_POINTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] w-full bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      {/* Document Representation */}
      <motion.div 
        className="absolute left-12 top-1/2 -translate-y-1/2 w-48 h-64 bg-white rounded-xl shadow-2xl p-6 flex flex-col gap-4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-4 bg-slate-100 rounded"></div>
        <div className="w-3/4 h-3 bg-slate-50 rounded"></div>
        <div className="w-full h-3 bg-slate-50 rounded"></div>
        <div className="mt-4 space-y-2">
          <div className="w-full h-2 bg-slate-50 rounded"></div>
          <div className="w-5/6 h-2 bg-slate-50 rounded"></div>
          <div className="w-full h-2 bg-slate-100 rounded"></div>
        </div>
        {/* Scanning line */}
        <motion.div 
          className="absolute left-0 right-0 h-1 bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* AI Extraction Brain */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.div 
          className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(16,185,129,0.3)] z-10"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🧠
        </motion.div>
        <div className="mt-4 text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">Discovery Engine</div>
      </div>

      {/* Extracted Data Points */}
      <AnimatePresence>
        {DATA_POINTS.map((point, idx) => idx === activePoint && (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, x: -50, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              x: [-100, 0, 200], 
              y: [0, -50, 0],
              scale: [0.5, 1.2, 0.8] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full ${point.color} text-white text-xs font-black shadow-lg flex items-center gap-2 whitespace-nowrap`}
          >
            <span className="text-lg">✓</span> {point.label}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Destination: Multi-Standard Database & Rapid Forms */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-80 flex flex-col items-end justify-center perspective-1000">
        
        {/* Rapid Forms Stack */}
        <div className="relative w-48 h-64">
          {[
            { label: 'VSME', icon: '🇪🇺', color: 'emerald', delay: 0, progress: [20, 95, 20] },
            { label: 'EcoVadis', icon: '🏅', color: 'blue', delay: 1, progress: [10, 85, 10] },
            { label: 'CDP', icon: '🌍', color: 'cyan', delay: 2, progress: [5, 90, 5] },
            { label: 'Bank ESG', icon: '🏦', color: 'indigo', delay: 3, progress: [0, 100, 0] },
          ].map((form, i) => (
            <motion.div
              key={form.label}
              className={`absolute inset-0 bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 shadow-2xl flex flex-col gap-2`}
              style={{ 
                zIndex: 10 - i,
                transformStyle: 'preserve-3d'
              }}
              initial={{ x: 100, opacity: 0, rotateY: 45 }}
              animate={{ 
                x: i * 8, 
                y: i * 12,
                rotateY: 25,
                opacity: 1,
                scale: 1 - (i * 0.05)
              }}
              transition={{ duration: 1, delay: form.delay * 0.2 }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{form.icon}</span>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">{form.label}</span>
                </div>
                <motion.div 
                  animate={{ 
                    backgroundColor: ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.3)', 'rgba(16,185,129,0.1)'],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="px-2 py-0.5 rounded-full border border-emerald-500/30 text-[8px] text-emerald-400 font-bold"
                >
                  AUTO-FILL
                </motion.div>
              </div>
              
              <div className="space-y-3 mt-2">
                {[1, 2, 3].map(line => (
                  <div key={line} className="relative h-2 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      className={`absolute inset-y-0 left-0 bg-${form.color}-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]`}
                      animate={{ width: [`${form.progress[0]}%`, `${form.progress[1]}%`, `${form.progress[2]}%`] }}
                      transition={{ duration: 6, repeat: Infinity, delay: i * 0.8 + line * 0.2 }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-auto flex justify-between items-center opacity-40">
                <div className="w-12 h-2 bg-slate-700 rounded" />
                <div className="w-8 h-8 rounded-full border-2 border-slate-700 flex items-center justify-center text-[10px]">
                  {i + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-6 text-right pr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">One Vault, Infinite Forms</div>
          <div className="text-slate-500 text-[9px] font-medium">10x faster response time</div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-500 rounded-full"
          initial={{ 
            x: Math.random() * 800, 
            y: Math.random() * 400,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * 400],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
