# U.S. Arce 1932 — sito ufficiale

Questa versione è un restyling evoluto della base Next.js ricevuta da v0.

## Avvio in locale

Richiede Node.js e pnpm.

```bash
pnpm install
pnpm dev
```

Aprire `http://localhost:3000`.

## Pubblicazione su Vercel

1. Caricare il contenuto di questa cartella nel repository GitHub collegato al progetto Vercel.
2. Verificare che il progetto usi il comando di build `pnpm build`.
3. Lasciare a Vercel il rilevamento automatico di Next.js.
4. Pubblicare e controllare homepage, menu mobile e collegamenti interni.

## Immagini da sostituire prima del lancio ufficiale

Le immagini `hero-stadium.png`, `news-1.png`, `news-2.png`, `news-3.png`, `prima-squadra.png` e `settore-giovanile.png` presenti nel progetto originale sono immagini dimostrative/generiche. Per la pubblicazione definitiva è consigliato sostituirle con fotografie autorizzate dell'impianto, della prima squadra e del settore giovanile dell'U.S. Arce.

Il logo `logo-usarce.jpg` è stato mantenuto dalla cartella originale.

## Dati societari da verificare e completare

Non sono stati reinseriti i dati dimostrativi presenti nella versione ricevuta (risultati, marcatori, nomi di sponsor, recapiti, indirizzi puntuali, partita successiva e dati fiscali). Prima della pubblicazione vanno aggiunti solo dopo conferma della società.

## Gestione contenuti — fase successiva

Questa consegna aggiorna grafica, struttura responsive e contenuti dimostrativi. Non include ancora un pannello amministrativo con salvataggio online: per renderlo realmente gestibile da smartphone serve collegare un CMS/database (ad esempio Supabase) e configurare autenticazione, archivio news, rose, calendario, sponsor e archivio immagini. Le chiavi e l'account amministratore dovranno essere creati dal titolare della società e configurati come variabili d'ambiente su Vercel; non inserire password o chiavi private nei file pubblici.

## Configurazione area amministrativa `/admin`

L'area amministrativa è collegata al repository GitHub: quando salvi le modifiche, il sistema aggiorna `content/site-content.json` con un commit e Vercel avvia una nuova distribuzione.

Per attivarla:

1. Pubblica questa versione nel repository GitHub collegato al progetto Vercel.
2. In GitHub crea un **Fine-grained personal access token**, limitato al solo repository del sito e con permesso `Contents: Read and write`. Non usare un token con accesso a tutti i repository.
3. In Vercel apri **Project → Settings → Environment Variables** e aggiungi le variabili presenti in `.env.example`:
   - `ADMIN_PASSWORD`: password lunga e unica per l'area riservata.
   - `ADMIN_SESSION_SECRET`: segreto casuale di almeno 32 caratteri.
   - `GITHUB_TOKEN`: token GitHub con accesso in scrittura al solo repository del sito.
   - `GITHUB_OWNER`: nome dell'account o dell'organizzazione proprietaria del repository.
   - `GITHUB_REPO`: nome del repository.
   - `GITHUB_BRANCH`: branch di pubblicazione (normalmente `main`).
4. Salva le variabili e fai un nuovo deploy.
5. Apri `https://TUO-DOMINIO/admin` e accedi con `ADMIN_PASSWORD`.

L'area riservata consente di modificare notizie, partite/risultati, sponsor e recapiti. Per le foto, usa il caricamento direttamente nell’area riservata (JPG, PNG o WEBP fino a 4 MB); il percorso viene inserito automaticamente nella scheda.

**Sicurezza:** non inserire mai `GITHUB_TOKEN`, password o `ADMIN_SESSION_SECRET` nel codice, nei file pubblici o in `NEXT_PUBLIC_*`. Devono esistere soltanto come variabili d'ambiente server-side su Vercel. Se un token viene esposto, revocalo da GitHub e creane uno nuovo.
