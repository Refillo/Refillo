const MOCK_DATA = {
  'auth/login': {
    user: { id: 'demo-user', name: 'Azienda Demo SPA', email: 'demo@refillo.it', org: { id: 'org-123', name: 'Azienda Demo SPA', sector: 'Manufacturing' } },
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
  'client-forms': [
    { id: 'f1', client_name: 'Stellantis', form_name: 'Supplier ESG Disclosure V3', status: 'ready', completion: 100, date: '22 May 2026' },
    { id: 'f2', client_name: 'Enel', form_name: 'Standard Procurement ESG', status: 'partial', completion: 65, date: '15 May 2026' },
    { id: 'f3', client_name: 'CDP', form_name: 'Supply Chain Questionnaire 2026', status: 'todo', completion: 0, date: '10 May 2026' }
  ],
  'sector-context': {
    sector_insight: "Il settore Manifatturiero in Italia è sotto forte pressione per il reporting Scope 3. I contractor automotive richiedono dati granulari sui consumi energetici e sull'origine delle materie prime.",
    vsme_standard: [
      { id: 'vsme_1', question: "Consumo totale di energia elettrica (MWh)", type: 'number', kpi: 'B3 - Energy', description: "Elettricità totale prelevata dalla rete, come riflesso nelle bollette delle utenze." },
      { id: 'vsme_2', question: "Consumo di carburanti/combustibili (MWh)", type: 'number', kpi: 'B3 - Energy', description: "Consumo di gas naturale, gasolio o altri combustibili per riscaldamento o processi." },
      { id: 'vsme_3', question: "L'impresa ha ottenuto informazioni sul breakdown energetico?", type: 'choice', options: ['Sì', 'No'], kpi: 'B3 - Energy', description: "Capacità di distinguere tra fonti rinnovabili e non rinnovabili." },
      { id: 'vsme_4', question: "Numero totale di dipendenti (FTE)", type: 'number', kpi: 'B8 - Workforce', description: "Media dei dipendenti durante il periodo di riferimento in termini di Full-time equivalent." },
      { id: 'vsme_5', question: "Ripartizione per genere: Uomini (%)", type: 'number', kpi: 'B8 - Workforce', description: "Percentuale di dipendenti di genere maschile sul totale." },
      { id: 'vsme_6', question: "L'impresa ha subito condanne o multe per corruzione?", type: 'choice', options: ['Sì', 'No'], kpi: 'B11 - Governance', description: "Eventuali sanzioni pecuniarie o condanne penali nel periodo di reporting." },
      { id: 'vsme_7', question: "Ricavi da attività in settori controversi (Armi, Tabacco, Fossili)?", type: 'choice', options: ['Sì', 'No'], kpi: 'C8 - Revenues', description: "Indica se l'azienda deriva ricavi dai settori esclusi dai benchmark EU." }
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
