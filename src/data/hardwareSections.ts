import type { Lang } from '../i18n/translations';

export interface HardwareSection {
  id: string;
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
      it: 'Gain & PAD · Controlla come entri nel circuito',
      en: 'Gain & PAD · Control how hard you hit the core',
    },
    controls: ['GAIN (0–10)', 'PAD (OFF / ON)', 'INPUT METER L/R (Sig / 0 / Peak)'],
    summary: {
      it: 'Il punto di partenza del suono: decidi tu se restare pulito o spingere già l’ingresso.',
      en: 'Where tone begins: stay clean and open or push the input stage before saturation.',
    },
    detail: {
      it: 'Con fino a +9 dB di guadagno porti subito in zona ottimale anche sorgenti deboli, mentre il tasto PAD gestisce senza sforzo synth hardware o convertitori molto caldi. I LED L/R (Sig, 0, Peak) ti permettono di calibrare l’headroom a colpo d’occhio.',
      en: 'Up to +9 dB of input gain brings quiet stems right into the sweet spot, while the PAD switch tames hot hardware synths and converters effortlessly. Dedicated L/R LEDs (Sig, 0, Peak) keep your headroom unmistakable.',
    },
    specBadge: 'MAX +9 dB · PAD',
  },
  {
    id: 'drive',
    leftPct: 25.0,
    widthPct: 11.5,
    ledColor: 'blue',
    title: {
      it: 'Drive & EVOLVE · Da calore sottile a overdrive pieno',
      en: 'Drive & EVOLVE · From subtle warmth to rich overdrive',
    },
    controls: ['DRIVE (0–10)', 'DUAL CLIPPING LED', 'SWITCH EVOLVE'],
    summary: {
      it: 'Due personalità nello stesso stadio: incolla un mix bus o trasforma completamente uno stem.',
      en: 'Two distinct voices in one stage: glue a mix bus or completely transform a stem.',
    },
    detail: {
      it: 'Ruotando Drive dosi la saturazione con continuità (fino al 25% di THD), seguendo la risposta sui due LED blu dinamici. Attivando lo switch EVOLVE cambi marcia armonica: il suono diventa più denso, aggressivo e in avanti, perfetto per batterie, bassi, chitarre e synth.',
      en: 'Turn Drive to sweep harmonic density smoothly up to 25% THD while watching the dual blue dynamic LEDs react to your groove. Engage EVOLVE to shift into a denser, more forward saturation voice tailored for drums, bass, guitars, and synths.',
    },
    specBadge: 'UP TO 25% THD',
  },
  {
    id: 'filters',
    leftPct: 36.5,
    widthPct: 17.5,
    ledColor: 'orange',
    title: {
      it: 'Low Cut & Hi Cut · Scolpisci solo ciò che saturi',
      en: 'Low Cut & Hi Cut · Shape only what you saturate',
    },
    controls: ['LOW CUT (0–1 kHz)', 'HI CUT (600 Hz–22 kHz)', '3 dB/oct SLOPE'],
    summary: {
      it: 'Mantieni basse solide e alte vellutate anche quando spingi il Drive al massimo.',
      en: 'Keep lows tight and highs silky even when Drive is pushed to the limit.',
    },
    detail: {
      it: 'La pendenza ultra-morbida da 3 dB/ottava è il segreto della musicalità di Evolver: ripulisce il sub fangoso prima che gonfi la saturazione e smussa le asprezze sugli acuti senza mai far suonare la traccia filtrata o stretta.',
      en: 'The ultra-gentle 3 dB/octave slope is key to Evolver’s musicality: clean up sub-bass buildup before it muddies the saturation and soften harsh upper harmonics without ever making the track sound thin or filtered.',
    },
    specBadge: '3 dB/oct ANALOG',
  },
  {
    id: 'output',
    leftPct: 54.0,
    widthPct: 16.8,
    ledColor: 'green',
    title: {
      it: 'Volume & Output Meter · Confronta ad armi pari',
      en: 'Volume & Output Meter · True level-matched A/B',
    },
    controls: ['VOLUME (0–10)', 'OUTPUT METER L/R (-10 a +3 dB)'],
    summary: {
      it: 'Non farti ingannare dal volume più alto: pareggia il livello e giudica solo il timbro.',
      en: 'Never get fooled by louder gain: match your level and judge pure tone.',
    },
    detail: {
      it: 'La manopola Volume compensa con precisione la spinta del Drive, mentre la doppia barra LED L/R calibrata da -10 a +3 dB (riferimento 0 dBVu) ti garantisce un rientro pulito nei convertitori della DAW.',
      en: 'The Volume trim accurately compensates for Drive gain, while the dual 5-segment L/R LED bars (-10 to +3 dB, 0 dBVu reference) ensure clean, predictable return levels into your DAW converters.',
    },
    specBadge: 'L/R 5-LED METER',
  },
  {
    id: 'mix',
    leftPct: 70.8,
    widthPct: 12.2,
    ledColor: 'amber',
    title: {
      it: 'MIX, Blend Off & Bypass · Parallelo senza compromessi',
      en: 'MIX, Blend Off & Bypass · Zero-compromise parallel',
    },
    controls: ['MIX (Dry → Wet)', 'BLEND OFF', 'BYPASS'],
    summary: {
      it: 'Aggiungi peso e armoniche mantenendo intatto il punch dei transienti originali.',
      en: 'Add harmonic weight while keeping every ounce of original transient punch.',
    },
    detail: {
      it: 'Porta Drive in territorio estremo e poi miscelalo al 15–35% con MIX: ottieni spessore e grinta senza perdere attacco su cassa, rullante o voce. Quando vuoi il 100% di segnale puro, BLEND OFF bypassa il circuito di blend; con BYPASS verifichi subito il risultato.',
      en: 'Push Drive hard and blend 15–35% back in with MIX for massive weight without sacrificing kick, snare, or vocal punch. Need 100% pure wet? BLEND OFF takes the blend stage out of the path, while BYPASS gives instant hardware A/B.',
    },
    specBadge: 'DRY/WET + BYPASS',
  },
  {
    id: 'power',
    leftPct: 83.0,
    widthPct: 14.0,
    ledColor: 'amber',
    title: {
      it: 'Power & Telaio 1U · Silenzioso e costruito per il rack',
      en: 'Power & 1U Chassis · Quiet and built for daily work',
    },
    controls: ['POWER TOGGLE', 'STATUS LED', 'DC 14V 400mA'],
    summary: {
      it: 'Trasformatore esterno e scocca in alluminio per un tappeto di rumore pulitissimo.',
      en: 'External power rail and solid aluminum enclosure for an ultra-quiet noise floor.',
    },
    detail: {
      it: 'L’alimentazione esterna DC 14V 400mA tiene il trasformatore lontano dal percorso audio eliminando ronzii di rete anche nei rack affollati. Interruttore metallico solido e costruzione pensata per accompagnarti per anni.',
      en: 'External DC 14V 400mA power keeps transformer hum completely away from the audio circuit even in densely packed studio racks. Solid chrome toggle and aluminum chassis built for years of daily sessions.',
    },
    specBadge: '1U · DC 14V 400mA',
  },
];
