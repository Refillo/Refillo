import { motion } from 'framer-motion';

export default function TerminalWindow({ children, title = "refillo.sh", className = "" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-2xl shadow-slate-200/50 ${className}`}
    >
      {/* Terminal Header - Clean Light */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-200"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-slate-200"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-slate-200"></div>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] font-mono">{title}</div>
        <div className="w-10"></div>
      </div>

      {/* Terminal Body */}
      <div className="relative p-1">
        {children}
      </div>
    </motion.div>
  );
}
