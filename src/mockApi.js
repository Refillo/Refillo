const MOCK_DATA = {
  'auth/login': {
    user: { id: 'demo-user', name: 'Azienda Demo SPA', email: 'demo@esglab.it', org: { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' } },
    token: 'mock-token-123'
  },
  'market-intelligence': [
    { name: 'Eni', emissions: 450, score: 'A' },
    { name: 'Stellantis', emissions: 320, score: 'B+' },
    { name: 'Ferrari', emissions: 180, score: 'A-' }
  ],
  'kpis': {
    ghg_intensity: 1.2,
    energy_efficiency: 0.85,
    waste_reduction: 0.15,
    social_score: 88
  }
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
    json: async () => ({ status: 'success', data: {} })
  };
};
