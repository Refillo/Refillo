const MOCK_DATA = {
  'auth/login': {
    user: { id: 'demo-user', name: 'Azienda Demo SPA', email: 'demo@esglab.it', org: { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' } },
    token: 'mock-token-123'
  },
  'market-intelligence': {
    graph: {
      nodes: [
        { id: '1', name: 'Stellantis', sector: 'Automotive' },
        { id: '2', name: 'Ferrari', sector: 'Automotive' },
        { id: '3', name: 'Iveco Group', sector: 'Automotive' },
        { id: '4', name: 'Mercedes-Benz Italia', sector: 'Automotive' },
        { id: '5', name: 'BMW Italia', sector: 'Automotive' },
        { id: '6', name: 'Prada', sector: 'Retail & Fashion' },
        { id: '7', name: 'LVMH Italia', sector: 'Retail & Fashion' },
        { id: '8', name: 'Kering Italia', sector: 'Retail & Fashion' },
        { id: '9', name: 'Moncler', sector: 'Retail & Fashion' },
        { id: '10', name: 'Brunello Cucinelli', sector: 'Retail & Fashion' },
        { id: '11', name: 'Barilla', sector: 'Alimentare' },
        { id: '12', name: 'Ferrero', sector: 'Alimentare' },
        { id: '13', name: 'Nestlé Italia', sector: 'Alimentare' },
        { id: '14', name: 'Danone Italia', sector: 'Alimentare' },
        { id: '15', name: 'Esselunga', sector: 'Alimentare' },
        { id: '16', name: 'Eni', sector: 'Energy' },
        { id: '17', name: 'Chiesi Farmaceutici', sector: 'Energy' },
        { id: '18', name: 'Menarini', sector: 'Energy' },
        { id: '19', name: 'Leonardo', sector: 'Aerospace & Defence' },
        { id: '20', name: 'Enel', sector: 'Energy' }
      ],
      links: [
        // Automotive Cluster
        { source: '1', target: '2' }, { source: '1', target: '3' }, { source: '4', target: '5' },
        // Fashion Cluster
        { source: '6', target: '7' }, { source: '6', target: '8' }, { source: '9', target: '10' },
        // Food Cluster
        { source: '11', target: '12' }, { source: '12', target: '13' }, { source: '14', target: '15' },
        // Energy/Pharma Cluster (as per seed)
        { source: '16', target: '20' }, { source: '17', target: '18' }, { source: '16', target: '17' },
        // Cross-sector ecosystem links
        { source: '16', target: '1' }, // Eni provides to Stellantis
        { source: '20', target: '6' }, // Enel provides to Prada
        { source: '20', target: '11' }, // Enel provides to Barilla
        { source: '19', target: '1' }  // Leonardo/Stellantis engineering
      ]
    },
    stats: [
      { name: 'Automotive', emissions: 840 },
      { name: 'Energy', emissions: 1250 },
      { name: 'Retail', emissions: 310 },
      { name: 'Food', emissions: 520 },
      { name: 'Pharma', emissions: 410 }
    ]
  },
  'kpis': [
    { id: 'k1', data_type: 'Electricity', scope: 2, quantity: 1240, unit: 'kWh', period: '2025', confidence: 0.95 },
    { id: 'k2', data_type: 'Natural Gas', scope: 1, quantity: 850, unit: 'm3', period: '2025', confidence: 0.92 }
  ],
  'organizations': [
     { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' }
  ]
};

export const apiFetch = async (path, options = {}) => {
  console.log(`[Mock API] Calling: ${path}`);
  
  // Simulate network delay
  await new Promise(r => setTimeout(r, 500));

  // Find matching mock data
  const endpoint = Object.keys(MOCK_DATA).find(key => path.includes(key));
  
  if (endpoint) {
    return {
      ok: true,
      json: async () => MOCK_DATA[endpoint]
    };
  }

  // Fallback for unhandled endpoints
  return {
    ok: true,
    json: async () => ({ status: 'success', data: [] })
  };
};
