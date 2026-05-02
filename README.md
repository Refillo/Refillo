# ESGlab Static Demo

Questa è una versione demo statica di ESGlab, configurata per funzionare senza un backend attivo.
Ideale per il deployment su **GitHub Pages**.

## Funzionamento
Il sistema utilizza un `apiClient.js` che intercetta le chiamate e restituisce dati finti (mock) definiti in `mockApi.js`.

## Come visualizzarlo localmente
1. `npm install`
2. `npm run dev`

## Deployment su GitHub Pages
1. Assicurati che `vite.config.js` abbia il `base` corretto (es: `/esglab-demo/`).
2. `npm run build`
3. Carica il contenuto della cartella `dist` sul branch `gh-pages`.
