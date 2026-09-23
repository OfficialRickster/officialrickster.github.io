# Regola di Consistenza e Sincronizzazione Cross-File

## 1. Sincronizzazione Bidirezionale Obbligatoria (index.html <-> llms.txt)
Ogni nuova modifica o informazione deve essere verificata e sincronizzata in tutto il progetto:
- Tutte le modifiche apportate a `index.html` (struttura, bio, ruoli, progetti, date, abilità, link social `rel="me"`, Schema.org JSON-LD) devono rispecchiarsi fedelmente in `llms.txt`.
- Viceversa, qualsiasi nuova informazione o aggiornamento introdotto in `llms.txt` deve essere riflesso coerentemente dentro `index.html`.
- La consistenza deve estendersi sempre anche a `sitemap.xml` (aggiornamento `<lastmod>`), al JSON-LD `dateModified`, e alla query di cache-busting degli asset in caso di modifiche correlate.

## 2. Gestione Informazioni Contrastanti (Interpello Diretto dell'Utente)
Nel caso in cui vi siano informazioni contrastanti, incoerenti o dubbie tra diversi file o tra nuove richieste e dati preesistenti:
- Chiedi **SEMPRE** all'utente cosa tenere, modificare o togliere prima di applicare modifiche arbitrarie.
- **MAI fare di testa propria** in presenza di dati discordanti, a meno di esplicita contraria indicazione dell'utente.
