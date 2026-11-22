/**
 * Configurazione del Sound Lab A/B (Dry vs Wet).
 *
 * COME ATTIVARE GLI AUDIO QUANDO SONO PRONTI:
 * 1. Metti i file .mp3 (es. 320kbps) o .wav nella cartella `public/audio/`
 *    es: `public/audio/drums-dry.mp3` e `public/audio/drums-wet.mp3`
 * 2. Imposta `AUDIO_LAB_ENABLED = true`
 * 3. Inserisci i percorsi relativi nei campi `dryUrl` e `wetUrl` qui sotto.
 *
 * Il player Web Audio API caricherà automaticamente le tracce sincronizzate
 * con switch istantaneo BYPASS / EVOLVER e VU Meter L/R reattivi al segnale!
 */

export const AUDIO_LAB_ENABLED = false;

export interface AudioDemoTrack {
  id: string;
  dryUrl: string;
  wetUrl: string;
  driveSetting: string;
  evolveActive: boolean;
  mixSetting: string;
}

export const audioDemoTracks: AudioDemoTrack[] = [
  {
    id: 'drums',
    dryUrl: './audio/drums-dry.mp3',
    wetUrl: './audio/drums-wet.mp3',
    driveSetting: '6.5',
    evolveActive: true,
    mixSetting: '35% Wet',
  },
  {
    id: 'bass',
    dryUrl: './audio/bass-dry.mp3',
    wetUrl: './audio/bass-wet.mp3',
    driveSetting: '5.0',
    evolveActive: false,
    mixSetting: '65% Wet',
  },
  {
    id: 'synth',
    dryUrl: './audio/synth-dry.mp3',
    wetUrl: './audio/synth-wet.mp3',
    driveSetting: '7.0',
    evolveActive: true,
    mixSetting: '50% Wet',
  },
  {
    id: 'mixbus',
    dryUrl: './audio/mixbus-dry.mp3',
    wetUrl: './audio/mixbus-wet.mp3',
    driveSetting: '3.5',
    evolveActive: false,
    mixSetting: '20% Wet',
  },
];
