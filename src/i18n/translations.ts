export type Lang = 'it' | 'en';

export interface Translations {
  nav: {
    overview: string;
    hardware: string;
    soundLab: string;
    specs: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
    rackLabel: string;
    editionLabel: string;
  };
  philosophy: {
    title: string;
    lead: string;
    pillars: {
      title: string;
      description: string;
      metric: string;
    }[];
  };
  hardware: {
    title: string;
    subtitle: string;
    hint: string;
    rearTitle: string;
    rearSubtitle: string;
    rearSpecs: {
      label: string;
      detail: string;
    }[];
    interactiveLabel: string;
    signalPath: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    captions: {
      angularBlack: string;
      angularOrange: string;
      dualOrange: string;
      rackFront: string;
    };
  };
  soundLab: {
    title: string;
    subtitle: string;
    bypassLabel: string;
    engagedLabel: string;
    comingSoonTitle: string;
    comingSoonBody: string;
    comingSoonCta: string;
    sources: {
      id: string;
      name: string;
      note: string;
    }[];
  };
  specs: {
    title: string;
    subtitle: string;
    groups: {
      category: string;
      items: {
        label: string;
        value: string;
      }[];
    }[];
  };
  about: {
    title: string;
    paragraphs: string[];
    manifesto: string;
    location: string;
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    studioLabel: string;
    studioPlaceholder: string;
    interestLabel: string;
    interests: {
      info: string;
      demo: string;
      order: string;
    };
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sentTitle: string;
    sentBody: string;
    directLabel: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
}

export const translations: Record<Lang, Translations> = {
  it: {
    nav: {
      overview: 'Panoramica',
      hardware: 'Controlli',
      soundLab: 'Sound Lab',
      specs: 'Specifiche',
      about: 'Orage',
      contact: 'Contatti',
      cta: 'Richiedi Info',
    },
    hero: {
      headline: 'La saturazione analogica che fa respirare il mix.',
      subheadline:
        'Evolver è un saturatore stereo hardware 1U progettato per il workflow ibrido: esci dalla DAW, aggiungi densità armonica e tridimensionalità reale, e rientra in fase perfetta grazie al controllo parallelo integrato.',
      primaryCta: 'Esplora i controlli',
      secondaryCta: 'Prenota una prova',
      scrollHint: 'Scorri per scoprire',
      rackLabel: '1U 19" STEREO ANALOG OUTBOARD',
      editionLabel: 'ALLUMINIO EDITION',
    },
    philosophy: {
      title: 'Perché mettere un saturatore hardware nel tuo percorso segnale.',
      lead: 'I plugin imitano la distorsione; un circuito analogico reale reagisce alla dinamica dei tuoi transienti in modo organico, addensando il suono e dandogli spazio nel mix senza dover alzare il fader.',
      pillars: [
        {
          title: 'Due marce armoniche: da colla a carattere',
          description:
            'In modalità base aggiunge calore e corpo sul mix bus o sulle voci senza snaturare la sorgente. Premi EVOLVE quando vuoi spingere fino al 25% di THD su drum bus, synth e bassi, mantenendo intatta l’immagine stereo.',
          metric: '0,003% → 25% THD',
        },
        {
          title: 'Filtri 3 dB/oct pensati per saturare pulito',
          description:
            'Quando saturi, le sub-basse tendono a impastare e le alte a indurirsi. Low Cut (0–1 kHz) e Hi Cut (600 Hz–22 kHz) a 3 dB/ottava scolpiscono solo il ramo saturato con una curva morbidissima, mai artificiale.',
          metric: '3 dB/oct SLOPE',
        },
        {
          title: 'Parallelo nativo senza uscire dal rack',
          description:
            'Spingi il Drive oltre il limite e richiama l’attacco originale con la manopola MIX: zero problemi di latenza o fase. E quando vuoi il percorso 100% diretto, BLEND OFF esclude fisicamente lo stadio di miscelazione.',
          metric: 'TRUE PARALLEL',
        },
      ],
    },
    hardware: {
      title: 'Progettato per lavorare a orecchio, non a schermo.',
      subtitle:
        'Ogni controllo segue il flusso naturale del segnale da sinistra a destra: clicca una sezione per scoprire come usarla in ripresa, in mix o sul master bus.',
      hint: 'Seleziona una sezione sul pannello',
      rearTitle: 'Pronto per qualsiasi patchbay o convertitore',
      rearSubtitle:
        'Ingressi e uscite bilanciati su jack TRS per lavorare sia in stereo (mix bus, drum bus, synth) sia in mono su singole tracce, con alimentazione esterna dedicata per tenere il rumore di rete fuori dallo chassis.',
      rearSpecs: [
        { label: 'Ingressi Bilanciati', detail: '2× Jack TRS (Mono/Left, Right)' },
        { label: 'Uscite Bilanciate', detail: '2× Jack TRS (Mono/Left, Right)' },
        { label: 'Alimentazione Esterna', detail: 'DC 14V · 400 mA a basso rumore' },
      ],
      interactiveLabel: 'SEZIONE SELEZIONATA',
      signalPath: 'FLUSSO SEGNALE',
    },
    gallery: {
      title: 'Un solo rack 1U. Dal tracking al mix bus.',
      subtitle:
        'Costruito in alluminio per resistere a sessioni quotidiane, con un pannello leggibile anche nella penombra della regia.',
      captions: {
        angularOrange:
          'Dal tracking al mix bus: un unico outboard per dare coesione, peso e presenza analogica a voci, batterie, synth e intere produzioni.',
        dualOrange:
          'Workflow immediato da sinistra a destra: imposti carattere, filtri e bilanciamento in pochi secondi, senza menu o distrazioni visive.',
        angularBlack:
          'Metering L/R calibrato e hardware bypass istantaneo: pareggia il volume di uscita e confronta Dry e Wet fidandoti solo delle tue orecchie.',
        rackFront:
          'Controllo completo su ogni stadio: ingresso, saturazione, filtri 3 dB/oct, uscita e miscelazione parallela.',
      },
    },
    soundLab: {
      title: 'Nessuna simulazione. Solo hardware registrato.',
      subtitle:
        'Un saturatore analogico si giudica ascoltandolo sulle tracce vere, mai con emulazioni digitali nel browser.',
      bypassLabel: 'BYPASS (DRY)',
      engagedLabel: 'EVOLVER (WET)',
      comingSoonTitle: 'Registrazioni comparative Dry / Wet in arrivo',
      comingSoonBody:
        'Stiamo preparando le riprese A/B allineate al campione della versione in alluminio su drum bus, basso, synth e mix bus. Nel frattempo puoi prenotare una prova diretta nel tuo studio.',
      comingSoonCta: 'Prenota una prova in studio',
      sources: [
        { id: 'drums', name: 'Drum Bus', note: 'Drive spinto + 35% Wet per punch sui transienti' },
        { id: 'bass', name: 'Analog Bass', note: 'Drive medio + Low Cut per sub pulito e medi presenti' },
        { id: 'synth', name: 'Poly Synth', note: 'EVOLVE attivo + Hi Cut morbido per spessore analogico' },
        { id: 'mixbus', name: 'Mix Bus', note: 'Drive leggero + 20% Wet per colla e profondità' },
      ],
    },
    specs: {
      title: 'Specifiche Tecniche',
      subtitle: 'Evolver Overdrive — Alluminio 1U',
      groups: [
        {
          category: 'Audio & Architettura',
          items: [
            { label: 'Formato Rack', value: '19" · 1 Unità (1U)' },
            { label: 'Risposta in frequenza', value: '20 Hz – 20 kHz' },
            { label: 'Distorsione Armonica (THD)', value: '0,003% (Dry) · fino a 25% (Max Drive)' },
            { label: 'Livello nominale ottimale', value: '0 dBVu (+4 dBu Audio Pro)' },
            { label: 'Gain in ingresso', value: 'Regolabile fino a +9 dB + Switch PAD' },
            { label: 'Metering', value: 'Barre LED L/R dedicate su Input e Output' },
          ],
        },
        {
          category: 'Saturazione, Filtri & Mix',
          items: [
            { label: 'Stadio Drive', value: 'Regolazione continua 0–10 + Dual Clipping LED' },
            { label: 'Switch EVOLVE', value: 'Doppio stadio di carattere armonico' },
            { label: 'Filtro Low Cut', value: '0 – 1 kHz · Pendenza 3 dB/oct' },
            { label: 'Filtro Hi Cut', value: '600 Hz – 22 kHz · Pendenza 3 dB/oct' },
            { label: 'Controllo Parallelo', value: 'MIX continuo Dry/Wet + Switch BLEND OFF' },
            { label: 'Bypass', value: 'Hardware Bypass dedicato con LED di stato' },
          ],
        },
        {
          category: 'Connessioni & Costruzione',
          items: [
            { label: 'Ingressi', value: '2× Jack TRS bilanciati (Mono/L, R)' },
            { label: 'Uscite', value: '2× Jack TRS bilanciati (Mono/L, R)' },
            { label: 'Alimentazione', value: 'Esterna DC 14V · 400 mA' },
            { label: 'Scocca', value: 'Alluminio lavorato · Serigrafia ad alto contrasto' },
          ],
        },
      ],
    },
    about: {
      title: 'Progettato da chi sta in studio, per chi lavora in studio.',
      paragraphs: [
        'Orage Audio nasce dall’esigenza concreta di avere outboard analogici moderni, musicali e affidabili — strumenti che risolvono problemi reali in mix invece di restare spenti nel rack.',
        'Ogni Evolver è progettato, assemblato e calibrato a mano in Italia. Uniamo il carattere armonico della circuitazione analogica con controlli pensati per la velocità delle produzioni attuali: filtri morbidi a 3 dB/oct, parallelo nativo e level-matching immediato.',
        'Evolver è il primo capitolo di una linea di macchine dedicate a fonici, producer e musicisti che cercano un suono vivo, fisico e riconoscibile.',
      ],
      manifesto: 'Meno menu, più ascolto. Suono analogico vero, senza scorciatoie.',
      location: 'Progettato e calibrato a mano in Italia',
    },
    contact: {
      title: 'Provalo nel tuo setup.',
      subtitle:
        'Scrivici per conoscere disponibilità, tempi di realizzazione o per organizzare una prova diretta in studio. Ti rispondiamo direttamente noi.',
      nameLabel: 'Nome',
      namePlaceholder: 'Il tuo nome',
      emailLabel: 'Email',
      emailPlaceholder: 'tuo@studio.com',
      studioLabel: 'Studio / Ruolo (opzionale)',
      studioPlaceholder: 'Es. Mix Engineer, Producer, Mastering...',
      interestLabel: 'Di cosa hai bisogno?',
      interests: {
        info: 'Disponibilità e informazioni',
        demo: 'Prova in studio / Demo',
        order: 'Prenotazione unità',
      },
      messageLabel: 'Messaggio',
      messagePlaceholder: 'Raccontaci il tuo setup o su quali sorgenti vorresti usare Evolver...',
      submit: 'Invia richiesta',
      sentTitle: 'Richiesta pronta!',
      sentBody:
        'Si è aperto il tuo client email con il messaggio precompilato. In alternativa puoi scriverci direttamente su Instagram o via email.',
      directLabel: 'Contatto diretto',
    },
    footer: {
      tagline: 'Outboard analogico costruito a mano in Italia.',
      rights: 'Tutti i diritti riservati.',
    },
  },
  en: {
    nav: {
      overview: 'Overview',
      hardware: 'Controls',
      soundLab: 'Sound Lab',
      specs: 'Specs',
      about: 'Orage',
      contact: 'Contact',
      cta: 'Inquire',
    },
    hero: {
      headline: 'Analog saturation that makes your mix breathe.',
      subheadline:
        'Evolver is a 1U stereo hardware saturator built for hybrid studios: send your stems out of the DAW for real harmonic weight and depth, and return phase-coherent with native parallel blend.',
      primaryCta: 'Explore the controls',
      secondaryCta: 'Book a studio trial',
      scrollHint: 'Scroll to explore',
      rackLabel: '1U 19" STEREO ANALOG OUTBOARD',
      editionLabel: 'ALUMINUM EDITION',
    },
    philosophy: {
      title: 'Why put a hardware saturator in your signal path.',
      lead: 'Plugins approximate distortion; a real analog circuit reacts dynamically to your transients, adding density and forward presence so elements sit effortlessly in the mix without pushing the fader.',
      pillars: [
        {
          title: 'Two harmonic gears: glue or attitude',
          description:
            'In base mode it adds subtle cohesion to vocals and mix buses without clouding the source. Flip EVOLVE to push up to 25% THD on drums, synths, and bass while preserving stereo width.',
          metric: '0.003% → 25% THD',
        },
        {
          title: '3 dB/oct filters built for clean saturation',
          description:
            'Heavy saturation can muddy sub-bass and harden top end. Variable Low Cut (0–1 kHz) and Hi Cut (600 Hz–22 kHz) with a gentle 3 dB/octave slope shape only the wet path naturally.',
          metric: '3 dB/oct SLOPE',
        },
        {
          title: 'Native parallel blend inside the rack',
          description:
            'Push Drive past the edge and dial transient punch back in with MIX — zero DAW latency or phase issues. Need pure 100% wet? BLEND OFF removes the blend circuit completely.',
          metric: 'TRUE PARALLEL',
        },
      ],
    },
    hardware: {
      title: 'Built to work by ear, not by screen.',
      subtitle:
        'Every control follows the natural left-to-right flow of your audio: select a section to see how to put it to work during tracking, mixing, or bus processing.',
      hint: 'Select a section on the faceplate',
      rearTitle: 'Ready for any patchbay or converter',
      rearSubtitle:
        'Balanced TRS inputs and outputs operate seamlessly in stereo (mix bus, drum bus, synths) or mono on individual stems, powered by a dedicated external supply to keep mains hum out of the chassis.',
      rearSpecs: [
        { label: 'Balanced Inputs', detail: '2× TRS Jack (Mono/Left, Right)' },
        { label: 'Balanced Outputs', detail: '2× TRS Jack (Mono/Left, Right)' },
        { label: 'External Power', detail: 'Low-noise DC 14V · 400 mA' },
      ],
      interactiveLabel: 'SELECTED SECTION',
      signalPath: 'SIGNAL FLOW',
    },
    gallery: {
      title: 'One 1U rack. From tracking to mix bus.',
      subtitle:
        'Machined in aluminum for daily studio abuse, with a high-contrast layout you can read effortlessly in a dim control room.',
      captions: {
        angularOrange:
          'From tracking to mix bus: one stereo outboard unit to bring cohesion, weight, and analog dimension to vocals, drums, synths, and full mixes.',
        dualOrange:
          'Fast left-to-right workflow: dial in harmonic density, tone shaping, and parallel blend in seconds — no menus, no presets, no screen fatigue.',
        angularBlack:
          'Calibrated L/R metering and instant hardware bypass: level-match your output and compare Dry vs Wet trusting only your ears.',
        rackFront:
          'Hands-on control over every stage: input headroom, saturation, 3 dB/oct filters, output trim, and parallel mix.',
      },
    },
    soundLab: {
      title: 'No emulations. Only real hardware captures.',
      subtitle:
        'An analog saturator should be judged on real studio stems, never through browser DSP simulations.',
      bypassLabel: 'BYPASS (DRY)',
      engagedLabel: 'EVOLVER (WET)',
      comingSoonTitle: 'Comparative Dry / Wet studio captures coming soon',
      comingSoonBody:
        'We are finalizing sample-aligned A/B captures of the Aluminum Edition across drum bus, bass, synths, and mix bus. Want to hear it on your own tracks first? Book a studio trial.',
      comingSoonCta: 'Request a studio trial',
      sources: [
        { id: 'drums', name: 'Drum Bus', note: 'Hard Drive + 35% Wet for explosive parallel punch' },
        { id: 'bass', name: 'Analog Bass', note: 'Medium Drive + Low Cut for tight subs and growl' },
        { id: 'synth', name: 'Poly Synth', note: 'EVOLVE engaged + smooth Hi Cut for analog weight' },
        { id: 'mixbus', name: 'Mix Bus', note: 'Subtle Drive + 20% Wet for glue and depth' },
      ],
    },
    specs: {
      title: 'Technical Specifications',
      subtitle: 'Evolver Overdrive — 1U Aluminum',
      groups: [
        {
          category: 'Audio & Architecture',
          items: [
            { label: 'Rack Format', value: '19" · 1U Chassis' },
            { label: 'Frequency Response', value: '20 Hz – 20 kHz' },
            { label: 'Total Harmonic Distortion', value: '0.003% (Dry) · up to 25% (Max Drive)' },
            { label: 'Optimal Operating Level', value: '0 dBVu (+4 dBu Pro Audio)' },
            { label: 'Input Gain', value: 'Variable up to +9 dB + PAD Switch' },
            { label: 'Metering', value: 'Dedicated L/R LED bars on Input & Output' },
          ],
        },
        {
          category: 'Saturation, Filters & Mix',
          items: [
            { label: 'Drive Stage', value: 'Continuous 0–10 + Dual Clipping LEDs' },
            { label: 'EVOLVE Switch', value: 'Dual-stage harmonic character shift' },
            { label: 'Low Cut Filter', value: '0 – 1 kHz · 3 dB/oct slope' },
            { label: 'Hi Cut Filter', value: '600 Hz – 22 kHz · 3 dB/oct slope' },
            { label: 'Parallel Blend', value: 'Continuous Dry/Wet MIX + BLEND OFF switch' },
            { label: 'Bypass', value: 'Dedicated Hardware Bypass with status LED' },
          ],
        },
        {
          category: 'Connectivity & Build',
          items: [
            { label: 'Inputs', value: '2× Balanced TRS Jacks (Mono/L, R)' },
            { label: 'Outputs', value: '2× Balanced TRS Jacks (Mono/L, R)' },
            { label: 'Power Supply', value: 'External DC 14V · 400 mA' },
            { label: 'Enclosure', value: 'Brushed aluminum faceplate · High-contrast print' },
          ],
        },
      ],
    },
    about: {
      title: 'Built by studio people, for studio work.',
      paragraphs: [
        'Orage Audio started from a practical need: modern analog outboard that solves real mixing problems every day instead of collecting dust in a rack.',
        'Every Evolver is engineered, hand-assembled, and calibrated in Italy. We pair genuine analog harmonic behavior with controls built for today’s speed: gentle 3 dB/oct filters, native parallel mix, and effortless gain staging.',
        'Evolver is the first chapter of a focused hardware line for engineers, producers, and musicians who want a physical, unmistakable sound.',
      ],
      manifesto: 'Fewer menus, more listening. Real analog sound, no shortcuts.',
      location: 'Designed & hand-calibrated in Italy',
    },
    contact: {
      title: 'Hear it in your own setup.',
      subtitle:
        'Reach out for availability, build lead times, or to arrange a hands-on trial in your studio. You will talk directly with the people who build it.',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@studio.com',
      studioLabel: 'Studio / Role (optional)',
      studioPlaceholder: 'e.g. Mix Engineer, Producer, Mastering...',
      interestLabel: 'How can we help?',
      interests: {
        info: 'Availability & info',
        demo: 'Studio trial / Demo',
        order: 'Reserve a unit',
      },
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us about your setup or what sources you want to run through Evolver...',
      submit: 'Send inquiry',
      sentTitle: 'Inquiry ready!',
      sentBody:
        'Your email client opened with a pre-filled message. You can also reach us directly on Instagram or by email.',
      directLabel: 'Direct channels',
    },
    footer: {
      tagline: 'Handcrafted analog outboard built in Italy.',
      rights: 'All rights reserved.',
    },
  },
};
