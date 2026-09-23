# Regola di Aggiornamento Metadati Portfolio

## Aggiornamento di dateModified, copyrightYear e Sitemap
Ogni volta che viene effettuata una modifica a `index.html` (struttura, testi, metadati, stili o script collegati):
1. **Aggiorna SEMPRE il campo `dateModified`** nel JSON-LD Schema.org (`ProfilePage`) con la data e ora corrente nel formato ISO 8601 (es. `YYYY-MM-DDTHH:MM:SS+02:00`).
2. **Aggiorna SEMPRE il campo `copyrightYear`** nel JSON-LD Schema.org (`WebSite`) con l'anno solare corrente (es. `2026`).
3. **Aggiorna il tag `<lastmod>` in `sitemap.xml`** con la data odierna nel formato `YYYY-MM-DD`.
4. **Sincronizza sempre con `llms.txt`** applicando scrupolosamente la regola `cross_file_consistency.md`.
