# Regola di Pulizia del Codice e Ottimizzazione

## 1. Pulizia Assoluta del Codice (Zero Righe Vuote e Zero Commenti)
Ogni volta che viene modificato, creato o aggiornato qualsiasi file del progetto (HTML, CSS, JS, SVG, XML, ecc.):
- **Niente righe vuote**: eliminare tassativamente qualsiasi riga vuota o spaziatura superflua tra tag, blocchi, sezioni o istruzioni.
- **Niente commenti**: rimuovere completamente ogni tipo di commento (`<!-- ... -->`, `/* ... */`, `// ...`), ad eccezione di copyright legali obbligatori in file SVG/esterni se richiesti. Il codice deve essere pulito al 100%, compatto e autoesplicativo.

## 2. Rispetto Rigoroso delle Best Practice
- Rispettare sempre gli standard del settore (W3C, MDN, Schema.org, Google Web Vitals) a meno di esplicita contraria istruzione dell'utente.
- Mantenere la massima semantica HTML5 (`header`, `main`, `section`, `nav`, `footer`, unico `h1` per pagina).

## 3. Ordinamento Ottimale per Browser, SEO e Motori di Ricerca
- **Critical Rendering Path nel `<head>`**:
  1. `meta` essenziali (`charset`, `viewport`, `title`, `description`, `canonical`, `theme-color`, `robots`, `geo`).
  2. Risorse critiche in cima: `preconnect`, `dns-prefetch`, `preload` font/stili, foglio di stile `style.css` (con query string di versione per cache-busting), script con `defer`/`async`.
  3. PWA & icone (`apple-mobile-web-app-*`, `manifest`, favicons).
  4. Discovery & Verifiche (`sitemap` assoluto, verification meta).
  5. Open Graph & Twitter Cards (con `og:image:secure_url`).
  6. Collegamenti identità autore (`rel="me"`).
  7. Dati strutturati JSON-LD Schema.org posizionati a chiusura del `<head>`.
- **CSS**: raggruppamento logico senza ridondanze né selettori duplicati.

## 4. Check e Ottimizzazioni Obbligatorie
- **Prevenzione CLS (Cumulative Layout Shift)**: dichiarare sempre `width` e `height` (e `aspect-ratio` nel CSS) su immagini, logo e iframe.
- **Cache-Busting**: ad ogni modifica di stile o logica, incrementare la query di versione (es. `style.css?v=X.Y`).
- **Verifica Sintattica**: assicurarsi che non vi siano tag HTML non chiusi o parentesi graffe CSS/JS sbilanciate.
- **Aggiornamento Metadati**: applicare contestualmente la regola `portfolio_updates.md` (`dateModified`, `copyrightYear`, `sitemap.xml`).
