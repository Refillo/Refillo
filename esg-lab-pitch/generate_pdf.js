import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Impostiamo il viewport a 16:9
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
  
  console.log('Navigazione verso la pagina di stampa...');
  await page.goto('http://localhost:8081/print', { waitUntil: 'networkidle2' });
  
  // Aspettiamo che le slide siano renderizzate
  await page.waitForSelector('.print-slide-container');
  
  console.log('Generazione PDF in corso...');
  await page.pdf({
    path: 'presentazione_esglab.pdf',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log('PDF generato con successo: presentazione_esglab.pdf');
})();
