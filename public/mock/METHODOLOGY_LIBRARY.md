# ESG-Flow: Methodology Library (v1.0)

Basata sullo standard **EFRAG VSME (Voluntary ESRS for SMEs)** e protocollo GHG.

## 1. Calcolo Emissioni Scope 1 (Emissioni Dirette)

### 1.1 Combustione Stazionaria (Caldaie, Riscaldamento)
*   **Formula:** `Consumo [Unità] * Fattore di Emissione [kgCO2e/Unità] = Totale kgCO2e`
*   **Fonti Fattori:** ISPRA (Tabella coefficienti nazionali).
*   **Unità:** Metri cubi (m3) per Gas Naturale.

### 1.2 Combustione Mobile (Flotta Aziendale)
*   **Formula:** `Litri Carburante * Fattore di Emissione [kgCO2e/L] = Totale kgCO2e`
*   **Variante:** Se il dato è in km, usare il fattore medio per categoria di veicolo (es. Small Diesel Car).

## 2. Calcolo Emissioni Scope 2 (Energia Acquistata)

### 2.1 Location-based Method
*   **Definizione:** Riflette l'intensità media delle emissioni delle reti in cui avviene il consumo.
*   **Dato richiesto:** Consumo Totale kWh.
*   **Fattore:** Media nazionale rete elettrica.

### 2.2 Market-based Method
*   **Definizione:** Riflette le emissioni derivanti dall'elettricità che le aziende hanno scelto specificamente.
*   **Dato richiesto:** kWh da fonti rinnovabili certificate (GO - Garanzia d'Origine).
*   **Calcolo:** `(kWh Totali - kWh Rinnovabili) * Fattore Mix Residuo`.

## 3. Metodologia di Mapping (Semantic Alignment)

Ogni KPI estratto dai bilanci delle Big Corp viene classificato con:
*   **Tag Normativo:** (es. `ESRS-E1-1`)
*   **Unità di Misura Attesa:** (es. `tCO2e`)
*   **Livello di Granularità:** (Aziendale, Sito produttivo, Prodotto).
