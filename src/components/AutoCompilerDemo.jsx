export default function AutoCompilerDemo() {
  const [activePoint, setActivePoint] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint(prev => (prev + 1) % DATA_POINTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[480px] w-full bg-white rounded-[2rem] overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      {/* Top Header - Clean Light */}
      <div className="absolute top-0 left-0 right-0 h-14 border-b border-slate-100 flex items-center px-8 justify-between bg-slate-50/30 backdrop-blur-md">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Refillo Processing Core v2.0</div>
      </div>

      {/* Document Representation - Ultra Clean Light */}
      <motion.div 
        className="absolute left-16 top-1/2 -translate-y-1/2 w-56 h-72 bg-white rounded-2xl border border-slate-100 p-8 flex flex-col gap-5 shadow-sm"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-4 bg-slate-100 rounded-sm"></div>
        <div className="w-4/5 h-3 bg-slate-50 rounded-sm"></div>
        <div className="w-full h-3 bg-slate-50 rounded-sm"></div>
        <div className="mt-8 space-y-3">
          <div className="w-full h-2 bg-slate-50 rounded-sm"></div>
          <div className="w-11/12 h-2 bg-slate-50 rounded-sm"></div>
          <div className="w-full h-2 bg-slate-100 rounded-sm"></div>
        </div>
        {/* Elegant Emerald Scanning line */}
        <motion.div 
          className="absolute left-0 right-0 h-[1.5px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20"
          animate={{ top: ['15%', '85%', '15%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* AI Extraction Node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.div 
          className="w-24 h-24 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-center text-4xl shadow-2xl z-10"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-emerald-600 font-black">R</span>
        </motion.div>
        <div className="mt-8 text-slate-900 font-black text-[11px] uppercase tracking-[0.5em]">Processing...</div>
      </div>

      {/* Data Transmission Particles */}
      <AnimatePresence>
        {DATA_POINTS.map((point, idx) => idx === activePoint && (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, scale: 0.5, x: -100 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              x: [-120, 0, 180], 
              y: [20, -60, 0],
              scale: [0.8, 1.1, 0.8] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "anticipate" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-2xl bg-white border border-slate-100 text-slate-900 text-[12px] font-black shadow-xl flex items-center gap-4 whitespace-nowrap z-30"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
            {point.label}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Destination Forms - Modern Light Stack */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 w-72 h-[320px] flex flex-col items-end justify-center">
        
        <div className="relative w-56 h-72">
          {[
            { label: 'Standard ESRS', color: 'bg-white', border: 'border-slate-100', delay: 0 },
            { label: 'EcoVadis V3', color: 'bg-slate-50', border: 'border-emerald-100', delay: 1 },
            { label: 'Enterprise Portal', color: 'bg-slate-900', border: 'border-slate-800', text: 'text-white', delay: 2 },
          ].map((form, i) => (
            <motion.div
              key={form.label}
              className={`absolute inset-0 ${form.color} rounded-2xl p-6 shadow-2xl border ${form.border} flex flex-col gap-3`}
              style={{ zIndex: 10 - i }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ 
                x: i * 12, 
                y: i * 16,
                opacity: 1,
                scale: 1 - (i * 0.04)
              }}
              transition={{ duration: 0.8, delay: form.delay * 0.2 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-black ${form.text || 'text-slate-900'} uppercase tracking-widest`}>{form.label}</span>
                <div className={`w-2 h-2 rounded-full ${form.text ? 'bg-emerald-500' : 'bg-slate-200'} animate-pulse`}></div>
              </div>
              
              <div className="space-y-3 mt-2">
                <div className={`h-1 ${form.text ? 'bg-white/10' : 'bg-slate-100'} rounded-full overflow-hidden`}>
                  <motion.div className={`h-full ${form.text ? 'bg-emerald-500/40' : 'bg-emerald-500/30'}`} animate={{ width: ['10%', '95%', '10%'] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }} />
                </div>
                <div className={`h-1 ${form.text ? 'bg-white/10' : 'bg-slate-100'} rounded-full overflow-hidden`}>
                  <motion.div className={`h-full ${form.text ? 'bg-emerald-500/40' : 'bg-emerald-500/30'}`} animate={{ width: ['30%', '80%', '30%'] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.6 }} />
                </div>
              </div>

              <div className="mt-auto flex justify-end">
                <div className={`px-3 py-1 rounded-lg ${form.text ? 'bg-white/5' : 'bg-slate-50'} text-[8px] font-black ${form.text ? 'text-emerald-500' : 'text-slate-400'} uppercase tracking-[0.2em]`}>Ready to Submit</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-right pr-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-slate-900 font-black text-[11px] uppercase tracking-[0.6em]">Zero Friction</div>
          <div className="text-slate-400 text-[10px] font-bold mt-2">Enterprise-Grade Automation</div>
        </motion.div>
      </div>

      {/* Floating Particles - Very Subtle */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-500/20 rounded-full"
          initial={{ 
            x: Math.random() * 1000, 
            y: Math.random() * 500,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * 500],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: Math.random() * 8 + 4, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}