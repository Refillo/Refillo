import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const DATA_POINTS = [
  { id: 1, label: 'CO2 Scope 1: 125t', color: 'bg-blue-500' },
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
    <div className="relative h-[450px] w-full bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">
      {/* Background Grid - Very Subtle */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Header-like bar */}
      <div className="absolute top-0 left-0 right-0 h-12 border-b border-slate-50 flex items-center px-6 justify-between bg-slate-50/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refillo Auto-Compiler Engine</div>
      </div>

      {/* Document Representation - Clean and Light */}
      <motion.div 
        className="absolute left-12 top-1/2 -translate-y-1/2 w-48 h-64 bg-slate-50 rounded-lg border border-slate-100 p-6 flex flex-col gap-4 shadow-sm"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-3 bg-slate-200 rounded"></div>
        <div className="w-3/4 h-2 bg-slate-100 rounded"></div>
        <div className="w-full h-2 bg-slate-100 rounded"></div>
        <div className="mt-4 space-y-2">
          <div className="w-full h-1.5 bg-slate-100 rounded"></div>
          <div className="w-5/6 h-1.5 bg-slate-100 rounded"></div>
          <div className="w-full h-1.5 bg-slate-200 rounded"></div>
        </div>
        {/* Scanning line - Thin and elegant */}
        <motion.div 
          className="absolute left-0 right-0 h-[1px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* AI Extraction Brain - Minimalist Icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.div 
          className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl shadow-xl z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-blue-400">✧</span>
        </motion.div>
        <div className="mt-4 text-slate-900 font-black text-[10px] uppercase tracking-[0.3em]">AI Engine</div>
      </div>

      {/* Extracted Data Points - Styled like the chart labels */}
      <AnimatePresence>
        {DATA_POINTS.map((point, idx) => idx === activePoint && (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              x: [-80, 0, 150], 
              y: [20, -30, 0],
              scale: [0.9, 1, 0.9] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-white border border-slate-100 text-slate-900 text-[11px] font-bold shadow-lg flex items-center gap-3 whitespace-nowrap"
          >
            <div className={`w-2 h-2 rounded-full ${point.color}`}></div>
            {point.label}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Destination: Multi-Standard Forms - Minimalist Stack */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-80 flex flex-col items-end justify-center">
        
        <div className="relative w-48 h-64">
          {[
            { label: 'VSME', color: 'bg-slate-900', text: 'text-white', delay: 0 },
            { label: 'EcoVadis', color: 'bg-blue-600', text: 'text-white', delay: 1 },
            { label: 'Enel Portal', color: 'bg-teal-500', text: 'text-white', delay: 2 },
          ].map((form, i) => (
            <motion.div
              key={form.label}
              className={`absolute inset-0 ${form.color} rounded-xl p-4 shadow-xl flex flex-col gap-2`}
              style={{ zIndex: 10 - i }}
              initial={{ x: 30, opacity: 0 }}
              animate={{ 
                x: i * 10, 
                y: i * 14,
                opacity: 1,
                scale: 1 - (i * 0.05)
              }}
              transition={{ duration: 1, delay: form.delay * 0.2 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[9px] font-black ${form.text} uppercase tracking-widest`}>{form.label}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></div>
              </div>
              
              <div className="space-y-2 mt-1">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white/40" animate={{ width: ['20%', '90%', '20%'] }} transition={{ duration: 6, repeat: Infinity, delay: i * 0.5 }} />
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white/40" animate={{ width: ['40%', '85%', '40%'] }} transition={{ duration: 6, repeat: Infinity, delay: i * 0.7 }} />
                </div>
              </div>

              <div className="mt-auto flex justify-end">
                <div className="px-2 py-0.5 rounded bg-white/10 text-[7px] font-bold text-white uppercase tracking-tighter">Auto-Fill Ready</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-right pr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-slate-900 font-black text-[10px] uppercase tracking-[0.2em]">Universal Mapping</div>
          <div className="text-slate-400 text-[9px] font-bold mt-1 tracking-tight">Cost Reduction • Efficiency • Speed</div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500 rounded-full"
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
