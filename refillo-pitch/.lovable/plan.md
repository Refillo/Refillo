## Aggiungere riferimento al financial report nella slide 10 (Business model)

La slide 10 (`Slide08Business.tsx`) contiene già due card affiancate (Operating costs / Total estimated costs) e i 3 tier di prezzo. Lo spazio disponibile per inserire un suggerimento al lettore è sotto le due card, a piè di slide, prima della chiusura di `SlideShell`.

### Modifica

In `src/components/deck/slides/Slide08Business.tsx`, dopo la chiusura del `<div className="pt-6 grid grid-cols-2 gap-6">` (riga 100), aggiungere una riga finale full-width con stile coerente al resto del deck:

```tsx
<p className="mt-4 text-center text-[11px] italic text-muted-foreground">
  See the attached financial report for the full breakdown and assumptions.
</p>
```

### Note di stile
- Stesso font/size/italic dei footnote già presenti nelle card (`text-[11px] italic text-muted-foreground`), così risulta visivamente coerente.
- Centrato sotto le due colonne, senza box, per non competere con i contenuti principali.
- In inglese, in linea con la lingua della slide.

Nessun altro file viene modificato.