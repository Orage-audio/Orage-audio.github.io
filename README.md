# Orage Audio — EVOLVER Overdrive (Aluminum Edition)

Sito vetrina ufficiale bilingue (**IT / EN**) per il saturatore analogico stereo 1U **Orage EVOLVER Overdrive** (versione con scocca in alluminio).

## Comandi rapidi

```bash
npm install      # Installa le dipendenze
npm run dev      # Avvia anteprima locale (hot reload)
npm run build    # Genera la build statica in dist/
npm run preview  # Anteprima della build di produzione
```

## Come aggiungere gli audio A/B (Sound Lab) quando sono pronti

1. Esporta le coppie `Dry` e `Wet` (allineate al campione, stesso volume percepito) in formato `.mp3` (320 kbps) dentro `public/audio/`:
   - `public/audio/drums-dry.mp3` e `public/audio/drums-wet.mp3`
   - `public/audio/bass-dry.mp3` e `public/audio/bass-wet.mp3`
   - `public/audio/synth-dry.mp3` e `public/audio/synth-wet.mp3`
   - `public/audio/mixbus-dry.mp3` e `public/audio/mixbus-wet.mp3`
2. Apri `src/data/audioDemos.ts` e cambia:
   ```ts
   export const AUDIO_LAB_ENABLED = true;
   ```
3. Fai `git push`: il player A/B con switch istantaneo **BYPASS / EVOLVER** e VU meter L/R animati si attiverà automaticamente.

## Pubblicazione su GitHub Pages (`orageaudio`)

Il repository include già `.github/workflows/deploy.yml` e `base: './'` in `vite.config.ts`.

1. Crea un repository pubblico sul tuo account GitHub `orageaudio` (es. `evolver` oppure `orageaudio.github.io`).
2. Da questa cartella esegui:
   ```bash
   git init
   git add .
   git commit -m "Initial Orage EVOLVER Aluminum Edition site"
   git branch -M main
   git remote add origin https://github.com/orageaudio/evolver.git
   git push -u origin main
   ```
3. Su GitHub → **Settings → Pages → Build and deployment → Source**: seleziona **GitHub Actions**.
4. Dopo ~60 secondi il sito sarà online su `https://orageaudio.github.io/evolver/` (o sul tuo dominio personalizzato).
