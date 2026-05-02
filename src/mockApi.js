const MOCK_DATA = {
  'auth/login': {
    user: { id: 'demo-user', name: 'Azienda Demo SPA', email: 'demo@esglab.it', org: { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' } },
    token: 'mock-token-123'
  },
  'market-intelligence': {
    graph: {
      nodes: [
        { id: '1', name: 'Eni', sector: 'Energy' },
        { id: '2', name: 'Stellantis', sector: 'Automotive' },
        { id: '3', name: 'Ferrari', sector: 'Automotive' },
        { id: '4', name: 'Enel', sector: 'Energy' },
        { id: '5', name: 'Prada', sector: 'Retail & Fashion' }
      ],
      links: [
        { source: '1', target: '2' },
        { source: '4', target: '2' },
        { source: '4', target: '5' }
      ]
    },
    stats: [
      { name: 'Eni', emissions: 450 },
      { name: 'Stellantis', emissions: 320 },
      { name: 'Ferrari', emissions: 180 },
      { name: 'Enel', emissions: 410 },
      { name: 'Prada', emissions: 120 }
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
