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
  ],
  'sector-context': {
    sector_insight: "Il settore Manifatturiero in Italia è sotto forte pressione per il reporting Scope 3. I contractor automotive richiedono dati granulari sui consumi energetici e sull'origine delle materie prime.",
    vsme_standard: [
      { id: 'vsme_1', question: "Consumo totale di energia elettrica (kWh)", type: 'number', kpi: 'ESRS E1-5', description: "Somma di tutti i prelievi da rete e auto-consumo da fonti rinnovabili." },
      { id: 'vsme_2', question: "Consumo di gas naturale (Smc)", type: 'number', kpi: 'ESRS E1-5', description: "Consumo per riscaldamento o processi industriali." },
      { id: 'vsme_pol_1', question: "L'azienda ha adottato una politica ambientale formale?", type: 'choice', options: ['Sì', 'In fase di approvazione', 'No'], kpi: 'ESRS E1-1', description: "Documento firmato dalla direzione che definisce l'impegno verso la sostenibilità." },
      { id: 'vsme_pol_2', question: "È presente un Codice Etico o di Condotta?", type: 'choice', options: ['Sì', 'In fase di stesura', 'No'], kpi: 'ESRS G1-1', description: "Regole di comportamento per dipendenti e fornitori riguardo corruzione e diritti umani." },
      { id: 'vsme_soc_1', question: "Esistono procedure per la salute e sicurezza sul lavoro?", type: 'choice', options: ['Sì (Certificate)', 'Sì (Interne)', 'No'], kpi: 'ESRS S1-1', description: "Oltre agli obblighi di legge, l'azienda monitora proattivamente i rischi?" },
      { id: 'vsme_3', question: "Consumo idrico totale (m3)", type: 'number', kpi: 'ESRS E3-1', description: "Prelievi da acquedotto o pozzi certificati." },
      { id: 'vsme_4', question: "Produzione totale di rifiuti (kg)", type: 'number', kpi: 'ESRS E5-5', description: "Totale dei rifiuti pericolosi e non pericolosi prodotti nel periodo." }
    ],
    corporate_extras: [
      { code: 'ext_1', kpi: 'Packaging Recycling', description: "Richiesto da Stellantis per i fornitori di componenti plastici." },
      { code: 'ext_2', kpi: 'Social Policy', description: "Richiesto da Eni per la qualifica vendor." }
    ]
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
    json: async () => ({ status: 'success', data: [] })
  };
};
