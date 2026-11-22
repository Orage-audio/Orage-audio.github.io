import type { Lang } from '../i18n/translations';

export interface HardwareSection {
  id: string;
  /** Left & width percentages on the cropped 1U faceplate */
  leftPct: number;
  widthPct: number;
  ledColor: 'green' | 'blue' | 'amber' | 'orange';
  title: Record<Lang, string>;
  controls: string[];
  summary: Record<Lang, string>;
  detail: Record<Lang, string>;
  specBadge: string;
}

export const hardwareSections: HardwareSection[] = [
  {
    id: 'gain',
    leftPct: 8.5,
    widthPct: 16.5,
    ledColor: 'green',
    title: {
      it: 'Stadio di Ingresso · Gain & PAD',
      en: 'Input Stage · Gain & PAD',
    },
    controls: ['GAIN (0–10)', 'PAD (OFF / ON)', 'INPUT METER L/R (Sig / 0 / Peak)'],
    summary: {
      it: 'Calibra la spinta in ingresso con precisione prima della saturazione.',
      en: 'Dial in the exact input level feeding the saturation core.',
    },
    detail: {
      it: 'Regola il livello fino a +9 dB per spingere dolcemente lo stadio successivo oppure attiva il PAD sui segnali molto caldi. I LED L/R (Sig, 0, Peak) ti danno feedback immediato sul headroom.',
      en: 'Boost up to +9 dB to gently push the core or engage the PAD for hot converters and synths. Dedicated L/R LEDs (Sig, 0, Peak) keep headroom crystal clear.',
    },
    specBadge: 'MAX +9 dB · PAD',
  },
  {
    id: 'drive',
    leftPct: 25.0,
    widthPct: 11.5,
    ledColor: 'blue',
    title: {
      it: 'Cuore Armonico · Drive & EVOLVE',
      en: 'Harmonic Core · Drive & EVOLVE',
    },
    controls: ['DRIVE (0–10)', 'DUAL CLIPPING LED', 'SWITCH EVOLVE'],
    summary: {
      it: 'Il carattere distintivo dell’Evolver: da saturazione vellutata a overdrive deciso.',
      en: 'Evolver’s signature voice: from silky harmonic lift to bold overdrive.',
    },
    detail: {
      it: 'La manopola Drive dosa la densità armonica (fino al 25% di THD), monitorata dai due LED blu dinamici. Premi EVOLVE per cambiare marcia e aprire una seconda risposta armonica più aggressiva e presente.',
      en: 'The Drive knob shapes harmonic density up to 25% THD with dual blue dynamic LEDs. Engage EVOLVE to shift gears into a richer, more aggressive saturation profile.',
    },
    specBadge: 'UP TO 25% THD',
  },
  {
    id: 'filters',
    leftPct: 36.5,
    widthPct: 17.5,
    ledColor: 'orange',
    title: {
      it: 'Scolpitura Tonale · Low Cut & Hi Cut',
      en: 'Tone Shaping · Low Cut & Hi Cut',
    },
    controls: ['LOW CUT (0–1 kHz)', 'HI CUT (600 Hz–22 kHz)', '3 dB/oct SLOPE'],
    summary: {
      it: 'Filtri analogici ultra-dolci a 3 dB/ottava per tenere pulite basse e alte.',
      en: 'Ultra-gentle 3 dB/octave analog filters to keep lows tight and highs silky.',
    },
    detail: {
      it: 'Una pendenza da 3 dB/oct suona incredibilmente naturale: pulisce il sub fangoso prima che gonfi la saturazione e smussa le sibilanti sugli acuti senza mai "chiudere" la traccia.',
      en: 'A 3 dB/oct slope feels effortlessly musical: tighten sub energy before it clouds the saturation and tame upper harmonics without ever sounding dull.',
    },
    specBadge: '3 dB/oct ANALOG',
  },
  {
    id: 'output',
    leftPct: 54.0,
    widthPct: 16.8,
    ledColor: 'green',
    title: {
      it: 'Stadio di Uscita · Volume & Output Meter',
      en: 'Output Stage · Volume & Metering',
    },
    controls: ['VOLUME (0–10)', 'OUTPUT METER L/R (-10 a +3 dB)'],
    summary: {
      it: 'Gain staging impeccabile con barra LED L/R a 5 segmenti.',
      en: 'Effortless gain matching with 5-segment stereo L/R LED bars.',
    },
    detail: {
      it: 'Compensa esattamente l’aumento di volume introdotto dal Drive per confrontare Dry e Wet allo stesso livello percepito. Scala calibrata da -10 dB fino a +3 dB per entrambi i canali.',
      en: 'Compensate for Drive makeup gain to compare Dry and Wet at matched loudness. Calibrated from -10 dB to +3 dB across both Left and Right channels.',
    },
    specBadge: 'L/R 5-LED METER',
  },
  {
    id: 'mix',
    leftPct: 70.8,
    widthPct: 12.2,
    ledColor: 'amber',
    title: {
      it: 'Controllo Parallelo · MIX, Blend Off & Bypass',
      en: 'Parallel Control · MIX, Blend Off & Bypass',
    },
    controls: ['MIX (Dry → Wet)', 'BLEND OFF', 'BYPASS'],
    summary: {
      it: 'Saturazione parallela istantanea direttamente nell’hardware.',
      en: 'Instant parallel saturation built right into the analog box.',
    },
    detail: {
      it: 'Spingi il Drive al massimo e dosalo al 15–30% con la manopola MIX per mantenere intatti i transienti. Con BLEND OFF escludi il circuito di blend; con BYPASS verifichi subito il segnale originale.',
      en: 'Push Drive hard and blend 15–30% back in via MIX to keep transients intact. Use BLEND OFF for a pure direct wet path, and BYPASS for instant A/B checks.',
    },
    specBadge: 'DRY/WET + BYPASS',
  },
  {
    id: 'power',
    leftPct: 83.0,
    widthPct: 14.0,
    ledColor: 'amber',
    title: {
      it: 'Accensione · Power Toggle & Telaio 1U',
      en: 'Power · Heavy-Duty Toggle & 1U Chassis',
    },
    controls: ['POWER TOGGLE', 'STATUS LED', 'DC 14V 400mA'],
    summary: {
      it: 'Interruttore metallico solido e alimentazione dedicata a basso rumore.',
      en: 'Solid chrome toggle switch and low-noise dedicated power rail.',
    },
    detail: {
      it: 'Costruzione robusta in alluminio spazzolato 1U pensata per resistere anni di sessioni in studio. Alimentazione esterna DC 14V 400mA per tenere il trasformatore lontano dal percorso audio.',
      en: 'Rugged 1U brushed aluminum chassis built for years of daily studio work. External DC 14V 400mA power keeps transformer hum completely away from the audio path.',
    },
    specBadge: '1U · DC 14V 400mA',
  },
];
