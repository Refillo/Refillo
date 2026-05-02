import { callApi } from '../apiClient';
const API = ''; // Mock API constant
import ForceGraph2D from 'react-force-graph-2d';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';

const SECTOR_COLORS = {
  'Automotive': '#10b981', // Emerald 500
  'Energy': '#059669',     // Emerald 600
  'Retail & Fashion': '#34d399', // Emerald 400
  'General': '#94a3b8'     // Slate 400
};

export default function MarketGraph({ data }) {
  const containerRef = useRef();
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 || 500 });
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedNode, setHighlightedNode] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (containerRef.current) {
        width: containerRef.current.clientWidth,
        height: 500 || 500
      });
    }
    
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-120); 
      fgRef.current.d3Force('link').distance(40);    
      
      import('d3-force').then(d3 => {
        fgRef.current.d3Force('collision', d3.forceCollide(node => 28)); 
        fgRef.current.d3Force('x', d3.forceX(dimensions.width / 2).strength(0.2));
        fgRef.current.d3Force('y', d3.forceY(dimensions.height / 2).strength(0.2));
      });
    }

    const jitterInterval = setInterval(() => {
      if (data && data.nodes) {
        data.nodes.forEach(node => {
          node.vx = (node.vx || 0) + (Math.random() - 0.5) * 0.05;
          node.vy = (node.vy || 0) + (Math.random() - 0.5) * 0.05;
        });
      }
    }, 120);

    return () => clearInterval(jitterInterval);
  }, [data]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.length < 2) { setHighlightedNode(null); return; }

    const node = data.nodes.find(n => n.name.toLowerCase().includes(val.toLowerCase()));
    if (node && fgRef.current) {
      setHighlightedNode(node.id);
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(2.2, 1000);
    }
  };

  if (!data || !data.nodes) return null;

  return (
    <div ref={containerRef} className="w-full overflow-hidden relative py-12">
      <div className="absolute top-0 left-0 z-10">
        <h3 className="text-slate-900 font-black text-2xl tracking-tight">{t('market_graph_title')}</h3>
        <p className="text-slate-400 text-sm mt-1 font-medium">{t('market_graph_sub')}</p>
      </div>

      <div className="absolute top-0 right-0 z-20 w-72">
        <div className="relative group">
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t('market_graph_search')}
            className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold transition-all"
          />
        </div>
      </div>
      
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#f8fafc"
        
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        
        nodeColor={node => {
          if (highlightedNode && node.id === highlightedNode) return '#059669';
          return SECTOR_COLORS[node.sector] || SECTOR_COLORS.General;
        }}
        nodeRelSize={6}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.003}
        linkColor={() => 'rgba(16, 185, 129, 0.1)'}
        
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          const isHighlighted = highlightedNode && node.id === highlightedNode;

          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = isHighlighted ? '#059669' : (SECTOR_COLORS[node.sector] || SECTOR_COLORS.General);
          ctx.fill();
          
          if (isHighlighted) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2 / globalScale;
            ctx.stroke();
          }

          if (globalScale > 0.8 || isHighlighted) {
            ctx.font = `${isHighlighted ? '700' : '600'} ${fontSize}px Inter, sans-serif`;
            const textWidth = ctx.measureText(label).width;
            ctx.fillStyle = 'rgba(248, 250, 252, 0.7)';
            ctx.fillRect(node.x - textWidth / 2 - 2, node.y + 7, textWidth + 4, fontSize + 2);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = isHighlighted ? '#059669' : '#334155';
            ctx.fillText(label, node.x, node.y + 8);
          }
        }}
      />
    </div>
  );
}
